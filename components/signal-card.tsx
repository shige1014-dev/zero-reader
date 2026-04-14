"use client";

import type { FeedEntry } from "@/lib/feed-types";
import {
  formatAbsoluteTime,
  formatRelativeTime,
  getCategoryLabel,
  getPriorityTone,
  getSourceLabel
} from "@/lib/format";
import { PriorityBadge } from "@/components/priority-badge";

type SignalCardProps = {
  item: FeedEntry;
  onOpen: (item: FeedEntry) => void;
};

export function SignalCard({ item, onOpen }: SignalCardProps) {
  const tone = getPriorityTone(item.priority);

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`group relative w-full rounded-[1.4rem] border bg-surface/85 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 ${tone.border} ${tone.glow}`}
    >
      <span className={`absolute inset-y-4 left-0 w-[3px] rounded-r-full ${tone.accent}`} />
      {!item.isRead ? (
        <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-accent" />
      ) : null}

      <div className="flex flex-wrap items-center gap-2 pr-5">
        <PriorityBadge priority={item.priority} subtle />
        <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-textMuted">
          {getSourceLabel(item.source)}
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-textMuted">
          {formatRelativeTime(item.createdAt)}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-7 text-text transition group-hover:text-[#f5e4b0] sm:text-xl">
        {item.title}
      </h3>
      <p className="mt-2 line-clamp-4 text-sm leading-7 text-[#d2d0c8]">{item.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-textMuted">
        <span>{getCategoryLabel(item.category)}</span>
        <span>{formatAbsoluteTime(item.createdAt)}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/20 bg-black/20 px-2.5 py-1 text-xs text-[#ecd38f]"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-textMuted">
          {item.confidence !== null
            ? `置信度 ${(item.confidence * 100).toFixed(0)}%`
            : "置信度 --"}
        </span>
      </div>
    </button>
  );
}
