import { sortArticlesByQuality } from "@/lib/article-quality";
import type { Article } from "@/lib/types";

function normalizeTopicTokens(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2)
    .slice(0, 5);
}

function topicKey(article: Article): string {
  const track = article.tags[0] ?? "宏观";
  const tokens = normalizeTopicTokens(article.title);
  const topic = tokens.length > 0 ? tokens.slice(0, 3).join("-") : `article-${article.id}`;
  return `${track}:${topic}`;
}

export function selectVoiceDigestArticles(articles: Article[], limit = 3): Article[] {
  const selected: Article[] = [];
  const seenTopics = new Set<string>();
  const candidates = sortArticlesByQuality(articles.filter((article) => article.source !== "GitHub Trending"));

  for (const article of candidates) {
    if (selected.length >= limit) {
      break;
    }

    const key = topicKey(article);
    if (seenTopics.has(key)) {
      continue;
    }

    selected.push(article);
    seenTopics.add(key);
  }

  return selected;
}
