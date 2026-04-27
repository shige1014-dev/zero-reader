import type { ObiCard } from "@/lib/types";

interface ObiTodayCardProps {
  card: ObiCard | null;
}

function obiApplications(cardId: string): string[] {
  if (cardId.startsWith("bf-")) {
    return ["先校正叙事", "再约束仓位冲动", "最后检查是否在替持仓找证据"];
  }
  return ["先校正框架", "再过滤噪音", "最后把观点变规则"];
}

function obiRisk(cardId: string): string {
  if (cardId === "bf-001") {
    return "别只收集支持自己仓位的证据。";
  }
  return "别只记概念，不转成动作。";
}

function obiConclusion(cardId: string): string {
  if (cardId === "bf-001") {
    return "先找反证，再谈加仓或坚持。";
  }
  return "先校正框架，再处理信息。";
}

function obiLesson(cardId: string): string {
  if (cardId === "bf-001") {
    return "学会识别自己是在更新判断，还是在替原判断辩护。";
  }
  return "学会把概念变成过滤器，而不是背诵材料。";
}

export function ObiTodayCard({ card }: ObiTodayCardProps): JSX.Element {
  if (!card) {
    return (
      <section className="section panel-grid-section">
        <h2 className="section-title">OBI今日卡片</h2>
        <div className="empty-state">今日尚未写入 OBI 卡片。</div>
      </section>
    );
  }

  return (
    <section className="section panel-grid-section">
      <h2 className="section-title">OBI今日卡片</h2>
      <article className="obi-card panel-card">
        <div className="obi-head">
          <div className="obi-badge">◈</div>
          <div className="obi-head-copy">
            <div className="obi-head-meta">OBI / No. {card.id}</div>
            <div className="obi-head-title">{card.cardId}</div>
          </div>
        </div>
        <p className="obi-content">{card.content}</p>
        <div className="obi-grid">
          <div className="obi-item">
            <div className="obi-item-key">一句话结论</div>
            <div className="obi-item-value">{obiConclusion(card.cardId)}</div>
          </div>
          <div className="obi-item">
            <div className="obi-item-key">今天学会什么</div>
            <div className="obi-item-value">{obiLesson(card.cardId)}</div>
          </div>
          <div className="obi-item">
            <div className="obi-item-key">风险提示</div>
            <div className="obi-item-value">{obiRisk(card.cardId)}</div>
          </div>
        </div>
        <div className="article-subsection">
          <div className="article-subtitle">今日动作</div>
          <div className="track-list">
            {obiApplications(card.cardId).map((item) => (
              <div className="track-row" key={`${card.cardId}-${item}`}>
                <span className="track-dot" />
                <span className="track-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="article-subsection">
          <div className="article-subtitle">今日校验</div>
          <p className="article-subtext">遇到反向信息时，你会更新判断，还是只会反驳它？</p>
        </div>
        <div className="obi-source">来源：{card.source} · {card.layer}</div>
      </article>
    </section>
  );
}
