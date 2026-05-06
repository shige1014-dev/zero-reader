import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MARVEL_STORIES, MARVEL_COVERS, MARVELS_META } from "@/lib/novels/marvels";
import "../../novels.css";

export function generateStaticParams() {
  return MARVEL_STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const s = MARVEL_STORIES.find((x) => x.id === params.id);
  if (!s) return { title: "未找到 · ZERO 2076 NOVELS" };
  const ext = MARVEL_COVERS[s.id];
  return {
    title: `${s.title} · ${MARVELS_META.title}`,
    description: ext?.pullQuote ?? s.subtitle
  };
}

function renderBody(text: string) {
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

export default function MarvelStoryPage({ params }: { params: { id: string } }) {
  const idx = MARVEL_STORIES.findIndex((s) => s.id === params.id);
  if (idx === -1) notFound();
  const s = MARVEL_STORIES[idx];
  const ext = MARVEL_COVERS[s.id];
  const num = String(s.number).padStart(2, "0");
  const prev = MARVEL_STORIES[idx - 1];
  const next = MARVEL_STORIES[idx + 1];

  return (
    <main className="nv-shell">
      <article className="nv-reader">
        <Link href="/novels/marvels" className="nv-reader-back">← {MARVELS_META.title}</Link>

        <div
          className="nv-reader-cover"
          style={{ backgroundImage: ext?.cover ? `url(${ext.cover})` : undefined }}
        >
          <span className="nv-reader-cover-num">ANTHOLOGY · TALE {num}</span>
        </div>

        <header className="nv-reader-mast">
          <p className="nv-reader-kicker">MARVELS · 光怪陆离</p>
          <h1 className="nv-reader-title">{s.title}</h1>
          <p className="nv-reader-subtitle">{s.subtitle}</p>
          <p className="nv-reader-meta">
            <span>📝 ~{s.wordCount} 字</span>
            <span>🔮 {s.themeNote}</span>
          </p>
        </header>

        {ext?.pullQuote && (
          <div className="nv-pullquote">
            <blockquote>{ext.pullQuote}</blockquote>
          </div>
        )}

        <section className="nv-body">{renderBody(s.body)}</section>

        <footer className="nv-reader-foot">
          {prev ? (
            <Link href={`/novels/marvels/${prev.id}`} className="nv-nav-prev">
              <span className="nv-nav-label">← TALE {String(prev.number).padStart(2, "0")}</span>
              <span className="nv-nav-title">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/novels/marvels/${next.id}`} className="nv-nav-next">
              <span className="nv-nav-label">TALE {String(next.number).padStart(2, "0")} →</span>
              <span className="nv-nav-title">{next.title}</span>
            </Link>
          ) : <span />}
        </footer>
      </article>
    </main>
  );
}
