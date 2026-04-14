import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-white/5 bg-canvas/85 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accentSoft font-display text-sm font-semibold text-accent">
            Z
          </span>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
              ZERO2076
            </p>
            <p className="text-sm text-textMuted">情报终端</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-textMuted">
          <Link href="/" className="transition hover:text-text">
            首页
          </Link>
          <Link href="/about" className="transition hover:text-text">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
