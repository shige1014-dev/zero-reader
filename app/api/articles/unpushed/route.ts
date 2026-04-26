import { NextResponse } from "next/server";

import { getPushableArticles } from "@/lib/db";
import { todayDateString } from "@/lib/time";
import type { ApiError, ApiSuccess, Article } from "@/lib/types";

export async function GET(): Promise<NextResponse<ApiSuccess<Article[]> | ApiError>> {
  try {
    const articles = await getPushableArticles(todayDateString());
    return NextResponse.json({ data: articles });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch unpushed articles";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
