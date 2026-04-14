import type { BriefingInsertInput, FeedInsertInput } from "@/lib/feed-types";

const now = new Date("2026-04-11T10:15:00+09:00");

function hoursAgo(hours: number) {
  return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
}

export const mockBriefing: BriefingInsertInput = {
  macro_track:
    "美元流动性边际改善，但风险资产仍处在高位震荡窗口，二季度需要防止过度乐观。",
  market_track:
    "AI 算力与高弹性成长继续维持强势，长债收益率抬头带来的估值压力尚未充分释放。",
  sentiment_track:
    "整体情绪处于偏热但未失控区间，短线交易拥挤度上升，适合提高筛选门槛。",
  risk_level: "PRIORITY",
  vix: 18.4,
  fear_greed: 62,
  tnx: 4.38,
  timestamp: now.toISOString()
};

export const mockFeedEntries: FeedInsertInput[] = [
  {
    source: "siqitian",
    category: "macro",
    priority: "FLASH",
    title: "十年期美债重新上探 4.4%，宏观定价进入二次校准区间",
    summary:
      "收益率抬升正在重新压缩高估值资产的安全边际。对私人仓位而言，这不是恐慌信号，而是需要重估节奏与耐心的提醒。",
    url: "https://example.com/macro-yield-reset",
    tags: ["TNX", "流动性", "风险定价"],
    confidence: 0.88,
    timestamp: hoursAgo(1.5)
  },
  {
    source: "koukou",
    category: "market",
    priority: "PRIORITY",
    title: "算力链继续占据主升浪，市场开始把代理工作流当成基础设施来定价",
    summary:
      "从模型到工具调用再到代理编排，市场正在奖励能形成完整闭环的系统型资产，而不是单点能力展示。",
    url: "https://example.com/agent-infra-pricing",
    tags: ["AI Infra", "Agent", "成长股"],
    confidence: 0.79,
    timestamp: hoursAgo(3)
  },
  {
    source: "fanpai",
    category: "civilization",
    priority: "PRIORITY",
    title: "操作系统级 AI 开始从概念竞赛转向权限与执行链之争",
    summary:
      "真正的分野不再是聊天能力，而是谁先拿到系统级入口、上下文记忆和稳定工具执行。文明跃迁信号正在从应用层下沉到系统层。",
    url: "https://example.com/ai-os-permission-war",
    tags: ["AI OS", "Agent", "系统入口"],
    confidence: 0.91,
    timestamp: hoursAgo(4.5)
  },
  {
    source: "siqitian",
    category: "market",
    priority: "ROUTINE",
    title: "VIX 回落但未失真，波动率仍不足以证明风险窗口关闭",
    summary:
      "波动压缩更像短暂安静，而不是趋势结束。继续观察风险资产是否能在低波环境下承接更高的成交密度。",
    url: "https://example.com/vix-compression",
    tags: ["VIX", "波动率"],
    confidence: 0.73,
    timestamp: hoursAgo(6)
  },
  {
    source: "manual",
    category: "deep",
    priority: "PRIORITY",
    title: "代理基础设施战争：从 Copilot 到操作系统级调度器",
    summary:
      "这篇长文记录我对 Agent 时代系统入口之争的阶段判断：谁拥有记忆、权限和工作流编排，谁就可能拥有下一代 OS 的主导权。",
    content: `> 这不是一篇面对公众的科技评论，而是给自己留存的判断草稿。\n\n## 观察起点\n\n当 AI 从应用外挂变成工作流编排器，系统层的价值会重新抬升。过去十几年里，操作系统主要负责窗口、文件和权限；接下来它更像负责记忆、代理、执行链与结果回写。\n\n## 三个关键变化\n\n### 1. 权限模型开始成为产品核心\n\n谁能最稳定地跨应用调用工具，谁就更接近系统入口。\n\n### 2. 记忆比对话更重要\n\n真正的高价值代理不是更会聊天，而是更能沿着历史上下文持续完成任务。\n\n### 3. 编排层正在吃掉孤立工具\n\n工具不会消失，但会从主角退到模块。用户越来越不想手动切应用，而是希望系统自己协调。\n\n## 对自己的启发\n\n对于 ZERO2076，这意味着阅读器本身不只是内容容器，它也可以是未来私人情报系统的可视界面。\n\n## 暂定结论\n\n下一代个人信息系统的真正竞争，不是“谁会总结”，而是“谁能稳定拥有上下文、代理与行动”。`,
    url: "https://example.com/deep-agent-infra",
    tags: ["深度文刊", "Agent", "AI OS"],
    confidence: 0.94,
    timestamp: hoursAgo(8)
  },
  {
    source: "manual",
    category: "deep",
    priority: "ROUTINE",
    title: "一人独角兽的系统密度：内容、软件与服务正在重新折叠",
    summary:
      "面向自己的一篇结构化长记：组织规模正在被系统密度替代，一个人的产能上限由自动化回路和分发结构决定。",
    content: `## 主题\n\n一人独角兽不是人数神话，而是系统密度的结果。\n\n## 为什么值得长期跟踪\n\n1. 个人品牌正在获得过去团队级别的生产力。\n2. 代理编排让执行链逐步自动化。\n3. 内容、软件与服务边界越来越薄。\n\n## 当前判断\n\n对自己最有意义的不是追逐案例，而是搭建一套能持续记录、复盘、输出的私人系统。`,
    url: "https://example.com/deep-solo-unicorn",
    tags: ["深度文刊", "一人独角兽", "系统密度"],
    confidence: 0.87,
    timestamp: hoursAgo(14)
  }
];
