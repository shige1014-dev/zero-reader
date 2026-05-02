import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MEMORIAL_COLLECTIONS,
  MEMORIAL_ENTRIES,
  MEMORIAL_STATUS_LABEL,
  getMemorialHref,
  type MemorialCollection
} from "@/lib/memorials";

interface PageProps {
  params: { collection: string };
}

const COLLECTION_KEYS = Object.keys(MEMORIAL_COLLECTIONS) as MemorialCollection[];

function isCollection(value: string): value is MemorialCollection {
  return (COLLECTION_KEYS as string[]).includes(value);
}

export function generateStaticParams() {
  return COLLECTION_KEYS.map((collection) => ({ collection }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isCollection(params.collection)) {
    return { title: "纪念册分馆 · ZERO 2076" };
  }
  const collection = MEMORIAL_COLLECTIONS[params.collection];
  return {
    title: `${collection.label} · 纪念册 · ZERO 2076`,
    description: collection.purpose
  };
}

export default function MemorialBoardPage({ params }: PageProps) {
  if (!isCollection(params.collection)) notFound();
  const key = params.collection;
  const collection = MEMORIAL_COLLECTIONS[key];
  const entries = MEMORIAL_ENTRIES.filter((entry) => entry.collection === key);

  return (
    <main className="mem-shell mem-board-shell">
      <Link href="/memorials" className="mem-back">返回纪念册</Link>

      <header className="mem-hero">
        <p className="mem-kicker">{collection.en}</p>
        <h1>{collection.label}</h1>
        <p>{collection.purpose}</p>
      </header>

      <nav className="mem-board-tabs" aria-label="切换板块">
        {COLLECTION_KEYS.map((k) => {
          const c = MEMORIAL_COLLECTIONS[k];
          const active = k === key;
          return (
            <Link
              key={k}
              href={`/memorials/board/${k}` as Parameters<typeof Link>[0]["href"]}
              className={"mem-board-tab" + (active ? " is-active" : "")}
              aria-current={active ? "page" : undefined}
            >
              <span className="mem-board-tab-en">{c.en}</span>
              <span className="mem-board-tab-zh">{c.label}</span>
            </Link>
          );
        })}
      </nav>

      {entries.length > 0 ? (
        <section className="mem-card-grid mem-board-grid" aria-label={collection.label}>
          {entries.map((entry, index) => {
            const href = getMemorialHref(entry) as Parameters<typeof Link>[0]["href"];
            return (
            <article key={entry.date + entry.title} className="mem-card mem-board-card">
              {entry.image && (
                <Link href={href} className="mem-card-image mem-card-image-link" aria-label={`${entry.title} · 查看大图与短文`}>
                  <Image src={entry.image} alt={`${entry.title} 海报`} width={640} height={800} />
                  <span className="mem-card-image-hint">点开看大图</span>
                </Link>
              )}
              <div className="mem-card-body">
                <span className="mem-card-top">
                  <span className="mem-card-no">#{String(index + 1).padStart(2, "0")}</span>
                  <span className={"mem-status mem-status-" + entry.status}>
                    {MEMORIAL_STATUS_LABEL[entry.status]}
                  </span>
                </span>
                <span className="mem-date">{entry.date} · {entry.week}</span>
                <h2 className="mem-card-title">
                  <Link href={href}>{entry.title}</Link>
                </h2>
                <p className="mem-theme">{entry.theme}</p>
                <p className="mem-summary">{entry.history}</p>
                <Link href={href} className="mem-card-cta">阅读大图与短文 →</Link>
              </div>
            </article>
            );
          })}
        </section>
      ) : (
        <div className="mem-empty">
          <p>等待第一张卡片</p>
          <span>在 lib/memorials.ts 中新增条目，将 collection 设为 {key}。</span>
        </div>
      )}
    </main>
  );
}
