import nextEnv from "@next/env";
import { createClient } from "@libsql/client";
import path from "path";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

function pickEnv(...values) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

function containsChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

function clip(text, max) {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

const db = createClient({
  url: pickEnv(process.env.TURSO_DATABASE_URL, process.env.LIBSQL_URL) ?? `file:${path.join(process.cwd(), "data", "obi.db")}`,
  authToken: pickEnv(process.env.TURSO_AUTH_TOKEN, process.env.LIBSQL_AUTH_TOKEN) ?? undefined
});

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());

async function translateTitle(title, summary) {
  if (containsChinese(title)) {
    return title;
  }
  if (!ANTHROPIC_API_KEY) {
    return clip(title, 34);
  }

  const prompt = `请把下面新闻标题翻成自然、简洁的中文标题，控制在24字以内，只输出标题本身，不要加引号或解释。

原标题：${title}
摘要：${clip(summary || title, 240)}
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
      max_tokens: 120,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    return clip(title, 34);
  }

  const payload = await response.json();
  const text = payload.content?.[0]?.text;
  return typeof text === "string" ? clip(text.replace(/^```[\s\S]*?\n/, "").replace(/```$/, "").trim(), 34) : clip(title, 34);
}

const result = await db.execute({
  sql: `SELECT id, title, summary
    FROM articles
    WHERE date = ? AND (title_zh IS NULL OR title_zh = '')
    ORDER BY id DESC
    LIMIT 30`,
  args: [today]
});

let updated = 0;
for (const row of result.rows) {
  const titleZh = await translateTitle(String(row.title ?? ""), String(row.summary ?? ""));
  await db.execute({
    sql: "UPDATE articles SET title_zh = ? WHERE id = ?",
    args: [titleZh, row.id]
  });
  updated += 1;
}

console.log(`updated=${updated}`);
