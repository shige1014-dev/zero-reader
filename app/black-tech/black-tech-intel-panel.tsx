"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { CivilianField, ExposureLevel } from "@/lib/black-tech/data";

type Stat = {
  label: ExposureLevel;
  count: number;
};

type Props = {
  stats: Stat[];
  fields: CivilianField[];
  children: ReactNode;
};

const ALL = "全部";

export function BlackTechIntelPanel({ stats, fields, children }: Props) {
  const [levelFilter, setLevelFilter] = useState<ExposureLevel | typeof ALL>(ALL);
  const [fieldFilter, setFieldFilter] = useState<CivilianField | typeof ALL>(ALL);
  const [highlightField, setHighlightField] = useState<CivilianField | "">("");
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
      const levelOk = levelFilter === ALL || card.dataset.level === levelFilter;
      const fieldOk = fieldFilter === ALL || (card.dataset.fields ?? "").split(" ").includes(fieldFilter);
      const visible = levelOk && fieldOk;
      card.classList.toggle("is-filter-hidden", !visible);
      if (visible) nextVisible += 1;
    });

    setVisibleCount(nextVisible);
  }, [levelFilter, fieldFilter]);

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

  const resetFilters = () => {
    setLevelFilter(ALL);
    setFieldFilter(ALL);
  };

  return (
    <div className="blacktech-intel" data-highlight-field={highlightField}>
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
            <FilterButton active={levelFilter === ALL} onClick={resetFilters} label="全部" meta="ALL" />
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

          <div className="blacktech-filter-group mem-board-tabs" aria-label="按转化方向筛选">
            {fields.map((field) => (
              <FilterButton
                key={field}
                active={fieldFilter === field}
                onClick={() => setFieldFilter(field)}
                onMouseEnter={() => setHighlightField(field)}
                onMouseLeave={() => setHighlightField("")}
                label={field}
                meta="TRANSFER"
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
  onClick,
  onMouseEnter,
  onMouseLeave
}: {
  active: boolean;
  label: string;
  meta: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <button
      type="button"
      className={"mem-board-tab blacktech-filter-button" + (active ? " is-active" : "")}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="mem-board-tab-en">{meta}</span>
      <span className="mem-board-tab-zh">{label}</span>
    </button>
  );
}
