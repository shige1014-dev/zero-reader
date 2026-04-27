export type LearningCourseId = "economics" | "investing" | "ai-long-course";

export interface LearningUnit {
  concept: string;
  question: string;
  definition: string;
  mechanism: string;
  example: string;
  misconception: string;
  practice: string;
  reviewPrompt: string;
}

export interface LearningCourse {
  id: LearningCourseId;
  title: string;
  subtitle: string;
  cadence: string;
  scientificMethod: string[];
  units: LearningUnit[];
  imageFocus: string;
}

export interface LearningDeepDive {
  title: string;
  whyItMatters: string;
  suggestedPath: string;
}

export interface LearningPaper {
  title: string;
  source: string;
  year: number;
  url: string;
  primaryCourseId: LearningCourseId;
  tags: Array<"赚钱系统" | "AI执行系统" | "认知跃迁系统">;
  difficulty: "入门" | "进阶" | "硬核";
  summary: string;
  modelDigest: string;
  reasonToRead: string;
  studyPrompt: string;
}

export interface LearningTailSummary {
  zeroSummary: string;
  deepDives: LearningDeepDive[];
  frontierPapers: LearningPaper[];
}

export const LEARNING_COURSES: LearningCourse[] = [
  {
    id: "economics",
    title: "经济学",
    subtitle: "从个人判断进入宏观结构：供需、货币、周期、制度和产业。",
    cadence: "每日 25 分钟，先模型后现实案例。",
    scientificMethod: ["先学变量", "再学机制", "最后用真实事件反推模型"],
    imageFocus: "a causal map of supply, demand, interest rates, credit cycle, inflation and productivity",
    units: [
      {
        concept: "供需曲线",
        question: "价格变化到底来自需求、供给，还是预期？",
        definition: "供需曲线是用价格和数量描述市场如何清算的基础模型，重点不是画线，而是判断哪一侧先发生位移。",
        mechanism: "需求上移通常推高成交量和价格；供给收缩可能推高价格但压低数量；预期变化会提前改变库存、订单和报价行为。",
        example: "油价上涨可能来自需求复苏，也可能来自供给中断，两者对航空、化工和能源股的含义完全不同。",
        misconception: "不要把价格上涨自动解释为需求强，供给短缺也能造成同样结果。",
        practice: "用三栏拆一个商品：需求弹性、供给约束、价格传导。",
        reviewPrompt: "今天看到一个价格变化时，先写出需求解释和供给解释各一条。"
      },
      {
        concept: "货币与信用",
        question: "为什么降息不等于资产一定上涨？",
        definition: "货币是流动性价格的源头，信用是流动性进入实体和资产市场的通道，两者方向一致时影响才更强。",
        mechanism: "央行降息降低无风险利率，但银行是否扩表、企业是否借款、居民是否消费，决定宽松能否传导到利润和估值。",
        example: "衰退期降息可能伴随盈利下修，估值扩张会被利润下降抵消。",
        misconception: "不要把降息当成单变量利好，必须同时看信用扩张和盈利周期。",
        practice: "画出央行利率、银行信用、企业现金流、资产估值的传导链。",
        reviewPrompt: "复盘一轮降息预期，写出利率、信用、盈利三条线是否同向。"
      },
      {
        concept: "周期",
        question: "扩张、过热、衰退、复苏分别看什么领先指标？",
        definition: "周期是经济变量围绕长期趋势反复偏离和回归的过程，核心在于识别阶段，而不是预测单个数据点。",
        mechanism: "库存、订单、就业、通胀和利率通常不同步变化，领先指标先转向，同步指标确认，滞后指标最后反应。",
        example: "PMI 新订单回升但失业率仍高，可能是复苏早期而不是衰退延续。",
        misconception: "不要用滞后数据否定早期拐点，也不要用单个领先指标直接下结论。",
        practice: "把 PMI、失业率、收益率曲线和库存变化放入同一时间轴。",
        reviewPrompt: "给当前宏观环境标一个阶段，并写出支持和反驳证据。"
      },
      {
        concept: "产业结构",
        question: "增长来自总量扩张，还是利润池重新分配？",
        definition: "产业结构研究的是价值链中谁控制资源、谁承担成本、谁获得利润，而不是只看行业规模增长。",
        mechanism: "当需求扩张时，利润通常流向瓶颈环节；当供给过剩时，议价权转向渠道、品牌或低成本生产者。",
        example: "AI 算力扩张不只利好芯片，也可能把利润分给先进封装、液冷、电力和数据中心运营。",
        misconception: "不要把大行业等同于好生意，利润池位置比市场规模更关键。",
        practice: "选一个行业，拆分上游议价权、中游产能、下游需求。",
        reviewPrompt: "分析一个行业时，先写出价值链里最稀缺的环节。"
      }
    ]
  },
  {
    id: "investing",
    title: "投资学",
    subtitle: "从信息消费转成决策训练：估值、组合、风险、财报和纪律。",
    cadence: "每日 30 分钟，先框架后复盘。",
    scientificMethod: ["先定义可证伪假设", "再找关键变量", "最后记录决策质量"],
    imageFocus: "a decision framework linking valuation, moat, cash flow, position sizing, risk and review loops",
    units: [
      {
        concept: "估值不是价格预测",
        question: "现金流、增长率、折现率分别变化时，估值怎么动？",
        definition: "估值是把未来现金流、增长和风险折现到今天的过程，它输出的是假设范围，不是短期价格预测。",
        mechanism: "现金流决定分子，增长率改变远期空间，折现率改变未来价值的权重；高久期资产对利率更敏感。",
        example: "同样是 AI 公司，稳定现金流的软件平台和高资本开支的数据中心，估值驱动因素完全不同。",
        misconception: "不要因为股价上涨就说估值合理，也不要因为市盈率低就说便宜。",
        practice: "用同一家公司做高、中、低三组假设，不写买卖结论。",
        reviewPrompt: "写出一个估值结论背后的三个关键假设。"
      },
      {
        concept: "安全边际",
        question: "什么错误会让好公司变成坏投资？",
        definition: "安全边际是价格、质量和不确定性之间的缓冲，不只是买得便宜，更是承认自己可能判断错。",
        mechanism: "当估值、盈利质量和竞争优势都留有余地时，单个假设出错不会立刻摧毁整个投资逻辑。",
        example: "高质量公司如果用过高增长率定价，一旦增速回落，估值压缩会吞掉基本面优势。",
        misconception: "不要把安全边际理解成低价股，低价可能只是坏生意的补偿。",
        practice: "列出三个会推翻投资假设的事实，而不是三个看多理由。",
        reviewPrompt: "每个标的写一句：我最可能错在哪里？"
      },
      {
        concept: "组合构建",
        question: "你承担的是单一公司风险，还是同一个宏观风险？",
        definition: "组合构建是把多个判断放进同一个风险预算里，目标不是持有更多名字，而是避免同一种错误集中爆发。",
        mechanism: "表面分散的资产可能共享利率、美元、油价或 AI 资本开支风险；真正分散要看利润来源和风险因子。",
        example: "芯片、数据中心、电力设备可能都是 AI capex 同一条链，组合里相关性比行业标签更高。",
        misconception: "不要用股票数量衡量分散度，要用风险来源衡量。",
        practice: "把持仓按利润来源、利率敏感度、周期位置重新分组。",
        reviewPrompt: "列出组合里前三个共同风险因子。"
      },
      {
        concept: "复盘系统",
        question: "赚钱是因为判断正确，还是因为承担了未识别风险？",
        definition: "复盘系统是把决策前的假设和决策后的结果对齐，目的是改进判断过程，而不是事后解释输赢。",
        mechanism: "只有记录变量、时间窗口、反证条件和仓位理由，才能区分能力、运气和未识别风险。",
        example: "一次盈利如果来自估值扩张而不是你预期的利润兑现，复盘时应标为路径偏差。",
        misconception: "不要只复盘亏损，盈利同样可能暴露错误过程。",
        practice: "每次决策记录假设、变量、时间窗口和退出条件。",
        reviewPrompt: "复盘时先回答：结果对了，过程也对了吗？"
      }
    ]
  },
  {
    id: "ai-long-course",
    title: "AI 长期学习课程",
    subtitle: "从术语追逐转成长期能力：模型、Agent、RAG、工具链和产业映射。",
    cadence: "每日 35 分钟，技术理解和产业判断同步训练。",
    scientificMethod: ["先掌握抽象原理", "再做小型实验", "最后映射到生产率和商业结构"],
    imageFocus: "a long-term AI learning roadmap from transformers to agents, RAG, tools, evals and business workflows",
    units: [
      {
        concept: "Transformer 与规模化",
        question: "模型变大为什么会改变产品形态和成本结构？",
        definition: "Transformer 是让模型通过注意力机制处理上下文关系的架构，它把语言、代码和多模态任务统一到可规模化训练框架中。",
        mechanism: "参数、数据和算力扩大后，模型能力出现阶段性跃迁；但推理成本、延迟和数据质量会决定商业化边界。",
        example: "长上下文模型能改变研究和编程工作流，但企业是否采用取决于成本、权限和可靠性。",
        misconception: "不要把模型更大等同于产品更好，真实价值来自工作流集成。",
        practice: "把训练、推理、数据、分发四个环节画成成本地图。",
        reviewPrompt: "解释一个 AI 产品时，先写出它依赖训练成本还是推理成本。"
      },
      {
        concept: "Agent 工作流",
        question: "什么时候需要 Agent，什么时候普通自动化就够？",
        definition: "Agent 是能围绕目标进行观察、计划、调用工具、检查结果并迭代的系统，不等于简单聊天机器人。",
        mechanism: "Agent 的价值来自把模型能力接入工具和状态管理；失败点通常在目标分解、权限边界、校验和长任务记忆。",
        example: "自动整理研究报告需要搜索、读取、摘录、交叉验证和输出格式控制，比单次问答更适合 Agent。",
        misconception: "不要把所有自动化都做成 Agent，规则稳定的任务用脚本更可靠。",
        practice: "拆一个真实任务：观察、计划、工具调用、校验、交付。",
        reviewPrompt: "判断一个任务是否需要 Agent：是否有多步、工具和反馈循环？"
      },
      {
        concept: "RAG 与记忆",
        question: "检索增强解决的是事实问题，还是工作流问题？",
        definition: "RAG 是让模型先检索外部知识，再基于检索内容生成答案的方式，用来降低幻觉并接入私有数据。",
        mechanism: "效果取决于切分、索引、召回、排序和引用约束；检索不到、检索错、上下文过长都会让答案变差。",
        example: "公司内部知识库问答需要权限过滤和来源引用，否则模型可能混合不同版本文档。",
        misconception: "不要以为接入向量库就可靠，评估集和引用校验同样重要。",
        practice: "设计一个知识库问答流程，标出失败点和评估指标。",
        reviewPrompt: "给一个 RAG 系统写出三个评估指标：命中率、引用准确率、答案可用率。"
      },
      {
        concept: "AI 产业映射",
        question: "技术能力如何转成付费、留存、毛利或生产率？",
        definition: "AI 产业映射是把技术进步翻译成商业变量，判断它改善的是收入、成本、留存、毛利还是资本效率。",
        mechanism: "模型能力先进入产品体验，再影响使用频率、替代成本和付费意愿，最后才反映到财务指标。",
        example: "代码生成模型可能提高开发效率，但商业价值要看席位扩张、企业续费和推理成本下降。",
        misconception: "不要把技术演示当作商业验证，真正的验证来自客户行为和财务数据。",
        practice: "用一条 AI 新闻拆成能力提升、商业转化、验证指标。",
        reviewPrompt: "看到 AI 新闻时，写出它最先改变的一个财务或运营指标。"
      }
    ]
  }
];

export function getLearningCourse(id: string): LearningCourse | null {
  return LEARNING_COURSES.find((course) => course.id === id) ?? null;
}

export function buildLearningImagePrompt(course: LearningCourse): string {
  const concepts = course.units.map((unit) => unit.concept).join(", ");

  return [
    "Create an educational infographic for a serious Chinese learning dashboard.",
    `Topic: ${course.title}.`,
    `Core framework: ${course.imageFocus}.`,
    `Concepts to include: ${concepts}.`,
    "Style: dark academic interface, clear hierarchy, thin lines, labeled modules, no decorative clutter.",
    "Keep it educational only: no market-timing calls, security recommendations, or trading instructions."
  ].join(" ");
}

const COURSE_SUMMARY_RULES: Record<
  LearningCourseId,
  { zeroSummary: string; deepDive: LearningDeepDive }
> = {
  economics: {
    zeroSummary:
      "经济学这条线的目标不是记术语，而是训练你把价格、利率、信用、周期和产业结构放进同一张因果图里，避免只看表面波动。",
    deepDive: {
      title: "把宏观变量画成因果链",
      whyItMatters: "你真正需要的不是更多新闻，而是看见价格背后的供需、信用和制度传导。",
      suggestedPath: "先复盘供需与货币，再把当前市场事件放进周期阶段和产业结构里。"
    }
  },
  investing: {
    zeroSummary:
      "投资学这条线的目标不是追求更多观点，而是把假设、仓位、风险和复盘连成一个决策系统，让每次判断都有代价、有边界、能修正。",
    deepDive: {
      title: "把观点改造成可复盘决策",
      whyItMatters: "真正拉开差距的不是知道更多，而是知道为什么买、什么时候错、错了怎么收缩。",
      suggestedPath: "先写估值假设和反证条件，再把风险因子和仓位规则绑定到同一份决策记录。"
    }
  },
  "ai-long-course": {
    zeroSummary:
      "AI 长期学习的目标不是追逐新名词，而是把模型、Agent、RAG、工具链和产业映射连成生产率系统，最终转成现实执行力。",
    deepDive: {
      title: "把技术理解压成工作流能力",
      whyItMatters: "只有当技术能力映射到任务拆解、工具调用和商业变量时，AI 才会从资讯变成杠杆。",
      suggestedPath: "先掌握 Transformer、Agent、RAG 三层抽象，再对应到真实工作流和商业验证。"
    }
  }
};

export const LEARNING_FRONTIER_PAPERS: LearningPaper[] = [
  {
    title: "Attention Is All You Need",
    source: "NeurIPS",
    year: 2017,
    url: "https://arxiv.org/abs/1706.03762",
    primaryCourseId: "ai-long-course",
    tags: ["AI执行系统", "认知跃迁系统"],
    difficulty: "进阶",
    summary:
      "这篇论文定义了 Transformer 架构，让语言、代码和多模态任务进入可规模化训练时代，是今天大模型能力跃迁的底层起点。",
    modelDigest:
      "免费模型整理结果：先抓住 self-attention 如何提升并行性，再理解这为什么会重写模型成本、上下文能力和产品形态。",
    reasonToRead:
      "如果你想理解为什么上下文、算力和推理成本会改变产品形态，这篇论文是所有后续 AI 工作流的源头。",
    studyPrompt:
      "先看 self-attention 为什么替代循环结构，再问这种并行化能力如何改变研究、编程和内容生产。"
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    source: "NeurIPS",
    year: 2020,
    url: "https://arxiv.org/abs/2005.11401",
    primaryCourseId: "ai-long-course",
    tags: ["AI执行系统", "认知跃迁系统"],
    difficulty: "进阶",
    summary:
      "RAG 把检索系统和生成模型结合，核心不是让模型更会说，而是让回答建立在可更新的外部知识之上，降低幻觉和时效性错误。",
    modelDigest:
      "免费模型整理结果：这篇论文最适合被当成知识系统工程读，而不是 NLP 细节论文。重点看检索、引用和上下文窗口怎么相互制约。",
    reasonToRead:
      "你后面只要做知识库、研究助手或学习台资料整理，都会遇到检索、引用和上下文窗口的现实边界。",
    studyPrompt:
      "读的时候重点看 retrieval 与 generation 的接口，再思考怎样把它映射到零零的知识库和学习台补充资料。"
  },
  {
    title: "Language Models are Few-Shot Learners",
    source: "NeurIPS",
    year: 2020,
    url: "https://arxiv.org/abs/2005.14165",
    primaryCourseId: "ai-long-course",
    tags: ["AI执行系统", "认知跃迁系统"],
    difficulty: "入门",
    summary:
      "GPT-3 证明了规模化语言模型在少样本条件下就能展现跨任务能力，推动提示词工程与通用模型产品化成为主线。",
    modelDigest:
      "免费模型整理结果：把这篇论文当成提示词工程的起点去读，会比把它当参数崇拜材料更有用。",
    reasonToRead:
      "这篇论文帮助你理解为什么提示词设计、上下文组织和任务描述会成为 AI 执行系统的核心接口。",
    studyPrompt:
      "不要只盯参数量，重点看 few-shot 能力如何改变任务定义方式，以及为什么这会催生模板化工作流。"
  },
  {
    title: "The Simple Economics of AI",
    source: "NBER",
    year: 2024,
    url: "https://www.nber.org/papers/w32487",
    primaryCourseId: "economics",
    tags: ["赚钱系统", "认知跃迁系统"],
    difficulty: "入门",
    summary:
      "论文从经济学视角讨论 AI 如何改变任务分工、边际成本和生产率扩散，帮助把技术叙事翻译成工资、利润率和产业结构变化。",
    modelDigest:
      "免费模型整理结果：最值得看的不是它是否乐观，而是它如何把 AI 影响拆成任务、成本和收益分配三个层次。",
    reasonToRead:
      "如果你想判断 AI 到底改善了谁的收入、谁的成本、谁的议价权，这类论文能把热闹叙事压回经济变量。",
    studyPrompt:
      "读的时候把注意力放在任务替代、任务增强和收益分配，再回看你自己的工作流哪里最先被重写。"
  },
  {
    title: "Measuring Moat",
    source: "SSRN",
    year: 2023,
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4478495",
    primaryCourseId: "investing",
    tags: ["赚钱系统", "认知跃迁系统"],
    difficulty: "进阶",
    summary:
      "论文尝试把企业护城河从叙事概念转成可观察指标，帮助投资者把竞争优势、利润持续性和资本回报联系起来。",
    modelDigest:
      "免费模型整理结果：别把它当成现成选股器，而要把它当成“如何把好公司叙事翻译成验证指标”的练习样本。",
    reasonToRead:
      "你正在做长期判断系统，这类研究能把“好公司”从模糊印象压缩成更可验证的框架。",
    studyPrompt:
      "不要只看作者给出的指标，重点思考哪些变量能真正长期保护利润池，哪些只是短期表现。"
  }
];

export function buildLearningTailSummary(courses: LearningCourse[]): LearningTailSummary {
  const zeroSummary = [
    "零零总结",
    "今天这套学习不是为了收集更多信息，而是为了把经济学、投资学和 AI 理解压成一个可判断、可执行、可复盘的长期系统。"
  ].join("：");

  const deepDives = courses.map((course) => COURSE_SUMMARY_RULES[course.id].deepDive);
  const frontierPapers = LEARNING_FRONTIER_PAPERS.filter((paper) =>
    courses.some((course) => course.id === paper.primaryCourseId)
  );

  return {
    zeroSummary,
    deepDives,
    frontierPapers
  };
}
