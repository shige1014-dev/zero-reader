import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = process.env.DATABASE_PATH ?? path.join(process.cwd(), 'data', 'zero.db')

// Ensure data directory exists
const dir = path.dirname(DB_PATH)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const db = new Database(DB_PATH)

db.exec(`
  CREATE TABLE IF NOT EXISTS feed (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'macro',
    priority TEXT NOT NULL DEFAULT 'ROUTINE',
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT,
    url TEXT,
    tags TEXT DEFAULT '[]',
    confidence REAL DEFAULT 0.8,
    is_read INTEGER DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS briefing (
    id TEXT PRIMARY KEY,
    macro_track TEXT NOT NULL,
    market_track TEXT NOT NULL,
    sentiment_track TEXT NOT NULL,
    risk_level TEXT NOT NULL DEFAULT 'ROUTINE',
    vix REAL,
    fear_greed REAL,
    tnx REAL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS feed_created ON feed(created_at DESC);
  CREATE INDEX IF NOT EXISTS feed_priority ON feed(priority);
  CREATE INDEX IF NOT EXISTS feed_category ON feed(category);
`)

export default db

// ── Types ──────────────────────────────────────────────────────────────────

export type Priority = 'FLASH' | 'PRIORITY' | 'ROUTINE'
export type Category = 'macro' | 'market' | 'civilization' | 'deep'
export type Source = 'siqitian' | 'koukou' | 'fanpai' | 'manual'

export type FeedItem = {
  id: string
  source: Source
  category: Category
  priority: Priority
  title: string
  summary: string
  content?: string
  url?: string
  tags: string[]
  confidence: number
  is_read: boolean
  created_at: string
}

export type Briefing = {
  id: string
  macro_track: string
  market_track: string
  sentiment_track: string
  risk_level: Priority
  vix?: number
  fear_greed?: number
  tnx?: number
  created_at: string
}

// ── Queries ────────────────────────────────────────────────────────────────

export function getFeed(opts: {
  category?: string
  priority?: string
  limit?: number
  offset?: number
} = {}): FeedItem[] {
  let query = 'SELECT * FROM feed WHERE 1=1'
  const params: (string | number)[] = []

  if (opts.category && opts.category !== 'all') {
    query += ' AND category = ?'
    params.push(opts.category)
  }
  if (opts.priority && opts.priority !== 'all') {
    query += ' AND priority = ?'
    params.push(opts.priority)
  }

  query += ' ORDER BY CASE priority WHEN \'FLASH\' THEN 0 WHEN \'PRIORITY\' THEN 1 ELSE 2 END, created_at DESC'
  query += ` LIMIT ${opts.limit ?? 40} OFFSET ${opts.offset ?? 0}`

  const rows = db.prepare(query).all(...params) as any[]
  return rows.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]'), is_read: Boolean(r.is_read) }))
}

export function getFeedById(id: string): FeedItem | null {
  const row = db.prepare('SELECT * FROM feed WHERE id = ?').get(id) as any
  if (!row) return null
  return { ...row, tags: JSON.parse(row.tags || '[]'), is_read: Boolean(row.is_read) }
}

export function insertFeed(item: Omit<FeedItem, 'is_read'>): void {
  db.prepare(`
    INSERT OR REPLACE INTO feed (id, source, category, priority, title, summary, content, url, tags, confidence, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    item.id, item.source, item.category, item.priority,
    item.title, item.summary, item.content ?? null, item.url ?? null,
    JSON.stringify(item.tags ?? []), item.confidence ?? 0.8, item.created_at
  )
}

export function getLatestBriefing(): Briefing | null {
  return db.prepare('SELECT * FROM briefing ORDER BY created_at DESC LIMIT 1').get() as Briefing | null
}

export function insertBriefing(b: Briefing): void {
  db.prepare(`
    INSERT OR REPLACE INTO briefing (id, macro_track, market_track, sentiment_track, risk_level, vix, fear_greed, tnx, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(b.id, b.macro_track, b.market_track, b.sentiment_track, b.risk_level, b.vix ?? null, b.fear_greed ?? null, b.tnx ?? null, b.created_at)
}

export function markRead(id: string): void {
  db.prepare('UPDATE feed SET is_read = 1 WHERE id = ?').run(id)
}

export function seedMockData(): void {
  const count = (db.prepare('SELECT COUNT(*) as n FROM feed').get() as any).n
  if (count > 0) return

  const now = new Date()
  const items = [
    {
      id: 'mock-001', source: 'siqitian', category: 'macro', priority: 'FLASH',
      title: '美联储官员暗示年内降息时间表提前',
      summary: '多位联储官员在最新讲话中释放鸽派信号，市场预期9月首次降息概率升至72%。VIX骤降至16.4，短端利率曲线明显走陡。',
      url: null, tags: ['美联储', '降息', '宏观'], confidence: 0.91,
      created_at: new Date(now.getTime() - 10 * 60000).toISOString()
    },
    {
      id: 'mock-002', source: 'koukou', category: 'civilization', priority: 'PRIORITY',
      title: 'OpenAI 推出 o3-mini，推理成本下降80%',
      summary: '新模型在数学/代码基准超越前代，API定价仅为o1的20%。范式哨信号：AI基础设施成本曲线加速下行，文明跃迁速度窗口收窄。',
      url: null, tags: ['OpenAI', 'AI', '范式'], confidence: 0.95,
      created_at: new Date(now.getTime() - 35 * 60000).toISOString()
    },
    {
      id: 'mock-003', source: 'siqitian', category: 'market', priority: 'PRIORITY',
      title: 'NVDA 盘前跌3.2%，机构大单异动',
      summary: '期权市场显示大量看空合约集中在本周到期，主力空头目标价420。司市官：技术面RSI超买，注意短期回调风险，不影响长期文明跃迁主线判断。',
      url: null, tags: ['NVDA', '期权', '技术面'], confidence: 0.78,
      created_at: new Date(now.getTime() - 65 * 60000).toISOString()
    },
    {
      id: 'mock-004', source: 'fanpai', category: 'civilization', priority: 'PRIORITY',
      title: '量子纠错里程碑：谷歌 Willow 实现百万量子比特级容错',
      summary: '《Nature》最新论文确认逻辑错误率已低于物理错误率阈值。这是量子计算从实验走向工程的关键拐点。范式赌注层激活：IONQ持仓逻辑进一步强化。',
      url: null, tags: ['量子', 'IONQ', '文明跃迁'], confidence: 0.88,
      created_at: new Date(now.getTime() - 120 * 60000).toISOString()
    },
    {
      id: 'mock-005', source: 'siqitian', category: 'macro', priority: 'ROUTINE',
      title: '中国2月CPI同比-0.1%，通缩压力延续',
      summary: '核心CPI仍为正值，食品项拖累较大。司天官流动性轨：人行短期降准概率上升，关注MLF操作窗口。对美股直接影响有限，关注大宗商品联动。',
      url: null, tags: ['中国', 'CPI', '流动性'], confidence: 0.82,
      created_at: new Date(now.getTime() - 180 * 60000).toISOString()
    },
    {
      id: 'mock-006', source: 'manual', category: 'deep', priority: 'ROUTINE',
      title: '深度：一人独角兽的系统密度——2026年可能性地图',
      summary: '当AI把边际生产成本压至接近零，个体经营单位的上限在哪里？本文梳理内容-软件-服务三飞轮的融合路径，以及零零系统作为原型的启示。',
      url: null, tags: ['一人公司', '文明跃迁', '深度'], confidence: 1.0,
      created_at: new Date(now.getTime() - 300 * 60000).toISOString()
    },
  ]

  for (const item of items) {
    insertFeed(item as any)
  }

  insertBriefing({
    id: 'mock-briefing-001',
    macro_track: 'Fed鸽派信号增强，流动性边际宽松。TNX 4.31%，较昨日下行6bp。M2同比回暖，实体经济信号混合。',
    market_track: 'VIX 16.4，市场情绪偏乐观。NVDA期权异动值得关注，AI板块整体强势。加密市场跟随风险资产，BTC企稳67k上方。',
    sentiment_track: '恐贪指数68（贪婪区间）。散户杠杆略有回升，机构仍在高位减仓。社交媒体AI讨论热度持续高位。',
    risk_level: 'PRIORITY',
    vix: 16.4,
    fear_greed: 68,
    tnx: 4.31,
    created_at: new Date(now.getTime() - 5 * 60000).toISOString()
  })
}
