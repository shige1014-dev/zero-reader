export interface RssSourceItem {
  title: string;
  url: string;
  source: string;
  rawText: string;
  publishedAt: string | null;
}

const GOOGLE_NEWS_BASE_URL = "https://news.google.com/rss/search";

function decodeXml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function cleanTitle(title: string): string {
  return decodeXml(title).replace(/\s+-\s+[^-]+$/, "").trim();
}

export function buildGoogleNewsRssUrl(query: string): string {
  const params = new URLSearchParams({
    q: query,
    hl: "en-US",
    gl: "US",
    ceid: "US:en"
  });
  return `${GOOGLE_NEWS_BASE_URL}?${params.toString()}`;
}

export function parseGoogleNewsRss(xml: string, allowedSources: Set<string>): RssSourceItem[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((match) => {
      const block = match[1];
      const source = decodeXml(block.match(/<source\b[^>]*>([\s\S]*?)<\/source>/i)?.[1]?.trim() ?? "");
      if (!source || !allowedSources.has(source)) {
        return null;
      }

      const title = cleanTitle(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "");
      const url = decodeXml(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim() ?? "");
      const publishedAt = decodeXml(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim() ?? "");
      if (!title || !url) {
        return null;
      }

      return {
        title,
        url,
        source,
        rawText: title,
        publishedAt: publishedAt || null
      } satisfies RssSourceItem;
    })
    .filter((item): item is RssSourceItem => item !== null);
}
