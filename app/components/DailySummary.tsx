import type { Article, Lesson, ObiCard } from "@/lib/types";

interface DailySummaryProps {
  articles: Article[];
  obiCard: ObiCard | null;
  lesson: Lesson | null;
}

function dominantTags(articles: Article[], limit: number): string[] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    const tag = article.tags[0];
    if (!tag) continue;
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

function variableFor(tag: string): string {
  switch (tag) {
    case "量子计算":
      return "复现、客户试点、资本开支是否同步";
    case "AI芯片":
      return "良率、封装、真实需求、议价权";
    case "核能":
      return "审批、融资、设备订单、建设周期";
    case "地缘风险":
      return "供给中断、财政动作、事件持续时间";
    case "宏观":
      return "连续数据、预期修正、跨资产共振";
    default:
      return "连续数据、预期修正、资产共振";
  }
}

function obiAction(cardId: string | undefined): string {
  if (!cardId) return "先校正框架，再过滤噪音，最后把观点变规则。";
  if (cardId.startsWith("bf-")) {
    return "先校正叙事 → 约束仓位冲动 → 检查是否在替持仓找证据。";
  }
  return "先校正框架 → 过滤噪音 → 把观点变规则。";
}

function lessonAction(concept: string | undefined): string {
  if (!concept) return "";
  if (concept.includes("Transformer")) return "用「数据/算力/分发」三栏拆一家公司。";
  if (concept.includes("LLM")) return "挑一条 AI 新闻，区分能力提升和商业提升。";
  if (concept.includes("RAG")) return "列一个必须依赖实时数据的场景。";
  return "用一句话写出它对投资判断的用处。";
}

export function DailySummary({ articles, obiCard, lesson }: DailySummaryProps): JSX.Element {
  const tags = dominantTags(articles, 3);

  if (articles.length === 0 && !obiCard && !lesson) {
    return (
      <section className="section">
        <h2 className="section-title">每日总结</h2>
        <div className="empty-state">今日数据尚未就绪。</div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">每日总结</h2>
      <article className="summary-card panel-card">
        <div className="summary-banner">
          <div className="summary-banner-overlay" />
          <div className="summary-banner-tag">文明跃迁 / DAILY BRIEFING</div>
        </div>
        <div className="summary-body">
          <div className="summary-grid">
            <div className="summary-column">
              <div className="summary-column-label">关键变量</div>
              {tags.length === 0 ? (
                <div className="summary-var-list">
                  <div className="summary-var-item">
                    <span className="summary-var-label">宏观</span>
                    <span className="summary-var-value">连续数据、预期修正、跨资产共振。</span>
                  </div>
                </div>
              ) : (
                <div className="summary-var-list">
                  {tags.map((tag) => (
                    <div className="summary-var-item" key={`var-${tag}`}>
                      <span className="summary-var-label">{tag}</span>
                      <span className="summary-var-value">{variableFor(tag)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="article-subsection">
            <div className="article-subtitle">今日动作</div>
            <div className="summary-action-list">
              <div className="summary-action-item">
                <span className="summary-action-index">01</span>
                <span className="summary-action-text">{obiAction(obiCard?.cardId)}</span>
              </div>
              {lesson ? (
                <div className="summary-action-item">
                  <span className="summary-action-index">02</span>
                  <span className="summary-action-text">{lessonAction(lesson.concept)}</span>
                </div>
              ) : null}
              <div className="summary-action-item">
                <span className="summary-action-index">03</span>
                <span className="summary-action-text">对必读文章跑一遍「跟踪点 → 最早露馅点 → 利润兑现口」三问。</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
