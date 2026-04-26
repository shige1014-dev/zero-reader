import { createClient } from "@libsql/client";
import nextEnv from "@next/env";
import path from "path";

import { resolveSyncDate } from "@/lib/sync-cloud";

const { loadEnvConfig } = nextEnv;

export interface CloudSyncResult {
  articleCount: number;
  obiCount: number;
  lessonCount: number;
  syncDate: string | null;
}

function pickEnv(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

function localToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

export async function syncCloudToday(opts?: { envDir?: string }): Promise<CloudSyncResult> {
  loadEnvConfig(opts?.envDir ?? process.cwd());

  const localDb = createClient({
    url: `file:${path.join(process.cwd(), "data", "obi.db")}`
  });

  const remoteUrl = pickEnv(process.env.TURSO_DATABASE_URL);
  const remoteToken = pickEnv(process.env.TURSO_AUTH_TOKEN);

  if (!remoteUrl) {
    throw new Error("Missing TURSO_DATABASE_URL for cloud sync");
  }

  const remoteDb = createClient(
    remoteToken
      ? { url: remoteUrl, authToken: remoteToken }
      : { url: remoteUrl }
  );

  async function ensureRemoteSchema() {
    await remoteDb.batch(
      [
        {
          sql: `CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            title_zh TEXT,
            url TEXT NOT NULL UNIQUE,
            source TEXT NOT NULL,
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
        }
      ],
      "write"
    );
  }

  async function getLocalSyncDate(): Promise<string | null> {
    const result = await localDb.execute({
      sql: "SELECT DISTINCT date FROM articles ORDER BY date DESC"
    });
    return resolveSyncDate(
      localToday(),
      result.rows.map((row) => String(row.date)).filter((value) => value && value !== "null")
    );
  }

  async function syncArticles(syncDate: string | null): Promise<number> {
    if (!syncDate) {
      return 0;
    }

    const result = await localDb.execute({
      sql: `SELECT title, title_zh, url, source, date, published_at, tags, zero_eval, summary, recommend_level, obi_ref, pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
        FROM articles
        WHERE date = ?
        ORDER BY recommend_level DESC, id DESC`,
      args: [syncDate]
    });

    await remoteDb.execute({
      sql: "DELETE FROM articles WHERE date = ?",
      args: [syncDate]
    });

    for (const row of result.rows) {
      await remoteDb.execute({
        sql: "DELETE FROM articles WHERE url = ?",
        args: [row.url]
      });
      await remoteDb.execute({
        sql: `INSERT INTO articles (
          title, title_zh, url, source, date, published_at, tags, zero_eval, summary, recommend_level, obi_ref,
          pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          row.title,
          row.title_zh ?? null,
          row.url,
          row.source,
          row.date,
          row.published_at ?? null,
          row.tags,
          row.zero_eval,
          row.summary,
          row.recommend_level,
          row.obi_ref,
          row.pushed_at ?? null,
          row.pushed_morning_at ?? null,
          row.pushed_evening_at ?? null,
          row.created_at,
          row.read_at ?? null
        ]
      });
    }

    return result.rows.length;
  }

  async function syncObiCard(syncDate: string | null): Promise<number> {
    if (!syncDate) {
      return 0;
    }

    const result = await localDb.execute({
      sql: "SELECT card_id, content, domain, layer, source, date FROM obi_cards WHERE date = ? ORDER BY id DESC LIMIT 1",
      args: [syncDate]
    });
    const row = result.rows.at(0);
    if (!row) {
      return 0;
    }

    await remoteDb.execute({ sql: "DELETE FROM obi_cards WHERE date = ?", args: [syncDate] });
    await remoteDb.execute({
      sql: "INSERT INTO obi_cards (card_id, content, domain, layer, source, date) VALUES (?, ?, ?, ?, ?, ?)",
      args: [row.card_id, row.content, row.domain, row.layer, row.source, row.date]
    });
    return 1;
  }

  async function syncLesson(syncDate: string | null): Promise<number> {
    if (!syncDate) {
      return 0;
    }

    const result = await localDb.execute({
      sql: "SELECT date, concept, explanation, example, source FROM lessons WHERE date = ? ORDER BY id DESC LIMIT 1",
      args: [syncDate]
    });
    const row = result.rows.at(0);
    if (!row) {
      return 0;
    }

    await remoteDb.execute({ sql: "DELETE FROM lessons WHERE date = ?", args: [syncDate] });
    await remoteDb.execute({
      sql: "INSERT INTO lessons (date, concept, explanation, example, source) VALUES (?, ?, ?, ?, ?)",
      args: [row.date, row.concept, row.explanation, row.example, row.source]
    });
    return 1;
  }

  await ensureRemoteSchema();
  const syncDate = await getLocalSyncDate();
  const [articleCount, obiCount, lessonCount] = await Promise.all([
    syncArticles(syncDate),
    syncObiCard(syncDate),
    syncLesson(syncDate)
  ]);

  return { articleCount, obiCount, lessonCount, syncDate };
}
