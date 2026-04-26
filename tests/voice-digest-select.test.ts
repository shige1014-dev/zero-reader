import test from "node:test";
import assert from "node:assert/strict";

import { selectVoiceDigestArticles } from "@/lib/voice-digest/select";
import type { Article } from "@/lib/types";

function makeArticle(overrides: Partial<Article>): Article {
  return {
    id: 1,
    title: "Nvidia supply chain update",
    titleZh: "英伟达供应链更新",
    url: "https://example.com/article",
    source: "Reuters",
    date: "2026-04-21",
    publishedAt: "2026-04-21T08:00:00.000Z",
    tags: ["AI芯片"],
    zeroEval: "这条信息的关键在于订单兑现速度和毛利率是否同步改善，而不是标题里的短期涨跌。",
    summary: "英伟达供应链出现新订单信号，市场关注资本开支和交付节奏。",
    recommendLevel: 4,
    obiRef: "bf-001",
    analysis: {
      eventNature: "订单兑现信号",
      keyVariable: "交付节奏和毛利率",
      transmission: "供应链订单变化影响市场对算力资本开支的预期",
      trap: "把供应链传闻当成确定收入",
      falsifyPoint: "后续财报没有订单或毛利改善",
      profitOutlet: "数据中心收入和毛利率",
      bull: "订单继续释放",
      bear: "资本开支放缓"
    },
    pushedAt: null,
    pushedMorningAt: null,
    pushedEveningAt: null,
    createdAt: "2026-04-21T08:00:00.000Z",
    readAt: null,
    ...overrides
  };
}

test("selectVoiceDigestArticles excludes GitHub Trending and caps at three", () => {
  const selected = selectVoiceDigestArticles([
    makeArticle({ id: 1, source: "GitHub Trending", recommendLevel: 5 }),
    makeArticle({ id: 2, title: "A", recommendLevel: 5 }),
    makeArticle({ id: 3, title: "B", recommendLevel: 4 }),
    makeArticle({ id: 4, title: "C", recommendLevel: 4 }),
    makeArticle({ id: 5, title: "D", recommendLevel: 4 })
  ]);

  assert.equal(selected.length, 3);
  assert.equal(
    selected.some((article) => article.source === "GitHub Trending"),
    false
  );
});

test("selectVoiceDigestArticles prefers rich analysis over template commentary", () => {
  const templated = makeArticle({
    id: 10,
    title: "Macro heat rises",
    titleZh: "宏观热度升温",
    tags: ["宏观"],
    recommendLevel: 5,
    zeroEval: "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。",
    summary: "宏观热度升温",
    analysis: null
  });
  const rich = makeArticle({
    id: 11,
    recommendLevel: 4,
    createdAt: "2026-04-21T09:00:00.000Z"
  });

  const selected = selectVoiceDigestArticles([templated, rich], 1);

  assert.equal(selected[0]?.id, 11);
});

test("selectVoiceDigestArticles reduces duplicate topic keys", () => {
  const first = makeArticle({
    id: 20,
    title: "Nvidia AI chip orders expand",
    tags: ["AI芯片"],
    recommendLevel: 5
  });
  const duplicate = makeArticle({
    id: 21,
    title: "Nvidia AI chip orders expand again",
    tags: ["AI芯片"],
    recommendLevel: 4
  });
  const other = makeArticle({
    id: 22,
    title: "Uranium contract prices move higher",
    titleZh: "铀合约价格走高",
    tags: ["核能"],
    recommendLevel: 4
  });

  const selected = selectVoiceDigestArticles([duplicate, other, first], 3);

  assert.deepEqual(
    selected.map((article) => article.id),
    [20, 22]
  );
});
