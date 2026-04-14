import Link from "next/link";
import type { TocItem } from "@/lib/content";

type ArticleTocProps = {
  items: TocItem[];
};

export function ArticleToc({ items }: ArticleTocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 rounded-[1.6rem] border border-border bg-surface/80 p-5 shadow-glow">
      <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
        On This Page
      </p>
      <nav className="mt-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm leading-6 transition hover:text-text ${
              item.depth === 3 ? "pl-4 text-textMuted" : "text-[#ddd7c7]"
            }`}
          >
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}
