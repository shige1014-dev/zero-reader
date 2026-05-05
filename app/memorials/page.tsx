import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MEMORIAL_COLLECTIONS,
  MEMORIAL_ENTRIES,
  getMemorialHref,
  type MemorialCollection
} from "@/lib/memorials";

export const metadata: Metadata = {
  title: "纪念册 · ZERO 2076",
  description: "把每天的工作与历史进程做成周刊、海报和个人文明档案。"
};

export default function MemorialsPage() {
  const collectionKeys = Object.keys(MEMORIAL_COLLECTIONS) as MemorialCollection[];
  const generatedPreviews = MEMORIAL_ENTRIES.filter((entry) =>
    entry.image?.startsWith("/memorials/generated/")
  ).slice(0, 12);

  return (
    <main className="mem-shell">
      <header className="mem-hero">
        <p className="mem-kicker">ZERO 2076 · MANUAL ARCHIVE</p>
        <h1>纪念册</h1>
        <p>
          四个板块各自独立分页。点开图片看大图与短文。
        </p>
      </header>

      <nav className="mem-board-tabs" aria-label="四大板块入口">
        {collectionKeys.map((key) => {
          const collection = MEMORIAL_COLLECTIONS[key];
          return (
            <Link
              key={key}
              href={`/memorials/board/${key}` as Parameters<typeof Link>[0]["href"]}
              className="mem-board-tab"
            >
              <span className="mem-board-tab-en">{collection.en}</span>
              <span className="mem-board-tab-zh">{collection.label}</span>
            </Link>
          );
        })}
      </nav>

      <section className="mem-board-overview" aria-label="四大板块">
        {collectionKeys.map((key) => {
          const collection = MEMORIAL_COLLECTIONS[key];
          const entries = MEMORIAL_ENTRIES.filter((e) => e.collection === key);
          const cover = entries.find((e) => !!e.image);
          return (
            <Link
              key={key}
              href={`/memorials/board/${key}` as Parameters<typeof Link>[0]["href"]}
              className="mem-board-tile"
              aria-label={`${collection.label} · ${entries.length} 条`}
            >
              {cover?.image && (
                <span className="mem-board-tile-cover">
                  <Image src={cover.image} alt={`${collection.label} 封面`} width={640} height={800} />
                </span>
              )}
              <span className="mem-board-tile-meta">
                <span className="mem-board-tile-en">{collection.en}</span>
                <span className="mem-board-tile-zh">{collection.label}</span>
                <span className="mem-board-tile-purpose">{collection.purpose}</span>
                <span className="mem-board-tile-count">{entries.length} 条 · 进入板块 →</span>
              </span>
            </Link>
          );
        })}
      </section>

      <section className="mem-grid-section" aria-label="最新补图">
        <header className="mem-section-head">
          <span>GENERATED COVERS</span>
          <div>
            <h2>最新补图</h2>
            <p>后补的纪念册图片直接展示在首页；点开可进入对应短文与大图。</p>
          </div>
        </header>

        <div className="mem-card-grid mem-board-grid">
          {generatedPreviews.map((entry, index) => {
            const href = getMemorialHref(entry) as Parameters<typeof Link>[0]["href"];
            const collection = MEMORIAL_COLLECTIONS[entry.collection];

            return (
              <article key={entry.date} className="mem-card mem-board-card">
                {entry.image && (
                  <Link href={href} className="mem-card-image-link" aria-label={`${entry.title} · 查看大图与短文`}>
                    <Image src={entry.image} alt={entry.title} width={1024} height={1536} />
                    <span className="mem-card-image-hint">点开看大图</span>
                  </Link>
                )}
                <div className="mem-card-body">
                  <span className="mem-card-top">
                    <span className="mem-card-no">#{String(index + 1).padStart(2, "0")}</span>
                    <span className="mem-status mem-status-draft">{collection.label}</span>
                  </span>
                  <h2 className="mem-card-title">
                    <Link href={href}>{entry.title}</Link>
                  </h2>
                  <p className="mem-theme">{entry.theme}</p>
                  <Link href={href} className="mem-card-cta">阅读大图与短文 →</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
