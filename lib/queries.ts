import { createArticle, getLessonByDate, getTodayObiCard, getTodayUnreadArticles, markArticlePushed, markArticleRead } from "@/lib/db";
import type { Article, Lesson, ObiCard } from "@/lib/types";

export function todayDateString(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

export async function fetchTodayArticles(): Promise<Article[]> {
  return getTodayUnreadArticles(todayDateString());
}

export async function fetchTodayObiCard(): Promise<ObiCard | null> {
  return getTodayObiCard(todayDateString());
}

export async function fetchTodayLesson(): Promise<Lesson | null> {
  return getLessonByDate(todayDateString());
}

export { createArticle, markArticlePushed, markArticleRead };
