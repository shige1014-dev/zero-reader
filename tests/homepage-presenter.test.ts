import test from "node:test";
import assert from "node:assert/strict";

import { buildArticleSections, buildArticleStatusSummary, buildWatchAlerts } from "@/lib/homepage-presenter";
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

test("buildArticleSections limits same obiRef crowding in visible media cards", () => {
  const mediaItems = Array.from({ length: 5 }, (_, index) =>
    makeArticle({
      id: index + 1,
      source: "华尔街见闻·热门",
      obiRef: "bf-010",
      recommendLevel: 3,
      zeroEval: `非模板判断 ${index + 1}`,
      summary: `摘要 ${index + 1}`,
      analysis: {
        eventNature: "阶段性事件",
        keyVariable: "变量",
        transmission: "传导",
        trap: "陷阱",
        falsifyPoint: "证伪",
        profitOutlet: "兑现",
        bull: "多头",
        bear: "空头"
      }
    })
  );

  const sections = buildArticleSections(mediaItems);
  const media = sections.find((section) => section.section === "media");

  assert.ok(media);
  assert.equal(media?.totalPages, 2);
  assert.equal(media?.currentPage, 1);
  assert.equal(media?.visibleItems.length, 3);
  assert.equal(media?.visibleItems.filter((item) => item.obiRef === "bf-010").length, 3);
});

test("buildArticleSections supports section-level pagination", () => {
  const mediaItems = Array.from({ length: 6 }, (_, index) =>
    makeArticle({
      id: index + 1,
      source: "华尔街见闻·热门",
      obiRef: index < 3 ? "bf-010" : "bf-001",
      recommendLevel: 3,
      zeroEval: `非模板判断 ${index + 1}`,
      summary: `摘要 ${index + 1}`,
      analysis: {
        eventNature: "阶段性事件",
        keyVariable: "变量",
        transmission: "传导",
        trap: "陷阱",
        falsifyPoint: "证伪",
        profitOutlet: "兑现",
        bull: "多头",
        bear: "空头"
      }
    })
  );

  const sections = buildArticleSections(mediaItems, { media: 2 });
  const media = sections.find((section) => section.section === "media");

  assert.ok(media);
  assert.equal(media?.currentPage, 2);
  assert.equal(media?.totalPages, 2);
  assert.equal(media?.visibleItems.length, 2);
  assert.deepEqual(
    media?.visibleItems.map((item) => item.id),
    [2, 1]
  );
});

test("buildArticleStatusSummary reports analysis coverage and template pollution", () => {
  const articles = [
    makeArticle({
      id: 10,
      source: "联合早报",
      obiRef: "bf-013",
      recommendLevel: 4,
      zeroEval: "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。",
      summary: "游轮发生坠海事故 韩国海警搜救中国男子",
      titleZh: "游轮发生坠海事故 韩国海警搜救中国男子"
    }),
    makeArticle({
      id: 11,
      source: "华尔街见闻·热门",
      obiRef: "bf-010",
      recommendLevel: 2,
      zeroEval: "美国代表赴巴基斯坦谈判与特朗普和解言论构成地缘风险缓和信号。",
      summary: "美国代表抵达伊斯兰堡参加谈判，特朗普表示美伊仍有达成协议可能。",
      analysis: {
        eventNature: "短期触发",
        keyVariable: "谈判后续进展",
        transmission: "风险溢价下降",
        trap: "把姿态当落地",
        falsifyPoint: "48小时无进展",
        profitOutlet: "油价和运输股",
        bull: "缓和利好风险资产",
        bear: "谈判破裂反向冲击"
      }
    }),
    makeArticle({
      id: 12,
      source: "财联社·深度",
      obiRef: "bf-001",
      recommendLevel: 2,
      zeroEval: "大摩观点指出AI从模型训练向部署应用转向，智能体架构需求将扩展CPU占比。",
      summary: "AI智能体应用兴起将改变芯片需求结构，推动CPU需求比重上升。",
      analysis: {
        eventNature: "投行前瞻",
        keyVariable: "采购比例",
        transmission: "CPU需求重估",
        trap: "把预期当现实",
        falsifyPoint: "GPU占比不降",
        profitOutlet: "AMD财报",
        bull: "CPU受益",
        bear: "GPU主导延续"
      }
    })
  ];

  const status = buildArticleStatusSummary(articles);

  assert.equal(status.totalArticles, 3);
  assert.equal(status.analysisCount, 2);
  assert.equal(status.templateCount, 1);
  assert.equal(status.distinctTrackCount, 3);
  assert.match(status.analysisCoverageLabel, /67%/);
});

test("buildWatchAlerts surfaces track-specific equities and risk warnings", () => {
  const articles = [
    makeArticle({
      id: 20,
      source: "华尔街见闻·热门",
      tags: ["AI芯片"],
      obiRef: "bf-001",
      zeroEval: "英伟达生态仍是算力扩张核心，需继续跟踪液冷和服务器链条。",
      summary: "AI算力需求延续，液冷与服务器基础设施受益。",
      analysis: {
        eventNature: "趋势延续",
        keyVariable: "订单兑现",
        transmission: "算力投资扩张",
        trap: "追高估值",
        falsifyPoint: "订单降速",
        profitOutlet: "NVDA 与 VRT 财报",
        bull: "AI投资继续",
        bear: "资本开支放缓"
      }
    }),
    makeArticle({
      id: 21,
      source: "联合早报",
      tags: ["地缘风险", "宏观"],
      obiRef: "bf-010",
      zeroEval: "地缘冲突升级短期推高油价，风险资产承压。",
      summary: "伊朗局势升温，油价波动扩大。",
      analysis: {
        eventNature: "高波动",
        keyVariable: "油价和VIX",
        transmission: "冲突预期推升通胀",
        trap: "把信号当趋势",
        falsifyPoint: "72小时无升级",
        profitOutlet: "能源股与航空股财报",
        bull: "能源受益",
        bear: "风险资产承压"
      }
    })
  ];

  const alerts = buildWatchAlerts(articles);

  assert.ok(alerts.some((alert) => alert.title.includes("AI芯片")));
  assert.ok(alerts.some((alert) => alert.tickers.includes("NVDA")));
  assert.ok(alerts.some((alert) => alert.risk.includes("VIX")));
});
