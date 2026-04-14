import Link from "next/link";
import { PriorityBadge } from "@/components/priority-badge";
import {
  formatAbsoluteTime,
  formatRelativeTime,
  getCategoryLabel,
  getPriorityTone,
  getSourceLabel
} from "@/lib/format";
import type { FeedEntry } from "@/lib/feed-types";

type FeedCardProps = {
  item: FeedEntry;
  onOpen?: (item: FeedEntry) => void;
  href?: `\/read\/${string}`;
};

export function FeedCard({ item, onOpen, href }: FeedCardProps) {
  const tone = getPriorityTone(item.priority);
  const className = `group relative w-full rounded-[1.6rem] border bg-surface p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 ${tone.border} ${tone.glow} ${
    item.isRead ? "opacity-75" : ""
  }`;
  const content = (
    <>
      <div
        className={`absolute inset-y-4 left-0 w-[3px] rounded-r-full ${tone.accent}`}
      />
      {!item.isRead ? (
        <span className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-accent" />
      ) : null}
      <div className="flex flex-wrap items-center gap-2 pr-6">
        <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-textMuted">
          {getSourceLabel(item.source)}
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-textMuted">
          {getCategoryLabel(item.category)}
        </span>
        <PriorityBadge priority={item.priority} subtle />
      </div>
      <h3
        className={`mt-4 max-w-3xl font-display text-2xl tracking-[-0.04em] text-text transition group-hover:text-[#f5e4b0] ${
          item.priority === "FLASH" ? "font-semibold" : "font-medium"
        }`}
      >
        {item.title}
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#d2d0c8] line-clamp-2">
        {item.summary}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-textMuted">
        <span>{formatRelativeTime(item.createdAt)}</span>
        <span>{formatAbsoluteTime(item.createdAt)}</span>
        {item.confidence !== null ? (
          <span>Confidence {(item.confidence * 100).toFixed(0)}%</span>
        ) : null}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onOpen?.(item)} className={className}>
      {content}
    </button>
  );
}
