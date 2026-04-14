import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 -mx-4 mb-6 border-b border-border bg-canvas/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
            <span className="font-mono text-[10px] font-bold text-canvas">00</span>
          </div>
          <div>
            <p className="font-display text-sm font-medium leading-none text-text">ZERO2076</p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-textMuted">情报阅读台</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <Link href="/" className="rounded-full px-3 py-1.5 font-mono text-[11px] text-textMuted transition hover:text-accent">
            首页
          </Link>
          <Link href="/vault" className="rounded-full px-3 py-1.5 font-mono text-[11px] text-textMuted transition hover:text-accent">
            知识库
          </Link>
          <Link href="/about" className="rounded-full px-3 py-1.5 font-mono text-[11px] text-textMuted transition hover:text-accent">
            系统
          </Link>
        </nav>
      </div>
    </header>
  )
}
