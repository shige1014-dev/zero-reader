import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WHAT_IF_STORIES, getWhatIfBySlug } from "@/lib/what-if/data";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return WHAT_IF_STORIES.map((s) => ({ slug: s.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const story = getWhatIfBySlug(params.slug);
  if (!story) return { title: "假如 · WHAT IF" };
  return {
    title: `${story.title} · 假如系列`,
    description: story.hook
  };
}

export default function WhatIfStoryPage({ params }: PageProps) {
  const story = getWhatIfBySlug(params.slug);
  if (!story) notFound();

  const idx = WHAT_IF_STORIES.findIndex((s) => s.id === story.id);
  const prev = idx > 0 ? WHAT_IF_STORIES[idx - 1] : null;
  const next = idx < WHAT_IF_STORIES.length - 1 ? WHAT_IF_STORIES[idx + 1] : null;

  return (
    <main className="wif-shell wif-reader-shell">
      <Link href="/what-if" className="wif-back">← 返回假如书架</Link>

      <article className="wif-reader">
        <header className="wif-reader-head">
          <p className="wif-kicker">WHAT IF · 假如</p>
          <h1>{story.title}</h1>
          <p className="wif-reader-hook">{story.hook}</p>
          <div className="wif-reader-meta">
            <span><span className="wif-meta-label">设定</span>{story.era}</span>
            <span><span className="wif-meta-label">视角</span>{story.pov}</span>
            <span><span className="wif-meta-label">时长</span>{story.readingMinutes} 分钟</span>
          </div>
        </header>

        <div className="wif-divider"><span>故事</span></div>

        <section className="wif-reader-body" aria-label="正文">
          {story.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>

        <div className="wif-divider"><span>推论</span></div>

        <section className="wif-implications" aria-label="推论">
          <ul>
            {story.implications.map((item, i) => (
              <li key={i}>
                <span className="wif-implication-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="wif-divider"><span>留给你的问题</span></div>

        <section className="wif-reflection" aria-label="反思">
          {story.reflectionQuestions.map((q, i) => (
            <p key={i}>· {q}</p>
          ))}
        </section>

        <nav className="wif-pager" aria-label="篇章导航">
          {prev ? (
            <Link href={`/what-if/${prev.id}` as Parameters<typeof Link>[0]["href"]} className="wif-pager-side wif-pager-prev">
              <span className="wif-pager-label">← 上一篇</span>
              <span className="wif-pager-title">{prev.title}</span>
            </Link>
          ) : <span className="wif-pager-side wif-pager-disabled">已是开篇</span>}
          {next ? (
            <Link href={`/what-if/${next.id}` as Parameters<typeof Link>[0]["href"]} className="wif-pager-side wif-pager-next">
              <span className="wif-pager-label">下一篇 →</span>
              <span className="wif-pager-title">{next.title}</span>
            </Link>
          ) : <span className="wif-pager-side wif-pager-disabled">已读完最新</span>}
        </nav>
      </article>
    </main>
  );
}
