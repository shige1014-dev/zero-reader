"use client";
import { useState } from "react";
import { STOCK_CATEGORIES, STOCK_LEARNING_CANDIDATES } from "@/lib/stock-learning/data";

export default function StockLearnNav() {
  const [showAll, setShowAll] = useState(false);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="sl-nav-sticky" aria-label="股票快跳导航">
      <div className="sl-nav-row sl-nav-row-cat">
        <span className="sl-nav-label">板块</span>
        {STOCK_CATEGORIES.map((c) => {
          const count = STOCK_LEARNING_CANDIDATES.filter((s) => s.category === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              className="sl-nav-chip sl-nav-cat"
              onClick={() => jump(`cat-${c.id}`)}
            >
              {c.label} <span className="sl-nav-count">{count}</span>
            </button>
          );
        })}
        <button
          type="button"
          className="sl-nav-toggle"
          onClick={() => setShowAll(!showAll)}
          aria-expanded={showAll}
        >
          {showAll ? "▴ 收起" : "▾ 全部 44 ticker"}
        </button>
      </div>
      {showAll && (
        <div className="sl-nav-row sl-nav-row-tk">
          <span className="sl-nav-label">代码</span>
          {STOCK_LEARNING_CANDIDATES.map((s) => (
            <button
              key={s.ticker}
              type="button"
              className={`sl-nav-chip sl-nav-tk sl-nav-tk-${s.rating.toLowerCase()}`}
              onClick={() => jump(`tk-${s.ticker}`)}
              title={s.nameZh}
            >
              {s.ticker}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
