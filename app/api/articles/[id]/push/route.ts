import { NextResponse } from "next/server";

import { markArticlePushed } from "@/lib/db";
import type { ApiError, ApiSuccess, Article } from "@/lib/types";
import { pushArticleSchema } from "@/lib/validators";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiSuccess<Article> | ApiError>> {
  const numericId = Number(params.id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }

  try {
    const payload = pushArticleSchema.parse((await request.json()) as unknown);
    const article = await markArticlePushed(numericId, payload.slot);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ data: article });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to mark article as pushed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
