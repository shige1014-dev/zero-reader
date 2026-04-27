import { NextResponse } from "next/server";

import { markArticleRead } from "@/lib/db";
import type { ApiError, ApiSuccess, Article } from "@/lib/types";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(
  _request: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiSuccess<Article> | ApiError>> {
  const numericId = Number(params.id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }

  try {
    const article = await markArticleRead(numericId);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ data: article });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to mark article as read";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
