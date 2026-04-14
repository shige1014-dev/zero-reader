import type { Priority } from '@/lib/db'

const config: Record<Priority, { label: string; className: string }> = {
  FLASH: {
    label: 'FLASH',
    className: 'bg-red-500/15 text-red-400 border border-red-500/30',
  },
  PRIORITY: {
    label: 'PRIORITY',
    className: 'bg-accent/15 text-accent border border-accent/30',
  },
  ROUTINE: {
    label: 'ROUTINE',
    className: 'bg-white/5 text-textMuted border border-white/10',
  },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = config[priority]
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] ${className}`}>
      {label}
    </span>
  )
}

export function PriorityBar({ priority }: { priority: Priority }) {
  const colors: Record<Priority, string> = {
    FLASH: 'bg-red-500',
    PRIORITY: 'bg-accent',
    ROUTINE: 'bg-white/20',
  }
  return <div className={`w-0.5 shrink-0 self-stretch rounded-full ${colors[priority]}`} />
}
