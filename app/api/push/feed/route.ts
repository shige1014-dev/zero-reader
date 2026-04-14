import { NextRequest, NextResponse } from 'next/server'
import { createFeedEntry as insertFeed } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

function auth(req: NextRequest) {
  const secret = process.env.PUSH_SECRET
  if (!secret) return true // dev mode
  return req.headers.get('authorization') === `Bearer ${secret}`
}

export async function POST(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    if (!body.title || !body.summary) {
      return NextResponse.json({ error: 'title and summary required' }, { status: 400 })
    }

    const item = {
      id: body.id ?? randomUUID(),
      source: body.source ?? 'manual',
      category: body.category ?? 'macro',
      priority: body.priority ?? 'ROUTINE',
      title: body.title,
      summary: body.summary,
      content: body.content ?? null,
      url: body.url ?? null,
      tags: body.tags ?? [],
      confidence: body.confidence ?? 0.8,
      created_at: body.timestamp ?? new Date().toISOString(),
    }

    insertFeed(item)
    revalidatePath('/')

    return NextResponse.json({ ok: true, id: item.id })
  } catch (err) {
    console.error('[push/feed]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
