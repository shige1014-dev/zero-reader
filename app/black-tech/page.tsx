import type { Metadata } from "next";
import Link from "next/link";
import {
  BLACK_TECH_FUNNEL,
  BLACK_TECH_MATURITY_ORDER,
  BLACK_TECHS,
  EXPOSURE_LEVELS,
  LEVEL_LABELS,
  PRIMARY_FIELDS,
  getMuseumEra,
  type BlackTech,
  type CivilianField,
  type ExposureLevel
} from "@/lib/black-tech/data";
import { BlackTechIntelPanel } from "./black-tech-intel-panel";
import { ObserveButton } from "./observe-button";

export const metadata: Metadata = {
  title: "黑科技谱系 · BLACK TECH 2076",
  description: "从军方黑科技到未来民用场景的谱系地图。"
};

export default function BlackTechPage() {
  const stats = EXPOSURE_LEVELS.map((level) => ({
    label: level,
    count: BLACK_TECHS.filter((tech) => tech.level === level).length
  }));
  const fieldCards = PRIMARY_FIELDS.map((field) => fieldSummary(field));

  return (
    <main className="blacktech-shell">
      <section className="blacktech-hero" aria-label="黑科技系列导言">
        <div className="blacktech-hero-copy">
          <p className="blacktech-kicker">BLACK TECH 2076 · MILITARY SHADOW TO CIVILIAN LIFE</p>
          <h1>黑科技谱系</h1>
          <p className="blacktech-manifest">军方先用 · 民用后到 · 从黑箱到日常</p>
          <p className="blacktech-thesis">
            所有民用科技，几乎都曾有一段黑箱期。互联网、GPS、语音识别、无人机、mRNA、夜视与精密导航，
            很多最早都不是为消费市场设计。这页追踪三类信号：已经公开的军用技术、半公开的项目方向、
            以及在网上流传但证据不足的猜想。
          </p>
          <div className="blacktech-legend" aria-label="可信度分层">
            {stats.map((stat) => (
              <span key={stat.label}>
                <i className={LEVEL_LABELS[stat.label].dotClassName} />
                {stat.label} {stat.count}
              </span>
            ))}
          </div>
        </div>
        <div className="blacktech-radar" aria-hidden="true">
          <div className="blacktech-radar-ring ring-a" />
          <div className="blacktech-radar-ring ring-b" />
          <div className="blacktech-radar-ring ring-c" />
          <div className="blacktech-sweep" />
          <span className="node node-1" />
          <span className="node node-2" />
          <span className="node node-3" />
          <span className="node node-4" />
          <p>2076<br />TECH<br />SCAN</p>
        </div>
      </section>

      <BlackTechIntelPanel stats={stats}>
        <section className="blacktech-maturity-board" aria-label="按成熟度分层的黑科技档案">
          {BLACK_TECH_MATURITY_ORDER.map((maturity) => {
            const techs = BLACK_TECHS.filter((tech) => tech.maturity === maturity);
            if (techs.length === 0) return null;

            return (
              <section key={maturity} className="blacktech-maturity-section" aria-label={maturity}>
                <header className="blacktech-maturity-head">
                  <p>{maturity}</p>
                  <span>{techs.length} SIGNALS</span>
                </header>
                <div className="blacktech-grid">
                  {techs.map((tech, index) => (
                    <BlackTechCard key={tech.id} tech={tech} index={index + 1} />
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        <section className="blacktech-map" aria-label="民用转化路径">
          <header className="blacktech-section-head">
            <p>TRANSFER MAP · 转民用路径</p>
            <h2>军方先用的，不等于民用一定会来；关键看成本、监管、供应链</h2>
          </header>
          <div className="blacktech-transfer-grid">
            {fieldCards.map((field) => (
              <article
                key={field.label}
                className="blacktech-transfer-card"
                data-field-card={field.label}
              >
                <span>{field.label}</span>
                <p>{field.products}</p>
                <strong>{field.change}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="blacktech-funnel" aria-label="黑科技转民用漏斗">
          <header className="blacktech-section-head">
            <p>TRANSFER FUNNEL · 漏斗</p>
            <h2>把黑科技当作“转化漏斗”，不要当作阴谋清单</h2>
          </header>
          <FunnelSvg />
        </section>
      </BlackTechIntelPanel>
    </main>
  );
}

function BlackTechCard({ tech, index }: { tech: BlackTech; index: number }) {
  const era = getMuseumEra(tech.museumEraId);
  const href = "/museum.html" as Parameters<typeof Link>[0]["href"];

  return (
    <article
      className={`mem-card mem-board-card blacktech-card blacktech-card-${signalClass(tech.level)}`}
      data-blacktech-card
      data-level={tech.level}
      data-fields={tech.industries.join(" ")}
    >
      <div className="mem-card-body blacktech-card-body">
        <span className="mem-card-top blacktech-card-top">
          <span className="mem-card-no">#{String(index).padStart(2, "0")}</span>
          <span className={`blacktech-level ${LEVEL_LABELS[tech.level].className}`}>
            <i className={LEVEL_LABELS[tech.level].dotClassName} />
            {tech.level}
          </span>
        </span>

        <p className="blacktech-en">{tech.en}</p>
        <h2 className="mem-card-title blacktech-title">{tech.title}</h2>
        <div className="blacktech-meta-line">
          <span>{tech.maturity}</span>
          <span>{tech.horizon}</span>
          <span>CONF {tech.confidence}</span>
        </div>
        <div className="blacktech-meter" aria-label={`可信度 ${tech.confidence}`}>
          <span style={{ width: `${tech.confidence}%` }} />
        </div>

        <p className="blacktech-review">{tech.review}</p>

        <div className="blacktech-brief-grid" aria-label={`${tech.title} 四段情报`}>
          <IntelDetail icon="◆" label="军方源头" text={tech.militaryOrigin} />
          <IntelDetail icon="◇" label="转化门槛" text={tech.transferGate} />
          <IntelDetail icon="◌" label="观察信号" text={tech.signal} />
          <IntelDetail icon="⇢" label="转化路径" text={tech.transferPath} />
        </div>

        <div className="blacktech-civilian-stack" aria-label={`${tech.title} 的民用转化`}>
          {tech.civilianApplications.map((app) => (
            <div key={`${tech.id}-${app.field}-${app.product}`} className="blacktech-civilian-row">
              <span>{app.field}</span>
              <p><b>{app.product}</b>{app.changes}</p>
            </div>
          ))}
        </div>

        <details className="blacktech-future">
          <summary>
            <span className="blacktech-future-tag">FUTURE SCENARIO · 未来情境</span>
            <span className="blacktech-future-cta">展开 ↓</span>
          </summary>
          <p className="blacktech-future-example">📍 {tech.civilianFuture.example}</p>
          <dl className="blacktech-future-grid">
            <div>
              <dt>新公司类型</dt>
              <dd>{tech.civilianFuture.newCompanies}</dd>
            </div>
            <div>
              <dt>产业冲击</dt>
              <dd>{tech.civilianFuture.industryImpact}</dd>
            </div>
            <div>
              <dt>AI 加成后</dt>
              <dd>{tech.civilianFuture.aiSynergy}</dd>
            </div>
            <div>
              <dt>社会结构</dt>
              <dd>{tech.civilianFuture.socialChange}</dd>
            </div>
          </dl>
        </details>

        <div className="blacktech-change">
          <span>改变什么</span>
          <p>{tech.biggestChange}</p>
        </div>

        <div className="blacktech-card-actions">
          <Link href={href} className="mem-card-cta blacktech-era-link">
            关联 MUSEUM：{era?.label ?? tech.museumEraId} →
          </Link>
          <ObserveButton techId={tech.id} title={tech.title} />
        </div>
      </div>
    </article>
  );
}

function IntelDetail({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <details className="blacktech-intel-detail">
      <summary>
        <span>{icon}</span>
        <b>{label}</b>
        <em>{text.slice(0, 80)}{text.length > 80 ? "..." : ""}</em>
      </summary>
      <p>{text}</p>
    </details>
  );
}

function FunnelSvg() {
  const widths = [620, 500, 380, 260];
  return (
    <svg className="blacktech-funnel-svg" viewBox="0 0 720 360" role="img" aria-label="黑科技转民用四层漏斗">
      {BLACK_TECH_FUNNEL.map((layer, index) => {
        const width = widths[index] ?? 260;
        const nextWidth = widths[index + 1] ?? width * 0.7;
        const x = (720 - width) / 2;
        const nextX = (720 - nextWidth) / 2;
        const y = 28 + index * 76;
        const points = `${x},${y} ${x + width},${y} ${nextX + nextWidth},${y + 58} ${nextX},${y + 58}`;

        return (
          <g key={layer.label}>
            <polygon points={points} className={`blacktech-funnel-layer layer-${index + 1}`} />
            <text x="360" y={y + 24} textAnchor="middle" className="blacktech-funnel-label">
              {layer.label}
            </text>
            <text x="360" y={y + 44} textAnchor="middle" className="blacktech-funnel-note">
              {layer.count} / {layer.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function fieldSummary(field: CivilianField) {
  const matching = BLACK_TECHS.filter((tech) => tech.industries.includes(field));
  const products = matching
    .flatMap((tech) => tech.civilianApplications.filter((app) => app.field === field).map((app) => app.product))
    .slice(0, 4)
    .join("、");

  const change = matching[0]?.civilianApplications.find((app) => app.field === field)?.changes ?? "等待更多可验证转化路径。";
  return { label: field, products, change };
}

function signalClass(level: ExposureLevel) {
  if (level === "公开军用") return "open";
  if (level === "半公开") return "gray";
  return "rumor";
}
