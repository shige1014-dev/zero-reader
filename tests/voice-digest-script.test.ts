import test from "node:test";
import assert from "node:assert/strict";

import { buildFallbackVoiceDigestScript, parseVoiceDigestJson } from "@/lib/voice-digest/script";
import type { Article } from "@/lib/types";

function makeArticle(overrides: Partial<Article>): Article {
  return {
    id: 1,
    title: "TSMC capacity update",
    titleZh: "台积电产能更新",
    url: "https://example.com/tsmc",
    source: "Reuters",
    date: "2026-04-21",
    publishedAt: "2026-04-21T08:00:00.000Z",
    tags: ["AI芯片"],
    zeroEval: "真正要听的是先进封装产能是否继续限制 AI 芯片交付，而不是单条新闻热度。",
    summary: "台积电先进封装产能继续被市场关注，AI 芯片交付节奏仍是核心变量。",
    recommendLevel: 4,
    obiRef: "bf-001",
    analysis: {
      eventNature: "供应约束信号",
      keyVariable: "先进封装扩产速度",
      transmission: "产能限制影响芯片交付，进一步影响云厂商资本开支预期",
      trap: "把扩产计划当成立刻释放的收入",
      falsifyPoint: "交付周期没有改善",
      profitOutlet: "先进封装收入",
      bull: "扩产继续兑现",
      bear: "需求先于产能降温"
    },
    pushedAt: null,
    pushedMorningAt: null,
    pushedEveningAt: null,
    createdAt: "2026-04-21T08:00:00.000Z",
    readAt: null,
    ...overrides
  };
}

test("parseVoiceDigestJson accepts fenced strict JSON", () => {
  const parsed = parseVoiceDigestJson(`\`\`\`json
{
  "title": "零零短播客",
  "script": "今天先看一个核心变量。",
  "caption": "零零短播客 · 1 条"
}
\`\`\``);

  assert.equal(parsed.title, "零零短播客");
  assert.equal(parsed.script, "今天先看一个核心变量。");
  assert.equal(parsed.caption, "零零短播客 · 1 条");
});

test("parseVoiceDigestJson rejects malformed script payload", () => {
  assert.throws(
    () => parseVoiceDigestJson("{\"title\":\"x\",\"script\":\"\",\"caption\":\"x\"}"),
    /Invalid voice digest script/
  );
});

test("buildFallbackVoiceDigestScript includes article facts and listening structure", () => {
  const script = buildFallbackVoiceDigestScript([makeArticle({ id: 7 })], "2026-04-21");

  assert.equal(script.title, "零零每日短播客 2026-04-21");
  assert.match(script.caption, /1 条核心摘要/);
  assert.match(script.script, /今天先抓一个主判断/);
  assert.match(script.script, /台积电产能更新/);
  assert.match(script.script, /最容易听错/);
  assert.match(script.script, /接下来盯/);
});
