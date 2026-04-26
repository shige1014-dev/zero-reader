"use client";

import { useEffect, useState } from "react";

import type { IntelViewModel, IntelVerdict, IntelMetric } from "@/lib/intel-presenter";
import styles from "@/components/intel-terminal.module.css";

function formatStamp(date: Date): string {
  const fmt = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric", month: "2-digit", day: "2-digit",
    weekday: "short",
    hour: "2-digit", minute: "2-digit", hour12: false,
    timeZone: "UTC"
  }).format(date);
  return `${fmt.replace(/\//g, ".")} UTC`;
}

function marketStatus(date: Date): string {
  const day = date.getUTCDay();
  if (day === 0 || day === 6) return "美股周末休市";
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  const open = 13 * 60 + 30;
  const close = 20 * 60;
  if (minutes >= open && minutes < close) return "美股开盘中";
  return "美股已收盘";
}

type IntelTerminalProps = {
  view: IntelViewModel;
};

function statusClass(verdict: IntelVerdict): string {
  if (verdict === "CRITICAL") {
    return styles.tagCritical;
  }
  if (verdict === "WARNING") {
    return styles.tagWarning;
  }
  return styles.tagRoutine;
}

function pillClass(verdict: IntelVerdict): string {
  if (verdict === "CRITICAL") {
    return `${styles.pill} ${styles.pillCritical}`;
  }
  if (verdict === "ROUTINE") {
    return `${styles.pill} ${styles.pillRoutine}`;
  }
  return styles.pill;
}

function toneClasses(metric: IntelMetric): { dot: string } {
  if (metric.tone === "red") return { dot: styles.toneRed };
  if (metric.tone === "amber") return { dot: styles.toneAmber };
  return { dot: styles.toneCyan };
}

export function IntelTerminal({ view }: IntelTerminalProps) {
  const [screen, setScreen] = useState<"desk" | "flow">("desk");
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const stamp = now ? `${formatStamp(now)} · ${marketStatus(now)}` : "—";
  const topicChips: Array<{ label: string; count: string; active: boolean }> = [
    { label: "全部", count: String(view.flow.totalCount), active: true },
    ...view.flow.topicChips.map((c) => ({ label: c.label, count: String(c.count), active: false }))
  ];

  return (
    <div data-intel-root className={styles.root}>
      <style jsx global>{`
        body:has([data-intel-root]) > div > header {
          display: none;
        }
        body:has([data-intel-root]) > div {
          max-width: none;
          padding: 0;
          margin: 0;
        }
        body:has([data-intel-root]) {
          background: #0a0d12;
        }
      `}</style>
      <div className={styles.pageWrap}>
        <div className={styles.shell}>
          <div className={styles.nav}>
            <div className={styles.brand}>
              <div className={styles.brandMark} />
              <div className={`${styles.brandName} ${styles.mono}`}>
                信号台
                <span className={styles.brandNameMuted}>v0.4 · 个人版</span>
              </div>
            </div>
            <div className={styles.navMid}>
              <div className={`${styles.stamp} ${styles.mono}`}>
                <span className={styles.stampDot}>●</span>
                {stamp}
              </div>
              <div className={`${styles.search} ${styles.mono}`}>
                <span>搜索定义、标的、OBI…</span>
                <span>⌘K</span>
              </div>
            </div>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${screen === "desk" ? styles.tabActive : ""} ${styles.mono}`} onClick={() => setScreen("desk")}>
                决策台
              </button>
              <button className={`${styles.tab} ${screen === "flow" ? styles.tabActive : ""} ${styles.mono}`} onClick={() => setScreen("flow")}>
                新闻流
              </button>
              <button className={`${styles.ghostTab} ${styles.mono}`}>主题图谱</button>
              <button className={`${styles.ghostTab} ${styles.mono}`}>周刊</button>
              <button className={`${styles.ghostTab} ${styles.mono}`}>OBI</button>
            </div>
          </div>

          {screen === "flow" ? (
            <>
              <div className={styles.filters}>
                <div className={styles.chips}>
                  {topicChips.map(({ label, count, active }) => (
                    <div key={label} className={`${styles.chip} ${active ? styles.chipActive : ""} ${styles.mono}`}>
                      {label}
                      <span className={styles.chipCount}>{count}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.controls}>
                  <div className={`${styles.control} ${styles.mono}`}>信号 ≥ <span className={styles.controlValue}>6.5</span></div>
                  <div className={styles.separator} />
                  <div className={`${styles.control} ${styles.mono}`}>窗口 <span className={styles.controlValue}>72小时</span></div>
                  <div className={styles.separator} />
                  <div className={`${styles.control} ${styles.mono}`}>排序 <span className={styles.controlValue}>按定义</span> <span className={styles.controlAccent}>↓</span></div>
                  <div className={styles.separator} />
                  <div className={`${styles.toggle} ${styles.mono}`}>
                    <div className={`${styles.toggleItem} ${styles.toggleActive}`}>详细</div>
                    <div className={styles.toggleItem}>紧凑</div>
                  </div>
                </div>
              </div>

              <div className={`${styles.feedMeta} ${styles.mono}`}>
                <span className={styles.live}>实时流</span>
                <span>显示 <b className={styles.feedMetaStrong}>{view.flow.cards.length}</b> / <b className={styles.feedMetaStrong}>{view.flow.totalCount}</b></span>
                <span style={{ marginLeft: "auto", color: "var(--t4)" }}>{view.flow.refreshedLabel}</span>
              </div>

              <div className={styles.body}>
                <div className={styles.flowGrid}>
                  {view.flow.cards.map((card) => (
                    <article className={styles.flowCard} key={card.id}>
                      <div className={styles.flowTop}>
                        <div className={styles.flowTags}>
                          <span className={`${styles.flowTag} ${styles.flowSignal} ${styles.mono}`}>信号 {card.signal}</span>
                          <span className={`${styles.flowTag} ${statusClass(card.verdict)} ${styles.mono}`}>{card.verdict}</span>
                          <span className={`${styles.flowTag} ${styles.flowTopic} ${styles.mono}`}>{card.topic}</span>
                        </div>
                        <div className={`${styles.flowActions} ${styles.mono}`}>
                          <span className={styles.obi}>{card.toObi ? "→ OBI" : "— OBI"}</span>
                          <span>置顶</span>
                        </div>
                      </div>
                      <div className={`${styles.flowMeta} ${styles.mono}`}>
                        <span>{card.timestamp}</span>
                        <span>·</span>
                        <span>{card.sourceLabel}</span>
                        <span>·</span>
                        <span>{card.tier}</span>
                        <span>·</span>
                        <span className={styles.cluster}>{card.clusterLabel}</span>
                      </div>
                      <div className={styles.flowBody}>
                        <p className={styles.flowTitle}>{card.title}</p>
                        <p className={styles.flowSummary}>{card.summary}</p>
                        <div className={styles.flowChips}>
                          {card.chips.map((chip) => (
                            <span className={`${styles.flowChip} ${styles.mono}`} key={chip}>
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.body}>
              <div className={styles.deskGrid}>
                <div>
                  <article className={styles.verdictCard}>
                    <div className={styles.verdictMeta}>
                      <div className={styles.verdictMetaLeft}>
                        <span className={`${pillClass(view.desk.verdict)} ${styles.mono}`}>{view.desk.verdict}</span>
                        <span className={`${styles.verdictLabel} ${styles.mono}`}>裁决</span>
                      </div>
                      <div className={`${styles.verdictMetaRight} ${styles.mono}`}>新增 {view.flow.totalCount} 条信号</div>
                    </div>
                    <div className={styles.verdictBody}>
                      <p className={styles.verdictText}>{view.desk.verdictText}</p>
                      <p className={`${styles.verdictLine} ${styles.mono}`}>{view.desk.verdictLine}</p>
                      <div className={styles.verdictFoot}>
                        <div className={styles.verdictCell}>
                          <div className={`${styles.verdictKey} ${styles.mono}`}>阶段</div>
                          <div className={`${styles.verdictValue} ${styles.mono}`}>{view.desk.regime}</div>
                        </div>
                      </div>
                    </div>
                  </article>

                  <section style={{ marginTop: 14 }}>
                    <p className={`${styles.sectionHead} ${styles.mono}`}>
                      今日机会 — {view.desk.opportunities.length} / 3
                      <span className={styles.sectionHeadMuted}>筛选 ≥ 6.5</span>
                    </p>
                    <div className={styles.opportunityGrid}>
                      {view.desk.opportunities.map((opportunity) => (
                        <article className={styles.opportunityCard} key={opportunity.id}>
                          <div className={styles.opportunityTop}>
                            <span className={`${styles.opportunityId} ${styles.mono}`}>{opportunity.id}</span>
                            <span className={`${styles.statusDot} ${opportunity.status === "PENDING" ? styles.statusPending : ""} ${styles.mono}`}>
                              {opportunity.statusLabel}
                            </span>
                          </div>
                          <div className={styles.opportunityBody}>
                            <p className={styles.opportunityHeadline}>{opportunity.headline}</p>
                            <div className={styles.oppRow}>
                              <div className={`${styles.oppKey} ${styles.mono}`}>标的</div>
                              <div className={`${styles.oppValue} ${styles.mono}`}>{opportunity.targets.join(" · ")}</div>
                            </div>
                            <div className={styles.oppRow}>
                              <div className={`${styles.oppKey} ${styles.mono}`}>尺度</div>
                              <div className={`${styles.oppValue} ${styles.mono}`}>{opportunity.scale}</div>
                            </div>
                            <div className={styles.oppRow}>
                              <div className={`${styles.oppKey} ${styles.mono}`}>状态</div>
                              <div className={`${styles.oppValue} ${opportunity.status === "PENDING" ? styles.oppStatePending : styles.oppStateActive} ${styles.mono}`}>{opportunity.state}</div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section style={{ marginTop: 14 }}>
                    <p className={`${styles.sectionHead} ${styles.mono}`}>
                      证据层 — {view.desk.evidence.length} 条支撑信号
                      <span className={styles.sectionHeadMuted}>查看全部 · {view.flow.totalCount}</span>
                    </p>
                    <div className={styles.evidenceBox}>
                      {view.desk.evidence.map((row) => (
                        <div className={styles.evidenceRow} key={row.id}>
                          <div className={`${styles.evidenceTime} ${styles.mono}`}>{row.time}</div>
                          <div className={styles.evidenceTitle}>
                            {row.title}
                            <span className={`${styles.evidenceMeta} ${styles.mono}`}>{row.meta}</span>
                          </div>
                          <div className={`${styles.evidenceSignal} ${styles.mono}`}>信号 {row.signal}</div>
                          <div className={`${styles.verdictTag} ${statusClass(row.verdict)} ${styles.mono}`}>{row.verdict}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div>
                  <p className={`${styles.sectionHead} ${styles.mono}`}>
                    风险条 — 5 个指标
                    <span className={styles.sectionHeadMuted}>实时</span>
                  </p>
                  <div className={styles.riskCard}>
                    <div className={styles.riskGrid}>
                      {view.desk.riskMetrics.map((metric) => {
                        const tone = toneClasses(metric);
                        return (
                          <div className={styles.riskCell} key={metric.label}>
                            <div className={`${styles.riskName} ${styles.mono}`}>
                              {metric.label}
                              <span className={`${styles.riskDot} ${tone.dot}`} />
                            </div>
                            <div className={`${styles.riskValue} ${styles.mono}`}>{metric.value}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={`${styles.footer} ${styles.mono}`}>
            <div className={styles.footerLeft}>
              <span className={styles.systemOk}>● 系统正常</span>
              <span>{view.flow.refreshedLabel}</span>
            </div>
            <div className={styles.footerRight}>
              <span><kbd>⌘K</kbd>搜索</span>
              <span><kbd>G</kbd>{screen === "desk" ? "D 决策台" : "F 新闻流"}</span>
              <span><kbd>?</kbd>帮助</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
