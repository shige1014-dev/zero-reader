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
  week?: string;
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
    "2026-05-02-star-forge": "/memorials/generated/2026-05-02-star-forge.png",
    "2026-05-06-sleep-city": "/memorials/generated/2026-05-06-sleep-city.png",
    "2026-05-06-civic-ai-clinic": "/memorials/generated/2026-05-06-civic-ai-clinic.png",
    "2026-05-06-micro-factory-kitchen": "/memorials/generated/2026-05-06-micro-factory-kitchen.png",
    "2026-05-06-orbit-workport": "/memorials/generated/2026-05-06-orbit-workport.png",
    "2026-05-06-longevity-commons": "/memorials/generated/2026-05-06-longevity-commons.png",
    "2026-05-06-memory-court": "/memorials/generated/2026-05-09-memory-court-v2.png",
    "2026-05-06-personal-energy-loop": "/memorials/generated/2026-05-09-personal-energy-loop-v2.png",
    "2026-05-06-agent-civic-hall": "/memorials/generated/2026-05-09-agent-civic-hall-v2.png",
    "2026-05-06-climate-shelter-market": "/memorials/generated/2026-05-09-climate-shelter-market-v2.png",
    "2026-05-06-skill-passport": "/memorials/generated/2026-05-09-skill-passport-v2.png",
    "2026-05-07-trust-ledger": "/memorials/generated/2026-05-09-trust-ledger-v2.png",
    "2026-05-07-sensor-neighborhood": "/memorials/generated/2026-05-07-sensor-neighborhood.png",
    "2026-05-07-robot-repair-cafe": "/memorials/generated/2026-05-07-robot-repair-cafe.png",
    "2026-05-07-local-compute-library": "/memorials/generated/2026-05-09-local-compute-library-v2.png",
    "2026-05-07-civic-simulation-room": "/memorials/generated/2026-05-07-civic-simulation-room.png",
    "2026-05-06-rain-museum": "/memorials/generated/2026-05-06-rain-museum.png",
    "2026-05-06-folded-sun": "/memorials/generated/2026-05-06-folded-sun.png",
    "2026-05-06-language-aquarium": "/memorials/generated/2026-05-06-language-aquarium.png",
    "2026-05-06-staircase-comet": "/memorials/generated/2026-05-06-staircase-comet.png",
    "2026-05-06-shadow-theater": "/memorials/generated/2026-05-06-shadow-theater.png",
    "2026-05-06-breathing-archive": "/memorials/generated/2026-05-06-breathing-archive.png",
    "2026-05-06-walking-house": "/memorials/generated/2026-05-06-walking-house.png",
    "2026-05-06-mirror-railway": "/memorials/generated/2026-05-06-mirror-railway.png",
    "2026-05-06-planetary-desk": "/memorials/generated/2026-05-06-planetary-desk.png",
    "2026-05-06-silent-carnival": "/memorials/generated/2026-05-06-silent-carnival.png",
    "2026-05-07-dream-customs": "/memorials/generated/2026-05-07-dream-customs.png",
    "2026-05-07-cloud-post-office": "/memorials/generated/2026-05-07-cloud-post-office.png",
    "2026-05-07-secret-lighthouse": "/memorials/generated/2026-05-07-secret-lighthouse.png",
    "2026-05-07-singing-map": "/memorials/generated/2026-05-07-singing-map.png",
    "2026-05-07-last-moon-train": "/memorials/generated/2026-05-07-last-moon-train.png"
  };

  return {
    date: input.slug,
    week: input.week ?? "W18",
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
      slug: "2026-05-06-sleep-city",
      week: "W19",
      collection: "future-world",
      title: "睡眠城市",
      theme: "城市开始把恢复力当成基础设施",
      history: "未来生活不只追求效率，也会重新设计休息、光照、噪音和生理节律。",
      essay: "如果城市真的关心人的长期能力，它不会只优化通勤、消费和办公，也会优化睡眠。街灯会按区域慢慢降温，交通噪音被吸声立面吞掉，楼宇把晚间通知统一延迟，社区有可预约的深度恢复舱。\n\n睡眠城市不是懒惰城市，而是承认人不是永动机的城市。AI 可以安排会议，机器人可以配送商品，但人的神经系统仍然需要黑暗、安静和可预测的节律。\n\n这类未来看起来不如飞行汽车耀眼，却更可能改变生活质量。一个城市如果能让人醒来时更完整，它就已经改变了生产力的底层。未来世界畅想馆需要这样的场景：不炫技，但可信。"
,
      posterBrief: "夜色未来城市，建筑外墙像低亮度呼吸灯，街道安静，透明睡眠舱、吸声树、柔和月光和健康节律界面组成一个可信的恢复型城市。"
    }),
    draftEntry({
      slug: "2026-05-06-civic-ai-clinic",
      week: "W19",
      collection: "future-world",
      title: "社区 AI 诊所",
      theme: "基层医疗从排队问诊变成连续照护",
      history: "未来医疗的关键不只是新药，也包括让普通人更早发现风险、更少被系统遗漏。",
      essay: "社区 AI 诊所不是用屏幕替代医生，而是把医疗从偶发事件改成连续系统。居民每天的睡眠、心率、用药、饮食和症状变化先被本地模型整理，真人医生看到的是已经分层的风险，而不是从零开始的混乱叙述。\n\n它的价值在基层。大医院解决复杂病例，社区诊所解决大多数人的早筛、复诊、慢病管理和心理支持。AI 在这里像一层安静的过滤网，提前捕捉异常，把医生的时间留给真正需要人的判断。\n\n可信的未来医疗应该更近、更早、更连续。不是每个人都拥有私人医生，而是社区拥有一套不会睡觉的照护界面。"
,
      posterBrief: "未来社区诊所，温暖但克制的灯光，AI 分诊屏、医生工作台、可穿戴数据流、老人和孩子在同一空间接受连续照护，像公共图书馆一样安静。"
    }),
    draftEntry({
      slug: "2026-05-06-micro-factory-kitchen",
      week: "W19",
      collection: "future-world",
      title: "厨房微型工厂",
      theme: "家庭从消费终端变成轻制造节点",
      history: "当小型自动化设备成熟，家里的生产边界会重新打开。",
      essay: "未来厨房可能不只做饭。它也许会打印替换零件，发酵定制营养，切割小型材料，回收包装，甚至根据家庭库存自动安排一周的低浪费生产。\n\n这种变化不会把每个家庭变成工厂，而是让一些消费重新变成制作。过去需要购买、等待、丢弃的东西，可能被拆成配方、材料和小型设备流程。家庭的价值不再只是居住，也包含小规模响应能力。\n\n厨房微型工厂的重点不是酷炫机器，而是供应链的末端变聪明。它让家庭对世界的依赖少一点，对自己的物质循环理解多一点。"
,
      posterBrief: "未来家庭厨房兼微型工厂，料理台旁有小型制造舱、材料盒、营养发酵罐、零件打印模块和家庭库存界面，生活化、可信、精致。"
    }),
    draftEntry({
      slug: "2026-05-06-orbit-workport",
      week: "W19",
      collection: "future-world",
      title: "轨道工作港",
      theme: "太空从远方目标变成工作场所",
      history: "商业航天成熟后，轨道空间会从探索叙事进入日常运营叙事。",
      essay: "轨道工作港不是宏大的殖民地，而是一个更现实的中间层：维修卫星、装配材料、监测地球、测试微重力制造。人类不会一下子搬去太空，但会先把一部分工作搬上去。\n\n在这个场景里，太空不再只是发射瞬间的火光，而是一套排班、维修、库存、保险和远程操作系统。地面工程师和轨道机器人共同维护一个漂浮的工作港。\n\n可信的未来往往从浪漫退回运营。真正改变世界的，不是第一次到达，而是某件事能不能第二天继续做、下个月继续做、十年后更便宜地做。"
,
      posterBrief: "近地轨道工作港，模块化平台、卫星维修臂、地球弧线、远程工程师界面和小型运输器，冷静、工程化、带有日常工作感。"
    }),
    draftEntry({
      slug: "2026-05-06-longevity-commons",
      week: "W19",
      collection: "future-world",
      title: "长寿公共花园",
      theme: "长寿技术变成公共生活设计",
      history: "如果寿命延长只属于少数人，它会制造裂缝；如果进入公共空间，它会改变城市。",
      essay: "长寿未来不应该只画实验室和富人诊所。更有意思的问题是：当健康寿命变长，普通社区如何重新安排运动、饮食、复健、社交和学习。\n\n长寿公共花园是一种城市想象。老人不是被隔离到护理机构，而是在同一片公共花园里训练平衡、接受轻量检测、和年轻人共同学习技能。医疗、运动和社交被设计成同一件事。\n\n这类未来的核心不是不老，而是让更多人拥有更长的有效生活。技术如果不能进入公共空间，就只是奢侈品；进入公共空间，才会变成文明结构。"
,
      posterBrief: "未来社区长寿花园，老人、年轻人和孩子共享空间，柔性训练设备、健康检测亭、可食用植物、康复步道和学习屏幕自然融合。"
    }),
    draftEntry({
      slug: "2026-05-06-memory-court",
      week: "W19",
      collection: "future-world",
      title: "记忆法庭",
      theme: "个人数据开始需要公共裁决机制",
      history: "当一生的数据被长期保存，未来社会必须处理遗忘权、证明权和纠错权。",
      essay: "未来人的记忆不会只留在脑中。照片、聊天、健康记录、位置轨迹、工作成果和 AI 代理的日志，会共同组成一个可检索的第二记忆。\n\n问题是，记忆一旦变成数据，就会出现争议。哪些记录可以证明一个人的贡献，哪些记录应该被删除，哪些算法摘要扭曲了事实，谁有权纠正它们。记忆法庭不是科幻审判，而是未来社会可能需要的一种公共机制。\n\n它提醒人：数据不是天然客观。一个文明如果保存越来越多记忆，也必须学会给记忆上诉的机会。",
      posterBrief: "未来公共数据法庭，黑金档案大厅、透明证据屏、个人记忆时间线、AI 记录员和市民裁决席，庄重、可信、带有制度感。"
    }),
    draftEntry({
      slug: "2026-05-06-personal-energy-loop",
      week: "W19",
      collection: "future-world",
      title: "个人能源循环",
      theme: "每个人都开始管理自己的小型能量系统",
      history: "未来能源不只属于电网和公司，也会进入家庭、穿戴设备和个人出行的日常管理。",
      essay: "能源转型常被想象成巨大的电站、储能厂和输电网络，但未来也可能变得很贴身。人的衣物、交通工具、住宅、移动电源和社区共享电池，会组成一个微型能源循环。\n\n个人能源循环不意味着每个人都离网生活，而是让人看见自己的能量行为：什么时候消耗，什么时候储存，什么时候共享，什么时候把设备交给社区网络调度。\n\n这类未来的价值在于把宏观能源问题带回身体和生活。能源不再只是账单上的数字，而成为个人世界模型的一部分。",
      posterBrief: "未来个人能源管理海报，穿戴设备、家庭电池、共享充电站、城市微电网和个人能量仪表盘连接成黑金档案式系统图。"
    }),
    draftEntry({
      slug: "2026-05-06-agent-civic-hall",
      week: "W19",
      collection: "future-world",
      title: "Agent 市政厅",
      theme: "公共服务从窗口办理变成代理协作",
      history: "AI 代理进入公共部门后，市政服务会从排队、填表和跨部门转接，变成可追踪的协作流程。",
      essay: "未来市政厅可能不再以窗口为中心，而以任务为中心。居民提出一个生活问题：改地址、申请照护、修复道路、查询补贴。多个公共 Agent 会把它拆成权限、材料、流程和负责人。\n\n真正重要的不是少填几张表，而是公共系统变得可解释。居民能看到事情卡在哪里，哪个部门负责，什么判断由人做，什么判断由机器预处理。\n\nAgent 市政厅的关键是信任。如果公共 AI 只是黑箱，它会制造新的不平等；如果它把流程摊开，就可能让公共服务第一次变得像一个可复盘的系统。",
      posterBrief: "未来市政大厅，居民与公共 AI 代理协作，透明流程图、任务队列、部门节点和人工审核席组成黑金档案风格的公共服务控制台。"
    }),
    draftEntry({
      slug: "2026-05-06-climate-shelter-market",
      week: "W19",
      collection: "future-world",
      title: "气候避难市场",
      theme: "城市需要为极端天气设计临时生活经济",
      history: "气候波动增加后，避难不再只是应急事件，而会发展出食物、能源、医疗、通信和居住的临时系统。",
      essay: "未来城市面对极端高温、洪水、烟尘和停电时，不能只依靠一次性救援。它需要可快速展开的避难市场：冷却点、临时食堂、电池租借、药品补给、通信站、儿童照护和宠物安置。\n\n这里的市场不是投机，而是组织方式。人们需要知道哪里有水，哪里有电，谁需要帮助，哪些资源应该优先分配。临时系统越清楚，恐慌越少。\n\n气候避难市场让未来城市的韧性变得具体。真正的文明不是永远没有灾害，而是在灾害来临时仍然能保持秩序和互助。",
      posterBrief: "未来城市气候避难市场，黑金夜景、冷却帐篷、电池站、医疗桌、公共信息屏和人群动线，像严肃城市应急档案海报。"
    }),
    draftEntry({
      slug: "2026-05-06-skill-passport",
      week: "W19",
      collection: "future-world",
      title: "技能护照",
      theme: "人的能力被持续记录、验证和迁移",
      history: "当职业变化加速，学历不再足够描述一个人，技能需要更细、更动态的证明方式。",
      essay: "未来的简历可能会变成技能护照。它记录的不只是学校和公司，而是一个人完成过的项目、协作过的系统、通过的验证、持续练习的能力和可以迁移到新环境的经验。\n\n技能护照不是把人变成评分表。好的设计应该让人证明自己，而不是被算法单方面定义。它需要可解释的证据、人的背书和可撤回的权限。\n\n它代表一种更现实的未来：人会不断换任务、换工具、换组织，但能力如果能被带走，人的长期成长就不会被单一机构锁住。",
      posterBrief: "未来技能护照档案，个人能力地图、项目证明、AI 验证章、同行背书和跨城市工作许可组成黑金色职业迁移海报。"
    }),
    draftEntry({
      slug: "2026-05-07-trust-ledger",
      week: "W19",
      collection: "future-world",
      title: "信任账本",
      theme: "社会信用从单一评分转向可解释的信任记录",
      history: "未来系统需要记录协作中的可信行为，但也必须避免把人压扁成一个分数。",
      essay: "信任很难被量化，但未来协作越来越依赖远程身份、AI 代理、临时团队和跨平台交易。人们需要知道一个人或一个系统是否可靠，却不能只靠平台给出的黑箱评分。\n\n信任账本是一种更克制的想象。它记录具体行为：是否按时交付，是否公开纠错，是否履行承诺，是否在冲突中留下清晰证据。它不把人变成一个总分，而是让信任可以被解释、被申诉、被上下文理解。\n\n真正成熟的信任系统，不是让人永远被过去束缚，而是让合作有依据，让改正也有路径。",
      posterBrief: "未来信任账本档案，黑金公共记录界面、协作证据、承诺履约时间线、申诉入口和人工仲裁席组成严肃可信的制度海报。"
    }),
    draftEntry({
      slug: "2026-05-07-sensor-neighborhood",
      week: "W19",
      collection: "future-world",
      title: "传感器街区",
      theme: "城市开始拥有细颗粒度的环境神经系统",
      history: "未来街区会通过空气、水、噪声、热岛、人流和能源传感器，形成更精确的公共感知。",
      essay: "未来城市不只靠摄像头理解自己。真正重要的可能是更细的环境传感器：哪条街热到老人不能走，哪栋楼的噪声影响睡眠，哪片雨水花园正在吸收洪峰，哪段路灯需要降低亮度。\n\n传感器街区的关键不是监控人，而是让公共环境可被维护。数据如果只服务管理者，它会制造压迫；如果服务居民，它可以让城市变得更可申诉、更可修复。\n\n这个未来的边界很清楚：城市可以更敏感，但不能更粗暴。越多感知，越需要越清楚的权限和透明度。",
      posterBrief: "未来传感器街区，夜色城市中空气、水质、噪声、热岛和人流数据以黑金 UI 面板覆盖在真实街道上，安静、精密、公共感强。"
    }),
    draftEntry({
      slug: "2026-05-07-robot-repair-cafe",
      week: "W19",
      collection: "future-world",
      title: "机器人维修咖啡馆",
      theme: "机器人进入日常后，维修会变成社区生活的一部分",
      history: "当机器人从工业现场进入家庭和街区，维护、升级和二手流通会成为新的社区基础设施。",
      essay: "未来机器人不会只在展厅里闪亮。它们会坏，会磨损，会需要清洁、标定、换电池、换关节，也会被二手转让给新的家庭。于是社区里可能出现机器人维修咖啡馆。\n\n人在这里不只是修机器，也学习和机器共处。孩子看见机械臂被拆开，老人把配送小车带来调试，工程师在一旁喝咖啡更新固件。技术从神秘产品变成可以维护的生活工具。\n\n这类未来很重要，因为真正进入生活的技术，一定要可维修。不能修的机器，最后会变成昂贵的垃圾。",
      posterBrief: "未来社区机器人维修咖啡馆，黑金档案风格，桌上拆开的服务机器人、维修师、居民、零件柜、诊断屏和咖啡灯光组成温暖精密的场景。"
    }),
    draftEntry({
      slug: "2026-05-07-local-compute-library",
      week: "W19",
      collection: "future-world",
      title: "本地算力图书馆",
      theme: "社区像借书一样借用安全算力",
      history: "AI 能力普及后，算力会成为类似图书馆、实验室和公共电脑室的公共资源。",
      essay: "未来的图书馆可能不只借书，也借算力。学生训练小模型，老人整理家庭影像，创业者跑仿真，社区组织分析能源数据。重要任务可以在本地安全环境里完成，而不是全部上传到远方平台。\n\n本地算力图书馆的意义在公共性。它让没有昂贵设备的人也能使用 AI，让隐私敏感的数据不必离开社区，让学习和创造拥有更低门槛。\n\n这个场景不像大型数据中心那样壮观，却可能更接近 AI 进入文明底层的方式：像水、电、书桌和灯一样，被普通人稳定使用。",
      posterBrief: "未来社区本地算力图书馆，黑金档案海报，安静书架、GPU 机柜、隐私计算舱、学生和居民使用 AI 工作站，带细密资源调度面板。"
    }),
    draftEntry({
      slug: "2026-05-07-civic-simulation-room",
      week: "W19",
      collection: "future-world",
      title: "市民仿真室",
      theme: "公共决策先在可视化模型里排练",
      history: "城市治理越来越复杂，未来公共项目可能需要让市民直接看见不同方案的后果。",
      essay: "一条路要不要改造，一片地要不要建公园，一套补贴政策会影响谁。过去这些问题藏在报告和会议里，普通人很难感知后果。\n\n市民仿真室把公共决策变成可进入的模型。居民站在沉浸式地图前，看见交通、热岛、租金、学校、商铺和老人出行如何随方案变化。争论不再只靠口号，而有共同可见的模拟底图。\n\n它不能替代政治判断，但能提高讨论质量。未来的公共生活，应该让更多人看见复杂系统，而不是只被复杂系统影响。",
      posterBrief: "未来市民仿真室，沉浸式城市模型、居民讨论、方案对比面板、交通热岛租金指标和黑金档案 UI，严肃、可信、带公共参与感。"
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
    }),
    draftEntry({
      slug: "2026-05-06-rain-museum",
      week: "W19",
      collection: "imagination",
      title: "雨的博物馆",
      theme: "每一种雨都被收藏成展品",
      history: "把天气从背景变成展品，可以重新打开人对环境和情绪的感知。",
      essay: "雨通常只是场景的附属物。雨的博物馆把它反过来：毛毛雨、铁锈雨、倒流的雨、只落在影子上的雨、会发出旧收音机声音的雨，都被装进透明展柜。\n\n参观者不再只是躲雨，而是辨认雨。每一种雨对应一种情绪、一段城市史、一种还没被命名的气候。天气不再是外部环境，而像记忆一样可以被归档。\n\n这个想象的价值在于改变主次。很多被我们当成背景的东西，换一个展示方式，就会变成思想的主体。"
,
      posterBrief: "一座夜间博物馆，透明展柜中收藏不同形态的雨：金色雨、倒流雨、悬浮雨、影子雨，观众安静穿行，奇异但优雅。"
    }),
    draftEntry({
      slug: "2026-05-06-folded-sun",
      week: "W19",
      collection: "imagination",
      title: "折叠太阳",
      theme: "天空被折成可以携带的光",
      history: "把最大尺度的天体变成可折叠物，制造强烈的尺度反转。",
      essay: "如果太阳不是挂在天上，而是一张可以折叠的金色纸，人类会怎样使用白天。有人把清晨折进口袋，有人把黄昏夹进书页，有人把正午铺在寒冷的广场上。\n\n折叠太阳让光不再只是照明，而变成材料。它可以被借出、修补、典当、遗失。白天从自然规律变成社会物品，新的秩序也随之出现。\n\n这种想象荒诞，但它逼迫人重新思考能源、时间和公共资源。谁拥有光，谁分配光，谁有权决定一座城市什么时候天亮。"
,
      posterBrief: "一群人在黑色广场上展开折叠的金色太阳，纸质光芒照亮建筑边缘，天空像被折痕切开，庄严、奇异、极具设计感。"
    }),
    draftEntry({
      slug: "2026-05-06-language-aquarium",
      week: "W19",
      collection: "imagination",
      title: "语言水族馆",
      theme: "词语像发光生物在水中游动",
      history: "把语言变成生命体，可以训练对表达、意义和误解的重新观察。",
      essay: "语言水族馆里，词语不是印在纸上，而是在水里游动。有些词透明，有些词长着刺，有些词会靠近人又突然变色。句子不是被写出来，而是由一群词语短暂组成队形。\n\n人在这里学习说话，像学习照顾一种脆弱生物。太粗暴的句子会把词吓散，太含糊的表达会让水变浑。只有足够准确的意思，才能让词群稳定发光。\n\n这个画面把表达变成了生态。语言不是工具箱，而是一座需要维护的水域。"
,
      posterBrief: "深蓝水族馆中，汉字、字母和符号像发光鱼群游动，人物站在玻璃前观察，句子形成短暂星座，诗意、陌生、清晰。"
    }),
    draftEntry({
      slug: "2026-05-06-staircase-comet",
      week: "W19",
      collection: "imagination",
      title: "彗星楼梯",
      theme: "一段楼梯拖着尾焰穿过夜空",
      history: "把日常建筑构件赋予宇宙运动，制造方向感和不可能的旅行。",
      essay: "楼梯通常意味着向上或向下。彗星楼梯不接受这个规则，它拖着长长的银色尾焰穿过夜空，每一级台阶都短暂停留在不同年份、不同梦境、不同未发生的选择上。\n\n走在上面的人并不知道终点在哪里。他不是登楼，也不是飞行，而是在一段会移动的结构上学习平衡。脚下是建筑，身边是宇宙，前方是不断改变方向的路径。\n\n这种想象把人生的线性隐喻打碎。也许道路不是铺好的，也许楼梯本身会成为天体。"
,
      posterBrief: "一段发光楼梯像彗星一样划过星空，台阶上站着小小人物，尾焰由时间刻度、门和碎片记忆组成，壮丽而安静。"
    }),
    draftEntry({
      slug: "2026-05-06-shadow-theater",
      week: "W19",
      collection: "imagination",
      title: "影子剧院",
      theme: "影子离开身体，自行演出未说出口的人生",
      history: "影子是最轻的自我副本，适合承载潜意识和未选择路径。",
      essay: "影子剧院里，观众坐在台下，看自己的影子登台。影子不重复现实动作，而是演出那些没有说出口的话、没有走进去的门、没有成为的身份。\n\n有人看到自己的影子成为水手，有人看到它变成一座房子，有人看到它坐在童年的餐桌旁。影子不解释，只表演。人第一次意识到，自己并不只有一个轮廓。\n\n这个想象之所以有力量，是因为它把内心的分叉变成公共戏剧。每个人都带着一座看不见的剧院，只是平时灯还没亮。"
,
      posterBrief: "黑金色小剧院，观众坐在暗处，舞台上的影子脱离身体演出不同人生，幕布、侧光、多个轮廓重叠，神秘但精致。"
    }),
    draftEntry({
      slug: "2026-05-06-breathing-archive",
      week: "W19",
      collection: "imagination",
      title: "会呼吸的档案馆",
      theme: "被保存的历史像生物一样起伏",
      history: "把档案从静止物变成有节律的生命体，可以重新理解历史如何影响现在。",
      essay: "普通档案馆安静、固定、等待检索。会呼吸的档案馆不是这样。它的墙面随着被遗忘的事件轻微起伏，书页在无人触碰时翻动，某些柜子会在城市发生相似事件时自己亮起。\n\n这里的历史不是死材料，而像一个仍在代谢的系统。人走进去，不是寻找过去，而是被过去的呼吸包围。\n\n这个想象让人意识到：历史从来没有真正静止。它只是以更慢的节奏影响今天。",
      posterBrief: "黑金色未来档案馆，书柜和墙面像生物胸腔一样呼吸，发光文件、雾气、心跳式数据面板和孤独读者组成超现实馆藏海报。"
    }),
    draftEntry({
      slug: "2026-05-06-walking-house",
      week: "W19",
      collection: "imagination",
      title: "行走的房子",
      theme: "家不再固定，而是带着人缓慢迁徙",
      history: "把房屋赋予移动能力，可以把安全感、迁徙和归属感放在同一张图里。",
      essay: "如果房子会走路，搬家就不再是离开，而是带着生活一起迁徙。窗台上的植物、厨房的味道、墙上的旧照片，都跟着屋子跨过桥、穿过雾、停在新的地平线上。\n\n行走的房子不是交通工具，而是一个关于归属的悖论：家到底是一块土地，还是一套可以被携带的关系。\n\n它让人重新思考流动时代的安全感。也许未来的家不一定扎根，但仍然可以记住人。",
      posterBrief: "一座黑金色细节丰富的房子长出机械腿，在夜色城市边缘缓慢行走，窗户发光，室内生活可见，像纪念册超现实档案封面。"
    }),
    draftEntry({
      slug: "2026-05-06-mirror-railway",
      week: "W19",
      collection: "imagination",
      title: "镜面铁路",
      theme: "列车驶向每个没被选择的人生",
      history: "铁路天然承载方向和命运，把它变成镜面，可以制造强烈的平行人生感。",
      essay: "镜面铁路的轨道像一条长镜子。列车开过时，窗外不是风景，而是乘客没有选择的那些生活：没有搬去的城市、没有说出口的话、没有开始的职业、没有告别的人。\n\n乘客不能下车，只能看见。镜面铁路不提供后悔药，只提供一种温柔的确认：每一次选择都会留下另一条影子。\n\n这个想象把人生的分叉变成了交通系统。它不解释命运，只让人短暂看见命运的背面。",
      posterBrief: "夜色中的镜面铁路，黑金列车穿过反射轨道，车窗里映出多个平行人生场景，数据面板像时刻表一样记录未选择路径。"
    }),
    draftEntry({
      slug: "2026-05-06-planetary-desk",
      week: "W19",
      collection: "imagination",
      title: "行星书桌",
      theme: "一个人的桌面上摆着可旋转的小宇宙",
      history: "把宇宙尺度压缩到工作桌，可以让日常劳动和巨大世界产生奇妙的比例反差。",
      essay: "行星书桌上没有普通文具。墨水瓶里有潮汐，小抽屉里存着云层，台灯照亮一颗正在缓慢自转的小行星，便签纸像大陆板块一样漂移。\n\n人在这张桌前写字，不是在处理文件，而是在调整一个微型世界的秩序。每一次移动杯子，都可能改变某片海的天气。\n\n它把创作、责任和想象绑在一起。也许每个长期项目，都是一颗需要照看的小行星。",
      posterBrief: "黑金色研究员书桌，上面摆着可旋转的小行星、发光海洋、云层抽屉、星图便签和细密控制面板，精致、神秘、档案感强。"
    }),
    draftEntry({
      slug: "2026-05-06-silent-carnival",
      week: "W19",
      collection: "imagination",
      title: "无声嘉年华",
      theme: "所有热闹都被静音，只剩光和动作",
      history: "剥离声音可以让熟悉的狂欢变成陌生仪式，重新观察群体情绪。",
      essay: "无声嘉年华里，旋转木马在转，烟花在开，小丑在挥手，观众在笑，但没有任何声音。人只能看见动作、灯光和表情，像在观看一个被抽走声带的梦。\n\n当热闹被静音，快乐会变得奇怪。人开始注意到每个笑容背后的疲惫，每个手势里的重复，每盏灯照不到的角落。\n\n这个想象不是反对快乐，而是把群体情绪拆开来看。也许最喧闹的地方，最适合练习安静。",
      posterBrief: "黑金色夜间嘉年华，旋转木马、烟花和人群都像被静音，空气中漂浮无声波形和档案标签，华丽、诡异、精致。"
    }),
    draftEntry({
      slug: "2026-05-07-dream-customs",
      week: "W19",
      collection: "imagination",
      title: "梦境海关",
      theme: "每个梦醒来前都要接受检查",
      history: "把梦境设置成跨境物品，可以重新理解潜意识、记忆和遗忘的边界。",
      essay: "梦境海关设在清晨和醒来的交界处。每个人离开睡眠前，都要把梦里的物品放到传送带上：一只会说话的钥匙、一封没有地址的信、一段陌生人的童年、一片还没发生的雪。\n\n海关不会没收梦，只会盖章。有些梦允许带回现实，有些必须留在夜里，有些会被拆开，只让人带走其中一个颜色。\n\n这个想象把醒来变成一种通关。它提醒人：我们每天都从另一个国家回来，只是很少检查行李。",
      posterBrief: "黑金色梦境海关，清晨边境大厅、传送带上的奇异梦境物品、盖章官、半透明行李箱和档案式检查面板，荒诞而精致。"
    }),
    draftEntry({
      slug: "2026-05-07-cloud-post-office",
      week: "W19",
      collection: "imagination",
      title: "云层邮局",
      theme: "写给未来天气的信在高空分拣",
      history: "邮局天然连接等待和远方，把它搬到云层中，可以让天气、时间和情感发生交换。",
      essay: "云层邮局建在风的中间。信件不是寄给人，而是寄给天气：一封给下周的雨，一封给十年后的雪，一封给某个城市迟到的黄昏。\n\n邮差穿过云洞，把信装进透明瓶子。等风向合适时，某封信会变成一场雾，某封信会落成一阵细雨，某封信则永远被留在高空，成为一小片不会散开的云。\n\n它让等待有了形状。也许所有写不出去的话，最后都会被天空代收。",
      posterBrief: "高空云层邮局，黑金档案海报，漂浮邮筒、云中分拣台、透明信瓶、天气邮差和细密航线面板，诗意、明亮又神秘。"
    }),
    draftEntry({
      slug: "2026-05-07-secret-lighthouse",
      week: "W19",
      collection: "imagination",
      title: "秘密灯塔",
      theme: "灯塔只为迷路的想法发光",
      history: "灯塔是方向的象征，把它从航海转向思维，可以制造知识探索的隐喻空间。",
      essay: "秘密灯塔不建在海边，而建在人的脑内边界。它平时完全黑暗，只有当一个想法迷路时才亮起：未完成的计划、误解的概念、被搁置的野心、说不清的直觉。\n\n灯光不会指出答案，只会照亮问题所在。有人看见一条通往旧书的路，有人看见一扇通向未来的门，有人只看见自己一直绕着同一个疑问打转。\n\n这个想象适合长期学习。真正的灯塔不是替你航行，而是在你快忘记方向时，证明岸还存在。",
      posterBrief: "黑金色秘密灯塔，漂浮在思想海面与星图之间，只照亮迷路的概念、书页、门和路径，带档案标签和思维导航面板。"
    }),
    draftEntry({
      slug: "2026-05-07-singing-map",
      week: "W19",
      collection: "imagination",
      title: "会唱歌的地图",
      theme: "地理不再只是位置，而有自己的旋律",
      history: "把地图从视觉工具变成声音生物，可以重新打开对地方、记忆和路线的感知。",
      essay: "会唱歌的地图无法被安静展开。每一条河有低音，每一座桥有短促的和弦，每个曾经迷路的街角都会轻轻跑调。\n\n人不再读地图，而是听地图。熟悉的城市有熟悉的旋律，陌生的地方则像一首尚未学会的歌。路线不是从 A 到 B，而是一段必须跟上的节奏。\n\n这个想象让地理变得亲密。地方不只是坐标，它也会记住人走过时的声音。",
      posterBrief: "黑金色会唱歌的地图，立体城市地图上浮现音符、河流声波、桥梁和弦与路线旋律，人物戴耳机聆听，档案面板记录地理乐谱。"
    }),
    draftEntry({
      slug: "2026-05-07-last-moon-train",
      week: "W19",
      collection: "imagination",
      title: "最后一班月亮列车",
      theme: "午夜后仍有一辆车开往月光背面",
      history: "末班车自带离别感，把目的地改成月亮背面，可以制造温柔又辽阔的幻想。",
      essay: "最后一班月亮列车只在午夜后发车。站台没有广告，只有一盏旧灯和一张写着月相的时刻表。乘客不多：一个带着旧箱子的孩子，一个忘记回家的老人，一个把影子折好放进口袋的人。\n\n列车开出城市后，铁轨变细，像一根银线缝进天空。没人知道月亮背面有什么，也许是所有错过的告别，也许只是另一座安静车站。\n\n它不是逃离现实，而是给夜晚留一个出口。有些路白天找不到，只能等月光铺好。",
      posterBrief: "黑金色午夜车站，最后一班月亮列车驶向巨大月亮背面，银色轨道穿过云层，乘客安静等待，带时刻表和档案式路线面板。"
    })
  ]
];
