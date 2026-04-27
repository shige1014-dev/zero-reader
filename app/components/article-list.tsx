import type { Route } from "next";
import Link from "next/link";

import type { Article } from "@/lib/types";
import { buildArticleCardViewModel } from "@/lib/article-list-presenter";
import { articleNeedsAttention, buildArticleSections, buildArticleStatusSummary, buildStatusSignals, buildWatchAlerts } from "@/lib/homepage-presenter";
import { dots } from "@/lib/utils";

interface ArticleListProps {
  articles: Article[];
  pageBySection: {
    internal: number;
    media: number;
    research: number;
  };
}

function recommendLabel(level: number): string {
  if (level >= 5) {
    return "必读";
  }
  if (level >= 3) {
    return "重要";
  }
  return "关注";
}

function primaryTrack(tags: string[]): string {
  return tags[0] ?? "宏观";
}

function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

function displayTitle(article: Article): string {
  if (article.titleZh?.trim()) {
    return article.titleZh.trim();
  }
  if (containsChinese(article.title)) {
    return article.title;
  }
  if (containsChinese(article.summary)) {
    return article.summary.split(/[。.!?]/)[0] ?? article.summary;
  }
  return article.title;
}

function publishedLabel(article: Article): string {
  if (!article.publishedAt) {
    return article.date;
  }
  const date = new Date(article.publishedAt);
  if (Number.isNaN(date.getTime())) {
    return article.date;
  }
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul"
  }).format(date);
}

function renderArticleCard(article: Article): JSX.Element {
  const viewModel = buildArticleCardViewModel(article);
  const needsAttention = articleNeedsAttention(article);
  return (
    <article
      className={`article-card${article.recommendLevel >= 4 ? " article-card-important" : ""}${needsAttention ? " article-card-needs-attention" : ""}`}
      key={article.id}
    >
      <div className="article-main">
        <div className="article-hero">
          <div className="article-hero-overlay" />
          <div className="article-hero-meta">
            <span className="chip chip-track">{primaryTrack(article.tags)}</span>
            <span className="chip chip-gold">零零推荐 · {recommendLabel(article.recommendLevel)}</span>
            <span className="chip">{article.obiRef}</span>
            {needsAttention ? <span className="chip chip-caution">需复核</span> : null}
          </div>
          <div className="article-hero-title-wrap">
            <h3 className="article-title">{displayTitle(article)}</h3>
            {!containsChinese(article.title) && article.titleZh ? <p className="article-original-title">{article.title}</p> : null}
          </div>
        </div>
        <div className="article-judgment">
          <div className="article-judgment-label">{viewModel.judgmentLabel}</div>
          <p className="article-eval">{viewModel.leadText}</p>
          {viewModel.frameworkText ? <p className="article-framework-note">{viewModel.frameworkText}</p> : null}
        </div>
        {viewModel.showDeepAnalysis && article.analysis ? (
          <details className="analysis-details">
            <summary className="analysis-toggle">{viewModel.deepAnalysisToggleLabel}</summary>
            <div className="article-subsection">
              <div className="article-subtitle">逻辑推演</div>
              <div className="analysis-grid">
                <div className="analysis-card">
                  <div className="analysis-card-key">事件性质</div>
                  <div className="analysis-card-value">{article.analysis.eventNature}</div>
                </div>
                <div className="analysis-card">
                  <div className="analysis-card-key">关键变量</div>
                  <div className="analysis-card-value">{article.analysis.keyVariable}</div>
                </div>
                <div className="analysis-card">
                  <div className="analysis-card-key">传导路径</div>
                  <div className="analysis-card-value">{article.analysis.transmission}</div>
                </div>
                <div className="analysis-card">
                  <div className="analysis-card-key">误判陷阱</div>
                  <div className="analysis-card-value">{article.analysis.trap}</div>
                </div>
                <div className="analysis-card">
                  <div className="analysis-card-key">最早证伪点</div>
                  <div className="analysis-card-value">{article.analysis.falsifyPoint}</div>
                </div>
                <div className="analysis-card">
                  <div className="analysis-card-key">利润兑现口</div>
                  <div className="analysis-card-value">{article.analysis.profitOutlet}</div>
                </div>
              </div>
            </div>
            <div className="article-subsection">
              <div className="article-subtitle">多空对照</div>
              <div className="bb-grid">
                <div className="bb-item bb-item-bull">
                  <div className="bb-k">多头</div>
                  <p className="article-subtext">{article.analysis.bull}</p>
                </div>
                <div className="bb-item bb-item-bear">
                  <div className="bb-k">空头</div>
                  <p className="article-subtext">{article.analysis.bear}</p>
                </div>
              </div>
            </div>
          </details>
        ) : null}
        {viewModel.showSummaryBlock ? (
          <details className="summary-block">
            <summary className="summary-toggle">原文摘录 · 点击展开</summary>
            <p className="summary-text">{article.summary}</p>
          </details>
        ) : null}
        <div className="article-footer">
          <span>{article.source} · {publishedLabel(article)}</span>
          <div className="article-actions">
            <span className="article-obi-chip">{article.obiRef}</span>
            <a className="article-inline-link" href={article.url} rel="noreferrer" target="_blank">
              阅读原文
            </a>
          </div>
        </div>
      </div>
      <div className="score" aria-label={`推荐度 ${article.recommendLevel}/5`}>
        {Array.from({ length: 5 }, (_, index) => {
          const isActive = index < dots(article.recommendLevel).length;
          return <span className={`score-dot${isActive ? " score-dot-active" : ""}`} key={`${article.id}-dot-${index + 1}`} />;
        })}
      </div>
    </article>
  );
}

function buildPageHref(
  pageBySection: ArticleListProps["pageBySection"],
  section: keyof ArticleListProps["pageBySection"],
  page: number
): Route {
  const params = new URLSearchParams();
  for (const key of Object.keys(pageBySection) as Array<keyof ArticleListProps["pageBySection"]>) {
    const value = key === section ? page : pageBySection[key];
    if (value > 1) {
      params.set(`${key}Page`, String(value));
    }
  }
  const query = params.toString();
  return (query ? `/?${query}` : "/") as Route;
}

export function ArticleList({ articles, pageBySection }: ArticleListProps): JSX.Element {
  const sectionViews = buildArticleSections(articles, pageBySection);
  const statusSummary = buildArticleStatusSummary(articles);
  const statusSignals = buildStatusSignals(statusSummary);
  const watchAlerts = buildWatchAlerts(articles);

  return (
    <section className="section">
      <h2 className="section-title">精读文章</h2>
      {articles.length === 0 ? (
        <div className="empty-state">今日未读文章为空。</div>
      ) : (
        <div className="article-sections">
          <section className="article-status-panel">
            <div className="article-status-head">
              <div>
                <h3 className="article-status-title">今日数据状态</h3>
                <p className="article-status-text">先看覆盖率和模板污染，再决定哪些条目值得进入深读。</p>
              </div>
            </div>
            <div className="article-status-grid">
              {statusSignals.map((signal) => (
                <div className={`article-status-card${signal.tone === "warn" ? " article-status-card-warn" : ""}`} key={signal.label}>
                  <div className="article-status-label">{signal.label}</div>
                  <div className="article-status-value">{signal.value}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="watch-alert-panel">
            <div className="article-status-head">
              <div>
                <h3 className="article-status-title">今日警示 / 关注标的</h3>
                <p className="article-status-text">先做环境识别，再看今天需要盯的股票与风险变量。</p>
              </div>
            </div>
            <div className="watch-alert-grid">
              {watchAlerts.map((alert) => (
                <article className="watch-alert-card" key={alert.title}>
                  <div className="watch-alert-title">{alert.title}</div>
                  <div className="watch-alert-tickers">{alert.tickers.join(" / ")}</div>
                  <p className="watch-alert-text">{alert.trigger}</p>
                  <p className="watch-alert-risk">{alert.risk}</p>
                </article>
              ))}
            </div>
          </section>
          {sectionViews.map((section) => {
            return (
              <section className="article-section-block" key={section.section}>
                <div className="article-section-header">
                  <h3 className="article-section-title">{section.title}</h3>
                  <p className="article-section-text">{section.description}</p>
                </div>
                <div className="article-list">{section.visibleItems.map(renderArticleCard)}</div>
                {section.totalPages > 1 ? (
                  <div className="article-pagination">
                    <div className="article-pagination-meta">
                      第 {section.currentPage} / {section.totalPages} 页
                    </div>
                    <div className="article-pagination-actions">
                      {section.currentPage > 1 ? (
                        <Link
                          className="article-page-link"
                          href={buildPageHref(pageBySection, section.section, section.currentPage - 1)}
                          scroll={false}
                        >
                          上一页
                        </Link>
                      ) : (
                        <span className="article-page-link article-page-link-disabled">上一页</span>
                      )}
                      {section.currentPage < section.totalPages ? (
                        <Link
                          className="article-page-link"
                          href={buildPageHref(pageBySection, section.section, section.currentPage + 1)}
                          scroll={false}
                        >
                          下一页
                        </Link>
                      ) : (
                        <span className="article-page-link article-page-link-disabled">下一页</span>
                      )}
                    </div>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}
