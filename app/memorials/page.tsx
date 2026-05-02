import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MEMORIAL_COLLECTIONS,
  MEMORIAL_ENTRIES,
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
          四个板块各自独立分页。点开图片看大图与短文。
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
    </main>
  );
}
