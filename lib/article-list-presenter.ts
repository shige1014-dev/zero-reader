import { isGenericZeroEval } from "@/lib/article-quality";
import type { Article } from "@/lib/types";

export interface ArticleCardViewModel {
  judgmentLabel: string;
  leadText: string;
  frameworkText: string | null;
  showSummaryBlock: boolean;
  showDeepAnalysis: boolean;
  deepAnalysisToggleLabel: string;
}

function cleanLeadText(article: Article): string {
  const summary = article.summary.trim();
  const titleZh = article.titleZh?.trim() ?? "";
  const title = article.title.trim();
  if (summary && summary !== title && summary !== titleZh) {
    return summary;
  }
  return article.zeroEval.trim() || summary || titleZh || title;
}

export function buildArticleCardViewModel(article: Article): ArticleCardViewModel {
  const generic = isGenericZeroEval(article.zeroEval);
  const leadText = generic ? cleanLeadText(article) : article.zeroEval.trim();
  const summary = article.summary.trim();

  if (generic) {
    return {
      judgmentLabel: "阅读框架",
      leadText,
      frameworkText: article.zeroEval.trim() || null,
      showSummaryBlock: Boolean(summary) && summary !== leadText,
      showDeepAnalysis: Boolean(article.analysis),
      deepAnalysisToggleLabel: "展开完整推演"
    };
  }

  return {
    judgmentLabel: "零零判断",
    leadText,
    frameworkText: null,
    showSummaryBlock: Boolean(summary),
    showDeepAnalysis: Boolean(article.analysis),
    deepAnalysisToggleLabel: "展开完整推演"
  };
}
