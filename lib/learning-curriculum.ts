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

export const LEARNING_COURSE_META: Array<Omit<LearningCourse, "units">> = [
  {
    id: "economics",
    title: "经济学",
    subtitle: "从个人判断进入宏观结构：供需、货币、周期、制度和产业。",
    cadence: "每日 25 分钟，先模型后现实案例。",
    scientificMethod: ["先学变量", "再学机制", "最后用真实事件反推模型"],
    imageFocus: "a causal map of supply, demand, interest rates, credit cycle, inflation and productivity"
  },
  {
    id: "investing",
    title: "投资学",
    subtitle: "从信息消费转成决策训练：估值、组合、风险、财报和纪律。",
    cadence: "每日 30 分钟，先框架后复盘。",
    scientificMethod: ["先定义可证伪假设", "再找关键变量", "最后记录决策质量"],
    imageFocus: "a decision framework linking valuation, moat, cash flow, position sizing, risk and review loops"
  },
  {
    id: "ai-long-course",
    title: "AI 长期学习课程",
    subtitle: "从术语追逐转成长期能力：模型、Agent、RAG、工具链和产业映射。",
    cadence: "每日 35 分钟，技术理解和产业判断同步训练。",
    scientificMethod: ["先掌握抽象原理", "再做小型实验", "最后映射到生产率和商业结构"],
    imageFocus: "a long-term AI learning roadmap from transformers to agents, RAG, tools, evals and business workflows"
  }
];

export const LEARNING_COURSES: LearningCourse[] = LEARNING_COURSE_META.map((meta) => ({
  ...meta,
  units: []
}));

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
