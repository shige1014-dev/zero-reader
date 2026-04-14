# ZERO2076 情报终端

基于 Next.js 14 + TypeScript + Tailwind + SQLite + better-sqlite3 的本地情报终端。

## 技术栈

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- SQLite (`better-sqlite3`)
- Node runtime API routes

## 启动

```bash
npm install
npm run dev
```

默认地址：

```bash
http://localhost:3000
```

推荐环境变量：

```bash
PUSH_SECRET=your-secret
DATABASE_PATH=./data/zero.db
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

开发环境若未显式设置 `PUSH_SECRET`，默认使用：

```bash
local-dev-secret
```

## 页面说明

- `/`：战情室、今日简报、信号流、精读文刊
- `/read/[id]`：单条信号阅读页
- `/civilization-leap/[slug]`：静态文章页
- `/about`：系统说明页

## Feed 分类

`feed.category` 现在支持：

```txt
macro | ai | quantum | space | fusion | bio-ai | energy | geopolitics | deep
```

其中：

- `deep`：精读文刊专用
- 其余分类用于首页信号流筛选

## 推送 API 示例

推送普通信号：

```bash
curl -X POST http://localhost:3000/api/push/feed \
  -H "Authorization: Bearer local-dev-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "manual",
    "category": "ai",
    "priority": "PRIORITY",
    "title": "AI 基础设施继续强化",
    "summary": "算力与数据中心链条仍是主线，但交易拥挤度正在抬升。",
    "content": "## 观察\n\n今天需要重点看 AI 基础设施链条的量价配合。",
    "url": "https://example.com/ai-infra-note",
    "tags": ["AI", "NVDA", "TSM", "基础设施"],
    "confidence": 0.88,
    "timestamp": "2026-04-12T09:00:00.000Z"
  }'
```

推送精读文刊：

```bash
curl -X POST http://localhost:3000/api/push/feed \
  -H "Authorization: Bearer local-dev-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "manual",
    "category": "deep",
    "priority": "ROUTINE",
    "title": "量子与商业太空的长期叙事比较",
    "summary": "推荐理由：适合拿来校准长期赛道视角，而不是盯住短线波动。",
    "url": "https://example.com/deep-frontier-sectors",
    "tags": ["精读", "量子", "商业太空"],
    "confidence": 0.76,
    "timestamp": "2026-04-12T09:10:00.000Z"
  }'
```

推送三轨简报：

```bash
curl -X POST http://localhost:3000/api/push/briefing \
  -H "Authorization: Bearer local-dev-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "macro_track": "美元流动性边际改善，但长端利率仍处高位拉扯。",
    "market_track": "AI 与成长主线继续强势，但估值压力开始上升。",
    "sentiment_track": "情绪偏热，追涨容错率下降。",
    "risk_level": "PRIORITY",
    "vix": 17.9,
    "fear_greed": 64,
    "tnx": 4.31,
    "timestamp": "2026-04-12T09:00:00.000Z"
  }'
```

读取 feed：

```bash
curl "http://localhost:3000/api/feed?category=ai&limit=5"
```

## 内容与数据

- 实时信号与精读文刊保存在 SQLite：`DATABASE_PATH`
- 静态文章保留在 `content/civilization-leap/`
- 数据库首次初始化时会写入一批 mock briefing 与 mock feed，方便本地直接预览界面

## 部署说明

- 项目已包含 `vercel.json`
- UI 与 API route 都能按标准 Next.js 项目部署
- 若要长期持久化机器人推送，建议使用本地或自托管 Node 环境配合 SQLite
