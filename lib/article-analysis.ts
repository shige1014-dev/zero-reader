import { sourcePriority } from "@/lib/article-candidate";
import type { SourceItem } from "@/lib/sources/types";

export type TrackTag = "量子计算" | "核能" | "AI芯片" | "宏观" | "地缘风险" | "商业航天";

export interface DeepAnalysis {
  eventNature: string;
  keyVariable: string;
  transmission: string;
  trap: string;
  falsifyPoint: string;
  profitOutlet: string;
  bull: string;
  bear: string;
}

export interface FallbackAnalysis {
  titleZh: string;
  zeroEval: string;
  recommendLevel: number;
  tags: TrackTag[];
  summary: string;
  analysis: DeepAnalysis;
}

export function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

function hasWord(value: string, words: string[]): boolean {
  return words.some((word) => new RegExp(`(^|[^a-z0-9])${word}([^a-z0-9]|$)`, "i").test(value));
}

export function classifyTags(text: string): TrackTag[] {
  const value = text.toLowerCase();
  const tags: TrackTag[] = [];

  if (/quantum|量子/.test(value)) tags.push("量子计算");
  if (/nuclear|uranium|reactor|smr|核能|铀|反应堆|小堆/.test(value)) tags.push("核能");
  if (
    hasWord(value, ["ai", "gpu", "chip", "chips", "semiconductor", "nvidia", "amd", "tsmc"]) ||
    /人工智能|芯片|半导体|算力|英伟达|台积电|先进封装/.test(value)
  ) {
    tags.push("AI芯片");
  }
  if (/spacex|space|satellite|launch|rocket|航天|卫星|发射|火箭/.test(value)) tags.push("商业航天");
  if (/geopolit|war|missile|iran|israel|russia|ukraine|战争|冲突|伊朗|以色列|俄乌/.test(value)) tags.push("地缘风险");
  if (/macro|inflation|rates|fed|treasury|yield|dollar|cpi|宏观|通胀|利率|美联储|美元|国债/.test(value)) tags.push("宏观");

  return tags.length > 0 ? tags.slice(0, 2) : ["宏观"];
}

export function normalizeTags(value: unknown): TrackTag[] {
  const allowed: TrackTag[] = ["量子计算", "核能", "AI芯片", "宏观", "地缘风险", "商业航天"];
  if (!Array.isArray(value)) {
    return ["宏观"];
  }
  const filtered = value.filter((item): item is TrackTag => allowed.includes(String(item) as TrackTag));
  return filtered.length > 0 ? filtered.slice(0, 2) : ["宏观"];
}

export function inferObiRef(tags: TrackTag[]): string {
  if (tags.includes("AI芯片")) return "bf-001";
  if (tags.includes("量子计算")) return "bf-004";
  if (tags.includes("核能")) return "bf-005";
  if (tags.includes("商业航天")) return "bf-006";
  if (tags.includes("地缘风险")) return "bf-010";
  return "bf-013";
}

export function fallbackChineseTitle(item: SourceItem): string {
  if (containsChinese(item.title)) {
    return item.title;
  }
  const summary = item.rawText.trim();
  if (containsChinese(summary)) {
    return clip(summary.split(/[。.!?]/)[0] ?? summary, 34);
  }
  const track = classifyTags(`${item.title} ${item.rawText}`)[0] ?? "宏观";
  return `${track}｜${clip(item.title, 26)}`;
}

export function buildFallbackAnalysis(item: SourceItem): FallbackAnalysis {
  const text = `${item.title} ${item.rawText}`;
  const tags = classifyTags(text);
  const primary = tags[0] ?? "宏观";
  const title = clip(item.title.trim() || fallbackChineseTitle(item), 42);
  const summary = clip(item.rawText.trim() || item.title, 150);
  const recommendLevel =
    item.source === "ArXiv"
      ? 4
      : sourcePriority(item.source) >= 2 || primary !== "宏观"
        ? 4
        : 3;

  return {
    titleZh: fallbackChineseTitle(item),
    zeroEval: clip(`${title} 要先按${primary}线索处理，重点看后续是否出现订单、政策、资金流或价格联动；没有二次验证前，只把它当观察信号。`, 150),
    recommendLevel,
    tags,
    summary,
    analysis: {
      eventNature: `${primary}相关信号，当前证据主要来自标题和摘要，先视作待确认事件。`,
      keyVariable: "后续公告、价格反应、成交量变化和同主题公司是否同步验证。",
      transmission: "信息先改变主题预期，再传导到相关资产估值，最后需要订单或利润表兑现。",
      trap: "最容易把单条新闻当成趋势确认，忽略来源质量和后续数据缺口。",
      falsifyPoint: "若后续没有权威来源跟进，相关资产也无持续反应，这条信号优先降权。",
      profitOutlet: "最终要回到相关公司收入、毛利率、订单或资本开支，不落到财报就只是叙事。",
      bull: "若同主题数据继续共振，说明市场开始重新定价这条线索。",
      bear: "若只有标题热度，没有订单和价格确认，反弹大概率不可持续。"
    }
  };
}
