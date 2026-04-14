"use client";

import { useRouter } from "next/navigation";
import { startTransition, useMemo, useState } from "react";
import { FilterBar } from "@/components/filter-bar";
import { SignalCard } from "@/components/signal-card";
import type { FeedCategory, FeedEntry } from "@/lib/feed-types";

type SignalFilterId =
  | "all"
  | "macro"
  | "ai"
  | "quantum"
  | "space"
  | "fusion"
  | "bio-ai"
  | "energy"
  | "geopolitics";

const FILTERS: Array<{ id: SignalFilterId; label: string }> = [
  { id: "all", label: "全部" },
  { id: "macro", label: "宏观" },
  { id: "ai", label: "AI" },
  { id: "quantum", label: "量子" },
  { id: "space", label: "商业太空" },
  { id: "fusion", label: "核聚变" },
  { id: "bio-ai", label: "生物AI" },
  { id: "energy", label: "能源" },
  { id: "geopolitics", label: "地缘" }
];

const FILTER_TAG_HINTS: Record<Exclude<SignalFilterId, "all">, string[]> = {
  macro: ["宏观", "tnx", "vix", "流动性"],
  ai: ["ai", "agent", "nvda", "amd", "tsm", "dell"],
  quantum: ["量子", "quantum", "ionq", "rgti", "qubt"],
  space: ["商业太空", "space", "rklb", "asts", "rdw"],
  fusion: ["核聚变", "fusion", "oklo", "nne", "smr"],
  "bio-ai": ["生物ai", "biotech", "rxrx", "twst", "sana"],
  energy: ["储能", "energy", "flnc", "stem", "mvst"],
  geopolitics: ["地缘", "geopolitics", "能源", "航运", "美元"]
};

type SignalFeedProps = {
  items: FeedEntry[];
};

function sortSignals(items: FeedEntry[]) {
  const order = {
    FLASH: 0,
    PRIORITY: 1,
    ROUTINE: 2
  } as const;

  return [...items].sort((left, right) => {
    const priorityDiff = order[left.priority] - order[right.priority];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

function matchesFilter(item: FeedEntry, filter: SignalFilterId) {
  if (filter === "all") {
    return item.category !== "deep";
  }

  if (item.category === filter) {
    return true;
  }

  const hints = FILTER_TAG_HINTS[filter];
  const haystack = [item.title, item.summary, ...item.tags].join(" ").toLowerCase();
  return hints.some((hint) => haystack.includes(hint.toLowerCase()));
}

export function SignalFeed({ items: initialItems }: SignalFeedProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<SignalFilterId>("all");
  const [items, setItems] = useState(initialItems);

  const visibleItems = useMemo(
    () => sortSignals(items.filter((item) => matchesFilter(item, activeFilter))),
    [activeFilter, items]
  );

  const handleOpen = (item: FeedEntry) => {
    setItems((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, isRead: true } : entry
      )
    );

    fetch(`/api/feed/${item.id}/read`, {
      method: "POST",
      keepalive: true
    }).catch(() => undefined);

    if (!item.content) return;
    startTransition(() => {
      router.push(`/read/${item.id}`);
    });
  };

  return (
    <section className="rounded-[1.4rem] border border-border bg-surface/90 p-5 shadow-glow sm:p-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
            新闻流
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-text">
            文明跃迁新闻流
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-textMuted">
            去重后按文明跃迁板块归类展示，并默认以中文标题与摘要呈现。
          </p>
        </div>
        <FilterBar
          filters={FILTERS}
          activeFilter={activeFilter}
          onChange={(filterId) => setActiveFilter(filterId as SignalFilterId)}
        />
      </div>

      <div className="mt-6 space-y-4">
        {visibleItems.map((item) => (
          <SignalCard key={item.id} item={item} onOpen={handleOpen} />
        ))}
        {visibleItems.length === 0 ? (
          <div className="rounded-[1.4rem] border border-dashed border-border bg-black/10 p-6 text-sm text-textMuted">
            当前筛选条件下没有匹配到信号。
          </div>
        ) : null}
      </div>
    </section>
  );
}
