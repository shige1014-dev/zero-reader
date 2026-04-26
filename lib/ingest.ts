import { createUpdateRun, db, getPushableArticles, initSchema, markArticlePushed } from "@/lib/db";
import { isHighQualityCandidate, normalizedTitle } from "@/lib/article-candidate";
import {
  buildFallbackAnalysis,
  clip,
  fallbackChineseTitle,
  inferObiRef,
  normalizeTags,
  type TrackTag
} from "@/lib/article-analysis";
import { todayDateString } from "@/lib/time";
import type { Article } from "@/lib/types";
import { isAllowedIngestItem } from "@/lib/source-filter";
import { fetchNewsApi } from "@/lib/sources/newsapi";
import { fetchGoogleNewsRss } from "@/lib/sources/google-rss";
import { fetchNewsnow } from "@/lib/sources/newsnow";
import { fetchXTwitter } from "@/lib/sources/x-twitter";
import type { SourceItem } from "@/lib/sources/types";

type PushSlot = "morning" | "evening";

interface AnalysisResult {
  titleZh: string;
  zeroEval: string;
  recommendLevel: number;
  tags: TrackTag[];
  summary: string;
}

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

interface DigestSelection {
  selected: Article[];
  message: string;
}

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";
const RECENT_HOURS = 36;

function parseJsonResponse(text: string): {
  title_zh?: string;
  zero_eval?: string;
  recommend_level?: number;
  tags?: unknown;
  summary?: string;
} {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const jsonText = fencedMatch ? fencedMatch[1].trim() : trimmed;
  return JSON.parse(jsonText) as {
    title_zh?: string;
    zero_eval?: string;
    recommend_level?: number;
    tags?: unknown;
    summary?: string;
  };
}

async function fetchText(url: string, init?: RequestInit): Promise<string> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText} ${url}`);
  }
  return response.text();
}

async function fetchArxiv(): Promise<SourceItem[]> {
  const params = new URLSearchParams({
    search_query: "cat:cs.AI+OR+cat:quant-ph",
    start: "0",
    max_results: "12",
    sortBy: "submittedDate",
    sortOrder: "descending"
  });
  const xml = await fetchText(`https://export.arxiv.org/api/query?${params.toString()}`);
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 12);
  return entries.map((entry) => {
    const block = entry[1];
    const title = block.match(/<title>\s*([\s\S]*?)\s*<\/title>/)?.[1]?.replace(/\s+/g, " ").trim() ?? "ArXiv Paper";
    const id = block.match(/<id>(.*?)<\/id>/)?.[1] ?? "https://arxiv.org";
    const summary = block.match(/<summary>\s*([\s\S]*?)\s*<\/summary>/)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
    const publishedAt = block.match(/<published>\s*([\s\S]*?)\s*<\/published>/)?.[1]?.trim() ?? null;
    return { title, url: id, source: "ArXiv", rawText: summary, publishedAt, sourceType: "arxiv" as const };
  });
}

function isRecentPublishedAt(publishedAt: string | null): boolean {
  if (!publishedAt) {
    return true;
  }
  const publishedMs = new Date(publishedAt).getTime();
  if (Number.isNaN(publishedMs)) {
    return true;
  }
  return Date.now() - publishedMs <= RECENT_HOURS * 60 * 60 * 1000;
}

async function analyzeWithClaude(item: SourceItem): Promise<AnalysisResult> {
  const fallback = buildFallbackAnalysis(item);

  if (!ANTHROPIC_API_KEY) {
    return fallback;
  }

  const prompt = `
你是投资研究助手。请根据下面文章信息输出严格 JSON，不要输出任何额外文字。
字段：
- title_zh: 24字以内中文标题
- zero_eval: 100-150字中文投资视角评价
- recommend_level: 1-5整数
- tags: 从[量子计算, 核能, AI芯片, 宏观, 地缘风险, 商业航天]中选1-2个
- summary: 150字以内中文摘录

标题：${item.title}
来源：${item.source}
摘要：${clip(item.rawText, 2400)}
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
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }]
    })
  });
  if (!response.ok) {
    console.warn(`Anthropic request failed: ${response.status} ${response.statusText}. Falling back to local analysis.`);
    return fallback;
  }
  const payload = (await response.json()) as AnthropicResponse;
  const text = payload.content?.[0]?.text;
  if (!text) {
    console.warn("Anthropic returned empty content. Falling back to local analysis.");
    return fallback;
  }
  try {
    const parsed = parseJsonResponse(text);
    return {
      titleZh: clip(parsed.title_zh ?? fallbackChineseTitle(item), 34),
      zeroEval: clip(parsed.zero_eval ?? fallback.zeroEval, 150),
      recommendLevel: Math.max(1, Math.min(5, Number(parsed.recommend_level ?? 3))),
      tags: normalizeTags(parsed.tags),
      summary: clip(parsed.summary ?? fallback.summary, 150)
    };
  } catch (error) {
    console.warn(`Anthropic response parse failed: ${error instanceof Error ? error.message : "unknown error"}. Falling back to local analysis.`);
    return fallback;
  }
}

async function existsByUrl(url: string): Promise<boolean> {
  const result = await db.execute({
    sql: "SELECT id FROM articles WHERE url = ? LIMIT 1",
    args: [url]
  });
  return result.rows.length > 0;
}

async function insertArticle(item: SourceItem, analysis: AnalysisResult): Promise<void> {
  await db.execute({
    sql: `INSERT INTO articles (
      title, url, source, source_type, date, tags, zero_eval, summary, recommend_level, obi_ref,
      title_zh, published_at, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NULL)`,
    args: [
      item.title,
      item.url,
      item.source,
      item.sourceType,
      todayDateString(),
      JSON.stringify(analysis.tags),
      analysis.zeroEval,
      analysis.summary,
      analysis.recommendLevel,
      inferObiRef(analysis.tags),
      analysis.titleZh,
      item.publishedAt,
      new Date().toISOString()
    ]
  });
}

async function existsByNormalizedTitle(title: string, date: string): Promise<boolean> {
  const result = await db.execute({
    sql: "SELECT id, title FROM articles WHERE date = ?",
    args: [date]
  });
  const target = normalizedTitle(title);
  return result.rows.some((row) => normalizedTitle(String(row.title ?? "")) === target);
}

function normalizeTopicTokens(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2)
    .slice(0, 8);
}

function topicKey(article: Article): string {
  const track = article.tags[0] ?? "宏观";
  const tokens = normalizeTopicTokens(article.title);
  return `${track}:${tokens.slice(0, 5).join("-")}`;
}

function selectDigestArticles(articles: Article[], slot: PushSlot): DigestSelection {
  const eligible = articles
    .sort((left, right) => {
      if (right.recommendLevel !== left.recommendLevel) {
        return right.recommendLevel - left.recommendLevel;
      }
      return right.createdAt.localeCompare(left.createdAt);
    });

  if (eligible.length === 0) {
    return {
      selected: [],
      message: `${slot === "morning" ? "早报" : "晚报"}跳过：没有可推送的新内容。`
    };
  }

  const seenTopics = new Set<string>();
  const selected: Article[] = [];

  for (const article of eligible) {
    const key = topicKey(article);
    if (seenTopics.has(key)) {
      continue;
    }

    selected.push(article);
    seenTopics.add(key);
  }

  if (selected.length === 0) {
    return {
      selected: [],
      message: `${slot === "morning" ? "早报" : "晚报"}跳过：内容重复度过高，没有值得单独推送的主题。`
    };
  }

  const trackSummary = [...new Set(selected.map((article) => article.tags[0] ?? "宏观"))].join(" / ");
  return {
    selected,
    message: `${slot === "morning" ? "早报" : "晚报"}已生成：${selected.length} 条，聚焦 ${trackSummary}。`
  };
}

export async function ingestArticles(slot: PushSlot): Promise<{ collected: number; inserted: number; pushed: number }> {
  await initSchema();
  const rawItems = (
    await Promise.all([
      fetchNewsApi().catch((e) => (console.warn("[newsapi]", (e as Error).message), [])),
      fetchGoogleNewsRss().catch((e) => (console.warn("[google-rss]", (e as Error).message), [])),
      fetchArxiv().catch((e) => (console.warn("[arxiv]", (e as Error).message), [])),
      fetchNewsnow().catch((e) => (console.warn("[newsnow]", (e as Error).message), [])),
      fetchXTwitter().catch((e) => (console.warn("[x-twitter]", (e as Error).message), []))
    ])
  ).flat();
  const collectedItems = rawItems.filter(
    (item) => item.url && item.title && isRecentPublishedAt(item.publishedAt) && isAllowedIngestItem(item)
  );

  let inserted = 0;
  for (const item of collectedItems) {
    if (await existsByUrl(item.url)) continue;
    const analysis = await analyzeWithClaude(item);
    if (await existsByNormalizedTitle(item.title, todayDateString())) continue;
    if (!isHighQualityCandidate(item, analysis)) continue;
    await insertArticle(item, analysis);
    inserted += 1;
  }

  const today = todayDateString();
  const pushable = await getPushableArticles(today);
  const digest = selectDigestArticles(pushable, slot);
  for (const article of digest.selected) {
    await markArticlePushed(article.id, slot);
  }

  const result = {
    collected: collectedItems.length,
    inserted,
    pushed: digest.selected.length
  };

  await createUpdateRun({
    slot,
    status: "success",
    collected: result.collected,
    inserted: result.inserted,
    pushed: result.pushed,
    message: digest.message,
    runAt: new Date().toISOString()
  });

  return result;
}
