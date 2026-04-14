import Link from "next/link";
import { PriorityBadge } from "@/components/priority-badge";
import { formatAbsoluteTime, getSourceLabel } from "@/lib/format";
import type { FeedEntry } from "@/lib/feed-types";

type DeepArticleCardProps = {
  article: FeedEntry;
};

export function DeepArticleCard({ article }: DeepArticleCardProps) {
  return (
    <Link
      href={`/read/${article.id}`}
      className="group rounded-[1.7rem] border border-border bg-surface/80 p-5 shadow-glow transition duration-200 hover:-translate-y-0.5 hover:border-accent/35 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-3">
        <PriorityBadge priority={article.priority} subtle />
        <span className="text-xs uppercase tracking-[0.22em] text-textMuted">
          {getSourceLabel(article.source)}
        </span>
      </div>
      <h3 className="mt-4 font-display text-3xl tracking-[-0.05em] text-text transition group-hover:text-[#f5e4b0]">
        {article.title}
      </h3>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[#d4d0c6]">
        {article.summary}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-textMuted">
        <span>{article.readingTime ?? "长文"}</span>
        <span>{formatAbsoluteTime(article.createdAt)}</span>
      </div>
      <span className="mt-6 inline-flex text-sm text-accent transition group-hover:text-[#f6de9a]">
        进入阅读
      </span>
    </Link>
  );
}
