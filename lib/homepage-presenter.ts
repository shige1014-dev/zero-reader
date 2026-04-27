import { hasDistinctSummary, isGenericZeroEval, sortArticlesByQuality } from "@/lib/article-quality";
import type { Article } from "@/lib/types";

export type ArticleSection = "internal" | "media" | "research";

const INTERNAL_SOURCES = new Set(["Macro Desk", "Macro Grid", "Research Note", "Risk Monitor", "Semi Daily"]);
const SEOUL_TIMEZONE = "Asia/Seoul";
const MAX_VISIBLE_PER_OBI = 3;
const SECTION_PAGE_SIZE = 4;

const TRACK_WATCH_CONFIG: Record<string, { title: string; tickers: string[]; trigger: string; risk: string }> = {
  AI芯片: {
    title: "AI芯片关注",
    tickers: ["NVDA", "AMD", "SMCI"],
    trigger: "看订单兑现、液冷渗透和算力资本开支延续。",
    risk: "若资本开支减速或估值过热，先看 NVDA 指引，再看 SOX 与 VIX。"
  },
  宏观: {
    title: "宏观风险监控",
    tickers: ["SPY", "TLT", "UUP"],
    trigger: "先确认 VIX、TNX、DXY 是否同步进入风险区。",
    risk: "VIX > 25 或 TNX、DXY 同步上冲时，默认先降风险，不追题材。"
  },
  地缘风险: {
    title: "地缘风险警示",
    tickers: ["XLE", "CVX", "LMT"],
    trigger: "油价、国防链和航运会先反应，关注事件是否从信号升级为实际行动。",
    risk: "盯 VIX、布油和美元，若 72 小时内无升级，防止把噪音当趋势。"
  },
  量子计算: {
    title: "量子计算雷达",
    tickers: ["IONQ", "RGTI", "QUBT"],
    trigger: "只在工程级突破或正式采购出现时上调权重。",
    risk: "新闻稿、评级上调和价格上涨本身不构成升级。"
  },
  商业航天: {
    title: "商业航天跟踪",
    tickers: ["RKLB", "ASTS", "RDW"],
    trigger: "盯合同落地、发射频率和政府订单，不用情绪代替兑现。",
    risk: "若龙头回撤且成交量骤降，视作事件仓信号失效。"
  },
  核能: {
    title: "核能主线观察",
    tickers: ["OKLO", "NNE", "SMR"],
    trigger: "确认政策、项目审批和真实资本开支是否推进。",
    risk: "范式叙事有效，但若只有 PR 没有工程节点，仍按 A 类事件仓对待。"
  },
  生物AI: {
    title: "生物AI跟踪",
    tickers: ["RXRX", "TWST", "SANA"],
    trigger: "只在临床、合作和平台落地同时推进时上调评级。",
    risk: "时间尺度容易错配，长期逻辑不要拿去做短炒。"
  },
  储能: {
    title: "储能链路",
    tickers: ["FLNC", "STEM", "MVST"],
    trigger: "看项目签约、并网节奏和毛利率拐点。",
    risk: "若现金流与回款未改善，价格反弹仍可能只是叙事修复。"
  },
  量子安全: {
    title: "量子安全观察",
    tickers: ["LAES"],
    trigger: "关注法规、标准和政府采购。",
    risk: "没有标准推动前，先按高波动主题处理。"
  }
};

export interface ArticleSectionView {
  section: ArticleSection;
  title: string;
  description: string;
  visibleItems: Article[];
  currentPage: number;
  totalPages: number;
}

export interface ArticleStatusSummary {
  totalArticles: number;
  analysisCount: number;
  templateCount: number;
  distinctTrackCount: number;
  analysisCoverageLabel: string;
  latestUpdateLabel: string;
}

export interface WatchAlert {
  title: string;
  tickers: string[];
  trigger: string;
  risk: string;
}

export function articleSection(article: Article): ArticleSection {
  if (INTERNAL_SOURCES.has(article.source)) {
    return "internal";
  }
  if (article.source === "ArXiv") {
    return "research";
  }
  return "media";
}

export function sectionMeta(section: ArticleSection): { title: string; description: string } {
  switch (section) {
    case "internal":
      return {
        title: "零零内部判断",
        description: "先看自己的框架化判断，再看外部媒体信号。"
      };
    case "media":
      return {
        title: "顶级媒体信号",
        description: "首屏控制同一主线刷屏，优先保留更有分析含量的条目。"
      };
    case "research":
      return {
        title: "研究前沿",
        description: "更偏研究和论文线索，优先看趋势和证伪点，不直接当交易结论。"
      };
  }
}

function formatSeoTimestamp(raw: string | null | undefined): string {
  if (!raw) {
    return "时间未知";
  }
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return "时间未知";
  }
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: SEOUL_TIMEZONE,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function publishedAtMs(article: Article): number {
  const raw = article.publishedAt ?? article.createdAt;
  const ts = Date.parse(raw);
  return Number.isNaN(ts) ? 0 : ts;
}

function clampPage(page: number | undefined, totalPages: number): number {
  if (!page || Number.isNaN(page) || page < 1) {
    return 1;
  }
  return Math.min(page, totalPages);
}

function diversifyArticles(items: Article[]): Article[] {
  const seenByObi = new Map<string, number>();
  const primary: Article[] = [];
  const overflow: Article[] = [];

  for (const item of items) {
    const seen = seenByObi.get(item.obiRef) ?? 0;
    if (seen < MAX_VISIBLE_PER_OBI) {
      primary.push(item);
      seenByObi.set(item.obiRef, seen + 1);
    } else {
      overflow.push(item);
    }
  }

  return [...primary, ...overflow];
}

function paginateDiversifiedArticles(items: Article[]): Article[][] {
  const pages: Article[][] = [];
  let currentPage: Article[] = [];
  let currentCounts = new Map<string, number>();

  for (const item of items) {
    const sameObiCount = currentCounts.get(item.obiRef) ?? 0;
    const pageIsFull = currentPage.length >= SECTION_PAGE_SIZE;
    const pageWouldCrowd = sameObiCount >= MAX_VISIBLE_PER_OBI;

    if (pageIsFull || pageWouldCrowd) {
      if (currentPage.length > 0) {
        pages.push(currentPage);
      }
      currentPage = [];
      currentCounts = new Map<string, number>();
    }

    currentPage.push(item);
    currentCounts.set(item.obiRef, (currentCounts.get(item.obiRef) ?? 0) + 1);
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages.length > 0 ? pages : [[]];
}

export function buildArticleSections(
  articles: Article[],
  pageBySection: Partial<Record<ArticleSection, number>> = {}
): ArticleSectionView[] {
  const grouped = {
    internal: sortArticlesByQuality(articles.filter((article) => articleSection(article) === "internal")),
    media: sortArticlesByQuality(articles.filter((article) => articleSection(article) === "media")),
    research: sortArticlesByQuality(articles.filter((article) => articleSection(article) === "research"))
  };

  return (["internal", "media", "research"] as const)
    .map((section) => {
      const items = grouped[section];
      if (items.length === 0) {
        return null;
      }
      const diversified = diversifyArticles(items);
      const pages = paginateDiversifiedArticles(diversified);
      const totalPages = Math.max(1, pages.length);
      const currentPage = clampPage(pageBySection[section], totalPages);
      const visibleItems = pages[currentPage - 1] ?? [];

      return {
        section,
        ...sectionMeta(section),
        visibleItems,
        currentPage,
        totalPages
      };
    })
    .filter((section): section is ArticleSectionView => Boolean(section));
}

export function buildArticleStatusSummary(articles: Article[]): ArticleStatusSummary {
  const totalArticles = articles.length;
  const analysisCount = articles.filter((article) => article.analysis).length;
  const templateCount = articles.filter((article) => isGenericZeroEval(article.zeroEval)).length;
  const distinctTrackCount = new Set(articles.map((article) => article.obiRef)).size;
  const latestArticle = [...articles].sort((left, right) => publishedAtMs(right) - publishedAtMs(left))[0] ?? null;
  const coverage = totalArticles === 0 ? 0 : Math.round((analysisCount / totalArticles) * 100);

  return {
    totalArticles,
    analysisCount,
    templateCount,
    distinctTrackCount,
    analysisCoverageLabel: `${coverage}%`,
    latestUpdateLabel: latestArticle
      ? `更新至 ${formatSeoTimestamp(latestArticle.publishedAt ?? latestArticle.createdAt)}`
      : "暂无更新"
  };
}

export function buildStatusSignals(summary: ArticleStatusSummary): Array<{ label: string; value: string; tone?: "warn" }> {
  return [
    { label: "今日文章", value: String(summary.totalArticles) },
    { label: "分析覆盖", value: summary.analysisCoverageLabel },
    { label: "模板污染", value: String(summary.templateCount), tone: summary.templateCount > 0 ? "warn" : undefined },
    { label: "主线分桶", value: String(summary.distinctTrackCount) },
    { label: "更新时间", value: summary.latestUpdateLabel }
  ];
}

export function articleNeedsAttention(article: Article): boolean {
  return isGenericZeroEval(article.zeroEval) || !article.analysis || !hasDistinctSummary(article);
}

function collectTrackNames(article: Article): string[] {
  const text = [article.title, article.titleZh, article.summary, article.zeroEval, article.obiRef, ...article.tags]
    .filter(Boolean)
    .join(" ");

  const tracks = new Set<string>();
  for (const tag of article.tags) {
    if (TRACK_WATCH_CONFIG[tag]) {
      tracks.add(tag);
    }
  }

  if (/量子/.test(text)) tracks.add("量子计算");
  if (/核能|SMR|小堆|反应堆/.test(text)) tracks.add("核能");
  if (/航天|卫星|发射/.test(text)) tracks.add("商业航天");
  if (/生物|制药|基因|临床/.test(text)) tracks.add("生物AI");
  if (/储能|电池|并网/.test(text)) tracks.add("储能");
  if (/量子安全|后量子|加密/.test(text)) tracks.add("量子安全");

  return [...tracks];
}

export function buildWatchAlerts(articles: Article[]): WatchAlert[] {
  const weightedArticles = sortArticlesByQuality(articles);
  const seen = new Set<string>();
  const alerts: WatchAlert[] = [];

  for (const article of weightedArticles) {
    for (const track of collectTrackNames(article)) {
      if (seen.has(track)) {
        continue;
      }
      const config = TRACK_WATCH_CONFIG[track];
      if (!config) {
        continue;
      }
      alerts.push({
        title: config.title,
        tickers: config.tickers,
        trigger: config.trigger,
        risk: config.risk
      });
      seen.add(track);
      if (alerts.length >= 3) {
        return alerts;
      }
    }
  }

  if (alerts.length === 0) {
    alerts.push({
      title: "环境未确认",
      tickers: ["SPY", "QQQ", "VIX"],
      trigger: "市场状态未确认时默认不动，先看 VIX / TNX / DXY。",
      risk: "风险控制优先于叙事，若波动升高先收缩仓位。"
    });
  }

  return alerts;
}
