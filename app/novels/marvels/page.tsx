import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { MARVELS_META, MARVEL_STORIES, MARVEL_COVERS } from "@/lib/novels/marvels";
import "../novels.css";

export const metadata: Metadata = {
  title: `${MARVELS_META.title} · ZERO 2076 NOVELS`,
  description: MARVELS_META.intro.slice(0, 160)
};

export default function MarvelsIndex() {
  return (
    <main className="nv-shell">
      <Link href="/novels" className="nv-issue-back">← 回小说总览</Link>

      <section className="nv-issue-hero">
        <p className="nv-issue-kicker">ANTHOLOGY · MARVELS</p>
        <h1 className="nv-issue-title">{MARVELS_META.title}</h1>
        <p className="nv-issue-subtitle">{MARVELS_META.subtitle}</p>
        <p className="nv-issue-intro">{MARVELS_META.intro}</p>
      </section>

      <section className="nv-chapter-grid">
        {MARVEL_STORIES.map((s) => {
          const ext = MARVEL_COVERS[s.id];
          const num = String(s.number).padStart(2, "0");
          const audioPath = `/audio/marvels/${s.id}.mp3`;
          const hasAudio = fs.existsSync(path.join(process.cwd(), "public", audioPath));
          return (
            <article key={s.id} className="nv-chapter-card">
              <Link href={`/novels/marvels/${s.id}`} className="nv-chapter-link">
                <div
                  className="nv-chapter-cover"
                  style={{ backgroundImage: ext?.cover ? `url(${ext.cover})` : undefined }}
                >
                  <span className="nv-chapter-num">TALE · {num}</span>
                </div>
                <div className="nv-chapter-info">
                  <p className="nv-chapter-sub">{s.subtitle}</p>
                  <h3>{s.title}</h3>
                  {ext?.pullQuote && (
                    <p className="nv-chapter-quote">&ldquo;{ext.pullQuote.slice(0, 60)}…&rdquo;</p>
                  )}
                  <p className="nv-chapter-meta">~{s.wordCount} 字 · {s.themeNote.slice(0, 18)}</p>
                </div>
              </Link>
              {hasAudio && (
                <div className="nv-chapter-audio">
                  <span className="nv-chapter-audio-label">🎙 朗读</span>
                  <audio controls preload="none" src={audioPath} />
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
