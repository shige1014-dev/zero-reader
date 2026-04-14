import type { FeedPriority } from "@/lib/feed-types";
import { getPriorityTone } from "@/lib/format";

type PriorityBadgeProps = {
  priority: FeedPriority;
  subtle?: boolean;
};

export function PriorityBadge({ priority, subtle = false }: PriorityBadgeProps) {
  const tone = getPriorityTone(priority);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.24em] ${
        subtle ? "bg-transparent" : "bg-black/30"
      } ${tone.border} ${tone.text}`}
    >
      {priority}
    </span>
  );
}
