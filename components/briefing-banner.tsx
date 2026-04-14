import type { Briefing } from "@/lib/feed-types";

type BriefingBannerProps = {
  briefing: Briefing | null;
};

const tracks: Array<{
  key: "macroTrack" | "marketTrack" | "sentimentTrack";
  label: string;
}> = [
  { key: "macroTrack", label: "天轨" },
  { key: "marketTrack", label: "地轨" },
  { key: "sentimentTrack", label: "人轨" }
];

function buildMacroSummary(briefing: Briefing | null) {
  if (!briefing) {
    return "当前仍在等待新一轮四小时简报推送，先把三轨看作待确认状态。";
  }

  if (briefing.riskLevel === "FLASH") {
    return "宏观进入高警戒区，三轨应以风险传导与防守优先。";
  }

  if (briefing.riskLevel === "PRIORITY") {
    return "宏观处于可跟踪但不宜松懈的区间，重点看三轨是否向同一方向收束。";
  }

  return "宏观暂时维持常规跟踪级，当前更重要的是观察局部主线如何在三轨中形成共振。";
}

export function BriefingBanner({ briefing }: BriefingBannerProps) {
  return (
    <section className="rounded-[1.4rem] border border-border bg-surface/90 p-5 shadow-glow sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
            今日简报
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-text">
            天地人三轨摘要
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-textMuted">
            每 4 小时更新一次，先告诉你宏观环境，再用一句总结收束当天基调。
          </p>
        </div>
        <div className="rounded-full border border-accent/25 bg-black/20 px-4 py-2 text-xs text-[#ecd38f]">
          {buildMacroSummary(briefing)}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {tracks.map((track) => (
          <div
            key={track.key}
            className="rounded-[1.2rem] border border-border bg-black/20 p-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              {track.label}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#ddd8ca]">
              {briefing?.[track.key] ?? "等待机器人推送最新简报。"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
