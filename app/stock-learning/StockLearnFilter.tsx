"use client";
import { useMemo, useState } from "react";
import {
  STOCK_CATEGORIES,
  portfolioRoles,
  ratingLabels,
  type StockLearningCandidate
} from "@/lib/stock-learning/data";
import { getEnrichment } from "@/lib/stock-learning/enrichments";

type Rating = "all" | "S" | "A" | "B" | "C";
type Role = "all" | "core" | "growth" | "option" | "watch";
type Sort = "default" | "potential" | "upside" | "ticker";

const ratingOrder = { S: 0, A: 1, B: 2, C: 3 };

function parseUpside(s: string): number {
  const m = s.match(/([+-]?\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : -999;
}

export default function StockLearnFilter({ candidates }: { candidates: StockLearningCandidate[] }) {
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState<Rating>("all");
  const [role, setRole] = useState<Role>("all");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("default");
  const [showEnrichOnly, setShowEnrichOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...candidates];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.ticker.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.nameZh.toLowerCase().includes(q)
      );
    }
    if (rating !== "all") list = list.filter((c) => c.rating === rating);
    if (role !== "all") list = list.filter((c) => c.portfolioRole === role);
    if (category !== "all") list = list.filter((c) => c.category === category);
    if (showEnrichOnly) list = list.filter((c) => getEnrichment(c.ticker));

    if (sort === "potential") list.sort((a, b) => b.futurePotential - a.futurePotential);
    else if (sort === "upside") list.sort((a, b) => parseUpside(b.online.upside) - parseUpside(a.online.upside));
    else if (sort === "ticker") list.sort((a, b) => a.ticker.localeCompare(b.ticker));
    else
      list.sort((a, b) => {
        const r = ratingOrder[a.rating] - ratingOrder[b.rating];
        if (r !== 0) return r;
        return b.futurePotential - a.futurePotential;
      });
    return list;
  }, [candidates, query, rating, role, category, sort, showEnrichOnly]);

  return (
    <section className="stocklearn-filter-section">
      <div className="stocklearn-filter-bar">
        <input
          className="sl-search"
          placeholder="🔍 搜 ticker / 名称 (e.g. PLTR / 帕兰提尔 / palantir)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="sl-filter-group">
          <span className="sl-fl-label">评级</span>
          {(["all", "S", "A", "B", "C"] as Rating[]).map((r) => (
            <button
              key={r}
              className={`sl-chip ${rating === r ? "active" : ""} ${r !== "all" ? `sl-tier-${r.toLowerCase()}` : ""}`}
              onClick={() => setRating(r)}
            >
              {r === "all" ? "全部" : `${r} (${candidates.filter((c) => c.rating === r).length})`}
            </button>
          ))}
        </div>
        <div className="sl-filter-group">
          <span className="sl-fl-label">仓位</span>
          {(["all", "core", "growth", "option", "watch"] as Role[]).map((r) => (
            <button key={r} className={`sl-chip ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
              {r === "all" ? "全部" : portfolioRoles[r as Exclude<Role, "all">]}
            </button>
          ))}
        </div>
        <div className="sl-filter-group">
          <span className="sl-fl-label">板块</span>
          <select className="sl-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">全部 ({candidates.length})</option>
            {STOCK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} ({candidates.filter((x) => x.category === c.id).length})
              </option>
            ))}
          </select>
        </div>
        <div className="sl-filter-group">
          <span className="sl-fl-label">排序</span>
          <select className="sl-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="default">评级 + 潜力</option>
            <option value="potential">潜力值 ↓</option>
            <option value="upside">上行 ↓</option>
            <option value="ticker">代码 A-Z</option>
          </select>
        </div>
        <label className="sl-checkbox">
          <input type="checkbox" checked={showEnrichOnly} onChange={(e) => setShowEnrichOnly(e.target.checked)} />
          <span>仅看完整资料</span>
        </label>
      </div>

      <div className="sl-result-bar">
        <span>
          匹配: <b>{filtered.length}</b> / {candidates.length}
        </span>
        {(query || rating !== "all" || role !== "all" || category !== "all" || showEnrichOnly) && (
          <button
            className="sl-clear"
            onClick={() => {
              setQuery("");
              setRating("all");
              setRole("all");
              setCategory("all");
              setShowEnrichOnly(false);
            }}
          >
            ✕ 清空筛选
          </button>
        )}
      </div>

      <div className="stocklearn-card-grid">
        {filtered.length === 0 ? (
          <div className="sl-empty">— 没有匹配的标的 —</div>
        ) : (
          filtered.map((item) => {
            const ext = getEnrichment(item.ticker);
            return (
              <article key={item.ticker} className={`stocklearn-card stocklearn-rating-${item.rating.toLowerCase()}`}>
                <div className="stocklearn-card-top">
                  <div>
                    <h4>
                      {item.ticker}
                      <span className={`sl-tier-badge sl-tier-${item.rating.toLowerCase()}`}>⭐ {item.rating}</span>
                    </h4>
                    <p>{item.nameZh}</p>
                    <span>{item.name}</span>
                  </div>
                  <div className="stocklearn-score">
                    <strong>{item.futurePotential}</strong>
                    <span>潜力值</span>
                  </div>
                </div>
                <div className="stocklearn-badges">
                  <span>{ratingLabels[item.rating]}</span>
                  <span>{portfolioRoles[item.portfolioRole]}</span>
                  <span>{item.suggestedWeight}</span>
                </div>

                {ext && (ext.exchange || ext.hq || ext.founded || ext.employees || ext.ceo) && (
                  <ul className="stocklearn-meta-row">
                    {ext.exchange && <li>📈 {ext.exchange}</li>}
                    {ext.hq && <li>📍 {ext.hq}</li>}
                    {ext.founded && <li>🗓 {ext.founded}</li>}
                    {ext.employees && <li>👥 {ext.employees}</li>}
                    {ext.ceo && <li>👤 {ext.ceo}</li>}
                  </ul>
                )}

                <p className="stocklearn-thesis">{ext?.business ?? item.thesis}</p>
                <p className="stocklearn-risk">{item.risk}</p>

                {ext && (
                  <details className="sl-detail">
                    <summary>▸ 展开详情 (产品 / 客户 / 对手 / 三态)</summary>
                    {ext.products && ext.products.length > 0 && (
                      <div className="stocklearn-mini-block">
                        <h5>🎯 关键产品</h5>
                        <ul>
                          {ext.products.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {(ext.customers || ext.competitors) && (
                      <div className="stocklearn-twocol-block">
                        {ext.customers && (
                          <div>
                            <h5>🤝 客户</h5>
                            <p>{ext.customers.join(" · ")}</p>
                          </div>
                        )}
                        {ext.competitors && (
                          <div>
                            <h5>⚔ 对手</h5>
                            <p>{ext.competitors.join(" · ")}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {ext.catalysts && ext.catalysts.length > 0 && (
                      <div className="stocklearn-mini-block">
                        <h5>🔥 催化</h5>
                        <ul>
                          {ext.catalysts.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {ext.scenarios && (
                      <div className="stocklearn-scenarios">
                        <div className="ss-row ss-bull">
                          <strong>🐂 牛</strong>
                          <span>{ext.scenarios.bull.trigger}</span>
                          <em>{ext.scenarios.bull.impact}</em>
                        </div>
                        <div className="ss-row ss-base">
                          <strong>⚖ 基</strong>
                          <span>{ext.scenarios.base.trigger}</span>
                          <em>{ext.scenarios.base.impact}</em>
                        </div>
                        <div className="ss-row ss-bear">
                          <strong>🐻 熊</strong>
                          <span>{ext.scenarios.bear.trigger}</span>
                          <em>{ext.scenarios.bear.impact}</em>
                        </div>
                      </div>
                    )}
                    {ext.industryTags && ext.industryTags.length > 0 && (
                      <div className="stocklearn-tag-row">
                        {ext.industryTags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </details>
                )}

                <div className="stocklearn-online">
                  <span>网上评级</span>
                  <strong>{item.online.consensus}</strong>
                  <em>
                    {item.online.analysts === null
                      ? "无分析师覆盖"
                      : `${item.online.analysts} 位 · 目标 ${item.online.target} · ${item.online.upside}`}
                  </em>
                  <a href={item.online.sourceUrl} target="_blank" rel="noreferrer">
                    来源
                  </a>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
