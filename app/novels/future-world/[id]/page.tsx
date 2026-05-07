import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FUTURE_WORLD_CHAPTERS, FUTURE_COVERS, FUTURE_WORLD_META } from "@/lib/novels/future-world";
import "../../novels.css";

export function generateStaticParams() {
  return FUTURE_WORLD_CHAPTERS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ch = FUTURE_WORLD_CHAPTERS.find((c) => c.id === params.id);
  if (!ch) return { title: "未找到 · ZERO 2076 NOVELS" };
  const ext = FUTURE_COVERS[ch.id];
  return {
    title: `${ch.title} · ${FUTURE_WORLD_META.title}`,
    description: ext?.pullQuote ?? ch.subtitle
  };
}

function renderBody(text: string) {
  // Split paragraphs on \n\n. Detect blockquote (lines starting with "> ").
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((p, i) => {
    const trimmed = p.trim();
    if (!trimmed) return null;
    const lines = trimmed.split("\n");
    const isQuote = lines.every((l) => l.trim().startsWith(">"));
    if (isQuote) {
      const inner = lines.map((l) => l.replace(/^>\s?/, "")).join(" ");
      return (
        <blockquote key={i}>
          <p>{inner}</p>
        </blockquote>
      );
    }
    return <p key={i}>{trimmed.replace(/\n/g, " ")}</p>;
  });
}

export default function FutureChapterPage({ params }: { params: { id: string } }) {
  const idx = FUTURE_WORLD_CHAPTERS.findIndex((c) => c.id === params.id);
  if (idx === -1) notFound();
  const ch = FUTURE_WORLD_CHAPTERS[idx];
  const ext = FUTURE_COVERS[ch.id];
  const num = String(ch.number).padStart(2, "0");
  const prev = FUTURE_WORLD_CHAPTERS[idx - 1];
  const next = FUTURE_WORLD_CHAPTERS[idx + 1];

  return (
    <main className="nv-shell">
      <article className="nv-reader">
        <Link href="/novels/future-world" className="nv-reader-back">← {FUTURE_WORLD_META.title}</Link>

        <div
          className="nv-reader-cover"
          style={{ backgroundImage: ext?.cover ? `url(${ext.cover})` : undefined }}
        >
          <span className="nv-reader-cover-num">ISSUE No.01 · CHAPTER {num}</span>
        </div>

        <header className="nv-reader-mast">
          <p className="nv-reader-kicker">FUTURE WORLD · 沪川 · 通</p>
          <h1 className="nv-reader-title">{ch.title}</h1>
          <p className="nv-reader-subtitle">{ch.subtitle}</p>
          <p className="nv-reader-meta">
            <span>📌 {ch.protagonist}</span>
            <span>📝 ~{ch.wordCount} 字</span>
            <span>🔮 {ch.themeNote}</span>
          </p>
        </header>

        {(() => {
          const audioPath = `/audio/future-world/${ch.id}.mp3`;
          const localPath = path.join(process.cwd(), "public", audioPath);
          const hasAudio = fs.existsSync(localPath);
          return hasAudio ? (
            <div className="nv-audio">
              <p className="nv-audio-label">🎙 朗读 · OpenAI TTS · 中文女声 (nova)</p>
              <audio controls preload="none" src={audioPath}>
                您的浏览器不支持音频播放
              </audio>
            </div>
          ) : null;
        })()}

        {ext?.pullQuote && (
          <div className="nv-pullquote">
            <blockquote>{ext.pullQuote}</blockquote>
          </div>
        )}

        <section className="nv-body">{renderBody(ch.body)}</section>

        <footer className="nv-reader-foot">
          {prev ? (
            <Link href={`/novels/future-world/${prev.id}`} className="nv-nav-prev">
              <span className="nv-nav-label">← CHAPTER {String(prev.number).padStart(2, "0")}</span>
              <span className="nv-nav-title">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/novels/future-world/${next.id}`} className="nv-nav-next">
              <span className="nv-nav-label">CHAPTER {String(next.number).padStart(2, "0")} →</span>
              <span className="nv-nav-title">{next.title}</span>
            </Link>
          ) : <span />}
        </footer>
      </article>
    </main>
  );
}
