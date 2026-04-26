import nextEnv from "@next/env";
import { createClient } from "@libsql/client";
import path from "path";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

function pickEnv(...values) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

const db = createClient({
  url: pickEnv(process.env.TURSO_DATABASE_URL, process.env.LIBSQL_URL) ?? `file:${path.join(process.cwd(), "data", "obi.db")}`,
  authToken: pickEnv(process.env.TURSO_AUTH_TOKEN, process.env.LIBSQL_AUTH_TOKEN) ?? undefined
});

const baseDate = new Date();

function dateOffset(days) {
  const value = new Date(baseDate);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

const obiCards = [
  ["bf-001", "确认偏误会让你主动搜集支持自己仓位的证据，并把反例当噪音过滤掉。", "行为金融"],
  ["bf-002", "损失厌恶会让你在该止损时犹豫，在该加仓时反而恐惧。", "行为金融"],
  ["bf-003", "锚定效应会让你把历史高点、买入价或某个旧估值当成天然坐标。", "行为金融"],
  ["bf-004", "技术突破不等于产业兑现，先看复现、订单和资本开支，再谈估值重估。", "五经"],
  ["bf-005", "长周期赛道要分清政策表态、项目审批、融资落地和设备订单四个层次。", "五经"],
  ["bf-006", "叙事越热，越要先找最早能证伪它的数据点，而不是继续补情绪。", "五经"],
  ["bf-007", "市场奖励的不是知道得早，而是知道后还能分清哪部分能进利润表。", "五经"],
  ["bf-008", "当一个主题开始跨资产共振时，要先判断是风险溢价变化，还是基本面变化。", "五经"],
  ["bf-009", "好框架不是帮你证明自己正确，而是帮你尽快发现自己错在哪里。", "行为金融"],
  ["bf-010", "地缘风险先影响风险溢价，只有持续到供给和现金流层面，才会进入长期主线。", "五经"],
  ["bf-011", "不要把高频消息当结论，把它当作更新概率分布的输入。", "行为金融"],
  ["bf-012", "真正能和 AI 一起进步的人，不是问得多，而是每次都能把答案写回自己的判断框架。", "通用"]
];

let inserted = 0;

for (const [index, [cardId, content, source]] of obiCards.entries()) {
  const date = dateOffset(index);
  const exists = await db.execute({
    sql: "SELECT id FROM obi_cards WHERE date = ? LIMIT 1",
    args: [date]
  });
  if (exists.rows.length > 0) {
    continue;
  }

  await db.execute({
    sql: `INSERT INTO obi_cards (card_id, content, domain, layer, source, date)
      VALUES (?, ?, ?, ?, ?, ?)`,
    args: [cardId, content, "通用", "01_BODY", source, date]
  });
  inserted += 1;
}

console.log(`inserted=${inserted}`);
