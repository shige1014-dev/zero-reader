import { readVaultCards, translateTag } from '@/lib/vault'
import Link from 'next/link'

const hallLabel: Record<string, string> = {
  hall_knowledge: '知识',
  hall_judgment: '判断',
  hall_expression: '表达',
  hall_relationship: '关系',
}

export default function VaultPage({
  searchParams,
}: {
  searchParams: { hall?: string; tag?: string }
}) {
  const hall = searchParams.hall
  const tag = searchParams.tag
  const cards = readVaultCards({ hall, tag, limit: 100 })

  const halls = ['hall_knowledge', 'hall_judgment', 'hall_expression', 'hall_relationship']

  return (
    <main className="pb-24 pt-4">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">Knowledge Cards</p>
        <h1 className="mt-1 font-display text-2xl tracking-[-0.02em] text-text">OBI 知识卡片</h1>
        <p className="mt-1 text-sm text-textMuted">ZERO_V4 · {cards.length} 张</p>
      </div>

      {/* 分类筛选 */}
      <div className="mb-5 flex flex-wrap gap-2">
        <Link href="/vault"
          className={`rounded-full px-4 py-1.5 font-mono text-xs tracking-widest transition ${!hall ? 'bg-accent text-canvas' : 'border border-border text-textMuted hover:text-accent'}`}>
          全部
        </Link>
        {halls.map(h => (
          <Link key={h} href={`/vault?hall=${h}`}
            className={`rounded-full px-4 py-1.5 font-mono text-xs tracking-widest transition ${hall === h ? 'bg-accent text-canvas' : 'border border-border text-textMuted hover:text-accent'}`}>
            {hallLabel[h] ?? h}
          </Link>
        ))}
      </div>

      {/* 卡片列表 */}
      <div className="space-y-2">
        {cards.length === 0 ? (
          <div className="py-12 text-center text-sm text-textMuted">
            <p>未找到卡片</p>
            <p className="mt-1 font-mono text-xs text-textMuted/50">VAULT_PATH: {process.env.VAULT_PATH ?? '未设置'}</p>
          </div>
        ) : cards.map(card => (
          <div key={card.id}
            className="rounded-[1.4rem] border border-border bg-surface/80 px-5 py-4 shadow-glow">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-accentSoft px-2 py-0.5 font-mono text-[10px] text-accent">
                    {hallLabel[card.hall] ?? card.hall}
                  </span>
                  {card.tags.slice(0, 3).map(t => (
                    <Link key={t} href={`/vault?tag=${t}`}
                      className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-textMuted hover:text-accent">
                      {translateTag(t)}
                    </Link>
                  ))}
                </div>
                <p className="mt-2 font-display text-base text-text">{card.title}</p>
                <p className="mt-1 text-sm leading-6 text-textMuted">{card.summary}</p>
                {card.updated_at && (
                  <p className="mt-2 font-mono text-[10px] text-textMuted/40">{card.updated_at}</p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-sm text-accent">{Math.round(card.weight * 100)}</p>
                <p className="font-mono text-[10px] text-textMuted/40">wt</p>
                <p className="mt-1 font-mono text-[10px] text-textMuted/40">
                  {Math.round(card.confidence * 100)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/" className="font-mono text-xs text-textMuted hover:text-accent">← 返回首页</Link>
      </div>
    </main>
  )
}
