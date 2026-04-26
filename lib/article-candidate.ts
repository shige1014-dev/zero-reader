import { NEWSNOW_DISPLAY_NAMES } from "@/lib/sources/newsnow";
import type { SourceItem } from "@/lib/sources/types";

export interface CandidateAnalysis {
  recommendLevel: number;
  tags: string[];
}

export function normalizedTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sourcePriority(source: string): number {
  if (["Macro Desk", "Macro Grid", "Research Note", "Risk Monitor", "Semi Daily"].includes(source)) return 4;
  if (source === "ArXiv") return 3;
  if (NEWSNOW_DISPLAY_NAMES.has(source)) return 3;

  const value = source.toLowerCase();
  if (value.includes("reuters") || value.includes("bloomberg") || value.includes("financial times")) return 3;
  if (value.includes("cnbc") || value.includes("stratechery")) return 3;
  return 1;
}

export function isHighQualityCandidate(item: SourceItem, analysis: CandidateAnalysis): boolean {
  const title = normalizedTitle(item.title);
  const rawLength = item.rawText.trim().length;
  const hasMeaningfulTag = analysis.tags.length > 0 && analysis.tags[0] !== "宏观";
  const strongSource = sourcePriority(item.source) >= 2;
  const strongScore = analysis.recommendLevel >= 4;
  const curatedTitleOnly = item.sourceType === "newsnow" && NEWSNOW_DISPLAY_NAMES.has(item.source);
  const hasEnoughSignal = rawLength >= 80 || item.source === "ArXiv" || curatedTitleOnly;

  if (title.length < 8) {
    return false;
  }

  if (curatedTitleOnly) {
    return strongScore || strongSource;
  }

  return hasEnoughSignal && (strongScore || strongSource || hasMeaningfulTag);
}
