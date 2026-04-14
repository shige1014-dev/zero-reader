import Link from "next/link";
import { ArticleToc } from "@/components/article-toc";
import { MarkdownContent } from "@/components/markdown-content";
import { PriorityBadge } from "@/components/priority-badge";
import { ReadingProgress } from "@/components/reading-progress";
import { formatAbsoluteTime, getCategoryLabel, getSourceLabel } from "@/lib/format";
import type { FeedEntry } from "@/lib/feed-types";

type SourceTrace = {
  label: string;
  value: string;
  href?: string;
};

type ArticleReaderProps = {
  entry: FeedEntry;
  toc: Array<{ id: string; text: string; depth: 2 | 3 }>;
  relatedSignals: FeedEntry[];
  sourceTrace: SourceTrace[];
};

export function ArticleReader({
  entry,
  toc,
  relatedSignals,
  sourceTrace
}: ArticleReaderProps) {
  return (
    <>
      <ReadingProgress />
      <main className="relative mx-auto max-w-7xl pb-20 pt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10 lg:pt-12">
        <article className="min-w-0">
          <div className="rounded-[2rem] border border-border bg-surface/85 px-6 py-8 shadow-glow sm:px-10 sm:py-12">
            <div className="flex flex-wrap items-center gap-3">
              <PriorityBadge priority={entry.priority} />
              <span className="rounded-full border border-border px-3 py-1 text-sm text-textMuted">
                {getCategoryLabel(entry.category)}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-sm text-textMuted">
                {getSourceLabel(entry.source)}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold tracking-[-0.05em] text-text sm:text-5xl">
              {entry.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-textMuted">
              {entry.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-textMuted">
              <span className="rounded-full border border-border px-3 py-1">
                {entry.readingTime ?? "短讯"}
              </span>
              <span className="rounded-full border border-border px-3 py-1">
                {formatAbsoluteTime(entry.createdAt)}
              </span>
              {entry.confidence !== null ? (
                <span className="rounded-full border border-border px-3 py-1">
                  置信度 {(entry.confidence * 100).toFixed(0)}%
                </span>
              ) : null}
            </div>
            <div className="mt-10 border-t border-border pt-8">
              <MarkdownContent
                source={
                  entry.content ??
                  `## 摘要\n\n${entry.summary}\n\n## 记录\n\n这条信号暂时没有展开成长文，保留为短讯归档。\n\n${
                    entry.url ? `## 来源链接\n\n[打开原始来源](${entry.url})` : ""
                  }`
                }
              />
            </div>
          </div>

          <section className="mt-6 rounded-[1.8rem] border border-border bg-surface/80 p-5 shadow-glow sm:p-6">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
              相关信号
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedSignals.map((signal) => (
                <Link
                  key={signal.id}
                  href={`/read/${signal.id}`}
                  className="rounded-[1.4rem] border border-border bg-black/15 p-4 transition hover:border-accent/35"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-textMuted">
                    {getCategoryLabel(signal.category)}
                  </p>
                  <h2 className="mt-3 font-display text-xl text-text">
                    {signal.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-textMuted">
                    {signal.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[1.8rem] border border-border bg-surface/80 p-5 shadow-glow sm:p-6">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
              来源溯源
            </p>
            <div className="mt-4 grid gap-3">
              {sourceTrace.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.2rem] border border-border bg-black/15 px-4 py-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-textMuted">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex text-sm text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm leading-7 text-text">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="mt-8 hidden lg:block">
          <ArticleToc items={toc} />
        </aside>
      </main>
    </>
  );
}
