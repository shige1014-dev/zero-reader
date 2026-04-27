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
    <div className="civ-page">
      <ReadingProgress />
      <main className="relative mx-auto max-w-7xl pb-20 pt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10 lg:pt-12">
        <article className="min-w-0">
          <div className="civ-card">
            <p className="civ-kicker">Chapter {article.chapter}</p>
            <h1 className="civ-title">{article.title}</h1>
            <p className="civ-excerpt">{article.excerpt}</p>
            <div className="civ-meta">
              <span>{article.readingTime}</span>
              <span>{article.formattedDate}</span>
              <span>Markdown</span>
            </div>
            <div className="civ-divider"></div>
            <div className="civ-content">
              <MarkdownContent source={article.content} />
            </div>
          </div>

          <div className="civ-nav">
            {navigation.previous ? (
              <Link href={`/civilization-leap/${navigation.previous.slug}`} className="civ-nav-card">
                <p className="civ-nav-label">上一篇</p>
                <p className="civ-nav-title">{navigation.previous.title}</p>
              </Link>
            ) : (
              <div className="civ-nav-card civ-nav-disabled">
                <p className="civ-nav-label">上一篇</p>
                <p className="civ-nav-title">已到起点</p>
              </div>
            )}
            {navigation.next ? (
              <Link href={`/civilization-leap/${navigation.next.slug}`} className="civ-nav-card civ-nav-right">
                <p className="civ-nav-label">下一篇</p>
                <p className="civ-nav-title">{navigation.next.title}</p>
              </Link>
            ) : (
              <div className="civ-nav-card civ-nav-right civ-nav-disabled">
                <p className="civ-nav-label">下一篇</p>
                <p className="civ-nav-title">系列未完待续</p>
              </div>
            )}
          </div>
        </article>

        <aside className="civ-aside hidden lg:block">
          <ArticleToc items={article.toc} />
        </aside>
      </main>
    </div>
  );
}
