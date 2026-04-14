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
    return "红色快讯级";
  }

  if (priority === "PRIORITY") {
    return "重点关注级";
  }

  return "常规跟踪级";
}

export function getCategoryLabel(category: FeedCategory) {
  switch (category) {
    case "macro":
      return "宏观";
    case "market":
      return "市场";
    case "civilization":
      return "文明跃迁信号";
    case "deep":
      return "深度文刊";
    default:
      return category;
  }
}

export function getSourceLabel(source: FeedSource) {
  switch (source) {
    case "siqitian":
      return "司天官";
    case "koukou":
      return "口口";
    case "fanpai":
      return "反派";
    case "manual":
      return "手动录入";
    default:
      return source;
  }
}
