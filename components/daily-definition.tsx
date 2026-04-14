import type { Briefing, FeedEntry } from "@/lib/feed-types";
import { getCategoryLabel } from "@/lib/format";

type DailyDefinitionProps = {
  briefing: Briefing | null;
  signals: FeedEntry[];
};

function buildDefinition(briefing: Briefing | null, signals: FeedEntry[]) {
  if (!briefing) {
    return "今天仍处于等待信号收束的阶段，先看清三轨，再决定是否出手。";
  }

  const leadSignal = signals[0];
  const track = leadSignal ? getCategoryLabel(leadSignal.category) : "主线";

  if (briefing.riskLevel === "FLASH") {
    return `今天是风险优先级高于机会优先级的一天，先处理波动与回撤，再观察 ${track} 是否还能给出清晰主线。`;
  }

  if (briefing.riskLevel === "PRIORITY") {
    return `今天是需要主动跟踪与筛选的一天，宏观不算失控，但真正值得加深的机会大概率会从 ${track} 方向先冒出来。`;
  }

  return `今天更像信息缓慢积累的一天，三轨没有失真，适合继续观察 ${track} 及相关前沿信号是否形成新的拐点。`;
}

export function DailyDefinition({ briefing, signals }: DailyDefinitionProps) {
  return (
    <section className="rounded-[1.7rem] border border-border bg-surface/90 p-5 shadow-glow sm:p-6">
      <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
        零零对今天的定义
      </p>
      <div className="mt-4 rounded-[1.35rem] border border-accent/25 bg-black/25 p-5">
        <p className="text-lg leading-9 text-[#f0e6c8] sm:text-xl">
          {buildDefinition(briefing, signals)}
        </p>
      </div>
    </section>
  );
}
