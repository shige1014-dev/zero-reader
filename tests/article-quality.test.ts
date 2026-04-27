import test from "node:test";
import assert from "node:assert/strict";

import { scoreArticleQuality, sortArticlesByQuality } from "@/lib/article-quality";
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

test("scoreArticleQuality penalizes template entries without analysis", () => {
  const templated = makeArticle({
    id: 10,
    source: "联合早报",
    recommendLevel: 4,
    zeroEval: "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。",
    summary: "游轮发生坠海事故 韩国海警搜救中国男子",
    titleZh: "游轮发生坠海事故 韩国海警搜救中国男子"
  });
  const analyzed = makeArticle({
    id: 11,
    source: "华尔街见闻·热门",
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
  });

  assert.ok(scoreArticleQuality(analyzed) > scoreArticleQuality(templated));
});

test("sortArticlesByQuality pushes templated entries behind richer analysis", () => {
  const templated = makeArticle({
    id: 20,
    source: "财联社·深度",
    recommendLevel: 4,
    zeroEval: "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层，再判断这条信息属于催化剂、噪音还是趋势确认。",
    summary: "中东战事重启全球资本大迁徙：国防、能源类“旧经济”强势夺权",
    titleZh: "中东战事重启全球资本大迁徙：国防、能源类“旧经济”强势夺权"
  });
  const analyzed = makeArticle({
    id: 21,
    source: "华尔街见闻·热门",
    recommendLevel: 2,
    zeroEval: "伊朗封锁霍尔木兹海峡威胁全球石油供应，美国扣船反制强化对抗态势。",
    summary: "伊朗在停火期限前再次威胁封锁霍尔木兹海峡，美国首次采取扣船行动进行反制。",
    analysis: {
      eventNature: "阶段性施压",
      keyVariable: "海峡油轮通行数据",
      transmission: "冲突预期推升油价",
      trap: "把威胁当成战争必然",
      falsifyPoint: "海峡流量无下降",
      profitOutlet: "油气和航空财报",
      bull: "油价溢价继续扩张",
      bear: "谈判回归压缩溢价"
    }
  });

  const sorted = sortArticlesByQuality([templated, analyzed]);

  assert.equal(sorted[0]?.id, 21);
  assert.equal(sorted[1]?.id, 20);
});
