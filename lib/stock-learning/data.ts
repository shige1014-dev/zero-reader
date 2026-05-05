export type StockCategoryId =
  | "optics"
  | "critical-minerals"
  | "nuclear"
  | "memory"
  | "defense"
  | "quantum"
  | "space"
  | "energy"
  | "ai-infra"
  | "robotics"
  | "semiconductors";

export type ConvictionRating = "S" | "A" | "B" | "C";
export type PortfolioRole = "core" | "growth" | "option" | "watch";

export interface OnlineRating {
  consensus: string;
  analysts: number | null;
  target: string;
  upside: string;
  sourceUrl: string;
}

export interface StockLearningCandidate {
  ticker: string;
  name: string;
  nameZh: string;
  category: StockCategoryId;
  rating: ConvictionRating;
  futurePotential: number;
  portfolioRole: PortfolioRole;
  suggestedWeight: string;
  thesis: string;
  risk: string;
  online: OnlineRating;
}

export interface StockCategory {
  id: StockCategoryId;
  label: string;
  allocation: number;
  thesis: string;
}

const source = (ticker: string) => `https://stockanalysis.com/stocks/${ticker.toLowerCase()}/ratings/`;

const online = (
  ticker: string,
  consensus: string,
  analysts: number | null,
  target: string,
  upside: string
): OnlineRating => ({
  consensus,
  analysts,
  target,
  upside,
  sourceUrl: source(ticker)
});

export const STOCK_CATEGORIES: StockCategory[] = [
  { id: "ai-infra", label: "AI 基础设施", allocation: 16, thesis: "算力租赁、电力密度、互联芯片和矿工转型，是 AI 资本开支最直接的承接层。" },
  { id: "semiconductors", label: "半导体", allocation: 15, thesis: "功率半导体、定制芯片、CPU/GPU 与低功耗边缘芯片，决定端云两侧的效率曲线。" },
  { id: "optics", label: "光学板块", allocation: 13, thesis: "800G/1.6T 光模块、硅光、特种材料和相干光，是 AI 集群继续扩张的带宽地基。" },
  { id: "memory", label: "存储 / 内存", allocation: 11, thesis: "HBM、NAND、HDD 与 MRAM 对应训练、推理、冷数据和边缘持久化四条需求。" },
  { id: "nuclear", label: "核能", allocation: 9, thesis: "数据中心需要 24/7 电力，小堆、核燃料和军用核工程是最硬的供给约束。" },
  { id: "critical-minerals", label: "关键矿产", allocation: 9, thesis: "稀土、锂、铀、锑是能源、国防与电动化的底层材料，弹性大但周期强。" },
  { id: "space", label: "太空", allocation: 8, thesis: "发射、卫星直连、地球观测与月球服务正在从叙事进入政府和商业订单验证期。" },
  { id: "defense", label: "国防", allocation: 6, thesis: "低成本无人系统、边缘计算和作战数据软件，会吞掉传统军工预算的增量部分。" },
  { id: "robotics", label: "机器人", allocation: 5, thesis: "配送机器人、仓储自动化和电商物流网络，是 AI 进入物理世界的早期商业闭环。" },
  { id: "quantum", label: "量子计算", allocation: 5, thesis: "离子阱、退火、超导路线都未收敛，适合用小仓位买范式突破的期权。" },
  { id: "energy", label: "能源", allocation: 3, thesis: "电池、长时储能、燃料电池和太阳能制造，是电网重构的高波动补充层。" }
];

export const STOCK_LEARNING_CANDIDATES: StockLearningCandidate[] = [
  { ticker: "AAOI", name: "Applied Optoelectronics", nameZh: "应用光电", category: "optics", rating: "A", futurePotential: 88, portfolioRole: "growth", suggestedWeight: "2.5%-4%", thesis: "AI 数据中心光模块高弹性标的，订单兑现时利润弹性很强。", risk: "涨幅后估值容易透支，客户集中和价格周期要盯紧。", online: online("AAOI", "Buy", 6, "$66.80", "-61.81%") },
  { ticker: "AXTI", name: "AXT", nameZh: "AXT 化合物衬底", category: "optics", rating: "B", futurePotential: 72, portfolioRole: "watch", suggestedWeight: "0%-1.5%", thesis: "砷化镓、磷化铟等化合物半导体衬底，受益光通信和传感材料需求。", risk: "网上共识偏谨慎，材料周期和中国供应链风险较高。", online: online("AXTI", "Hold", 3, "$57.00", "-46.49%") },
  { ticker: "LWLG", name: "Lightwave Logic", nameZh: "Lightwave Logic 聚合物光子", category: "optics", rating: "C", futurePotential: 66, portfolioRole: "option", suggestedWeight: "0%-1%", thesis: "电光聚合物若被主流硅光平台采用，赔率很高。", risk: "公开分析师覆盖不足，商业化节奏仍是最大不确定性。", online: online("LWLG", "无覆盖", null, "n/a", "待核验") },
  { ticker: "LITE", name: "Lumentum", nameZh: "Lumentum 光模块", category: "optics", rating: "A", futurePotential: 86, portfolioRole: "growth", suggestedWeight: "2%-3.5%", thesis: "高速光模块和激光器直接卡住 AI 集群互联升级。", risk: "周期上行时估值会先走，订单低于预期时杀估值快。", online: online("LITE", "Buy", 16, "$687.07", "-30.48%") },
  { ticker: "COHR", name: "Coherent", nameZh: "相干", category: "optics", rating: "S", futurePotential: 91, portfolioRole: "core", suggestedWeight: "3%-5%", thesis: "光通信、激光、SiC 多线共振，是光学链里更均衡的复合资产。", risk: "业务线复杂，若 AI 光模块降温，重估会拖累整体。", online: online("COHR", "Strong Buy", 15, "$278.21", "-16.32%") },
  { ticker: "USAR", name: "USA Rare Earth", nameZh: "美国稀土", category: "critical-minerals", rating: "A", futurePotential: 85, portfolioRole: "option", suggestedWeight: "1%-2.5%", thesis: "美国本土稀土和磁材供应链重建的高弹性筹码。", risk: "产能爬坡、融资和政策补贴兑现决定真实价值。", online: online("USAR", "Strong Buy", 5, "$32.75", "+27.53%") },
  { ticker: "UUUU", name: "Energy Fuels", nameZh: "Energy Fuels 铀与稀土", category: "critical-minerals", rating: "A", futurePotential: 84, portfolioRole: "growth", suggestedWeight: "1.5%-3%", thesis: "铀和美国稀土处理能力叠加，卡核能与关键矿产两条线。", risk: "铀价周期和项目执行会放大波动。", online: online("UUUU", "Strong Buy", 6, "$19.92", "-7.69%") },
  { ticker: "ALB", name: "Albemarle", nameZh: "雅宝", category: "critical-minerals", rating: "B", futurePotential: 73, portfolioRole: "watch", suggestedWeight: "0%-2%", thesis: "锂周期龙头，适合作为电池材料供给端观察锚。", risk: "锂价下行周期会压制盈利和估值。", online: online("ALB", "Buy", 20, "$179.74", "-5.18%") },
  { ticker: "MP", name: "MP Materials", nameZh: "MP Materials 稀土", category: "critical-minerals", rating: "A", futurePotential: 83, portfolioRole: "growth", suggestedWeight: "1.5%-3%", thesis: "美国唯一规模化稀土矿和加工链核心代理。", risk: "分离、磁材量产和价格周期仍需验证。", online: online("MP", "Strong Buy", 13, "$75.25", "+13.22%") },
  { ticker: "UEC", name: "Uranium Energy", nameZh: "铀能源", category: "critical-minerals", rating: "A", futurePotential: 82, portfolioRole: "growth", suggestedWeight: "1%-2.5%", thesis: "铀矿供给弹性，受益核电重启和西方燃料安全。", risk: "资源股波动大，现货铀价回撤会快速传导。", online: online("UEC", "Strong Buy", 5, "$18.95", "+27.27%") },
  { ticker: "UAMY", name: "United States Antimony", nameZh: "美国锑业", category: "critical-minerals", rating: "B", futurePotential: 78, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "锑是军工、电池和阻燃材料约束点，小盘弹性强。", risk: "流动性、估值和单品类价格风险很高。", online: online("UAMY", "Strong Buy", 5, "$9.44", "-19.32%") },
  { ticker: "OKLO", name: "Oklo", nameZh: "Oklo 小堆", category: "nuclear", rating: "S", futurePotential: 93, portfolioRole: "growth", suggestedWeight: "2%-4%", thesis: "先进核裂变与数据中心电力叙事高度同频，是高赔率核能入口。", risk: "监管、首堆建设和收入兑现时间可能显著晚于市场预期。", online: online("OKLO", "Strong Buy", 16, "$101.37", "+47.36%") },
  { ticker: "BWXT", name: "BWX Technologies", nameZh: "BWX 核工程", category: "nuclear", rating: "S", futurePotential: 87, portfolioRole: "core", suggestedWeight: "2%-4%", thesis: "核燃料、海军核动力和专用核工程，现金流质量比概念小堆更稳。", risk: "估值偏贵时，上行弹性不如早期核能公司。", online: online("BWXT", "Buy", 11, "$209.70", "-3.03%") },
  { ticker: "SNDK", name: "Sandisk", nameZh: "闪迪", category: "memory", rating: "A", futurePotential: 88, portfolioRole: "growth", suggestedWeight: "2%-3.5%", thesis: "NAND 与数据中心 SSD 进入 AI 存储周期，弹性强。", risk: "存储价格周期很残酷，涨价共识过热时要降权。", online: online("SNDK", "Buy", 20, "$953.35", "-24.32%") },
  { ticker: "MU", name: "Micron", nameZh: "美光", category: "memory", rating: "S", futurePotential: 90, portfolioRole: "core", suggestedWeight: "3%-5%", thesis: "HBM 是 AI 加速器的硬瓶颈，美光是美国存储链核心。", risk: "资本开支扩张后，存储周期反转会很快压利润。", online: online("MU", "Strong Buy", 33, "$482.90", "-16.72%") },
  { ticker: "WDC", name: "Western Digital", nameZh: "西部数据", category: "memory", rating: "A", futurePotential: 82, portfolioRole: "growth", suggestedWeight: "1.5%-3%", thesis: "HDD 冷数据和 AI 数据湖扩张受益，和 SNDK 分拆后更清晰。", risk: "周期股属性强，若云厂商库存调整会受压。", online: online("WDC", "Buy", 23, "$341.91", "-22.55%") },
  { ticker: "MRAM", name: "Everspin Technologies", nameZh: "Everspin MRAM", category: "memory", rating: "B", futurePotential: 76, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "非易失 MRAM 是边缘 AI、工业和国防设备的持久化小众路线。", risk: "市场规模和客户放量仍不确定。", online: online("MRAM", "Strong Buy", 1, "$18.50", "-2.17%") },
  { ticker: "ONDS", name: "Ondas Holdings", nameZh: "Ondas 无人系统", category: "defense", rating: "A", futurePotential: 86, portfolioRole: "option", suggestedWeight: "1%-2%", thesis: "无人机、边缘通信与防务自动化叙事完整，小盘赔率高。", risk: "订单质量、融资稀释和政府采购节奏是关键。", online: online("ONDS", "Strong Buy", 6, "$19.83", "+103.38%") },
  { ticker: "OSS", name: "One Stop Systems", nameZh: "OSS 边缘算力", category: "defense", rating: "B", futurePotential: 77, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "军用和工业边缘 AI 计算设备，贴近战场算力需求。", risk: "规模小、客户集中，订单波动会放大利润波动。", online: online("OSS", "Strong Buy", 2, "$10.00", "+2.35%") },
  { ticker: "PLTR", name: "Palantir", nameZh: "帕兰提尔", category: "defense", rating: "S", futurePotential: 89, portfolioRole: "core", suggestedWeight: "3%-5%", thesis: "政企数据操作系统和国防 AI 决策层，护城河来自部署深度。", risk: "估值一直是主要风险，任何增长放缓都会被放大。", online: online("PLTR", "Buy", 23, "$191.52", "+30.80%") },
  { ticker: "IONQ", name: "IonQ", nameZh: "IonQ 量子", category: "quantum", rating: "A", futurePotential: 86, portfolioRole: "option", suggestedWeight: "1%-2%", thesis: "离子阱路线代表，商业订单和技术路线都具备叙事领先性。", risk: "量子优势兑现时间不可控，按期权仓处理。", online: online("IONQ", "Strong Buy", 13, "$66.69", "+45.80%") },
  { ticker: "QBTS", name: "D-Wave Quantum", nameZh: "D-Wave 量子退火", category: "quantum", rating: "B", futurePotential: 79, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "退火路线更接近优化问题商业化，但通用性争议仍在。", risk: "路线天花板可能弱于通用量子计算。", online: online("QBTS", "Strong Buy", 15, "$32.53", "+54.98%") },
  { ticker: "RGTI", name: "Rigetti Computing", nameZh: "Rigetti 超导量子", category: "quantum", rating: "B", futurePotential: 80, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "超导量子高弹性标的，适合小仓位押技术突破。", risk: "技术和融资风险都高，不能当核心仓。", online: online("RGTI", "Strong Buy", 9, "$30.78", "+72.63%") },
  { ticker: "RKLB", name: "Rocket Lab", nameZh: "火箭实验室", category: "space", rating: "S", futurePotential: 92, portfolioRole: "core", suggestedWeight: "3%-5%", thesis: "发射、卫星平台和政府订单三线推进，是商业航天最清晰的上市代理。", risk: "估值会提前反映成功，发射事故或订单延迟冲击大。", online: online("RKLB", "Buy", 14, "$81.62", "+1.72%") },
  { ticker: "FLY", name: "Firefly Aerospace", nameZh: "Firefly 航天", category: "space", rating: "A", futurePotential: 84, portfolioRole: "growth", suggestedWeight: "1%-2.5%", thesis: "发射和月球任务能力稀缺，国防和商业客户双线。", risk: "新上市公司财务亏损和任务执行风险高。", online: online("FLY", "Buy", 9, "$38.88", "+15.68%") },
  { ticker: "SATL", name: "Satellogic", nameZh: "Satellogic 地球观测", category: "space", rating: "C", futurePotential: 67, portfolioRole: "watch", suggestedWeight: "0%-1%", thesis: "低成本地球观测若能形成数据订阅，会有空间数据价值。", risk: "公开评级覆盖不足，商业模式和资产负债表需复核。", online: online("SATL", "无覆盖", null, "n/a", "待核验") },
  { ticker: "PL", name: "Planet Labs", nameZh: "Planet Labs", category: "space", rating: "B", futurePotential: 78, portfolioRole: "growth", suggestedWeight: "1%-2%", thesis: "高频地球观测数据是国防、农业、气候和保险的基础数据层。", risk: "收入增长和毛利改善速度仍要验证。", online: online("PL", "Buy", 12, "$27.64", "-28.34%") },
  { ticker: "ASTS", name: "AST SpaceMobile", nameZh: "AST 太空移动", category: "space", rating: "A", futurePotential: 88, portfolioRole: "option", suggestedWeight: "1%-2.5%", thesis: "卫星直连普通手机，一旦商业部署顺畅，网络价值很大。", risk: "资本开支、发射节奏和运营商合作决定成败。", online: online("ASTS", "Hold", 8, "$72.10", "+5.19%") },
  { ticker: "AMPX", name: "Amprius Technologies", nameZh: "Amprius 高能电池", category: "energy", rating: "B", futurePotential: 79, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "高能量密度硅负极电池，适合无人机、航空和高性能设备。", risk: "量产良率和成本曲线是核心风险。", online: online("AMPX", "Strong Buy", 7, "$20.17", "-0.35%") },
  { ticker: "TE", name: "T1 Energy", nameZh: "T1 Energy 太阳能制造", category: "energy", rating: "B", futurePotential: 74, portfolioRole: "watch", suggestedWeight: "0%-1.5%", thesis: "美国本土太阳能组件和电池制造重构的政策受益标的。", risk: "前身转型后仍需验证利润质量和产能利用率。", online: online("TE", "Strong Buy", 5, "$7.70", "+50.24%") },
  { ticker: "EOSE", name: "Eos Energy", nameZh: "Eos 长时储能", category: "energy", rating: "C", futurePotential: 70, portfolioRole: "option", suggestedWeight: "0%-1%", thesis: "锌基长时储能若放量，可补足电网级储能短板。", risk: "市场共识为 Hold，融资、量产和毛利风险都高。", online: online("EOSE", "Hold", 7, "$9.42", "+47.88%") },
  { ticker: "BE", name: "Bloom Energy", nameZh: "Bloom Energy 燃料电池", category: "energy", rating: "B", futurePotential: 76, portfolioRole: "watch", suggestedWeight: "0%-1.5%", thesis: "燃料电池和分布式电源可服务高可靠性数据中心。", risk: "盈利质量、氢成本和估值周期仍是压力。", online: online("BE", "Buy", 21, "$180.14", "-36.62%") },
  { ticker: "NBIS", name: "Nebius Group", nameZh: "Nebius AI 云", category: "ai-infra", rating: "S", futurePotential: 90, portfolioRole: "growth", suggestedWeight: "2%-4%", thesis: "AI 云和 GPU 容量租赁，是欧洲和全球非美 hyperscaler 的弹性代理。", risk: "算力租赁价格、融资成本和客户集中度要持续跟踪。", online: online("NBIS", "Strong Buy", 12, "$163.00", "-8.68%") },
  { ticker: "IREN", name: "IREN", nameZh: "IREN 数据中心", category: "ai-infra", rating: "A", futurePotential: 86, portfolioRole: "growth", suggestedWeight: "1.5%-3%", thesis: "矿工转型 AI/HPC 数据中心，电力资产和机房能力是关键。", risk: "比特币周期和 AI 租赁转型会同时影响估值。", online: online("IREN", "Buy", 11, "$62.50", "+25.48%") },
  { ticker: "CIFR", name: "Cipher Digital", nameZh: "Cipher AI/HPC", category: "ai-infra", rating: "A", futurePotential: 84, portfolioRole: "growth", suggestedWeight: "1%-2.5%", thesis: "低成本电力和数据中心容量，适合观察矿工转 AI 基建。", risk: "转型执行、客户签约和融资稀释是核心变量。", online: online("CIFR", "Strong Buy", 11, "$24.91", "+38.77%") },
  { ticker: "ALAB", name: "Astera Labs", nameZh: "Astera Labs 互联芯片", category: "ai-infra", rating: "S", futurePotential: 89, portfolioRole: "core", suggestedWeight: "2.5%-4%", thesis: "PCIe/CXL 互联芯片卡住 AI 服务器内部数据流，是 AI 基建的隐形卖铲人。", risk: "估值较高，若 GPU 服务器增速放缓会被重估。", online: online("ALAB", "Buy", 21, "$192.15", "-5.11%") },
  { ticker: "AMZN", name: "Amazon", nameZh: "亚马逊", category: "robotics", rating: "S", futurePotential: 87, portfolioRole: "core", suggestedWeight: "3%-6%", thesis: "AWS、物流自动化和电商履约网络让机器人有真实部署场景。", risk: "体量大导致弹性低于小盘机器人公司。", online: online("AMZN", "Strong Buy", 43, "$302.93", "+11.75%") },
  { ticker: "SERV", name: "Serve Robotics", nameZh: "Serve 配送机器人", category: "robotics", rating: "B", futurePotential: 80, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "最后一公里配送机器人，若单位经济模型成立，城市密度会放大价值。", risk: "监管、运营成本和规模化维护仍未完全验证。", online: online("SERV", "Buy", 7, "$17.67", "+89.09%") },
  { ticker: "SYM", name: "Symbotic", nameZh: "Symbotic 仓储自动化", category: "robotics", rating: "A", futurePotential: 84, portfolioRole: "growth", suggestedWeight: "1.5%-3%", thesis: "仓储自动化和供应链机器人已具备明确 ROI。", risk: "客户集中和项目交付节奏影响收入确认。", online: online("SYM", "Buy", 12, "$62.50", "+9.50%") },
  { ticker: "NVTS", name: "Navitas Semiconductor", nameZh: "Navitas 氮化镓", category: "semiconductors", rating: "B", futurePotential: 79, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "GaN/SiC 功率半导体受益快充、数据中心电源和电动化。", risk: "竞争激烈，规模化盈利仍需证明。", online: online("NVTS", "Buy", 6, "$8.90", "-44.10%") },
  { ticker: "MRVL", name: "Marvell", nameZh: "美满电子", category: "semiconductors", rating: "S", futurePotential: 88, portfolioRole: "core", suggestedWeight: "2.5%-4%", thesis: "定制 ASIC、网络和存储控制器直接绑定 hyperscaler AI 建设。", risk: "客户项目节奏和估值过热是主要风险。", online: online("MRVL", "Strong Buy", 32, "$120.28", "-26.68%") },
  { ticker: "AMD", name: "AMD", nameZh: "AMD 超微", category: "semiconductors", rating: "A", futurePotential: 85, portfolioRole: "core", suggestedWeight: "2%-4%", thesis: "CPU + GPU + AI 加速器替代供给，受益算力多元化。", risk: "与 NVIDIA 的生态差距仍是上限约束。", online: online("AMD", "Buy", 35, "$279.50", "-18.61%") },
  { ticker: "ARM", name: "Arm Holdings", nameZh: "Arm 控股", category: "semiconductors", rating: "A", futurePotential: 86, portfolioRole: "core", suggestedWeight: "2%-3.5%", thesis: "低功耗 IP 和授权模式横跨手机、边缘 AI 和服务器。", risk: "估值要求高，授权增长需要持续兑现。", online: online("ARM", "Buy", 25, "$180.75", "-11.42%") },
  { ticker: "AMBQ", name: "Ambiq Micro", nameZh: "Ambiq 低功耗芯片", category: "semiconductors", rating: "B", futurePotential: 78, portfolioRole: "option", suggestedWeight: "0.5%-1.5%", thesis: "超低功耗边缘 AI 芯片适合可穿戴、传感器和端侧智能。", risk: "规模、客户结构和竞争格局仍需跟踪。", online: online("AMBQ", "Buy", 5, "$42.20", "+6.54%") }
];

export const portfolioRoles: Record<PortfolioRole, string> = {
  core: "核心仓",
  growth: "成长仓",
  option: "期权仓",
  watch: "观察仓"
};

export const ratingLabels: Record<ConvictionRating, string> = {
  S: "S 级",
  A: "A 级",
  B: "B 级",
  C: "C 级"
};

