import test from "node:test";
import assert from "node:assert/strict";

import { isGenericZeroEval } from "@/lib/article-quality";
import { buildArticleCardViewModel } from "@/lib/article-list-presenter";
import type { Article } from "@/lib/types";

function makeArticle(overrides: Partial<Article>): Article {
  return {
    id: 1,
    title: "Example title",
    titleZh: "示例标题",
    url: "https://example.com",
    source: "Reuters",
    date: "2026-04-20",
    publishedAt: "2026-04-20T10:00:00.000Z",
    tags: ["宏观"],
    zeroEval: "默认判断",
    summary: "默认摘要",
    recommendLevel: 3,
    obiRef: "bf-010",
    analysis: null,
    pushedAt: null,
    pushedMorningAt: null,
    pushedEveningAt: null,
    createdAt: "2026-04-20T10:00:00.000Z",
    readAt: null,
    ...overrides
  };
}

test("isGenericZeroEval detects repeated fallback phrasing", () => {
  assert.equal(
    isGenericZeroEval("从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。"),
    true
  );
  assert.equal(isGenericZeroEval("这条新闻的关键在于利润兑现口是否能在季度财报中被验证。"), false);
});

test("buildArticleCardViewModel turns generic eval into a reading framework card", () => {
  const article = makeArticle({
    summary: "伊朗释放冲突信号引发市场波动，油价飙升近8%。",
    zeroEval: "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。"
  });

  const vm = buildArticleCardViewModel(article);

  assert.equal(vm.judgmentLabel, "阅读框架");
  assert.equal(vm.leadText, "伊朗释放冲突信号引发市场波动，油价飙升近8%。");
  assert.match(vm.frameworkText ?? "", /订单兑现/);
});

test("buildArticleCardViewModel keeps real zeroEval as the primary judgment", () => {
  const article = makeArticle({
    summary: "伊朗释放冲突信号引发市场波动，油价飙升近8%。",
    zeroEval: "地缘冲突升级短期推高油价，但美股期货回落、黄金走软显示风险资产与避险资产配置出现分化。",
    analysis: {
      eventNature: "短期触发事件",
      keyVariable: "伊朗是否实际行动",
      transmission: "冲突预期传导到油价",
      trap: "把信号误读成战争",
      falsifyPoint: "72小时内无升级",
      profitOutlet: "看能源公司和航空公司财报",
      bull: "若升级则能源股受益",
      bear: "若无升级则油价回落"
    }
  });

  const vm = buildArticleCardViewModel(article);

  assert.equal(vm.judgmentLabel, "零零判断");
  assert.match(vm.leadText, /地缘冲突升级/);
  assert.equal(vm.frameworkText, null);
  assert.equal(vm.showSummaryBlock, true);
  assert.equal(vm.showDeepAnalysis, true);
});

test("buildArticleCardViewModel hides repeated summary when it is already the lead", () => {
  const article = makeArticle({
    summary: "伊朗释放冲突信号引发市场波动，油价飙升近8%。",
    zeroEval: "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。"
  });

  const vm = buildArticleCardViewModel(article);

  assert.equal(vm.leadText, "伊朗释放冲突信号引发市场波动，油价飙升近8%。");
  assert.equal(vm.showSummaryBlock, false);
});
