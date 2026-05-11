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
  },

  // ===== 2026-05-03 新增 12 篇 =====
  {
    id: "viktor-schauberger",
    category: "lost-genius",
    era: "1920s–1958",
    titleZh: "维克多·绍贝格：林业员的「水涡能」",
    titleEn: "Viktor Schauberger & The Water Vortex Engine",
    protagonist: "Viktor Schauberger",
    hook: "奥地利林业员说「水有记忆」、「正确的螺旋运动可释放能量」，盖世太保抓他做实验，二战末逃出后郁郁而终。",
    story: [
      "Schauberger 是奥地利森林管理员，1920 年代研究山区溪流、鳟鱼上溯、漂木自然分类。他认为「水的螺旋形流动」能释放未被认识的能量，称之为「内爆」(implosion) 而非主流的「外爆」(explosion)。",
      "二战中盖世太保把他抓进毛特豪森集中营，命令他用犹太囚犯做「飞碟动力装置」实验。1945 年他被美军「曲别针行动」带去美国，但合同纠纷后回奥地利，1958 年贫困死亡。",
      "今天「Schauberger 涡轮」「内爆引擎」仍是替代能源圈话题；新西兰、奥地利等地有少数研究小组复现他的水净化与曲管设计，部分成果发表于环境科学期刊。"
    ],
    mainstreamView: "Schauberger 的「内爆能量」概念无清晰物理定义；任何宣称「自由能源」的实验都未被独立复现。",
    hereticalView: "他对水力工程、螺旋几何、生物友好曲管的观察具洞察价值，被低估；现代水处理、节能管路设计部分继承其思路。",
    weirdRating: 4,
    credibilityLow: 15,
    credibilityHigh: 45,
    status: "暧昧",
    links: {"wiki":"https://en.wikipedia.org/wiki/Viktor_Schauberger"}
  },
  {
    id: "townsend-brown",
    category: "lost-genius",
    era: "1923–1985",
    titleZh: "汤森·布朗与 Biefeld-Brown 效应",
    titleEn: "Thomas Townsend Brown & The Biefeld-Brown Effect",
    protagonist: "Thomas Townsend Brown",
    hook: "高压电极对会产生神秘推力, 美军 1950 年代秘密研究反重力, 后被官方否认。",
    story: [
      "1923 年美国少年 Brown 在物理课上发现：高压电容器在充电时似乎会产生推力。他与导师 Biefeld 教授深入研究, 命名这一现象为 Biefeld-Brown 效应。",
      "1950 年代他与美国海军、Glenn L. Martin 公司合作的「Project Winterhaven」研究将该效应用于飞行器推进。项目机密度极高, 1957 年后官方淡出。多年来 B-2 隐身轰炸机的部分电荷设计被疑借鉴。",
      "今天主流将该效应解释为「离子风」(ion wind), 即被电离的空气分子推动。但部分实验在真空中仍报告异常推力, 这一线已成 fringe 物理研究的常见话题。"
    ],
    mainstreamView: "Biefeld-Brown 效应是经典「离子风」, 在真空中应消失。所谓反重力只是误测。",
    hereticalView: "已有真空实验仍报告推力, 主流解释不完整; 美军可能仍在黑预算中研究该效应。",
    weirdRating: 5,
    credibilityLow: 15,
    credibilityHigh: 40,
    status: "暧昧",
    links: {"wiki":"https://en.wikipedia.org/wiki/Thomas_Townsend_Brown"}
  },
  {
    id: "phoebus-cartel",
    category: "suppressed",
    era: "1924–1939",
    titleZh: "Phoebus 灯泡卡特尔：寿命被合谋砍掉一半",
    titleEn: "The Phoebus Cartel",
    protagonist: "Osram, Philips, GE et al.",
    hook: "1924 年, 全球大灯泡公司密谋把灯泡寿命从 2500 小时砍到 1000 小时, 处罚成员超出寿命的产品。",
    story: [
      "1924 年 12 月 23 日, 欧司朗 (Osram)、飞利浦 (Philips)、通用电气 (GE)、东京电气 (Toshiba) 等全球主要灯泡厂商在日内瓦签署 Phoebus 协议, 成立卡特尔, 主要目标是「设定灯泡寿命标准」。",
      "新「标准」: 灯泡寿命从此前业界已实现的 2500 小时降至 1000 小时。任何成员公司生产寿命超标的产品要罚款。这是现代「计划性报废」(planned obsolescence) 的开山之作。",
      "卡特尔运行至 1939 年二战爆发解散。但其设定的「1000 小时」标准延续到 1990 年代节能灯出现才被打破。1901 年加州 Livermore 消防局点的爱迪生灯泡至今仍亮着 (≥120 年), 证明长寿命技术早已存在。"
    ],
    mainstreamView: "Phoebus 卡特尔被欧美法庭长期判定为非法垄断行为, 是商业史经典案例。",
    hereticalView: "100 年前的「计划性报废」基因已渗透到所有耐用消费品 (手机/家电/汽车), 比卡特尔本身更系统化。",
    weirdRating: 4,
    credibilityLow: 80,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Phoebus_cartel"}
  },
  {
    id: "edwin-armstrong",
    category: "suppressed",
    era: "1933–1954",
    titleZh: "Edwin Armstrong：FM 广播之父跳楼自杀",
    titleEn: "Edwin Armstrong & The FM Radio Suppression",
    protagonist: "Edwin Howard Armstrong",
    hook: "他发明 FM 广播, RCA 创始人萨诺夫剽窃他的专利, 22 年诉讼把他打到 1954 年从公寓 13 楼跳下。",
    story: [
      "Armstrong 是哥伦比亚大学电气工程教授, 1933 年发明频率调制 (FM) 广播, 比当时主流的 AM 信噪比高数十倍。RCA 创始人 David Sarnoff 是他的好友, 看到 demo 后「热情」许诺合作。",
      "结果 RCA 转头自己注册了一批关键专利, 起诉 Armstrong 反过来侵权, 还游说 FCC 把 FM 频段从 42-50 MHz 移到 88-108 MHz, 让 Armstrong 已铺设的发射台一夜作废。22 年缠讼把 Armstrong 的财产、健康、婚姻全榨干。",
      "1954 年 1 月 31 日, Armstrong 写完辞世信, 从纽约河滨大道公寓 13 楼跳下。妻子 Marion 之后用 1.5 亿美元诉讼额最终从 RCA 拿到赔偿, 但 Armstrong 已死。FM 广播今天通用, 但他的名字几乎被抹去。"
    ],
    mainstreamView: "Armstrong 的悲剧主要是商业 + 个人因素, RCA 行为虽不光彩但在当时商业环境内常见。",
    hereticalView: "这是 20 世纪科技史上最赤裸的「专利霸权扼杀发明者」案例, 与 Tesla 事件性质类似。",
    weirdRating: 4,
    credibilityLow: 80,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Edwin_Howard_Armstrong"}
  },
  {
    id: "pioneer-anomaly",
    category: "unsolved-physics",
    era: "1980s–2012",
    titleZh: "Pioneer 异常: 探测器为啥减速?",
    titleEn: "The Pioneer Anomaly",
    protagonist: "Pioneer 10/11 探测器",
    hook: "1972/73 年发射的两台 NASA 探测器飞过冥王星轨道后, 神秘地以 8.74×10⁻¹⁰ m/s² 的微弱加速度向太阳减速, 30 年后才被解释。",
    story: [
      "Pioneer 10 (1972) 和 Pioneer 11 (1973) 是人类首批飞越太阳系外缘的探测器。1980 年代起, JPL 跟踪团队发现两台探测器都以 8.74×10⁻¹⁰ m/s² 的微弱加速度向太阳「减速」, 偏离纯引力轨道。",
      "效应非常微弱 (相当于每 10 年偏离 13,000 公里), 但极其稳定。20 年间提出过修改广义相对论、暗物质引力、第五种基本力等异端假说。一些理论物理学家把它当作通向新物理的潜在窗口。",
      "2012 年葡萄牙物理学家 Slava Turyshev 团队最终确认: 异常来自探测器自身钚-238 RTG 电源的热辐射各向异性 (热反作用力)。新物理梦想破灭, 但此前 20 年的假说尝试本身仍是有趣思想史。"
    ],
    mainstreamView: "Pioneer 异常已被 2012 年精确热建模解释, 是 RTG 热辐射各向异性。无新物理。",
    hereticalView: "热建模能解释观察的 100%? 部分残差仍存在, 类似的飞掠 (Flyby) 异常至今未被完全解释。",
    weirdRating: 3,
    credibilityLow: 75,
    credibilityHigh: 95,
    status: "cold",
    links: {"wiki":"https://en.wikipedia.org/wiki/Pioneer_anomaly"}
  },
  {
    id: "mpemba-effect",
    category: "unsolved-physics",
    era: "1963–",
    titleZh: "Mpemba 效应: 热水比冷水更快结冰",
    titleEn: "The Mpemba Effect",
    protagonist: "Erasto Mpemba",
    hook: "1963 年坦桑尼亚一位中学生在做冰激凌时发现的反常现象, 60 年了至今没完全解释清楚。",
    story: [
      "1963 年坦桑尼亚 13 岁中学生 Erasto Mpemba 做冰激凌时发现: 把热牛奶混合物放进冰箱, 比冷牛奶混合物先结冰。他向访校的物理学家 Denis Osborne 报告, Osborne 验证后, 1969 年两人合作发表论文。",
      "效应在某些条件下确实可重复, 但不是所有条件下成立。提出过的解释: 蒸发减少水量、对流流场不同、溶解气体差异、过冷点不同、氢键结构。每种假说都只能解释部分实验。",
      "2016 年皇家化学学会发起官方挑战赛, 多个团队参赛尝试一锤定音, 至今未达成统一解释。这一现象成为「常识中藏着深奥物理」的教科书例子, 至今仍是物理化学研究的热点。"
    ],
    mainstreamView: "Mpemba 效应是真实但条件依赖的现象, 多种机制叠加 (蒸发+对流+过冷), 无统一理论。",
    hereticalView: "效应可能涉及水分子氢键网络的「记忆」现象, 与生命科学中的水模型相通, 仍是未发掘的物理。",
    weirdRating: 3,
    credibilityLow: 60,
    credibilityHigh: 90,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Mpemba_effect"}
  },
  {
    id: "coral-castle",
    category: "ancient-tech",
    era: "1923–1951",
    titleZh: "珊瑚城堡: 一个 1.5 米的人怎么搬动 30 吨石头?",
    titleEn: "Coral Castle by Edward Leedskalnin",
    protagonist: "Edward Leedskalnin",
    hook: "拉脱维亚移民 Leedskalnin 一人无机械搬运、雕刻、立起 1100 多吨珊瑚石, 28 年没人见过他怎么做的。",
    story: [
      "1923-1951 年间, 身高 152 cm、体重 45 kg 的拉脱维亚移民 Edward Leedskalnin 独自一人在佛罗里达州 Homestead 建造「珊瑚城堡」, 包括重达 30 吨的单块石头门 (旋转完美, 一指可推开)、9 吨的月相石、独立摇篮椅等。",
      "他从不让任何人在场看他工作, 只在夜里搬运。当地居民只见到他用三脚架、木杠、链条等原始工具。他写了几本小书谈「磁电学」(Magnetic Current), 据称掌握了「古埃及人造金字塔的方法」。",
      "1951 年他突发胃癌死亡, 没留下任何工艺笔记。1986 年那扇 30 吨旋转门修复时, 即使用现代起重机和 6 个工人也极其困难。他到底如何独自做到, 至今没有令人信服的解释。"
    ],
    mainstreamView: "他用了滑轮、杠杆、千斤顶等原始工具配合不懈耐心, 没有任何超自然或失传科技。",
    hereticalView: "他声称掌握了「磁电学」+ 古代抗重力工艺; 30 吨完美旋转门的工程精度难以用单人原始工具实现。",
    weirdRating: 5,
    credibilityLow: 30,
    credibilityHigh: 60,
    status: "暧昧",
    links: {"wiki":"https://en.wikipedia.org/wiki/Coral_Castle"}
  },
  {
    id: "voynich-manuscript",
    category: "ancient-tech",
    era: "约 1404–1438",
    titleZh: "Voynich 手稿: 600 年没人读懂的书",
    titleEn: "The Voynich Manuscript",
    protagonist: "未知作者",
    hook: "240 页彩绘手稿, 全文用一种从未被识别的文字写成。植物图、星象图、裸女图都不属于已知任何文化。",
    story: [
      "Voynich 手稿现存耶鲁大学 Beinecke 图书馆 MS 408。羊皮纸碳-14 测定为 1404-1438 年欧洲所制。240 页彩绘内容: 不存在的植物、奇怪天文图、裸女在管道与星象间的浴池场景, 以及 35,000 个不属于任何已知字母的「字符」。",
      "100 年来, 顶级密码学家 (含二战 Enigma 破译者) 都失败了。统计学分析显示文本符合自然语言的熵特征 (不是随机), 但内容至今无人破译。2017-2024 多次「我们破译了」论文都被推翻或不被接受。",
      "AI 时代到来后, 多个团队用大模型尝试破译。2024 年某些组件 (黄道带、植物分类) 被认为可能是中世纪某种教学/医学手册, 但全文意义仍为谜。可能是密语、创伤后患者的私人语言、未被识别的真实自然语言, 或精心设计的骗局。"
    ],
    mainstreamView: "可能是中世纪某种实用手册 (草药、医学、占星), 用密语或某种地方方言写成, 等待破译。",
    hereticalView: "Voynich 文字的统计性质太接近真实自然语言, 不像伪造; 可能是某种已消失的学派/流派的私语手册。",
    weirdRating: 5,
    credibilityLow: 65,
    credibilityHigh: 95,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Voynich_manuscript"}
  },
  {
    id: "sheldrake-morphic",
    category: "fringe-science",
    era: "1981–",
    titleZh: "Sheldrake 形态共振: 物种集体记忆假说",
    titleEn: "Rupert Sheldrake & Morphic Resonance",
    protagonist: "Rupert Sheldrake",
    hook: "剑桥生物学家提出「场记忆」, 称物种学习行为会通过非局域共振传递, 被《自然》杂志主编称「应该被烧的书」。",
    story: [
      "Rupert Sheldrake 是剑桥生化学博士, 皇家学会研究员资历。1981 年出版《新生命科学》提出「形态共振」(morphic resonance): 物种习得的行为会通过非局域「形态场」传递给同物种其他个体, 跨越时空。",
      "《自然》(Nature) 当时主编 John Maddox 1981 年公开撰文称「这本书该被烧掉」(a book for burning), 是该刊有史以来最强烈的反应。但 Sheldrake 设计了一系列实验: 老鼠迷宫学习速度的全球加速、英国 vs 澳洲新发明字谜的解题速度差异等, 部分报告了正向效应。",
      "他至今仍在剑桥独立运营研究, 出版多本书 (《被狗预知的现象》《被注视感》等)。学界主流仍视为伪科学, 但他在英国知识分子圈仍有可观读者。形态共振假说从未被严格证伪也未被严格证实。"
    ],
    mainstreamView: "形态共振违反已知物理定律, 实验结果都可用统计偏差或心理预期解释。属于伪科学。",
    hereticalView: "Sheldrake 多个实验设计严格 (双盲对照), 结果若是真信号, 意味着生物信息有非局域传递机制。",
    weirdRating: 4,
    credibilityLow: 10,
    credibilityHigh: 35,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Morphic_resonance"}
  },
  {
    id: "nde-aware",
    category: "fringe-science",
    era: "2001–",
    titleZh: "AWARE 研究: 心脏停跳后的意识",
    titleEn: "AWARE Study & Near-Death Experience",
    protagonist: "Sam Parnia",
    hook: "纽约 Stony Brook 医生 Parnia 让濒死病人猜测心脏停跳期间天花板上贴的图案, 真有人答对。",
    story: [
      "Sam Parnia 是 Stony Brook 大学心肺复苏专家。2008 年启动 AWARE (AWAreness during REsuscitation) 研究, 在英美 15 家医院 ICU 天花板上隐藏目标图案, 让经历心跳骤停后存活的患者复述濒死期间「看到」的内容。",
      "首期研究 (2014 年发表 Resuscitation 期刊) 在 2060 例心脏骤停中, 101 例报告濒死体验。其中 2 例在心脏停跳后报告了准确的语音和视觉细节 (虽未直接对应天花板图案)。AWARE-II (2023 年) 继续扩大研究。",
      "Parnia 的态度极审慎: 不主张「灵魂出窍」, 但坚持「意识与大脑活动的关系尚未被理解」。这与 1980 年 Pim van Lommel 在荷兰心脏科 1990 年代的 NDE 研究 (《柳叶刀》2001 年发表) 形成系列学术证据链。"
    ],
    mainstreamView: "心脏停跳后的「意识」可能是濒死前几秒大脑供血变化引发的幻觉, 不必假设「意识独立存在」。",
    hereticalView: "Parnia 与 van Lommel 的研究在严格临床条件下进行, 报告了不能用脑活动直接解释的细节。意识与脑的关系仍是开放问题。",
    weirdRating: 5,
    credibilityLow: 25,
    credibilityHigh: 55,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/AWARE_study"}
  },
  {
    id: "mk-ultra",
    category: "corporate-shadow",
    era: "1953–1973",
    titleZh: "MK-Ultra: CIA 用 LSD 洗脑普通人",
    titleEn: "Project MK-Ultra",
    protagonist: "Sidney Gottlieb (CIA)",
    hook: "1953-1973 CIA 用 LSD 给毫不知情的美国/加拿大公民下药, 测试洗脑可能。死了几个人, 文件 1973 年被销毁。",
    story: [
      "MK-Ultra 是 CIA 1953 年由 Allen Dulles 批准的秘密项目, 由化学家 Sidney Gottlieb 主持。目标: 探索心理控制、洗脑、审讯增强药物。范围 80+ 子项目, 涉及 44 所大学、12 家医院、20 多家研究所。",
      "其中包括: 给毫不知情的美国公民下 LSD (Subproject 6: 妓院交易客)、加拿大蒙特利尔 Cameron 实验 (用电击 + 长睡 + 录音洗脑)、Frank Olson 1953 年在 LSD 影响下「跳出」纽约 13 楼酒店 (家属至今认为是被推下)。",
      "1973 年 CIA 局长 Richard Helms 命令销毁所有 MK-Ultra 文件。1975 年参议员 Frank Church 委员会调查, 因仅剩约 20,000 页财务文件得以拼出大致框架。1995 年克林顿政府正式向受害者道歉。这是 20 世纪美国政府对本国公民最赤裸的非自愿人体实验。"
    ],
    mainstreamView: "MK-Ultra 是美国冷战时期黑暗一页, 已被国会调查公开, 财务和受害人记录基本清楚。",
    hereticalView: "1973 年销毁的核心文件至今未公开; 部分子项目 (如 Cameron 实验) 后被认为延续到 1980 年代, 真相可能更深。",
    weirdRating: 5,
    credibilityLow: 80,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/MKUltra"}
  },
  {
    id: "operation-northwoods",
    category: "corporate-shadow",
    era: "1962",
    titleZh: "Northwoods 行动: 美军提议假旗炸自己人发动战争",
    titleEn: "Operation Northwoods",
    protagonist: "美国参谋长联席会议",
    hook: "1962 年美国参谋长联席会议向肯尼迪提交提案: 假装古巴袭击, 炸沉美国军舰, 杀死美国公民, 借此发动战争。肯尼迪拒绝。",
    story: [
      "1962 年 3 月 13 日, 美国参谋长联席会议主席 Lyman Lemnitzer 上将向国防部长 McNamara 提交「Northwoods 行动」绝密文件, 列出多种假旗方案: 炸沉关塔那摩附近美国军舰、击落民航客机、伪装恐袭、刺杀古巴流亡者, 然后栽赃古巴, 制造发动战争的舆论基础。",
      "肯尼迪总统亲自拒绝该提案, 几个月后将 Lemnitzer 调离参联会主席职位 (派去欧洲做盟军司令)。文件被深度机密保管, 无任何高级官员公开提及, 直到 1997 年 ABC 记者 James Bamford 在国家档案馆解密文件中发现并出版。",
      "Northwoods 是已被官方解密的、写得最赤裸的美国政府对本国公民提议假旗的文件。这一历史先例, 让 911、波士顿马拉松、各类大型恐袭的「内部假旗」假说在阴谋论圈拥有了一个永远的引用基底。"
    ],
    mainstreamView: "Northwoods 是 1962 年极少数过激官员的提案, 被肯尼迪拒绝, 从未实施。属于历史警示, 不是阴谋论证据。",
    hereticalView: "如果 1962 年高层敢于把这种提案写下来, 之后 60 年里类似提议在更秘密的渠道里流传/部分实施的可能性不为零。",
    weirdRating: 5,
    credibilityLow: 95,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Operation_Northwoods"}
  },

  // ===== 7. 失落的天才 — 续 =====
  {
    id: "thomas-moray",
    category: "lost-genius",
    era: "1909–1939",
    titleZh: "Thomas Moray 与「辐射能」装置",
    titleEn: "T. H. Moray & The Radiant Energy Device",
    protagonist: "Thomas Henry Moray",
    hook: "他声称能从「宇宙辐射」里取电,实验室被砸,助手叛投苏联。",
    story: [
      "1909 年起 Moray 在犹他州研发一种据称能从大气电离层和宇宙辐射中提取电力的「辐射能装置」。1925–1939 多次公开演示让 50W 灯泡及电热棒在没有外接电源的情况下亮起来,工程师与州议员当场签证。",
      "Rural Electrification Administration (REA) 派工程师 Felix Frazer 渗透研究,后者带走部分核心电路图叛逃苏联。1939 年某夜实验室被人持锤砸碎,Moray 自此装持枪,装置图纸再没复现成功。",
      "1985 年家族成立 Moray Research,声称仍在试图复现。专利局至今未授其核心专利,理由是无法独立复现。"
    ],
    mainstreamView: "无第三方独立复现,Moray 演示中可能存在隐藏电池或外接线。",
    hereticalView: "Moray 描述的「不对称电容+晶体管前体」如属实,等于 1930 年代就有人独立做出半导体雏形。",
    weirdRating: 5,
    credibilityLow: 10,
    credibilityHigh: 30,
    status: "cold",
    links: {"wiki":"https://en.wikipedia.org/wiki/Thomas_Henry_Moray"}
  },
  {
    id: "john-keely",
    category: "lost-genius",
    era: "1872–1898",
    titleZh: "John Keely 与「以太涡流引擎」",
    titleEn: "John Worrell Keely & The Etheric Engine",
    protagonist: "John Worrell Keely",
    hook: "他说音叉能驱动机器,投资人相信了 26 年,死后地下室找到压缩空气管。",
    story: [
      "1872 年费城机械工 Keely 宣称发明「以太涡流发动机」,通过特定频率的音波激发空气中的「以太流」转化为机械动力。Keely 公司股票上市,26 年里筹得相当于今天约 1 亿美元。",
      "演示中机械装置随其调音叉而启动停止,科学界称为骗局,但他从未被起诉。1898 年他突然去世,继任投资人立即拆除地下室,发现一根 8 英寸压缩空气管隐藏在地板夹层中,通过墙壁连接展示间。",
      "争议至今:压缩空气解释了部分演示,但若全部依靠它,Keely 持续维护这套设备 26 年的工程能力本身亦是异常。部分研究者认为他可能在压缩空气基础上叠加了某种声学共振效果。"
    ],
    mainstreamView: "完美的诈骗案。压缩空气管的发现是直接物证。",
    hereticalView: "Keely 的部分笔记记录了与今天「声辐射力 acoustic radiation force」一致的现象描述,在 1872 年这是先于物理学的观察。",
    weirdRating: 4,
    credibilityLow: 5,
    credibilityHigh: 20,
    status: "cold",
    links: {"wiki":"https://en.wikipedia.org/wiki/John_Ernst_Worrell_Keely"}
  },

  // ===== 8. 被压抑的发明 — 续 =====
  {
    id: "pogue-carburetor",
    category: "suppressed",
    era: "1936",
    titleZh: "Pogue 化油器:200 mpg 的灰盒子",
    titleEn: "Pogue 200 mpg Carburetor",
    protagonist: "Charles Nelson Pogue",
    hook: "1936 年加拿大人造出据称能让普通车跑 200 mpg 的化油器,然后被买走。",
    story: [
      "1933–1936 年加拿大温尼伯发明家 Pogue 申请并获得 3 项美国专利,描述一种通过预热汽油至蒸气状态再注入燃烧室的化油器。1936 年《Winnipeg Free Press》报道一辆 Ford V8 装上后跑了 200 mpg(常规为 14 mpg)。",
      "随后 Breen Motor 等公司参与测试,Pogue 拒绝出售技术。1936 年下半年起新闻彻底消失,Pogue 转向给军方做火焰喷射器,公开技术轨迹中断。专利公开文本至今可读,但缺少关键参数。",
      "类似燃料蒸气化路线在今天被部分柴油机厂商作为「均质压燃 HCCI」研究方向。理论上汽油蒸气均匀燃烧效率确高于雾化液滴,但工程窗口极窄,易爆震。"
    ],
    mainstreamView: "200 mpg 在物理上几乎不可能(汽油热值上限决定);该报道为媒体夸大。",
    hereticalView: "100 mpg 在窄工程窗口内并非完全不可能;若专利全本含完整参数,被收购方已锁柜 90 年。",
    weirdRating: 4,
    credibilityLow: 15,
    credibilityHigh: 40,
    status: "cold",
    links: {"wiki":"https://en.wikipedia.org/wiki/Charles_Nelson_Pogue"}
  },
  {
    id: "joe-newman-machine",
    category: "suppressed",
    era: "1979–2015",
    titleZh: "Joe Newman 能量机:专利局拒绝受理 30 年",
    titleEn: "Joe Newman's Energy Machine",
    protagonist: "Joseph Newman",
    hook: "他说他造的电机输出大于输入,专利局拒绝授权,他在国会作证。",
    story: [
      "1979 年密西西比州 Newman 提交「能量机」专利,声称大型线圈+永磁体组合能产生比电池输入更大的电能输出。1986 年美国专利局以「违反热力学」为由驳回,Newman 起诉至联邦法院。",
      "国家标准局 (NBS) 在法院命令下做了独立测试,1986 年报告:输出/输入比 < 1,未发现超额能量。但 Newman 反驳测试用了不正确的负载方式。Newman 在国会众议院能源小组听证作证,要求政府重新评估。",
      "Newman 2015 年去世前一直在 YouTube/路演中演示。粉丝群体延续至今。专利局保留拒绝立场。无任何独立实验室在受控条件下复现 COP > 1。"
    ],
    mainstreamView: "测量误差+磁滞回收的二次电流被误读为「额外输出」。30 年无独立复现。",
    hereticalView: "Newman 的大型低频铜线圈结构未被主流认真检查过;若超额能量不存在,粉丝群至少证明了一件事:专利局不愿讨论物理边界。",
    weirdRating: 4,
    credibilityLow: 5,
    credibilityHigh: 15,
    status: "cold",
    links: {"wiki":"https://en.wikipedia.org/wiki/Joseph_Newman_(inventor)"}
  },

  // ===== 9. 未解物理学 — 续 =====
  {
    id: "dama-libra",
    category: "unsolved-physics",
    era: "1995–至今",
    titleZh: "DAMA/LIBRA:30 年没人重现的暗物质年信号",
    titleEn: "DAMA/LIBRA Annual Modulation",
    protagonist: "Rita Bernabei 团队 / Gran Sasso",
    hook: "意大利地下实验室连续 25 年看到一个跟着地球公转走的信号,别人怎么都看不到。",
    story: [
      "1995 年起 DAMA 在意大利 Gran Sasso 山下实验室用 NaI 闪烁体阵列搜寻暗物质,声称看到了一个 1 年周期的信号——地球绕日公转穿过暗物质风时强弱变化的预期模式。统计显著性已超过 9.5 sigma。",
      "问题是:LUX, XENON1T, CDMS, COSINE-100 等用更灵敏探测器,在同样模型下没看到任何东西。年信号要么是真暗物质且其它实验有未知盲点,要么是 DAMA 自己的系统效应。",
      "COSINE-100 (韩国/美国合作)用 NaI 完全复制 DAMA 配置在韩国地下,2024 年初步结果给出与 DAMA 相反的零信号,但还需更长曝光时间确认。30 年的争议仍未结束。"
    ],
    mainstreamView: "DAMA 大概率是温度/钾-40 杂质等系统效应被错误解释为暗物质年信号。",
    hereticalView: "如果 COSINE 在 5 年后仍看不到信号但 DAMA 还在,问题就回到环境参数上:是否 NaI 在意大利某处接触到了别处没有的东西?",
    weirdRating: 4,
    credibilityLow: 20,
    credibilityHigh: 50,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/DAMA/LIBRA"}
  },
  {
    id: "opera-faster-than-light",
    category: "unsolved-physics",
    era: "2011–2012",
    titleZh: "OPERA 中微子超光速:被一根松线缆击败的革命",
    titleEn: "OPERA Faster-Than-Light Neutrinos",
    protagonist: "OPERA 实验组 / CERN-LNGS",
    hook: "2011 年中微子比光快 60 纳秒,全世界震动 6 个月,然后发现是光纤接头松了。",
    story: [
      "2011 年 9 月 OPERA 实验组宣布 CERN→Gran Sasso 730 km 飞行的中微子比光速早到 60.7 ns,统计显著 6 sigma。如果属实,狭义相对论从根上要修。论文上传 arXiv 当天全球物理界沸腾。",
      "2012 年 2 月 OPERA 自己发现两个误差源:GPS 接收机光纤接头未拧紧导致系统延迟,加上时钟振荡器漂移。修正后中微子飞行时间符合光速。3 月发言人和负责人辞职。",
      "故事从科学角度看是「严谨主义胜利」:实验组主动公开异常→社区压力测试→源头被找出。但从社会学角度看,它揭示了高能物理学家面对挑战相对论的结果时多么如临大敌——即便后来证明是接头松了,反应速度本身值得记下。"
    ],
    mainstreamView: "标准的实验事故。光纤接头松动是已确认源头,无任何超光速现象。",
    hereticalView: "故事不应被简单读为「狼来了」:它是少数物理实验中,异常假设被认真追溯到根的范例。下次该认真而非该耻笑。",
    weirdRating: 3,
    credibilityLow: 95,
    credibilityHigh: 100,
    status: "cold",
    links: {"wiki":"https://en.wikipedia.org/wiki/Faster-than-light_neutrino_anomaly"}
  },

  // ===== 10. 古代科技 — 续 =====
  {
    id: "gobekli-tepe",
    category: "ancient-tech",
    era: "公元前 9500–8000",
    titleZh: "哥贝克力石阵:农业之前的神庙",
    titleEn: "Göbekli Tepe",
    protagonist: "土耳其东南安纳托利亚",
    hook: "12000 年前狩猎采集者建成的巨石神庙,比农业、陶器、文字都早 5000 年。",
    story: [
      "1994 年德国考古学家 Klaus Schmidt 在土耳其东南确认了一组直径 300 m 的圆形石阵复合体。放射性碳测年最早一层 11500 年前(公元前 9500),比苏美尔早 6000 年,比金字塔早 7000 年。",
      "石柱重 10–20 吨,T 字形,顶部刻有动物浮雕。当时人类被认为还停留在狩猎采集阶段——常规叙事认为「定居→农业→剩余食物→宗教/纪念建筑」。哥贝克力石阵颠倒了顺序:可能是「宗教/聚集→需要食物→农业」。",
      "更诡异的是约公元前 8000 年,这片遗址被人为埋葬在土堆之下,工艺整齐有序。为什么建,为什么停,为什么埋,没有写下来。整个 Anatolian 农业转化的「驯化中心」假说现在围绕这处遗址重组。"
    ],
    mainstreamView: "这是已确认的真遗址,真年代,但建造者社会形态学界仍激烈争论。",
    hereticalView: "如果 12000 年前狩猎采集者就有此组织能力,那么「文明先于农业」可能不是 Göbekli 一处例外。再老的层位还在挖。",
    weirdRating: 4,
    credibilityLow: 95,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/G%C3%B6bekli_Tepe"}
  },
  {
    id: "damascus-steel",
    category: "ancient-tech",
    era: "公元 300–1750",
    titleZh: "大马士革钢:消失 300 年的纳米管刀",
    titleEn: "Damascus Steel & Lost Nanotubes",
    protagonist: "中东 / 印度南部 wootz 锭",
    hook: "中世纪刀刃在电子显微镜下出现碳纳米管,工艺到 18 世纪失传至今没人复刻。",
    story: [
      "中世纪十字军记载大马士革钢刀「能砍断丢下的丝巾」「弯曲 90 度仍弹回」。现代检验确认其表面有独特的水波纹路。原料 wootz 钢锭来自印度南部 Telangana 地区。",
      "约 1750 年起 wootz 矿源品质下降,锻造工艺迅速失传。19 世纪欧洲人多次试图复制,均无法重现刀刃硬度+韧性的组合。",
      "2006 年德累斯顿工业大学用电子显微镜在 17 世纪大马士革钢刀样本上发现了碳纳米管和渗碳体纳米线,认为正是这些结构提供了非凡的力学性能。问题是:1700 年代锻铁匠如何在 1100°C 反复锻打+局部冷却中无意中合成出纳米管?"
    ],
    mainstreamView: "原料矿微量元素 + 长期经验试错的工艺包,失传是因供应链断+学徒断。无神秘成分。",
    hereticalView: "纳米管在锻造温度下生成机制至今没被完整复现;某些迭代的工艺可能掌握了被现代材料学称为「热机械加工 + 微观结构控制」的早期版本。",
    weirdRating: 3,
    credibilityLow: 90,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Damascus_steel"}
  },

  // ===== 11. 边缘科学 — 续 =====
  {
    id: "skinwalker-aawsap",
    category: "fringe-science",
    era: "1996–至今",
    titleZh: "Skinwalker Ranch:DARPA 投钱的农场",
    titleEn: "Skinwalker Ranch & AAWSAP",
    protagonist: "Robert Bigelow / DIA",
    hook: "犹他州一座 480 英亩农场,UFO+异常生物报告聚集,五角大楼花了 2200 万查它。",
    story: [
      "1996 年航天大亨 Robert Bigelow 买下犹他州 Uintah 县一处农场,前主因「光球」「不明生物」「家畜被精确切割」放弃。Bigelow 设立 NIDS (National Institute for Discovery Science) 配监控,记录数百起异常事件。",
      "2008 年 Bigelow 拿下美国国防情报局 (DIA) 的「先进航空航天威胁与情报项目 AATIP/AAWSAP」合同,2200 万美元,部分研究就在这处农场进行。结果文件大部分至今保密,2017 年纽约时报报道项目存在后才解密小部分。",
      "2021 年起 History Channel 推出真人秀《Skinwalker Ranch 之谜》,新业主仍在持续记录现象。2023 年美国国会公开听证 UAP 时,议员多次问及该农场资料。"
    ],
    mainstreamView: "心理传染+期望偏差+部分恶作剧。AAWSAP 资金最终未带来可发表科学结果。",
    hereticalView: "DIA 主动出资 2200 万,且 AAWSAP 报告至今部分仍保密,本身就是一条独立信号——即使现象不存在,某层级官员相信它存在。",
    weirdRating: 5,
    credibilityLow: 25,
    credibilityHigh: 60,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Skinwalker_Ranch"}
  },
  {
    id: "hessdalen-lights",
    category: "fringe-science",
    era: "1981–至今",
    titleZh: "Hessdalen 光团:挪威山谷里 40 年的光",
    titleEn: "Hessdalen Lights",
    protagonist: "挪威 Sør-Trøndelag 山谷",
    hook: "挪威某山谷 1981 年起每周出现不明光团,大学装了自动监测站持续 30 年。",
    story: [
      "1981 年起挪威 Hessdalen 山谷居民频繁报告白色/黄色发光球体悬停或低速移动,持续数秒到一小时。1983 年起 UFO-Norge 派人值守,记录到数百次目击。",
      "1998 年 Østfold College 设立全自动监测站 EMBLA-1,装备磁力计+光谱仪+视频。30 年数据集显示光团出现频率每年约 20 次,光谱中检测到等离子体特征,磁力扰动与光团出现部分相关。",
      "假说包括:岩石压电效应释放带电气溶胶在山谷下风积聚→等离子体自激发光;或 Coulomb 库仑爆炸释放含金属粉尘的电荷云。两者都未完整解释光团的精确轨迹和持续时间。"
    ],
    mainstreamView: "罕见但真实的大气等离子体现象;岩石压电+稀有地质组合在山谷里堆出长寿命光团。",
    hereticalView: "持续 30 年的可重复数据集是其它「UFO 热点」从来没拿出过的;它把奇观变成了可研究对象,但科学家不爱碰。",
    weirdRating: 3,
    credibilityLow: 70,
    credibilityHigh: 90,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Hessdalen_lights"}
  },

  // ===== 12. 企业 · 政府阴影 — 续 =====
  {
    id: "sugar-research-1967",
    category: "corporate-shadow",
    era: "1965–1967",
    titleZh: "Sugar Research 1967:糖业花钱重写心脏病论文",
    titleEn: "Sugar Industry's 1967 Harvard Pivot",
    protagonist: "Sugar Research Foundation / Harvard",
    hook: "糖业行业 1967 年付钱让哈佛 3 名学者发文章把心脏病甩锅给脂肪,糖被洗白 50 年。",
    story: [
      "1965–1967 年美国 Sugar Research Foundation 付给 3 名哈佛公共健康学者 6500 美元(约今天 5 万美金)撰写一篇综述,选择性引用研究,把糖与心脏病关联弱化,把饱和脂肪写成主要凶手。论文发表于 1967 年新英格兰医学杂志 NEJM。",
      "这篇综述影响了之后 50 年的美国饮食指南——低脂高糖成为主流推荐,1970–2000 年代肥胖率与糖尿病率同步飙升。哈佛学者 Mark Hegsted 后来出任美国农业部营养政策主任。",
      "2016 年 UCSF 历史学家 Cristin Kearns 在 SRF 内部档案中找到付款单据和编辑往来邮件,发表于 JAMA Internal Medicine。这是公认实例:行业资金可以在科学权威机构内部直接改写公共健康主流叙事。"
    ],
    mainstreamView: "已被 2016 JAMA 论文证实,有完整付款单据,这不是阴谋是历史。",
    hereticalView: "如果糖业 1967 年能这么干,烟草、石油、Pharma、AI 训练数据等行业现在很可能正在做同样的事——只是档案还没解密。",
    weirdRating: 4,
    credibilityLow: 95,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Sugar_Research_Foundation"}
  },
  {
    id: "operation-paperclip",
    category: "corporate-shadow",
    era: "1945–1959",
    titleZh: "Operation Paperclip:把纳粹科学家洗白带回美国",
    titleEn: "Operation Paperclip",
    protagonist: "美国 OSS / Joint Intelligence Objectives Agency",
    hook: "二战刚结束,美国偷偷把 1600+ 纳粹科学家+他们的家属塞进美国,洗掉前科。",
    story: [
      "1945–1959 年美国情报机关 JIOA 通过 Paperclip 行动从战败德国引进 1600 多名科学家与工程师。包括 V-2 火箭设计师 Wernher von Braun、纳粹党员、SS 成员、甚至直接参与达豪/米特尔劳奥集中营人员。",
      "杜鲁门 1946 年秘密令禁引入「真正的纳粹分子」,JIOA 直接为目标人篡改履历——用回形针(paperclip)夹一份新简历到档案上。von Braun 后来成 NASA 阿波罗火箭总师,登月就是他造的 Saturn V。",
      "苏联同期跑了类似行动「奥索维亚金行动」抢人。70 年代起部分文件解密,90 年代起公众讨论。今日 NASA 部分核心架构、美国军用航空、化武/生物医药体系都有这条移植链的痕迹。"
    ],
    mainstreamView: "完全已解密,有名单有档案。冷战必要妥协。",
    hereticalView: "如果美国 1945 年愿意为火箭技术给纳粹党员洗白,2020 年代为 AI/量子人才向哪些机构妥协,只能等下一轮档案解密。",
    weirdRating: 4,
    credibilityLow: 100,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Operation_Paperclip"}
  },
  {
    id: "svb-48h-collapse",
    category: "corporate-shadow",
    era: "2023-03",
    titleZh: "SVB 48 小时蒸发: Twitter 时代的第一次闪电挤兑",
    titleEn: "Silicon Valley Bank 48-hour Run",
    protagonist: "硅谷银行 + Garry Tan + Twitter 上的 VC",
    hook: "美国第 16 大银行, 周三公告亏损, 周五被接管. 历史教科书里所有挤兑加起来都没这次快.",
    story: [
      "2023-03-08 SVB CFO 在 Q4 信发布: 出售 HTM 持仓亏损 $1.8B, 计划增发 $2.25B. 看起来是普通财务调整, 收盘股价 -8%.",
      "2023-03-09 凌晨开始, YC Garry Tan + Founders Fund 在内部 Slack / Twitter 私聊频道发出 \"立刻把钱转出 SVB\" 的指令. Peter Thiel 旗下基金完成转账. 几小时内, 整个硅谷 VC 圈 \"群转账\".",
      "2023-03-09 当天, 客户尝试提取 $420 亿——SVB 总存款的 25% 在 24 小时内被取走. 这是历史上最快的银行挤兑.",
      "2023-03-10 上午加州金融保护与创新部接管, FDIC 派人入场. 周五. 没等到周一. 历史上所有挤兑 (1907 / 1933 / 2008) 都至少持续 1-2 周. SVB 用了 36 小时.",
      "事后调查: SVB 资产端买了大量长久期国债 + MBS, 加息周期下浮亏 $17.5B. 客户 97% 余额超 FDIC $250K 保额. 客户高度同质 (科技 VC 圈). 三个条件凑在一起 + Twitter 群聊 = 闪电挤兑.",
      "更暗的部分: 周四晚上 Founders Fund 内部 memo (后被泄露) 直接列了 \"SVB 的 8 个死亡条件\". Peter Thiel 后来表态 \"我们只是做了 fiduciary duty\"——是不是恐慌制造者, 还是早行动者, 法律没说清."
    ],
    mainstreamView: "经典的资产负债期限错配 + 利率风险管理失败. 教科书案例.",
    hereticalView: "如果 Twitter / Slack / Signal 群聊是真正的导火索, 那未来银行业的最大风险不在资产端, 而在客户的 \"集体行动协议\" 可以由一两位有影响力的人 5 分钟内引爆.",
    weirdRating: 4,
    credibilityLow: 100,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Silicon_Valley_Bank"}
  },
  {
    id: "sam-altman-coup",
    category: "corporate-shadow",
    era: "2023-11",
    titleZh: "Sam Altman 5 天政变: 全球最重要 CEO 被开除又回来",
    titleEn: "The OpenAI Boardroom Coup",
    protagonist: "Sam Altman + Ilya Sutskever + OpenAI 董事会",
    hook: "周五被董事会突袭解雇, 周三回归, 期间 770 员工威胁集体辞职. 现代企业治理史最戏剧的 5 天.",
    story: [
      "2023-11-17 周五下午, Sam Altman 接到董事会视频会议邀请, 在自家厨房被告知: 你被解雇了, 公告 5 分钟后发出.",
      "理由模糊: 董事会公告写 \"与董事会沟通中不够坦诚\" (not consistently candid). 没具体事项. 主导者是首席科学家 Ilya Sutskever + 三位独立董事.",
      "周五晚硅谷震动. Microsoft (OpenAI 主要投资人, 持有 49% 收益权) 完全不知情, Satya Nadella 周五晚才知道.",
      "周末 770 OpenAI 员工 (总 800 人) 联署威胁集体辞职到 Microsoft 的 \"新 AI 部门\" (Microsoft 火速宣布雇 Sam + Greg). Ilya Sutskever 本人也签了联署信, 反水自己发起的政变.",
      "周三 (2023-11-22) Sam Altman 回到 OpenAI 当 CEO. 旧董事会全部解散, 重组. 整个事件 5 天.",
      "真正原因至今未公开. 民间猜测: (1) AGI 重大突破 (Q* 项目) 让 Ilya 等担心安全; (2) Sam 在做 chip 公司 / 中东融资被董事会认为利益冲突; (3) 个人风格冲突积累的临界爆发. 都没证据.",
      "事后 OpenAI 内部价值观分裂依然存在. 2024-05 Ilya Sutskever 离职, 创立 Safe Superintelligence Inc. 多位核心安全员工离职. \"加速派\" vs \"安全派\" 的撕裂从这 5 天开始."
    ],
    mainstreamView: "现代企业治理失败案例, 董事会与员工权力关系新模板.",
    hereticalView: "如果真正的导火索是 AGI 内部突破 (Q* 推理能力跃迁), 那 2023-11 可能是人类第一次靠近 \"AGI 触发企业紧急状态\" 的事件. 后人会回头看这 5 天.",
    weirdRating: 5,
    credibilityLow: 95,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Removal_of_Sam_Altman_from_OpenAI"}
  },
  {
    id: "deepseek-shock",
    category: "suppressed",
    era: "2025-01",
    titleZh: "DeepSeek-R1 横空出世: 中国小公司一夜削掉 NVDA $600B 市值",
    titleEn: "DeepSeek Moment",
    protagonist: "梁文锋 + 杭州 DeepSeek + High-Flyer 量化基金",
    hook: "训练成本 $5.5M, 推理性能逼平 OpenAI o1. 美股 2025-01-27 单日 NVDA 蒸发 $600B (历史最大单日市值蒸发).",
    story: [
      "DeepSeek 由 35 岁的浙大数学背景梁文锋创立, 母公司是 High-Flyer 量化对冲基金. 团队约 140 人, 没有海外背景, 没有美国 STEM 博士.",
      "2024-12 发布 DeepSeek-V3 (671B MoE), 训练成本 $5.5M, 在多个 benchmark 接近 GPT-4. 没人重视.",
      "2025-01-20 春节前发布 DeepSeek-R1 (推理模型), 性能逼平 OpenAI o1, 完全开源 (MIT 协议), 推理 API 价格 $0.55/M tokens (OpenAI o1 $15/M, 便宜 27x).",
      "2025-01-27 周一开盘, NVDA 单日 -16.9%, 单日市值蒸发 $589B. 美国所有 AI 算力链 (AVGO/CRDO/COHR/VRT) 同步暴跌. 美国 AI 大型项目 (Stargate 上周才公告 $500B) 一夜被质疑.",
      "中国官方反应低调. 梁文锋本人没接受任何美国主流媒体采访. 春节期间 (中国新年) 团队休假, OpenAI / Anthropic 在硅谷紧急召开内部应对会议.",
      "深层冲击: (1) 训练前沿模型不需要 $1B+ 的算力, 算法 + 工程优化可以追平; (2) 中国的 \"出口管制\" 美国 GPU 没能阻止追赶; (3) 开源 + 低价 直接掐住 OpenAI / Anthropic 的高 ARR 模型.",
      "2025-Q1 全球 AI 投资逻辑重新洗牌. 软银 + OpenAI Stargate $500B 项目延期. Anthropic 调整商业模式, 加速 Claude 应用层."
    ],
    mainstreamView: "中国 AI 工程优化 + 算法创新的标志性突破. 但训练数据 / 知识产权来源不明.",
    hereticalView: "如果一家 140 人 + $5.5M 训练成本能做到的事, 那 $200B 的算力 + 数据中心军备竞赛的真实必要性可能只有 30%. 美国军费 + AI 投资可能都过度建设了 5-10 倍.",
    weirdRating: 4,
    credibilityLow: 100,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/DeepSeek"}
  },
  {
    id: "ftx-collapse",
    category: "corporate-shadow",
    era: "2022-11",
    titleZh: "FTX 7 天蒸发: $32B 加密交易所变 $0 + SBF 25 年监狱",
    titleEn: "FTX Implosion",
    protagonist: "Sam Bankman-Fried + Alameda Research + Caroline Ellison",
    hook: "全球第二大加密交易所, CoinDesk 一篇报道开始, 7 天破产. SBF 从硅谷宠儿到联邦监狱.",
    story: [
      "2022-11-02 CoinDesk 发文披露 Alameda Research (FTX 姐妹基金) 的资产 60% 是 FTX 自己发的代币 FTT. \"自己抵押自己\" 的庞氏结构曝光.",
      "2022-11-06 周日, Binance CZ 公开宣布 Binance 持有的 FTT 全部抛售 ($529M). 市场恐慌. FTT 价格 24 小时 -76%.",
      "2022-11-07-09: FTX 客户 $6B 提款挤兑. FTX 流动性见底. SBF 私下找 CZ 谈收购, Binance 派 due diligence 团队进场.",
      "2022-11-09 Binance 公告 \"放弃收购 FTX\". 看完账本他们走了. \"窟窿太大, 不可能收拾\".",
      "2022-11-11 FTX 全球申请破产保护. SBF 辞任 CEO. John Ray III (Enron 清算专家) 接管. 后续审计: 至少 $8B 客户资金被 SBF 挪用到 Alameda 投资 + 政治捐款 + 房产.",
      "2024-03-28 SBF 在曼哈顿联邦法院被判 25 年监禁. 他 32 岁. Caroline Ellison (Alameda CEO + 前女友) 配合污点证人, 判 2 年.",
      "未解部分: FTX 政治献金 ($93M 给民主党, 部分共和党) 是不是改变了 2022 中期选举? SBF 与监管机构 (SEC/CFTC) 的关系到底有多深? FTX Future Fund 资助的有效利他主义组织 (80,000 Hours / GiveWell) 是不是知道资金来源? 这些问题没结案."
    ],
    mainstreamView: "庞氏 + 自融 + 关联交易 三件套. 不会是最后一家.",
    hereticalView: "如果 SBF 没有公开高调 + 没有得罪 CZ, 这套 \"自己发币自己抵押\" 模式可能能再撑 5-10 年. FTX 不是因为骗术拙劣而崩, 是因为社交关系崩.",
    weirdRating: 5,
    credibilityLow: 100,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/FTX"}
  },
  {
    id: "archegos-30b",
    category: "corporate-shadow",
    era: "2021-03",
    titleZh: "Archegos 一周蒸发 $30B: 个人对冲基金把 5 家银行打趴",
    titleEn: "Archegos Capital Implosion",
    protagonist: "Bill Hwang + Credit Suisse + Nomura + Morgan Stanley",
    hook: "一个 50 多岁基督徒的家族办公室, 用 \"总收益互换\" 把 $20B 杠杆到 $160B, 一周内全部蒸发, 顺带把瑞信掐死.",
    story: [
      "Bill Hwang 是 Tiger 系基金经理, 2012 SEC 起诉过他内幕交易. 2013 重新创立 Archegos Capital Management (家族办公室, 不向 SEC 报告).",
      "Archegos 用 TRS (总收益互换) 在 5 家投行 (Credit Suisse / Nomura / Morgan Stanley / Goldman / UBS) 各开仓位, 每家不知道其他家的存在. 总杠杆 $20B → $160B.",
      "重仓股: ViacomCBS / Discovery / 跟谁学 / Baidu / Tencent Music. 这 5 只股票在 2020-21 涨幅惊人, 因为 Bill 自己一直在加.",
      "2021-03-22 ViacomCBS 公告增发 $3B, 股价单日 -23%. Archegos 仓位浮亏, 触发 margin call.",
      "2021-03-26 周五早盘, 5 家银行同时收到 margin call 通知. Goldman + Morgan Stanley 周四夜里偷偷砍仓, 卖了 $25B+. 瑞士信贷 + 野村反应慢, 周一开盘才大量出货.",
      "结果: Credit Suisse 亏 $5.5B (是 2020 全年利润的 110%), Nomura 亏 $2.9B. Bill Hwang 个人净资产从 $20B 到 $0, 一周.",
      "2022-04 SBF Hwang 被 SEC + 联邦法院起诉. 2024-07 被判 18 年监禁.",
      "未解的部分: 5 家银行的 prime brokerage 怎么会都不知道客户跨行总仓位? \"集合保证金报告\" 在 2008 后已经强制, 监管为什么 13 年没堵漏? 瑞信此后一蹶不振, 2023 被 UBS 收购, 历史 167 年的银行结束."
    ],
    mainstreamView: "TRS + 单一客户跨行仓位 + 监管套利的经典案例. 但监管仍未真正修复.",
    hereticalView: "如果 Bill Hwang 一个人 (没有团队 + 没有 quant 模型) 能用 \"道德感 + 福音派背景 + 跟投行客户经理喝咖啡\" 撬动 $160B 仓位, 那现代金融的风控其实建在\"信任\"而不是\"算法\"之上. 这件事 2023 SVB / 2022 FTX 都重演过.",
    weirdRating: 4,
    credibilityLow: 100,
    credibilityHigh: 100,
    status: "active",
    links: {"wiki":"https://en.wikipedia.org/wiki/Archegos_Capital_Management"}
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
