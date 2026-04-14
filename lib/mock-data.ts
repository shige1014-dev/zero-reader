import type { BriefingInsertInput, FeedInsertInput } from "@/lib/feed-types";

const now = new Date("2026-04-12T08:30:00+09:00");

function hoursAgo(hours: number) {
  return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
}

export const mockBriefing: BriefingInsertInput = {
  macro_track: "美元流动性略有修复，但长端利率仍在高位拉扯，风险偏好不能过度乐观。",
  market_track: "AI 与高弹性成长股维持主升结构，交易拥挤度开始上升，需要更重视节奏。",
  sentiment_track: "情绪处在偏热但未失控区间，追涨容错率下降，精选信号比全市场撒网更重要。",
  risk_level: "PRIORITY",
  vix: 17.9,
  fear_greed: 64,
  tnx: 4.31,
  timestamp: now.toISOString()
};

export const mockFeedEntries: FeedInsertInput[] = [
  {
    source: "siqitian",
    category: "macro",
    priority: "FLASH",
    title: "十年期美债收益率再次逼近高位，风险资产需要重估节奏",
    summary: "长端利率抬升直接影响高估值资产的安全边际，今天首先要看风险定价是否再校准。",
    url: "https://example.com/macro-rates",
    tags: ["宏观", "TNX", "收益率", "流动性"],
    confidence: 0.9,
    timestamp: hoursAgo(1)
  },
  {
    source: "koukou",
    category: "ai",
    priority: "PRIORITY",
    title: "AI 基础设施交易拥挤，但主线逻辑仍在强化",
    summary: "算力、服务器与数据中心链条仍是资金主战场，不过估值扩张开始考验持仓耐心。",
    url: "https://example.com/ai-infra",
    tags: ["AI", "NVDA", "AMD", "TSM", "基础设施"],
    confidence: 0.82,
    timestamp: hoursAgo(2.5)
  },
  {
    source: "fanpai",
    category: "quantum",
    priority: "ROUTINE",
    title: "量子计算概念继续活跃，但筹码结构波动更大",
    summary: "量子链条仍属高波动高预期赛道，适合跟踪情绪与政策催化，而不是只看单日涨跌。",
    url: "https://example.com/quantum-track",
    tags: ["量子", "IONQ", "RGTI", "QUBT"],
    confidence: 0.71,
    timestamp: hoursAgo(4)
  },
  {
    source: "siqitian",
    category: "space",
    priority: "PRIORITY",
    title: "商业太空板块回到视野，发射与卫星网络双线升温",
    summary: "从火箭发射到卫星通信，商业太空正在从故事线转向可持续跟踪的产业链主线。",
    url: "https://example.com/space-track",
    tags: ["商业太空", "RKLB", "ASTS", "RDW"],
    confidence: 0.77,
    timestamp: hoursAgo(6)
  },
  {
    source: "manual",
    category: "fusion",
    priority: "ROUTINE",
    title: "核聚变与先进核能叙事继续扩散，资金开始寻找下一批载体",
    summary: "核聚变和新型核能仍在早期，短期更像预期管理，中长期才看工程兑现速度。",
    url: "https://example.com/fusion-track",
    tags: ["核聚变", "OKLO", "SMR", "NNE"],
    confidence: 0.68,
    timestamp: hoursAgo(7.5)
  },
  {
    source: "manual",
    category: "bio-ai",
    priority: "ROUTINE",
    title: "生物 AI 继续向平台化靠拢，药物发现与合成生物双线演进",
    summary: "这条线短期弹性大但分化更大，后续关键在于谁能把 AI 变成真实研发效率。",
    url: "https://example.com/bio-ai-track",
    tags: ["生物AI", "RXRX", "TWST", "SANA", "biotech"],
    confidence: 0.66,
    timestamp: hoursAgo(9)
  },
  {
    source: "koukou",
    category: "energy",
    priority: "ROUTINE",
    title: "储能链条仍在修复区间，市场开始重看电网与长时储能",
    summary: "能源存储不是单一电池故事，电网稳定性和系统级调度会决定下一阶段估值重心。",
    url: "https://example.com/energy-storage-track",
    tags: ["储能", "FLNC", "STEM", "MVST", "energy"],
    confidence: 0.69,
    timestamp: hoursAgo(10)
  },
  {
    source: "siqitian",
    category: "geopolitics",
    priority: "FLASH",
    title: "地缘风险升温，能源与军工定价开始影响全球风险偏好",
    summary: "地缘并不只是新闻噪音，它会直接穿透到能源、航运、风险资产和美元定价。",
    url: "https://example.com/geopolitics-risk",
    tags: ["地缘", "能源", "航运", "风险偏好"],
    confidence: 0.86,
    timestamp: hoursAgo(1.8)
  },
  {
    source: "manual",
    category: "deep",
    priority: "PRIORITY",
    title: "AI 交易主线正在从模型故事转向系统与执行链能力",
    summary: "推荐理由：这篇文章把 AI 从概念炒作转成产业执行链分析，适合今天精读。",
    content: "## 核心判断\n\nAI 赛道的竞争不再只是模型能力，而是从芯片到数据中心再到代理执行链的系统效率。\n",
    url: "https://example.com/deep-ai-trade",
    tags: ["精读", "AI", "系统", "执行链"],
    confidence: 0.92,
    timestamp: hoursAgo(5.5)
  },
  {
    source: "manual",
    category: "deep",
    priority: "ROUTINE",
    title: "量子与商业太空为什么都在争夺长期叙事定价权",
    summary: "推荐理由：适合拿来校准长期赛道视角，而不是盯住短线波动。",
    content: "## 观察\n\n量子和商业太空都是高预期赛道，但真正值得跟踪的是资本开支、订单和政策窗口。\n",
    url: "https://example.com/deep-frontier-sectors",
    tags: ["精读", "量子", "商业太空"],
    confidence: 0.78,
    timestamp: hoursAgo(11)
  }
];
