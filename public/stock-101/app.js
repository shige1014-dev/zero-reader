const lessonData = [
  {
    title: "股票是什么",
    body: "股票代表公司的一部分所有权。买股票不是买代码，而是在承担价格波动的同时，分享一家公司的经营结果。先理解“我是股东”，再理解“价格会波动”。",
    goals: ["知道股票不是存款，也不是彩票", "理解股东、公司、股价之间的关系", "分清公司价值和市场价格"],
    mistake: "把股价上涨当成公司一定变好。短期价格会受情绪影响，公司基本面变化通常更慢。",
    practice: "找一家你熟悉的上市公司，写一句话：它靠什么赚钱？客户是谁？"
  },
  {
    title: "市场怎么运转",
    body: "股票价格来自买卖双方撮合。有人愿意更高价买，价格可能上涨；有人急着卖，价格可能下跌。市场不是提款机，而是所有参与者共同报价的地方。",
    goals: ["理解交易所和撮合机制", "知道价格来自买卖双方", "理解流动性为什么重要"],
    mistake: "以为股价每天都有一个“正确答案”。市场价格只是当下成交结果，不等于真实价值。",
    practice: "打开任意行情页，观察买一、卖一和最新成交价是否完全相同。"
  },
  {
    title: "账户与下单",
    body: "新手要先理解开户、委托、成交、手续费、交易时间、买一卖一。下单前确认三件事：买什么、买多少、如果判断错了怎么办。",
    goals: ["区分市价单和限价单", "知道手续费会影响真实收益", "下单前先写买入理由和退出条件"],
    mistake: "只盯买入按钮，不看成交价格、数量和费用。小错误在频繁交易里会累积。",
    practice: "模拟写一张下单卡：股票、价格、数量、买入理由、止损条件。"
  },
  {
    title: "指数和个股",
    body: "指数代表一篮子股票的整体表现，个股代表单家公司。新手先看指数和行业，再看个股，可以避免只盯一家公司而忽略市场环境。",
    goals: ["理解大盘指数的含义", "知道行业会影响个股表现", "明白分散风险的基本逻辑"],
    mistake: "只看一只股票涨跌，不看大盘和行业。如果整个行业下跌，个股下跌不一定是公司单独出问题。",
    practice: "比较一只股票和它所属行业指数最近一周的走势，看看谁更强。"
  },
  {
    title: "收益与亏损",
    body: "股票收益主要来自股价上涨和分红，亏损来自价格下跌和错误持有。短期涨跌很常见，关键是你是否知道自己为什么买、最多能亏多少。",
    goals: ["理解价差收益和分红收益", "知道浮盈浮亏不是最终结果", "先定义风险，再期待收益"],
    mistake: "只计算可能赚多少，不计算最大能亏多少。没有风险预算的交易很容易失控。",
    practice: "假设买入1000元，最多只愿亏8%，写出亏损金额和退出价格。"
  },
  {
    title: "新手禁区",
    body: "不要一开始就碰杠杆、满仓、追热点、听消息买入。新手最重要的不是赚快钱，而是用小错误换经验，避免一次大错退出游戏。",
    goals: ["识别高风险行为", "避免把运气误认为能力", "建立先小仓位练习的习惯"],
    mistake: "第一次赚钱后马上加大本金。早期盈利可能只是市场运气，不代表方法可靠。",
    practice: "列出自己最容易犯的三个错误：追涨、恐慌卖出、听消息、频繁交易等。"
  },
  {
    title: "K线四价",
    body: "一根K线包含开盘价、收盘价、最高价、最低价。它记录的是某段时间内价格如何波动，不是单独的预测工具。",
    goals: ["看懂红绿K线的四个价格", "理解实体和影线代表什么", "知道单根K线信息有限"],
    mistake: "看到某个形态就立刻下结论。K线必须结合趋势位置、成交量和市场环境。",
    practice: "找一根长上影线K线，观察它出现前价格已经上涨还是下跌。"
  },
  {
    title: "成交量",
    body: "成交量代表交易活跃度。上涨放量说明买入意愿较强，放量下跌说明卖压较重，但成交量也需要结合位置判断。",
    goals: ["理解成交量和换手率", "观察量价是否配合", "识别异常放量"],
    mistake: "只要放量就认为是好事。高位放量可能是分歧加大，也可能是资金出货。",
    practice: "找一只股票最近最大成交量那天，记录当天是上涨还是下跌。"
  },
  {
    title: "趋势和位置",
    body: "趋势描述价格运动方向，位置描述当前价格在历史区间中的高低。20日线常用来观察短中期节奏，50日线常用来观察中期趋势，但均线本质上是过去价格的平均值，具有滞后性。",
    goals: ["理解上升、下降、震荡三种状态", "识别支撑和压力只是参考区", "学会观察20日线和50日线的方向与距离"],
    mistake: "把均线当成必然支撑。价格跌到20日线或50日线附近不代表一定反弹，必须结合位置、成交量和基本面。",
    practice: "找一只股票最近6个月走势，标出当前价、20日线、50日线、半年最高价和半年最低价。"
  },
  {
    title: "盘口基础",
    body: "盘口显示买卖报价和挂单数量。它能帮助你理解短期流动性，但不适合作为长期投资依据。",
    goals: ["认识买一、卖一和价差", "理解流动性差时成交可能不理想", "知道盘口容易快速变化"],
    mistake: "看到大买单就以为一定会上涨。盘口挂单可以撤销，不能直接等同真实意图。",
    practice: "观察一只成交不活跃的股票，记录买一卖一之间的价差。"
  },
  {
    title: "市场情绪",
    body: "市场情绪会放大涨跌。上涨时人容易贪婪，下跌时人容易恐惧。新手要学会把情绪和决策分开。",
    goals: ["识别追涨和恐慌卖出", "知道短期情绪会偏离价值", "建立交易前检查清单"],
    mistake: "用心情决定买卖。真正需要依赖的是买入理由、估值、仓位和退出规则。",
    practice: "写下你最容易冲动买入的场景：大涨、朋友推荐、新闻刺激，还是怕错过。"
  },
  {
    title: "商业模式",
    body: "商业模式回答公司如何赚钱：卖什么、卖给谁、为什么客户愿意持续付费、竞争对手能不能轻易替代它。",
    goals: ["理解收入来源", "识别客户和竞争对手", "判断赚钱方式是否可持续"],
    mistake: "只因为产品有名就认为公司一定好。好产品不等于好生意，好生意也不等于好价格。",
    practice: "用三句话描述一家公司：卖什么、客户是谁、竞争优势是什么。"
  },
  {
    title: "财报三表",
    body: "利润表看赚了多少，资产负债表看家底和负债，现金流量表看钱是否真的进来。三张表要一起看。",
    goals: ["区分收入、利润和现金流", "关注负债和应收账款", "理解利润质量"],
    mistake: "只看净利润增长。利润增长但现金流很差时，需要继续检查应收账款、存货和一次性收益。",
    practice: "找一家公司年报，记录营业收入、净利润、经营现金流三个数字。"
  },
  {
    title: "关键指标",
    body: "关键指标是压缩后的公司体检表。收入增长、毛利率、净利率、ROE、负债率、经营现金流都能帮助你快速定位问题。",
    goals: ["知道每个指标回答什么问题", "避免单指标判断公司", "比较同一行业内的公司"],
    mistake: "看到一个指标高就认为公司优秀。不同商业模式的指标标准不同，要和同行比较。",
    practice: "选择同一行业两家公司，对比它们的毛利率和ROE。"
  },
  {
    title: "估值入门",
    body: "估值不是算一个绝对正确的价格，而是判断当前价格是否给了足够安全边际。常见工具包括PE、PB和现金流折现思维。",
    goals: ["理解价格和价值的区别", "知道PE、PB适用范围", "建立安全边际意识"],
    mistake: "便宜就买。低估值可能来自市场忽视，也可能来自公司质量变差。",
    practice: "找一家盈利稳定公司，查看它当前PE和过去5年PE区间。"
  },
  {
    title: "仓位管理",
    body: "仓位管理决定你判断错时能不能活下来。新手先用小仓位、分批买入、单笔亏损上限来保护自己。",
    goals: ["理解总仓位和单票仓位", "用分批降低一次性判断压力", "设置单笔最大亏损"],
    mistake: "因为很看好就一次满仓。再好的判断也可能遇到市场波动和信息错误。",
    practice: "假设总资金10000元，设计单只股票不超过20%的仓位计划。"
  },
  {
    title: "复盘系统",
    body: "复盘是把每次买卖变成学习材料。记录买入理由、卖出理由、结果和错误，比事后只看盈亏更重要。",
    goals: ["建立交易日志", "区分过程正确和结果正确", "从重复错误里改进规则"],
    mistake: "赚钱就认为自己对，亏钱就认为市场错。结果可能受运气影响，过程才决定长期水平。",
    practice: "设计一张复盘表：日期、标的、理由、仓位、退出规则、结果、教训。"
  }
];

const quiz = [
  // ─── L1 基础常识 (10) ───
  { q: "学习股票最合理的第一步是什么？", a: ["理解股票和市场是什么", "马上找一只热门股", "学习复杂指标", "借钱提高本金"], correct: 0 },
  { q: "股票价格主要由什么形成？", a: ["买卖双方的交易撮合", "公司名字好不好听", "固定利率", "每天自动上涨"], correct: 0 },
  { q: "持有 100 股某公司股票, 你的本质身份是?", a: ["公司股东 (持有所有权一部分)", "公司员工", "公司客户", "公司债权人"], correct: 0 },
  { q: "限价单和市价单的核心差别是?", a: ["限价单指定成交价格 / 市价单当下立即成交", "限价单更贵", "市价单只能买不能卖", "没区别"], correct: 0 },
  { q: "指数 (e.g. SPX/纳斯达克) 代表什么?", a: ["一篮子股票的整体表现", "单家公司股价", "全球 GDP", "美元汇率"], correct: 0 },
  { q: "买入前最先确定的事?", a: ["最大可承受亏损 + 退出条件", "明天涨多少", "朋友买没买", "K 线形态"], correct: 0 },
  { q: "新手最危险的行为是?", a: ["借钱 + 满仓 + 听消息买", "看财报", "用模拟账户", "记交易日志"], correct: 0 },
  { q: "假设买入 1000 元, 计划最多亏 8%, 该止损在?", a: ["920 元附近", "买入价 - 100", "买入价 -50%", "不设止损"], correct: 0 },
  { q: "分红收益和价差收益的区别?", a: ["分红来自公司利润分配 / 价差来自买卖差价", "分红更高", "都是同一回事", "价差是手续费"], correct: 0 },
  { q: "股票账户里出现 '浮亏', 意思是?", a: ["未卖出但当前账面亏损 (尚未实现)", "已经亏损实现", "账户被冻结", "需要补缴税"], correct: 0 },

  // ─── L2 行情阅读 (10) ───
  { q: "K 线学习应该放在哪个阶段?", a: ["先理解市场, 再学行情", "第一天就背形态", "完全不用学", "等买完再看"], correct: 0 },
  { q: "一根 K 线包含哪 4 个价格?", a: ["开盘 / 收盘 / 最高 / 最低", "买价 / 卖价 / 中间价 / 平均", "今 / 昨 / 上周 / 上月", "高 / 低 / 涨幅 / 成交量"], correct: 0 },
  { q: "高位放量长上影线最可能说明什么?", a: ["上方分歧加大, 风险上升", "立刻继续涨", "公司基本面变好", "缩量盘整"], correct: 0 },
  { q: "成交量代表的是?", a: ["参与交易的活跃度", "公司利润", "明天涨跌方向", "K 线颜色"], correct: 0 },
  { q: "20 日线 vs 50 日线哪个更敏感?", a: ["20 日线 (短中期节奏)", "50 日线", "都一样", "看股价决定"], correct: 0 },
  { q: "20 日线下穿 50 日线 (死叉) 通常说明?", a: ["短中期趋势可能转弱", "立刻强买信号", "公司财报变好", "无意义"], correct: 0 },
  { q: "支撑位和压力位是?", a: ["参考性区域, 非绝对屏障", "必然反弹/反转的魔法线", "公司财务指标", "成交量比率"], correct: 0 },
  { q: "盘口大买单一定意味着会上涨吗?", a: ["不一定, 挂单可撤销", "一定上涨", "一定下跌", "和价格无关"], correct: 0 },
  { q: "缩量反弹通常说明?", a: ["卖压减弱但买入共识不足", "强反转信号", "公司利好", "无任何含义"], correct: 0 },
  { q: "新手读盘正确顺序?", a: ["大盘行业 → 趋势位置 → 成交量 → K 线", "K 线 → 趋势 → 大盘 → 量", "随便看", "只看 K 线"], correct: 0 },

  // ─── L3 价值判断 (10) ───
  { q: "判断公司值不值得研究, 顺序?", a: ["商业模式 → 财报 → 指标 → 估值", "群聊推荐", "涨幅榜", "代码顺眼"], correct: 0 },
  { q: "公司利润涨, 但经营现金流连续 2 年为负, 说明?", a: ["利润质量需要查验", "公司一定优秀", "立刻满仓", "无影响"], correct: 0 },
  { q: "财报三大报表是?", a: ["利润 / 资产负债 / 现金流", "买卖 / 持仓 / 转账", "K 线 / 盘口 / 量", "估值 / 分红 / 仓位"], correct: 0 },
  { q: "ROE 必须和什么一起看?", a: ["负债率 (避免高杠杆假象)", "公司 logo 颜色", "K 线形态", "股价高低"], correct: 0 },
  { q: "PE 估值低就一定便宜吗?", a: ["不一定 (可能是价值陷阱)", "一定便宜", "PE 越高越好", "PE 无意义"], correct: 0 },
  { q: "毛利率突然下降, 该?", a: ["查原因 (成本/竞争/定价)", "立刻加仓", "无视", "卖出全部"], correct: 0 },
  { q: "好公司 + 好价格 + 好仓位 = 任何一项 0 怎么办?", a: ["整体降级 / 不上场", "三项满分必赢", "运气决定", "算盈利再说"], correct: 0 },
  { q: "安全边际的意思?", a: ["价格 vs 价值的折扣空间", "保证金额", "止损宽度", "分红比例"], correct: 0 },
  { q: "单只股票仓位上限通常建议?", a: ["不超过总资金 20%", "100% 满仓", "10000 元", "无限制"], correct: 0 },
  { q: "复盘记录最关键的?", a: ["买入理由 / 退出条件 / 教训", "只记盈亏", "不需要复盘", "记日期就够"], correct: 0 },
];

const quizSections = {
  L1: { name: "基础常识", range: [0, 10] },
  L2: { name: "行情阅读", range: [10, 20] },
  L3: { name: "价值判断", range: [20, 30] },
  ALL: { name: "综合 30 题", range: [0, 30] },
};

// ─── 7 步好股票框架 ─────────────────────
const FRAMEWORK = [
  {
    step: 1,
    title: "看懂业务",
    icon: "🏗",
    color: "#7AE8A0",
    test: "能用一句话讲清: 卖什么 / 给谁 / 凭什么",
    fail: "讲不清主营 / 只能讲'生态''愿景'",
    example: "AAPL = 卖手机给消费者, 凭设计 + 生态 + 品牌; 不能解释清就 PASS",
  },
  {
    step: 2,
    title: "护城河",
    icon: "🛡",
    color: "#5A8AA6",
    test: "5 类: 品牌 / 规模 / 网络效应 / 切换成本 / 监管牌照",
    fail: "无法说出竞争对手做不到的事",
    example: "GOOGL Search 网络效应 + 数据规模; CMG 品牌 + 渠道; PLTR 政府信任 + 部署深度",
  },
  {
    step: 3,
    title: "财务质量",
    icon: "📊",
    color: "#FFD86B",
    test: "OCF/净利润 > 80% + ROIC ≥ 15% + 毛利率行业前 1/3",
    fail: "利润涨但 OCF 持续负 / ROIC < WACC",
    example: "MSFT ROIC 30% + 毛利 70% + OCF 95% (健康); 不少 SaaS 利润假, OCF 负",
  },
  {
    step: 4,
    title: "成长可持续",
    icon: "📈",
    color: "#C89060",
    test: "未来 3-5 年 TAM 扩大 + 公司能拿份额",
    fail: "依赖一次性单 / 周期高点 / 政府补贴",
    example: "NVDA AI 算力 TAM 10 倍 + 80% 份额; 烟草股 TAM 慢减 = 不能定为成长",
  },
  {
    step: 5,
    title: "估值合理",
    icon: "🎯",
    color: "#FF9F40",
    test: "PE / FCF Yield / DCF 至少一种给出安全边际",
    fail: "PEG > 3 / FCF Yield < 1% / 透支 N 年成长",
    example: "GOOGL PE 25 + FCF Yield 4% (合理); PLTR PE 200 = 透支 10 年",
  },
  {
    step: 6,
    title: "管理层诚信",
    icon: "🤝",
    color: "#7aa88a",
    test: "持续大量内部买入 / 不滥用回购 / 不画饼",
    fail: "大额内部减持 / 频繁套现 / 关联交易",
    example: "Berkshire 巴菲特从不卖股 (绝对持续); 一些 SPAC 创始人 IPO 后立刻减持",
  },
  {
    step: 7,
    title: "心理仓位",
    icon: "🧘",
    color: "#9a8aa0",
    test: "如果跌 30%, 我能不能拿住 + 不影响生活",
    fail: "需要这笔钱 / 跌 10% 就想割肉",
    example: "Buffett: 'You don't have to be smarter than the rest, you have to be more disciplined.'",
  },
];

// ─── 12 K 线经典形态 ─────────────────────
const KLINE_PATTERNS = [
  { name:"锤子线", group:"反转", color:"#7AE8A0",
    use:"下跌后底部反转信号. 长下影 + 小实体 + 短上影",
    teach:"出现在下跌末端 = 多头入场强信号; 上涨中无意义",
    confirm:"次日放量阳线收高 = 反转确认; 阴线吞没 = 失败",
    svg:`<svg viewBox="0 0 100 80"><line x1="50" y1="10" x2="50" y2="35" stroke="#A89B82" stroke-width="2"/><rect x="42" y="20" width="16" height="18" fill="#7AE8A0"/><line x1="50" y1="38" x2="50" y2="72" stroke="#A89B82" stroke-width="2"/></svg>` },
  { name:"倒锤子", group:"反转", color:"#7AE8A0",
    use:"下跌末端反转预警, 比锤子弱",
    teach:"上方试探失败但买盘介入",
    confirm:"次日放量阳线突破上影最高",
    svg:`<svg viewBox="0 0 100 80"><line x1="50" y1="8" x2="50" y2="45" stroke="#A89B82" stroke-width="2"/><rect x="42" y="45" width="16" height="22" fill="#7AE8A0"/></svg>` },
  { name:"多头吞没", group:"反转", color:"#7AE8A0",
    use:"下跌末端最强反转信号",
    teach:"前一根阴 + 后一根大阳完全吞没前阴实体",
    confirm:"吞没量越大越有效, 第三日确认上涨",
    svg:`<svg viewBox="0 0 100 80"><line x1="30" y1="25" x2="30" y2="55" stroke="#FF6B6B" stroke-width="2"/><rect x="24" y="30" width="12" height="20" fill="#FF6B6B"/><line x1="70" y1="15" x2="70" y2="65" stroke="#7AE8A0" stroke-width="2"/><rect x="62" y="20" width="16" height="40" fill="#7AE8A0"/></svg>` },
  { name:"空头吞没", group:"反转", color:"#FF6B6B",
    use:"高位反转 / 见顶强信号",
    teach:"前一根阳 + 后一根大阴完全吞没",
    confirm:"高位放量 + 跌破前低确认",
    svg:`<svg viewBox="0 0 100 80"><line x1="30" y1="25" x2="30" y2="55" stroke="#7AE8A0" stroke-width="2"/><rect x="24" y="30" width="12" height="20" fill="#7AE8A0"/><line x1="70" y1="15" x2="70" y2="65" stroke="#FF6B6B" stroke-width="2"/><rect x="62" y="20" width="16" height="40" fill="#FF6B6B"/></svg>` },
  { name:"启明星", group:"反转", color:"#7AE8A0",
    use:"底部反转 3 根组合",
    teach:"大阴 → 小实体 → 大阳, 跨越前阴中点",
    confirm:"第三根阳线收过第一根中线 = 强反转",
    svg:`<svg viewBox="0 0 130 80"><line x1="20" y1="10" x2="20" y2="60" stroke="#FF6B6B" stroke-width="2"/><rect x="14" y="15" width="12" height="40" fill="#FF6B6B"/><line x1="65" y1="55" x2="65" y2="68" stroke="#A89B82" stroke-width="2"/><rect x="59" y="60" width="12" height="6" fill="#A89B82"/><line x1="110" y1="20" x2="110" y2="60" stroke="#7AE8A0" stroke-width="2"/><rect x="104" y="25" width="12" height="30" fill="#7AE8A0"/></svg>` },
  { name:"黄昏星", group:"反转", color:"#FF6B6B",
    use:"顶部反转 3 根组合",
    teach:"大阳 → 小实体 → 大阴, 跨越前阳中点",
    confirm:"第三根阴跌破第一根中线 = 见顶",
    svg:`<svg viewBox="0 0 130 80"><line x1="20" y1="20" x2="20" y2="65" stroke="#7AE8A0" stroke-width="2"/><rect x="14" y="25" width="12" height="35" fill="#7AE8A0"/><line x1="65" y1="14" x2="65" y2="22" stroke="#A89B82" stroke-width="2"/><rect x="59" y="14" width="12" height="6" fill="#A89B82"/><line x1="110" y1="20" x2="110" y2="65" stroke="#FF6B6B" stroke-width="2"/><rect x="104" y="30" width="12" height="30" fill="#FF6B6B"/></svg>` },
  { name:"十字星", group:"中性", color:"#FFD86B",
    use:"多空平衡 / 犹豫信号",
    teach:"开 = 收, 实体几乎无, 上下影",
    confirm:"趋势末端 = 转折; 震荡中无意义",
    svg:`<svg viewBox="0 0 100 80"><line x1="50" y1="10" x2="50" y2="70" stroke="#FFD86B" stroke-width="2"/><line x1="36" y1="40" x2="64" y2="40" stroke="#FFD86B" stroke-width="3"/></svg>` },
  { name:"红三兵", group:"持续", color:"#7AE8A0",
    use:"强势上涨持续信号",
    teach:"3 根阳线连续, 收盘新高",
    confirm:"整理后突破 + 红三兵 = 主升浪",
    svg:`<svg viewBox="0 0 130 80"><line x1="20" y1="50" x2="20" y2="68" stroke="#7AE8A0" stroke-width="2"/><rect x="14" y="55" width="12" height="11" fill="#7AE8A0"/><line x1="65" y1="35" x2="65" y2="60" stroke="#7AE8A0" stroke-width="2"/><rect x="59" y="40" width="12" height="18" fill="#7AE8A0"/><line x1="110" y1="20" x2="110" y2="50" stroke="#7AE8A0" stroke-width="2"/><rect x="104" y="25" width="12" height="22" fill="#7AE8A0"/></svg>` },
  { name:"三只乌鸦", group:"持续", color:"#FF6B6B",
    use:"强势下跌持续信号",
    teach:"3 根阴线连续, 收盘新低",
    confirm:"高位 + 放量 + 跌破均线 = 趋势确立",
    svg:`<svg viewBox="0 0 130 80"><line x1="20" y1="10" x2="20" y2="35" stroke="#FF6B6B" stroke-width="2"/><rect x="14" y="15" width="12" height="18" fill="#FF6B6B"/><line x1="65" y1="20" x2="65" y2="48" stroke="#FF6B6B" stroke-width="2"/><rect x="59" y="25" width="12" height="20" fill="#FF6B6B"/><line x1="110" y1="35" x2="110" y2="65" stroke="#FF6B6B" stroke-width="2"/><rect x="104" y="40" width="12" height="22" fill="#FF6B6B"/></svg>` },
  { name:"头肩顶", group:"反转", color:"#FF6B6B",
    use:"中长期顶部反转 (周线最准)",
    teach:"左肩 → 头 (新高) → 右肩 (低于头). 跌破颈线 = 反转",
    confirm:"颈线跌破 + 量放大",
    svg:`<svg viewBox="0 0 200 80"><path d="M10 60 L40 40 L60 50 L90 20 L120 50 L150 35 L180 60" fill="none" stroke="#FF6B6B" stroke-width="2"/><line x1="40" y1="50" x2="150" y2="50" stroke="#FFD86B" stroke-width="1.5" stroke-dasharray="4 3"/></svg>` },
  { name:"头肩底", group:"反转", color:"#7AE8A0",
    use:"中长期底部反转",
    teach:"左肩 → 头 (新低) → 右肩 (高于头). 突破颈线 = 反转",
    confirm:"突破 + 放量, 回踩颈线不破",
    svg:`<svg viewBox="0 0 200 80"><path d="M10 20 L40 40 L60 30 L90 60 L120 30 L150 45 L180 20" fill="none" stroke="#7AE8A0" stroke-width="2"/><line x1="40" y1="30" x2="150" y2="30" stroke="#FFD86B" stroke-width="1.5" stroke-dasharray="4 3"/></svg>` },
  { name:"跳空缺口", group:"持续", color:"#FFD86B",
    use:"突破/中继/衰竭三种含义",
    teach:"突破 = 主升初; 中继 = 主升中; 衰竭 = 末端",
    confirm:"突破缺口 + 量放大不回补 = 强趋势",
    svg:`<svg viewBox="0 0 100 80"><line x1="30" y1="40" x2="30" y2="70" stroke="#7AE8A0" stroke-width="2"/><rect x="24" y="45" width="12" height="22" fill="#7AE8A0"/><line x1="70" y1="10" x2="70" y2="35" stroke="#7AE8A0" stroke-width="2"/><rect x="64" y="14" width="12" height="18" fill="#7AE8A0"/><line x1="42" y1="38" x2="60" y2="38" stroke="#FFD86B" stroke-width="1.5" stroke-dasharray="3 2"/></svg>` },
  { name:"双顶 (M 形)", group:"反转", color:"#FF6B6B",
    use:"中长期顶部反转, 比头肩顶更常见",
    teach:"两次高点接近 + 中间回踩颈线 = M 形. 第二顶量缩 = 信号确认",
    confirm:"跌破颈线 + 量放大 = 反转; 目标位 = 颈线 - (顶-颈线)",
    svg:`<svg viewBox="0 0 200 80"><path d="M10 60 L60 15 L100 45 L140 18 L190 60" fill="none" stroke="#FF6B6B" stroke-width="2"/><line x1="60" y1="45" x2="140" y2="45" stroke="#FFD86B" stroke-width="1.5" stroke-dasharray="4 3"/></svg>` },
  { name:"双底 (W 形)", group:"反转", color:"#7AE8A0",
    use:"中长期底部反转",
    teach:"两次低点接近 + 中间反弹颈线 = W 形. 第二底量缩 = 抛压枯竭",
    confirm:"突破颈线 + 量放大 = 反转; 目标位 = 颈线 + (颈线-底)",
    svg:`<svg viewBox="0 0 200 80"><path d="M10 20 L60 65 L100 35 L140 65 L190 20" fill="none" stroke="#7AE8A0" stroke-width="2"/><line x1="60" y1="35" x2="140" y2="35" stroke="#FFD86B" stroke-width="1.5" stroke-dasharray="4 3"/></svg>` },
  { name:"杯柄形态", group:"持续", color:"#7AE8A0",
    use:"主升中继, William O'Neil 经典买入形态",
    teach:"圆弧底 (杯) + 小幅回调 (柄) + 突破杯口 = 强势上涨",
    confirm:"杯口突破 + 量放大 1.5x; 持仓 5-13 周",
    svg:`<svg viewBox="0 0 200 80"><path d="M10 25 Q70 70 130 25 L150 30 L170 40 L190 30" fill="none" stroke="#7AE8A0" stroke-width="2"/><line x1="10" y1="25" x2="190" y2="25" stroke="#FFD86B" stroke-width="1" stroke-dasharray="3 2"/></svg>` },
  { name:"上升三角形", group:"持续", color:"#7AE8A0",
    use:"上涨中继, 蓄势突破",
    teach:"水平阻力 + 上升低点 = 三角. 突破阻力 = 加速上涨",
    confirm:"突破上沿 + 放量 + 回踩不破 = 真突破",
    svg:`<svg viewBox="0 0 200 80"><line x1="20" y1="20" x2="180" y2="20" stroke="#FFD86B" stroke-width="1.5"/><line x1="20" y1="65" x2="180" y2="22" stroke="#FFD86B" stroke-width="1.5"/><path d="M20 60 L60 30 L80 50 L120 25 L150 45 L180 22" fill="none" stroke="#7AE8A0" stroke-width="2"/></svg>` },
  { name:"下降三角形", group:"持续", color:"#FF6B6B",
    use:"下跌中继, 弱势整理",
    teach:"水平支撑 + 下降高点 = 倒三角. 跌破支撑 = 加速下跌",
    confirm:"跌破下沿 + 放量 + 回抽不破 = 真破位",
    svg:`<svg viewBox="0 0 200 80"><line x1="20" y1="65" x2="180" y2="65" stroke="#FFD86B" stroke-width="1.5"/><line x1="20" y1="20" x2="180" y2="63" stroke="#FFD86B" stroke-width="1.5"/><path d="M20 25 L60 60 L80 35 L120 60 L150 45 L180 65" fill="none" stroke="#FF6B6B" stroke-width="2"/></svg>` },
  { name:"旗形整理", group:"持续", color:"#7AE8A0",
    use:"主升急涨后短期回调, 蓄势再升",
    teach:"急涨形成旗杆 + 小幅平行回调 = 旗形. 1-3 周完成, 突破再涨",
    confirm:"旗形突破 + 量放大; 目标位 = 突破点 + 旗杆长度",
    svg:`<svg viewBox="0 0 200 80"><line x1="20" y1="65" x2="60" y2="15" stroke="#7AE8A0" stroke-width="2.5"/><path d="M60 15 L80 25 L100 18 L120 28 L140 22" fill="none" stroke="#A89B82" stroke-width="2"/><line x1="140" y1="22" x2="180" y2="5" stroke="#7AE8A0" stroke-width="2.5"/></svg>` },
  { name:"V 形反转", group:"反转", color:"#7AE8A0",
    use:"急跌后急涨, 恐慌底反转",
    teach:"无平台过渡, 直接 V 形. 通常源于突发利好 / 错杀 / 恐慌结束",
    confirm:"反弹超过下跌起点 30%+ + 量持续 = 真反转",
    svg:`<svg viewBox="0 0 200 80"><path d="M10 15 L100 70 L190 15" fill="none" stroke="#7AE8A0" stroke-width="2.5"/></svg>` },
];

// ─── K 线 6 对比 (好走势 vs 坏走势) ─────────────────────
const CHART_PAIRS = [
  {
    good: { name: "低位放量突破", path: "M10 80 L40 75 L70 78 L100 70 L130 60 L160 50 L190 35 L220 25 L250 20 L280 15 L310 12 L340 10", color: "#7AE8A0" },
    bad: { name: "高位放量滞涨", path: "M10 60 L40 50 L70 35 L100 25 L130 22 L160 25 L190 28 L220 30 L250 32 L280 35 L310 40 L340 45", color: "#FF6B6B" },
    teach: "同样放量, 在低位 = 突破信号 / 在高位 = 分歧加大要警惕",
  },
  {
    good: { name: "缩量横盘等突破", path: "M10 50 L60 50 L110 48 L160 50 L210 49 L260 47 L290 38 L340 25", color: "#7AE8A0" },
    bad: { name: "缩量阴跌不见底", path: "M10 30 L50 35 L90 42 L130 50 L170 58 L210 65 L250 75 L290 82 L340 88", color: "#FF6B6B" },
    teach: "缩量横盘是蓄势, 缩量阴跌是无人接盘. 看后续放量方向",
  },
  {
    good: { name: "回踩 50 日不破", path: "M10 70 L40 50 L70 40 L100 35 L130 50 L160 55 L190 50 L220 40 L250 30 L280 22 L310 18 L340 15", color: "#7AE8A0" },
    bad: { name: "跌破 50 日 + 量加大", path: "M10 30 L40 35 L70 40 L100 50 L130 55 L160 60 L190 70 L220 80 L250 85 L280 90 L310 92 L340 95", color: "#FF6B6B" },
    teach: "趋势线被守住 = 强势; 跌破 + 量加大 = 趋势转折, 别接刀",
  },
  {
    good: { name: "财报后跳空 + 站住", path: "M10 60 L80 55 L150 50 L160 30 L220 28 L290 22 L340 18", color: "#7AE8A0" },
    bad: { name: "财报后跳空 + 回补", path: "M10 60 L80 55 L150 50 L160 30 L220 35 L290 50 L340 60", color: "#FF6B6B" },
    teach: "跳空不一定回补. 站住 = 真利好; 回补 = 利好出尽",
  },
  {
    good: { name: "下影线 + 量大反包", path: "M10 70 L40 75 L70 80 L100 88 L130 85 L160 70 L190 55 L220 40 L250 30 L280 22 L310 18 L340 15", color: "#7AE8A0" },
    bad: { name: "上影线 + 量大滞涨", path: "M10 70 L40 60 L70 50 L100 35 L130 22 L160 18 L190 35 L220 50 L250 60 L280 65 L310 70 L340 72", color: "#FF6B6B" },
    teach: "影线方向告诉你压力来自哪. 下影 + 量 = 多头入场; 上影 + 量 = 空头反扑",
  },
  {
    good: { name: "震荡区间上沿突破", path: "M10 50 L40 55 L70 45 L100 55 L130 50 L160 45 L190 40 L220 30 L250 22 L280 18 L310 15 L340 12", color: "#7AE8A0" },
    bad: { name: "震荡区间下沿跌破", path: "M10 50 L40 45 L70 55 L100 45 L130 55 L160 65 L190 70 L220 80 L250 85 L280 88 L310 92 L340 95", color: "#FF6B6B" },
    teach: "区间突破真假要看量 + 持续性. 1 天突破后回区间 = 假突破",
  },
];

// ─── 经典案例 (8 个真实公司教学案例) ─────────────────────
const CASES = [
  {
    tk: "AAPL", cn: "苹果", year: "1997-2025", glyph: "🍎", color: "#7aa88a",
    headline: "从濒临破产到 3 万亿市值",
    teach: "持续创新 + 生态护城河 + 服务业务转型",
    story: "1997 年苹果濒临破产, 乔布斯回归推 iMac/iPod/iPhone, 用产品 + 设计 + 生态 3 件事重塑公司。2010s 服务收入崛起, 估值从 PE 10 → 30+。\n\n投资者教训: 看公司能不能持续创造客户离不开的产品, 而不是当下盈利绝对值。",
    points: [
      ["商业模式", "硬件 + 软件 + 服务三足生态"],
      ["护城河",   "iOS 生态 + 品牌溢价 + 高粘性"],
      ["关键指标", "iPhone 市占 / 服务收入 / 毛利率"],
      ["估值变化", "PE 10 (2013) → PE 30 (2024) = 估值切换"],
    ],
    lesson: "好公司的'估值切换'比业绩增长更可怕也更甜",
  },
  {
    tk: "NVDA", cn: "英伟达", year: "2016-2025", glyph: "⚡", color: "#7AE8A0",
    headline: "AI 算力之王从 $0.5 到 $140",
    teach: "技术平台 + 时代 beta + 估值过山车",
    story: "2016 GPU 用于挖矿 → 大跌 70%。2017 转 AI 算力, 但市场没认 → 横盘 5 年。2022 ChatGPT 出 → 股价 5x。\n\n2020-25 涨 30 倍. 但中间有 2 次 -50% 回撤. 看对方向 ≠ 拿得住.",
    points: [
      ["商业模式", "GPU + CUDA + DGX 系统级 AI 算力"],
      ["护城河",   "CUDA 生态 + 软件 + 互联 (NVLink)"],
      ["关键指标", "数据中心收入 / 毛利率 / 客户集中度"],
      ["估值风险", "PE 60+ 透支未来, 任何减速都会重估"],
    ],
    lesson: "时代主线 + 平台生态 = 真护城河; 但回撤 50% 也是常态, 仓位决定能否拿到底",
  },
  {
    tk: "TSLA", cn: "特斯拉", year: "2019-2025", glyph: "⚡", color: "#FF6B6B",
    headline: "10 年 200 倍后 -73% 回撤",
    teach: "高估值故事股 + 信仰 vs 估值",
    story: "2019 → 2021 涨 25 倍, PE 1000+. 2022 -73% 回撤, 后又翻倍. 信仰投资者很多被'分级'抖下车.\n\n特斯拉是好公司, 但好公司不等于任何价格都能买.",
    points: [
      ["商业模式", "电车 + 储能 + FSD 自动驾驶 + Robotaxi"],
      ["护城河",   "电池产能 + 自研芯片 + 数据"],
      ["关键指标", "交付量 / 单车毛利 / FSD 进度"],
      ["估值陷阱", "把 10 年的预期定价进当前股价"],
    ],
    lesson: "成长股逼空时容易上车, 估值回归时容易割肉. 仓位 + 信仰 + 价格三件齐才能拿住",
  },
  {
    tk: "GOOGL", cn: "谷歌", year: "2008-2025", glyph: "🔍", color: "#5a8aa6",
    headline: "搜索 → 云 → AI 三段式",
    teach: "现金牛 + 第二曲线 + 反垄断",
    story: "2008 年金融危机后股价腰斩, 2010s 搜索广告稳定增长, YouTube + Cloud + Android 形成第二增长. 2024 Gemini AI 进场.\n\n反垄断诉讼是最大暗雷, 拆分风险长期存在.",
    points: [
      ["商业模式", "搜索广告 75% + YouTube + Cloud + AI"],
      ["护城河",   "Search 数据 + 用户量 + Android 分发"],
      ["关键指标", "搜索收入增速 / Cloud 利润率 / TAC"],
      ["黑天鹅",   "DOJ 反垄断要求拆 Chrome / Search 数据"],
    ],
    lesson: "现金牛要看会不会被时代替代, 不能只看当年利润; 监管是大型公司不可忽视的风险",
  },
  {
    tk: "PLTR", cn: "帕兰提尔", year: "2020-2025", glyph: "🛡", color: "#3a3a4a",
    headline: "从 IPO $10 到 $40 再到 $7 再到 $200",
    teach: "估值过山车 + 国防 AI 主线 + 散户故事",
    story: "2020 IPO $10. 散户狂热到 $40. 估值崩到 $6. 2024 国防 AI + AIP 平台爆发到 $200+. 5 年 20 倍, 中间 -85% 回撤.\n\n你是从 $40 拿到 $200, 还是 $7 抄底拿到 $200, 决定生死.",
    points: [
      ["商业模式", "Foundry/Gotham/AIP 数据 OS, 政企客户"],
      ["护城河",   "20 年部署经验 + 政府信任 + 黑箱算法"],
      ["关键指标", "美国商业收入增速 / RPO / 客户毛利"],
      ["最大风险", "PE 200+, 任何放缓都会被放大"],
    ],
    lesson: "估值过山车的票, 入场时间比公司质量更重要; 超高估值股要按期权仓位算",
  },
  {
    tk: "MU", cn: "美光", year: "2018-2025", glyph: "💾", color: "#6b8aa0",
    headline: "周期股的两次完整周期",
    teach: "存储周期 + HBM 转型 + 顶部止盈",
    story: "存储是典型周期股. 2017-18 涨 5 倍, 2019 跌 60%. 2020-21 复苏, 2022 又跌 50%. 2024 HBM 推动股价创新高.\n\n周期股的关键: 涨多就该撤, 跌多了再回来. 长期持有反而吃不到周期红利.",
    points: [
      ["商业模式", "DRAM + NAND + HBM (AI 内存)"],
      ["护城河",   "美国唯一规模化存储 + HBM 卡位"],
      ["关键指标", "存储 ASP / 毛利率 / 行业资本开支"],
      ["周期信号", "PE 反向: 周期高点 PE 低, 周期低点 PE 极高"],
    ],
    lesson: "周期股 PE 是反指标. 利润最高那年是危险, 利润最差那年才是机会",
  },
  {
    tk: "BABA", cn: "阿里巴巴", year: "2014-2025", glyph: "🛒", color: "#FFA500",
    headline: "ATH $310 跌到 $58 再回到 $130",
    teach: "中概股 + 监管 + 估值陷阱",
    story: "2020 ATH $310. 蚂蚁 IPO 暂停 + 反垄断罚 + 中美关系恶化, 2022 跌到 $58 = -81%.\n\n2024 回购 + 国家队介入 + 业务剥离, 反弹到 $130.\n\n再便宜的票如果监管/政策不允许它继续, 估值不能挽救你.",
    points: [
      ["商业模式", "电商 + 云 + 蚂蚁 + 物流"],
      ["护城河",   "淘系流量 + 阿里云 + 支付场景"],
      ["关键指标", "GMV / 阿里云 OPM / 蚂蚁估值"],
      ["最大风险", "中概监管 / VIE 结构 / 中美关系"],
    ],
    lesson: "便宜的资产如果有政策风险, '便宜'就不再是 margin of safety; 中概股需特殊定价",
  },
  {
    tk: "AMZN", cn: "亚马逊", year: "1997-2025", glyph: "📦", color: "#FF9F00",
    headline: "20 年 0 利润换来 1.5 万亿市值",
    teach: "长期主义 + 现金流再投资 + 多曲线",
    story: "1997 IPO. 之后 20 年几乎没利润 (利润全再投回业务). 但收入持续增长, 自由现金流持续正.\n\n2010 后 AWS 起飞 → 利润和现金流暴增. 现在 AWS + 广告 + 物流 + Prime 多曲线.",
    points: [
      ["商业模式", "电商 + AWS (40% 营业利润) + 广告 + Prime"],
      ["护城河",   "物流网 + AWS 基础设施 + 用户粘性"],
      ["关键指标", "AWS 营业利润率 / 广告 % / 自由现金流"],
      ["关键洞察", "净利润不重要, 重要的是收入增速 + FCF"],
    ],
    lesson: "高质量公司在长期再投资阶段不该用 PE 衡量; 应该看自由现金流 + 用户增长",
  },
  // ───── 失败案例 (反面教材) ─────
  {
    tk: "ENRON", cn: "安然 (退市)", year: "2000-2001", glyph: "💥", color: "#FF6B6B",
    headline: "$90 → $0 财务造假百年丑闻",
    teach: "报表造假 + 会计舞弊 + 自我欺骗",
    story: "2000 安然股价 $90, '能源市场之王'. 但用 SPV (特殊目的实体) 隐藏债务 + 利润造假.\n\n2001 11 月 SEC 调查爆出 → 1 个月跌到 $0.26. 创立 Andersen 会计师事务所同时垮掉.\n\n关键预警: 利润涨, OCF 长期为负 + 复杂关联交易 + 无人能解释商业模式.",
    points: [
      ["造假手段", "SPV 移走债务 + 提前确认未来 5 年收入"],
      ["预警信号", "利润 + OCF 严重背离 + CFO 套现"],
      ["教训",      "看不懂的财报就是不能投"],
      ["回避方法", "OCF / 净利润 < 50% 直接 PASS"],
    ],
    lesson: "巴菲特的话: 'Never invest in a business you cannot understand.' 看不懂就别碰",
  },
  {
    tk: "LEH", cn: "雷曼兄弟 (破产)", year: "2007-2008", glyph: "🌊", color: "#FF6B6B",
    headline: "$80 → $0 158 年百年投行倒",
    teach: "高杠杆 + 流动性危机 + 信用崩盘",
    story: "雷曼兄弟从次贷开始疯狂加杠杆 (杠杆 30:1). 2007 H2 房贷违约率上升, 2008.9.15 破产保护.\n\n股价从 $86 → $0. 全球金融危机引爆.\n\n关键预警: 杠杆超 20:1 + 流动性恶化 + 关联敞口大 = 死亡螺旋.",
    points: [
      ["崩盘原因", "杠杆 30:1 + 次贷敞口 $600B"],
      ["预警信号", "ICR < 2 + 短债占比 60%+ + CDS 价飙涨"],
      ["教训",      "金融股看资产负债表比利润更重要"],
      ["回避方法", "金融股看 Tier 1 + 短期负债 + 流动性比率"],
    ],
    lesson: "雷曼前 1 年仍有人买入'打折金融股'. 金融股的'便宜' 经常是流动性陷阱",
  },
  {
    tk: "WE", cn: "WeWork (3 次崩盘)", year: "2019-2024", glyph: "🏢", color: "#FF6B6B",
    headline: "$47B 估值 → IPO 失败 → 破产",
    teach: "故事股 + 估值无锚 + 创始人滥权",
    story: "2019 软银投到 $47B. 但商业模式: 长期租, 短期出租. 没护城河 + 现金流持续负.\n\n9 月 IPO 失败 + Adam Neumann 套现丑闻 + 估值砍到 $8B. 2021 SPAC 上市 $9B → 2023 破产.\n\n关键: 你能不能 1 句话解释为什么客户不能直接租? 解释不了就别投.",
    points: [
      ["商业模式", "二房东模式 (长租短转), 无定价权"],
      ["预警信号", "$47B 估值 / $1B 营收 = PS 47, 离谱"],
      ["教训",      "私募估值 ≠ 真值, IPO 后市场会重估"],
      ["回避方法", "看商业模式是否有规模效应; 没有 = PASS"],
    ],
    lesson: "软银投 = 信任标志? 错. 错的人持续给钱也会输. 商业模式没有规模经济就是没有",
  },
  {
    tk: "ARKK", cn: "ARK 旗舰 ETF", year: "2020-2024", glyph: "📉", color: "#FF6B6B",
    headline: "ATH $159 跌到 $30 (-81%)",
    teach: "时代主线错配 + 估值过热 + 集中度",
    story: "Cathie Wood 2020 押 '颠覆性创新' (Tesla/Roku/Zoom). ARKK 涨 150% 到 $159 ATH.\n\n2021-23 高估值股遇到加息, ARKK 持仓多数是亏损增长股 → 重估到 $30 (-81%).\n\n关键: 时代主线对了, 但估值不对 + 集中度太高 + 流动性管理失败.",
    points: [
      ["错误 1", "持仓全是 PS 50+ 高估值股"],
      ["错误 2", "前 10 大持仓占 60%+ (太集中)"],
      ["错误 3", "波动大时持续买入 (不止损)"],
      ["对照",    "Berkshire 同期 +50%, 价值股反弹"],
    ],
    lesson: "买故事股的最大风险不是公司不好, 是估值过热 + 加息周期错配; ETF 也会被打出原形",
  },
  // ───── 经典扩充 +6 ─────
  {
    tk: "META", cn: "Meta (FB)", year: "2003-2025", glyph: "📘", color: "#3a8aa6",
    headline: "$23 IPO → ATH $382 → $88 → 复活到 $700",
    teach: "广告业务韧性 + 第二曲线失败 + AI 重启",
    story: "2012 IPO $38, 第一天破发. 2013-2021 广告业务 + IG 收购 + 移动端转型, 涨 10 倍.\n\n2021-22 押注元宇宙 ($30B 烧钱) + 广告增长放缓 + 隐私监管, 跌 76% 到 $88.\n\n2023 Llama AI + Reality Labs 缩支 + 广告复苏, 反弹 8 倍到 $700.",
    points: [
      ["业务", "广告 (98%) + Reality Labs + Llama AI"],
      ["护城河", "FB+IG+WA 全球 30 亿用户网络效应"],
      ["关键指标", "DAU / ARPU / 广告 CPM / RL 烧钱率"],
      ["教训", "好公司也会因第二曲线失败被痛打"],
    ],
    lesson: "便宜不便宜要看护城河 + 主业, 不要被第二曲线烧钱吓到 (扎克最便宜时期反而是最好买点)",
  },
  {
    tk: "NFLX", cn: "网飞", year: "2002-2025", glyph: "🎬", color: "#FF6B6B",
    headline: "$1 → $700 → $162 → $1100 (流媒体战争)",
    teach: "护城河切换 + 价格战 + 用户增长拐点",
    story: "2002 DVD 邮寄 IPO. 2007 转流媒体, 2013 Netflix Originals (House of Cards), 2017-21 涨到 $700.\n\n2022 Q1 用户首次净流失 (-20 万) + 密码共享危机, 跌到 $162 (-77%).\n\n2023 推广告订阅 + 严打共享 + 多年内容投资变现, 反弹到 $1100. 现在是流媒体唯一稳定盈利者.",
    points: [
      ["业务", "全球 2.7 亿订户, 12 国本地内容"],
      ["护城河", "20 年 $200B+ 内容版权 + 算法 + 全球网络"],
      ["关键指标", "净订户增 / ARPU / 内容投资回报"],
      ["反转点", "广告订阅 + 反共享是关键"],
    ],
    lesson: "用户负增长 = 反向买入信号 (公司大改革); 但是要看公司是否有改革动力",
  },
  {
    tk: "BRK.B", cn: "伯克希尔", year: "1965-2025", glyph: "🦬", color: "#5a8aa6",
    headline: "$15 → $470, 60 年 31000 倍 (年化 ~20%)",
    teach: "复利 + 价值投资 + 永续持有",
    story: "1965 巴菲特接手 $19 / 股纺织厂. 60 年后, 一股 BRK.A 价 $700K+, BRK.B $470. 长期年化 ~20%.\n\n投资逻辑: 简单生意 (Coke/AmEx/Apple) + 永续持有 + 现金充裕等危机抄底 + 不分红 (税效).\n\n关键: 巴菲特 60 年没大幅回撤, 1999 互联网泡沫前减仓, 2008 抄底高盛/BAC.",
    points: [
      ["业务", "保险浮存金 + 工业 + 公开市场组合"],
      ["护城河", "巴菲特/芒格的资本配置 + 永续期"],
      ["关键指标", "Book Value / Float / Look-through Earnings"],
      ["复利启示", "20% × 60 年 = 31000x; 慢就是快"],
    ],
    lesson: "复利的力量比单笔暴利重要 100 倍; 长期慢慢来比一次大赌赢更确定",
  },
  {
    tk: "COST", cn: "Costco 好市多", year: "1985-2025", glyph: "🛒", color: "#7AE8A0",
    headline: "$10 IPO → $1000 ATH (40 年 100 倍)",
    teach: "会员制 + 慢生意 + 客户粘性",
    story: "1985 IPO. 40 年从仓库零售到 $1000+ 股价, 年化 ~13%.\n\n模式: 收会员费 (利润 70% 来自会员) + 卖商品几乎不赚钱 (毛利 11% vs 沃尔玛 24%) + 客户用爱用 (90%+ 续费率).\n\n关键: 它把'让利'作为主战略, 客户因低价而忠诚.",
    points: [
      ["业务", "1300 家仓储 + 1.3 亿会员卡 + 自有品牌"],
      ["护城河", "规模采购 + 90% 续费 + 不可复制效率"],
      ["关键指标", "续费率 / 会员费收入 / 同店销售"],
      ["哲学", "Make it cheaper for everyone, win on volume"],
    ],
    lesson: "好生意往往看起来很无聊. 看透商业本质比追热门股更划算",
  },
  {
    tk: "COIN", cn: "Coinbase", year: "2021-2025", glyph: "💎", color: "#9a8aa0",
    headline: "$381 IPO → $32 → $300 (跟币市同周期)",
    teach: "周期股 + 高 Beta + 监管风险",
    story: "2021 直接 IPO $381. 一年后 BTC 跌 75% + SEC 起诉, 跌到 $32.\n\n2024 BTC ETF 通过 + Trump 当选 + 加密政策松绑, 反弹到 $300.\n\n核心: COIN 是 BTC 的 2-3x 杠杆代理. BTC 涨 100%, COIN 涨 200-300%; BTC 跌 50%, COIN 跌 75%.",
    points: [
      ["业务", "加密货币交易 + 托管 + 质押 + 衍生品"],
      ["护城河", "美国合规龙头 + 机构客户基础"],
      ["关键指标", "交易量 / 平均费率 / 托管资产"],
      ["周期", "BTC 周期 = COIN 周期, 同涨同跌放大"],
    ],
    lesson: "高 Beta 周期股: 找到周期低点比公司质量更重要; 仓位务必小",
  },
  {
    tk: "SHOP", cn: "Shopify", year: "2015-2025", glyph: "🛍", color: "#7AE8A0",
    headline: "$17 IPO → $1750 → $260 → $130 (SaaS 估值过山车)",
    teach: "SaaS 估值切换 + 加息冲击 + 业务剥离",
    story: "2015 IPO. 2020 疫情电商爆发 + SaaS 估值狂热, 涨 100x 到 $1750. PS 60+.\n\n2022 加息 + 电商减速 + 自营物流亏损, 跌 85% 到 $260.\n\n2023 卖掉物流业务 + 聚焦 SaaS 平台, 估值修复但没回 ATH.",
    points: [
      ["业务", "电商 SaaS 平台 + 支付 (Shopify Payments) + 物流"],
      ["护城河", "中小商家电商首选 + 200 万商户网络"],
      ["关键指标", "GMV / Take Rate / NRR / 用户留存"],
      ["教训", "PS 60+ 的 SaaS 是估值泡沫顶, 加息时刻"],
    ],
    lesson: "SaaS 估值有 cycle: PS 30+ 警惕 / PS 5- 机会; PE 比 PS 更可靠衡量真值",
  },
  {
    tk: "ENRON", cn: "安然 (败局)", year: "2000-2001", glyph: "💀", color: "#FF6B6B",
    headline: "$90 → $0.26, 史上最大造假案",
    teach: "财务造假识别 + 关联交易 + 表外负债",
    story: "1990s 美国能源巨头, PE 70+ 被吹成新经济典范。\n\n关键问题: 用 SPE (特殊目的实体) 隐藏负债, MTM (按市值计价) 造未实现利润。\n\n2001-10 揭露, 6 周破产, 投资者血本无归, Arthur Andersen 会计师事务所连带倒闭。",
    points: [
      ["造假手法", "SPE 表外负债 + MTM 未实现收益当利润"],
      ["预警信号", "CEO 套现 + 现金流 / 利润背离 + 关联交易"],
      ["监管影响", "催生 Sarbanes-Oxley 法案"],
      ["教训", "看不懂的财报 = 危险信号"],
    ],
    lesson: "财报看不懂别买. 现金流 < 净利润 + 关联交易多 + CEO 套现 = 三大红灯",
  },
  {
    tk: "LK", cn: "瑞幸咖啡 (败局)", year: "2019-2020", glyph: "☕", color: "#FF6B6B",
    headline: "IPO 1 年后造假曝光, -90% 退市",
    teach: "中概股造假 + 浑水做空案例",
    story: "2019-05 美股 IPO $17, 半年涨到 $50. 商业模式: 烧钱补贴 + 数字化运营。\n\n2020-02 浑水 89 页报告: 单店收入造假 69%, 凭空伪造 22 亿交易额。\n\n2020-04 自爆, 单日 -75%, 退市. 后港股重组复活 (2024 年化收入 300 亿)。",
    points: [
      ["造假手法", "POS 系统造假 + 虚增交易笔数 + 储值卡虚高"],
      ["预警信号", "增速远超行业 + 单店模型 ROI 不可能成立"],
      ["浑水方法", "实地数客流 + POS 截图 + 内部线人"],
      ["教训", "中概股要看现金流 + 行业可比 ROI"],
    ],
    lesson: "增速 > 100% + 单店模型不合理 = 造假高危. 浑水做空报告必读",
  },
  {
    tk: "WDI", cn: "Wirecard (败局)", year: "2018-2020", glyph: "💳", color: "#FF6B6B",
    headline: "欧洲版安然, 19 亿欧元凭空消失",
    teach: "欧洲监管失灵 + 审计造假 + 做空者反胜",
    story: "德国 DAX 30 成分股, 支付公司, 估值 240 亿欧元。\n\n2019 起 FT 调查质疑亚洲业务造假。2020-06 审计师 EY 发现菲律宾银行账户中 19 亿欧元'根本不存在'。\n\n股价从 €100 → €1.28 (-99%), CEO 被捕, COO 在逃, 公司破产。",
    points: [
      ["造假手法", "亚洲第三方支付商虚增 + 假银行对账单"],
      ["监管失灵", "德国 BaFin 反过来调查 FT 记者"],
      ["做空者", "Fraser Perring + MJ Capital 多年前预警"],
      ["教训", "欧洲监管不可靠, FT 调查值得追"],
    ],
    lesson: "重大调查报道 + 多年质疑 = 严肃信号. 即使监管站政府那边",
  },
  {
    tk: "EVERGRANDE", cn: "恒大 (败局)", year: "2017-2021", glyph: "🏚", color: "#FF6B6B",
    headline: "$45 → $0.13, 中国地产顶峰崩塌",
    teach: "地产周期 + 高杠杆 + 政策风险",
    story: "2017 港股 ATH $32, 营收 2018 已经 4660 亿. 高负债扩张 + 多元化 (足球/汽车/水)。\n\n2020 'three red lines' 政策, 限制地产负债. 2021 起债务违约连环爆 (2 万亿人民币负债)。\n\n2022 港股停牌. 2024-01 香港法院下令清盘. 投资者 / 业主 / 供应商全输。",
    points: [
      ["扩张模式", "高杠杆 + 短债长投 + 多元化烧钱"],
      ["政策触发", "三道红线限制 + 房住不炒"],
      ["连锁影响", "整个中国地产板块崩塌 (碧桂园/融创/万科)"],
      ["教训", "地产 = 政策 + 周期 + 杠杆 三重风险"],
    ],
    lesson: "地产股不是消费股, 是杠杆 + 政策 + 周期的三体游戏",
  },
  {
    tk: "SVB", cn: "硅谷银行 (败局)", year: "2023", glyph: "🏦", color: "#FF6B6B",
    headline: "48 小时挤兑破产, 美国第二大银行倒闭",
    teach: "利率风险 + 久期错配 + 数字时代挤兑",
    story: "2023-03-08 公告 18 亿美元持仓亏损 + 22.5 亿融资计划。\n\n2023-03-09 VC 圈群聊建议提款, 单日提款 420 亿美元。\n\n2023-03-10 加州监管接管, 倒闭. 客户存款 90% 超 FDIC 25 万保额。\n\n根因: 长债持仓在加息周期亏损 + 客户高度同质 (科技 VC) + 社交媒体放大恐慌。",
    points: [
      ["利率风险", "买长久期债 + 加息时浮亏 1750 亿"],
      ["客户结构", "97% 客户超 FDIC 保额"],
      ["挤兑速度", "Twitter + Slack 时代, 48h 完成"],
      ["教训", "看银行要看 HTM 持仓久期 + 客户集中度"],
    ],
    lesson: "银行不只看 NIM, 要看资产负债期限匹配 + 客户结构. 数字时代挤兑 = 闪电战",
  },
  {
    tk: "005930.KS", cn: "三星电子 (HBM 逆袭)", year: "2022-2025", glyph: "📱", color: "#7AE8A0",
    headline: "DRAM 周期回归 + HBM3E AI 红利",
    teach: "周期股逆周期布局 + 技术 + 国别 beta",
    story: "2022 DRAM 周期底, 三星 PE 跌到 8 倍。2023 ChatGPT 引爆 HBM 需求。\n\n三星 + SK海力士占全球 HBM 90% 份额, 给 NVDA 供货。2024 三星电子价格从 50000 韩元 → 100000+。\n\n但 SK海力士反超三星, HBM3E 良率三星落后. 2025 三星量产追赶, 但已经丢市占。",
    points: [
      ["周期底信号", "PB < 1 + 库存清空 + 厂商减产宣布"],
      ["AI 红利", "HBM3E 单 GPU 6-8 颗, 单价 5x DDR5"],
      ["技术风险", "良率不及预期 = 错过周期"],
      ["教训", "周期低点 + 技术拐点 = 双击机会"],
    ],
    lesson: "周期股在 PB < 1 + 库存出清时找, AI 是顺风车. 但要追技术领头羊 (SK 优于三星)",
  },
  {
    tk: "TSM", cn: "台积电 (TSM)", year: "2018-2025", glyph: "🔬", color: "#FFD86B",
    headline: "$30 → $200, 全球晶圆代工霸主",
    teach: "技术垄断 + 地缘风险 + 资本支出周期",
    story: "5nm/3nm/2nm 制程领先 Samsung/Intel 2 年。客户: Apple/NVDA/AMD/Qualcomm/MediaTek.\n\n2024 AI 算力爆发, CoWoS 封装产能瓶颈, 2nm 2025 量产。\n\n地缘风险: 台海局势 + 美国压力建美国厂 (Arizona 进度慢)。",
    points: [
      ["技术护城河", "5nm 良率 70%+, Intel 同期 < 30%"],
      ["客户结构", "Apple 25% + NVDA 15% + AMD 10% = 50%"],
      ["地缘风险", "台海 / 美中贸易 / 出口管制"],
      ["教训", "技术垄断是真护城河, 但地缘是黑天鹅"],
    ],
    lesson: "看科技股要看技术领先代差 + 客户依赖度. 地缘是非线性风险",
  },
  {
    tk: "1211.HK", cn: "比亚迪 (BYD)", year: "2020-2024", glyph: "🔋", color: "#7AE8A0",
    headline: "巴菲特 26 倍持仓, 全球电动车销量第一",
    teach: "中国新能源车崛起 + 垂直整合 + 巴菲特退出节奏",
    story: "2008 巴菲特 $1.04/股投资 $230M. 2020-2022 涨到 $40, 收益 40x。\n\n2022-08 起巴菲特陆续减持, 2025 全部清仓。\n\n2024 BYD 销量 426 万辆超 Tesla. 但港股从 $300 → $200 (-33%) 因价格战 + 利润压缩。",
    points: [
      ["垂直整合", "自产电池 + 电机 + 半导体 + 整车"],
      ["国别 beta", "中国新能源补贴 + 出口扩张"],
      ["巴菲特退场", "好公司 + 估值高 = 该卖"],
      ["教训", "看销量同时看毛利率 + 自由现金流"],
    ],
    lesson: "好公司 + 高估值 = 阶段性该减. 巴菲特退场是技术信号, 不是公司变坏",
  },
  {
    tk: "PDD", cn: "拼多多 / Temu", year: "2020-2024", glyph: "🛒", color: "#FF8C42",
    headline: "$30 → $200 → $90, Temu 全球扩张 + 监管反弹",
    teach: "流量战 + 国际化 + 监管周期",
    story: "国内拼多多电商 → 2022 推出海外 Temu, 1 年 GMV $50B。\n\n烧钱补贴 + 低价心智, 2024 美国市场份额超 Amazon 部分品类。\n\n股价 2023-Q4 $200 ATH → 2024 美国 de minimis 关税威胁 + 欧盟监管 → 跌到 $90。",
    points: [
      ["商业模式", "白牌 + 直发 + 算法分发"],
      ["增长引擎", "Temu 海外烧钱抢市占"],
      ["监管风险", "美国关税 + 欧盟 GDPR + 中国双反"],
      ["教训", "国际化平台 = 多国监管乘积风险"],
    ],
    lesson: "国际化是双刃剑: 市场放大 + 监管放大. 监管来时跌得最狠",
  },
  {
    tk: "JD", cn: "京东 (转型挣扎)", year: "2020-2024", glyph: "📦", color: "#FF8C42",
    headline: "$108 → $20, 自营电商被拼多多 + 抖音夹击",
    teach: "电商模式之争 + 转型困境 + 估值修复",
    story: "2020 ATH $108, 京东自营 + 物流模式被市场追捧。\n\n2022 起拼多多 (低价) + 抖音 (内容) 两面夹击, GMV 增速降到个位数。\n\n2024 战略反击: 高频低价 + 直播带货 + 京喜下沉. 股价 $20 反弹到 $40 (PE 8 历史底)。",
    points: [
      ["核心壁垒", "自营仓储 + 物流 + 售后"],
      ["竞争压力", "拼多多 (低价) + 抖音 (内容) + 美团 (本地)"],
      ["估值底", "PE 8 + PB 1.4 = 历史底部"],
      ["教训", "强护城河公司估值底时机大"],
    ],
    lesson: "好公司被打压到 PE 历史底 = 反弹概率 > 70%. 看 ROIC 而非短期增速",
  },
  {
    tk: "BABA", cn: "阿里巴巴 (反垄断)", year: "2020-2024", glyph: "🐱", color: "#FF6B6B",
    headline: "$320 → $66, 蚂蚁上市暂停 + 监管 + AI 错过",
    teach: "政策风险 + 创始人风险 + 转型滞后",
    story: "2020-10 马云演讲触发监管. 蚂蚁上市暂停, 阿里反垄断 182 亿罚款。\n\n2020-22 -85% 暴跌. 业务被拆分 (云/物流/国际/盒马/淘天), 战略混乱。\n\n2024 蔡崇信 + 吴泳铭重新聚焦, 回购 + AI 投入. 股价 $66 → $130 反弹。",
    points: [
      ["政策风险", "反垄断 + 数据安全 + 教培级打击"],
      ["创始人风险", "马云演讲后退场, CEO 三连换"],
      ["资产价值", "云计算 + 海外 + 蚂蚁 = sum of parts 高于市值"],
      ["教训", "政策风险是非线性, 要给 discount"],
    ],
    lesson: "中概股政策风险定价 30-50% discount 常态. SOTP > PE 看资产",
  },
];

const titleEl = document.querySelector("#lessonTitle");
const bodyEl = document.querySelector("#lessonBody");
const visualEl = document.querySelector("#lessonVisual");
const goalsEl = document.querySelector("#lessonGoals");
const mistakeEl = document.querySelector("#lessonMistake");
const practiceEl = document.querySelector("#lessonPractice");
const stepEl = document.querySelector("#lessonStep");
const courseCards = document.querySelectorAll("[data-lesson]");
const pageLinks = document.querySelectorAll("[data-page-link]");
const pageSections = document.querySelectorAll("[data-page]");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const quizStepEl = document.querySelector("#quizStep");
const quizScoreEl = document.querySelector("#quizScore");
const lessonPrev = document.querySelector("#lessonPrev");
const lessonNext = document.querySelector("#lessonNext");
const lessonComplete = document.querySelector("#lessonComplete");
const progressCircle = document.querySelector("#progressCircle");
const progressText = document.querySelector("#progressText");
const progressLabel = document.querySelector("#progressLabel");
const progressDesc = document.querySelector("#progressDesc");
const resetBtn = document.querySelector("#resetProgress");

let quizIndex = 0;
let score = 0;
let currentPage = "overview";
let currentLesson = 0;
let activeQuizSection = "ALL";
let activeQuizList = [];

// ─── 进度持久化 ───
const PROGRESS_KEY = "stocklearn.progress.v1";
const completed = new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]"));
function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]));
}
function updateProgressUI() {
  const total = lessonData.length;
  const done = completed.size;
  const pct = done / total;
  if (progressCircle) progressCircle.setAttribute("stroke-dashoffset", String(314 * (1 - pct)));
  if (progressText) progressText.textContent = String(done);
  if (progressLabel) progressLabel.textContent = done === 0 ? "还没开始" : done === total ? "🎉 全部完成" : `进行中 ${Math.round(pct * 100)}%`;
  if (progressDesc) progressDesc.textContent = done === total
    ? "17 课全完成。建议进入小测复习, 然后看经典案例。"
    : `已学 ${done} 课, 剩 ${total - done} 课。`;
  if (resetBtn) resetBtn.hidden = done === 0;
  // 课程卡 ✓ 标记
  courseCards.forEach((card) => {
    const idx = Number(card.dataset.lesson);
    card.classList.toggle("completed", completed.has(idx));
  });
  // 完成按钮状态
  if (lessonComplete) {
    const isDone = completed.has(currentLesson);
    lessonComplete.textContent = isDone ? "✓ 已完成 (再点取消)" : "✓ 标记完成";
    lessonComplete.classList.toggle("done", isDone);
  }
}

const visualTemplates = [
  ownershipVisual,
  matchingVisual,
  orderVisual,
  indexVisual,
  profitVisual,
  warningVisual,
  candleVisual,
  volumeVisual,
  trendVisual,
  orderBookVisual,
  emotionVisual,
  businessVisual,
  statementsVisual,
  metricsVisual,
  valuationVisual,
  positionVisual,
  reviewVisual
];

function showPage(page) {
  currentPage = page;
  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === page);
  });
  pageSections.forEach((section) => {
    const pages = section.dataset.page.split(" ");
    section.hidden = !pages.includes(page);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setLesson(index) {
  const lesson = lessonData[index];
  if (!lesson) return;
  currentLesson = index;
  titleEl.textContent = lesson.title;
  bodyEl.textContent = lesson.body;
  visualEl.innerHTML = visualTemplates[index] ? visualTemplates[index]() : "";
  goalsEl.innerHTML = lesson.goals.map((goal) => `<li>${goal}</li>`).join("");
  mistakeEl.textContent = lesson.mistake;
  practiceEl.textContent = lesson.practice;
  if (stepEl) stepEl.textContent = `第 ${index + 1} 课 / ${lessonData.length}`;
  if (lessonPrev) lessonPrev.disabled = index === 0;
  if (lessonNext) lessonNext.disabled = index === lessonData.length - 1;
  courseCards.forEach((card) => {
    card.classList.toggle("selected", Number(card.dataset.lesson) === index);
  });
  updateProgressUI();
}

function svgWrap(title, body) {
  return `
    <figcaption>${title}</figcaption>
    <svg viewBox="0 0 720 280" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldFill" x1="0" x2="1">
          <stop offset="0" stop-color="#d4b670" stop-opacity=".92"/>
          <stop offset="1" stop-color="#e8c97a" stop-opacity=".62"/>
        </linearGradient>
        <linearGradient id="sageFill" x1="0" x2="1">
          <stop offset="0" stop-color="#7aa88a" stop-opacity=".78"/>
          <stop offset="1" stop-color="#8da7c3" stop-opacity=".5"/>
        </linearGradient>
      </defs>
      ${body}
    </svg>
  `;
}

function label(x, y, text, size = 15, fill = "#f5efe3") {
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="Avenir Next, PingFang SC, sans-serif">${text}</text>`;
}

function ownershipVisual() {
  return svgWrap("股票 = 公司所有权的一小部分", `
    <rect x="42" y="44" width="190" height="150" rx="18" fill="#211c16" stroke="rgba(212,182,112,.34)"/>
    ${label(88, 112, "上市公司", 22)}
    ${label(72, 146, "创造利润 / 现金流", 14, "#a89b82")}
    <path d="M232 120 H332" stroke="#d4b670" stroke-width="3" stroke-dasharray="8 8"/>
    <rect x="332" y="58" width="92" height="62" rx="12" fill="url(#goldFill)"/>
    <rect x="332" y="136" width="92" height="62" rx="12" fill="rgba(212,182,112,.22)" stroke="rgba(212,182,112,.38)"/>
    <rect x="446" y="58" width="92" height="62" rx="12" fill="rgba(122,168,138,.28)" stroke="rgba(122,168,138,.42)"/>
    <rect x="446" y="136" width="92" height="62" rx="12" fill="rgba(141,167,195,.22)" stroke="rgba(141,167,195,.42)"/>
    ${label(354, 96, "股东A", 14, "#14110d")}
    ${label(354, 174, "股东B", 14)}
    ${label(468, 96, "股东C", 14)}
    ${label(468, 174, "你", 18, "#e8c97a")}
    ${label(58, 238, "买股票前先问：这家公司靠什么赚钱？", 16, "#d9d1c0")}
  `);
}

function matchingVisual() {
  return svgWrap("市场价格来自买卖双方撮合", `
    <rect x="70" y="52" width="190" height="160" rx="18" fill="rgba(122,168,138,.18)" stroke="rgba(122,168,138,.42)"/>
    <rect x="460" y="52" width="190" height="160" rx="18" fill="rgba(212,182,112,.16)" stroke="rgba(212,182,112,.42)"/>
    ${label(126, 92, "买方", 26)}
    ${label(506, 92, "卖方", 26)}
    ${label(106, 142, "愿意出价", 15, "#cfc4ad")}
    ${label(496, 142, "愿意卖出", 15, "#cfc4ad")}
    <path d="M260 132 H460" stroke="#d4b670" stroke-width="4"/>
    <circle cx="360" cy="132" r="44" fill="#211c16" stroke="#e8c97a"/>
    ${label(332, 126, "成交", 19)}
    ${label(318, 151, "价格形成", 13, "#a89b82")}
    ${label(90, 238, "买卖意愿不断变化，价格也就不断变化。", 16, "#d9d1c0")}
  `);
}

function orderVisual() {
  return svgWrap("下单前确认：买什么、买多少、错了怎么办", `
    <rect x="72" y="42" width="250" height="190" rx="16" fill="#211c16" stroke="rgba(212,182,112,.32)"/>
    ${label(100, 80, "模拟下单卡", 22, "#e8c97a")}
    ${label(100, 118, "标的：XXXX", 15)}
    ${label(100, 150, "价格：限价 / 市价", 15)}
    ${label(100, 182, "数量：不超过总资金 20%", 15)}
    <rect x="400" y="62" width="210" height="48" rx="12" fill="rgba(122,168,138,.2)" stroke="rgba(122,168,138,.42)"/>
    <rect x="400" y="126" width="210" height="48" rx="12" fill="rgba(212,182,112,.18)" stroke="rgba(212,182,112,.42)"/>
    <rect x="400" y="190" width="210" height="48" rx="12" fill="rgba(141,167,195,.18)" stroke="rgba(141,167,195,.42)"/>
    ${label(428, 93, "买入理由", 15)}
    ${label(428, 157, "止损条件", 15)}
    ${label(428, 221, "复盘记录", 15)}
  `);
}

function indexVisual() {
  return svgWrap("指数是一篮子股票，个股是一家公司", `
    <circle cx="178" cy="136" r="86" fill="rgba(212,182,112,.12)" stroke="rgba(212,182,112,.38)"/>
    ${[0,1,2,3,4,5].map((i) => `<circle cx="${140 + (i%3)*38}" cy="${102 + Math.floor(i/3)*52}" r="16" fill="${i%2 ? '#7aa88a' : '#d4b670'}" opacity=".82"/>`).join("")}
    ${label(130, 236, "指数：一篮子股票", 16)}
    <rect x="430" y="72" width="130" height="130" rx="18" fill="rgba(141,167,195,.18)" stroke="rgba(141,167,195,.42)"/>
    ${label(476, 132, "公司", 22)}
    ${label(438, 236, "个股：单家公司", 16)}
    <path d="M284 136 H396" stroke="#a89b82" stroke-dasharray="8 8"/>
  `);
}

function profitVisual() {
  return svgWrap("收益来自价差和分红，亏损来自价格下跌", `
    <path d="M80 206 L180 166 L280 178 L380 100 L500 118 L620 72" fill="none" stroke="#7aa88a" stroke-width="5"/>
    <path d="M80 96 L180 132 L280 122 L380 174 L500 164 L620 218" fill="none" stroke="#8da7c3" stroke-width="5" opacity=".55"/>
    ${label(90, 74, "上涨：价差收益", 17, "#7aa88a")}
    ${label(90, 238, "下跌：浮亏 / 实亏", 17, "#8da7c3")}
    <rect x="470" y="72" width="92" height="44" rx="10" fill="rgba(212,182,112,.18)" stroke="rgba(212,182,112,.4)"/>
    ${label(492, 100, "分红", 15, "#e8c97a")}
  `);
}

function warningVisual() {
  return svgWrap("新手先避开高风险动作", `
    <polygon points="360,48 620,220 100,220" fill="rgba(212,182,112,.1)" stroke="#e8c97a"/>
    ${label(338, 122, "!", 58, "#e8c97a")}
    ${label(250, 174, "杠杆 / 满仓 / 听消息 / 追热点", 19)}
    ${label(220, 246, "先活下来，再谈收益。", 17, "#d9d1c0")}
  `);
}

function candleVisual() {
  return svgWrap("K线记录开盘、收盘、最高、最低", `
    ${[90,180,270,360,450,540].map((x, i) => {
      const up = i % 2 === 0;
      const top = [72,96,60,112,82,52][i];
      const bodyTop = [105,118,92,134,108,88][i];
      const bodyH = [78,54,96,46,70,102][i];
      const color = up ? '#7aa88a' : '#d4b670';
      return `<line x1="${x}" y1="${top}" x2="${x}" y2="${220 - top/4}" stroke="${color}" stroke-width="4"/>
      <rect x="${x-18}" y="${bodyTop}" width="36" height="${bodyH}" rx="4" fill="${color}" opacity=".82"/>`;
    }).join("")}
    ${label(62, 252, "单根K线信息有限，要结合位置和成交量。", 16, "#d9d1c0")}
  `);
}

function volumeVisual() {
  return svgWrap("成交量观察交易活跃度", `
    <path d="M72 112 L170 88 L268 136 L366 86 L464 112 L612 70" fill="none" stroke="#d4b670" stroke-width="4"/>
    ${[72,150,228,306,384,462,540,618].map((x, i) => `<rect x="${x}" y="${220 - [40,72,50,110,64,92,58,130][i]}" width="34" height="${[40,72,50,110,64,92,58,130][i]}" rx="4" fill="${i%2 ? '#7aa88a' : '#8da7c3'}" opacity=".72"/>`).join("")}
    ${label(78, 252, "价格变化 + 成交量变化，才有更完整的信息。", 16, "#d9d1c0")}
  `);
}

function trendVisual() {
  return svgWrap("趋势和位置：不要只看一天涨跌", `
    <rect x="70" y="56" width="560" height="164" rx="18" fill="rgba(20,17,13,.48)" stroke="rgba(212,182,112,.22)"/>
    <path d="M100 178 C180 122, 240 166, 320 112 S480 82, 600 60" fill="none" stroke="#7aa88a" stroke-width="5"/>
    <line x1="100" y1="190" x2="600" y2="92" stroke="#d4b670" stroke-width="2" stroke-dasharray="9 8"/>
    ${label(104, 84, "支撑区", 14, "#a89b82")}
    ${label(516, 70, "高位", 14, "#e8c97a")}
    ${label(108, 248, "先判断区间位置，再讨论买卖。", 16, "#d9d1c0")}
  `);
}

function orderBookVisual() {
  return svgWrap("盘口：买一卖一和价差", `
    <rect x="100" y="42" width="220" height="190" rx="16" fill="rgba(122,168,138,.12)" stroke="rgba(122,168,138,.34)"/>
    <rect x="400" y="42" width="220" height="190" rx="16" fill="rgba(212,182,112,.12)" stroke="rgba(212,182,112,.34)"/>
    ${label(148, 78, "买盘", 22, "#7aa88a")}
    ${label(448, 78, "卖盘", 22, "#e8c97a")}
    ${[0,1,2].map(i => `${label(132, 118+i*34, `买${i+1}  10.${8-i}`, 15)}${label(432, 118+i*34, `卖${i+1}  10.${9+i}`, 15)}`).join("")}
    <path d="M320 138 H400" stroke="#a89b82" stroke-width="3" stroke-dasharray="8 8"/>
    ${label(320, 168, "价差", 14, "#a89b82")}
  `);
}

function emotionVisual() {
  return svgWrap("市场情绪会放大涨跌", `
    <path d="M96 178 C170 78, 250 78, 322 178 S474 278, 620 126" fill="none" stroke="#d4b670" stroke-width="5"/>
    <circle cx="184" cy="102" r="34" fill="rgba(122,168,138,.22)" stroke="#7aa88a"/>
    <circle cx="430" cy="228" r="34" fill="rgba(141,167,195,.2)" stroke="#8da7c3"/>
    ${label(162, 108, "贪婪", 15)}
    ${label(408, 234, "恐惧", 15)}
    ${label(128, 250, "把情绪写下来，别让情绪替你下单。", 16, "#d9d1c0")}
  `);
}

function businessVisual() {
  return svgWrap("商业模式：卖什么、卖给谁、凭什么", `
    <rect x="70" y="82" width="150" height="92" rx="18" fill="rgba(212,182,112,.16)" stroke="rgba(212,182,112,.38)"/>
    <rect x="285" y="82" width="150" height="92" rx="18" fill="rgba(122,168,138,.16)" stroke="rgba(122,168,138,.38)"/>
    <rect x="500" y="82" width="150" height="92" rx="18" fill="rgba(141,167,195,.16)" stroke="rgba(141,167,195,.38)"/>
    ${label(112, 134, "产品", 22)}
    ${label(327, 134, "客户", 22)}
    ${label(526, 134, "竞争优势", 22)}
    <path d="M220 128 H285 M435 128 H500" stroke="#d4b670" stroke-width="3"/>
    ${label(114, 230, "好产品 ≠ 好生意；好生意也要看价格。", 16, "#d9d1c0")}
  `);
}

function statementsVisual() {
  return svgWrap("财报三表要一起看", `
    ${["利润表", "资产负债表", "现金流量表"].map((name, i) => `<rect x="${82+i*200}" y="58" width="150" height="154" rx="16" fill="rgba(20,17,13,.55)" stroke="rgba(212,182,112,.3)"/>
      ${label(112+i*200, 96, name, 18, "#e8c97a")}
      <line x1="${110+i*200}" y1="124" x2="${202+i*200}" y2="124" stroke="#a89b82"/>
      <line x1="${110+i*200}" y1="154" x2="${202+i*200}" y2="154" stroke="#a89b82"/>
      <line x1="${110+i*200}" y1="184" x2="${202+i*200}" y2="184" stroke="#a89b82"/>`).join("")}
    ${label(112, 246, "利润好看，还要确认现金是否真的进来。", 16, "#d9d1c0")}
  `);
}

function metricsVisual() {
  return svgWrap("关键指标像公司体检表", `
    ${["收入", "毛利率", "ROE", "负债率", "现金流"].map((name, i) => `<circle cx="${110+i*120}" cy="128" r="${34+i%2*8}" fill="${i%2 ? 'rgba(122,168,138,.24)' : 'rgba(212,182,112,.2)'}" stroke="rgba(212,182,112,.34)"/>${label(92+i*120, 134, name, 14)}`).join("")}
    <path d="M110 128 H590" stroke="#756c5e" stroke-width="2" stroke-dasharray="7 8"/>
    ${label(92, 230, "单个指标不能定生死，要和同行、历史一起看。", 16, "#d9d1c0")}
  `);
}

function valuationVisual() {
  return svgWrap("估值：价格和价值的关系", `
    <rect x="92" y="92" width="520" height="50" rx="25" fill="rgba(245,239,227,.08)" stroke="rgba(212,182,112,.24)"/>
    <rect x="122" y="92" width="170" height="50" rx="25" fill="rgba(122,168,138,.24)"/>
    <rect x="292" y="92" width="170" height="50" rx="0" fill="rgba(212,182,112,.18)"/>
    <rect x="462" y="92" width="120" height="50" rx="25" fill="rgba(141,167,195,.18)"/>
    ${label(150, 125, "便宜区", 15)}
    ${label(336, 125, "合理区", 15)}
    ${label(496, 125, "偏贵", 15)}
    <path d="M378 80 V162" stroke="#e8c97a" stroke-width="4"/>
    ${label(346, 184, "当前价格", 14, "#e8c97a")}
    ${label(104, 236, "估值不是精确答案，而是判断安全边际。", 16, "#d9d1c0")}
  `);
}

function positionVisual() {
  return svgWrap("仓位管理：先控制单次错误", `
    <circle cx="240" cy="136" r="88" fill="rgba(212,182,112,.16)" stroke="rgba(212,182,112,.35)"/>
    <path d="M240 136 L240 48 A88 88 0 0 1 322 104 Z" fill="rgba(122,168,138,.55)"/>
    <path d="M240 136 L322 104 A88 88 0 0 1 260 222 Z" fill="rgba(141,167,195,.38)"/>
    ${label(404, 98, "现金 / 备用", 16)}
    ${label(404, 136, "单只股票 ≤ 20%", 16, "#e8c97a")}
    ${label(404, 174, "分批买入", 16, "#7aa88a")}
    ${label(112, 250, "仓位决定你判断错时还能不能继续学习。", 16, "#d9d1c0")}
  `);
}

function reviewVisual() {
  return svgWrap("复盘：把每次买卖变成学习材料", `
    <rect x="74" y="52" width="570" height="170" rx="16" fill="rgba(20,17,13,.55)" stroke="rgba(212,182,112,.28)"/>
    ${["日期", "标的", "理由", "仓位", "退出", "教训"].map((h, i) => `${label(104+i*86, 88, h, 14, "#e8c97a")}<line x1="${94+i*86}" y1="108" x2="${154+i*86}" y2="108" stroke="#756c5e"/>`).join("")}
    ${[0,1,2].map(i => `<line x1="96" y1="${134+i*34}" x2="612" y2="${134+i*34}" stroke="rgba(245,239,227,.12)"/>`).join("")}
    ${label(108, 250, "不要只记盈亏，要记录当时为什么这么做。", 16, "#d9d1c0")}
  `);
}

function setQuizSection(key) {
  activeQuizSection = key;
  const sec = quizSections[key];
  activeQuizList = quiz.slice(sec.range[0], sec.range[1]);
  quizIndex = 0;
  score = 0;
  document.querySelectorAll("[data-quiz-section]").forEach((b) => {
    b.classList.toggle("active", b.dataset.quizSection === key);
  });
  renderQuiz();
}

function renderQuiz() {
  if (!activeQuizList.length) activeQuizList = quiz.slice(0);
  const item = activeQuizList[quizIndex];
  if (!item) return;
  quizStepEl.textContent = `${quizIndex + 1} / ${activeQuizList.length}`;
  quizScoreEl.textContent = `得分 ${score}`;
  questionEl.textContent = item.q;
  feedbackEl.textContent = "";
  answersEl.innerHTML = item.a
    .map((answer, index) => `<button type="button" data-answer="${index}">${answer}</button>`)
    .join("");
}

// 用 event delegation 保险 — lesson 任何卡点击都切到学习台 + 显示对应 lesson detail
document.addEventListener("click", (e) => {
  const lessonBtn = e.target.closest("[data-lesson]");
  if (lessonBtn && lessonBtn.dataset.lesson !== undefined) {
    setLesson(Number(lessonBtn.dataset.lesson));
    showPage("overview");
    setTimeout(() => {
      const lessonEl = document.getElementById("lesson");
      if (lessonEl) lessonEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return;
  }
  const jumpBtn = e.target.closest("[data-lesson-jump]");
  if (jumpBtn) {
    const idx = Number(jumpBtn.dataset.lessonJump);
    setLesson(idx);
    showPage("overview");
    setTimeout(() => {
      const lessonEl = document.getElementById("lesson");
      if (lessonEl) lessonEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
});

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
});

answersEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.restart === "true") {
    quizIndex = 0;
    score = 0;
    renderQuiz();
    return;
  }
  const item = activeQuizList[quizIndex];
  const picked = Number(button.dataset.answer);
  const isCorrect = picked === item.correct;
  if (isCorrect) score += 1;
  feedbackEl.textContent = isCorrect ? "✓ 正确, 继续下一题。" : `✗ 正确答案: ${item.a[item.correct]}`;
  answersEl.querySelectorAll("button").forEach((answer) => { answer.disabled = true; });
  setTimeout(() => {
    if (quizIndex + 1 >= activeQuizList.length) {
      const total = activeQuizList.length;
      const pass = score / total >= 0.8;
      questionEl.textContent = pass ? "🎉 通过本轮" : "本轮完成 (建议复习)";
      quizStepEl.textContent = `${total} / ${total}`;
      quizScoreEl.textContent = `得分 ${score}`;
      feedbackEl.textContent = `${score} / ${total} ${pass ? "(优秀, ≥80%)" : "(< 80%, 建议回看课程)"}`;
      answersEl.innerHTML = `<button type="button" data-restart="true">重新开始</button>`;
      return;
    }
    quizIndex += 1;
    renderQuiz();
  }, 1000);
});

// Quiz section selector
document.querySelectorAll("[data-quiz-section]").forEach((btn) => {
  btn.addEventListener("click", () => setQuizSection(btn.dataset.quizSection));
});

// Lesson actions
if (lessonPrev) lessonPrev.addEventListener("click", () => setLesson(Math.max(0, currentLesson - 1)));
if (lessonNext) lessonNext.addEventListener("click", () => setLesson(Math.min(lessonData.length - 1, currentLesson + 1)));
if (lessonComplete) {
  lessonComplete.addEventListener("click", () => {
    if (completed.has(currentLesson)) completed.delete(currentLesson);
    else completed.add(currentLesson);
    saveProgress();
    updateProgressUI();
  });
}
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (!confirm("确定重置全部学习进度吗?")) return;
    completed.clear();
    saveProgress();
    updateProgressUI();
  });
}

// ─── 关键指标 (25 个) ─────────────────────
const METRICS = [
  // 估值类
  {
    cat: "估值",
    abbr: "PE",
    full: "Price-to-Earnings Ratio",
    cn: "市盈率",
    formula: "股价 / 每股收益",
    meaning: "市场给公司每 $1 利润支付多少钱。最常用估值锚",
    healthy: "稳定行业 8-20 / 成长股 20-40",
    warning: "> 50 = 估值高烧 / < 5 = 价值陷阱可能",
    example: "AAPL PE 30 (2024) — 算贵但稳; PLTR PE 200+ — 极贵需警惕; MU 周期股 PE 反指标",
    tip: "PE 必须和行业 + 历史区间对比, 不能孤立看",
  },
  {
    cat: "估值",
    abbr: "PB",
    full: "Price-to-Book Ratio",
    cn: "市净率",
    formula: "股价 / 每股净资产",
    meaning: "市场给公司每 $1 净资产支付多少钱",
    healthy: "传统行业 1-3 / 银行 0.5-1.5 / 科技 高",
    warning: "PB < 1 + ROE 低 = 价值陷阱; PB > 10 + 成长慢 = 透支",
    example: "Berkshire PB 1.4 (合理); AAPL PB 60 (科技公司 PB 不重要)",
    tip: "适合有形资产重的公司 (银行/制造). 科技/服务公司 PB 没意义",
  },
  {
    cat: "估值",
    abbr: "PS",
    full: "Price-to-Sales Ratio",
    cn: "市销率",
    formula: "市值 / 营收",
    meaning: "市场对每 $1 收入愿意支付多少",
    healthy: "成熟行业 1-3 / SaaS 5-15",
    warning: "PS > 30 = 极高估值 (e.g. SaaS 泡沫期); 低 PS + 低毛利 = 烂生意",
    example: "Snowflake PS 25 (2021 顶) → PS 10 (2024 现实回归)",
    tip: "亏损公司没 PE 时用 PS. 必须和毛利率配合看",
  },
  {
    cat: "估值",
    abbr: "PEG",
    full: "Price/Earnings to Growth",
    cn: "市盈率成长比",
    formula: "PE / 年净利增长率",
    meaning: "估值是否匹配成长速度. Peter Lynch 最爱",
    healthy: "PEG < 1 = 估值合理 / 1-2 = 中性 / > 2 = 偏贵",
    warning: "PEG > 3 = 已透支 N 年成长",
    example: "GOOGL PE 25 / 增 15% = PEG 1.7 (合理); NVDA PE 50 / 增 80% = PEG 0.6 (便宜!)",
    tip: "成长股的金标尺. 但增速不稳定时不能用",
  },
  {
    cat: "估值",
    abbr: "EV/EBITDA",
    full: "Enterprise Value / EBITDA",
    cn: "企业价值 / 息税折旧摊销前利润",
    formula: "(市值 + 净负债) / EBITDA",
    meaning: "包含债务的真估值, 跨资本结构可比",
    healthy: "通常 10-15 / 成长行业 20+",
    warning: "EV/EBITDA > 30 + 资本开支大 = 估值过热",
    example: "MSFT EV/EBITDA 22 (合理); 重资产公司用此比 PE 准",
    tip: "比 PE 更可靠 (排除会计差异). 并购研究的标准",
  },

  // 盈利类
  {
    cat: "盈利",
    abbr: "GP%",
    full: "Gross Profit Margin",
    cn: "毛利率",
    formula: "(收入 - 成本) / 收入",
    meaning: "卖每 $1 产品赚多少毛利. 反映定价权",
    healthy: "软件 70-90% / 品牌 40-60% / 制造 15-30%",
    warning: "毛利率持续下降 = 失去定价权 / 成本失控",
    example: "AAPL 毛利 45% (硬件强); NVDA 70% (定价权); 低端制造 10-15%",
    tip: "毛利率是商业模式优势的硬指标, 不容易造假",
  },
  {
    cat: "盈利",
    abbr: "OPM",
    full: "Operating Margin",
    cn: "营业利润率",
    formula: "营业利润 / 收入",
    meaning: "排除税务和利息的核心赚钱效率",
    healthy: "软件 25-40% / 消费品 10-20% / 零售 3-8%",
    warning: "OPM 持续 < 5% = 经营压力大",
    example: "MSFT 42% (顶级 SaaS); AMZN 6% (零售 + AWS 平均); WMT 4%",
    tip: "比 PE 更稳定的赚钱能力指标",
  },
  {
    cat: "盈利",
    abbr: "NIM",
    full: "Net Income Margin",
    cn: "净利率",
    formula: "净利润 / 收入",
    meaning: "扣完所有费用后留多少",
    healthy: "高质量软件 25-35% / 普通工业 5-12%",
    warning: "净利率 < 3% = 抗风险弱",
    example: "AAPL 净利率 25%; 航空公司常 < 5% (薄利)",
    tip: "和 OPM 一起看. 差距大说明税或利息影响大",
  },
  {
    cat: "盈利",
    abbr: "ROE",
    full: "Return on Equity",
    cn: "净资产收益率",
    formula: "净利润 / 股东权益",
    meaning: "股东每 $1 投入年回报多少",
    healthy: "巴菲特最爱 ≥ 15%, 优秀 > 20%",
    warning: "ROE > 30% 需查负债率 (可能高杠杆假象)",
    example: "AAPL ROE 150% (回购 + 高利润); Berkshire 11% (保守)",
    tip: "必须和负债率一起看 — 高 ROE + 高杠杆 = 危险",
  },
  {
    cat: "盈利",
    abbr: "ROIC",
    full: "Return on Invested Capital",
    cn: "投入资本回报率",
    formula: "NOPAT / (债务 + 股东权益)",
    meaning: "比 ROE 更准. 包含债务的真实回报",
    healthy: "≥ 15% 优秀 / ≥ 25% 顶级",
    warning: "ROIC < WACC = 价值毁灭",
    example: "MSFT ROIC 30%; Buffett-Munger 派标准, 比 ROE 更靠谱",
    tip: "排除杠杆作弊, 看公司本身赚钱能力",
  },

  // 成长类
  {
    cat: "成长",
    abbr: "Rev YoY",
    full: "Revenue Year-over-Year",
    cn: "营收同比增速",
    formula: "(本期收入 / 同期收入 - 1) × 100%",
    meaning: "公司规模扩张速度",
    healthy: "成熟 5-10% / 成长 20-50% / 早期 100%+",
    warning: "持续个位数增速 = 成熟期 / 减速 = 转折点",
    example: "NVDA 2024 +120% (AI 爆发); AAPL +5% (成熟期)",
    tip: "看 4 个连续季度 (年化), 别只看单季",
  },
  {
    cat: "成长",
    abbr: "EPS YoY",
    full: "Earnings Per Share YoY",
    cn: "每股收益同比",
    formula: "(本期 EPS / 同期 EPS - 1)",
    meaning: "每股利润增速 (考虑回购影响)",
    healthy: "≥ 15% 良好 / ≥ 25% 优秀",
    warning: "EPS 增长 > 收入增长 + 大量回购 = 注水",
    example: "AAPL 每年回购 EPS 加速; AMD 2023 EPS -36%, 2024 +50%",
    tip: "EPS YoY > Rev YoY 可能是回购作功. 看真实经营要看营收增速",
  },
  {
    cat: "成长",
    abbr: "FCF",
    full: "Free Cash Flow",
    cn: "自由现金流",
    formula: "OCF - 资本支出",
    meaning: "公司真实可分配的钱 (扣完投资后)",
    healthy: "FCF/净利润 > 80% = 利润真",
    warning: "净利润涨, FCF 长期负 = 可能造假",
    example: "AAPL FCF $100B/年 (现金机器); 早期 AMZN 多年 FCF 几乎 0",
    tip: "比净利润更可靠的核心指标. 巴菲特看 owner earnings 就看这个",
  },
  {
    cat: "成长",
    abbr: "FCF Yield",
    full: "Free Cash Flow Yield",
    cn: "自由现金流收益率",
    formula: "FCF / 市值",
    meaning: "市场给的回报率 (类似买地买出租)",
    healthy: "≥ 5% 良好 / ≥ 8% 便宜",
    warning: "< 2% 通常是高估或重资本支出",
    example: "META FCF Yield 4% (合理); 老烟草股 FCF Yield 8% (估值低)",
    tip: "成长股早期低 FCF Yield 正常, 长期低 = 透支",
  },

  // 负债 / 现金流类
  {
    cat: "负债",
    abbr: "D/E",
    full: "Debt-to-Equity Ratio",
    cn: "资产负债率 / 杠杆",
    formula: "总负债 / 股东权益",
    meaning: "债务和净资产相对大小",
    healthy: "科技 < 0.5 / 制造业 < 1 / 公用事业 < 2",
    warning: "D/E > 2 + 现金流弱 = 利息压力大",
    example: "AAPL D/E 1.5 (现金多, OK); 不少汽车公司 D/E > 3",
    tip: "和现金流 + 利息覆盖率一起看",
  },
  {
    cat: "负债",
    abbr: "Current",
    full: "Current Ratio",
    cn: "流动比率",
    formula: "流动资产 / 流动负债",
    meaning: "短期偿债能力",
    healthy: "1.5-3 健康",
    warning: "< 1 短期吃紧 / > 5 资金低效",
    example: "MSFT 1.7 (健康); 银行流动比率不适用",
    tip: "破产前往往这个先恶化",
  },
  {
    cat: "负债",
    abbr: "ICR",
    full: "Interest Coverage Ratio",
    cn: "利息保障倍数",
    formula: "EBIT / 利息费用",
    meaning: "几年的运营利润够付利息",
    healthy: "≥ 5 很安全 / 2-5 需关注 / < 2 危险",
    warning: "< 1.5 + 利率上升 = 违约风险",
    example: "高质量公司 > 20; AT&T < 5 (高负债公用事业)",
    tip: "看公司能否在加息周期生存",
  },
  {
    cat: "现金流",
    abbr: "OCF",
    full: "Operating Cash Flow",
    cn: "经营现金流",
    formula: "净利润 + 折旧 + 营运资本变化",
    meaning: "主业每年产生的现金",
    healthy: "OCF > 净利润 (利润比现金多 = 现金没收回)",
    warning: "OCF 长期 < 净利润 50% = 利润质量差",
    example: "AAPL OCF 长期 > 净利润 (现金机器); 烧钱公司 OCF 负",
    tip: "比净利润难造假, 巴菲特最重要参考之一",
  },

  // 行业专属
  {
    cat: "SaaS",
    abbr: "ARR",
    full: "Annual Recurring Revenue",
    cn: "年化经常性收入",
    formula: "月订阅 × 12 / 年合同总和",
    meaning: "SaaS 公司核心. 比 GAAP 收入更前瞻",
    healthy: "增速 ≥ 30% 健康 / ≥ 50% 优秀",
    warning: "ARR 增速跌破 20% = 第二曲线缺失",
    example: "Snowflake ARR $3B+ (增 30%); Palantir 商业 ARR 增 100%+",
    tip: "看公司 8-K / earning call, GAAP 收入有递延",
  },
  {
    cat: "SaaS",
    abbr: "NRR",
    full: "Net Revenue Retention",
    cn: "净留存率",
    formula: "本期同客户收入 / 同期同客户收入",
    meaning: "现有客户每年扩张多少",
    healthy: "≥ 110% 健康 / ≥ 130% 顶级",
    warning: "< 100% = 客户流失大于扩张",
    example: "Snowflake NRR 158% (神级); CRM 110% (健康)",
    tip: "SaaS 公司最重要的健康指标",
  },
  {
    cat: "SaaS",
    abbr: "CAC",
    full: "Customer Acquisition Cost",
    cn: "客户获取成本",
    formula: "销售 + 营销 / 新增客户数",
    meaning: "拉新一个客户花多少钱",
    healthy: "CAC payback ≤ 18 个月",
    warning: "CAC payback > 30 个月 = 商业模式危险",
    example: "高效 SaaS CAC payback < 12 个月; 烧钱公司 > 36 个月",
    tip: "和 LTV 配合看. LTV/CAC > 3 才健康",
  },
  {
    cat: "技术",
    abbr: "Beta",
    full: "Beta Coefficient",
    cn: "贝塔系数",
    formula: "stock returns vs market returns 回归斜率",
    meaning: "股票相对大盘的波动放大倍数",
    healthy: "0.8-1.2 中等 / < 0.8 低波动 / > 1.5 高波动",
    warning: "Beta > 2 = 大盘崩时杠杆放大下跌",
    example: "AAPL Beta 1.2; TSLA Beta 2.0; 公用事业 Beta 0.5",
    tip: "构建组合时配合. 高 Beta 仓位要小",
  },
  {
    cat: "技术",
    abbr: "ATR",
    full: "Average True Range",
    cn: "平均真实波幅",
    formula: "14 日真实波幅平均",
    meaning: "日均价格波动幅度",
    healthy: "正常股 ATR/价 ~1-3% / 高波动 5-10%",
    warning: "ATR/价 > 7% = 极高波动, 仓位需小",
    example: "SPY ATR 0.8%/天; PLTR ATR 4.6%/天 (高波动)",
    tip: "止损位 = 2-3 × ATR 是经典做法",
  },
  {
    cat: "技术",
    abbr: "RSI",
    full: "Relative Strength Index",
    cn: "相对强弱指数",
    formula: "14 日上涨 / (上涨 + 下跌) × 100",
    meaning: "超买超卖指标 (0-100)",
    healthy: "30-70 中性",
    warning: "> 70 超买可能回调 / < 30 超卖可能反弹",
    example: "RSI 80 + 价格新高 = 短期顶部预警; RSI 25 + F&G < 20 = 短期底部",
    tip: "震荡市好用, 趋势市可能持续超买/超卖",
  },

  // 宏观
  {
    cat: "宏观",
    abbr: "VIX",
    full: "CBOE Volatility Index",
    cn: "恐慌指数",
    formula: "SPX 期权 30 天隐含波动率",
    meaning: "市场未来波动预期",
    healthy: "< 20 稳定 / 20-30 警戒",
    warning: "> 35 = 恐慌, 历史抄底机会; > 50 = 极端恐慌",
    example: "2020 COVID VIX 82; 2008 雷曼 VIX 80; 平时 12-18",
    tip: "VIX 高时减仓 / 极端高时加仓 (反向)",
  },
  // SaaS 类补充
  {
    cat: "SaaS",
    abbr: "NRR",
    full: "Net Revenue Retention",
    cn: "净收入留存率",
    formula: "(期初客户群体 12 个月后收入) / 期初收入",
    meaning: "现有客户的扩张/流失净效果, SaaS 健康度核心",
    healthy: "> 110% 健康 / > 130% 优秀 / Snowflake 158%",
    warning: "< 100% 客户流失大于扩张, 增长靠新客烧钱",
    example: "Snowflake NRR 158% (2022) → SaaS 顶级; Zoom 119% (2024) → 健康但减速",
    tip: "NRR > 120% + LTV/CAC > 3 = SaaS 估值给溢价的硬指标",
  },
  {
    cat: "SaaS",
    abbr: "Magic Number",
    full: "SaaS Magic Number",
    cn: "魔法数",
    formula: "(本季新增 ARR × 4) / 上季销售营销费用",
    meaning: "每 $1 销售投入产生多少 ARR 收入, 销售效率",
    healthy: "> 1 健康 / > 1.5 加大投入 / < 0.5 销售低效",
    warning: "< 0.5 = 客户获取烧钱过多, 应该停止扩张",
    example: "Datadog Magic 1.8 (高效); Cloudflare 0.9 (减速期)",
    tip: "结合 NRR 看. Magic > 1.5 + NRR > 120% = SaaS 黄金标准",
  },
  {
    cat: "SaaS",
    abbr: "Rule of 40",
    full: "Rule of 40",
    cn: "40 法则",
    formula: "营收增速 (%) + 利润率 (%) ≥ 40%",
    meaning: "成长 + 盈利的平衡线, SaaS 健康度黄金标准",
    healthy: "≥ 40 = 健康 / ≥ 60 = 卓越",
    warning: "< 30 = 增长 + 盈利双弱 = 估值杀",
    example: "Shopify 2024: 增速 25% + 营业利润率 15% = 40 (合格); ServiceNow 50% + 30% = 80 (卓越)",
    tip: "Rule of 40 越高估值越溢价. 高于 60 的 SaaS 通常 PS > 15",
  },
  {
    cat: "SaaS",
    abbr: "CAC Payback",
    full: "CAC Payback Period",
    cn: "客户回本周期",
    formula: "CAC / (ARPU × 毛利率)",
    meaning: "获客成本回本需要多少个月",
    healthy: "< 12 月 优秀 / 12-24 月 健康 / > 36 月 危险",
    warning: "> 36 月 = 单位经济学不成立, 烧钱获客无法盈利",
    example: "Salesforce CAC 回本 18 月 (健康); 早期 SaaS 30+ 月 (烧钱)",
    tip: "CAC 回本 < 12 月 + LTV/CAC > 3 = 增长引擎可持续",
  },
  // 技术指标补充
  {
    cat: "技术",
    abbr: "ADX",
    full: "Average Directional Index",
    cn: "平均趋向指数",
    formula: "+DI/-DI 平滑后趋势强度指标 (0-100)",
    meaning: "趋势强度而非方向, 区分趋势 vs 震荡",
    healthy: "ADX > 25 = 有趋势 / > 40 = 强趋势",
    warning: "ADX < 20 = 无趋势 = 不要用趋势策略",
    example: "NVDA 2023-2024 ADX 长期 > 40 = 强趋势; 震荡市 ADX < 20 时趋势策略全亏",
    tip: "趋势策略前先看 ADX. ADX < 20 用震荡策略 (布林带回归)",
  },
  {
    cat: "技术",
    abbr: "OBV",
    full: "On-Balance Volume",
    cn: "能量潮",
    formula: "上涨日 +Vol / 下跌日 -Vol 累加",
    meaning: "成交量推断价格趋势的资金流向",
    healthy: "OBV 与价格同向 = 趋势真",
    warning: "价格新高 OBV 不新高 = 量价背离顶部信号",
    example: "NVDA 2025-Q1 价创高 OBV 不新高 = 量价背离, 顶部预警",
    tip: "OBV 背离比 RSI 背离更靠谱, 它直接反映资金",
  },
  {
    cat: "技术",
    abbr: "VWAP",
    full: "Volume-Weighted Average Price",
    cn: "成交量加权均价",
    formula: "Σ(价格 × 成交量) / Σ成交量",
    meaning: "机构成本线, 当日 / 近 N 日真实平均成本",
    healthy: "价格 > VWAP = 强 / < VWAP = 弱",
    warning: "跌破日内 VWAP + 量放大 = 机构出货信号",
    example: "TSLA 日内突破 VWAP 上行 = 买入; 跌破 = 短线出场",
    tip: "VWAP 是日内交易锚点, 跌破即弱势",
  },
  {
    cat: "技术",
    abbr: "RS",
    full: "Relative Strength vs SPY",
    cn: "相对强弱",
    formula: "股票收益 / SPY 收益 (近 N 月)",
    meaning: "跑赢 / 跑输大盘, 主力资金偏好",
    healthy: "RS > 1 + 上升 = 主流热门股",
    warning: "RS < 1 + 下降 = 资金流出, 别抄底",
    example: "2024 NVDA RS 3.5 (大幅跑赢); JD RS 0.4 (大幅跑输)",
    tip: "RS 排名前 20% + 行业 RS 前 20% = 双重强势, 出击点",
  },
  // 宏观补充
  {
    cat: "宏观",
    abbr: "M2",
    full: "M2 Money Supply",
    cn: "广义货币供应",
    formula: "M1 + 储蓄存款 + 货币市场基金",
    meaning: "市场流动性, 涨股票 / 资产价格的水",
    healthy: "正增长 (健康经济)",
    warning: "M2 增速 > 10% = 通胀预警; M2 收缩 = 资产价格压力",
    example: "2020-2021 M2 +27% → 资产价格暴涨; 2022 M2 转负 → 股债双杀",
    tip: "M2 同比是宏观水位计, 比利率更直接预测资产价格",
  },
  {
    cat: "宏观",
    abbr: "Yield Curve",
    full: "10Y-2Y Treasury Spread",
    cn: "10年-2年收益率差",
    formula: "10 年期国债收益率 - 2 年期国债收益率",
    meaning: "经济周期预测器, 倒挂 = 衰退预警",
    healthy: "正 = 经济扩张 / 负 (倒挂) = 衰退 12-18 月内",
    warning: "倒挂 > 3 月 = 历史 100% 衰退率",
    example: "2022-07 倒挂 → 2023-Q3 衰退担忧; 2019 倒挂 → 2020 衰退",
    tip: "倒挂解除时 (重新转正) 才是衰退正式开始 + 股市底通常此时",
  },
  {
    cat: "宏观",
    abbr: "DXY",
    full: "US Dollar Index",
    cn: "美元指数",
    formula: "美元对 6 种主要货币加权",
    meaning: "美元强弱, 大宗 / 新兴市场 / 黄金的反向指标",
    healthy: "100-105 = 中性",
    warning: "> 110 强势 → 新兴市场承压; < 95 弱势 → 黄金 + 大宗起飞",
    example: "2022 DXY 115 → 新兴市场 -25%; 2020 DXY 89 → 黄金 +30%",
    tip: "DXY 是新兴市场 + 大宗的反向锚. 投资海外要先看 DXY",
  },
  {
    cat: "宏观",
    abbr: "Fed Funds Rate",
    full: "Federal Funds Rate",
    cn: "联邦基金利率",
    formula: "美联储设定的隔夜拆借利率",
    meaning: "全球资金成本锚, 决定估值水位",
    healthy: "0-2% = 宽松 / 2-4% = 中性 / > 5% = 紧缩",
    warning: "加息周期 = 估值杀 + 成长股压力; 降息 = 资产价格水涨船高",
    example: "2022-23 加息 0→5.5% → 成长股 PS 砍半; 2024 降息预期 → 估值修复",
    tip: "看 FOMC dot plot 比当前利率重要. 预期变化是定价",
  },
  // 现金流补充
  {
    cat: "现金流",
    abbr: "FCF Yield",
    full: "Free Cash Flow Yield",
    cn: "自由现金流收益率",
    formula: "FCF / 市值",
    meaning: "买这只股票, 每年收回多少现金, 跨行业可比的真实回报率",
    healthy: "> 5% 健康 / > 8% 便宜 / > 10% 极便宜",
    warning: "< 2% 估值高 (除非高增长) / 负 = 烧钱",
    example: "META FCF Yield 4% (合理); MO 烟草 9% (高息便宜); TSLA 1% (贵)",
    tip: "FCF Yield > 10Y 国债 + 行业增速 = 价值股最强信号",
  },
  {
    cat: "现金流",
    abbr: "OCF/NI",
    full: "Operating Cash Flow / Net Income",
    cn: "经营现金流 / 净利润比",
    formula: "经营现金流 / 净利润",
    meaning: "净利润含金量, 是否真现金",
    healthy: "> 1 健康 / > 1.2 优质 / 长期 < 0.8 警惕",
    warning: "OCF / NI 长期 < 0.8 = 利润不变现 = 财务造假 / 应收暴增高危",
    example: "Apple OCF/NI 1.3 (高质); 安然 OCF/NI 0.4 (造假信号)",
    tip: "三大造假识别之一. 看 3 年 OCF/NI 趋势, 持续下行 = 红灯",
  },
  {
    cat: "现金流",
    abbr: "Capex/Rev",
    full: "Capex / Revenue",
    cn: "资本开支占收入比",
    formula: "资本支出 / 营收",
    meaning: "重资产 vs 轻资产, 增长是否需要不断烧钱",
    healthy: "SaaS < 5% / 制造业 5-15% / 半导体 / 公用 20%+",
    warning: "Capex/Rev 突增 = 转型 / 烧钱; 持续高位 = 价值毁灭",
    example: "META Capex 35% (2024 AI 重投); MSFT 30% (AI capex); SaaS 一般 2-3%",
    tip: "Capex 看 3 年趋势 + ROIC. 烧钱无 ROIC 改善 = 价值陷阱",
  },
];

const METRIC_CATS = ["估值", "盈利", "成长", "负债", "现金流", "SaaS", "技术", "宏观"];

// ─── 止盈止损方法论 (9 种) ─────────────────────
const STOPS = [
  {
    type: "STOP",
    name: "硬止损 (固定百分比)",
    icon: "🔻",
    color: "#FF6B6B",
    rule: "买入价 × (1 - X%) 触发自动卖出",
    when: "短中期交易 / 小盘股 / 高波动股",
    pros: "执行简单, 不被情绪干扰",
    cons: "可能被噪音打掉, 错过反弹",
    example: "$100 买入, 设 -8% 止损 = $92 触发卖出",
    advice: "新手必备. 仓位 × 止损% = 单笔最大亏损, 全账户 ≤ 2%",
  },
  {
    type: "STOP",
    name: "ATR 止损 (波动止损)",
    icon: "📊",
    color: "#FF8C42",
    rule: "买入价 - 2 × ATR(14)",
    when: "趋势股 / 期货 / 高 Beta 股",
    pros: "适应不同股票波动, 不被噪音震出",
    cons: "止损位较远, 单笔亏损可能更大",
    example: "PLTR $137, ATR $6, 止损 = $137 - 12 = $125 (-9%)",
    advice: "比固定% 智能, ATR 越大止损越宽。但要按 ATR 算仓位, 别让 1 笔亏 > 2% 总资金",
  },
  {
    type: "STOP",
    name: "支撑位止损",
    icon: "🛡",
    color: "#5a8aa6",
    rule: "前期低点 / 关键均线 / 心理整数下方",
    when: "持仓有明确技术结构 / 长期持有",
    pros: "技术意义明确, 跌破代表趋势真坏",
    cons: "需要会判断支撑, 小白难掌握",
    example: "股价 $50 卡 200 日线 $48, 跌破 $47 卖",
    advice: "比硬止损更'会等', 但要严格执行, 跌破不等等",
  },
  {
    type: "STOP",
    name: "时间止损",
    icon: "⏰",
    color: "#a89060",
    rule: "持有 X 天没达到预期就出, 不论价格",
    when: "事件驱动 / 财报博弈 / 短线策略",
    pros: "强制纪律, 防止'鸡肋'持仓占用资金",
    cons: "可能错过晚来的兑现",
    example: "财报后 30 天没涨 10%, 一律出",
    advice: "搭配硬止损用. 长期投资不适用",
  },
  {
    type: "STOP",
    name: "无效化条件 (逻辑止损)",
    icon: "🧭",
    color: "#7AE8A0",
    rule: "买入逻辑被证伪 → 立刻卖, 不论盈亏",
    when: "价值投资 / 长期持有",
    pros: "和公司基本面挂钩, 抗短期波动",
    cons: "需要清晰投资逻辑 + 自我纪律",
    example: "买 NVDA 因 AI 主线; 主线塌 → 出, 哪怕亏 30%",
    advice: "巴菲特/达里奥派常用. 必须事前写下'什么发生我会卖'",
  },
  {
    type: "TAKE",
    name: "目标价止盈",
    icon: "🎯",
    color: "#FFD86B",
    rule: "达到分析师目标价 / DCF 公允价 → 减仓",
    when: "价值股 / 估值清晰",
    pros: "价值锚定, 不贪婪",
    cons: "牛市可能过早出场",
    example: "PLTR 目标 $200, 到了减 1/2",
    advice: "分批不一次性. 50% 到目标卖, 50% trailing",
  },
  {
    type: "TAKE",
    name: "Trailing Stop (移动止盈)",
    icon: "📈",
    color: "#7aa88a",
    rule: "股价创新高时, 止损位跟着上移",
    when: "趋势股 / 抓主升浪",
    pros: "锁住利润 + 让利润奔跑",
    cons: "可能在小回调被打掉, 错过最高点",
    example: "$100 买, 涨到 $150 时止损上移到 $135 (-10%)",
    advice: "跟趋势必备. 趋势没破不动, 破了立刻出",
  },
  {
    type: "TAKE",
    name: "比例止盈 (分批)",
    icon: "📐",
    color: "#5a9a8a",
    rule: "+30% 减 1/3, +60% 再减 1/3, 剩 1/3 保命",
    when: "适合大多数情况",
    pros: "降低后悔, 既享受上涨又锁部分利润",
    cons: "可能在主升浪只赚一部分",
    example: "$100 买 300 股. $130 卖 100, $160 卖 100, 余 100 拿到底",
    advice: "克制贪婪 + 容许下跌 的最优解",
  },
  {
    type: "TAKE",
    name: "估值过热止盈",
    icon: "🌋",
    color: "#FF9F40",
    rule: "PE/PS 突破历史 90 分位 → 减仓",
    when: "成长股 / 估值切换股",
    pros: "估值理性回归时少受伤",
    cons: "牛市可能过早出, 比如 NVDA 一直贵也一直涨",
    example: "PLTR PE 200+ 已是历史最高, 触发 50% 减仓",
    advice: "估值过热 ≠ 立刻跌, 但风险报酬不对称, 该 trim",
  },
  {
    type: "TAKE",
    name: "抛物线顶部止盈",
    icon: "🚀",
    color: "#FF6B6B",
    rule: "30 日涨幅 > 50% + 距 MA20 乖离 > 30% → 减半",
    when: "热门题材 / 周期股喷发末端 / Meme 股",
    pros: "抓住非理性顶部, 避免回吐",
    cons: "可能错过最后一段疯涨",
    example: "DRAM ETF 1 月 +63%, 距 MA20 +34%, 单日 +13% → 减半锁本",
    advice: "抛物线 = 最后冲刺. 量价背离 + 长上影 = 出场信号. 不卖等于零和游戏",
  },
  {
    type: "TAKE",
    name: "周期股顶部止盈 (MA200 乖离)",
    icon: "🌋",
    color: "#FF8C42",
    rule: "周期股距 MA200 乖离 > 80% → 减仓; > 120% → 清仓",
    when: "周期股 (DRAM/钢铁/航运/煤炭/油气)",
    pros: "周期顶逃顶利器, 历史回测胜率 > 80%",
    cons: "需要识别周期股, 成长股不适用",
    example: "MU $746 距 MA200 $290 = +157% 乖离 → 周期顶部嫌疑极高",
    advice: "周期股不能拿 PE 估值 (顶 PE 低, 底 PE 高反指标). 用乖离 + 库存 + 价格",
  },
  {
    type: "STOP",
    name: "Chandelier Exit (吊灯止损)",
    icon: "🕯",
    color: "#E8C97A",
    rule: "趋势中: 最高价 - 3 × ATR(22) 为止损位, 上涨时上移",
    when: "趋势跟随 / 持有 1-6 月的中线单",
    pros: "随趋势上移, 锁定利润不被甩下车",
    cons: "震荡市容易被打掉",
    example: "NVDA 持仓: 22 日新高 $140, ATR $5 → 止损 $125; 涨到 $150 → 止损 $135",
    advice: "趋势中线神器. 止损只升不降, 自动锁利",
  },
  {
    type: "STOP",
    name: "时间止损",
    icon: "⏰",
    color: "#8A9A7A",
    rule: "持仓 N 周 (默认 4-8 周) 未达预期 → 平仓",
    when: "事件驱动单 / 财报预期单 / 短中期波段",
    pros: "避免'死扛', 释放机会成本",
    cons: "可能在反转前一刻砍掉",
    example: "财报前买, 财报后 2 周未涨 = 预期落空, 平仓",
    advice: "时间也是成本. 一只股 3 个月不涨 = 机会成本输给指数",
  },
  {
    type: "STOP",
    name: "心理止损 (失眠线)",
    icon: "😰",
    color: "#B8716A",
    rule: "浮亏到影响睡眠 / 焦虑工作 → 减半 或 清仓",
    when: "所有人 / 仓位过重信号",
    pros: "心态比账面更重要, 烂账不打扰生活",
    cons: "主观, 可能砍在底部",
    example: "持仓占总资产 30%, 一晚跌 -5% 失眠 = 仓位过重, 减到睡得着为止",
    advice: "如果一笔交易让你失眠, 不是市场错, 是仓位错. 减到舒服区间",
  },
  {
    type: "STOP",
    name: "波动率止损 (VIX 触发)",
    icon: "📡",
    color: "#9A8A8A",
    rule: "VIX 突破 30 → 风险资产减 50%; VIX > 40 → 减 80%",
    when: "宏观波动期 / 系统性风险来临",
    pros: "提前 1-3 日规避大跌",
    cons: "VIX 假突破时会过早离场",
    example: "2020-03 VIX 从 15 → 82, 触发 30 时清仓躲过最深 -34%",
    advice: "VIX 是市场情绪温度计, 不是市场预测器. 用作仓位调节器, 不是择时",
  },
  {
    type: "STOP",
    name: "形态破位止损",
    icon: "📉",
    color: "#FF6B6B",
    rule: "跌破关键形态颈线 / 趋势线 / 平台底 → 平仓",
    when: "技术派 / 形态交易 / 趋势末端",
    pros: "形态破位即结构破坏, 早出场早安心",
    cons: "假突破频繁, 需配合量能确认",
    example: "头肩顶颈线跌破 + 量放大 = 趋势结束, 立刻清",
    advice: "形态止损要等收盘确认 + 放量, 别被插针骗",
  },
  {
    type: "TAKE",
    name: "VWAP 锚定止盈",
    icon: "🎯",
    color: "#7AA88A",
    rule: "持仓回到买入时段 VWAP → 止盈或减半",
    when: "日内 / 短波段 / 量化",
    pros: "客观锚点, 不被情绪带走",
    cons: "趋势单中过早离场",
    example: "$100 买入, 当日 VWAP $98, 收盘 $103 → $103 是赚的, 跌回 $98 = 套牢预警",
    advice: "VWAP 是机构成本线. 跌破 = 机构套牢, 涨破 = 强势",
  },
  {
    type: "TAKE",
    name: "量价背离止盈",
    icon: "⚠",
    color: "#FFD86B",
    rule: "价格创新高 + 成交量不创新高 + RSI/MACD 顶背离 → 减仓",
    when: "趋势末端 / 顶部识别",
    pros: "提前 1-3 周预警, 避免高位站岗",
    cons: "背离可持续数月, 不能孤立用",
    example: "NVDA 2025-Q1 价创高 vs 量缩 30% + RSI 顶背离 → 减仓信号",
    advice: "顶背离需 2 次以上 + 形态确认, 单次背离常假信号",
  },
];

// ─── 投资大师 (10 位) ─────────────────────
const MASTERS = [
  {
    name: "Warren Buffett",
    cn: "沃伦·巴菲特",
    icon: "🐺",
    color: "#FFD86B",
    school: "价值投资 · Berkshire",
    track: "60 年年化 ~20% · $1 → $50,000",
    core: "买好公司 + 长期持有 + 安全边际",
    rules: [
      "Rule 1: 不要亏钱. Rule 2: 别忘记 Rule 1",
      "买股票就是买公司一部分",
      "在恐惧时贪婪, 在贪婪时恐惧",
      "护城河 + 简单生意 + 诚实管理层",
    ],
    framework: "护城河 (品牌/规模/网络效应) → 简单业务 → 诚实管理层 → 安全边际 → 永久持有",
    apply: "找你能理解的公司 (e.g. Apple/Coca-Cola), 等估值便宜时买, 长期持有不动",
    quote: "If you aren't willing to own a stock for 10 years, don't even think about owning it for 10 minutes.",
    case: "1988 重仓 Coca-Cola: PE 15, 30 年持有 + 分红再投资 = 涨 30+ 倍",
  },
  {
    name: "Peter Lynch",
    cn: "彼得·林奇",
    icon: "🔍",
    color: "#7AE8A0",
    school: "成长股 · Fidelity Magellan",
    track: "13 年年化 29% · $20M → $14B",
    core: "买你了解的, 看你身边的",
    rules: [
      "投资你了解的 (Invest in what you know)",
      "Tenbagger (10 倍股) 来自小公司",
      "PEG < 1 = 估值合理",
      "牛市 4 阶段: 否认 → 接受 → 兴奋 → 狂热 (狂热时出)",
    ],
    framework: "1) 你能否一句话说清业务 2) 是否在你日常生活里 3) PEG < 1 4) 公司规模还能翻多少倍",
    apply: "看你日常买的产品/用的服务 (Costco/Visa/迪士尼), 检查 PEG, 判断成长空间",
    quote: "The person that turns over the most rocks wins the game.",
    case: "1980s 投 Hanes 内衣 (来自他妻子建议) = 6 倍, Dunkin' Donuts = 25 倍",
  },
  {
    name: "George Soros",
    cn: "乔治·索罗斯",
    icon: "🌪",
    color: "#FF6B6B",
    school: "宏观对冲 · Quantum Fund",
    track: "30 年年化 26% · 1992 做空英镑赚 $1B",
    core: "反身性 (Reflexivity) + 大规模杠杆 + 押大趋势",
    rules: [
      "市场不是有效的, 是参与者预期反过来塑造现实",
      "判断错就立刻平仓, 不重不轻",
      "我赚钱不是靠对的多, 是错时亏得少",
      "找泡沫的早期, 跟到顶, 然后做空",
    ],
    framework: "1) 找有反身性循环的市场 2) 押方向 + 大杠杆 3) 错时立刻砍 4) 对时加注",
    apply: "宏观: 看货币/利率/政策大转折点; 微观: 找市场认知错位的公司",
    quote: "It's not whether you're right or wrong, but how much you make when right and how much you lose when wrong.",
    case: "1992 做空英镑: 押英镑无法守 ERM, 一周赚 $10 亿, 'Black Wednesday'",
  },
  {
    name: "Ray Dalio",
    cn: "瑞·达利欧",
    icon: "⚖",
    color: "#5a8aa6",
    school: "全天候 · Bridgewater",
    track: "40 年最大对冲基金, 全天候组合",
    core: "理解经济周期 + 风险平价 + 多元化",
    rules: [
      "理解短/长债务周期, 你才知道现在哪",
      "不要押单一情景, 4 种环境都准备",
      "Pain + Reflection = Progress",
      "Truth and radical transparency",
    ],
    framework: "全天候组合: 30% 股 / 40% 长债 / 15% 中债 / 7.5% 黄金 / 7.5% 商品 → 任何宏观环境都不崩",
    apply: "建议散户: 不押大趋势, 用风险平价分散; 关注 Fed 利率周期 + 信用周期",
    quote: "He who lives by the crystal ball will eat shattered glass.",
    case: "全天候组合 2008 跌幅仅 -3% (vs SPX -38%), 40 年最大回撤可控",
  },
  {
    name: "Howard Marks",
    cn: "霍华德·马克斯",
    icon: "🎯",
    color: "#7AA88A",
    school: "二阶思维 · Oaktree",
    track: "Distressed Debt 之王, 2008/2020 抓底",
    core: "二阶思维 + 钟摆理论 + 估值锚",
    rules: [
      "市场永远在乐观-悲观钟摆中, 中点很难, 极端容易识别",
      "二阶思维: 别人都看到的, 价格已反映",
      "好公司不等于好投资 (取决于价格)",
      "赔率比胜率更重要",
    ],
    framework: "1) 现在情绪在钟摆哪? 2) 价格 vs 价值差距? 3) 二阶: 别人没看到什么? 4) 赔率多少倍?",
    apply: "VIX > 35 / 散户极度恐慌时建仓; F&G > 80 时降仓",
    quote: "You can't predict, you can prepare.",
    case: "2008 金融危机抄底高收益债, 3 年赚 4 倍 + 赢得行业声誉",
  },
  {
    name: "Stanley Druckenmiller",
    cn: "斯坦利·德鲁肯米勒",
    icon: "⚡",
    color: "#C89060",
    school: "宏观对冲 · Duquesne",
    track: "30 年年化 30%+ 无亏损年",
    core: "押大不押多 + 对时立刻加注",
    rules: [
      "找一年里 1-2 个最确定的机会, 押 50% 仓",
      "对时加杠杆, 错时立刻砍",
      "宏观先看货币政策, 再看流动性",
      "投资里 80% 利润来自 5% 决定",
    ],
    framework: "1) Fed/央行行动 → 流动性方向 2) 找贝塔大的资产 3) 押大仓 4) 错就跑",
    apply: "看 Fed 利率拐点 → 押科技/小盘/黄金, 等大方向不变就持有",
    quote: "Put all your eggs in one basket and watch that basket carefully.",
    case: "1992 跟索罗斯一起做空英镑; 2020 抓黄金 + 大科技反弹",
  },
  {
    name: "Charlie Munger",
    cn: "查理·芒格",
    icon: "🧠",
    color: "#5A7D8A",
    school: "多元思维 · Berkshire 副手",
    track: "100 岁仍在投资, 巴菲特最重要伙伴",
    core: "多元思维 + 反向思考 + 等大机会",
    rules: [
      "Invert, always invert (反向思考)",
      "等待 fat pitch 机会, 1 年 1-2 次足够",
      "多学不同学科 (心理/物理/经济/进化)",
      "知道自己的能力圈, 圈外不动",
    ],
    framework: "1) 这个机会会怎么失败? 2) 我能力圈内吗? 3) 等极端便宜 4) 上才决定性仓位",
    apply: "建立 mental model 库 (机会成本/激励/复利/反身性...), 等极端机会才出手",
    quote: "The big money is not in the buying or selling, but in the waiting.",
    case: "推荐巴菲特从'格雷厄姆便宜'转向'好公司合理价' (Coca-Cola/See's Candies)",
  },
  {
    name: "Michael Burry",
    cn: "迈克尔·伯里",
    icon: "🩺",
    color: "#3a4a5a",
    school: "深度价值 · 反向 · Scion",
    track: "做空 2008 房贷成名, 后多次抓底/做空",
    core: "极度独立思考 + 数据狂 + 逆向押注",
    rules: [
      "看一手数据, 不信媒体叙事",
      "找泡沫早期 (普通人没察觉时)",
      "做空要忍受巨大账面亏损 + 心理压力",
      "不报告, 不解释, 让仓位说话",
    ],
    framework: "1) 找疯狂叙事 (e.g. AI/SaaS/房贷) 2) 翻一手数据 3) 押反向 4) 忍",
    apply: "适合时间多 + 心理强者. 散户慎学, 做空成本极高",
    quote: "What I learned in medicine — diagnose before you treat.",
    case: "2005-2007 做空次贷 CDS, 大空头 (The Big Short) 原型, 单笔赚 $1B",
  },
  {
    name: "James Simons",
    cn: "詹姆斯·西蒙斯",
    icon: "🧮",
    color: "#9a8aa0",
    school: "量化 · Renaissance Medallion",
    track: "30 年年化 66% (扣费前)",
    core: "数学 + 量化 + 高频 + 隐藏一切",
    rules: [
      "找市场无效率, 但只持有几小时-几天",
      "完全靠数据, 不预测, 只统计",
      "组合内 100,000+ 信号, 单一不重要",
      "永远不解释方法",
    ],
    framework: "市场短期可预测 (秒-小时), 长期不可. 用统计找微小但持续的偏差",
    apply: "散户难复制 (需要 PhD + 数据基础设施). 但启示: 不靠主观, 靠统计回测",
    quote: "I don't know why the planets orbit the sun.",
    case: "Medallion Fund 1988-2018 年化 66% (扣费), 史上最强对冲基金",
  },
  {
    name: "Nassim Taleb",
    cn: "纳西姆·塔勒布",
    icon: "🎲",
    color: "#7a5a8a",
    school: "黑天鹅 · 反脆弱",
    track: "做空波动率, 2020 黑天鹅赚 4000%",
    core: "黑天鹅 + 反脆弱 + 不可预测的风险",
    rules: [
      "重要的事情都是黑天鹅 (你预测不了)",
      "不要 maximize 期望收益, 要 minimize 灾难损失",
      "Skin in the game (不参与不发言)",
      "Barbell 策略: 90% 极端安全 + 10% 极端冒险",
    ],
    framework: "Barbell: 90% 国债现金 + 10% 期权 / 比特币 / 早期投资",
    apply: "建议散户: 大部分钱稳健 (国债/SPY), 少量博大 (期权/单押)",
    quote: "The fragile wants tranquility, the antifragile grows from disorder.",
    case: "2020 疫情前买 VIX 期权, 一笔赚 4000%; 但平时 95% 时间都在亏小钱",
  },
  {
    name: "Stanley Druckenmiller",
    cn: "斯坦利·德鲁肯米勒",
    icon: "🌐",
    color: "#7AA88A",
    school: "宏观对冲 · Duquesne",
    track: "30 年年化 30% 无亏损年, 索罗斯量子基金合伙人",
    core: "宏观判断 + 集中下注 + 错了快撤",
    rules: [
      "Bet big when you have edge",
      "It's not whether you're right, it's how much you make when right vs lose when wrong",
      "Liquidity drives markets, not fundamentals",
      "Currency / commodities / rates 比单股更可控",
    ],
    framework: "宏观大画面 (利率+流动性+周期) → 找最大错位 → 集中重仓 → 跟趋势",
    apply: "散户: 用 ETF (SPY/TLT/GLD/DXY) 表达宏观观点; 加息周期减股票; 降息加成长",
    quote: "Soros taught me when you have tremendous conviction, you have to go for the jugular.",
    case: "1992 跟索罗斯做空英镑赚 10 亿; 2020 预测通胀 + 加息, 2022 完美避雷",
  },
  {
    name: "Bill Ackman",
    cn: "比尔·阿克曼",
    icon: "🎯",
    color: "#FF6B6B",
    school: "激进投资 · Pershing Square",
    track: "20 年年化 17%, 集中持仓 + 上电视影响公司",
    core: "深度研究 + 激进介入 + 概率定价",
    rules: [
      "买股票 = 买公司, 要么你能影响, 要么是好公司",
      "8-12 只重仓股最优, 别分散",
      "做空看模式 (Herbalife) + 做多看护城河",
      "Public position 是工具, 不是炫耀",
    ],
    framework: "深度尽调 → 集中重仓 → 公开 thesis → 推动管理层改变",
    apply: "散户: 学 Pershing 的 thesis 文档结构, 数据 + 风险 + 倒推估值",
    quote: "I look for businesses where I can predict the future.",
    case: "2020 用 $27M 期权对冲, 疫情中赚 $2.6B (100x); Chipotle 重仓 + 推改革",
  },
  {
    name: "Cathie Wood",
    cn: "凯西·伍德",
    icon: "🚀",
    color: "#FF8C42",
    school: "颠覆性创新 · ARK Invest",
    track: "ARKK 2020-21 翻 5x → 2022-23 -75%, 大起大落",
    core: "颠覆性创新主题 + 5 年时间维度 + 公开透明",
    rules: [
      "看 5 年, 不看 5 个月",
      "颠覆性创新有 S 曲线加速期",
      "5 大主题: AI / Robotics / 基因组 / Blockchain / 储能",
      "每日公开持仓 (transparency over performance)",
    ],
    framework: "S 曲线 + Wright's Law (成本下降曲线) → 选 leader + 5 年持有",
    apply: "散户: 谨慎跟单, ARK 重仓 = 大波动. 适合定投, 不适合一次重仓",
    quote: "If you don't go through pain, you don't get the gain.",
    case: "TSLA 2018 $40 重仓, 2021 $400 → 50x; 但 2022 ROKU/SQ/COIN -80% 拖累",
  },
  {
    name: "是川银藏",
    cn: "是川银藏",
    icon: "🌸",
    color: "#FFD86B",
    school: "日本股神 · 价值发掘",
    track: "1930-1990 60 年, 从破产到日本首富, 4 次破产 4 次重起",
    core: "事前调查 + 集中孤注 + 大局观",
    rules: [
      "投资三原则: 选择有发展性又价廉的; 集中; 调查直到不能怀疑",
      "乌龟主义: 慢慢爬, 不冒进",
      "5 看: 经营者 / 财务 / 业务 / 行业前景 / 股价位置",
      "看不懂的不买",
    ],
    framework: "实地调查 → 5 看分析 → 找'乌龟股'(被低估慢成长) → 集中持有",
    apply: "散户: 学'5 看'框架, 实地体验产品 / 服务 / 门店人流",
    quote: "投资的关键不是预测, 是充分调查后的判断.",
    case: "1980 重仓 Mitsubishi 金属 (铜价预判), 一只股赚 200 亿日元",
  },
  {
    name: "段永平",
    cn: "段永平",
    icon: "🏮",
    color: "#7AE8A0",
    school: "中国价值派 · 本分文化",
    track: "小霸王 + 步步高 + 投资 Apple/茅台/网易, 大智慧",
    core: "Stop doing list + 商业模式 + 本分",
    rules: [
      "做对的事 + 把事做对",
      "Stop Doing List 比 To Do List 重要",
      "看不懂不投, 投后不看",
      "买股票就是买公司一部分, 看 10 年",
    ],
    framework: "看不懂剔除 → 商业模式分析 → 本分 (诚信管理层) → 长期持有",
    apply: "散户: 列'不做清单'(不做空 / 不杠杆 / 不追热点 / 不预测短期)",
    quote: "本分就是不做不该做的事.",
    case: "2011 重仓 Apple $200 (拆股后 $14), 持有 10+ 年 → 现 $230+, 收益 16x",
  },
  {
    name: "邱国鹭",
    cn: "邱国鹭",
    icon: "🌅",
    color: "#7AA88A",
    school: "中国价值派 · 高毅资产",
    track: "南方基金 → 高毅资产, 中国老牌价值投资人",
    core: "便宜 + 好 + 跟随 (PE 合理 + 优质公司 + 趋势确认)",
    rules: [
      "好企业 / 好行业 / 好价格 三好原则",
      "估值是底, 业绩是天, 趋势是中间",
      "怀疑历史规律 = 输给市场",
      "成长股不便宜 + 价值股有理由 = 中间地带最好",
    ],
    framework: "三好筛选: 好行业 (寡头) + 好公司 (ROIC高) + 好价格 (PE 合理) → 集中持有",
    apply: "散户: 用 ROIC > 15% + PE < 30 + 行业 CR3 > 60% 三层过滤",
    quote: "投资就是用合理价格买入优质资产.",
    case: "2015-2017 重仓白酒 (茅台/五粮液), 三年翻 5 倍",
  },
  {
    name: "Howard Marks",
    cn: "霍华德·马克斯",
    icon: "🧠",
    color: "#E8C97A",
    school: "周期投资 · Oaktree",
    track: "40 年, AUM $200B, 周期判断 + 备忘录大师",
    core: "周期 + 钟摆 + 第二层思维",
    rules: [
      "第二层思维: 大家都看到的, 不是机会",
      "钟摆理论: 市场情绪在贪婪 / 恐惧极端间摆动",
      "周期总在重复, 但不一样",
      "We can't predict, but we can prepare",
    ],
    framework: "周期定位 (温度计) → 反向思考 → 找被错杀资产 → 安全边际",
    apply: "散户: 每月读 Oaktree memo, 用'市场温度计'(高/中/低) 调仓位",
    quote: "It's not what you buy, it's what you pay for it.",
    case: "2008 金融危机, Oaktree 360 亿现金抄底高收益债, 3 年翻倍",
  },
];

// ─── 经济学家 28 位 (8 大学派) ─────────────────────
const ECONOMISTS = [
  // 古典经济学 (4)
  { id:"E01", school:"古典", name:"亚当·斯密", en:"Adam Smith", year:"1723-1790", country:"🇬🇧", color:"#7AE8A0",
    core:"看不见的手 + 分工与劳动价值", quote:"我们的晚餐, 不来自屠夫善心, 而是他自身利益",
    book:"《国富论》(1776)", lesson:"市场通过价格信号自发协调资源, 投资就是参与这个协调系统" },
  { id:"E02", school:"古典", name:"大卫·李嘉图", en:"David Ricardo", year:"1772-1823", country:"🇬🇧", color:"#7AE8A0",
    core:"比较优势 + 地租理论", quote:"比绝对优势更重要的, 是比较优势",
    book:"《政治经济学及赋税原理》", lesson:"投资国际化要看比较优势; 哪些行业本国效率更高就买" },
  { id:"E03", school:"古典", name:"马尔萨斯", en:"Thomas Malthus", year:"1766-1834", country:"🇬🇧", color:"#7AE8A0",
    core:"人口论 + 有效需求不足", quote:"人口按几何增长, 食物按算术增长",
    book:"《人口论》(1798)", lesson:"周期性悲观论祖师, 教你警惕过度乐观与资源约束" },
  { id:"E04", school:"古典", name:"约翰·穆勒", en:"John Stuart Mill", year:"1806-1873", country:"🇬🇧", color:"#7AE8A0",
    core:"功利主义 + 自由市场 + 累进税", quote:"市场效率与社会正义并不冲突",
    book:"《政治经济学原理》", lesson:"资本主义需要矫正机制, 长期看政策友好行业更稳" },

  // 新古典 (3)
  { id:"E05", school:"新古典", name:"阿尔弗雷德·马歇尔", en:"Alfred Marshall", year:"1842-1924", country:"🇬🇧", color:"#5a8aa6",
    core:"供需均衡 + 边际效用 + 弹性", quote:"价格背后是供给与需求的剪刀",
    book:"《经济学原理》(1890)", lesson:"估值就是均衡点; 偏离均衡过远迟早回归" },
  { id:"E06", school:"新古典", name:"瓦尔拉斯", en:"Léon Walras", year:"1834-1910", country:"🇫🇷", color:"#5a8aa6",
    core:"一般均衡理论", quote:"所有市场相互关联, 同时清算",
    book:"《纯粹政治经济学要义》", lesson:"市场是连通器, 加息影响所有资产, 不要孤立看一只股" },
  { id:"E07", school:"新古典", name:"庞巴维克", en:"Eugen Böhm-Bawerk", year:"1851-1914", country:"🇦🇹", color:"#5a8aa6",
    core:"时间偏好 + 资本与利息", quote:"今天的 100 元比明年的 100 元更值钱",
    book:"《资本与利息》", lesson:"贴现率决定一切估值; 利率越高, 远期现金流越不值钱" },

  // 凯恩斯派 (3)
  { id:"E08", school:"凯恩斯派", name:"凯恩斯", en:"John Maynard Keynes", year:"1883-1946", country:"🇬🇧", color:"#FFD86B",
    core:"有效需求 + 货币政策 + 动物精神", quote:"市场保持非理性的时间, 可能比你能保持偿付能力的时间更长",
    book:"《通论》(1936)", lesson:"短期市场被情绪驱动 (动物精神), 不要 ALL IN 等理性回归" },
  { id:"E09", school:"凯恩斯派", name:"萨缪尔森", en:"Paul Samuelson", year:"1915-2009", country:"🇺🇸", color:"#FFD86B",
    core:"新古典综合 + 多次预测错误", quote:"经济学家预测了 9 次衰退中的 5 次",
    book:"《经济学》(教科书)", lesson:"宏观预测不可靠, 不要把宏观判断当投资唯一依据" },
  { id:"E10", school:"凯恩斯派", name:"明斯基", en:"Hyman Minsky", year:"1919-1996", country:"🇺🇸", color:"#FFD86B",
    core:"金融不稳定性假说 / Minsky Moment", quote:"稳定本身孕育不稳定",
    book:"《稳定不稳定经济》", lesson:"看似稳定时, 杠杆和投机暗中累积; 2008 危机的预言者" },

  // 货币派 (2)
  { id:"E11", school:"货币派", name:"米尔顿·弗里德曼", en:"Milton Friedman", year:"1912-2006", country:"🇺🇸", color:"#FF6B6B",
    core:"货币主义 + 自由市场 + 永久收入", quote:"通胀始终是、并且无处不是货币现象",
    book:"《美国货币史》", lesson:"看 M2 + 央行流动性比看 PE 更靠前; 流动性退潮股权先跌" },
  { id:"E12", school:"货币派", name:"卢卡斯", en:"Robert Lucas", year:"1937-2023", country:"🇺🇸", color:"#FF6B6B",
    core:"理性预期 + 卢卡斯批判", quote:"政策只在被预期外时才有效",
    book:"《理性预期》", lesson:"市场会预演政策, Fed 决议时通常 'Buy the rumor, sell the news'" },

  // 奥地利学派 (3)
  { id:"E13", school:"奥地利", name:"哈耶克", en:"Friedrich Hayek", year:"1899-1992", country:"🇦🇹", color:"#C89060",
    core:"价格是分散知识的汇总 + 反计划经济", quote:"价格能容纳无数人的局部信息",
    book:"《通往奴役之路》", lesson:"市场比专家聪明 (集体智慧); 但要识别价格扭曲点" },
  { id:"E14", school:"奥地利", name:"米塞斯", en:"Ludwig von Mises", year:"1881-1973", country:"🇦🇹", color:"#C89060",
    core:"人之行动学 + 反通胀 + 商业周期", quote:"信用扩张总会以萧条告终",
    book:"《人的行动》", lesson:"超低利率制造泡沫, 加息周期触发泡沫破裂. 周期不可避免" },
  { id:"E15", school:"奥地利", name:"罗斯巴德", en:"Murray Rothbard", year:"1926-1995", country:"🇺🇸", color:"#C89060",
    core:"完全自由市场 + 黄金本位 + 反央行", quote:"央行制造的衰退比解决的多",
    book:"《美国大萧条》", lesson:"看政府干预的副作用 — 救市常埋更大隐患" },

  // 创新理论 (1)
  { id:"E16", school:"创新", name:"约瑟夫·熊彼特", en:"Joseph Schumpeter", year:"1883-1950", country:"🇦🇹", color:"#9a8aa0",
    core:"创造性破坏 + 企业家精神 + 长波周期", quote:"创新会创造新秩序, 也会摧毁旧秩序",
    book:"《资本主义、社会主义与民主》", lesson:"投资未来 = 找下一个能破坏现有秩序的公司 (NVDA / TSLA)" },

  // 公共选择 / 制度 (2)
  { id:"E17", school:"制度", name:"科斯", en:"Ronald Coase", year:"1910-2013", country:"🇬🇧", color:"#7AA88A",
    core:"交易成本 + 企业边界 + 产权理论", quote:"企业存在是因为市场交易成本太高",
    book:"《企业的性质》", lesson:"垄断 / 网络效应公司护城河深 (e.g. GOOGL/META) 因为客户切换成本高" },
  { id:"E18", school:"制度", name:"诺斯", en:"Douglass North", year:"1920-2015", country:"🇺🇸", color:"#7AA88A",
    core:"制度变迁 + 路径依赖", quote:"制度决定长期增长, 不是资源",
    book:"《制度、制度变迁与经济绩效》", lesson:"看国家投资先看制度质量; 制度恶化的国家股权风险陡升" },

  // 博弈论 (2)
  { id:"E19", school:"博弈论", name:"约翰·纳什", en:"John Nash", year:"1928-2015", country:"🇺🇸", color:"#5a7d8a",
    core:"纳什均衡 + 非合作博弈", quote:"每个玩家都做出最优反应, 没人有动力改变",
    book:"《非合作博弈论》", lesson:"市场参与者博弈, 不要试图打败大资金, 找他们没注意的角落" },
  { id:"E20", school:"博弈论", name:"托马斯·谢林", en:"Thomas Schelling", year:"1921-2016", country:"🇺🇸", color:"#5a7d8a",
    core:"冲突的策略 + 聚焦点 + 可信威胁", quote:"理性的疯子比理性的清醒人更有威慑力",
    book:"《冲突的战略》", lesson:"贸易战 / 加息预期管理本质是博弈, 看央行的'承诺可信度'" },

  // 行为经济 (3)
  { id:"E21", school:"行为", name:"丹尼尔·卡尼曼", en:"Daniel Kahneman", year:"1934-2024", country:"🇮🇱", color:"#FF9F40",
    core:"系统 1 vs 系统 2 + 损失厌恶 + 锚定", quote:"亏 100 的痛 > 赚 100 的乐 (2.5x)",
    book:"《思考, 快与慢》", lesson:"自己最大的对手是自己的心理; 写下决策避免快思考冲动" },
  { id:"E22", school:"行为", name:"理查德·泰勒", en:"Richard Thaler", year:"1945-", country:"🇺🇸", color:"#FF9F40",
    core:"心理账户 + 助推 + 禀赋效应", quote:"人不是完全理性, 但行为可预测",
    book:"《助推》《错误行为》", lesson:"散户系统性犯错 = 长期 alpha 来源; 反人性才能赚钱" },
  { id:"E23", school:"行为", name:"罗伯特·席勒", en:"Robert Shiller", year:"1946-", country:"🇺🇸", color:"#FF9F40",
    core:"非理性繁荣 + CAPE / Shiller PE", quote:"市场叙事比基本面更能解释波动",
    book:"《非理性繁荣》", lesson:"CAPE > 30 历史是大顶警告; 警惕叙事股 (.com / SaaS / AI)" },

  // 增长理论 (2)
  { id:"E24", school:"增长", name:"罗伯特·索洛", en:"Robert Solow", year:"1924-2023", country:"🇺🇸", color:"#5a9a8a",
    core:"增长模型 + 技术进步是长期动力", quote:"长期增长 80% 来自技术进步, 不是资本积累",
    book:"《增长理论》", lesson:"长期投资科技股 > 重资产; 复利来自技术杠杆" },
  { id:"E25", school:"增长", name:"保罗·罗默", en:"Paul Romer", year:"1955-", country:"🇺🇸", color:"#5a9a8a",
    core:"内生增长 + 知识非竞争性", quote:"知识是唯一可以无限复制的资产",
    book:"《内生增长理论》", lesson:"软件 / IP / 算法公司利润可无限扩展 (e.g. Microsoft/Adobe)" },

  // 人力资本 (1)
  { id:"E26", school:"人力", name:"加里·贝克尔", en:"Gary Becker", year:"1930-2014", country:"🇺🇸", color:"#a89060",
    core:"人力资本 + 经济学帝国主义", quote:"教育是回报最高的投资, 平均年化 10-15%",
    book:"《人力资本》", lesson:"投资自己 (技能/认知) 比投资股票更复利; 提升自己 → 决策更准" },

  // 不确定性 / 风险 (2)
  { id:"E27", school:"风险", name:"弗兰克·奈特", en:"Frank Knight", year:"1885-1972", country:"🇺🇸", color:"#7a5a8a",
    core:"风险 vs 不确定性 (可计算 vs 不可)", quote:"利润来自承担真正不确定性",
    book:"《风险, 不确定性和利润》", lesson:"风险 (VaR/Beta) 可定价, 真不确定性 (黑天鹅) 不能; 留缓冲" },
  { id:"E28", school:"风险", name:"塔勒布", en:"Nassim Taleb", year:"1960-", country:"🇱🇧", color:"#7a5a8a",
    core:"黑天鹅 + 反脆弱 + 杠铃策略", quote:"重要的事情都是黑天鹅, 你预测不了",
    book:"《黑天鹅》《反脆弱》", lesson:"90% 极端安全 (国债/SPY) + 10% 极端冒险 (期权/早期); 拒绝中间地带" },
];

// ─── VC 投资心得 (8 家) ─────────────────────
const VCS = [
  {
    name: "Sequoia Capital",
    cn: "红杉资本",
    icon: "🌲",
    color: "#7AE8A0",
    track: "60 年, 投出 Apple/Google/Cisco/WhatsApp/Stripe",
    motto: "We help the daring build legendary companies",
    framework: [
      "市场要 'Why Now' — 为什么现在能成?",
      "团队 80% / 想法 20%",
      "找'被低估的天才创始人'",
      "投后给极度的支持 + 老兵网络",
    ],
    metric: "TAM > $10B + 年增 > 50% + 创始人有'非线性思维'",
    apply: "二级市场: 看 SaaS / AI / 半导体行业的 'Why now' 时机 + 创始人质量",
    case: "1999 投 Google $12.5M, 后值 $200B; 2010 投 WhatsApp $8M 占 30%, 卖 Facebook 赚 $3B",
    quote: "The biggest risk is not taking any risk.",
  },
  {
    name: "Andreessen Horowitz",
    cn: "a16z",
    icon: "🚀",
    color: "#FF6B6B",
    track: "2009 创立, AUM $35B, 投 Facebook/Coinbase/Airbnb/OpenAI",
    motto: "Software is eating the world",
    framework: [
      "找'范式转变'(crypto/AI/biotech)",
      "创始人 + 市场 + 时机",
      "强 brand 的 VC 能 attract 最强 founder",
      "敢投争议性大的事 (crypto/web3/AI 早期)",
    ],
    metric: "颠覆性创新 / 强创始人 / 大市场 / 网络效应早期信号",
    apply: "二级市场: 关注 'a16z 在投什么' (反向看 hype) + 看 portfolio companies 上市后表现",
    case: "2010 投 Skype 老团队的 Facebook (1B 估值, 现 1T+), 2013 投 Coinbase ($25M, 后 $50B)",
    quote: "Strong opinions, loosely held.",
  },
  {
    name: "Founders Fund",
    cn: "创始人基金",
    icon: "🛸",
    color: "#3a3a4a",
    track: "Peter Thiel 创立, 投 SpaceX/Palantir/Stripe/Airbnb",
    motto: "We invest in flying cars, not 140 characters",
    framework: [
      "投'敢做大事'的创始人 (Musk/Thiel 派)",
      "反共识投资 — 别人不投的我投",
      "技术驱动 + 改变世界",
      "Power Law: 最好的 1 项投资 > 其他 99 项总和",
    ],
    metric: "颠覆性技术 / 创始人极度坚定 / 长期愿景 (10+ 年)",
    apply: "二级: 看 SpaceX/Palantir/Anduril 等 deep tech 公司的 IPO 节奏",
    case: "2008 投 SpaceX $20M, 现持仓估值 $30B+; PLTR 早期投资 → IPO 后大赚",
    quote: "Show me your friends and I'll show you your future.",
  },
  {
    name: "Y Combinator",
    cn: "YC 加速器",
    icon: "🌱",
    color: "#FFD86B",
    track: "2005 起孵 4000+ 公司 (Airbnb/Stripe/Reddit/Coinbase/OpenAI)",
    motto: "Make something people want",
    framework: [
      "Make something people want (核心)",
      "Talk to users, build, repeat",
      "Default Alive vs Default Dead",
      "Founder market fit > product market fit",
    ],
    metric: "周增长 5-7% + 用户留存 + 创始人执行力",
    apply: "二级: 关注 YC 校友公司 IPO (Airbnb/Coinbase/Stripe IPO 时机)",
    case: "2009 投 Airbnb 7%, 2020 IPO 时持仓值 $3B+; OpenAI 早期支持 → 现 $300B+",
    quote: "Default Dead vs Default Alive — which are you?",
  },
  {
    name: "Tiger Global",
    cn: "老虎环球",
    icon: "🐯",
    color: "#FF9F40",
    track: "对冲 + 跨阶段, 2020-21 大举投后期 SaaS/中国互联网",
    motto: "Move fast, big checks",
    framework: [
      "速度 > 价格 (term sheet 24h 内出)",
      "大估值大票, 跨二级市场和私募",
      "数据驱动 + DCF 估值",
      "2022 收缩, 现回归审慎",
    ],
    metric: "市占率 / 收入增速 / 单元经济 / 资本效率",
    apply: "二级: Tiger 持仓 13F 文件可看, 它进出某只股票是信号",
    case: "2010 投 JD.com (后 IPO 涨 6 倍); 2020-21 SaaS 高估值买入后多数受伤",
    quote: "Speed is a strategy.",
  },
  {
    name: "Benchmark",
    cn: "Benchmark",
    icon: "⛰",
    color: "#5a8aa6",
    track: "5 个合伙人结构, 投 Uber/Twitter/eBay/Snapchat",
    motto: "Equal partners, smaller funds",
    framework: [
      "5 人合伙, 共享 carry, 长期主义",
      "小基金, 不追求规模, 追求 IRR",
      "深度参与每个 portfolio (董事会)",
      "不追热点, 押 conviction",
    ],
    metric: "市场垄断潜力 + 网络效应 + 团队",
    apply: "看 Benchmark 持仓 (Slack/Twitter/Snap), 学他们 conviction 思路",
    case: "Bill Gurley 投 Uber 早期 (Series A $11M), 后值 $7B+",
    quote: "We don't write small checks for big winners.",
  },
  {
    name: "Lightspeed",
    cn: "光速",
    icon: "💡",
    color: "#7AE8A0",
    track: "投 Snap/Affirm/Mulesoft, 全球化 (中/印/以)",
    motto: "Catalyzing what's next",
    framework: [
      "全球视野 (中印以美 4 大市场)",
      "看产品市场契合 + 增长曲线",
      "B2B SaaS 老兵 + 新消费",
      "进入和退出节奏精准",
    ],
    metric: "ARR 增速 / Net Retention / CAC payback",
    apply: "看 SaaS 公司的 NRR (净留存率), 留存 > 110% 是健康",
    case: "Snap A 轮 $13M, IPO 后值 $20B+",
    quote: "Find the right founder, then get out of the way.",
  },
  {
    name: "Greylock Partners",
    cn: "Greylock",
    icon: "🪨",
    color: "#9A8A8A",
    track: "1965 起, 投 LinkedIn/Workday/Airbnb/Roblox",
    motto: "Investing in entrepreneurs since 1965",
    framework: [
      "60 年品牌 + 长期关系网络",
      "BSI: Big idea, Strong team, Inflection point",
      "B2B 重点 (Workday/Palo Alto Networks)",
      "Reid Hoffman 等 thought leadership",
    ],
    metric: "市场 inflection / 团队网络 / 技术深度",
    apply: "二级: B2B 软件投资可参考 Greylock 派系 portfolio",
    case: "LinkedIn 早期 ($1.3M Series A, IPO 时值 $9B); Workday 早期",
    quote: "Bet on the inflection, not the trend.",
  },
  {
    name: "Founders Fund",
    cn: "Founders Fund",
    icon: "🔮",
    color: "#FF6B6B",
    track: "Peter Thiel 2005 创立, 投 Facebook/Palantir/SpaceX/Stripe",
    motto: "We wanted flying cars, instead we got 140 characters",
    framework: [
      "找'反共识 + 对的' (Zero to One)",
      "垄断 > 竞争, 创新 = 创造垄断",
      "Founder 类型 = 不和谐的天才",
      "投长期 (10+ 年), 拒绝短线",
    ],
    metric: "技术 10x 优势 / 垄断地位可能 / 创始人 + 团队叛逆度",
    apply: "二级: 找'被市场误解'的科技垄断股 (Palantir/SpaceX 系)",
    case: "2004 Facebook 早期 $500K → $1B (2000x); SpaceX 早期; Palantir 早期",
    quote: "Competition is for losers.",
  },
  {
    name: "Tiger Global",
    cn: "老虎全球",
    icon: "🐯",
    color: "#FF8C42",
    track: "2001 起, AUM $90B, 全球互联网 + AI 早期最激进玩家",
    motto: "Move fast and price aggressive",
    framework: [
      "快速 DD + 高估值入场 (1 周决定 1 亿)",
      "全球互联网映射 (US 模式 → 中国/印度/巴西)",
      "成长期 + IPO 前重仓",
      "Crossover 二级一级模糊",
    ],
    metric: "可复制商业模式 + 大市场 + 增长 100%+",
    apply: "二级: 关注 Tiger portfolio (Stripe/ByteDance/Coinbase), pre-IPO 信号",
    case: "Flipkart (印度电商) 早期 → 卖 Walmart 赚 $4B; JD/Pinduoduo 早期重仓",
    quote: "Speed kills, in a good way for investors.",
  },
  {
    name: "Coatue Management",
    cn: "Coatue",
    icon: "🪙",
    color: "#7AA88A",
    track: "1999 创立, AUM $50B, Tiger 系, 跨一二级 + 公开市场",
    motto: "Data-driven + long-term",
    framework: [
      "数据科学家团队做基本面建模",
      "公开市场 + 私募 + crossover 一体",
      "AI / SaaS / 半导体 / 消费互联网 重点",
      "团队全球分布 (硅谷 + 纽约 + 香港 + 北京)",
    ],
    metric: "TAM > $10B + 龙头 + 长期复利 + 数据可建模",
    apply: "二级: 关注 Coatue 13F 持仓, AI / SaaS 主线参考",
    case: "Snowflake 早期 + IPO 后持仓; 字节早期 + 中后期; 2024 增持 NVDA / META",
    quote: "We invest in the future, not the past.",
  },
  {
    name: "Lightspeed Venture Partners",
    cn: "Lightspeed",
    icon: "⚡",
    color: "#FFD86B",
    track: "2000 创立, AUM $30B, 投 Snap/Affirm/Carta/Mistral",
    motto: "Backing the bold from day one",
    framework: [
      "全球化基金 (US + 印度 + 以色列 + 中国)",
      "种子 + 早期为主",
      "企业软件 + 消费 + 边界技术",
      "投人 + 投赛道 + 投时机",
    ],
    metric: "Founder 韧性 + 市场 timing + 早期增长信号",
    apply: "二级: 关注 Lightspeed portfolio IPO 节奏",
    case: "Snap 早期 (Snapchat $480M IPO); Mistral AI (法国 LLM); Carta 早期",
    quote: "Investing is a leap of faith into the impossible.",
  },
  {
    name: "Bessemer Venture Partners",
    cn: "贝塞默",
    icon: "🏺",
    color: "#7AE8A0",
    track: "1911 创立 (100+ 年), AUM $20B, 投 Pinterest/LinkedIn/Yelp",
    motto: "The Roadmap (公开 SaaS 投资框架)",
    framework: [
      "BVP Nasdaq Emerging Cloud Index (SaaS 指数)",
      "10 大 SaaS 法则 (Magic Number/CAC/NRR/Rule of 40)",
      "全球 + 长期 + 公开 thesis",
      "Anti-Portfolio 公开记录错过的项目",
    ],
    metric: "SaaS 指标全套 + 市场 + 团队",
    apply: "二级: BVP Nasdaq Emerging Cloud Index 是 SaaS 风向标",
    case: "LinkedIn 早期; Pinterest 早期; Shopify 早期",
    quote: "If at first you don't succeed, fail like Bessemer.",
  },
  {
    name: "General Catalyst",
    cn: "General Catalyst",
    icon: "🌊",
    color: "#9A8A8A",
    track: "2000 创立, AUM $25B, 投 Stripe/Snap/Airbnb/HubSpot",
    motto: "Investing in resilient companies",
    framework: [
      "全 stage (种子 → 增长期)",
      "Health / 商业 / 创业者赋能",
      "GC Health Assurance (医疗主题基金)",
      "Long-term 公司 + 不烧钱",
    ],
    metric: "韧性 + 长期 + 创业者支持网络",
    apply: "二级: GC 持仓 Stripe / Snap / HubSpot 长期跟踪",
    case: "Stripe 早期 ($20M 估值); Snap 早期; HubSpot 早期",
    quote: "Build resilient companies for the long term.",
  },
  {
    name: "Index Ventures",
    cn: "Index Ventures",
    icon: "📑",
    color: "#FF6B6B",
    track: "1996 创立 (欧洲起源), AUM $15B, 投 Skype/Dropbox/Discord/Roblox",
    motto: "Backing exceptional founders",
    framework: [
      "欧洲 + 美国双总部",
      "种子 + 早期为主",
      "Discord / Roblox 等消费互联网",
      "Founder 关系驱动 (long-term)",
    ],
    metric: "Founder 质量 + 全球市场 + 长期愿景",
    apply: "二级: Index portfolio 美股 IPO 列表参考",
    case: "Discord 早期; Roblox 早期; Dropbox 早期",
    quote: "We invest in entrepreneurs, not industries.",
  },
];

// 案例价格走势 mini SVG (按 ticker 配)
function caseChart(tk, color) {
  const charts = {
    AAPL: "M10 95 L40 80 L70 70 L100 55 L130 40 L160 32 L190 25 L220 20 L250 22 L280 18 L310 15 L340 12",
    NVDA: "M10 100 L50 92 L90 88 L130 70 L170 75 L210 50 L250 30 L290 22 L330 12",
    TSLA: "M10 92 L40 85 L70 50 L100 20 L130 25 L160 35 L190 75 L220 65 L250 70 L280 55 L310 45 L340 40",
    GOOGL: "M10 95 L40 90 L70 70 L100 55 L130 50 L160 45 L190 40 L220 35 L250 30 L280 25 L310 22 L340 18",
    PLTR: "M10 90 L30 70 L50 25 L70 35 L90 60 L110 85 L130 92 L150 88 L170 80 L190 75 L210 65 L230 50 L250 35 L270 25 L290 18 L310 12 L340 8",
    MU: "M10 80 L40 60 L70 35 L100 50 L130 75 L160 90 L190 70 L220 50 L250 65 L280 75 L310 50 L340 30",
    BABA: "M10 50 L40 30 L70 20 L100 30 L130 55 L160 80 L190 95 L220 90 L250 75 L280 60 L310 50 L340 45",
    AMZN: "M10 99 L40 96 L70 92 L100 85 L130 75 L160 70 L190 60 L220 50 L250 38 L280 28 L310 18 L340 12",
    ENRON: "M10 60 L50 50 L90 35 L130 25 L170 30 L200 50 L230 75 L260 95 L290 105 L320 108 L340 109",
    LEH: "M10 50 L50 40 L90 30 L130 35 L170 50 L200 70 L230 88 L260 100 L290 108 L320 109 L340 109",
    WE: "M10 50 L40 30 L70 20 L100 35 L130 50 L160 70 L190 85 L220 95 L250 100 L280 105 L310 108 L340 110",
    ARKK: "M10 60 L40 40 L70 25 L100 18 L130 22 L160 40 L190 65 L220 85 L250 95 L280 90 L310 85 L340 80",
    META: "M10 60 L40 50 L70 40 L100 30 L130 22 L160 18 L190 60 L220 88 L250 60 L280 35 L310 15 L340 8",
    NFLX: "M10 80 L40 70 L70 55 L100 40 L130 25 L160 18 L190 60 L220 90 L250 70 L280 35 L310 12 L340 5",
    "BRK.B": "M10 100 L40 95 L70 88 L100 78 L130 68 L160 58 L190 48 L220 38 L250 28 L280 20 L310 12 L340 6",
    COST: "M10 100 L40 95 L70 90 L100 82 L130 72 L160 62 L190 52 L220 40 L250 30 L280 22 L310 14 L340 8",
    COIN: "M10 80 L30 30 L50 22 L80 50 L110 75 L140 95 L170 100 L200 90 L230 70 L260 50 L290 35 L320 20 L340 18",
    SHOP: "M10 90 L40 70 L70 50 L100 25 L130 8 L160 12 L190 40 L220 70 L250 88 L280 80 L310 65 L340 55",
  };
  const path = charts[tk];
  if (!path) return "";
  return `
    <svg viewBox="0 0 360 110" class="case-svg">
      <defs>
        <linearGradient id="grad-${tk}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="1" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${path} L340 110 L10 110 Z" fill="url(#grad-${tk})"/>
      <path d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="14" y="20" fill="${color}" font-size="9" font-family="IBM Plex Mono">${tk}</text>
    </svg>`;
}

// 7 步框架 render
function renderFramework() {
  const grid = document.getElementById("frameworkSteps");
  if (!grid) return;
  grid.innerHTML = FRAMEWORK.map((f) => `
    <article class="fw-step" style="--vc:${f.color}">
      <div class="fw-step-num">${f.step}</div>
      <div class="fw-step-icon">${f.icon}</div>
      <h4>${f.title}</h4>
      <div class="fw-line"><span>✓ 通过</span><p>${f.test}</p></div>
      <div class="fw-line bad"><span>✗ 卡住</span><p>${f.fail}</p></div>
      <div class="fw-eg">📚 ${f.example}</div>
    </article>
  `).join("");
}

// K 线 12 形态 render
function renderKlinePatterns() {
  const grid = document.getElementById("klineGrid");
  if (!grid) return;
  grid.innerHTML = KLINE_PATTERNS.map((k) => `
    <article class="kp-card" style="--vc:${k.color}">
      <div class="kp-svg">${k.svg}</div>
      <header class="kp-head">
        <span class="kp-group">${k.group}</span>
        <h4>${k.name}</h4>
      </header>
      <p class="kp-use"><b>用法</b> ${k.use}</p>
      <p class="kp-teach"><b>解读</b> ${k.teach}</p>
      <p class="kp-confirm"><b>确认</b> ${k.confirm}</p>
    </article>
  `).join("");
}

// K 线对比 render
function renderChartCompare() {
  const grid = document.getElementById("chartCompareGrid");
  if (!grid) return;
  grid.innerHTML = CHART_PAIRS.map((p) => `
    <article class="cc-pair">
      <div class="cc-half cc-good">
        <span class="cc-tag">✓ ${p.good.name}</span>
        <svg viewBox="0 0 360 110" class="cc-svg">
          <path d="${p.good.path} L340 110 L10 110 Z" fill="${p.good.color}" opacity="0.15"/>
          <path d="${p.good.path}" fill="none" stroke="${p.good.color}" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="cc-half cc-bad">
        <span class="cc-tag">✗ ${p.bad.name}</span>
        <svg viewBox="0 0 360 110" class="cc-svg">
          <path d="${p.bad.path} L340 110 L10 110 Z" fill="${p.bad.color}" opacity="0.15"/>
          <path d="${p.bad.path}" fill="none" stroke="${p.bad.color}" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>
      <p class="cc-teach">💡 ${p.teach}</p>
    </article>
  `).join("");
}

// 经典案例 render
function renderCases() {
  const grid = document.getElementById("caseGrid");
  if (!grid) return;
  grid.innerHTML = CASES.map((c) => `
    <article class="case-card" style="--vc:${c.color}">
      <header class="case-head">
        <div class="case-icon">${c.glyph}</div>
        <div class="case-title">
          <h3>${c.cn} <span class="case-tk">${c.tk}</span></h3>
          <p class="case-year">${c.year}</p>
        </div>
      </header>
      ${caseChart(c.tk, c.color)}
      <p class="case-headline">${c.headline}</p>
      <p class="case-teach">▸ 教学要点: ${c.teach}</p>
      <div class="case-story">${c.story.replace(/\n\n/g, "</p><p>").replace(/^/, "<p>").replace(/$/, "</p>")}</div>
      <div class="case-points">
        ${c.points.map(([k, v]) => `<div class="case-point"><span>${k}</span><b>${v}</b></div>`).join("")}
      </div>
      <p class="case-lesson"><b>本课收获</b> ${c.lesson}</p>
    </article>
  `).join("");
}

// 止盈止损 SVG 视觉化 (按 name 配)
function stopVisual(name, color) {
  const c = color;
  if (name.includes("硬止损")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <line x1="20" y1="78" x2="340" y2="78" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="345" y="82" fill="#FF6B6B" font-size="9" text-anchor="end">止损 -8%</text>
        <path d="M20 30 L60 28 L100 38 L140 32 L180 50 L220 60 L260 70 L290 78 L320 88" fill="none" stroke="${c}" stroke-width="2.5"/>
        <circle cx="20" cy="30" r="4" fill="${c}"/>
        <text x="20" y="22" fill="${c}" font-size="9">买入</text>
        <circle cx="290" cy="78" r="5" fill="#FF6B6B"/>
        <text x="296" y="74" fill="#FF6B6B" font-size="9">触发</text>
      </svg>`;
  }
  if (name.includes("ATR")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <path d="M20 50 L80 40 L140 55 L200 35 L260 60 L320 45" fill="none" stroke="${c}" stroke-width="2.5"/>
        <path d="M20 70 L80 60 L140 75 L200 55 L260 80 L320 65" fill="none" stroke="#FF6B6B" stroke-width="1.5" stroke-dasharray="3 3"/>
        <text x="328" y="68" fill="#FF6B6B" font-size="8" text-anchor="end">2×ATR 下方</text>
        <text x="20" y="22" fill="${c}" font-size="9">价格随波动</text>
      </svg>`;
  }
  if (name.includes("支撑位")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <line x1="20" y1="80" x2="340" y2="80" stroke="#5a8aa6" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="22" y="76" fill="#5a8aa6" font-size="9">支撑 / 200 日线</text>
        <path d="M20 40 L70 70 L120 78 L170 65 L220 78 L270 90 L320 95" fill="none" stroke="${c}" stroke-width="2.5"/>
        <circle cx="270" cy="90" r="5" fill="#FF6B6B"/>
        <text x="276" y="86" fill="#FF6B6B" font-size="9">跌破出</text>
      </svg>`;
  }
  if (name.includes("时间")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        ${[0,1,2,3,4].map(i => `<rect x="${30 + i*60}" y="${50 - i*2}" width="40" height="${60 + i*4}" fill="${c}" opacity="${0.3 + i*0.15}"/>`).join("")}
        <line x1="240" y1="20" x2="240" y2="100" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="4 3"/>
        <text x="244" y="28" fill="#FF6B6B" font-size="9">30 天 deadline</text>
      </svg>`;
  }
  if (name.includes("无效化")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <rect x="30" y="30" width="120" height="50" rx="6" fill="rgba(122,168,138,.2)" stroke="#7AE8A0"/>
        <text x="90" y="60" fill="#7AE8A0" font-size="11" text-anchor="middle">买入逻辑成立</text>
        <text x="170" y="58" fill="#a89b82" font-size="14">→</text>
        <rect x="200" y="30" width="130" height="50" rx="6" fill="rgba(255,107,107,.18)" stroke="#FF6B6B" stroke-dasharray="4 3"/>
        <text x="265" y="55" fill="#FF6B6B" font-size="10" text-anchor="middle">逻辑被证伪</text>
        <text x="265" y="70" fill="#FF6B6B" font-size="10" text-anchor="middle">立刻平仓</text>
      </svg>`;
  }
  if (name.includes("目标价")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <line x1="20" y1="30" x2="340" y2="30" stroke="#FFD86B" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="22" y="24" fill="#FFD86B" font-size="9">目标价 $200</text>
        <path d="M20 90 L80 75 L140 60 L200 45 L260 32 L290 30" fill="none" stroke="${c}" stroke-width="2.5"/>
        <circle cx="290" cy="30" r="5" fill="#FFD86B"/>
        <text x="296" y="34" fill="#FFD86B" font-size="9">达标减 50%</text>
      </svg>`;
  }
  if (name.includes("Trailing")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <path d="M20 90 L60 75 L100 60 L140 70 L180 50 L220 55 L260 35 L300 40 L340 25" fill="none" stroke="${c}" stroke-width="2.5"/>
        <path d="M20 100 L60 85 L60 75 L100 75 L100 70 L140 80 L140 70 L180 70 L180 65 L220 65 L220 55 L260 55 L260 45 L300 45 L300 35 L340 35" fill="none" stroke="#FFD86B" stroke-width="1.5" stroke-dasharray="3 3"/>
        <text x="22" y="22" fill="#FFD86B" font-size="9">止损线随高点上移</text>
      </svg>`;
  }
  if (name.includes("比例")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <path d="M20 90 L80 70 L140 50 L200 35 L260 30 L320 28" fill="none" stroke="${c}" stroke-width="2.5"/>
        <circle cx="120" cy="55" r="5" fill="#7AE8A0"/>
        <text x="100" y="48" fill="#7AE8A0" font-size="9">+30% 减1/3</text>
        <circle cx="200" cy="35" r="5" fill="#FFD86B"/>
        <text x="180" y="28" fill="#FFD86B" font-size="9">+60% 再1/3</text>
        <circle cx="320" cy="28" r="5" fill="#C89060"/>
        <text x="290" y="22" fill="#C89060" font-size="9">+100% 拿底</text>
      </svg>`;
  }
  if (name.includes("估值过热")) {
    return `
      <svg viewBox="0 0 360 110" class="stop-svg">
        <path d="M20 95 L60 90 L100 80 L140 70 L180 50 L220 30 L260 20 L300 18 L340 15" fill="none" stroke="${c}" stroke-width="2.5"/>
        <line x1="20" y1="35" x2="340" y2="35" stroke="#FF9F40" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="22" y="29" fill="#FF9F40" font-size="9">PE 历史 90 分位</text>
        <circle cx="220" cy="30" r="5" fill="#FF9F40"/>
        <text x="226" y="26" fill="#FF9F40" font-size="9">触发</text>
      </svg>`;
  }
  return "";
}

// 止盈止损 render
function renderStops() {
  const grid = document.getElementById("stopsGrid");
  if (!grid) return;
  grid.innerHTML = STOPS.map((s) => `
    <article class="stop-card stop-${s.type === "STOP" ? "loss" : "take"}" style="--vc:${s.color}">
      <header class="stop-head">
        <div class="stop-icon">${s.icon}</div>
        <div>
          <span class="stop-tag">${s.type === "STOP" ? "止损" : "止盈"}</span>
          <h3>${s.name}</h3>
        </div>
      </header>
      ${stopVisual(s.name, s.color)}
      <div class="stop-rule"><b>规则</b><span>${s.rule}</span></div>
      <div class="stop-grid2">
        <div><span>📍 适用</span><p>${s.when}</p></div>
        <div><span>👍 优点</span><p>${s.pros}</p></div>
        <div><span>👎 缺点</span><p>${s.cons}</p></div>
        <div><span>📚 例子</span><p>${s.example}</p></div>
      </div>
      <div class="stop-advice"><b>建议</b> ${s.advice}</div>
    </article>
  `).join("");
}

// 大师 render
function renderMasters() {
  const grid = document.getElementById("mastersGrid");
  if (!grid) return;
  grid.innerHTML = MASTERS.map((m) => `
    <article class="case-card master-card" style="--vc:${m.color}">
      <header class="case-head">
        <div class="case-icon">${m.icon}</div>
        <div class="case-title">
          <h3>${m.cn} <span class="case-tk">${m.name}</span></h3>
          <p class="case-year">${m.school}</p>
        </div>
      </header>
      <p class="case-headline">${m.core}</p>
      <p class="case-teach">▸ 业绩: ${m.track}</p>
      <div class="master-rules">
        <h4>🧭 核心法则</h4>
        <ul>${m.rules.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>
      <div class="master-section">
        <h4>📐 框架</h4>
        <p>${m.framework}</p>
      </div>
      <div class="master-section">
        <h4>🎯 散户怎么用</h4>
        <p>${m.apply}</p>
      </div>
      <div class="master-quote">"${m.quote}"</div>
      <p class="case-lesson"><b>真实案例</b> ${m.case}</p>
    </article>
  `).join("");
}

// 经济学家 render
function renderEconomists() {
  const grid = document.getElementById("econGrid");
  if (!grid) return;
  grid.innerHTML = ECONOMISTS.map((e) => `
    <article class="econ-card" style="--vc:${e.color}">
      <header class="econ-head">
        <span class="econ-id">${e.id}</span>
        <span class="econ-school">${e.school}</span>
        <span class="econ-flag">${e.country}</span>
      </header>
      <h3 class="econ-name">${e.name}</h3>
      <p class="econ-en">${e.en} · ${e.year}</p>
      <p class="econ-core">▸ ${e.core}</p>
      <blockquote class="econ-quote">"${e.quote}"</blockquote>
      <p class="econ-book"><b>代表作</b> ${e.book}</p>
      <p class="econ-lesson"><b>对投资的启示</b> ${e.lesson}</p>
    </article>
  `).join("");
}

// VC render
function renderVCs() {
  const grid = document.getElementById("vcGrid");
  if (!grid) return;
  grid.innerHTML = VCS.map((v) => `
    <article class="case-card vc-card" style="--vc:${v.color}">
      <header class="case-head">
        <div class="case-icon">${v.icon}</div>
        <div class="case-title">
          <h3>${v.cn} <span class="case-tk">${v.name}</span></h3>
          <p class="case-year">${v.track}</p>
        </div>
      </header>
      <p class="case-headline">${v.motto}</p>
      <div class="master-rules">
        <h4>📐 投资框架</h4>
        <ul>${v.framework.map((f) => `<li>${f}</li>`).join("")}</ul>
      </div>
      <div class="master-section">
        <h4>🔢 关键指标</h4>
        <p>${v.metric}</p>
      </div>
      <div class="master-section">
        <h4>🎯 散户怎么用</h4>
        <p>${v.apply}</p>
      </div>
      <div class="master-quote">"${v.quote}"</div>
      <p class="case-lesson"><b>典型投资</b> ${v.case}</p>
    </article>
  `).join("");
}

// 17 课速跳 strip (永远在顶, 紧凑 chip)
function renderLessonStrip() {
  const strip = document.getElementById("lessonNavStrip");
  if (!strip) return;
  strip.innerHTML = lessonData.map((l, i) => {
    const tier = i < 6 ? "L1" : i < 11 ? "L2" : "L3";
    const cls = `lns-chip lns-${tier.toLowerCase()}${completed.has(i) ? ' done' : ''}${i === currentLesson ? ' active' : ''}`;
    return `<button type="button" class="${cls}" data-lesson-jump="${i}" title="${l.title}">
      <span class="lns-num">${String(i+1).padStart(2,'0')}</span>
      <span class="lns-name">${l.title}</span>
      ${completed.has(i) ? '<span class="lns-done">✓</span>' : ''}
    </button>`;
  }).join("");
}

// 关键指标 render (含分栏)
let activeMetricCat = "全部";
function renderMetrics() {
  const tabs = document.getElementById("metricTabs");
  const grid = document.getElementById("metricGrid");
  if (!tabs || !grid) return;
  const cats = ["全部", ...METRIC_CATS];
  tabs.innerHTML = cats.map((c) => {
    const count = c === "全部" ? METRICS.length : METRICS.filter((m) => m.cat === c).length;
    return `<button type="button" class="metric-tab${activeMetricCat === c ? ' active' : ''}" data-metric-cat="${c}">${c} <span>${count}</span></button>`;
  }).join("");
  const filtered = activeMetricCat === "全部" ? METRICS : METRICS.filter((m) => m.cat === activeMetricCat);
  grid.innerHTML = filtered.map((m) => `
    <article class="metric-card">
      <header class="metric-head">
        <div class="metric-abbr">${m.abbr}</div>
        <div>
          <span class="metric-cat">${m.cat}</span>
          <h3>${m.cn}</h3>
          <p class="metric-full">${m.full}</p>
        </div>
      </header>
      <div class="metric-formula">📐 公式: <code>${m.formula}</code></div>
      <p class="metric-meaning">${m.meaning}</p>
      <div class="metric-grid2">
        <div class="metric-good"><span>✓ 健康</span><p>${m.healthy}</p></div>
        <div class="metric-bad"><span>⚠ 警惕</span><p>${m.warning}</p></div>
      </div>
      <div class="metric-example"><b>📚 真实案例</b> ${m.example}</div>
      <div class="metric-tip"><b>💡 提示</b> ${m.tip}</div>
    </article>
  `).join("");
}
document.addEventListener("click", (e) => {
  const tab = e.target.closest("[data-metric-cat]");
  if (tab) {
    activeMetricCat = tab.dataset.metricCat;
    renderMetrics();
  }
});

// 课程总览 grid (17 lesson 速跳)
function renderOverviewGrid() {
  const grid = document.getElementById("overviewGrid");
  if (!grid) return;
  const tags = ["L1 基础", "L1 基础", "L1 基础", "L1 基础", "L1 基础", "L1 基础",
                "L2 行情", "L2 行情", "L2 行情", "L2 行情", "L2 行情",
                "L3 价值", "L3 价值", "L3 价值", "L3 价值", "L3 价值", "L3 价值"];
  grid.innerHTML = lessonData.map((l, i) => `
    <button class="overview-card${completed.has(i) ? ' done' : ''}" data-lesson-jump="${i}">
      <span class="ov-num">${String(i+1).padStart(2, '0')}</span>
      <span class="ov-tag">${tags[i] || ''}</span>
      <strong>${l.title}</strong>
      <p>${l.body.slice(0, 60)}...</p>
      ${completed.has(i) ? '<span class="ov-check">✓ 已完成</span>' : '<span class="ov-go">→ 开始</span>'}
    </button>
  `).join("");
  // 绑事件
  grid.querySelectorAll("[data-lesson-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.lessonJump);
      setLesson(idx);
      // 跳到对应 level 页
      showPage("overview");
    });
  });
}

// hook updateProgressUI 加 strip 刷新
const origUpdate = updateProgressUI;
updateProgressUI = function() {
  origUpdate();
  renderOverviewGrid();
  renderLessonStrip();
};

setLesson(0);
setQuizSection("ALL");
renderCases();
renderFramework();
renderChartCompare();
renderKlinePatterns();
renderStops();
renderMasters();
renderEconomists();
renderVCs();
renderMetrics();
renderOverviewGrid();
renderLessonStrip();
showPage("overview");
