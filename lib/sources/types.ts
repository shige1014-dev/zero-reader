export type SourceType = "newsapi" | "rss" | "newsnow" | "arxiv" | "internal" | "x-twitter";

export interface SourceItem {
  title: string;
  url: string;
  source: string;
  rawText: string;
  publishedAt: string | null;
  sourceType: SourceType;
}
