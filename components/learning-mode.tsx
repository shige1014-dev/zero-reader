"use client";

import { useMemo } from "react";

import { buildLearningTailSummary, type LearningCourse } from "@/lib/learning-curriculum";
import type { Briefing } from "@/lib/feed-types";
import { getRiskCopy } from "@/lib/format";
import type { LearningCard } from "@/lib/learning-library";

interface LearningModeProps {
  courses: LearningCourse[];
  briefing: Briefing | null;
  economicsCards: LearningCard[];
  figureCards: LearningCard[];
}

function courseTone(index: number): string {
  return ["via-accent/18", "via-cyan-200/14", "via-slate-200/10"][index] ?? "via-accent/14";
}

function courseMarker(index: number): string {
  return ["bg-accent", "bg-cyan-200", "bg-slate-300"][index] ?? "bg-textMuted";
}

function methodText(course: LearningCourse): string {
  return course.scientificMethod.join(" -> ");
}

function metricValue(value: number | null | undefined, digits = 1): string {
  if (typeof value !== "number") {
    return "--";
  }
  return value.toFixed(digits);
}

export function LearningMode({ courses, briefing, economicsCards, figureCards }: LearningModeProps) {
  const dailyFocus = useMemo(() => courses.flatMap((course) => course.units.slice(0, 1)), [courses]);
  const tailSummary = useMemo(() => buildLearningTailSummary(courses), [courses]);

  return (
    <div className="space-y-4 sm:space-y-8">
      <section className="silk-frame relative overflow-hidden rounded-[1.25rem] bg-[rgba(8,13,18,0.86)] shadow-halo sm:rounded-[1.5rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_-20%,rgba(214,185,119,0.16),transparent_42%),radial-gradient(circle_at_-10%_120%,rgba(112,141,170,0.10),transparent_38%)]" />
        <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="p-5 sm:p-9">
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent sm:text-[11px] sm:tracking-[0.32em]">ZERO2076 / LEARNING MODE</p>
            <h1 className="mt-3 max-w-3xl font-display text-[2.15rem] leading-[1.02] text-text sm:mt-4 sm:text-[3.4rem] sm:leading-[1.05]">
              长期学习台
            </h1>
            <p className="mt-4 max-w-2xl text-[13px] leading-7 text-textMuted sm:mt-5 sm:text-sm sm:leading-8">
              情报中心负责接收和筛选外部变化，这里只做三件事：建立模型、训练判断、沉淀长期课程。
            </p>
          </div>
          <div className="bg-[rgba(214,185,119,0.03)] p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="silk-soft rounded-xl bg-black/32 p-3 sm:p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-textMuted">VIX</p>
                <p className="mt-1.5 font-display text-xl text-text sm:mt-2 sm:text-2xl">{metricValue(briefing?.vix)}</p>
              </div>
              <div className="silk-soft rounded-xl bg-black/32 p-3 sm:p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-textMuted">恐贪</p>
                <p className="mt-1.5 font-display text-xl text-text sm:mt-2 sm:text-2xl">{metricValue(briefing?.fearGreed, 0)}</p>
              </div>
              <div className="silk-soft rounded-xl bg-black/32 p-3 sm:p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-textMuted">TNX</p>
                <p className="mt-1.5 font-display text-xl text-text sm:mt-2 sm:text-2xl">{metricValue(briefing?.tnx, 2)}</p>
              </div>
            </div>
            <div className="silk-soft mt-3 rounded-xl bg-[rgba(214,185,119,0.06)] px-3.5 py-3 sm:mt-4 sm:px-4">
              <p className="text-[11px] leading-5 text-[#e1cda1] sm:text-xs sm:leading-6">
                {briefing ? getRiskCopy(briefing.riskLevel) : "等待情报中心写入最新环境状态。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {dailyFocus.map((unit) => (
          <div className="silk-soft relative overflow-hidden rounded-[1.15rem] bg-[rgba(9,14,20,0.78)] p-4 transition hover:bg-[rgba(11,16,22,0.92)] sm:rounded-2xl sm:p-5" key={unit.concept}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">TODAY</p>
            <h2 className="mt-2.5 text-base font-semibold leading-6 text-text sm:mt-3 sm:text-lg">{unit.concept}</h2>
            <p className="mt-2 text-[13px] leading-6 text-textMuted sm:text-sm sm:leading-7">{unit.practice}</p>
          </div>
        ))}
      </section>

      <section className="space-y-5 sm:space-y-6">
        {courses.map((course, index) => {
          return (
            <article
              className="silk-soft relative overflow-hidden grid gap-4 rounded-[1.2rem] bg-[rgba(8,13,18,0.82)] p-4 shadow-halo sm:gap-5 sm:rounded-[1.5rem] sm:p-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]"
              key={course.id}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${courseTone(index)} to-transparent`} />
              <div className="silk-soft relative flex flex-col justify-between rounded-[1.05rem] bg-black/20 p-4 sm:rounded-2xl sm:p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${courseMarker(index)}`} />
                    <p className="font-display text-[10px] uppercase tracking-[0.18em] text-accent sm:text-[11px] sm:tracking-[0.22em]">{course.cadence}</p>
                  </div>
                  <h2 className="mt-3 font-display text-[1.7rem] leading-none text-text sm:mt-4 sm:text-3xl">{course.title}</h2>
                  <p className="mt-2.5 text-[13px] leading-6 text-textMuted sm:mt-3 sm:text-sm sm:leading-7">{course.subtitle}</p>
                </div>

                <div className="mt-4 pt-2 sm:mt-5 sm:pt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">METHOD</p>
                  <p className="mt-2 text-[13px] leading-6 text-[#ddd8ca] sm:text-sm sm:leading-7">{methodText(course)}</p>
                </div>

                <div className="mt-4 pt-2 sm:mt-5 sm:pt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">TODAY OUTPUT</p>
                  <p className="mt-2 text-[13px] leading-6 text-[#ddd8ca] sm:text-sm sm:leading-7">
                    写一条 3 句笔记：定义、判断变量、现实例子。今天不做图，不合成，只沉淀清单。
                  </p>
                </div>
              </div>

              <div className="relative grid gap-3 sm:grid-cols-2">
                {course.units.map((unit, unitIndex) => (
                  <div className="silk-soft rounded-[1.05rem] bg-[rgba(5,8,11,0.55)] p-4 transition hover:bg-[rgba(8,13,18,0.7)] sm:rounded-2xl sm:p-5" key={unit.concept}>
                    <div className="flex items-start gap-3 sm:block">
                      <span className="inline-flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-accentSoft font-mono text-[10px] text-accent sm:mb-3 sm:h-6 sm:w-6 sm:text-[11px]">
                        {unitIndex + 1}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-semibold leading-6 text-text sm:text-base">{unit.concept}</h3>
                        <p className="mt-1.5 text-[13px] leading-6 text-[#d7d3c7] sm:mt-2 sm:text-sm">{unit.question}</p>
                      </div>
                    </div>
                    <div className="mt-3.5 space-y-3 pt-2 sm:mt-4 sm:pt-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">定义</p>
                        <p className="mt-1 text-[13px] leading-6 text-[#d9d6ce] sm:text-sm sm:leading-7">{unit.definition}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">机制</p>
                        <p className="mt-1 text-[13px] leading-6 text-textMuted sm:text-sm sm:leading-7">{unit.mechanism}</p>
                      </div>
                      <div className="grid gap-3 min-[520px]:grid-cols-2">
                        <div className="rounded-lg bg-[rgba(255,255,255,0.02)] p-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d6b977]">例子</p>
                          <p className="mt-1 text-[13px] leading-6 text-[#d7d3c7] sm:text-sm">{unit.example}</p>
                        </div>
                        <div className="rounded-lg bg-[rgba(255,255,255,0.02)] p-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d6b977]">误区</p>
                          <p className="mt-1 text-[13px] leading-6 text-[#d7d3c7] sm:text-sm">{unit.misconception}</p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-[rgba(214,185,119,0.08)] p-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">练习 / 复盘</p>
                        <p className="mt-1 text-[13px] leading-6 text-[#dfcfaa] sm:text-sm">{unit.practice}</p>
                        <p className="mt-2 text-[13px] leading-6 text-textMuted sm:text-sm">{unit.reviewPrompt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="space-y-4 sm:space-y-5">
        <article className="silk-frame relative overflow-hidden rounded-[1.2rem] bg-[rgba(8,13,18,0.82)] p-4 shadow-halo sm:rounded-[1.5rem] sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/24 to-transparent" />
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.22em] text-accent sm:text-[11px]">FRONTIER PAPERS</p>
            <h2 className="mt-2 font-display text-2xl leading-none text-text sm:text-[2.1rem]">前沿论文</h2>
            <p className="mt-3 text-[14px] leading-7 text-textMuted sm:text-[15px] sm:leading-8">
              用免费模型先做清洗、归类、摘要和学习建议，再把真正值得读的论文留下来。
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {tailSummary.frontierPapers.map((paper) => (
              <div className="silk-soft rounded-[1rem] bg-[rgba(5,8,11,0.48)] p-5 sm:p-6" key={paper.title}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{paper.source}</span>
                  <span className="text-[11px] text-textMuted">{paper.year}</span>
                  <span className="rounded-full bg-[rgba(120,199,255,0.08)] px-2 py-1 text-[10px] text-cyan-100">{paper.difficulty}</span>
                  {paper.tags.map((tag) => (
                    <span className="rounded-full bg-[rgba(214,185,119,0.08)] px-2 py-1 text-[10px] text-[#e1cda1]" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-[17px] font-semibold leading-7 text-text sm:text-[1.08rem]">{paper.title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-[#d7d3c7] sm:text-[15px]">{paper.summary}</p>
                <div className="mt-3 rounded-xl bg-[rgba(120,199,255,0.05)] px-3 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-100">免费模型整理</p>
                  <p className="mt-2 text-[14px] leading-7 text-[#d8e8ee] sm:text-[15px]">{paper.modelDigest}</p>
                </div>
                <p className="mt-3 text-[14px] leading-7 text-[#dfcfaa] sm:text-[15px]">{paper.reasonToRead}</p>
                <p className="mt-3 text-[14px] leading-7 text-textMuted sm:text-[15px]">{paper.studyPrompt}</p>
                <div className="mt-4">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[rgba(214,185,119,0.08)] px-3 py-2 text-[12px] font-medium text-[#f1ddb0] transition hover:bg-[rgba(214,185,119,0.14)] hover:text-[#fff1c8]"
                  >
                    查看原文
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="silk-frame relative overflow-hidden rounded-[1.2rem] bg-[rgba(8,13,18,0.82)] p-4 shadow-halo sm:rounded-[1.5rem] sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/24 to-transparent" />
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-accent sm:text-[11px]">LOCAL CARD LIBRARY</p>
              <h2 className="mt-2 font-display text-2xl leading-none text-text sm:text-[2.1rem]">经济学知识卡片</h2>
              <p className="mt-3 text-[14px] leading-7 text-textMuted sm:text-[15px] sm:leading-8">
                本地 Markdown 卡片库，后面可以继续用免费模型批量补人物、概念、制度、周期和产业卡片。
              </p>

              <div className="mt-4 grid gap-3">
                {economicsCards.map((card) => (
                  <div className="silk-soft rounded-[1rem] bg-[rgba(5,8,11,0.48)] p-4" key={card.slug}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{card.discipline}</span>
                      {card.tags.map((tag) => (
                        <span className="rounded-full bg-[rgba(214,185,119,0.08)] px-2 py-1 text-[10px] text-[#e1cda1]" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2 text-[17px] font-semibold leading-7 text-text sm:text-[1.05rem]">{card.title}</h3>
                    <p className="mt-2 text-[14px] leading-7 text-[#d7d3c7] sm:text-[15px]">{card.summary}</p>
                    <p className="mt-2 text-[14px] leading-7 text-[#dfcfaa] sm:text-[15px]">{card.whyItMatters}</p>
                    <p className="mt-2 text-[14px] leading-7 text-textMuted sm:text-[15px]">{card.studyPrompt}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-accent sm:text-[11px]">ECONOMIC FIGURES</p>
              <h2 className="mt-2 font-display text-2xl leading-none text-text sm:text-[2.1rem]">人物集</h2>
              <p className="mt-3 text-[14px] leading-7 text-textMuted sm:text-[15px] sm:leading-8">
                人物卡不只是传记入口，而是把思想流派、判断框架和现实应用压缩成可复用的学习节点。
              </p>

              <div className="mt-4 grid gap-3">
                {figureCards.map((card) => (
                  <div className="silk-soft rounded-[1rem] bg-[rgba(5,8,11,0.48)] p-4" key={card.slug}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{card.discipline}</span>
                      {card.tags.map((tag) => (
                        <span className="rounded-full bg-[rgba(120,199,255,0.08)] px-2 py-1 text-[10px] text-cyan-100" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2 text-[17px] font-semibold leading-7 text-text sm:text-[1.05rem]">{card.title}</h3>
                    <p className="mt-2 text-[14px] leading-7 text-[#d7d3c7] sm:text-[15px]">{card.summary}</p>
                    {card.works.length > 0 ? (
                      <div className="mt-3 rounded-xl bg-[rgba(120,199,255,0.05)] px-3 py-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-100">代表著作 / 核心内容</p>
                        <div className="mt-2 space-y-2.5">
                          {card.works.map((work) => (
                            <div key={`${card.slug}-${work.title}`}>
                              <p className="text-[13px] font-semibold leading-6 text-[#dceff7] sm:text-[14px]">{work.title}</p>
                              <p className="mt-1 text-[13px] leading-6 text-[#c9dbe2] sm:text-[14px]">{work.coreIdea}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <p className="mt-2 text-[14px] leading-7 text-[#dfcfaa] sm:text-[15px]">{card.whyItMatters}</p>
                    <p className="mt-2 text-[14px] leading-7 text-textMuted sm:text-[15px]">{card.studyPrompt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="silk-frame relative overflow-hidden rounded-[1.2rem] bg-[rgba(8,13,18,0.82)] p-4 shadow-halo sm:rounded-[1.5rem] sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.22em] text-accent sm:text-[11px]">ZERO SUMMARY</p>
            <h2 className="mt-2 font-display text-2xl leading-none text-text sm:text-[2.1rem]">零零总结</h2>
            <p className="mt-3 text-[14px] leading-7 text-[#ddd8ca] sm:text-[15px] sm:leading-8">{tailSummary.zeroSummary}</p>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {tailSummary.deepDives.map((item) => (
              <div className="silk-soft rounded-[1rem] bg-[rgba(5,8,11,0.48)] p-4" key={item.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">学习方向深入推荐</p>
                <h3 className="mt-2 text-[17px] font-semibold leading-7 text-text sm:text-[1.05rem]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-[#d7d3c7] sm:text-[15px]">{item.whyItMatters}</p>
                <p className="mt-2 text-[14px] leading-7 text-textMuted sm:text-[15px]">{item.suggestedPath}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
