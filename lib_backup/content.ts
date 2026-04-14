import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";
import type { ReactNode } from "react";

const contentDirectory = path.join(process.cwd(), "content", "civilization-leap");

export type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type ArticleSummary = {
  slug: string;
  chapter: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  formattedDate: string;
  readingTime: string;
};

export type Article = ArticleSummary & {
  content: string;
  toc: TocItem[];
};

type Frontmatter = {
  title?: string;
  excerpt?: string;
  publishedAt?: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

function getMarkdownFiles() {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function getHeadingText(line: string) {
  return line.replace(/^#{2,3}\s+/, "").trim();
}

function buildTableOfContents(content: string): TocItem[] {
  const slugger = new GithubSlugger();

  return content
    .split("\n")
    .map((line) => {
      if (!line.startsWith("##")) {
        return null;
      }

      const depth = line.startsWith("###") ? 3 : 2;
      const text = getHeadingText(line);

      return {
        depth,
        text,
        id: slugger.slug(text)
      } satisfies TocItem;
    })
    .filter((item): item is TocItem => Boolean(item));
}

export function buildTableOfContentsFromContent(content: string) {
  return buildTableOfContents(content);
}

function readArticleFile(fileName: string): Article {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as Frontmatter;
  const chapter = slug.split("-")[0] ?? slug;

  return {
    slug,
    chapter,
    title: frontmatter.title ?? slug,
    excerpt: frontmatter.excerpt ?? "暂无摘要",
    publishedAt: frontmatter.publishedAt ?? new Date().toISOString(),
    formattedDate: formatDate(frontmatter.publishedAt ?? new Date().toISOString()),
    readingTime: readingTime(content, { wordsPerMinute: 220 }).text,
    content,
    toc: buildTableOfContents(content)
  };
}

export function getAllArticles(): ArticleSummary[] {
  return getMarkdownFiles().map((fileName) => {
    const article = readArticleFile(fileName);

    return {
      slug: article.slug,
      chapter: article.chapter,
      title: article.title,
      excerpt: article.excerpt,
      publishedAt: article.publishedAt,
      formattedDate: article.formattedDate,
      readingTime: article.readingTime
    };
  });
}

export function getArticleBySlug(slug: string) {
  const fileName = `${slug}.md`;

  if (!getMarkdownFiles().includes(fileName)) {
    return null;
  }

  return readArticleFile(fileName);
}

export function getArticleNavigation(slug: string) {
  const articles = getAllArticles();
  const currentIndex = articles.findIndex((article) => article.slug === slug);

  return {
    previous: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null
  };
}

function flattenChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(flattenChildren).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return flattenChildren(
      (children as { props?: { children?: ReactNode } }).props?.children
    );
  }

  return "";
}

export function slugHeadingText(children: ReactNode) {
  const slugger = new GithubSlugger();
  return slugger.slug(flattenChildren(children));
}
