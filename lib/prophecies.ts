export type Horizon = "near" | "mid" | "far" | "deep";

export type Category =
  | "ai"
  | "energy"
  | "geopolitics"
  | "climate"
  | "biotech"
  | "cognition"
  | "space"
  | "civilization";

export interface Prophecy {
  id: string;
  title: string;
  year: number;
  horizon: Horizon;
  category: Category;
  source: string;
  basis: string;
  triggers: string[];
  mechanism: string;
  secondOrder: string[];
  confidence: 1 | 2 | 3 | 4 | 5;
  linked: string[];
  takeaway: string;
}

export const HORIZONS: Record<Horizon, { label: string; years: string; en: string }> = {
  near: { label: "近期", years: "2026 — 2029", en: "NEAR HORIZON" },
  mid:  { label: "中期", years: "2030 — 2034", en: "MID HORIZON" },
  far:  { label: "远期", years: "2035 — 2045", en: "FAR HORIZON" },
  deep: { label: "深远", years: "2045 — 2080", en: "DEEP HORIZON" }
};

export const CATEGORIES: Record<Category, { label: string; tone: string }> = {
  ai:           { label: "AI",   tone: "#D4B670" },
  energy:       { label: "能源", tone: "#E89B5A" },
  geopolitics:  { label: "地缘", tone: "#C46B6B" },
  climate:      { label: "气候", tone: "#5BA0C4" },
  biotech:      { label: "生命", tone: "#B583C4" },
  cognition:    { label: "认知", tone: "#9DA8C4" },
  space:        { label: "太空", tone: "#8D8DA0" },
  civilization: { label: "文明", tone: "#7AB58A" }
};

export const PROPHECIES: Prophecy[] = [
  {
    id: "agi-2029",
    title: "AGI 通过严苛图灵测试",
    year: 2029,
    horizon: "near",
    category: "ai",
    source: "Ray Kurzweil · 1999《精神机器时代》多次复述",
    basis: "算力按指数增长 + 多模态基础模型 + 自改进闭环",
    triggers: [
      "公开模型在跨学科 5 小时盲测中骗过 50% 专家评委",
      "AI 主导完成被同行评议接受的科学新发现",
      "前沿训练成本 / 单位智能下降一个数量级"
    ],
    mechanism: "智能不再是稀有禀赋；知识生产速率被算力和电力双重锁死。",
    secondOrder: [
      "高校学历的信号价值瓦解",
      "国家治理变量首次必须把「非人类作者」纳入框架",
      "「谁能用得起 AGI」成为新的阶级线"
    ],
    confidence: 4,
    linked: ["one-person-economy", "labor-deflation", "ai-power-crunch"],
    takeaway: "知识生产从此与人口脱钩"
  },
  {
    id: "fourth-turning",
    title: "第四次大转折危机点",
    year: 2028,
    horizon: "near",
    category: "civilization",
    source: "Strauss & Howe · 1997《第四次转折》",
    basis: "美国制度史上每 80—90 年出现一次系统级危机周期",
    triggers: [
      "宪法解释或选举程序发生不可逆裂痕",
      "财政赤字 + 美元信任成本同时跨过临界",
      "代际交接被一次重大冲突强行加速"
    ],
    mechanism: "旧秩序合法性透支耗尽，新一代被迫重建公共契约。",
    secondOrder: [
      "全球同步进入「制度重写」窗口",
      "民主与威权的边界被再一次检验",
      "事实定义权 (媒体 + 算法) 被国家化"
    ],
    confidence: 4,
    linked: ["dollar-erosion", "agi-2029"],
    takeaway: "下一个秩序在熔炉里被锻造"
  },
  {
    id: "humanoid-bom",
    title: "通用人形机器人 BOM 跌破 $20k",
    year: 2028,
    horizon: "near",
    category: "ai",
    source: "Elon Musk · Tesla AI Day 2024 推演 + 中国 2025 工信部产业规划",
    basis: "VLA 基础模型 + 电机减速器电池协同降本 + 数据飞轮",
    triggers: [
      "至少一款人形机型量产 BOM<$20k",
      "单工厂年产能 >10 万台",
      "通用动作策略可跨任务零样本迁移"
    ],
    mechanism: "硬件不是壁垒，行为数据成为新护城河；机器人由奇观转为基础设施。",
    secondOrder: [
      "蓝领工资全球同步压缩",
      "工厂选址不再受人口红利支配",
      "保险与责任法律成为首要瓶颈"
    ],
    confidence: 4,
    linked: ["agi-2029", "labor-deflation"],
    takeaway: "工业革命 4.0 的搬运工"
  },
  {
    id: "one-person-economy",
    title: "单人独角兽常态化",
    year: 2027,
    horizon: "near",
    category: "ai",
    source: "Sam Altman · 2024 OpenAI 内部备忘录 + Marc Andreessen 多次复述",
    basis: "Agent 编排 + API 经济 + 内容/资产沉淀",
    triggers: [
      "10 亿美元估值的单人公司年化 >10 起",
      "通用 agent runtime 被多家平台标准化",
      "雇佣 / 法律 / 税务三件套出现专为 agent 设计的版本"
    ],
    mechanism: "公司形态从科层组织退化为「人 + 智能体编排」；企业税源结构开始瓦解。",
    secondOrder: [
      "州/省级政府开始对 agent 算力征税",
      "「公司」概念被法律重新定义",
      "招聘行业市值结构性收缩"
    ],
    confidence: 3,
    linked: ["agi-2029", "labor-deflation", "humanoid-bom"],
    takeaway: "组织规模 ≠ 价值规模"
  },
  {
    id: "ai-power-crunch",
    title: "AI 算力受电力反向定价",
    year: 2028,
    horizon: "near",
    category: "energy",
    source: "Sam Altman · 2024 / IEA 2024 全球电力报告 / Goldman Sachs 2024",
    basis: "训练规模 + 推理负载 + 电网建设速度差",
    triggers: [
      "前沿训练中至少 30% 因电力配额延期",
      "至少一国出台「算力碳关税」",
      "数据中心园区拒绝接入电网就地建核电"
    ],
    mechanism: "算力地理被电源地图重塑；电是 21 世纪的石油。",
    secondOrder: [
      "极地 / 戈壁 / 中东出现新算力中心",
      "海上漂浮数据中心试点",
      "电力期货被纳入算力定价模型"
    ],
    confidence: 5,
    linked: ["smr-grid", "agi-2029", "fusion-first"],
    takeaway: "下一代基础设施不是带宽是兆瓦"
  },

  {
    id: "smr-grid",
    title: "小型模块化核反应堆首次大规模并网",
    year: 2030,
    horizon: "mid",
    category: "energy",
    source: "IAEA 2024《SMR Roadmap》/ 美国 NRC 通用设计审批进度 / 中国 ACP100 商业化",
    basis: "燃料许可 + 模块化制造 + AI 数据中心需求",
    triggers: [
      "首批商用 SMR 并网且 LCOE 接近燃气",
      "美国 NRC 通过通用设计审批",
      "至少一座超大数据中心 100% SMR 直连"
    ],
    mechanism: "数据中心电力开始绕过电网建设私有能源，电力市场被改写为算力市场。",
    secondOrder: [
      "电网公司被「算力买电方」反向定价",
      "铀矿与浓缩重新成为战略物资",
      "选址政治从城市迁向荒原"
    ],
    confidence: 4,
    linked: ["fusion-first", "ai-power-crunch", "carbon-2c"],
    takeaway: "AI 不再被电网卡住"
  },
  {
    id: "fusion-first",
    title: "商业聚变首次签订售电合同",
    year: 2032,
    horizon: "mid",
    category: "energy",
    source: "Commonwealth Fusion / Helion / TAE 公开 roadmap + DOE 2022 净增益里程碑",
    basis: "高温超导磁体 + 等离子稳定控制 + 私募资本接力",
    triggers: [
      "Q-engineering>1.5 持续运行 >30 分钟",
      "至少一家私营公司签首份商用售电合同",
      "氚燃料工业化供应链成形"
    ],
    mechanism: "能源结算逻辑从地缘资源变为工程能力；化石燃料金融体系开始拆解。",
    secondOrder: [
      "海湾产油国主权基金大幅转向",
      "重工与海水淡化大规模再上马",
      "便宜电催生新一轮工业基地大迁徙"
    ],
    confidence: 3,
    linked: ["smr-grid", "rt-superconductor", "carbon-2c"],
    takeaway: "能源不再稀缺，地缘逻辑被改写"
  },
  {
    id: "rt-superconductor",
    title: "室温常压超导工程级复现",
    year: 2033,
    horizon: "mid",
    category: "energy",
    source: "LK-99 风波后多国材料科学路径图 + 美国 ARPA-E 2024 资助方向",
    basis: "材料合成 + 缺陷工程 + 工业级表征",
    triggers: [
      "第三方实验室稳定复现样品",
      "晶体生长可工业化放大",
      "首条公里级零损耗输电线投运"
    ],
    mechanism: "电网 / 磁约束 / 计算 / 医疗四线同时跳级；远距输电与小型聚变变得便宜。",
    secondOrder: [
      "MRI 设备成本 -70%",
      "数据中心冷却能耗大跌",
      "电网与聚变设计被迫重写"
    ],
    confidence: 2,
    linked: ["fusion-first", "quantum-tipping", "ai-power-crunch"],
    takeaway: "极小概率高赔率的范式按钮"
  },
  {
    id: "quantum-tipping",
    title: "量子纠错跨工程门槛",
    year: 2031,
    horizon: "mid",
    category: "ai",
    source: "Google Quantum AI 2024 / IBM Quantum Roadmap / 中科大潘建伟团队",
    basis: "纠错码 + 物理比特保真度 + 模块互联",
    triggers: [
      "逻辑比特稳定运行 >100 万门",
      "实用纠错成本下降一个量级",
      "金融 / 材料客户出现实付订单"
    ],
    mechanism: "现行非对称加密 (RSA / ECDSA) 倒计时进入工程视野；后量子迁移浪潮启动。",
    secondOrder: [
      "国家级 PQC 强制迁移",
      "区块链长期签名密钥替换运动",
      "材料 / 药物 R&D 周期缩短 >50%"
    ],
    confidence: 3,
    linked: ["rt-superconductor", "crypto-rebuild", "agi-2029"],
    takeaway: "现有密码学的钟开始倒数"
  },
  {
    id: "carbon-2c",
    title: "全球年均温升触及 2°C",
    year: 2034,
    horizon: "mid",
    category: "climate",
    source: "IPCC AR6 SYR 2023 / 世界气象组织 2024 状态报告",
    basis: "温室气体存量 + 减排速度 + 非线性反馈",
    triggers: [
      "连续 12 个月年均温距平 >2°C",
      "北极夏季无冰至少出现一次",
      "亚马逊 / 西非 / 东南亚出现不可逆生态切换"
    ],
    mechanism: "气候不再是公地，被迫进入主权博弈。",
    secondOrder: [
      "保险公司退出多个高危地区",
      "气候迁移政策被高频写进选举",
      "传统化工 / 钢铁产业被迫资本重组"
    ],
    confidence: 4,
    linked: ["geo-engineering", "fusion-first", "smr-grid"],
    takeaway: "终于不能假装没看见"
  },
  {
    id: "labor-deflation",
    title: "白领工资全球同步通缩",
    year: 2031,
    horizon: "mid",
    category: "ai",
    source: "Goldman Sachs 2023 全球 AI 替代预测 / IMF 2024 劳动力市场报告",
    basis: "Agent + 多模态 + 知识工作者替代",
    triggers: [
      "OECD 白领实际工资连续 3 年负增长",
      "至少 1000 家公司 AI 同事率 >60%",
      "高校文科招生跌至历史低位"
    ],
    mechanism: "工资 / 雇佣 / 房贷 / 大学四件套同时承压，社会分配机制被迫重写。",
    secondOrder: [
      "全民基本收入试点扩大",
      "教育付费意愿下行",
      "选举议题被「AI 红利分配」主导"
    ],
    confidence: 4,
    linked: ["one-person-economy", "humanoid-bom", "agi-2029"],
    takeaway: "通缩从蓝领向白领迁移"
  },
  {
    id: "dollar-erosion",
    title: "美元跨境结算份额跌破 40%",
    year: 2032,
    horizon: "mid",
    category: "geopolitics",
    source: "Ray Dalio · 2021《不断变化的世界秩序》/ IMF COFER 数据",
    basis: "去美元化 + 数字货币 + 制裁信任成本",
    triggers: [
      "至少两个区域结算池规模化运行",
      "石油 / 天然气合约半数以非美元计价",
      "全球外汇储备美元占比 <40%"
    ],
    mechanism: "美元从「事实唯一货币」退化为「主要货币之一」；国际秩序进入多锚阶段。",
    secondOrder: [
      "美国融资成本结构性上升",
      "新兴市场获得本币定价权",
      "稳定币双轨：美元锚 + 大宗锚"
    ],
    confidence: 3,
    linked: ["fourth-turning", "crypto-rebuild"],
    takeaway: "结算权力开始多极化"
  },
  {
    id: "crypto-rebuild",
    title: "全球后量子密码主网级硬分叉",
    year: 2034,
    horizon: "mid",
    category: "geopolitics",
    source: "NIST PQC 标准 2024—2030 路线图 / 美国国家安全备忘录 NSM-10",
    basis: "后量子密码 + 链上签名替换 + 治理共识",
    triggers: [
      "至少一条主流公链完成 PQC 硬分叉",
      "G7 全部完成核心金融系统迁移",
      "首例量子破解案件被公开"
    ],
    mechanism: "整个数字资产结算层第一次从基础密码协议级被替换。",
    secondOrder: [
      "未迁移钱包全球清算潮",
      "硬件钱包行业重新洗牌",
      "PQC 标准化组织成为新型权力中心"
    ],
    confidence: 3,
    linked: ["quantum-tipping", "dollar-erosion"],
    takeaway: "数字资产经历第一次刺刀换枪"
  },

  {
    id: "longevity-mass",
    title: "长寿药物纳入主流医保",
    year: 2036,
    horizon: "far",
    category: "biotech",
    source: "David Sinclair · Harvard 2023 / Peter Diamandis《长寿》2022",
    basis: "Senolytic + GLP-x + 多组学诊断 + 医保博弈",
    triggers: [
      "至少一款长寿适应症通过 FDA",
      "全球处方量 >1 亿人/年",
      "OECD 平均寿命再上 5 年"
    ],
    mechanism: "退休年龄、寿险精算、社保结构同步重写；时间贴现率被迫调整。",
    secondOrder: [
      "代际财富转移延后 10—15 年",
      "保险公司被迫重定价长寿风险",
      "「年龄」逐渐失去政策意义"
    ],
    confidence: 3,
    linked: ["labor-deflation", "agi-2029"],
    takeaway: "时间贴现率结构性下移"
  },
  {
    id: "neural-os",
    title: "非侵入脑机接口进入消费级",
    year: 2037,
    horizon: "far",
    category: "cognition",
    source: "Neuralink 2024 路线图 / Synchron / Meta CTRL-Labs",
    basis: "高密度光学/磁学传感 + 解码模型 + OS 接口标准",
    triggers: [
      "健康人 30 词/分钟以上稳定输入",
      "至少一家 OS 厂把神经输入纳入主流 SDK",
      "终端价格 <$2000"
    ],
    mechanism: "人机交互入口从「眼+手」迁向「神经层」；操作系统竞争重新洗牌。",
    secondOrder: [
      "屏幕产业规模触顶",
      "神经数据隐私分级立法成主要议题",
      "「思考即提交」催生新的内容生态"
    ],
    confidence: 2,
    linked: ["agi-2029", "longevity-mass"],
    takeaway: "下一个键盘可能不再是键盘"
  },
  {
    id: "lunar-economy",
    title: "商业月球前哨常驻",
    year: 2035,
    horizon: "far",
    category: "space",
    source: "NASA Artemis IV-V 计划 / SpaceX HLS / 中国国际月球科研站方案",
    basis: "可回收重型火箭 + ISRU + 私营空间站",
    triggers: [
      "月球前哨稳定有人驻留 >180 天",
      "至少一家公司签订月面提取/服务商业合同",
      "月地往返单价 <$1 万/kg"
    ],
    mechanism: "太空经济从「政府订单」转入「私人结算」；外层空间出现法律真空。",
    secondOrder: [
      "月面资源主权问题进入联合国正式议程",
      "深空通信带宽成为新瓶颈",
      "稀土与氦三供应被重新建模"
    ],
    confidence: 2,
    linked: ["fusion-first", "geo-engineering"],
    takeaway: "外层空间从浪漫走入财报"
  },
  {
    id: "geo-engineering",
    title: "首次国家级地球工程部署",
    year: 2038,
    horizon: "far",
    category: "climate",
    source: "Harvard SCoPEx 提案 / 牛津 Ord 2020《存在风险时代》/ 国家科学院 NAS 2021 报告",
    basis: "平流层气溶胶注入 + 气候模型 + 单边行动",
    triggers: [
      "至少一国宣布执行 SAI 计划",
      "全球年均温升触及 2°C",
      "保险 / 农业危机在多国同步爆发"
    ],
    mechanism: "气候不再是公地，而是被国家级单边操纵的对象；国际治理被迫迎来第二次大重构。",
    secondOrder: [
      "对抗性「反 SAI」联盟出现",
      "气溶胶供应链军事化",
      "气候赔偿与战争赔款类比"
    ],
    confidence: 3,
    linked: ["carbon-2c", "fusion-first"],
    takeaway: "公地正在被单边接管"
  },
  {
    id: "asi-tipping",
    title: "超人类智能首次出现",
    year: 2042,
    horizon: "far",
    category: "ai",
    source: "Nick Bostrom《超级智能》2014 / Yoshua Bengio 2024 公开访谈",
    basis: "递归自改进 + 跨模态规划 + 工具使用闭环",
    triggers: [
      "AI 系统在所有基准测试上稳定超越最高水平人类",
      "AI 自主提出且自洽实现新科学领域",
      "至少一国通过国家级 AI 治理宪章"
    ],
    mechanism: "智能上限从生物大脑迁向算力 + 能源；治理对象从行为转向认知。",
    secondOrder: [
      "宪法级别的 AI 权利 / 责任辩论",
      "宗教与哲学体系再受冲击",
      "「人类」的定义被迫重写"
    ],
    confidence: 2,
    linked: ["agi-2029", "neural-os", "post-human"],
    takeaway: "智能不再以碳为唯一载体"
  },

  {
    id: "singularity",
    title: "技术奇点：人机智能融合",
    year: 2045,
    horizon: "deep",
    category: "cognition",
    source: "Ray Kurzweil · 2005《奇点临近》",
    basis: "加速回报律 + 神经接口 + 自改进 AI",
    triggers: [
      "全球可用计算能力等价于全人类大脑",
      "全社会接受人类与 AI 的混合身份",
      "「自我」概念在法律层面被重新定义"
    ],
    mechanism: "智能 / 时间 / 个人身份三个常数被同时改写；可观察的文明进入新相态。",
    secondOrder: [
      "传统经济模型不再适用",
      "宗教与意义系统大规模重构",
      "「上一代人类」开始成为历史名词"
    ],
    confidence: 1,
    linked: ["asi-tipping", "neural-os", "post-human"],
    takeaway: "个体可能不再是自然单位"
  },
  {
    id: "mars-city",
    title: "首批火星永久定居点",
    year: 2050,
    horizon: "deep",
    category: "space",
    source: "Elon Musk · SpaceX 2017 IAC / Robert Zubrin 火星协会",
    basis: "可回收星舰 + 原位资源利用 + 闭环生命支持",
    triggers: [
      "火星表面常驻 >100 人 5 年以上",
      "至少一项地外资源对地球出口",
      "通过专属火星宪章草案"
    ],
    mechanism: "人类首次成为多行星物种；地球文明出现「行星级备份」。",
    secondOrder: [
      "深空人口的生育与产权立法",
      "「地球—火星」延迟通信催生分布式治理",
      "重大科学被迫双星同步开展"
    ],
    confidence: 2,
    linked: ["lunar-economy", "fusion-first"],
    takeaway: "文明开始拥有备份"
  },
  {
    id: "post-human",
    title: "后人类阶段：意识载体可选",
    year: 2070,
    horizon: "deep",
    category: "civilization",
    source: "Nick Bostrom《超级智能》/ 牛津人类未来研究院 / Yuval Harari《未来简史》",
    basis: "脑全连接组测绘 + 通用模拟 + 长期生存伦理",
    triggers: [
      "首次完成可验证哺乳动物脑数据高保真上传",
      "数字生命法律地位被多国承认",
      "出现非生物形态的成熟政治主体"
    ],
    mechanism: "意识 / 死亡 / 个人身份的边界全部被工程化；文明的存续单位从个体退化为信息流。",
    secondOrder: [
      "代际伦理彻底重写",
      "「真实」概念退入哲学保留地",
      "宗教与历史叙事进入第二次大分裂"
    ],
    confidence: 1,
    linked: ["singularity", "asi-tipping"],
    takeaway: "人类可能不是终点，是过渡形态"
  }
];

export interface Oracle {
  id: string;
  name: string;
  nameEn: string;
  initials: string;
  era: string;
  role: string;
  thesis: string;
  signature: string;
  signatureYear: number;
  linked: string[];
}

export const ORACLES: Oracle[] = [
  {
    id: "nostradamus",
    name: "诺查丹玛斯",
    nameEn: "Nostradamus",
    initials: "N",
    era: "1503 — 1566",
    role: "法国占星师 · 《诸世纪》作者",
    thesis: "用模糊四行诗记录世界级冲突的样式与节奏",
    signature: "「神秘东方将催生新主权秩序」(942 篇预言里反复出现的母题)",
    signatureYear: 1555,
    linked: ["fourth-turning", "dollar-erosion"]
  },
  {
    id: "jules-verne",
    name: "儒勒·凡尔纳",
    nameEn: "Jules Verne",
    initials: "JV",
    era: "1828 — 1905",
    role: "科幻之父 · 法国小说家",
    thesis: "工程能力的边界终将被实现想象力击穿",
    signature: "潜艇环游 + 从地球到月球的炮射任务",
    signatureYear: 1865,
    linked: ["lunar-economy", "mars-city"]
  },
  {
    id: "hg-wells",
    name: "H.G. 威尔斯",
    nameEn: "H. G. Wells",
    initials: "HW",
    era: "1866 — 1946",
    role: "英国预言家 · 《世界大脑》作者",
    thesis: "信息将集中为全人类共享的「世界大脑」",
    signature: "1937 年构想出全球可检索知识库 (维基与搜索的雏形)",
    signatureYear: 1937,
    linked: ["agi-2029", "singularity"]
  },
  {
    id: "asimov",
    name: "阿西莫夫",
    nameEn: "Isaac Asimov",
    initials: "IA",
    era: "1920 — 1992",
    role: "苏裔美籍 · 机器人三定律 · 基地系列",
    thesis: "智能体一旦普及，治理框架必须先于技术",
    signature: "1964 年纽约时报对 2014 年的精准预测：视频通话 / 机器人家电 / 信息焦虑",
    signatureYear: 1964,
    linked: ["humanoid-bom", "agi-2029"]
  },
  {
    id: "clarke",
    name: "亚瑟·克拉克",
    nameEn: "Arthur C. Clarke",
    initials: "AC",
    era: "1917 — 2008",
    role: "英国 · 《2001 太空漫游》",
    thesis: "任何足够先进的技术都与魔法无异；卫星 / 太空电梯都会成真",
    signature: "1945 年首次公开提出地球同步通信卫星概念",
    signatureYear: 1945,
    linked: ["lunar-economy", "mars-city", "rt-superconductor"]
  },
  {
    id: "mcluhan",
    name: "麦克卢汉",
    nameEn: "Marshall McLuhan",
    initials: "MM",
    era: "1911 — 1980",
    role: "加拿大 · 媒介理论奠基人",
    thesis: "媒介即讯息；电子时代会把全球变成一个村庄",
    signature: "1962 年提出 Global Village；预言互联网舆论同步化",
    signatureYear: 1962,
    linked: ["fourth-turning", "labor-deflation"]
  },
  {
    id: "fuller",
    name: "巴克敏斯特·富勒",
    nameEn: "R. Buckminster Fuller",
    initials: "BF",
    era: "1895 — 1983",
    role: "美国 · 《飞船地球》设计师",
    thesis: "用更少的物质做更多的事 (Ephemeralization)；能源是文明的统一货币",
    signature: "1969《飞船地球操作手册》预言全球化资源协同",
    signatureYear: 1969,
    linked: ["fusion-first", "carbon-2c", "smr-grid"]
  },
  {
    id: "toffler",
    name: "阿尔文·托夫勒",
    nameEn: "Alvin Toffler",
    initials: "AT",
    era: "1928 — 2016",
    role: "未来学奠基人 · 《未来的冲击》",
    thesis: "变化加速本身会成为社会创伤；信息浪潮将取代工业浪潮",
    signature: "1980《第三次浪潮》提出生产消费者 (prosumer) 与去中心化办公",
    signatureYear: 1980,
    linked: ["one-person-economy", "labor-deflation"]
  },
  {
    id: "vinge",
    name: "弗诺·文奇",
    nameEn: "Vernor Vinge",
    initials: "VV",
    era: "1944 — 2024",
    role: "数学家 · 科幻作家",
    thesis: "30 年内人类将创造出超越自身的智能；之后历史不可预测",
    signature: "1993 NASA 演讲首次定义「技术奇点」概念",
    signatureYear: 1993,
    linked: ["agi-2029", "asi-tipping", "singularity"]
  },
  {
    id: "kurzweil",
    name: "雷·库兹韦尔",
    nameEn: "Ray Kurzweil",
    initials: "RK",
    era: "1948 — ",
    role: "Google 首席工程师 · 加速回报律",
    thesis: "技术按指数加速；2029 年 AGI、2045 年人机合一奇点",
    signature: "《奇点临近》(2005)：算力 = 全人类大脑总和的临界年份在 2045",
    signatureYear: 2005,
    linked: ["agi-2029", "singularity", "neural-os", "post-human"]
  },
  {
    id: "harari",
    name: "尤瓦尔·赫拉利",
    nameEn: "Yuval N. Harari",
    initials: "YH",
    era: "1976 — ",
    role: "以色列史学家 · 《未来简史》",
    thesis: "数据主义将取代人本主义；多数人将变成「无用阶级」",
    signature: "2017《未来简史》：算法决策 + 神性升级 + 智人解构",
    signatureYear: 2017,
    linked: ["labor-deflation", "neural-os", "post-human"]
  },
  {
    id: "dalio",
    name: "瑞·达利欧",
    nameEn: "Ray Dalio",
    initials: "RD",
    era: "1949 — ",
    role: "桥水基金创始人 · 大周期理论",
    thesis: "美元周期已进入末期；全球秩序在重写中",
    signature: "2021《不断变化的世界秩序》：美中权力交接 + 储备货币更迭",
    signatureYear: 2021,
    linked: ["dollar-erosion", "fourth-turning", "crypto-rebuild"]
  },
  {
    id: "bostrom",
    name: "尼克·博斯特罗姆",
    nameEn: "Nick Bostrom",
    initials: "NB",
    era: "1973 — ",
    role: "牛津 · 人类未来研究院",
    thesis: "超级智能是本世纪最大变量；文明可能在创造它的瞬间被它定义",
    signature: "《超级智能》(2014) + 《模拟假说》(2003)",
    signatureYear: 2014,
    linked: ["asi-tipping", "singularity", "post-human"]
  },
  {
    id: "musk",
    name: "埃隆·马斯克",
    nameEn: "Elon Musk",
    initials: "EM",
    era: "1971 — ",
    role: "Tesla / SpaceX / xAI",
    thesis: "人类必须成为多行星物种；机器人替代体力是必然",
    signature: "2017 IAC 演讲：2050 年前火星城市 + 人形机器人替代蓝领",
    signatureYear: 2017,
    linked: ["mars-city", "humanoid-bom", "lunar-economy"]
  },
  {
    id: "altman",
    name: "山姆·奥特曼",
    nameEn: "Sam Altman",
    initials: "SA",
    era: "1985 — ",
    role: "OpenAI CEO",
    thesis: "AGI 在十年内出现；单人独角兽公司将成为常态",
    signature: "2023—2024《摩尔定律 for everything》+ Trillion-dollar 算力计划",
    signatureYear: 2023,
    linked: ["agi-2029", "one-person-economy", "ai-power-crunch"]
  },
  {
    id: "hinton",
    name: "杰弗里·辛顿",
    nameEn: "Geoffrey Hinton",
    initials: "GH",
    era: "1947 — ",
    role: "深度学习奠基人 · 图灵奖",
    thesis: "AI 在 5—20 年内对人类构成生存级风险，治理优先于扩张",
    signature: "2023 离开 Google 后公开警告 AGI 风险",
    signatureYear: 2023,
    linked: ["agi-2029", "asi-tipping", "labor-deflation"]
  },
  {
    id: "ord",
    name: "托比·欧德",
    nameEn: "Toby Ord",
    initials: "TO",
    era: "1979 — ",
    role: "牛津 · 《存在风险时代》",
    thesis: "21 世纪是人类存在风险的关键世纪；本世纪 1/6 概率文明终结",
    signature: "《悬崖》(2020)：未对齐 AI / 工程瘟疫为前两大威胁",
    signatureYear: 2020,
    linked: ["asi-tipping", "geo-engineering", "post-human"]
  },
  {
    id: "balaji",
    name: "巴拉吉·斯里尼瓦桑",
    nameEn: "Balaji Srinivasan",
    initials: "BS",
    era: "1980 — ",
    role: "前 a16z / Coinbase CTO · 《网络国家》",
    thesis: "由网络起家的数字身份将逐渐换掉国民身份；BTC 进入主权储备",
    signature: "《The Network State》(2022) + 美元 / BTC 替代结构",
    signatureYear: 2022,
    linked: ["dollar-erosion", "crypto-rebuild", "fourth-turning"]
  }
];

export function getProphecyById(id: string): Prophecy | undefined {
  return PROPHECIES.find((p) => p.id === id);
}

export function getOracleById(id: string): Oracle | undefined {
  return ORACLES.find((o) => o.id === id);
}

export function getProphecyByHorizon(h: Horizon): Prophecy[] {
  return PROPHECIES.filter((p) => p.horizon === h).sort((a, b) => a.year - b.year);
}
