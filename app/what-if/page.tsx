import type { Metadata } from "next";
import Link from "next/link";
import { WHAT_IF_STORIES } from "@/lib/what-if/data";

export const metadata: Metadata = {
  title: "假如系列 · WHAT IF 2076",
  description: "用一个假设触发一篇短篇科幻——把抽象判断变成可观察的画面。"
};

export default function WhatIfIndexPage() {
  const stories = WHAT_IF_STORIES.filter((s) => s.status === "published");
  return (
    <main className="wif-shell">
      <header className="wif-hero">
        <div className="wif-hero-frame">
          <p className="wif-kicker">WHAT IF · 假如系列</p>
          <h1>用一个假设<br />触发一篇短篇科幻</h1>
          <p className="wif-thesis">
            不是预测，是想象。<br />
            把抽象判断变成可观察的画面。<br />
            一篇假设, 一个未来切片。
          </p>
        </div>
        <div className="wif-hero-counter">
          <span className="wif-counter-num">{String(stories.length).padStart(3, "0")}</span>
          <span className="wif-counter-label">篇 · 持续扩张</span>
        </div>
      </header>

      <section className="wif-grid" aria-label="假如系列书架">
        {stories.map((story, idx) => (
          <Link
            key={story.id}
            href={`/what-if/${story.id}` as Parameters<typeof Link>[0]["href"]}
            className="wif-card"
            aria-label={story.title}
          >
            <div className="wif-card-spine">
              <span className="wif-card-num">No. {String(idx + 1).padStart(2, "0")}</span>
              <span className="wif-card-time">{story.readingMinutes} 分钟</span>
            </div>
            <h2 className="wif-card-title">{story.title}</h2>
            <p className="wif-card-hook">{story.hook}</p>
            <div className="wif-card-meta">
              <span className="wif-card-era">{story.era}</span>
              <span className="wif-card-pov">{story.pov}</span>
            </div>
            <span className="wif-card-cta">展开阅读 →</span>
          </Link>
        ))}
      </section>

      <footer className="wif-footnote">
        <p>每一篇都是一次思想实验, 不构成预测。<br />读完之后, 想想: 如果这是真的, 你的明天会怎样?</p>
      </footer>
    </main>
  );
}
