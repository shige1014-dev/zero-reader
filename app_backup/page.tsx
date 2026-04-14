import { getFeed, getLatestBriefing, seedMockData } from '@/lib/db'
import { BriefingBanner } from '@/components/briefing-banner'
import { FeedCard } from '@/components/feed-card'
import { getAllArticles } from '@/lib/content'
import { readVaultCards, translateTag } from '@/lib/vault'
import Link from 'next/link'

export const revalidate = 60

function SectionHeader({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">{en}</p>
        <h2 className="mt-0.5 font-display text-xl tracking-[-0.02em] text-text">{zh}</h2>
      </div>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

function DataCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-[1.4rem] border border-border bg-surface/80 px-4 py-4 shadow-glow">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-textMuted">{label}</p>
      <p className="mt-2 font-display text-2xl tracking-[-0.02em] text-text">{value}</p>
      {sub && <p className="mt-1 text-xs text-textMuted">{sub}</p>}
    </div>
  )
}

export default function HomePage() {
  if (process.env.NODE_ENV === 'development') seedMockData()

  const briefing = getLatestBriefing()
  const allItems = getFeed({ limit: 80 })
  const flashItems = allItems.filter(i => i.priority === 'FLASH')
  const trendingItems = allItems.filter(i => i.tags.includes('GitHub Trending') || i.tags.includes('GitHub'))
  const civilItems = allItems.filter(i => i.category === 'civilization' && !i.tags.includes('GitHub Trending'))
  const macroItems = allItems.filter(i => i.category === 'macro')
  const deepItems = allItems.filter(i => i.category === 'deep')
  const trendingDeep = deepItems.filter(d => d.title.includes('Trending'))
  const articles = getAllArticles()
  const vaultCards = readVaultCards({ hall: "hall_knowledge", limit: 6 })

  return (
    <main className="space-y-10 pb-24 pt-4">

      {/* FLASH 警报 */}
      {flashItems.length > 0 && (
        <section className="space-y-2">
          {flashItems.map(item => <FeedCard key={item.id} item={item} />)}
        </section>
      )}

      {/* ① 今日简报 */}
      <section>
        <SectionHeader en="Daily Briefing" zh="今日简报" />
        <BriefingBanner briefing={briefing} />
        {briefing && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            <DataCard label="VIX" value={briefing.vix?.toFixed(1) ?? '—'} sub="波动率" />
            <DataCard label="恐贪" value={briefing.fear_greed?.toFixed(0) ?? '—'}
              sub={briefing.fear_greed ? (briefing.fear_greed > 60 ? '贪婪' : briefing.fear_greed < 40 ? '恐惧' : '中性') : undefined} />
            <DataCard label="TNX" value={briefing.tnx ? `${briefing.tnx.toFixed(2)}%` : '—'} sub="10年期" />
          </div>
        )}
      </section>

      {/* ② 热门仓库排行 */}
      {trendingItems.length > 0 && (
        <section>
          <SectionHeader en="Trending Repos" zh="热门仓库排行" />
          <div className="space-y-2">
            {trendingItems.slice(0, 8).map((item, i) => (
              <a key={item.id} href={item.url ?? '#'} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-[1.3rem] border border-border bg-surface/80 px-4 py-3.5 transition hover:border-accent/30 active:scale-[0.99]">
                <span className="mt-0.5 w-6 shrink-0 font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">{item.title}</p>
                  <p className="mt-0.5 text-xs text-textMuted line-clamp-2">{item.summary}</p>
                </div>
              </a>
            ))}
          </div>
          {trendingDeep.length > 0 && (
            <Link href={`/read/${trendingDeep[0].id}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-[1.2rem] border border-border bg-accentSoft py-2.5 text-sm text-accent transition hover:brightness-110">
              查看范式哨完整简评 →
            </Link>
          )}
        </section>
      )}

      {/* ③ 文明跃迁信号 */}
      {civilItems.length > 0 && (
        <section>
          <SectionHeader en="Civilization Signal" zh="文明跃迁信号" />
          <div className="space-y-2">
            {civilItems.slice(0, 5).map(item => <FeedCard key={item.id} item={item} />)}
          </div>
        </section>
      )}

      {/* ④ 宏观市场 */}
      {macroItems.length > 0 && (
        <section>
          <SectionHeader en="Macro Market" zh="宏观市场" />
          <div className="space-y-2">
            {macroItems.slice(0, 5).map(item => <FeedCard key={item.id} item={item} />)}
          </div>
        </section>
      )}

      {/* ⑤ 文明跃迁内核 */}
      {articles.length > 0 && (
        <section>
          <SectionHeader en="Core Archive" zh="文明跃迁内核" />
          <div className="space-y-2">
            {articles.map((a, i) => (
              <Link key={a.slug} href={`/civilization-leap/${a.slug}`}
                className="flex items-start gap-4 rounded-[1.4rem] border border-border bg-surface/80 px-5 py-4 transition hover:border-accent/30 active:scale-[0.99]">
                <span className="mt-0.5 font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base text-text">{a.title}</p>
                  <p className="mt-1 text-sm leading-6 text-textMuted line-clamp-2">{a.excerpt}</p>
                  <div className="mt-2 flex gap-3">
                    <span className="font-mono text-[11px] text-textMuted/60">{a.readingTime}</span>
                    <span className="font-mono text-[11px] text-textMuted/60">{a.formattedDate}</span>
                  </div>
                </div>
                <span className="mt-1 shrink-0 text-textMuted/40">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ⑥ 知识卡片 */}
      <section>
        <SectionHeader en="Knowledge Cards" zh="知识卡片" />
        {vaultCards.length === 0 ? (
          <div className="rounded-[1.4rem] border border-border bg-surface/60 px-5 py-6 text-center">
            <p className="text-sm text-textMuted">OBI vault 未连接</p>
            <p className="mt-1 font-mono text-xs text-textMuted/50">设置 VAULT_PATH 环境变量</p>
          </div>
        ) : (
          <div className="space-y-2">
            {vaultCards.map(card => (
              <div key={card.id}
                className="rounded-[1.4rem] border border-border bg-surface/80 px-5 py-4 shadow-glow">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-accentSoft px-2 py-0.5 font-mono text-[10px] text-accent">
                        {card.hall.replace('hall_', '')}
                      </span>
                      {card.tags.slice(0, 2).map((t: string) => (
                        <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-textMuted">
                          {translateTag(t)}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 font-display text-base text-text">{card.title}</p>
                    <p className="mt-1 text-sm leading-6 text-textMuted line-clamp-2">{card.summary}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-sm text-accent">{Math.round(card.weight * 100)}</p>
                    <p className="font-mono text-[10px] text-textMuted/40">wt</p>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/vault"
              className="flex items-center justify-center gap-2 rounded-[1.2rem] border border-border py-2.5 text-sm text-textMuted transition hover:text-accent">
              查看全部知识卡片 →
            </Link>
          </div>
        )}
      </section>

      {/* 深度文刊 */}
      {deepItems.filter(d => !d.title.includes('Trending')).length > 0 && (
        <section>
          <SectionHeader en="Deep Reading" zh="深度文刊" />
          <div className="space-y-2">
            {deepItems.filter(d => !d.title.includes('Trending')).slice(0, 4).map(item => (
              <Link key={item.id} href={item.content ? `/read/${item.id}` : '#'}
                className="block rounded-[1.4rem] border border-border bg-surface/80 px-5 py-4 transition hover:border-accent/30">
                <p className="font-display text-base text-text">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-textMuted">{item.summary}</p>
                {item.content && <p className="mt-2 text-xs text-accent">进入阅读 →</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
