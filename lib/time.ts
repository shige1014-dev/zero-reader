const SEOUL_TIME_ZONE = "Asia/Seoul";

export function todayDateString(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: SEOUL_TIME_ZONE }).format(now);
}
