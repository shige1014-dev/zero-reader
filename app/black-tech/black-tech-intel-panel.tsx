"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { ExposureLevel } from "@/lib/black-tech/data";

type Stat = {
  label: ExposureLevel;
  count: number;
};

type Props = {
  stats: Stat[];
  children: ReactNode;
};

const ALL = "全部";

export function BlackTechIntelPanel({ stats, children }: Props) {
  const [levelFilter, setLevelFilter] = useState<ExposureLevel | typeof ALL>(ALL);
  const [visibleCount, setVisibleCount] = useState(0);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const totalCount = useMemo(
    () => stats.reduce((sum, stat) => sum + stat.count, 0),
    [stats]
  );

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-blacktech-card]"));
    let nextVisible = 0;

    cards.forEach((card) => {
      const visible = levelFilter === ALL || card.dataset.level === levelFilter;
      card.classList.toggle("is-filter-hidden", !visible);
      if (visible) nextVisible += 1;
    });

    setVisibleCount(nextVisible);
  }, [levelFilter]);

  useEffect(() => {
    const root = statsRef.current;
    if (!root) return;

    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-count-target]"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        counters.forEach((counter) => {
          const target = Number(counter.dataset.countTarget ?? "0");
          let frame = 0;
          const frames = 22;
          const tick = () => {
            frame += 1;
            counter.textContent = String(Math.round((target * frame) / frames));
            if (frame < frames) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="blacktech-intel">
      <section ref={statsRef} className="blacktech-stats" aria-label="黑科技统计">
        <article>
          <span>全部信号</span>
          <strong data-count-target={totalCount}>0</strong>
        </article>
        {stats.map((stat) => (
          <article key={stat.label} className={`blacktech-stat-${stat.label}`}>
            <span>{stat.label}</span>
            <strong data-count-target={stat.count}>0</strong>
          </article>
        ))}
        <article>
          <span>当前可见</span>
          <strong>{visibleCount || totalCount}</strong>
        </article>
      </section>

      <section className="blacktech-filter-shell" aria-label="黑科技筛选">
        <div className="blacktech-filter-body is-open">
          <div className="blacktech-filter-group mem-board-tabs" aria-label="按证据层筛选">
            <FilterButton active={levelFilter === ALL} onClick={() => setLevelFilter(ALL)} label="全部" meta="ALL" />
            {stats.map((stat) => (
              <FilterButton
                key={stat.label}
                active={levelFilter === stat.label}
                onClick={() => setLevelFilter(stat.label)}
                label={stat.label}
                meta={`${stat.count} 条`}
              />
            ))}
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}

function FilterButton({
  active,
  label,
  meta,
  onClick
}: {
  active: boolean;
  label: string;
  meta: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={"mem-board-tab blacktech-filter-button" + (active ? " is-active" : "")}
      onClick={onClick}
    >
      <span className="mem-board-tab-en">{meta}</span>
      <span className="mem-board-tab-zh">{label}</span>
    </button>
  );
}
