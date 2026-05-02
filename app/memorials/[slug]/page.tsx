import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MEMORIAL_COLLECTIONS,
  MEMORIAL_ENTRIES,
  MEMORIAL_STATUS_LABEL,
  getMemorialBySlug,
  getMemorialSlug
} from "@/lib/memorials";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return MEMORIAL_ENTRIES.map((entry) => ({
    slug: getMemorialSlug(entry)
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getMemorialBySlug(params.slug);

  if (!entry) {
    return {
      title: "纪念册记录 · ZERO 2076"
    };
  }

  return {
    title: `${entry.title} · 纪念册`,
    description: entry.history
  };
}

export default function MemorialDetailPage({ params }: PageProps) {
  const entry = getMemorialBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  const collection = MEMORIAL_COLLECTIONS[entry.collection];

  return (
    <main className="mem-shell mem-detail-shell">
      <Link href="/memorials" className="mem-back">返回纪念册</Link>

      <article className="mem-detail">
        <header className="mem-detail-head">
          <div>
            <p className="mem-date">{entry.date} · {entry.week}</p>
            <h1>{entry.title}</h1>
            <p>{entry.theme}</p>
            <p className="mem-detail-collection">{collection.label} · {collection.en}</p>
          </div>
          <span className={"mem-status mem-status-" + entry.status}>
            {MEMORIAL_STATUS_LABEL[entry.status]}
          </span>
        </header>

        {entry.image && (
          <figure className="mem-detail-image">
            <Image src={entry.image} alt={`${entry.title} 海报`} width={1024} height={1280} />
          </figure>
        )}

        <section className="mem-detail-block mem-essay-block">
          <h2>配图短文</h2>
          {entry.essay.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="mem-detail-block">
          <h2>工作记录</h2>
          <ul>
            {entry.worklog.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mem-detail-block">
          <h2>历史意义</h2>
          <p>{entry.history}</p>
        </section>

        <section className="mem-detail-block mem-brief-block">
          <h2>海报 Brief</h2>
          <p>{entry.posterBrief}</p>
        </section>
      </article>
    </main>
  );
}
