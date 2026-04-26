import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { createClient } from "@libsql/client";
import { loadEnvConfig } from "@next/env";
import type {
  Briefing,
  BriefingInsertInput,
  FeedEntry,
  FeedFilters,
  FeedInsertInput
} from "@/lib/feed-types";
import { formatReadingTime } from "@/lib/format";
import { mockBriefing, mockFeedEntries } from "@/lib/mock-data";
import type { Article, Lesson, ObiCard, UpdateRun } from "@/lib/types";

loadEnvConfig(process.cwd());

type DatabaseHandle = Database.Database;

type FeedRow = {
  id: string;
  source: string;
  category: string;
  priority: string;
  title: string;
  summary: string;
  content: string | null;
  url: string | null;
  tags: string | null;
  confidence: number | null;
  created_at: string;
  is_read: number;
};

type BriefingRow = {
  id: string;
  macro_track: string;
  market_track: string;
  sentiment_track: string;
  risk_level: string;
  vix: number | null;
  fear_greed: number | null;
  tnx: number | null;
  created_at: string;
};

type ArticleRow = {
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
  pushed_at: string | null;
  pushed_morning_at: string | null;
  pushed_evening_at: string | null;
  created_at: string;
  read_at: string | null;
};

type ObiCardRow = {
  id: number;
  card_id: string;
  content: string;
  domain: ObiCard["domain"];
  layer: ObiCard["layer"];
  source: string;
  date: string;
};

type LessonRow = {
  id: number;
  date: string;
  concept: string;
  explanation: string;
  example: string;
  source: string;
};

function pickEnv(...values: Array<string | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

export const db = createClient({
  url: pickEnv(process.env.TURSO_DATABASE_URL, process.env.LIBSQL_URL) ?? `file:${path.join(process.cwd(), "data", "obi.db")}`,
  authToken: pickEnv(process.env.TURSO_AUTH_TOKEN, process.env.LIBSQL_AUTH_TOKEN) ?? undefined
});

declare global {
  // eslint-disable-next-line no-var
  var __zeroReaderDb: DatabaseHandle | undefined;
}

function getDatabasePath() {
  const configuredPath =
    process.env.DB_PATH ?? process.env.DATABASE_PATH ?? "./data/zero.db";

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(process.cwd(), configuredPath);
}

function ensureDirectory(filePath: string) {
  const directory = path.dirname(filePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function getDb() {
  if (!global.__zeroReaderDb) {
    const dbPath = getDatabasePath();
    ensureDirectory(dbPath);
    global.__zeroReaderDb = new Database(dbPath);
    createSchema(global.__zeroReaderDb);
    seedDatabase(global.__zeroReaderDb);
  }

  return global.__zeroReaderDb;
}

function createSchema(db: DatabaseHandle) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS feed (
      id TEXT PRIMARY KEY,
      source TEXT,
      category TEXT,
      priority TEXT,
      title TEXT,
      summary TEXT,
      content TEXT,
      url TEXT,
      tags TEXT,
      confidence REAL,
      created_at TEXT,
      is_read INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS briefing (
      id TEXT PRIMARY KEY,
      macro_track TEXT,
      market_track TEXT,
      sentiment_track TEXT,
      risk_level TEXT,
      vix REAL,
      fear_greed REAL,
      tnx REAL,
      created_at TEXT
    );
  `);
}

function toFeedEntry(row: FeedRow): FeedEntry {
  return {
    id: row.id,
    source: row.source as FeedEntry["source"],
    category: row.category as FeedEntry["category"],
    priority: row.priority as FeedEntry["priority"],
    title: row.title,
    summary: row.summary,
    content: row.content,
    url: row.url,
    tags: row.tags ? JSON.parse(row.tags) : [],
    confidence: row.confidence,
    createdAt: row.created_at,
    isRead: Boolean(row.is_read),
    readingTime: formatReadingTime(row.content)
  };
}

function toBriefing(row: BriefingRow): Briefing {
  return {
    id: row.id,
    macroTrack: row.macro_track,
    marketTrack: row.market_track,
    sentimentTrack: row.sentiment_track,
    riskLevel: row.risk_level as Briefing["riskLevel"],
    vix: row.vix,
    fearGreed: row.fear_greed,
    tnx: row.tnx,
    createdAt: row.created_at
  };
}

function parseTags(raw: string | null | undefined): string[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function toArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    title: row.title,
    titleZh: row.title_zh,
    url: row.url,
    source: row.source,
    date: row.date,
    publishedAt: row.published_at,
    tags: parseTags(row.tags),
    zeroEval: row.zero_eval,
    summary: row.summary,
    recommendLevel: row.recommend_level,
    obiRef: row.obi_ref,
    analysis: null,
    pushedAt: row.pushed_at,
    pushedMorningAt: row.pushed_morning_at,
    pushedEveningAt: row.pushed_evening_at,
    createdAt: row.created_at,
    readAt: row.read_at
  };
}

function toObiCard(row: ObiCardRow): ObiCard {
  return {
    id: row.id,
    cardId: row.card_id,
    content: row.content,
    domain: row.domain,
    layer: row.layer,
    source: row.source,
    date: row.date
  };
}

function toLesson(row: LessonRow): Lesson {
  return {
    id: row.id,
    date: row.date,
    concept: row.concept,
    explanation: row.explanation,
    example: row.example,
    source: row.source
  };
}

export async function initSchema() {
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
          pushed_at TEXT,
          pushed_morning_at TEXT,
          pushed_evening_at TEXT,
          created_at TEXT NOT NULL,
          read_at TEXT
        )`,
        args: []
      },
      {
        sql: `CREATE TABLE IF NOT EXISTS obi_cards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          card_id TEXT NOT NULL,
          content TEXT NOT NULL,
          domain TEXT NOT NULL,
          layer TEXT NOT NULL,
          source TEXT NOT NULL,
          date TEXT NOT NULL
        )`,
        args: []
      },
      {
        sql: `CREATE TABLE IF NOT EXISTS lessons (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          concept TEXT NOT NULL,
          explanation TEXT NOT NULL,
          example TEXT NOT NULL,
          source TEXT NOT NULL
        )`,
        args: []
      },
      {
        sql: `CREATE TABLE IF NOT EXISTS update_runs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          slot TEXT NOT NULL,
          status TEXT NOT NULL,
          collected INTEGER NOT NULL,
          inserted INTEGER NOT NULL,
          pushed INTEGER NOT NULL,
          message TEXT NOT NULL,
          run_at TEXT NOT NULL
        )`,
        args: []
      }
    ],
    "write"
  );
}

export async function getTodayUnreadArticles(date: string): Promise<Article[]> {
  await initSchema();
  const result = await db.execute({
    sql: `SELECT id, title, title_zh, url, source, date, published_at, tags, zero_eval, summary,
      recommend_level, obi_ref, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
      FROM articles
      WHERE date = ? AND read_at IS NULL
      ORDER BY recommend_level DESC, created_at DESC`,
    args: [date]
  });

  return result.rows.map((row) => toArticle(row as unknown as ArticleRow));
}

export async function createArticle(input: {
  title: string;
  url: string;
  source: string;
  date: string;
  tags: string[];
  zeroEval: string;
  summary: string;
  recommendLevel: number;
  obiRef: string;
  pushedAt?: string | null;
  pushedMorningAt?: string | null;
  pushedEveningAt?: string | null;
}): Promise<Article> {
  await initSchema();
  const createdAt = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO articles (
      title, title_zh, url, source, date, published_at, tags, zero_eval, summary,
      recommend_level, obi_ref, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
    ) VALUES (?, NULL, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`,
    args: [
      input.title,
      input.url,
      input.source,
      input.date,
      JSON.stringify(input.tags),
      input.zeroEval,
      input.summary,
      input.recommendLevel,
      input.obiRef,
      input.pushedAt ?? null,
      input.pushedMorningAt ?? null,
      input.pushedEveningAt ?? null,
      createdAt
    ]
  });

  const result = await db.execute({
    sql: `SELECT id, title, title_zh, url, source, date, published_at, tags, zero_eval, summary,
      recommend_level, obi_ref, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
      FROM articles
      WHERE url = ?
      LIMIT 1`,
    args: [input.url]
  });

  const row = result.rows[0];
  if (!row) {
    throw new Error("Failed to create article");
  }

  return toArticle(row as unknown as ArticleRow);
}

export async function markArticleRead(id: number): Promise<Article | null> {
  await initSchema();
  const readAt = new Date().toISOString();

  await db.execute({
    sql: "UPDATE articles SET read_at = ? WHERE id = ?",
    args: [readAt, id]
  });

  const result = await db.execute({
    sql: `SELECT id, title, title_zh, url, source, date, published_at, tags, zero_eval, summary,
      recommend_level, obi_ref, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
      FROM articles
      WHERE id = ?
      LIMIT 1`,
    args: [id]
  });

  const row = result.rows[0];
  return row ? toArticle(row as unknown as ArticleRow) : null;
}

export async function getPushableArticles(date: string): Promise<Article[]> {
  await initSchema();
  const result = await db.execute({
    sql: `SELECT id, title, title_zh, url, source, date, published_at, tags, zero_eval, summary,
      recommend_level, obi_ref, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
      FROM articles
      WHERE date = ? AND pushed_at IS NULL
      ORDER BY recommend_level DESC, created_at DESC`,
    args: [date]
  });

  return result.rows.map((row) => toArticle(row as unknown as ArticleRow));
}

export async function markArticlePushed(
  id: number,
  slot: UpdateRun["slot"]
): Promise<Article | null> {
  await initSchema();
  const pushedAt = new Date().toISOString();
  const slotColumn = slot === "evening" ? "pushed_evening_at" : "pushed_morning_at";

  await db.execute({
    sql: `UPDATE articles SET pushed_at = ?, ${slotColumn} = ? WHERE id = ?`,
    args: [pushedAt, pushedAt, id]
  });

  const result = await db.execute({
    sql: `SELECT id, title, title_zh, url, source, date, published_at, tags, zero_eval, summary,
      recommend_level, obi_ref, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
      FROM articles
      WHERE id = ?
      LIMIT 1`,
    args: [id]
  });

  const row = result.rows[0];
  return row ? toArticle(row as unknown as ArticleRow) : null;
}

export async function createUpdateRun(input: Omit<UpdateRun, "id">): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `INSERT INTO update_runs (slot, status, collected, inserted, pushed, message, run_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [input.slot, input.status, input.collected, input.inserted, input.pushed, input.message, input.runAt]
  });
}

export async function getTodayObiCard(date: string): Promise<ObiCard | null> {
  await initSchema();
  const result = await db.execute({
    sql: `SELECT id, card_id, content, domain, layer, source, date
      FROM obi_cards
      WHERE date = ?
      ORDER BY id DESC
      LIMIT 1`,
    args: [date]
  });

  const row = result.rows[0];
  return row ? toObiCard(row as unknown as ObiCardRow) : null;
}

export async function getLessonByDate(date: string): Promise<Lesson | null> {
  await initSchema();
  const result = await db.execute({
    sql: `SELECT id, date, concept, explanation, example, source
      FROM lessons
      WHERE date = ?
      ORDER BY id DESC
      LIMIT 1`,
    args: [date]
  });

  const row = result.rows[0];
  return row ? toLesson(row as unknown as LessonRow) : null;
}

function seedDatabase(db: DatabaseHandle) {
  const feedCount = db.prepare("SELECT COUNT(*) as count FROM feed").get() as {
    count: number;
  };
  const briefingCount = db
    .prepare("SELECT COUNT(*) as count FROM briefing")
    .get() as { count: number };

  if (feedCount.count === 0) {
    const insertFeed = db.prepare(`
      INSERT INTO feed (
        id, source, category, priority, title, summary, content, url, tags, confidence, created_at, is_read
      ) VALUES (
        @id, @source, @category, @priority, @title, @summary, @content, @url, @tags, @confidence, @created_at, 0
      )
    `);

    const insertMany = db.transaction((entries: FeedInsertInput[]) => {
      for (const entry of entries) {
        insertFeed.run({
          id: entry.id ?? crypto.randomUUID(),
          source: entry.source,
          category: entry.category,
          priority: entry.priority,
          title: entry.title,
          summary: entry.summary,
          content: entry.content ?? null,
          url: entry.url ?? null,
          tags: JSON.stringify(entry.tags ?? []),
          confidence: entry.confidence ?? null,
          created_at:
            entry.timestamp ?? entry.created_at ?? new Date().toISOString()
        });
      }
    });

    insertMany(mockFeedEntries);
  }

  if (briefingCount.count === 0) {
    db.prepare(`
      INSERT INTO briefing (
        id, macro_track, market_track, sentiment_track, risk_level, vix, fear_greed, tnx, created_at
      ) VALUES (
        @id, @macro_track, @market_track, @sentiment_track, @risk_level, @vix, @fear_greed, @tnx, @created_at
      )
    `).run({
      id: crypto.randomUUID(),
      ...mockBriefing,
      created_at: mockBriefing.timestamp
    });
  }
}

export function listFeed(filters: FeedFilters = {}) {
  const db = getDb();
  const conditions: string[] = [];
  const params: Record<string, string | number> = {};

  if (filters.category) {
    conditions.push("category = @category");
    params.category = filters.category;
  }

  if (filters.priority) {
    conditions.push("priority = @priority");
    params.priority = filters.priority;
  }

  let query = "SELECT * FROM feed";

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query +=
    " ORDER BY CASE priority WHEN 'FLASH' THEN 0 WHEN 'PRIORITY' THEN 1 ELSE 2 END, datetime(created_at) DESC";

  if (filters.limit) {
    query += " LIMIT @limit";
    params.limit = filters.limit;
  }

  if (typeof filters.offset === "number" && filters.offset > 0) {
    query += " OFFSET @offset";
    params.offset = filters.offset;
  }

  const rows = db.prepare(query).all(params) as FeedRow[];
  return rows.map(toFeedEntry);
}

export function getFeedByTags(tags: string[], limit = 20) {
  if (tags.length === 0) {
    return [];
  }

  const params: Record<string, string | number> = { limit };
  const conditions = tags.map((_, index) => {
    params[`tag${index}`] = `%${tags[index]}%`;
    return `COALESCE(tags, '') LIKE @tag${index}`;
  });

  const rows = getDb()
    .prepare(
      `SELECT * FROM feed
       WHERE ${conditions.join(" OR ")}
       ORDER BY datetime(created_at) DESC
       LIMIT @limit`
    )
    .all(params) as FeedRow[];

  return rows.map(toFeedEntry);
}

export function getFeedById(id: string) {
  const row = getDb()
    .prepare("SELECT * FROM feed WHERE id = ?")
    .get(id) as FeedRow | undefined;

  return row ? toFeedEntry(row) : null;
}

export function markFeedAsRead(id: string) {
  getDb()
    .prepare("UPDATE feed SET is_read = 1 WHERE id = ?")
    .run(id);
}

export function listDeepArticles(limit = 6) {
  return listFeed({ category: "deep", limit }).filter((item) => item.content);
}

export function getLatestBriefing() {
  const row = getDb()
    .prepare("SELECT * FROM briefing ORDER BY datetime(created_at) DESC LIMIT 1")
    .get() as BriefingRow | undefined;

  return row ? toBriefing(row) : null;
}

export function feedExistsByTitle(title: string, hoursAgo = 48): boolean {
  const cutoff = new Date(Date.now() - hoursAgo * 3600000).toISOString();
  const row = getDb()
    .prepare(`SELECT id FROM feed WHERE title = ? AND created_at > ? LIMIT 1`)
    .get(title, cutoff) as { id: string } | undefined;
  return !!row;
}

export function createFeedEntry(input: FeedInsertInput) {
  const id = input.id ?? crypto.randomUUID();

  getDb()
    .prepare(`
      INSERT INTO feed (
        id, source, category, priority, title, summary, content, url, tags, confidence, created_at, is_read
      ) VALUES (
        @id, @source, @category, @priority, @title, @summary, @content, @url, @tags, @confidence, @created_at, 0
      )
    `)
    .run({
      id,
      source: input.source,
      category: input.category,
      priority: input.priority,
      title: input.title,
      summary: input.summary,
      content: input.content ?? null,
      url: input.url ?? null,
      tags: JSON.stringify(input.tags ?? []),
      confidence: input.confidence ?? null,
      created_at: input.timestamp ?? input.created_at ?? new Date().toISOString()
    });

  return getFeedById(id);
}

export function createBriefing(input: BriefingInsertInput) {
  const id = input.id ?? crypto.randomUUID();

  getDb()
    .prepare(`
      INSERT INTO briefing (
        id, macro_track, market_track, sentiment_track, risk_level, vix, fear_greed, tnx, created_at
      ) VALUES (
        @id, @macro_track, @market_track, @sentiment_track, @risk_level, @vix, @fear_greed, @tnx, @created_at
      )
    `)
    .run({
      id,
      ...input,
      created_at: input.timestamp ?? input.created_at ?? new Date().toISOString()
    });

  return getLatestBriefing();
}

export function getRelatedSignals(entry: FeedEntry, limit = 3) {
  return listFeed({ category: entry.category, limit: limit + 1 })
    .filter((item) => item.id !== entry.id)
    .slice(0, limit);
}

export const getFeed = listFeed;
export const markRead = markFeedAsRead;
export const insertFeed = createFeedEntry;
export const insertBriefing = createBriefing;
export const seedMockData = () => {
  getDb();
};
