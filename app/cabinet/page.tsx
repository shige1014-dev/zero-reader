import type { Metadata } from "next";
import Link from "next/link";
import { CABINET_CATEGORIES, getStoriesByCategory } from "@/lib/cabinet/data";

export const metadata: Metadata = {
  title: "怪谈奇闻 · CABINET OF MARVELS",
  description: "给自己看的奇物柜：被主流不爱讲、被压抑、未解、还在追的题。"
};

export default function CabinetOverviewPage() {
  return (
    <main className="cabinet-shell">
      <header className="cabinet-hero">
        <p className="cabinet-kicker">CABINET OF MARVELS · 私人收藏柜</p>
        <h1>怪谈奇闻</h1>
        <p className="cabinet-thesis">
          这是给自己看的奇物柜。
          <br />
          收的是被主流不爱讲的、被压抑的、未解的、还在角落追的题。
          <br />
          不为科普, 不为说服, 只为不让它们彻底失踪。
        </p>
        <p className="cabinet-warning">
          ⚠ 内容多为存疑/争议素材，已尽量给出主流与异端两方说法，请自行判断。
        </p>
      </header>

      <section className="cabinet-grid" aria-label="6 大类别">
        {CABINET_CATEGORIES.map((cat, idx) => {
          const stories = getStoriesByCategory(cat.id);
          return (
            <Link
              key={cat.id}
              href={`/cabinet/category/${cat.id}` as Parameters<typeof Link>[0]["href"]}
              className="cabinet-tile"
            >
              <span className="cabinet-tile-num">No. {String(idx + 1).padStart(2, "0")}</span>
              <span className="cabinet-tile-en">{cat.en}</span>
              <span className="cabinet-tile-zh">{cat.label}</span>
              <span className="cabinet-tile-intro">{cat.intro}</span>
              <span className="cabinet-tile-count">{stories.length} 篇档案 →</span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
