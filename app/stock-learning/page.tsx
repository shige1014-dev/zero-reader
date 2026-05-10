import type { Metadata } from "next";
import Link from "next/link";
import {
  portfolioRoles,
  ratingLabels,
  STOCK_CATEGORIES,
  STOCK_LEARNING_CANDIDATES
} from "@/lib/stock-learning/data";
import { getEnrichment } from "@/lib/stock-learning/enrichments";
import StockLearnNav from "./StockLearnNav";
import "./stock-learning.css";

export const metadata: Metadata = {
  title: "股票学习网",
  description: "2030 前长期股票学习池：分类、评级、网上分析师共识、组合建议与未来潜力值。"
};

const roleOrder = { core: 0, growth: 1, option: 2, watch: 3 };
const ratingScore = { S: 4, A: 3, B: 2, C: 1 };

const candidates = [...STOCK_LEARNING_CANDIDATES].sort((a, b) => {
  const roleDiff = roleOrder[a.portfolioRole] - roleOrder[b.portfolioRole];
  if (roleDiff !== 0) return roleDiff;
  const ratingDiff = ratingScore[b.rating] - ratingScore[a.rating];
  if (ratingDiff !== 0) return ratingDiff;
  return b.futurePotential - a.futurePotential;
});

const topCandidates = candidates.slice(0, 12);
const onlineStrongBuyCount = STOCK_LEARNING_CANDIDATES.filter((item) => item.online.consensus === "Strong Buy").length;
const noCoverageCount = STOCK_LEARNING_CANDIDATES.filter((item) => item.online.consensus === "无覆盖").length;

export default function StockLearningPage() {
  return (
    <main className="stocklearn-shell">
      <header className="stocklearn-hero">
        <p className="stocklearn-kicker">ZERO 2076 · STOCK LEARNING NETWORK</p>
        <h1>股票学习网</h1>
        <p className="stocklearn-lead">
          这不是短线买卖表，而是把 2030 前值得持续学习的股票放进同一张认知网：
          先看产业位置，再看网上评级，最后用组合角色控制仓位。
        </p>
        <div className="stocklearn-stats" aria-label="股票学习网统计">
          <Metric label="候选标的" value={`${STOCK_LEARNING_CANDIDATES.length} 只`} />
          <Metric label="主题层" value={`${STOCK_CATEGORIES.length} 类`} />
          <Metric label="网上 Strong Buy" value={`${onlineStrongBuyCount} 只`} />
          <Metric label="待核验覆盖" value={`${noCoverageCount} 只`} />
        </div>
        <p className="stocklearn-disclaimer">
          网上评级来自 StockAnalysis 公开分析师共识抓取，时间敏感；长期评级是学习台内部框架，不构成投资建议。
        </p>
      </header>

      <section className="stocklearn-section" aria-label="组合推荐">
        <div className="stocklearn-section-head">
          <p>PORTFOLIO MAP</p>
          <h2>持有组合推荐</h2>
        </div>
        <div className="stocklearn-portfolio">
          {STOCK_CATEGORIES.map((category) => {
            const items = STOCK_LEARNING_CANDIDATES.filter((item) => item.category === category.id);
            return (
              <article key={category.id} className="stocklearn-alloc">
                <div className="stocklearn-alloc-top">
                  <span>{category.label}</span>
                  <strong>{category.allocation}%</strong>
                </div>
                <div className="stocklearn-alloc-bar" aria-hidden="true">
                  <span style={{ width: `${category.allocation * 4}%` }} />
                </div>
                <p>{category.thesis}</p>
                <div className="stocklearn-mini-tickers">
                  {items.slice(0, 6).map((item) => (
                    <a key={item.ticker} href={`#tk-${item.ticker}`} className="stocklearn-mini-link">{item.ticker}</a>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stocklearn-section" aria-label="最高优先级">
        <div className="stocklearn-section-head">
          <p>HIGH CONVICTION</p>
          <h2>优先跟踪名单</h2>
        </div>
        <div className="stocklearn-priority-grid">
          {topCandidates.map((item) => (
            <a key={item.ticker} href={`#tk-${item.ticker}`} className={`stocklearn-priority stocklearn-priority-link stocklearn-rating-${item.rating.toLowerCase()}`}>
              <div>
                <span className="stocklearn-ticker">{item.ticker}</span>
                <p>{item.nameZh}</p>
              </div>
              <strong>{item.futurePotential}</strong>
              <span>{ratingLabels[item.rating]} · {portfolioRoles[item.portfolioRole]}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="stocklearn-section" aria-label="股票分类评级表">
        <div className="stocklearn-section-head">
          <p>CLASSIFIED WATCHLIST</p>
          <h2>分类、评级、理由</h2>
        </div>
        <StockLearnNav />
        <div className="stocklearn-category-stack">
          {STOCK_CATEGORIES.map((category) => {
            const items = candidates.filter((item) => item.category === category.id);
            return (
              <section key={category.id} id={`cat-${category.id}`} className="stocklearn-category">
                <header className="stocklearn-category-head">
                  <div>
                    <p>{category.allocation}% MODEL WEIGHT</p>
                    <h3>{category.label}</h3>
                  </div>
                  <span>{items.length} 只</span>
                </header>
                <div className="stocklearn-card-grid">
                  {items.map((item) => {
                    const ext = getEnrichment(item.ticker);
                    return (
                    <article key={item.ticker} id={`tk-${item.ticker}`} className="stocklearn-card">
                      <div className="stocklearn-card-top">
                        <div>
                          <h4>{item.ticker}</h4>
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

                      {ext?.products && ext.products.length > 0 && (
                        <div className="stocklearn-mini-block">
                          <h5>🎯 关键产品</h5>
                          <ul>{ext.products.map((p) => <li key={p}>{p}</li>)}</ul>
                        </div>
                      )}

                      {(ext?.customers || ext?.competitors) && (
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

                      {ext?.catalysts && ext.catalysts.length > 0 && (
                        <div className="stocklearn-mini-block">
                          <h5>🔥 催化</h5>
                          <ul>{ext.catalysts.map((c) => <li key={c}>{c}</li>)}</ul>
                        </div>
                      )}

                      {ext?.scenarios && (
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

                      {ext?.industryTags && ext.industryTags.length > 0 && (
                        <div className="stocklearn-tag-row">
                          {ext.industryTags.map((t) => <span key={t}>{t}</span>)}
                        </div>
                      )}

                      <div className="stocklearn-online">
                        <span>网上评级</span>
                        <strong>{item.online.consensus}</strong>
                        <em>
                          {item.online.analysts === null ? "无分析师覆盖" : `${item.online.analysts} 位 · 目标价 ${item.online.target} · ${item.online.upside}`}
                        </em>
                        <a href={item.online.sourceUrl} target="_blank" rel="noreferrer">来源</a>
                      </div>
                    </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="stocklearn-section stocklearn-rules" aria-label="使用规则">
        <div className="stocklearn-section-head">
          <p>OPERATING RULES</p>
          <h2>学习台使用规则</h2>
        </div>
        <div className="stocklearn-rule-grid">
          <Rule title="先分层" body="核心仓看产业确定性和现金流，期权仓看范式突破，不能把小盘高弹性当成长期确定性。" />
          <Rule title="再看共识" body="网上 Buy / Strong Buy 只能说明机构短期态度，不自动等于 2030 胜率；目标价为 12 个月维度。" />
          <Rule title="最后控仓" body="单只高波动小盘不应超过模型权重上限；同一主题同时上涨时，用主题总仓位控制风险。" />
        </div>
        <Link href="/matrix" className="stocklearn-backlink">回到三维股票矩阵</Link>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="stocklearn-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <article className="stocklearn-rule">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

