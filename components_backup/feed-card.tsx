'use client'

import Link from 'next/link'
import type { FeedItem } from '@/lib/db'
import { PriorityBadge, PriorityBar } from './priority-badge'

const categoryLabel: Record<string, string> = {
  macro: '宏观',
  market: '市场',
  civilization: '文明跃迁',
  deep: '深度文刊',
}

const sourceLabel: Record<string, string> = {
  siqitian: '司天官',
  koukou: '扣扣',
  fanpai: '范式哨',
  manual: '手动',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m 前`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h 前`
  return `${Math.floor(hrs / 24)}d 前`
}

type Props = { item: FeedItem; onRead?: (id: string) => void }

export function FeedCard({ item, onRead }: Props) {
  const hasContent = Boolean(item.content)
  const glowClass = item.priority === 'FLASH'
    ? 'shadow-[0_0_0_1px_rgba(239,68,68,0.2),0_16px_48px_rgba(0,0,0,0.34)]'
    : 'shadow-glow'

  const card = (
    <div
      className={`group flex gap-3 rounded-[1.4rem] border border-border bg-surface/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 sm:p-5 ${glowClass} ${item.priority === 'FLASH' ? 'border-red-500/25' : ''}`}
      onClick={() => onRead?.(item.id)}
    >
      <PriorityBar priority={item.priority} />

      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority={item.priority} />
          <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-widest text-textMuted">
            {categoryLabel[item.category] ?? item.category}
          </span>
          <span className="font-mono text-[10px] text-textMuted/60">
            {sourceLabel[item.source] ?? item.source}
          </span>
          {!item.is_read && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
          )}
        </div>

        {/* Title */}
        <h3 className={`mt-2.5 font-display text-[1.05rem] leading-snug tracking-[-0.02em] transition ${item.priority === 'FLASH' ? 'font-semibold text-white' : 'text-text'} group-hover:text-[#f5e4b0]`}>
          {item.title}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm leading-7 text-textMuted line-clamp-3">
          {item.summary}
        </p>

        {/* Tags + time */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="rounded-full bg-accentSoft px-2 py-0.5 text-[11px] text-accent/80">
              {tag}
            </span>
          ))}
          <span className="ml-auto font-mono text-[11px] text-textMuted/50">
            {timeAgo(item.created_at)}
          </span>
          {item.confidence < 0.8 && (
            <span className="font-mono text-[11px] text-textMuted/40">
              {Math.round(item.confidence * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (hasContent) {
    return <Link href={`/read/${item.id}`}>{card}</Link>
  }
  return card
}
