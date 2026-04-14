import { BriefingBanner } from "@/components/briefing-banner";
import { DailyDefinition } from "@/components/daily-definition";
import { DeepReadList } from "@/components/deep-read-list";

import { TrendingRepos } from "@/components/trending-repos";
import { WarRoom } from "@/components/war-room";
import { getLatestBriefing, listDeepArticles, listFeed } from "@/lib/db";
import type { FeedEntry } from "@/lib/feed-types";

export const revalidate = 3600;

function normalizeKey(item: FeedEntry) {
  const title = item.title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  return item.url?.trim() || title;
}

function dedupeItems(items: FeedEntry[]) {
  const seen = new Set<string>();
  const output: FeedEntry[] = [];

  for (const item of items) {
    const key = normalizeKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(item);
  }

  return output;
}

export default function HomePage() {
  const briefing = getLatestBriefing();
  const trendingItems = dedupeItems(listFeed({ category: "trending", limit: 8 })).slice(0, 6);
  const signalItems: never[] = [];
  const deepItems = dedupeItems(listDeepArticles(30)).slice(0, 30);

  return (
    <main className="relative pb-12 pt-6 sm:pt-8">
      <div className="gold-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="space-y-6">
        <div className="gold-grid relative overflow-hidden rounded-[2rem] border border-border bg-surface/80 shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.10),transparent_26%)]" />
          <div className="relative p-3 sm:p-4">
            <WarRoom briefing={briefing} />
          </div>
        </div>

        <BriefingBanner briefing={briefing} />
        <TrendingRepos items={trendingItems} />
        <DeepReadList items={deepItems} />
        <DailyDefinition briefing={briefing} signals={signalItems} />
      </div>
    </main>
  );
}
