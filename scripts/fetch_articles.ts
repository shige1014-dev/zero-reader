/**
 * Standalone CLI: refresh today's article pool without running the Next.js server.
 *
 * Data sources live in lib/sources/ — this script is a thin pipeline around them
 * so we don't duplicate NewsAPI / RSS / newsnow query hardcoding.
 *
 * Run: `npm run fetch:articles` (tsx).
 */
import { loadEnvConfig } from "@next/env";
import { createClient } from "@libsql/client";
import path from "path";

import { fetchNewsApi } from "../lib/sources/newsapi";
import { fetchGoogleNewsRss } from "../lib/sources/google-rss";
import { fetchNewsnow, NEWSNOW_DISPLAY_NAMES } from "../lib/sources/newsnow";
import { isHighQualityCandidate, normalizedTitle } from "../lib/article-candidate";
import {
  buildFallbackAnalysis,
  clip,
  fallbackChineseTitle,
  inferObiRef,
  normalizeTags,
  type DeepAnalysis,
  type TrackTag
} from "../lib/article-analysis";
import type { SourceItem } from "../lib/sources/types";

loadEnvConfig(process.cwd());

function pickEnv(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

const db = createClient({
  url:
    pickEnv(process.env.TURSO_DATABASE_URL, process.env.LIBSQL_URL) ??
    `file:${path.join(process.cwd(), "data", "obi.db")}`,
  authToken: pickEnv(process.env.TURSO_AUTH_TOKEN, process.env.LIBSQL_AUTH_TOKEN) ?? undefined
});

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";
const SEOUL_TIME_ZONE = "Asia/Seoul";
const RECENT_HOURS = 36;
const INTERNAL_SOURCES = new Set([
  "Macro Desk",
  "Macro Grid",
  "Research Note",
  "Risk Monitor",
  "Semi Daily"
]);
const EXTERNAL_ALLOWED_SOURCES = new Set([
  "Bloomberg",
  "CNBC",
  "Reuters",
  "Financial Times",
  "Stratechery.com",
  "ArXiv"
]);
const today = new Intl.DateTimeFormat("en-CA", { timeZone: SEOUL_TIME_ZONE }).format(new Date());

interface AnalysisPayload {
  title_zh: string;
  zero_eval: string;
  recommend_level: number;
  tags: TrackTag[];
  summary: string;
  analysis: DeepAnalysis | null;
}

async function ensureSchema(): Promise<void> {
  await db.batch(
    [
      {
        sql: `CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          title_zh TEXT,
          url TEXT NOT NULL UNIQUE,
          source TEXT NOT NULL,
          source_type TEXT,
          date TEXT NOT NULL,
          published_at TEXT,
          tags TEXT NOT NULL,
          zero_eval TEXT NOT NULL,
          summary TEXT NOT NULL DEFAULT '',
          recommend_level INTEGER NOT NULL,
          obi_ref TEXT NOT NULL,
          analysis_json TEXT,
          pushed_at TEXT,
          pushed_morning_at TEXT,
          pushed_evening_at TEXT,
          created_at TEXT NOT NULL,
          read_at TEXT
        )`,
        args: []
      }
    ],
    "write"
  );
  const pragma = await db.execute("PRAGMA table_info(articles)");
  const existing = new Set(pragma.rows.map((row) => String(row.name)));
  if (!existing.has("analysis_json")) {
    await db.execute("ALTER TABLE articles ADD COLUMN analysis_json TEXT");
  }
  if (!existing.has("source_type")) {
    await db.execute("ALTER TABLE articles ADD COLUMN source_type TEXT");
  }
}

function parseJsonResponse(text: string): Record<string, unknown> {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const jsonText = fencedMatch ? fencedMatch[1].trim() : trimmed;
  return JSON.parse(jsonText) as Record<string, unknown>;
}

function isRecentPublishedAt(publishedAt: string | null): boolean {
  if (!publishedAt) return true;
  const publishedMs = new Date(publishedAt).getTime();
  if (Number.isNaN(publishedMs)) return true;
  return Date.now() - publishedMs <= RECENT_HOURS * 60 * 60 * 1000;
}

function isAllowedItem(item: SourceItem): boolean {
  if (item.sourceType === "newsnow") return NEWSNOW_DISPLAY_NAMES.has(item.source);
  return INTERNAL_SOURCES.has(item.source) || EXTERNAL_ALLOWED_SOURCES.has(item.source);
}

async function fetchArxiv(): Promise<SourceItem[]> {
  const params = new URLSearchParams({
    search_query: "cat:cs.AI+OR+cat:quant-ph",
    start: "0",
    max_results: "12",
    sortBy: "submittedDate",
    sortOrder: "descending"
  });
  const res = await fetch(`http://export.arxiv.org/api/query?${params.toString()}`);
  if (!res.ok) throw new Error(`arxiv ${res.status}`);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 12);
  return entries.map((entry): SourceItem => {
    const block = entry[1];
    const title = block.match(/<title>\s*([\s\S]*?)\s*<\/title>/)?.[1]?.replace(/\s+/g, " ").trim() ?? "ArXiv Paper";
    const id = block.match(/<id>(.*?)<\/id>/)?.[1] ?? "https://arxiv.org";
    const summary = block.match(/<summary>\s*([\s\S]*?)\s*<\/summary>/)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
    const publishedAt = block.match(/<published>\s*([\s\S]*?)\s*<\/published>/)?.[1]?.trim() ?? null;
    return { title, url: id, source: "ArXiv", rawText: summary, publishedAt, sourceType: "arxiv" };
  });
}

async function analyzeWithClaude(item: SourceItem): Promise<AnalysisPayload> {
  const localFallback = buildFallbackAnalysis(item);
  const fallback: AnalysisPayload = {
    title_zh: localFallback.titleZh,
    zero_eval: localFallback.zeroEval,
    recommend_level: localFallback.recommendLevel,
    tags: localFallback.tags,
    summary: localFallback.summary,
    analysis: localFallback.analysis
  };

  if (!ANTHROPIC_API_KEY) return fallback;

  const prompt = `
你是投资研究助手，要为读者训练逻辑推演能力。根据下面文章信息输出严格 JSON，不要输出任何额外文字。
基础字段：
- title_zh: 24字以内中文标题
- zero_eval: 100-150字中文投资视角评价
- recommend_level: 1-5整数
- tags: 从[量子计算, 核能, AI芯片, 宏观, 地缘风险, 商业航天]中选1-2个
- summary: 150字以内中文摘录

逻辑推演字段（每条 60-90 字，必须 per-article 独特，禁止套话/通用模板）：
- analysis.eventNature: 事件性质（这是 trigger / 趋势转折 / 噪音？为什么）
- analysis.keyVariable: 关键变量（接下来盯什么数据/指标演变才能判断方向）
- analysis.transmission: 传导路径（从该事件→市场预期→资产价格的具体链条）
- analysis.trap: 误判陷阱（最容易被错读成什么？典型陷阱是什么）
- analysis.falsifyPoint: 最早证伪点（如果这个判断错了，最早会从哪里看到反向信号）
- analysis.profitOutlet: 利润兑现口（这条故事最终在哪家公司财报哪一行体现？没体现就是叙事）
- analysis.bull: 多头逻辑（最强的看多论据，一句）
- analysis.bear: 空头逻辑（最强的看空论据，一句）

标题：${item.title}
来源：${item.source}
摘要：${clip(item.rawText ?? "", 2400)}
`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    console.warn(`Anthropic request failed: ${response.status} ${response.statusText}. Falling back.`);
    return fallback;
  }

  const json = (await response.json()) as { content?: Array<{ text?: string }> };
  const text = json.content?.[0]?.text;
  if (typeof text !== "string") {
    console.warn("Anthropic returned empty content. Falling back.");
    return fallback;
  }
  try {
    const parsed = parseJsonResponse(text);
    const a =
      typeof parsed.analysis === "object" && parsed.analysis !== null
        ? (parsed.analysis as Record<string, unknown>)
        : null;
    const analysis: DeepAnalysis | null = a
      ? {
          eventNature: clip(String(a.eventNature ?? ""), 200),
          keyVariable: clip(String(a.keyVariable ?? ""), 200),
          transmission: clip(String(a.transmission ?? ""), 200),
          trap: clip(String(a.trap ?? ""), 200),
          falsifyPoint: clip(String(a.falsifyPoint ?? ""), 200),
          profitOutlet: clip(String(a.profitOutlet ?? ""), 200),
          bull: clip(String(a.bull ?? ""), 200),
          bear: clip(String(a.bear ?? ""), 200)
        }
      : null;
    return {
      title_zh: clip(String(parsed.title_zh ?? fallbackChineseTitle(item)), 34),
      zero_eval: clip(String(parsed.zero_eval ?? fallback.zero_eval), 150),
      recommend_level: Math.max(1, Math.min(5, Number(parsed.recommend_level ?? 3))),
      tags: normalizeTags(parsed.tags),
      summary: clip(String(parsed.summary ?? fallback.summary), 150),
      analysis
    };
  } catch (error) {
    console.warn(`Anthropic response parse failed: ${error instanceof Error ? error.message : "unknown"}. Falling back.`);
    return fallback;
  }
}

async function existsByNormalizedTitle(title: string, date: string): Promise<boolean> {
  const result = await db.execute({
    sql: "SELECT id, title FROM articles WHERE date = ?",
    args: [date]
  });
  const target = normalizedTitle(title);
  return result.rows.some((row) => normalizedTitle(String(row.title ?? "")) === target);
}

async function existsByUrl(url: string): Promise<boolean> {
  const result = await db.execute({
    sql: "SELECT id FROM articles WHERE url = ? LIMIT 1",
    args: [url]
  });
  return result.rows.length > 0;
}

async function insertArticle(item: SourceItem, analysis: AnalysisPayload): Promise<void> {
  await db.execute({
    sql: `INSERT INTO articles (
      title, url, source, source_type, date, tags, zero_eval, summary, recommend_level, obi_ref,
      title_zh, published_at, analysis_json, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NULL)`,
    args: [
      item.title,
      item.url,
      item.source,
      item.sourceType,
      today,
      JSON.stringify(analysis.tags),
      analysis.zero_eval,
      analysis.summary,
      analysis.recommend_level,
      inferObiRef(analysis.tags),
      analysis.title_zh,
      item.publishedAt,
      analysis.analysis ? JSON.stringify(analysis.analysis) : null,
      new Date().toISOString()
    ]
  });
}

async function main(): Promise<void> {
  await ensureSchema();

  const results = await Promise.all([
    fetchNewsApi().catch((e: unknown) => {
      console.warn("[newsapi]", (e as Error).message);
      return [] as SourceItem[];
    }),
    fetchGoogleNewsRss().catch((e: unknown) => {
      console.warn("[google-rss]", (e as Error).message);
      return [] as SourceItem[];
    }),
    fetchArxiv().catch((e: unknown) => {
      console.warn("[arxiv]", (e as Error).message);
      return [] as SourceItem[];
    }),
    fetchNewsnow().catch((e: unknown) => {
      console.warn("[newsnow]", (e as Error).message);
      return [] as SourceItem[];
    })
  ]);

  const perSource: Record<string, number> = {};
  for (const arr of results) {
    for (const it of arr) {
      perSource[it.sourceType] = (perSource[it.sourceType] || 0) + 1;
    }
  }
  console.log("[raw]", JSON.stringify(perSource));

  const collected = results.flat().filter(
    (item) => item.url && item.title && isRecentPublishedAt(item.publishedAt) && isAllowedItem(item)
  );

  let inserted = 0;
  const insertedBySource: Record<string, number> = {};
  for (const item of collected) {
    if (await existsByUrl(item.url)) continue;
    const analysis = await analyzeWithClaude(item);
    if (await existsByNormalizedTitle(item.title, today)) continue;
    if (!isHighQualityCandidate(item, { recommendLevel: analysis.recommend_level, tags: analysis.tags })) continue;
    await insertArticle(item, analysis);
    inserted += 1;
    insertedBySource[item.sourceType] = (insertedBySource[item.sourceType] || 0) + 1;
  }

  console.log(`fetched=${collected.length} inserted=${inserted} by-source=${JSON.stringify(insertedBySource)}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
