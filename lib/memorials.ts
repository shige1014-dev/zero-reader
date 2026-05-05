export type MemorialStatus = "draft" | "poster-ready" | "archived";
export type MemorialCollection = "workflow" | "photo-stock" | "future-world" | "imagination";

export interface MemorialEntry {
  date: string;
  week: string;
  collection: MemorialCollection;
  title: string;
  theme: string;
  image?: string;
  worklog: string[];
  history: string;
  essay: string[];
  posterBrief: string;
  status: MemorialStatus;
}

export function getMemorialSlug(entry: MemorialEntry) {
  return entry.date;
}

export function getMemorialHref(entry: MemorialEntry) {
  return `/memorials/${getMemorialSlug(entry)}`;
}

export function getMemorialBySlug(slug: string) {
  return MEMORIAL_ENTRIES.find((entry) => getMemorialSlug(entry) === slug);
}

export const MEMORIAL_STATUS_LABEL: Record<MemorialStatus, string> = {
  draft: "日记草稿",
  "poster-ready": "可做海报",
  archived: "已归档"
};

export const MEMORIAL_COLLECTIONS: Record<MemorialCollection, {
  label: string;
  en: string;
  purpose: string;
}> = {
  workflow: {
    label: "工作流板块",
    en: "AI WORKFLOW",
    purpose: "记录学习 AI、使用 AI、改造工作流的过程。重点不是炫技，而是看能力如何一点点变强。"
  },
  "photo-stock": {
    label: "照相库存",
    en: "IMAGE STOCK",
    purpose: "保存已经生成或值得复用的图像素材、封面、视觉母题和风格参考，作为后续周刊与海报的素材库。"
  },
  "future-world": {
    label: "未来世界畅想馆",
    en: "FUTURE WORLD",
    purpose: "基于逻辑推演去想象未来生活模式、工作方式、组织形态和世界模型。重点是可信的未来。"
  },
  imagination: {
    label: "光怪陆离想象馆",
    en: "WILD IMAGINATION",
    purpose: "把想象力推到最大，生成超越常识和日常经验的图，用来扩充思维边界。"
  }
};

export const MEMORIAL_WORKFLOW = [
  {
    step: "01",
    title: "Daily Capture",
    label: "每日截面",
    body: "当天只记录事实：做了什么、为什么重要、哪一个瞬间值得留下。"
  },
  {
    step: "02",
    title: "Weekly Poster",
    label: "周刊海报",
    body: "每周挑选 3-5 个节点，交给 GPT 做图能力生成封面、跨页或时间线海报。"
  },
  {
    step: "03",
    title: "History Archive",
    label: "历史归档",
    body: "把成果、失败、判断变化和时代背景固定下来，形成可回看的个人文明档案。"
  }
] as const;

function draftEntry(input: {
  slug: string;
  collection: MemorialCollection;
  title: string;
  theme: string;
  history: string;
  essay: string;
  posterBrief: string;
}): MemorialEntry {
  const imageOverrides: Record<string, string> = {
    "2026-05-02-holdings-first-fill": "/memorials/generated/2026-05-02-holdings-first-fill.png",
    "2026-05-02-polymarket-gap": "/memorials/generated/2026-05-02-polymarket-gap.png",
    "2026-05-02-board-health-check": "/memorials/generated/2026-05-02-board-health-check.png",
    "2026-05-02-weekly-poster-pipeline": "/memorials/generated/2026-05-02-weekly-poster-pipeline.png",
    "2026-05-02-vault-index": "/memorials/generated/2026-05-02-vault-index.png",
    "2026-05-02-cleanup-to-commit": "/memorials/generated/2026-05-02-cleanup-to-commit.png",
    "2026-05-02-composition-archive": "/memorials/generated/2026-05-02-composition-archive.png",
    "2026-05-02-color-archive": "/memorials/generated/2026-05-02-color-archive.png",
    "2026-05-02-light-samples": "/memorials/generated/2026-05-02-light-samples.png",
    "2026-05-02-type-layout": "/memorials/generated/2026-05-02-type-layout.png",
    "2026-05-02-material-library": "/memorials/generated/2026-05-02-material-library.png",
    "2026-05-02-cover-candidates": "/memorials/generated/2026-05-02-cover-candidates.png",
    "2026-05-02-style-review": "/memorials/generated/2026-05-02-style-review.png",
    "2026-05-02-asset-call-sheet": "/memorials/generated/2026-05-02-asset-call-sheet.png",
    "2026-05-02-ai-school": "/memorials/generated/2026-05-02-ai-school.png",
    "2026-05-02-home-studio": "/memorials/generated/2026-05-02-home-studio.png",
    "2026-05-02-energy-neighborhood": "/memorials/generated/2026-05-02-energy-neighborhood.png",
    "2026-05-02-robot-street": "/memorials/generated/2026-05-02-robot-street.png",
    "2026-05-02-civil-interface": "/memorials/generated/2026-05-02-civil-interface.png",
    "2026-05-02-water-city": "/memorials/generated/2026-05-02-water-city.png",
    "2026-05-02-time-bank": "/memorials/generated/2026-05-02-time-bank.png",
    "2026-05-02-world-dashboard": "/memorials/generated/2026-05-02-world-dashboard.png",
    "2026-05-02-inverted-library": "/memorials/generated/2026-05-02-inverted-library.png",
    "2026-05-02-liquid-clock": "/memorials/generated/2026-05-02-liquid-clock.png",
    "2026-05-02-city-whale": "/memorials/generated/2026-05-02-city-whale.png",
    "2026-05-02-memory-orchard": "/memorials/generated/2026-05-02-memory-orchard.png",
    "2026-05-02-sky-market": "/memorials/generated/2026-05-02-sky-market.png",
    "2026-05-02-moon-garden": "/memorials/generated/2026-05-02-moon-garden.png",
    "2026-05-02-door-ocean": "/memorials/generated/2026-05-02-door-ocean.png",
    "2026-05-02-star-forge": "/memorials/generated/2026-05-02-star-forge.png"
  };

  return {
    date: input.slug,
    week: "W18",
    collection: input.collection,
    title: input.title,
    theme: input.theme,
    image: imageOverrides[input.slug] ?? `/memorials/generated/${input.slug}.svg`,
    worklog: [
      `补齐「${input.title}」章节定位。`,
      "先写入文章、历史意义和海报 brief，作为后续生成图片的文字底稿。",
      "保持 draft 状态，等图片完成后再升级为可做海报或已归档。"
    ],
    history: input.history,
    essay: input.essay.split("\n\n"),
    posterBrief: input.posterBrief,
    status: "draft"
  };
}

export const MEMORIAL_ENTRIES: MemorialEntry[] = [
  {
    date: "2026-05-01",
    week: "W18",
    collection: "workflow",
    title: "图像能力进入工作流",
    theme: "从记录文字到生成周刊视觉",
    image: "/memorials/2026-05-01-image-workflow.png",
    worklog: [
      "新开纪念册页面，让每日工作可以沉淀成周刊与海报。",
      "把记录方式固定为手动更新，避免早期自动化吞掉判断过程。",
      "为每条记录保留 poster brief，方便后续直接交给图像模型生成封面。"
    ],
    history: "GPT 做图能力增强后，个人项目的记录媒介从纯文本扩展为图像出版物；工作日志开始具备杂志化、档案化的可能。",
    essay: [
      "这张图不是为了庆祝一次页面更新，而是记录一种工作方式的转向：过去，工作记录通常停留在文字、列表和截图里；从这一刻开始，它可以被整理成一张具有封面感、时代感和叙事性的图。",
      "打开的周刊像一本正在形成的个人档案。左边是每日推进，右边是图像生成窗口，中间连接的是人的判断。AI 做图能力增强以后，重要的不是多生成几张漂亮图片，而是把每天的学习、实验和判断变成可回看的视觉证据。",
      "它提醒我：工作流不是一次性搭好，而是在每天的小修小补中慢慢长出来。图像只是表层，真正被记录的是一个人如何把工具纳入自己的思考系统。"
    ],
    posterBrief: "暗金色文明档案馆，一张摊开的未来周刊，页面上有时间线、手写批注、AI 图像生成窗口和 2076 标记，冷静、庄重、像研究员的桌面。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-photo-stock",
    week: "W18",
    collection: "photo-stock",
    title: "照相库存开馆",
    theme: "把生成图沉淀成可复用的视觉资产",
    image: "/memorials/2026-05-02-photo-stock.png",
    worklog: [
      "为纪念册新增照相库存分馆，保存可复用的生成图和风格素材。",
      "把海报、封面、构图、色彩和视觉母题从一次性产物整理成长期资产。",
      "建立后续周刊和海报可以反复调用的图像素材入口。"
    ],
    history: "当生成图越来越多，真正稀缺的不是图片数量，而是筛选、归档和复用能力。照相库存让视觉资产从临时文件变成可积累的素材系统。",
    essay: [
      "照相库存的意义，不是把图片堆起来，而是给想象力建立仓库。生成图一旦变多，如果没有分类、命名和复用方式，很快就会变成看似丰富但无法调用的噪音。",
      "这张图里的 contact sheet、色卡、透明资料夹和索引屏幕，代表的是一种新的素材管理方式：每一张图都不只是结果，也可能成为下一张图的构图参考、色彩母版、封面素材或风格种子。",
      "当素材库逐渐成形，创作就不再从零开始。它会像摄影师的底片库、设计师的 moodboard、研究员的卡片盒一样，成为长期项目的视觉记忆。"
    ],
    posterBrief: "未来策展桌面，整齐排列的生成图 contact sheet、透明资料夹、相机元数据卡、色彩样本和风格索引屏幕，深石墨、银灰、玻璃蓝与香槟金，高级视觉档案馆。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-future-world",
    week: "W18",
    collection: "future-world",
    title: "未来世界畅想馆开馆",
    theme: "用逻辑推演未来生活、工作和世界模型",
    image: "/memorials/2026-05-02-future-world.png",
    worklog: [
      "为纪念册新增未来世界畅想馆，用来承载更系统的未来推演。",
      "把想象范围从单张图扩展到生活模式、工作方式、城市结构和能源系统。",
      "要求每张图背后都有逻辑链，而不是只追求视觉奇观。"
    ],
    history: "未来世界畅想馆的作用，是训练对长期趋势的建模能力。它把图像当作世界模型的草图，用视觉方式检验一个未来是否自洽。",
    essay: [
      "未来世界畅想馆不负责做梦，它负责把梦放进逻辑里。一个可信的未来，不只是有飞行器、机器人和高楼，而是生活方式、工作方式、能源系统、教育结构和城市组织能够彼此咬合。",
      "这张图像一张展开的世界模型：模块化住宅、自动交通、AI 工作空间、能源网格和垂直农场被系统图连接起来。它不问某个单点技术是否酷，而是问这些技术组合在一起以后，人会怎样生活，组织会怎样运行，城市会怎样呼吸。",
      "未来想象最有价值的部分，不是预测某一年会发生什么，而是提前训练自己理解复杂系统的能力。图像在这里像一张沙盘，让抽象判断有了可观察的形状。"
    ],
    posterBrief: "建筑师桌面上的未来城市模拟模型，模块化住宅、自动交通、AI 工作空间、能源网格、垂直农场和远程工作栖息地，由透明系统图连接，可信、冷静、具有逻辑性。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-imagination",
    week: "W18",
    collection: "imagination",
    title: "光怪陆离想象馆开馆",
    theme: "把想象力推到常识之外",
    image: "/memorials/2026-05-02-imagination.png",
    worklog: [
      "为纪念册新增光怪陆离想象馆，专门容纳超出现实逻辑的视觉实验。",
      "把目标从解释世界转为打破默认想象，寻找新的隐喻、形态和视觉语言。",
      "用夸张、陌生和奇异的图像扩充思维边界。"
    ],
    history: "如果未来世界畅想馆负责可信，光怪陆离想象馆负责突破。它不是为了预测，而是为了让大脑看见原本不会主动生成的可能性。",
    essay: [
      "光怪陆离想象馆的任务，是把大脑从熟悉的秩序里拉出来。这里不要求每一个画面都能被解释，也不要求它符合现实工程学。它要做的是让图像先于语言抵达，让人看见自己原本不会主动想象的东西。",
      "漂浮图书馆、液态玻璃街道、托举城市的发光巨物、开出月亮的机械花，这些元素没有必要立刻变成一个可执行方案。它们更像思维的极限拉伸：当视觉先突破边界，概念才有机会随后跟上。",
      "长期看，想象力也需要训练。太合理的图会让人停在现有世界的延长线上，而足够陌生的图，会迫使人重新命名、重新联想、重新组织可能性。"
    ],
    posterBrief: "漂浮图书馆变成星象馆，液态玻璃街道弯向天空，光构成的透明巨物托举微型城市，机械花开出小月亮，传送门显露异文明，奇异但优雅，最大化想象力。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-inline-reading",
    week: "W18",
    collection: "workflow",
    title: "卡片内展开阅读",
    theme: "把阅读从跳转改回连续的手感",
    image: "/memorials/2026-05-02-inline-reading.png",
    worklog: [
      "把纪念册从单独详情页阅读改成当前页卡片展开。",
      "用原生 details/summary 实现展开和收起，避免引入额外客户端状态。",
      "保留详情页，但把手机阅读的主路径改为连续展开。"
    ],
    history: "这次调整不是视觉问题，而是阅读方式问题。纪念册如果要成为长期记录工具，手机上的连续阅读必须比页面结构更重要。",
    essay: [
      "一个记录系统最容易犯的错误，是把结构做得很完整，却把阅读切得太碎。桌面端可以容忍跳转，手机端不行。手机屏幕本来就窄，每一次跳页都像把读者从当前语境里拽出去，再要求他重新找回刚才的心流。",
      "卡片内展开是一种更朴素的阅读决定：先让人扫一眼，再让人原地深入。标题、图片和摘要负责判断值不值得读；展开后的文章、工作记录和 brief 负责承接注意力。这样一来，纪念册不再像目录加详情页，而更像一本可以向下翻的手册。",
      "好的工作流不一定是功能最多的那个，而是最少打断人的那个。工具应该把结构藏在背后，把连续性还给使用者。尤其是长期记录，真正重要的不是某一天能不能写完，而是未来的自己愿不愿意一张一张读下去。"
    ],
    posterBrief: "深色精致的手机阅读界面，一张纪念册卡片像折叠纸页一样在当前页展开，连续显示图片、文章、工作记录和海报 brief，周围有轻量 UI 线框、时间线刻度和安静的 AI 工作流仪表盘。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-style-masters",
    week: "W18",
    collection: "photo-stock",
    title: "风格母版整理",
    theme: "让图片从结果变成可复用的方法",
    image: "/memorials/2026-05-02-style-masters.png",
    worklog: [
      "为照相库存新增第二张卡片，主题从保存图片推进到整理风格母版。",
      "把颜色、构图、材质、灯光和版式拆成可复用的视觉参数。",
      "为后续周刊和海报建立更稳定的风格调用方式。"
    ],
    history: "素材库真正成熟的标志，不是文件数量增加，而是可以从旧图里提取方法。风格母版让图片成为下一次创作的起点。",
    essay: [
      "一张好图如果只被保存为图片，它的价值很快就会耗尽。真正值得留下的，不只是它看起来好看，而是它为什么成立：用了什么颜色，光从哪里来，画面如何分区，主体怎样被托住，文字和图像之间保持了什么距离。",
      "风格母版整理，就是把感性的喜欢拆成可以复用的语言。以前看到一张图，只会说高级、未来、安静、有质感；整理之后，它会变成一组更具体的参数：低饱和蓝灰，暖金边线，大面积留白，单一主光源，玻璃反射，卡片式层级。",
      "当这些参数被保存下来，创作就不再靠临场手感。下一次要做周刊封面、未来场景、产品图或档案卡片时，可以从母版里抽取结构，而不是重新摸索。图片从此不只是结果，它开始承担方法的角色。"
    ],
    posterBrief: "高级视觉档案工作台，深色玻璃墙上排列四块风格母版板，包含色板、灯光配方、构图网格、材质样本、镜头备注和小型海报缩略图，安静、有序、可复用。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-agent-company",
    week: "W18",
    collection: "future-world",
    title: "无人公司的一天",
    theme: "一个人如何和一群 Agent 共同工作",
    image: "/memorials/2026-05-02-agent-company.png",
    worklog: [
      "为未来世界畅想馆新增第二张卡片，聚焦未来工作方式。",
      "把单人公司、AI agent、自动化运营和机器人执行放进同一个日常场景。",
      "用生活化视角推演未来组织形态，而不是只描写宏大技术。"
    ],
    history: "未来的公司可能先从组织结构变轻开始。一个人不再只是一个劳动力，而可能成为多个 agent、工具和自动化系统的协调者。",
    essay: [
      "未来的公司未必更大。它可能更小，小到只剩一个人、一张桌子和一组不断运行的 agent。合同有人谈，代码有人写，库存有人看，广告有人试，财务有人核对，客服有人回复，但这些“人”并不一定占用办公室座位。",
      "这会改变工作的重心。过去，管理意味着管理人；未来，管理可能更多意味着管理任务边界、权限、反馈和异常。人不再站在每个流程里亲自推动，而是站在流程上方，决定哪些任务可以交给系统，哪些判断必须收回到自己手里。",
      "无人公司不是没有人，而是人的位置变了。人从执行者变成编排者，从被日程牵着走，变成设计日程背后的机制。真正的竞争力也许不再是雇了多少人，而是谁能把一套小型智能组织调校得更可靠、更有审美、更懂取舍。"
    ],
    posterBrief: "清晨的未来公寓工作室，一个人喝茶看向透明仪表盘，AI agent 正在谈合同、写代码、生成广告、管理库存、安排机器人工作，窗外是安静未来城市、无人机、太阳能屋顶和模块化办公空间。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-dream-engine",
    week: "W18",
    collection: "imagination",
    title: "梦境发动机",
    theme: "把梦变成扩张认知边界的机器",
    image: "/memorials/2026-05-02-dream-engine.png",
    worklog: [
      "为光怪陆离想象馆新增第二张卡片，把主题推进到梦境生成。",
      "用不合常理的视觉结构训练陌生联想。",
      "把想象力从装饰性奇观转向认知边界扩张。"
    ],
    history: "想象力不是等待灵感降临，而是可以被持续刺激和训练的能力。梦境发动机代表一种主动制造陌生性的机制。",
    essay: [
      "人醒着的时候，想象力常常很保守。它会沿着已有经验延伸：城市还是城市，工具还是工具，未来只是现在的金属版。梦不一样。梦不尊重比例，不尊重因果，也不尊重物体本来的用途。它把图书馆变成天空，把海装进盒子，把楼梯接到云里。",
      "梦境发动机这个概念，重要的不是它能不能被建造，而是它提醒我们：陌生性可以被主动生产。一个人如果总是在合理范围内思考，得到的只是更顺滑的旧答案。只有当画面先越界，语言才会被迫追上，新的概念才有机会出现。",
      "想象力的训练，不是为了逃离现实，而是为了给现实增加入口。很多真正有用的想法，在刚出现时都像梦一样不合适、不稳定、不知道放在哪里。先不要急着解释它。让它亮一会儿，让大脑学会和未知共处。"
    ],
    posterBrief: "宇宙剧场里的梦境发动机，由玻璃齿轮、液态镜子、发光书本、水母卫星、通向云端的循环楼梯、透明立方体中的微型海洋和从素描本长出的城市组成，奇异、诗意、清晰聚焦。",
    status: "poster-ready"
  },
  {
    date: "2026-05-02-ecosystem-cleanup",
    week: "W18",
    collection: "workflow",
    title: "零零生态清理后结构",
    theme: "从复杂壳回到轻量信息流决策系统",
    image: "/memorials/2026-05-02-ecosystem-cleanup.png",
    worklog: [
      "确认清理后的核心结构：Python 采集 cron、Next.js 作战台、freqtrade dry-run、Claude 主脑、独立知识 vault。",
      "将 TS bot 壳、过期 agent 系统、冗余 sessions/self_memory 和不明大目录归档。",
      "明确 freqtrade TA 趋势策略不能上真钱，后续方向转向 Polymarket 信息差和四板块绑定决策。"
    ],
    history: "2026-05-02 的清理把零零生态从复杂系统幻想拉回可运行的轻量 pipeline。真正的核心不是多 agent，也不是 TS bot，而是信息进入、判断形成、决策执行的闭环。",
    essay: [
      "一个个人系统最危险的阶段，不是东西太少，而是东西多到每个目录都像有意义。工具、脚本、agent、插件、记忆、法则、旧项目，它们都曾经服务过某个想法，但如果不清理，就会一起变成认知噪音。",
      "这次清理真正留下来的东西很少：Python 负责采集，Next.js 负责作战台，Telegram 负责提醒，freqtrade 只做 dry-run 验证，知识 vault 保存判断，Claude 作为主助手层。这个结构并不华丽，但它能解释每个部件为什么存在。",
      "复杂系统总会诱惑人继续加一层抽象。今天的反向动作，是承认轻量 pipeline 比庞大架构更适合当前阶段。零零生态的核心不是自动化本身，而是让信息更稳定地抵达决策，让错误更快暴露，让未来的自己还能看懂这套系统为什么这样运行。"
    ],
    posterBrief: "ZERO 2076 生态结构清理后的系统图：左侧 Python cron 数据采集，中间 Next.js 作战台，右侧 Telegram 推送与 freqtrade dry-run，下方是独立知识 vault，上方是 Claude 主脑和用户决策者。视觉风格冷静、清晰、像研究操作系统蓝图。",
    status: "draft"
  },
  {
    date: "2026-05-02-sunday-protocol",
    week: "W18",
    collection: "workflow",
    title: "周日决策协议",
    theme: "把信息流收束成一次有边界的决策仪式",
    image: "/memorials/2026-05-02-sunday-protocol.png",
    worklog: [
      "把四个运行板块、持仓表、风险红线、Polymarket 机会和 dry-run 结果收束到周日复盘。",
      "把“看了很多信息”改成“每周只做少数明确决策”。",
      "保留 Claude 辅助推理，但最终判断由用户本人完成。"
    ],
    history: "周日决策协议是零零生态清理后的下一层。清理解决了系统边界问题，周日协议解决信息如何进入行动的问题。",
    essay: [
      "一个信息系统如果没有固定的决策时刻，就会慢慢变成提醒系统。它每天告诉你很多事，市场在动，新闻在变，数据在更新，策略在回测，但你并不一定因此更接近行动。信息流越密，越需要一个收束点。",
      "周日决策协议的意义，是给零零生态设定一条节奏线。平时让四个板块各自运行：BTC 自动化、宏观信号、韩国股票、零零精选。到了周日，再把持仓、风险红线、dry-run 结果和 Polymarket 机会放到同一张桌子上。不是每天都判断，而是每周集中判断一次。",
      "真正的决策不应该由情绪触发，也不应该由某条新闻临时触发。它应该来自一组固定问题：现在的仓位是否仍然合理？风险是否越界？哪些信号重复出现？有没有一个足够小、足够可验证的下注？如果没有，就不行动。周日协议不是让人更频繁地做决定，而是让决定变少、变清楚、变可复盘。"
    ],
    posterBrief: "周日晚上的研究桌面，中央是四板块决策图，连接 BTC 自动化、宏观诗歌信号、韩国股票观察、零零精选；旁边有 holdings 表、风险红线、Polymarket 扫描器、dry-run 交易账本和 Claude 推理窗，冷静、克制、像每周仪式。",
    status: "poster-ready"
  },
  ...[
    draftEntry({
      slug: "2026-05-02-holdings-first-fill",
      collection: "workflow",
      title: "持仓表第一次填写",
      theme: "让决策从真实仓位开始",
      history: "周日决策协议要成立，必须先承认真实仓位。没有持仓表，所有判断都会停留在观点层，无法进入风险层。",
      essay: "很多判断之所以失真，是因为它们不连接仓位。一个人可以对市场说出很多观点，但只要不知道自己真实暴露在哪里，就无法判断什么是机会，什么是诱惑，什么是危险。\n\n持仓表不是财务表格，而是决策的地面。它让所有宏观判断、新闻信号和交易冲动都必须先回答一个问题：这件事和我当前的风险结构有什么关系。只有从真实仓位出发，系统才不会变成空中楼阁。",
      posterBrief: "一张克制的持仓表铺在深色桌面上，旁边是风险红线、周日决策清单和一支钢笔，冷静、真实、带有仪式感。"
    }),
    draftEntry({
      slug: "2026-05-02-polymarket-gap",
      collection: "workflow",
      title: "Polymarket 信息差入口",
      theme: "从价格预测转向事件概率",
      history: "freqtrade 趋势策略接近极限后，系统需要转向更适合个人研究员的信息差场域。",
      essay: "价格预测太拥挤了。每一个指标、每一条均线、每一次突破，都被无数人同时盯着。个人研究员很难在这种地方长期获得优势，尤其当策略已经被回测证明只是接近盈亏平衡。\n\n事件概率是另一种入口。它要求的不是更快交易，而是更早理解问题：这个市场在定价什么，大家忽略了什么信息，哪些板块正在提供更可靠的事实输入。Polymarket 不应该变成赌博场，而应该变成信息差验证器。",
      posterBrief: "Polymarket 事件市场扫描器与四板块信息流相连，屏幕上有概率曲线、新闻证据、风险限额和小额验证仓位。"
    }),
    draftEntry({
      slug: "2026-05-02-board-health-check",
      collection: "workflow",
      title: "四板块健康检查",
      theme: "先确认系统活着，再谈决策质量",
      history: "四板块只有稳定运行，周日决策才有输入。健康检查是轻量 pipeline 的保养动作。",
      essay: "一个系统不需要每天变聪明，但必须每天知道自己有没有坏。采集脚本是否运行，Telegram 是否推送，数据源是否失效，输出是否重复，这些问题比新增功能更重要。\n\n健康检查的价值，是把焦虑从人的脑子里移到固定流程里。每个板块只回答几个问题：有没有输入，有没有处理，有没有输出，失败时有没有提示。系统活着，判断才有基础。",
      posterBrief: "四个运行板块像仪表盘一样排列，每个板块显示 Input、Process、Output、Health 和 Failure 状态，清晰、低调。"
    }),
    draftEntry({
      slug: "2026-05-02-weekly-poster-pipeline",
      collection: "workflow",
      title: "周刊海报生产线",
      theme: "把工作记录变成可出版的视觉输出",
      history: "纪念册不是图库，而是把工作转化为周刊、海报和历史切片的生产线。",
      essay: "记录如果只是保存，很快会变成负担。记录必须有出口，才会持续生长。周刊海报生产线的意义，是给每天的工作一个可见的形态，让零散推进最终变成可以回看的出版物。\n\n这条生产线不需要复杂：每日记录事实，每周挑选节点，整理文章，生成图，归档。关键不是速度，而是让每个阶段都能复用。时间长了，个人工作会从流水账变成连续出版。",
      posterBrief: "一条安静的周刊生产线：日记卡、文章稿、海报 brief、生成图、归档册依次排列，像小型编辑部。"
    }),
    draftEntry({
      slug: "2026-05-02-vault-index",
      collection: "workflow",
      title: "知识 Vault 索引",
      theme: "让任何 agent 都能找到判断资产",
      history: "知识从代码仓剥离后，需要索引能力，否则独立 vault 只是另一座孤岛。",
      essay: "知识资产独立出来只是第一步。真正重要的是入口：未来的自己，或者任何 agent，能不能快速知道这里有什么，哪些文件是核心，哪些判断已经过期，哪些结论可以复用。\n\n索引不是目录美化，而是降低重新理解系统的成本。一个好的 vault 应该让人五分钟知道地形，十五分钟找到证据，一小时恢复上下文。否则所谓知识资产，只是换了位置的遗忘。",
      posterBrief: "ZERO 知识 vault 的索引地图，文件夹、卡片、wikilink 和 agent 查询路径组成一张清晰知识地形图。"
    }),
    draftEntry({
      slug: "2026-05-02-cleanup-to-commit",
      collection: "workflow",
      title: "清理到提交",
      theme: "让工作区从临时状态进入可追踪状态",
      history: "清理如果不落到文档和提交，仍然会在几天后变成新的混乱。",
      essay: "很多整理工作失败在最后一步：东西已经分清了，目录已经移动了，判断也已经形成了，但没有提交，没有快照，没有说明。几天后，新的改动叠上来，清理成果又变成另一个临时状态。\n\n清理到提交，意思是给每次结构变化一个可追踪的句号。哪些东西留下，哪些东西归档，为什么这样判断，下一步是什么，都要能被后来的人看到。即使这个后来的人只是明天的自己。",
      posterBrief: "一个 git 工作区被整理成三列：保留、归档、待决策；旁边是提交信息草稿和系统快照文档。"
    }),
    draftEntry({
      slug: "2026-05-02-composition-archive",
      collection: "photo-stock",
      title: "构图档案",
      theme: "保存画面结构，而不是只保存成图",
      history: "照相库存要变成可复用资产，必须能从图片中抽出构图方法。",
      essay: "一张图最容易被记住的是内容，最容易被忽略的是结构。主体放在哪里，留白给了多少，文字如何进入，视线从哪里开始又在哪里停下，这些才是下一次能复用的东西。\n\n构图档案保存的不是图片本身，而是画面的骨架。它让风格不再依赖灵感，而能被拆解、比较和重新组合。",
      posterBrief: "多张海报被抽象成构图线框：中心式、斜切式、上下分栏、展馆式、卡片式，旁边有缩略图和标注。"
    }),
    draftEntry({
      slug: "2026-05-02-color-archive",
      collection: "photo-stock",
      title: "色彩母版",
      theme: "为长期项目建立稳定色彩记忆",
      history: "色彩是纪念册连续性的关键。没有色彩母版，每张图都会漂移成孤立作品。",
      essay: "长期项目需要颜色的记忆。深蓝、石墨、香槟金、玻璃青、纸白，这些颜色不是装饰，而是让不同日期的卡片彼此相认。\n\n色彩母版的作用，是给图像生产设定边界。边界不是限制想象力，而是让想象力有归属感。只要底色稳定，内容就可以变化得更远。",
      posterBrief: "一张高级色彩母版墙，展示 ZERO 2076 的深蓝黑、香槟金、玻璃青、纸白和灰阶体系。"
    }),
    draftEntry({
      slug: "2026-05-02-light-samples",
      collection: "photo-stock",
      title: "光线样本",
      theme: "用光线决定图像的情绪和可信度",
      history: "同一个场景在不同光线下会成为不同世界。光线样本负责保存情绪方法。",
      essay: "光线比物体更先决定情绪。冷光让系统显得理性，暖光让工作显得有人味，侧光让物体有重量，顶光让空间像展馆。\n\n保存光线样本，是为了以后不再只说“高级一点”。高级常常来自光的克制：哪里亮，哪里暗，哪里反射，哪里必须留给阴影。",
      posterBrief: "同一张研究桌在四种灯光下的对比：冷屏幕光、暖台灯、展馆射灯、清晨自然光。"
    }),
    draftEntry({
      slug: "2026-05-02-type-layout",
      collection: "photo-stock",
      title: "文字版式库存",
      theme: "让标题、编号和正文成为视觉资产",
      history: "纪念册的文字不是附属说明，而是图像系统的一部分。",
      essay: "很多 AI 图的问题不是画面差，而是文字没有位置。标题被硬塞进去，编号没有层级，正文变成噪音。真正的出版感，来自文字和图像共同构图。\n\n文字版式库存要保存的是标题区、日期区、编号区、摘要区的关系。以后每张卡不必重新发明排版，只要选择适合的版式骨架。",
      posterBrief: "一组纪念册版式样张，展示大标题、期号、日期、摘要、标签和正文的网格关系。"
    }),
    draftEntry({
      slug: "2026-05-02-material-library",
      collection: "photo-stock",
      title: "材质纹理库",
      theme: "为图像增加可触摸的质感",
      history: "材质让图像从屏幕感回到物质感，是周刊和海报的重要差异。",
      essay: "纸、玻璃、金属、皮革、布面、磨砂屏幕，这些材质会让一张图从概念变成物体。没有材质，图像容易漂在空中；有了材质，画面才像可以被拿起、翻阅、保存。\n\n材质纹理库不是追求复杂，而是给视觉建立触感。未来的纪念册即使在屏幕上阅读，也应该有印刷品的重量。",
      posterBrief: "材质样本桌：纸张、玻璃、金属、皮革、磨砂屏幕、胶片和档案夹，被整齐编号归档。"
    }),
    draftEntry({
      slug: "2026-05-02-cover-candidates",
      collection: "photo-stock",
      title: "封面候选池",
      theme: "把好图变成未来周刊的封面储备",
      history: "不是每张好图都要立即使用。候选池保存的是未来可能性。",
      essay: "有些图生成出来时，不一定知道它属于哪一期。它可能太超前，太安静，或者还缺少配套文章。但这不代表它没有价值。\n\n封面候选池允许图像先存在，等待未来的主题来认领它。这样做的好处是，周刊不必每次从空白开始，而是在已有视觉储备中寻找最合适的那一张。",
      posterBrief: "一面封面候选墙，十几张不同风格的未来周刊封面缩略图被编号、贴签、等待选用。"
    }),
    draftEntry({
      slug: "2026-05-02-style-review",
      collection: "photo-stock",
      title: "风格评审台",
      theme: "建立判断好坏的标准，而不是只凭感觉",
      history: "素材库需要评审机制，才能从堆积走向筛选。",
      essay: "图片多了以后，最重要的能力不是生成，而是判断。哪张图能留下，哪张只是漂亮，哪张值得发展成系列，哪张应该删除，都需要标准。\n\n风格评审台的作用，是把审美判断写下来。构图、色彩、文字位置、主题准确度、未来可复用性，每一项都能让素材库更干净。",
      posterBrief: "一个视觉评审台，图片旁边有评分卡：构图、色彩、文字、主题、复用性，整体像设计编辑部。"
    }),
    draftEntry({
      slug: "2026-05-02-asset-call-sheet",
      collection: "photo-stock",
      title: "素材调用清单",
      theme: "让素材库真正进入工作流",
      history: "库存只有被调用才有价值。调用清单把素材和下一次创作连接起来。",
      essay: "素材库最大的问题，是越整理越像博物馆。看起来很完整，但没有进入工作流。素材调用清单要解决这个问题：下一张图需要什么封面骨架，什么色彩，什么材质，什么旧图可以作为参考。\n\n当调用变得容易，库存才不只是仓库，而是创作引擎。每一次新图都会带着旧资产继续生长。",
      posterBrief: "一张素材调用清单连接素材库、周刊主题、海报 brief 和生成模型，像轻量生产排程表。"
    }),
    draftEntry({
      slug: "2026-05-02-ai-school",
      collection: "future-world",
      title: "AI 学校的一天",
      theme: "未来教育从统一课程转向个人路径",
      history: "未来世界畅想馆需要从工作延伸到教育，观察下一代如何学习。",
      essay: "未来学校不一定消失，但课堂的中心会移动。老师不再只是讲授者，AI 不再只是工具，学生也不再按同一条路径前进。\n\nAI 学校的一天，可能是每个人都有自己的学习轨道：有人补基础，有人做项目，有人和模拟导师辩论。教育的重点从完成课程，变成形成能力地图。",
      posterBrief: "未来学校空间，学生在不同学习舱中与 AI 导师、真人老师和项目沙盘互动，秩序清晰、可信。"
    }),
    draftEntry({
      slug: "2026-05-02-home-studio",
      collection: "future-world",
      title: "家庭工作站",
      theme: "家成为小型生产和学习节点",
      history: "未来生活模式的重要变化，是家庭空间承担更多认知生产功能。",
      essay: "家的功能会变多。它不只是休息场所，也可能是工作站、学习舱、创作室、健康监测点和小型指挥台。\n\n这并不意味着人永远不出门，而是生活和生产的边界会重新组织。家庭工作站让个人拥有更高的自主性，也要求人更会管理节奏。",
      posterBrief: "未来家庭工作站：一张桌子连接 AI 助手、健康监测、远程协作、学习屏幕和安静生活空间。"
    }),
    draftEntry({
      slug: "2026-05-02-energy-neighborhood",
      collection: "future-world",
      title: "能源社区",
      theme: "社区从用电单位变成能源节点",
      history: "未来世界模型必须包括能源结构，否则生活方式推演不完整。",
      essay: "很多未来想象只画城市，却不画电从哪里来。真正的生活方式变化，离不开能源组织方式变化。\n\n能源社区意味着屋顶、储能、充电、微电网和需求响应成为日常基础设施。居民不只是消费者，也可能成为局部能源系统的一部分。",
      posterBrief: "一个未来社区微电网：太阳能屋顶、储能墙、共享充电、家庭能源面板和社区调度中心。"
    }),
    draftEntry({
      slug: "2026-05-02-robot-street",
      collection: "future-world",
      title: "机器人街区",
      theme: "自动化进入城市毛细血管",
      history: "机器人真正改变世界，不在发布会上，而在街区的重复劳动里。",
      essay: "机器人街区不是满街人形机器人的奇观，而是很多小任务被安静接管。清洁、搬运、巡检、配送、维护，这些动作组成城市的毛细血管。\n\n当这些任务自动化，城市会变得更安静，也更依赖系统调度。未来的街区管理，可能像管理一个不断移动的机器群。",
      posterBrief: "安静未来街区，清洁机器人、配送机器人、维护机械臂和人类居民自然共处，生活化而可信。"
    }),
    draftEntry({
      slug: "2026-05-02-civil-interface",
      collection: "future-world",
      title: "城市公共界面",
      theme: "治理从窗口转向实时界面",
      history: "未来世界不仅是商业和家庭，也包括公共服务如何被重新组织。",
      essay: "城市治理过去像窗口：排队、提交、等待。未来它可能更像界面：状态实时可见，规则透明，服务按情境触发。\n\n公共界面不是把所有东西做成 app，而是让城市运行信息变得可理解。交通、能源、医疗、灾害、社区资源，都应该能被普通人看懂。",
      posterBrief: "未来城市公共服务界面投影在社区大厅，显示交通、能源、医疗、应急和资源分配，清晰可信。"
    }),
    draftEntry({
      slug: "2026-05-02-water-city",
      collection: "future-world",
      title: "水上城市边缘",
      theme: "气候适应改变居住边界",
      history: "未来生活模式必须面对气候和地理边界变化。",
      essay: "未来城市不只是向上生长，也可能向水边重新适应。海平面、洪水、淡水、湿地和港口，会重新定义城市边缘。\n\n水上城市边缘不是幻想漂浮城，而是更现实的适应层：可移动平台、湿地缓冲、弹性住宅、公共避险空间。这些会改变人对家的定义。",
      posterBrief: "未来水边城市边缘，可浮动住宅、湿地缓冲带、公共栈道和能源设施组合成气候适应社区。"
    }),
    draftEntry({
      slug: "2026-05-02-time-bank",
      collection: "future-world",
      title: "时间银行",
      theme: "未来社会重新计量人的贡献",
      history: "当 AI 接管大量劳动，人的贡献需要新的计量方式。",
      essay: "如果机器承担越来越多生产，人类社会仍然要回答一个问题：人的贡献如何被看见。工资不是唯一答案，时间、照护、信任、社区参与也可能重新变得重要。\n\n时间银行是一种想象：人们把照护、教学、修理、陪伴、协调记录下来，成为社区内部的信用。它不是乌托邦，而是对价值计量方式的重新提问。",
      posterBrief: "未来社区时间银行界面，居民贡献照护、教学、维修、陪伴并形成可交换的时间信用。"
    }),
    draftEntry({
      slug: "2026-05-02-world-dashboard",
      collection: "future-world",
      title: "个人世界仪表盘",
      theme: "把复杂世界压缩成可行动的几个指标",
      history: "未来个人需要自己的世界模型界面，而不是被无限信息流推着走。",
      essay: "信息越来越多，人的注意力不会变多。未来真正重要的界面，可能不是新闻流，而是个人世界仪表盘：哪些变量影响我的生活，哪些风险正在接近，哪些机会值得行动。\n\n这个仪表盘不追求全知，而追求可行动。它把世界压缩成几个能被人理解和复盘的变量，让个人不再只是被动接收变化。",
      posterBrief: "个人世界仪表盘显示能源、市场、健康、学习、城市和风险变量，像一张清晰的未来生活控制台。"
    }),
    draftEntry({
      slug: "2026-05-02-inverted-library",
      collection: "imagination",
      title: "倒悬图书馆",
      theme: "知识从天花板向下生长",
      history: "想象馆需要持续制造陌生空间，打破日常重力和知识隐喻。",
      essay: "如果图书馆不是建在地上，而是倒悬在天空，人走进去时首先失去的不是方向，而是对知识的习惯想象。\n\n倒悬图书馆让书不再是被摆放的物体，而像从天花板垂下的根系。人不是寻找书架，而是在一片知识森林里辨认路径。",
      posterBrief: "一座倒悬在夜空中的图书馆，书架像根系垂下，读者在透明桥上行走，奇异但安静。"
    }),
    draftEntry({
      slug: "2026-05-02-liquid-clock",
      collection: "imagination",
      title: "液态钟表",
      theme: "时间像水一样被盛放和倾倒",
      history: "把抽象概念物质化，是想象馆扩张边界的核心方法。",
      essay: "时间通常被画成直线、刻度和日历。液态钟表把它改成一种可以流动、溢出、凝固和蒸发的东西。\n\n当时间不再像尺子，而像水，人对计划、记忆和等待的理解也会改变。有些时间可以保存，有些只能流走，有些会在不注意时倒灌回来。",
      posterBrief: "巨大的透明钟表中流动着发光液体，城市、记忆和人物倒影漂浮其中，诗意、清晰。"
    }),
    draftEntry({
      slug: "2026-05-02-city-whale",
      collection: "imagination",
      title: "城市鲸",
      theme: "一座城市在巨兽背上缓慢迁徙",
      history: "尺度错位能迫使大脑重新理解城市、生命和栖居。",
      essay: "如果城市不是固定的，而是随一头巨大的发光鲸缓慢迁徙，人类会怎样理解家。街道会变成鳍上的纹路，灯火像寄生的星群，港口则成为呼吸孔附近的集市。\n\n城市鲸不是交通工具，也不是怪物。它是一个尺度错位的隐喻：当栖居不再稳定，文明可能学会和更大的生命节奏共处。",
      posterBrief: "一头由光和半透明组织构成的巨鲸背负微型城市，在星海和云层之间缓慢游动，壮丽而温柔。"
    }),
    draftEntry({
      slug: "2026-05-02-memory-orchard",
      collection: "imagination",
      title: "记忆果园",
      theme: "人的记忆长成可以采摘的果实",
      history: "想象力训练需要把心理活动变成可见空间。",
      essay: "记忆如果不是储存在脑中，而是长在一片果园里，人会怎样对待过去。有人每天修剪，有人任它疯长，有人害怕某棵树结果。\n\n记忆果园让回忆变成一种农事。成熟的记忆可以采摘，腐烂的记忆需要翻土，新的记忆则必须先被种下。",
      posterBrief: "一片夜色果园，树上结着发光记忆果实，每颗果实里有微型场景，人物在安静采摘。"
    }),
    draftEntry({
      slug: "2026-05-02-sky-market",
      collection: "imagination",
      title: "天空集市",
      theme: "漂浮商贩交易梦、天气和影子",
      history: "通过荒诞交易对象，扩展对价值和市场的想象。",
      essay: "市场不一定只交易商品。天空集市里，摊主卖的是一小时黄昏、半瓶雷声、旧梦的尾巴和不会消失的影子。\n\n这种荒诞让人重新思考价值。很多现实中最重要的东西，本来也难以计价：注意力、情绪、时间、信任、想象。天空集市只是把它们变成了摊位。",
      posterBrief: "云层上的夜市，漂浮摊位交易梦、天气、影子和星光，灯笼、透明容器和奇异顾客组成画面。"
    }),
    draftEntry({
      slug: "2026-05-02-moon-garden",
      collection: "imagination",
      title: "月亮温室",
      theme: "在月光里培育不属于地球的植物",
      history: "陌生植物是低风险、高想象密度的视觉母题。",
      essay: "月亮温室里，植物不靠太阳生长，而靠潮汐、梦境和玻璃里的微弱蓝光。它们开出的花不像花，更像星图、语言或某种还没有被命名的器官。\n\n这种想象让生命脱离熟悉模板。植物不再只是自然背景，而成为未知世界的语法。",
      posterBrief: "月球或高空温室中，奇异植物在蓝白月光下生长，花朵像星图和透明器官，优雅而陌生。"
    }),
    draftEntry({
      slug: "2026-05-02-door-ocean",
      collection: "imagination",
      title: "门后的海",
      theme: "每一扇门都通向一片不同的海",
      history: "门是最简单的想象装置，能把日常空间变成无限入口。",
      essay: "如果走廊里的每一扇门后面都是海，人的选择会变得很奇怪。不是选择房间，而是选择潮汐、盐度、风暴、岛屿和未知深度。\n\n门后的海让日常建筑变成多重世界的接口。它提醒人：边界有时不是墙，而是通道。",
      posterBrief: "一条安静走廊，打开的门后分别是不同颜色和气候的海洋，水光映在地面上。"
    }),
    draftEntry({
      slug: "2026-05-02-star-forge",
      collection: "imagination",
      title: "星星锻造厂",
      theme: "工匠在夜里锻造新的星座",
      history: "把宇宙尺度拉回手工劳动，制造强烈尺度反差。",
      essay: "星座看起来像命运，其实也可以像手工制品。星星锻造厂里，工匠把冷却的光敲成点，把轨道弯成线，把夜空重新排版。\n\n这个想象把宇宙从不可触碰的背景变成可制作的材料。人不再只是仰望星空，也可以参与星空的编排。",
      posterBrief: "宇宙锻造厂中，工匠用金色工具锻造发光星星和星座线，周围是深黑太空和微型星图。"
    })
  ]
];
