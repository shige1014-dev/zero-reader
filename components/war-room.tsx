import { PriorityBadge } from "@/components/priority-badge";
import { formatAbsoluteTime, getPriorityTone, getRiskCopy } from "@/lib/format";
import type { Briefing } from "@/lib/feed-types";

type WarRoomProps = {
  briefing: Briefing | null;
};

function formatMetric(value: number | null, digits = 1) {
  if (value === null) {
    return "--";
  }

  return value.toFixed(digits);
}

export function WarRoom({ briefing }: WarRoomProps) {
  const priority = briefing?.riskLevel ?? "ROUTINE";
  const tone = getPriorityTone(priority);
  const isFlash = priority === "FLASH";

  return (
    <section
      className={`sticky top-[4.75rem] z-30 rounded-[1.4rem] border bg-surface/95 px-4 py-4 backdrop-blur shadow-glow sm:px-5 ${
        isFlash ? "border-red-500/70 shadow-[0_0_0_1px_rgba(239,68,68,0.18),0_18px_44px_rgba(127,29,29,0.35)]" : "border-border"
      }`}
    >
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)_180px] lg:items-center">
        <div className="flex items-start gap-3">
          <PriorityBadge priority={priority} />
          <div>
            <p className={`text-sm font-medium ${tone.text}`}>风险等级</p>
            <p className="mt-1 text-xs leading-6 text-textMuted">{getRiskCopy(priority)}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-[1rem] border border-border bg-black/30 px-3 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-textMuted">
              VIX
            </p>
            <p className="mt-2 font-display text-3xl tracking-[-0.05em] text-text">
              {formatMetric(briefing?.vix ?? null)}
            </p>
          </div>
          <div className="rounded-[1rem] border border-border bg-black/30 px-3 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-textMuted">
              恐贪
            </p>
            <p className="mt-2 font-display text-3xl tracking-[-0.05em] text-text">
              {formatMetric(briefing?.fearGreed ?? null, 0)}
            </p>
          </div>
          <div className="rounded-[1rem] border border-border bg-black/30 px-3 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-textMuted">
              TNX
            </p>
            <p className="mt-2 font-display text-3xl tracking-[-0.05em] text-text">
              {formatMetric(briefing?.tnx ?? null, 2)}
            </p>
          </div>
        </div>

        <div className="lg:text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-textMuted">
            最新更新时间
          </p>
          <p className="mt-2 text-sm text-text">
            {briefing ? formatAbsoluteTime(briefing.createdAt) : "--"}
          </p>
        </div>
      </div>
    </section>
  );
}
