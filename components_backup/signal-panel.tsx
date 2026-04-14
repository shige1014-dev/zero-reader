import Link from "next/link";
import { DataMetric } from "@/components/data-metric";
import { PriorityBadge } from "@/components/priority-badge";
import { getCategoryLabel } from "@/lib/format";
import type { Briefing, FeedEntry } from "@/lib/feed-types";

type SignalPanelProps = {
  briefing: Briefing | null;
  focusSignal: FeedEntry | null;
  watchItems: FeedEntry[];
};

function metricSubtext(value: number | null, fallback: string) {
  if (value === null) {
    return fallback;
  }

  return `最新值 ${value}`;
}

export function SignalPanel({
  briefing,
  focusSignal,
  watchItems
}: SignalPanelProps) {
  return (
    <aside className="space-y-5">
      <section className="rounded-[1.8rem] border border-border bg-surface/80 p-5 shadow-glow">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
          实时面板
        </p>
        <div className="mt-4 grid gap-3">
          <DataMetric
            label="VIX"
            value={briefing?.vix?.toFixed(1) ?? "--"}
            subtext={metricSubtext(briefing?.vix ?? null, "等待推送")}
          />
          <DataMetric
            label="恐贪指数"
            value={briefing?.fearGreed?.toFixed(0) ?? "--"}
            subtext={metricSubtext(briefing?.fearGreed ?? null, "等待推送")}
          />
          <DataMetric
            label="TNX"
            value={briefing?.tnx?.toFixed(2) ?? "--"}
            subtext={metricSubtext(briefing?.tnx ?? null, "等待推送")}
          />
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-accent/25 bg-[linear-gradient(180deg,rgba(201,168,76,0.10),rgba(20,20,20,0.92))] p-5 shadow-glow">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
          范式哨信号
        </p>
        {focusSignal ? (
          <>
            <div className="mt-4 flex items-center gap-3">
              <PriorityBadge priority={focusSignal.priority} />
              <span className="text-sm text-textMuted">
                {getCategoryLabel(focusSignal.category)}
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-text">
              {focusSignal.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#d4cfbf]">
              {focusSignal.summary}
            </p>
            <Link
              href={`/read/${focusSignal.id}`}
              className="mt-5 inline-flex text-sm text-accent transition hover:text-[#f6de9a]"
            >
              进入阅读
            </Link>
          </>
        ) : (
          <p className="mt-4 text-sm text-textMuted">暂无高亮信号。</p>
        )}
      </section>

      <section className="rounded-[1.8rem] border border-border bg-surface/80 p-5 shadow-glow">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
          今日值得关注
        </p>
        <div className="mt-4 space-y-3">
          {watchItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/read/${item.id}`}
              className="flex gap-3 rounded-[1.2rem] border border-border bg-black/15 px-4 py-3 transition hover:border-accent/30"
            >
              <span className="mt-0.5 font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm leading-6 text-text">{item.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-textMuted">
                  {getCategoryLabel(item.category)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
