import { NextResponse } from "next/server";

import { createUpdateRun } from "@/lib/db";
import { ingestArticles } from "@/lib/ingest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return false;
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) {
    return true;
  }
  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

export async function GET(request: Request): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const slotParam = url.searchParams.get("slot");
  const slot = slotParam === "evening" ? "evening" : "morning";

  try {
    const result = await ingestArticles(slot);
    return NextResponse.json({ ok: true, slot, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cron update failed";
    await createUpdateRun({
      slot,
      status: "error",
      collected: 0,
      inserted: 0,
      pushed: 0,
      message,
      runAt: new Date().toISOString()
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
