/**
 * newsnow deep-read sources.
 *
 * Endpoint reference: https://github.com/ourongxing/newsnow
 * TrendRadar-style integration uses the public hosted deployment.
 * Default: https://newsnow.busiyi.world (p3terx mirror is offline at time of writing).
 * Override via NEWSNOW_BASE env var.
 *
 * These sources are CHINESE-LANGUAGE DEEP / HOT content (not flash news).
 * Quick-news sources (wallstreetcn-quick, cls-telegraph, xueqiu-hotstock,
 * mktnews-flash, 36kr-quick) are claimed by zero-center's dashboard —
 * DO NOT add them here.
 */
import type { SourceItem } from "./types";

const BASE = process.env.NEWSNOW_BASE || "https://newsnow.busiyi.world";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 zerozero-reader/0.1";
const TIMEOUT_MS = 5000;
const PER_SOURCE = 8;

interface SourceDef {
  id: string;
  displayName: string;
}

const SOURCES: SourceDef[] = [
  { id: "wallstreetcn-hot", displayName: "华尔街见闻·热门" },
  { id: "cls-depth", displayName: "财联社·深度" },
  { id: "thepaper", displayName: "澎湃新闻" },
  { id: "zaobao", displayName: "联合早报" },
];

interface NewsnowItem {
  id?: string;
  title?: string;
  url?: string;
  mobileUrl?: string;
  extra?: { date?: number };
}

interface NewsnowResponse {
  status?: string;
  id?: string;
  updatedTime?: number;
  items?: NewsnowItem[];
}

async function fetchOne(src: SourceDef): Promise<NewsnowResponse | null> {
  const url = `${BASE}/api/s?id=${encodeURIComponent(src.id)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": UA },
    });
    if (!res.ok) {
      throw new Error(`newsnow ${src.id} HTTP ${res.status}`);
    }
    return (await res.json()) as NewsnowResponse;
  } finally {
    clearTimeout(timer);
  }
}

function isoFrom(ms: number | undefined): string | null {
  if (!ms) return null;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export async function fetchNewsnow(): Promise<SourceItem[]> {
  const results = await Promise.allSettled(SOURCES.map(fetchOne));

  const items: SourceItem[] = [];
  for (let i = 0; i < SOURCES.length; i += 1) {
    const src = SOURCES[i];
    const r = results[i];
    if (r.status !== "fulfilled" || !r.value) {
      const reason = r.status === "rejected" ? (r.reason as Error)?.message : "empty";
      console.warn(`[newsnow:${src.id}] ${reason}`);
      continue;
    }
    const raw = r.value;
    const list = Array.isArray(raw.items) ? raw.items.slice(0, PER_SOURCE) : [];
    const fallbackTime = raw.updatedTime;

    for (const it of list) {
      const title = (it.title || "").trim();
      if (!title || title.length < 4) continue;
      const url = it.mobileUrl || it.url || "";
      if (!url) continue;
      items.push({
        title,
        url,
        source: src.displayName,
        rawText: title, // newsnow only returns titles; feed full title as rawText for analyzer
        publishedAt: isoFrom(it.extra?.date) || isoFrom(fallbackTime),
        sourceType: "newsnow",
      });
    }
  }

  return items;
}

export const NEWSNOW_DISPLAY_NAMES = new Set(SOURCES.map((s) => s.displayName));
