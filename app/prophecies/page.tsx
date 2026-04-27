import type { Metadata } from "next";
import {
  PROPHECIES,
  ORACLES,
  HORIZONS,
  CATEGORIES,
  type Horizon,
  type Prophecy,
  type Oracle,
  getProphecyById,
  getProphecyByHorizon
} from "@/lib/prophecies";

export const metadata: Metadata = {
  title: "预言堂 · ORACLE 2076",
  description: "全球流传的未来预言整合时间线。基于公开论著与路线图，最冷静的未来判断。"
};

const HORIZON_KEYS: Horizon[] = ["near", "mid", "far", "deep"];

function ConfidenceDots({ n }: { n: number }) {
  return (
    <span className="proph-conf" aria-label={`置信 ${n}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={"dot" + (i < n ? " on" : "")} />
      ))}
    </span>
  );
}

function Card({ p }: { p: Prophecy }) {
  const cat = CATEGORIES[p.category];
  const linked = p.linked.map((id) => getProphecyById(id)).filter(Boolean) as Prophecy[];
  return (
    <article className="proph-card" id={p.id}>
      <div className="proph-card-rail">
        <div className="proph-year">{p.year}</div>
        <div className="proph-rail-line" />
      </div>
      <div className="proph-card-body">
        <header className="proph-card-head">
          <span className="proph-cat" style={{ color: cat.tone, borderColor: cat.tone + "55" }}>
            {cat.label}
          </span>
          <ConfidenceDots n={p.confidence} />
        </header>

        <h3 className="proph-title">{p.title}</h3>
        <p className="proph-takeaway">「{p.takeaway}」</p>

        <p className="proph-source">
          <span className="proph-source-tag">来源</span>
          {p.source}
        </p>

        <div className="proph-block">
          <span className="proph-label">逻辑基础</span>
          <p>{p.basis}</p>
        </div>

        <div className="proph-block">
          <span className="proph-label">触发条件</span>
          <ul>
            {p.triggers.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="proph-block">
          <span className="proph-label">闭合机制</span>
          <p>{p.mechanism}</p>
        </div>

        <div className="proph-block">
          <span className="proph-label">二级影响</span>
          <ul>
            {p.secondOrder.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {linked.length > 0 && (
          <div className="proph-links">
            <span className="proph-label">相互牵引</span>
            <div className="proph-link-row">
              {linked.map((l) => (
                <a key={l.id} href={`#${l.id}`} className="proph-link-chip">
                  <span className="dot" style={{ background: CATEGORIES[l.category].tone }} />
                  <span className="yr">{l.year}</span>
                  {l.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function PropheciesPage() {
  const totalCount = PROPHECIES.length;
  const yearMin = Math.min(...PROPHECIES.map((p) => p.year));
  const yearMax = Math.max(...PROPHECIES.map((p) => p.year));

  return (
    <main className="proph-shell">
      <header className="proph-top">
        <p className="proph-kicker">ORACLE · 预言堂</p>
        <h1 className="proph-h1">未来不是预测，是被触发</h1>
        <p className="proph-sub">
          {totalCount} 条全球流传的未来预言。基于公开论著、产业路线图与权威机构报告，按时间整理，剥离一切短期市场噪音。
          {" "}覆盖 {yearMin} 至 {yearMax} 年。
        </p>
        <div className="proph-meta-row">
          <span><b>{PROPHECIES.length}</b> 条预言</span>
          <span><b>{HORIZON_KEYS.length}</b> 时间区段</span>
          <span><b>{Object.keys(CATEGORIES).length}</b> 类领域</span>
          <span>预言家档案 <b>{ORACLES.length}</b> 位</span>
        </div>
      </header>

      <nav className="proph-cat-row" aria-label="类别图例">
        {Object.entries(CATEGORIES).map(([k, v]) => (
          <span key={k} className="proph-cat-chip" style={{ color: v.tone, borderColor: v.tone + "44" }}>
            <span className="dot" style={{ background: v.tone }} />
            {v.label}
          </span>
        ))}
      </nav>

      <section className="oracle-section" aria-label="预言家档案">
        <header className="oracle-section-head">
          <span className="oracle-section-en">PROPHETS · 18 ORACLES</span>
          <h2 className="oracle-section-title">谁在替我们看未来</h2>
          <p className="oracle-section-sub">
            从十六世纪占星师到当代 AI 巨头。这些人不是预测短期价格，他们押注文明级转折。
          </p>
        </header>
        <div className="oracle-grid">
          {ORACLES.map((o) => {
            const linkedItems = o.linked
              .map((id) => getProphecyById(id))
              .filter(Boolean) as Prophecy[];
            return (
              <article key={o.id} className="oracle-card">
                <header className="oracle-card-head">
                  <div className="oracle-avatar" aria-hidden>
                    {o.initials}
                  </div>
                  <div className="oracle-id">
                    <p className="oracle-name">{o.name}</p>
                    <p className="oracle-name-en">{o.nameEn}</p>
                    <p className="oracle-era">{o.era}</p>
                  </div>
                </header>
                <p className="oracle-role">{o.role}</p>
                <p className="oracle-thesis">「{o.thesis}」</p>
                <div className="oracle-signature">
                  <span className="oracle-sig-year">{o.signatureYear}</span>
                  <span className="oracle-sig-text">{o.signature}</span>
                </div>
                {linkedItems.length > 0 && (
                  <div className="oracle-links">
                    <span className="proph-label">命中</span>
                    <div className="oracle-link-row">
                      {linkedItems.map((p) => (
                        <a key={p.id} href={`#${p.id}`} className="oracle-link-chip">
                          <span
                            className="dot"
                            style={{ background: CATEGORIES[p.category].tone }}
                          />
                          <span className="yr">{p.year}</span>
                          {p.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <div className="proph-timeline">
        {HORIZON_KEYS.map((h) => {
          const list = getProphecyByHorizon(h);
          const meta = HORIZONS[h];
          return (
            <section key={h} className="proph-horizon">
              <header className="proph-horizon-head">
                <span className="proph-horizon-en">{meta.en}</span>
                <h2 className="proph-horizon-title">
                  {meta.label}
                  <span className="years">{meta.years}</span>
                </h2>
                <span className="proph-horizon-count">{list.length} 条</span>
              </header>
              <div className="proph-stream">
                {list.map((p) => (
                  <Card key={p.id} p={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="proph-foot">
        <p>不是猜未来，是看哪些条件先被达成。</p>
        <p className="proph-foot-mono">ORACLE 2076 · ZERO 2076 · COLD &amp; OBJECTIVE</p>
      </footer>
    </main>
  );
}
