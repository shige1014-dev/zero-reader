"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDE_PREFIXES = ["/matrix", "/civilization-leap"];

export function SiteHeader() {
  const pathname = usePathname() || "";
  if (HIDE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }
  return (
    <header className="silk-divider-bottom sticky top-0 z-40 -mx-4 bg-[#05080b]/92 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href="/quiet.html" className="flex items-center gap-3">
          <span className="silk-soft inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03] font-display text-sm font-semibold text-accent">
            Z
          </span>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
              ZERO2076
            </p>
            <p className="text-sm text-textMuted">零零精选</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-textMuted">
          <a href="/quiet.html" className="transition hover:text-text">
            精选
          </a>
          <a href="/museum.html" className="transition hover:text-text">
            博物馆
          </a>
        </nav>
      </div>
    </header>
  );
}
