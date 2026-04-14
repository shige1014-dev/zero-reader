import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import type {
  Briefing,
  BriefingInsertInput,
  FeedEntry,
  FeedFilters,
  FeedInsertInput
} from "@/lib/feed-types";
import { formatReadingTime } from "@/lib/format";
import { mockBriefing, mockFeedEntries } from "@/lib/mock-data";

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
