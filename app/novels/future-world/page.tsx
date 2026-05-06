import type { Metadata } from "next";
import Link from "next/link";
import { FUTURE_WORLD_META, FUTURE_WORLD_CHAPTERS, FUTURE_COVERS } from "@/lib/novels/future-world";
import "../novels.css";

export const metadata: Metadata = {
  title: `${FUTURE_WORLD_META.title} · ZERO 2076 NOVELS`,
  description: FUTURE_WORLD_META.intro.slice(0, 160)
};

export default function FutureWorldIndex() {
  return (
    <main className="nv-shell">
      <Link href="/novels" className="nv-issue-back">← 回小说总览</Link>

      <section className="nv-issue-hero">
        <p className="nv-issue-kicker">ISSUE No.01 · FUTURE WORLD</p>
        <h1 className="nv-issue-title">{FUTURE_WORLD_META.title}</h1>
        <p className="nv-issue-subtitle">{FUTURE_WORLD_META.subtitle}</p>
        <p className="nv-issue-intro">{FUTURE_WORLD_META.intro}</p>
        <div className="nv-issue-settings">
          {FUTURE_WORLD_META.worldSettings.map((s) => <span key={s}>{s}</span>)}
        </div>
      </section>

      <section className="nv-chapter-grid">
        {FUTURE_WORLD_CHAPTERS.map((ch) => {
          const ext = FUTURE_COVERS[ch.id];
          const num = String(ch.number).padStart(2, "0");
          return (
            <Link key={ch.id} href={`/novels/future-world/${ch.id}`} className="nv-chapter-card">
              <div
                className="nv-chapter-cover"
                style={{ backgroundImage: ext?.cover ? `url(${ext.cover})` : undefined }}
              >
                <span className="nv-chapter-num">CH · {num}</span>
              </div>
              <div className="nv-chapter-info">
                <p className="nv-chapter-sub">{ch.subtitle}</p>
                <h3>{ch.title}</h3>
                {ext?.pullQuote && (
                  <p className="nv-chapter-quote">&ldquo;{ext.pullQuote.slice(0, 60)}…&rdquo;</p>
                )}
                <p className="nv-chapter-meta">{ch.protagonist} · ~{ch.wordCount} 字</p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
