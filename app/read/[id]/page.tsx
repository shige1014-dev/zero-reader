import { notFound } from 'next/navigation'
import { getFeedById } from '@/lib/db'
import { MarkdownContent } from '@/components/markdown-content'
import { ReadingProgress } from '@/components/reading-progress'
import { PriorityBadge } from '@/components/priority-badge'
import Link from 'next/link'
import { getSourceLabel } from '@/lib/format'

export default function ReadPage({ params }: { params: { id: string } }) {
  const item = getFeedById(params.id)
  if (!item || !item.content) notFound()

  return (
    <>
      <ReadingProgress />
      <main className="mx-auto max-w-3xl pb-24 pt-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-textMuted transition hover:text-accent">
          ← 返回情报台
        </Link>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <PriorityBadge priority={item.priority} />
          <span className="font-mono text-xs tracking-widest text-textMuted">
            {getSourceLabel(item.source)} · {new Intl.DateTimeFormat('zh-CN', {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }).format(new Date(item.createdAt || Date.now()))}
          </span>
        </div>

        <h1 className="font-display text-3xl font-semibold leading-snug tracking-[-0.03em] text-text sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-textMuted">{item.summary}</p>

        {item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="rounded-full bg-accentSoft px-3 py-1 text-xs text-accent">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="my-10 border-t border-border" />

        <article className="markdown">
          <MarkdownContent source={item.content} />
        </article>

        {item.url && (
          <div className="mt-12 rounded-[1.4rem] border border-border bg-surface/60 px-5 py-4">
            <p className="text-xs text-textMuted">来源</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="mt-1 text-sm text-accent underline underline-offset-4 transition hover:brightness-125">
              {item.url}
            </a>
          </div>
        )}
      </main>
    </>
  )
}
