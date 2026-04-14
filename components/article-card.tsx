import Link from "next/link";
import type { ArticleSummary } from "@/lib/content";

type ArticleCardProps = {
  article: ArticleSummary;
  index: number;
};

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <Link
      href={`/civilization-leap/${article.slug}`}
      className="group rounded-[1.7rem] border border-border bg-surface/80 p-5 shadow-glow transition duration-200 hover:-translate-y-0.5 hover:border-accent/35 sm:p-6"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
            Chapter {index.toString().padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-display text-2xl tracking-[-0.03em] text-text transition group-hover:text-[#f5e4b0]">
            {article.title}
          </h3>
          <p className="mt-3 max-w-2xl font-body text-base leading-7 text-textMuted">
            {article.excerpt}
          </p>
        </div>
        <div className="grid min-w-[220px] grid-cols-3 gap-3 text-sm">
          {[
            ["阅读时长", article.readingTime],
            ["归档日期", article.formattedDate],
            ["序列", "私藏档案"]
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-black/20 px-3 py-3"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-textMuted">
                {label}
              </p>
              <p className="mt-2 font-display text-sm text-text">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
