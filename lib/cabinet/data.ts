/**
 * 怪谈奇闻 · CABINET OF MARVELS
 *
 * 给自己看的奇物柜：被主流不爱讲、被压抑、未解、还在追的题。
 * 不是科普，是收藏。
 */

export type CabinetCategoryId =
  | "lost-genius"
  | "suppressed"
  | "unsolved-physics"
  | "ancient-tech"
  | "fringe-science"
  | "corporate-shadow";

export type CabinetStatus = "active" | "暧昧" | "cold";

export interface CabinetCategory {
  id: CabinetCategoryId;
  label: string;
  en: string;
  intro: string;
}

export interface CabinetStory {
  id: string;
  category: CabinetCategoryId;
  era: string;
  titleZh: string;
  titleEn: string;
  protagonist: string;
  hook: string;
  story: string[];
  mainstreamView: string;
  hereticalView: string;
  weirdRating: 1 | 2 | 3 | 4 | 5;
  credibilityLow: number;
  credibilityHigh: number;
  status: CabinetStatus;
  links?: { wiki?: string; doc?: string; paper?: string };
}

export const CABINET_CATEGORIES: CabinetCategory[] = [
  {
    id: "lost-genius",
    label: "失落的天才",
    en: "LOST GENIUSES",
    intro: "他们想做的事，比时代早 50 到 100 年。然后被遗忘、被压制、被嘲笑。"
  },
  {
    id: "suppressed",
    label: "被压抑的发明",
    en: "SUPPRESSED INVENTIONS",
    intro: "不是没造出来，是造出来后被销毁、起诉、收购、雪藏。"
  },
  {
    id: "unsolved-physics",
    label: "未解物理学",
    en: "UNSOLVED PHYSICS",
    intro: "不在主流期刊里，但仍有人在角落里测、在复现、在等可重复实验。"
  },
  {
    id: "ancient-tech",
    label: "古代科技之谜",
    en: "ANCIENT TECH",
    intro: "古人留下的东西，至今讲不清是怎么做的、为什么做的。"
  },
  {
    id: "fringe-science",
    label: "玄学 × 科学边界",
    en: "FRINGE & BOUNDARY",
    intro: "正统不接，民间不放。介于实验室、宗教、心理学和量子的灰色地带。"
  },
  {
    id: "corporate-shadow",
    label: "企业 · 政府阴影",
    en: "CORPORATE SHADOW",
    intro: "钱和权能压住的事，往往不是因为它假，而是因为它对某些人代价太大。"
  }
];

export const CABINET_STORIES: CabinetStory[] = [
  // ===== 1. 失落的天才 =====
  {
    id: "tesla-wardenclyffe",
    category: "lost-genius",
    era: "1899–1917",
    titleZh: "特斯拉与瓦登克利夫塔",
    titleEn: "Tesla & Wardenclyffe Tower",
    protagonist: "Nikola Tesla",
    hook: "他想给整个地球免费送电，然后被钱断了。",
    story: [
      "1901 年，特斯拉在长岛动工建造瓦登克利夫塔——不是普通的无线电塔，他设想用地球本身作为导体，向全球任意地点无线传输电力。J.P. Morgan 起初投了 15 万美金，相当于今天约 500 万美元。",
      "当摩根意识到这套系统一旦成功，无法在每户家里装电表收钱时，他撤资了。塔还没完工，资金断了。1917 年塔被拆除卖废铁还债。特斯拉从此再没拿到大笔投资。",
      "1943 年特斯拉在纽约一家酒店孤独去世。FBI 当晚没收了他的所有实验笔记。其中部分至今未公开。"
    ],
    mainstreamView: "无线大功率传输违反基本物理学，效率极低，注定不可行。",
    hereticalView: "Tesla 用的是地电+电离层共振方案，与今天的 RF 不同；如果方案成立，意味着能源经济基础完全改写。",
    weirdRating: 5,
    credibilityLow: 25,
    credibilityHigh: 55,
    status: "暧昧",
    links: { wiki: "https://en.wikipedia.org/wiki/Wardenclyffe_Tower" }
  },
  {
    id: "royal-rife",
    category: "lost-genius",
    era: "1920s–1971",
    titleZh: "Royal Rife 与共振治癌仪",
    titleEn: "Royal Rife & The Resonance Cure",
    protagonist: "Royal Raymond Rife",
    hook: "他声称用频率杀死癌细胞，仪器被销毁，行医执照被吊销。",
    story: [
      "1934 年 Rife 在南加州做了一次临床试验，号称用他的「共振发生器」让 16 个晚期癌症病人 14 个痊愈。当地几位医生为之背书。",
      "之后实验室离奇起火，仪器被毁；同行医生开始撤回背书；美国医学会 (AMA) 主席介入；Rife 自此一蹶不振，1971 年穷困死于酒精中毒。",
      "今天仍有「Rife 机」灰市设备销售；FDA 长期视其为伪医疗。但近年「微波杀癌」「细胞共振裂解」类研究开始进入主流文献。"
    ],
    mainstreamView: "无可重复实验。Rife 的频率杀癌假说不符合细胞生物学。",
    hereticalView: "他做的可能是后来被命名为「电穿孔」「微波热疗」的早期版本，方向对，机制描述错。",
    weirdRating: 4,
    credibilityLow: 10,
    credibilityHigh: 35,
    status: "cold"
  },
  {
    id: "wilhelm-reich",
    category: "lost-genius",
    era: "1930s–1957",
    titleZh: "赖希与奥根能量",
    titleEn: "Wilhelm Reich & Orgone Energy",
    protagonist: "Wilhelm Reich",
    hook: "弗洛伊德的弟子，发明「生命能量盒子」，死在美国监狱里。",
    story: [
      "Reich 是早期精神分析学派的明星，离开欧洲到美国后宣称发现了一种弥漫宇宙的「奥根能量」，并设计了金属木盒「奥根累积器」据称能聚集这种能量、治愈癌症与精神疾病。",
      "FDA 1954 年获法院命令禁止 Reich 销售奥根仪器并销毁文献。Reich 拒不服从，被以违反禁令罪判 2 年监禁。他的书被联邦法警执行焚烧——美国 20 世纪极少数官方烧书事件。",
      "1957 年 Reich 在监狱中死于心脏病。他的剩余文献按其遗愿封存 50 年，2007 年由哈佛医学图书馆解封。"
    ],
    mainstreamView: "奥根能量没有任何物理证据，纯粹是 Reich 后期精神状态恶化的产物。",
    hereticalView: "Reich 测量的「生物电场」与今天的 bioelectricity 研究在描述层面有相通之处。能量名字荒谬，现象观察未必。",
    weirdRating: 5,
    credibilityLow: 5,
    credibilityHigh: 25,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/Wilhelm_Reich" }
  },
  {
    id: "stanley-meyer",
    category: "lost-genius",
    era: "1980s–1998",
    titleZh: "Stanley Meyer 的水燃料车",
    titleEn: "Stanley Meyer's Water Fuel Car",
    protagonist: "Stanley Meyer",
    hook: "他说能让车烧水跑，1998 年在饭店突然倒地，喊「他们毒死我了」。",
    story: [
      "1980 年代美国俄亥俄州发明家 Meyer 公开演示了一辆改装巴吉车，号称用水电解出来的氢氧混合气作为唯一燃料。他声称发明了一种「能量缸」让水分解所需电能远低于传统电解。",
      "1996 年俄亥俄法庭裁定他犯欺诈罪，他败诉付了 25,000 美元。1998 年他在 Cracker Barrel 餐厅吃饭时突然冲出门外，倒在停车场，喊「他们毒死我了」(They poisoned me)。验尸结论是脑动脉瘤破裂。",
      "他的家人和支持者认为他被沙特石油势力下毒；阴谋论圈奉为 21 世纪最大的疑似清除事件。专利文件至今在网上流传。"
    ],
    mainstreamView: "水电解需要的能量永远大于氢氧燃烧释放的能量，违反热力学第一定律。法庭已认定欺诈。",
    hereticalView: "Meyer 描述的是「氢氧爆轰共振电解」，与传统电解不同；专利文件中含有未被公开复现的特殊脉冲电路。",
    weirdRating: 5,
    credibilityLow: 5,
    credibilityHigh: 20,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/Stanley_Meyer%27s_water_fuel_cell" }
  },

  // ===== 2. 被压抑的发明 =====
  {
    id: "ev1-killed",
    category: "suppressed",
    era: "1996–2003",
    titleZh: "EV1：被自己车厂召回销毁的电动车",
    titleEn: "Who Killed the Electric Car (EV1)",
    protagonist: "General Motors",
    hook: "GM 造出过电动车, 后来全部召回压成废铁，纪录片《电动车之死》里有车主流泪场景。",
    story: [
      "1996 年加州空气资源委员会 (CARB) 强制零排放政策，迫使车厂出电动车。GM 推出 EV1，只租不卖，仅 1100 多辆上路。性能在当时已经能跑 160 公里，加速比同价位汽油车更快。",
      "2003 年 CARB 在车厂联盟和小布什政府游说下撤销零排放强制。GM 宣布回收所有 EV1，车主拒绝交还无效。回收车被拖到亚利桑那州的废车场压成方块销毁。少数被博物馆「免动力」存放。",
      "2006 年纪录片《Who Killed the Electric Car?》将这段事件大白于众。技术、燃油、消费、政府四方共谋的标准案例。"
    ],
    mainstreamView: "GM 商业上算不过账，与「阴谋」无关：电池技术不成熟、维护贵、租约到期回收正常。",
    hereticalView: "1100 辆已经成功运营 7 年，技术问题被夸大；销毁是为了消灭「电动车可行」的舆论证据。",
    weirdRating: 4,
    credibilityLow: 65,
    credibilityHigh: 90,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/General_Motors_EV1" }
  },
  {
    id: "tucker-1948",
    category: "suppressed",
    era: "1947–1949",
    titleZh: "Tucker 1948：被三大车厂告倒的安全先锋",
    titleEn: "Tucker 48 vs Detroit Big Three",
    protagonist: "Preston Tucker",
    hook: "他想造一台 1948 年就有安全玻璃、转向中央灯、独立悬挂的车——三大车厂联合把他告破产。",
    story: [
      "Tucker 1948 (Tucker Torpedo) 在二战后由独立发明家 Preston Tucker 设计：百米外可弯转的中央前灯、安全玻璃可弹出、独立四轮悬挂、后置发动机——所有当时通用/福特/克莱斯勒还要 20 年才追上的功能。",
      "1948 年 SEC 启动反欺诈调查。底特律三大车厂被广泛认为在背后游说密歇根参议员推动调查。仅造了 51 辆车。1949 年 Tucker 公司倒闭。",
      "1950 年 Tucker 被全部指控判无罪。但公司已死。Francis Ford Coppola 1988 年拍了同名电影《Tucker》。"
    ],
    mainstreamView: "Tucker 在工程实现上远未成熟，融资模式 (经销商预付订金) 在当时确实违规。",
    hereticalView: "这是底特律三大车厂用政府力量绞杀竞争者的标准案例；Tucker 的技术后来逐一变成行业标配。",
    weirdRating: 3,
    credibilityLow: 60,
    credibilityHigh: 85,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/Tucker_48" }
  },
  {
    id: "cold-fusion",
    category: "suppressed",
    era: "1989–至今",
    titleZh: "冷核聚变：被一夜羞辱后又悄悄活着",
    titleEn: "Cold Fusion (LENR)",
    protagonist: "Pons & Fleischmann",
    hook: "1989 年说自己在烧杯里点火了核聚变，第二年被全世界群嘲，但 35 年后还有 10+ 个国家的实验室在重做。",
    story: [
      "1989 年 3 月，犹他大学化学家 Pons 和南安普顿大学的 Fleischmann 召开新闻发布会，宣称在常温下用钯电极电解重水实现了核聚变，伴随过量热释放。",
      "麻省理工等大型实验室无法重现实验，半年内学界基本将其打入伪科学。两位主角被嘲讽到只能离开美国，去法国和日本继续研究。",
      "2024 年 NASA、Google、海军实验室、意大利 ENEA 等机构均有相关 LENR (低能核反应) 项目仍在跑；多份论文报告了过热和异常元素嬗变。Pons 已平反一半。"
    ],
    mainstreamView: "冷核聚变缺乏可重复的、定量的核反应证据。所谓过热可能是化学错误或测量误差。",
    hereticalView: "LENR 是真现象但理论尚未明确；钯氢系统中的「凝聚态核反应」(condensed-matter nuclear) 已是新兴小众分支。",
    weirdRating: 4,
    credibilityLow: 20,
    credibilityHigh: 50,
    status: "active",
    links: { wiki: "https://en.wikipedia.org/wiki/Cold_fusion" }
  },
  {
    id: "browns-gas",
    category: "suppressed",
    era: "1970s–至今",
    titleZh: "Brown's Gas：氢氧混合燃烧的灰色地带",
    titleEn: "Brown's Gas (HHO / Oxyhydrogen)",
    protagonist: "Yull Brown",
    hook: "电解水产生 2:1 氢氧混合气，烧起来火焰能瞬间穿透钨——主流不承认它特殊。",
    story: [
      "保加利亚裔澳洲发明家 Yull Brown 1974 年获专利, 描述了一种「单极电解」装置, 产生 2:1 比例的氢氧混合气, 也叫 HHO 或 oxyhydrogen。",
      "Brown 演示这种气体烧起来能在 1 秒内把钨棒 (熔点 3422°C) 烧穿一个洞, 把水泥变玻璃。主流物理认为这只是普通氢氧燃烧, 不应有异常。",
      "Brown 1998 年去世后，HHO 焊接机进入工业市场（小众但合法）；中国近年有论文报告 Brown 气体对生物组织的某些异常作用。仍是灰色研究领域。"
    ],
    mainstreamView: "HHO 就是普通氢氧混合气, 燃烧释放能量等于电解输入能量, 没有任何「异常」。",
    hereticalView: "Brown 气体可能含有未被识别的等离子体态或单原子氢, 与普通 H2+O2 不同; 焊接机的反常切割是观察事实。",
    weirdRating: 4,
    credibilityLow: 20,
    credibilityHigh: 45,
    status: "暧昧"
  },

  // ===== 3. 未解物理学 =====
  {
    id: "lk99",
    category: "unsolved-physics",
    era: "2023–",
    titleZh: "LK-99：闹剧之后悄悄活着",
    titleEn: "LK-99 Room-Temperature Superconductor",
    protagonist: "Sukbae Lee, Ji-Hoon Kim",
    hook: "韩国说自己造出了室温常压超导体，全网爆炸，三周后被推翻。但其中两位作者还在重做。",
    story: [
      "2023 年 7 月韩国量子能源研究中心 Lee 和 Kim 在 arXiv 放出预印本，宣称改性磷灰石 LK-99 在 127°C 以下表现常压超导。视频显示样品悬浮于磁铁上方。",
      "全球数十家实验室在 2-3 周内做了重现实验，结论一致：LK-99 不是超导体，悬浮是软铁磁性 + 形状各向异性。中国南京大学最先给出否定结论。",
      "但原始论文中作者之间的署名风波尚未解决；2024-2025 年仍有少数小型实验室在重新合成不同配方的 LK-99 衍生物。一线主流已彻底放弃。"
    ],
    mainstreamView: "LK-99 不是超导体。已被全球多家实验室独立重现并否决。",
    hereticalView: "原始材料合成方法不严谨，可能存在某种形式上的不寻常电磁响应被错误地解读为超导。",
    weirdRating: 4,
    credibilityLow: 5,
    credibilityHigh: 18,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/LK-99" }
  },
  {
    id: "emdrive",
    category: "unsolved-physics",
    era: "2001–",
    titleZh: "EMDrive：违反动量守恒的推进器",
    titleEn: "EMDrive (Cannae Drive)",
    protagonist: "Roger Shawyer",
    hook: "一个微波腔体，不喷任何东西，自己会推进。NASA 测过，欧洲某团队 2018 年说推力是测量误差。",
    story: [
      "2001 年英国工程师 Shawyer 提出 EMDrive: 一个微波在锥形腔体内反射, 无任何物质喷出, 系统会产生定向推力。这显然违反动量守恒。",
      "2016 年 NASA Eagleworks 实验室测得 1.2 mN/kW 微弱但可重复的推力, 论文发表在 Journal of Propulsion and Power。航天界震动。",
      "2018 年德累斯顿工业大学 Tajmar 团队用更精密扭摆复测, 结论是: 推力来源是地磁场对线缆的洛伦兹力, 不是 EMDrive 本身。Shawyer 至今坚持原说。"
    ],
    mainstreamView: "EMDrive 已被 2018 年 Tajmar 团队精密实验否决, 推力来源是测量误差。",
    hereticalView: "Tajmar 实验只针对一种特定型号; 其他构型 EMDrive 实验仍报告异常推力, 至今没有完整理论解释。",
    weirdRating: 4,
    credibilityLow: 5,
    credibilityHigh: 25,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/RF_resonant_cavity_thruster" }
  },
  {
    id: "hutchison-effect",
    category: "unsolved-physics",
    era: "1979–",
    titleZh: "Hutchison 效应：金属漂浮与异常冶金",
    titleEn: "The Hutchison Effect",
    protagonist: "John Hutchison",
    hook: "加拿大业余物理爱好者拍下了金属棒漂浮和金属碎片自相熔接的视频，至今没人完整复现。",
    story: [
      "John Hutchison 是温哥华一位没有正规物理学训练的电气狂热者。他在 1979 年开始用特斯拉线圈、范德格拉夫起电机和射频发射机的混合装置做实验。",
      "他录制了多段视频: 金属棒缓慢漂浮、塑料和金属互相镶嵌、子弹卡住在木块里。1990 年代初, 美国陆军 INSCOM 据传访问其实验室, 部分设备被没收。",
      "之后 Hutchison 多次声称自己「无法重现」效应; 设备每次拆装组合都不太一样。从未在受控条件下被任何独立科学家完整重现。"
    ],
    mainstreamView: "录像可被 stop-motion 动画或剪辑技术伪造; 没有任何受控实验报告; 拒绝学术检验。",
    hereticalView: "电磁场叠加可能产生未被现代物理理论刻画的局部能量流; 零点能或电磁悬浮的真实窗口。",
    weirdRating: 5,
    credibilityLow: 5,
    credibilityHigh: 20,
    status: "cold"
  },
  {
    id: "allais-effect",
    category: "unsolved-physics",
    era: "1954–",
    titleZh: "Allais 效应：日蚀时摆钟会偏",
    titleEn: "The Allais Effect (Eclipse Pendulum Anomaly)",
    protagonist: "Maurice Allais",
    hook: "1988 年诺贝尔经济学奖得主, 60 年前在法国测了日蚀, 发现摆钟在那 30 分钟莫名偏转。",
    story: [
      "Maurice Allais 1954 年 6 月 30 日在法国测量一个旋转摆 (Foucault pendulum) 的进动率。日全食发生那一刻, 摆突然以异常方式偏转 13.5°, 持续约 30 分钟。",
      "他独立重复了多次, 1959 年也观察到了类似现象。但实验室外难以复现, 不同地点测量结果矛盾。NASA 1970 年代尝试组织日蚀同步测量但未取得一致结论。",
      "Allais 1988 年因经济学贡献获诺奖, 但他将一半精力放在物理学上。这个效应至今没有被广义相对论标准模型解释; 偶尔有人提议「重力屏蔽」「以太风」等异端假说。"
    ],
    mainstreamView: "Allais 测得的偏转可能是地面震动、温度梯度或偶发因素。重复测量不一致，不构成新物理。",
    hereticalView: "如果效应真实, 意味着重力受月-日-地几何排列影响, 超出当前广义相对论描述范围。",
    weirdRating: 4,
    credibilityLow: 15,
    credibilityHigh: 40,
    status: "暧昧",
    links: { wiki: "https://en.wikipedia.org/wiki/Allais_effect" }
  },

  // ===== 4. 古代科技之谜 =====
  {
    id: "antikythera",
    category: "ancient-tech",
    era: "公元前 100",
    titleZh: "安提凯希拉机械：古希腊的「模拟计算机」",
    titleEn: "Antikythera Mechanism",
    protagonist: "未知希腊工匠",
    hook: "1901 年从一艘古希腊沉船里捞出的青铜齿轮箱, 100 年后才被读懂——它能算月相、日蚀、奥林匹克日历。",
    story: [
      "1901 年潜水员在希腊安提凯希拉岛附近一艘公元前 60 年沉船里发现一团锈死的青铜物件, 长期被认为是普通的礼器或时钟。",
      "1959 年 Derek de Solla Price 用 X 光扫描显示其内部含有 30 多个精密齿轮; 2006 年高分辨率 CT 扫描终于解读出: 这是一台天文计算机, 可同步模拟太阳/月亮位置、日月食、奥林匹克年和黄道带。",
      "类似精密齿轮加工技术下一次出现要等到 14 世纪欧洲的天文钟。中间消失了 1400 年。这种工艺如何在公元前出现, 又为什么没有被传承, 至今没有令人信服的答案。"
    ],
    mainstreamView: "希腊化时代某位天才工匠 (可能受阿基米德学派影响) 的孤本作品; 在罗马征服后传承断裂。",
    hereticalView: "可能不是孤本, 类似工艺当时已存在但未广泛流传; 也有人猜测它是一类古代航海/占星工具系列的最高代表。",
    weirdRating: 5,
    credibilityLow: 80,
    credibilityHigh: 100,
    status: "active",
    links: { wiki: "https://en.wikipedia.org/wiki/Antikythera_mechanism" }
  },
  {
    id: "baghdad-battery",
    category: "ancient-tech",
    era: "公元 250 前后",
    titleZh: "巴格达电池：2000 年前的伽伐尼装置?",
    titleEn: "Baghdad Battery",
    protagonist: "未知美索不达米亚工匠",
    hook: "陶罐里塞着铜筒和铁棒, 灌上酸性液体能产生 0.5V 电压。问题是: 古人造它干嘛?",
    story: [
      "1936 年伊拉克巴格达郊外考古挖出 12 个公元 200-250 年的陶罐, 内含铜圆筒和铁棒。德国博物馆员 Wilhelm König 提出假说: 这是一种原始电池。",
      "1940 年代多次复原实验显示: 灌上葡萄汁、醋或柠檬汁后, 这种构造确实能产生 0.5-2 伏电压。1970 年代 Smithsonian 电视节目复原版用它给小镀金件镀金成功。",
      "争议在于古人造它的真实目的。一种说法是金属镀层 (古代波斯发现过镀金小件); 另一种说法是宗教仪式中的微电流疗愈; 也有人认为只是普通的卷轴存放容器, 现代人想多了。"
    ],
    mainstreamView: "可能就是装羊皮卷的容器。所谓「电池」是现代人附会; 没有任何古文献提到电力应用。",
    hereticalView: "结构精确符合伽伐尼电池, 不太像偶然; 古代波斯/帕提亚可能确实掌握了局部电化学应用。",
    weirdRating: 4,
    credibilityLow: 30,
    credibilityHigh: 70,
    status: "暧昧",
    links: { wiki: "https://en.wikipedia.org/wiki/Baghdad_Battery" }
  },
  {
    id: "roman-concrete",
    category: "ancient-tech",
    era: "公元前 100–现代",
    titleZh: "罗马混凝土: 越泡海水越坚",
    titleEn: "Roman Self-Healing Concrete",
    protagonist: "罗马工匠",
    hook: "现代混凝土 50 年崩, 罗马混凝土 2000 年还在; 而且接触海水后还会自我修复变得更结实。",
    story: [
      "罗马帝国海港和万神殿穹顶用的混凝土在 2000 年后依然完好, 远超现代波特兰水泥的耐久性。配方在 5 世纪西罗马崩溃后失传。",
      "2017 年犹他大学 Marie Jackson 团队分析罗马港混凝土微结构, 发现配方含火山灰 + 海水 + 石灰, 海水接触后会形成「铝-钙硅酸盐水合物」(C-A-S-H) 结晶, 不断填补微裂缝。",
      "2023 年 MIT 团队发表《Science Advances》论文进一步证实「热混合」(hot mixing) 工艺产生石灰团块, 是罗马混凝土自愈的关键机制。配方已基本被现代复原, 但产业化应用仍未成熟。"
    ],
    mainstreamView: "罗马混凝土的耐久机制已被现代材料科学揭示, 是真实可复现的工艺。",
    hereticalView: "我们以为破解了, 但还有部分细节 (比如配方中具体的火山灰矿物组成) 仍未完全复制。",
    weirdRating: 3,
    credibilityLow: 80,
    credibilityHigh: 100,
    status: "active"
  },
  {
    id: "great-pyramid-power",
    category: "ancient-tech",
    era: "公元前 2500",
    titleZh: "大金字塔: 一座古埃及发电站?",
    titleEn: "Great Pyramid as Power Plant",
    protagonist: "Christopher Dunn (假说提出者)",
    hook: "美国机械工程师 Dunn 写书认为, 大金字塔是一座精心设计的氢气共振发电装置。",
    story: [
      "Christopher Dunn 是一位有 50 年精密机械经验的工程师。他实地测量大金字塔内部 (国王室、王后室、地下室) 后认为, 它的几何尺寸与共振频率工程吻合得过于精确。",
      "他的假说: 大金字塔利用尼罗河水位变化和金字塔下方稀盐酸 + 锌反应生成氢气, 通过国王室的「花岗岩共振腔」放大微波, 用作能源传输信号。",
      "主流埃及学不接受这一假说, 认为它是 19 世纪「金字塔是能源装置」浪漫主义的现代版。但 Dunn 的精密测量数据被部分独立工程师认可。"
    ],
    mainstreamView: "大金字塔是法老胡夫的陵墓, 没有任何古埃及文献提到能源功能。Dunn 的假说是后人附会。",
    hereticalView: "大金字塔的精度远超陵墓必要; 内部腔体的几何/材质组合与共振工程吻合; 古埃及可能有失传的能量应用。",
    weirdRating: 5,
    credibilityLow: 5,
    credibilityHigh: 20,
    status: "cold"
  },

  // ===== 5. 玄学 × 科学边界 =====
  {
    id: "stargate-rv",
    category: "fringe-science",
    era: "1972–1995",
    titleZh: "Stargate Project: CIA 用 23 年研究远程查看",
    titleEn: "Project Stargate (Remote Viewing)",
    protagonist: "Russell Targ, Hal Puthoff",
    hook: "你以为远视读心是科幻? 美军和 CIA 真的花了 2000 万美元做了 23 年。",
    story: [
      "1972-1995 美国陆军和 CIA 资助斯坦福研究院 (SRI) 一个秘密项目, 研究「远程查看」(Remote Viewing) — 训练受试者用意识收集远方目标的视觉信息。",
      "项目负责人 Russell Targ 和 Hal Puthoff 都是激光物理博士, 有正式学术资格。受试者 Ingo Swann 等人据称多次准确描述了苏联军事基地、伊朗人质危机现场等远程目标。",
      "1995 年 CIA 委托美国研究院 (AIR) 评估, 报告认为「远视效应在统计上略高于偶然, 但情报价值不足」。项目终止, 文件大部分解密, 至今 90% 可在 CIA 网站读到。"
    ],
    mainstreamView: "23 年研究最终没产生可重复的、有情报价值的成果。统计弱效应可能只是测试设计问题。",
    hereticalView: "解密文件包含数百份「远视成功」案例描述; 统计上「略高于偶然」如果是真效应, 已是革命性发现。",
    weirdRating: 5,
    credibilityLow: 25,
    credibilityHigh: 55,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/Stargate_Project" }
  },
  {
    id: "orch-or",
    category: "fringe-science",
    era: "1989–",
    titleZh: "Orch-OR: 意识可能是量子事件",
    titleEn: "Orchestrated Objective Reduction",
    protagonist: "Roger Penrose, Stuart Hameroff",
    hook: "数学家彭罗斯 (诺奖得主) + 麻醉师 Hameroff 联手提出: 意识不是脑细胞计算, 是脑微管中的量子坍缩。",
    story: [
      "1989 年 Roger Penrose 在《皇帝的新脑》中提出: 哥德尔不完备定理意味着意识不是图灵可计算的; 意识必涉及量子层面的非算法过程。",
      "1990 年代他与亚利桑那大学麻醉学教授 Stuart Hameroff 合作, 提出 Orch-OR 模型: 大脑神经元内部的微管 (microtubules) 是量子计算载体, 意识来自量子叠加态的协调坍缩。",
      "2022 年 Penrose 实验室和日本量子团队首次报告了麻醉气体作用于微管的实验证据, 与 Orch-OR 预测一致。仍是学界少数派, 但已不再被视为伪科学。2020 年 Penrose 拿诺贝尔物理学奖加重了这个理论的份量。"
    ],
    mainstreamView: "意识仍是脑神经计算; 量子相干在脑温下的解相干时间太短, 无法支撑 Orch-OR。",
    hereticalView: "微管的有序水合层可能延长量子相干时间; 麻醉机制实验证据与 Orch-OR 吻合, 主流理论无法解释。",
    weirdRating: 4,
    credibilityLow: 15,
    credibilityHigh: 50,
    status: "active",
    links: { wiki: "https://en.wikipedia.org/wiki/Orchestrated_objective_reduction" }
  },
  {
    id: "gcp",
    category: "fringe-science",
    era: "1998–",
    titleZh: "GCP 全球意识项目",
    titleEn: "Global Consciousness Project",
    protagonist: "Roger Nelson (Princeton)",
    hook: "普林斯顿在全球放了 70 多台随机数发生器跑了 25 年, 重大事件发生时数字会偏离随机。",
    story: [
      "1998 年普林斯顿大学心理工程师 Roger Nelson 启动全球意识项目, 在全球 70+ 个地点部署硬件随机数发生器 (基于电子噪声), 24/7 持续记录数据。",
      "假说是: 当大量人类同时聚焦于重大事件 (911、戴安娜葬礼、跨年钟声) 时, 全球随机数会出现统计上的微弱非随机偏差。25 年累积数据库 +250 个事件, GCP 团队报告 p<0.000001 的累积偏离。",
      "主流统计学家批评 GCP 的事件选择有事后偏差; 也有独立分析认为部分偏差可能是真实信号。GCP 至今仍在运行, 数据公开。"
    ],
    mainstreamView: "事件后挑选 (cherry-picking) + 多重比较统计修正后, 偏差可能完全消失。",
    hereticalView: "原始数据公开可独立分析; 累积 25 年事件平均偏差不易用 cherry-picking 完全解释。",
    weirdRating: 5,
    credibilityLow: 10,
    credibilityHigh: 35,
    status: "active",
    links: { wiki: "https://en.wikipedia.org/wiki/Global_Consciousness_Project" }
  },
  {
    id: "phoenix-lights",
    category: "fringe-science",
    era: "1997-03-13",
    titleZh: "凤凰城光团: 万人目击的 V 形飞行物",
    titleEn: "Phoenix Lights",
    protagonist: "万人目击者",
    hook: "1997 年 3 月 13 日晚, 数千人 (含亚利桑那州长本人) 看到一个城市大小的 V 形飞行物缓慢飞过凤凰城。",
    story: [
      "1997-03-13 晚 19:30-22:00, 美国亚利桑那州凤凰城及周边数十个城镇有数千人目击一组 V 形排列的暗色光点, 估测尺度比一架 747 大数十倍, 缓慢飞过城市上空。",
      "亚利桑那州长 Fife Symington 当晚也亲眼目击, 但出于政治考虑当时召开新闻会嘲讽性地戴外星人面具回避此事。10 年后他公开承认: 「那是真的, 我至今无法解释。」",
      "美国空军给出官方解释: 那是马里兰州空军基地训练的 A-10 战机投掷照明弹。但目击者描述的「物体形状、缓慢移动方式、消失方式」与照明弹特征不符。事件至今争议。"
    ],
    mainstreamView: "空军确认是 A-10 战机的训练照明弹, 多数光点已被技术解释。",
    hereticalView: "空军解释只能说明部分光点; 另一组数小时前的、形状结构清晰的 V 形物体未被解释; 高级目击者证词不容易被反驳。",
    weirdRating: 5,
    credibilityLow: 30,
    credibilityHigh: 65,
    status: "cold",
    links: { wiki: "https://en.wikipedia.org/wiki/Phoenix_Lights" }
  },

  // ===== 6. 企业 / 政府阴影 =====
  {
    id: "burzynski-antineoplaston",
    category: "corporate-shadow",
    era: "1976–至今",
    titleZh: "Burzynski 抗瘤酮: 30 年起诉拉锯",
    titleEn: "Burzynski Antineoplastons",
    protagonist: "Stanislaw Burzynski",
    hook: "波兰医生 Burzynski 自研癌症疗法, 30 年里 FDA 起诉了他 5 次都没能定罪, 但也始终没批他的药。",
    story: [
      "Stanislaw Burzynski 1970 年代来美, 1976 年开 Burzynski 诊所宣称用从尿液中提取的「抗瘤酮」(antineoplastons) 治疗各类癌症, 主要是脑瘤。",
      "FDA 1985 年起 5 次刑事起诉他, 试图以「未授权销售」「无照行医」「邮件欺诈」定罪。每次都因病人和病人家属作证支持, 陪审团不定罪。德州医师执照委员会也吊销过他执照, 又被法院推翻。",
      "Burzynski 至今仍在德州 Sugar Land 行医, 抗瘤酮仍未获 FDA 批准上市。诊所收费高昂, 病人案例两极: 有完全康复的脑瘤儿童, 也有花光积蓄死亡的。维基百科条目用「伪医疗」标签。"
    ],
    mainstreamView: "抗瘤酮缺乏第三方独立可重复的、对照组充分的疗效证据。Burzynski 的诊所靠绝望病人维生。",
    hereticalView: "病人证词大量, 部分长生存率 (10+ 年) 远超传统疗法; 大药厂没有采购抗瘤酮的商业动机推动 FDA 审批。",
    weirdRating: 4,
    credibilityLow: 10,
    credibilityHigh: 35,
    status: "暧昧",
    links: { wiki: "https://en.wikipedia.org/wiki/Stanislaw_Burzynski" }
  },
  {
    id: "skunk-works-black",
    category: "corporate-shadow",
    era: "1943–",
    titleZh: "Lockheed Skunk Works: 黑预算的 50 年",
    titleEn: "Lockheed Skunk Works Black Budget",
    protagonist: "Lockheed Skunk Works",
    hook: "U-2 / SR-71 / F-117 都是它先造出来再公布, 现在还有什么没公布的? 黑预算每年 ~500 亿美元。",
    story: [
      "Lockheed Skunk Works 1943 年成立, 二战期间秘密造 P-80, 之后是 U-2 间谍机 (1955)、SR-71 黑鸟 (1964 公开)、F-117 隐身机 (1988 公开)、RQ-170 (2007 公开)。规律: 服役 5-15 年后才被公开。",
      "美国国防部「黑预算」每年 500-700 亿美元, 不向国会全部审计公开。Skunk Works 拿走相当份额。技术目标包括反重力、激光武器、超高速飞行器等。",
      "民间猜测的 Aurora、TR-3B 等飞行器从未被官方承认。但前洛马工程师 Ben Rich 1995 年退休时半开玩笑说「我们已经掌握了把任何东西从一处运到另一处不靠喷气推进的技术」。"
    ],
    mainstreamView: "Skunk Works 项目都在传统航空学范围内, 黑预算用于常规隐身/电子战/核武装备。Aurora 是民间想象。",
    hereticalView: "美军 1950 年代以来在反重力 / 等离子推进方面的研究被认为已部分应用, 至今未公开; 黑预算的尾巴大于已公开技术。",
    weirdRating: 5,
    credibilityLow: 30,
    credibilityHigh: 65,
    status: "active",
    links: { wiki: "https://en.wikipedia.org/wiki/Skunk_Works" }
  },
  {
    id: "rockefeller-medicine",
    category: "corporate-shadow",
    era: "1910–",
    titleZh: "Flexner 报告: 洛克菲勒重塑了西医",
    titleEn: "Flexner Report & Pharma Capture",
    protagonist: "John D. Rockefeller, Abraham Flexner",
    hook: "1910 年一份报告关闭了美国 80% 医学院, 让石化制药统治了一个世纪。",
    story: [
      "1910 年卡内基基金会发表 Flexner 报告, 评估全美 155 所医学院, 推动关闭 80%——主要是顺势疗法、自然疗法、女性和黑人的医学院。",
      "洛克菲勒石油帝国当时正寻找石油副产品的非燃料用途。石化合成药 (后来的西药) 完美匹配。洛克菲勒基金会 1913 年起大规模资助「合规」医学院和研究, 把美国医疗推向以药物为中心的生物医学模型。",
      "中医、草药、营养、运动、心理这些路径在 1910-1970 几乎被边缘化。1970 年代起回潮但从未恢复 1910 前的多元生态。"
    ],
    mainstreamView: "Flexner 报告确实提升了医学院科学标准, 是 20 世纪医学进步的基础。所谓「洛克菲勒阴谋」过度阴谋论。",
    hereticalView: "提升标准是真, 但同时是商业战略——把医疗基础设施改造成石化制药的下游应用层, 100 年后看清这点。",
    weirdRating: 3,
    credibilityLow: 50,
    credibilityHigh: 85,
    status: "active",
    links: { wiki: "https://en.wikipedia.org/wiki/Flexner_Report" }
  },
  {
    id: "stargate-tech-2017",
    category: "corporate-shadow",
    era: "2007–至今",
    titleZh: "AAWSAP / AATIP: 五角大楼承认查 UAP 了",
    titleEn: "Pentagon UAP Disclosure (AATIP/AAWSAP)",
    protagonist: "Luis Elizondo (前 AATIP 负责人)",
    hook: "2017 年纽约时报曝光: 美国国防部花 2200 万美元秘密研究 UAP (UFO) 11 年。后续国会听证 2023 年公开。",
    story: [
      "2017 年《纽约时报》披露: 美国国防部 2007-2012 运行 AAWSAP/AATIP 项目, 由参议员 Harry Reid 推动, 研究 UAP (Unidentified Aerial Phenomena) 现象。前负责人 Luis Elizondo 公开三段海军飞行员拍摄的 Tic Tac UAP 视频。",
      "2020 年五角大楼承认这些视频真实。2022 年成立官方 AARO 办公室继续研究。2023 年国会听证, 前情报官 David Grusch 发誓证词美国政府持有「外星非人智慧载具」(non-human intelligence craft) 残骸——主流媒体几乎全程播放。",
      "目前仍无可独立验证的 ET 证据公开, 但政府官方话语已从「不存在」转为「我们在认真研究」。这一话语转变本身可能是 21 世纪最大的认知开口。"
    ],
    mainstreamView: "已知 UAP 大多数可解释为大气现象、传感器故障或秘密飞行器; 缺乏可分析的物理证据。",
    hereticalView: "国会听证级别的官方话语转变 + 飞行员一手证词 + 视频物证组合, 已远超传统「UFO 民间传说」级别。",
    weirdRating: 5,
    credibilityLow: 35,
    credibilityHigh: 70,
    status: "active",
    links: { wiki: "https://en.wikipedia.org/wiki/Advanced_Aerospace_Threat_Identification_Program" }
  }
];

export function getStoriesByCategory(id: CabinetCategoryId): CabinetStory[] {
  return CABINET_STORIES.filter((s) => s.category === id);
}

export function getCategoryById(id: CabinetCategoryId): CabinetCategory | undefined {
  return CABINET_CATEGORIES.find((c) => c.id === id);
}

export const STATUS_LABEL: Record<CabinetStatus, { label: string; cls: string }> = {
  active: { label: "尚有人在追", cls: "status-active" },
  "暧昧": { label: "暧昧未决", cls: "status-amb" },
  cold: { label: "已凉但有遗骸", cls: "status-cold" }
};
