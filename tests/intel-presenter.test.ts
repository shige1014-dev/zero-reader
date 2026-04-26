import test from "node:test";
import assert from "node:assert/strict";

import { buildIntelViewModel } from "@/lib/intel-presenter";
import type { Briefing, FeedEntry } from "@/lib/feed-types";
import type { SitianSnapshot } from "@/lib/sitian-report";

function makeBriefing(overrides: Partial<Briefing> = {}): Briefing {
  return {
    id: "briefing-1",
    macroTrack: "TNX 4.31%，利率中性，流动性适中。综合压力指数 53.6，当前处于中压力区间。",
    marketTrack: "VIX 18.7，波动率正常，市场相对平稳。",
    sentimentTrack: "综合压力 53.6 | 恐贪 31 | VIX 18.7 | TNX 4.31% | 等级：中",
    riskLevel: "PRIORITY",
    vix: 18.71,
    fearGreed: 31,
    tnx: 4.31,
    createdAt: "2026-04-25T11:00:08.181Z",
    ...overrides
  };
}

function makeFeedEntry(id: string, overrides: Partial<FeedEntry> = {}): FeedEntry {
  return {
    id,
    source: "siqitian",
    category: "market",
    priority: "PRIORITY",
    title: "Constellation signs SMR co-development with ENEL across 4 Italian sites",
    summary: "Frame agreement covers 4 northern-Italy candidate sites and keeps EU permitting as the main variable.",
    content: null,
    url: "https://example.com",
    tags: ["CEG", "VST", "BWXT", "CCJ", "opp:OPP-01"],
    confidence: 0.82,
    createdAt: "2026-04-25T13:42:00.000Z",
    isRead: false,
    readingTime: null,
    ...overrides
  };
}

test("buildIntelViewModel derives routine verdict from moderate metrics despite priority flag", () => {
  const view = buildIntelViewModel(makeBriefing(), []);

  assert.equal(view.desk.verdict, "ROUTINE");
  assert.equal(view.desk.verdictLine, "先看赔率，再做动作");
  assert.equal(view.desk.riskMetrics.length, 5);
});

test("buildIntelViewModel clusters duplicate headlines and keeps latest card", () => {
  const view = buildIntelViewModel(makeBriefing(), [
    makeFeedEntry("sig-old", {
      title: "China shifts 17 rare-earth items to per-order export licensing",
      createdAt: "2026-04-25T12:05:00.000Z",
      tags: ["MP", "LYC", "opp:OPP-02"]
    }),
    makeFeedEntry("sig-new", {
      title: "China shifts 17 rare-earth items to per-order export licensing",
      createdAt: "2026-04-25T14:08:00.000Z",
      tags: ["MP", "LYC", "opp:OPP-02"]
    }),
    makeFeedEntry("sig-other", {
      title: "Dallas Fed manufacturing index drops to −19.4, a three-month low",
      category: "macro",
      priority: "FLASH",
      createdAt: "2026-04-25T10:15:00.000Z",
      tags: ["ISM", "XLI"]
    })
  ]);

  assert.equal(view.flow.cards.length, 2);
  const clustered = view.flow.cards.find((card) => card.title === "China shifts 17 rare-earth items to per-order export licensing");
  assert.ok(clustered);
  assert.equal(clustered?.clusterLabel, "簇 1/2 ↗");
  assert.equal(clustered?.timestamp, "14:08 UTC");
});

test("buildIntelViewModel builds desk opportunities from linked opportunity tags", () => {
  const view = buildIntelViewModel(makeBriefing(), [
    makeFeedEntry("sig-1", {
      title: "China shifts 17 rare-earth items to per-order export licensing",
      category: "geopolitics",
      priority: "PRIORITY",
      tags: ["MP", "LYC", "opp:OPP-02", "scale:quarterly", "state:awaits 2nd confirmation"]
    }),
    makeFeedEntry("sig-2", {
      title: "Lloyd's launch insurance premiums repricing 11% lower year-on-year",
      category: "space",
      priority: "ROUTINE",
      tags: ["RKLB", "ASTS", "opp:OPP-03", "scale:multi-year", "state:written into OBI"]
    })
  ]);

  assert.equal(view.desk.opportunities.length, 2);
  assert.equal(view.desk.opportunities[0]?.id, "OPP-02");
  assert.match(view.desk.opportunities[0]?.targets.join(" ") ?? "", /MP/);
  assert.equal(view.desk.opportunities[0]?.status, "PENDING");
});

test("buildIntelViewModel filters stale feed items beyond maxAgeHours window", () => {
  const now = new Date("2026-04-26T00:00:00.000Z");
  const view = buildIntelViewModel(
    makeBriefing(),
    [
      makeFeedEntry("fresh-1", {
        title: "Fresh signal within window",
        createdAt: "2026-04-25T20:00:00.000Z"
      }),
      makeFeedEntry("stale-1", {
        title: "Stale signal beyond window",
        createdAt: "2026-04-24T18:00:00.000Z"
      }),
      makeFeedEntry("stale-2", {
        title: "Another stale signal",
        createdAt: "2026-04-20T10:00:00.000Z"
      })
    ],
    null,
    { now, maxAgeHours: 24 }
  );

  assert.equal(view.flow.cards.length, 1);
  assert.equal(view.flow.staleCount, 2);
  assert.equal(view.flow.cards[0]?.title, "Fresh signal within window");
  assert.match(view.flow.refreshedLabel, /过滤 2 条 >24h/);
});

test("buildIntelViewModel keeps all items when maxAgeHours is omitted", () => {
  const view = buildIntelViewModel(makeBriefing(), [
    makeFeedEntry("old-1", {
      title: "Ancient signal",
      createdAt: "2020-01-01T00:00:00.000Z"
    })
  ]);

  assert.equal(view.flow.cards.length, 1);
  assert.equal(view.flow.staleCount, 0);
});

test("buildIntelViewModel uses sitian snapshot for live DXY BTC and stock watch fallback", () => {
  const sitian: SitianSnapshot = {
    timestamp: "2026-04-25T23:30:05.950789+00:00",
    mode: "ROUTINE",
    alertLevel: "ROUTINE",
    vix: { value: 18.71, delta1d: -0.6 },
    tnx: { value: 4.31, delta1d: -0.013 },
    dxy: { value: 98.51, delta1d: -0.29 },
    fearGreed: { value: 31, label: "Fear" },
    btc: { value: 77594.45, change24hPct: 0.24 },
    stockWatch: {
      dailyMain: [
        { symbol: "NVDA", label: "待建仓", thesis: "AI 核心算力龙头", change1dPct: 4.32 },
        { symbol: "VRT", label: "待建仓", thesis: "数据中心电力与热管理", change1dPct: 0.53 }
      ]
    }
  };

  const view = buildIntelViewModel(makeBriefing(), [], sitian);

  assert.equal(view.desk.riskMetrics[1]?.value, "98.5");
  assert.equal(view.desk.riskMetrics[3]?.value, "77.6k");
  assert.equal(view.desk.opportunities[0]?.id, "观察-NVDA");
  assert.match(view.desk.opportunities[0]?.headline ?? "", /NVDA/);
});
