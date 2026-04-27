import { NextResponse } from "next/server";

import { createArticle, getTodayUnreadArticles } from "@/lib/db";
import { todayDateString } from "@/lib/time";
import type { ApiError, ApiSuccess, Article } from "@/lib/types";
import { createArticleSchema } from "@/lib/validators";

export async function GET(): Promise<NextResponse<ApiSuccess<Article[]> | ApiError>> {
  try {
    const articles = await getTodayUnreadArticles(todayDateString());
    return NextResponse.json({ data: articles });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch articles";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse<ApiSuccess<Article> | ApiError>> {
  try {
    const json = (await request.json()) as unknown;
    const payload = createArticleSchema.parse(json);
    const article = await createArticle(payload);
    return NextResponse.json({ data: article }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create article";
    const status = message.includes("Duplicate") || message.includes("UNIQUE") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
