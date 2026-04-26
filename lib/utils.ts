export function formatTodayLabel(input: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  }).format(input);
}

export function dots(level: number): string[] {
  return Array.from({ length: Math.max(0, Math.min(5, level)) }, (_, index) => `dot-${index + 1}`);
}

export function normalizeTag(tag: string): string {
  return tag.trim();
}

export function toHttpUrl(url: string): string {
  return url.replace(/^https:/i, "http:");
}
