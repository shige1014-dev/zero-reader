/**
 * BEDROCK · 基岩层
 *
 * 论点：AI 不是软件在跑赢硬件，是软件在等硬件。
 * 互联网时代软件单边扩张，AI 时代必须与物理基建同频。
 * 本页是认知地图，不是选股清单——地基不在场，AI 跨不过去。
 *
 * 数据原则：
 * - 排除中国公司（A 股 / 港股 / 中概）
 * - 每 tier 6-8 家代表，覆盖美/欧/日/韩/台
 * - 字段全部围绕"在系统中的角色 + 节奏 gap"，无投资语言
 */

export type BedrockTierId =
  | "semi-equipment"
  | "semi-materials"
  | "power-grid"
  | "rare-metals"
  | "battery-energy"
  | "motor-power"
  | "photonics-sensing"
  | "dc-physical"
  | "photonics-network"
  | "eda-ip";

export type GapSeverity = "critical" | "severe" | "moderate";

export interface BedrockTier {
  id: BedrockTierId;
  label: string;        // 中文标签
  en: string;           // 英文 kicker
  order: number;        // 在地基中从浅到深
  gap: GapSeverity;     // 节奏缺口严重度
  attentionLevel: "low" | "medium" | "high"; // 大众关注度
  thesis: string;       // 总纲（3-5 句话，讲透这层是什么 + 为什么是地基）
  coreIdeas: string[];  // 核心理解（3-5 条要点）
  rhythmGap: string;    // 当前节奏 vs 所需节奏（数据/事实）
  oneLineRole: string;  // 一句话: 它在 AI 跨越中扮演什么
}

export interface BedrockCompany {
  ticker: string;
  name: string;             // 英文官方名
  nameZh: string;           // 中文译名
  country: string;          // 🇺🇸 / 🇳🇱 / 🇯🇵 / 🇰🇷 / 🇹🇼 / 🇩🇪 / 🇨🇭 / 🇫🇷
  tier: BedrockTierId;
  bypassIndex: number;      // 不可绕过指数 1-10
  whatItDoes: string;       // 它在做什么（中性事实）
  whyAINeedsIt: string;     // AI 跨越需要它的什么
  rhythmStatus: string;     // 当前节奏 vs 所需节奏
  substituteLevel: string;  // 替代度: "无 / 低 / 中 / 高"
  starRating: 1 | 2 | 3 | 4 | 5;  // 不可替代性星级 (一目了然)
  replacementYears: "永不" | "20+ 年" | "10-15 年" | "5-10 年" | "5 年内";
  related?: string[];       // 关联到 /matrix 的 ticker（可点跳转）
}

export const BEDROCK_TIERS: BedrockTier[] = [
  {
    id: "semi-equipment",
    label: "半导体设备",
    en: "SEMICONDUCTOR EQUIPMENT",
    order: 1,
    gap: "critical",
    attentionLevel: "medium",
    oneLineRole: "AI 算力的物理产能上限。",
    thesis:
      "每一颗 NVIDIA / AMD / 自研 ASIC 都要经过光刻、沉积、清洗、量测才能从硅片变成芯片。这层是垄断到极致的赛道——光刻只剩 ASML 一家，量测 KLA 一家寡头，蚀刻只有 LRCX 与 TEL 两家。AI 资本支出再多，也要排队等这些机器出货。",
    coreIdeas: [
      "EUV 光刻机全球唯一供应商：ASML，年出货约 50-60 台。",
      "5nm 以下节点必须用 EUV，3nm/2nm 还要 High-NA EUV（更稀缺）。",
      "AMAT / LRCX / KLA 在沉积/蚀刻/量测各自寡头，互不重叠。",
      "TEL（东京电子）垄断涂胶显影，几乎无替代。",
      "扩产周期 18-24 个月，远落后 AI 资本开支增速。"
    ],
    rhythmGap:
      "AI 巨头资本开支预计 2024-2027 翻倍以上，但 EUV 出货线性增长（年增 5-10 台）。光刻产能 4 年内追不上需求，瓶颈直接传导至先进芯片产能。"
  },
  {
    id: "semi-materials",
    label: "半导体材料",
    en: "SEMICONDUCTOR MATERIALS",
    order: 2,
    gap: "critical",
    attentionLevel: "low",
    oneLineRole: "硅片、光刻胶、特气——芯片的「原料」。",
    thesis:
      "半导体是雕在硅上的城市。但雕刻之前要有干净的硅片、要有能精确显影的光刻胶、要有特种气体维持洁净环境。这些原料看似不性感，全球供应却高度集中——日本占据光刻胶 80%+，硅片几乎是日德垄断。第三代半导体（SiC、GaN）正在重塑功率电子，决定电动车与电网未来。",
    coreIdeas: [
      "光刻胶：Shin-Etsu / JSR / TOK / Sumitomo 四家日本公司占全球 ≥80%。",
      "高纯硅片：Shin-Etsu Handotai + SUMCO 合计约 60% 全球份额。",
      "电子特种气体：Linde / Air Products / Air Liquide 三巨头瓜分。",
      "SiC（碳化硅）衬底：Wolfspeed 一家曾占 60%，现 II-VI/Coherent 追上。",
      "光阻材料配方往往要 5-10 年优化，新进入者几乎无机会。"
    ],
    rhythmGap:
      "高纯硅片产能 2-3 年内紧平衡，先进光刻胶量产线建设 5 年起。SiC 衬底产能 2026-2028 翻倍，但电动车 + 数据中心 + 国防同时抢量。"
  },
  {
    id: "power-grid",
    label: "电力 + 电网",
    en: "POWER & GRID",
    order: 3,
    gap: "critical",
    attentionLevel: "medium",
    oneLineRole: "AI 数据中心的电力命脉。",
    thesis:
      "训练 1 个前沿大模型耗电相当于一座中型城市半年用电。GPT-5 级别推理集群单座功率达 1-2 GW（千兆瓦），相当于一个核电站。美国电网过去 10 年几乎没增加新容量，现在突然要为 AI 加 50-100 GW，靠的是核电 + 燃气 + 可再生 + 储能 + 输电线全部一起上。这层是 AI 落地最硬的瓶颈——再多 GPU，没电也白搭。",
    coreIdeas: [
      "美国电力需求过去 10 年年增 <1%，2024 起突然跳到 3-5%。",
      "新建核电从立项到并网 8-15 年，远超数据中心建设周期。",
      "微软已与 Constellation 签 20 年长协，重启三里岛核电站。",
      "电网输电瓶颈比发电更紧——输电线建设审批要 5-10 年。",
      "Eaton / Quanta / GE Vernova 等输配电设备公司订单已排到 2028。"
    ],
    rhythmGap:
      "AI 算力扩张需要每年新增 30-50 GW 数据中心电力，美国当前年净增电力容量 ~10 GW。缺口 3-5 倍，需 5-10 年消化。"
  },
  {
    id: "rare-metals",
    label: "稀土 + 关键金属",
    en: "RARE METALS & MINERALS",
    order: 4,
    gap: "severe",
    attentionLevel: "low",
    oneLineRole: "电机、磁体、电池的物质源头。",
    thesis:
      "电动车、机器人、风电、雷达、导弹——所有需要永磁电机和功率电子的东西，最终都需要稀土。铜决定电网与数据中心连接。锂、镍、钴决定电池容量。这层最深也最被忽视，因为它从不出现在科技新闻里，但西方过去 30 年几乎放弃了稀土加工，今天 80%+ 加工产能集中在地缘对手手里——这是 AI 时代真正的卡脖子。",
    coreIdeas: [
      "稀土加工（不是采矿）80%+ 在中国，西方供应几乎为零。",
      "MP Materials 是美国唯一在产稀土矿，但加工依赖外送。",
      "铜需求 2024-2035 预计翻倍，主要驱动是电网 + 电动化。",
      "锂供给 2024 过剩，但 2028 后预计转为短缺（电动+储能爆发）。",
      "钴 70%+ 在刚果，伦理与地缘双重风险。"
    ],
    rhythmGap:
      "西方稀土加工产能从 0 到 30% 自主估计需 5-8 年。铜矿从勘探到投产 15-20 年，远落后电网与电动化节奏。"
  },
  {
    id: "battery-energy",
    label: "电池 + 储能材料",
    en: "BATTERY & ENERGY STORAGE",
    order: 5,
    gap: "severe",
    attentionLevel: "medium",
    oneLineRole: "可再生能源的「时间转换器」，也是 AI 数据中心的备用电源。",
    thesis:
      "太阳能 + 风电没办法 24/7 给数据中心供电，必须靠储能「搬运」时间。电池不只是电动车的事——电网级储能 2024-2030 预计是 10 倍增长。锂、电解液、隔膜、正负极——每一层都是寡头。西方在隔膜与电解液上几乎完全依赖东亚（日韩）。",
    coreIdeas: [
      "锂资源：Albemarle + Livent (现合并为 Arcadium) + SQM (智利) 三大供应。",
      "电池正极：Umicore (比利时) + LG Energy Solution + Samsung SDI 主导。",
      "隔膜：日本旭化成 + Toray + 韩国 SK IE 寡头。",
      "电网级储能：Fluence (Siemens 与 AES 合资) 系统集成龙头。",
      "电池循环寿命与成本仍是商业储能的限制因素。"
    ],
    rhythmGap:
      "美国/欧洲电池产能 2024-2030 在建项目可让本土供给翻 5 倍，但隔膜/正极原材料仍 70%+ 依赖东亚。供应链本地化需 8-12 年。"
  },
  {
    id: "motor-power",
    label: "电机 + 永磁 + 功率电子",
    en: "MOTORS & POWER ELECTRONICS",
    order: 6,
    gap: "severe",
    attentionLevel: "low",
    oneLineRole: "把电变成动作——机器人、电动车、风电的核心。",
    thesis:
      "AI 一旦从屏幕走到物理世界（机器人、自动化、电动出行），需要的是电机 + 功率电子 + 永磁体。这是工业革命留下的硬骨头：高效电机设计专利在德日，永磁体材料供应链卡在稀土，功率电子从硅 IGBT 转向碳化硅 MOSFET 是当前最关键的技术跃迁。",
    coreIdeas: [
      "Nidec（日本）是全球小型精密电机霸主，覆盖硬盘到机器人到电动车。",
      "ABB / Siemens / Yaskawa 三家瓜分工业自动化伺服电机。",
      "Wolfspeed（碳化硅 MOSFET）是西方唯一规模玩家。",
      "Allegro Microsystems / onsemi 提供电机驱动器与传感 IC。",
      "永磁体 80% 加工产能集中在地缘对手（不在本页公司列表内）。"
    ],
    rhythmGap:
      "人形机器人 2026-2030 预计从万台跨入百万台规模，精密减速器 + 力矩传感器产能远不足；SiC 功率器件 2024-2027 产能翻倍仍可能短缺。"
  },
  {
    id: "photonics-sensing",
    label: "光感 + 光电传感",
    en: "PHOTONICS & SENSING",
    order: 7,
    gap: "severe",
    attentionLevel: "low",
    oneLineRole: "让机器看见世界。",
    thesis:
      "自动驾驶、机器人、医疗成像、工业检测——所有需要「看」的 AI 应用都依赖光感。CMOS 图像传感器 70% 是 Sony，LiDAR 仍未跑出真正赢家，红外探测被法美寡头瓜分。激光在通信、制造、医疗都不可替代。这层往往被算法层掩盖——但没有传感器，「AI 视觉」只是空话。",
    coreIdeas: [
      "Sony 占全球 CMOS 图像传感器约 50% 市场，几乎垄断高端手机与车载。",
      "OmniVision（虽然总部美国但已被中国韦尔股份收购）在车载中端有份额。",
      "LiDAR：Luminar / Innoviz / Ouster 仍在洗牌期，无定论赢家。",
      "Lynred（法国）+ Teledyne FLIR 主导红外探测。",
      "IPG Photonics + Coherent 在工业激光占主导。"
    ],
    rhythmGap:
      "车载 CMOS 与 LiDAR 需求 2024-2030 估计 4-6 倍增长，但产能扩张受光学器件良率约束。激光器订单 backlog 已排至 2026 末。"
  },
  {
    id: "dc-physical",
    label: "数据中心物理层",
    en: "DATA CENTER PHYSICAL",
    order: 8,
    gap: "moderate",
    attentionLevel: "medium",
    oneLineRole: "GPU 集群的散热、配电、空间。",
    thesis:
      "1000 台 GPU 关在一个机房会烧穿地板。AI 数据中心的真实瓶颈不只是芯片，还有冷却（液冷 / 浸没冷却）、不间断电源（UPS）、机柜密度、物理空间。Vertiv / Eaton 等公司在静默接到史无前例的订单，Equinix / Digital Realty 等数据中心地产商手握 AI 时代的「地皮」。",
    coreIdeas: [
      "Vertiv 是数据中心电力分配 + 液冷热管理的核心供应商。",
      "Eaton（已在 power-grid 出现）也是 UPS 系统主力，订单 backlog 创纪录。",
      "Trane / Modine / Johnson Controls 提供机房精密空调与液冷。",
      "Equinix / Digital Realty 是全球最大数据中心地产商。",
      "液冷渗透率 2024 仅 ~10%，预计 2028 达 40%+。"
    ],
    rhythmGap:
      "全球数据中心建设周期 2-4 年，AI 训练集群每年至少要新增 10-20 座超大规模站点。冷却技术从风冷转液冷需要 3-5 年逐步切换。"
  },
  {
    id: "photonics-network",
    label: "光通信 + 海底光缆",
    en: "OPTICAL NETWORK & SUBSEA CABLE",
    order: 9,
    gap: "moderate",
    attentionLevel: "low",
    oneLineRole: "数据流动的物理通路。",
    thesis:
      "AI 训练需要在 GPU 之间以 800Gbps / 1.6Tbps 速率交换数据，需要新一代光模块与光纤。全球数据中心之间、大陆之间，最终是靠海底光缆——99% 的国际数据流通过海缆，全球只有 4-5 家公司能铺。这层最不性感却最不可替代。",
    coreIdeas: [
      "Coherent / Lumentum 是高端光模块 + 激光器双雄。",
      "Corning 提供全球最多的玻璃光纤。",
      "Prysmian (意大利) + Nexans (法国) 主导海底光缆制造。",
      "SubCom (美国) 是少数海缆铺设承包商。",
      "800G 光模块 2024 量产，1.6T 进入 AI 集群 2025-2026。"
    ],
    rhythmGap:
      "AI 集群内带宽需求每 12 个月翻倍，光模块产能扩张需 18-24 个月。海缆建设从签约到投产 24-36 个月，新增容量年增长仅 ~15%。"
  },
  {
    id: "eda-ip",
    label: "EDA + 设计 IP",
    en: "EDA & DESIGN IP",
    order: 10,
    gap: "moderate",
    attentionLevel: "medium",
    oneLineRole: "芯片的设计软件——没有 EDA，画不出芯片。",
    thesis:
      "现代芯片有几百亿晶体管，靠人画是不可能的。EDA 软件（电子设计自动化）是芯片设计的工业 CAD，被 Synopsys / Cadence / Siemens EDA 三家垄断。Arm 提供指令集 IP，几乎所有手机芯片都基于它。这层是软件，但同样是地基——没有 EDA，再多硅片也变不成芯片。",
    coreIdeas: [
      "Synopsys + Cadence 合计占 EDA 全球约 70%，第三家是 Siemens（含 Mentor）。",
      "Arm 指令集授权覆盖几乎所有手机芯片与不少服务器芯片。",
      "EDA 与代工厂深度绑定（PDK），新进入者 5-10 年内无法挑战。",
      "AI 帮助 EDA 自身演化（AI-assisted chip design）。",
      "美国对 EDA 出口管制是芯片地缘竞争的关键工具。"
    ],
    rhythmGap:
      "EDA 收入年增 ~12%，但 AI 芯片设计复杂度增长更快（晶体管数 + 异构集成）。设计周期未压缩，部分先进项目排队等仿真算力。"
  }
];

export const BEDROCK_COMPANIES: BedrockCompany[] = [
  // ===== Tier 1: Semi Equipment =====
  {
    ticker: "ASML", name: "ASML Holding", nameZh: "阿斯麦", country: "🇳🇱",
    tier: "semi-equipment", bypassIndex: 10,
    whatItDoes: "全球唯一 EUV 光刻机制造商，5nm 以下节点必经设备。",
    whyAINeedsIt: "下一代 GPU/ASIC（3nm/2nm/1.4nm）的物理前提。没有 ASML，算法再聪明也变不成芯片。",
    rhythmStatus: "EUV 年出货 ~50 台。AI 资本开支按当前增速需 200+ 台/年，缺口 4 倍，需 4 年以上消化。",
    substituteLevel: "无", starRating: 5, replacementYears: "永不", related: ["ASML"]
  },
  {
    ticker: "AMAT", name: "Applied Materials", nameZh: "应用材料", country: "🇺🇸",
    tier: "semi-equipment", bypassIndex: 9,
    whatItDoes: "广谱半导体设备龙头：沉积、离子注入、CMP 等几乎全覆盖。",
    whyAINeedsIt: "TSMC、Intel、Samsung 扩产新晶圆厂，AMAT 设备订单是先行指标。",
    rhythmStatus: "订单 backlog 已排到 2027，先进节点扩产部分客户排队 12-18 个月。",
    substituteLevel: "低", starRating: 5, replacementYears: "永不", related: ["AMAT"]
  },
  {
    ticker: "LRCX", name: "Lam Research", nameZh: "拉姆研究", country: "🇺🇸",
    tier: "semi-equipment", bypassIndex: 9,
    whatItDoes: "蚀刻 + 沉积设备双寡头之一，HBM（高带宽内存）量产关键。",
    whyAINeedsIt: "AI GPU 必备 HBM 内存的产能扩张直接拉动 LRCX 设备需求。",
    rhythmStatus: "HBM 产能 2024-2026 三倍扩张，LRCX 蚀刻设备订单同步爆发。",
    substituteLevel: "低", starRating: 5, replacementYears: "永不"
  },
  {
    ticker: "KLAC", name: "KLA Corporation", nameZh: "科磊", country: "🇺🇸",
    tier: "semi-equipment", bypassIndex: 9,
    whatItDoes: "半导体量测与缺陷检测寡头，先进制程良率守门员。",
    whyAINeedsIt: "3nm/2nm 良率不靠 KLA 的检测就掌握不住，先进节点产能落地慢。",
    rhythmStatus: "高端量测设备订单已接到 2027。",
    substituteLevel: "无", starRating: 5, replacementYears: "永不"
  },
  {
    ticker: "8035.T", name: "Tokyo Electron", nameZh: "东京电子", country: "🇯🇵",
    tier: "semi-equipment", bypassIndex: 9,
    whatItDoes: "涂胶显影几乎垄断，蚀刻+沉积也强势。",
    whyAINeedsIt: "EUV 光刻必须配合 TEL 的涂胶显影，是流程上的硬节点。",
    rhythmStatus: "受日本出口管制 + 中国去风险冲击，订单结构重塑中。",
    substituteLevel: "无", starRating: 5, replacementYears: "永不"
  },

  // ===== Tier 2: Semi Materials =====
  {
    ticker: "4063.T", name: "Shin-Etsu Chemical", nameZh: "信越化学", country: "🇯🇵",
    tier: "semi-materials", bypassIndex: 10,
    whatItDoes: "全球最大半导体级硅片供应商 + 光刻胶领先者。",
    whyAINeedsIt: "AI 芯片需要顶级硅片，信越是 TSMC/Intel/Samsung 共同的供应商。",
    rhythmStatus: "300mm 硅片产能 2024-2026 紧平衡，先进光刻胶配方仅 4-5 家有能力。",
    substituteLevel: "无", starRating: 5, replacementYears: "永不"
  },
  {
    ticker: "3436.T", name: "SUMCO", nameZh: "胜高 (SUMCO)", country: "🇯🇵",
    tier: "semi-materials", bypassIndex: 9,
    whatItDoes: "高纯硅片第二大供应商，与信越合计约 60% 全球份额。",
    whyAINeedsIt: "硅片是芯片的基础原料，没有它就没有半导体。",
    rhythmStatus: "300mm 硅片产能跟 AI 芯片扩产同频紧张。",
    substituteLevel: "低", starRating: 5, replacementYears: "永不"
  },
  {
    ticker: "WCH.DE", name: "Wacker Chemie", nameZh: "瓦克化学", country: "🇩🇪",
    tier: "semi-materials", bypassIndex: 7,
    whatItDoes: "多晶硅与高纯化学品供应，光伏与半导体双线。",
    whyAINeedsIt: "高纯多晶硅供应链关键节点，欧洲少数有规模产能的玩家。",
    rhythmStatus: "多晶硅价格周期波动，但高端电子级仍紧缺。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "WOLF", name: "Wolfspeed", nameZh: "Wolfspeed (狼速)", country: "🇺🇸",
    tier: "semi-materials", bypassIndex: 8,
    whatItDoes: "西方最大碳化硅（SiC）衬底与器件公司。",
    whyAINeedsIt: "SiC 是电动车、电网、高功率 AI 数据中心的下一代功率半导体。",
    rhythmStatus: "需求强劲但产能爬坡困难，2024-2025 经历重大重组。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "COHR", name: "Coherent", nameZh: "相干", country: "🇺🇸",
    tier: "semi-materials", bypassIndex: 7,
    whatItDoes: "SiC 衬底 + 工业激光 + 光通信器件多线龙头（合并 II-VI 后）。",
    whyAINeedsIt: "AI 数据中心光互联与 SiC 功率电子双重受益。",
    rhythmStatus: "800G 光模块 + SiC 衬底订单饱满。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年", related: ["COHR"]
  },
  {
    ticker: "LIN", name: "Linde", nameZh: "林德", country: "🇩🇪",
    tier: "semi-materials", bypassIndex: 8,
    whatItDoes: "全球最大工业气体公司，电子特种气体三巨头之一。",
    whyAINeedsIt: "光刻、刻蚀、扩散都需要超纯特气，没有就没有先进制程。",
    rhythmStatus: "新晶圆厂建设带动特气长协合同持续签订。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "APD", name: "Air Products", nameZh: "空气化工", country: "🇺🇸",
    tier: "semi-materials", bypassIndex: 7,
    whatItDoes: "工业气体 + 电子特气，与 Linde / Air Liquide 三足鼎立。",
    whyAINeedsIt: "美国本土晶圆厂扩产的关键供气方。",
    rhythmStatus: "TSMC 亚利桑那、Intel 俄亥俄等新厂签长协，订单稳定。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },

  // ===== Tier 3: Power & Grid =====
  {
    ticker: "CEG", name: "Constellation Energy", nameZh: "星座能源", country: "🇺🇸",
    tier: "power-grid", bypassIndex: 9,
    whatItDoes: "美国最大核电运营商，已与微软签 20 年长协重启三里岛。",
    whyAINeedsIt: "AI 数据中心需 24/7 baseload 电力，核电是少数能匹配的清洁源。",
    rhythmStatus: "美国新核电从立项到并网 8-15 年，远落后 AI 资本开支节奏。",
    substituteLevel: "无", starRating: 5, replacementYears: "永不", related: ["CEG"]
  },
  {
    ticker: "VST", name: "Vistra", nameZh: "维斯特拉", country: "🇺🇸",
    tier: "power-grid", bypassIndex: 8,
    whatItDoes: "核电 + 燃气 + 储能多元发电商，数据中心直供受益最显著之一。",
    whyAINeedsIt: "灵活组合发电与储能可对冲可再生间歇性，正符合 AI 集群需求。",
    rhythmStatus: "数据中心电力直供合约 2024-2026 大量签订。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年", related: ["VST"]
  },
  {
    ticker: "NEE", name: "NextEra Energy", nameZh: "新时代能源", country: "🇺🇸",
    tier: "power-grid", bypassIndex: 8,
    whatItDoes: "美国最大可再生能源 + 受规公用事业。",
    whyAINeedsIt: "AWS / 谷歌 / Meta 长协 PPA 主要对象，可再生 + 储能组合方案。",
    rhythmStatus: "可再生项目排队接入电网，输电瓶颈是关键约束。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年", related: ["NEE"]
  },
  {
    ticker: "DUK", name: "Duke Energy", nameZh: "杜克能源", country: "🇺🇸",
    tier: "power-grid", bypassIndex: 7,
    whatItDoes: "美东大型受规公用事业，覆盖卡罗莱纳与佛罗里达。",
    whyAINeedsIt: "美东数据中心走廊（弗吉尼亚 + 卡罗莱纳）的电力 baseload 提供方。",
    rhythmStatus: "新机组建设与电网升级正在加速，但仍跟不上数据中心需求增速。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "ETN", name: "Eaton", nameZh: "伊顿", country: "🇺🇸",
    tier: "power-grid", bypassIndex: 9,
    whatItDoes: "电力管理 + 配电设备龙头：开关、变压器、UPS。",
    whyAINeedsIt: "数据中心 + 工业电气化双驱动，订单 backlog 历史新高。",
    rhythmStatus: "订单已排到 2028，部分高端配电产品交付周期 12 个月+。",
    substituteLevel: "低", starRating: 5, replacementYears: "永不", related: ["ETN"]
  },
  {
    ticker: "GEV", name: "GE Vernova", nameZh: "GE Vernova", country: "🇺🇸",
    tier: "power-grid", bypassIndex: 8,
    whatItDoes: "GE 电力业务独立公司：燃气轮机、风电、电网。",
    whyAINeedsIt: "电网现代化改造的核心设备方，燃气轮机也是数据中心备用首选。",
    rhythmStatus: "燃气轮机订单创历史新高，电网电气化设备同步爆发。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年", related: ["GEV"]
  },
  {
    ticker: "PWR", name: "Quanta Services", nameZh: "匡塔服务", country: "🇺🇸",
    tier: "power-grid", bypassIndex: 8,
    whatItDoes: "美国最大电网建设承包商。",
    whyAINeedsIt: "新输电线建设 + 电网升级是 AI 落地最物理的瓶颈。",
    rhythmStatus: "项目 backlog 已 ~$30B，但建设周期 + 审批仍受限。",
    substituteLevel: "低", starRating: 4, replacementYears: "20+ 年", related: ["PWR"]
  },
  {
    ticker: "ABBN.SW", name: "ABB", nameZh: "ABB", country: "🇨🇭",
    tier: "power-grid", bypassIndex: 7,
    whatItDoes: "全球电气化与自动化巨头：高压直流输电、电机、机器人。",
    whyAINeedsIt: "HVDC（高压直流）输电是跨区域电网与海上风电关键技术。",
    rhythmStatus: "HVDC 订单全球紧缺，欧洲跨海电网项目排队。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },

  // ===== Tier 4: Rare Metals =====
  {
    ticker: "MP", name: "MP Materials", nameZh: "MP Materials", country: "🇺🇸",
    tier: "rare-metals", bypassIndex: 8,
    whatItDoes: "美国唯一在产稀土矿（加州 Mountain Pass）+ 自建加工厂。",
    whyAINeedsIt: "永磁电机、风电、雷达、导弹的物质基础，西方供应链重建关键节点。",
    rhythmStatus: "加工产能爬坡进度落后，2025-2027 是关键节点。",
    substituteLevel: "无（西方语境内）", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "USAR", name: "USA Rare Earth", nameZh: "USA 稀土", country: "🇺🇸",
    tier: "rare-metals", bypassIndex: 7,
    whatItDoes: "稀土加工 + 钕铁硼磁体本土化弹性筹码。",
    whyAINeedsIt: "美国本土永磁体产能从 0 到 30% 自主的关键参与者。",
    rhythmStatus: "刚 IPO 不久，建厂与产能爬坡仍在早期。",
    substituteLevel: "低", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "FCX", name: "Freeport-McMoRan", nameZh: "自由港麦克莫兰", country: "🇺🇸",
    tier: "rare-metals", bypassIndex: 8,
    whatItDoes: "全球第二大铜矿生产商。",
    whyAINeedsIt: "铜是电网、数据中心、电动化的「血液」，需求 2024-2035 预计翻倍。",
    rhythmStatus: "新铜矿勘探到投产 15-20 年，远落后电气化节奏。",
    substituteLevel: "中（铜本身无替代）", starRating: 4, replacementYears: "20+ 年", related: ["FCX"]
  },
  {
    ticker: "ALB", name: "Albemarle", nameZh: "雅宝", country: "🇺🇸",
    tier: "rare-metals", bypassIndex: 7,
    whatItDoes: "全球最大锂生产商之一。",
    whyAINeedsIt: "电池 + 储能的核心原料，电网级储能 2028 后预计短缺。",
    rhythmStatus: "锂价 2024 周期性下行，但 2027+ 供需结构性短缺预期。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "GLEN.L", name: "Glencore", nameZh: "嘉能可", country: "🇨🇭",
    tier: "rare-metals", bypassIndex: 7,
    whatItDoes: "全球最大大宗商品交易商 + 矿业公司，钴铜镍核心。",
    whyAINeedsIt: "钴 70%+ 在刚果，Glencore 是西方主要采购通道。",
    rhythmStatus: "钴供应受地缘 + 伦理双重压力，价格波动巨大。",
    substituteLevel: "低", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "NEM", name: "Newmont", nameZh: "纽蒙特", country: "🇺🇸",
    tier: "rare-metals", bypassIndex: 5,
    whatItDoes: "全球最大黄金生产商，资源端避险资产。",
    whyAINeedsIt: "不直接服务 AI，但当 AI 资本周期出现回撤时是宏观对冲。",
    rhythmStatus: "金价反映货币与地缘风险，与 AI 节奏间接关联。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年", related: ["NEM"]
  },

  // ===== Tier 5: Battery & Energy Storage =====
  {
    ticker: "ALB", name: "Albemarle", nameZh: "雅宝（锂）", country: "🇺🇸",
    tier: "battery-energy", bypassIndex: 7,
    whatItDoes: "锂供应链上游龙头（也在稀土 tier 出现一次）。",
    whyAINeedsIt: "电网级储能 + 电动车持续依赖锂供应。",
    rhythmStatus: "2024 周期低位，2027+ 预期短缺。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "ALTM", name: "Arcadium Lithium", nameZh: "Arcadium 锂业", country: "🇺🇸",
    tier: "battery-energy", bypassIndex: 6,
    whatItDoes: "Allkem 与 Livent 合并后的锂供应商。",
    whyAINeedsIt: "锂供应链多元化的西方备选。",
    rhythmStatus: "并购整合中，2025-2026 看产能释放。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年"
  },
  {
    ticker: "UMICY", name: "Umicore", nameZh: "优美科", country: "🇧🇪",
    tier: "battery-energy", bypassIndex: 7,
    whatItDoes: "电池正极材料 + 催化剂 + 回收，欧洲电池供应链核心。",
    whyAINeedsIt: "正极材料是电池性能与成本的关键，欧洲少数有规模供应商。",
    rhythmStatus: "近年盈利承压，但战略地位稳固。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "FLNC", name: "Fluence Energy", nameZh: "Fluence 储能", country: "🇺🇸",
    tier: "battery-energy", bypassIndex: 7,
    whatItDoes: "电网级储能系统集成龙头（Siemens + AES 合资）。",
    whyAINeedsIt: "数据中心 + 可再生 + 电网调峰的「时间转换」核心。",
    rhythmStatus: "订单 backlog 历史新高，但电池单价波动影响毛利。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年", related: ["FLNC"]
  },
  {
    ticker: "ENPH", name: "Enphase Energy", nameZh: "Enphase 储能", country: "🇺🇸",
    tier: "battery-energy", bypassIndex: 6,
    whatItDoes: "户用微逆变器 + 储能龙头，分布式能源代表。",
    whyAINeedsIt: "边缘电力（户用 + 小型商业）是电网中心化扩张的补充。",
    rhythmStatus: "高利率压制户用太阳能需求，2024-2025 周期低点。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年", related: ["ENPH"]
  },

  // ===== Tier 6: Motors & Power Electronics =====
  {
    ticker: "6594.T", name: "Nidec Corporation", nameZh: "日本电产 (Nidec)", country: "🇯🇵",
    tier: "motor-power", bypassIndex: 9,
    whatItDoes: "全球最大精密电机厂，从硬盘到机器人到电动车均覆盖。",
    whyAINeedsIt: "人形机器人 + 电动车 + 工业自动化的电机供应核心。",
    rhythmStatus: "人形机器人电机 2026-2030 预期爆发，Nidec 量产线已布局。",
    substituteLevel: "低", starRating: 5, replacementYears: "永不"
  },
  {
    ticker: "ABBN.SW", name: "ABB Robotics & Motion", nameZh: "ABB 机器人与电机", country: "🇨🇭",
    tier: "motor-power", bypassIndex: 7,
    whatItDoes: "工业伺服电机 + 工业机器人 + 自动化系统。",
    whyAINeedsIt: "工厂自动化 + 制造业机器人是 AI 走向物理世界的入口。",
    rhythmStatus: "高端伺服电机交付期 6-12 个月，订单稳健。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "6506.T", name: "Yaskawa Electric", nameZh: "安川电机", country: "🇯🇵",
    tier: "motor-power", bypassIndex: 7,
    whatItDoes: "伺服电机 + 工业机器人双线龙头。",
    whyAINeedsIt: "高精度运动控制是机器人 AI 物理体现的基础。",
    rhythmStatus: "新订单稳健，伺服与机器人业务联动。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "WOLF", name: "Wolfspeed (Power)", nameZh: "Wolfspeed 功率", country: "🇺🇸",
    tier: "motor-power", bypassIndex: 8,
    whatItDoes: "SiC MOSFET 功率器件主要西方厂家。",
    whyAINeedsIt: "电动车逆变器、风电、AI 数据中心 PSU 的下一代功率器件。",
    rhythmStatus: "需求强劲但产能爬坡困难，2024-2025 财务承压。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "ALGM", name: "Allegro Microsystems", nameZh: "Allegro 微系统", country: "🇺🇸",
    tier: "motor-power", bypassIndex: 6,
    whatItDoes: "电机驱动 IC + 磁传感器，汽车与工业核心。",
    whyAINeedsIt: "每个电机都需要驱动 IC + 位置传感，量产人形机器人的隐形受益方。",
    rhythmStatus: "汽车周期波动，但长线机器人主题正向。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年"
  },
  {
    ticker: "ON", name: "onsemi", nameZh: "安森美", country: "🇺🇸",
    tier: "motor-power", bypassIndex: 7,
    whatItDoes: "汽车电源 + SiC 模块 + 图像传感器多线供应。",
    whyAINeedsIt: "电动车 SiC 主驱模块的主要供应商之一。",
    rhythmStatus: "SiC 业务高增长，但汽车终端需求 2024-2025 波动。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },

  // ===== Tier 7: Photonics & Sensing =====
  {
    ticker: "6758.T", name: "Sony Group", nameZh: "索尼集团", country: "🇯🇵",
    tier: "photonics-sensing", bypassIndex: 9,
    whatItDoes: "全球最大 CMOS 图像传感器厂，占高端手机与车载 50%+ 份额。",
    whyAINeedsIt: "AI 视觉的物理入口——所有看世界的 AI 都通过图像传感器。",
    rhythmStatus: "车载 CMOS 需求 2024-2030 预期 4-6 倍增长，产能扩张紧。",
    substituteLevel: "低", starRating: 5, replacementYears: "永不"
  },
  {
    ticker: "LAZR", name: "Luminar Technologies", nameZh: "Luminar (LiDAR)", country: "🇺🇸",
    tier: "photonics-sensing", bypassIndex: 5,
    whatItDoes: "高分辨率 LiDAR 传感器，主攻车载 L3+。",
    whyAINeedsIt: "L3/L4 自动驾驶仍依赖 LiDAR + 视觉融合。",
    rhythmStatus: "商业化进度不及预期，2024-2025 多次重组。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年"
  },
  {
    ticker: "IPGP", name: "IPG Photonics", nameZh: "IPG 光子", country: "🇺🇸",
    tier: "photonics-sensing", bypassIndex: 7,
    whatItDoes: "全球最大光纤激光器制造商。",
    whyAINeedsIt: "工业激光 + 通信光源 + 国防激光多线，制造业自动化基础。",
    rhythmStatus: "工业周期波动，国防与微加工需求稳健。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "TDY", name: "Teledyne Technologies", nameZh: "Teledyne", country: "🇺🇸",
    tier: "photonics-sensing", bypassIndex: 7,
    whatItDoes: "FLIR（红外）+ 工业成像 + 太空遥感综合体。",
    whyAINeedsIt: "国防与工业 AI 视觉的红外/特殊光谱供应方。",
    rhythmStatus: "国防订单稳健，工业周期分化。",
    substituteLevel: "低", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "COHR", name: "Coherent (Optics)", nameZh: "相干 (光学)", country: "🇺🇸",
    tier: "photonics-sensing", bypassIndex: 7,
    whatItDoes: "工业激光 + 光通信 + SiC 多线，光学器件深度玩家。",
    whyAINeedsIt: "工业制造、医疗、光网络都需要其激光与光学组件。",
    rhythmStatus: "AI 数据中心光互联订单饱满，工业与医疗稳健。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },

  // ===== Tier 8: Data Center Physical =====
  {
    ticker: "VRT", name: "Vertiv Holdings", nameZh: "Vertiv 维谛技术", country: "🇺🇸",
    tier: "dc-physical", bypassIndex: 9,
    whatItDoes: "数据中心电力分配 + 液冷 + 精密空调核心供应商。",
    whyAINeedsIt: "AI 高密度机柜（>50 kW）必须液冷，Vertiv 是少数有规模能力的玩家。",
    rhythmStatus: "订单 backlog 历史新高，液冷渗透 2024 ~10% → 2028 预计 40%+。",
    substituteLevel: "低", starRating: 5, replacementYears: "永不", related: ["VRT"]
  },
  {
    ticker: "TT", name: "Trane Technologies", nameZh: "特灵科技", country: "🇺🇸",
    tier: "dc-physical", bypassIndex: 6,
    whatItDoes: "暖通空调 + 数据中心精密制冷综合体。",
    whyAINeedsIt: "传统风冷与液冷过渡期都需要其 HVAC 解决方案。",
    rhythmStatus: "数据中心订单与建筑节能双引擎。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年"
  },
  {
    ticker: "MOD", name: "Modine Manufacturing", nameZh: "Modine", country: "🇺🇸",
    tier: "dc-physical", bypassIndex: 6,
    whatItDoes: "热管理 + 数据中心冷却 + 重型车辆冷却。",
    whyAINeedsIt: "中小数据中心冷却市场的主要供应商之一。",
    rhythmStatus: "数据中心冷却业务 2024-2026 三倍增长可期。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年"
  },
  {
    ticker: "EQIX", name: "Equinix", nameZh: "Equinix", country: "🇺🇸",
    tier: "dc-physical", bypassIndex: 8,
    whatItDoes: "全球最大数据中心 REIT（260+ 数据中心），互联枢纽。",
    whyAINeedsIt: "AI 集群 + 企业云 + 网络互联汇集点，「AI 时代地皮」。",
    rhythmStatus: "全球扩建速度受电力与土地约束，租户 backlog 历史高位。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "DLR", name: "Digital Realty Trust", nameZh: "Digital Realty 数据中心地产", country: "🇺🇸",
    tier: "dc-physical", bypassIndex: 8,
    whatItDoes: "全球第二大数据中心 REIT，超大规模数据中心见长。",
    whyAINeedsIt: "为 AWS / Azure / Meta 等超大规模租户提供高密度机房。",
    rhythmStatus: "供给受电力配额严重约束，租金持续上涨。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "ETN", name: "Eaton (DC Power)", nameZh: "伊顿 (数据中心电源)", country: "🇺🇸",
    tier: "dc-physical", bypassIndex: 8,
    whatItDoes: "数据中心 UPS + 配电系统主力供应商（已在电力 tier 出现）。",
    whyAINeedsIt: "AI 集群断电不能容忍，UPS 是物理刚需。",
    rhythmStatus: "UPS 与配电订单都已排到 2027。",
    substituteLevel: "低", starRating: 4, replacementYears: "20+ 年"
  },

  // ===== Tier 9: Optical Network & Subsea Cable =====
  {
    ticker: "GLW", name: "Corning", nameZh: "康宁", country: "🇺🇸",
    tier: "photonics-network", bypassIndex: 8,
    whatItDoes: "全球最大光纤生产商 + 特殊玻璃（手机盖板/汽车）。",
    whyAINeedsIt: "数据中心内 + 跨数据中心光纤供应链关键节点。",
    rhythmStatus: "数据中心光纤订单创新高，AI 集群带宽爆发推动。",
    substituteLevel: "低", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "PRY.MI", name: "Prysmian Group", nameZh: "Prysmian", country: "🇮🇹",
    tier: "photonics-network", bypassIndex: 8,
    whatItDoes: "全球最大海底光缆 + 电力电缆制造商。",
    whyAINeedsIt: "海缆是 99% 国际数据流的物理通路，AI 全球协作物理基础。",
    rhythmStatus: "海缆订单 backlog 排至 2028，制造与铺设产能均紧。",
    substituteLevel: "低", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "NEX.PA", name: "Nexans", nameZh: "Nexans", country: "🇫🇷",
    tier: "photonics-network", bypassIndex: 7,
    whatItDoes: "电力电缆 + 海底光缆，欧洲跨海电网核心方。",
    whyAINeedsIt: "海上风电 + 跨国电网建设需求爆发。",
    rhythmStatus: "订单充足，HVDC 海缆是利润最高产品线。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "CIEN", name: "Ciena", nameZh: "Ciena 思科特尼", country: "🇺🇸",
    tier: "photonics-network", bypassIndex: 6,
    whatItDoes: "光网络系统与相干光技术供应商。",
    whyAINeedsIt: "数据中心间互联（DCI）的主流方案提供方。",
    rhythmStatus: "AI 互联推动 800G/1.6T 升级周期。",
    substituteLevel: "中", starRating: 3, replacementYears: "10-15 年"
  },
  {
    ticker: "LITE", name: "Lumentum Holdings", nameZh: "Lumentum", country: "🇺🇸",
    tier: "photonics-network", bypassIndex: 7,
    whatItDoes: "高端光模块 + 激光器，AI 集群光互联龙头。",
    whyAINeedsIt: "GPU 之间 800G/1.6T 光互联必经。",
    rhythmStatus: "1.6T 光模块 2025-2026 进入 AI 集群，订单饱满。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },
  {
    ticker: "COHR", name: "Coherent (Network)", nameZh: "相干 (网络)", country: "🇺🇸",
    tier: "photonics-network", bypassIndex: 7,
    whatItDoes: "光模块 + 海底光缆器件 + 工业激光多线（已在多 tier 出现）。",
    whyAINeedsIt: "AI 集群光互联与海缆器件双重受益。",
    rhythmStatus: "800G 光模块 + SiC 衬底订单饱满。",
    substituteLevel: "中", starRating: 4, replacementYears: "20+ 年"
  },

  // ===== Tier 10: EDA & Design IP =====
  {
    ticker: "SNPS", name: "Synopsys", nameZh: "新思科技", country: "🇺🇸",
    tier: "eda-ip", bypassIndex: 9,
    whatItDoes: "EDA + IP 双线龙头，与 Cadence 合占 EDA 市场 ~70%。",
    whyAINeedsIt: "几乎所有先进 AI 芯片都用 Synopsys 工具或 IP 设计。",
    rhythmStatus: "AI 芯片设计需求推动 EDA 收入两位数增长。",
    substituteLevel: "低", starRating: 5, replacementYears: "20+ 年", related: ["SNPS"]
  },
  {
    ticker: "CDNS", name: "Cadence Design Systems", nameZh: "楷登电子", country: "🇺🇸",
    tier: "eda-ip", bypassIndex: 9,
    whatItDoes: "EDA + 系统设计软件双线，与 Synopsys 寡头。",
    whyAINeedsIt: "先进节点设计、PCB、系统仿真全栈覆盖。",
    rhythmStatus: "AI 系统设计推动仿真算力与软件许可需求。",
    substituteLevel: "低", starRating: 5, replacementYears: "20+ 年", related: ["CDNS"]
  },
  {
    ticker: "ARM", name: "Arm Holdings", nameZh: "Arm 控股", country: "🇬🇧",
    tier: "eda-ip", bypassIndex: 9,
    whatItDoes: "全球最大 CPU 指令集与 IP 授权方。",
    whyAINeedsIt: "几乎所有手机芯片 + 越来越多服务器芯片基于 Arm 架构。",
    rhythmStatus: "AI 服务器 Arm 化趋势 + 移动 AI 推动 IP 收入加速。",
    substituteLevel: "低", starRating: 5, replacementYears: "20+ 年", related: ["ARM"]
  },
  {
    ticker: "SIE.DE", name: "Siemens (EDA)", nameZh: "西门子 (EDA)", country: "🇩🇪",
    tier: "eda-ip", bypassIndex: 6,
    whatItDoes: "Siemens EDA（含 Mentor Graphics）是 EDA 第三大供应商。",
    whyAINeedsIt: "PCB / 系统级仿真 + 部分 IC 设计工具。",
    rhythmStatus: "工业软件与 EDA 双线，订单稳健。",
    substituteLevel: "中", starRating: 3, replacementYears: "5-10 年"
  }
];

export function getCompaniesByTier(tierId: BedrockTierId): BedrockCompany[] {
  return BEDROCK_COMPANIES.filter((c) => c.tier === tierId);
}

export function getTierById(tierId: BedrockTierId): BedrockTier | undefined {
  return BEDROCK_TIERS.find((t) => t.id === tierId);
}

export const GAP_LABEL: Record<GapSeverity, string> = {
  critical: "🔴 极严",
  severe: "🟡 严",
  moderate: "🟢 中"
};

export const ATTENTION_LABEL: Record<"low" | "medium" | "high", string> = {
  low: "极低",
  medium: "中等",
  high: "较高"
};
