import type { Article } from "@/lib/types";

const GENERIC_EVAL_PATTERNS = [
  "从投资视角看，真正重要的是把新闻热度拆成订单兑现、资本开支与估值弹性三层",
  "关键不在于标题热度，而在于这条信息能否推动订单兑现、资本开支重估或叙事节奏变化"
];

const INTERNAL_SOURCES = new Set(["Macro Desk", "Macro Grid", "Research Note", "Risk Monitor", "Semi Daily"]);
const PREMIUM_SOURCES = new Set(["Bloomberg", "Reuters", "Financial Times", "CNBC", "Stratechery.com"]);

function normalizeText(text: string | null | undefined): string {
  return (text ?? "").trim();
}

export function isGenericZeroEval(text: string): boolean {
  const normalized = normalizeText(text);
  if (!normalized) {
    return true;
  }
  return GENERIC_EVAL_PATTERNS.some((pattern) => normalized.includes(pattern));
}

export function hasDistinctSummary(article: Article): boolean {
  const summary = normalizeText(article.summary);
  const title = normalizeText(article.title);
  const titleZh = normalizeText(article.titleZh);
  return Boolean(summary) && summary !== title && summary !== titleZh;
}

export function sourceQualityWeight(source: string): number {
  if (INTERNAL_SOURCES.has(source)) {
    return 16;
  }
  if (PREMIUM_SOURCES.has(source)) {
    return 12;
  }
  if (source === "ArXiv") {
    return 10;
  }
  if (source.includes("华尔街见闻") || source.includes("财联社")) {
    return 8;
  }
  if (source.includes("联合早报") || source.includes("澎湃")) {
    return 6;
  }
  return 4;
}

function createdAtMs(article: Article): number {
  const raw = article.publishedAt ?? article.createdAt;
  const ts = Date.parse(raw);
  return Number.isNaN(ts) ? 0 : ts;
}

export function scoreArticleQuality(article: Article): number {
  let score = article.recommendLevel * 10;
  score += sourceQualityWeight(article.source);
  score += article.analysis ? 18 : -16;
  score += hasDistinctSummary(article) ? 8 : -10;
  score += isGenericZeroEval(article.zeroEval) ? -20 : 12;
  score += Math.min(article.tags.length, 3) * 2;
  return score;
}

export function sortArticlesByQuality(articles: Article[]): Article[] {
  return [...articles].sort((left, right) => {
    const scoreDiff = scoreArticleQuality(right) - scoreArticleQuality(left);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }
    if (right.recommendLevel !== left.recommendLevel) {
      return right.recommendLevel - left.recommendLevel;
    }
    const timeDiff = createdAtMs(right) - createdAtMs(left);
    if (timeDiff !== 0) {
      return timeDiff;
    }
    return right.id - left.id;
  });
}
