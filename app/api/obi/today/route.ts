import { NextResponse } from "next/server";

import { getTodayObiCard } from "@/lib/db";
import { todayDateString } from "@/lib/time";
import type { ApiError, ApiSuccess, ObiCard } from "@/lib/types";

export async function GET(): Promise<NextResponse<ApiSuccess<ObiCard> | ApiError>> {
  try {
    const card = await getTodayObiCard(todayDateString());
    if (!card) {
      return NextResponse.json({ error: "No OBI card for today" }, { status: 404 });
    }
    return NextResponse.json({ data: card });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch OBI card";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
