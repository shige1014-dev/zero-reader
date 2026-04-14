import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const VAULT_PATH = process.env.VAULT_PATH ??
  path.join(process.env.HOME ?? '', 'zerozero-work/ZERO_V4/01_BODY')

export type VaultCard = {
  id: string
  title: string
  summary: string
  topic: string
  hall: string
  weight: number
  confidence: number
  tags: string[]
  updated_at: string
}

function walkDir(dir: string, cards: VaultCard[]) {
  if (!fs.existsSync(dir)) return
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkDir(fullPath, cards)
      } else if (entry.name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8')
          const { data } = matter(content)
          if (data.title && data.summary) {
            const hall = fullPath.replace(VAULT_PATH + '/', '').split('/')[0]
            cards.push({
              id: data.id ?? entry.name.replace('.md', ''),
              title: data.title,
              summary: data.summary,
              topic: data.topic ?? '',
              hall,
              weight: Number(data.weight ?? 0.5),
              confidence: Number(data.confidence ?? 0.8),
              tags: Array.isArray(data.tags) ? data.tags : [],
              updated_at: String(data.updated_at ?? ""),
            })
          }
        } catch {}
      }
    }
  } catch {}
}

export function readVaultCards(opts: {
  hall?: string
  tag?: string
  limit?: number
} = {}): VaultCard[] {
  const cards: VaultCard[] = []
  const halls = opts.hall
    ? [opts.hall]
    : ['hall_knowledge']

  for (const h of halls) {
    walkDir(path.join(VAULT_PATH, h), cards)
  }

  let result = cards.sort((a, b) => b.weight - a.weight)
  if (opts.tag) result = result.filter(c => c.tags.includes(opts.tag!))
  return result.slice(0, opts.limit ?? 20)
}

const TAG_MAP: Record<string, string> = {
  knowledge_card:"知识卡",failure_patterns:"失败模式",investing:"投资",
  track_error:"轨道错误","track-error":"轨道错误",anti_pattern:"反模式",
  capital_allocation:"资本配置",warning:"警告",framework:"框架",
  meta_cognition:"元认知",historical_crashes:"历史崩盘",market_failure:"市场失效",
  three_track:"三轨",cursor_signal:"游标信号",behavioral_finance:"行为金融",
  ancient_wisdom:"古典智慧",laozi:"老子",meta_philosophy:"元哲学",
  reversal:"逆转",three_track_foundation:"三轨基础",confidence:"置信度",
  calibration:"校准",scope:"范围",sticky:"固化","single-track":"单轨",
  consistency:"一致性","reference-web":"参照网",speaking:"表达",
  success:"成功","short-answer":"短答",presence:"在场",
  "final-shape":"最终形态",action:"行动",ai:"AI",anchor:"锚点",
  anomaly:"异动",apathy:"冷漠","application-layer":"应用层",
  bearing:"承压",bottleneck:"瓶颈",boundary:"边界",
  "branch-misread":"分支误读",capacity:"容量","capital-cycle":"资本周期",
  carry:"持有",change_philosophy:"变化哲学",civilization:"文明跃迁",
  close:"收盘",closure:"关闭",commitment:"承诺",completion:"完成",
  "compressed-situational":"压缩情境",compression:"压缩",conflict:"冲突",
  consensus:"共识",constraint:"约束",consultant:"顾问",continuity:"连续性",
  "core-edge":"核心边缘","counter-signal":"反信号",crowd:"人群",
  density:"密度",disbelief:"不信",distancing:"距离感",drift:"漂移",
  "early-window":"早期窗口",earth:"地轨","earth-track":"地轨",
  earth_track:"地轨",emergence:"涌现","energy-transition":"能源转型",
  execution:"执行",expansion:"扩张",failure:"失败",
  false_convergence:"假收敛","false-convergence":"假收敛",fed:"美联储",
  "field-boundary":"场域边界",fomo:"FOMO",forming:"形成",fracture:"断裂",
  friction:"摩擦",growth:"增长",guiguzi:"鬼谷子","heaven-track":"天轨",
  heaven_track:"天轨",historical_cases:"历史案例",history:"历史",
  human:"人轨","human-track":"人轨",human_nature:"人性",human_track:"人轨",
  identity:"身份",imprint:"印记",index:"指数",infrastructure:"基础设施",
  invalidated:"已失效",invalidation:"失效条件",invocation:"召唤",
  judgment:"判断","late-cycle":"晚周期","late-phase":"晚期",
  "live-map":"实时图谱",local:"局部",macro:"宏观",market:"市场",
  market_psychology:"市场心理",memory:"记忆",metaverse:"元宇宙",
  "mid-cycle":"中周期","middle-state":"中间态",minimal:"极简",
  mirror:"镜像",model:"模型",narrative:"叙事",node:"节点",
  "node-path":"节点路径",node_review:"节点复盘",normalization:"正常化",
  organization:"组织",output:"输出",overheat:"过热",overstatement:"夸大",
  panic:"恐慌",paradigm:"范式",persuasion:"说服",phase:"阶段",
  philosophical_foundation:"哲学基础",preference:"偏好",product:"产品",
  quantum:"量子",realignment:"重新对齐",rebound:"反弹",recap:"回顾",
  reflexive:"反射",regulation:"监管",relationship:"关系",repair:"修复",
  repeatability:"可重复性",repetition:"重复","report-style":"报告体",
  "resource-flow":"资源流",scale:"规模","schema-leak":"模式泄漏",
  "schema-translation":"模式转译",semiconductor:"半导体",semiconductors:"半导体",
  silence:"沉默",softness:"柔软",specificity:"精确性",stale:"陈旧",
  "standard-answer":"标准答案",strategy:"策略",structural_advantage:"结构优势",
  structure:"结构",substitution:"替代",sunzi:"孙子",system:"系统",
  tariff:"关税",technology:"技术",temporal:"时序",threshold:"阈值",
  throughput:"吞吐量",timing:"时机",track_model:"轨道模型",transition:"转变",
  trigger:"触发",wisdom:"智慧","true-node":"真节点",turnaround:"转折",
  validated:"已验证",validation:"验证",verifier:"验证者",warmth:"温度",
  "weak-point":"弱点","weak-track":"弱轨","weakest-point":"最弱点",
  "weakest-track":"最弱轨",weakness:"弱点",window:"窗口",
  "window-closure":"窗口关闭","window-reopen":"窗口重开",
  yijing:"易经",zhanguoce:"战国策",signal:"信号",review:"复盘",
  risk:"风险",position:"持仓",runtime:"运行时",seed:"种子",
  expression:"表达",knowledge:"知识","high-risk":"高风险",
  compulsion:"强迫",capital_allocation_essence:"资本配置本质",
  market_framework:"市场框架",three_track_foundation:"三轨基础",
}
export function translateTag(t: string): string { return TAG_MAP[t] ?? t }
