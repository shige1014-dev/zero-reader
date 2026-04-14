import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleToc } from "@/components/article-toc";
import { MarkdownContent } from "@/components/markdown-content";
import { ReadingProgress } from "@/components/reading-progress";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleNavigation
} from "@/lib/content";

type ArticlePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "文章未找到"
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt
    }
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const navigation = getArticleNavigation(params.slug);

  return (
    <>
      <ReadingProgress />
      <main className="relative mx-auto max-w-7xl pb-20 pt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10 lg:pt-12">
        <article className="min-w-0">
          <div className="rounded-[2rem] border border-border bg-surface/80 px-6 py-8 shadow-glow sm:px-10 sm:py-12">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-accent">
              Chapter {article.chapter}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.05em] text-text sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-textMuted">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-textMuted">
              <span className="rounded-full border border-border px-3 py-1">
                {article.readingTime}
              </span>
              <span className="rounded-full border border-border px-3 py-1">
                {article.formattedDate}
              </span>
              <span className="rounded-full border border-border px-3 py-1">
                Markdown Native
              </span>
            </div>
            <div className="mt-10 border-t border-border pt-8">
              <MarkdownContent source={article.content} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {navigation.previous ? (
              <Link
                href={`/civilization-leap/${navigation.previous.slug}`}
                className="rounded-[1.5rem] border border-border bg-surfaceSoft/80 p-5 transition hover:border-accent/40"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-textMuted">
                  上一篇
                </p>
                <p className="mt-3 font-display text-xl text-text">
                  {navigation.previous.title}
                </p>
              </Link>
            ) : (
              <div className="rounded-[1.5rem] border border-border bg-surfaceSoft/30 p-5 opacity-60">
                <p className="text-xs uppercase tracking-[0.28em] text-textMuted">
                  上一篇
                </p>
                <p className="mt-3 font-display text-xl text-text">已到起点</p>
              </div>
            )}

            {navigation.next ? (
              <Link
                href={`/civilization-leap/${navigation.next.slug}`}
                className="rounded-[1.5rem] border border-border bg-surfaceSoft/80 p-5 text-right transition hover:border-accent/40"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-textMuted">
                  下一篇
                </p>
                <p className="mt-3 font-display text-xl text-text">
                  {navigation.next.title}
                </p>
              </Link>
            ) : (
              <div className="rounded-[1.5rem] border border-border bg-surfaceSoft/30 p-5 text-right opacity-60">
                <p className="text-xs uppercase tracking-[0.28em] text-textMuted">
                  下一篇
                </p>
                <p className="mt-3 font-display text-xl text-text">系列未完待续</p>
              </div>
            )}
          </div>
        </article>

        <aside className="mt-8 hidden lg:block">
          <ArticleToc items={article.toc} />
        </aside>
      </main>
    </>
  );
}
