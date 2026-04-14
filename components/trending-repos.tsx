import Link from "next/link";
import { formatAbsoluteTime, getSourceLabel } from "@/lib/format";
import type { FeedEntry } from "@/lib/feed-types";

type TrendingReposProps = {
  items: FeedEntry[];
};

function getRepoFunctionSummary(item: FeedEntry) {
  if (item.summary?.trim()) {
    return item.summary;
  }

  if (item.content?.trim()) {
    return item.content.slice(0, 120);
  }

  return "当前暂无摘要，建议补充仓库核心能力说明。";
}

function getFitSummary(item: FeedEntry) {
  if (item.tags.length > 0) {
    return `适配方向：${item.tags.slice(0, 3).join(" / ")}`;
  }

  return "适配度待补充，建议标明与阅读器、Agent 或工作流的关联。";
}

export function TrendingRepos({ items }: TrendingReposProps) {
  return (
    <section className="rounded-[1.7rem] border border-border bg-surface/90 p-5 shadow-glow sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.32em] text-accent">
            热点代码仓库
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-text">
            今日仓库热榜
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-textMuted">
            不只展示热度，还直接告诉你仓库做什么、适不适合 ZERO2076 / 零零 / Agent 方向。
          </p>
        </div>
        <div className="rounded-full border border-accent/25 bg-black/20 px-4 py-2 text-xs text-[#ecd38f]">
          每日更新 · 功能说明 + 适配度
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => {
          const body = (
            <div className="rounded-[1.25rem] border border-border bg-black/20 p-4 transition hover:border-accent/30">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-textMuted">
                <span>{getSourceLabel(item.source)}</span>
                <span>{formatAbsoluteTime(item.createdAt)}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-text">{item.title}</h3>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                <div className="rounded-[1rem] border border-white/8 bg-black/25 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">核心功能</p>
                  <p className="mt-2 text-sm leading-7 text-[#ddd8ca]">{getRepoFunctionSummary(item)}</p>
                </div>
                <div className="rounded-[1rem] border border-white/8 bg-black/25 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">与系统适配度</p>
                  <p className="mt-2 text-sm leading-7 text-[#ddd8ca]">{getFitSummary(item)}</p>
                </div>
              </div>
            </div>
          );

          if (item.content) {
            return (
              <Link key={item.id} href={`/read/${item.id}`} className="block">
                {body}
              </Link>
            );
          }

          if (item.url) {
            return (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="block">
                {body}
              </a>
            );
          }

          return <div key={item.id}>{body}</div>;
        })}

        {items.length === 0 ? (
          <div className="rounded-[1.4rem] border border-dashed border-border bg-black/10 p-6 text-sm text-textMuted">
            当前还没有 trending 分类的仓库热榜。
          </div>
        ) : null}
      </div>
    </section>
  );
}
