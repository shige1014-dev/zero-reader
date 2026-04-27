import type { SourceItem } from "./types";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const RECENT_HOURS = 36;

interface NewsApiArticle {
  title?: string;
  url?: string;
  description?: string;
  content?: string;
  publishedAt?: string;
  source?: { name?: string };
}

interface NewsApiResponse {
  articles?: NewsApiArticle[];
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`newsapi ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

const REQUESTS = [
  {
    q: '"AI chip" OR semiconductor OR GPU OR HBM OR packaging',
    domains:
      "reuters.com,bloomberg.com,cnbc.com,theverge.com,arstechnica.com,tomshardware.com,anandtech.com",
  },
  {
    q: '"quantum computing" OR qubit OR nuclear OR uranium OR reactor OR SpaceX OR launch',
    domains:
      "reuters.com,bloomberg.com,ft.com,cnbc.com,techcrunch.com,space.com,nextbigfuture.com",
  },
];

export async function fetchNewsApi(): Promise<SourceItem[]> {
  if (!NEWS_API_KEY) return [];
  const from = new Date(Date.now() - RECENT_HOURS * 60 * 60 * 1000).toISOString();

  const responses = await Promise.all(
    REQUESTS.map(async (request) => {
      const params = new URLSearchParams({
        q: request.q,
        domains: request.domains,
        language: "en",
        sortBy: "publishedAt",
        pageSize: "12",
        from,
        apiKey: NEWS_API_KEY!,
      });
      const data = await fetchJson<NewsApiResponse>(
        `https://newsapi.org/v2/everything?${params.toString()}`
      );
      return Array.isArray(data.articles) ? data.articles : [];
    })
  );

  return responses.flat().map((article) => ({
    title: article.title ?? "Untitled",
    url: article.url ?? "",
    source: article.source?.name ?? "NewsAPI",
    rawText: [article.description, article.content].filter(Boolean).join(" "),
    publishedAt: article.publishedAt ?? null,
    sourceType: "newsapi" as const,
  }));
}
