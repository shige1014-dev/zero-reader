import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const dynamic = 'force-dynamic'

const VAULT_PATH = process.env.VAULT_PATH ?? path.join(process.env.HOME ?? '', 'zerozero-work/ZERO_V4/01_BODY')

type Card = {
  id: string
  title: string
  summary: string
  topic: string
  hall: string
  weight: number
  confidence: number
  tags: string[]
  updated_at: string
  filePath: string
}

function readCards(hall?: string): Card[] {
  const cards: Card[] = []
  const halls = hall ? [hall] : ['hall_knowledge', 'hall_judgment', 'hall_expression']

  for (const h of halls) {
    const hallPath = path.join(VAULT_PATH, h)
    if (!fs.existsSync(hallPath)) continue

    const walkDir = (dir: string) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            walkDir(fullPath)
          } else if (entry.name.endsWith('.md')) {
            try {
              const content = fs.readFileSync(fullPath, 'utf8')
              const { data } = matter(content)
              if (data.title && data.summary) {
                cards.push({
                  id: data.id ?? entry.name.replace('.md', ''),
                  title: data.title,
                  summary: data.summary,
                  topic: data.topic ?? '',
                  hall: h,
                  weight: data.weight ?? 0.5,
                  confidence: data.confidence ?? 0.8,
                  tags: data.tags ?? [],
                  updated_at: data.updated_at ?? '',
                  filePath: fullPath.replace(VAULT_PATH, ''),
                })
              }
            } catch {}
          }
        }
      } catch {}
    }
    walkDir(hallPath)
  }

  return cards.sort((a, b) => b.weight - a.weight)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const hall = searchParams.get('hall') ?? undefined
  const limit = Number(searchParams.get('limit') ?? 20)
  const tag = searchParams.get('tag') ?? undefined

  let cards = readCards(hall)
  if (tag) cards = cards.filter(c => c.tags.includes(tag))

  return NextResponse.json(cards.slice(0, limit))
}
