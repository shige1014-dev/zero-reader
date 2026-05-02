import type { Metadata } from "next";
import Link from "next/link";
import { BEDROCK_TIERS, getCompaniesByTier, GAP_LABEL, ATTENTION_LABEL } from "@/lib/bedrock/data";
import type { BedrockTierId } from "@/lib/bedrock/data";

export const metadata: Metadata = {
  title: "基岩层 · BEDROCK 2076",
  description: "AI 不是软件在跑赢硬件，是软件在等硬件。"
};

export default function BedrockOverviewPage() {
  return (
    <main className="bedrock-shell">
      <header className="bedrock-hero">
        <p className="bedrock-kicker">ZERO 2076 · BEDROCK · 同频认知地图</p>
        <h1>AI 不是软件在跑赢硬件<br />是软件在等硬件</h1>
        <div className="bedrock-thesis">
          <p>
            互联网时代：软件单边扩张，物理基建慢慢跟进，没问题。
          </p>
          <p>
            AI 时代：算法增长指数级，但训练 1 个前沿大模型耗电相当于一座中型城市半年用电。
            软硬必须 <strong>同频</strong>，否则顶部空转，估值见顶。
          </p>
          <p className="bedrock-thesis-tag">
            这页不是选股清单——是地基对照课。地基不在场，AI 跨不过去。
          </p>
        </div>
      </header>

      <section className="bedrock-frequency" aria-label="软件与硬件节奏对照图">
        <header className="bedrock-section-head">
          <p>FREQUENCY MISMATCH · 节奏对照</p>
          <h2>软件甩开硬件 3-5 年</h2>
        </header>
        <FrequencyChart />
        <p className="bedrock-frequency-note">
          上轨：算法能力曲线（GPT-3 → 4 → 5 → 推测中的 ASI）。
          下轨：物理基建（电力、光刻、电池产能、关键材料）。
          两轨之间的 gap 就是当下「估值见顶」的真正解释。
        </p>
      </section>

      <section className="bedrock-strata" aria-label="十大基岩层切面">
        <header className="bedrock-section-head">
          <p>STRATA · 矿层切面</p>
          <h2>从浅到深的十大地基层</h2>
        </header>
        <StratumChart />
      </section>

      <section className="bedrock-tier-grid" aria-label="基岩 10 大层入口">
        <header className="bedrock-section-head">
          <p>10 TIERS · 分类详情</p>
          <h2>每一层都是 AI 必须等待的环节</h2>
        </header>
        <div className="bedrock-tile-list">
          {BEDROCK_TIERS.map((tier) => {
            const companies = getCompaniesByTier(tier.id);
            return (
              <Link
                key={tier.id}
                href={`/bedrock/tier/${tier.id}` as Parameters<typeof Link>[0]["href"]}
                className={`bedrock-tile bedrock-gap-${tier.gap}`}
                aria-label={`${tier.label} · ${companies.length} 家代表公司`}
              >
                <span className="bedrock-tile-num">#{String(tier.order).padStart(2, "0")}</span>
                <span className="bedrock-tile-en">{tier.en}</span>
                <span className="bedrock-tile-zh">{tier.label}</span>
                <span className="bedrock-tile-role">{tier.oneLineRole}</span>
                <span className="bedrock-tile-meta">
                  <span className={`bedrock-gap-pill bedrock-gap-${tier.gap}`}>
                    缺口 {GAP_LABEL[tier.gap]}
                  </span>
                  <span className="bedrock-attention-pill">
                    关注度 {ATTENTION_LABEL[tier.attentionLevel]}
                  </span>
                  <span className="bedrock-count-pill">{companies.length} 家代表</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function FrequencyChart() {
  // SVG inline, two curves: AI capability (steep) vs physical infra (gradual)
  return (
    <div className="bedrock-chart-wrap">
      <svg viewBox="0 0 800 320" className="bedrock-chart" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="aiCurve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8c97a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e8c97a" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="infraCurve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a65a3a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a65a3a" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gapFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a65a3a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#a65a3a" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* axes */}
        <line x1="60" y1="280" x2="780" y2="280" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1="60" y1="40" x2="60" y2="280" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

        {/* gap area (between two curves) */}
        <path
          d="M 100 240 Q 220 220 360 170 T 700 50 L 700 250 Q 540 235 380 225 T 100 215 Z"
          fill="url(#gapFill)"
        />

        {/* infra curve (gradual) */}
        <path
          d="M 100 250 Q 280 240 460 230 T 740 215"
          stroke="url(#infraCurve)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* AI capability curve (steep) */}
        <path
          d="M 100 240 Q 220 220 360 170 Q 500 110 700 50"
          stroke="url(#aiCurve)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* labels on curves */}
        <text x="710" y="40" fill="#e8c97a" fontSize="13" fontFamily="IBM Plex Mono, monospace" textAnchor="end">
          软件能力 ↗
        </text>
        <text x="710" y="208" fill="#a65a3a" fontSize="13" fontFamily="IBM Plex Mono, monospace" textAnchor="end">
          物理基建 →
        </text>

        {/* milestone dots */}
        <g fill="#e8c97a">
          <circle cx="120" cy="245" r="3.5" /> <text x="120" y="265" fontSize="10" fontFamily="IBM Plex Mono, monospace" textAnchor="middle" fill="#9aa0a6">GPT-3</text>
          <circle cx="220" cy="225" r="3.5" /> <text x="220" y="265" fontSize="10" fontFamily="IBM Plex Mono, monospace" textAnchor="middle" fill="#9aa0a6">ChatGPT</text>
          <circle cx="340" cy="180" r="3.5" /> <text x="340" y="265" fontSize="10" fontFamily="IBM Plex Mono, monospace" textAnchor="middle" fill="#9aa0a6">GPT-4</text>
          <circle cx="500" cy="115" r="3.5" /> <text x="500" y="265" fontSize="10" fontFamily="IBM Plex Mono, monospace" textAnchor="middle" fill="#9aa0a6">Claude 4</text>
          <circle cx="660" cy="65" r="3.5" /> <text x="660" y="265" fontSize="10" fontFamily="IBM Plex Mono, monospace" textAnchor="middle" fill="#9aa0a6">推测 ASI</text>
        </g>

        {/* timeline labels */}
        <text x="60" y="305" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#5a6068">2020</text>
        <text x="780" y="305" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#5a6068" textAnchor="end">2030+</text>

        {/* axis labels */}
        <text x="40" y="48" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#5a6068" textAnchor="end" transform="rotate(-90 40 48)">能力 / 容量 ↑</text>

        {/* gap label */}
        <text x="430" y="155" fontSize="13" fontFamily="IBM Plex Mono, monospace" fill="#a65a3a" textAnchor="middle" fontWeight="600">
          ⬛ GAP · 顶部空转区
        </text>
      </svg>
    </div>
  );
}

function StratumChart() {
  // Horizontal bands representing 10 strata, each with mini company nodes
  const colors = [
    "#3a4250", // semi-equipment - light blue-gray
    "#444a55", // semi-materials - silver-gray
    "#3d4d3a", // power-grid - dark moss green
    "#5c3a32", // rare-metals - rust
    "#4a4a3a", // battery - olive
    "#5a3f2a", // motor-power - copper
    "#36404a", // photonics-sensing - cool grey-blue
    "#3a3a3a", // dc-physical - graphite
    "#2f3a3a", // photonics-network - deep teal
    "#1f1f24"  // eda-ip - basalt black
  ];
  return (
    <div className="bedrock-stratum-wrap">
      <svg viewBox="0 0 800 480" className="bedrock-stratum" preserveAspectRatio="xMidYMid meet">
        {BEDROCK_TIERS.map((tier, idx) => {
          const y = 30 + idx * 42;
          const companies = getCompaniesByTier(tier.id);
          return (
            <g key={tier.id}>
              <rect x="60" y={y} width="680" height="36" fill={colors[idx]} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x="50" y={y + 22} fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#9aa0a6" textAnchor="end">
                #{String(idx + 1).padStart(2, "0")}
              </text>
              <text x="80" y={y + 16} fontSize="13" fontFamily='"Iowan Old Style","Noto Sans SC",serif' fill="#F5EFE3" fontWeight="600">
                {tier.label}
              </text>
              <text x="80" y={y + 30} fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#7a808a">
                {tier.en}
              </text>
              {/* company micro nodes */}
              {companies.slice(0, 8).map((company, i) => {
                const cx = 380 + i * 38;
                const op = 0.4 + (company.bypassIndex / 20);
                return (
                  <g key={company.ticker}>
                    <rect
                      x={cx - 6}
                      y={y + 12}
                      width="12"
                      height="12"
                      fill={`rgba(232, 201, 122, ${op})`}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="0.5"
                      transform={`rotate(45 ${cx} ${y + 18})`}
                    />
                  </g>
                );
              })}
              <text x="730" y={y + 22} fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#9aa0a6" textAnchor="end">
                {companies.length} 家
              </text>
            </g>
          );
        })}
        <text x="400" y="475" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#5a6068" textAnchor="middle">
          ↓ 越深的层级越被忽视，越被 AI 估值忽略 — 但越是地基。
        </text>
      </svg>
    </div>
  );
}
