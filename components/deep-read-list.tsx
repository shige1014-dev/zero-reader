import Link from "next/link";
import { formatAbsoluteTime, getSourceLabel } from "@/lib/format";
import type { FeedEntry } from "@/lib/feed-types";

type DeepReadListProps = {
  items: FeedEntry[];
};

export function DeepReadList({ items }: DeepReadListProps) {
  return (
    <section className="rounded-[1.4rem] border border-border bg-surface/90 p-5 shadow-glow sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
            今日精读
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-text">
            全球前沿摄入入口
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-textMuted">
            每 12 小时更新一次，从更专业的文章里提炼前沿变化、核心判断与继续追踪价值。
          </p>
        </div>
        <div className="rounded-full border border-accent/25 bg-black/20 px-4 py-2 text-xs text-[#ecd38f]">
          摘要 / 核心提炼 / 评估 / 今日三段总结
        </div>
      </div>

      <div className="mt-6 divide-y divide-border">
        {items.map((item) => {
          const external = Boolean(item.url);

          return (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 border-l-2 border-l-accent/50 pl-4 ml-1">
              {external ? (
                <a
                  href={item.url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <h3 className="text-lg font-semibold leading-7 text-text transition group-hover:text-[#f5e4b0]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#d7d3c7]">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-textMuted">
                    <span>{getSourceLabel(item.source)}</span>
                    <span>{item.readingTime ?? "长文"}</span>
                    <span>{formatAbsoluteTime(item.createdAt)}</span>
                  </div>
                </a>
              ) : (
                <Link href={`/read/${item.id}`} className="group block">
                  <h3 className="text-lg font-semibold leading-7 text-text transition group-hover:text-[#f5e4b0]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#d7d3c7]">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-textMuted">
                    <span>{getSourceLabel(item.source)}</span>
                    <span>{item.readingTime ?? "长文"}</span>
                    <span>{formatAbsoluteTime(item.createdAt)}</span>
                  </div>
                </Link>
              )}
            </div>
          );
        })}

        {items.length === 0 ? (
          <div className="py-2 text-sm text-textMuted">当前还没有 deep 分类精读文刊。</div>
        ) : null}
      </div>
    </section>
  );
}
