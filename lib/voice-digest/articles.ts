import { createClient, type Client, type Row } from "@libsql/client";
import path from "node:path";

import { sortArticlesByQuality } from "@/lib/article-quality";
import type { Article } from "@/lib/types";

function pickEnv(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

function getClient(): Client {
  const url = pickEnv(process.env.TURSO_DATABASE_URL, process.env.LIBSQL_URL) ?? `file:${path.join(process.cwd(), "data", "obi.db")}`;
  const authToken = pickEnv(process.env.TURSO_AUTH_TOKEN, process.env.LIBSQL_AUTH_TOKEN);
  return createClient(authToken ? { url, authToken } : { url });
}

interface ArticleRow extends Row {
  id: number;
  title: string;
  title_zh: string | null;
  url: string;
  source: string;
  date: string;
  published_at: string | null;
  tags: string;
  zero_eval: string;
  summary: string;
  recommend_level: number;
  obi_ref: string;
  analysis_json: string | null;
  pushed_at: string | null;
  pushed_morning_at: string | null;
  pushed_evening_at: string | null;
  created_at: string;
  read_at: string | null;
}

function parseAnalysis(raw: string | null): Article["analysis"] {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw) as Record<string, unknown>;
    return {
      eventNature: String(obj.eventNature ?? ""),
      keyVariable: String(obj.keyVariable ?? ""),
      transmission: String(obj.transmission ?? ""),
      trap: String(obj.trap ?? ""),
      falsifyPoint: String(obj.falsifyPoint ?? ""),
      profitOutlet: String(obj.profitOutlet ?? ""),
      bull: String(obj.bull ?? ""),
      bear: String(obj.bear ?? "")
    };
  } catch {
    return null;
  }
}

function parseTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function mapArticle(row: Row): Article {
  const typedRow = row as unknown as ArticleRow;
  return {
    id: typedRow.id,
    title: typedRow.title,
    titleZh: typedRow.title_zh,
    url: typedRow.url,
    source: typedRow.source,
    date: typedRow.date,
    publishedAt: typedRow.published_at,
    tags: parseTags(typedRow.tags),
    zeroEval: typedRow.zero_eval,
    summary: typedRow.summary,
    recommendLevel: typedRow.recommend_level,
    obiRef: typedRow.obi_ref,
    analysis: parseAnalysis(typedRow.analysis_json),
    pushedAt: typedRow.pushed_at,
    pushedMorningAt: typedRow.pushed_morning_at,
    pushedEveningAt: typedRow.pushed_evening_at,
    createdAt: typedRow.created_at,
    readAt: typedRow.read_at
  };
}

async function fetchArticlesByDate(client: Client, date: string): Promise<Article[]> {
  const result = await client.execute({
    sql: `SELECT *
      FROM articles
      WHERE date = ? AND read_at IS NULL AND source != 'GitHub Trending'
      ORDER BY recommend_level DESC, created_at DESC`,
    args: [date]
  });
  return sortArticlesByQuality(result.rows.map(mapArticle));
}

export async function getVoiceDigestCandidateArticles(today: string): Promise<Article[]> {
  const client = getClient();
  const todayArticles = await fetchArticlesByDate(client, today);
  if (todayArticles.length > 0) {
    return todayArticles;
  }

  const fallbackDateResult = await client.execute({
    sql: `SELECT date
      FROM articles
      WHERE read_at IS NULL AND source != 'GitHub Trending'
      ORDER BY date DESC
      LIMIT 1`
  });
  const fallbackDate = fallbackDateResult.rows.at(0)?.date;
  if (typeof fallbackDate !== "string") {
    return [];
  }

  return fetchArticlesByDate(client, fallbackDate);
}
