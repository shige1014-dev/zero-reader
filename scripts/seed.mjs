import nextEnv from "@next/env";
import { createClient } from "@libsql/client";
import path from "path";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

function pickEnv(...values) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

const db = createClient({
  url: pickEnv(process.env.TURSO_DATABASE_URL, process.env.LIBSQL_URL) ?? `file:${path.join(process.cwd(), "data", "obi.db")}`,
  authToken: pickEnv(process.env.TURSO_AUTH_TOKEN, process.env.LIBSQL_AUTH_TOKEN) ?? undefined
});

const today = new Date().toISOString().slice(0, 10);
const now = new Date().toISOString();

function dateOffset(days) {
  const value = new Date();
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

await db.batch(
  [
    {
      sql: `CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT NOT NULL UNIQUE,
        source TEXT NOT NULL,
        date TEXT NOT NULL,
        tags TEXT NOT NULL,
        zero_eval TEXT NOT NULL,
        summary TEXT NOT NULL DEFAULT '',
        recommend_level INTEGER NOT NULL,
        obi_ref TEXT NOT NULL,
        pushed_at TEXT,
        pushed_morning_at TEXT,
        pushed_evening_at TEXT,
        created_at TEXT NOT NULL,
        read_at TEXT
      )`,
      args: []
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS obi_cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        card_id TEXT NOT NULL,
        content TEXT NOT NULL,
        domain TEXT NOT NULL,
        layer TEXT NOT NULL,
        source TEXT NOT NULL,
        date TEXT NOT NULL
      )`,
      args: []
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        concept TEXT NOT NULL,
        explanation TEXT NOT NULL,
        example TEXT NOT NULL,
        source TEXT NOT NULL
      )`,
      args: []
    },
    { sql: "DELETE FROM articles", args: [] },
    { sql: "DELETE FROM obi_cards", args: [] },
    { sql: "DELETE FROM lessons", args: [] }
  ],
  "write"
);

const articles = [
  {
    title: "量子计算纠错突破后，产业化时间表是否前移",
    url: "http://arxiv.org/list/quant-ph/new",
    source: "Research Note",
    date: today,
    tags: JSON.stringify(["量子计算"]),
    zero_eval:
      "这类进展对长期产业方向是增量利好，但对二级市场定价的关键不在论文本身，而在资本开支、客户验证和商业化节点是否同步前移。若只有技术信号没有订单兑现，交易层更像预期抬升而不是基本面重估，需要防止把远期叙事当作当期现金流。",
    summary:
      "论文展示了更低错误率和更稳定的量子比特控制，但距离大规模容错计算仍需材料、制程与系统集成配合。作者强调下一阶段重点在可重复实验、吞吐量提升和成本下降，而非单次实验室纪录。",
    recommend_level: 5,
    obi_ref: "bf-004",
    pushed_at: null,
    pushed_morning_at: null,
    pushed_evening_at: null,
    created_at: now,
    read_at: null
  },
  {
    title: "AI 芯片供应链再扩产，先进封装瓶颈是否缓解",
    url: "http://www.nvidia.com/en-us/data-center/",
    source: "Semi Daily",
    date: today,
    tags: JSON.stringify(["AI芯片"]),
    zero_eval:
      "如果扩产集中在资本密集环节而非真正卡脖子的位置，市场容易先给出过度乐观定价。这里要拆分设备、材料、封装和客户结构，判断谁拿到了不可替代的利润池。真正值得高权重跟踪的是议价权是否提升，而不是行业新闻本身的热度。",
    summary:
      "报道梳理了封装厂、基板、HBM 与设备公司的扩产计划，指出新增产能多数将在未来两个季度释放。核心变量仍是良率和客户验证速度，若两者不达标，产能增加反而可能压缩产业链边际回报。",
    recommend_level: 4,
    obi_ref: "bf-001",
    pushed_at: null,
    pushed_morning_at: null,
    pushed_evening_at: null,
    created_at: now,
    read_at: null
  },
  {
    title: "核能链条融资改善，政策支持能否穿透到订单",
    url: "http://world-nuclear.org/",
    source: "Macro Grid",
    date: today,
    tags: JSON.stringify(["核能"]),
    zero_eval:
      "核能赛道的核心不是概念强弱，而是审批、融资和建设周期能否闭环。市场常在政策表态阶段提前给高估值，但真正重估要等项目落地和现金流路径明确。若融资成本下降却订单节奏未改善，股价上涨更像流动性推动而非价值兑现。",
    summary:
      "文章追踪了多个核能项目的融资窗口和政策支持条款，显示长期资金成本有所回落，但设备交付、许可和基础设施建设仍是推进速度的主要限制。项目回报率取决于订单转化，而不只是政策态度。",
    recommend_level: 3,
    obi_ref: "bf-005",
    pushed_at: null,
    pushed_morning_at: null,
    pushed_evening_at: null,
    created_at: now,
    read_at: null
  },
  {
    title: "美国通胀数据回落，宏观交易开始重新定价降息路径",
    url: "http://fred.stlouisfed.org/",
    source: "Macro Desk",
    date: today,
    tags: JSON.stringify(["宏观"]),
    zero_eval:
      "单次数据改善不等于趋势确认，真正重要的是工资、服务项和金融条件是否同步松动。若市场只盯 headline 指标，很容易因为近因偏差高估一次数据的方向意义。投资上更该看资产之间的相对强弱是否开始一致，而不是只押单点宏观叙事。",
    summary:
      "报告指出 headline 通胀回落主要受能源与部分商品拖累，核心服务价格仍偏粘性。利率市场快速下修终端利率预期，但若就业与工资没有同步走弱，债券和成长资产的乐观定价可能过早。",
    recommend_level: 5,
    obi_ref: "bf-013",
    pushed_at: null,
    pushed_morning_at: null,
    pushed_evening_at: null,
    created_at: now,
    read_at: null
  },
  {
    title: "地缘风险升温后，大宗与军工资产的风险溢价如何变化",
    url: "http://www.csis.org/topics/defense-and-security",
    source: "Risk Monitor",
    date: today,
    tags: JSON.stringify(["地缘风险"]),
    zero_eval:
      "地缘风险最容易制造情绪性追价，但可持续收益通常只留给供给真正受扰动、且库存弹性有限的资产。读这类文章要分清事件冲击、预期交易和利润兑现三个阶段。若只是风险偏好瞬时收缩，没有供需硬约束，追高往往会被均值回归迅速吞掉。",
    summary:
      "文章比较了能源、贵金属和军工在多轮地缘事件中的定价路径，发现价格第一阶段由情绪驱动，第二阶段才由供需缺口和财政订单决定。真正有持续性的，是现金流受益明确且估值没有被提前打满的资产。",
    recommend_level: 4,
    obi_ref: "bf-010",
    pushed_at: null,
    pushed_morning_at: null,
    pushed_evening_at: null,
    created_at: now,
    read_at: null
  }
];

const lessons = [
  {
    date: dateOffset(0),
    concept: "Transformer架构",
    explanation:
      "Transformer 的关键不是名字，而是它把序列理解从逐步处理改成并行注意力计算。模型会根据上下文给不同词不同权重，所以能在更长文本中保持语义关联。对投资者来说，真正重要的是它解释了为什么算力、数据和上下文窗口会直接影响产品能力与成本结构。",
    example: "大模型做财报问答时，会把管理层指引、利润率变化和行业词汇一起纳入上下文，而不是按句子机械扫描。",
    source: "https://arxiv.org/abs/1706.03762"
  },
  {
    date: dateOffset(1),
    concept: "LLM基础",
    explanation:
      "LLM 本质上是通过海量文本训练得到的概率预测系统，它不是数据库，而是根据上下文生成最可能的下一个 token。理解这一点后，你会知道模型擅长模式归纳、摘要和重写，不擅长天然保证事实正确。投资判断里，LLM 更像高效分析员，不是最终拍板者。",
    example: "你可以让模型快速拆一篇芯片产业报道的核心变量，但是否下注仍要回到订单、估值和竞争格局。",
    source: "https://arxiv.org/abs/2005.14165"
  },
  {
    date: dateOffset(2),
    concept: "RAG检索增强生成",
    explanation:
      "RAG 的意义在于把模型的生成能力和外部知识库结合，让答案建立在可更新资料之上。它解决的不是模型智商，而是记忆时效和引用可靠性。对投资系统尤其重要，因为市场信息是强时效数据，脱离检索的答案很容易过期却说得像真的。",
    example: "问模型某家公司最新指引时，RAG 会先抓取最新财报和电话会纪要，再让模型基于材料总结，而不是单凭旧训练记忆作答。",
    source: "https://arxiv.org/abs/2005.11401"
  },
  {
    date: dateOffset(3),
    concept: "Agent工作流",
    explanation:
      "Agent 不是会说话的提示词，而是带有目标、工具和执行步骤的系统。它的价值在于把复杂任务拆成可验证步骤，例如抓数据、归纳、生成报告、写回数据库。对投资场景，Agent 的优势不是预测市场，而是让信息管道更稳定、可追踪、可复盘。",
    example: "一个市场 Agent 可以早上先抓新闻，再做赛道分类，最后只把高价值文章推送到精读台。",
    source: "https://www.anthropic.com/engineering/building-effective-agents"
  },
  {
    date: dateOffset(4),
    concept: "FinGPT",
    explanation:
      "FinGPT 的启发不在于某个具体模型，而在于金融语料和任务适配能显著改变模型输出质量。通用模型知道世界很多事，但未必知道金融文本里的隐含语义。对投资研究，关键是建立自己的语料、标签和反馈闭环，而不是只调用通用 API 然后期待神奇 alpha。",
    example: "同样是新闻摘要，针对财报、产业链和政策文本调优后的模型更能识别利润驱动和风险因子。",
    source: "https://arxiv.org/abs/2306.06031"
  },
  {
    date: dateOffset(5),
    concept: "强化学习",
    explanation:
      "强化学习适合连续决策和延迟反馈场景，但金融里最难的是环境不稳定。历史上有效的策略在新 regime 里可能迅速失效，所以不要把强化学习理解成自动赚钱机器。更务实的用法是把它当作仓位调整或执行优化工具，而不是替代基本面研究。",
    example: "在组合层面，它更适合学习何时减小交易冲击、如何在约束下执行，而不是直接预测明天涨跌。",
    source: "https://www.deepmind.com/learning-resources/-introduction-to-reinforcement-learning-with-david-silver"
  },
  {
    date: dateOffset(6),
    concept: "预测市场",
    explanation:
      "预测市场把观点转成有价格的下注，因此比社交媒体意见更接近真实概率表达。它并不总是正确，但很擅长聚合分散信息。对投资者，预测市场更像前哨站，用来观测预期分布和突发事件概率，而不是直接替代资产定价模型。",
    example: "政策、选举或监管事件临近时，预测市场价格变化往往比传统新闻标题更早反映集体预期转向。",
    source: "https://www.overcomingbias.com/prediction-markets"
  },
  {
    date: dateOffset(7),
    concept: "Prompt工程",
    explanation:
      "Prompt 工程不是把问题写得华丽，而是给模型明确角色、上下文、输出格式和评判标准。好提示词的目标是降低歧义，提升稳定性。对于投资研究，结构化提示词能显著减少空话，让模型更像严格分析员，而不是热闹但没用的聊天对象。",
    example: "要求模型按“结论、依据、反例、风险、待验证点”输出，比让它自由发挥更适合研究工作流。",
    source: "https://platform.openai.com/docs/guides/prompt-engineering"
  },
  {
    date: dateOffset(8),
    concept: "MCP",
    explanation:
      "MCP 的核心价值是让模型通过统一接口读写外部工具和资源。这样做不是为了炫技，而是为了把数据源、数据库和执行动作纳入同一协议。对于投资系统，MCP 代表的是可扩展的基础设施层，让研究 Agent 能稳定接入知识库、行情和推送通道。",
    example: "同一个分析流程可以通过 MCP 读取文章数据库、检索 OBI 卡片，再把结论写回精读台。",
    source: "https://modelcontextprotocol.io/introduction"
  },
  {
    date: dateOffset(9),
    concept: "多Agent协作",
    explanation:
      "多 Agent 不等于开更多窗口，而是把不同职责明确分工，例如抓取、筛选、评审和写作。真正的价值来自减少上下文拥堵和提升可验证性。对投资场景，好的多 Agent 系统能把信息洪流拆成稳定流水线，让每一步都更容易复盘和修正。",
    example: "一个抓取 Agent 负责搜集新闻，另一个评审 Agent 专门给出投资权重，最后由写作 Agent 生成日报。",
    source: "https://www.anthropic.com/engineering/building-effective-agents"
  },
  {
    date: dateOffset(10),
    concept: "Agent风险控制",
    explanation:
      "一旦模型开始调用工具，风险就从“说错话”升级成“做错事”。因此 Agent 系统必须有权限边界、输出校验和人工审阅节点。金融研究里尤其如此，因为错误信息会直接污染决策。好的系统不是让模型更自由，而是在关键动作前设置足够硬的护栏。",
    example: "允许模型写草稿和候选推送，但最终入库或发出晨报前仍要通过规则校验和人工确认。",
    source: "https://www.anthropic.com/engineering/building-effective-agents"
  },
  {
    date: dateOffset(11),
    concept: "AI产品与投资映射",
    explanation:
      "真正重要的不是 AI 能不能做很多事，而是哪些能力能形成可收费、可复制、可防守的商业模式。投资视角要同时看模型能力、分发入口、数据优势和单位经济性。只看模型分数，往往会忽略利润池最后落在应用、平台还是基础设施。",
    example: "同样受益于大模型浪潮，云厂商、芯片、数据服务和垂直应用的估值逻辑完全不同。",
    source: "https://a16z.com/ai-canon/"
  }
];

for (const article of articles) {
  await db.execute({
    sql: `INSERT INTO articles (
      title, url, source, date, tags, zero_eval, summary, recommend_level, obi_ref,
      pushed_at, pushed_morning_at, pushed_evening_at, created_at, read_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      article.title,
      article.url,
      article.source,
      article.date,
      article.tags,
      article.zero_eval,
      article.summary,
      article.recommend_level,
      article.obi_ref,
      article.pushed_at,
      article.pushed_morning_at,
      article.pushed_evening_at,
      article.created_at,
      article.read_at
    ]
  });
}

await db.execute({
  sql: `INSERT INTO obi_cards (card_id, content, domain, layer, source, date)
    VALUES (?, ?, ?, ?, ?, ?)`,
  args: [
    "bf-001",
    "确认偏误会让你主动搜集支持自己仓位的证据，并把反例当噪音过滤掉。",
    "通用",
    "01_BODY",
    "行为金融",
    today
  ]
});

for (const lesson of lessons) {
  await db.execute({
    sql: "INSERT INTO lessons (date, concept, explanation, example, source) VALUES (?, ?, ?, ?, ?)",
    args: [lesson.date, lesson.concept, lesson.explanation, lesson.example, lesson.source]
  });
}

console.log(`seeded ${articles.length} articles, 1 obi card, ${lessons.length} lessons`);
