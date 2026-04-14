import type { Briefing } from '@/lib/db'

const riskConfig = {
  FLASH: { label: '高度警戒', dot: 'bg-red-500 animate-pulse', bar: 'bg-red-500/20' },
  PRIORITY: { label: '需要关注', dot: 'bg-accent animate-pulse', bar: 'bg-accent/10' },
  ROUTINE: { label: '常态运行', dot: 'bg-emerald-500', bar: 'bg-white/5' },
}

function timeLabel(dateStr: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(dateStr))
}

export function BriefingBanner({ briefing }: { briefing: Briefing | null }) {
  if (!briefing) {
    return (
      <div className="rounded-[1.7rem] border border-border bg-surface/60 px-6 py-5 text-sm text-textMuted">
        司天官尚未推送今日简报
      </div>
    )
  }

  const cfg = riskConfig[briefing.risk_level]

  return (
    <div className={`gold-grid rounded-[1.7rem] border border-border ${cfg.bar} px-6 py-6 shadow-glow sm:px-8`}>
      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
          <span className="font-mono text-xs tracking-widest text-textMuted">
            司天官 · {cfg.label}
          </span>
        </div>
        <span className="font-mono text-xs text-textMuted/50">
          更新于 {timeLabel(briefing.created_at)}
        </span>
        {/* Metrics */}
        <div className="ml-auto flex gap-4">
          {briefing.vix != null && (
            <Metric label="VIX" value={briefing.vix.toFixed(1)} />
          )}
          {briefing.fear_greed != null && (
            <Metric label="恐贪" value={briefing.fear_greed.toFixed(0)} />
          )}
          {briefing.tnx != null && (
            <Metric label="TNX" value={`${briefing.tnx.toFixed(2)}%`} />
          )}
        </div>
      </div>

      {/* Three tracks */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <TrackItem label="宏观轨" text={briefing.macro_track} />
        <TrackItem label="市场轨" text={briefing.market_track} />
        <TrackItem label="情绪轨" text={briefing.sentiment_track} />
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right">
      <p className="font-mono text-[10px] tracking-widest text-textMuted/50">{label}</p>
      <p className="font-display text-sm text-text">{value}</p>
    </div>
  )
}

function TrackItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[1.2rem] border border-border bg-black/20 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{label}</p>
      <p className="mt-2 text-sm leading-7 text-textMuted">{text}</p>
    </div>
  )
}
