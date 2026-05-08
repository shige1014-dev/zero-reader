import type { Metadata } from "next";
import Link from "next/link";
import { FUTURE_WORLD_META, FUTURE_COVERS, FUTURE_WORLD_CHAPTERS } from "@/lib/novels/future-world";
import { MARVELS_META, MARVEL_COVERS, MARVEL_STORIES } from "@/lib/novels/marvels";
import "./novels.css";

export const metadata: Metadata = {
  title: "ZERO 2076 NOVELS · 小说",
  description: `未来世界 · 沪川 · 通 (${FUTURE_WORLD_META.totalChapters} 章长篇) + 光怪陆离想象馆 (${MARVELS_META.totalStories} 篇独立童话)。报刊式阅读, 图文并置。`
};

export default function NovelsIndex() {
  const futureCover = FUTURE_COVERS[FUTURE_WORLD_CHAPTERS[1]?.id ?? "ch02-ai-school"]?.cover
    ?? "/memorials/generated/2026-05-02-ai-school.png";
  const marvelsCover = MARVEL_COVERS[MARVEL_STORIES[1]?.id ?? "ms02-inverted-library"]?.cover
    ?? "/memorials/generated/2026-05-02-inverted-library.png";

  return (
    <main className="nv-shell">
      <header className="nv-top-hero">
        <p className="nv-top-kicker">ZERO 2076 · NOVELS</p>
        <h1 className="nv-top-title">小 说</h1>
        <p className="nv-top-sub">两部独立系列 · 一部多章节连续 · 一部短篇独立</p>
      </header>

      <section className="nv-series-grid">
        <Link href="/novels/future-world" className="nv-series-card">
          <div
            className="nv-series-cover"
            style={{ backgroundImage: `url(${futureCover})` }}
          >
            <span className="nv-series-cover-label">ISSUE No.01</span>
          </div>
          <div className="nv-series-info">
            <p className="nv-series-meta">FUTURE WORLD · 长篇 · {FUTURE_WORLD_META.totalChapters} 章</p>
            <h2>{FUTURE_WORLD_META.title}</h2>
            <p className="nv-series-intro">{FUTURE_WORLD_META.intro.slice(0, 110)}…</p>
            <p className="nv-series-cta">进入 ENTER</p>
          </div>
        </Link>

        <Link href="/novels/marvels" className="nv-series-card">
          <div
            className="nv-series-cover"
            style={{ backgroundImage: `url(${marvelsCover})` }}
          >
            <span className="nv-series-cover-label">ANTHOLOGY</span>
          </div>
          <div className="nv-series-info">
            <p className="nv-series-meta">MARVELS · 短篇集 · {MARVELS_META.totalStories} 篇</p>
            <h2>{MARVELS_META.title}</h2>
            <p className="nv-series-intro">{MARVELS_META.intro.slice(0, 110)}…</p>
            <p className="nv-series-cta">进入 ENTER</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
