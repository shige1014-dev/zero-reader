import { NextRequest, NextResponse } from 'next/server'
import { listFeed as getFeed, markFeedAsRead as markRead } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const items = getFeed({
    category: searchParams.get('category') ?? undefined,
    priority: searchParams.get('priority') ?? undefined,
    limit: Number(searchParams.get('limit') ?? 40),
    offset: Number(searchParams.get('offset') ?? 0),
  })
  return NextResponse.json(items)
}

export async function PATCH(req: NextRequest) {
  const { id } = await req.json()
  if (id) markRead(id)
  return NextResponse.json({ ok: true })
}
