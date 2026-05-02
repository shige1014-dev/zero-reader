import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BEDROCK_TIERS,
  FORCE_LABELS,
  GAP_LABEL,
  computeForces,
  getCompaniesByTier,
  getTierById,
  type BedrockCompany,
  type BedrockForces,
  type BedrockTier,
  type BedrockTierId
} from "@/lib/bedrock/data";

interface PageProps {
  params: { id: string };
}

const TIER_IDS = BEDROCK_TIERS.map((t) => t.id) as string[];

export function generateStaticParams() {
  return BEDROCK_TIERS.map((t) => ({ id: t.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tier = getTierById(params.id as BedrockTierId);
  if (!tier) return { title: "基岩层 · BEDROCK" };
  return {
    title: `${tier.label} · 基岩 BEDROCK 2076`,
    description: tier.oneLineRole
  };
}

export default function BedrockTierPage({ params }: PageProps) {
  if (!TIER_IDS.includes(params.id)) notFound();
  const tier = getTierById(params.id as BedrockTierId);
  if (!tier) notFound();
  const companies = getCompaniesByTier(tier.id);

  return (
    <main className="bedrock-shell bedrock-tier-shell">
      <Link href="/bedrock" className="bedrock-back">← 返回基岩层总览</Link>

      <header className="bedrock-tier-head">
        <p className="bedrock-kicker">#{String(tier.order).padStart(2, "0")} · {tier.en}</p>
        <h1>{tier.label}</h1>
        <p className="bedrock-tier-role">{tier.oneLineRole}</p>
        <div className="bedrock-tier-pills">
          <span className={`bedrock-gap-pill bedrock-gap-${tier.gap}`}>缺口 {GAP_LABEL[tier.gap]}</span>
          <span className="bedrock-count-pill">{companies.length} 家代表公司</span>
        </div>
      </header>

      <nav className="bedrock-tier-tabs" aria-label="切换基岩层">
        {BEDROCK_TIERS.map((t) => {
          const active = t.id === tier.id;
          return (
            <Link
              key={t.id}
              href={`/bedrock/tier/${t.id}` as Parameters<typeof Link>[0]["href"]}
              className={"bedrock-tier-tab" + (active ? " is-active" : "")}
            >
              <span className="bedrock-tier-tab-num">#{String(t.order).padStart(2, "0")}</span>
              <span className="bedrock-tier-tab-zh">{t.label}</span>
            </Link>
          );
        })}
      </nav>

      <section className="bedrock-thesis-block">
        <h2>总纲</h2>
        <p>{tier.thesis}</p>
      </section>

      <section className="bedrock-core-block">
        <h2>核心理解</h2>
        <ul>
          {tier.coreIdeas.map((idea) => <li key={idea}>{idea}</li>)}
        </ul>
      </section>

      <section className="bedrock-rhythm-block">
        <h2>当前节奏 vs 所需节奏</h2>
        <p>{tier.rhythmGap}</p>
      </section>

      <section className="bedrock-scatter-block" aria-label="多维分布散点图">
        <header className="bedrock-section-head">
          <p>MULTI-DIMENSION MAP · 二维分布</p>
          <h2>节奏紧度 × 不可替代性</h2>
        </header>
        <ScatterChart companies={companies} tier={tier} />
        <p className="bedrock-frequency-note">
          右上 = 又紧又不可替代（最稀缺）；右下 = 节奏紧但易替代；左上 = 不替代但当前节奏宽松；
          左下 = 边缘玩家。点开下方卡片看每家的 5 维雷达。
        </p>
      </section>

      <section className="bedrock-companies" aria-label={`${tier.label} 代表公司`}>
        <header className="bedrock-section-head">
          <p>REPRESENTATIVE COMPANIES · 5 维分析</p>
          <h2>这一层不可绕过的玩家</h2>
        </header>
        <div className="bedrock-card-grid">
          {companies.map((company, idx) => (
            <CompanyCard key={`${company.ticker}-${idx}`} company={company} index={idx} tier={tier} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ScatterChart({ companies, tier }: { companies: BedrockCompany[]; tier: BedrockTier }) {
  const w = 800, h = 360, pad = 50;
  return (
    <div className="bedrock-chart-wrap">
      <svg viewBox={`0 0 ${w} ${h}`} className="bedrock-chart" preserveAspectRatio="xMidYMid meet">
        {/* axes */}
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        {/* grid */}
        {[2, 4, 6, 8].map((g) => (
          <g key={g}>
            <line x1={pad + (w - 2 * pad) * (g / 10)} y1={pad} x2={pad + (w - 2 * pad) * (g / 10)} y2={h - pad} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1={pad} y1={(h - pad) - (h - 2 * pad) * (g / 10)} x2={w - pad} y2={(h - pad) - (h - 2 * pad) * (g / 10)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </g>
        ))}
        {/* axis labels */}
        <text x={w / 2} y={h - 12} fontSize="11" fontFamily="IBM Plex Mono,monospace" fill="#9aa0a6" textAnchor="middle">
          节奏紧度 →
        </text>
        <text x={pad - 14} y={h / 2} fontSize="11" fontFamily="IBM Plex Mono,monospace" fill="#9aa0a6" textAnchor="middle" transform={`rotate(-90 ${pad - 14} ${h / 2})`}>
          不可替代性 ↑
        </text>
        {/* points */}
        {companies.map((c, i) => {
          const f = computeForces(c, tier);
          const x = pad + (w - 2 * pad) * (f.tightness / 10);
          const y = (h - pad) - (h - 2 * pad) * (f.irreplaceable / 10);
          const r = 5 + f.pricingPower * 0.4;
          return (
            <g key={`${c.ticker}-${i}`}>
              <circle cx={x} cy={y} r={r} fill="rgba(232,201,122,0.18)" stroke="rgba(232,201,122,0.7)" strokeWidth="1.2" />
              <text x={x + r + 4} y={y + 4} fontSize="10" fontFamily="IBM Plex Mono,monospace" fill="#E8C97A">
                {c.ticker}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function RadarChart({ forces }: { forces: BedrockForces }) {
  const cx = 100, cy = 100, r = 70;
  const keys = Object.keys(FORCE_LABELS) as (keyof BedrockForces)[];
  const points = keys.map((k, i) => {
    const angle = (Math.PI * 2 * i / keys.length) - Math.PI / 2;
    const value = forces[k] / 10;
    return {
      x: cx + Math.cos(angle) * r * value,
      y: cy + Math.sin(angle) * r * value,
      ex: cx + Math.cos(angle) * r,
      ey: cy + Math.sin(angle) * r,
      lx: cx + Math.cos(angle) * (r + 14),
      ly: cy + Math.sin(angle) * (r + 14),
      label: FORCE_LABELS[k]
    };
  });
  const polyData = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const guideRings = [0.25, 0.5, 0.75, 1];
  return (
    <svg viewBox="0 0 200 200" className="bedrock-radar" aria-label="5 维力量雷达">
      {guideRings.map((g) => (
        <polygon
          key={g}
          points={points.map((p) => {
            const angle = Math.atan2(p.ey - cy, p.ex - cx);
            return `${(cx + Math.cos(angle) * r * g).toFixed(1)},${(cy + Math.sin(angle) * r * g).toFixed(1)}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.ex} y2={p.ey} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      <polygon points={polyData} fill="rgba(232,201,122,0.18)" stroke="#E8C97A" strokeWidth="1.4" />
      {points.map((p, i) => (
        <text key={`l${i}`} x={p.lx} y={p.ly} fontSize="9" fontFamily="IBM Plex Mono,monospace" fill="#9aa0a6" textAnchor="middle" dominantBaseline="middle">
          {p.label}
        </text>
      ))}
    </svg>
  );
}

const REPL_LABEL: Record<BedrockCompany["replacementYears"], { label: string; cls: string }> = {
  "永不":    { label: "永不被 AI 替代", cls: "repl-never" },
  "20+ 年":  { label: "≥ 20 年", cls: "repl-far" },
  "10-15 年": { label: "10–15 年", cls: "repl-mid" },
  "5-10 年":  { label: "5–10 年", cls: "repl-near" },
  "5 年内":   { label: "≤ 5 年", cls: "repl-soon" }
};

function CompanyCard({ company, index, tier }: { company: BedrockCompany; index: number; tier: BedrockTier }) {
  const repl = REPL_LABEL[company.replacementYears];
  const forces = computeForces(company, tier);
  return (
    <article className={`bedrock-card bedrock-card-stars-${company.starRating}`}>
      <div className="bedrock-card-top">
        <span className="bedrock-card-num">#{String(index + 1).padStart(2, "0")}</span>
        <span className="bedrock-card-country">{company.country}</span>
      </div>

      <div className="bedrock-card-id">
        <h3>{company.ticker}</h3>
        <p className="bedrock-card-namezh">{company.nameZh}</p>
        <p className="bedrock-card-name-en">{company.name}</p>
      </div>

      <div className="bedrock-stars" aria-label={`不可替代性 ${company.starRating} 星`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= company.starRating ? "is-on" : ""}>★</span>
        ))}
        <span className="bedrock-stars-text">不可替代 · {company.starRating}/5</span>
      </div>

      <div className="bedrock-radar-wrap" aria-label="5 维力量雷达">
        <RadarChart forces={forces} />
        <div className="bedrock-force-list">
          {(Object.keys(FORCE_LABELS) as (keyof BedrockForces)[]).map((k) => (
            <div key={k} className="bedrock-force-row">
              <span className="bedrock-force-label">{FORCE_LABELS[k]}</span>
              <span className="bedrock-force-bar" aria-hidden="true">
                <span className="bedrock-force-fill" style={{ width: `${forces[k] * 10}%` }} />
              </span>
              <span className="bedrock-force-num">{forces[k]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bedrock-card-block">
        <span className="bedrock-card-label">🔧 它在做什么</span>
        <p>{company.whatItDoes}</p>
      </div>

      <div className="bedrock-card-block bedrock-card-key">
        <span className="bedrock-card-label">🌋 AI 跨越需要它的什么</span>
        <p>{company.whyAINeedsIt}</p>
      </div>

      <div className="bedrock-card-block">
        <span className="bedrock-card-label">⏱ 节奏 vs 所需</span>
        <p>{company.rhythmStatus}</p>
      </div>

      <div className="bedrock-replbar">
        <span className="bedrock-card-label">⌛ 被 AI 全面替代的时间窗</span>
        <div className={`bedrock-replbar-track ${repl.cls}`}>
          <span className="bedrock-replbar-fill" />
          <span className="bedrock-replbar-text">{repl.label}</span>
        </div>
      </div>

      <div className="bedrock-card-foot">
        <span>替代度: {company.substituteLevel}</span>
        {company.related && (
          <Link
            href={"/matrix" as Parameters<typeof Link>[0]["href"]}
            className="bedrock-card-matrix-link"
          >
            → 在三维金字塔看
          </Link>
        )}
      </div>
    </article>
  );
}
