import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { markFeedAsRead } from "@/lib/db";

export const runtime = "nodejs";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(_: Request, { params }: RouteContext) {
  markFeedAsRead(params.id);
  revalidatePath("/");
  revalidatePath(`/read/${params.id}`);

  return NextResponse.json({ ok: true });
}
