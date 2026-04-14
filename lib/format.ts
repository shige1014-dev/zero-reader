import readingTime from "reading-time";
import type { FeedCategory, FeedPriority, FeedSource } from "@/lib/feed-types";

export function formatAbsoluteTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatRelativeTime(value: string) {
  const target = new Date(value).getTime();
  const diff = target - Date.now();
  const absMs = Math.abs(diff);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const formatter = new Intl.RelativeTimeFormat("zh-CN", { numeric: "auto" });

  if (absMs < hour) {
    return formatter.format(Math.round(diff / minute), "minute");
  }

  if (absMs < day) {
    return formatter.format(Math.round(diff / hour), "hour");
  }

  return formatter.format(Math.round(diff / day), "day");
}

export function formatReadingTime(content: string | null) {
  if (!content) {
    return null;
  }

  return readingTime(content, { wordsPerMinute: 220 }).text;
}

export function getPriorityTone(priority: FeedPriority) {
  if (priority === "FLASH") {
    return {
      border: "border-red-500/70",
      accent: "bg-red-500",
      glow: "shadow-[0_0_0_1px_rgba(239,68,68,0.16),0_18px_42px_rgba(127,29,29,0.25)]",
      text: "text-red-200"
    };
  }

  if (priority === "PRIORITY") {
    return {
      border: "border-accent/40",
      accent: "bg-accent",
      glow: "shadow-glow",
      text: "text-[#f2deb0]"
    };
  }

  return {
    border: "border-white/8",
    accent: "bg-white/20",
    glow: "",
    text: "text-textMuted"
  };
}

export function getRiskCopy(priority: FeedPriority) {
  if (priority === "FLASH") {
    return "红色快讯级，先处理风险再谈机会";
  }

  if (priority === "PRIORITY") {
    return "重点关注级，适合当天追踪与复盘";
  }

  return "常规跟踪级，作为背景情报持续观察";
}

export function getCategoryLabel(category: FeedCategory | string) {
  switch (category) {
    case "macro":
      return "宏观";
    case "ai":
      return "AI";
    case "quantum":
      return "量子";
    case "space":
      return "商业太空";
    case "fusion":
      return "核聚变";
    case "bio-ai":
      return "生物AI";
    case "energy":
      return "能源";
    case "geopolitics":
      return "地缘";
    case "deep":
      return "精读文刊";
    case "trending":
      return "热点仓库";
    case "market":
      return "市场";
    case "civilization":
      return "文明跃迁";
    default:
      return category;
  }
}

export function getSourceLabel(source: FeedSource | string) {
  switch (source) {
    case "siqitian":
      return "司天官";
    case "koukou":
      return "扣扣";
    case "fanpai":
      return "范式哨";
    case "manual":
      return "手动录入";
    default:
      return source;
  }
}
