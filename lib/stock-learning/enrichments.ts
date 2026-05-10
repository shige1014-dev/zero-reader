/**
 * Stock 扩展元数据 — 在 data.ts 之外, 不破坏现有 /stock-learning.
 * 按 ticker 索引. 缺失字段在卡牌显示 "—" 或省略.
 *
 * 维护方式: 手动填充, 优先 S/A 级. 后期可从 SEC EDGAR / Wikipedia / Tiingo 抓取.
 */

export interface StockEnrichment {
  /** 美股 ticker — 大写 */
  ticker: string;
  /** 交易所 */
  exchange: "NASDAQ" | "NYSE" | "AMEX" | "OTC" | string;
  /** 总部所在地 e.g. "美国·加州" */
  hq?: string;
  /** 创立年份 */
  founded?: number;
  /** 员工规模 (千人) */
  employees?: string;
  /** 市值梯度 */
  capTier?: "mega" | "large" | "mid" | "small" | "micro";
  /** 行业标签 */
  industryTags?: string[];
  /** CEO 姓名 */
  ceo?: string;
  /** 业务模式 (1-3 段) */
  business?: string;
  /** 关键产品/服务 */
  products?: string[];
  /** 主要客户 */
  customers?: string[];
  /** 竞争对手 */
  competitors?: string[];
  /** 关键催化剂 */
  catalysts?: string[];
  /** 三态推演 — 用于 TCG 卡牌 */
  scenarios?: {
    bull: { trigger: string; impact: string };
    base: { trigger: string; impact: string };
    bear: { trigger: string; impact: string };
  };
}

const E: StockEnrichment[] = [
  {
    ticker: "OKLO",
    exchange: "NYSE",
    hq: "美国·加州 圣克拉拉",
    founded: 2013,
    employees: "<0.5K",
    capTier: "small",
    industryTags: ["先进核裂变", "小型模块化反应堆", "Aurora 微堆"],
    ceo: "Jacob DeWitte",
    business: "Oklo 设计微型液态金属冷却快堆 Aurora (1.5-50 MWe), 目标为数据中心、军事基地和偏远工业园区供 24/7 清洁电力. 商业模式不是卖反应堆, 而是卖电 (PPA)——降低客户初始投入门槛.",
    products: ["Aurora 微堆 (1.5/15/50 MWe)", "燃料回收 (Aurora Fuel Recycling)"],
    customers: ["Equinix (数据中心)", "美国 DOE", "美国空军"],
    competitors: ["NuScale", "TerraPower", "X-energy"],
    catalysts: ["NRC 首堆牌照 2026 决议", "Idaho 国家实验室首堆 2027 投运", "DOE HALEU 燃料供应"],
    scenarios: {
      bull: { trigger: "首堆按时投运 + 客户订单累积", impact: "重估 +200%" },
      base: { trigger: "监管延期 12-18 月", impact: "+30% 至 +60%" },
      bear: { trigger: "牌照被否或政策反转", impact: "-50% 至 -70%" }
    }
  },
  {
    ticker: "RKLB",
    exchange: "NASDAQ",
    hq: "美国·加州 长滩",
    founded: 2006,
    employees: "1.7K",
    capTier: "mid",
    industryTags: ["小型运载火箭", "卫星制造", "深空任务"],
    ceo: "Peter Beck",
    business: "Rocket Lab 提供端到端太空服务: Electron 小火箭 (200kg LEO) 和 Neutron 中型火箭 (13t LEO) 占发射端, 卫星组件 + Photon 平台占制造端. 2024 后从发射服务商转向太空系统集成商.",
    products: ["Electron 火箭", "Neutron 火箭 (开发中)", "Photon 卫星平台", "反应轮 / 太阳能板组件"],
    customers: ["NASA", "美国国防部", "商业卫星运营商"],
    competitors: ["SpaceX", "Astra Space", "Firefly Aerospace"],
    catalysts: ["Neutron 首飞 2026", "美国国防部订单", "卫星组件订单加速"],
    scenarios: {
      bull: { trigger: "Neutron 首飞成功 + 国防订单", impact: "+150%" },
      base: { trigger: "Neutron 延期, Electron 节奏稳定", impact: "+30%" },
      bear: { trigger: "Neutron 首飞失败", impact: "-50%" }
    }
  },
  {
    ticker: "COHR",
    exchange: "NYSE",
    hq: "美国·宾州 Saxonburg",
    founded: 1971,
    employees: "26K",
    capTier: "large",
    industryTags: ["光通信器件", "工业激光", "SiC 衬底"],
    ceo: "Jim Anderson",
    business: "Coherent 三大业务: 网络 (AI 数据中心 800G/1.6T 光模块、相干光), 材料 (SiC 衬底用于 EV 和工业), 激光 (工业切割焊接). 收购 II-VI 后形成完整光电材料栈.",
    products: ["光收发模块 (800G/1.6T)", "EML 激光二极管", "SiC 衬底", "工业激光"],
    customers: ["Cisco", "Arista", "Tesla (SiC)", "Intel"],
    competitors: ["Lumentum", "Marvell", "Wolfspeed (SiC)"],
    catalysts: ["1.6T 光模块爬产", "SiC 衬底放量", "AI 数据中心订单"],
    scenarios: {
      bull: { trigger: "1.6T + SiC 双爆发", impact: "+80%" },
      base: { trigger: "AI 资本开支稳定", impact: "+25%" },
      bear: { trigger: "AI 资本开支降温 + SiC 价格战", impact: "-40%" }
    }
  },
  {
    ticker: "MU",
    exchange: "NASDAQ",
    hq: "美国·爱达荷 博伊西",
    founded: 1978,
    employees: "48K",
    capTier: "large",
    industryTags: ["DRAM", "NAND", "HBM 高带宽内存"],
    ceo: "Sanjay Mehrotra",
    business: "美光是美国唯一规模化存储制造商, 三大产品线: DRAM (含 HBM3E/HBM4 给 AI 加速器)、NAND (给 SSD)、特种存储. AI 浪潮下 HBM 是利润核心.",
    products: ["HBM3E / HBM4", "DDR5", "GDDR7", "NAND SSD", "汽车级存储"],
    customers: ["NVIDIA (HBM)", "AMD", "苹果", "三星"],
    competitors: ["三星电子", "SK Hynix"],
    catalysts: ["HBM4 量产 2026", "PC/手机存储复苏", "中国市场份额"],
    scenarios: {
      bull: { trigger: "HBM 供应紧张 + DRAM 涨价周期", impact: "+60%" },
      base: { trigger: "HBM 占比稳步提升", impact: "+25%" },
      bear: { trigger: "存储价格反转 + AI 需求放缓", impact: "-40%" }
    }
  },
  {
    ticker: "PLTR",
    exchange: "NASDAQ",
    hq: "美国·科罗拉多 丹佛",
    founded: 2003,
    employees: "4.0K",
    capTier: "large",
    industryTags: ["AI 数据软件", "国防分析", "大型企业 OS"],
    ceo: "Alex Karp",
    business: "Palantir 提供 Foundry (商业大数据 OS) 和 Gotham (国防/情报). 核心是 Ontology — 把企业全部数据建成可推理的对象模型, AI agent 在上面工作.",
    products: ["Foundry (商业)", "Gotham (国防)", "AIP (AI 平台)", "Apollo (DevOps)"],
    customers: ["美国陆军/海军/CIA", "BP", "AIG", "Airbus", "辉瑞"],
    competitors: ["Snowflake", "Databricks", "C3.ai"],
    catalysts: ["美国国防 AI 预算扩张", "AIP 商业渗透率", "国际订单"],
    scenarios: {
      bull: { trigger: "国防 + 商业 AIP 双增长", impact: "+100%" },
      base: { trigger: "稳步渗透", impact: "+20%" },
      bear: { trigger: "估值回归, 商业增长放缓", impact: "-50%" }
    }
  },
  {
    ticker: "ALAB",
    exchange: "NASDAQ",
    hq: "美国·加州 圣克拉拉",
    founded: 2017,
    employees: "0.6K",
    capTier: "mid",
    industryTags: ["AI 服务器互联", "PCIe", "CXL"],
    ceo: "Jitendra Mohan",
    business: "Astera Labs 制造 AI 服务器内的连接组件: PCIe 信号完整性器件、Smart Cable、Aries 重定时器. 是 hyperscaler AI 服务器内部数据流的'隐形卖铲人'.",
    products: ["Aries PCIe 重定时器", "Taurus Smart Cable", "Leo CXL 内存控制器"],
    customers: ["AWS", "Microsoft Azure", "Meta"],
    competitors: ["Marvell", "Broadcom"],
    catalysts: ["PCIe 6.0 量产", "CXL 渗透率", "GPU 服务器出货量"],
    scenarios: {
      bull: { trigger: "AI 服务器加速 + CXL 起量", impact: "+80%" },
      base: { trigger: "AI 资本开支稳定", impact: "+20%" },
      bear: { trigger: "GPU 服务器增速放缓", impact: "-50%" }
    }
  },
  {
    ticker: "MRVL",
    exchange: "NASDAQ",
    hq: "美国·加州 圣克拉拉",
    founded: 1995,
    employees: "6.5K",
    capTier: "large",
    industryTags: ["定制 ASIC", "光 DSP", "存储控制器"],
    ceo: "Matt Murphy",
    business: "Marvell 三条 AI 主线: 定制 ASIC (亚马逊 Trainium、谷歌 TPU 部分代工)、光模块 DSP (800G+)、存储控制器. AI 资本开支 → ASIC + DSP 直接受益.",
    products: ["定制 ASIC 设计服务", "Inphi 光 DSP", "存储控制器", "网络交换机"],
    customers: ["AWS", "Google", "Microsoft"],
    competitors: ["Broadcom", "AMD", "Astera Labs"],
    catalysts: ["AWS Trainium 上量", "1.6T 光 DSP", "数据中心交换机"],
    scenarios: {
      bull: { trigger: "ASIC + 光 DSP 双爆发", impact: "+70%" },
      base: { trigger: "AI 平稳兑现", impact: "+20%" },
      bear: { trigger: "估值回归 + 客户项目延期", impact: "-40%" }
    }
  },
  {
    ticker: "BWXT",
    exchange: "NYSE",
    hq: "美国·维州 林奇堡",
    founded: 1867,
    employees: "7.6K",
    capTier: "mid",
    industryTags: ["核燃料", "海军核动力", "微堆"],
    ceo: "Rex Geveden",
    business: "BWX Technologies 是美国海军唯一核动力反应堆制造商 (航母 + 潜艇), 同时供应核燃料、医用同位素、商用核服务. 现金流稳定但增速温和.",
    products: ["海军核反应堆", "Triso 燃料", "微堆 BANR", "医用 Tc-99m"],
    customers: ["美国海军", "NASA", "DOE", "加拿大核工业"],
    competitors: ["General Atomics", "Westinghouse"],
    catalysts: ["微堆订单", "Triso 燃料量产", "海军预算"],
    scenarios: {
      bull: { trigger: "微堆 + 商业核扩张", impact: "+50%" },
      base: { trigger: "稳定现金流", impact: "+15%" },
      bear: { trigger: "国防预算砍核", impact: "-25%" }
    }
  },
  {
    ticker: "AMZN",
    exchange: "NASDAQ",
    hq: "美国·华州 西雅图",
    founded: 1994,
    employees: "1500K",
    capTier: "mega",
    industryTags: ["云计算", "电商", "广告", "物流自动化"],
    ceo: "Andy Jassy",
    business: "Amazon 三大引擎: AWS (云 + AI 基础设施)、电商 (Prime + Marketplace)、广告. 物流系统是机器人/无人机/自动化叙事的物理 AI 入口.",
    products: ["AWS Trainium/Bedrock", "Kuiper 卫星互联网", "Prime Video", "仓储机器人"],
    customers: ["~3 亿 Prime 会员", "AWS 数百万企业", "广告主"],
    competitors: ["Microsoft", "Google", "Walmart"],
    catalysts: ["AWS AI 增长", "广告业务利润释放", "物流自动化"],
    scenarios: {
      bull: { trigger: "AWS + 广告双爆发", impact: "+50%" },
      base: { trigger: "AWS 加速 + 电商温和", impact: "+15%" },
      bear: { trigger: "AWS 增速放缓", impact: "-25%" }
    }
  },
  {
    ticker: "ARM",
    exchange: "NASDAQ",
    hq: "英国·剑桥",
    founded: 1990,
    employees: "7.0K",
    capTier: "large",
    industryTags: ["IP 授权", "CPU 指令集", "边缘 AI"],
    ceo: "Rene Haas",
    business: "Arm 不卖芯片, 卖 CPU 架构和指令集 IP — 几乎所有手机、半数车机、新兴边缘 AI 芯片用 Arm 内核. 收入 = 授权费 + 版税. 软银控股.",
    products: ["Cortex-A/M/R 内核", "Neoverse 服务器内核", "Mali GPU"],
    customers: ["苹果", "高通", "联发科", "AWS Graviton", "Nvidia Grace"],
    competitors: ["RISC-V (开源)", "x86 (Intel/AMD)"],
    catalysts: ["数据中心 Arm 服务器渗透", "AI 边缘版税", "Apple Intelligence"],
    scenarios: {
      bull: { trigger: "数据中心 Arm 加速渗透", impact: "+60%" },
      base: { trigger: "稳定授权增长", impact: "+15%" },
      bear: { trigger: "RISC-V 替代 + 估值回归", impact: "-40%" }
    }
  },
  {
    ticker: "AMD",
    exchange: "NASDAQ",
    hq: "美国·加州 圣克拉拉",
    founded: 1969,
    employees: "26K",
    capTier: "large",
    industryTags: ["CPU", "GPU", "AI 加速器", "FPGA"],
    ceo: "Lisa Su",
    business: "AMD 四线: 数据中心 (EPYC CPU + MI 系列 AI 加速器)、客户端 (Ryzen)、游戏 (Radeon + 主机)、嵌入式 (Xilinx). MI300/MI400 是挑战 NVIDIA 唯一可行替代.",
    products: ["EPYC 服务器 CPU", "Ryzen 桌面 CPU", "MI300X/MI400 AI 加速器", "Radeon GPU"],
    customers: ["Microsoft (Azure)", "Meta", "Oracle", "索尼/微软主机"],
    competitors: ["Intel", "NVIDIA"],
    catalysts: ["MI400 上量 2026", "数据中心份额", "AI PC 渗透"],
    scenarios: {
      bull: { trigger: "MI 系列大爆发, 抢 NVIDIA 份额", impact: "+80%" },
      base: { trigger: "稳步追赶", impact: "+20%" },
      bear: { trigger: "MI 兑现不及 + 估值回归", impact: "-40%" }
    }
  },
  {
    ticker: "NBIS",
    exchange: "NASDAQ",
    hq: "荷兰·阿姆斯特丹",
    founded: 2024,
    employees: "0.6K",
    capTier: "mid",
    industryTags: ["AI 云服务", "GPU 容量租赁"],
    ceo: "Arkady Volozh",
    business: "Nebius 是 Yandex 拆分后的国际业务 — 欧洲 + 美国 GPU 云容量出租. 直接对标 CoreWeave, 是非美 hyperscaler 替代方案.",
    products: ["Nebius AI Cloud (GPU)", "TractoAI (机器学习平台)", "Toloka (数据标注)"],
    customers: ["欧洲 AI 创业公司", "Mistral", "学术机构"],
    competitors: ["CoreWeave", "Lambda Labs", "AWS"],
    catalysts: ["GPU 容量扩建", "客户集中度下降", "欧洲数字主权"],
    scenarios: {
      bull: { trigger: "欧洲 AI 资本开支爆发", impact: "+100%" },
      base: { trigger: "稳步扩容", impact: "+30%" },
      bear: { trigger: "GPU 价格战", impact: "-50%" }
    }
  }
];

export const STOCK_ENRICHMENTS: Record<string, StockEnrichment> = E.reduce(
  (acc, x) => { acc[x.ticker] = x; return acc; },
  {} as Record<string, StockEnrichment>
);

export function getEnrichment(ticker: string): StockEnrichment | undefined {
  return STOCK_ENRICHMENTS[ticker];
}
