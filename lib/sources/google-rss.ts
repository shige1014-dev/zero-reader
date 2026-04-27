import { buildGoogleNewsRssUrl, parseGoogleNewsRss } from "@/lib/news-rss";
import type { SourceItem } from "./types";

const EXTERNAL_ALLOWED_SOURCES = new Set([
  "Bloomberg",
  "CNBC",
  "Reuters",
  "Financial Times",
  "Stratechery.com",
  "ArXiv",
]);

const QUERIES = [
  '"AI chip" OR semiconductor OR GPU OR HBM OR packaging OR ASML',
  '"quantum computing" OR qubit OR reactor OR uranium OR SpaceX OR launch',
];

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`google-rss ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

export async function fetchGoogleNewsRss(): Promise<SourceItem[]> {
  const feeds = await Promise.all(
    QUERIES.map(async (query) => {
      const xml = await fetchText(buildGoogleNewsRssUrl(query));
      return parseGoogleNewsRss(xml, EXTERNAL_ALLOWED_SOURCES);
    })
  );
  return feeds.flat().map((item) => ({
    title: item.title,
    url: item.url,
    source: item.source,
    rawText: item.rawText,
    publishedAt: item.publishedAt,
    sourceType: "rss" as const,
  }));
}
