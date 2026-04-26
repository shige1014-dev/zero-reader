import { getCategoryLabel, getSourceLabel } from "@/lib/format";
import type { Briefing, FeedEntry, FeedPriority } from "@/lib/feed-types";
import type { SitianSnapshot } from "@/lib/sitian-report";

export type IntelVerdict = "ROUTINE" | "WARNING" | "CRITICAL";

export interface IntelMetric {
  label: string;
  value: string;
  tone: "red" | "amber" | "cyan";
}

export interface IntelOpportunity {
  id: string;
  headline: string;
  targets: string[];
  scale: string;
  state: string;
  status: "ACTIVE" | "PENDING" | "FILED";
  statusLabel: string;
}

export interface IntelEvidenceRow {
  id: string;
  time: string;
  title: string;
  meta: string;
  signal: string;
  verdict: IntelVerdict;
}

export interface IntelDeskView {
  verdict: IntelVerdict;
  verdictLine: string;
  verdictText: string;
  regime: string;
  riskMetrics: IntelMetric[];
  opportunities: IntelOpportunity[];
  evidence: IntelEvidenceRow[];
}

export interface IntelFlowCard {
  id: string;
  signal: string;
  verdict: IntelVerdict;
  topic: string;
  title: string;
  summary: string;
  chips: string[];
  timestamp: string;
  sourceLabel: string;
  tier: string;
  clusterLabel: string;
  toObi: boolean;
}

export interface IntelTopicChip {
  label: string;
  count: number;
}

export interface IntelFlowView {
  cards: IntelFlowCard[];
  totalCount: number;
  staleCount: number;
  refreshedLabel: string;
  topicChips: IntelTopicChip[];
}

export interface IntelViewModel {
  desk: IntelDeskView;
  flow: IntelFlowView;
}

export interface BuildIntelOptions {
  now?: Date;
  maxAgeHours?: number;
}

function filterFresh(
  items: FeedEntry[],
  nowMs: number,
  maxAgeHours: number
): { fresh: FeedEntry[]; staleCount: number } {
  if (!Number.isFinite(maxAgeHours)) {
    return { fresh: items, staleCount: 0 };
  }
  const maxAgeMs = maxAgeHours * 3_600_000;
  const fresh: FeedEntry[] = [];
  let staleCount = 0;
  for (const item of items) {
    const created = new Date(item.createdAt).getTime();
    if (Number.isNaN(created) || nowMs - created > maxAgeMs) {
      staleCount += 1;
      continue;
    }
    fresh.push(item);
  }
  return { fresh, staleCount };
}

function normalizeTitle(title: string): string {
  return title.trim().toLowerCase();
}

function toVerdict(briefing: Briefing | null): IntelVerdict {
  if (!briefing) {
    return "ROUTINE";
  }

  const vix = briefing.vix ?? 0;
  const tnx = briefing.tnx ?? 0;
  const fearGreed = briefing.fearGreed ?? 50;

  if (briefing.riskLevel === "FLASH" || vix >= 25 || tnx >= 4.7 || fearGreed <= 20) {
    return "CRITICAL";
  }

  if (vix >= 20 || tnx >= 4.5 || fearGreed <= 25) {
    return "WARNING";
  }

  return "ROUTINE";
}

function verdictLine(verdict: IntelVerdict): string {
  if (verdict === "CRITICAL") {
    return "先降风险，禁新增暴露";
  }
  if (verdict === "WARNING") {
    return "只验证，不进攻";
  }
  return "先看赔率，再做动作";
}

function verdictText(verdict: IntelVerdict): string {
  if (verdict === "CRITICAL") {
    return "宏观冲击正在主导定价。先缩短反应时间、压缩新增风险，再去寻找机会。";
  }
  if (verdict === "WARNING") {
    return "流动性窗口正在收窄。在重定价路径更清晰之前，暂停新增仓位。";
  }
  return "风险仍在可控区间。继续按定义优先扫描，只在机会结构明确时升级动作。";
}

function metric(value: number | null | undefined, digits: number, suffix = ""): string {
  if (typeof value !== "number") {
    return "--";
  }
  return `${value.toFixed(digits)}${suffix}`;
}

function summarizeRegime(briefing: Briefing | null): string {
  if (!briefing) {
    return "等待数据";
  }
  if ((briefing.vix ?? 0) >= 25) {
    return "压力切换";
  }
  if ((briefing.fearGreed ?? 50) <= 25) {
    return "风险厌恶";
  }
  return "后周期收紧";
}

function sortByNewest(left: FeedEntry, right: FeedEntry): number {
  return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
}

function dedupeFeed(feedItems: FeedEntry[]): Array<{ item: FeedEntry; count: number }> {
  const sorted = [...feedItems].sort(sortByNewest);
  const counts = new Map<string, number>();
  const latest = new Map<string, FeedEntry>();

  for (const item of sorted) {
    const key = normalizeTitle(item.title);
    counts.set(key, (counts.get(key) ?? 0) + 1);
    if (!latest.has(key)) {
      latest.set(key, item);
    }
  }

  return [...latest.entries()]
    .map(([key, item]) => ({ item, count: counts.get(key) ?? 1 }))
    .sort((left, right) => sortByNewest(left.item, right.item));
}

function signalScore(item: FeedEntry): number {
  const base = item.priority === "FLASH" ? 9.1 : item.priority === "PRIORITY" ? 7.6 : 6.8;
  const confidence = item.confidence ? Math.min(item.confidence, 0.99) : 0.7;
  return Number((base + (confidence - 0.7) * 2).toFixed(1));
}

function opportunityStatus(state: string): "ACTIVE" | "PENDING" | "FILED" {
  const lowered = state.toLowerCase();
  if (lowered.includes("written") || lowered.includes("filed") || state.includes("已写入") || state.includes("已归档")) {
    return "FILED";
  }
  if (lowered.includes("await") || state.includes("等待")) {
    return "PENDING";
  }
  return "ACTIVE";
}

function opportunityStatusLabel(status: "ACTIVE" | "PENDING" | "FILED"): string {
  if (status === "PENDING") {
    return "待验证";
  }
  if (status === "FILED") {
    return "已归档";
  }
  return "进行中";
}

function findOppTag(tags: string[]): string | null {
  const found = tags.find((t) => t.toLowerCase().startsWith("opp:"));
  return found ? found.slice(4) : null;
}

function findScaleTag(tags: string[]): string | null {
  const found = tags.find((t) => t.toLowerCase().startsWith("scale:"));
  return found ? found.slice(6) : null;
}

function buildOpportunities(feedItems: FeedEntry[], sitian?: SitianSnapshot | null): IntelOpportunity[] {
  const seen = new Set<string>();
  const opportunities: IntelOpportunity[] = [];

  for (const item of feedItems) {
    const oppId = findOppTag(item.tags);
    if (!oppId || !oppId.startsWith("OPP-")) continue;
    if (seen.has(oppId)) continue;
    seen.add(oppId);
    const state = oppId === "OPP-02" ? "等待二次确认" : oppId === "OPP-03" ? "已写入 OBI" : "已加入观察池";
    const status = opportunityStatus(state);
    opportunities.push({
      id: oppId,
      headline: item.title,
      targets: item.tags.filter((t) => !t.includes(":")).slice(0, 4),
      scale: findScaleTag(item.tags) ?? "—",
      state,
      status,
      statusLabel: opportunityStatusLabel(status)
    });
    if (opportunities.length === 3) break;
  }

  if (opportunities.length < 3 && sitian?.stockWatch.dailyMain?.length) {
    for (const item of sitian.stockWatch.dailyMain) {
      const id = `观察-${item.symbol}`;
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);
      opportunities.push({
        id,
        headline: `${item.symbol} · ${item.thesis}`,
        targets: [item.symbol],
        scale: "观察",
        state: `${item.label} · ${typeof item.change1dPct === "number" ? `${item.change1dPct > 0 ? "+" : ""}${item.change1dPct.toFixed(2)}%` : "等待报价"}`,
        status: "ACTIVE",
        statusLabel: "观察中"
      });
      if (opportunities.length === 3) {
        break;
      }
    }
  }

  return opportunities;
}

function feedPriorityToVerdict(priority: FeedPriority): IntelVerdict {
  if (priority === "FLASH") {
    return "CRITICAL";
  }
  if (priority === "PRIORITY") {
    return "WARNING";
  }
  return "ROUTINE";
}

function chipsFromTags(tags: string[]): string[] {
  return tags.filter((tag) => !tag.includes(":")).slice(0, 6);
}

function topicLabel(item: FeedEntry): string {
  switch (item.category) {
    case "macro":
      return "宏观";
    case "geopolitics":
      return "政策";
    case "energy":
      return "能源";
    case "space":
      return "太空";
    case "bio-ai":
      return "生物AI";
    case "ai":
      return "AI";
    case "market":
      return "市场";
    default:
      return getCategoryLabel(item.category);
  }
}

function tierLabel(item: FeedEntry): string {
  if (item.source === "siqitian") {
    return "一级";
  }
  if (item.source === "manual") {
    return "原始";
  }
  return "二级";
}

function clusterLabel(count: number): string {
  return count > 1 ? `簇 1/${count} ↗` : "单条";
}

function sourceLabel(item: FeedEntry): string {
  return getSourceLabel(item.source);
}

function formatTime(value: string): string {
  const date = new Date(value);
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
  }).format(date) + " UTC";
}

const TOPIC_KEYWORDS: Record<string, RegExp> = {
  "半导体 · 算力": /半导体|算力|芯片|GPU|TPU|NPU|H100|H200|B100|昇腾|Ascend|EUV|wafer|7nm|5nm|3nm|2nm|chip|silicon/i,
  "商业航天": /太空|发射|卫星|航天|火箭|space|launch|satellite|rocket|spaceX|Starlink|Blue Origin/i,
  "能源 · 核能": /核|nuclear|核能|geothermal|地热|fusion|聚变|SMR|核电/i,
  "生物AI": /生物|疫苗|mRNA|gene|drug|biotech|protein|蛋白|基因|抗体|临床/i,
  "地缘 · 政策": /监管|政策|regulation|policy|veto|approve|sanction|制裁|关税|tariff|export control|出口管制|审批|FDA|FTC|SEC/i,
};

function matchesTopic(item: FeedEntry, label: string): boolean {
  if (label === "宏观") return item.category === "macro";
  if (label === "AI") return item.category === "ai" || item.category === "bio-ai";
  const re = TOPIC_KEYWORDS[label];
  if (!re) return false;
  if (label === "能源 · 核能" && item.category === "energy") return true;
  if (label === "商业航天" && item.category === "space") return true;
  if (label === "生物AI" && item.category === "bio-ai") return true;
  if (label === "地缘 · 政策" && item.category === "geopolitics") return true;
  const haystack = `${item.title} ${item.summary} ${(item.tags ?? []).join(" ")}`;
  return re.test(haystack);
}

function buildTopicChips(items: FeedEntry[]): IntelTopicChip[] {
  const labels = ["宏观", "AI", "半导体 · 算力", "能源 · 核能", "商业航天", "生物AI", "地缘 · 政策"];
  return labels.map((label) => ({
    label,
    count: items.filter((it) => matchesTopic(it, label)).length,
  }));
}

function buildFlowCards(feedItems: FeedEntry[]): IntelFlowCard[] {
  const deduped = dedupeFeed(feedItems);

  return deduped.map(({ item, count }) => ({
    id: item.id,
    signal: signalScore(item).toFixed(1),
    verdict: feedPriorityToVerdict(item.priority),
    topic: topicLabel(item),
    title: item.title,
    summary: item.summary,
    chips: chipsFromTags(item.tags),
    timestamp: formatTime(item.createdAt),
    sourceLabel: sourceLabel(item),
    tier: tierLabel(item),
    clusterLabel: clusterLabel(count),
    toObi: signalScore(item) >= 7.1 || item.priority !== "ROUTINE"
  })).sort((left, right) => Number(right.signal) - Number(left.signal) || left.title.localeCompare(right.title));
}

export function buildIntelViewModel(
  briefing: Briefing | null,
  feedItems: FeedEntry[],
  sitian?: SitianSnapshot | null,
  options?: BuildIntelOptions
): IntelViewModel {
  const nowMs = (options?.now ?? new Date()).getTime();
  const maxAgeHours = options?.maxAgeHours ?? Infinity;
  const { fresh, staleCount } = filterFresh(feedItems, nowMs, maxAgeHours);
  const verdict = toVerdict(briefing);
  const flowCards = buildFlowCards(fresh);
  const opportunities = buildOpportunities(fresh, sitian);
  const dxyValue = sitian?.dxy?.value ?? 104.6;
  const dxyDelta = sitian?.dxy?.delta1d ?? 0.4;
  const btcValue = sitian?.btc?.value ?? 68200;
  const btcDelta = sitian?.btc?.change24hPct ?? -1.7;

  const fearGreedTone: IntelMetric["tone"] =
    (briefing?.fearGreed ?? 50) <= 25 ? "red" : (briefing?.fearGreed ?? 50) >= 75 ? "amber" : "cyan";
  const vixTone: IntelMetric["tone"] = (briefing?.vix ?? 0) >= 25 ? "red" : (briefing?.vix ?? 0) >= 20 ? "amber" : "cyan";

  return {
    desk: {
      verdict,
      verdictLine: verdictLine(verdict),
      verdictText: verdictText(verdict),
      regime: summarizeRegime(briefing),
      riskMetrics: [
        { label: "VIX", value: metric(briefing?.vix, 1), tone: vixTone },
        { label: "DXY", value: dxyValue.toFixed(1), tone: dxyDelta > 0 ? "amber" : "cyan" },
        { label: "TNX", value: metric(briefing?.tnx, 2), tone: "cyan" },
        { label: "BTC", value: `${(btcValue / 1000).toFixed(1)}k`, tone: btcDelta >= 0 ? "cyan" : "red" },
        { label: "恐贪", value: metric(briefing?.fearGreed, 0), tone: fearGreedTone }
      ],
      opportunities,
      evidence: flowCards.slice(0, 3).map((card) => ({
        id: card.id,
        time: card.timestamp.replace(" UTC", ""),
        title: card.title,
        meta: `${card.sourceLabel} · ${card.tier}`,
        signal: card.signal,
        verdict: card.verdict
      }))
    },
    flow: {
      cards: flowCards,
      totalCount: flowCards.length,
      staleCount,
      refreshedLabel:
        staleCount > 0
          ? `${flowCards.length} 条新鲜 · 过滤 ${staleCount} 条 >${maxAgeHours}h`
          : "刚刚刷新 · 自动 30 秒",
      topicChips: buildTopicChips(fresh)
    }
  };
}
