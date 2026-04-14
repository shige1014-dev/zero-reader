"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { FeedCard } from "@/components/feed-card";
import type { FeedCategory, FeedEntry } from "@/lib/feed-types";

const filters: Array<{ id: "all" | FeedCategory; label: string }> = [
  { id: "all", label: "全部" },
  { id: "macro", label: "宏观" },
  { id: "market", label: "市场" },
  { id: "civilization", label: "文明跃迁信号" }
];

type FeedStreamProps = {
  items: FeedEntry[];
};

export function FeedStream({ items: initialItems }: FeedStreamProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"all" | FeedCategory>("all");
  const [items, setItems] = useState(initialItems);

  const visibleItems =
    activeFilter === "all"
      ? items.filter((item) => item.category !== "deep")
      : items.filter((item) => item.category === activeFilter);

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

    startTransition(() => {
      router.push(`/read/${item.id}`);
    });
  };

  return (
    <section className="rounded-[2rem] border border-border bg-surface/70 p-5 shadow-glow sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
            热点流
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.05em] text-text">
            今日信号流
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === filter.id
                  ? "border-accent/35 bg-accent text-canvas"
                  : "border-border bg-black/15 text-textMuted hover:border-accent/25 hover:text-text"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {visibleItems.map((item) => (
          <FeedCard key={item.id} item={item} onOpen={handleOpen} />
        ))}
        {visibleItems.length === 0 ? (
          <div className="rounded-[1.4rem] border border-dashed border-border bg-black/10 p-6 text-sm text-textMuted">
            当前筛选下没有信号。
          </div>
        ) : null}
      </div>
    </section>
  );
}
