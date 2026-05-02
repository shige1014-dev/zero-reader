import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BEDROCK_TIERS,
  GAP_LABEL,
  getCompaniesByTier,
  getTierById,
  type BedrockCompany,
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

      <section className="bedrock-companies" aria-label={`${tier.label} 代表公司`}>
        <header className="bedrock-section-head">
          <p>REPRESENTATIVE COMPANIES</p>
          <h2>这一层不可绕过的玩家</h2>
        </header>
        <div className="bedrock-card-grid">
          {companies.map((company, idx) => (
            <CompanyCard key={`${company.ticker}-${idx}`} company={company} index={idx} />
          ))}
        </div>
      </section>
    </main>
  );
}

const REPL_LABEL: Record<BedrockCompany["replacementYears"], { label: string; cls: string }> = {
  "永不":    { label: "永不被 AI 替代", cls: "repl-never" },
  "20+ 年":  { label: "≥ 20 年", cls: "repl-far" },
  "10-15 年": { label: "10–15 年", cls: "repl-mid" },
  "5-10 年":  { label: "5–10 年", cls: "repl-near" },
  "5 年内":   { label: "≤ 5 年", cls: "repl-soon" }
};

function CompanyCard({ company, index }: { company: BedrockCompany; index: number }) {
  const repl = REPL_LABEL[company.replacementYears];
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
