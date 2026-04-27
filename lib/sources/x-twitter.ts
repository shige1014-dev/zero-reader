import type { SourceItem } from "./types";

const X_ACCOUNTS = [
  { handle: "karpathy", name: "Andrej Karpathy" },
  { handle: "cobie", name: "Cobie" },
  { handle: "AswathDamodaran", name: "Aswath Damodaran" },
  { handle: "elonmusk", name: "Elon Musk" },
  { handle: "balajis", name: "Balaji Srinivasan" },
];

const NITTER_INSTANCES = [
  "https://nitter.privacydev.net",
  "https://nitter.poast.org",
  "https://nitter.1d4.us",
];

async function fetchNitterRss(handle: string): Promise<string | null> {
  for (const instance of NITTER_INSTANCES) {
    try {
      const url = `${instance}/${handle}/rss`;
      const res = await fetch(url, {
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; zerozero-reader/1.0)" },
      });
      if (res.ok) return await res.text();
    } catch {
      continue;
    }
  }
  return null;
}

function parseNitterRss(xml: string, handle: string, name: string): SourceItem[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .slice(0, 5)
    .map((match): SourceItem | null => {
      const block = match[1];
      const title = block.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
      const link = block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim() ?? "";
      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim() ?? "";

      if (!title || !link) return null;
      if (title.startsWith("RT by") || title.startsWith("R to")) return null;

      return {
        title: `[@${handle}] ${title}`,
        url: link.replace(/nitter\.[^/]+/, "twitter.com"),
        source: `X:${name}`,
        rawText: title,
        publishedAt: pubDate || null,
        sourceType: "x-twitter" as const,
      } satisfies SourceItem;
    })
    .filter((item): item is SourceItem => item !== null);
}

export async function fetchXTwitter(): Promise<SourceItem[]> {
  const results = await Promise.all(
    X_ACCOUNTS.map(async ({ handle, name }) => {
      try {
        const xml = await fetchNitterRss(handle);
        if (!xml) return [];
        return parseNitterRss(xml, handle, name);
      } catch (e) {
        console.error(`X fetch failed for @${handle}:`, e);
        return [];
      }
    })
  );
  return results.flat();
}
