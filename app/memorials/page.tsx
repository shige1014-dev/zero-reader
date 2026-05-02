import type { Metadata } from "next";
import Image from "next/image";
import {
  MEMORIAL_COLLECTIONS,
  MEMORIAL_ENTRIES,
  MEMORIAL_STATUS_LABEL,
  MEMORIAL_WORKFLOW,
  type MemorialCollection
} from "@/lib/memorials";

export const metadata: Metadata = {
  title: "纪念册 · ZERO 2076",
  description: "把每天的工作与历史进程做成周刊、海报和个人文明档案。"
};

export default function MemorialsPage() {
  const collectionKeys = Object.keys(MEMORIAL_COLLECTIONS) as MemorialCollection[];

  return (
    <main className="mem-shell">
      <header className="mem-hero">
        <p className="mem-kicker">ZERO 2076 · MANUAL ARCHIVE</p>
        <h1>纪念册</h1>
        <p>
          每天手动记录一个工作切片。卡片先显示简介和摘要，点开后在当前页展开短文、工作记录和海报 brief。
        </p>
      </header>

      <section className="mem-workflow" aria-label="工作流">
        {MEMORIAL_WORKFLOW.map((item) => (
          <article key={item.step} className="mem-flow-card">
            <span>{item.step}</span>
            <h2>{item.label}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mem-collections" aria-label="纪念册分馆">
        {collectionKeys.map((key) => {
          const collection = MEMORIAL_COLLECTIONS[key];
          const entries = MEMORIAL_ENTRIES.filter((entry) => entry.collection === key);

          return (
            <section key={key} className="mem-grid-section" id={key} aria-label={collection.label}>
              <header className="mem-section-head">
                <div>
                  <p>{collection.en}</p>
                  <h2>{collection.label}</h2>
                </div>
                <span>{collection.purpose}</span>
              </header>

              {entries.length > 0 ? (
                <div className="mem-card-grid">
                  {entries.map((entry, index) => (
                    <details key={entry.date + entry.title} className="mem-card">
                      <summary className="mem-card-summary">
                        {entry.image && (
                          <span className="mem-card-image">
                            <Image src={entry.image} alt={`${entry.title} 海报`} width={640} height={800} />
                          </span>
                        )}
                        <span className="mem-card-top">
                          <span className="mem-card-no">#{String(index + 1).padStart(2, "0")}</span>
                          <span className={"mem-status mem-status-" + entry.status}>
                            {MEMORIAL_STATUS_LABEL[entry.status]}
                          </span>
                        </span>
                        <span className="mem-date">{entry.date} · {entry.week}</span>
                        <span className="mem-card-title">{entry.title}</span>
                        <span className="mem-theme">{entry.theme}</span>
                        <span className="mem-summary">{entry.history}</span>
                        <span className="mem-open">
                          <span className="mem-open-more">展开阅读</span>
                          <span className="mem-open-less">收起</span>
                        </span>
                      </summary>

                      <div className="mem-inline-detail">
                        <section>
                          <h4>配图短文</h4>
                          {entry.essay.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </section>
                        <section>
                          <h4>工作记录</h4>
                          <ul>
                            {entry.worklog.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </section>
                        <section>
                          <h4>海报 Brief</h4>
                          <p>{entry.posterBrief}</p>
                        </section>
                      </div>
                    </details>
                  ))}
                </div>
              ) : (
                <div className="mem-empty">
                  <p>等待第一张卡片</p>
                  <span>在 `lib/memorials.ts` 里新增记录，并把 collection 设为 `{key}`。</span>
                </div>
              )}
            </section>
          );
        })}
      </section>

    </main>
  );
}
