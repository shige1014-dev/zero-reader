import type { Lesson } from "@/lib/types";
import { toHttpUrl } from "@/lib/utils";

interface DailyLessonProps {
  lesson: Lesson | null;
}

interface PromptPack {
  goal: string;
  system: string;
  user: string;
  takeaway: string;
}

function lessonWeek(id: number): string {
  const week = Math.ceil(id / 7);
  return `Week ${week}`;
}

function lessonInvestingMap(concept: string): string {
  if (concept.includes("Transformer")) {
    return "看懂 Transformer，才看得懂算力、窗口和推理成本。";
  }
  if (concept.includes("LLM")) {
    return "先分清模型能力和商业护城河。";
  }
  if (concept.includes("RAG")) {
    return "RAG 的关键不在检索，而在专有数据和工作流。";
  }
  return "把技术词翻译成产业位置和利润池。";
}

function lessonMisconception(concept: string): string {
  if (concept.includes("Transformer")) {
    return "误区：把它理解成“更聪明”，而不是“更适合规模化”。";
  }
  if (concept.includes("LLM")) {
    return "误区：流畅不等于正确。";
  }
  if (concept.includes("RAG")) {
    return "误区：接了检索就天然可靠。";
  }
  return "误区：只记术语，不建边界。";
}

function lessonExercise(concept: string): string {
  if (concept.includes("Transformer")) {
    return "用“数据/算力/分发”三栏拆一家公司。";
  }
  if (concept.includes("LLM")) {
    return "挑一条 AI 新闻，区分能力提升和商业提升。";
  }
  if (concept.includes("RAG")) {
    return "列一个必须依赖实时数据的场景。";
  }
  return "用一句话写出它对投资判断的用处。";
}

function lessonConclusion(concept: string): string {
  if (concept.includes("Transformer")) {
    return "先懂规模化，再判断谁受益。";
  }
  if (concept.includes("LLM")) {
    return "关键不是会什么，而是在哪稳定赚钱。";
  }
  if (concept.includes("RAG")) {
    return "没有高质量检索，生成式 AI 不可靠。";
  }
  return "会翻译成产业和利润池，才算学会。";
}

function lessonMemoryHook(concept: string): string {
  if (concept.includes("Transformer")) {
    return "记忆钩子：Transformer = 用更多算力换更强规模化。";
  }
  if (concept.includes("LLM")) {
    return "记忆钩子：LLM 强在生成，不天然强在事实。";
  }
  if (concept.includes("RAG")) {
    return "记忆钩子：RAG 的上限，取决于检索到什么。";
  }
  return "记忆钩子：先记用途，再记定义。";
}

function promptPack(concept: string): PromptPack {
  if (concept.includes("Transformer")) {
    return {
      goal: "把技术词翻译成产业判断",
      system: "你是产业研究助手。不要科普堆砌，只回答这项技术如何改变成本、速度、壁垒和利润分配。",
      user: `请用“技术变化 / 谁受益 / 谁受损 / 哪个指标最先验证 / 一个常见误判”五段，解释 ${concept} 对投资研究的意义。每段不超过两句。`,
      takeaway: "先限定输出结构，AI 才会从“会讲”变成“会判断”。"
    };
  }
  if (concept.includes("LLM")) {
    return {
      goal: "把模型能力拆成商业能力",
      system: "你是严格的商业分析助手。不要夸性能，只说明能力提升是否能转成付费、留存或毛利改善。",
      user: `围绕 ${concept}，输出“能力提升 / 商业转化 / 护城河真假 / 最该追踪的数据”四段，每段一句话。`,
      takeaway: "问 AI 时先盯利润池，能显著减少空话。"
    };
  }
  if (concept.includes("RAG")) {
    return {
      goal: "让 AI 给出工作流而不是空泛定义",
      system: "你是产品研究助手。只讨论数据质量、检索命中率、延迟和真实业务价值，不要重复教材定义。",
      user: `请把 ${concept} 拆成“适合场景 / 不适合场景 / 最关键的失败点 / 上线前要测试什么”四部分。`,
      takeaway: "提示词里写清边界条件，AI 才能给出可执行建议。"
    };
  }
  return {
    goal: "把知识点转成你和 AI 的共同练习",
    system: "你是认知教练。输出必须简洁、可验证、可执行，不要使用空泛鼓励。",
    user: `请围绕 ${concept}，生成一个“先提问 AI、再自己判断、最后做复盘”的三步练习，每步不超过两句。`,
    takeaway: "你不是把答案外包给 AI，而是借 AI 加快自己的判断闭环。"
  };
}

export function DailyLesson({ lesson }: DailyLessonProps): JSX.Element {
  if (!lesson) {
    return (
      <section className="section panel-grid-section">
        <h2 className="section-title">AI每日学习</h2>
        <div className="empty-state">今日课程尚未写入。</div>
      </section>
    );
  }

  return (
    <section className="section panel-grid-section">
      <h2 className="section-title">AI每日学习</h2>
      <article className="lesson-card panel-card">
        <div className="lesson-head">
          <div className="article-meta">
            <span className="chip chip-track">5分钟</span>
            <span className="chip">{lesson.date}</span>
            <span className="chip chip-gold">LESSON</span>
            <span className="chip">{lessonWeek(lesson.id)}</span>
            <span className="chip">No. {lesson.id}</span>
          </div>
          <div className="lesson-kicker">AI LEARNING / ZEROZERO ACADEMY</div>
        </div>
        <h3 className="lesson-title">{lesson.concept}</h3>
        <p className="lesson-text">{lesson.explanation}</p>
        <div className="lesson-grid">
          <div className="lesson-grid-item">
            <div className="lesson-grid-key">一句话结论</div>
            <div className="lesson-grid-value">{lessonConclusion(lesson.concept)}</div>
          </div>
          <div className="lesson-grid-item">
            <div className="lesson-grid-key">今天学会什么</div>
            <div className="lesson-grid-value">{lessonMemoryHook(lesson.concept)}</div>
          </div>
          <div className="lesson-grid-item">
            <div className="lesson-grid-key">案例</div>
            <div className="lesson-grid-value">{lesson.example}</div>
          </div>
          <div className="lesson-grid-item">
            <div className="lesson-grid-key">投资映射</div>
            <div className="lesson-grid-value">{lessonInvestingMap(lesson.concept)}</div>
          </div>
          <div className="lesson-grid-item">
            <div className="lesson-grid-key">误区</div>
            <div className="lesson-grid-value">{lessonMisconception(lesson.concept)}</div>
          </div>
          <div className="lesson-grid-item">
            <div className="lesson-grid-key">今日练习</div>
            <div className="lesson-grid-value">{lessonExercise(lesson.concept)}</div>
          </div>
        </div>
        <div className="article-subsection">
          <div className="article-subtitle">与AI一起进步</div>
          <p className="article-subtext">{promptPack(lesson.concept).takeaway}</p>
          <div className="prompt-card">
            <div className="prompt-row">
              <span className="prompt-label">目标</span>
              <p className="prompt-text">{promptPack(lesson.concept).goal}</p>
            </div>
            <div className="prompt-row">
              <span className="prompt-label">System</span>
              <p className="prompt-text">{promptPack(lesson.concept).system}</p>
            </div>
            <div className="prompt-row">
              <span className="prompt-label">User</span>
              <p className="prompt-text">{promptPack(lesson.concept).user}</p>
            </div>
          </div>
        </div>
        <div className="lesson-source">
          来源：
          <a href={toHttpUrl(lesson.source)} rel="noreferrer" target="_blank">
            {toHttpUrl(lesson.source)}
          </a>
        </div>
      </article>
    </section>
  );
}
