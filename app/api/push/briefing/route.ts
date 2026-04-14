import { NextRequest, NextResponse } from 'next/server'
import { createBriefing as insertBriefing } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

function auth(req: NextRequest) {
  const secret = process.env.PUSH_SECRET
  if (!secret) return true
  return req.headers.get('authorization') === `Bearer ${secret}`
}

export async function POST(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    if (!body.macro_track || !body.market_track || !body.sentiment_track) {
      return NextResponse.json({ error: 'All three tracks required' }, { status: 400 })
    }

    const briefing = {
      id: body.id ?? randomUUID(),
      macro_track: body.macro_track,
      market_track: body.market_track,
      sentiment_track: body.sentiment_track,
      risk_level: body.risk_level ?? 'ROUTINE',
      vix: body.vix ?? null,
      fear_greed: body.fear_greed ?? null,
      tnx: body.tnx ?? null,
      created_at: body.timestamp ?? new Date().toISOString(),
    }

    insertBriefing(briefing)
    revalidatePath('/')

    return NextResponse.json({ ok: true, id: briefing.id })
  } catch (err) {
    console.error('[push/briefing]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
