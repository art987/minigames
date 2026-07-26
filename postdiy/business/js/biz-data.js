/**
 * 实体商家经营诊断系统 - 本地诊断数据
 * 包含：经营问题、症状、诊断路径、解决方案、案例、工具
 * 所有数据均为真实可执行的专业内容，供本地离线使用
 */
var BizData = {

// ============================================================
// 0. 八大篇章
// ============================================================
chapters: [
  { id: 1, name: "选址定生死", icon: "map-pin", desc: "从地图到门店的决胜法则", color: "#0071E3", subs: [
    { id: 101, name: "流量密码", desc: "如何用大数据分析人流热力图" },
    { id: 102, name: "租金博弈", desc: "谈判技巧与隐性成本计算" },
    { id: 103, name: "门头设计", desc: "视觉冲击力与品牌记忆点" },
    { id: 104, name: "周边生态", desc: "互补还是竞争？借势策略" },
    { id: 105, name: "合同陷阱", desc: "租期、转让费、拆迁风险规避" }
  ]},
  { id: 2, name: "产品为王", icon: "trophy", desc: "让顾客非买不可的选品逻辑", color: "#0071E3", subs: [
    { id: 201, name: "爆品思维", desc: "如何用一款单品带火整店" },
    { id: 202, name: "定价心理学", desc: "尾数、锚定、组合定价法" },
    { id: 203, name: "陈列魔法", desc: "动线设计、黄金区域、关联摆放" },
    { id: 204, name: "库存管控", desc: "ABC分类法与滞销品清仓节奏" },
    { id: 205, name: "迭代机制", desc: "每周更新菜单/货架的秘密" }
  ]},
  { id: 3, name: "服务即营销", icon: "heart-handshake", desc: "把路人变成终身粉丝", color: "#0071E3", subs: [
    { id: 301, name: "五步接待法", desc: "迎宾、询问、展示、成交、送别" },
    { id: 302, name: "投诉变忠诚", desc: "道歉→共情→补偿→回访四步曲" },
    { id: 303, name: "会员体系", desc: "储值、积分、等级权益怎么设计" },
    { id: 304, name: "惊喜时刻", desc: "生日礼、纪念日、随机免单" },
    { id: 305, name: "社群运营", desc: "每日早安、限时秒杀、老客专享" }
  ]},
  { id: 4, name: "流量破局", icon: "rocket", desc: "线上线下全渠道获客术", color: "#0071E3", subs: [
    { id: 401, name: "抖音同城号", desc: "拍什么、怎么剪、何时发" },
    { id: 402, name: "美团点评", desc: "评价管理、套餐设计、排名优化" },
    { id: 403, name: "私域沉淀", desc: "加好友话术、朋友圈剧本、标签分组" },
    { id: 404, name: "异业联盟", desc: "资源互换、联合活动、佣金分成" },
    { id: 405, name: "地推秘籍", desc: "传单怎么发、扫码送什么、话术怎么说" }
  ]},
  { id: 9, name: "金点子", icon: "lightbulb", desc: "真实商家创意营销实战案例", color: "#0071E3", subs: [
    { id: 901, name: "挑战游戏", desc: "限时挑战、互动游戏引流拓客" },
    { id: 902, name: "抽奖盲盒", desc: "摸球抽签、盲盒惊喜锁客复购" },
    { id: 903, name: "会员锁客", desc: "充值锁客、打卡返利、深度绑定" },
    { id: 904, name: "裂变引流", desc: "一带三、四人同行免单、社交裂变" },
    { id: 905, name: "定价心理战", desc: "锚定对比、亏本引流、消费心理" }
  ]},
  { id: 5, name: "团队进化", icon: "users", desc: "小店的用人管人之道", color: "#0071E3", subs: [
    { id: 501, name: "招人标准", desc: "态度＞技能，如何面试识人" },
    { id: 502, name: "培训体系", desc: "新人三天速成手册、老员工复训" },
    { id: 503, name: "薪酬激励", desc: "底薪+提成+奖金+分红怎么搭配" },
    { id: 504, name: "排班艺术", desc: "高峰全员上、低峰轮休、兼职补充" },
    { id: 505, name: "离职管理", desc: "面谈挽留、交接流程、竞业限制" }
  ]},
  { id: 6, name: "财务算盘", icon: "calculator", desc: "每一分钱都花在刀刃上", color: "#0071E3", subs: [
    { id: 601, name: "记账模板", desc: "日营收、周毛利、月现金流" },
    { id: 602, name: "成本砍刀", desc: "房租占比、食材损耗、水电控制" },
    { id: 603, name: "定价底线", desc: "毛利率计算公式与动态调价" },
    { id: 604, name: "税务合规", desc: "个体户核定征收vs公司查账征收" },
    { id: 605, name: "融资避坑", desc: "借贷利息、加盟骗局、众筹风险" }
  ]},
  { id: 7, name: "逆境求生", icon: "shield", desc: "淡季、竞争、危机的应对方案", color: "#0071E3", subs: [
    { id: 701, name: "淡季翻身", desc: "做培训、搞装修、拓外卖、办活动" },
    { id: 702, name: "价格战对策", desc: "差异化赠品、增值服务、套餐升级" },
    { id: 703, name: "疫情/灾害预案", desc: "线上化转型、社区团购、配送体系" },
    { id: 704, name: "政策变动", desc: "环保检查、消防整改、执照变更" },
    { id: 705, name: "转让退出", desc: "评估资产、寻找买家、合同公证" }
  ]},
  { id: 8, name: "老板心法", icon: "brain", desc: "从生意人到企业家的认知跃迁", color: "#0071E3", subs: [
    { id: 801, name: "时间管理", desc: "每天必做的三件事清单" },
    { id: 802, name: "学习路径", desc: "行业论坛、标杆探店、跨界借鉴" },
    { id: 803, name: "复盘习惯", desc: "周报、月会、季度战略调整" },
    { id: 804, name: "家庭平衡", desc: "夫妻店分工、合伙协议、传承规划" },
    { id: 805, name: "长期主义", desc: "品牌积累、口碑沉淀、社会责任" }
  ]}
],

// ============================================================
// 1. 经营问题（8大核心问题）
// ============================================================
problems: [
  {
    _id: "prob_001",
    name: "没有客流",
    code: "TRAFFIC_LOW",
    icon: "user-x",
    color: "#0071E3",
    description: "门店进店人数持续偏低，门前冷清，缺乏自然流量和主动引流手段",
    sortOrder: 1,
    diagnosisCount: 0
  },
  {
    _id: "prob_002",
    name: "营业额下降",
    code: "REVENUE_DROP",
    icon: "trending-down",
    color: "#0071E3",
    description: "整体营收持续走低，同比环比均出现下滑趋势，经营压力加大",
    sortOrder: 2,
    diagnosisCount: 0
  },
  {
    _id: "prob_003",
    name: "利润太低",
    code: "PROFIT_LOW",
    icon: "wallet",
    color: "#0071E3",
    description: "虽然有一定营业额，但扣除成本后利润微薄，甚至亏损经营",
    sortOrder: 3,
    diagnosisCount: 0
  },
  {
    _id: "prob_004",
    name: "产品卖不动",
    code: "PRODUCT_SLOW",
    icon: "tag",
    color: "#0071E3",
    description: "核心产品动销慢、库存积压，新品推广困难，产品缺乏市场竞争力",
    sortOrder: 4,
    diagnosisCount: 0
  },
  {
    _id: "prob_005",
    name: "老客户流失",
    code: "CUSTOMER_LOSS",
    icon: "repeat",
    color: "#0071E3",
    description: "复购率持续走低，老客户不再回头，客户生命周期缩短",
    sortOrder: 5,
    diagnosisCount: 0
  },
  {
    _id: "prob_006",
    name: "员工管理困难",
    code: "STAFF_HARD",
    icon: "users-round",
    color: "#0071E3",
    description: "招人难、留人难、员工积极性差，团队执行力不足影响经营",
    sortOrder: 6,
    diagnosisCount: 0
  },
  {
    _id: "prob_007",
    name: "营销推广困难",
    code: "MARKETING_HARD",
    icon: "bar-chart-3",
    color: "#0071E3",
    description: "不懂营销、不会推广，投了钱没效果，线上运营无从下手",
    sortOrder: 7,
    diagnosisCount: 0
  },
  {
    _id: "prob_008",
    name: "竞争压力大",
    code: "COMPETITION",
    icon: "alert-triangle",
    color: "#0071E3",
    description: "周边竞品林立，同质化严重，价格战激烈，差异化优势不明显",
    sortOrder: 8,
    diagnosisCount: 0
  }
],

// ============================================================
// 2. 症状（按问题分组，每个问题4-6个症状）
// ============================================================
symptoms: {
  TRAFFIC_LOW: [
    { _id: "sym_t01", name: "平时进店的人很少", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期","老店"] },
    { _id: "sym_t02", name: "附近没什么人流量", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_t03", name: "路过的人不进店", industryFilter: ["零售","服务业"], stageFilter: ["新店","成长期","老店"] },
    { _id: "sym_t04", name: "网上宣传了但没人来", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_t05", name: "门口有人经过但门头不吸引人", industryFilter: ["餐饮","零售"], stageFilter: ["新店","成长期"] },
    { _id: "sym_t06", name: "周末和平时人气差不多", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["老店"] }
  ],
  REVENUE_DROP: [
    { _id: "sym_r01", name: "最近几个月生意一直在下滑", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_r02", name: "客人花钱越来越少了", industryFilter: ["餐饮","零售"], stageFilter: ["老店"] },
    { _id: "sym_r03", name: "最忙的时候也不赚钱了", industryFilter: ["餐饮","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_r04", name: "搞活动也没以前管用了", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_r05", name: "新推的产品卖不动", industryFilter: ["零售","服务业"], stageFilter: ["成长期","老店"] }
  ],
  PROFIT_LOW: [
    { _id: "sym_p01", name: "利润比同行低", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期","老店"] },
    { _id: "sym_p02", name: "房租压力太大", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_p03", name: "进货越来越贵", industryFilter: ["餐饮","零售"], stageFilter: ["成长期","老店"] },
    { _id: "sym_p04", name: "人工开支太大", industryFilter: ["餐饮","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_p05", name: "一个月下来没赚到什么钱", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期","老店"] }
  ],
  PRODUCT_SLOW: [
    { _id: "sym_s01", name: "招牌产品卖得越来越差", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_s02", name: "新品没人买", industryFilter: ["餐饮","零售"], stageFilter: ["成长期","老店"] },
    { _id: "sym_s03", name: "库存压了很多货", industryFilter: ["零售"], stageFilter: ["成长期","老店"] },
    { _id: "sym_s04", name: "顾客说产品没新意", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["老店"] },
    { _id: "sym_s05", name: "买过的顾客很少再来", industryFilter: ["餐饮","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_s06", name: "产品太单一没利润款", industryFilter: ["零售","服务业"], stageFilter: ["新店","成长期"] }
  ],
  CUSTOMER_LOSS: [
    { _id: "sym_c01", name: "老顾客很少再来了", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_c02", name: "会员越来越不活跃", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_c03", name: "没有老客户维护", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_c04", name: "没人帮你推荐新客", industryFilter: ["零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_c05", name: "差评投诉处理太慢", industryFilter: ["餐饮","服务业"], stageFilter: ["成长期","老店"] }
  ],
  STAFF_HARD: [
    { _id: "sym_h01", name: "员工老是离职", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期","老店"] },
    { _id: "sym_h02", name: "新人很久都上不了手", industryFilter: ["餐饮","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_h03", name: "经常被投诉服务态度差", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_h04", name: "没有考核和奖励制度", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_h05", name: "店里离了某个人就不行", industryFilter: ["餐饮","服务业"], stageFilter: ["成长期","老店"] }
  ],
  MARKETING_HARD: [
    { _id: "sym_m01", name: "从没做过线上推广", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_m02", name: "投了广告但没效果", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_m03", name: "抖音公众号没什么粉丝", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_m04", name: "不知道怎么搞促销", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_m05", name: "靠自然口碑没有主动传播", industryFilter: ["零售","服务业"], stageFilter: ["新店","成长期","老店"] },
    { _id: "sym_m06", name: "没有稳定的拉新渠道", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] }
  ],
  COMPETITION: [
    { _id: "sym_x01", name: "附近同行太多竞争大", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期","老店"] },
    { _id: "sym_x02", name: "对手卖得比我便宜", industryFilter: ["餐饮","零售"], stageFilter: ["成长期","老店"] },
    { _id: "sym_x03", name: "顾客总拿对手来比然后走了", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["成长期","老店"] },
    { _id: "sym_x04", name: "顾客记不住你的店", industryFilter: ["餐饮","零售","服务业"], stageFilter: ["新店","成长期"] },
    { _id: "sym_x05", name: "对面是连锁品牌打不过", industryFilter: ["餐饮","零售"], stageFilter: ["老店"] }
  ]
},

// ============================================================
// 3. 诊断路径（50条）
// ============================================================
diagnosisPaths: [

// ---- 行业专属路径（8问题×3行业=24条，stage=all）----

// TRAFFIC_LOW - 餐饮
{
  problemCode: "TRAFFIC_LOW",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_t01","sym_t02","sym_t05"],
  judgment: "你的餐饮门店属于客流不足型问题，核心原因是引流能力不足，门头吸引力和线上曝光均需加强",
  severity: 72,
  causes: [
    { name: "门头辨识度低", weight: 35, judgment: "路人3秒内能否看出你卖什么？门头是否清晰展示品类和招牌菜？", description: "门头信息模糊、缺乏品类标识，路过的潜在顾客无法快速识别" },
    { name: "线上曝光不足", weight: 30, judgment: "大众点评和抖音上能搜到你的店吗？月均有多少线上曝光量？", description: "在本地生活平台缺少店铺信息和内容运营，线上引流几乎为零" },
    { name: "缺乏引流品策略", weight: 20, judgment: "有没有一款低价高感知的引流产品吸引新客？", description: "没有设计专门吸引新客的引流品，缺少'诱饵'拉动首次进店" },
    { name: "周边社区渗透不够", weight: 15, judgment: "周边3公里内的居民知道你的店吗？做过社区推广吗？", description: "没有覆盖周边社区的宣传动作，社区客群未激活" }
  ],
  solutionIds: ["sol_001","sol_003","sol_012"],
  todayTasks: [
    { task: "拍摄门店外观照片，检查门头是否能在3秒内传达品类", duration: "30分钟", purpose: "诊断门头吸引力" },
    { task: "在大众点评完善店铺信息，上传10张门店和菜品照片", duration: "1小时", purpose: "建立线上基础曝光" },
    { task: "设计一款引流菜品（成本<8元，感知价值>25元）", duration: "1小时", purpose: "打造进店诱饵" }
  ],
  weekPlan: [
    { day: 1, title: "门头优化日", tasks: ["更换或增加门头品类横幅","门口放置招牌菜立牌","确保灯光晚间足够亮"] },
    { day: 2, title: "线上铺设日", tasks: ["大众点评认领门店","上传高质量门店及菜品照片","开通抖音来客门店"] },
    { day: 3, title: "引流品上线日", tasks: ["确定引流品并定价","制作引流品宣传物料","员工话术培训"] },
    { day: 4, title: "社区推广日", tasks: ["设计周边社区传单","与物业沟通公告栏投放","加入周边业主群"] },
    { day: 5, title: "试营业引流日", tasks: ["引流品限时推出","引导首批顾客好评","收集顾客反馈"] },
    { day: 6, title: "内容生产日", tasks: ["拍摄3条短视频素材","发布1条探店视频","回复线上所有评价"] },
    { day: 7, title: "复盘调整日", tasks: ["统计本周新增到店人数","分析引流品转化率","调整下周引流策略"] }
  ],
  longTermAdvice: [
    "建立持续的内容运营节奏，每周至少2条短视频+1次线上活动",
    "每季度更新一次引流品，保持新鲜感同时测试市场偏好",
    "与周边3公里内的异业商家建立互推联盟"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_003"],
  priority: 10
},

// TRAFFIC_LOW - 零售
{
  problemCode: "TRAFFIC_LOW",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_t01","sym_t03","sym_t05"],
  judgment: "你的零售门店属于客流不足型问题，核心原因是进店动线受阻和缺乏驻足理由，需要优化橱窗和引流机制",
  severity: 68,
  causes: [
    { name: "橱窗无吸引力", weight: 35, judgment: "橱窗是否展示了当季最吸引人的商品？是否定期更换？", description: "橱窗陈列单调、无季节变化，路人没有驻足和进店的冲动" },
    { name: "缺少引流活动", weight: 25, judgment: "有没有定期举办到店活动或限时优惠？", description: "缺少主动制造进店理由的活动策划" },
    { name: "门店位置偏僻", weight: 25, judgment: "门店是否在动线死角？是否有引导标识？", description: "店铺位置不佳且缺乏导视指引，顾客难以发现" },
    { name: "线上到店链路缺失", weight: 15, judgment: "顾客在线上看到你的产品能方便到店购买吗？", description: "没有建立线上种草到线下体验的完整链路" }
  ],
  solutionIds: ["sol_001","sol_005","sol_013"],
  todayTasks: [
    { task: "重新布置橱窗陈列，突出当季爆款或新品", duration: "1小时", purpose: "提升橱窗吸引力" },
    { task: "设计一个到店引流活动（如满减、体验课）", duration: "45分钟", purpose: "制造进店理由" },
    { task: "检查门店周边导视标识是否完善", duration: "30分钟", purpose: "改善可达性" }
  ],
  weekPlan: [
    { day: 1, title: "橱窗焕新日", tasks: ["更换橱窗主推商品","增加灯光和色彩层次","设置价格标签和卖点卡"] },
    { day: 2, title: "引流活动策划日", tasks: ["确定本周引流活动方案","制作活动物料","员工培训活动话术"] },
    { day: 3, title: "导视优化日", tasks: ["在路口设置指引立牌","在电梯口贴楼层导引","店门口增加活动告示"] },
    { day: 4, title: "社群启动日", tasks: ["建立门店粉丝群","设计加群话术和福利","首批种子用户入群"] },
    { day: 5, title: "引流活动执行日", tasks: ["执行首个引流活动","引导顾客加群关注","收集活动反馈"] },
    { day: 6, title: "线上内容日", tasks: ["拍摄橱窗和活动内容","发布小红书/抖音种草","同步到社群预热"] },
    { day: 7, title: "数据复盘日", tasks: ["统计本周到店客流变化","分析活动ROI","制定下周优化计划"] }
  ],
  longTermAdvice: [
    "每月至少策划2次主题到店活动，形成顾客期待",
    "建立橱窗月度更换机制，保持视觉新鲜度",
    "打通线上种草→到店体验→社群留存的闭环"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_001","tool_002"],
  priority: 10
},

// TRAFFIC_LOW - 服务业
{
  problemCode: "TRAFFIC_LOW",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_t01","sym_t02","sym_t03"],
  judgment: "你的服务门店属于客流不足型问题，核心原因是信任壁垒高和体验展示不足，需要加强口碑传播和体验入口",
  severity: 70,
  causes: [
    { name: "服务体验不可见", weight: 35, judgment: "顾客路过能看到你的服务过程和效果吗？", description: "服务类门店天然存在体验不可见的问题，路人不了解服务质量" },
    { name: "口碑传播薄弱", weight: 25, judgment: "现有客户中有多少会主动推荐你？有推荐奖励吗？", description: "缺少口碑裂变机制，老客户没有推荐动力和工具" },
    { name: "首单门槛过高", weight: 25, judgment: "新客户第一次体验的决策门槛高吗？有体验价吗？", description: "服务定价和体验门槛高，新客户不敢轻易尝试" },
    { name: "线上案例展示不足", weight: 15, judgment: "线上能找到你的服务案例和效果对比吗？", description: "缺少线上案例展示，潜在客户无法远程评估服务品质" }
  ],
  solutionIds: ["sol_002","sol_006","sol_012"],
  todayTasks: [
    { task: "设计一个新客体验套餐（正常价3-5折）", duration: "45分钟", purpose: "降低首单门槛" },
    { task: "整理3个客户服务前后对比案例", duration: "1小时", purpose: "建立服务可视化素材" },
    { task: "制定老客户推荐奖励方案", duration: "30分钟", purpose: "启动口碑裂变" }
  ],
  weekPlan: [
    { day: 1, title: "体验入口设计日", tasks: ["确定体验套餐内容和定价","制作体验卡物料","设计体验流程话术"] },
    { day: 2, title: "案例素材日", tasks: ["拍摄服务过程视频","整理服务前后对比图","撰写客户好评文案"] },
    { day: 3, title: "线上铺设日", tasks: ["案例发布到大众点评","开通抖音/小红书账号","发布首批3条案例内容"] },
    { day: 4, title: "推荐体系启动日", tasks: ["设计推荐奖励规则","制作推荐卡","向现有客户发布推荐计划"] },
    { day: 5, title: "异业合作日", tasks: ["联系2-3家周边互补商家","商讨互推合作方案","确定首批合作方式"] },
    { day: 6, title: "体验活动首日", tasks: ["接待首批体验客户","收集体验反馈","引导好评和推荐"] },
    { day: 7, title: "复盘优化日", tasks: ["统计体验客户到店数","分析转化和推荐数据","优化体验流程"] }
  ],
  longTermAdvice: [
    "持续积累服务案例，每周至少新增2个线上案例展示",
    "建立客户推荐体系，让每个满意客户成为你的推广员",
    "与周边互补型商家形成异业联盟，共享客源"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_001","tool_004"],
  priority: 10
},

// REVENUE_DROP - 餐饮
{
  problemCode: "REVENUE_DROP",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_r01","sym_r02","sym_r04"],
  judgment: "你的餐饮门店属于营收下滑型问题，核心原因是客单价下降和促销依赖，需要优化产品结构和提升客单价",
  severity: 75,
  causes: [
    { name: "客单价持续走低", weight: 35, judgment: "人均消费额同比是上升还是下降？是否过度依赖低价引流？", description: "长期低价促销导致客户价格敏感，客单价持续下滑" },
    { name: "菜单结构不合理", weight: 25, judgment: "菜单中利润款占比多少？有组合套餐提升客单吗？", description: "菜单缺少利润款和组合套餐设计，无法有效拉升消费" },
    { name: "高峰产能不足", weight: 20, judgment: "午晚高峰翻台率是多少？有没有翻台瓶颈？", description: "高峰期服务效率低、翻台慢，错失营收高峰" },
    { name: "外卖渠道未有效利用", weight: 20, judgment: "外卖营收占比多少？外卖利润率如何？", description: "外卖渠道未系统运营，缺少增量收入来源" }
  ],
  solutionIds: ["sol_004","sol_007","sol_014"],
  todayTasks: [
    { task: "调出近3个月客单价数据，分析下降趋势", duration: "30分钟", purpose: "明确客单价问题" },
    { task: "设计2-3个提升客单价的组合套餐", duration: "1小时", purpose: "拉升消费金额" },
    { task: "检查外卖平台店铺状态和评分", duration: "30分钟", purpose: "评估外卖渠道潜力" }
  ],
  weekPlan: [
    { day: 1, title: "数据分析日", tasks: ["分析客单价变化趋势","拆解各品类营收贡献","找出营收下滑关键品类"] },
    { day: 2, title: "菜单优化日", tasks: ["标注利润款和引流款","设计2-3个组合套餐","重新排版菜单突出高毛利品"] },
    { day: 3, title: "套餐上线日", tasks: ["确定套餐定价和内容","培训员工推套餐话术","收银系统设置套餐"] },
    { day: 4, title: "外卖优化日", tasks: ["优化外卖店铺装修","调整外卖菜品结构和定价","设置满减和配送策略"] },
    { day: 5, title: "效率提升日", tasks: ["优化出餐流程","减少点餐到出餐时间","高峰期人员排班调整"] },
    { day: 6, title: "话术培训日", tasks: ["培训员工推荐套餐话术","培训加购推荐话术","模拟演练和考核"] },
    { day: 7, title: "复盘日", tasks: ["统计套餐销售数据","分析客单价变化","评估外卖增量效果"] }
  ],
  longTermAdvice: [
    "每季度更新一次菜单，淘汰低动销品，增加利润款",
    "建立外卖+堂食双轮驱动营收模型，外卖占比目标30%以上",
    "通过会员储值锁定客户消费，稳定营收现金流"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_005"],
  priority: 10
},

// REVENUE_DROP - 零售
{
  problemCode: "REVENUE_DROP",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_r01","sym_r02","sym_r05"],
  judgment: "你的零售门店属于营收下滑型问题，核心原因是品类老化和连带率低，需要优化选品和提升连带销售",
  severity: 73,
  causes: [
    { name: "品类结构老化", weight: 30, judgment: "过去半年有没有引进新品类？爆款品类占比多少？", description: "产品结构长期不变，缺少新爆款拉动，客户购买意愿降低" },
    { name: "连带率偏低", weight: 30, judgment: "平均客单包含几件商品？有做关联陈列吗？", description: "商品陈列和推荐缺乏关联性，客户只买目标商品就离开" },
    { name: "会员贡献率低", weight: 20, judgment: "会员消费占总营收多少？会员客单价是否明显高于非会员？", description: "会员体系未发挥作用，会员与非会员消费差异不大" },
    { name: "季节性波动大", weight: 20, judgment: "淡季营收是否比旺季低50%以上？有淡季经营策略吗？", description: "缺少淡季经营对策，营收波动剧烈" }
  ],
  solutionIds: ["sol_004","sol_008","sol_015"],
  todayTasks: [
    { task: "统计各品类近3个月销售排名，找出下滑品类", duration: "45分钟", purpose: "诊断品类问题" },
    { task: "设计3组关联陈列方案", duration: "1小时", purpose: "提升连带率" },
    { task: "分析会员消费数据，计算会员贡献率", duration: "30分钟", purpose: "评估会员价值" }
  ],
  weekPlan: [
    { day: 1, title: "品类诊断日", tasks: ["完成品类销售排名分析","标记下滑品类和增长品类","制定品类汰换计划"] },
    { day: 2, title: "选品更新日", tasks: ["联系供应商了解新品","确定引进新品清单","规划新品上架排期"] },
    { day: 3, title: "陈列优化日", tasks: ["实施关联陈列方案","增加场景化展示区","优化动线引导"] },
    { day: 4, title: "会员体系优化日", tasks: ["梳理现有会员权益","设计会员专享价格和活动","制定会员激活计划"] },
    { day: 5, title: "淡季策略日", tasks: ["分析淡旺季规律","设计淡季引流方案","规划淡季促销日历"] },
    { day: 6, title: "员工培训日", tasks: ["培训连带推荐话术","培训会员转化话术","演练和考核"] },
    { day: 7, title: "复盘日", tasks: ["检查陈列优化效果","统计会员转化数据","调整下周执行方案"] }
  ],
  longTermAdvice: [
    "建立月度品类复盘机制，淘汰后20%品类，持续引入新品",
    "通过场景化陈列和连带推荐将连带率提升至2.0以上",
    "深化会员运营，目标会员贡献率达到60%以上"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 10
},

// REVENUE_DROP - 服务业
{
  problemCode: "REVENUE_DROP",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_r01","sym_r03","sym_r05"],
  judgment: "你的服务门店属于营收下滑型问题，核心原因是服务项目单一和客户生命周期短，需要丰富服务层次和延长客户价值",
  severity: 71,
  causes: [
    { name: "服务项目单一", weight: 35, judgment: "客户到店消费的项目选择有几种？是否只有1-2个主力项目？", description: "服务项目有限，客户选择少，无法满足多样化需求" },
    { name: "客户生命周期短", weight: 25, judgment: "客户平均消费几次后流失？有升级和续费设计吗？", description: "缺少服务递进和续费机制，客户消费1-2次后不再回来" },
    { name: "定价策略不当", weight: 25, judgment: "服务定价是否与目标客户匹配？有没有阶梯定价？", description: "定价缺乏层次感，没有覆盖不同消费能力的客户群" },
    { name: "时段利用率低", weight: 15, judgment: "非高峰时段闲置率多高？有闲时优惠吗？", description: "服务时段利用不均衡，非高峰时段大量产能闲置" }
  ],
  solutionIds: ["sol_006","sol_008","sol_014"],
  todayTasks: [
    { task: "列出所有服务项目和营收贡献占比", duration: "30分钟", purpose: "诊断服务结构" },
    { task: "设计1-2个增值服务或升级套餐", duration: "1小时", purpose: "丰富服务层次" },
    { task: "制定非高峰时段的优惠方案", duration: "30分钟", purpose: "提升时段利用率" }
  ],
  weekPlan: [
    { day: 1, title: "服务审计日", tasks: ["梳理所有服务项目","分析各项目营收和利润贡献","找出明星和瘦狗项目"] },
    { day: 2, title: "服务升级设计日", tasks: ["设计基础-进阶-尊享服务阶梯","制定升级套餐内容和定价","设计服务升级话术"] },
    { day: 3, title: "定价优化日", tasks: ["制定阶梯定价方案","设计闲时优惠策略","更新价格公示"] },
    { day: 4, title: "会员体系优化日", tasks: ["设计储值卡分级方案","制定会员专属服务权益","建立会员到期提醒机制"] },
    { day: 5, title: "闲时引流启动日", tasks: ["上线闲时优惠方案","社群发布闲时特惠","联系老客户预约闲时服务"] },
    { day: 6, title: "员工培训日", tasks: ["培训服务升级推荐话术","培训会员转化话术","情景模拟演练"] },
    { day: 7, title: "复盘日", tasks: ["统计新套餐销售情况","分析闲时利用率变化","评估会员转化效果"] }
  ],
  longTermAdvice: [
    "建立基础-进阶-尊享三级服务体系，让客户有持续升级空间",
    "通过储值卡锁定客户长期消费，目标储值客户占比40%以上",
    "利用闲时产能开展体验活动或异业合作，最大化时段利用率"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_005"],
  priority: 10
},

// PROFIT_LOW - 餐饮
{
  problemCode: "PROFIT_LOW",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_p01","sym_p03","sym_p04"],
  judgment: "你的餐饮门店属于利润薄弱型问题，核心原因是成本结构失衡和定价策略不足，需要精细化成本管控和优化毛利",
  severity: 78,
  causes: [
    { name: "食材成本过高", weight: 35, judgment: "食材成本占营收比例是否超过35%？有没有定期比价和供应商评估？", description: "食材采购缺少比价机制，成本占比过高侵蚀利润" },
    { name: "定价策略缺失", weight: 25, judgment: "菜品定价是拍脑袋还是有毛利测算？招牌菜毛利是否达到65%+？", description: "菜品定价缺乏科学依据，部分菜品毛利过低拉低整体利润" },
    { name: "损耗和浪费严重", weight: 25, judgment: "食材损耗率是多少？是否有过量采购导致的浪费？", description: "采购和备菜缺乏精确预估，导致大量食材损耗" },
    { name: "人工效率低", weight: 15, judgment: "人效（人均产出）是否低于行业均值？有无冗余岗位？", description: "人员配置不合理，部分时段人员闲置但高峰期不够用" }
  ],
  solutionIds: ["sol_009","sol_010","sol_016"],
  todayTasks: [
    { task: "统计上周食材成本占营收比例，标记超35%的品类", duration: "45分钟", purpose: "找出成本漏洞" },
    { task: "计算招牌菜和引流菜的毛利，识别低毛利菜品", duration: "30分钟", purpose: "诊断定价问题" },
    { task: "记录一天的食材损耗情况", duration: "全天观察", purpose: "量化损耗程度" }
  ],
  weekPlan: [
    { day: 1, title: "成本审计日", tasks: ["完成食材成本占比分析","列出低毛利菜品清单","统计食材损耗数据"] },
    { day: 2, title: "供应商优化日", tasks: ["联系3家以上供应商比价","评估供应商性价比","制定采购优化方案"] },
    { day: 3, title: "定价调整日", tasks: ["调整低毛利菜品定价或配方","确保招牌菜毛利≥65%","设计高毛利新品"] },
    { day: 4, title: "损耗管控日", tasks: ["建立每日采购预估机制","制定备菜标准份量","设置损耗记录表"] },
    { day: 5, title: "人效优化日", tasks: ["分析各时段人效数据","优化排班减少闲置","明确岗位工作标准"] },
    { day: 6, title: "流程标准化日", tasks: ["制定核心菜品SOP","规范出菜份量和摆盘","培训执行并检查"] },
    { day: 7, title: "复盘日", tasks: ["计算本周毛利变化","评估成本优化效果","制定下月成本目标"] }
  ],
  longTermAdvice: [
    "建立月度成本复盘机制，食材成本占比控制在30%以内",
    "持续优化菜品结构，确保60%以上菜品毛利达到60%+",
    "引入数字化进销存系统，实现采购-库存-损耗全链路管理"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 10
},

// PROFIT_LOW - 零售
{
  problemCode: "PROFIT_LOW",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_p01","sym_p02","sym_p03"],
  judgment: "你的零售门店属于利润薄弱型问题，核心原因是进货成本高和毛利结构差，需要优化供应链和调整品类毛利",
  severity: 76,
  causes: [
    { name: "进货渠道单一", weight: 30, judgment: "主要进货渠道有几个？是否过度依赖单一供应商？", description: "进货渠道有限，缺少议价能力，采购成本偏高" },
    { name: "低毛利品类占比过高", weight: 30, judgment: "毛利率低于20%的品类占多大比例？高毛利品类占比多少？", description: "产品结构中低毛利品类占比过大，拖累整体利润" },
    { name: "库存积压严重", weight: 25, judgment: "库存周转天数是多少？滞销品占库存金额多少比例？", description: "大量资金被滞销品占用，形成隐性成本损失" },
    { name: "房租等固定成本过高", weight: 15, judgment: "房租占营收比例超过20%吗？有没有考虑空间利用优化？", description: "固定成本占比过高，营收增长时利润弹性不足" }
  ],
  solutionIds: ["sol_009","sol_010","sol_017"],
  todayTasks: [
    { task: "统计各品类毛利率，标记低于20%的品类", duration: "45分钟", purpose: "诊断毛利结构" },
    { task: "盘点滞销品库存金额占比", duration: "30分钟", purpose: "量化库存积压" },
    { task: "联系2家新供应商询价对比", duration: "1小时", purpose: "探索降本空间" }
  ],
  weekPlan: [
    { day: 1, title: "毛利分析日", tasks: ["完成品类毛利排名","标记低毛利和高毛利品类","制定品类毛利优化目标"] },
    { day: 2, title: "渠道拓展日", tasks: ["联系3家以上新供应商","进行价格和品质对比","确定优化采购方案"] },
    { day: 3, title: "滞销品处理日", tasks: ["制定滞销品清仓方案","启动清仓促销","释放库存资金"] },
    { day: 4, title: "品类调整日", tasks: ["压缩低毛利品类占比","增加高毛利品类选品","调整陈列面积分配"] },
    { day: 5, title: "自有品牌探索日", tasks: ["调研自有品牌可行性","联系代工厂了解起订量","评估自有品牌毛利空间"] },
    { day: 6, title: "空间优化日", tasks: ["分析门店各区域坪效","优化低效区域利用","考虑分租或联营可能性"] },
    { day: 7, title: "复盘日", tasks: ["统计本周毛利变化","评估库存周转改善","调整下月采购计划"] }
  ],
  longTermAdvice: [
    "逐步引入自有品牌或独家代理，目标高毛利品类占比50%以上",
    "建立季度供应商评估和比价机制，持续优化采购成本",
    "推行精细化库存管理，库存周转天数控制在45天以内"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 10
},

// PROFIT_LOW - 服务业
{
  problemCode: "PROFIT_LOW",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_p01","sym_p04","sym_p05"],
  judgment: "你的服务门店属于利润薄弱型问题，核心原因是人工成本过高和服务溢价不足，需要提升人效和服务附加值",
  severity: 74,
  causes: [
    { name: "人工成本占比过高", weight: 35, judgment: "人工成本占营收比例是否超过40%？技术人员利用率和产出如何？", description: "服务行业人力密集，人工成本占比过高严重压缩利润空间" },
    { name: "服务溢价不足", weight: 30, judgment: "你的服务定价是否有品牌溢价？客户是否觉得物超所值？", description: "服务缺少品牌感和附加值支撑，只能靠低价竞争" },
    { name: "技师/员工效率低", weight: 20, judgment: "员工有效服务时间占比多少？空等时间多长？", description: "员工有效工时占比较低，大量时间处于待工状态" },
    { name: "耗材成本失控", weight: 15, judgment: "服务耗材是否有标准用量？实际用量和标准用量差异多大？", description: "服务耗材缺少用量标准，浪费和损耗严重" }
  ],
  solutionIds: ["sol_009","sol_010","sol_018"],
  todayTasks: [
    { task: "计算人工成本占营收比例和人均产出", duration: "30分钟", purpose: "诊断人效问题" },
    { task: "梳理服务流程中的增值点，设计2个加价选项", duration: "1小时", purpose: "提升服务溢价" },
    { task: "制定核心耗材标准用量表", duration: "30分钟", purpose: "管控耗材成本" }
  ],
  weekPlan: [
    { day: 1, title: "人效分析日", tasks: ["统计各员工有效服务时长","计算人均日产出","找出人效瓶颈点"] },
    { day: 2, title: "排班优化日", tasks: ["根据客流曲线调整排班","减少空等时段人力浪费","引入弹性排班机制"] },
    { day: 3, title: "服务增值日", tasks: ["设计服务升级选项","制定增值服务定价","培训员工增值推荐话术"] },
    { day: 4, title: "耗材管控日", tasks: ["制定耗材标准用量","建立领用登记制度","设置用量异常预警"] },
    { day: 5, title: "品牌提升日", tasks: ["优化服务环境和细节","增加客户感知到的品质感","打造服务仪式感"] },
    { day: 6, title: "绩效优化日", tasks: ["设计人效考核指标","制定超额产出奖励方案","公布新绩效方案"] },
    { day: 7, title: "复盘日", tasks: ["统计人工成本占比变化","评估增值服务转化率","计算耗材节约金额"] }
  ],
  longTermAdvice: [
    "通过服务品牌化和差异化实现溢价，目标毛利率65%以上",
    "持续优化排班和流程，人工成本占比控制在35%以内",
    "建立技术人才培养体系，提升服务质量和客户黏性"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_005","tool_006"],
  priority: 10
},

// PRODUCT_SLOW - 餐饮
{
  problemCode: "PRODUCT_SLOW",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_s01","sym_s02","sym_s05"],
  judgment: "你的餐饮门店属于产品动销缓慢型问题，核心原因是产品缺乏竞争力和菜品结构不合理，需要打造爆款和优化菜单",
  severity: 70,
  causes: [
    { name: "缺少招牌爆款", weight: 35, judgment: "有没有一道让客户专门为你而来的招牌菜？该菜销量占总营收多少？", description: "菜品缺少记忆点和差异化，没有形成'必点'招牌菜" },
    { name: "菜品结构臃肿", weight: 25, judgment: "菜单上有多少道菜？有多少道月销不足10份？", description: "菜单菜品过多，增加备菜难度和损耗，分散客户注意力" },
    { name: "新品研发滞后", weight: 25, judgment: "多久没有推出新品了？新品上市有没有做市场测试？", description: "缺少新品研发节奏，客户消费疲劳，回头率降低" },
    { name: "菜品呈现缺乏吸引力", weight: 15, judgment: "菜品摆盘和出品能激发客户拍照分享吗？", description: "菜品出品缺乏颜值和仪式感，缺少自发传播点" }
  ],
  solutionIds: ["sol_003","sol_004","sol_019"],
  todayTasks: [
    { task: "统计各菜品月销量，标记月销不足10份的菜品", duration: "45分钟", purpose: "识别滞销菜品" },
    { task: "确定1道招牌菜打造计划", duration: "1小时", purpose: "聚焦爆款打造" },
    { task: "收集最近3个月客户菜品评价和反馈", duration: "30分钟", purpose: "了解客户偏好" }
  ],
  weekPlan: [
    { day: 1, title: "菜品诊断日", tasks: ["完成菜品销量排名","标记淘汰候选菜品","确定保留和优化菜品"] },
    { day: 2, title: "爆款打造日", tasks: ["确定招牌菜品类和定位","优化招牌菜配方和出品","设计招牌菜专属器皿和摆盘"] },
    { day: 3, title: "菜单精简日", tasks: ["淘汰月销<10份的菜品","精简菜单至30-40道","重新设计菜单排版逻辑"] },
    { day: 4, title: "新品研发日", tasks: ["研发1-2道应季新品","内部品鉴和调整","确定新品定价和上市计划"] },
    { day: 5, title: "出品升级日", tasks: ["优化核心菜品摆盘","增加出品仪式感","培训出品标准"] },
    { day: 6, title: "新品测试日", tasks: ["邀请老客户免费试吃新品","收集反馈意见","确定最终版本"] },
    { day: 7, title: "上新推广日", tasks: ["新菜单正式上线","线上发布新品内容","门店推广招牌菜和新品"] }
  ],
  longTermAdvice: [
    "每季度推出2-3道新品，淘汰低动销品，保持菜单活力",
    "打造1-2道区域必吃招牌菜，形成品类认知和口碑效应",
    "注重菜品颜值和仪式感，激发客户自发分享传播"
  ],
  caseIds: ["case_006"],
  toolIds: ["tool_003","tool_007"],
  priority: 10
},

// PRODUCT_SLOW - 零售
{
  problemCode: "PRODUCT_SLOW",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_s01","sym_s03","sym_s06"],
  judgment: "你的零售门店属于产品动销缓慢型问题，核心原因是选品偏差和库存结构不合理，需要优化选品策略和加速周转",
  severity: 72,
  causes: [
    { name: "选品脱离市场需求", weight: 35, judgment: "选品是基于个人喜好还是数据驱动？有没有定期分析客户购买偏好？", description: "选品凭感觉而非数据，导致大量产品不符合当地客户需求" },
    { name: "库存结构不合理", weight: 30, judgment: "畅销品是否经常断货？滞销品占库存金额多少？", description: "畅销品补货不及时，滞销品大量积压，资金周转效率低" },
    { name: "产品组合缺乏层次", weight: 20, judgment: "产品线有没有引流款、利润款、形象款的分层？", description: "产品缺乏角色分工，既不引流也不赚钱" },
    { name: "新品引进流程缓慢", weight: 15, judgment: "从发现趋势到产品上架需要多久？", description: "缺少快速上新机制，错过市场热点和流行趋势" }
  ],
  solutionIds: ["sol_004","sol_008","sol_019"],
  todayTasks: [
    { task: "标记库存周转超过60天的SKU", duration: "45分钟", purpose: "识别滞销品" },
    { task: "分析近30天TOP20畅销品，检查库存充足率", duration: "30分钟", purpose: "确保畅销品不缺货" },
    { task: "制定产品分层策略（引流/利润/形象）", duration: "45分钟", purpose: "优化产品结构" }
  ],
  weekPlan: [
    { day: 1, title: "库存诊断日", tasks: ["完成库存周转分析","标记滞销品和断货风险品","制定清仓和补货计划"] },
    { day: 2, title: "选品优化日", tasks: ["分析客户购买偏好数据","确定下月新品引进清单","淘汰后20%滞销品"] },
    { day: 3, title: "产品分层日", tasks: ["定义引流款/利润款/形象款","调整各层产品占比","优化陈列位置分配"] },
    { day: 4, title: "供应链优化日", tasks: ["与核心供应商谈判起订量和交期","建立畅销品安全库存机制","签订快速补货协议"] },
    { day: 5, title: "新品引进日", tasks: ["引进3-5款测试新品","设置新品测试区域","制定新品动销考核标准"] },
    { day: 6, title: "清仓启动日", tasks: ["启动滞销品清仓活动","制定阶梯清仓策略","释放库存资金"] },
    { day: 7, title: "复盘日", tasks: ["统计清仓回款金额","分析新品首周动销","调整产品结构计划"] }
  ],
  longTermAdvice: [
    "建立月度选品复盘机制，持续淘汰滞销品、引进新品",
    "优化库存结构，目标畅销品占比60%以上，周转天数<45天",
    "构建引流-利润-形象三层产品体系，各司其职"
  ],
  caseIds: ["case_006"],
  toolIds: ["tool_002","tool_007"],
  priority: 10
},

// PRODUCT_SLOW - 服务业
{
  problemCode: "PRODUCT_SLOW",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_s04","sym_s05","sym_s06"],
  judgment: "你的服务门店属于产品动销缓慢型问题，核心原因是服务项目老化和客户价值感知不足，需要创新服务和强化价值传递",
  severity: 68,
  causes: [
    { name: "服务项目长期不变", weight: 35, judgment: "最近一次推出新服务是什么时候？现有服务项目多久没有更新？", description: "服务项目一成不变，客户消费疲劳，缺乏新鲜感" },
    { name: "价值传递不到位", weight: 30, judgment: "客户是否清楚了解你服务的价值？有没有服务前后的对比展示？", description: "服务价值不直观，客户感知不到投入与产出的对应关系" },
    { name: "服务同质化严重", weight: 20, judgment: "你的服务和竞品有什么不同？客户能说出差异吗？", description: "服务内容和竞品高度雷同，缺少差异化特色" },
    { name: "套餐设计不科学", weight: 15, judgment: "有没有设计不同价位的套餐？套餐组合是否有消费心理依据？", description: "缺少科学的套餐设计，客户选择困难或只选最低价" }
  ],
  solutionIds: ["sol_006","sol_008","sol_019"],
  todayTasks: [
    { task: "列出所有服务项目及近3月销售占比", duration: "30分钟", purpose: "诊断服务结构" },
    { task: "设计1个差异化特色服务项目", duration: "1小时", purpose: "打造服务差异点" },
    { task: "整理服务前后对比案例3个", duration: "45分钟", purpose: "建立价值可视化" }
  ],
  weekPlan: [
    { day: 1, title: "服务审计日", tasks: ["梳理所有服务项目","分析各项目销售和利润贡献","标记需要优化和淘汰的项目"] },
    { day: 2, title: "差异服务设计日", tasks: ["设计1个独家特色服务","确定服务内容和流程","设计差异化卖点"] },
    { day: 3, title: "套餐优化日", tasks: ["设计基础/进阶/尊享三级套餐","用价格锚点优化套餐结构","确保中间套餐最具吸引力"] },
    { day: 4, title: "价值可视化日", tasks: ["制作服务前后对比素材","拍摄服务过程视频","设计价值传达话术"] },
    { day: 5, title: "新品内测日", tasks: ["邀请3-5位老客户免费体验新服务","收集体验反馈","优化服务流程"] },
    { day: 6, title: "员工培训日", tasks: ["培训新服务操作流程","培训价值传达话术","培训套餐推荐技巧"] },
    { day: 7, title: "新服务上线日", tasks: ["新服务和套餐正式上线","线上发布新服务内容","老客户专享体验价推广"] }
  ],
  longTermAdvice: [
    "每季度推出1-2个新服务项目，保持客户新鲜感和消费动力",
    "持续积累服务效果案例，让服务价值可感知、可传播",
    "建立三级套餐体系，引导客户从基础到尊享逐步升级"
  ],
  caseIds: ["case_006"],
  toolIds: ["tool_003","tool_007"],
  priority: 10
},

// CUSTOMER_LOSS - 餐饮
{
  problemCode: "CUSTOMER_LOSS",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_c01","sym_c02","sym_c05"],
  judgment: "你的餐饮门店属于客户流失型问题，核心原因是缺少客户留存体系和体验一致性不足，需要建立客户经营机制",
  severity: 73,
  causes: [
    { name: "无客户留存体系", weight: 35, judgment: "有没有会员系统？会员有什么特权？多久做一次客户回访？", description: "缺少系统化的客户留存和运营机制，客户来不来全靠缘分" },
    { name: "体验不一致", weight: 25, judgment: "不同时间来用餐，菜品口味和服务质量一致吗？", description: "出品和服务质量波动大，客户无法形成稳定预期" },
    { name: "差评处理不当", weight: 25, judgment: "收到差评后的处理流程是什么？平均响应时间多久？", description: "差评处理不及时不到位，负面影响扩散并劝退潜在客户" },
    { name: "缺少情感连接", weight: 15, judgment: "老板和服务员能叫出多少常客的名字和喜好？", description: "与客户缺少情感互动，客户对门店没有归属感" }
  ],
  solutionIds: ["sol_002","sol_011","sol_020"],
  todayTasks: [
    { task: "查看近1个月所有差评，逐一分析原因", duration: "45分钟", purpose: "诊断流失原因" },
    { task: "设计一个简单的会员权益方案", duration: "1小时", purpose: "启动留存体系" },
    { task: "整理常客名单（月消费3次以上）", duration: "30分钟", purpose: "识别核心客户" }
  ],
  weekPlan: [
    { day: 1, title: "流失诊断日", tasks: ["分析近3月客户流失率","梳理差评和投诉数据","找出流失核心原因"] },
    { day: 2, title: "体验标准化日", tasks: ["制定核心菜品出品标准","制定服务流程SOP","设置出品检查点"] },
    { day: 3, title: "会员体系日", tasks: ["确定会员等级和权益","选择会员管理工具","设计入会引导流程"] },
    { day: 4, title: "差评修复日", tasks: ["回复所有未处理差评","制定差评处理SOP","设置差评预警通知"] },
    { day: 5, title: "客户关怀日", tasks: ["给TOP20常客发送专属关怀","设计生日/节日关怀方案","建立客户喜好记录"] },
    { day: 6, title: "回访启动日", tasks: ["制定流失客户回访计划","设计回归优惠方案","逐一联系高价值流失客户"] },
    { day: 7, title: "复盘日", tasks: ["统计会员入会转化率","评估差评修复效果","调整客户经营策略"] }
  ],
  longTermAdvice: [
    "建立分层客户经营体系，核心客户月度回访率100%",
    "确保出品和服务体验一致性，差评24小时内响应处理",
    "通过情感化运营让门店成为客户的'第三空间'"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_004","tool_008"],
  priority: 10
},

// CUSTOMER_LOSS - 零售
{
  problemCode: "CUSTOMER_LOSS",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_c01","sym_c02","sym_c04"],
  judgment: "你的零售门店属于客户流失型问题，核心原因是缺少客户运营和差异化服务，需要建立会员深度运营体系",
  severity: 71,
  causes: [
    { name: "会员运营薄弱", weight: 35, judgment: "会员活跃率多少？多久联系一次沉睡会员？", description: "会员数据沉淀但未有效运营，大量会员变成沉睡状态" },
    { name: "缺乏差异化服务", weight: 25, judgment: "会员和非会员的消费体验有区别吗？会员有专属权益吗？", description: "缺少会员专属权益和服务，客户没有成为会员和续费的动力" },
    { name: "转介绍率低", weight: 25, judgment: "有没有推荐奖励机制？客户推荐新客有什么好处？", description: "缺少口碑裂变机制，老客户没有推荐动力" },
    { name: "购买后无跟进", weight: 15, judgment: "客户购买后有没有使用指导或回访？", description: "完成交易即结束，缺少售后关怀和使用指导" }
  ],
  solutionIds: ["sol_002","sol_011","sol_020"],
  todayTasks: [
    { task: "统计会员总数和活跃会员占比", duration: "30分钟", purpose: "诊断会员健康度" },
    { task: "设计3个会员专属权益", duration: "1小时", purpose: "提升会员价值感" },
    { task: "制定老客推荐奖励方案", duration: "30分钟", purpose: "启动口碑裂变" }
  ],
  weekPlan: [
    { day: 1, title: "会员诊断日", tasks: ["完成会员数据分析","标记活跃/沉默/流失会员","制定分层激活计划"] },
    { day: 2, title: "权益升级日", tasks: ["设计会员专属权益","制定会员日活动方案","更新会员卡和宣传物料"] },
    { day: 3, title: "沉默激活日", tasks: ["设计沉默会员召回方案","发送专属回归优惠","电话回访高价值沉默会员"] },
    { day: 4, title: "转介绍启动日", tasks: ["制定推荐奖励规则","制作推荐码和海报","向活跃会员发布推荐计划"] },
    { day: 5, title: "售后关怀日", tasks: ["回访近1周购买客户","提供使用指导和建议","收集产品使用反馈"] },
    { day: 6, title: "会员活动日", tasks: ["举办首次会员日活动","推出会员专属优惠","引导现场入会和续费"] },
    { day: 7, title: "复盘日", tasks: ["统计会员激活率","评估推荐转化效果","制定下月会员运营计划"] }
  ],
  longTermAdvice: [
    "建立月度会员运营日历，每月至少1次会员专属活动",
    "打造会员专属权益体系，让会员身份有真正的价值感",
    "通过转介绍机制实现口碑裂变，目标推荐新客占比20%以上"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_004","tool_008"],
  priority: 10
},

// CUSTOMER_LOSS - 服务业
{
  problemCode: "CUSTOMER_LOSS",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_c01","sym_c03","sym_c05"],
  judgment: "你的服务门店属于客户流失型问题，核心原因是缺少服务后跟进和客户关系维护，需要建立全周期客户经营",
  severity: 72,
  causes: [
    { name: "服务后无跟进", weight: 35, judgment: "服务完成后多久联系客户？有没有效果跟踪和关怀？", description: "服务完成后缺少后续跟进，客户感觉被忽视" },
    { name: "无客户分级管理", weight: 25, judgment: "有没有区分高价值客户和普通客户？服务有差异化吗？", description: "所有客户一视同仁，高价值客户没有获得应有重视" },
    { name: "投诉处理不满意", weight: 25, judgment: "客户投诉后的处理满意度如何？有没有投诉转满意的案例？", description: "投诉处理流程不完善，客户不满后直接流失" },
    { name: "缺少持续消费理由", weight: 15, judgment: "客户有持续消费的计划或套餐吗？有消费周期提醒吗？", description: "缺少引导客户持续消费的机制和理由" }
  ],
  solutionIds: ["sol_002","sol_006","sol_020"],
  todayTasks: [
    { task: "整理近3月流失客户名单和原因", duration: "45分钟", purpose: "诊断流失原因" },
    { task: "设计服务后24小时关怀流程", duration: "30分钟", purpose: "建立服务后跟进" },
    { task: "制定客户分级标准和对应服务策略", duration: "45分钟", purpose: "启动分级管理" }
  ],
  weekPlan: [
    { day: 1, title: "流失分析日", tasks: ["完成客户流失率统计","分析流失原因分布","标记可挽回客户"] },
    { day: 2, title: "服务后流程日", tasks: ["制定服务后跟进SOP","设计24h/3天/7天回访节奏","准备回访话术模板"] },
    { day: 3, title: "分级管理日", tasks: ["制定客户分级标准","设计各级别差异化服务","培训员工识别和应对策略"] },
    { day: 4, title: "投诉修复日", tasks: ["制定投诉处理SOP","逐一联系未满意客户","提供补偿和回归方案"] },
    { day: 5, title: "持续消费设计日", tasks: ["设计消费周期提醒","制定续费和升级优惠","建立自动提醒机制"] },
    { day: 6, title: "挽回行动日", tasks: ["联系可挽回流失客户","提供专属回归方案","记录挽回情况"] },
    { day: 7, title: "复盘日", tasks: ["统计流失率变化","评估挽回成功率","优化客户经营体系"] }
  ],
  longTermAdvice: [
    "建立服务后24h/3天/7天三级回访机制，确保客户满意度",
    "实施客户分级管理，核心客户月度个性化关怀不低于1次",
    "设计持续消费计划，引导客户从单次消费转为周期消费"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_004","tool_008"],
  priority: 10
},

// STAFF_HARD - 餐饮
{
  problemCode: "STAFF_HARD",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_h01","sym_h02","sym_h03"],
  judgment: "你的餐饮门店属于员工管理困难型问题，核心原因是培训体系和激励机制缺失，需要标准化管理和绩效改革",
  severity: 69,
  causes: [
    { name: "培训体系缺失", weight: 35, judgment: "新员工有标准培训流程吗？多久能独立上岗？", description: "缺少系统化培训，新员工靠老带新，上手慢、出错多" },
    { name: "薪酬激励不合理", weight: 30, judgment: "员工薪资结构是纯固定还是有提成？有超额奖励吗？", description: "薪酬缺少激励性，干多干少差不多，员工积极性低" },
    { name: "工作环境和文化差", weight: 20, judgment: "员工对工作环境满意吗？团队氛围如何？", description: "工作环境简陋、团队氛围差，员工留不住" },
    { name: "核心岗位依赖个人", weight: 15, judgment: "厨师长或核心服务员离职会怎样？有备岗人员吗？", description: "核心岗位缺乏备岗和知识传承，人员风险高" }
  ],
  solutionIds: ["sol_011","sol_015","sol_018"],
  todayTasks: [
    { task: "列出所有岗位的培训现状和独立上岗周期", duration: "30分钟", purpose: "诊断培训缺口" },
    { task: "分析现有薪资结构，计算激励空间", duration: "45分钟", purpose: "评估激励改革可行性" },
    { task: "与2-3名员工沟通工作感受和期望", duration: "30分钟", purpose: "了解员工真实想法" }
  ],
  weekPlan: [
    { day: 1, title: "岗位梳理日", tasks: ["梳理所有岗位职责","制定岗位能力要求","识别核心风险岗位"] },
    { day: 2, title: "培训体系日", tasks: ["制定新员工7天培训计划","编写核心岗位SOP手册","设计培训考核标准"] },
    { day: 3, title: "薪酬改革日", tasks: ["设计底薪+提成+奖金结构","制定营业额提成方案","设置超额完成奖励"] },
    { day: 4, title: "文化建设日", tasks: ["制定团队活动计划","优化员工休息和就餐环境","建立员工意见反馈渠道"] },
    { day: 5, title: "备岗计划日", tasks: ["为核心岗位培养AB角","制定知识传承文档","设计轮岗学习机制"] },
    { day: 6, title: "落地执行日", tasks: ["公布新培训方案","公布新薪酬方案","解答员工疑问"] },
    { day: 7, title: "复盘日", tasks: ["收集员工反馈","评估方案接受度","优化执行细节"] }
  ],
  longTermAdvice: [
    "建立标准化培训和晋升体系，让员工看到成长路径",
    "推行绩效激励制度，让员工分享经营成果",
    "打造正向团队文化，定期团建和员工关怀"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_008","tool_009"],
  priority: 10
},

// STAFF_HARD - 零售
{
  problemCode: "STAFF_HARD",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_h01","sym_h03","sym_h04"],
  judgment: "你的零售门店属于员工管理困难型问题，核心原因是激励机制缺失和销售能力不足，需要建立绩效体系和销售培训",
  severity: 67,
  causes: [
    { name: "无绩效考核体系", weight: 35, judgment: "员工有明确的业绩指标吗？干好干坏有差别吗？", description: "缺少量化的绩效考核标准，员工缺乏目标感和紧迫感" },
    { name: "销售能力不足", weight: 30, judgment: "员工能主动推荐产品吗？连带推荐成功率高吗？", description: "员工销售技能不足，只能被动等客户选购，缺少主动推荐" },
    { name: "招人留人难", weight: 20, judgment: "招聘渠道有哪些？新员工平均多久离职？", description: "招聘渠道有限，新员工流失率高，人员不稳定" },
    { name: "排班不合理", weight: 15, judgment: "各时段人手是否匹配客流？闲时人多忙时人少？", description: "排班与客流不匹配，人力利用效率低" }
  ],
  solutionIds: ["sol_011","sol_015","sol_018"],
  todayTasks: [
    { task: "统计各员工月销售业绩排名", duration: "30分钟", purpose: "诊断人效差异" },
    { task: "设计基础绩效考核指标（销售额、连带率、会员转化）", duration: "1小时", purpose: "启动绩效改革" },
    { task: "分析客流曲线与排班匹配度", duration: "30分钟", purpose: "优化排班效率" }
  ],
  weekPlan: [
    { day: 1, title: "绩效设计日", tasks: ["确定核心考核指标","设计绩效评分和奖励方案","制定绩效面谈机制"] },
    { day: 2, title: "销售培训日", tasks: ["编写推荐话术手册","培训产品知识和卖点","模拟演练和考核"] },
    { day: 3, title: "排班优化日", tasks: ["根据客流数据调整排班","设计弹性排班机制","确保高峰时段人手充足"] },
    { day: 4, title: "招聘优化日", tasks: ["拓展招聘渠道","优化招聘信息描述","设计新员工入职体验"] },
    { day: 5, title: "新人培训日", tasks: ["制定新员工3天入职培训","安排师徒带教","设置首周考核点"] },
    { day: 6, title: "激励落地日", tasks: ["公布绩效和激励方案","培训绩效计算方式","设置首月目标"] },
    { day: 7, title: "复盘日", tasks: ["评估方案接受度","调整不合理指标","制定持续优化计划"] }
  ],
  longTermAdvice: [
    "建立销售导向的绩效体系，让优秀员工收入明显更高",
    "持续进行销售技能培训，每周至少1次话术演练",
    "优化招聘和留人机制，目标员工月流失率控制在5%以内"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_008","tool_009"],
  priority: 10
},

// STAFF_HARD - 服务业
{
  problemCode: "STAFF_HARD",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_h01","sym_h02","sym_h05"],
  judgment: "你的服务门店属于员工管理困难型问题，核心原因是技师培养成本高和激励方式单一，需要建立人才培养和多元激励",
  severity: 70,
  causes: [
    { name: "技师培养周期长", weight: 35, judgment: "培养一个合格技师需要多久？培养期间产出如何？", description: "技术人员培养成本高周期长，流失后恢复难度大" },
    { name: "激励方式单一", weight: 25, judgment: "技师收入只有手工费吗？有没有提成和分红机制？", description: "激励方式仅限于计件，缺少多元激励手段" },
    { name: "核心人员依赖", weight: 25, judgment: "核心技师离职会影响多少营收？有备份技师吗？", description: "业务高度依赖少数核心技师，人员风险极大" },
    { name: "职业发展路径模糊", weight: 15, judgment: "技师能看到晋升和成长空间吗？有分级认证体系吗？", description: "缺少清晰的职业发展路径，员工看不到未来" }
  ],
  solutionIds: ["sol_011","sol_015","sol_018"],
  todayTasks: [
    { task: "统计各技师月产出和收入占比", duration: "30分钟", purpose: "诊断人效分布" },
    { task: "设计技师分级认证标准（初级/中级/高级/督导）", duration: "1小时", purpose: "建立成长路径" },
    { task: "制定核心技师保留方案", duration: "30分钟", purpose: "降低核心人员风险" }
  ],
  weekPlan: [
    { day: 1, title: "人才盘点日", tasks: ["完成技师能力评估","标记核心人才和风险点","制定人才发展计划"] },
    { day: 2, title: "分级认证日", tasks: ["制定技师分级标准","设计各级别薪酬和服务定价","公布认证和晋升通道"] },
    { day: 3, title: "激励改革日", tasks: ["设计底薪+手工+提成+奖金结构","制定带教和培养奖励","设置季度优秀技师评选"] },
    { day: 4, title: "备岗培养日", tasks: ["为核心岗位指定备岗人员","启动备岗培训计划","建立知识沉淀文档"] },
    { day: 5, title: "新人加速日", tasks: ["制定新技师30天速成计划","设计师徒带教机制","设置阶段性考核"] },
    { day: 6, title: "团队建设日", tasks: ["组织团队活动","建立技师交流分享机制","营造正向竞争氛围"] },
    { day: 7, title: "复盘日", tasks: ["评估方案执行情况","收集技师反馈","优化认证和激励细节"] }
  ],
  longTermAdvice: [
    "建立技师分级认证体系，让优秀技师有更高的收入和地位",
    "推行多元激励机制，让核心人才分享经营成果",
    "加速新人培养，目标新人3个月内达到独立服务标准"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_008","tool_009"],
  priority: 10
},

// MARKETING_HARD - 餐饮
{
  problemCode: "MARKETING_HARD",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_m01","sym_m03","sym_m04"],
  judgment: "你的餐饮门店属于营销推广困难型问题，核心原因是线上运营基础薄弱和内容生产能力不足，需要搭建线上运营体系",
  severity: 66,
  causes: [
    { name: "线上渠道未开通", weight: 35, judgment: "大众点评、抖音、小红书等平台有你的门店吗？", description: "基础线上渠道未铺设，潜在客户线上搜不到你" },
    { name: "内容生产能力弱", weight: 25, judgment: "有没有定期发布门店相关内容？谁负责内容制作？", description: "缺少内容创作能力和节奏，线上没有任何内容资产" },
    { name: "不会策划活动", weight: 25, judgment: "过去半年做过几次营销活动？效果如何？", description: "缺少活动策划经验，即使做活动也缺乏系统性和持续性" },
    { name: "营销预算不知怎么花", weight: 15, judgment: "月营销预算多少？花在了哪些渠道？ROI如何？", description: "营销投入盲目，缺少数据驱动的预算分配策略" }
  ],
  solutionIds: ["sol_012","sol_013","sol_016"],
  todayTasks: [
    { task: "在大众点评认领门店并完善所有信息", duration: "1小时", purpose: "建立线上基础阵地" },
    { task: "拍摄5张高质量门店和菜品照片", duration: "45分钟", purpose: "准备内容素材" },
    { task: "列出周边3公里内的线上营销机会", duration: "30分钟", purpose: "规划营销方向" }
  ],
  weekPlan: [
    { day: 1, title: "线上铺设日", tasks: ["完善大众点评店铺信息","开通抖音来客","注册小红书账号"] },
    { day: 2, title: "内容规划日", tasks: ["制定月度内容日历","确定3个核心内容方向","准备首批10条内容素材"] },
    { day: 3, title: "首次内容发布日", tasks: ["发布3条大众点评笔记","发布1条抖音短视频","发布1条小红书种草"] },
    { day: 4, title: "活动策划日", tasks: ["设计本月引流活动方案","制定活动推广计划","准备活动物料"] },
    { day: 5, title: "活动预热日", tasks: ["线上发布活动预热内容","社群同步活动信息","门店布置活动氛围"] },
    { day: 6, title: "活动执行日", tasks: ["执行首个线上引流活动","引导到店客户好评","收集活动数据"] },
    { day: 7, title: "复盘日", tasks: ["统计活动到店转化","分析各渠道内容数据","优化下周内容和活动策略"] }
  ],
  longTermAdvice: [
    "坚持每周至少3条内容发布，逐步建立线上内容资产",
    "每月策划1次主题营销活动，形成客户期待",
    "用数据驱动营销决策，重点投入ROI最高的渠道"
  ],
  caseIds: ["case_007"],
  toolIds: ["tool_003","tool_010"],
  priority: 10
},

// MARKETING_HARD - 零售
{
  problemCode: "MARKETING_HARD",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_m02","sym_m05","sym_m06"],
  judgment: "你的零售门店属于营销推广困难型问题，核心原因是缺乏种草渠道和转化链路断裂，需要打通内容到购买闭环",
  severity: 65,
  causes: [
    { name: "种草渠道缺失", weight: 35, judgment: "在小红书/抖音上有种草内容吗？客户线上能看到你的产品吗？", description: "缺少线上种草渠道，产品曝光仅依赖线下自然流量" },
    { name: "转化链路断裂", weight: 30, judgment: "客户从看到产品到完成购买有几个步骤？步骤能更短吗？", description: "从内容种草到实际购买的路径太长，流失严重" },
    { name: "品牌声量不足", weight: 20, judgment: "本地客户提起你这个品类会想到你吗？", description: "品牌知名度低，在客户心智中没有位置" },
    { name: "不会利用社交裂变", weight: 15, judgment: "有拼团、砍价、分销等社交裂变工具吗？", description: "没有利用社交裂变放大营销效果" }
  ],
  solutionIds: ["sol_012","sol_013","sol_016"],
  todayTasks: [
    { task: "在小红书/抖音搜索同品类热门内容，记录爆款特征", duration: "1小时", purpose: "学习竞品内容策略" },
    { task: "拍摄3组产品场景化照片", duration: "45分钟", purpose: "准备种草素材" },
    { task: "设计一个社交裂变活动方案（拼团/分销）", duration: "45分钟", purpose: "规划裂变机制" }
  ],
  weekPlan: [
    { day: 1, title: "竞品调研日", tasks: ["分析5个同品类优秀账号","提炼爆款内容规律","制定自己的内容定位"] },
    { day: 2, title: "内容启动日", tasks: ["发布3条种草内容","测试不同内容风格","分析数据反馈"] },
    { day: 3, title: "转化链路日", tasks: ["优化线上到店的转化路径","设置线上预约/到店指引","确保每个内容有明确CTA"] },
    { day: 4, title: "裂变设计日", tasks: ["确定裂变活动形式","制作裂变海报和链接","设置裂变奖励规则"] },
    { day: 5, title: "裂变启动日", tasks: ["发布裂变活动","种子用户启动传播","监控裂变数据"] },
    { day: 6, title: "品牌建设日", tasks: ["提炼品牌差异化定位","设计品牌视觉升级方案","制定品牌故事和口号"] },
    { day: 7, title: "复盘日", tasks: ["统计内容曝光和互动数据","分析裂变传播效果","优化下周内容和裂变策略"] }
  ],
  longTermAdvice: [
    "持续在小红书/抖音种草，每周至少5条内容，建立品牌内容资产",
    "打通线上种草→到店体验→社群留存的完整链路",
    "每季度策划1次社交裂变活动，低成本获取新客户"
  ],
  caseIds: ["case_007"],
  toolIds: ["tool_003","tool_010"],
  priority: 10
},

// MARKETING_HARD - 服务业
{
  problemCode: "MARKETING_HARD",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_m01","sym_m03","sym_m05"],
  judgment: "你的服务门店属于营销推广困难型问题，核心原因是信任营销缺失和线上口碑薄弱，需要建立信任体系和口碑传播",
  severity: 67,
  causes: [
    { name: "信任壁垒高", weight: 35, judgment: "新客户最担心什么？有没有打消顾虑的信任背书？", description: "服务行业天然信任门槛高，缺少有效的信任建设手段" },
    { name: "线上口碑薄弱", weight: 30, judgment: "大众点评有多少条评价？评分多少？有案例展示吗？", description: "线上口碑评价少、内容薄，新客户难以建立信任" },
    { name: "缺少内容化表达", weight: 20, judgment: "服务过程和效果能用内容呈现吗？有做对比展示吗？", description: "服务效果没有可视化呈现，客户无法远程感知价值" },
    { name: "不会利用老客户传播", weight: 15, judgment: "满意客户有帮你传播吗？有鼓励传播的机制吗？", description: "缺少将客户满意度转化为口碑传播的机制" }
  ],
  solutionIds: ["sol_012","sol_006","sol_020"],
  todayTasks: [
    { task: "整理5个客户服务案例（含前后对比）", duration: "1小时", purpose: "建立信任素材库" },
    { task: "邀请3位满意客户写好评", duration: "30分钟", purpose: "启动口碑建设" },
    { task: "设计新客户信任保障方案（如不满意退款）", duration: "45分钟", purpose: "降低信任门槛" }
  ],
  weekPlan: [
    { day: 1, title: "口碑基础日", tasks: ["完善大众点评门店信息","上传高质量案例图片","邀请10位满意客户写好评"] },
    { day: 2, title: "内容化日", tasks: ["拍摄服务过程视频3条","制作前后对比图文2组","发布首批线上内容"] },
    { day: 3, title: "信任保障日", tasks: ["制定满意度保障承诺","设计首次体验保障方案","在所有渠道展示保障信息"] },
    { day: 4, title: "口碑裂变日", tasks: ["设计好评返利机制","制定推荐奖励方案","向满意客户发布推荐计划"] },
    { day: 5, title: "异业推广日", tasks: ["联系3家互补型商家","商讨互推合作方案","确定首批互推内容"] },
    { day: 6, title: "活动引流日", tasks: ["推出新客体验价活动","线上发布活动内容","老客户帮转介绍"] },
    { day: 7, title: "复盘日", tasks: ["统计口碑数据变化","分析新客到店渠道","优化口碑传播策略"] }
  ],
  longTermAdvice: [
    "持续积累线上口碑，目标大众点评评分4.5以上，评价200条以上",
    "建立客户推荐体系，让每个满意客户成为信任传播节点",
    "通过保障承诺和案例展示降低新客信任门槛"
  ],
  caseIds: ["case_007"],
  toolIds: ["tool_003","tool_010"],
  priority: 10
},

// COMPETITION - 餐饮
{
  problemCode: "COMPETITION",
  industry: "餐饮",
  stage: "all",
  symptomIds: ["sym_x01","sym_x02","sym_x04"],
  judgment: "你的餐饮门店属于竞争压力大型问题，核心原因是同质化严重和缺乏差异化壁垒，需要打造品类占位和独特体验",
  severity: 77,
  causes: [
    { name: "品类同质化", weight: 35, judgment: "你和竞品的菜品有什么不同？客户能说出差异吗？", description: "菜品和竞品高度同质，客户无感知差异，只能拼价格" },
    { name: "无品类占位", weight: 25, judgment: "提到某个品类，客户会第一个想到你吗？你的品类标签是什么？", description: "缺少在客户心智中的品类占位，没有品牌认知优势" },
    { name: "体验无特色", weight: 25, judgment: "除了菜品，你的用餐体验有什么独特之处？", description: "用餐环境和服务体验与竞品无差异，缺少记忆点" },
    { name: "价格战消耗利润", weight: 15, judgment: "竞品降价时你怎么应对？有没有不降价也能赢的策略？", description: "被动参与价格战，利润被不断压缩" }
  ],
  solutionIds: ["sol_003","sol_013","sol_017"],
  todayTasks: [
    { task: "实地走访3家竞品，记录菜品/价格/环境差异", duration: "2小时", purpose: "竞品差异化调研" },
    { task: "提炼1个你能做到但竞品做不到的差异化卖点", duration: "1小时", purpose: "确立差异化定位" },
    { task: "设计1个不依赖降价的竞争应对方案", duration: "45分钟", purpose: "跳出价格战" }
  ],
  weekPlan: [
    { day: 1, title: "竞品调研日", tasks: ["完成3家竞品详细调研","对比菜品/价格/环境差异","找出竞品弱点和你的优势"] },
    { day: 2, title: "差异化定位日", tasks: ["确定差异化品类定位","设计差异化核心卖点","制定品类占位口号"] },
    { day: 3, title: "体验升级日", tasks: ["设计1个独特用餐体验点","优化环境氛围细节","增加服务仪式感"] },
    { day: 4, title: "招牌菜打造日", tasks: ["确定1道独门招牌菜","优化配方和出品","设计招牌菜专属故事"] },
    { day: 5, title: "价值战启动日", tasks: ["推出价值而非价格的活动","强化差异化内容传播","引导客户感知独特价值"] },
    { day: 6, title: "壁垒构建日", tasks: ["建立供应链独占优势","培养核心技术壁垒","构建客户情感连接"] },
    { day: 7, title: "复盘日", tasks: ["评估差异化反馈","分析客户认知变化","强化差异化传播策略"] }
  ],
  longTermAdvice: [
    "坚持差异化竞争，在一个细分品类做第一而非大品类做跟风",
    "通过独特体验和品牌故事建立情感壁垒，让价格不再是决定因素",
    "持续构建竞争壁垒：独家供应/技术秘方/品牌认知/客户关系"
  ],
  caseIds: ["case_008"],
  toolIds: ["tool_001","tool_010"],
  priority: 10
},

// COMPETITION - 零售
{
  problemCode: "COMPETITION",
  industry: "零售",
  stage: "all",
  symptomIds: ["sym_x01","sym_x03","sym_x05"],
  judgment: "你的零售门店属于竞争压力大型问题，核心原因是选品无差异和品牌势能弱，需要建立独家选品优势和品牌认知",
  severity: 75,
  causes: [
    { name: "选品无独占性", weight: 35, judgment: "你卖的产品竞品也有吗？有独家或独家代理的产品吗？", description: "产品与竞品高度重合，客户随时可以去别家买" },
    { name: "品牌势能弱", weight: 25, judgment: "你的门店有品牌感吗？客户觉得在你这买和在别处买有区别吗？", description: "缺少品牌力支撑，在客户心中与竞品无差异" },
    { name: "服务无差异化", weight: 25, judgment: "你提供的购物服务和竞品有什么不同？有增值服务吗？", description: "购物体验与竞品无异，缺少让客户选择的理由" },
    { name: "规模劣势明显", weight: 15, judgment: "连锁竞品有供应链和品牌优势，你怎么应对？", description: "面对连锁品牌的规模优势，单店缺乏抗衡能力" }
  ],
  solutionIds: ["sol_008","sol_013","sol_017"],
  todayTasks: [
    { task: "统计独家产品和通用产品的占比", duration: "30分钟", purpose: "诊断选品差异化" },
    { task: "列出你能提供但竞品做不到的3个服务点", duration: "45分钟", purpose: "发现服务差异机会" },
    { task: "设计1个品牌差异化定位方案", duration: "1小时", purpose: "明确品牌方向" }
  ],
  weekPlan: [
    { day: 1, title: "选品差异化日", tasks: ["分析产品与竞品重合度","联系独家/定制产品供应商","制定独家选品引进计划"] },
    { day: 2, title: "品牌定位日", tasks: ["确定品牌差异化定位","设计品牌视觉升级方案","提炼品牌口号和故事"] },
    { day: 3, title: "服务差异化日", tasks: ["设计2个竞品没有的增值服务","制定专业咨询和搭配方案","培训员工差异化服务话术"] },
    { day: 4, title: "私域运营日", tasks: ["建立核心客户社群","设计社群专属福利","用社群对抗竞品价格战"] },
    { day: 5, title: "联盟对抗日", tasks: ["联合周边非竞争商家","建立异业联盟互推","共享客户资源对抗连锁"] },
    { day: 6, title: "本地化优势日", tasks: ["强化本地服务优势","设计本地专属产品","打造社区型品牌认知"] },
    { day: 7, title: "复盘日", tasks: ["评估差异化方案反馈","分析客户认知变化","优化竞争策略"] }
  ],
  longTermAdvice: [
    "逐步提高独家/定制产品占比，目标30%以上产品在竞品买不到",
    "用品牌化和专业化服务对抗连锁的价格和规模优势",
    "深耕本地社区，成为周边居民的首选信任品牌"
  ],
  caseIds: ["case_008"],
  toolIds: ["tool_002","tool_010"],
  priority: 10
},

// COMPETITION - 服务业
{
  problemCode: "COMPETITION",
  industry: "服务业",
  stage: "all",
  symptomIds: ["sym_x01","sym_x03","sym_x04"],
  judgment: "你的服务门店属于竞争压力大型问题，核心原因是服务无特色和客户黏性不足，需要打造服务IP和深度客户关系",
  severity: 74,
  causes: [
    { name: "服务无特色IP", weight: 35, judgment: "你的服务有个人风格或特色标签吗？客户能记住你的独特之处吗？", description: "服务缺少个人风格和记忆点，客户体验与其他店无差异" },
    { name: "客户黏性不足", weight: 30, judgment: "客户为什么持续选择你而不是更便宜的竞品？", description: "客户忠诚度低，容易被竞品的价格和活动吸引走" },
    { name: "专业度感知弱", weight: 20, judgment: "客户觉得你比竞品更专业吗？怎么体现专业度？", description: "专业优势没有有效传达，客户感知不到差异" },
    { name: "抗风险能力差", weight: 15, judgment: "竞品开促销时你的客户流失多少？有防御机制吗？", description: "缺少客户防御机制，竞品一促销就流失客户" }
  ],
  solutionIds: ["sol_006","sol_013","sol_020"],
  todayTasks: [
    { task: "列出3个你的服务比竞品做得更好的方面", duration: "30分钟", purpose: "发现竞争优势点" },
    { task: "设计1个让客户记住的服务特色或仪式", duration: "1小时", purpose: "打造服务IP" },
    { task: "制定客户防流失预警方案", duration: "45分钟", purpose: "建立客户防御" }
  ],
  weekPlan: [
    { day: 1, title: "服务IP设计日", tasks: ["确定服务特色标签","设计独特服务仪式感","打造个人/团队服务IP"] },
    { day: 2, title: "专业度强化日", tasks: ["制作专业资质展示墙","制定专业咨询和诊断流程","培训专业表达话术"] },
    { day: 3, title: "黏性提升日", tasks: ["设计客户长期服务计划","制定储值和长期套餐","建立消费里程碑奖励"] },
    { day: 4, title: "防御体系日", tasks: ["建立客户活跃度监控","设置流失预警机制","制定竞品促销应对方案"] },
    { day: 5, title: "口碑差异化日", tasks: ["鼓励客户写差异化好评","发布专业内容建立权威","突出服务特色案例"] },
    { day: 6, title: "圈层运营日", tasks: ["建立核心客户VIP社群","设计社群专属活动和福利","培养客户归属感"] },
    { day: 7, title: "复盘日", tasks: ["评估差异化效果","分析客户黏性变化","优化竞争防御策略"] }
  ],
  longTermAdvice: [
    "打造个人/团队服务IP，让客户因为你这个人而选择你",
    "通过专业度和深度服务建立客户黏性，降低被竞品抢走的概率",
    "建立客户防御体系，及时发现和挽回有流失风险的客户"
  ],
  caseIds: ["case_008"],
  toolIds: ["tool_004","tool_010"],
  priority: 10
},

// ---- 阶段专属路径（8问题×3阶段=24条，industry=all）----

// TRAFFIC_LOW - 新店
{
  problemCode: "TRAFFIC_LOW",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_t01","sym_t02","sym_t05"],
  judgment: "你的新店属于起步期客流不足型问题，核心原因是知名度为零和缺乏初始流量注入，需要快速建立周边认知",
  severity: 80,
  causes: [
    { name: "新店零知名度", weight: 40, judgment: "开业以来周边有多少人知道你的店？做了哪些开业推广？", description: "新开门店没有任何品牌认知积累，周边人群完全不知道" },
    { name: "开业引流不足", weight: 30, judgment: "开业活动效果如何？到店人数达到预期了吗？", description: "开业引流不够猛，错失了黄金推广期" },
    { name: "产品/服务未验证", weight: 20, judgment: "产品和服务经过市场验证吗？有根据早期客户反馈调整吗？", description: "产品和服务尚未经过市场检验，可能不符合本地需求" },
    { name: "缺乏种子用户", weight: 10, judgment: "有多少回头客？种子用户群体形成了吗？", description: "缺少第一批种子用户，口碑传播基础尚未建立" }
  ],
  solutionIds: ["sol_001","sol_012","sol_013"],
  todayTasks: [
    { task: "设计一个强力开业/重新开业引流活动方案", duration: "1小时", purpose: "规划引流爆发" },
    { task: "印制500份周边社区推广传单", duration: "30分钟", purpose: "启动地推宣传" },
    { task: "邀请5位朋友/家人免费体验并提建议", duration: "2小时", purpose: "获取首批反馈" }
  ],
  weekPlan: [
    { day: 1, title: "开业引爆日", tasks: ["确定引流活动力度和方案","准备活动物料","培训员工活动话术"] },
    { day: 2, title: "周边轰炸日", tasks: ["周边500米派发传单","社区公告栏张贴广告","进入业主群发布开业信息"] },
    { day: 3, title: "线上铺设日", tasks: ["完善所有线上平台信息","发布开业优惠内容","邀请本地达人探店"] },
    { day: 4, title: "种子用户日", tasks: ["设计种子用户专属福利","首批到店客户深度服务","收集产品和服务反馈"] },
    { day: 5, title: "产品验证日", tasks: ["根据首批反馈调整产品","优化服务流程","确定核心主打产品"] },
    { day: 6, title: "口碑启动日", tasks: ["引导满意客户写好评","拍摄客户真实反馈视频","启动推荐奖励计划"] },
    { day: 7, title: "复盘日", tasks: ["统计本周到店总人数","分析客户来源渠道","制定第二周引流计划"] }
  ],
  longTermAdvice: [
    "新店前3个月是黄金引流期，要保持高频推广不间断",
    "快速验证产品和服务，根据市场反馈敏捷调整",
    "尽早建立种子用户群体，为口碑传播打下基础"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_003"],
  priority: 9
},

// TRAFFIC_LOW - 成长期
{
  problemCode: "TRAFFIC_LOW",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_t01","sym_t04","sym_t06"],
  judgment: "你的成长期门店属于客流增长瓶颈型问题，核心原因是引流渠道单一和线上转化率低，需要拓展流量渠道",
  severity: 68,
  causes: [
    { name: "引流渠道单一", weight: 35, judgment: "目前主要客源来自哪些渠道？有没有过度依赖单一渠道？", description: "客源渠道过于集中，一旦该渠道效果下滑就陷入被动" },
    { name: "线上转化率低", weight: 25, judgment: "线上看到你门店信息的人有多少实际到店？转化率多少？", description: "有一定线上曝光，但从看到到到店的转化效率低" },
    { name: "增长策略模糊", weight: 25, judgment: "有明确的月度客流增长目标吗？有对应的增长策略吗？", description: "缺少系统化的增长策略，客流增长全凭运气" },
    { name: "竞争对手分流", weight: 15, judgment: "新开的竞品有没有抢走你的客流？", description: "新入局者分流了部分客源，需要建立防御" }
  ],
  solutionIds: ["sol_001","sol_012","sol_005"],
  todayTasks: [
    { task: "分析各渠道客源占比，识别过度依赖渠道", duration: "30分钟", purpose: "诊断渠道结构" },
    { task: "列出3个尚未尝试的潜在引流渠道", duration: "30分钟", purpose: "拓展渠道思路" },
    { task: "制定月度客流增长目标和分解方案", duration: "1小时", purpose: "明确增长方向" }
  ],
  weekPlan: [
    { day: 1, title: "渠道审计日", tasks: ["完成各渠道客源分析","标记过度依赖渠道","制定渠道多元化计划"] },
    { day: 2, title: "新渠道探索日", tasks: ["测试2个新引流渠道","评估新渠道获取成本","确定重点投入渠道"] },
    { day: 3, title: "线上优化日", tasks: ["优化线上店铺页面","提升线上到店转化率","增加线上引导到店的触点"] },
    { day: 4, title: "内容引流日", tasks: ["发布高质量引流内容","利用热点话题增加曝光","测试付费推广效果"] },
    { day: 5, title: "异业引流日", tasks: ["联系3家异业合作伙伴","设计互推引流方案","启动首次异业合作"] },
    { day: 6, title: "老客裂变日", tasks: ["设计老客推荐引流方案","制作推荐码和海报","向活跃客户发布推荐计划"] },
    { day: 7, title: "复盘日", tasks: ["统计各渠道新增客流","计算各渠道获客成本","优化渠道投入分配"] }
  ],
  longTermAdvice: [
    "建立多元化引流渠道体系，任一渠道占比不超过40%",
    "持续优化线上到店转化率，目标转化率8%以上",
    "将增长目标数字化，月度跟踪并调整策略"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_001","tool_003"],
  priority: 9
},

// TRAFFIC_LOW - 老店
{
  problemCode: "TRAFFIC_LOW",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_t01","sym_t04","sym_t06"],
  judgment: "你的老店属于客流萎缩型问题，核心原因是品牌老化和新鲜感缺失，需要品牌焕新和重新激活周边市场",
  severity: 72,
  causes: [
    { name: "品牌形象老化", weight: 35, judgment: "门店装修和品牌形象多久没更新了？客户是否觉得你过时了？", description: "门店形象和品牌老化，对新一代客户缺乏吸引力" },
    { name: "新鲜感缺失", weight: 25, judgment: "最近一次给客户新鲜感是什么时候？老客户是不是审美疲劳了？", description: "长期不变导致客户审美疲劳，缺少回头动力" },
    { name: "线上阵地缺失", weight: 25, judgment: "在年轻人的线上平台上有存在感吗？", description: "在新兴线上平台缺少布局，错失年轻客群" },
    { name: "周边人口结构变化", weight: 15, judgment: "周边3公里的居住人群这些年有变化吗？你的客户定位需要调整吗？", description: "周边人口结构变化，但门店定位和产品未跟上变化" }
  ],
  solutionIds: ["sol_003","sol_013","sol_017"],
  todayTasks: [
    { task: "拍摄门店外观和内部现状照片，客观审视老化程度", duration: "30分钟", purpose: "诊断品牌老化" },
    { task: "调研周边3公里人口结构和消费习惯变化", duration: "1小时", purpose: "了解市场变化" },
    { task: "设计一个品牌焕新的初步方案", duration: "1小时", purpose: "规划焕新方向" }
  ],
  weekPlan: [
    { day: 1, title: "品牌审计日", tasks: ["完成品牌形象评估","收集客户对门店印象反馈","确定焕新优先级"] },
    { day: 2, title: "市场更新日", tasks: ["调研周边人口结构变化","分析新客群消费偏好","调整目标客群定位"] },
    { day: 3, title: "视觉焕新日", tasks: ["制定门店视觉升级方案","优化门头和店内装饰","更新宣传物料风格"] },
    { day: 4, title: "产品焕新日", tasks: ["推出应季新品/新服务","设计怀旧+创新组合","制造'焕新回归'话题"] },
    { day: 5, title: "线上重启日", tasks: ["入驻抖音/小红书等新平台","发布焕新内容","投放周边3公里精准广告"] },
    { day: 6, title: "活动引爆日", tasks: ["举办焕新开业活动","邀请老客户回店体验","制造社交话题传播"] },
    { day: 7, title: "复盘日", tasks: ["统计焕新后客流变化","分析新客年龄结构","持续优化焕新策略"] }
  ],
  longTermAdvice: [
    "每2-3年进行一次品牌焕新，保持对新一代客群的吸引力",
    "紧跟线上平台趋势，在年轻人聚集的渠道建立存在感",
    "定期调研周边市场变化，及时调整定位和产品结构"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_001","tool_010"],
  priority: 9
},

// REVENUE_DROP - 新店
{
  problemCode: "REVENUE_DROP",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_r01","sym_r04"],
  judgment: "你的新店属于营收未达预期型问题，核心原因是客群积累不足和定价策略需调整，需要加速客群积累和优化营收结构",
  severity: 75,
  causes: [
    { name: "客群积累不足", weight: 40, judgment: "日均到店人数达到盈亏平衡点了吗？", description: "新店客群积累不够，到店人数远未达到营收预期" },
    { name: "定价策略需优化", weight: 25, judgment: "定价是基于成本还是市场？和周边消费力匹配吗？", description: "定价缺乏市场依据，可能过高或过低影响营收" },
    { name: "产品结构未成熟", weight: 20, judgment: "哪些产品好卖哪些不好卖？有做调整吗？", description: "产品结构还在摸索期，缺少经过验证的营收支柱" },
    { name: "开业红利消退", weight: 15, judgment: "开业后营收是不是快速下滑？有后续经营计划吗？", description: "开业期新鲜感过后营收下滑，缺少持续经营规划" }
  ],
  solutionIds: ["sol_001","sol_004","sol_014"],
  todayTasks: [
    { task: "计算日均盈亏平衡点到店人数，对比实际差距", duration: "30分钟", purpose: "明确营收缺口" },
    { task: "调研周边3家竞品的定价水平", duration: "1小时", purpose: "校准定价策略" },
    { task: "标记近1个月销量TOP5和BOTTOM5产品", duration: "30分钟", purpose: "优化产品结构" }
  ],
  weekPlan: [
    { day: 1, title: "营收拆解日", tasks: ["拆解营收=客流×客单价","找出营收缺口主要来源","制定针对性补缺计划"] },
    { day: 2, title: "定价校准日", tasks: ["完成竞品定价调研","调整偏离市场的定价","设计价格测试方案"] },
    { day: 3, title: "产品聚焦日", tasks: ["聚焦推广TOP5产品","淘汰或替换BOTTOM5","设计组合套餐提升客单"] },
    { day: 4, title: "客流提升日", tasks: ["推出限时引流活动","设计到店转化诱饵","加强周边推广力度"] },
    { day: 5, title: "储值启动日", tasks: ["设计储值卡方案","推出储值优惠激励","引导首批储值客户"] },
    { day: 6, title: "二次消费日", tasks: ["设计首次消费后的回访机制","推出7天内二次消费优惠","加速新客转化为熟客"] },
    { day: 7, title: "复盘日", tasks: ["统计本周营收变化","分析客单价和客流走势","制定下周营收目标"] }
  ],
  longTermAdvice: [
    "新店前3个月聚焦客群积累，日均到店人数是第一指标",
    "持续优化定价和产品结构，找到营收最优组合",
    "尽早启动储值和会员体系，锁定客户长期消费"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_005"],
  priority: 9
},

// REVENUE_DROP - 成长期
{
  problemCode: "REVENUE_DROP",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_r01","sym_r02","sym_r04"],
  judgment: "你的成长期门店属于营收增长停滞型问题，核心原因是增长模式见顶和缺少新增长点，需要突破增长天花板",
  severity: 70,
  causes: [
    { name: "增长模式见顶", weight: 35, judgment: "现有增长方式的天花板在哪里？还有多大增长空间？", description: "原有增长模式已接近极限，需要找到新增长引擎" },
    { name: "缺少第二增长曲线", weight: 25, judgment: "除了现有业务，有没有新的收入来源？", description: "过度依赖单一收入来源，缺少多元化营收" },
    { name: "客户价值未充分挖掘", weight: 25, judgment: "现有客户的消费频次和客单价还有提升空间吗？", description: "现有客户价值挖掘不充分，客单价和频次有提升空间" },
    { name: "外部环境变化", weight: 15, judgment: "市场环境、消费习惯或政策有没有发生变化？", description: "外部环境变化导致原有营收模式效果下降" }
  ],
  solutionIds: ["sol_004","sol_007","sol_014"],
  todayTasks: [
    { task: "分析现有增长模式的天花板位置", duration: "45分钟", purpose: "评估增长空间" },
    { task: "列出3个可能的第二增长曲线方向", duration: "1小时", purpose: "拓展增长思路" },
    { task: "计算现有客户的消费频次和客单价提升空间", duration: "30分钟", purpose: "挖掘客户价值" }
  ],
  weekPlan: [
    { day: 1, title: "增长审计日", tasks: ["分析现有增长模式瓶颈","评估各增长指标天花板","制定突破策略"] },
    { day: 2, title: "第二曲线探索日", tasks: ["评估新业务/新产品可行性","选择1-2个方向小规模测试","制定测试方案和指标"] },
    { day: 3, title: "客户价值深挖日", tasks: ["设计提升客单价方案","制定提升消费频次策略","推出升级和增值服务"] },
    { day: 4, title: "渠道拓展日", tasks: ["评估线上渠道增量空间","探索B端或团购渠道","制定渠道拓展计划"] },
    { day: 5, title: "效率提升日", tasks: ["优化运营效率降低成本","提升服务效率增加产能","用效率换营收增长"] },
    { day: 6, title: "测试启动日", tasks: ["启动第二曲线小规模测试","推出客户价值提升方案","收集数据和反馈"] },
    { day: 7, title: "复盘日", tasks: ["分析测试数据","评估增长突破效果","确定下一步重点方向"] }
  ],
  longTermAdvice: [
    "不要在一条增长曲线上死磕，提前布局第二增长曲线",
    "深挖现有客户价值是最经济的增长方式",
    "关注外部环境变化，及时调整经营策略适应新形势"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_005","tool_007"],
  priority: 9
},

// REVENUE_DROP - 老店
{
  problemCode: "REVENUE_DROP",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_r01","sym_r02","sym_r05"],
  judgment: "你的老店属于营收持续萎缩型问题，核心原因是客户基础萎缩和产品老化，需要客户回归和产品焕新双管齐下",
  severity: 76,
  causes: [
    { name: "老客户持续流失", weight: 35, judgment: "月流失率多少？流失客户的主要原因是什么？", description: "老客户逐渐流失，客户基础不断萎缩" },
    { name: "产品/服务老化", weight: 25, judgment: "核心产品多久没更新了？客户是不是审美疲劳了？", description: "产品和服务长期不更新，无法满足变化的市场需求" },
    { name: "新客获取能力退化", weight: 25, judgment: "新客户占客户总数比例多少？有新客增长吗？", description: "新客获取能力退化，入不敷出" },
    { name: "经营模式陈旧", weight: 15, judgment: "经营方式还是3年前的吗？有没有尝试新方法？", description: "经营模式停留在过去，不适应新的市场环境" }
  ],
  solutionIds: ["sol_003","sol_014","sol_017"],
  todayTasks: [
    { task: "统计近6个月客户流失率和新客增长率", duration: "30分钟", purpose: "诊断客户基础" },
    { task: "设计老客户回归方案（专属优惠+新品体验邀请）", duration: "1小时", purpose: "启动客户回归" },
    { task: "规划1次产品/服务焕新升级", duration: "1小时", purpose: "启动产品焕新" }
  ],
  weekPlan: [
    { day: 1, title: "客户审计日", tasks: ["完成客户流失率分析","标记流失原因TOP3","制定客户挽回和新增计划"] },
    { day: 2, title: "回归行动日", tasks: ["联系流失6个月内的高价值客户","提供专属回归优惠","收集流失原因反馈"] },
    { day: 3, title: "产品焕新日", tasks: ["推出1-2个升级版产品/服务","保留经典款+增加创新款","设计焕新包装和呈现"] },
    { day: 4, title: "模式升级日", tasks: ["引入线上预订/外卖/团购","更新会员和储值体系","尝试新的经营方式"] },
    { day: 5, title: "新客获取日", tasks: ["启动线上引流活动","与周边新开商家互推","投放周边3公里精准广告"] },
    { day: 6, title: "焕新发布日", tasks: ["举办焕新回归活动","线上线下同步宣传","邀请老客户和新客户到店"] },
    { day: 7, title: "复盘日", tasks: ["统计回归客户数","分析新客获取效果","评估营收回暖情况"] }
  ],
  longTermAdvice: [
    "建立客户流失预警机制，提前干预而非事后补救",
    "每年至少1次产品/服务焕新，保持市场竞争力",
    "拥抱新的经营方式和工具，不要固守旧模式"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_010"],
  priority: 9
},

// PROFIT_LOW - 新店
{
  problemCode: "PROFIT_LOW",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_p02","sym_p04","sym_p05"],
  judgment: "你的新店属于亏损/低利润型问题，核心原因是固定成本高和规模未达盈亏平衡，需要快速提升营收规模和精简成本",
  severity: 82,
  causes: [
    { name: "未达盈亏平衡点", weight: 40, judgment: "月盈亏平衡点营收是多少？实际营收差距多大？", description: "营收规模尚未覆盖固定成本，处于亏损经营状态" },
    { name: "前期投入过大", weight: 25, judgment: "装修和设备投入是否超出预算？每月折旧压力多大？", description: "开业前期投入过大，每月折旧和还款压力侵蚀利润" },
    { name: "固定成本占比高", weight: 20, judgment: "房租+人工占营收比例多少？超过60%了吗？", description: "固定成本占比过高，营收增长时利润弹性不足" },
    { name: "定价偏低", weight: 15, judgment: "是不是因为新店不敢定高价？实际可以定多少？", description: "新店因不自信而定价偏低，利润空间被压缩" }
  ],
  solutionIds: ["sol_009","sol_010","sol_016"],
  todayTasks: [
    { task: "计算月盈亏平衡点和当前差距", duration: "30分钟", purpose: "明确生存目标" },
    { task: "列出所有成本项，标记可削减的支出", duration: "45分钟", purpose: "找到降本空间" },
    { task: "评估3个核心产品的定价提升空间", duration: "30分钟", purpose: "测试提价可能" }
  ],
  weekPlan: [
    { day: 1, title: "盈亏分析日", tasks: ["完成盈亏平衡点计算","分析各成本项占比","制定减亏行动计划"] },
    { day: 2, title: "成本精简日", tasks: ["削减非必要支出","优化供应商降低进货成本","减少浪费和损耗"] },
    { day: 3, title: "定价优化日", tasks: ["测试核心产品提价","设计价值感提升方案","确保提价后客户仍觉得值"] },
    { day: 4, title: "产能最大化日", tasks: ["延长有效营业时间","提升高峰期服务效率","增加单位时间产出"] },
    { day: 5, title: "增量渠道日", tasks: ["开拓外卖/团购等增量渠道","承接小型团餐/团购订单","最大化场地利用率"] },
    { day: 6, title: "效率提升日", tasks: ["优化排班减少冗余","简化流程提高效率","用更少人做更多事"] },
    { day: 7, title: "复盘日", tasks: ["计算本周利润改善","评估距盈亏平衡的差距","制定下周减亏目标"] }
  ],
  longTermAdvice: [
    "新店首要目标是尽快达到盈亏平衡，一切围绕这个目标",
    "精简一切非必要开支，保留核心投入",
    "在提升价值感的基础上逐步优化定价，扩大利润空间"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 9
},

// PROFIT_LOW - 成长期
{
  problemCode: "PROFIT_LOW",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_p01","sym_p03","sym_p05"],
  judgment: "你的成长期门店属于增收不增利型问题，核心原因是成本随规模同步增长和毛利结构不佳，需要精细化成本管控和优化毛利",
  severity: 73,
  causes: [
    { name: "成本随规模同步增长", weight: 35, judgment: "营收增长时成本是否同比例增长？规模效应在哪里？", description: "营收增长但成本同步增加，没有形成规模效应" },
    { name: "毛利结构不佳", weight: 25, judgment: "高毛利产品占比多少？低毛利产品占比多少？", description: "产品毛利结构不合理，低毛利占比过大拉低整体" },
    { name: "管理粗放", weight: 25, judgment: "有没有精细化的成本管控？各项成本有目标值吗？", description: "管理粗放，缺少精细化成本管控机制" },
    { name: "隐性成本被忽视", weight: 15, judgment: "有没有算过损耗、返工、空置等隐性成本？", description: "大量隐性成本被忽视，实际利润比账面更差" }
  ],
  solutionIds: ["sol_009","sol_010","sol_016"],
  todayTasks: [
    { task: "制作详细的成本结构表，找出占比最大的3项", duration: "45分钟", purpose: "诊断成本结构" },
    { task: "计算各产品/服务的毛利率排名", duration: "30分钟", purpose: "优化毛利结构" },
    { task: "盘点1天的隐性成本（损耗、返工、空置等）", duration: "全天观察", purpose: "暴露隐性损失" }
  ],
  weekPlan: [
    { day: 1, title: "成本审计日", tasks: ["完成成本结构详细分析","标记可控成本和固定成本","制定各成本项目标值"] },
    { day: 2, title: "毛利优化日", tasks: ["调整低毛利产品定价或配方","增加高毛利产品推广力度","目标整体毛利率提升5%"] },
    { day: 3, title: "采购优化日", tasks: ["与供应商重新谈判价格","拓展采购渠道比价","制定采购成本降低目标"] },
    { day: 4, title: "损耗治理日", tasks: ["统计各项损耗数据","制定损耗降低目标和措施","建立损耗监控机制"] },
    { day: 5, title: "人效提升日", tasks: ["分析人均产出和人工成本","优化排班和工作流程","制定人效提升目标"] },
    { day: 6, title: "管理精细化日", tasks: ["建立成本日报/周报机制","设置成本预警线","培训全员成本意识"] },
    { day: 7, title: "复盘日", tasks: ["统计本周成本变化","评估利润改善情况","制定下月利润目标"] }
  ],
  longTermAdvice: [
    "建立精细化成本管控体系，每项成本都有目标值和监控",
    "持续优化产品毛利结构，高毛利产品占比目标50%以上",
    "重视隐性成本，定期盘点和治理损耗、返工、空置"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_005","tool_006"],
  priority: 9
},

// PROFIT_LOW - 老店
{
  problemCode: "PROFIT_LOW",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_p01","sym_p03","sym_p05"],
  judgment: "你的老店属于利润持续走低型问题，核心原因是成本刚性上涨和定价能力不足，需要结构性改革和提升定价权",
  severity: 78,
  causes: [
    { name: "成本刚性上涨", weight: 35, judgment: "房租、人工、食材/进货成本每年涨多少？有应对方案吗？", description: "各项成本持续上涨，但营收增长跟不上成本增长" },
    { name: "定价权不足", weight: 30, judgment: "你敢涨价吗？客户对价格敏感度多高？", description: "长期不敢涨价，利润空间被成本上涨不断压缩" },
    { name: "效率损失积累", weight: 20, judgment: "经营多年积累的流程冗余有多少？有做过流程再造吗？", description: "多年经营积累的效率损失，流程冗余和浪费严重" },
    { name: "收入结构单一", weight: 15, judgment: "收入来源有几个？有没有额外的利润增长点？", description: "过度依赖单一收入来源，缺少利润补充渠道" }
  ],
  solutionIds: ["sol_009","sol_010","sol_017"],
  todayTasks: [
    { task: "对比近3年各项成本涨幅，标记涨幅最大的3项", duration: "45分钟", purpose: "明确成本压力" },
    { task: "设计1个有理由的涨价方案（配合产品升级）", duration: "1小时", purpose: "突破定价困境" },
    { task: "梳理1个核心业务流程，找出可优化环节", duration: "30分钟", purpose: "启动效率改进" }
  ],
  weekPlan: [
    { day: 1, title: "成本结构分析日", tasks: ["完成3年成本对比分析","预测未来成本趋势","制定成本控制战略"] },
    { day: 2, title: "定价策略日", tasks: ["设计价值支撑型涨价方案","配合产品升级合理涨价","制定分步涨价计划"] },
    { day: 3, title: "流程再造日", tasks: ["梳理核心业务流程","消除冗余环节和浪费","制定标准化操作流程"] },
    { day: 4, title: "收入多元化日", tasks: ["探索新增收入来源","评估外卖/团购/团采渠道","设计增值服务收入"] },
    { day: 5, title: "成本谈判日", tasks: ["与房东谈租金条件","与供应商谈价格优化","与员工谈效率提升方案"] },
    { day: 6, title: "执行启动日", tasks: ["启动首轮涨价","执行流程优化","开通新增收入渠道"] },
    { day: 7, title: "复盘日", tasks: ["评估涨价客户反应","统计利润改善效果","制定持续优化计划"] }
  ],
  longTermAdvice: [
    "每年合理涨价1-2次，通过价值提升支撑价格",
    "持续进行流程再造，消除多年积累的效率损失",
    "拓展收入来源，不把利润押注在单一渠道上"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 9
},

// PRODUCT_SLOW - 新店
{
  problemCode: "PRODUCT_SLOW",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_s02","sym_s06"],
  judgment: "你的新店属于产品验证不足型问题，核心原因是产品组合未经市场验证和缺乏主打爆品，需要快速验证和聚焦",
  severity: 74,
  causes: [
    { name: "产品组合未经验证", weight: 40, judgment: "开业时的产品组合有经过测试吗？有多少产品是凭感觉选的？", description: "产品组合缺乏市场验证，大量产品不符合本地需求" },
    { name: "缺乏主打爆品", weight: 30, judgment: "有没有一款让客户必须来的拳头产品？", description: "没有形成主打爆品，客户缺少明确的进店理由" },
    { name: "产品线过宽或过窄", weight: 20, judgment: "产品数量是太多还是太少？客户是选择困难还是选择太少？", description: "产品线宽度不当，影响客户决策和运营效率" },
    { name: "定价与价值不匹配", weight: 10, judgment: "客户觉得你的产品值这个价吗？", description: "产品定价与客户感知价值不匹配，影响购买决策" }
  ],
  solutionIds: ["sol_003","sol_004","sol_019"],
  todayTasks: [
    { task: "统计所有产品的销量和毛利，标记明星产品和问题产品", duration: "45分钟", purpose: "完成产品矩阵分析" },
    { task: "选出1个最具潜力的爆品候选，制定打造计划", duration: "1小时", purpose: "聚焦爆品打造" },
    { task: "设计3组不同价位的产品组合供客户选择", duration: "30分钟", purpose: "优化选择结构" }
  ],
  weekPlan: [
    { day: 1, title: "产品验证日", tasks: ["完成产品销量毛利矩阵","标记明星/现金牛/问题/瘦狗","制定产品调整方案"] },
    { day: 2, title: "爆品聚焦日", tasks: ["确定1个主打爆品","集中资源推广爆品","设计爆品专属体验"] },
    { day: 3, title: "产品线优化日", tasks: ["精简低效产品线","聚焦核心品类","确保产品线宽度适中"] },
    { day: 4, title: "定价校准日", tasks: ["测试不同定价的市场反应","找到最佳价格点","确保价值感匹配定价"] },
    { day: 5, title: "爆品测试日", tasks: ["推出爆品限时体验活动","收集客户反馈","优化爆品体验"] },
    { day: 6, title: "组合设计日", tasks: ["设计引流+利润组合套餐","优化套餐价格锚点","培训组合推荐话术"] },
    { day: 7, title: "复盘日", tasks: ["统计爆品销售数据","分析套餐转化率","确定产品战略方向"] }
  ],
  longTermAdvice: [
    "新店先做减法再做加法，聚焦1-2个爆品打透市场",
    "通过数据驱动选品，持续验证和迭代产品组合",
    "设计清晰的产品选择结构，降低客户决策成本"
  ],
  caseIds: ["case_006"],
  toolIds: ["tool_007"],
  priority: 9
},

// PRODUCT_SLOW - 成长期
{
  problemCode: "PRODUCT_SLOW",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_s01","sym_s02","sym_s05"],
  judgment: "你的成长期门店属于产品竞争力下降型问题，核心原因是爆品衰退和新品断档，需要持续创新和延长产品生命周期",
  severity: 71,
  causes: [
    { name: "爆品衰退", weight: 35, judgment: "原来的爆款产品销量是不是在下降？有替代品吗？", description: "曾经的爆品进入衰退期，缺少接替的新爆品" },
    { name: "新品研发断档", weight: 30, judgment: "多久没出新品了？新品上市后的成功率多少？", description: "新品研发节奏断裂，产品线老化严重" },
    { name: "客户口味变化", weight: 20, judgment: "客户的需求和偏好在变化吗？你有跟踪吗？", description: "客户口味和需求变化，但产品没有跟上变化" },
    { name: "产品迭代机制缺失", weight: 15, judgment: "有定期的产品复盘和迭代计划吗？", description: "缺少系统化的产品迭代机制，产品更新靠灵感" }
  ],
  solutionIds: ["sol_004","sol_007","sol_019"],
  todayTasks: [
    { task: "分析各产品生命周期阶段，标记衰退期产品", duration: "45分钟", purpose: "诊断产品生命周期" },
    { task: "设计2款新品研发方案", duration: "1小时", purpose: "启动新品研发" },
    { task: "收集客户对现有产品的改进建议", duration: "30分钟", purpose: "了解需求变化" }
  ],
  weekPlan: [
    { day: 1, title: "生命周期审计日", tasks: ["标记各产品生命周期阶段","制定衰退品替代计划","设计爆品续命方案"] },
    { day: 2, title: "新品研发日", tasks: ["研发2款新品","内部品鉴筛选","确定1款主推新品"] },
    { day: 3, title: "老品升级日", tasks: ["优化衰退期产品配方/设计","增加新鲜元素","延长产品生命周期"] },
    { day: 4, title: "新品内测日", tasks: ["邀请老客户试吃/试用新品","收集反馈和改进建议","确定新品最终版本"] },
    { day: 5, title: "迭代机制日", tasks: ["制定季度产品迭代计划","建立新品研发SOP","设置产品复盘日历"] },
    { day: 6, title: "新品上线日", tasks: ["新品正式上市","设计新品专属推广活动","线上线下同步宣传"] },
    { day: 7, title: "复盘日", tasks: ["统计新品首周销量","分析老品升级效果","优化产品迭代节奏"] }
  ],
  longTermAdvice: [
    "建立季度产品迭代机制，持续淘汰衰退品、推出新品",
    "提前布局下一代爆品，不让爆品断档",
    "跟踪客户需求变化，让产品始终与市场同步"
  ],
  caseIds: ["case_006"],
  toolIds: ["tool_007"],
  priority: 9
},

// PRODUCT_SLOW - 老店
{
  problemCode: "PRODUCT_SLOW",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_s01","sym_s04","sym_s05"],
  judgment: "你的老店属于产品老化型问题，核心原因是创新停滞和客户审美疲劳，需要产品全面革新和引入新鲜元素",
  severity: 73,
  causes: [
    { name: "创新长期停滞", weight: 35, judgment: "过去1年推出了几款新品？成功了几款？", description: "产品创新停滞，长期没有令人眼前一亮的新品" },
    { name: "客户审美疲劳", weight: 30, judgment: "老客户是不是说'都吃/买腻了'？", description: "客户对现有产品产生审美疲劳，消费频次下降" },
    { name: "脱离市场趋势", weight: 20, judgment: "你知道当前市场流行什么吗？你的产品跟上趋势了吗？", description: "产品脱轨市场趋势，无法吸引新一代消费者" },
    { name: "品质管控松懈", weight: 15, judgment: "老产品的品质有没有下降？客户有没有反馈不如从前？", description: "长期经营后品质管控松懈，核心产品质量下滑" }
  ],
  solutionIds: ["sol_003","sol_019","sol_017"],
  todayTasks: [
    { task: "调研当前市场热门趋势和爆款产品", duration: "1小时", purpose: "了解市场风向" },
    { task: "对核心产品进行品质检查，对比过去标准", duration: "45分钟", purpose: "排查品质滑坡" },
    { task: "设计1个产品革新方案（保留经典+引入创新）", duration: "1小时", purpose: "规划产品革新" }
  ],
  weekPlan: [
    { day: 1, title: "趋势调研日", tasks: ["调研行业热门趋势","分析年轻客群偏好","确定产品革新方向"] },
    { day: 2, title: "品质回归日", tasks: ["恢复核心产品品质标准","重新制定出品SOP","培训出品标准执行"] },
    { day: 3, title: "创新设计日", tasks: ["设计3款创新产品方案","结合经典+潮流元素","确保创新不离核心定位"] },
    { day: 4, title: "新品研发日", tasks: ["实现1-2款创新产品","内部品鉴和优化","确定上市版本"] },
    { day: 5, title: "老品升级日", tasks: ["给经典产品增加新元素","优化包装和呈现","让老品焕发新生"] },
    { day: 6, title: "新品发布日", tasks: ["举办新品品鉴活动","邀请老客户和KOL体验","线上线下同步推广"] },
    { day: 7, title: "复盘日", tasks: ["统计新品市场反馈","分析老品升级效果","制定持续创新计划"] }
  ],
  longTermAdvice: [
    "每季度至少推出2款新品，保持产品和品牌活力",
    "坚持品质底线，核心产品的品质只会升不能降",
    "紧跟市场趋势但不盲从，找到经典与创新的平衡"
  ],
  caseIds: ["case_006"],
  toolIds: ["tool_007"],
  priority: 9
},

// CUSTOMER_LOSS - 新店
{
  problemCode: "CUSTOMER_LOSS",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_c01","sym_c03"],
  judgment: "你的新店属于客户留存困难型问题，核心原因是首单体验不完善和缺乏留存机制，需要优化首单体验和建立留存基础",
  severity: 72,
  causes: [
    { name: "首单体验不完善", weight: 35, judgment: "新客户第一次到店体验完整吗？有没有给到超预期的惊喜？", description: "首单体验缺乏设计，客户没有留下深刻印象" },
    { name: "无留存触点", weight: 30, judgment: "客户离店后还能联系到吗？加了微信或留了电话吗？", description: "没有留存触点，客户离店即失联" },
    { name: "服务流程不稳定", weight: 20, judgment: "新店服务流程是否稳定？不同时间体验一致吗？", description: "新店服务流程尚未稳定，体验时好时坏" },
    { name: "缺少回店理由", weight: 15, judgment: "客户第二次来有什么理由？有设计回店诱饵吗？", description: "没有设计引导客户二次到店的理由和机制" }
  ],
  solutionIds: ["sol_002","sol_011","sol_020"],
  todayTasks: [
    { task: "从客户视角完整走一遍首单体验流程，记录感受", duration: "1小时", purpose: "诊断首单体验" },
    { task: "设计1个加微信/留联系方式的自然触点", duration: "30分钟", purpose: "建立留存通道" },
    { task: "设计1个二次到店的专属优惠", duration: "30分钟", purpose: "制造回店理由" }
  ],
  weekPlan: [
    { day: 1, title: "体验设计日", tasks: ["设计完整首单体验流程","增加超预期惊喜环节","培训首单体验话术"] },
    { day: 2, title: "留存触点日", tasks: ["设计加微信/留电话的自然方式","准备加粉话术和福利","确保100%新客户留存触点"] },
    { day: 3, title: "服务标准化日", tasks: ["制定核心服务SOP","设置服务检查点","确保体验一致性"] },
    { day: 4, title: "回店机制日", tasks: ["设计二次到店专属优惠","制定离店后3天内回访计划","准备回访话术"] },
    { day: 5, title: "社群基础日", tasks: ["建立客户社群","设计社群入群福利","首批客户入群"] },
    { day: 6, title: "回访启动日", tasks: ["对本周所有到店客户进行回访","引导二次到店","收集体验反馈"] },
    { day: 7, title: "复盘日", tasks: ["统计新客留存率","分析回访转化效果","优化留存机制"] }
  ],
  longTermAdvice: [
    "将首单体验作为核心设计，让每个新客户都成为传播者",
    "确保100%新客户留下联系方式，建立留存基础",
    "设计持续的回店理由，新店3个月内复购率目标30%以上"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_004","tool_008"],
  priority: 9
},

// CUSTOMER_LOSS - 成长期
{
  problemCode: "CUSTOMER_LOSS",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_c01","sym_c02","sym_c04"],
  judgment: "你的成长期门店属于客户黏性不足型问题，核心原因是会员体系薄弱和客户运营粗放，需要深化会员运营和精细化客户管理",
  severity: 70,
  causes: [
    { name: "会员体系薄弱", weight: 35, judgment: "会员占比多少？会员活跃率多少？会员和非会员消费差异大吗？", description: "会员体系存在但效果差，会员权益无吸引力" },
    { name: "客户运营粗放", weight: 25, judgment: "有没有客户分层？不同客户有不同的运营策略吗？", description: "客户运营一刀切，缺少分层精细化管理" },
    { name: "缺少情感连接", weight: 25, judgment: "客户对你有感情吗？离开会觉得可惜吗？", description: "缺少情感化运营，客户与门店关系脆弱" },
    { name: "竞品挖客严重", weight: 15, judgment: "竞品有没有专门针对你的客户做活动？", description: "竞品有针对性挖客，缺少客户防御机制" }
  ],
  solutionIds: ["sol_002","sol_011","sol_020"],
  todayTasks: [
    { task: "分析会员数据：会员占比、活跃率、消费差异", duration: "45分钟", purpose: "诊断会员体系" },
    { task: "设计3级客户分层标准和对应运营策略", duration: "1小时", purpose: "启动分层运营" },
    { task: "制定1个客户情感连接方案", duration: "30分钟", purpose: "增强情感黏性" }
  ],
  weekPlan: [
    { day: 1, title: "会员体系升级日", tasks: ["重新设计会员权益","增加会员专属服务和优惠","制定会员升级机制"] },
    { day: 2, title: "客户分层日", tasks: ["完成客户3级分层","制定各级别差异化运营策略","培训员工分层服务标准"] },
    { day: 3, title: "情感运营日", tasks: ["设计客户生日/纪念日关怀","建立客户喜好档案","增加人情味服务细节"] },
    { day: 4, title: "防御体系日", tasks: ["建立客户流失预警","制定竞品挖客应对方案","设置核心客户防流失措施"] },
    { day: 5, title: "社群激活日", tasks: ["制定社群运营日历","设计社群专属活动","激活沉睡社群成员"] },
    { day: 6, title: "口碑裂变日", tasks: ["设计老客推荐奖励","制作分享素材和工具","启动口碑裂变活动"] },
    { day: 7, title: "复盘日", tasks: ["统计会员活跃率变化","评估客户黏性指标","优化客户运营策略"] }
  ],
  longTermAdvice: [
    "深化会员运营，让会员真正感受到专属价值",
    "实施客户分层精细化管理，核心客户月度个性化关怀",
    "建立情感连接和防御机制，让客户不容易被挖走"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_004","tool_008"],
  priority: 9
},

// CUSTOMER_LOSS - 老店
{
  problemCode: "CUSTOMER_LOSS",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_c01","sym_c02","sym_c05"],
  judgment: "你的老店属于客户大规模流失型问题，核心原因是服务品质下滑和新鲜感缺失，需要品质回归和体验升级",
  severity: 76,
  causes: [
    { name: "服务品质下滑", weight: 35, judgment: "客户有没有反馈不如从前？品质标准还在执行吗？", description: "长期经营后品质管控松懈，客户体验下降" },
    { name: "新鲜感缺失", weight: 25, judgment: "最近一次给客户新鲜感是什么时候？", description: "长期不变导致客户审美疲劳，缺少回头动力" },
    { name: "老客户关怀缺失", weight: 25, judgment: "有多久没主动联系老客户了？有老客户回馈活动吗？", description: "对老客户缺少关怀和回馈，忠诚度降低" },
    { name: "新客替代不足", weight: 15, judgment: "流失的老客户有新客户补充吗？新客获取率多少？", description: "老客户流失严重，新客补充跟不上流失速度" }
  ],
  solutionIds: ["sol_002","sol_003","sol_020"],
  todayTasks: [
    { task: "整理近半年所有客户投诉和差评，找出品质问题", duration: "45分钟", purpose: "诊断品质滑坡" },
    { task: "制定核心产品品质回归标准", duration: "1小时", purpose: "启动品质回归" },
    { task: "设计1个老客户专属回馈方案", duration: "30分钟", purpose: "启动老客关怀" }
  ],
  weekPlan: [
    { day: 1, title: "品质审计日", tasks: ["全面检查出品和服务品质","对比标准找出偏差","制定品质回归清单"] },
    { day: 2, title: "品质回归日", tasks: ["恢复核心出品SOP","培训品质标准执行","设置品质检查岗"] },
    { day: 3, title: "体验升级日", tasks: ["设计1个让老客户眼前一亮的升级","推出怀旧+创新组合","增加服务仪式感"] },
    { day: 4, title: "老客回馈日", tasks: ["联系TOP30老客户","发送专属回馈福利","收集老客户建议"] },
    { day: 5, title: "新客获取日", tasks: ["启动线上引流活动","设计新客体验价","异业合作引流"] },
    { day: 6, title: "口碑修复日", tasks: ["回复所有线上差评","发布品质升级内容","邀请客户重新体验"] },
    { day: 7, title: "复盘日", tasks: ["统计品质回归效果","评估老客户回流情况","制定持续改善计划"] }
  ],
  longTermAdvice: [
    "坚持品质底线，宁可少做也不降低标准",
    "每半年做1次老客户回馈活动，让老客户感受到重视",
    "建立品质监控机制，防止品质在忙碌中悄悄下降"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_004","tool_008"],
  priority: 9
},

// STAFF_HARD - 新店
{
  problemCode: "STAFF_HARD",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_h01","sym_h02","sym_h04"],
  judgment: "你的新店属于团队建设初期型问题，核心原因是培训体系未建立和人员配置不合理，需要快速建立标准化培训",
  severity: 71,
  causes: [
    { name: "培训体系未建立", weight: 40, judgment: "新员工有标准培训流程吗？入职多久能独立工作？", description: "新店培训体系尚未建立，员工上手慢影响经营" },
    { name: "人员配置不合理", weight: 25, judgment: "现有人员数量和结构合理吗？有没有冗余或缺口？", description: "人员配置凭感觉，不够科学" },
    { name: "管理经验不足", weight: 20, judgment: "老板有管理经验吗？遇到人事问题怎么处理？", description: "新店老板管理经验不足，人员管理粗放" },
    { name: "薪资缺乏竞争力", weight: 15, judgment: "薪资水平在周边有竞争力吗？员工觉得公平吗？", description: "薪资缺乏市场竞争力，招不到也留不住好员工" }
  ],
  solutionIds: ["sol_011","sol_015","sol_018"],
  todayTasks: [
    { task: "制定核心岗位的7天培训计划", duration: "1小时", purpose: "启动培训体系" },
    { task: "调研周边3家竞品的薪资水平", duration: "45分钟", purpose: "校准薪资竞争力" },
    { task: "梳理各岗位人数和技能需求", duration: "30分钟", purpose: "优化人员配置" }
  ],
  weekPlan: [
    { day: 1, title: "培训体系日", tasks: ["制定7天培训计划","编写核心岗位SOP","设计培训考核标准"] },
    { day: 2, title: "薪资校准日", tasks: ["完成竞品薪资调研","调整薪资至市场水平","设计绩效提成方案"] },
    { day: 3, title: "岗位优化日", tasks: ["梳理岗位需求","调整人员配置","消除冗余和缺口"] },
    { day: 4, title: "流程标准日", tasks: ["制定核心工作流程SOP","设置工作检查点","培训执行标准"] },
    { day: 5, title: "师徒带教日", tasks: ["设计师徒带教机制","指定带教师傅","建立带教考核"] },
    { day: 6, title: "团队建设日", tasks: ["组织首次团队活动","建立每日晨会制度","营造团队氛围"] },
    { day: 7, title: "复盘日", tasks: ["评估培训效果","收集员工反馈","优化管理方式"] }
  ],
  longTermAdvice: [
    "尽快建立标准化培训体系，缩短新人上手周期",
    "确保薪资有市场竞争力，这是留人的基础",
    "从第一天就建立管理规范，避免后期纠正成本"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_008","tool_009"],
  priority: 9
},

// STAFF_HARD - 成长期
{
  problemCode: "STAFF_HARD",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_h01","sym_h03","sym_h05"],
  judgment: "你的成长期门店属于管理瓶颈型问题，核心原因是管理制度跟不上发展速度和核心人员依赖，需要管理升级",
  severity: 70,
  causes: [
    { name: "管理滞后于发展", weight: 35, judgment: "业务增长了但管理方式还是小作坊式吗？", description: "业务规模增长但管理方式滞后，产生各种管理问题" },
    { name: "核心人员依赖", weight: 30, judgment: "如果核心员工离职，门店还能正常运转吗？", description: "过度依赖少数核心人员，风险集中" },
    { name: "激励机制不匹配", weight: 20, judgment: "现有激励能留住优秀员工吗？有成长空间吗？", description: "激励机制跟不上员工期望，优秀员工流失" },
    { name: "沟通机制不畅", weight: 15, judgment: "员工愿意反馈问题吗？有定期沟通机制吗？", description: "缺少有效的沟通机制，问题积累到爆发" }
  ],
  solutionIds: ["sol_011","sol_015","sol_018"],
  todayTasks: [
    { task: "列出所有核心岗位和备岗情况", duration: "30分钟", purpose: "评估人员风险" },
    { task: "设计1个绩效激励升级方案", duration: "1小时", purpose: "提升激励性" },
    { task: "建立每周1次的员工沟通会制度", duration: "30分钟", purpose: "改善沟通机制" }
  ],
  weekPlan: [
    { day: 1, title: "管理升级日", tasks: ["梳理现有管理制度","识别管理短板","制定升级计划"] },
    { day: 2, title: "备岗计划日", tasks: ["为核心岗位指定AB角","制定知识沉淀文档","启动备岗培训"] },
    { day: 3, title: "激励改革日", tasks: ["设计底薪+绩效+分红结构","制定晋升通道和标准","公布激励改革方案"] },
    { day: 4, title: "沟通机制日", tasks: ["建立定期沟通制度","设置意见反馈渠道","开展首次员工座谈"] },
    { day: 5, title: "授权日", tasks: ["制定岗位授权清单","下放日常决策权","减少老板亲力亲为"] },
    { day: 6, title: "文化建设日", tasks: ["明确团队价值观","设计团队活动计划","建立正向激励机制"] },
    { day: 7, title: "复盘日", tasks: ["评估管理升级效果","收集员工反馈","持续优化管理制度"] }
  ],
  longTermAdvice: [
    "管理要跟上业务发展速度，不能让管理成为瓶颈",
    "培养核心岗位备岗，降低人员依赖风险",
    "建立有激励性的薪酬和晋升体系，留住优秀人才"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_008","tool_009"],
  priority: 9
},

// STAFF_HARD - 老店
{
  problemCode: "STAFF_HARD",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_h01","sym_h03","sym_h05"],
  judgment: "你的老店属于团队老化型问题，核心原因是管理僵化和缺乏新鲜血液，需要注入新活力和改革激励机制",
  severity: 72,
  causes: [
    { name: "管理方式僵化", weight: 35, judgment: "管理制度多久没更新了？是否还停留在创立初期？", description: "管理方式陈旧僵化，不适应现有团队和发展需要" },
    { name: "缺乏新鲜血液", weight: 25, judgment: "团队平均在职多久？有引进新人才吗？", description: "团队老化缺少新思维，创新和变革动力不足" },
    { name: "老员工倦怠", weight: 25, judgment: "老员工是否积极性下降？有倦怠现象吗？", description: "长期在岗的老员工产生职业倦怠，影响团队氛围" },
    { name: "晋升天花板", weight: 15, judgment: "老员工还有上升空间吗？有退出和接班机制吗？", description: "老员工遇到晋升天花板，看不到发展空间" }
  ],
  solutionIds: ["sol_011","sol_015","sol_018"],
  todayTasks: [
    { task: "与3位核心老员工深度沟通，了解期望和痛点", duration: "1.5小时", purpose: "了解团队现状" },
    { task: "设计1个老员工激活方案（新角色/新挑战/新激励）", duration: "1小时", purpose: "激活老员工" },
    { task: "制定1个新人引进计划", duration: "30分钟", purpose: "注入新鲜血液" }
  ],
  weekPlan: [
    { day: 1, title: "团队诊断日", tasks: ["完成团队能力和状态评估","识别倦怠和风险员工","制定激活和更新计划"] },
    { day: 2, title: "老员工激活日", tasks: ["设计老员工新角色或新挑战","制定专项激励方案","赋予更多授权和责任"] },
    { day: 3, title: "制度更新日", tasks: ["更新过时的管理制度","引入现代化管理工具","制定弹性管理方案"] },
    { day: 4, title: "新人引进日", tasks: ["启动新岗位招聘","设计新人融入计划","安排老带新组合"] },
    { day: 5, title: "晋升改革日", tasks: ["设计多通道晋升路径","制定合伙人/分红机制","打破晋升天花板"] },
    { day: 6, title: "团队重塑日", tasks: ["组织团队重塑活动","建立新老融合机制","营造积极竞争氛围"] },
    { day: 7, title: "复盘日", tasks: ["评估团队状态变化","收集员工反馈","持续优化团队建设"] }
  ],
  longTermAdvice: [
    "定期注入新鲜血液，保持团队活力和创新力",
    "为老员工设计新的成长通道，避免晋升天花板",
    "更新管理方式，让制度适应发展而非束缚发展"
  ],
  caseIds: ["case_005"],
  toolIds: ["tool_008","tool_009"],
  priority: 9
},

// MARKETING_HARD - 新店
{
  problemCode: "MARKETING_HARD",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_m01","sym_m03","sym_m04"],
  judgment: "你的新店属于营销起步型问题，核心原因是营销基础为零和不知从何下手，需要从0搭建线上营销基础",
  severity: 68,
  causes: [
    { name: "营销基础为零", weight: 40, judgment: "线上渠道有没有开店？线下有做过推广吗？", description: "营销从零开始，缺少任何线上线下的营销动作" },
    { name: "不知从何入手", weight: 25, judgment: "营销方式那么多，你觉得最该先做哪个？", description: "面对众多营销方式无从下手，不知道优先级" },
    { name: "缺少营销预算", weight: 20, judgment: "月营销预算多少？有没有分配营销资金？", description: "缺少专门的营销预算，所有投入靠试" },
    { name: "没有营销人才", weight: 15, judgment: "团队中有懂营销的人吗？谁负责营销？", description: "团队缺少营销能力，老板也不擅长" }
  ],
  solutionIds: ["sol_012","sol_013","sol_016"],
  todayTasks: [
    { task: "在大众点评认领门店并完善信息", duration: "1小时", purpose: "建立线上基础" },
    { task: "拍摄10张门店/产品/环境照片", duration: "45分钟", purpose: "准备营销素材" },
    { task: "制定每月2000元以内的营销预算分配", duration: "30分钟", purpose: "规划营销投入" }
  ],
  weekPlan: [
    { day: 1, title: "线上建店日", tasks: ["完善大众点评信息","开通抖音来客","注册小红书账号"] },
    { day: 2, title: "素材准备日", tasks: ["拍摄门店和产品照片","录制短视频素材","撰写店铺介绍文案"] },
    { day: 3, title: "首次发布日", tasks: ["发布3条大众点评笔记","发布1条抖音视频","发布1条小红书内容"] },
    { day: 4, title: "开业活动日", tasks: ["设计开业引流活动","制作活动海报","门店布置活动氛围"] },
    { day: 5, title: "地推启动日", tasks: ["周边500米派发传单","进入社区群推广","与周边商家互推"] },
    { day: 6, title: "好评引导日", tasks: ["引导到店客户写好评","设置好评小礼品","积累线上口碑"] },
    { day: 7, title: "复盘日", tasks: ["统计各渠道曝光数据","评估活动引流效果","制定下周营销计划"] }
  ],
  longTermAdvice: [
    "从最基础的线上铺设开始，先有存在感再求效果",
    "每月固定营销预算，哪怕很少也要坚持投入",
    "学习基础营销技能，或找一个靠谱的营销服务"
  ],
  caseIds: ["case_007"],
  toolIds: ["tool_003","tool_010"],
  priority: 9
},

// MARKETING_HARD - 成长期
{
  problemCode: "MARKETING_HARD",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_m02","sym_m04","sym_m06"],
  judgment: "你的成长期门店属于营销效率型问题，核心原因是营销投入产出比低和缺少系统化策略，需要优化营销ROI和建立系统",
  severity: 66,
  causes: [
    { name: "营销ROI低", weight: 35, judgment: "每花1块钱营销能带来多少营收？哪些渠道效果最好？", description: "营销有投入但产出不明确，缺少ROI衡量" },
    { name: "营销方式零散", weight: 25, judgment: "营销活动是零散的还是系统的？有年度营销计划吗？", description: "营销动作零散无系统，缺少整体规划" },
    { name: "缺少可复制渠道", weight: 25, judgment: "有没有一个稳定产出新客的获客渠道？", description: "缺少稳定的可复制获客渠道，获客全靠碰运气" },
    { name: "内容质量不稳定", weight: 15, judgment: "线上内容质量和频率稳定吗？", description: "内容发布不规律，质量参差不齐" }
  ],
  solutionIds: ["sol_012","sol_013","sol_016"],
  todayTasks: [
    { task: "计算各营销渠道的ROI，标记最有效和最低效的", duration: "45分钟", purpose: "优化营销投入" },
    { task: "制定月度营销日历（4周活动+内容规划）", duration: "1小时", purpose: "系统化营销" },
    { task: "选定1个主攻获客渠道，集中资源突破", duration: "30分钟", purpose: "建立可复制渠道" }
  ],
  weekPlan: [
    { day: 1, title: "ROI审计日", tasks: ["分析各渠道ROI","砍掉低效营销投入","聚焦高效渠道"] },
    { day: 2, title: "系统规划日", tasks: ["制定月度营销日历","设计4次活动节奏","明确内容发布频率"] },
    { day: 3, title: "渠道深耕日", tasks: ["选定1个主攻渠道","投入资源集中突破","建立稳定获客流程"] },
    { day: 4, title: "内容体系日", tasks: ["制定内容模板和标准","批量生产1周内容","建立内容素材库"] },
    { day: 5, title: "数据驱动日", tasks: ["设置营销数据追踪","建立周度数据复盘","用数据指导投入"] },
    { day: 6, title: "自动化日", tasks: ["设置自动回复和提醒","利用工具提升效率","减少重复手动操作"] },
    { day: 7, title: "复盘日", tasks: ["计算本周营销ROI","评估获客成本变化","优化营销系统"] }
  ],
  longTermAdvice: [
    "用数据驱动营销决策，只投入ROI为正的渠道",
    "建立系统化的营销日历，不再零散做活动",
    "深耕1-2个可复制的获客渠道，实现稳定获客"
  ],
  caseIds: ["case_007"],
  toolIds: ["tool_003","tool_010"],
  priority: 9
},

// MARKETING_HARD - 老店
{
  problemCode: "MARKETING_HARD",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_m02","sym_m05","sym_m06"],
  judgment: "你的老店属于营销转型型问题，核心原因是营销方式停留在传统模式和不懂新渠道玩法，需要拥抱新媒体和数字化营销",
  severity: 70,
  causes: [
    { name: "营销方式传统", weight: 35, judgment: "还在只靠发传单和口碑吗？有没有尝试过线上营销？", description: "营销方式停留在传统阶段，没有跟上数字化趋势" },
    { name: "不懂新渠道玩法", weight: 30, judgment: "抖音、小红书、直播这些新渠道会玩吗？", description: "对新渠道不熟悉，无法利用新媒体获客" },
    { name: "线上资产空白", weight: 20, judgment: "搜索你的店名能搜到什么？有线上内容沉淀吗？", description: "多年经营但线上内容资产几乎为零" },
    { name: "品牌老化影响传播", weight: 15, judgment: "品牌形象是否让人感觉过时？影响客户分享意愿吗？", description: "品牌形象老化，客户不愿意主动传播分享" }
  ],
  solutionIds: ["sol_012","sol_013","sol_017"],
  todayTasks: [
    { task: "搜索你的店名，看线上能找到什么信息", duration: "30分钟", purpose: "诊断线上资产" },
    { task: "在抖音上找3个同行业爆款视频学习", duration: "1小时", purpose: "学习新渠道玩法" },
    { task: "制定1个新媒体入门行动计划", duration: "45分钟", purpose: "规划营销转型" }
  ],
  weekPlan: [
    { day: 1, title: "线上资产日", tasks: ["完善所有线上平台信息","上传门店和产品内容","补充缺失的线上信息"] },
    { day: 2, title: "新渠道学习日", tasks: ["学习抖音基础运营","学习小红书种草方法","制定新渠道运营计划"] },
    { day: 3, title: "内容启动日", tasks: ["拍摄3条短视频","撰写2条种草笔记","发布首批新渠道内容"] },
    { day: 4, title: "直播尝试日", tasks: ["尝试1次直播（哪怕只是门店日常）","学习直播基本技巧","积累直播经验"] },
    { day: 5, title: "品牌焕新日", tasks: ["优化门店视觉呈现","更新宣传物料风格","让品牌看起来更时尚"] },
    { day: 6, title: "口碑激活日", tasks: ["邀请老客户写线上好评","发布老店故事和情怀内容","激活线上口碑传播"] },
    { day: 7, title: "复盘日", tasks: ["统计新渠道数据","评估品牌焕新反馈","制定持续运营计划"] }
  ],
  longTermAdvice: [
    "从传统营销向数字化营销转型，这是不可逆的趋势",
    "利用老店的积累做内容，老店的故事和口碑是最大资产",
    "不要追求完美，先在新渠道做起来再逐步优化"
  ],
  caseIds: ["case_007"],
  toolIds: ["tool_003","tool_010"],
  priority: 9
},

// COMPETITION - 新店
{
  problemCode: "COMPETITION",
  industry: "all",
  stage: "新店",
  symptomIds: ["sym_x01","sym_x04"],
  judgment: "你的新店属于竞争突围型问题，核心原因是品牌未建立和客户认知为零，需要在竞品包围中找到差异切入口",
  severity: 78,
  causes: [
    { name: "品牌认知为零", weight: 40, judgment: "新客户凭什么选你而不选老品牌？有给出选择理由吗？", description: "新店品牌认知为零，客户没有选择你的理由" },
    { name: "缺乏差异化切入口", weight: 30, judgment: "在竞品林立的市场中，你的差异化定位是什么？", description: "没有找到差异化的市场切入口，泯然众人" },
    { name: "资源劣势明显", weight: 20, judgment: "与老店/连锁相比，你的资源优势在哪？", description: "新店资源有限，无法与成熟竞品正面竞争" },
    { name: "客户信任未建立", weight: 10, judgment: "新客户对你有信任吗？怎么建立信任？", description: "新店缺少信任积累，客户更倾向选择老品牌" }
  ],
  solutionIds: ["sol_003","sol_012","sol_013"],
  todayTasks: [
    { task: "走访周边3家竞品，找出它们的弱点", duration: "2小时", purpose: "发现差异化机会" },
    { task: "确定1个你能做但竞品没做到的差异点", duration: "1小时", purpose: "确立竞争定位" },
    { task: "设计1个新客信任保障方案", duration: "30分钟", purpose: "降低信任门槛" }
  ],
  weekPlan: [
    { day: 1, title: "竞品分析日", tasks: ["完成3家竞品详细分析","找出竞品弱点和市场空白","确定差异化方向"] },
    { day: 2, title: "差异定位日", tasks: ["确定1个核心差异点","围绕差异点设计体验","制定差异化传播话术"] },
    { day: 3, title: "信任建设日", tasks: ["设计新客保障承诺","制定体验价方案","建立信任背书"] },
    { day: 4, title: "聚焦突破日", tasks: ["在差异化点集中发力","用极致体验打口碑","首批客户深度服务"] },
    { day: 5, title: "侧翼竞争日", tasks: ["避开竞品强势正面","选择竞品薄弱环节进攻","用灵活对抗规模"] },
    { day: 6, title: "口碑引爆日", tasks: ["引导首批客户好评","制造差异化话题","启动老客推荐"] },
    { day: 7, title: "复盘日", tasks: ["评估差异化认知度","统计新客选择原因","优化竞争策略"] }
  ],
  longTermAdvice: [
    "新店不要正面竞争，找竞品忽视的差异化切入口",
    "用极致体验在差异化点做出口碑，建立品牌认知",
    "快速建立客户信任，让新客户敢于选择你"
  ],
  caseIds: ["case_008"],
  toolIds: ["tool_001","tool_010"],
  priority: 9
},

// COMPETITION - 成长期
{
  problemCode: "COMPETITION",
  industry: "all",
  stage: "成长期",
  symptomIds: ["sym_x01","sym_x03","sym_x04"],
  judgment: "你的成长期门店属于竞争加剧型问题，核心原因是竞争壁垒薄弱和客户忠诚度不足，需要构建竞争壁垒和强化客户关系",
  severity: 74,
  causes: [
    { name: "竞争壁垒薄弱", weight: 35, judgment: "竞品容易复制你吗？你有难以复制的优势吗？", description: "缺少真正的竞争壁垒，竞品可以轻易模仿" },
    { name: "客户忠诚度不足", weight: 25, judgment: "客户是因为你独特还是因为方便？换一家也行吗？", description: "客户忠诚度不够，容易被竞品活动吸引走" },
    { name: "市场份额被蚕食", weight: 25, judgment: "新竞品进入后你的客户有减少吗？", description: "新竞品不断蚕食市场份额，增长被压制" },
    { name: "缺乏联盟防御", weight: 15, judgment: "有没有和其他商家形成联盟对抗竞品？", description: "单打独斗对抗竞品，缺少联合防御" }
  ],
  solutionIds: ["sol_008","sol_013","sol_017"],
  todayTasks: [
    { task: "列出3个你最核心但竞品难以复制的优势", duration: "45分钟", purpose: "识别竞争壁垒" },
    { task: "设计1个客户锁客方案（储值/会员/长期套餐）", duration: "1小时", purpose: "强化客户忠诚" },
    { task: "联系2家非竞争商家探讨联盟合作", duration: "30分钟", purpose: "启动联盟防御" }
  ],
  weekPlan: [
    { day: 1, title: "壁垒构建日", tasks: ["强化核心竞争优势","构建难以复制的壁垒","申请相关资质或独家"] },
    { day: 2, title: "锁客方案日", tasks: ["设计储值锁客方案","制定长期会员套餐","建立客户沉没成本"] },
    { day: 3, title: "客户深耕日", tasks: ["深化核心客户关系","提供竞品没有的专属服务","打造客户归属感"] },
    { day: 4, title: "差异化强化日", tasks: ["放大差异化优势传播","在差异化点做极致","让差异成为标签"] },
    { day: 5, title: "联盟组建日", tasks: ["联合3-5家非竞争商家","建立异业互推联盟","共享客户资源"] },
    { day: 6, title: "防御演练日", tasks: ["制定竞品促销应对方案","准备客户挽留预案","设置竞品动态监控"] },
    { day: 7, title: "复盘日", tasks: ["评估壁垒加固效果","分析客户忠诚度变化","优化竞争防御策略"] }
  ],
  longTermAdvice: [
    "持续构建竞争壁垒，让竞品越来越难以复制",
    "通过储值和深度关系锁住核心客户，降低流失风险",
    "建立商家联盟，用群体力量对抗竞品压力"
  ],
  caseIds: ["case_008"],
  toolIds: ["tool_004","tool_010"],
  priority: 9
},

// COMPETITION - 老店
{
  problemCode: "COMPETITION",
  industry: "all",
  stage: "老店",
  symptomIds: ["sym_x01","sym_x03","sym_x05"],
  judgment: "你的老店属于竞争防御型问题，核心原因是品牌创新不足和规模劣势明显，需要品牌升级和发挥本地优势",
  severity: 76,
  causes: [
    { name: "品牌创新不足", weight: 35, judgment: "老品牌有没有注入新活力？还是停留在过去？", description: "老品牌缺少创新活力，对新一代客户缺乏吸引力" },
    { name: "规模劣势", weight: 25, judgment: "面对连锁品牌的规模优势，你的优势在哪？", description: "连锁品牌的供应链和品牌优势越来越明显" },
    { name: "客户基础被蚕食", weight: 25, judgment: "老客户有没有被新品牌吸引走？比例多少？", description: "积累的客户基础被新品牌不断蚕食" },
    { name: "经营模式落后", weight: 15, judgment: "经营方式跟上了时代吗？还在用5年前的方法吗？", description: "经营模式落后，无法适应新的竞争环境" }
  ],
  solutionIds: ["sol_013","sol_017","sol_020"],
  todayTasks: [
    { task: "列出你的老店最大3个优势（口碑/信任/客户关系）", duration: "30分钟", purpose: "识别本地优势" },
    { task: "设计1个品牌升级方案（保留老味道+注入新元素）", duration: "1小时", purpose: "规划品牌升级" },
    { task: "制定1个客户回归计划", duration: "30分钟", purpose: "激活客户基础" }
  ],
  weekPlan: [
    { day: 1, title: "品牌升级日", tasks: ["制定品牌升级方案","保留经典+注入创新","设计焕新视觉形象"] },
    { day: 2, title: "本地优势日", tasks: ["强化本地深耕优势","打造社区信任品牌","发挥人情味服务"] },
    { day: 3, title: "客户回归日", tasks: ["联系流失客户","提供老客专属回归方案","激活沉睡客户基础"] },
    { day: 4, title: "差异化强化日", tasks: ["放大连锁做不到的优势","突出个性化服务","强化本地情感连接"] },
    { day: 5, title: "模式升级日", tasks: ["引入数字化经营工具","升级会员和营销体系","用新技术提升效率"] },
    { day: 6, title: "联盟对抗日", tasks: ["联合周边商家","建立本地商业联盟","集体对抗连锁品牌"] },
    { day: 7, title: "复盘日", tasks: ["评估品牌升级反馈","分析客户回归效果","优化竞争策略"] }
  ],
  longTermAdvice: [
    "老店要发挥本地信任和关系优势，这是连锁做不到的",
    "品牌升级但不丢根基，让老客户觉得焕然一新但仍熟悉",
    "用数字化工具弥补规模劣势，小而美也可以很强"
  ],
  caseIds: ["case_008"],
  toolIds: ["tool_004","tool_010"],
  priority: 9
},

// ---- 兜底通用路径（2条，industry=all，stage=all）----

// 通用综合诊断
{
  problemCode: "TRAFFIC_LOW",
  industry: "all",
  stage: "all",
  symptomIds: ["sym_t01","sym_r01","sym_p01"],
  judgment: "你的门店存在多维度经营问题，核心原因是经营系统化不足，需要从引流、转化、留存三个环节全面优化",
  severity: 65,
  causes: [
    { name: "引流能力不足", weight: 30, judgment: "月新增客户数多少？获客渠道有几个？", description: "缺少主动引流手段，新客户来源不稳定" },
    { name: "转化效率低", weight: 30, judgment: "进店客户转化率多少？客单价合理吗？", description: "客户进店后转化不充分，客单价和成交率偏低" },
    { name: "留存能力弱", weight: 25, judgment: "复购率和转介绍率各多少？", description: "客户留存能力弱，缺少系统化的客户经营" },
    { name: "经营缺少系统", weight: 15, judgment: "各项经营动作是系统规划还是随机进行？", description: "经营缺少系统规划，头疼医头脚疼医脚" }
  ],
  solutionIds: ["sol_001","sol_002","sol_009"],
  todayTasks: [
    { task: "计算3个核心指标：月新增客、客单价、复购率", duration: "45分钟", purpose: "明确经营现状" },
    { task: "找出3个指标中最薄弱的1个，确定优先改善", duration: "30分钟", purpose: "聚焦关键问题" },
    { task: "制定1个7天改善行动计划", duration: "45分钟", purpose: "启动系统改善" }
  ],
  weekPlan: [
    { day: 1, title: "全面诊断日", tasks: ["完成引流-转化-留存全链路分析","找出最薄弱环节","确定优先改善方向"] },
    { day: 2, title: "引流改善日", tasks: ["启动1个新引流动作","优化线上店铺信息","设计1个到店活动"] },
    { day: 3, title: "转化提升日", tasks: ["优化产品/服务组合","设计提升客单价方案","培训推荐话术"] },
    { day: 4, title: "留存启动日", tasks: ["建立客户联系方式留存","设计复购激励方案","启动客户回访"] },
    { day: 5, title: "系统搭建日", tasks: ["制定月度经营日历","设置关键指标追踪","建立每日经营复盘"] },
    { day: 6, title: "执行加速日", tasks: ["全面落实本周计划","检查各环节执行情况","解决执行中的问题"] },
    { day: 7, title: "复盘日", tasks: ["统计3个核心指标变化","评估各环节改善效果","制定下月系统优化计划"] }
  ],
  longTermAdvice: [
    "建立引流-转化-留存全链路经营系统，每个环节都有明确动作",
    "用数据驱动经营决策，关键指标每周追踪",
    "系统化经营取代随机经营，持续优化而非临时应对"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_005"],
  priority: 1
},

// 通用利润突围
{
  problemCode: "PROFIT_LOW",
  industry: "all",
  stage: "all",
  symptomIds: ["sym_p01","sym_p05","sym_r01"],
  judgment: "你的门店存在营收与利润双重压力，核心原因是开源不足和节流不力，需要同时推进增收和降本",
  severity: 70,
  causes: [
    { name: "增收渠道单一", weight: 30, judgment: "收入来源有几个？有没有开拓新收入渠道？", description: "收入来源单一，缺少增收渠道" },
    { name: "成本管控粗放", weight: 30, judgment: "各项成本有目标值吗？超支有预警吗？", description: "成本管控粗放，缺少精细化管理" },
    { name: "产品结构低效", weight: 25, judgment: "高毛利产品占比多少？有优化产品结构吗？", description: "产品结构效率低，低毛利占比过高" },
    { name: "经营效率不足", weight: 15, judgment: "坪效和人效达标吗？有提升空间吗？", description: "经营效率不足，资源和人力利用不充分" }
  ],
  solutionIds: ["sol_004","sol_009","sol_014"],
  todayTasks: [
    { task: "计算营收-成本=利润的详细拆解表", duration: "45分钟", purpose: "明确利润结构" },
    { task: "标记3个最有可能降本的成本项", duration: "30分钟", purpose: "找到节流方向" },
    { task: "列出2个增收机会并评估可行性", duration: "45分钟", purpose: "找到开源方向" }
  ],
  weekPlan: [
    { day: 1, title: "利润拆解日", tasks: ["完成利润结构详细分析","找出利润漏水点","制定增收降本双线计划"] },
    { day: 2, title: "增收行动日", tasks: ["启动1个增收渠道","设计提升客单价方案","优化产品组合"] },
    { day: 3, title: "降本行动日", tasks: ["削减3项非必要支出","优化采购降低成本","减少浪费和损耗"] },
    { day: 4, title: "结构优化日", tasks: ["调整产品毛利结构","增加高毛利产品占比","设计利润款组合"] },
    { day: 5, title: "效率提升日", tasks: ["提升坪效和人效","优化排班和流程","用更少资源做更多事"] },
    { day: 6, title: "机制建设日", tasks: ["建立成本管控机制","设置利润预警线","培训全员利润意识"] },
    { day: 7, title: "复盘日", tasks: ["计算本周利润改善","评估增收降本效果","制定下月利润目标"] }
  ],
  longTermAdvice: [
    "增收和降本双线并行，不要只做一头",
    "建立精细化成本管控，每项成本都有目标值",
    "优化产品结构提升整体毛利，这是最有效的利润提升方式"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 1
},

// ---- 补充路径：PRODUCT_SLOW 产品卖不动（行业×阶段组合）----

// path_51: PRODUCT_SLOW - 餐饮 - 新店
{
  _id: "path_51",
  problemCode: "PRODUCT_SLOW",
  industry: "餐饮",
  stage: "新店",
  symptomIds: ["sym_s01","sym_s02","sym_s04"],
  judgment: "你的新开餐饮门店菜品尚未经市场验证，缺乏主打爆款导致顾客选择困难",
  severity: 65,
  causes: [
    { name: "菜品未经市场验证", weight: 40, judgment: "开业前做过菜品测试吗？哪些菜是顾客必点的？", description: "新店菜品凭经验设计，未在目标客群中测试，导致核心菜品不受欢迎" },
    { name: "缺少招牌爆款", weight: 30, judgment: "顾客提到你的店会想到哪道菜？有记忆点吗？", description: "没有打造出让人记住的招牌菜，顾客无法形成品类认知" },
    { name: "菜品数量过多", weight: 20, judgment: "菜单上有多少道菜？新店是否贪多嚼不烂？", description: "新店菜品过多分散了出品质量，备料压力大损耗高" },
    { name: "出品不稳定", weight: 10, judgment: "同一道菜每次口味一致吗？新员工出品达标吗？", description: "新团队配合不熟练，出品标准不统一，影响复购意愿" }
  ],
  solutionIds: ["sol_007","sol_021","sol_022"],
  todayTasks: [
    { task: "统计开业以来各菜品销售数据，标记畅销与滞销品", duration: "45分钟", purpose: "识别菜品表现" },
    { task: "确定1-2道招牌菜并制定标准化SOP", duration: "1小时", purpose: "打造记忆点" },
    { task: "精简菜单，将菜品数控制在合理范围", duration: "30分钟", purpose: "聚焦出品" }
  ],
  weekPlan: [
    { day: 1, title: "菜品数据盘点日", tasks: ["统计各菜品销量和毛利","标记畅销/滞销/潜力菜品","收集顾客点单偏好反馈"] },
    { day: 2, title: "招牌菜打造日", tasks: ["确定1-2道招牌菜","制定招牌菜标准SOP","设计招牌菜呈现方式"] },
    { day: 3, title: "菜单精简日", tasks: ["淘汰后30%滞销菜品","优化菜单排版突出招牌菜","控制备料种类降低损耗"] },
    { day: 4, title: "出品标准化日", tasks: ["制定核心菜品出餐SOP","培训厨师团队标准操作","建立出品抽检机制"] },
    { day: 5, title: "招牌菜推广日", tasks: ["制作招牌菜宣传物料","线上发布招牌菜内容","员工推荐招牌菜话术培训"] },
    { day: 6, title: "新品测试日", tasks: ["设计1-2道潜力新菜品","邀请老顾客免费试吃","收集试吃反馈并调整"] },
    { day: 7, title: "复盘日", tasks: ["统计招牌菜销售占比","分析菜品结构调整效果","制定下周优化方向"] }
  ],
  longTermAdvice: [
    "坚持'少而精'菜品策略，新店菜单控制在25-35道之间",
    "每季度淘汰末位10%菜品，引入1-2道新品保持新鲜感",
    "持续强化招牌菜认知，让顾客提到品类就想到你的店"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_005","tool_009"],
  priority: 8
},

// path_52: PRODUCT_SLOW - 餐饮 - 成长期
{
  _id: "path_52",
  problemCode: "PRODUCT_SLOW",
  industry: "餐饮",
  stage: "成长期",
  symptomIds: ["sym_s01","sym_s02","sym_s05"],
  judgment: "你的餐饮门店核心菜品动销放缓，新品推广不力导致增长停滞",
  severity: 70,
  causes: [
    { name: "核心菜品老化", weight: 35, judgment: "招牌菜多久没更新了？顾客是否吃腻了？", description: "核心菜品长期未变，顾客消费疲劳，点单频次下降" },
    { name: "新品推广不力", weight: 30, judgment: "新品上市有配套推广吗？员工有主动推荐吗？", description: "新品缺少推广配套，员工不推荐，顾客不知道" },
    { name: "菜品结构失衡", weight: 20, judgment: "引流款、利润款、形象款的比例合理吗？", description: "菜品缺少角色分工，引流款不引流、利润款不赚钱" },
    { name: "口味同质化", weight: 15, judgment: "你的口味和周边竞品有差异吗？顾客能区分吗？", description: "菜品口味与竞品无明显差异，缺乏独特味型记忆" }
  ],
  solutionIds: ["sol_007","sol_022","sol_028"],
  todayTasks: [
    { task: "分析各菜品近3个月销量趋势，识别下滑菜品", duration: "45分钟", purpose: "诊断动销问题" },
    { task: "设计1道特色新品并制定推广计划", duration: "1小时", purpose: "注入新鲜感" },
    { task: "按引流款/利润款/形象款重新分类菜品", duration: "30分钟", purpose: "优化菜品结构" }
  ],
  weekPlan: [
    { day: 1, title: "动销诊断日", tasks: ["完成菜品销量排名和趋势分析","标记下滑菜品和稳定菜品","分析下滑原因（口味/价格/竞争）"] },
    { day: 2, title: "新品研发日", tasks: ["确定新品方向和定位","完成新品试制和口味调整","制定新品定价和推广方案"] },
    { day: 3, title: "结构优化日", tasks: ["按角色重新分类菜品","调整引流款定价策略","设计利润款组合套餐"] },
    { day: 4, title: "新品上市日", tasks: ["新品正式上线","员工培训新品推荐话术","线上发布新品内容"] },
    { day: 5, title: "口味差异化日", tasks: ["强化1-2道独特口味菜品","制作口味故事和来源介绍","在菜单和物料上突出独特性"] },
    { day: 6, title: "推广加码日", tasks: ["设计新品限时优惠","社群推送新品活动","引导顾客点评新品"] },
    { day: 7, title: "复盘日", tasks: ["统计新品销量和复购率","分析菜品结构优化效果","调整下周推广力度"] }
  ],
  longTermAdvice: [
    "建立季度菜品更新机制，每季淘汰2-3道末位品、引入1-2道新品",
    "给每道菜品明确角色定位：引流款占20%、利润款占50%、形象款占10%、填位款占20%",
    "打造独特味型标签，让顾客形成'只有你家能吃到这个味'的认知"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_005","tool_009"],
  priority: 8
},

// path_53: PRODUCT_SLOW - 餐饮 - 老店
{
  _id: "path_53",
  problemCode: "PRODUCT_SLOW",
  industry: "餐饮",
  stage: "老店",
  symptomIds: ["sym_s01","sym_s04","sym_s05"],
  judgment: "你的老店菜品老化严重、顾客审美疲劳，核心品类复购率持续走低",
  severity: 75,
  causes: [
    { name: "菜品多年未更新", weight: 35, judgment: "最近一次菜单大更新是什么时候？超过1年了吗？", description: "菜单长期固化，老顾客吃遍后失去新鲜感，新顾客没有惊喜" },
    { name: "复购率持续下降", weight: 25, judgment: "主推菜品的复购率是多少？趋势如何？", description: "核心菜品复购率走低，顾客尝鲜后不再回头" },
    { name: "跟不上口味潮流", weight: 25, judgment: "你关注当下的餐饮消费趋势吗？有跟上新口味新吃法吗？", description: "口味和呈现方式落后于潮流，年轻客群不买账" },
    { name: "成本上涨挤压利润", weight: 15, judgment: "食材成本上涨后菜品有调整吗？还是硬扛？", description: "食材涨价但菜品未调整，利润被持续挤压" }
  ],
  solutionIds: ["sol_007","sol_021","sol_028"],
  todayTasks: [
    { task: "统计各菜品复购率和销量趋势，标记需要淘汰的菜品", duration: "45分钟", purpose: "诊断老化程度" },
    { task: "调研当下同品类热门新菜趋势", duration: "30分钟", purpose: "把握潮流方向" },
    { task: "制定菜单焕新计划，分批更新", duration: "1小时", purpose: "规划菜品升级" }
  ],
  weekPlan: [
    { day: 1, title: "全面诊断日", tasks: ["完成菜品复购率分析","标记淘汰候补和新品方向","调研3家竞品菜单变化"] },
    { day: 2, title: "潮流对标日", tasks: ["研究同品类热门新菜趋势","确定3-5道新品方向","评估现有设备能否支持新品"] },
    { day: 3, title: "新品研发日", tasks: ["试制3道候选新品","内部品鉴和口味调整","确定首批上新菜品"] },
    { day: 4, title: "菜单焕新日", tasks: ["淘汰3道末位老品","上线2-3道新品","重新设计菜单版面突出新品"] },
    { day: 5, title: "新品推广日", tasks: ["设计新品尝鲜价","员工全员推荐新品","社群和线上发布新品内容"] },
    { day: 6, title: "成本优化日", tasks: ["调整受食材涨价影响的菜品","优化部分菜品的食材替代","重新核算菜品毛利"] },
    { day: 7, title: "复盘日", tasks: ["统计新品销量和老品变化","分析顾客反馈","制定下批菜品更新计划"] }
  ],
  longTermAdvice: [
    "建立季度菜单更新节奏，每次淘汰10%末位品、上新2-3道",
    "紧跟口味潮流但保持核心味型不变，创新不忘本",
    "用数据驱动菜品决策，每月review销量、毛利和复购率"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_005","tool_009"],
  priority: 8
},

// path_54: PRODUCT_SLOW - 零售 - 新店
{
  _id: "path_54",
  problemCode: "PRODUCT_SLOW",
  industry: "零售",
  stage: "新店",
  symptomIds: ["sym_s02","sym_s03","sym_s06"],
  judgment: "你的新开零售门店选品未经验证，产品结构单一且库存周转极慢",
  severity: 68,
  causes: [
    { name: "选品凭感觉", weight: 35, judgment: "首批进货有数据支撑吗？还是凭个人喜好？", description: "新店选品缺乏市场数据支撑，凭经验进货导致品类不受欢迎" },
    { name: "产品结构单一", weight: 30, judgment: "门店SKU覆盖了几个品类？有引流款和利润款吗？", description: "SKU少且品类单一，缺少引流款和利润款的分层设计" },
    { name: "库存周转慢", weight: 20, judgment: "首批进货多久能卖完？库存周转天数是多少？", description: "首批进货量偏大且动销慢，资金大量积压在库存中" },
    { name: "缺少试销机制", weight: 15, judgment: "有没有小批量试销再决定是否大批量进货？", description: "没有试销机制，新品直接大批量进货风险高" }
  ],
  solutionIds: ["sol_008","sol_021","sol_022"],
  todayTasks: [
    { task: "盘点所有SKU的销售数据，标记滞销品", duration: "45分钟", purpose: "诊断选品问题" },
    { task: "设计引流款+利润款+搭配款的产品组合", duration: "1小时", purpose: "优化产品结构" },
    { task: "制定滞销品清仓和试销品引入计划", duration: "30分钟", purpose: "调整库存结构" }
  ],
  weekPlan: [
    { day: 1, title: "选品审计日", tasks: ["完成全SKU销量排名","标记畅销/滞销/潜力品","分析滞销原因"] },
    { day: 2, title: "结构优化日", tasks: ["按引流/利润/搭配重新分类","确定各角色产品比例","设计产品组合方案"] },
    { day: 3, title: "清仓行动日", tasks: ["制定滞销品清仓方案","启动清仓促销活动","释放库存和资金空间"] },
    { day: 4, title: "新品试销日", tasks: ["引入3-5款潜力新品小量试销","设置试销追踪指标","员工新品推荐培训"] },
    { day: 5, title: "陈列优化日", tasks: ["按产品角色优化陈列","爆款端架突出展示","搭配品关联陈列"] },
    { day: 6, title: "数据追踪日", tasks: ["追踪新品试销数据","追踪清仓进度","记录顾客反馈"] },
    { day: 7, title: "复盘日", tasks: ["评估选品调整效果","确定正式引进和淘汰清单","制定下月选品计划"] }
  ],
  longTermAdvice: [
    "建立试销机制：新品先少量进货测试2周，数据好再大批量引进",
    "保持产品结构合理：引流款20%、利润款50%、搭配款30%",
    "每月盘点库存周转，滞销超60天的果断清仓"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_55: PRODUCT_SLOW - 零售 - 成长期
{
  _id: "path_55",
  problemCode: "PRODUCT_SLOW",
  industry: "零售",
  stage: "成长期",
  symptomIds: ["sym_s01","sym_s03","sym_s06"],
  judgment: "你的成长期零售门店爆款后劲不足，品类扩展不当导致整体动销放缓",
  severity: 72,
  causes: [
    { name: "爆款生命周期衰退", weight: 30, judgment: "曾经的主力爆款销量还在增长吗？是否已过巅峰？", description: "主力爆款进入衰退期，销量下滑但未找到新爆款替代" },
    { name: "品类扩展不当", weight: 25, judgment: "新增品类是否与原有客群匹配？有蚕食效应吗？", description: "为增长而扩张品类，但新品类与客群不匹配，分散了经营焦点" },
    { name: "陈列空间浪费", weight: 25, judgment: "滞销品占了多少陈列面？黄金位置给了畅销品吗？", description: "滞销品占据大量陈列空间，畅销品反而展示不足" },
    { name: "供应链响应慢", weight: 20, judgment: "畅销品补货周期多长？有缺货情况吗？", description: "畅销品经常缺货，补货周期长，错失销售机会" }
  ],
  solutionIds: ["sol_008","sol_022","sol_028"],
  todayTasks: [
    { task: "分析各品类销量占比和增长趋势", duration: "45分钟", purpose: "诊断品类健康度" },
    { task: "调整陈列：畅销品扩面、滞销品缩面", duration: "1小时", purpose: "优化陈列产出" },
    { task: "联系供应商缩短畅销品补货周期", duration: "30分钟", purpose: "减少缺货损失" }
  ],
  weekPlan: [
    { day: 1, title: "品类诊断日", tasks: ["完成品类销售占比分析","识别增长品类和衰退品类","评估品类间蚕食效应"] },
    { day: 2, title: "爆款焕新日", tasks: ["设计爆款升级或延伸版本","测试新爆款候选产品","规划爆款迭代路线图"] },
    { day: 3, title: "陈列重构日", tasks: ["按销售贡献重新分配陈列面","黄金位给Top20%畅销品","滞销品集中到清仓区"] },
    { day: 4, title: "供应链优化日", tasks: ["与供应商协商缩短补货周期","建立畅销品安全库存线","设置缺货预警机制"] },
    { day: 5, title: "品类精简日", tasks: ["淘汰贡献率最低的5%品类","释放空间给增长品类","重新规划品类布局"] },
    { day: 6, title: "新品培育日", tasks: ["引入2-3款新爆款候选","小量试销并追踪数据","员工新品知识和话术培训"] },
    { day: 7, title: "复盘日", tasks: ["统计品类调整后动销变化","分析缺货率和补货效率","制定下周优化重点"] }
  ],
  longTermAdvice: [
    "建立爆款生命周期管理，在旧爆款衰退前培育新爆款",
    "保持品类聚焦，每个品类都要达到最低销售贡献率门槛",
    "优化供应链响应速度，畅销品缺货率控制在5%以内"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_56: PRODUCT_SLOW - 零售 - 老店
{
  _id: "path_56",
  problemCode: "PRODUCT_SLOW",
  industry: "零售",
  stage: "老店",
  symptomIds: ["sym_s01","sym_s03","sym_s04"],
  judgment: "你的老店产品线固化严重，库存积压与缺货并存，急需汰换刷新产品池",
  severity: 74,
  causes: [
    { name: "产品线长期固化", weight: 30, judgment: "多久没做过产品线全面review了？末位淘汰执行了吗？", description: "产品线长期不变，没有末位淘汰机制，滞销品长期占位" },
    { name: "库存积压严重", weight: 25, judgment: "库龄超过90天的商品占比多少？有多少死库存？", description: "大量商品库龄过长，资金被死库存锁定，无法投入新品" },
    { name: "缺货与积压并存", weight: 25, judgment: "畅销品经常缺货而滞销品堆满仓库？", description: "库存结构严重失衡，畅销品缺货、滞销品积压" },
    { name: "选品信息滞后", weight: 20, judgment: "你的选品信息来源是什么？还跟上市场趋势吗？", description: "选品依赖过时的经验和渠道，不了解当下市场新品趋势" }
  ],
  solutionIds: ["sol_008","sol_021","sol_028"],
  todayTasks: [
    { task: "盘点全SKU库龄，标记90天以上滞销品", duration: "1小时", purpose: "摸清库存家底" },
    { task: "统计近30天缺货次数和影响销售额", duration: "30分钟", purpose: "量化缺货损失" },
    { task: "制定分批清仓计划（本周清仓一批）", duration: "30分钟", purpose: "释放库存资金" }
  ],
  weekPlan: [
    { day: 1, title: "库存审计日", tasks: ["完成全SKU库龄分析","标记滞销/死库存/畅销缺货品","计算库存健康指数"] },
    { day: 2, title: "清仓启动日", tasks: ["制定分批清仓方案","启动首批清仓促销","设置清仓进度追踪"] },
    { day: 3, title: "缺货治理日", tasks: ["增加畅销品安全库存量","缩短畅销品补货周期","建立缺货实时预警"] },
    { day: 4, title: "选品更新日", tasks: ["调研市场新品趋势","确定引进新品清单","小批量试销引入"] },
    { day: 5, title: "陈列焕新日", tasks: ["清仓区集中处理滞销品","畅销品扩面陈列","新品设置试销专位"] },
    { day: 6, title: "机制建设日", tasks: ["建立月度末位淘汰机制","设置库龄预警线90天","制定新品试销流程"] },
    { day: 7, title: "复盘日", tasks: ["统计清仓回笼资金","分析缺货改善情况","制定下月产品线更新计划"] }
  ],
  longTermAdvice: [
    "严格执行月度末位淘汰，销售排名后10%且库龄超60天的果断清退",
    "建立库存健康度指标，库龄超90天占比控制在5%以内",
    "保持选品渠道更新，每季度参加行业展会或对接新供应商"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_57: PRODUCT_SLOW - 服务业 - 新店
{
  _id: "path_57",
  problemCode: "PRODUCT_SLOW",
  industry: "服务业",
  stage: "新店",
  symptomIds: ["sym_s02","sym_s05","sym_s06"],
  judgment: "你的新开服务门店服务项目设计未验证，缺乏爆款项目吸引首单客户",
  severity: 66,
  causes: [
    { name: "服务项目未验证", weight: 35, judgment: "开业前有请目标客户试体验吗？反馈如何？", description: "服务项目凭经验设计，未在目标客群中验证需求和定价" },
    { name: "缺少爆款项目", weight: 30, judgment: "哪个项目是客户必选的？有让人一口就能记住的服务吗？", description: "没有打造出高认知度的爆款服务，客户选择犹豫" },
    { name: "服务定价门槛高", weight: 20, judgment: "首单价格是否让新客户犹豫？有体验价吗？", description: "服务项目定价偏高，缺少低门槛的体验入口" },
    { name: "效果展示不足", weight: 15, judgment: "新客户能看到服务效果案例吗？", description: "缺少服务效果的可视化展示，新客户无法评估价值" }
  ],
  solutionIds: ["sol_006","sol_022","sol_028"],
  todayTasks: [
    { task: "统计各服务项目首月销售数据，找出受欢迎项目", duration: "45分钟", purpose: "识别潜力项目" },
    { task: "设计1个体验价爆款项目（正常价3-5折）", duration: "30分钟", purpose: "降低首单门槛" },
    { task: "整理3个服务前后对比案例并展示", duration: "1小时", purpose: "可视化服务效果" }
  ],
  weekPlan: [
    { day: 1, title: "项目诊断日", tasks: ["分析各项目销量和客户反馈","标记受欢迎/冷门项目","收集客户选择偏好"] },
    { day: 2, title: "爆款打造日", tasks: ["确定1个爆款服务项目","制定体验价策略","设计爆款项目展示方案"] },
    { day: 3, title: "效果展示日", tasks: ["拍摄服务前后对比案例","制作效果展示墙/册","线上发布案例内容"] },
    { day: 4, title: "定价优化日", tasks: ["设置体验价入口","设计阶梯定价引导升级","员工推荐话术培训"] },
    { day: 5, title: "项目精简日", tasks: ["暂停冷门项目减少资源分散","聚焦2-3个核心项目","优化服务流程提升效率"] },
    { day: 6, title: "推广启动日", tasks: ["线上发布爆款项目内容","社群推广体验价","引导首批体验客户"] },
    { day: 7, title: "复盘日", tasks: ["统计爆款项目到店转化","分析体验客户满意度","调整下周推广策略"] }
  ],
  longTermAdvice: [
    "新店聚焦2-3个核心服务项目打透，不要贪多",
    "持续积累服务案例，每周至少新增2个线上展示",
    "体验价→正价→升级套餐的递进设计，拉长客户价值链"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_005"],
  priority: 8
},

// path_58: PRODUCT_SLOW - 服务业 - 成长期
{
  _id: "path_58",
  problemCode: "PRODUCT_SLOW",
  industry: "服务业",
  stage: "成长期",
  symptomIds: ["sym_s01","sym_s05","sym_s06"],
  judgment: "你的成长期服务门店核心项目增长遇瓶颈，缺少项目升级路径限制客单提升",
  severity: 71,
  causes: [
    { name: "核心项目增长见顶", weight: 30, judgment: "主力项目订单量还在增长吗？还是已趋于稳定？", description: "主力项目市场渗透到一定程度后增长放缓，需要新增长点" },
    { name: "缺少升级路径", weight: 30, judgment: "客户消费基础项目后有升级引导吗？", description: "服务项目之间缺少递进关系，客户消费基础项目后没有升级路径" },
    { name: "新项目孵化慢", weight: 20, judgment: "从构思到上线一个新项目要多久？", description: "新项目从设计到上线周期长，跟不上市场需求变化" },
    { name: "时段产能不均", weight: 20, judgment: "高峰时段能全部排满吗？闲时有浪费吗？", description: "服务产能时段分布不均，高峰排不下闲时排不满" }
  ],
  solutionIds: ["sol_006","sol_021","sol_028"],
  todayTasks: [
    { task: "分析各项目订单量趋势和客单贡献", duration: "45分钟", purpose: "诊断增长瓶颈" },
    { task: "设计基础→进阶→尊享的项目升级路径", duration: "1小时", purpose: "打通升级链路" },
    { task: "制定闲时特惠方案填充产能空档", duration: "30分钟", purpose: "提升时段利用率" }
  ],
  weekPlan: [
    { day: 1, title: "项目审计日", tasks: ["完成各项目增长趋势分析","识别增长见顶和潜力项目","计算各项目客单和利润贡献"] },
    { day: 2, title: "升级路径设计日", tasks: ["设计三级服务阶梯","制定升级内容和定价","编写升级推荐话术"] },
    { day: 3, title: "新项目孵化日", tasks: ["确定1-2个新项目方向","快速试制最小化服务版本","邀请老客户试体验"] },
    { day: 4, title: "闲时运营日", tasks: ["设计闲时特惠方案","社群发布闲时优惠","预约系统设置闲时折扣"] },
    { day: 5, title: "培训日", tasks: ["培训升级推荐话术","培训新项目操作流程","培训闲时优惠引导"] },
    { day: 6, title: "上线日", tasks: ["升级路径正式上线","新项目试运营启动","闲时优惠开始执行"] },
    { day: 7, title: "复盘日", tasks: ["统计升级转化率","分析新项目试运营数据","评估闲时利用率变化"] }
  ],
  longTermAdvice: [
    "构建基础→进阶→尊享三级服务体系，让每级客户都有升级空间",
    "新项目采用最小化可行性测试，2周验证再决定是否正式上线",
    "闲时利用率提升到70%以上，配合高峰时段形成全时段营收"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_005"],
  priority: 8
},

// path_59: PRODUCT_SLOW - 服务业 - 老店
{
  _id: "path_59",
  problemCode: "PRODUCT_SLOW",
  industry: "服务业",
  stage: "老店",
  symptomIds: ["sym_s01","sym_s04","sym_s05"],
  judgment: "你的老店服务项目严重老化，客户审美疲劳且复购率持续走低",
  severity: 76,
  causes: [
    { name: "服务项目老化", weight: 35, judgment: "核心服务项目多久没升级了？客户反馈是否缺乏新意？", description: "服务内容和形式长期未更新，老客户失去新鲜感" },
    { name: "复购率走低", weight: 25, judgment: "老客户的消费频次在下降吗？多少月未消费算流失？", description: "老客户消费频次下降，3个月未回头比例增加" },
    { name: "跟不上行业趋势", weight: 25, judgment: "同行在推什么新服务？你有了解吗？", description: "行业服务形式和理念在升级，但门店没有跟上" },
    { name: "技术手法陈旧", weight: 15, judgment: "员工的手法和技能有定期培训更新吗？", description: "员工技能没有持续培训更新，服务质量与同行拉开差距" }
  ],
  solutionIds: ["sol_006","sol_021","sol_028"],
  todayTasks: [
    { task: "统计各项目复购率和客户消费频次变化", duration: "45分钟", purpose: "量化老化程度" },
    { task: "调研同行业3家竞品的新服务项目", duration: "30分钟", purpose: "对标行业趋势" },
    { task: "制定服务焕新计划：升级2个老项目+引入1个新项目", duration: "1小时", purpose: "规划服务更新" }
  ],
  weekPlan: [
    { day: 1, title: "全面诊断日", tasks: ["完成复购率和消费频次分析","标记高流失风险客户","调研竞品服务更新"] },
    { day: 2, title: "服务升级设计日", tasks: ["确定2个需升级的老项目","设计升级内容和形式","制定升级定价策略"] },
    { day: 3, title: "新项目研发日", tasks: ["确定1个新服务项目方向","完成新项目流程设计","内部试运行和调整"] },
    { day: 4, title: "技能培训日", tasks: ["组织员工学习升级后服务标准","培训新项目操作流程","考核和认证上岗"] },
    { day: 5, title: "焕新上线日", tasks: ["升级项目正式推出","新项目试运营","制作焕新宣传内容"] },
    { day: 6, title: "老客激活日", tasks: ["定向通知老客户服务升级","设计老客专享体验优惠","引导老客体验新项目"] },
    { day: 7, title: "复盘日", tasks: ["统计升级和新项目数据","分析老客回流情况","制定下阶段焕新计划"] }
  ],
  longTermAdvice: [
    "建立半年度服务焕新机制，每次升级2-3个项目、引入1个新项目",
    "持续投资员工技能培训，每季度至少1次专业技能提升培训",
    "用客户消费频次数据驱动服务决策，频次下降是服务老化的早期信号"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_009"],
  priority: 8
},

// path_60: PRODUCT_SLOW - all - all
{
  _id: "path_60",
  problemCode: "PRODUCT_SLOW",
  industry: "all",
  stage: "all",
  symptomIds: ["sym_s01","sym_s04","sym_s06"],
  judgment: "你的门店产品动销缓慢，核心问题是产品缺乏竞争力和营销推广不足",
  severity: 70,
  causes: [
    { name: "产品缺乏竞争力", weight: 35, judgment: "你的产品与竞品相比有突出优势吗？客户选择你的理由是什么？", description: "产品在品质、价格、特色上缺乏明显优势，客户没有必须选择的理由" },
    { name: "推广力度不足", weight: 25, judgment: "产品有配套推广吗？客户知道你的好产品吗？", description: "好产品缺少推广，酒香也怕巷子深" },
    { name: "定价策略不当", weight: 20, judgment: "产品定价与目标客户支付意愿匹配吗？", description: "定价与客户心理价位不匹配，过高吓跑客户、过低损害价值感" },
    { name: "缺少产品迭代", weight: 20, judgment: "产品多久没更新了？有根据客户反馈改进吗？", description: "产品长期不迭代，跟不上客户需求变化" }
  ],
  solutionIds: ["sol_007","sol_022","sol_028"],
  todayTasks: [
    { task: "列出所有产品并标注销量、毛利和竞争力评分", duration: "1小时", purpose: "全面评估产品" },
    { task: "选出1个最有潜力的产品制定推广方案", duration: "45分钟", purpose: "打造突破口" },
    { task: "收集最近30天客户对产品的反馈意见", duration: "30分钟", purpose: "发现改进方向" }
  ],
  weekPlan: [
    { day: 1, title: "产品审计日", tasks: ["完成全产品销量毛利排名","评估每个产品竞争力","标记核心问题和机会点"] },
    { day: 2, title: "竞争力提升日", tasks: ["确定产品差异化方向","制定品质或特色提升方案","设计产品独特卖点"] },
    { day: 3, title: "定价优化日", tasks: ["分析目标客户支付意愿","调整定价策略","设计价格测试方案"] },
    { day: 4, title: "推广启动日", tasks: ["制作产品推广内容","线上多渠道发布","设计产品体验活动"] },
    { day: 5, title: "迭代改进日", tasks: ["根据客户反馈优化产品","测试改进方案","快速迭代上线"] },
    { day: 6, title: "效果追踪日", tasks: ["追踪推广后销量变化","收集新客户反馈","分析转化数据"] },
    { day: 7, title: "复盘日", tasks: ["评估产品竞争力提升效果","分析推广ROI","制定下阶段产品策略"] }
  ],
  longTermAdvice: [
    "持续打磨产品竞争力，让客户有非你不可的理由",
    "建立产品迭代节奏，每月根据数据和反馈做小步快跑改进",
    "产品力+推广力双轮驱动，好产品配上好推广才能卖动"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_009"],
  priority: 7
},

// ---- 补充路径：MARKETING_HARD 营销推广困难（行业×阶段组合）----

// path_61: MARKETING_HARD - 餐饮 - 新店
{
  _id: "path_61",
  problemCode: "MARKETING_HARD",
  industry: "餐饮",
  stage: "新店",
  symptomIds: ["sym_m01","sym_m03","sym_m04"],
  judgment: "你的新开餐饮店从未做过线上营销，缺少基础曝光和开业推广经验",
  severity: 69,
  causes: [
    { name: "零线上运营经验", weight: 35, judgment: "老板或团队有线上营销经验吗？用过大红点评商家端吗？", description: "团队完全没有线上营销经验，不知从何入手" },
    { name: "缺少内容生产能力", weight: 25, judgment: "能拍出有吸引力的菜品视频和照片吗？", description: "缺少内容创作能力，无法产出吸引人的图文和视频" },
    { name: "开业推广不足", weight: 25, judgment: "开业期间做了哪些推广？有多少人知道新店开业？", description: "开业推广投入不够，错失了最佳曝光窗口期" },
    { name: "预算有限不敢投", weight: 15, judgment: "有营销预算吗？担心投了没效果不敢花？", description: "营销预算有限且不敢投入，怕打水漂而不作为" }
  ],
  solutionIds: ["sol_012","sol_026","sol_027"],
  todayTasks: [
    { task: "注册大众点评商家版并完善店铺信息", duration: "1小时", purpose: "建立线上基础阵地" },
    { task: "拍摄10张高质量菜品和门店照片", duration: "1小时", purpose: "准备内容素材" },
    { task: "制定开业首月推广计划（低预算高创意）", duration: "30分钟", purpose: "规划推广节奏" }
  ],
  weekPlan: [
    { day: 1, title: "阵地铺设日", tasks: ["认领大众点评门店","开通抖音来客","注册小红书账号"] },
    { day: 2, title: "内容准备日", tasks: ["拍摄菜品和门店照片","撰写店铺介绍文案","制作开业优惠海报"] },
    { day: 3, title: "开业推广日", tasks: ["发布开业优惠到各平台","周边500米派发传单","进业主群发开业信息"] },
    { day: 4, title: "达人合作日", tasks: ["联系2-3个本地美食博主","邀请免费试吃换探店内容","整理探店合作清单"] },
    { day: 5, title: "社群启动日", tasks: ["建立门店粉丝群","设计加群福利","首批到店客户入群"] },
    { day: 6, title: "内容发布日", tasks: ["发布3条小红书种草笔记","发布1条抖音短视频","回复所有线上评价"] },
    { day: 7, title: "复盘日", tasks: ["统计各平台曝光数据","分析到店转化来源","调整下周推广重点"] }
  ],
  longTermAdvice: [
    "新店前3个月必须高频曝光，每周至少3条线上内容+1次到店活动",
    "从零开始不要怕粗糙，先做起来再做好，完美主义是营销大敌",
    "用好免费渠道：大众点评、抖音来客、小红书、业主群都是零成本"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_010"],
  priority: 8
},

// path_62: MARKETING_HARD - 餐饮 - 成长期
{
  _id: "path_62",
  problemCode: "MARKETING_HARD",
  industry: "餐饮",
  stage: "成长期",
  symptomIds: ["sym_m02","sym_m04","sym_m06"],
  judgment: "你的餐饮门店广告投放效果差ROI低于1:2，缺少可复制的获客渠道",
  severity: 72,
  causes: [
    { name: "投放策略粗糙", weight: 30, judgment: "广告投了多少钱？带来多少到店？ROI算过吗？", description: "广告投放缺少精细化策略，花钱买流量但转化率低" },
    { name: "缺少可复制获客渠道", weight: 25, judgment: "除了自然到店，有稳定的获客渠道吗？", description: "没有建立稳定的可复制获客渠道，客流来源不可控" },
    { name: "内容质量低", weight: 25, judgment: "发布的线上内容有人看吗？点赞评论数据如何？", description: "线上内容质量低、没有吸引力，无法有效种草引流" },
    { name: "缺少数据分析能力", weight: 20, judgment: "有追踪各渠道获客成本和转化率吗？", description: "不做数据分析，不知道钱花在哪里有效、哪里浪费" }
  ],
  solutionIds: ["sol_012","sol_026","sol_027"],
  todayTasks: [
    { task: "调出近3个月广告投放数据，计算各渠道ROI", duration: "45分钟", purpose: "诊断投放效率" },
    { task: "学习1个成功同行的线上营销打法", duration: "1小时", purpose: "借鉴有效方法" },
    { task: "设计1个低成本内容引流方案", duration: "30分钟", purpose: "测试新获客方式" }
  ],
  weekPlan: [
    { day: 1, title: "投放审计日", tasks: ["分析各渠道投放ROI","砍掉ROI低于1:1的渠道","识别高潜力渠道加码"] },
    { day: 2, title: "内容升级日", tasks: ["学习竞品高赞内容套路","提升拍摄和剪辑质量","制定内容发布日历"] },
    { day: 3, title: "社群深耕日", tasks: ["优化社群运营内容","设计群专属福利和活动","提升群活跃度和转化"] },
    { day: 4, title: "本地生活深耕日", tasks: ["优化抖音来客店铺","参与平台活动获取流量","设置团购引流款"] },
    { day: 5, title: "口碑运营日", tasks: ["引导满意客户写好评","回复所有差评和好评","设计好评奖励机制"] },
    { day: 6, title: "异业合作日", tasks: ["联系3家互补商家谈互推","设计联合活动方案","启动首次合作引流"] },
    { day: 7, title: "复盘日", tasks: ["统计各渠道获客数据","计算获客成本和转化率","优化渠道投入分配"] }
  ],
  longTermAdvice: [
    "建立数据驱动的营销决策，每分钱都要追踪效果",
    "内容营销是餐饮最低成本的获客方式，坚持每周3条以上",
    "构建3个以上稳定获客渠道，任一渠道占比不超过40%"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_010"],
  priority: 8
},

// path_63: MARKETING_HARD - 餐饮 - 老店
{
  _id: "path_63",
  problemCode: "MARKETING_HARD",
  industry: "餐饮",
  stage: "老店",
  symptomIds: ["sym_m02","sym_m05","sym_m06"],
  judgment: "你的老餐饮店营销方式陈旧，口碑传播仅靠自然发生，缺少主动获客手段",
  severity: 74,
  causes: [
    { name: "营销方式陈旧", weight: 30, judgment: "现在还在靠发传单和自然客流吗？线上营销做了哪些？", description: "仍依赖传统营销方式，未跟上数字化营销趋势" },
    { name: "口碑无主动运营", weight: 25, judgment: "好评是自然产生的还是有引导机制？差评怎么处理？", description: "口碑完全靠自然传播，没有主动引导好评和处理差评" },
    { name: "老客激活不足", weight: 25, judgment: "有多少老客户3个月没来了？有激活动作吗？", description: "老客户大量沉睡但缺少激活机制，流失率持续上升" },
    { name: "线上布局空白", weight: 20, judgment: "在年轻人用的平台上有存在感吗？", description: "在新媒体平台几乎无存在感，错失年轻客群" }
  ],
  solutionIds: ["sol_012","sol_024","sol_027"],
  todayTasks: [
    { task: "盘点当前所有营销动作和效果", duration: "30分钟", purpose: "诊断营销现状" },
    { task: "注册/完善2个新媒体平台账号", duration: "1小时", purpose: "补齐线上短板" },
    { task: "设计老客唤醒方案（短信/社群/电话）", duration: "30分钟", purpose: "激活沉睡客户" }
  ],
  weekPlan: [
    { day: 1, title: "营销转型日", tasks: ["盘点现有营销方式和效果","制定线上营销转型计划","分配营销时间和预算"] },
    { day: 2, title: "线上建阵日", tasks: ["完善抖音/小红书账号","发布首批3条内容","学习平台运营基础"] },
    { day: 3, title: "口碑运营日", tasks: ["建立好评引导机制","制定差评回复标准","邀请满意客户写评价"] },
    { day: 4, title: "老客唤醒日", tasks: ["筛选3个月未消费客户","设计唤醒优惠和话术","分批发送唤醒信息"] },
    { day: 5, title: "社群运营日", tasks: ["建立或激活门店社群","设计群内容和活动节奏","提升群活跃度"] },
    { day: 6, title: "活动策划日", tasks: ["设计1个线上引流到店活动","制作活动物料","活动预热和发布"] },
    { day: 7, title: "复盘日", tasks: ["统计线上曝光和到店转化","分析老客唤醒效果","调整下周营销节奏"] }
  ],
  longTermAdvice: [
    "老店营销转型要'两条腿走路'：维护老客+开拓线上新客",
    "建立口碑主动运营机制，好评率目标95%以上",
    "每月至少策划2次线上引流活动，形成稳定的获客节奏"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_010"],
  priority: 8
},

// path_64: MARKETING_HARD - 零售 - 新店
{
  _id: "path_64",
  problemCode: "MARKETING_HARD",
  industry: "零售",
  stage: "新店",
  symptomIds: ["sym_m01","sym_m03","sym_m04"],
  judgment: "你的新开零售门店完全未做线上推广，在新媒体平台零粉丝零内容",
  severity: 67,
  causes: [
    { name: "线上零布局", weight: 35, judgment: "小红书、抖音、微信有做吗？有线上流量来源吗？", description: "完全没布局线上渠道，新店在新媒体上零存在感" },
    { name: "不懂内容种草", weight: 25, judgment: "知道怎么拍产品种草内容吗？有学习过吗？", description: "不懂零售内容种草逻辑，无法产出吸引目标客群的内容" },
    { name: "开业声量不足", weight: 25, judgment: "开业时周边有多少人知道？做了什么推广？", description: "开业缺乏声量，周边目标客群不知道新店存在" },
    { name: "无社群基础", weight: 15, judgment: "有门店社群吗？第一批粉丝怎么聚集？", description: "没有社群作为私域流量池，客户无法持续触达" }
  ],
  solutionIds: ["sol_005","sol_026","sol_027"],
  todayTasks: [
    { task: "注册小红书和抖音账号，完成基础设置", duration: "45分钟", purpose: "建立线上阵地" },
    { task: "拍摄5张产品种草图和1条开箱视频", duration: "1小时", purpose: "准备首波内容" },
    { task: "设计开业到店有礼活动吸引首批客户", duration: "30分钟", purpose: "制造到店理由" }
  ],
  weekPlan: [
    { day: 1, title: "平台注册日", tasks: ["完成小红书/抖音/视频号注册","完善店铺信息和头像","学习平台基础操作"] },
    { day: 2, title: "内容生产日", tasks: ["拍摄产品种草内容","学习简单剪辑和排版","发布首批3条内容"] },
    { day: 3, title: "开业推广日", tasks: ["发布开业优惠信息","周边派发传单和体验券","进业主群发布开业消息"] },
    { day: 4, title: "社群建池日", tasks: ["创建门店微信社群","设计加群专属福利","到店客户引导入群"] },
    { day: 5, title: "达人合作日", tasks: ["联系本地生活类博主","送样换种草内容","建立达人合作清单"] },
    { day: 6, title: "到店活动日", tasks: ["执行开业到店有礼活动","引导客户关注和入群","收集首批客户反馈"] },
    { day: 7, title: "复盘日", tasks: ["统计各平台曝光数据","分析到店客户来源","制定下周内容计划"] }
  ],
  longTermAdvice: [
    "零售新店线上种草是必修课，每周至少3条小红书+2条短视频",
    "社群是零售最有效的私域渠道，目标3个月积累500+群成员",
    "与达人合作种草是性价比最高的推广，持续维护合作网络"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_010"],
  priority: 8
},

// path_65: MARKETING_HARD - 零售 - 成长期
{
  _id: "path_65",
  problemCode: "MARKETING_HARD",
  industry: "零售",
  stage: "成长期",
  symptomIds: ["sym_m02","sym_m05","sym_m06"],
  judgment: "你的零售门店推广ROI低且缺少可复制获客渠道，营销投入产出严重失衡",
  severity: 73,
  causes: [
    { name: "投放ROI过低", weight: 30, judgment: "每月营销费用多少？带来多少新客？ROI是多少？", description: "广告投放花钱多效果差，缺少精准投放策略" },
    { name: "内容无种草力", weight: 25, judgment: "发布的内容有互动吗？有人因为内容到店吗？", description: "内容缺少种草能力，发布了但无人互动和转化" },
    { name: "缺少促销策划能力", weight: 25, judgment: "促销活动是自己想还是系统策划？效果如何？", description: "促销活动缺少系统策划，折扣力度大但效果差" },
    { name: "私域运营空白", weight: 20, judgment: "社群有多少人？有定期发内容和活动吗？", description: "私域社群建了但没运营，缺少内容和活动节奏" }
  ],
  solutionIds: ["sol_023","sol_026","sol_029"],
  todayTasks: [
    { task: "分析近3月各渠道投放ROI，砍掉低效渠道", duration: "45分钟", purpose: "止血低效投放" },
    { task: "学习1个同品类零售高赞内容案例", duration: "30分钟", purpose: "提升内容能力" },
    { task: "策划1个有主题的限时促销活动", duration: "1小时", purpose: "提升促销策划力" }
  ],
  weekPlan: [
    { day: 1, title: "投放优化日", tasks: ["分析各渠道ROI数据","砍掉ROI低于1:1的渠道","重新分配营销预算"] },
    { day: 2, title: "内容升级日", tasks: ["分析竞品高互动内容套路","提升拍摄和文案质量","制定内容主题日历"] },
    { day: 3, title: "促销策划日", tasks: ["确定促销主题和力度","设计促销组合方案","制作促销物料"] },
    { day: 4, title: "私域激活日", tasks: ["制定社群内容节奏","设计群专属优惠","提升群活跃度"] },
    { day: 5, title: "活动执行日", tasks: ["启动限时促销活动","全渠道推送活动信息","追踪活动实时数据"] },
    { day: 6, title: "口碑运营日", tasks: ["引导客户写好评和晒图","回复所有线上评价","设计好评激励机制"] },
    { day: 7, title: "复盘日", tasks: ["统计促销活动ROI","分析各渠道获客效果","制定下周营销计划"] }
  ],
  longTermAdvice: [
    "建立数据驱动的投放策略，每笔营销费用都要追踪效果",
    "内容种草+促销转化是零售营销的双引擎，缺一不可",
    "深耕私域运营，社群贡献率目标达到20%以上"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_010"],
  priority: 8
},

// path_66: MARKETING_HARD - 零售 - 老店
{
  _id: "path_66",
  problemCode: "MARKETING_HARD",
  industry: "零售",
  stage: "老店",
  symptomIds: ["sym_m02","sym_m05","sym_m06"],
  judgment: "你的老零售店营销手段落后于时代，完全依赖自然客流和口碑，缺少主动获客",
  severity: 71,
  causes: [
    { name: "营销理念落后", weight: 30, judgment: "还在等客上门吗？有没有想过主动出击获客？", description: "等客上门的思维根深蒂固，缺少主动获客的意识和行动" },
    { name: "线上几乎空白", weight: 25, judgment: "在主流线上平台有布局吗？年轻人能找到你吗？", description: "在线上平台几乎无存在感，年轻消费群体触达不到" },
    { name: "促销只会打折", weight: 25, judgment: "促销方式是不是只有打折？有体验活动吗？", description: "促销手段单一只会打折，损害品牌价值且效果递减" },
    { name: "客户资产浪费", weight: 20, judgment: "多年积累了多少客户信息？有利用吗？", description: "多年经营积累了大量客户但未建立客户资产，无法持续触达" }
  ],
  solutionIds: ["sol_023","sol_024","sol_027"],
  todayTasks: [
    { task: "盘点所有营销方式和对应效果", duration: "30分钟", purpose: "诊断营销现状" },
    { task: "开通2个线上平台（小红书+抖音）", duration: "1小时", purpose: "补齐线上布局" },
    { task: "整理历史客户信息，建立客户档案", duration: "1小时", purpose: "沉淀客户资产" }
  ],
  weekPlan: [
    { day: 1, title: "转型启动日", tasks: ["制定线上营销转型计划","确定3个月营销目标","分配每周营销时间"] },
    { day: 2, title: "线上建阵日", tasks: ["完善小红书和抖音账号","学习基础运营操作","发布首批3条种草内容"] },
    { day: 3, title: "客户资产日", tasks: ["整理历史客户联系方式","建立客户分类档案","启动客户社群建设"] },
    { day: 4, title: "促销升级日", tasks: ["设计1个非打折型体验活动","策划会员专属活动","制作活动物料"] },
    { day: 5, title: "活动执行日", tasks: ["执行体验型活动","引导客户入群关注","收集活动反馈"] },
    { day: 6, title: "内容运营日", tasks: ["拍摄产品种草内容","发布线上内容","回复线上互动"] },
    { day: 7, title: "复盘日", tasks: ["评估转型首周效果","分析线上曝光数据","调整下周节奏"] }
  ],
  longTermAdvice: [
    "从'等客上门'到'主动获客'的思维转变是老店营销转型的第一步",
    "线上种草+线下体验+私域留存是零售营销的铁三角",
    "把多年积累的客户变成可触达的资产，这是老店最大的优势"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_010"],
  priority: 8
},

// path_67: MARKETING_HARD - 服务业 - 新店
{
  _id: "path_67",
  problemCode: "MARKETING_HARD",
  industry: "服务业",
  stage: "新店",
  symptomIds: ["sym_m01","sym_m03","sym_m04"],
  judgment: "你的新开服务门店缺少线上案例展示和口碑积累，新客户不敢信任尝试",
  severity: 68,
  causes: [
    { name: "缺少案例背书", weight: 35, judgment: "线上能找到你的服务案例和客户好评吗？", description: "新店没有历史案例和口碑，信任壁垒高导致转化难" },
    { name: "服务不可见难传播", weight: 25, judgment: "服务过程和效果能被看到吗？有内容化呈现吗？", description: "服务天然不可见，缺少内容化展示让潜在客户评估品质" },
    { name: "缺少体验入口", weight: 25, judgment: "新客户第一次怎么知道你好不好？有体验价吗？", description: "没有低门槛的体验入口，新客户决策风险高不敢尝试" },
    { name: "线上零布局", weight: 15, judgment: "在大众点评和小红书上有信息吗？", description: "线上平台完全没有布局，搜索不到任何信息" }
  ],
  solutionIds: ["sol_006","sol_026","sol_027"],
  todayTasks: [
    { task: "整理3个服务案例（含前后对比和客户好评）", duration: "1小时", purpose: "建立信任素材" },
    { task: "设计新客体验价套餐（正常价3折）", duration: "30分钟", purpose: "降低信任门槛" },
    { task: "在大众点评和小红书发布首批内容", duration: "1小时", purpose: "建立线上存在感" }
  ],
  weekPlan: [
    { day: 1, title: "案例准备日", tasks: ["整理3-5个服务案例","拍摄服务过程和效果","撰写客户好评文案"] },
    { day: 2, title: "线上铺设日", tasks: ["认领大众点评门店","注册小红书账号","发布首批案例内容"] },
    { day: 3, title: "体验价上线日", tasks: ["确定体验套餐和定价","制作体验卡和物料","设计体验流程话术"] },
    { day: 4, title: "内容种草日", tasks: ["拍摄服务过程短视频","发布3条种草内容","学习内容运营技巧"] },
    { day: 5, title: "异业合作日", tasks: ["联系互补型商家谈互推","设计合作引流方案","启动首次合作"] },
    { day: 6, title: "体验活动日", tasks: ["接待首批体验客户","引导写好评和晒图","收集体验反馈"] },
    { day: 7, title: "复盘日", tasks: ["统计线上曝光和到店数据","分析体验客户转化率","调整下周运营节奏"] }
  ],
  longTermAdvice: [
    "服务行业营销的核心是'让看不见的服务被看见'，持续积累案例",
    "体验价是服务业获客的标配，新客体验转化率目标30%以上",
    "案例+体验价+口碑三管齐下，逐步建立信任壁垒"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_010"],
  priority: 8
},

// path_68: MARKETING_HARD - 服务业 - 成长期
{
  _id: "path_68",
  problemCode: "MARKETING_HARD",
  industry: "服务业",
  stage: "成长期",
  symptomIds: ["sym_m02","sym_m04","sym_m06"],
  judgment: "你的成长期服务门店营销投放ROI低，缺少稳定获客渠道和系统化运营",
  severity: 73,
  causes: [
    { name: "投放效率低下", weight: 30, judgment: "每月营销预算多少？获客成本多少？ROI达标吗？", description: "有一定营销投入但效率低下，获客成本高且转化率低" },
    { name: "缺少系统化运营", weight: 25, judgment: "营销动作是随机的还是有计划的？有内容日历吗？", description: "营销缺少系统规划，东一榔头西一棒，无法持续积累效果" },
    { name: "口碑运营缺失", weight: 25, judgment: "好评率多少？有主动引导好评吗？差评处理及时吗？", description: "缺少口碑主动运营，好评自然增长慢，差评影响大" },
    { name: "老客裂变未启动", weight: 20, judgment: "有推荐奖励机制吗？老客转介绍率多少？", description: "没有启动老客裂变，浪费了最经济的获客方式" }
  ],
  solutionIds: ["sol_024","sol_026","sol_027"],
  todayTasks: [
    { task: "制定月度营销日历（内容+活动+投放）", duration: "1小时", purpose: "建立系统化节奏" },
    { task: "计算各渠道获客成本和ROI", duration: "30分钟", purpose: "优化投放效率" },
    { task: "设计老客推荐奖励方案", duration: "30分钟", purpose: "启动裂变获客" }
  ],
  weekPlan: [
    { day: 1, title: "系统规划日", tasks: ["制定月度营销日历","分配每周内容+活动+投放","确定各渠道预算分配"] },
    { day: 2, title: "投放优化日", tasks: ["分析各渠道ROI数据","优化投放策略和定向","砍低效渠道加码高效渠道"] },
    { day: 3, title: "口碑运营日", tasks: ["建立好评引导机制","制定差评24h回复标准","设计好评激励方案"] },
    { day: 4, title: "裂变启动日", tasks: ["确定推荐奖励规则","制作推荐码和海报","向活跃客户发布推荐计划"] },
    { day: 5, title: "内容升级日", tasks: ["提升内容质量和频率","拍摄服务过程专业视频","优化种草文案和标签"] },
    { day: 6, title: "活动策划日", tasks: ["策划1个线上引流活动","设计活动到店转化路径","活动预热和发布"] },
    { day: 7, title: "复盘日", tasks: ["统计各渠道获客数据","分析裂变效果","优化下周营销执行"] }
  ],
  longTermAdvice: [
    "建立月度营销日历，让营销从随机变系统，从拍脑袋变数据驱动",
    "口碑是服务业的生命线，好评率目标97%以上",
    "老客裂变是最低成本的获客，推荐率目标15%以上"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_010"],
  priority: 8
},

// path_69: MARKETING_HARD - 服务业 - 老店
{
  _id: "path_69",
  problemCode: "MARKETING_HARD",
  industry: "服务业",
  stage: "老店",
  symptomIds: ["sym_m02","sym_m05","sym_m06"],
  judgment: "你的老服务店多年未更新营销方式，口碑传播被动且缺少数字化获客能力",
  severity: 72,
  causes: [
    { name: "营销方式老化", weight: 30, judgment: "获客还是靠老客户介绍和门口自然流量吗？", description: "营销方式停留在10年前，未跟上数字化获客趋势" },
    { name: "口碑被动传播", weight: 25, judgment: "好评是自然产生的还是有引导？线上评价管理了吗？", description: "口碑完全被动，没有主动引导好评和管理线上评价" },
    { name: "数字化能力为零", weight: 25, judgment: "会用短视频和社交媒体获客吗？", description: "完全不具备数字化营销能力，错失年轻客群" },
    { name: "老客关系断裂", weight: 20, judgment: "和老客户还有联系吗？有定期触达吗？", description: "多年积累的老客关系没有持续维护，大量客户失联" }
  ],
  solutionIds: ["sol_024","sol_026","sol_027"],
  todayTasks: [
    { task: "盘点所有营销方式，标记过时和空白项", duration: "30分钟", purpose: "诊断营销差距" },
    { task: "学习1个同行业数字化营销成功案例", duration: "1小时", purpose: "找到转型方向" },
    { task: "整理老客户名单，制定重新联系计划", duration: "30分钟", purpose: "修复客户关系" }
  ],
  weekPlan: [
    { day: 1, title: "差距诊断日", tasks: ["对比同行数字化营销做法","标记自身营销短板","制定3个月转型计划"] },
    { day: 2, title: "数字基础日", tasks: ["开通/完善线上平台账号","学习短视频拍摄和发布","发布首批3条内容"] },
    { day: 3, title: "口碑管理日", tasks: ["认领大众点评管理评价","建立好评引导和差评回复","设计好评激励方案"] },
    { day: 4, title: "老客修复日", tasks: ["分批联系沉睡老客户","设计回归专属优惠","建立客户定期触达机制"] },
    { day: 5, title: "内容运营日", tasks: ["制定内容发布节奏","拍摄服务案例和专业内容","学习内容标签和推广技巧"] },
    { day: 6, title: "社群建设日", tasks: ["建立门店客户社群","设计群内容和活动节奏","邀请老客户入群"] },
    { day: 7, title: "复盘日", tasks: ["评估转型首周进展","分析线上数据","调整下周执行重点"] }
  ],
  longTermAdvice: [
    "老店数字化营销转型不是选修课，是生存必修课",
    "老客户是最大资产，先修复关系再开拓新客，两手都要硬",
    "给自己6个月时间完成营销数字化转型，不求快但求稳"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_010"],
  priority: 8
},

// path_70: MARKETING_HARD - all - all
{
  _id: "path_70",
  problemCode: "MARKETING_HARD",
  industry: "all",
  stage: "all",
  symptomIds: ["sym_m01","sym_m02","sym_m06"],
  judgment: "你的门店营销推广能力严重不足，既缺方法也缺渠道，需要从零构建营销体系",
  severity: 70,
  causes: [
    { name: "营销知识空白", weight: 30, judgment: "老板或负责人有系统学习过营销吗？", description: "团队缺少营销基础知识，不知道有哪些有效方法" },
    { name: "没有获客渠道", weight: 25, judgment: "除了等客上门，有主动获客的方式吗？", description: "没有建立任何主动获客渠道，完全被动等客" },
    { name: "内容能力为零", weight: 25, judgment: "能写文案拍视频吗？有产出过营销内容吗？", description: "缺少内容创作能力，无法产出任何营销内容" },
    { name: "预算和信心不足", weight: 20, judgment: "有营销预算吗？试过但失败了所以不敢再投？", description: "没有营销预算或试错后丧失信心，不敢投入" }
  ],
  solutionIds: ["sol_012","sol_026","sol_027"],
  todayTasks: [
    { task: "列出你知道的所有营销方法，标注已做和未做", duration: "30分钟", purpose: "摸清营销差距" },
    { task: "学习1个同行业成功营销案例（搜索或请教同行）", duration: "1小时", purpose: "找到可借鉴方法" },
    { task: "选择1个最易上手的营销方法立刻开始", duration: "30分钟", purpose: "迈出第一步" }
  ],
  weekPlan: [
    { day: 1, title: "知识补课日", tasks: ["学习营销基础知识","了解主流营销渠道和方法","确定3个适合自身的营销方向"] },
    { day: 2, title: "渠道铺设日", tasks: ["注册2-3个线上平台","完善店铺基础信息","学习平台基本操作"] },
    { day: 3, title: "内容起步日", tasks: ["学习简单拍照和文案","制作并发布首条内容","不求完美先做起来"] },
    { day: 4, title: "小步试错日", tasks: ["设计1个小成本营销测试","执行并追踪效果","记录数据和感受"] },
    { day: 5, title: "社群起步日", tasks: ["创建客户微信群","设计入群福利","引导到店客户入群"] },
    { day: 6, title: "口碑起步日", tasks: ["引导满意客户写好评","回复线上所有评价","设计好评小激励"] },
    { day: 7, title: "复盘日", tasks: ["总结本周营销行动","分析哪些有效哪些无效","制定下周营销计划"] }
  ],
  longTermAdvice: [
    "营销不在于花多少钱，而在于持续做和不断学习优化",
    "先从免费渠道做起：社群+内容+口碑，零成本也能获客",
    "给自己3个月学习期，营销能力是练出来的不是学出来的"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_010"],
  priority: 7
},

// ---- 补充路径：COMPETITION 竞争压力大（行业×阶段组合）----

// path_71: COMPETITION - 餐饮 - 新店
{
  _id: "path_71",
  problemCode: "COMPETITION",
  industry: "餐饮",
  stage: "新店",
  symptomIds: ["sym_x01","sym_x03","sym_x04"],
  judgment: "你的新开餐饮店在竞品密集区域缺乏差异化卖点，客户无法记住你选择你",
  severity: 72,
  causes: [
    { name: "缺乏差异化定位", weight: 35, judgment: "和周边竞品比，你有什么不同？客户为什么选你不选他？", description: "新店没有明确的差异化定位，与竞品同质化严重" },
    { name: "品牌认知为零", weight: 25, judgment: "周边客户知道你开了一家什么店吗？", description: "新店零品牌认知，在竞品林立的环境中很难被注意到" },
    { name: "价格无优势", weight: 20, judgment: "定价和老店比有优势吗？", description: "新店定价不比老店低，缺乏价格吸引力" },
    { name: "产品无记忆点", weight: 20, judgment: "有让人吃一次就记住的菜品吗？", description: "菜品没有独特记忆点，吃完就忘无法形成复购理由" }
  ],
  solutionIds: ["sol_009","sol_025","sol_030"],
  todayTasks: [
    { task: "实地走访周边5家竞品，记录其定位和特色", duration: "2小时", purpose: "摸清竞争格局" },
    { task: "确定1个差异化定位（品类/口味/场景/客群）", duration: "1小时", purpose: "找到独特站位" },
    { task: "打造1道竞品没有的记忆点菜品", duration: "1小时", purpose: "建立产品护城河" }
  ],
  weekPlan: [
    { day: 1, title: "竞品调研日", tasks: ["实地走访5家竞品","分析其定位/特色/价格/客群","找到竞争空白点"] },
    { day: 2, title: "差异化定位日", tasks: ["确定差异化方向","设计独特价值主张","围绕定位调整菜单和装修"] },
    { day: 3, title: "记忆点打造日", tasks: ["研发1道独特记忆点菜品","制定标准SOP","设计呈现方式讲好故事"] },
    { day: 4, title: "价值主张传播日", tasks: ["将差异化信息融入门头和物料","线上发布差异化内容","员工话术培训"] },
    { day: 5, title: "首波引流日", tasks: ["设计新店专属开业优惠","周边密集推广","利用差异化吸引尝鲜客"] },
    { day: 6, title: "竞品监控日", tasks: ["持续关注竞品动态","记录竞品促销和变化","调整自身应对策略"] },
    { day: 7, title: "复盘日", tasks: ["评估差异化定位效果","分析客户选择理由","优化差异化策略"] }
  ],
  longTermAdvice: [
    "在竞品密集区域，差异化是生存之本，宁可小众也不要平庸",
    "持续监控竞品动态，每月至少1次竞品走访和策略review",
    "差异化不是一劳永逸的，需要持续强化和更新"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_009"],
  priority: 8
},

// path_72: COMPETITION - 餐饮 - 成长期
{
  _id: "path_72",
  problemCode: "COMPETITION",
  industry: "餐饮",
  stage: "成长期",
  symptomIds: ["sym_x01","sym_x02","sym_x03"],
  judgment: "你的成长期餐饮门店被竞品分流严重，价格战和同质化侵蚀你的市场份额",
  severity: 75,
  causes: [
    { name: "竞品分流加剧", weight: 30, judgment: "近半年新开了几家同类店？你的客流有被分流吗？", description: "新竞品不断进入，分流了核心客源，市场份额被蚕食" },
    { name: "陷入价格战", weight: 25, judgment: "竞品降价你跟着降了吗？利润被挤压了吗？", description: "被竞品拖入价格战，利润持续被挤压" },
    { name: "同质化严重", weight: 25, judgment: "你的产品和竞品有多大差异？客户能区分吗？", description: "产品和服务与竞品高度同质，客户没有忠诚度" },
    { name: "客户易被撬走", weight: 20, judgment: "客户去竞品消费的原因是什么？", description: "客户忠诚度低，促销一停就被竞品抢走" }
  ],
  solutionIds: ["sol_009","sol_024","sol_030"],
  todayTasks: [
    { task: "分析近6个月客流和营收变化，对比竞品开业时间", duration: "45分钟", purpose: "量化分流影响" },
    { task: "列出3个与竞品的核心差异点", duration: "30分钟", purpose: "明确差异化优势" },
    { task: "设计1个竞品难以模仿的特色菜品或服务", duration: "1小时", purpose: "建立竞争壁垒" }
  ],
  weekPlan: [
    { day: 1, title: "竞争审计日", tasks: ["分析客流和营收被分流程度","识别主要竞品和其策略","计算市场份额变化"] },
    { day: 2, title: "差异化强化日", tasks: ["确定3个核心差异点","将差异化融入所有客户触点","设计差异化体验方案"] },
    { day: 3, title: "壁垒构建日", tasks: ["研发竞品难模仿的特色菜品","打造独家配方或工艺","建立特色保护意识"] },
    { day: 4, title: "会员锁客日", tasks: ["强化会员储值锁定客户","设计会员专享非价格权益","提升客户转换成本"] },
    { day: 5, title: "价值战替代价格战日", tasks: ["停止无底线跟价","用增值服务替代降价","强化价值感而非低价感"] },
    { day: 6, title: "竞品应对日", tasks: ["分析竞品最新动态","制定针对性应对策略","保持差异化领先优势"] },
    { day: 7, title: "复盘日", tasks: ["评估竞争策略效果","分析客户留存和流失原因","调整下阶段竞争策略"] }
  ],
  longTermAdvice: [
    "绝不打价格战，用价值战和差异化竞争替代",
    "会员储值是锁客抗竞争最有效的武器，储值客户占比目标50%以上",
    "持续创新保持差异化领先，让竞品追不上而非你追竞品"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_009"],
  priority: 8
},

// path_73: COMPETITION - 餐饮 - 老店
{
  _id: "path_73",
  problemCode: "COMPETITION",
  industry: "餐饮",
  stage: "老店",
  symptomIds: ["sym_x01","sym_x02","sym_x05"],
  judgment: "你的老餐饮店面临品牌连锁竞品和新兴网红店双重夹击，单店竞争力持续衰减",
  severity: 78,
  causes: [
    { name: "连锁品牌挤压", weight: 30, judgment: "周边有连锁品牌入驻吗？他们的品牌和供应链优势你怎么抗衡？", description: "连锁品牌凭借品牌力和供应链优势持续挤压单店生存空间" },
    { name: "新兴网红分流", weight: 25, judgment: "新开的网红店抢走了年轻客群吗？", description: "新兴网红店吸引年轻客群，老店客群结构老化" },
    { name: "品牌力不足", weight: 25, judgment: "你的店在当地有品牌认知度吗？还是只有老街坊知道？", description: "单店品牌力弱，辐射范围有限，无法与品牌连锁竞争" },
    { name: "运营效率落后", weight: 20, judgment: "你的运营效率和成本控制比连锁品牌差多少？", description: "单店运营效率低、成本控制弱，在效率型竞争中处于劣势" }
  ],
  solutionIds: ["sol_009","sol_025","sol_030"],
  todayTasks: [
    { task: "分析竞品类型（连锁/网红/单店）和各自优势", duration: "1小时", purpose: "厘清竞争格局" },
    { task: "列出3个单店相对连锁的差异化优势", duration: "30分钟", purpose: "找到竞争支点" },
    { task: "设计1个品牌焕新动作提升认知度", duration: "1小时", purpose: "强化品牌力" }
  ],
  weekPlan: [
    { day: 1, title: "竞争分析日", tasks: ["分析各类竞品优势和威胁","识别自身核心竞争优势","确定竞争策略方向"] },
    { day: 2, title: "差异化战略日", tasks: ["强化单店独有优势（人情味/灵活/定制）","设计差异化体验方案","将差异化转化为具体行动"] },
    { day: 3, title: "品牌焕新日", tasks: ["门店视觉升级","菜品和服务焕新","强化在地文化和社区连接"] },
    { day: 4, title: "社区深耕日", tasks: ["强化周边3公里社区服务","建立社区专属优惠","成为社区居民的食堂"] },
    { day: 5, title: "效率提升日", tasks: ["优化采购降本","提升出餐效率","减少浪费提高利润率"] },
    { day: 6, title: "线上突围日", tasks: ["加强线上内容运营","打造特色内容差异化","吸引年轻客群关注"] },
    { day: 7, title: "复盘日", tasks: ["评估竞争策略效果","分析客群结构变化","调整下阶段竞争重点"] }
  ],
  longTermAdvice: [
    "单店抗连锁的核心是：更懂本地客群、更灵活、更有温度",
    "深耕周边3公里社区，成为社区居民不可替代的选择",
    "品牌焕新+效率提升双线并行，才能在与连锁的竞争中生存"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_005"],
  priority: 8
},

// path_74: COMPETITION - 零售 - 新店
{
  _id: "path_74",
  problemCode: "COMPETITION",
  industry: "零售",
  stage: "新店",
  symptomIds: ["sym_x01","sym_x03","sym_x04"],
  judgment: "你的新开零售门店在成熟商圈缺乏选品差异和品牌优势，客户选择竞品的概率更高",
  severity: 70,
  causes: [
    { name: "选品无差异化", weight: 35, judgment: "你卖的东西周边竞品也在卖吗？有独家产品吗？", description: "选品与竞品高度重叠，缺少独家或差异化产品" },
    { name: "品牌认知劣势", weight: 25, judgment: "客户面对你和老店，更倾向选谁？", description: "新店品牌零认知，客户天然倾向选择熟悉的老店" },
    { name: "价格无竞争力", weight: 20, judgment: "你的进货价和零售价比竞品有优势吗？", description: "新店进货量小无价格优势，零售价无法低于竞品" },
    { name: "购物体验未建立", weight: 20, judgment: "客户在你店和竞品店的体验有区别吗？", description: "缺少独特的购物体验设计，客户感受不到差异" }
  ],
  solutionIds: ["sol_008","sol_025","sol_030"],
  todayTasks: [
    { task: "走访3家竞品记录其核心SKU和价格", duration: "1小时", purpose: "了解竞品选品" },
    { task: "确定3个独家或差异化产品方向", duration: "1小时", purpose: "建立选品差异" },
    { task: "设计1个独特的购物体验亮点", duration: "30分钟", purpose: "差异化体验" }
  ],
  weekPlan: [
    { day: 1, title: "竞品摸底日", tasks: ["走访3家竞品记录选品和价格","分析其优势和你的机会","找到选品空白点"] },
    { day: 2, title: "差异化选品日", tasks: ["引进3-5款竞品没有的产品","寻找独家代理或小众品牌","设计独家产品陈列方案"] },
    { day: 3, title: "体验差异化日", tasks: ["设计独特购物体验亮点","优化陈列和动线","增加体验互动元素"] },
    { day: 4, title: "社群差异日", tasks: ["建立精准客群社群","提供竞品没有的社群服务","培养社群粘性"] },
    { day: 5, title: "服务差异日", tasks: ["提供比竞品更贴心的服务","设计售后保障差异","用服务弥补品牌劣势"] },
    { day: 6, title: "开业引爆日", tasks: ["利用差异化优势做开业推广","突出独家产品和体验","吸引竞品客户尝鲜"] },
    { day: 7, title: "复盘日", tasks: ["评估差异化效果","分析客户选择原因","优化差异化策略"] }
  ],
  longTermAdvice: [
    "新店在成熟商圈竞争，差异化选品是第一竞争力",
    "独家产品+独特体验+贴心服务，三重差异化抵御品牌劣势",
    "持续寻找独家和小众产品，每月至少引进2-3款竞品没有的新品"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_009"],
  priority: 8
},

// path_75: COMPETITION - 零售 - 成长期
{
  _id: "path_75",
  problemCode: "COMPETITION",
  industry: "零售",
  stage: "成长期",
  symptomIds: ["sym_x01","sym_x02","sym_x03"],
  judgment: "你的成长期零售门店正被竞品通过更低价格和更丰富选品蚕食市场份额",
  severity: 74,
  causes: [
    { name: "竞品价格侵蚀", weight: 30, judgment: "竞品价格比你低多少？你有价格匹配能力吗？", description: "竞品利用规模优势或亏本引流拉低市场价格" },
    { name: "选品丰富度落后", weight: 25, judgment: "竞品SKU比你多吗？品类覆盖比你广吗？", description: "竞品选品更丰富，一站式购物体验更好" },
    { name: "客户忠诚度低", weight: 25, judgment: "客户因为什么选你？会因为更便宜就跑吗？", description: "客户选择你缺乏深层理由，价格敏感度高容易被撬" },
    { name: "缺少竞争壁垒", weight: 20, judgment: "你有什么是竞品短期内做不到的？", description: "没有建立有效的竞争壁垒，优势容易被模仿和超越" }
  ],
  solutionIds: ["sol_024","sol_025","sol_030"],
  todayTasks: [
    { task: "比价核心SKU与竞品的价差，计算可承受的让利空间", duration: "45分钟", purpose: "评估价格竞争力" },
    { task: "设计1个竞品难以模仿的会员权益", duration: "1小时", purpose: "建立客户粘性壁垒" },
    { task: "引进3款独家或小众差异化产品", duration: "1小时", purpose: "差异化选品" }
  ],
  weekPlan: [
    { day: 1, title: "竞争审计日", tasks: ["完成核心SKU价格对比","分析竞品选品优势","识别自身竞争短板"] },
    { day: 2, title: "壁垒构建日", tasks: ["强化会员体系锁定客户","设计高转换成本的会员权益","提升客户离开的代价"] },
    { day: 3, title: "选品差异化日", tasks: ["引进独家或小众品牌","补充竞品没有的品类","优化差异化选品陈列"] },
    { day: 4, title: "服务增值日", tasks: ["增加竞品没有的增值服务","提升购物体验差异化","用服务替代价格竞争"] },
    { day: 5, title: "会员锁客日", tasks: ["推广储值卡和长期套餐","设计会员专属价格和权益","提升会员占比和粘性"] },
    { day: 6, title: "内容差异化日", tasks: ["打造专业选品内容人设","线上发布选品测评和推荐","建立专业可信赖的品牌形象"] },
    { day: 7, title: "复盘日", tasks: ["评估竞争策略效果","分析客户留存数据","调整下阶段竞争重点"] }
  ],
  longTermAdvice: [
    "不拼价格拼价值，用会员锁客+独家选品+增值服务构建壁垒",
    "会员储值是最强的客户锁定手段，目标储值客户占比40%以上",
    "建立专业选品人设，让客户信任你的选品眼光而非只看价格"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_76: COMPETITION - 零售 - 老店
{
  _id: "path_76",
  problemCode: "COMPETITION",
  industry: "零售",
  stage: "老店",
  symptomIds: ["sym_x01","sym_x04","sym_x05"],
  judgment: "你的老零售店面临连锁便利和电商双重挤压，传统优势正在快速丧失",
  severity: 77,
  causes: [
    { name: "连锁便利分流", weight: 30, judgment: "周边新开了连锁便利店吗？他们抢走了多少日常消费？", description: "连锁便利店24小时+标准化分流了日常消费品市场" },
    { name: "电商替代效应", weight: 25, judgment: "客户说的最多的就是'网上更便宜'吗？", description: "电商在价格和品类上的优势持续替代线下零售" },
    { name: "传统模式老化", weight: 25, judgment: "经营模式还是10年前那一套吗？", description: "经营模式传统老化，无法与新型零售形态竞争" },
    { name: "缺少不可替代性", weight: 20, judgment: "客户有什么理由非来你店不可？", description: "缺少不可替代的价值，客户随时可以找到替代渠道" }
  ],
  solutionIds: ["sol_009","sol_025","sol_030"],
  todayTasks: [
    { task: "分析营收下滑品类，区分电商可替代和不可替代品类", duration: "1小时", purpose: "找到防守方向" },
    { task: "确定2-3个线下不可替代的品类或服务", duration: "30分钟", purpose: "建立不可替代性" },
    { task: "设计1个体验型到店活动（电商做不了）", duration: "1小时", purpose: "发挥线下优势" }
  ],
  weekPlan: [
    { day: 1, title: "竞争格局日", tasks: ["分析连锁便利和电商的分流程度","区分可替代和不可替代品类","确定防守和进攻方向"] },
    { day: 2, title: "品类重构日", tasks: ["收缩电商可替代品类","强化线下不可替代品类","增加体验型和服务型品类"] },
    { day: 3, title: "体验升级日", tasks: ["设计线下独有购物体验","增加试穿/试用/体验区","打造'来了才有的体验'"] },
    { day: 4, title: "社区深耕日", tasks: ["强化社区即时需求服务","提供代收代寄便民服务","成为社区生活服务中心"] },
    { day: 5, title: "私域建设日", tasks: ["建立社群+小程序闭环","线上线下联动","社群专属价格和选品"] },
    { day: 6, title: "效率提升日", tasks: ["优化库存减少资金占用","提升坪效和人效","用数据驱动选品决策"] },
    { day: 7, title: "复盘日", tasks: ["评估品类调整效果","分析体验活动数据","制定下阶段转型重点"] }
  ],
  longTermAdvice: [
    "线下零售的出路是做电商做不了的事：体验、即时、服务、社交",
    "收缩可替代品类、强化不可替代品类，做精不做全",
    "社区化+私域化是老零售店的转型方向"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_77: COMPETITION - 服务业 - 新店
{
  _id: "path_77",
  problemCode: "COMPETITION",
  industry: "服务业",
  stage: "新店",
  symptomIds: ["sym_x01","sym_x03","sym_x04"],
  judgment: "你的新开服务门店在竞品成熟区域缺乏口碑和案例背书，客户倾向选择老店",
  severity: 70,
  causes: [
    { name: "信任劣势明显", weight: 35, judgment: "客户面对新店和老店，担心你的服务品质不过关吗？", description: "新店没有口碑积累，客户天然信任经营更久的老店" },
    { name: "缺少案例展示", weight: 25, judgment: "有展示过服务效果案例吗？客户能评估你的水平吗？", description: "没有案例展示让客户评估服务品质，信任门槛高" },
    { name: "品牌零认知", weight: 25, judgment: "目标客群知道你的店吗？", description: "新店品牌零认知，在竞品林立中几乎不被注意" },
    { name: "定价无吸引力", weight: 15, judgment: "有新客体验价吗？比老店有价格优势吗？", description: "定价与老店持平甚至更高，缺少吸引尝鲜的理由" }
  ],
  solutionIds: ["sol_006","sol_025","sol_030"],
  todayTasks: [
    { task: "走访3家竞品了解其定价、客群和口碑", duration: "1小时", purpose: "摸清竞争环境" },
    { task: "设计强力新客体验价（正常价3折）+效果承诺", duration: "30分钟", purpose: "突破信任壁垒" },
    { task: "准备3个服务案例用于线上展示", duration: "1小时", purpose: "建立信任素材" }
  ],
  weekPlan: [
    { day: 1, title: "竞品分析日", tasks: ["走访3家竞品","分析其优势和弱点","找到竞争突破口"] },
    { day: 2, title: "信任建设日", tasks: ["准备服务案例和效果展示","制作案例内容","线上发布建立初步信任"] },
    { day: 3, title: "体验价上线日", tasks: ["确定体验套餐和定价","制作体验卡","设计效果承诺方案"] },
    { day: 4, title: "差异化服务日", tasks: ["设计1个竞品没有的特色服务","打造服务差异化亮点","将差异化融入营销内容"] },
    { day: 5, title: "口碑启动日", tasks: ["引导首批体验客户好评","制作好评展示内容","线上积极回复互动"] },
    { day: 6, title: "异业引流日", tasks: ["联系互补商家互推客户","设计联合服务套餐","启动首批合作引流"] },
    { day: 7, title: "复盘日", tasks: ["统计体验客户到店和转化","分析口碑积累效果","调整下周竞争策略"] }
  ],
  longTermAdvice: [
    "新店在成熟商圈竞争，信任+体验价+案例是破局三板斧",
    "服务行业的口碑是护城河，前6个月必须全力积累好评",
    "差异化服务是长期竞争武器，持续创新让竞品追不上"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_009"],
  priority: 8
},

// path_78: COMPETITION - 服务业 - 成长期
{
  _id: "path_78",
  problemCode: "COMPETITION",
  industry: "服务业",
  stage: "成长期",
  symptomIds: ["sym_x01","sym_x02","sym_x03"],
  judgment: "你的成长期服务门店被竞品低价抢单和模仿跟进，市场份额增长受阻",
  severity: 74,
  causes: [
    { name: "竞品低价抢单", weight: 30, judgment: "竞品用低于你的价格抢客户了吗？", description: "竞品用低价策略主动抢单，侵蚀你的市场份额" },
    { name: "特色被竞品模仿", weight: 25, judgment: "你的特色服务竞品开始做了吗？", description: "创新服务被竞品快速模仿，差异化优势被消解" },
    { name: "客户比价严重", weight: 25, judgment: "客户消费前会多家比价吗？", description: "客户消费前习惯多家比较，价格敏感度高" },
    { name: "缺少客户锁定", weight: 20, judgment: "客户在你家消费后有多大粘性？", description: "缺少客户锁定机制，客户随时可以被竞品抢走" }
  ],
  solutionIds: ["sol_024","sol_025","sol_030"],
  todayTasks: [
    { task: "分析竞品最新策略和定价变化", duration: "45分钟", purpose: "掌握竞品动态" },
    { task: "强化会员体系，设计竞品难模仿的专属权益", duration: "1小时", purpose: "锁定核心客户" },
    { task: "设计1个创新服务项，保持差异化领先", duration: "1小时", purpose: "持续创新领跑" }
  ],
  weekPlan: [
    { day: 1, title: "竞品监控日", tasks: ["更新竞品策略和价格信息","分析竞品模仿你的哪些特色","制定应对策略"] },
    { day: 2, title: "客户锁定日", tasks: ["强化储值卡锁定客户","设计会员专属不可替代权益","提升客户离开成本"] },
    { day: 3, title: "创新领先日", tasks: ["设计1个竞品没有的新服务","快速试制上线","保持差异化创新节奏"] },
    { day: 4, title: "口碑加固日", tasks: ["强化好评率和口碑传播","引导核心客户写深度好评","用口碑抵御低价竞争"] },
    { day: 5, title: "价值战日", tasks: ["停止跟价打价值战","强化服务品质和效果保障","让客户感受到价值而非低价"] },
    { day: 6, title: "老客深耕日", tasks: ["提升核心客户服务体验","设计老客专属升级服务","让核心客户成为口碑传播者"] },
    { day: 7, title: "复盘日", tasks: ["评估竞争策略效果","分析客户留存和新增","调整下阶段竞争重点"] }
  ],
  longTermAdvice: [
    "服务业竞争的终局是口碑+专业+客户关系，不是价格",
    "持续创新保持差异化领先，让竞品永远在追赶而非超越",
    "客户锁定是抗竞争的根本，储值+会员+专属权益三重锁定"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_005"],
  priority: 8
},

// path_79: COMPETITION - 服务业 - 老店
{
  _id: "path_79",
  problemCode: "COMPETITION",
  industry: "服务业",
  stage: "老店",
  symptomIds: ["sym_x01","sym_x04","sym_x05"],
  judgment: "你的老服务店面临新式连锁和精品工作室双向挤压，传统经营模式优势渐失",
  severity: 76,
  causes: [
    { name: "连锁品牌冲击", weight: 30, judgment: "连锁品牌有标准化和品牌优势，你怎么应对？", description: "新式连锁品牌凭借品牌+标准+规模优势抢走中端客群" },
    { name: "精品工作室分流", weight: 25, judgment: "独立精品工作室有个性化优势，高端客群被分流了吗？", description: "精品工作室用个性化服务分流高端客群" },
    { name: "服务模式老化", weight: 25, judgment: "你的服务方式和体验还停留在5年前吗？", description: "服务形式和空间体验老化，无法满足升级的消费需求" },
    { name: "技师流失严重", weight: 20, judgment: "核心技师被竞品挖走了吗？", description: "优秀技师流失到竞品，服务品质下降形成恶性循环" }
  ],
  solutionIds: ["sol_009","sol_025","sol_030"],
  todayTasks: [
    { task: "分析客群流失方向：去了连锁还是工作室？", duration: "45分钟", purpose: "明确竞争威胁来源" },
    { task: "确定差异化竞争策略：做连锁做不了的", duration: "1小时", purpose: "找到竞争支点" },
    { task: "设计核心技师留人和激励方案", duration: "30分钟", purpose: "稳住服务品质根基" }
  ],
  weekPlan: [
    { day: 1, title: "双向威胁分析日", tasks: ["分析连锁和工作室的分流程度","确定主要竞争威胁方向","制定差异化竞争策略"] },
    { day: 2, title: "差异化定位日", tasks: ["强化人情味和定制化服务","打造连锁做不了的温度感","发挥老店的在地信任优势"] },
    { day: 3, title: "服务升级日", tasks: ["更新服务空间和体验","引入新式服务手法和设备","保持传统内核升级外在体验"] },
    { day: 4, title: "人才保卫日", tasks: ["制定核心技师留人方案","提升薪酬和成长空间","建立师徒制传承机制"] },
    { day: 5, title: "口碑加固日", tasks: ["强化老客户口碑传播","设计老客推荐专属福利","用好多年积累的信任资产"] },
    { day: 6, title: "线上突围日", tasks: ["打造专业人设线上内容","发布技师故事和服务案例","吸引年轻客群关注"] },
    { day: 7, title: "复盘日", tasks: ["评估竞争策略效果","分析客群结构变化","调整下阶段竞争重点"] }
  ],
  longTermAdvice: [
    "老店的竞争武器是信任+温度+专业，这是连锁和工作室都不具备的组合",
    "稳住核心技师就是稳住服务品质，人才是服务业最大的资产",
    "传统内核+现代体验的融合，是老店焕新的正确打开方式"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_009"],
  priority: 8
},

// path_80: COMPETITION - all - all
{
  _id: "path_80",
  problemCode: "COMPETITION",
  industry: "all",
  stage: "all",
  symptomIds: ["sym_x01","sym_x02","sym_x04"],
  judgment: "你的门店面临激烈同质化竞争，缺乏差异化优势导致客户随时可能被竞品抢走",
  severity: 72,
  causes: [
    { name: "同质化严重", weight: 30, judgment: "你的产品/服务和竞品有多大同质化？客户能区分吗？", description: "与竞品高度同质化，客户没有必须选择你的理由" },
    { name: "缺少竞争壁垒", weight: 25, judgment: "你有什么是竞品短期内做不到或做不到这么好的？", description: "没有建立有效的竞争壁垒，优势容易被模仿" },
    { name: "客户忠诚度低", weight: 25, judgment: "客户是因为什么选你？换个更便宜的会跑吗？", description: "客户选择缺乏深层理由，忠诚度低容易被撬" },
    { name: "被动应对竞争", weight: 20, judgment: "是主动制定竞争策略还是被动应对？", description: "缺少主动竞争策略，总是在被动应对竞品动作" }
  ],
  solutionIds: ["sol_009","sol_025","sol_030"],
  todayTasks: [
    { task: "列出3个竞品和你的核心差异对比", duration: "45分钟", purpose: "明确差异化现状" },
    { task: "确定1个可以建立壁垒的差异化方向", duration: "1小时", purpose: "选择竞争策略" },
    { task: "设计1个竞品难模仿的客户锁定机制", duration: "30分钟", purpose: "建立护城河" }
  ],
  weekPlan: [
    { day: 1, title: "竞争诊断日", tasks: ["全面分析竞品优劣势","识别自身差异化机会","确定竞争策略方向"] },
    { day: 2, title: "差异化打造日", tasks: ["强化1个核心差异化点","将差异化融入所有客户触点","让客户明确感知到差异"] },
    { day: 3, title: "壁垒构建日", tasks: ["建立客户锁定机制","强化会员或储值体系","提升客户转换成本"] },
    { day: 4, title: "价值提升日", tasks: ["用增值服务替代价格竞争","强化品质和体验差异化","让客户感受到不可替代的价值"] },
    { day: 5, title: "口碑加固日", tasks: ["强化好评率和口碑传播","引导客户分享差异化体验","用口碑抵御同质化竞争"] },
    { day: 6, title: "竞品监控日", tasks: ["持续跟踪竞品动态","分析竞品策略变化","及时调整应对方案"] },
    { day: 7, title: "复盘日", tasks: ["评估竞争策略效果","分析客户留存数据","优化下阶段竞争计划"] }
  ],
  longTermAdvice: [
    "差异化是竞争的万能钥匙，找到并持续强化你的独特价值",
    "客户锁定比获新客更重要，会员储值是最有效的锁客工具",
    "从被动应对到主动竞争，定期review竞品动态并调整策略"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_009"],
  priority: 7
},

// ---- 补充路径：其他问题（行业×阶段组合）----

// path_81: TRAFFIC_LOW - 餐饮 - 新店
{
  _id: "path_81",
  problemCode: "TRAFFIC_LOW",
  industry: "餐饮",
  stage: "新店",
  symptomIds: ["sym_t01","sym_t02","sym_t05"],
  judgment: "你的新开餐饮店周边无人知晓，门头辨识度低且缺少开业引流爆发力",
  severity: 78,
  causes: [
    { name: "开业声量不足", weight: 35, judgment: "开业活动力度够吗？周边有多少人知道？", description: "开业引流力度不够，错失了最佳曝光窗口" },
    { name: "门头品类不清", weight: 30, judgment: "3秒内路人能看出你卖什么吗？", description: "门头信息不清晰，路人无法快速判断品类" },
    { name: "周边渗透为零", weight: 20, judgment: "做过任何周边推广吗？", description: "完全没有周边社区推广动作，认知度接近零" },
    { name: "线上未铺设", weight: 15, judgment: "在大众点评能搜到你吗？", description: "线上平台未认领和运营，搜索不到店铺信息" }
  ],
  solutionIds: ["sol_001","sol_003","sol_027"],
  todayTasks: [
    { task: "检查门头是否3秒内能传达品类和招牌菜", duration: "30分钟", purpose: "优化门头辨识度" },
    { task: "策划一个强力开业引流活动方案", duration: "1小时", purpose: "规划引流爆发" },
    { task: "认领大众点评门店并完善信息", duration: "30分钟", purpose: "建立线上基础" }
  ],
  weekPlan: [
    { day: 1, title: "门头优化日", tasks: ["增加品类标识横幅","门口放招牌菜立牌","确保晚间灯光醒目"] },
    { day: 2, title: "开业引爆日", tasks: ["执行强力引流活动","周边500米密集派单","进3个业主群发开业信息"] },
    { day: 3, title: "线上铺设日", tasks: ["完善所有线上平台信息","发布开业优惠内容","邀请本地美食博主探店"] },
    { day: 4, title: "种子客户日", tasks: ["深度服务首批到店客户","引导好评和分享","收集产品和体验反馈"] },
    { day: 5, title: "引流品上线日", tasks: ["推出引流特价菜","制作宣传物料","员工推荐话术培训"] },
    { day: 6, title: "内容生产日", tasks: ["拍摄3条短视频素材","发布探店和引流内容","回复线上所有评价"] },
    { day: 7, title: "复盘日", tasks: ["统计本周到店人数和来源","分析引流品转化率","制定第二周引流计划"] }
  ],
  longTermAdvice: [
    "新店前3个月必须持续高频引流，每周至少1次到店活动",
    "门头3秒原则：路人3秒内能看出品类+招牌菜",
    "线上平台是免费流量入口，必须第一时间完善和运营"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_003"],
  priority: 8
},

// path_82: TRAFFIC_LOW - 零售 - 老店
{
  _id: "path_82",
  problemCode: "TRAFFIC_LOW",
  industry: "零售",
  stage: "老店",
  symptomIds: ["sym_t01","sym_t04","sym_t06"],
  judgment: "你的老零售店客流萎缩严重，品牌老化且线上到店链路断裂，急需焕新引流",
  severity: 73,
  causes: [
    { name: "品牌形象老化", weight: 30, judgment: "门店形象多久没更新了？看起来过时吗？", description: "门店装修和品牌形象老化，对新一代客户缺乏吸引力" },
    { name: "线上到店链路断", weight: 25, judgment: "线上能看到你的店吗？有引导到店的设计吗？", description: "线上缺少到店引导，看了也无法方便到店消费" },
    { name: "缺少新鲜理由", weight: 25, judgment: "老客户还有什么理由再来？", description: "长期缺少新鲜元素，老客户消费疲劳新客户不感兴趣" },
    { name: "周边商圈变迁", weight: 20, judgment: "周边人流这些年有变化吗？", description: "周边商圈人流变迁，但门店没有跟进调整" }
  ],
  solutionIds: ["sol_001","sol_005","sol_027"],
  todayTasks: [
    { task: "拍摄门店现状照片客观评估老化程度", duration: "30分钟", purpose: "诊断品牌老化" },
    { task: "设计1个主题焕新活动制造话题", duration: "1小时", purpose: "制造新鲜感" },
    { task: "开通线上到店功能（小程序/社群预订）", duration: "1小时", purpose: "修复到店链路" }
  ],
  weekPlan: [
    { day: 1, title: "焕新规划日", tasks: ["制定门店视觉焕新计划","确定主题焕新活动方案","规划焕新排期和预算"] },
    { day: 2, title: "视觉升级日", tasks: ["更换关键视觉元素","优化橱窗陈列","提升灯光和氛围"] },
    { day: 3, title: "线上修复日", tasks: ["完善线上平台信息","开通到店功能","发布焕新内容"] },
    { day: 4, title: "活动策划日", tasks: ["设计主题焕新活动","制作活动物料","活动预热推广"] },
    { day: 5, title: "活动执行日", tasks: ["执行焕新活动","引导客户关注和入群","收集客户反馈"] },
    { day: 6, title: "老客激活日", tasks: ["通知老客户门店焕新","设计老客回归优惠","激活沉睡客户"] },
    { day: 7, title: "复盘日", tasks: ["统计焕新后客流变化","分析活动效果","制定持续焕新计划"] }
  ],
  longTermAdvice: [
    "老店每2-3年需要一次视觉焕新，保持对新一代客户的吸引力",
    "线上到店链路是命脉，必须打通从种草到到店的完整路径",
    "定期给老客户新鲜理由回来，每月至少1次主题更新"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_001","tool_002"],
  priority: 8
},

// path_83: TRAFFIC_LOW - 服务业 - 成长期
{
  _id: "path_83",
  problemCode: "TRAFFIC_LOW",
  industry: "服务业",
  stage: "成长期",
  symptomIds: ["sym_t01","sym_t04","sym_t06"],
  judgment: "你的成长期服务门店线上引流转化率低，缺少可复制的获客渠道导致增长停滞",
  severity: 70,
  causes: [
    { name: "线上转化率低", weight: 30, judgment: "线上有曝光吗？看到的人有多少实际到店？", description: "有一定线上曝光但到店转化率低，缺少转化引导设计" },
    { name: "获客渠道单一", weight: 25, judgment: "新客主要来自哪个渠道？过度依赖吗？", description: "获客渠道单一，一旦该渠道效果下降就陷入增长瓶颈" },
    { name: "缺少转化诱饵", weight: 25, judgment: "线上看到你的客户有强理由到店吗？", description: "缺少到店转化诱饵，客户看了不行动" },
    { name: "时段利用不均", weight: 20, judgment: "闲时大量空档？高峰又排不下？", description: "时段利用不均衡，整体产能利用率低" }
  ],
  solutionIds: ["sol_002","sol_006","sol_027"],
  todayTasks: [
    { task: "分析各渠道获客数据和转化率", duration: "45分钟", purpose: "诊断渠道效率" },
    { task: "设计1个强力的到店转化诱饵（限时体验价）", duration: "30分钟", purpose: "提升转化率" },
    { task: "列出3个未尝试的潜在获客渠道", duration: "30分钟", purpose: "拓展渠道" }
  ],
  weekPlan: [
    { day: 1, title: "渠道审计日", tasks: ["完成各渠道数据分析","标记高效和低效渠道","制定渠道多元化计划"] },
    { day: 2, title: "转化优化日", tasks: ["设计到店转化诱饵","优化线上到店引导链路","增加预约和咨询入口"] },
    { day: 3, title: "新渠道测试日", tasks: ["测试2个新获客渠道","追踪新渠道数据","评估获客成本"] },
    { day: 4, title: "闲时运营日", tasks: ["设计闲时特惠引流","优化时段利用率","闲时增加体验活动"] },
    { day: 5, title: "内容引流日", tasks: ["发布高质量种草内容","增加线上互动引导","设计内容到店转化路径"] },
    { day: 6, title: "异业合作日", tasks: ["联系3家互补商家","设计互推合作方案","启动联合引流"] },
    { day: 7, title: "复盘日", tasks: ["统计各渠道新增到店数","计算各渠道获客成本","优化渠道投入分配"] }
  ],
  longTermAdvice: [
    "构建3个以上稳定获客渠道，任一渠道占比不超过40%",
    "线上到店转化率目标8%以上，关键是设计强转化诱饵",
    "闲时利用率提升到70%以上，配合高峰形成全时段营收"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_001","tool_004"],
  priority: 8
},

// path_84: TRAFFIC_LOW - 餐饮 - 成长期
{
  _id: "path_84",
  problemCode: "TRAFFIC_LOW",
  industry: "餐饮",
  stage: "成长期",
  symptomIds: ["sym_t01","sym_t04","sym_t06"],
  judgment: "你的成长期餐饮门店客流增长遇瓶颈，线上引流效率低且渠道过于单一",
  severity: 69,
  causes: [
    { name: "渠道过于单一", weight: 35, judgment: "新客主要来自哪里？过度依赖大众点评吗？", description: "获客渠道集中在一个平台，抗风险能力弱" },
    { name: "线上转化低", weight: 25, judgment: "线上曝光到实际到店转化率多少？", description: "线上有曝光但缺少有效到店转化设计" },
    { name: "缺少裂变获客", weight: 20, judgment: "老客推荐带来多少新客？有推荐机制吗？", description: "没有利用老客推荐裂变，浪费最经济的获客方式" },
    { name: "内容吸引力弱", weight: 20, judgment: "发布的内容有人看有人来吗？", description: "线上内容缺少吸引力，曝光量大但互动和转化少" }
  ],
  solutionIds: ["sol_001","sol_012","sol_027"],
  todayTasks: [
    { task: "统计各渠道新客占比，识别过度依赖渠道", duration: "30分钟", purpose: "诊断渠道风险" },
    { task: "启动老客推荐奖励计划", duration: "30分钟", purpose: "启动裂变获客" },
    { task: "提升内容质量，学习1个高赞同行内容", duration: "1小时", purpose: "提升内容获客力" }
  ],
  weekPlan: [
    { day: 1, title: "渠道多元化日", tasks: ["分析渠道风险和机会","制定渠道拓展计划","测试1个新渠道"] },
    { day: 2, title: "内容升级日", tasks: ["学习高赞内容创作技巧","提升拍摄和剪辑质量","制定内容发布日历"] },
    { day: 3, title: "裂变启动日", tasks: ["设计推荐奖励规则","制作推荐码和海报","向活跃客户发布推荐计划"] },
    { day: 4, title: "转化优化日", tasks: ["优化线上到店引导","增加预约和到店诱饵","提升转化率"] },
    { day: 5, title: "异业引流日", tasks: ["联系3家互补商家","设计互推方案","启动合作引流"] },
    { day: 6, title: "活动引流日", tasks: ["策划1个线上引流到店活动","全渠道推送","追踪活动效果"] },
    { day: 7, title: "复盘日", tasks: ["统计各渠道新增客流","计算裂变获客效果","优化渠道投入分配"] }
  ],
  longTermAdvice: [
    "渠道多元化是抗风险的根本，至少3个稳定获客渠道",
    "内容获客+老客裂变+异业合作三管齐下打破增长瓶颈",
    "每周至少3条高质量内容+1次引流活动，持续获客不间断"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_003"],
  priority: 8
},

// path_85: TRAFFIC_LOW - 服务业 - 新店
{
  _id: "path_85",
  problemCode: "TRAFFIC_LOW",
  industry: "服务业",
  stage: "新店",
  symptomIds: ["sym_t01","sym_t02","sym_t03"],
  judgment: "你的新开服务门店信任壁垒高且体验不可见，路人不敢进店尝试",
  severity: 71,
  causes: [
    { name: "服务体验不可见", weight: 35, judgment: "路人能看到你的服务过程和效果吗？", description: "服务天然不可见，路人无法判断品质不敢进店" },
    { name: "零信任积累", weight: 25, judgment: "没有任何好评和案例展示吗？", description: "新店零信任积累，客户决策风险高" },
    { name: "首单门槛过高", weight: 25, judgment: "第一次体验需要付全价吗？有体验价吗？", description: "缺少体验价入口，首单决策门槛过高" },
    { name: "门面信息不清", weight: 15, judgment: "门面能看出做什么服务吗？效果如何展示？", description: "门面信息不清晰，无法传达服务内容和品质" }
  ],
  solutionIds: ["sol_002","sol_006","sol_027"],
  todayTasks: [
    { task: "在门面增加服务项目和效果展示", duration: "1小时", purpose: "让服务被看见" },
    { task: "设计新客体验套餐（正常价3折）", duration: "30分钟", purpose: "降低首单门槛" },
    { task: "准备3个案例用于线上展示和门面陈列", duration: "1小时", purpose: "建立信任素材" }
  ],
  weekPlan: [
    { day: 1, title: "可视化日", tasks: ["门面增加效果展示","设置服务过程可视窗口","让路人能感知服务品质"] },
    { day: 2, title: "体验价上线日", tasks: ["确定体验套餐和定价","制作体验卡和物料","设计体验流程话术"] },
    { day: 3, title: "案例展示日", tasks: ["整理服务前后对比案例","制作案例展示墙/册","线上发布案例内容"] },
    { day: 4, title: "开业引流日", tasks: ["设计强力开业体验活动","周边密集推广","邀请目标客群免费体验"] },
    { day: 5, title: "线上铺设日", tasks: ["完善大众点评信息","发布首批种草内容","开通预约功能"] },
    { day: 6, title: "异业引流日", tasks: ["联系互补商家谈互推","设计联合服务方案","启动首批合作引流"] },
    { day: 7, title: "复盘日", tasks: ["统计体验客户到店数","分析转化率","优化下周引流策略"] }
  ],
  longTermAdvice: [
    "让看不见的服务被看见，这是服务行业获客的第一步",
    "体验价+效果保障+案例展示三管齐下突破信任壁垒",
    "前3个月全力积累好评和案例，信任是服务行业的命脉"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_001","tool_004"],
  priority: 8
},

// path_86: REVENUE_DROP - 餐饮 - 老店
{
  _id: "path_86",
  problemCode: "REVENUE_DROP",
  industry: "餐饮",
  stage: "老店",
  symptomIds: ["sym_r01","sym_r02","sym_r04"],
  judgment: "你的老餐饮店营收持续下滑，菜品老化+促销依赖+客单价走低三重困境",
  severity: 76,
  causes: [
    { name: "菜品老化无新品拉动", weight: 30, judgment: "多久没上新菜了？新品对营收贡献多少？", description: "菜品长期不变，缺少新品拉动消费频次和金额" },
    { name: "促销依赖恶性循环", weight: 25, judgment: "不打折就没客人？促销效果越来越差？", description: "长期依赖促销，不打折客户不来，促销效果递减" },
    { name: "客单价持续走低", weight: 25, judgment: "人均消费同比是升还是降？", description: "客单价同比持续下降，消费升级做不上去" },
    { name: "外卖运营粗放", weight: 20, judgment: "外卖营收占比和利润率多少？", description: "外卖渠道运营粗放，增收效果有限且利润率低" }
  ],
  solutionIds: ["sol_004","sol_007","sol_023"],
  todayTasks: [
    { task: "分析近6个月客单价和营收趋势", duration: "30分钟", purpose: "量化营收下滑" },
    { task: "设计2个提升客单价的组合套餐", duration: "1小时", purpose: "拉升消费金额" },
    { task: "制定菜品更新计划（淘汰3旧上新2）", duration: "45分钟", purpose: "注入增长动力" }
  ],
  weekPlan: [
    { day: 1, title: "数据诊断日", tasks: ["分析客单价和品类贡献","识别下滑关键因素","制定增收策略方向"] },
    { day: 2, title: "菜品焕新日", tasks: ["淘汰3道末位菜品","上线2道新菜品","菜单重新排版"] },
    { day: 3, title: "客单提升日", tasks: ["上线组合套餐","培训员工推套餐话术","设计加购推荐"] },
    { day: 4, title: "促销转型日", tasks: ["减少打折型促销","增加增值型活动","用会员权益替代打折"] },
    { day: 5, title: "外卖优化日", tasks: ["优化外卖菜单和定价","设置满减和配送策略","提升外卖利润率"] },
    { day: 6, title: "会员运营日", tasks: ["强化储值锁定客户","设计会员专享非价格权益","提升会员复购频次"] },
    { day: 7, title: "复盘日", tasks: ["统计套餐和客单价数据","分析菜品更新效果","调整下月营收策略"] }
  ],
  longTermAdvice: [
    "从打折驱动转为价值驱动，用套餐和增值提升客单价",
    "每季度更新菜品保持新鲜感，新品贡献营收目标15%以上",
    "储值锁客+外卖增量双线并行，稳定和扩大营收基础"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_005","tool_009"],
  priority: 8
},

// path_87: REVENUE_DROP - 零售 - 新店
{
  _id: "path_87",
  problemCode: "REVENUE_DROP",
  industry: "零售",
  stage: "新店",
  symptomIds: ["sym_r01","sym_r02","sym_r05"],
  judgment: "你的新开零售店选品未经验证导致连带率低，营收远未达到预期水平",
  severity: 67,
  causes: [
    { name: "选品验证不足", weight: 30, judgment: "首批选品是根据数据还是感觉？", description: "选品未经验证，部分品类不受目标客群欢迎" },
    { name: "连带率极低", weight: 25, judgment: "平均每单含几件商品？有做关联陈列吗？", description: "缺少关联陈列和连带推荐，客户买一件就走" },
    { name: "定价策略失当", weight: 25, judgment: "定价有做过A/B测试吗？有价格弹性分析吗？", description: "定价缺少测试和优化，部分品类定价不合理影响转化" },
    { name: "促销缺少体系", weight: 20, judgment: "促销是随意的还是系统策划的？", description: "促销缺少系统策划，随机打折效果差且伤害价值感" }
  ],
  solutionIds: ["sol_004","sol_008","sol_023"],
  todayTasks: [
    { task: "统计各品类连带率和客单价", duration: "30分钟", purpose: "诊断连带问题" },
    { task: "设计3组关联陈列方案提升连带", duration: "1小时", purpose: "提升连带率" },
    { task: "制定系统促销日历替代随机打折", duration: "30分钟", purpose: "规范促销体系" }
  ],
  weekPlan: [
    { day: 1, title: "连带诊断日", tasks: ["完成连带率和客单价分析","标记低连带品类","设计关联陈列方案"] },
    { day: 2, title: "陈列优化日", tasks: ["实施关联陈列","增加场景化展示区","优化动线引导增加接触面"] },
    { day: 3, title: "定价测试日", tasks: ["选取3个品类做价格测试","设置不同价格看转化","记录数据找最优价格"] },
    { day: 4, title: "促销体系日", tasks: ["制定月度促销日历","设计非打折型活动","用会员权益替代随意打折"] },
    { day: 5, title: "员工培训日", tasks: ["培训连带推荐话术","培训关联产品知识","考核和激励设置"] },
    { day: 6, title: "会员启动日", tasks: ["建立会员体系","设计入会福利","引导到店客户注册"] },
    { day: 7, title: "复盘日", tasks: ["统计连带率和客单价变化","评估促销效果","制定下周优化方向"] }
  ],
  longTermAdvice: [
    "关联陈列+连带推荐是提升零售营收的基本功，连带率目标2.0以上",
    "用数据驱动定价和选品决策，少凭感觉多看数字",
    "建立系统促销日历，告别随机打折"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_88: REVENUE_DROP - 服务业 - 成长期
{
  _id: "path_88",
  problemCode: "REVENUE_DROP",
  industry: "服务业",
  stage: "成长期",
  symptomIds: ["sym_r01","sym_r03","sym_r05"],
  judgment: "你的成长期服务门店营收增长遇瓶颈，服务项目单一且客户生命周期价值低",
  severity: 71,
  causes: [
    { name: "项目单一限制营收天花板", weight: 30, judgment: "客户到店消费几种服务？有没有升级和加购设计？", description: "服务项目少且缺少升级设计，客单和消费频次都上不去" },
    { name: "客户生命周期短", weight: 25, judgment: "客户平均消费几次后流失？LTV是多少？", description: "客户生命周期短，消费1-2次就流失，LTV低" },
    { name: "闲时产能浪费", weight: 25, judgment: "非高峰时段利用率多高？", description: "非高峰时段大量产能闲置，错失营收增量" },
    { name: "缺少储值锁定", weight: 20, judgment: "储值客户占比多少？", description: "缺少储值卡锁定长期消费，客户随时可走" }
  ],
  solutionIds: ["sol_006","sol_008","sol_024"],
  todayTasks: [
    { task: "分析各项目营收贡献和客户消费频次", duration: "45分钟", purpose: "诊断营收结构" },
    { task: "设计基础→进阶→尊享三级服务阶梯", duration: "1小时", purpose: "延长客户价值链" },
    { task: "制定闲时特惠方案填充产能空档", duration: "30分钟", purpose: "提升时段利用" }
  ],
  weekPlan: [
    { day: 1, title: "营收结构日", tasks: ["分析各项目营收和利润贡献","计算客户平均LTV","识别营收增长瓶颈"] },
    { day: 2, title: "服务升级日", tasks: ["设计三级服务阶梯","制定升级内容和定价","编写升级推荐话术"] },
    { day: 3, title: "闲时运营日", tasks: ["设计闲时特惠方案","社群发布闲时优惠","预约系统设置闲时折扣"] },
    { day: 4, title: "储值体系日", tasks: ["设计储值卡方案","制定储值专属权益","启动储值推广"] },
    { day: 5, title: "增值服务日", tasks: ["设计1-2个增值加购服务","培训增值推荐话术","设置加购激励机制"] },
    { day: 6, title: "培训考核日", tasks: ["培训升级和加购话术","情景模拟演练","考核和上岗认证"] },
    { day: 7, title: "复盘日", tasks: ["统计升级和加购数据","分析闲时利用率变化","评估储值转化效果"] }
  ],
  longTermAdvice: [
    "构建基础→进阶→尊享三级服务，延长客户生命周期提升LTV",
    "闲时利用率提升到70%以上，最大化产能变现",
    "储值卡是最强的营收稳定器，目标储值客户占比40%以上"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_005"],
  priority: 8
},

// path_89: REVENUE_DROP - 餐饮 - 成长期
{
  _id: "path_89",
  problemCode: "REVENUE_DROP",
  industry: "餐饮",
  stage: "成长期",
  symptomIds: ["sym_r01","sym_r03","sym_r04"],
  judgment: "你的成长期餐饮门店高峰产能不足且外卖增量未释放，营收增长受限",
  severity: 72,
  causes: [
    { name: "高峰翻台瓶颈", weight: 30, judgment: "午晚高峰翻台率是多少？排队流失多少？", description: "高峰期翻台率遇瓶颈，排队流失客户营收上不去" },
    { name: "外卖增量未释放", weight: 25, judgment: "外卖营收占比多少？有系统运营吗？", description: "外卖渠道未系统运营，缺少重要的增量收入来源" },
    { name: "套餐设计缺失", weight: 25, judgment: "有组合套餐提升客单价吗？", description: "缺少套餐设计，客单价无法有效提升" },
    { name: "非餐收入为零", weight: 20, judgment: "有零售周边产品或饮品收入吗？", description: "没有开发饮品、零售周边等非餐收入来源" }
  ],
  solutionIds: ["sol_004","sol_007","sol_014"],
  todayTasks: [
    { task: "统计高峰期翻台率和排队流失数据", duration: "30分钟", purpose: "诊断产能瓶颈" },
    { task: "设计2-3个高毛利组合套餐", duration: "1小时", purpose: "拉升客单价" },
    { task: "检查外卖店铺状态，制定优化方案", duration: "30分钟", purpose: "释放外卖增量" }
  ],
  weekPlan: [
    { day: 1, title: "产能优化日", tasks: ["优化出餐流程提速","调整高峰排班","减少翻台间隔时间"] },
    { day: 2, title: "套餐上线日", tasks: ["确定套餐定价和内容","收银系统设置套餐","员工推套餐话术培训"] },
    { day: 3, title: "外卖优化日", tasks: ["优化外卖菜品结构","调整外卖定价和满减","提升外卖评分和曝光"] },
    { day: 4, title: "饮品开发日", tasks: ["增加2-3款特色饮品","饮品毛利通常70%以上","设置餐+饮套餐组合"] },
    { day: 5, title: "效率提升日", tasks: ["优化后厨动线","减少点餐到出餐时间","提升整体服务效率"] },
    { day: 6, title: "培训日", tasks: ["培训套餐和加饮推荐话术","模拟演练和考核","设置连带销售激励"] },
    { day: 7, title: "复盘日", tasks: ["统计套餐销售和客单价变化","分析外卖增量效果","评估产能利用率"] }
  ],
  longTermAdvice: [
    "堂食+外卖双轮驱动，外卖营收占比目标30%以上",
    "套餐+饮品是提升客单价的双引擎，客单价提升15%目标",
    "高峰效率决定营收天花板，持续优化翻台率"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_001","tool_005"],
  priority: 8
},

// path_90: REVENUE_DROP - 零售 - 老店
{
  _id: "path_90",
  problemCode: "REVENUE_DROP",
  industry: "零售",
  stage: "老店",
  symptomIds: ["sym_r01","sym_r02","sym_r04"],
  judgment: "你的老零售店品类老化促销疲劳，会员贡献率低且淡旺季波动剧烈",
  severity: 74,
  causes: [
    { name: "品类结构固化", weight: 30, judgment: "多久没做过品类大调整了？后20%品类贡献多少营收？", description: "品类结构长期固化，缺少新爆款拉动消费" },
    { name: "促销疲劳效应", weight: 25, judgment: "促销越来越不灵了？客户对打折麻木了吗？", description: "长期促销导致客户对折扣麻木，不促销就不买" },
    { name: "会员体系失效", weight: 25, judgment: "会员消费占总营收多少？会员客单比非会员高吗？", description: "会员体系形同虚设，会员与非会员消费差异不大" },
    { name: "淡季无对策", weight: 20, judgment: "淡季营收比旺季低多少？有淡季经营方案吗？", description: "缺少淡季专项经营方案，营收波动剧烈" }
  ],
  solutionIds: ["sol_004","sol_008","sol_024"],
  todayTasks: [
    { task: "分析品类销售排名，标记需淘汰和需引进的", duration: "45分钟", purpose: "诊断品类问题" },
    { task: "重新设计会员权益，拉开会员与非会员差异", duration: "1小时", purpose: "激活会员价值" },
    { task: "制定淡季专项经营方案", duration: "30分钟", purpose: "平滑营收波动" }
  ],
  weekPlan: [
    { day: 1, title: "品类调整日", tasks: ["淘汰后20%低贡献品类","规划新品类引进","释放陈列和资金空间"] },
    { day: 2, title: "会员重塑日", tasks: ["重新设计会员权益体系","拉开会员与非会员价差","设计会员积分和等级"] },
    { day: 3, title: "促销转型日", tasks: ["减少打折型促销","增加体验型和会员型活动","用价值替代折扣"] },
    { day: 4, title: "淡季方案日", tasks: ["设计淡季引流活动","规划淡季品类调整","制定淡季成本控制方案"] },
    { day: 5, title: "新品引入日", tasks: ["引进3-5款新爆款候选","小量试销追踪数据","员工新品知识培训"] },
    { day: 6, title: "陈列优化日", tasks: ["按销售贡献重分配陈列面","增加场景化展示","优化动线增加连带"] },
    { day: 7, title: "复盘日", tasks: ["评估品类和会员调整效果","分析促销转型进展","制定下月经营计划"] }
  ],
  longTermAdvice: [
    "建立品类月度复盘机制，持续汰换保持选品活力",
    "会员体系要真正拉开差异，让会员感受到专属价值",
    "淡季要有专项方案，目标淡季营收不低于旺季的60%"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_91: PROFIT_LOW - 餐饮 - 新店
{
  _id: "path_91",
  problemCode: "PROFIT_LOW",
  industry: "餐饮",
  stage: "新店",
  symptomIds: ["sym_p01","sym_p02","sym_p04"],
  judgment: "你的新开餐饮店房租和人工占比过高，加上食材损耗大，开业即亏损",
  severity: 76,
  causes: [
    { name: "房租占比过高", weight: 30, judgment: "房租占营收比多少？超过25%了吗？", description: "房租压力过大，在营收未达预期时直接导致亏损" },
    { name: "人工效率低下", weight: 25, judgment: "人效是多少？员工配置合理吗？", description: "新店人员配置不合理，人效低人工成本占比超35%" },
    { name: "食材损耗严重", weight: 25, judgment: "食材损耗率多少？有标准化备料吗？", description: "缺少标准化备料和库存管理，食材损耗率高达15%以上" },
    { name: "毛利结构不合理", weight: 20, judgment: "高毛利菜品占比多少？整体毛利率达标吗？", description: "菜品毛利结构不合理，低毛利品占比过高" }
  ],
  solutionIds: ["sol_010","sol_011","sol_021"],
  todayTasks: [
    { task: "计算房租/人工/食材占营收比，找出最大漏水点", duration: "30分钟", purpose: "明确成本结构" },
    { task: "制定标准化备料SOP降低食材损耗", duration: "1小时", purpose: "控制食材成本" },
    { task: "调整菜品结构增加高毛利品占比", duration: "45分钟", purpose: "优化毛利结构" }
  ],
  weekPlan: [
    { day: 1, title: "成本拆解日", tasks: ["完成成本结构详细分析","标记最大漏水点","制定降本优先级"] },
    { day: 2, title: "食材管控日", tasks: ["制定标准化备料SOP","建立食材领用和盘点制度","设置损耗预警线"] },
    { day: 3, title: "人力优化日", tasks: ["优化排班减少冗余人力","一岗多能交叉培训","设置人效目标考核"] },
    { day: 4, title: "毛利优化日", tasks: ["调整菜品毛利结构","增加高毛利品占比","设计套餐提升整体毛利"] },
    { day: 5, title: "采购优化日", tasks: ["优化供应商比价","集中采购降低单价","建立采购审批制度"] },
    { day: 6, title: "浪费治理日", tasks: ["建立全链路减少浪费","设置能源消耗标准","培训全员成本意识"] },
    { day: 7, title: "复盘日", tasks: ["计算成本改善幅度","分析各项占比变化","制定下月降本目标"] }
  ],
  longTermAdvice: [
    "房租占比控制在20%以内，人工占比控制在30%以内，食材成本控制在35%以内",
    "标准化备料是控制食材损耗的关键，损耗率控制在5%以内",
    "新店前6个月是成本优化的黄金期，越早建立标准越早盈利"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 8
},

// path_92: PROFIT_LOW - 零售 - 成长期
{
  _id: "path_92",
  problemCode: "PROFIT_LOW",
  industry: "零售",
  stage: "成长期",
  symptomIds: ["sym_p01","sym_p03","sym_p05"],
  judgment: "你的成长期零售门店进货成本上升挤压毛利，坪效和人效偏低导致利润微薄",
  severity: 72,
  causes: [
    { name: "进货成本上升", weight: 30, judgment: "进货价同比上涨多少？有找替代供应商吗？", description: "进货成本持续上涨但售价未同步调整，毛利被挤压" },
    { name: "坪效偏低", weight: 25, judgment: "每平米月产出多少？有优化空间吗？", description: "空间利用率低，坪效低于行业平均水平" },
    { name: "人效不高", weight: 25, judgment: "人均月产出多少？员工配置合理吗？", description: "人员配置不合理或效率低，人效不达标" },
    { name: "损耗和浪费", weight: 20, judgment: "商品损耗率多少？有盘点差异吗？", description: "商品损耗、盘点差异和运营浪费侵蚀利润" }
  ],
  solutionIds: ["sol_010","sol_011","sol_015"],
  todayTasks: [
    { task: "分析各品类毛利率，找出毛利漏水点", duration: "45分钟", purpose: "诊断毛利结构" },
    { task: "联系3家替代供应商比价", duration: "1小时", purpose: "降低进货成本" },
    { task: "计算当前坪效和人效，设定提升目标", duration: "30分钟", purpose: "量化效率指标" }
  ],
  weekPlan: [
    { day: 1, title: "毛利诊断日", tasks: ["完成各品类毛利率分析","标记低于均值的品类","制定毛利提升方案"] },
    { day: 2, title: "采购优化日", tasks: ["完成供应商比价","切换或新增供应商","争取更优结算条件"] },
    { day: 3, title: "坪效提升日", tasks: ["优化陈列提升产出","减少低效区域","增加高产出品类面积"] },
    { day: 4, title: "人效提升日", tasks: ["优化排班减少冗余","一岗多能培训","设置人效考核指标"] },
    { day: 5, title: "损耗治理日", tasks: ["建立盘点制度","分析损耗原因","制定减损措施"] },
    { day: 6, title: "定价调整日", tasks: ["对低毛利品适当调价","设计组合促销保毛利","测试价格弹性"] },
    { day: 7, title: "复盘日", tasks: ["计算毛利改善幅度","分析坪效人效变化","制定下月利润目标"] }
  ],
  longTermAdvice: [
    "每季度review供应商和采购成本，持续优化供应链",
    "坪效和人效是零售利润的两大引擎，每月追踪改善",
    "损耗率控制在2%以内，建立严格的盘点和损耗管理制度"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 8
},

// path_93: PROFIT_LOW - 服务业 - 老店
{
  _id: "path_93",
  problemCode: "PROFIT_LOW",
  industry: "服务业",
  stage: "老店",
  symptomIds: ["sym_p01","sym_p04","sym_p05"],
  judgment: "你的老服务店人工成本占比过高，定价多年未调且闲时产能大量浪费",
  severity: 74,
  causes: [
    { name: "人工成本占比过高", weight: 30, judgment: "人工占营收比多少？超过40%了吗？", description: "人工成本是服务业最大支出，占比过高直接吞噬利润" },
    { name: "定价长期未调整", weight: 25, judgment: "服务定价多久没调了？成本上涨后有提价吗？", description: "定价多年未调整，成本上涨但售价不动，利润持续缩水" },
    { name: "闲时产能浪费", weight: 25, judgment: "闲时利用率多低？有多少时间在空等？", description: "非高峰时段大量产能闲置，直接影响利润率" },
    { name: "技师效率低", weight: 20, judgment: "技师日均服务几单？有效率考核吗？", description: "技师服务效率低，日均产出不达标" }
  ],
  solutionIds: ["sol_010","sol_011","sol_015"],
  todayTasks: [
    { task: "计算人工/房租/物料占营收比，找出最大成本项", duration: "30分钟", purpose: "明确成本结构" },
    { task: "设计分时段定价方案提升闲时利用率", duration: "1小时", purpose: "提升产能变现" },
    { task: "制定定价调整计划（分步小幅提价）", duration: "30分钟", purpose: "修复定价滞后" }
  ],
  weekPlan: [
    { day: 1, title: "成本拆解日", tasks: ["完成成本结构详细分析","标记最大漏水点","制定降本优先级"] },
    { day: 2, title: "定价调整日", tasks: ["设计分步提价方案","先调高毛利品价格","通知客户并做好解释"] },
    { day: 3, title: "闲时运营日", tasks: ["设计闲时优惠引流","提升闲时利用率","闲时增加体验活动"] },
    { day: 4, title: "人效优化日", tasks: ["优化排班减少闲置人力","设置技师效率考核","一岗多能交叉培训"] },
    { day: 5, title: "流程优化日", tasks: ["优化服务流程提效率","减少非服务时间浪费","设置服务时长标准"] },
    { day: 6, title: "成本管控日", tasks: ["建立成本月度review机制","设置各成本项预警线","培训全员成本意识"] },
    { day: 7, title: "复盘日", tasks: ["计算利润改善幅度","分析各成本项变化","制定下月利润目标"] }
  ],
  longTermAdvice: [
    "服务业人工占比控制在35%以内，通过效率和排班优化实现",
    "每半年评估一次定价，成本上涨必须传导到售价",
    "闲时利用率提升到70%以上，这是服务业利润提升的捷径"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 8
},

// path_94: PROFIT_LOW - 餐饮 - 老店
{
  _id: "path_94",
  problemCode: "PROFIT_LOW",
  industry: "餐饮",
  stage: "老店",
  symptomIds: ["sym_p01","sym_p03","sym_p05"],
  judgment: "你的老餐饮店食材成本和房租双重上涨，利润被两头挤压至亏损边缘",
  severity: 77,
  causes: [
    { name: "食材成本持续上涨", weight: 30, judgment: "食材成本占营收比多少？同比上涨多少？", description: "食材价格持续上涨，但菜品售价和结构未调整" },
    { name: "房租固定压力大", weight: 25, judgment: "房租占营收比多少？租约还有多久？", description: "房租占比过高且每年递增，营收下滑时压力更大" },
    { name: "浪费和损耗严重", weight: 25, judgment: "食材损耗率多少？后厨浪费严重吗？", description: "缺少精细化成本管理，浪费和损耗侵蚀利润" },
    { name: "毛利结构不合理", weight: 20, judgment: "高毛利品贡献率多少？有优化过毛利结构吗？", description: "菜品毛利结构不合理，低毛利品占比过高" }
  ],
  solutionIds: ["sol_010","sol_011","sol_021"],
  todayTasks: [
    { task: "核算各菜品毛利率，标记低于40%的菜品", duration: "45分钟", purpose: "诊断毛利结构" },
    { task: "优化3个高成本菜品的食材配比或替代", duration: "1小时", purpose: "降低食材成本" },
    { task: "建立后厨损耗追踪，找出最大浪费点", duration: "30分钟", purpose: "控制浪费" }
  ],
  weekPlan: [
    { day: 1, title: "成本拆解日", tasks: ["完成成本结构详细分析","标记各成本项占比和趋势","制定降本优先级"] },
    { day: 2, title: "食材降本日", tasks: ["优化高成本菜品配比","寻找替代食材降低成本","与供应商重新谈判价格"] },
    { day: 3, title: "毛利优化日", tasks: ["调整菜品毛利结构","增加高毛利品占比","低毛利品提价或优化配方"] },
    { day: 4, title: "损耗治理日", tasks: ["建立标准化备料减少损耗","设置损耗追踪和预警","后厨浪费专项治理"] },
    { day: 5, title: "定价调整日", tasks: ["对受成本上涨影响菜品调价","设计调价过渡方案","用套餐组合淡化单品涨价感知"] },
    { day: 6, title: "效率提升日", tasks: ["优化人力配置降人工成本","提升翻台率摊薄固定成本","减少非必要支出"] },
    { day: 7, title: "复盘日", tasks: ["计算毛利和利润改善","分析各成本项变化","制定下月利润目标"] }
  ],
  longTermAdvice: [
    "食材成本占比控制在30-35%，超标必须调整菜品或售价",
    "每季度review供应商和采购价格，持续优化供应链",
    "建立精细化成本管控体系，每项成本都有目标值和预警线"
  ],
  caseIds: ["case_004"],
  toolIds: ["tool_005","tool_006"],
  priority: 8
},

// path_95: CUSTOMER_LOSS - 餐饮 - 成长期
{
  _id: "path_95",
  problemCode: "CUSTOMER_LOSS",
  industry: "餐饮",
  stage: "成长期",
  symptomIds: ["sym_c01","sym_c02","sym_c05"],
  judgment: "你的成长期餐饮门店复购率走低且差评处理不力，老客户流失加速",
  severity: 73,
  causes: [
    { name: "复购率持续走低", weight: 30, judgment: "月复购率多少？趋势如何？", description: "老客户回头频次下降，复购率逐月走低" },
    { name: "差评处理不及时", weight: 25, judgment: "差评24小时内回复了吗？有改进跟进吗？", description: "差评处理不及时，负面口碑扩散加速客户流失" },
    { name: "缺少客户关怀", weight: 25, judgment: "有客户回访机制吗？消费后有跟进吗？", description: "缺少消费后的客户关怀和回访，客户感受不到重视" },
    { name: "会员权益无感", weight: 20, judgment: "会员享有什么权益？权益有吸引力吗？", description: "会员权益设计缺乏吸引力，无法有效留存客户" }
  ],
  solutionIds: ["sol_016","sol_020","sol_024"],
  todayTasks: [
    { task: "统计近3个月复购率和客户流失数据", duration: "30分钟", purpose: "量化流失程度" },
    { task: "制定差评24小时回复标准", duration: "30分钟", purpose: "止损差评扩散" },
    { task: "设计1个有吸引力的会员专属权益", duration: "1小时", purpose: "增强留存动力" }
  ],
  weekPlan: [
    { day: 1, title: "流失诊断日", tasks: ["分析复购率和流失趋势","标记高流失风险客户","识别流失主要原因"] },
    { day: 2, title: "口碑修复日", tasks: ["建立差评24h回复机制","主动联系差评客户补救","设计好评引导方案"] },
    { day: 3, title: "会员升级日", tasks: ["重新设计有吸引力的会员权益","拉开会员与非会员差异","设计会员专享活动"] },
    { day: 4, title: "客户关怀日", tasks: ["建立消费后回访机制","设计客户生日和节日关怀","设置流失预警和挽回"] },
    { day: 5, title: "储值锁客日", tasks: ["设计储值卡方案","储值客户享受更多权益","推广储值锁定长期消费"] },
    { day: 6, title: "社群运营日", tasks: ["建立门店客户社群","设计群内容和活动节奏","提升客户归属感"] },
    { day: 7, title: "复盘日", tasks: ["统计复购率变化","分析会员和储值转化","调整下月客户经营计划"] }
  ],
  longTermAdvice: [
    "复购率是餐饮的生命线，月复购率目标40%以上",
    "差评必须24小时内回复并改进，好评率目标95%以上",
    "储值+会员+社群三重锁定，让客户舍不得走"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_005","tool_009"],
  priority: 8
},

// path_96: CUSTOMER_LOSS - 零售 - 老店
{
  _id: "path_96",
  problemCode: "CUSTOMER_LOSS",
  industry: "零售",
  stage: "老店",
  symptomIds: ["sym_c01","sym_c02","sym_c04"],
  judgment: "你的老零售店老客户大量流失且转介绍率为零，客户资产持续贬值",
  severity: 75,
  causes: [
    { name: "老客流失严重", weight: 30, judgment: "3个月未消费的客户占比多少？", description: "大量老客户不再回头，客户基础持续萎缩" },
    { name: "转介绍率为零", weight: 25, judgment: "有客户主动推荐朋友来吗？有推荐机制吗？", description: "完全没有转介绍，说明客户满意度和忠诚度都不够" },
    { name: "会员体系失效", weight: 25, judgment: "会员活跃度多少？会员权益有感知吗？", description: "会员体系名存实亡，会员不活跃权益无感" },
    { name: "缺少情感连接", weight: 20, judgment: "和客户有情感联系吗？客户对你有归属感吗？", description: "纯粹交易关系，缺少情感连接，客户随时可替代" }
  ],
  solutionIds: ["sol_016","sol_020","sol_024"],
  todayTasks: [
    { task: "筛选3个月未消费的老客户名单", duration: "30分钟", purpose: "识别流失客户" },
    { task: "设计老客唤醒方案（专属优惠+新品通知）", duration: "1小时", purpose: "挽回流失客户" },
    { task: "重新设计会员权益和推荐奖励", duration: "1小时", purpose: "重建客户关系" }
  ],
  weekPlan: [
    { day: 1, title: "流失盘点日", tasks: ["完成客户流失分析","标记沉睡/流失/活跃客户","制定分层经营策略"] },
    { day: 2, title: "唤醒行动日", tasks: ["设计唤醒优惠和话术","分批联系沉睡客户","设置唤醒效果追踪"] },
    { day: 3, title: "会员重塑日", tasks: ["重新设计有感知的会员权益","拉开会员与非会员差异","设计会员专属体验"] },
    { day: 4, title: "推荐启动日", tasks: ["设计推荐奖励方案","制作推荐码和海报","向活跃客户推广推荐计划"] },
    { day: 5, title: "情感连接日", tasks: ["建立客户生日/节日关怀","设计客户专属活动","让客户感受到被重视"] },
    { day: 6, title: "社群建设日", tasks: ["建立门店客户社群","设计群内容和互动节奏","培养客户归属感"] },
    { day: 7, title: "复盘日", tasks: ["统计唤醒成功率","分析推荐转化数据","调整下月客户经营计划"] }
  ],
  longTermAdvice: [
    "客户是最大的资产，老店要像经营朋友一样经营客户关系",
    "推荐率是客户忠诚度的终极指标，目标15%以上",
    "储值+会员+社群+关怀四维锁定，让客户成为品牌的粉丝"
  ],
  caseIds: ["case_002"],
  toolIds: ["tool_002","tool_005"],
  priority: 8
},

// path_97: CUSTOMER_LOSS - 服务业 - 新店
{
  _id: "path_97",
  problemCode: "CUSTOMER_LOSS",
  industry: "服务业",
  stage: "新店",
  symptomIds: ["sym_c01","sym_c03","sym_c05"],
  judgment: "你的新开服务门店缺少客户回访和关怀机制，首单客户大量流失无复购",
  severity: 70,
  causes: [
    { name: "无回访机制", weight: 30, judgment: "客户消费后有跟进吗？有了解满意度吗？", description: "缺少消费后回访，不知道客户是否满意，也无法引导复购" },
    { name: "首单流失率高", weight: 25, judgment: "首单客户有多少会第二次来？", description: "首单客户体验后不回头，流失率高" },
    { name: "服务质量不稳定", weight: 25, judgment: "每次服务品质一致吗？有客户投诉吗？", description: "新店服务品质不稳定，客户体验参差不齐" },
    { name: "缺少留存设计", weight: 20, judgment: "有会员卡、储值卡或套餐卡吗？", description: "缺少任何客户留存机制，消费完就走无联系" }
  ],
  solutionIds: ["sol_016","sol_020","sol_024"],
  todayTasks: [
    { task: "设计消费后24小时回访话术和流程", duration: "30分钟", purpose: "建立回访机制" },
    { task: "制定服务质量标准化SOP", duration: "1小时", purpose: "稳定服务品质" },
    { task: "设计储值卡/次卡锁定客户复购", duration: "1小时", purpose: "建立留存机制" }
  ],
  weekPlan: [
    { day: 1, title: "回访建设日", tasks: ["设计回访话术和时机","培训员工回访技巧","建立客户满意度追踪"] },
    { day: 2, title: "品质标准日", tasks: ["制定服务标准SOP","培训全员统一标准","建立品质抽检机制"] },
    { day: 3, title: "留存设计日", tasks: ["设计储值卡/次卡方案","制定留存权益","设置首单转复购引导"] },
    { day: 4, title: "会员体系日", tasks: ["建立会员等级和权益","设计升级路径","会员专属服务设计"] },
    { day: 5, title: "关怀机制日", tasks: ["设计客户生日关怀","消费满额感谢和回访","差评快速响应机制"] },
    { day: 6, title: "社群运营日", tasks: ["建立客户社群","设计群内容和福利","引导客户入群"] },
    { day: 7, title: "复盘日", tasks: ["统计首单复购率","分析回访和留存效果","调整下周运营节奏"] }
  ],
  longTermAdvice: [
    "服务业的复购率决定生存，首单转复购率目标50%以上",
    "消费后24小时回访是新店留客的标配动作",
    "储值/次卡是最直接的留存工具，新店必须第一时间推出"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_003","tool_005"],
  priority: 8
},

// path_98: CUSTOMER_LOSS - 餐饮 - 新店
{
  _id: "path_98",
  problemCode: "CUSTOMER_LOSS",
  industry: "餐饮",
  stage: "新店",
  symptomIds: ["sym_c01","sym_c03","sym_c05"],
  judgment: "你的新开餐饮店缺少客户留存设计，顾客吃完就走无法形成回头习惯",
  severity: 68,
  causes: [
    { name: "无留存机制", weight: 35, judgment: "有会员卡、关注有礼、加群福利吗？", description: "缺少任何客户留存机制，客户消费完就失联" },
    { name: "缺少复购理由", weight: 25, judgment: "客户有什么理由再来？招牌菜？特别体验？", description: "没有打造出让客户想再来的理由" },
    { name: "服务无记忆点", weight: 25, judgment: "客户对你的服务有印象吗？", description: "服务缺乏特色和记忆点，吃完就忘" },
    { name: "无客户触达渠道", weight: 15, judgment: "有客户联系方式吗？能主动联系他们吗？", description: "没有建立客户触达渠道，无法主动营销" }
  ],
  solutionIds: ["sol_016","sol_020","sol_024"],
  todayTasks: [
    { task: "设计关注有礼/加群福利引导客户留存", duration: "30分钟", purpose: "建立留存入口" },
    { task: "确定1个让客户想再来的理由（招牌菜/特色服务）", duration: "1小时", purpose: "打造复购理由" },
    { task: "设计储值卡方案锁定客户长期消费", duration: "30分钟", purpose: "锁客工具" }
  ],
  weekPlan: [
    { day: 1, title: "留存设计日", tasks: ["设计关注有礼/加群福利","制作留存引导物料","培训员工留存话术"] },
    { day: 2, title: "复购理由日", tasks: ["强化1个招牌菜或特色体验","制作复购诱饵设计","设置二次消费优惠"] },
    { day: 3, title: "储值推出日", tasks: ["确定储值卡方案和权益","制作储值卡物料","员工储值推荐话术培训"] },
    { day: 4, title: "社群建设日", tasks: ["建立客户社群","设计群专属内容和福利","引导到店客户入群"] },
    { day: 5, title: "服务记忆日", tasks: ["设计1个特色服务动作","让客户记住你的温度","服务差异化培训"] },
    { day: 6, title: "回访启动日", tasks: ["建立消费后回访机制","设置3天/7天回访节点","收集客户反馈并改进"] },
    { day: 7, title: "复盘日", tasks: ["统计留存转化率","分析储值和社群数据","调整下周留客策略"] }
  ],
  longTermAdvice: [
    "新店留客比获客更重要，每个到店客户都要引导留存",
    "招牌菜/特色体验+储值卡+社群是餐饮留客三板斧",
    "首月复购率目标30%以上，做不到就要检讨留存设计"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_005","tool_009"],
  priority: 8
},

// path_99: STAFF_HARD - 餐饮 - 成长期
{
  _id: "path_99",
  problemCode: "STAFF_HARD",
  industry: "餐饮",
  stage: "成长期",
  symptomIds: ["sym_h01","sym_h03","sym_h04"],
  judgment: "你的成长期餐饮门店员工流失率高且缺少绩效激励，团队执行力不足拖累增长",
  severity: 72,
  causes: [
    { name: "员工流失率高", weight: 30, judgment: "月流失率多少？核心岗位有流失吗？", description: "员工频繁流失，招聘和培训成本高，服务连续性差" },
    { name: "缺少绩效激励", weight: 25, judgment: "有明确的提成和奖金方案吗？员工有动力吗？", description: "缺少有效的绩效激励体系，员工做多做少一个样" },
    { name: "培训不到位", weight: 25, judgment: "新员工多久能独立上岗？培训有标准吗？", description: "培训不系统不标准，新员工上手慢影响服务品质" },
    { name: "管理方式粗放", weight: 20, judgment: "管理靠吼还是靠制度？", description: "管理方式粗放，靠人治不靠制度，团队效率低" }
  ],
  solutionIds: ["sol_018","sol_019","sol_024"],
  todayTasks: [
    { task: "计算近3个月员工流失率和招聘成本", duration: "30分钟", purpose: "量化人员问题" },
    { task: "设计绩效提成方案（营业额提成+好评奖）", duration: "1小时", purpose: "建立激励机制" },
    { task: "制定新员工标准化培训手册", duration: "1小时", purpose: "缩短培训周期" }
  ],
  weekPlan: [
    { day: 1, title: "人事诊断日", tasks: ["完成流失率和成本分析","分析流失原因","制定留人优先级"] },
    { day: 2, title: "激励设计日", tasks: ["设计绩效提成方案","设置好评和推荐奖励","制定激励发放规则"] },
    { day: 3, title: "培训体系日", tasks: ["制定标准化培训手册","设计培训考核标准","缩短新员工上岗周期"] },
    { day: 4, title: "制度规范日", tasks: ["制定关键岗位SOP","建立值班和巡检制度","用制度替代人治"] },
    { day: 5, title: "沟通改善日", tasks: ["建立定期团队会议","设置意见反馈渠道","改善管理沟通方式"] },
    { day: 6, title: "激励上线日", tasks: ["宣布新绩效方案","培训计算和兑现规则","观察团队反应并调整"] },
    { day: 7, title: "复盘日", tasks: ["评估激励方案接受度","分析团队氛围变化","制定下月人事优化重点"] }
  ],
  longTermAdvice: [
    "绩效激励是餐饮团队管理的核心，让员工为自己干而不是为老板干",
    "月流失率控制在8%以内，核心岗位零容忍流失",
    "培训标准化+制度化管理，减少对个人经验的依赖"
  ],
  caseIds: ["case_001"],
  toolIds: ["tool_009"],
  priority: 8
},

// path_100: STAFF_HARD - 服务业 - 新店
{
  _id: "path_100",
  problemCode: "STAFF_HARD",
  industry: "服务业",
  stage: "新店",
  symptomIds: ["sym_h01","sym_h02","sym_h04"],
  judgment: "你的新开服务门店招人难培训慢，员工无法独立上岗严重影响开业运营",
  severity: 70,
  causes: [
    { name: "招人困难", weight: 30, judgment: "招聘渠道有几个？多久能招到合适的人？", description: "服务行业招人难，新店知名度低更难吸引优秀人才" },
    { name: "培训周期过长", weight: 25, judgment: "新员工多久能独立上岗？超过2周了吗？", description: "培训不系统效率低，新员工长期无法独立服务" },
    { name: "无绩效激励", weight: 25, judgment: "有提成和奖金方案吗？", description: "缺少绩效激励，员工没有积极性" },
    { name: "核心技师依赖", weight: 20, judgment: "关键服务是否依赖个别技师？", description: "核心服务依赖个别技师，一旦离开服务停摆" }
  ],
  solutionIds: ["sol_018","sol_019","sol_024"],
  todayTasks: [
    { task: "拓展招聘渠道（58/BOSS/同行推荐/门店直招）", duration: "1小时", purpose: "解决招人难" },
    { task: "制定快速培训方案（7天独立上岗目标）", duration: "1小时", purpose: "缩短培训周期" },
    { task: "设计技师提成和奖金方案", duration: "30分钟", purpose: "建立激励机制" }
  ],
  weekPlan: [
    { day: 1, title: "招聘攻坚日", tasks: ["发布多渠道招聘信息","联系同行推荐人才","设置推荐奖励"] },
    { day: 2, title: "培训体系日", tasks: ["制定7天速成培训方案","编写核心服务SOP","设计培训考核认证"] },
    { day: 3, title: "激励设计日", tasks: ["设计技师提成方案","设置服务和好评奖励","制定激励兑现规则"] },
    { day: 4, title: "备份培训日", tasks: ["核心服务备份培训","减少对单一技师依赖","建立师徒制传承"] },
    { day: 5, title: "团队建设日", tasks: ["团队沟通和愿景宣导","建立值班和排班制度","营造积极团队氛围"] },
    { day: 6, title: "制度落地日", tasks: ["宣布绩效方案","培训SOP开始执行","设置每日检查机制"] },
    { day: 7, title: "复盘日", tasks: ["评估招聘进展","检查培训效果","调整下周人事重点"] }
  ],
  longTermAdvice: [
    "服务业人才是最核心的资产，招人要舍得花时间和成本",
    "7天速成培训+考核认证，让新员工快速创造价值",
    "核心服务必须有备份人员，降低对单一技师的依赖风险"
  ],
  caseIds: ["case_003"],
  toolIds: ["tool_009"],
  priority: 8
}
],

// ============================================================
// 4. 解决方案（20+10条）
// ============================================================
solutions: [
  {
    _id: "sol_001",
    title: "周边3公里精准引流方案",
    summary: "通过线上线下组合覆盖周边3公里客群，快速提升到店客流",
    difficulty: "简单",
    effectiveTime: "1-2周见效",
    costRange: "500-2000元/月",
    problemCodes: ["TRAFFIC_LOW","REVENUE_DROP"],
    chapter: 4,
    sub: 405,
    steps: [
      { title: "绘制3公里客群地图", content: "在地图上标注门店位置，画出3公里范围圈，标记住宅区、写字楼、学校等客流来源点", checklist: ["标注3公里内所有住宅小区","标记写字楼和商业区","记录各区域人口估算"] },
      { title: "铺设线上引流渠道", content: "在大众点评、抖音来客、小红书等平台完善门店信息，上传高质量照片和介绍", checklist: ["大众点评认领并完善信息","抖音来客开通门店","小红书注册并发布首条内容"] },
      { title: "设计到店引流品", content: "设计一款低成本高感知的引流产品或服务，让新客户有强烈的进店理由", checklist: ["确定引流品内容和定价","制作引流品宣传物料","培训员工引流品话术"] },
      { title: "执行社区覆盖", content: "通过传单、社区群、公告栏等方式覆盖周边3公里住宅区", checklist: ["印制并派发社区传单","加入3个以上业主群","在公告栏张贴广告"] },
      { title: "追踪效果并优化", content: "统计各渠道引流效果，计算获客成本，优化渠道投入", checklist: ["建立客流来源追踪表","计算各渠道获客成本","砍掉低效渠道加码高效渠道"] }
    ]
  },
  {
    _id: "sol_002",
    title: "会员留存与复购提升方案",
    summary: "建立会员体系和客户经营机制，提升复购率和客户生命周期价值",
    difficulty: "中等",
    effectiveTime: "2-4周见效",
    costRange: "1000-3000元/月",
    problemCodes: ["CUSTOMER_LOSS","REVENUE_DROP"],
    chapter: 3,
    sub: 303,
    steps: [
      { title: "设计会员体系", content: "设计3级会员体系（普通/银卡/金卡），明确各级别权益和升级条件", checklist: ["确定会员等级和权益","选择会员管理工具","设计入会引导流程"] },
      { title: "建立客户触点", content: "确保100%到店客户留下联系方式，建立微信/电话留存机制", checklist: ["设计加微信话术和福利","培训员工留存触点执行","设置留存率考核"] },
      { title: "制定回访计划", content: "建立服务后24h/3天/7天/30天回访节奏，保持客户连接", checklist: ["制定回访时间表","准备回访话术模板","设置回访提醒"] },
      { title: "设计复购激励", content: "设计二次消费优惠、积分兑换、消费里程碑奖励等复购激励", checklist: ["设计二次消费优惠","制定积分兑换规则","设置消费里程碑奖励"] },
      { title: "启动口碑裂变", content: "设计老客推荐奖励机制，让满意客户帮你带来新客户", checklist: ["制定推荐奖励规则","制作推荐码和海报","向活跃会员发布推荐计划"] }
    ]
  },
  {
    _id: "sol_003",
    title: "招牌爆品打造方案",
    summary: "从选品到包装到传播，系统打造让客户专程而来的招牌爆品",
    difficulty: "中等",
    effectiveTime: "2-3周见效",
    costRange: "500-1500元",
    problemCodes: ["TRAFFIC_LOW","PRODUCT_SLOW","COMPETITION"],
    chapter: 2,
    sub: 201,
    steps: [
      { title: "确定爆品方向", content: "分析现有产品数据和客户反馈，确定最具潜力的爆品方向", checklist: ["分析产品销量和毛利数据","收集客户好评最多的产品","确定1个爆品打造方向"] },
      { title: "优化爆品体验", content: "从配方/选品、出品/包装、命名/故事三个维度优化爆品", checklist: ["优化爆品核心品质","设计专属包装或器皿","创造爆品专属故事"] },
      { title: "设计爆品传播", content: "让爆品自带传播力：颜值高、有仪式感、可拍照分享", checklist: ["确保爆品拍照效果出色","增加仪式感环节","设计分享引导话术"] },
      { title: "爆品营销推广", content: "集中资源推广爆品，在所有渠道突出爆品位置", checklist: ["线上渠道突出爆品","门店C位陈列爆品","设计爆品专属活动"] },
      { title: "数据追踪优化", content: "追踪爆品销量和口碑数据，持续优化爆品体验", checklist: ["统计爆品销量变化","收集爆品客户反馈","每月优化1次爆品体验"] }
    ]
  },
  {
    _id: "sol_004",
    title: "菜单/产品结构优化方案",
    summary: "科学优化产品结构，淘汰低效品、打造利润款、设计组合套餐",
    difficulty: "中等",
    effectiveTime: "1-2周见效",
    costRange: "0-500元",
    problemCodes: ["REVENUE_DROP","PRODUCT_SLOW","PROFIT_LOW"],
    chapter: 2,
    sub: 202,
    steps: [
      { title: "产品矩阵分析", content: "将所有产品按销量和毛利分为明星/现金牛/问题/瘦狗四类", checklist: ["统计各产品销量和毛利","完成产品矩阵分类","标记淘汰和优化候选"] },
      { title: "淘汰低效产品", content: "果断淘汰销量低且毛利低的瘦狗产品，精简产品线", checklist: ["淘汰月销排名后20%产品","精简备料和库存","集中资源到核心产品"] },
      { title: "强化利润产品", content: "增加高毛利产品的曝光和推广，提升利润款销量占比", checklist: ["标记TOP5高毛利产品","增加利润款陈列面积","培训利润款推荐话术"] },
      { title: "设计组合套餐", content: "设计引流品+利润品的组合套餐，提升客单价和毛利", checklist: ["设计2-3个组合套餐","确保套餐毛利合理","设置价格锚点突出套餐价值"] },
      { title: "重新排版展示", content: "优化菜单/陈列排版，引导客户优先选择高毛利和套餐", checklist: ["高毛利品放在显眼位置","套餐设置醒目标识","优化价格呈现方式"] }
    ]
  },
  {
    _id: "sol_005",
    title: "门店动线与陈列优化方案",
    summary: "优化门店动线和陈列布局，提升驻足率和连带销售",
    difficulty: "简单",
    effectiveTime: "3-7天见效",
    costRange: "0-1000元",
    problemCodes: ["TRAFFIC_LOW","REVENUE_DROP"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "绘制现有动线图", content: "记录客户从进门到离店的行走路线，标记停留点和流失点", checklist: ["观察并记录10位客户动线","标记停留热点和冷区","识别动线瓶颈点"] },
      { title: "优化入口区域", content: "让入口有吸引力且引导客户自然深入，避免一览无余", checklist: ["入口设置吸引物","增加视觉引导","避免入口直通出口"] },
      { title: "优化陈列布局", content: "按关联性和场景化布置陈列，增加连带销售机会", checklist: ["设置关联陈列区","增加场景化展示","优化商品间距和层次"] },
      { title: "设置冲动消费点", content: "在收银区和等待区设置小件/低客单商品，增加冲动消费", checklist: ["收银台设置小件商品","等待区放置推荐品","设置限时特价标识"] },
      { title: "持续测试优化", content: "每周微调陈列，A/B测试不同布局的效果", checklist: ["记录调整前后数据对比","保留有效布局","持续优化动线"] }
    ]
  },
  {
    _id: "sol_006",
    title: "服务升级与差异化方案",
    summary: "设计分层服务体系和差异化服务体验，提升客户感知价值和复购",
    difficulty: "较难",
    effectiveTime: "2-4周见效",
    costRange: "1000-3000元/月",
    problemCodes: ["PRODUCT_SLOW","CUSTOMER_LOSS","COMPETITION"],
    chapter: 3,
    sub: 301,
    steps: [
      { title: "服务分层设计", content: "设计基础/进阶/尊享三级服务体系，满足不同客户需求", checklist: ["确定三级服务内容和定价","确保每级有明确价值差异","中间级设置最有吸引力"] },
      { title: "打造差异化仪式", content: "设计1-2个让客户记住的独特服务仪式或环节", checklist: ["确定差异化仪式内容","培训仪式执行标准","确保每次执行一致"] },
      { title: "增值服务设计", content: "在不大幅增加成本的前提下增加2-3个增值服务点", checklist: ["列出可低成本提供的增值服务","设计增值服务话术","培训员工推荐技巧"] },
      { title: "服务流程SOP化", content: "将服务流程标准化，确保体验一致性", checklist: ["制定核心服务SOP","设置关键检查点","培训全员执行标准"] },
      { title: "效果追踪优化", content: "追踪服务升级后的客户满意度和复购变化", checklist: ["设置满意度调查","追踪复购率变化","每月优化1个服务点"] }
    ]
  },
  {
    _id: "sol_007",
    title: "外卖与线上渠道拓展方案",
    summary: "系统搭建外卖和线上销售渠道，开拓增量营收来源",
    difficulty: "中等",
    effectiveTime: "1-2周上线",
    costRange: "2000-5000元/月",
    problemCodes: ["REVENUE_DROP","PRODUCT_SLOW"],
    chapter: 4,
    sub: 402,
    steps: [
      { title: "渠道选择与开通", content: "选择适合的线上渠道（美团外卖/饿了么/抖音团购/小程序）并开通", checklist: ["评估各渠道适配度","开通2-3个线上渠道","完成店铺信息设置"] },
      { title: "线上产品适配", content: "根据线上渠道特点调整产品结构和定价", checklist: ["选择适合线上的产品","设计线上专属定价","设置满减和配送策略"] },
      { title: "店铺装修优化", content: "优化线上店铺视觉和内容，提升转化率", checklist: ["上传高质量产品图片","优化产品描述文案","设置店铺活动标签"] },
      { title: "运营推广启动", content: "制定线上推广策略，获取平台流量支持", checklist: ["参与平台活动","设置推广预算","优化搜索排名"] },
      { title: "数据驱动优化", content: "分析线上渠道数据，持续优化产品和运营策略", checklist: ["建立线上数据追踪","分析转化率和客单价","优化低效产品和策略"] }
    ]
  },
  {
    _id: "sol_008",
    title: "品类优化与新品引进方案",
    summary: "基于数据优化品类结构，引进新品测试，淘汰滞销品",
    difficulty: "中等",
    effectiveTime: "2-4周见效",
    costRange: "1000-3000元/月",
    problemCodes: ["REVENUE_DROP","PRODUCT_SLOW","COMPETITION"],
    chapter: 2,
    sub: 204,
    steps: [
      { title: "品类数据分析", content: "全面分析各品类销售、毛利、周转数据，找出优化空间", checklist: ["完成品类销售排名","分析毛利和周转数据","标记优化和淘汰品类"] },
      { title: "淘汰低效品类", content: "果断淘汰销量低、毛利低、周转慢的品类", checklist: ["确定淘汰清单","制定清仓方案","释放资金和空间"] },
      { title: "引进新品测试", content: "引进3-5款新品进行市场测试，设置测试标准", checklist: ["选择3-5款候选新品","设置新品测试区域","制定2周动销考核标准"] },
      { title: "优化品类结构", content: "调整引流/利润/形象品类占比，确保结构健康", checklist: ["引流品占20%","利润品占60%","形象品占20%"] },
      { title: "建立迭代机制", content: "建立月度品类复盘和季度迭代机制", checklist: ["制定月度品类复盘日历","设置品类健康度指标","持续优化品类结构"] }
    ]
  },
  {
    _id: "sol_009",
    title: "成本精细化管控方案",
    summary: "建立精细化成本管理体系，从采购到消耗全链路降本",
    difficulty: "中等",
    effectiveTime: "1-2周见效",
    costRange: "0-500元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 602,
    steps: [
      { title: "成本结构审计", content: "详细拆解所有成本项，标记占比和可控性", checklist: ["列出所有成本项及占比","标记可控和不可控成本","制定各项目标占比"] },
      { title: "采购优化", content: "拓展供应商、比价谈判、优化采购频率和批量", checklist: ["联系3家以上供应商比价","与核心供应商谈优惠","优化采购批次和频率"] },
      { title: "损耗治理", content: "建立损耗记录和管控机制，减少浪费", checklist: ["设置损耗记录表","分析损耗原因TOP3","制定损耗降低目标"] },
      { title: "能耗优化", content: "优化水电等能耗使用，减少不必要的浪费", checklist: ["检查设备能耗效率","设置用电用水规范","安装节能设备"] },
      { title: "成本监控机制", content: "建立成本日报/周报和预警机制", checklist: ["设置成本日报表","设置超支预警线","每周成本复盘"] }
    ]
  },
  {
    _id: "sol_010",
    title: "定价策略优化方案",
    summary: "基于市场和毛利目标科学定价，提升整体毛利水平",
    difficulty: "中等",
    effectiveTime: "1-2周见效",
    costRange: "0元",
    problemCodes: ["PROFIT_LOW","REVENUE_DROP"],
    chapter: 6,
    sub: 603,
    steps: [
      { title: "现有定价审计", content: "计算所有产品毛利，标记定价不合理的产品", checklist: ["计算各产品毛利率","标记低于目标毛利的产品","分析竞品定价水平"] },
      { title: "制定定价策略", content: "按产品角色制定不同定价策略：引流品走量、利润品走价", checklist: ["引流品定价：低毛利高感知","利润品定价：高毛利合理价","形象品定价：高定价树标杆"] },
      { title: "价格锚点设计", content: "利用价格锚点心理引导客户选择目标产品", checklist: ["设置高价格锚点产品","目标产品居中定价","确保目标产品看起来最划算"] },
      { title: "分步调价执行", content: "先调低敏感度产品，逐步调整核心产品定价", checklist: ["首批调整低敏感度产品","观察客户反应","逐步调整核心产品"] },
      { title: "价值感提升", content: "在调价同时提升产品价值感，让客户觉得物超所值", checklist: ["优化出品/包装","增加附加值描述","培训价值传达话术"] }
    ]
  },
  {
    _id: "sol_011",
    title: "员工培训与激励体系方案",
    summary: "建立标准化培训和绩效激励体系，提升团队执行力和稳定性",
    difficulty: "中等",
    effectiveTime: "2-4周见效",
    costRange: "500-2000元/月",
    problemCodes: ["STAFF_HARD","CUSTOMER_LOSS"],
    chapter: 5,
    sub: 503,
    steps: [
      { title: "培训体系搭建", content: "制定各岗位标准化培训计划，缩短新人上手周期", checklist: ["编写核心岗位SOP","制定7天培训计划","设计培训考核标准"] },
      { title: "绩效体系设计", content: "设计量化的绩效考核指标和激励方案", checklist: ["确定3-5个核心考核指标","设计绩效评分和奖励","制定绩效面谈机制"] },
      { title: "薪酬结构优化", content: "调整为底薪+提成+奖金的结构，激发员工积极性", checklist: ["设计底薪+提成+奖金比例","制定超额奖励方案","确保优秀员工收入明显更高"] },
      { title: "师徒带教机制", content: "建立老带新的师徒制度，加速新人融入", checklist: ["指定带教师傅","制定带教奖励","设置新人考核节点"] },
      { title: "团队文化建设", content: "通过定期活动、意见反馈、关怀激励营造正向团队氛围", checklist: ["制定月度团建计划","建立意见反馈渠道","设计员工关怀方案"] }
    ]
  },
  {
    _id: "sol_012",
    title: "线上内容营销启动方案",
    summary: "从0搭建线上内容运营体系，建立线上品牌存在感",
    difficulty: "简单",
    effectiveTime: "1-2周见效",
    costRange: "0-1000元/月",
    problemCodes: ["TRAFFIC_LOW","MARKETING_HARD"],
    chapter: 4,
    sub: 402,
    steps: [
      { title: "平台开通与设置", content: "在大众点评、抖音、小红书等平台开通门店账号", checklist: ["大众点评认领门店","抖音来客开通","小红书注册账号"] },
      { title: "内容定位与规划", content: "确定内容方向和风格，制定月度内容日历", checklist: ["确定3个核心内容方向","制定月度内容计划","准备首批内容素材"] },
      { title: "首批内容制作", content: "拍摄门店、产品、环境等内容素材并发布", checklist: ["拍摄10张高质量照片","录制3条短视频","发布首批5条内容"] },
      { title: "发布节奏建立", content: "建立稳定的内容发布节奏，保持线上活跃度", checklist: ["每周至少3条内容发布","固定发布时间","内容形式多样化"] },
      { title: "互动与优化", content: "积极回复评论和私信，根据数据优化内容策略", checklist: ["24小时内回复所有互动","分析内容数据表现","优化高互动内容方向"] }
    ]
  },
  {
    _id: "sol_013",
    title: "差异化品牌定位方案",
    summary: "找到独特差异化定位，打造让客户记住的品牌标签",
    difficulty: "较难",
    effectiveTime: "2-4周见效",
    costRange: "1000-5000元",
    problemCodes: ["COMPETITION","MARKETING_HARD","TRAFFIC_LOW"],
    chapter: 7,
    sub: 701,
    steps: [
      { title: "竞品与市场分析", content: "分析竞品定位和市场空白，找到差异化机会", checklist: ["分析5家竞品定位","找出市场空白点","确定差异化方向"] },
      { title: "差异化定位确定", content: "在细分品类或独特体验上建立差异化定位", checklist: ["确定1个核心差异点","设计差异化口号","制定品类占位策略"] },
      { title: "品牌视觉升级", content: "围绕差异化定位升级品牌视觉和门店形象", checklist: ["设计差异化视觉元素","优化门头和店内装饰","更新宣传物料风格"] },
      { title: "差异化体验落地", content: "将差异化定位转化为客户可感知的独特体验", checklist: ["设计1-2个差异体验点","培训差异化服务执行","确保每次体验一致"] },
      { title: "差异化传播", content: "在所有触点强化差异化信息，建立客户认知", checklist: ["线上内容突出差异化","门店物料强化差异化","口碑引导差异化好评"] }
    ]
  },
  {
    _id: "sol_014",
    title: "储值卡与会员锁客方案",
    summary: "设计储值卡和长期会员套餐，锁定客户长期消费",
    difficulty: "中等",
    effectiveTime: "1-2周见效",
    costRange: "500-1000元",
    problemCodes: ["REVENUE_DROP","CUSTOMER_LOSS"],
    chapter: 3,
    sub: 303,
    steps: [
      { title: "储值方案设计", content: "设计多档位储值方案，确保每档都有吸引力", checklist: ["设计3个储值档位","每档赠送金额递增","最高档设置超值权益"] },
      { title: "会员套餐设计", content: "设计月卡/季卡/年卡等长期消费套餐", checklist: ["确定套餐内容和服务量","定价低于单次消费总额","设置有效期限制"] },
      { title: "储值引导执行", content: "培训员工储值推荐话术，设置储值激励", checklist: ["编写储值推荐话术","设置员工储值提成","设计储值首推活动"] },
      { title: "会员权益兑现", content: "确保储值和会员权益按时兑现，建立信任", checklist: ["设置权益兑现提醒","定期推送会员专属活动","保持会员活跃度"] },
      { title: "续费与升级", content: "在到期前主动联系续费，引导会员升级", checklist: ["设置到期提醒","设计续费优惠","制定升级激励方案"] }
    ]
  },
  {
    _id: "sol_015",
    title: "绩效考核与提成方案",
    summary: "建立销售导向的绩效体系，激发员工积极性提升业绩",
    difficulty: "中等",
    effectiveTime: "1-2周见效",
    costRange: "0-1000元/月",
    problemCodes: ["STAFF_HARD","REVENUE_DROP"],
    chapter: 5,
    sub: 503,
    steps: [
      { title: "考核指标确定", content: "确定3-5个核心绩效考核指标", checklist: ["销售额/营业额指标","服务质量指标","会员转化指标"] },
      { title: "提成方案设计", content: "设计底薪+提成的薪酬结构，让优秀员工收入更高", checklist: ["确定底薪和提成比例","设置阶梯提成标准","制定超额奖励方案"] },
      { title: "考核流程制定", content: "制定月度考核流程，包括目标设定、过程追踪、结果评估", checklist: ["月初设定个人目标","每周追踪进度","月末绩效面谈"] },
      { title: "方案公布与培训", content: "向全体员工公布方案，确保理解并认同", checklist: ["召开方案说明会","解答员工疑问","设置首月过渡期"] },
      { title: "持续优化", content: "根据执行效果持续优化考核指标和提成比例", checklist: ["每月评估方案效果","调整不合理指标","保持激励有效性"] }
    ]
  },
  {
    _id: "sol_016",
    title: "低成本营销活动策划方案",
    summary: "用创意代替预算，策划高传播低成本的营销活动",
    difficulty: "简单",
    effectiveTime: "1周见效",
    costRange: "0-500元/次",
    problemCodes: ["MARKETING_HARD","TRAFFIC_LOW"],
    chapter: 4,
    sub: 404,
    steps: [
      { title: "活动创意选择", content: "选择适合门店的低成本高传播活动形式", checklist: ["选择1个活动形式","评估活动传播潜力","确保执行难度可控"] },
      { title: "活动方案制定", content: "制定活动详细方案，包括时间、规则、物料、推广", checklist: ["确定活动时间和周期","制定活动规则和奖励","准备活动物料"] },
      { title: "线上预热", content: "在所有线上渠道发布活动预热，制造期待感", checklist: ["提前3天发布预热内容","社群同步活动信息","设置活动提醒"] },
      { title: "线下执行", content: "门店布置活动氛围，培训员工活动话术", checklist: ["布置活动氛围物料","培训活动执行话术","设置活动追踪表"] },
      { title: "活动复盘", content: "统计活动数据，总结经验，优化下次活动", checklist: ["统计参与人数和转化","计算活动ROI","记录经验教训"] }
    ]
  },
  {
    _id: "sol_017",
    title: "经营模式升级方案",
    summary: "引入数字化工具和新的经营方式，提升经营效率和竞争力",
    difficulty: "较难",
    effectiveTime: "2-4周见效",
    costRange: "1000-5000元",
    problemCodes: ["PROFIT_LOW","COMPETITION","REVENUE_DROP"],
    chapter: 8,
    sub: 802,
    steps: [
      { title: "现状诊断", content: "分析现有经营模式的痛点和升级空间", checklist: ["梳理现有经营流程","识别效率瓶颈","确定升级优先级"] },
      { title: "数字化工具引入", content: "选择适合的数字化工具提升经营效率", checklist: ["引入收银/管理系统","开通线上预约/点单","建立客户管理系统"] },
      { title: "流程再造", content: "围绕数字化工具重新设计核心业务流程", checklist: ["重构客户服务流程","优化进销存管理","建立数据驱动决策"] },
      { title: "新模式试运行", content: "先在部分业务线试运行新模式，验证效果", checklist: ["选择1个业务线试点","设置试运行周期","收集效果数据"] },
      { title: "全面推广", content: "验证有效后全面推广新模式", checklist: ["培训全员新模式操作","全面切换新系统","持续优化磨合"] }
    ]
  },
  {
    _id: "sol_018",
    title: "团队激活与人才发展方案",
    summary: "激活老员工、培养新人才，建立可持续的团队发展体系",
    difficulty: "较难",
    effectiveTime: "2-4周见效",
    costRange: "1000-3000元/月",
    problemCodes: ["STAFF_HARD"],
    chapter: 5,
    sub: 502,
    steps: [
      { title: "人才盘点", content: "评估现有团队结构和人才状态，识别激活和培养对象", checklist: ["完成团队能力评估","标记核心人才和风险","制定人才发展计划"] },
      { title: "老员工激活", content: "通过新角色、新挑战、新激励激活倦怠的老员工", checklist: ["赋予新职责或新项目","设计专项激励方案","增加成长和表现机会"] },
      { title: "新人培养加速", content: "建立标准化培训和师徒带教，加速新人成长", checklist: ["制定30天速成计划","设计师徒带教机制","设置阶段性考核"] },
      { title: "晋升通道建设", content: "设计多通道晋升路径，让员工看到发展空间", checklist: ["设计专业/管理双通道","制定各级别标准和待遇","建立晋升评审机制"] },
      { title: "合伙人机制", content: "为核心人才设计合伙人或分红机制，深度绑定", checklist: ["设计合伙人准入条件","制定分红方案","签订合伙人协议"] }
    ]
  },
  {
    _id: "sol_019",
    title: "产品迭代与创新方案",
    summary: "建立产品迭代机制，持续推出新品保持市场竞争力",
    difficulty: "中等",
    effectiveTime: "2-3周见效",
    costRange: "500-2000元/次",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 205,
    steps: [
      { title: "产品生命周期盘点", content: "分析各产品生命周期阶段，确定迭代优先级", checklist: ["标记导入期/成长期/成熟期/衰退期","制定衰退品退出计划","确定新品开发优先级"] },
      { title: "市场趋势调研", content: "调研当前市场趋势和客户需求变化", checklist: ["分析行业热门趋势","收集客户需求反馈","确定创新方向"] },
      { title: "新品研发测试", content: "研发1-2款新品，内部测试和老客户试吃/试用", checklist: ["研发新品样品","内部品鉴筛选","邀请老客户试吃/试用"] },
      { title: "新品上市推广", content: "设计新品上市活动，线上线下同步推广", checklist: ["确定新品定价和定位","设计上市推广活动","线上线下同步发布"] },
      { title: "迭代机制固化", content: "建立季度产品迭代日历，形成持续创新节奏", checklist: ["制定季度迭代计划","设置产品复盘日历","建立新品研发SOP"] }
    ]
  },
  {
    _id: "sol_020",
    title: "客户全生命周期经营方案",
    summary: "建立从获客到留存到裂变的完整客户经营闭环",
    difficulty: "较难",
    effectiveTime: "3-4周见效",
    costRange: "1000-3000元/月",
    problemCodes: ["CUSTOMER_LOSS","COMPETITION"],
    chapter: 3,
    sub: 301,
    steps: [
      { title: "客户旅程梳理", content: "梳理客户从认知到忠诚的完整旅程，识别优化点", checklist: ["绘制客户旅程地图","标记各环节流失率","确定关键优化点"] },
      { title: "获客环节优化", content: "优化首次接触和到店转化，提升新客获取效率", checklist: ["优化线上到店转化路径","设计新客到店诱饵","设置首单体验保障"] },
      { title: "激活环节优化", content: "优化首次消费后的回访和二次消费引导", checklist: ["设计24h回访机制","制定二次消费优惠","建立7天内回店引导"] },
      { title: "留存环节优化", content: "建立会员体系和长期消费绑定机制", checklist: ["设计储值/长期套餐","制定会员专属权益","设置消费里程碑奖励"] },
      { title: "裂变环节优化", content: "建立推荐奖励和口碑传播机制", checklist: ["设计推荐奖励方案","制作分享工具和素材","启动口碑裂变活动"] }
    ]
  },
  {
    _id: "sol_021",
    title: "产品结构优化方案",
    summary: "通过数据分析重新梳理产品角色和结构，提升整体动销和毛利水平",
    difficulty: "中等",
    effectiveTime: "2-3周见效",
    costRange: "0-500元",
    problemCodes: ["PRODUCT_SLOW","PROFIT_LOW"],
    chapter: 2,
    sub: 202,
    steps: [
      { title: "产品全盘审计", content: "统计所有产品的销量、毛利、复购率数据，按引流款/利润款/形象款/淘汰款分类", checklist: ["完成全产品销量毛利排名","计算各产品复购率","按角色分类标注"] },
      { title: "结构重新设计", content: "设计合理的产品角色配比：引流款20%、利润款50%、形象款10%、填位款20%", checklist: ["确定各角色产品清单","调整产品定价策略","设计产品组合和套餐"] },
      { title: "末位淘汰执行", content: "淘汰贡献率最低的10-20%产品，释放资源给核心品和新品", checklist: ["制定淘汰清单和时间表","执行淘汰和清仓","释放陈列和备料空间"] },
      { title: "效果追踪优化", content: "追踪结构调整后的动销和毛利变化，持续优化", checklist: ["设置周度追踪指标","分析各角色产品表现","微调结构和定价"] }
    ]
  },
  {
    _id: "sol_022",
    title: "爆款打造方案",
    summary: "从选品到推广系统性打造爆款产品，带动整体销售和品牌认知",
    difficulty: "中等",
    effectiveTime: "2-4周见效",
    costRange: "500-2000元",
    problemCodes: ["PRODUCT_SLOW","TRAFFIC_LOW"],
    chapter: 2,
    sub: 201,
    steps: [
      { title: "爆款候选筛选", content: "根据数据和市场趋势筛选2-3个爆款候选产品，评估打造可行性", checklist: ["分析销量增长潜力品","评估供应链支持能力","确定爆款打造优先级"] },
      { title: "爆款产品打磨", content: "优化爆款候选的品质、定价、呈现，确保有记忆点和传播力", checklist: ["优化产品品质和口味","设计最优定价策略","打造独特呈现和故事"] },
      { title: "爆款推广引爆", content: "集中资源推广爆款，线上+线下+口碑多渠道引爆", checklist: ["线上发布爆款内容","设计爆款体验活动","引导顾客好评和分享"] },
      { title: "爆款生命周期管理", content: "追踪爆款数据，在衰退前培育新爆款，保持持续增长", checklist: ["设置爆款数据看板","监测爆款生命周期阶段","提前培育下代爆款"] }
    ]
  },
  {
    _id: "sol_023",
    title: "限时促销策略方案",
    summary: "用有主题有节奏的限时促销替代随机打折，提升促销效果同时保护品牌价值",
    difficulty: "简单",
    effectiveTime: "1周见效",
    costRange: "0-1000元",
    problemCodes: ["MARKETING_HARD","REVENUE_DROP"],
    chapter: 4,
    sub: 405,
    steps: [
      { title: "促销日历规划", content: "制定月度促销日历，每次促销都有明确主题、目标和力度", checklist: ["规划月度促销节奏","确定每次促销主题","设置促销力度和预算"] },
      { title: "促销方案设计", content: "设计多样化的促销形式：限时/限量/主题/会员专属，不局限于打折", checklist: ["设计3种以上促销形式","每次促销设置明确目标","制作促销物料和话术"] },
      { title: "促销执行追踪", content: "执行促销活动并实时追踪效果数据，及时调整", checklist: ["按时启动促销活动","追踪实时销售数据","分析促销ROI"] },
      { title: "促销复盘优化", content: "每次促销后复盘效果，积累经验优化下次方案", checklist: ["完成促销效果复盘","记录经验和改进点","优化下次促销方案"] }
    ]
  },
  {
    _id: "sol_024",
    title: "会员体系搭建方案",
    summary: "从零搭建或升级会员体系，用权益和储值锁定客户长期消费",
    difficulty: "较难",
    effectiveTime: "3-4周见效",
    costRange: "500-3000元/月",
    problemCodes: ["CUSTOMER_LOSS","COMPETITION","REVENUE_DROP"],
    chapter: 3,
    sub: 303,
    steps: [
      { title: "会员体系设计", content: "设计会员等级、权益和升级规则，拉开会员与非会员差异", checklist: ["设计3-4个会员等级","确定各级专属权益","设置升级和保级规则"] },
      { title: "储值卡方案", content: "设计储值卡方案和权益，用储值锁定客户长期消费", checklist: ["确定储值档位和赠送比例","设计储值专属权益","制定储值推广话术"] },
      { title: "会员运营机制", content: "建立会员激活、关怀和挽回机制，持续提升会员活跃度", checklist: ["设计新会员激活流程","设置会员定期关怀","建立沉睡会员挽回机制"] },
      { title: "数据追踪优化", content: "追踪会员数据指标，持续优化会员体系和运营", checklist: ["设置会员核心指标看板","分析会员消费行为","优化权益和运营策略"] }
    ]
  },
  {
    _id: "sol_025",
    title: "竞争差异化突围方案",
    summary: "找到并强化差异化优势，用非价格竞争手段在竞品包围中突围",
    difficulty: "较难",
    effectiveTime: "3-4周见效",
    costRange: "1000-5000元",
    problemCodes: ["COMPETITION"],
    chapter: 7,
    sub: 702,
    steps: [
      { title: "竞争格局分析", content: "全面分析竞品优劣势，找到差异化机会和自身竞争优势", checklist: ["分析3-5家核心竞品","识别竞品弱点和空白","确定差异化方向"] },
      { title: "差异化定位设计", content: "设计独特的差异化定位和价值主张，让客户有选择你的理由", checklist: ["确定差异化核心主张","设计差异化体验方案","将差异化融入所有触点"] },
      { title: "竞争壁垒构建", content: "建立客户锁定和竞品难以模仿的壁垒，保护市场份额", checklist: ["强化会员储值锁客","打造独家产品或服务","建立口碑和信任壁垒"] },
      { title: "持续竞争监控", content: "建立竞品监控机制，定期调整竞争策略保持领先", checklist: ["设置月度竞品review","追踪竞品策略变化","及时调整应对方案"] }
    ]
  },
  {
    _id: "sol_026",
    title: "社群营销运营方案",
    summary: "建立和运营门店客户社群，实现零成本持续触达和转化",
    difficulty: "中等",
    effectiveTime: "2-3周见效",
    costRange: "0-500元/月",
    problemCodes: ["MARKETING_HARD","CUSTOMER_LOSS"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "社群搭建", content: "建立门店客户社群，设计入群诱饵和首批种子用户引入", checklist: ["创建微信客户群","设计入群专属福利","引导首批50人入群"] },
      { title: "内容节奏设计", content: "设计社群内容发布节奏：每日互动+每周活动+每月福利", checklist: ["制定内容日历","设计每日互动话题","规划每周群活动"] },
      { title: "社群活跃运营", content: "持续运营提升群活跃度，防止变成死群", checklist: ["每日发布互动内容","定期群活动和福利","培养群KOC和氛围"] },
      { title: "社群转化追踪", content: "追踪社群到店转化和营收贡献，优化运营策略", checklist: ["统计群转化率和贡献","分析高效内容和活动","优化运营节奏和内容"] }
    ]
  },
  {
    _id: "sol_027",
    title: "本地生活平台运营方案",
    summary: "系统运营大众点评、抖音来客、小红书等本地生活平台，获取线上流量到店转化",
    difficulty: "中等",
    effectiveTime: "2-3周见效",
    costRange: "0-2000元/月",
    problemCodes: ["MARKETING_HARD","TRAFFIC_LOW"],
    chapter: 4,
    sub: 402,
    steps: [
      { title: "平台基础铺设", content: "在主流本地生活平台完善门店信息，建立线上阵地", checklist: ["认领大众点评门店","开通抖音来客","注册小红书账号"] },
      { title: "内容运营启动", content: "制定内容发布日历，持续产出种草内容吸引线上流量", checklist: ["制定内容发布日历","拍摄高质量素材","每周至少3条内容"] },
      { title: "口碑运营管理", content: "主动管理线上评价，引导好评、及时回复差评", checklist: ["建立好评引导机制","差评24h内回复","设计好评激励方案"] },
      { title: "投放和活动", content: "适时投放本地广告和参与平台活动，放大线上曝光", checklist: ["设置小额投放测试ROI","参与平台官方活动","优化投放策略"] }
    ]
  },
  {
    _id: "sol_028",
    title: "产品迭代升级方案",
    summary: "建立产品持续迭代机制，根据数据和客户反馈不断优化升级产品",
    difficulty: "中等",
    effectiveTime: "2-4周见效",
    costRange: "500-2000元",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 205,
    steps: [
      { title: "迭代机制建立", content: "建立月度产品review和迭代节奏，让产品持续进化", checklist: ["设置月度产品review日","建立客户反馈收集渠道","制定迭代优先级规则"] },
      { title: "数据驱动决策", content: "用销量、毛利、复购率、客户反馈数据驱动产品决策", checklist: ["建立产品数据看板","设置核心指标阈值","用数据做迭代决策"] },
      { title: "小步快跑迭代", content: "每次小幅度改进快速上线验证，持续积累效果", checklist: ["确定本次迭代内容","快速上线测试","收集数据验证效果"] },
      { title: "新品孵化流程", content: "建立新品从构思到上线到评估的标准流程", checklist: ["设计新品孵化流程","小量试销验证","数据好则正式引进"] }
    ]
  },
  {
    _id: "sol_029",
    title: "促销活动组合拳方案",
    summary: "设计多种促销形式组合使用，形成引流-转化-复购的完整促销链条",
    difficulty: "中等",
    effectiveTime: "1-2周见效",
    costRange: "500-3000元",
    problemCodes: ["MARKETING_HARD","REVENUE_DROP"],
    chapter: 4,
    sub: 405,
    steps: [
      { title: "促销组合设计", content: "设计引流型+转化型+复购型三种促销组合，形成完整链路", checklist: ["设计引流型促销（体验价/首单礼）","设计转化型促销（限时/套餐）","设计复购型促销（会员日/储值赠）"] },
      { title: "促销节奏排期", content: "将促销组合排入月度日历，形成有节奏的促销波次", checklist: ["制定月度促销日历","设置促销波次和间隔","避免促销疲劳"] },
      { title: "促销物料准备", content: "制作所有促销所需的物料、话术和系统设置", checklist: ["制作促销宣传物料","培训员工促销话术","收银/预约系统设置"] },
      { title: "执行和复盘", content: "执行促销活动并复盘效果，优化下次方案", checklist: ["按计划执行促销","追踪实时数据","复盘ROI和改进点"] }
    ]
  },
  {
    _id: "sol_030",
    title: "竞品分析与应对方案",
    summary: "系统分析竞品策略和动态，制定针对性竞争应对方案",
    difficulty: "中等",
    effectiveTime: "1-2周见效",
    costRange: "0-500元",
    problemCodes: ["COMPETITION"],
    chapter: 7,
    sub: 702,
    steps: [
      { title: "竞品全面调研", content: "实地走访和线上调研核心竞品，全面了解其策略", checklist: ["走访3-5家核心竞品","记录其产品/价格/活动/服务","分析其优势和弱点"] },
      { title: "竞争策略制定", content: "根据竞品分析制定差异化竞争策略，避免正面硬刚", checklist: ["确定差异化竞争方向","设计非价格竞争手段","制定客户锁定方案"] },
      { title: "应对方案准备", content: "针对竞品可能的价格战、模仿等行为准备应对预案", checklist: ["准备价格战应对预案","准备竞品模仿应对方案","建立快速反应机制"] },
      { title: "持续监控调整", content: "建立竞品监控机制，持续追踪竞品动态并及时调整", checklist: ["设置月度竞品走访","追踪竞品线上动态","定期调整竞争策略"] }
    ]
  },
  {
    _id: "sol_031",
    title: "社区团购引流术",
    summary: "借助社区团购模式低成本获取周边居民精准客流",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-300元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 4,
    sub: 404,
    steps: [
      { title: "选品定价", content: "选择1-2款高频刚需产品作为团购引流品，定价低于市场价10%-20%，不求利润只求引流到店。比如生鲜店选鸡蛋、粮油店选大米。注意引流品必须是刚需高频品，不能选冷门品。", checklist: ["确定1-2款团购引流品","核算成本确保不亏太多","设定团购价低于周边10%以上"] },
      { title: "社区群铺设", content: "联系周边3-5个小区的业主群群主或物业，发布团购信息。可给群主一定佣金或免费品作为回报。也可自己建小区专属团购群，入群即享团购价。", checklist: ["联系3-5个小区业主群","与群主谈好合作方式","准备团购图文素材"] },
      { title: "到店核销设计", content: "团购产品必须到店自提，到店时引导顾客加微信、浏览其他商品。在门店设置团购自提专区，放置热门商品和当期促销信息，实现交叉销售。", checklist: ["设置到店自提专区","准备加微信引导话术","摆放交叉促销商品"] },
      { title: "复购转化跟进", content: "团购客户到店后3天内微信推送专属复购券，7天后推送门店活动，逐步将团购客转化为日常消费客。持续在群内发布每日特价和限时抢购维持活跃。", checklist: ["设置3天复购券推送","7天后推送门店活动","维护团购群日更内容"] }
    ]
  },
  {
    _id: "sol_032",
    title: "异业联盟引流法",
    summary: "与周边非竞争商家互换客流，零成本共享客源池",
    difficulty: "简单",
    effectiveTime: "5-10天",
    costRange: "0-200元",
    problemCodes: ["TRAFFIC_LOW","REVENUE_DROP"],
    chapter: 4,
    sub: 404,
    steps: [
      { title: "筛选联盟伙伴", content: "在门店1公里范围内筛选3-5家目标客群重叠但非竞争的商家，比如美甲店+奶茶店、花店+蛋糕店。要求对方客流量尚可、老板配合意愿强。", checklist: ["列出周边5家候选商家","确认客群重叠但非竞争","逐一拜访确认合作意向"] },
      { title: "设计互推方案", content: "设计双向引流方案：互相放置对方优惠券/体验卡、互相推荐客户、联合做活动。关键是双方投入对等、获益均衡，避免一方单方面获利。", checklist: ["设计双方互换的优惠券","约定互相推荐的提成","确认双方投入基本对等"] },
      { title: "物料制作铺设", content: "制作联盟商家的互推物料，在各自门店摆放。包括易拉宝、优惠券架、对方品牌展示卡。物料设计要美观且信息清晰，突出专属优惠。", checklist: ["设计互推优惠券/体验卡","制作易拉宝或展示卡","在各自门店显眼位置摆放"] },
      { title: "效果追踪优化", content: "建立引流效果追踪机制，记录每家联盟商家带来的到店客数和消费额。每月评估联盟效果，淘汰无效联盟，拓展新的联盟伙伴。", checklist: ["建立联盟引流登记表","每周统计各联盟引流效果","月度评估并优化联盟组合"] }
    ]
  },
  {
    _id: "sol_033",
    title: "门前引流氛围营造法",
    summary: "通过门店外摆、氛围装饰和互动装置吸引路人进店",
    difficulty: "简单",
    effectiveTime: "1-3天",
    costRange: "100-500元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 103,
    steps: [
      { title: "门头吸引力诊断", content: "站在马路对面看自己的门头，3秒内能否判断卖什么、有什么特色？如果看不出来就需要优化。门头信息三要素：品类名+核心卖点+吸引力符号（如爆款价、人气第一）。", checklist: ["站在对面测试3秒识别度","检查品类名是否清晰","添加核心卖点或吸引力符号"] },
      { title: "外摆氛围布置", content: "在门口设置外摆区域，摆放产品样品、体验道具或趣味装置。餐饮店可摆菜品模型+试吃台，服装店可摆当季爆款+镜子，水果店可摆切试台。让路人可以零门槛互动。", checklist: ["设计外摆区域布局","准备互动/体验道具","确保外摆不影响通行"] },
      { title: "动态引流元素", content: "增加动态元素吸引注意力：滚动LED屏显示当日特价、门口播放轻快音乐、定时叫卖或互动小游戏。动态比静态吸引力强5倍，哪怕是小喇叭循环播放也有明显效果。", checklist: ["设置LED屏或活动海报","配置背景音乐","安排员工定时互动引流"] },
      { title: "时段流量匹配", content: "分析门前人流高峰时段，在高峰期集中投入引流资源。如早高峰派发试吃、午休时段播放音乐、晚间亮化灯光。非高峰时段可缩减投入，聚焦高效时段。", checklist: ["统计门前人流高峰时段","高峰期安排引流活动","非高峰期调整引流节奏"] }
    ]
  },
  {
    _id: "sol_034",
    title: "抖音同城引流实战法",
    summary: "用短视频+同城流量获取周边3公里精准到店客流",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-500元",
    problemCodes: ["TRAFFIC_LOW","MARKETING_HARD"],
    chapter: 4,
    sub: 401,
    steps: [
      { title: "账号基础搭建", content: "注册抖音企业号，完善门店地址、营业时间、联系方式，开通团购功能。账号名称格式：品牌名+品类+地址（如『张姐包子铺·中关村』），让同城用户搜索时容易找到。", checklist: ["注册抖音企业号","完善门店地址和联系方式","开通团购/来客功能"] },
      { title: "爆款内容制作", content: "拍摄3类视频：制作过程展示（视觉冲击）、顾客真实反应（口碑证言）、老板日常分享（人设信任）。每条视频带上同城定位和话题标签，视频时长控制在15-30秒。", checklist: ["拍摄3条不同类型视频","每条带同城定位标签","视频时长15-30秒"] },
      { title: "同城流量获取", content: "每条视频发布时添加门店POI定位，参与同城话题挑战。每天发布1-2条，坚持2周算法会打上同城标签。适当投放DOU+同城100元测试，观察到店转化。", checklist: ["每条视频添加门店定位","参与同城话题挑战","小额投放DOU+测试效果"] },
      { title: "到店转化闭环", content: "视频评论区置顶门店地址和优惠信息，私信自动回复引导到店。设置抖音专属到店券（如『抖音粉丝到店送XX』），追踪抖音渠道到店人数。", checklist: ["评论区置顶门店信息","设置私信自动回复","创建抖音专属到店券"] }
    ]
  },
  {
    _id: "sol_035",
    title: "停车场驻点引流法",
    summary: "在周边停车场设点精准触达有消费能力的车主客流",
    difficulty: "简单",
    effectiveTime: "3-5天",
    costRange: "100-300元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 4,
    sub: 405,
    steps: [
      { title: "停车场筛选", content: "调研门店2公里内的商业停车场和小区停车场，优先选择停车量大、车主消费力强的点位。与停车场管理方沟通合作方式，可支付少量场地费或交换福利。", checklist: ["调研周边3-5个停车场","评估各停车场车主画像","与管理方谈妥合作方式"] },
      { title: "引流物料设计", content: "设计车窗夹页或停车券背面的广告，内容包含：门店名+品类+专属车主优惠（如『凭此券到店享8折』）+导航二维码。设计要简洁醒目，优惠力度要足够吸引。", checklist: ["设计车窗夹页物料","设置车主专属优惠","印制导航二维码"] },
      { title: "精准投放执行", content: "选择周五下午和周末上午等高消费时段，在停车场出入口派发或放置引流物料。也可与停车场合作，在停车小票背面印刷门店广告，覆盖面更广。", checklist: ["选择高消费时段投放","培训派发人员话术","尝试停车小票广告合作"] },
      { title: "效果追踪迭代", content: "追踪车主券的到店核销率，计算引流成本。根据数据优化投放时段和优惠力度，效果好的停车场加大投入，效果差的及时更换。", checklist: ["统计车主券核销率","计算单个引流成本","优化投放策略和时段"] }
    ]
  },
  {
    _id: "sol_036",
    title: "宝妈社群裂变引流",
    summary: "以宝妈群体为种子用户，通过社群裂变获取家庭消费客流",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 4,
    sub: 404,
    steps: [
      { title: "宝妈需求洞察", content: "分析门店产品/服务与宝妈需求的重叠点。如生鲜店主打儿童食材、烘焙店做亲子DIY、童装店做搭配指南。找到宝妈最关心的1-2个痛点作为引流切入点。", checklist: ["分析宝妈与门店需求交集","确定1-2个宝妈痛点切入点","设计对应的引流价值点"] },
      { title: "种子宝妈招募", content: "通过到店宝妈客户、周边幼儿园家长群、小区业主群招募首批20-30位种子宝妈。给种子宝妈专属福利（如VIP折扣、免费体验），换取她们拉人入群。", checklist: ["招募20-30位种子宝妈","设计种子宝妈专属福利","约定拉人入群奖励"] },
      { title: "裂变活动设计", content: "设计宝妈专属裂变活动：邀请3位宝妈入群送XX、宝妈拼团享特价、带娃到店送伴手礼。裂变门槛要低，奖励要即时，让宝妈有动力主动分享。", checklist: ["设计邀请入群奖励","设计宝妈拼团活动","准备带娃到店伴手礼"] },
      { title: "社群持续运营", content: "每日在群内发布1条实用内容（育儿技巧、食材挑选等），每周1次群内专属优惠，每月1次线下亲子活动。保持群活跃度，避免变成纯广告群。", checklist: ["制定社群内容日历","每周1次群专属优惠","策划月度亲子活动"] }
    ]
  },
  {
    _id: "sol_037",
    title: "地推精准获客法",
    summary: "通过系统化地推在目标客群聚集地精准获取新客",
    difficulty: "简单",
    effectiveTime: "3-5天",
    costRange: "100-500元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 4,
    sub: 405,
    steps: [
      { title: "地推点位规划", content: "根据目标客群画像选择3-5个地推点位：写字楼（午餐时段）、小区门口（下班时段）、学校门口（放学时段）。每个点位测算人流量和目标客群占比，优先选择转化潜力高的点位。", checklist: ["选择3-5个地推点位","测算各点位人流量","确定各点位最佳时段"] },
      { title: "引流诱饵设计", content: "设计有吸引力的引流诱饵：体验装/试用装（低成本高感知价值）、超值体验券（限首次到店）、免费服务（如皮肤测试、身材量测）。诱饵成本控制在5元以内，感知价值20元以上。", checklist: ["设计引流诱饵方案","核算诱饵成本<5元/份","确保感知价值>20元"] },
      { title: "话术和物料准备", content: "准备15秒地推话术：打招呼+亮身份+给福利+引到店。如『您好，XX店新开业送您一份XX，就在前面50米，凭这个免费领』。准备小卡片或传单，印有门店信息和专属优惠码。", checklist: ["编写15秒地推话术","印制引流小卡片","培训地推人员话术"] },
      { title: "执行与数据追踪", content: "按计划执行地推，记录每个点位的派发量和到店转化率。重点追踪：加微信率、到店核销率、到店消费额。根据数据调整点位、时段和话术，持续优化。", checklist: ["按计划执行地推","记录派发量和加微率","追踪到店核销和消费"] }
    ]
  },
  {
    _id: "sol_038",
    title: "微信朋友圈广告引流",
    summary: "利用微信朋友圈本地广告精准触达周边3公里潜在客户",
    difficulty: "中等",
    effectiveTime: "3-7天",
    costRange: "300-1000元",
    problemCodes: ["TRAFFIC_LOW","MARKETING_HARD"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "广告账户搭建", content: "在微信公众平台创建广告账户，选择『推广门店』目标。设置定向：地理位置选门店周边3公里，人群标签选与门店品类相关的兴趣标签（如餐饮选『美食爱好者』）。日预算设100-200元测试。", checklist: ["创建微信广告账户","设置3公里地理定向","设置相关兴趣标签"] },
      { title: "广告素材制作", content: "制作朋友圈广告素材：3-6张高质量门店/产品图片+简洁文案。文案公式：痛点+解决方案+限时福利+行动指令。如『附近的朋友看过来！XX新品上市，限时到店享5折，点击领券→』。", checklist: ["拍摄3-6张高质量素材","编写痛点+福利型文案","添加行动按钮引导"] },
      { title: "优惠卡券配置", content: "在广告中嵌入微信卡券，用户点击即可领取到店优惠券。券面设计要醒目，优惠力度要有吸引力（至少7折或满减20元以上），设置有效期7-14天制造紧迫感。", checklist: ["创建微信卡券","设置有吸引力的优惠力度","设置7-14天有效期"] },
      { title: "投放优化迭代", content: "首日投放后查看数据：曝光量、点击率、领券率、核销率。点击率低于1%优化素材，领券率低优化优惠力度，核销率低增加到店引导。3天一迭代，逐步降低获客成本。", checklist: ["每日查看投放数据","3天一次优化迭代","追踪到店核销ROI"] }
    ]
  },
  {
    _id: "sol_039",
    title: "学校门口定点引流法",
    summary: "在学校门口设点触达家长群体，带动家庭消费到店",
    difficulty: "简单",
    effectiveTime: "3-5天",
    costRange: "0-200元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 4,
    sub: 405,
    steps: [
      { title: "学校点位选择", content: "筛选门店1公里内的中小学和幼儿园，优先选择学生数量多、家长消费力强的学校。调研放学时段（通常15:30-17:00），估算家长等候人数。", checklist: ["列出周边3所学校","确认放学时段和家长量","选择最优1-2所学校"] },
      { title: "家长需求匹配", content: "分析等候家长的需求：接送等待无聊→可推体验/休闲类；孩子放学饿了→可推食品/零食类；家长关心孩子→可推教育/健康类。找到门店产品与家长需求的最短路径。", checklist: ["分析家长等候痛点","匹配门店产品与需求","设计对应的引流方案"] },
      { title: "引流方案执行", content: "在放学时段于学校门口设置小型体验台，提供免费试吃/试用/小礼物。派发门店体验券（如『家长专属到店礼』），同时加微信推送每日家长福利。保持亲和力，避免商业感太强。", checklist: ["准备体验台和试用品","设计家长专属体验券","培训人员亲和力话术"] },
      { title: "家长群持续运营", content: "加到微信的家长拉入专属福利群，每天放学时段推送『今日家长特惠』，周末推送亲子到店活动。群内定期做限时秒杀，培养家长到店消费习惯。", checklist: ["建立家长专属福利群","设置每日家长特惠推送","策划周末亲子到店活动"] }
    ]
  },
  {
    _id: "sol_040",
    title: "快递站合作引流法",
    summary: "与菜鸟驿站等快递站合作，借助取件流量获取周边客流",
    difficulty: "简单",
    effectiveTime: "5-7天",
    costRange: "0-200元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 4,
    sub: 404,
    steps: [
      { title: "快递站合作谈判", content: "拜访门店周边500米内的菜鸟驿站、丰巢柜点或快递代收点。提出合作方案：在取件处放置门店优惠券，每核销一张给驿站1-2元佣金。对驿站而言是零成本增收，极易谈成。", checklist: ["拜访周边2-3家快递站","提出佣金合作方案","确认合作细节和佣金标准"] },
      { title: "专属优惠券设计", content: "设计快递取件专属优惠：凭取件码到店享XX优惠。优惠力度要比普通新客优惠更大，因为取件者就在附近，到店门槛低。券面设计要醒目，印上门店导航二维码。", checklist: ["设计取件专属优惠券","设置比常规更大的优惠","印制导航二维码"] },
      { title: "物料铺设执行", content: "在快递站取件台、货架旁、取件提醒短信中植入门店优惠信息。也可在快递站门口摆放门店小型展架，配合『取完快递顺路来』的引导语。", checklist: ["在取件台放置优惠券","在货架旁放置展架","协商短信植入优惠信息"] },
      { title: "数据追踪优化", content: "追踪快递站渠道的到店核销率，计算每个快递站带来的客流量。效果好的加大投入（增加优惠券投放量），效果差的调整优惠力度或更换快递站。", checklist: ["统计快递站渠道核销率","计算各站点引流效果","优化合作策略"] }
    ]
  },
  {
    _id: "sol_041",
    title: "客单价提升组合策略",
    summary: "通过套餐设计、连带推荐和满减阶梯系统提升客单价",
    difficulty: "中等",
    effectiveTime: "3-7天",
    costRange: "0-300元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 6,
    sub: 603,
    steps: [
      { title: "客单价基线分析", content: "调取近3个月销售数据，统计平均客单价和客单价分布。找出：低客单客户占比、高客单客户购买组合、价格敏感区间。设定目标：客单价提升15%-20%。", checklist: ["统计当前平均客单价","分析客单价分布结构","设定提升目标15%-20%"] },
      { title: "套餐组合设计", content: "设计3档套餐：入门套餐（客单价+20%）、黄金套餐（客单价+50%）、尊享套餐（客单价+100%）。每个套餐内产品要有互补性和搭配感，价格比单买优惠10%-15%。", checklist: ["设计3档价位套餐","确保套餐内产品互补","套餐价比单买优惠10%以上"] },
      { title: "连带推荐话术", content: "编写各品类的连带推荐话术库，培训员工主动推荐。话术公式：确认需求+推荐搭配+说明优惠。如『您选了这个，搭配XX一起口感更好，套餐价还省15元』。", checklist: ["编写连带推荐话术库","培训员工推荐技巧","设置推荐成功奖励"] },
      { title: "满减阶梯设置", content: "设置3级满减阶梯：满X减Y1、满2X减Y2、满3X减Y3。每级门槛略高于当前客单价分布的峰值，引导客户多买一级。满减标识要醒目张贴。", checklist: ["设计3级满减阶梯","每级门槛高于客单价峰值","醒目张贴满减标识"] }
    ]
  },
  {
    _id: "sol_042",
    title: "闲时营收激活法",
    summary: "通过闲时专属优惠和活动，填补低峰时段营收空白",
    difficulty: "简单",
    effectiveTime: "3-5天",
    costRange: "0-200元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 6,
    sub: 603,
    steps: [
      { title: "闲时识别定位", content: "统计每日各时段营收，识别出2-3个闲时时段。餐饮店常见闲时：14:00-17:00下午茶时段；零售店常见闲时：工作日上午。闲时营收通常只占全天的10%-15%，是最大提升空间。", checklist: ["统计每日各时段营收","识别2-3个闲时时段","计算闲时营收占比"] },
      { title: "闲时专属产品", content: "为闲时开发专属产品线：餐饮做下午茶套餐、零售做上午特惠组合、服务做午间速效套餐。专属产品要成本低、毛利可、有吸引力，且不与高峰期主力产品冲突。", checklist: ["设计闲时专属产品线","确保成本低毛利可","与高峰产品不冲突"] },
      { title: "闲时优惠机制", content: "设置闲时专属优惠：闲时到店享X折、闲时套餐半价、闲时买一送一等。优惠力度要足够大，让原本不会来的客人愿意专程在闲时到店。在门口和线上明确标注闲时优惠时段。", checklist: ["设计闲时专属优惠力度","确保优惠有足够吸引力","标注闲时优惠时段"] },
      { title: "闲时客群定向", content: "针对闲时可能到店的客群做定向推广：自由职业者、退休老人、全职宝妈。通过社群、朋友圈定向推送闲时福利，培养闲时到店习惯。", checklist: ["识别闲时目标客群","社群定向推送闲时福利","培养闲时到店习惯"] }
    ]
  },
  {
    _id: "sol_043",
    title: "储值锁客增收法",
    summary: "设计多档储值方案锁定客户长期消费，一次性提升营收",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-500元",
    problemCodes: ["REVENUE_DROP","CUSTOMER_LOSS"],
    chapter: 3,
    sub: 304,
    steps: [
      { title: "储值档位设计", content: "设计3-4档储值方案：入门档（充值200送30）、进阶档（充值500送100）、尊享档（充值1000送250）、顶配档（充值2000送600）。每档赠送比例递增，激励客户选择高档位。", checklist: ["设计3-4档储值方案","赠送比例随档位递增","确保高档位性价比最诱人"] },
      { title: "储值权益叠加", content: "除充值赠送外，叠加储值专属权益：储值客户享会员价、生日双倍积分、新品优先体验、专属服务通道。权益要真实可感知，让储值客户有明显的身份优越感。", checklist: ["设计储值专属权益3项以上","确保权益真实可感知","制作储值权益对比表"] },
      { title: "储值推广话术", content: "编写储值推荐话术：结账时『您今天消费XX元，充值XX元的话这单免费还剩XX元』。话术要在客户消费体验最好的时刻（结账时）自然提出，不生硬推销。", checklist: ["编写结账储值推荐话术","培训员工自然推荐技巧","设置储值推荐成功奖励"] },
      { title: "储值客户维护", content: "储值客户是高价值客户，需重点维护。每月1次专属活动邀请、消费余额不足时推送充值提醒、储值到期前1个月提醒。防止储值客户流失，持续贡献营收。", checklist: ["设置月度储值客户活动","余额不足推送充值提醒","到期前1个月提醒续充"] }
    ]
  },
  {
    _id: "sol_044",
    title: "外卖增量营收法",
    summary: "系统入驻外卖平台并优化运营，开辟线上营收增量渠道",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-1000元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 4,
    sub: 402,
    steps: [
      { title: "平台选择入驻", content: "根据品类选择1-2个主流外卖平台入驻（美团/饿了么/抖音外卖）。准备资质材料完成入驻，拍摄高质量菜品图，设计线上菜单和包装。新店首月利用平台流量扶持期全力冲单。", checklist: ["选择1-2个外卖平台","准备资质完成入驻","拍摄高质量产品图"] },
      { title: "线上菜单优化", content: "线上菜单不同于堂食，需专门设计：设置引流款（低价走量）、利润款（核心毛利）、套餐款（提客单价）。菜品命名加修饰词提升价值感（如『秘制』『手作』『招牌』）。", checklist: ["设置引流款/利润款/套餐款","优化菜品命名增加价值感","设计3-5款线上专属套餐"] },
      { title: "好评运营管理", content: "外卖好评率直接影响排名和流量。随餐附赠小卡片引导好评（好评截图返现2-3元），差评24小时内回复处理。保持评分4.5分以上才能获得平台流量倾斜。", checklist: ["设计好评引导卡片","设置好评返现机制","差评24h内处理回复"] },
      { title: "利润率管控", content: "外卖平台抽成20%-25%，必须管控利润率：调整线上定价（比堂食高10%-15%）、优化包装成本、选择高毛利菜品主推。每周核算外卖利润率，低于15%需调整。", checklist: ["线上定价比堂食高10%-15%","优化包装降低成本","每周核算外卖利润率"] }
    ]
  },
  {
    _id: "sol_045",
    title: "老客户激活增收法",
    summary: "唤醒沉睡老客户回店消费，低成本快速提升营收",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-200元",
    problemCodes: ["REVENUE_DROP","CUSTOMER_LOSS"],
    chapter: 3,
    sub: 304,
    steps: [
      { title: "沉睡客户识别", content: "从会员系统或微信好友中筛选出3个月以上未到店的沉睡客户。按消费历史排序，优先激活历史消费额TOP30%的高价值客户。预计可激活20%-30%。", checklist: ["筛选3个月未到店客户","按历史消费额排序","标记TOP30%高价值客户"] },
      { title: "回归诱饵设计", content: "为沉睡客户设计专属回归礼：高价值客户送高感知价值回归礼（如免费服务/大额券），普通客户送限时超值优惠。诱饵要超出常规新客优惠，让老客户感受到被重视。", checklist: ["设计分层回归诱饵","高价值客户送高感知礼","确保回归礼超新客优惠"] },
      { title: "激活触达执行", content: "通过微信一对一私聊（非群发）触达沉睡客户，话术要真诚：『XX姐好久不见，准备了专属回归礼给您，这周来就能领』。配合朋友圈定点推送回归活动。", checklist: ["编写一对一激活话术","逐一私聊高价值客户","朋友圈定点推送回归活动"] },
      { title: "回店体验升级", content: "老客户回店时给予超出预期的体验：员工叫出名字、赠送专属小礼、介绍近期新变化。让回归客户感受到『回来真好』，而非『不过如此』。回店后7天内推送专属复购券锁定。", checklist: ["培训员工识别回归客户","准备专属回归体验","7天内推送复购券"] }
    ]
  },
  {
    _id: "sol_046",
    title: "私域直播带货法",
    summary: "在微信视频号开设私域直播，将粉丝转化为即时消费",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-500元",
    problemCodes: ["REVENUE_DROP","MARKETING_HARD"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "直播基础设施", content: "注册微信视频号，绑定门店公众号/企业微信。准备直播设备：手机支架、补光灯、收音麦（总投入200-500元）。选定固定直播时段，建议晚8-9点流量高峰。", checklist: ["注册微信视频号","购置基础直播设备","确定固定直播时段"] },
      { title: "直播内容策划", content: "设计直播内容框架：开场5分钟福利预热→20分钟产品展示/制作过程→10分钟限时秒杀→5分钟下期预告。每场准备3-5款主推品，其中1款超低价秒杀引流。", checklist: ["设计直播内容框架","准备3-5款主推品","设计1款秒杀引流品"] },
      { title: "私域流量导入", content: "直播前1天在微信群和朋友圈预告，设置预约提醒。直播中通过群分享链接拉人，员工转发直播间。私域直播核心是粉丝信任，不需要大流量，100人在线就能产生可观销售。", checklist: ["直播前1天群内预告","设置直播预约提醒","直播中群分享拉人"] },
      { title: "直播转化优化", content: "直播间设置专属优惠：直播价低于日常价、限时限量制造紧迫感。展示下单量增加信任（『已经有XX人下单了』）。每场直播后复盘数据：观看人数、下单转化率、客单价。", checklist: ["设置直播专属优惠","展示实时下单量","每场复盘核心数据"] }
    ]
  },
  {
    _id: "sol_047",
    title: "节日营销增收方案",
    summary: "系统规划全年节日营销日历，借势节日消费浪潮提升营收",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "200-1000元",
    problemCodes: ["REVENUE_DROP","MARKETING_HARD"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "节日营销日历", content: "制作全年节日营销日历，标注每个节日的营销窗口期。重点把握5大节点：春节、情人节、母亲节、中秋、双十一。每个节点提前2周启动预热，1周冲刺，节日当天引爆。", checklist: ["制作全年节日营销日历","标注5大重点节点","规划每个节点时间节奏"] },
      { title: "节日产品开发", content: "为每个节日开发1-2款限定产品/套餐：情人节双人套餐、母亲节感恩礼盒、中秋限定口味。节日产品要有仪式感和限量性，可溢价20%-30%。", checklist: ["为5大节点设计限定产品","产品需有仪式感和限量性","设置节日溢价空间"] },
      { title: "节日氛围营造", content: "提前1周完成门店节日氛围布置：主题装饰、节日音乐、节日包装。氛围感直接影响消费冲动，好的氛围能提升20%-30%的冲动消费。", checklist: ["提前1周布置节日氛围","准备节日主题包装","配置节日背景音乐"] },
      { title: "节日引流转化", content: "节日营销三段式：预热期社群/朋友圈种草→爆发期限时限量促销→长尾期节日余温返场。每个阶段设置不同优惠力度和话术，持续收割节日流量。", checklist: ["设计三段式营销节奏","预热期社群种草","爆发期限时限量引爆"] }
    ]
  },
  {
    _id: "sol_048",
    title: "增值服务增收法",
    summary: "在主营业务基础上增加高毛利增值服务，提升单客贡献",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-500元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 6,
    sub: 603,
    steps: [
      { title: "增值服务盘点", content: "盘点门店可增加的增值服务：餐饮可加外卖代煮/定制宴席、零售可加配送上门/礼品包装、服务可加上门服务/VIP专属时段。增值服务要满足『客户有需求+边际成本低+毛利高』三个条件。", checklist: ["列出5-10个候选增值服务","评估边际成本和毛利","筛选3个最优增值服务"] },
      { title: "增值服务定价", content: "增值服务定价采用『基础价+溢价』模式：基础价覆盖成本，溢价体现价值。如礼品包装基础价5元（成本2元），定制包装15元（成本5元）。定价要让客户觉得『值这个价』而非『太贵了』。", checklist: ["设计增值服务定价体系","确保基础价覆盖成本","溢价体现差异化价值"] },
      { title: "增值服务推广", content: "在核心消费环节自然推荐增值服务：结账时推荐礼品包装、点餐时推荐升级套餐、预约时推荐VIP时段。话术要自然不推销感，『要不要顺便XX』比『我推荐您XX』更有效。", checklist: ["编写增值服务推荐话术","在核心环节设置推荐触点","培训员工自然推荐技巧"] },
      { title: "效果评估优化", content: "追踪增值服务的采纳率和贡献率：多少客户购买了增值服务、增值服务占总营收比例。采纳率低于10%需优化价值感，低于5%需考虑更换服务。", checklist: ["统计增值服务采纳率","计算增值服务营收贡献","优化低采纳率的服务"] }
    ]
  },
  {
    _id: "sol_049",
    title: "会员日营收爆发法",
    summary: "设立固定会员日制造消费脉冲，定期引爆营收高峰",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-300元",
    problemCodes: ["REVENUE_DROP","CUSTOMER_LOSS"],
    chapter: 3,
    sub: 305,
    steps: [
      { title: "会员日规则制定", content: "选择每月固定1-2天作为会员日（如每月8号、18号）。会员日权益：会员价再享折上折、积分双倍、专属限时抢购、到店礼。规则简单明了，客户一听就懂。", checklist: ["确定会员日日期","制定3-4项会员日权益","确保规则简单易懂"] },
      { title: "会员日产品准备", content: "为会员日准备专属产品：限量爆款特价、会员日首发新品、专属组合套餐。产品要有『只有会员日才有』的稀缺感，驱动客户专门在会员日到店消费。", checklist: ["准备会员日限量爆款","安排新品会员日首发","设计专属组合套餐"] },
      { title: "会员日预热推广", content: "会员日前3天开始预热：社群倒计时海报、朋友圈每日悬念、短信提醒全部会员。预热要制造期待感，『本月8号会员日，这3款产品跌破底价』比『会员日来啦』有效10倍。", checklist: ["提前3天社群倒计时","每日朋友圈悬念预热","群发短信提醒会员"] },
      { title: "会员日当天引爆", content: "会员日当天全力引爆：早中晚社群3次推送、限时秒杀分时段引爆、门店设置会员日专区。统计当日营收对比平日，评估会员日拉动效果，逐月优化方案。", checklist: ["当日社群3次推送","设置分时段限时秒杀","统计当日营收对比平日"] }
    ]
  },
  {
    _id: "sol_050",
    title: "菜品毛利优化法",
    summary: "系统优化菜品结构和定价，整体提升菜品毛利率5-10个百分点",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-200元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 603,
    steps: [
      { title: "全菜品毛利盘点", content: "逐道菜品计算毛利率：售价-原材料成本÷售价。将所有菜品按毛利高低分为4类：高毛利高销量（明星）、高毛利低销量（潜力）、低毛利高销量（引流）、低毛利低销量（淘汰）。", checklist: ["计算每道菜品毛利率","按毛利/销量四象限分类","标记淘汰类菜品清单"] },
      { title: "低毛利菜品优化", content: "对低毛利菜品逐个处理：可调价的适当提价（每次5%-10%）、可换食材的用平替食材（不影响口感）、可缩减份量的适当减量。实在无法优化的低毛利低销量菜品直接下架。", checklist: ["低毛利菜品逐一评估","可调价的提价5%-10%","无法优化的直接下架"] },
      { title: "高毛利菜品推广", content: "重点推广高毛利菜品：在菜单上突出展示（加星标/放C位）、员工主动推荐、搭配套餐推送。目标是将高毛利菜品销量占比从当前提升到40%以上。", checklist: ["菜单突出高毛利菜品","培训员工推荐话术","设计高毛利菜品套餐"] },
      { title: "菜品结构动态调整", content: "建立月度菜品毛利复盘机制：每月统计各品类毛利贡献，动态调整菜品结构。新菜品上架前必须测算毛利达标（建议60%以上）才可上架，从源头管控毛利。", checklist: ["建立月度毛利复盘机制","新菜上架毛利达标才放行","目标整体毛利率提升5%"] }
    ]
  },
  {
    _id: "sol_051",
    title: "食材采购降本法",
    summary: "通过采购渠道优化和集中采购策略降低食材成本10%-20%",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-200元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 602,
    steps: [
      { title: "采购成本审计", content: "梳理全部食材供应商和采购价格，与市场批发价对比找出溢价项。统计各供应商采购额占比，识别过度依赖单一供应商的风险。目标找出10%以上的降本空间。", checklist: ["列出全部供应商和价格","与市场批发价对比","标记溢价超过10%的品类"] },
      { title: "多渠道比价采购", content: "对溢价品类启动多渠道比价：批发市场实地询价、线上批发平台（快驴、美菜）对比、同行拼单团购。不要只在一家采购，同品类至少保持2-3家供应商比价。", checklist: ["实地批发市场询价","线上平台比价","同品类保持2-3家供应商"] },
      { title: "集中采购谈判", content: "将分散采购集中到核心供应商，用采购量换取价格优惠。与供应商谈判：承诺月采购量X，换取价格降Y%。大宗食材可月结或预付锁定低价，但避免预付超过1个月用量。", checklist: ["集中采购到核心供应商","用量承诺换取价格优惠","大宗食材锁定低价"] },
      { title: "损耗管控降本", content: "采购降本不只是压价，还要减少损耗。建立每日食材损耗记录，分析损耗原因：过期、浪费、存储不当。针对top3损耗原因制定改善方案，通常可减少30%-50%损耗。", checklist: ["建立每日损耗记录","分析top3损耗原因","制定损耗改善方案"] }
    ]
  },
  {
    _id: "sol_052",
    title: "固定成本瘦身法",
    summary: "系统审查和削减房租、水电、设备等固定成本支出",
    difficulty: "较难",
    effectiveTime: "2-4周",
    costRange: "0-500元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 602,
    steps: [
      { title: "固定成本全盘点", content: "逐项列出所有固定成本：房租、物业费、水电燃气、设备租赁、网络通讯、保险、软件订阅等。按金额排序，找出占比较高的top5项目，作为优先优化对象。", checklist: ["列出全部固定成本项目","按金额排序找top5","标记每项的合同到期日"] },
      { title: "房租谈判优化", content: "房租通常是最大固定支出。如合同即将到期，以续约为筹码谈判降租10%-15%。周边商铺租金下行是谈判筹码。如无法降租，可谈减免物业费、增加免租期等变相降租。", checklist: ["调研周边商铺租金水平","以续约为筹码谈降租","备选变相降租方案"] },
      { title: "水电能耗管控", content: "水电是可优化的半固定成本：更换LED灯泡省电60%、安装定时开关控制非营业时间用电、空调设置合理温度（夏26度冬20度）、定期维护设备减少能耗。每月对比水电费变化。", checklist: ["更换LED节能灯泡","安装定时开关控制器","空调温度设置合理标准"] },
      { title: "冗余支出清理", content: "审查并清理冗余支出：未使用的软件订阅、重复的保险、闲置设备租赁。与供应商重新谈判：能否减免、能否降档、能否合并。每月可省出的固定成本直接转化为利润。", checklist: ["审查并取消未使用订阅","重新谈判保险和设备租赁","记录每月节省金额"] }
    ]
  },
  {
    _id: "sol_053",
    title: "人员排班优化法",
    summary: "科学优化排班制度，用更少工时覆盖同等业务量，降低人力成本",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-100元",
    problemCodes: ["PROFIT_LOW","STAFF_HARD"],
    chapter: 6,
    sub: 601,
    steps: [
      { title: "工时与客流匹配分析", content: "统计每日各时段客流和对应在岗人数，计算每个时段的『人均服务客数』。找出人员过剩时段（人均服务客数过低）和人员不足时段（人均服务客数过高），精准匹配排班。", checklist: ["统计各时段客流和人员","计算各时段人均服务客数","标记人员过剩和不足时段"] },
      { title: "弹性排班制度", content: "取消固定排班，改为弹性排班：高峰时段全员在岗，闲时只留核心人员，其他人员调休。引入兼职覆盖突发高峰，全职人员集中排关键班次。每月根据客流趋势调整排班。", checklist: ["设计弹性排班表","高峰全岗闲时精简","引入兼职覆盖突发高峰"] },
      { title: "跨岗位技能培训", content: "培训员工掌握2-3个岗位技能，实现『一专多能』。高峰时任何岗位缺人都能顶上，减少备岗人员。例如收银员也能做简单服务，服务员也能做基础备餐。", checklist: ["制定跨岗位培训计划","每位员工掌握2-3岗技能","定期轮岗巩固技能"] },
      { title: "人力成本监控", content: "建立人力成本占比监控：人力成本÷营业额，行业合理标准15%-25%。超过25%必须优化排班，低于15%可能影响服务质量。每周复盘人力成本占比，持续优化。", checklist: ["每周计算人力成本占比","对标行业合理标准","持续优化排班方案"] }
    ]
  },
  {
    _id: "sol_054",
    title: "库存周转加速法",
    summary: "优化库存管理和周转速度，减少库存积压和资金占用",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 602,
    steps: [
      { title: "库存全面盘点", content: "进行一次全面库存盘点，记录每个SKU的库存量、周转天数和滞销天数。将库存分为4类：快周转（7天内）、正常周转（7-30天）、慢周转（30-90天）、滞销（90天以上）。", checklist: ["完成全部SKU库存盘点","计算每个SKU周转天数","标记慢周转和滞销品"] },
      { title: "滞销库存清理", content: "对滞销品启动清理：90天以上滞销品做清仓特卖或捆绑销售，60-90天滞销品做促销打折加速出清。清理回收的资金用于补充快周转品库存，提升整体周转效率。", checklist: ["制定滞销品清仓方案","60天以上产品加速促销","回收资金补充快周转品"] },
      { title: "安全库存优化", content: "根据历史销量和供应周期计算每个SKU的安全库存量，避免过度备货。快消品保持7天安全库存，常规品保持14天，慢消品保持7天并考虑是否淘汰。", checklist: ["计算各SKU安全库存量","快消品7天常规品14天","慢消品降低安全库存"] },
      { title: "进销存系统化管理", content: "建立系统化的进销存管理：每日记录进货和销售数据，设置库存预警线（低于安全库存自动提醒补货）。每周复盘库存周转数据，持续优化采购频率和批量。", checklist: ["建立每日进销存记录","设置库存预警线","每周复盘周转数据"] }
    ]
  },
  {
    _id: "sol_055",
    title: "包装成本精简法",
    summary: "优化包装策略降低包装成本，兼顾品牌形象和成本控制",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-200元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 601,
    steps: [
      { title: "包装成本审计", content: "统计所有包装物料成本：外卖盒、袋子、封签、餐具、赠品包装等。计算包装成本占售价的比例，通常应控制在3%-5%。超过5%的品类需重点优化。", checklist: ["列出全部包装物料及单价","计算包装成本占比","标记超过5%的品类"] },
      { title: "包装减量优化", content: "在不影响客户体验前提下精简包装：减小包装尺寸匹配实际份量、减少不必要的装饰性包装、统一包装规格降低采购成本。例如去掉过度填充物、用通用盒替代定制盒。", checklist: ["审查可精简的包装项","统一包装规格","去除不必要装饰性包装"] },
      { title: "供应商重新比价", content: "包装物料每季度比价一次，在1688等批发平台找源头工厂直供。采购量大的品类可找工厂定制，量小的可与其他商户拼单。目标降低包装采购成本15%-20%。", checklist: ["线上平台比价包装物料","大品类找工厂直供","小品类拼单采购"] },
      { title: "包装收费策略", content: "对外卖和打包场景实施包装收费：基础包装免费，升级包装收费。如普通餐盒免费，环保餐盒收1元；普通袋子免费，保温袋收3元。既降低成本又满足差异化需求。", checklist: ["设计基础/升级包装方案","制定升级包装收费标准","线上菜单标注包装费"] }
    ]
  },
  {
    _id: "sol_056",
    title: "产品定价策略优化",
    summary: "科学调整产品定价，在客户可接受范围内最大化利润空间",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-100元",
    problemCodes: ["PROFIT_LOW","REVENUE_DROP"],
    chapter: 6,
    sub: 603,
    steps: [
      { title: "价格弹性测试", content: "选择3-5款核心产品做价格弹性测试：提价5%-10%后观察2周销量变化。如销量下降不超过5%说明弹性低可提价，下降超过15%说明弹性高需谨慎。测试期间密切监控客户反馈。", checklist: ["选择3-5款核心产品","提价5%-10%测试2周","监控销量和客户反馈"] },
      { title: "锚定价格策略", content: "在菜单/价格表上设置『锚定价』：放一个高价产品做参照，让中档产品显得更划算。如298元的精品套餐让158元的标准套餐显得很值。锚定价产品不指望多卖，但能提升其他产品成交率。", checklist: ["设计锚定价格产品","合理拉开价格梯度","测试锚定效果"] },
      { title: "尾数定价优化", content: "将整数定价改为尾数定价：100元→98元、50元→48元。虽然只差2元，但心理学上48元属于『40多』而非『50』，感知差异远大于实际差异。但不要全部改尾数，部分保持整数显品质。", checklist: ["选择适合尾数定价的产品","改为X8或X9定价","保留部分整数定价显品质"] },
      { title: "动态定价机制", content: "建立动态定价机制：新品上市定价略高试探市场→1个月后根据反馈调整→稳定后定期小调。季节性产品旺季提价淡季降价。每月review一次核心产品定价合理性。", checklist: ["建立新品定价-调价流程","季节性产品动态调价","月度定价合理性review"] }
    ]
  },
  {
    _id: "sol_057",
    title: "水电能耗精细管控",
    summary: "精细化管理门店水电能耗，每月节省10%-20%能源支出",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-300元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 601,
    steps: [
      { title: "能耗基线摸底", content: "调取近6个月水电费账单，计算月均能耗成本和每平米能耗。找到能耗高峰月和低谷月，分析异常波动原因。设定降耗目标：比当前降低10%-15%。", checklist: ["调取6个月水电费账单","计算月均能耗和单位能耗","设定10%-15%降耗目标"] },
      { title: "用电设备优化", content: "逐一检查用电设备：照明全部换LED、冰箱冷柜定期除霜、空调滤网月清洗、老旧高耗设备考虑更换。非营业时间切断非必要电源，安装定时器自动控制。", checklist: ["全部换装LED照明","冰柜定期除霜月清滤网","安装定时器控非营业用电"] },
      { title: "用水用气管控", content: "检查全部水龙头是否漏水、马桶是否节水、热水系统是否高效。厨房燃气灶具定期清理喷嘴提升热效率、管线检查漏气。小问题修复成本极低但节能效果明显。", checklist: ["检查全部水龙头是否漏水","燃气灶具清理喷嘴","管线检查漏气漏水"] },
      { title: "能耗监控机制", content: "建立每日能耗记录：记录电表/水表读数，与营业额对比计算能耗占比。发现异常波动立即排查。每月对比能耗趋势，持续优化管控措施。", checklist: ["建立每日能耗记录表","对比能耗占比趋势","异常波动立即排查"] }
    ]
  },
  {
    _id: "sol_058",
    title: "浪费治理利润修复法",
    summary: "识别和治理门店运营中的各类浪费，将浪费转化为利润",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-100元",
    problemCodes: ["PROFIT_LOW"],
    chapter: 6,
    sub: 601,
    steps: [
      { title: "浪费全面排查", content: "从7个维度排查浪费：食材浪费、物料浪费、时间浪费、空间浪费、能源浪费、人力浪费、客户浪费（未充分开发客户价值）。每个维度列出具体浪费项目和估算金额。", checklist: ["逐一排查7大浪费维度","列出具体浪费项目","估算各浪费项的月损失额"] },
      { title: "食材浪费治理", content: "重点治理食材浪费：建立每日食材损耗记录（含原因）、规范切配标准减少边角料浪费、用边角料开发员工餐或特价菜、过期食材每日清点及时处理。目标将食材损耗率从5%-10%降至2%-3%。", checklist: ["建立每日食材损耗记录","规范切配标准减少浪费","边角料二次利用"] },
      { title: "时间和人力浪费治理", content: "优化工作流程减少时间浪费：制定标准操作流程SOP、减少重复劳动和无效等待、用数字化工具替代手工记录。人力浪费的核心是『忙的忙死闲的闲死』，需优化分工和排班。", checklist: ["制定核心岗位SOP","消除重复劳动和等待","优化分工平衡工作量"] },
      { title: "浪费治理长效机制", content: "建立浪费治理长效机制：每日浪费记录+每周浪费复盘+每月浪费目标。将浪费治理纳入员工考核，设置『浪费减少奖』。每月公布浪费治理成果，形成全员节约文化。", checklist: ["建立每日浪费记录制度","将浪费治理纳入考核","每月公布浪费治理成果"] }
    ]
  },
  {
    _id: "sol_059",
    title: "爆款打造四步法",
    summary: "系统打造门店爆款产品，用单品爆发带动整体销量",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "200-1000元",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 201,
    steps: [
      { title: "爆款候选筛选", content: "从现有产品中筛选爆款候选：选择成本可控、制作/采购标准化、口感/体验有记忆点的2-3款产品。爆款不一定是利润最高的，但必须是能形成口碑传播和复购的。", checklist: ["筛选2-3款爆款候选","确认成本可控可标准化","验证口感/体验有记忆点"] },
      { title: "爆款体验打磨", content: "对候选爆款进行体验打磨：优化口味/效果到极致、设计独特的呈现方式（造型/包装/上桌仪式）、给爆款起一个有传播力的名字（如『爆汁牛堡』而非『牛肉汉堡』）。", checklist: ["优化口味/效果到极致","设计独特呈现方式","起一个有传播力的名字"] },
      { title: "爆款冷启动", content: "选择1周时间集中推广爆款：门口设试吃/试用台、社群每日推一条爆款内容、限时特价制造尝鲜冲动。首周目标让100个客户体验并收集反馈，好评率需达85%以上。", checklist: ["设置门口试吃/试用台","社群每日推爆款内容","收集100份体验反馈"] },
      { title: "爆款口碑放大", content: "好评率达标的爆款启动口碑放大：引导客户拍照打卡分享、设计『买爆款的N种搭配』引导连带消费、设置爆款订阅/预定机制保证复购。爆款稳定后逐步提价回归正常毛利。", checklist: ["引导客户拍照打卡分享","设计爆款搭配推荐","设置爆款预定/订阅机制"] }
    ]
  },
  {
    _id: "sol_060",
    title: "滞销品清仓术",
    summary: "快速清理滞销库存回笼资金，腾出货架给畅销品",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-100元",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 204,
    steps: [
      { title: "滞销品全面识别", content: "按销售数据标记所有滞销品：30天无销量的为重度滞销、60天无销量的为死库存。列出滞销品清单及库存量、成本价、当前售价，计算滞销占用的资金总额。", checklist: ["标记30天/60天无销量产品","列出滞销品清单及库存量","计算滞销占用资金总额"] },
      { title: "分批清仓策略", content: "制定分批清仓方案：第一批5折清30天滞销品、第二批3折清60天滞销品、第三批1折或赠品清死库存。每批限时7天，制造紧迫感。可设『清仓专区』集中展示。", checklist: ["制定分批折扣方案","设置清仓专区","每批限时7天"] },
      { title: "捆绑搭售清理", content: "将滞销品与畅销品捆绑销售：买畅销品送滞销品、畅销品+滞销品组合特价。让客户因畅销品而顺便带走滞销品，比单独打折清仓更有效。", checklist: ["设计畅销+滞销捆绑组合","设置组合特价","培训员工推荐捆绑方案"] },
      { title: "清仓渠道拓展", content: "除门店清仓外拓展线上渠道：闲鱼批量出、社区团购低价清、同行调货（品类互补的同行可能需要）。实在无法清掉的做捐赠获取税务抵扣，或做员工福利处理。", checklist: ["闲鱼/线上批量出清","社区团购低价清","剩余做捐赠或员工福利"] }
    ]
  },
  {
    _id: "sol_061",
    title: "季节性产品规划法",
    summary: "提前规划季节性产品线，把握季节消费窗口期最大化销量",
    difficulty: "中等",
    effectiveTime: "2-4周",
    costRange: "200-1000元",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 205,
    steps: [
      { title: "季节需求预判", content: "分析门店品类在各季节的需求变化：春夏秋冬各有什么消费热点、去年同期什么产品最好卖、今年有什么新趋势。提前2个月开始筹备下一季的产品线。", checklist: ["分析四季需求变化规律","回顾去年同期热销品","提前2个月筹备下季产品"] },
      { title: "应季产品开发", content: "为每个季节开发2-3款应季新品：春季清爽系列、夏季消暑系列、秋季滋补系列、冬季暖身系列。新品需提前1个月试销验证，确认市场接受度后再正式推广。", checklist: ["开发2-3款应季新品","提前1个月试销验证","确认市场接受度再推广"] },
      { title: "换季库存过渡", content: "换季时做好库存过渡：当季产品提前1个月开始清仓，新品提前2周开始预热上架。避免『青黄不接』导致销售断档，也避免旧品大量积压到下一年。", checklist: ["当季品提前1个月清仓","新品提前2周预热上架","避免换季销售断档"] },
      { title: "反季节营销策略", content: "淡季做反季节营销创造需求：夏天推『冬品夏卖』特惠（羽绒服反季特卖）、冬天推『夏日提前订』锁定客户。反季节营销核心是价格优势，折扣力度要足够大。", checklist: ["设计反季节营销方案","折扣力度要足够吸引","提前锁定淡季客户需求"] }
    ]
  },
  {
    _id: "sol_062",
    title: "产品组合套餐法",
    summary: "设计多种产品组合套餐，提升连带率和客单价带动整体销量",
    difficulty: "简单",
    effectiveTime: "3-5天",
    costRange: "0-200元",
    problemCodes: ["PRODUCT_SLOW","REVENUE_DROP"],
    chapter: 2,
    sub: 202,
    steps: [
      { title: "消费场景分析", content: "分析客户主要消费场景：早餐/午餐/晚餐、个人/情侣/家庭、日常/聚会/送礼。每个场景对应设计1-2款套餐，让客户不用思考就能找到适合的组合。", checklist: ["列出5-8个主要消费场景","每场景设计1-2款套餐","确保套餐覆盖核心场景"] },
      { title: "套餐搭配设计", content: "套餐设计原则：主品+搭配品+惊喜品。主品是客户想买的，搭配品是自然关联的，惊喜品是超预期的（如赠品或小份尝鲜品）。套餐总价要比单买省10%-15%。", checklist: ["设计主品+搭配+惊喜结构","确保比单买省10%-15%","每款套餐含1个惊喜品"] },
      { title: "套餐定价策略", content: "套餐定价用『锚定效应』：菜单上先标各单品总价，再划掉写套餐价。如『单买68元，套餐价52元』。视觉上让客户感受到明确的节省金额，刺激决策。", checklist: ["标注单买总价和套餐价","划掉原价突显节省金额","确保节省金额视觉醒目"] },
      { title: "套餐推广追踪", content: "统计各套餐的销量和占比，找出最受欢迎的套餐加大推广，不受欢迎的优化搭配或淘汰。每月更新1-2款新套餐保持新鲜感，同时保留经典套餐作为稳定产出。", checklist: ["统计各套餐销量占比","优化低销量套餐","月度更新1-2款新套餐"] }
    ]
  },
  {
    _id: "sol_063",
    title: "产品体验升级法",
    summary: "从感官、服务和仪式感三维度升级产品体验，提升购买转化",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "200-1000元",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 203,
    steps: [
      { title: "体验差距诊断", content: "从客户视角体验自家产品和竞品产品，找出体验差距。关注5个触点：视觉（外观/陈列）、嗅觉（气味/新鲜度）、味觉/触觉（品质/手感）、听觉（环境音/上桌声）、仪式感（上桌方式/包装）。", checklist: ["从客户视角体验自家产品","对比竞品找出体验差距","列出5个触点的改进项"] },
      { title: "感官体验升级", content: "重点升级视觉和仪式感（成本最低效果最明显）：改善产品摆盘/陈列、增加上桌仪式（如揭盖/淋酱）、优化包装设计、增加视觉亮点（如点缀/装饰）。微小的视觉改变能大幅提升感知价值。", checklist: ["改善产品摆盘和陈列","设计上桌仪式感","优化包装视觉设计"] },
      { title: "服务体验配套", content: "产品体验升级需配套服务升级：点单时介绍产品故事、上产品时说明特色/食用方式、用餐后主动询问体验。让客户从『买了一个产品』变成『获得了一次体验』。", checklist: ["编写产品故事和介绍话术","培训上产品时的说明方式","设置餐后体验回访"] },
      { title: "体验效果验证", content: "体验升级后追踪关键指标：客户好评率、拍照分享率、复购率。三项指标均提升说明升级有效。仅好评率提升但复购率不升，需检查是否『好看不好吃』，调整产品本身品质。", checklist: ["追踪好评率和分享率","追踪复购率变化","根据数据调整升级方向"] }
    ]
  },
  {
    _id: "sol_064",
    title: "试吃试用转化法",
    summary: "通过免费试吃试用打破客户购买犹豫，直接提升成交率",
    difficulty: "简单",
    effectiveTime: "1-3天",
    costRange: "100-500元",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 203,
    steps: [
      { title: "试吃选品策略", content: "选择适合试吃的产品：味道有冲击力的（闻着香/看着诱人）、新品需教育市场的、高毛利值得投入试吃成本的。避免选择味道平淡或需多次体验才能感受价值的产品做试吃。", checklist: ["筛选2-3款适合试吃的产品","确保味道有冲击力","确认毛利覆盖试吃成本"] },
      { title: "试吃场景设计", content: "在客户必经动线上设试吃点：门口（引流进店）、货架旁（促进决策）、收银台旁（冲动加购）。试吃份量要小而精，一口能尝到核心味道即可，避免吃饱不买。", checklist: ["设3个试吃触点","控制试吃份量小而精","确保一口尝到核心味道"] },
      { title: "试吃话术设计", content: "试吃时配合精准话术：递上试吃→『尝尝我们家新出的XX』→客户品尝→『怎么样？现在买还有XX优惠』。关键是试吃后立即给一个限时优惠促进即时决策，错过就没了。", checklist: ["编写试吃递品话术","设计试吃后即时优惠","训练员工自然过渡促单"] },
      { title: "试吃效果追踪", content: "统计试吃转化率：多少人试吃→多少人购买→转化率多少。行业平均试吃转化率15%-25%，低于10%需优化产品味道或话术，高于25%可加大试吃投入。", checklist: ["统计试吃人数和购买人数","计算试吃转化率","优化低转化率的环节"] }
    ]
  },
  {
    _id: "sol_065",
    title: "产品故事化营销法",
    summary: "为产品注入故事和情感价值，从卖功能升级为卖故事",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["PRODUCT_SLOW","MARKETING_HARD"],
    chapter: 2,
    sub: 201,
    steps: [
      { title: "产品故事挖掘", content: "为每款核心产品挖掘1个独特故事：食材的产地故事、制作工艺的匠心故事、创始人的初心故事、客户的感人故事。故事要真实而非编造，真实才能打动人。", checklist: ["为3-5款核心产品找故事","确保故事真实可追溯","故事要有情感共鸣点"] },
      { title: "故事内容制作", content: "将故事制作成可传播的内容：产品卡片印上故事摘要、菜单/价签加故事标签、朋友圈/短视频拍故事版产品介绍。故事版内容比纯产品介绍互动量高3-5倍。", checklist: ["制作产品故事卡片","菜单加故事标签","拍摄故事版短视频"] },
      { title: "故事场景植入", content: "在客户接触产品的各个环节植入故事：点单时讲食材故事、上产品时讲工艺故事、包装上印品牌故事。让客户每次接触产品都感受到『这不只是一个产品，背后还有故事』。", checklist: ["点单话术植入故事","上产品时讲述工艺","包装印品牌故事"] },
      { title: "客户共创故事", content: "邀请客户参与故事共创：征集『你和XX产品的故事』、客户体验故事分享有奖、老客户见证视频。客户讲的故事比商家讲的有10倍信任度，是最有力的营销素材。", checklist: ["征集客户产品故事","设置故事分享奖励","制作客户见证视频"] }
    ]
  },
  {
    _id: "sol_066",
    title: "新品孵化试销法",
    summary: "建立小批量试销验证机制，降低新品上市风险提高成功率",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "100-500元",
    problemCodes: ["PRODUCT_SLOW"],
    chapter: 2,
    sub: 204,
    steps: [
      { title: "新品创意收集", content: "建立新品创意来源：客户反馈高频需求、竞品热销品分析、行业趋势洞察、员工前线观察。每月收集5-10个新品创意，筛选出2-3个进入试销流程。", checklist: ["建立新品创意收集渠道","每月收集5-10个创意","筛选2-3个进入试销"] },
      { title: "小批量试产", content: "对入选创意做小批量试产（10-20份），成本控制在500元以内。试产品不需要完美包装，但产品本身品质要到位。试产同时准备试销话术和反馈问卷。", checklist: ["小批量试产10-20份","控制试产成本500元内","准备试销话术和问卷"] },
      { title: "定向试销验证", content: "将试产品向3类人群定向试销：老客户（忠实度测试）、新客户（吸引力测试）、挑剔客户（品质测试）。收集3类人群的评分和改进建议，综合评分7分以上方可正式上市。", checklist: ["向3类人群定向试销","收集评分和改进建议","综合7分以上可上市"] },
      { title: "正式上市推广", content: "试销通过的新品启动正式上市：首周『新品尝鲜价』引流、门店重点陈列展示、社群/朋友圈新品尝鲜活动、员工主动推荐。上市2周复盘销量和好评率，不达预期及时调整或下架。", checklist: ["设置新品尝鲜价","重点陈列和主动推荐","2周复盘决定去留"] }
    ]
  },
  {
    _id: "sol_067",
    title: "产品差异化定位法",
    summary: "从同质化竞争中突围，打造不可替代的产品差异化定位",
    difficulty: "较难",
    effectiveTime: "2-4周",
    costRange: "500-2000元",
    problemCodes: ["PRODUCT_SLOW","COMPETITION"],
    chapter: 2,
    sub: 203,
    steps: [
      { title: "同质化诊断", content: "对比自家产品和周边竞品，列出相同点和不同点。如果相同点超过80%，说明严重同质化。客户没有理由选你不选别人，只能拼价格，陷入恶性循环。", checklist: ["对比5家竞品找差异","统计同质化程度","找出可差异化的方向"] },
      { title: "差异化方向选择", content: "从4个方向寻找差异化：品类差异化（做别人不做的细分）、品质差异化（做得比别人更好）、体验差异化（服务比别人更好）、人群差异化（服务别人忽略的客群）。选择1-2个方向深度突破。", checklist: ["评估4个差异化方向可行性","选择1-2个方向突破","确认差异化可持续性"] },
      { title: "差异化产品打造", content: "围绕选定的差异化方向打造产品：如选品质差异化则升级原材料和工艺、选体验差异化则设计独特服务和仪式、选人群差异化则定制专属产品线。差异化要有壁垒，竞品短期无法模仿。", checklist: ["围绕方向打造差异化产品","确保差异化有模仿壁垒","测试差异化产品的市场反应"] },
      { title: "差异化传播强化", content: "将差异化定位变成一句话传播语：『全城唯一XX』『XX领域最XX的店』。在所有触点强化这一定位：门头、菜单、宣传、话术。让客户一提到某个品类就想到你的差异化标签。", checklist: ["提炼差异化传播语","全触点强化差异化定位","持续传播建立心智占位"] }
    ]
  },
  {
    _id: "sol_068",
    title: "会员等级体系搭建法",
    summary: "搭建3级会员等级体系，用成长机制锁定客户长期消费",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-500元",
    problemCodes: ["CUSTOMER_LOSS"],
    chapter: 3,
    sub: 303,
    steps: [
      { title: "等级规则设计", content: "设计3级会员体系：银卡（注册即享，基础权益）、金卡（消费满500元或3个月内消费5次，进阶权益）、钻石卡（消费满2000元或半年消费15次，顶级权益）。等级门槛要『跳一跳够得着』。", checklist: ["设计3级会员等级规则","设置合理的升级门槛","确保每级权益有明显差异"] },
      { title: "分级权益设计", content: "为每级会员设计差异化权益：银卡享积分+生日礼、金卡享折扣+优先预约+专属活动、钻石卡享折上折+免费配送+私人顾问。权益要真实有用，不能是『看起来很多实际没用』的伪权益。", checklist: ["银卡设计基础权益","金卡设计进阶权益","钻石卡设计顶级权益"] },
      { title: "升级激励机制", content: "设计『即将升级』推送机制：距升级差XX元时推送『再消费XX元即可升级金卡享XX权益』。利用损失厌恶心理（不消费就失去升级机会）驱动客户加速消费。升级瞬间给予仪式感（如升级礼包）。", checklist: ["设置即将升级推送提醒","设计升级仪式感礼包","利用损失厌恶促消费"] },
      { title: "降级预警机制", content: "设置会员降级预警：3个月未消费的会员推送『您的金卡将于X日降级，再消费1次即可保级』。降级预警比升级激励更有效，因为『失去已有』比『得到未得』更痛苦。", checklist: ["设置3个月未消费预警","推送降级提醒保级引导","降级后提供重新升级通道"] }
    ]
  },
  {
    _id: "sol_069",
    title: "客户生命周期管理法",
    summary: "按客户生命周期阶段精准运营，降低每个阶段的流失率",
    difficulty: "较难",
    effectiveTime: "2-4周",
    costRange: "0-500元",
    problemCodes: ["CUSTOMER_LOSS"],
    chapter: 3,
    sub: 301,
    steps: [
      { title: "生命周期划分", content: "将客户划分为5个阶段：新客期（首次到店1个月内）、成长期（1-3个月消费3次以上）、成熟期（3个月以上稳定消费）、衰退期（消费频率下降50%）、流失期（3个月未消费）。", checklist: ["定义5个生命周期阶段","制定各阶段判定标准","给所有客户打上阶段标签"] },
      { title: "新客期转化运营", content: "新客期是流失率最高的阶段（约60%新客不会再来）。对策：到店后24小时微信回访、7天内推送专属复购券、30天内邀请参加门店活动。目标将新客留存率提升到50%以上。", checklist: ["设置24h回访机制","7天内推送复购券","30天内邀请门店活动"] },
      { title: "成熟期深耕运营", content: "成熟期客户是核心资产，要深耕提升价值：推荐更高价位产品、邀请成为品鉴官/KOC、设计专属尊享体验。目标将成熟期客户客单价提升20%以上，同时延长成熟期时长。", checklist: ["推荐高价位产品","邀请成为门店KOC","设计专属尊享体验"] },
      { title: "衰退期挽回运营", content: "衰退期是挽回的最后窗口，必须高度重视：消费频率下降时立即触达、推送超常规回归福利、安排一对一深度沟通了解原因。挽回一个衰退客户成本是维护成熟客户的5倍，但远低于获新客。", checklist: ["消费频率下降立即触达","推送超常规回归福利","一对一沟通了解流失原因"] }
    ]
  },
  {
    _id: "sol_070",
    title: "转介绍裂变锁客法",
    summary: "设计客户转介绍奖励机制，用老客户带来新客户降低流失",
    difficulty: "简单",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["CUSTOMER_LOSS","TRAFFIC_LOW"],
    chapter: 3,
    sub: 305,
    steps: [
      { title: "转介绍机制设计", content: "设计双向奖励的转介绍机制：老客户推荐新客户，双方各得奖励。如推荐1人各得20元券、推荐3人各得50元券、推荐5人各得100元券。奖励要有阶梯，激励多推荐。", checklist: ["设计双向奖励方案","设置推荐阶梯奖励","确保双方都有足够动力"] },
      { title: "推荐工具准备", content: "为老客户提供简单的推荐工具：专属推荐二维码/小程序链接、精美推荐海报（含老客户专属优惠）、一键转发朋友圈的素材。降低推荐门槛，3步内完成推荐。", checklist: ["生成专属推荐二维码","制作推荐海报素材","准备一键转发朋友圈素材"] },
      { title: "推荐场景引导", content: "在客户体验最好的时刻引导推荐：消费后结账时『满意的话推荐朋友来，双方都有礼』、会员日『今天介绍朋友，你俩都享会员价』。在客户满意时提出，转化率最高。", checklist: ["在结账时引导推荐","会员日推荐享额外权益","培训员工把握推荐时机"] },
      { title: "推荐数据追踪", content: "追踪转介绍数据：每月推荐人数、推荐转化率、推荐新客留存率。根据数据优化：奖励力度不够则加大、推荐流程太复杂则简化、推荐时机不对则调整。", checklist: ["统计月度推荐人数和转化率","追踪推荐新客留存率","根据数据优化机制"] }
    ]
  },
  {
    _id: "sol_071",
    title: "客户满意度提升法",
    summary: "系统提升客户满意度，从源头降低客户流失率",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["CUSTOMER_LOSS"],
    chapter: 3,
    sub: 302,
    steps: [
      { title: "满意度基线调研", content: "通过3种方式调研客户满意度：离店时简单评分（1-5分）、微信回访满意度调查、匿名意见箱。重点关注『不满意』和『一般』的客户，他们的具体不满就是改进方向。", checklist: ["设置离店评分机制","微信回访满意度调查","收集匿名改进意见"] },
      { title: "不满原因分析", content: "汇总不满意客户的反馈，按频率排序不满原因TOP5。常见不满原因：等位/等餐太久、服务态度不好、产品质量不稳定、环境不干净、价格不透明。针对每个原因制定改进方案。", checklist: ["汇总不满原因并排序","确定TOP5不满原因","逐一制定改进方案"] },
      { title: "关键触点优化", content: "优化客户体验的5个关键触点：进门第一印象（招呼+引导）、等待过程（提供茶水/杂志）、消费过程（主动服务+品质保证）、结账体验（快捷+感谢）、离店后（回访+关怀）。", checklist: ["优化进门第一印象","改善等待过程体验","优化结账和离店体验"] },
      { title: "满意度持续监控", content: "建立满意度持续监控机制：每周统计满意度评分、每月分析不满趋势、每季度做深度满意度调研。满意度低于4分（5分制）的时段/品类/员工重点改进，持续追踪改善效果。", checklist: ["每周统计满意度评分","月度分析不满趋势","季度深度满意度调研"] }
    ]
  },
  {
    _id: "sol_072",
    title: "老客户专属权益法",
    summary: "设计老客户专属权益体系，让客户舍不得离开",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "200-500元",
    problemCodes: ["CUSTOMER_LOSS"],
    chapter: 3,
    sub: 304,
    steps: [
      { title: "老客户识别分层", content: "定义老客户标准：累计消费满X元或消费满X次。将老客户分为3层：普通老客户（基础权益）、核心老客户（进阶权益）、超级老客户（顶级权益）。每层设置不同的专属权益。", checklist: ["定义老客户标准","分3层设定门槛","确保分层标准清晰可执行"] },
      { title: "专属权益设计", content: "设计只有老客户才能享受的专属权益：老客户专属折扣（比新客多5%-10%）、优先新品体验权、生日月专属礼物、年度回馈礼、专属服务通道。权益要让老客户感到『被特别对待』。", checklist: ["设计5项以上专属权益","确保权益有排他性","权益让老客户感到被重视"] },
      { title: "权益感知强化", content: "让老客户清晰感知到自己的专属权益：消费时标注『老客户专享价，为您省了XX元』、生日当天收到专属祝福和礼物、每次到店有专属标识（如专属杯垫/餐具）。感知比实际更重要。", checklist: ["消费时标注节省金额","生日当天专属祝福","到店时提供专属标识"] },
      { title: "流失预警与挽留", content: "监控老客户消费频率，频率下降50%时触发预警。通过店长亲自回访、赠送超常规回归礼（如免费服务一次）、提供专属问题解决方案来挽留。挽留成功率目标50%以上。", checklist: ["设置消费频率下降预警","店长亲自回访流失客户","提供超常规回归福利"] }
    ]
  },
  {
    _id: "sol_073",
    title: "售后服务升级法",
    summary: "升级售后服务体系，用超预期售后赢得客户终身忠诚",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["CUSTOMER_LOSS"],
    chapter: 3,
    sub: 302,
    steps: [
      { title: "售后标准制定", content: "制定售后服务的5项标准：响应速度（投诉30分钟内响应）、解决时效（24小时内给出方案）、补偿标准（不满意即补偿）、回访确认（解决后24小时回访）、升级通道（店长级二次处理）。", checklist: ["制定5项售后标准","全员培训达标","标准上墙公示给客户看"] },
      { title: "主动售后机制", content: "变被动等待投诉为主动售后回访：消费后24小时微信回访体验、新品消费后3天主动问感受、大额消费后1周电话关怀。主动售后能发现90%的潜在不满，在客户决定离开前解决问题。", checklist: ["设置24h微信回访","新品3天主动问感受","大额消费1周电话关怀"] },
      { title: "超预期补偿方案", content: "遇到客户不满时给予超预期补偿：客户期望退换，你退换+赠送+道歉；客户期望道歉，你道歉+补偿+改进承诺。超预期补偿的成本远低于流失一个客户的损失，且能将不满客户转化为忠诚客户。", checklist: ["制定超预期补偿方案","补偿要超出客户预期","将不满客户转化为忠实客户"] },
      { title: "售后数据复盘", content: "每月复盘售后数据：投诉类型分布、处理时效达标率、客户满意度恢复率。投诉最多的类型是品质问题还是服务问题？针对性改进。售后数据是最好的产品和服务改进指南。", checklist: ["月度售后数据复盘","分析投诉类型和趋势","针对性改进高频问题"] }
    ]
  },
  {
    _id: "sol_074",
    title: "客户社群精细化运营",
    summary: "将客户社群精细化分层运营，提升社群客户留存和消费",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-300元",
    problemCodes: ["CUSTOMER_LOSS","MARKETING_HARD"],
    chapter: 3,
    sub: 305,
    steps: [
      { title: "社群分层设计", content: "将大群按客户价值分层运营：新客群（引流和转化）、活跃群（日常运营和复购）、VIP群（专属权益和深度运营）。分层后每群内容不同、频率不同、权益不同，精准运营。", checklist: ["设计3层社群结构","制定各层内容策略","配置各层专属权益"] },
      { title: "内容价值输出", content: "每层社群提供不同价值内容：新客群推门店介绍和体验优惠、活跃群推每日特惠和互动话题、VIP群推新品首发和专属活动。内容比例7:3（价值内容:营销内容），避免纯广告群。", checklist: ["新客群侧重引流内容","活跃群推互动+特惠","VIP群推专属+首发"] },
      { title: "社群活跃维护", content: "维护社群活跃度：每日1条互动内容（投票/话题/小知识）、每周1次群活动（秒杀/抽奖/接龙）、每月1次线下活动（品鉴/DIY/沙龙）。培养3-5个群KOC带头互动，防止群变成死群。", checklist: ["每日1条互动内容","每周1次群内活动","培养3-5个群KOC"] },
      { title: "社群转化追踪", content: "追踪社群运营数据：群人数增长、日活跃率、群到店转化率、群消费贡献占比。日活跃率低于5%需优化内容，到店转化率低于3%需优化权益设计。", checklist: ["追踪群人数和活跃率","统计群到店转化率","计算群消费贡献占比"] }
    ]
  },
  {
    _id: "sol_075",
    title: "客户反馈驱动改进法",
    summary: "建立客户反馈收集和响应闭环，用客户声音驱动产品服务迭代",
    difficulty: "简单",
    effectiveTime: "1-2周",
    costRange: "0-200元",
    problemCodes: ["CUSTOMER_LOSS","PRODUCT_SLOW"],
    chapter: 3,
    sub: 302,
    steps: [
      { title: "反馈渠道搭建", content: "搭建4个客户反馈渠道：门店意见箱（匿名更真实）、微信反馈入口（便捷低门槛）、消费后满意度调查（结构化数据）、店员主动询问（即时互动）。多渠道覆盖不同习惯的客户。", checklist: ["设置门店意见箱","开通微信反馈入口","设计消费后满意度调查"] },
      { title: "反馈分类整理", content: "每周整理反馈分为4类：产品问题（口味/品质/品类）、服务问题（态度/速度/专业度）、环境问题（卫生/氛围/设施）、建议需求（新品/活动/改善）。按频率排序，聚焦TOP3改进。", checklist: ["每周整理分类反馈","按频率排序TOP3","制定TOP3改进计划"] },
      { title: "快速响应闭环", content: "对每条反馈做到3个响应：24小时内回复客户、7天内给出改进方案、14天内落地改进并告知客户。快速响应比完美方案更重要，客户感到『被重视』本身就是最好的挽留。", checklist: ["24h内回复反馈客户","7天内制定改进方案","14天内落地并告知客户"] },
      { title: "反馈驱动迭代", content: "将客户反馈作为产品和服务迭代的核心输入：高频反馈的问题优先解决、多客户建议的需求优先开发、客户投诉的产品优先优化。每季度发布『因你而变』改进清单，让客户看到反馈的力量。", checklist: ["用反馈驱动迭代优先级","季度发布改进清单","让客户看到反馈的力量"] }
    ]
  },
  {
    _id: "sol_076",
    title: "情感连接锁客法",
    summary: "通过情感连接和人际温度深度绑定客户，降低流失率",
    difficulty: "简单",
    effectiveTime: "1-2周",
    costRange: "0-200元",
    problemCodes: ["CUSTOMER_LOSS"],
    chapter: 3,
    sub: 304,
    steps: [
      { title: "客户画像建立", content: "为TOP50高频客户建立个人画像：姓名、偏好、家庭情况、重要日期、消费习惯。不需要复杂的CRM系统，一个Excel表格或微信备注就够。记住客户的名字和偏好是最廉价也最有效的情感连接。", checklist: ["为TOP50客户建个人画像","记录姓名偏好和重要日期","微信备注关键信息"] },
      { title: "关键时刻关怀", content: "在客户人生的关键时刻给予关怀：生日送专属礼物（非券而是实物）、重大节日发祝福（非群发而是私聊）、客户提到的重要事情后续跟进问候。情感连接不是交易，是人与人之间的真实关怀。", checklist: ["生日送专属实物礼物","节日私聊祝福非群发","跟进客户提到的重要事"] },
      { title: "个性化服务", content: "用客户画像提供个性化服务：记住常点的菜提前准备、知道喜好主动推荐新品、了解忌口主动提醒。如『张姐您常点的红烧肉今天食材特别好，给您留着了』。这种被记住的感觉是最大的忠诚来源。", checklist: ["记住常点菜提前准备","根据偏好主动推荐","用客户名字称呼"] },
      { title: "社区感营造", content: "将门店营造为客户归属的『第三空间』：记住熟客的名字和故事、创造客户之间的连接（如介绍同兴趣的客户认识）、举办社区活动（读书会/品鉴会）。客户不是因为产品不走，是因为『这里的人』而不走。", checklist: ["记住熟客名字和故事","创造客户间连接","定期举办社区活动"] }
    ]
  },
  {
    _id: "sol_077",
    title: "员工绩效激励改革法",
    summary: "设计科学的绩效提成体系，激发员工积极性和主人翁意识",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-500元",
    problemCodes: ["STAFF_HARD"],
    chapter: 5,
    sub: 503,
    steps: [
      { title: "现有绩效诊断", content: "评估现有绩效体系的问题：提成方式是否合理（按营业额还是利润）、提成比例是否有激励性、是否有团队协作激励、是否有成长空间。最常见的问题是『干多干少差不多』，缺乏差异化的激励。", checklist: ["评估现有提成方式","员工满意度匿名调查","对标行业绩效标准"] },
      { title: "绩效方案设计", content: "设计三级绩效方案：基础薪资保障基本生活、个人提成激励个人业绩（营业额提成3%-8%）、团队奖金激励协作（超额利润分享）。关键是要让『努力的人明显多赚』，拉开收入差距。", checklist: ["设计三级绩效结构","个人提成3%-8%","设置团队超额利润分享"] },
      { title: "多元激励设计", content: "除金钱外增加多元激励：月度优秀员工表彰、技能等级津贴（掌握技能越多时薪越高）、晋升通道透明化、弹性福利自选。不同员工被不同因素激励，多元覆盖比单一金钱激励更有效。", checklist: ["设置月度表彰机制","建立技能等级津贴","设计弹性福利自选"] },
      { title: "绩效反馈优化", content: "每月1对1绩效面谈：告知上月业绩和收入、肯定优点、指出改进方向、讨论下月目标。绩效不是扣钱的工具，而是帮助员工成长的框架。持续优化提成比例和考核指标，确保激励有效。", checklist: ["每月1对1绩效面谈","绩效作为成长框架","持续优化考核指标"] }
    ]
  },
  {
    _id: "sol_078",
    title: "新人30天速成法",
    summary: "建立标准化新人培训体系，让新人30天从零到独当一面",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-300元",
    problemCodes: ["STAFF_HARD"],
    chapter: 5,
    sub: 501,
    steps: [
      { title: "培训内容标准化", content: "将岗位所需知识技能分解为标准化培训模块：产品知识（1-3天）、服务流程（2-3天）、操作技能（3-5天）、客户沟通（2-3天）、应急处理（1-2天）。每个模块有明确的学习目标和考核标准。", checklist: ["分解岗位技能为5大模块","每模块设学习目标和考核","编写标准化培训手册"] },
      { title: "师徒带教机制", content: "为每位新人指定1位资深员工作为师傅，负责30天全程带教。师傅有带教津贴（每月200-500元），新人出师后师傅获额外奖励。带教内容按周分解：第1周观察学习、第2周在指导下操作、第3周独立操作师傅旁站、第4周独立上岗。", checklist: ["为新人指定带教师傅","师傅获带教津贴和出师奖","按4周阶段分解带教"] },
      { title: "阶段考核验收", content: "每周末进行阶段考核：第1周产品知识笔试、第2周服务流程实操、第3周独立服务观察评分、第4周综合考核。考核不通过的延长带教1周，2次不通过考虑调岗或淘汰。", checklist: ["设置4周阶段考核","考核不通过延长带教","2次不通过考虑调岗"] },
      { title: "新人留存关怀", content: "新人流失率最高在第1个月，需特别关怀：每日师傅1次交流、每周店长1次面谈、融入团队活动（聚餐/团建）。让新人感受到『被需要、被关心、有成长』，30天内留存率目标80%以上。", checklist: ["师傅每日1次交流","店长每周1次面谈","安排融入团队活动"] }
    ]
  },
  {
    _id: "sol_079",
    title: "员工流失预警与挽留法",
    summary: "建立员工流失预警机制，在离职前及时干预挽留核心人才",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["STAFF_HARD"],
    chapter: 5,
    sub: 505,
    steps: [
      { title: "流失信号识别", content: "识别员工离职前的5大信号：工作积极性明显下降、频繁请假或迟到、不再参与团队活动、开始收拾个人物品、打听其他工作机会。发现2个以上信号应立即启动关注和沟通。", checklist: ["培训管理者识别5大信号","发现2个信号立即关注","建立员工状态日常观察机制"] },
      { title: "流失原因分析",    content: "员工离职5大原因：薪资不满意、发展空间有限、管理方式不适、团队氛围不好、工作强度过大。通过匿名问卷和1对1面谈了解核心员工的真实想法，不要等到提离职才知道问题。", checklist: ["开展匿名满意度调查","店长每月1对1面谈核心员工","分析主要流失原因"] },
      { title: "针对性挽留方案", content: "根据离职原因提供针对性挽留：薪资问题→调薪或调整提成、发展问题→给新项目或晋升机会、管理问题→调整管理方式或换汇报线、氛围问题→改善团建和沟通、强度问题→优化排班或增人。挽留要真诚，不能只画饼不给实际。", checklist: ["根据原因制定挽留方案","方案要具体可兑现","48小时内给出回应"] },
      { title: "留任后持续关注", content: "成功挽留后不能松懈：1周后回访确认承诺兑现、1个月后再次沟通感受、3个月内重点关注其状态变化。如果同一员工2次提出离职，说明根因未解，需要从根本上改变。", checklist: ["1周后确认承诺兑现","1个月后再沟通感受","3个月持续关注状态"] }
    ]
  },
  {
    _id: "sol_080",
    title: "门店SOP标准化管理法",
    summary: "建立核心岗位标准操作流程，降低对个人经验依赖提升一致性",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-300元",
    problemCodes: ["STAFF_HARD"],
    chapter: 8,
    sub: 801,
    steps: [
      { title: "核心流程梳理", content: "梳理门店5大核心流程：开店准备流程、客户接待流程、产品制作/服务流程、结账收银流程、闭店整理流程。每个流程按步骤分解，标注关键控制点和注意事项。", checklist: ["梳理5大核心流程","按步骤分解每个流程","标注关键控制点"] },
      { title: "SOP文档编写", content: "将每个流程编写成可视化SOP文档：步骤用图文结合展示、关键点用红色标注、错误操作用X标记。SOP要让新人看一遍就能上手，老员工看一遍能纠正偏差。每份SOP控制在1-2页。", checklist: ["编写5份可视化SOP","关键点红色标注","每份控制在1-2页"] },
      { title: "SOP培训落地", content: "全员SOP培训：逐个流程讲解+实操演练+考核验收。培训后1周内进行现场检查，观察员工是否按SOP执行。未执行的先了解原因（不理解/不方便/忘了），针对性解决。", checklist: ["全员逐流程培训","实操演练+考核","1周后现场检查执行率"] },
      { title: "SOP持续优化", content: "SOP不是写完就结束的，要持续优化：每月收集员工对SOP的改进建议、每季度review一次SOP合理性、遇到问题先查SOP是否覆盖再补完。好的SOP是『活的文档』，持续进化。", checklist: ["每月收集SOP改进建议","季度review合理性","持续迭代优化SOP"] }
    ]
  },
  {
    _id: "sol_081",
    title: "团队文化建设法",
    summary: "打造积极向上的团队文化，用文化凝聚力降低员工流失",
    difficulty: "较难",
    effectiveTime: "3-4周",
    costRange: "200-1000元",
    problemCodes: ["STAFF_HARD"],
    chapter: 5,
    sub: 502,
    steps: [
      { title: "团队文化定义", content: "与核心团队讨论确定3条团队价值观：如『客户第一』『真诚协作』『持续成长』。价值观不是挂在墙上的口号，而是每天的行为准则，所有人包括老板都要遵守。", checklist: ["与核心团队讨论价值观","确定3条团队价值观","确保所有人认同并遵守"] },
      { title: "文化仪式设计", content: "设计4个文化仪式：每日晨会（5分钟分享+激励）、每周表彰（优秀员工/进步之星）、每月团建（聚餐/活动/生日会）、季度总结（回顾+展望+奖励）。仪式感是文化的载体。", checklist: ["建立每日晨会制度","设置每周表彰仪式","安排月度团建和季度总结"] },
      { title: "沟通机制建设", content: "建立3层沟通机制：每日晨会沟通当日重点、每周例会沟通问题改进、每月1对1深度沟通个人发展。沟通要『听得见真话』，老板先坦诚才能换来员工坦诚。匿名意见箱是兜底通道。", checklist: ["每日晨会沟通重点","每周例会沟通问题","每月1对1沟通发展"] },
      { title: "文化落地检查", content: "定期检查文化是否真正落地：员工是否知道价值观是什么、日常行为是否符合价值观、违规是否被纠正。文化不是说的而是做的，老板以身作则是最强的文化信号。", checklist: ["抽查员工价值观认知","观察日常行为一致性","老板以身作则示范"] }
    ]
  },
  {
    _id: "sol_082",
    title: "员工技能认证体系法",
    summary: "建立多级技能认证体系，用技能成长驱动员工留任和提效",
    difficulty: "中等",
    effectiveTime: "2-4周",
    costRange: "0-500元",
    problemCodes: ["STAFF_HARD"],
    chapter: 5,
    sub: 502,
    steps: [
      { title: "技能等级设计", content: "设计3-4级技能等级：初级（基础操作，入门级薪资）、中级（独立操作+带新人，加薪10%）、高级（疑难处理+技能培训，加薪20%）、专家级（标准制定+技术攻关，加薪30%+分红）。每级有明确的技能清单和考核标准。", checklist: ["设计3-4级技能等级","每级设明确技能清单","制定考核标准和薪资挂钩"] },
      { title: "认证考核体系", content: "建立季度技能认证考核：理论笔试+实操考核+日常表现评分，三项综合达标方可升级。考核要公平透明，标准提前公布，结果公示接受申诉。避免『凭感觉评』，让每个人看到升级路径。", checklist: ["设计季度认证考核","理论+实操+日常综合评估","标准公开结果公示"] },
      { title: "技能培训支持", content: "为员工升级提供培训支持：每级配套培训课程和练习时间、师傅1对1指导、模拟考核练习。员工升级等于门店能力升级，培训投入是投资而非成本。", checklist: ["配套各级培训课程","安排师傅1对1指导","提供模拟考核练习机会"] },
      { title: "技能价值体现", content: "让技能价值在日常工作中有体现：高级员工负责带教和质检、专家级参与新品研发和标准制定、技能等级与排班优先权挂钩。让员工感到『技能越高越重要越受尊重』，而非『技能高只是多干活』。", checklist: ["高级员工负责带教质检","专家参与研发和标准制定","技能等级与排班优先权挂钩"] }
    ]
  },
  {
    _id: "sol_083",
    title: "排班弹性优化法",
    summary: "设计弹性排班制度，平衡员工需求和门店运营效率",
    difficulty: "简单",
    effectiveTime: "3-7天",
    costRange: "0-100元",
    problemCodes: ["STAFF_HARD"],
    chapter: 5,
    sub: 504,
    steps: [
      { title: "排班痛点诊断", content: "收集员工对现有排班的主要不满：排班不灵活无法调休、连续上班天数太多、高峰期排班不合理、个人时间被侵占。同时分析门店排班问题：闲时人员冗余、高峰人手不足、周末排班困难。", checklist: ["收集员工排班不满","分析门店排班效率问题","找出双赢优化空间"] },
      { title: "弹性排班规则", content: "制定弹性排班规则：每月25号前提交下月排班偏好、优先保障高峰时段全员在岗、闲时允许轮休调休、连续上班不超过5天、每月至少4天完整休息日。规则要公平透明，避免偏袒。", checklist: ["制定排班偏好提交机制","保障高峰全员在岗","设置连续上班上限"] },
      { title: "调休互换机制", content: "建立员工调休互换机制：提前3天申请调休、同岗位员工可互换班次、紧急情况有备用方案（兼职/店长顶岗）。调休不影响薪资，让员工有灵活度又保障门店运营。", checklist: ["设计调休申请流程","建立同岗互换机制","准备紧急顶岗方案"] },
      { title: "排班效果评估", content: "每月评估排班效果：员工满意度调查、各时段人效比分析、加班时长统计。满意度低于70%需调整排班规则，人效比低说明排班不合理，加班多说明人手不足。", checklist: ["月度排班满意度调查","分析各时段人效比","统计加班时长优化人手"] }
    ]
  },
  {
    _id: "sol_084",
    title: "店长管理能力提升法",
    summary: "系统提升店长管理能力，让店长成为门店运营的核心驱动力",
    difficulty: "较难",
    effectiveTime: "3-4周",
    costRange: "500-2000元",
    problemCodes: ["STAFF_HARD"],
    chapter: 8,
    sub: 802,
    steps: [
      { title: "管理能力诊断", content: "评估店长在6个维度的管理能力：目标管理、团队激励、沟通协调、问题解决、数据分析、客户服务。通过自评+员工评价+老板评价360度诊断，找出最弱的2个维度重点提升。", checklist: ["360度管理能力评估","识别2个最弱维度","制定针对性提升计划"] },
      { title: "管理技能培训", content: "针对弱项进行专项培训：目标管理→学会分解目标和追踪进度、团队激励→学会认可和奖惩、沟通协调→学会1对1面谈和冲突处理。培训形式以实操+案例为主，每月1-2次。", checklist: ["针对弱项设计培训","实操+案例为主","每月1-2次培训"] },
      { title: "管理工具赋能", content: "为店长提供管理工具：每日运营检查清单、周度数据分析模板、员工1对1面谈模板、问题处理SOP。工具让管理有抓手，避免凭感觉管理。好的管理=正确的方法+趁手的工具+持续的习惯。", checklist: ["制作运营检查清单","设计数据分析模板","提供1对1面谈模板"] },
      { title: "管理效果复盘", content: "每月与店长复盘管理效果：团队绩效是否提升、员工流失率是否下降、客户满意度是否上升、门店运营是否更顺畅。好的管理效果会体现在数据上，店长需学会用数据证明管理价值。", checklist: ["月度管理效果复盘","用数据验证管理成效","持续优化管理方法"] }
    ]
  },
  {
    _id: "sol_085",
    title: "小红书种草引流法",
    summary: "在小红书持续种草输出，吸引同城目标客群到店消费",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-300元",
    problemCodes: ["MARKETING_HARD","TRAFFIC_LOW"],
    chapter: 4,
    sub: 401,
    steps: [
      { title: "账号定位与搭建", content: "注册小红书企业号或个人号，账号定位为『本地XX品类推荐官』。完善资料：头像用门店logo或老板形象、简介写明品类和地址、背景图展示门店特色。账号人设要有温度，比官方号更亲切。", checklist: ["注册小红书账号","完善资料和定位","建立有温度的人设"] },
      { title: "种草内容策划", content: "策划3类种草内容：探店推荐（场景化展示门店体验）、产品测评（真实展示产品优势）、攻略干货（分享专业知识建立信任）。每篇笔记配5-9张高质量图片，标题用数字+痛点+解决方案公式。", checklist: ["策划3类内容方向","每篇5-9张高质量图","标题用数字+痛点公式"] },
      { title: "本地标签运营", content: "每篇笔记添加本地标签：#城市名+品类、#城市名+探店、#城市名+好店推荐。参与本地话题和同城活动，让同城用户搜索时能找到你。每周发布3-4篇，保持活跃度。", checklist: ["添加本地标签3-5个","参与本地话题","每周发布3-4篇"] },
      { title: "互动转化引导", content: "积极回复评论区咨询，私信引导到店：提供到店专属福利码、分享门店地址和导航、邀请体验并写反馈。评论区是流量入口，每条评论都认真回复，增加互动权重获得更多推荐。", checklist: ["评论区积极互动回复","私信引导到店+专属福利","邀请体验写反馈"] }
    ]
  },
  {
    _id: "sol_086",
    title: "微信视频号运营法",
    summary: "系统运营微信视频号，借助微信生态获取同城精准流量",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-300元",
    problemCodes: ["MARKETING_HARD"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "视频号基础搭建", content: "开通微信视频号，绑定公众号和企业微信。设置门店地址定位、完善简介（品类+地址+营业时间）、设计统一封面风格。视频号最大的优势是与微信生态无缝打通，直接触达微信好友和社群。", checklist: ["开通视频号并绑定公众号","完善地址和简介","设计统一封面风格"] },
      { title: "内容栏目规划", content: "规划3个固定内容栏目：制作过程类（展示专业度和品质）、知识分享类（建立专业权威）、客户故事类（口碑证言增加信任）。每个栏目每周1条，固定发布时间培养粉丝期待。", checklist: ["规划3个内容栏目","每栏目每周1条","固定发布时间"] },
      { title: "同城流量获取", content: "每条视频添加门店地理位置定位，使用同城话题标签。视频号会优先推送给同城和好友，所以前期发动员工和好友点赞评论增加初始互动量，帮助视频获得更多同城推荐。", checklist: ["每条视频添加地理定位","使用同城话题标签","发动好友增加初始互动"] },
      { title: "私域转化闭环", content: "视频号内容引导到私域：评论区置顶门店福利信息、主页挂载企业微信二维码、视频内引导『点击下方添加门店微信』。视频号是公域入口，微信是私域阵地，打通才能持续转化。", checklist: ["评论区置顶福利信息","主页挂载企业微信","视频内引导加微信"] }
    ]
  },
  {
    _id: "sol_087",
    title: "口碑传播裂变法",
    summary: "设计口碑传播机制，让满意客户主动为你传播带来新客",
    difficulty: "简单",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["MARKETING_HARD","TRAFFIC_LOW"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "传播诱因设计", content: "设计让客户主动传播的诱因：拍照打卡送小礼品/折扣、写好评返现/送券、分享朋友圈集赞换福利。传播诱因要简单直接，客户3步内完成：拍照→发圈→领福利。", checklist: ["设计拍照打卡奖励","设置好评返现/送券","分享集赞换福利方案"] },
      { title: "传播素材准备", content: "为客户准备易于传播的素材：门店网红打卡点（背景墙/特色装置）、适合拍照的产品摆盘/包装、朋友圈文案模板和图片模板。素材越精美客户越愿意分享，降低传播门槛。", checklist: ["设置网红打卡点","优化产品拍照效果","提供朋友圈文案模板"] },
      { title: "传播时机把握", content: "在客户体验最好的时刻引导传播：产品刚上桌/刚完成时『好看吧？拍了发圈有福利哦』、客户表达满意时『太好了！帮我们分享一下更多人知道』。时机对了一半成功，别等客户体验消退再提。", checklist: ["在体验最佳时刻引导","话术自然不推销感","培训员工把握时机"] },
      { title: "传播效果追踪", content: "追踪口碑传播效果：每周统计打卡分享人数、新客来源中口碑推荐占比、口碑获客成本。优化传播机制：分享率低则优化诱因，到店率低则优化引导话术。", checklist: ["统计每周打卡分享人数","追踪口碑推荐新客占比","持续优化传播机制"] }
    ]
  },
  {
    _id: "sol_088",
    title: "低成本地推营销法",
    summary: "用最低成本做最高效的地面推广，精准触达目标客群",
    difficulty: "简单",
    effectiveTime: "3-5天",
    costRange: "50-300元",
    problemCodes: ["MARKETING_HARD"],
    chapter: 4,
    sub: 405,
    steps: [
      { title: "地推场景选择", content: "选择目标客群聚集的3个场景：社区（居民客户）、商圈（白领客户）、学校（家长客户）。每个场景选择1-2个最佳触达点位和时间，比如社区晚上6-8点下班高峰。", checklist: ["选择3个地推场景","确定各场景最佳时段","估算各场景人流量"] },
      { title: "低成本物料制作", content: "地推物料不用花大钱：手写小黑板+粉笔（20元）、彩色A4传单打印（50元/500张）、小礼品（1-2元/个的贴纸/气球/试吃装）。关键是信息醒目+福利明确+行动指令清晰。", checklist: ["制作手写小黑板","打印彩色传单","准备低成本小礼品"] },
      { title: "互动引流执行", content: "地推不是发传单，是互动：用小黑板写『扫码免费领XX』、用小游戏（转盘/猜谜）吸引停留、用试吃试用降低体验门槛。停留5秒以上的人才有转化可能，纯发传单转化率不到1%。", checklist: ["设计互动引流方式","设置小游戏增加停留","试吃试用降低门槛"] },
      { title: "加微留存转化", content: "地推的终极目标不是当场成交而是加微信留存：所有福利通过微信领取、加微信送额外福利、拉群享持续优惠。地推获客→微信留存→持续运营→到店转化，形成完整链路。", checklist: ["所有福利通过微信领取","加微信送额外福利","拉群享持续优惠"] }
    ]
  },
  {
    _id: "sol_089",
    title: "线上活动策划执行法",
    summary: "策划和执行高参与度线上活动，低成本获取大量曝光和互动",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-500元",
    problemCodes: ["MARKETING_HARD"],
    chapter: 4,
    sub: 401,
    steps: [
      { title: "活动类型选择", content: "选择适合门店的线上活动类型：投票评选类（最受欢迎产品投票）、UGC征集类（晒图/故事征集）、互动游戏类（猜谜/答题/抽奖）、限时抢购类（群内限时秒杀）。选活动要看目的：要曝光选UGC，要转化选秒杀。", checklist: ["确定活动目的和类型","评估各类型可行性","选择1-2个活动类型"] },
      { title: "活动方案设计", content: "设计活动方案5要素：主题（有趣+相关）、规则（简单易懂3步内参与）、奖励（有吸引力阶梯式）、时间（3-7天不宜太长）、传播（如何让参与者帮忙扩散）。方案设计好先小范围测试再正式上线。", checklist: ["设计活动5要素","规则简单3步内参与","先小范围测试再上线"] },
      { title: "活动预热推广", content: "活动前3天开始预热：社群每日倒计时、朋友圈悬念海报、门店海报预告。预热要制造期待感而非直接暴露全部福利，『即将揭晓』比『XX元大奖』更能激发好奇心和参与欲。", checklist: ["提前3天预热","社群每日倒计时","制造悬念和期待感"] },
      { title: "活动执行与复盘", content: "活动期间每日公布参与数据维持热度，活动结束后公布结果并兑现奖励。复盘3个数据：参与人数、新增粉丝数、到店转化数。ROI=到店转化营收÷活动总成本，低于1:3需优化方案。", checklist: ["活动期间每日公布数据","活动后兑现奖励","复盘参与/粉丝/转化数据"] }
    ]
  },
  {
    _id: "sol_090",
    title: "本地KOL合作推广法",
    summary: "与本地自媒体和KOL合作，借助其影响力快速获取曝光",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "500-2000元",
    problemCodes: ["MARKETING_HARD"],
    chapter: 4,
    sub: 401,
    steps: [
      { title: "KOL筛选评估", content: "筛选本地生活类KOL：大众点评Lv7+达人、小红书同城博主、抖音同城达人、本地公众号博主。评估维度：粉丝数（1万+）、互动率（3%+）、调性匹配度、合作费用。不追求最大号，追求最精准的号。", checklist: ["筛选5-10个本地KOL","评估粉丝量和互动率","确认调性与门店匹配"] },
      { title: "合作方案设计", content: "设计KOL合作方案：探店体验（免费体验写真实评价）、专属福利（给KOL粉丝专属优惠码）、联合活动（KOL到店直播/互动）。合作方式比纯投放更有信任度，KOL的真实体验比广告更有说服力。", checklist: ["设计探店体验方案","设置KOL粉丝专属优惠","策划联合活动方案"] },
      { title: "效果追踪评估", content: "为每个KOL设置专属优惠码或链接，追踪其带来的到店人数和消费额。计算CPA（单客获取成本）=KOL合作费÷带来到店人数。CPA低于门店平均获客成本则合作有效，否则优化或更换KOL。", checklist: ["设置KOL专属优惠码","追踪到店人数和消费额","计算CPA评估效果"] },
      { title: "长期关系维护", content: "与效果好的KOL建立长期合作关系：季度合作套餐、优先体验新品、独家活动邀请。长期合作的KOL比一次性合作效果好3-5倍，因为粉丝信任度会随持续推荐而增强。", checklist: ["建立长期合作KOL名单","设计季度合作套餐","提供新品优先体验权"] }
    ]
  },
  {
    _id: "sol_091",
    title: "大众点评优化运营法",
    summary: "系统优化大众点评门店信息，提升搜索排名和到店转化率",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-500元",
    problemCodes: ["MARKETING_HARD"],
    chapter: 4,
    sub: 402,
    steps: [
      { title: "门店信息完善", content: "完善大众点评门店全部信息：高清门店照片（至少15张）、完整营业时间和地址、详细菜单/服务项目和价格、门店特色标签、停车信息。信息完整度直接影响搜索排名，缺失信息会被算法降权。", checklist: ["上传15张以上高清照片","完善营业时间和地址","填写菜单和特色标签"] },
      { title: "评价管理体系", content: "建立评价管理机制：每条好评当天回复感谢、每条差评2小时内回复致歉+解决方案、设置好评引导机制（到店客户扫码评价送小礼）。评分4.5分以上才能获得平台流量推荐。", checklist: ["好评当天回复","差评2h内回复处理","设置好评引导机制"] },
      { title: "团购和优惠设置", content: "设置2-3档团购套餐：引流款（低价走量拉新客）、利润款（正常毛利）、高端款（提升品牌形象）。配合代金券和优惠券使用。团购价要有竞争力，但不要低到亏本。", checklist: ["设置2-3档团购套餐","配合代金券使用","团购价有竞争力不亏本"] },
      { title: "搜索排名优化", content: "优化搜索排名3要素：关键词（门店名包含品类词+地名）、评价数量和质量（持续积累好评）、活跃度（经常更新动态和活动）。每月检查排名变化，排名下滑时加大评价管理和活动投放。", checklist: ["优化门店名关键词","持续积累好评","定期更新门店动态"] }
    ]
  },
  {
    _id: "sol_092",
    title: "私域流量池构建法",
    summary: "从零搭建微信私域流量池，实现零成本持续触达和转化客户",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-300元",
    problemCodes: ["MARKETING_HARD"],
    chapter: 4,
    sub: 403,
    steps: [
      { title: "加粉渠道铺设", content: "铺设4个加粉渠道：门店扫码加微信（桌牌+收银台+员工引导）、外卖包裹内加微卡、朋友圈广告加微入口、活动报名必须加微。目标每月新增200+微信好友。", checklist: ["门店设置3处加微触点","外卖包裹放加微卡","目标月增200+好友"] },
      { title: "企业微信配置", content: "使用企业微信管理客户：自动欢迎语+标签分组+朋友圈+群发功能。企业微信的优势是员工离职客户不丢失、可统一管理和运营、群发不限制人数。基础功能免费，够用。", checklist: ["注册企业微信","配置自动欢迎语","设置客户标签体系"] },
      { title: "标签分层管理", content: "给所有微信客户打标签：按消费频次（高频/中频/低频/沉睡）、按偏好（品类/时段/价位）、按来源（到店/外卖/推荐/地推）。标签越精细运营越精准，群发不骚扰不对的人。", checklist: ["设计标签体系","给现有客户打标签","新客户入微即打标签"] },
      { title: "触达节奏设计", content: "设计分层触达节奏：高频客户月2次专属推荐+1次活动邀请、中频客户周1次朋友圈触达+月1次优惠推送、低频客户月1次福利唤醒、沉睡客户季1次超值回归礼。避免过度打扰导致拉黑。", checklist: ["设计4层触达节奏","控制每月群发不超过4次","朋友圈日更不超过2条"] }
    ]
  },
  {
    _id: "sol_093",
    title: "差异化竞争突围法",
    summary: "从同质化价格战中突围，建立差异化竞争优势摆脱低价竞争",
    difficulty: "较难",
    effectiveTime: "2-4周",
    costRange: "500-2000元",
    problemCodes: ["COMPETITION"],
    chapter: 7,
    sub: 702,
    steps: [
      { title: "竞争格局分析", content: "绘制周边竞品地图：标注3-5家核心竞品的位置、品类、价格带、核心优势和弱点。找到竞争空白带：没人做的品类细分、没人服务的人群、没人提供的体验。空白带就是差异化的起点。", checklist: ["绘制竞品地图","标注3-5家竞品信息","识别竞争空白带"] },
      { title: "差异化定位选择", content: "从4个维度选择差异化定位：品类差异化（做细分品类第一）、品质差异化（做最好不是最便宜）、服务差异化（做最贴心）、场景差异化（做独特消费场景）。选择1个维度深扎，不要贪多。", checklist: ["评估4个差异化维度","选择1个维度深扎","确保差异化有壁垒"] },
      { title: "差异化能力建设", content: "围绕选定的差异化定位建设能力：品类差异化→深耕供应链和产品研发、品质差异化→升级原材料和工艺、服务差异化→培训团队和设计流程、场景差异化→改造空间和体验设计。能力建设要投入到位。", checklist: ["围绕定位建设核心能力","投入资源到位","确保差异化可持续"] },
      { title: "差异化传播占位", content: "将差异化变成客户心智中的占位：提炼一句差异化口号（如『XX街最好吃的牛肉面』）、所有传播素材统一强化这一定位、持续6个月以上不换定位。心智占位需要时间和一致性，切忌摇摆。", checklist: ["提炼差异化口号","全传播素材统一强化","坚持6个月不换定位"] }
    ]
  },
  {
    _id: "sol_094",
    title: "价格战应对策略",
    summary: "系统应对竞品价格战，在不伤利润的前提下守住客户",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["COMPETITION"],
    chapter: 7,
    sub: 702,
    steps: [
      { title: "价格战态势评估", content: "评估价格战的真实威胁：竞品降价幅度多大、影响了你多少客流、是短期促销还是长期策略。不要听到竞品降价就恐慌跟进，很多时候竞品降价对你的影响远没有想象中大。", checklist: ["评估竞品降价幅度","统计对我客流实际影响","判断竞品是短期还是长期策略"] },
      { title: "非价格应对方案", content: "优先用非价格手段应对：提升服务体验（竞品降价往往伴随服务下降）、增加附加价值（赠品/延保/售后）、强化情感连接（老客户专属关怀）。让客户觉得『虽然贵一点但更值』。", checklist: ["制定服务提升方案","设计附加价值权益","强化老客户情感连接"] },
      { title: "精准价格应对", content: "如需价格应对，做精准而非全面降价：只对竞品直接对标的产品做防御性定价、设置专属优惠卡（非公开降价避免价格战升级）、用套餐捆绑而非单品降价保持客单价。保护主力产品的价格体系。", checklist: ["只对直接对标品做防御定价","用优惠卡替代公开降价","套餐捆绑代替单品降价"] },
      { title: "长期竞争壁垒", content: "价格战本质是同质化竞争的结果，长远出路是建立非价格壁垒：客户关系壁垒（会员和社群锁定客户）、供应链壁垒（更低成本结构）、品牌壁垒（更高的客户信任度）、体验壁垒（不可复制的消费体验）。", checklist: ["建立客户关系壁垒","优化供应链降低成本","打造不可复制的体验"] }
    ]
  },
  {
    _id: "sol_095",
    title: "竞品情报监控系统",
    summary: "建立系统化的竞品情报监控机制，知己知彼提前应对竞争",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-200元",
    problemCodes: ["COMPETITION"],
    chapter: 8,
    sub: 803,
    steps: [
      { title: "监控对象确定", content: "确定3-5家核心竞品作为重点监控对象：同一商圈同品类的直接竞品、跨界打劫的间接竞品（如便利店抢餐饮生意）、新进入者的潜在竞品。每家竞品建立档案卡记录基本信息。", checklist: ["确定3-5家核心竞品","建立竞品档案卡","区分直接/间接/潜在竞品"] },
      { title: "情报采集渠道", content: "建立4个情报采集渠道：定期到店消费体验（月1次）、线上平台追踪（大众点评/抖音/朋友圈）、行业信息和同行交流、客户反馈提及竞品信息。多渠道交叉验证确保情报准确。", checklist: ["月度到店消费体验","线上平台日常追踪","收集客户提及竞品信息"] },
      { title: "情报分析框架", content: "用5维分析框架处理竞品情报：产品（品类/新品/特色）、价格（定价/促销/套餐）、渠道（线上/线下/新增）、营销（活动/推广/口碑）、服务（体验/售后/会员）。每月形成竞品分析简报。", checklist: ["按5维框架分析竞品","月度形成竞品简报","识别竞品最新变化趋势"] },
      { title: "应对决策机制", content: "建立竞品变化→应对决策的机制：竞品上新→评估影响→决定跟进还是差异化、竞品降价→评估威胁→决定价格还是非价格应对、竞品新活动→评估效果→决定对标还是错位。决策要有速度，但不能冲动。", checklist: ["建立竞品变化应对流程","决策有速度不冲动","每季度调整竞争策略"] }
    ]
  },
  {
    _id: "sol_096",
    title: "商圈联合抗竞法",
    summary: "联合商圈内非竞争商家形成联盟，共同对抗外部大型竞品",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-500元",
    problemCodes: ["COMPETITION"],
    chapter: 7,
    sub: 701,
    steps: [
      { title: "联盟伙伴召集", content: "召集商圈内5-8家非竞争但客群重叠的商家组建联盟。选择标准：品类互补、客群相似、老板配合意愿强、经营稳定。召开联盟成立会，确定联盟名称和共同目标。", checklist: ["筛选5-8家联盟候选","逐一沟通确认意向","召开联盟成立会"] },
      { title: "联合会员体系", content: "设计联盟联合会员：1张卡通享联盟所有商家优惠，会员消费积分通用。联合会员的吸引力远大于单店会员，『一张卡逛5家店』对客户极具价值。积分可在任意联盟商家兑换。", checklist: ["设计联合会员权益","积分通用通兑","制作联合会员卡"] },
      { title: "联合活动策划", content: "策划联盟联合活动：商圈购物节（联盟商家联合促销）、主题消费月（每月1个主题跨店联动）、联盟优惠券册（包含所有商家优惠的小册子）。联合活动的曝光量是单店的5-10倍。", checklist: ["策划商圈购物节","设计每月主题消费月","制作联盟优惠券册"] },
      { title: "联盟运营管理", content: "建立联盟运营机制：月度联盟例会、季度联合活动、积分结算规则、退出和加入机制。联盟成功的关键是利益均衡和规则透明，避免个别商家『占便宜不贡献』。", checklist: ["建立月度例会制度","制定积分结算规则","设置公平的退出加入机制"] }
    ]
  },
  {
    _id: "sol_097",
    title: "客户锁定防竞法",
    summary: "通过深度锁定客户关系，让客户不因竞品诱惑而流失",
    difficulty: "中等",
    effectiveTime: "2-3周",
    costRange: "0-500元",
    problemCodes: ["COMPETITION","CUSTOMER_LOSS"],
    chapter: 7,
    sub: 701,
    steps: [
      { title: "客户锁定强度评估", content: "评估当前客户锁定强度：会员储值占比多少、客户复购率多高、客户转介绍率多少。锁定强度低的客户最容易被竞品抢走。目标：会员储值占比>30%、月复购率>40%、转介绍率>15%。", checklist: ["评估会员储值占比","统计月度复购率","测算客户转介绍率"] },
      { title: "储值锁客升级", content: "升级储值锁客方案：提高储值赠送比例、增加储值专属权益（如储值客户享优先权/专属产品）、设置储值客户消费日特权。让客户『钱存在你这』，离开就有沉没成本，不会轻易走。", checklist: ["提高储值赠送比例","增加储值专属权益","设置储值客户特权日"] },
      { title: "习惯锁客机制", content: "设计消费习惯锁定机制：固定会员日养成到店习惯、订阅式消费（包月/包季）锁定长期消费、积分体系让客户舍不得离开（积分清零的恐惧>积分兑换的价值）。", checklist: ["固定会员日养成习惯","设计包月/包季订阅","积分体系增加离开成本"] },
      { title: "情感锁客深化", content: "深化情感锁客：记住客户的名字和偏好、在客户重要时刻给予关怀、创造客户与门店的情感记忆点。客户可以被更便宜的价格吸引走，但很难被从『有感情的地方』带走。情感是最深的锁。", checklist: ["记住TOP客户名字和偏好","客户重要时刻给关怀","创造情感记忆点"] }
    ]
  },
  {
    _id: "sol_098",
    title: "蓝海市场开拓法",
    summary: "跳出红海竞争开辟蓝海细分市场，在新赛道建立先发优势",
    difficulty: "较难",
    effectiveTime: "3-4周",
    costRange: "1000-3000元",
    problemCodes: ["COMPETITION"],
    chapter: 8,
    sub: 805,
    steps: [
      { title: "蓝海机会识别", content: "用『剔除-减少-增加-创造』四步法识别蓝海：剔除行业中理所当然但客户不在意的元素、减少过度提供的元素、增加客户重视但行业忽视的元素、创造行业从未提供的新价值。画出你的蓝海战略画布。", checklist: ["完成四步法分析","画出蓝海战略画布","识别2-3个蓝海机会"] },
      { title: "细分市场选择", content: "评估蓝海机会选择最具潜力的细分市场：市场规模足够支撑门店、竞争程度低、我有能力满足需求、客户愿意付费。优先选择『小而美』的细分市场，避免贪大求全。", checklist: ["评估各蓝海机会潜力","选择1个细分市场聚焦","确认我有能力满足需求"] },
      { title: "蓝海产品开发", content: "为蓝海细分市场开发专属产品线：如为健身人群开发低卡餐、为宝妈开发亲子烘焙课、为商务人群开发快速套餐。产品要精准匹配细分人群的特定需求，不是简单改个名字。", checklist: ["开发细分人群专属产品","产品精准匹配特定需求","验证产品解决真实痛点"] },
      { title: "蓝海先发优势建立", content: "在蓝海市场建立先发优势：快速占领客户心智（成为该细分品类的代名词）、建立社群和口碑壁垒、持续迭代产品巩固领先地位。先发优势的窗口期通常只有6-12个月，要快。", checklist: ["快速占领细分品类心智","建立社群口碑壁垒","6个月内巩固先发地位"] }
    ]
  },
  {
    _id: "sol_099",
    title: "竞品弱点攻击法",
    summary: "精准识别竞品弱点并针对性放大优势，抢夺竞品客户",
    difficulty: "中等",
    effectiveTime: "1-2周",
    costRange: "0-300元",
    problemCodes: ["COMPETITION"],
    chapter: 7,
    sub: 702,
    steps: [
      { title: "竞品弱点侦察", content: "通过3种方式侦察竞品弱点：消费体验（亲自去体验找问题）、客户反馈（收集从竞品转来的客户抱怨）、线上差评（分析竞品的差评集中点）。最常见的弱点：服务差、出品不稳定、环境脏乱、等位太久、售后无保障。", checklist: ["亲自消费体验竞品","收集从竞品转来的客户反馈","分析竞品线上差评"] },
      { title: "针对性优势建设", content: "针对竞品核心弱点建设自己的核心优势：竞品服务差→我打造极致服务、竞品出品不稳定→我做标准化品控、竞品等位久→我做预约制+快速通道。优势要直击竞品弱点，让竞品客户『对比之下选我』。", checklist: ["针对竞品弱点建优势","确保优势是竞品短期内无法模仿的","宣传优势直击竞品弱点"] },
      { title: "竞品客户转化", content: "设计竞品客户专属转化方案：凭竞品会员卡到店享专属优惠、『从XX店转过来的首单半价』、竞品客户专属体验活动。转化话术要尊重竞品不贬低，但突出『在我这里你能得到什么不同』。", checklist: ["设计竞品客户专属优惠","设置转店首单特惠","话术尊重竞品突出差异"] },
      { title: "防守反击策略", content: "竞品可能反击（模仿你或更激进降价），准备防守方案：持续升级优势保持领先、巩固老客户关系防止被反向抢客、监控竞品反击动作及时调整策略。竞争是动态的，要持续迭代。", checklist: ["持续升级核心优势","巩固老客户防被抢","监控竞品反击动态"] }
    ]
  },
  {
    _id: "sol_100",
    title: "竞争壁垒长效建设法",
    summary: "从长计议建设3层竞争壁垒，构建持续竞争力护城河",
    difficulty: "较难",
    effectiveTime: "1-3个月",
    costRange: "1000-5000元",
    problemCodes: ["COMPETITION"],
    chapter: 8,
    sub: 805,
    steps: [
      { title: "三层壁垒规划", content: "规划3层竞争壁垒：第一层客户壁垒（会员体系+私域+情感连接）、第二层运营壁垒（供应链+标准化+数字化）、第三层品牌壁垒（口碑+心智占位+文化认同）。从第一层开始逐层建设，第一层3个月见效，第三层需要1年以上。", checklist: ["规划3层壁垒建设路径","从第一层客户壁垒开始","设定各层时间节点"] },
      { title: "客户壁垒建设", content: "建设客户壁垒核心3件事：会员体系让客户有沉没成本（储值+积分）、私域运营让客户有持续触达（微信+社群）、情感连接让客户有归属感（关怀+仪式+社区）。客户壁垒是最基础也最有效的护城河。", checklist: ["完善会员储值和积分体系","建立私域触达体系","深化客户情感连接"] },
      { title: "运营壁垒建设",    content: "建设运营壁垒核心3件事：供应链优化获得成本优势（比竞品低10%-15%）、标准化运营保证品质一致（不依赖个人）、数字化管理提升效率和决策质量。运营壁垒让竞品『看得到学不会』。", checklist: ["优化供应链降本10%-15%","建设标准化运营体系","引入数字化管理工具"] },
      { title: "品牌壁垒建设", content: "建设品牌壁垒核心3件事：口碑积累（持续好评和客户证言）、心智占位（成为某品类的第一联想）、文化认同（客户认同门店价值观和生活方式）。品牌壁垒最难建但最持久，一旦建成竞品几乎无法撼动。", checklist: ["持续积累好评和客户证言","建立品类第一联想心智","塑造客户认同的品牌文化"] }
    ]
  },
  {
    _id: "sol_101",
    title: "选址人流热力图分析法",
    summary: "用免费工具查看目标区域人流量数据，选对位置不踩坑",
    difficulty: "简单",
    effectiveTime: "1天掌握",
    costRange: "0元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 101,
    steps: [
      { title: "打开百度地图热力图", content: "在手机上打开百度地图，点击右上角图层按钮，选择「热力图」模式，地图上会显示人流密集区域（红色最旺、橙色次之、蓝色偏冷）。对比你心仪的几个铺子位置，看谁在红区。", checklist: ["下载并打开百度地图APP","点击图层选择热力图模式","在目标商圈缩放查看颜色分布"] },
      { title: "分时段多次观察", content: "人流不是一成不变的。分别在早上上班（7-9点）、中午（11-13点）、傍晚下班（17-19点）、晚上（20-22点）各看一次热力图，记录每个时段的颜色变化。有些地方白天旺晚上冷，有些反过来，要看和你生意最旺的时段是否吻合。", checklist: ["早高峰时段截图记录","午市时段截图记录","晚市及夜间时段截图记录","对比各时段人流变化"] },
      { title: "结合实地蹲点验证", content: "热力图是参考，不是金标准。选3个候选位置，每个蹲点半小时数人头：拿个计数器，数经过店门口的行人数量。热力图颜色深+实地人多=靠谱位置。如果热力图好看但实地没人，可能是数据延迟，要小心。", checklist: ["准备计数器或手机计数APP","每个候选位置蹲点30分钟","记录实际经过人数","与热力图数据交叉验证"] },
      { title: "综合评分做决定", content: "给每个候选位置打分：热力图颜色深浅（30分）、实地人流量（30分）、和你目标客群匹配度（20分）、竞争对手密度（20分，越少越好）。总分最高的位置优先选择，但也要结合租金综合考量。", checklist: ["按4个维度给每个位置打分","算总分排序","结合租金做最终取舍"] }
    ]
  },
  {
    _id: "sol_102",
    title: "门店门口截流术",
    summary: "让路过你店门口的人停下脚步走进来，把过路客变成进店客",
    difficulty: "简单",
    effectiveTime: "当天见效",
    costRange: "0-200元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 101,
    steps: [
      { title: "门口设体验式吸引点", content: "在门口放一个让人忍不住停下来看或体验的东西：餐饮店放试吃台（香味飘出去）、服装店放全身镜+试衣间帘子半开（让人看到试衣氛围）、水果店切好样品摆出来（视觉+味觉双重诱惑）。关键是让人「动脚」停下来。", checklist: ["根据行业选择吸引点类型","准备试吃/试用/体验物料","确保吸引物在门外1米内可见"] },
      { title: "设计门口拦路话术", content: "员工站在门口，对路过的人说一句简短有力的话，不是「欢迎光临」（太普通没人理），而是「姐，刚出炉的面包要不要尝一口？」「哥，今天新到一款T恤特适合您」。核心是：叫一声+给一个动作邀请，不超过10个字。", checklist: ["设计3套10字以内的截流话术","培训门口接待员工","每天门口至少站1个人截流"] },
      { title: "利用气味和声音截流", content: "人还没看到店，先闻到味道或听到声音。餐饮店把排烟口朝向人行道（让香味飘出去）、咖啡店门口放磨豆机（声音+香味）、面包店门口烤面包（整条街都闻到）。非餐饮店可以放轻快的音乐，让人不自觉地走慢。", checklist: ["检查排烟/气味方向是否朝向人流","准备门口音乐播放设备","选择符合品牌调性的背景音乐"] },
      { title: "门口摆动态视觉物", content: "静态的东西容易被忽略，动的东西会吸引目光。门口放旋转展示架、自动播放的显示屏、飘动的旗帜或气球、流动的水景。哪怕是一个自动旋转的促销展架，都比贴一张海报管用10倍。", checklist: ["准备1-2个动态展示道具","确保道具不挡路但有视觉冲击","定期更换避免审美疲劳"] }
    ]
  },
  {
    _id: "sol_103",
    title: "黄金时段客流统计法",
    summary: "用最简单的数人头方法，摸清真实客流规律，不靠感觉靠数据",
    difficulty: "简单",
    effectiveTime: "1周出结果",
    costRange: "0元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 101,
    steps: [
      { title: "确定统计时段和位置", content: "先搞清楚你要数哪里的客流：是经过门口的路人，还是进店的客人？两者都要数。统计时段选你生意最重要的几个时间：早中晚各挑1小时。不用全天数，数关键时段就够。", checklist: ["选定3-5个关键时段","确定统计位置（门口/柜台）","准备计数器或手机计数APP"] },
      { title: "制作简易统计表", content: "拿一张A4纸画个表：横轴是时段（如8-9点、12-13点），纵轴是日期（周一到周日），格子填数字。每天在那个时段数15-30分钟的人头，换算成每小时人数填进去。连续数7天，一周的客流规律就出来了。", checklist: ["画好7天×多时段的统计表格","每天按时段数人头15-30分钟","换算成每小时客流填入表格"] },
      { title: "分析规律找问题", content: "7天数据到手后，看3个关键规律：①哪几天是高峰（通常是周末）、②哪个时段人最多（这叫黄金时段，要全力经营）、③有没有该旺不旺的时段（比如中午该人多却很少，说明午市出了问题）。找到问题就找到了增长点。", checklist: ["圈出客流高峰日和高峰时段","标注反常时段（该旺不旺）","列出可提升的时段机会"] },
      { title: "针对性调整运营", content: "根据统计结果做调整：客流少的时段推限时优惠引流、客流多的时段加人手加备货保证体验、发现某天特别旺就那天多做活动放大效果。每个月数一次，看调整有没有效果，持续优化。", checklist: ["低峰时段设计引流活动","高峰时段加人手和备货","每月复盘一次客流数据"] }
    ]
  },
  {
    _id: "sol_104",
    title: "商铺租金谈判三板斧",
    summary: "跟房东谈租金的3个实用招数，帮你省下真金白银",
    difficulty: "中等",
    effectiveTime: "1-3天谈完",
    costRange: "0元",
    problemCodes: ["COST_HIGH"],
    chapter: 1,
    sub: 102,
    steps: [
      { title: "摸清周边行情当底牌", content: "谈判前先做功课：在目标商铺周围500米内，找3-5间类似商铺打听租金。直接问在租的老板最靠谱，也可以问中介。把打听到的价格记下来，算出均价。谈判时你心里有底，房东报高价你才知道贵不贵。", checklist: ["走访周边3-5间类似商铺","记录各商铺租金和面积","算出每平米均价作为谈判参考"] },
      { title: "用长期合同换低租金", content: "房东最怕空置，空一个月就亏一个月。你提出签3-5年长约，但要求首年租金打折或逐年涨幅限死。比如：签3年，首年9折，每年涨幅不超过5%。对房东来说，3年稳收租比1年高价但随时空置强。", checklist: ["确定自己能接受的租约长度","设计梯度租金方案（首年低后渐涨）","准备长期稳定经营的证明材料"] },
      { title: "分项谈判压总价", content: "不要只谈一个租金总数，拆开来谈：基础租金、物业费、水电公摊、空调费、停车费……一项一项谈。房东在总租金上不肯让步，但可能在物业费或公摊上松口。最后加总起来，可能比一口价便宜不少。", checklist: ["列出所有费用项目清单","逐项谈价而不是只谈总价","加总后对比整体成本"] },
      { title: "备好替代方案增加筹码", content: "谈判时让房东知道你有备选：「旁边那间位置也不错，租金还便宜2块」。不是威胁，是让房东觉得你不是非他不可。如果真的没有备选，也可以说「我还在看XX路那边的铺子」。有替代方案，你才有议价底气。", checklist: ["提前物色1-2个替代商铺","谈判中适度透露有备选","必要时真的去看替代方案增加谈判筹码"] }
    ]
  },
  {
    _id: "sol_105",
    title: "隐性成本计算清单",
    summary: "租铺子除了月租金，还有一堆容易忽略的隐形费用，算清楚才不亏",
    difficulty: "简单",
    effectiveTime: "半天算清",
    costRange: "0元",
    problemCodes: ["COST_HIGH"],
    chapter: 1,
    sub: 102,
    steps: [
      { title: "列出12项隐性成本清单", content: "除了月租金，这些钱你可能没算：①物业费 ②水电费（商用水电比民用贵2-3倍）③空调费 ④公摊面积费 ⑤垃圾清运费 ⑥消防改造费 ⑦装修期利息 ⑧转让费 ⑨押金占用资金 ⑩停车费 ⑪招牌审批费 ⑫顶面地面维修分摊。一项一项问房东要标准。", checklist: ["逐项向房东或物业确认收费标准","记录每项费用的月均金额","算出隐性成本总计"] },
      { title: "算真实月成本", content: "真实月成本=月租金+物业费+水电预估+公摊+垃圾费+空调费+停车费+其他分摊。很多商家只看租金，结果实际成本比预期高出30%-50%。算完之后你才知道这个铺子到底能不能赚钱。", checklist: ["汇总所有固定月度费用","预估变动费用（水电等）","算出真实月总成本"] },
      { title: "计算盈亏平衡点", content: "知道真实月成本后，算你需要多少营收才能保本：保本营收=月总成本÷毛利率。比如月成本2万，毛利率50%，那你每月至少要做4万营收才不亏。再算每天要多少客流、多少客单价才能达到，看看这个位置能不能撑起来。", checklist: ["确认自己店铺的毛利率","用公式算出保本营收","换算成每天需要的客流和客单价"] }
    ]
  },
  {
    _id: "sol_106",
    title: "免租期争取技巧",
    summary: "装修期间争取免租或少租，省下的就是赚到的",
    difficulty: "中等",
    effectiveTime: "1-2天谈妥",
    costRange: "0元",
    problemCodes: ["COST_HIGH"],
    chapter: 1,
    sub: 102,
    steps: [
      { title: "预估装修工期做依据", content: "先找装修师傅问清楚你的铺子要装多久：简单翻新7-15天、中等装修15-30天、大改30-60天。把工期写进合同，作为要免租期的依据。装修期间你一分钱收入都没有但租金照付，这个钱能省则省。", checklist: ["找装修师傅评估工期","区分简单/中等/大改对应天数","把工期估算记录下来"] },
      { title: "谈判免租期的3个话术", content: "话术1：「装修期我还没开业，没法产生收益，免租是行规」话术2：「我装修完会长期稳定经营，免租几个月您不亏」话术3：「如果免租期谈不拢，我考虑另一间已经装好的铺子」。先讲道理、再讲利弊、最后给压力，层层递进。", checklist: ["准备好3套话术","先讲道理再讲利弊","必要时暗示有替代选择"] },
      { title: "分阶段免租更灵活", content: "房东不同意全免？退一步谈分阶段：装修期全免、开业第1个月半租、第2个月恢复全租。或者换个思路：不免租但延迟起租日，合同签了但起算日从开业那天开始算。灵活一点，总比装修期全付好。", checklist: ["设计分阶段免租方案","或谈延迟起租日方案","把免租条款明确写进合同"] }
    ]
  },
  {
    _id: "sol_107",
    title: "门头招牌吸睛法则",
    summary: "让路人3秒内知道你卖什么并记住你的店，门头就是最好的免费广告",
    difficulty: "简单",
    effectiveTime: "3-7天完成",
    costRange: "500-3000元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 103,
    steps: [
      { title: "3秒原则：品类名比店名重要", content: "路人经过你的店只有3秒注意力。这3秒内必须让他知道你卖什么。所以门头上品类名要比店名大：不要写「小李家」小字写着「面馆」，要写「老李面馆」或者直接大字「面馆」。品类名放最显眼位置，店名小一点没关系。", checklist: ["检查现有门头品类名是否足够大","确保3秒内能识别经营品类","品类名用最大字号最醒目颜色"] },
      { title: "选对颜色让人记住", content: "门头颜色要有识别度，别用白底黑字太普通。用和你品类匹配的高饱和色：火锅用红色、奶茶用橙色或粉色、面包店用暖黄色、药店用绿色。一条街上10家店，颜色最抢眼的那家最容易被记住。但别超过2种主色，太花反而乱。", checklist: ["选择1-2种高饱和主色","颜色与品类调性匹配","确保在街道上颜色有辨识度"] },
      { title: "加一句话核心卖点", content: "在门头下方加一行字，告诉路人你最大的卖点是什么：「现烤现卖」「10元管饱」「30年老师傅」「只用好油」。这行字不需要大，但要让走近的人看得到。很多顾客就是被这句话打动才进来的。", checklist: ["提炼1句话核心卖点","字数控制在8字以内","放在门头下方或入口显眼处"] },
      { title: "夜间亮灯别省电", content: "晚上门头不亮=这家店不存在。装LED灯带或发光字，让门头在晚上100米外都能看到。灯的电费一个月几十块，但多拉的客人远不止这点钱。如果整条街只有你一家亮着，那所有夜归的路人目光都是你的。", checklist: ["安装LED灯带或发光字招牌","每晚开灯到打烊后1小时","定期检查灯是否有损坏"] }
    ]
  },
  {
    _id: "sol_108",
    title: "橱窗陈列引客术",
    summary: "橱窗摆对东西，让人远远看到就想走进来，橱窗就是你的无声推销员",
    difficulty: "简单",
    effectiveTime: "当天可调",
    costRange: "0-500元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 103,
    steps: [
      { title: "橱窗只放最想卖的东西", content: "橱窗不是仓库，别什么都往里塞。只放2-3件最能代表你店的东西：最好看的衣服、最新款的产品、最诱人的食物模型。少即是多，放1件精品比放10件杂货更有吸引力。让路过的人一眼看到你最好的一面。", checklist: ["清空橱窗重新规划","挑选2-3件最吸引人的商品","留白不要塞满"] },
      { title: "设置场景而不是摆货", content: "好的橱窗讲一个故事，不是简单摆货。服装店：模特穿全套搭配+手提包+旁边放咖啡杯=「周末约会穿搭」场景；面包店：面包+果酱+牛奶杯+餐布=「美好早餐」场景。让人看到画面感，自然就想走进这个场景。", checklist: ["确定1个主题场景","准备场景搭配道具","按场景而非按品类陈列"] },
      { title: "定期换新保持新鲜感", content: "橱窗至少每2周换一次，常客每次经过都看到新东西，会觉得这家店很活跃。换橱窗不一定要换商品，换个搭配方式、换个场景主题、换个灯光角度都行。节日一定要应景：中秋摆月饼、圣诞摆红绿、春节挂灯笼。", checklist: ["制定2周1换的橱窗计划","节日提前准备应景陈列","记录每次更换的日期和主题"] }
    ]
  },
  {
    _id: "sol_109",
    title: "周边商户互助引流法",
    summary: "跟隔壁店铺互相介绍客人，不花钱多一条获客渠道",
    difficulty: "简单",
    effectiveTime: "1周搭建",
    costRange: "0元",
    problemCodes: ["TRAFFIC_LOW","REVENUE_DROP"],
    chapter: 1,
    sub: 104,
    steps: [
      { title: "找3-5家互补型邻居", content: "找和你客流人群一样但产品不竞争的店：面馆找旁边的奶茶店、理发店找旁边的便利店、服装店找旁边的美甲店。先去跟老板聊天建立关系，送点自家产品试吃试用，先交朋友再谈合作。", checklist: ["观察周边商户经营品类","筛选3-5家互补型店铺","主动上门认识老板建立关系"] },
      { title: "设计互利引流方案", content: "最常见的互助方式：①互相放对方优惠券（你放他的他放你的）②互相推荐客人（结账时说「旁边奶茶店今天半价」）③联合套餐（面馆+奶茶组合价更便宜）④共同办活动（周末街区小集市）。双方都有利才持久。", checklist: ["确定2-3种互助方式","设计双方对等的优惠方案","制作对方店铺的优惠券或推荐卡"] },
      { title: "建立简单追踪机制", content: "用最简单的方式追踪效果：优惠券上写「XX店推荐」标记、结账时问一句「怎么知道我们店的」。每月互相通报一次带来了多少客，效果好的继续加码，效果不好的换个方式。信任+数据=长期合作。", checklist: ["在互推物料上加识别标记","结账时询问客人来源","每月与互助伙伴对账1次"] }
    ]
  },
  {
    _id: "sol_110",
    title: "社区物业合作引流",
    summary: "跟小区物业搭上关系，把整个小区变成你的客源地",
    difficulty: "中等",
    effectiveTime: "1-2周打通",
    costRange: "0-1000元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 104,
    steps: [
      { title: "找对物业关键人", content: "物业经理或管家是关键人，搞定他们事半功倍。先以业主身份或商户身份去物业办公室聊，送点小礼品（自家产品最好），建立私人关系。不要一上来就谈合作，先混个脸熟。了解小区住户数量、入住率、消费水平等基本信息。", checklist: ["找到物业经理或管家关键人","带上小礼品上门拜访","了解小区基本情况和住户画像"] },
      { title: "设计双赢合作方案", content: "物业要的是给住户实惠和便利，你要的是获客。方案：①你出专属优惠，物业发到业主群（住户得实惠、你得客流）②在小区公告栏/电梯广告位投放你的广告（付少量费用或用产品抵）③小区活动你赞助或参与（物业省心你露脸）。", checklist: ["设计社区专属优惠方案","提出公告栏/电梯广告合作","准备小区活动赞助方案"] },
      { title: "从1个小区试点再复制", content: "先选1个最近的小区做试点，跑通流程看效果。如果1个月带来20个新客以上，说明模式成立，再复制到周边3-5个小区。每个小区都要维护物业关系，逢年过节送点心意，不要只在要客的时候才出现。", checklist: ["选1个小区做试点","统计1个月引流效果","效果达标后复制到更多小区","定期维护物业关系"] }
    ]
  },
  {
    _id: "sol_111",
    title: "商圈流量借势术",
    summary: "别人搞大促销人气爆棚时，你怎么蹭到流量为己所用",
    difficulty: "中等",
    effectiveTime: "活动期间即时见效",
    costRange: "0-500元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 1,
    sub: 104,
    steps: [
      { title: "提前获知大活动信息", content: "关注周边大商家（商场、超市、连锁店）的公众号和海报，提前知道他们的活动时间。每年双11、618、店庆、节假日是大流量节点，提前1-2周做准备。也关注街道办和商场管理处的通知，有时会有街区统一活动。", checklist: ["关注周边大商家公众号","记录年度大促时间节点","提前1-2周准备借势方案"] },
      { title: "设计引流承接方案", content: "大活动期间人流暴涨，但大部分人不一定进你的店。做3件事蹭流量：①门口摆醒目促销牌（让经过的人注意到你）②发针对性传单（写「逛完XX店来这歇脚，第二杯半价」）③设休息/充电/饮水点（让人自然走进来再推销）。", checklist: ["设计门口醒目促销物料","印制针对性引流传单","设置免费休息/饮水/充电点"] },
      { title: "活动后留住蹭来的客", content: "蹭流量只是第一步，留住才是本事。每个被引流进来的新客，都引导加微信或办会员：「今天活动价下次就没有了，加个微信下次有优惠第一时间通知您」。把一次性流量变成自己的私域客户，这波蹭的才真值。", checklist: ["引导新客加微信或办会员","承诺专属优惠维持关注","活动后3天内发欢迎消息"] }
    ]
  },
  {
    _id: "sol_112",
    title: "商铺租赁避坑清单",
    summary: "签约前对照10大坑逐一排查，签了再发现就晚了",
    difficulty: "简单",
    effectiveTime: "1天查完",
    costRange: "0元",
    problemCodes: ["COST_HIGH","MANAGEMENT_CHAOS"],
    chapter: 1,
    sub: 105,
    steps: [
      { title: "查产权和用途", content: "第1坑：房子可能不是房东的！要求看房产证原件，核对房东姓名和房屋地址。第2坑：住宅不能做商业！看房产证上用途写的是「商业」还是「住宅」，住宅做商业是违规的，随时被查封。第3坑：可能是违建！问物业这间铺子有没有违建部分，违建随时被拆。", checklist: ["查看房产证原件核对房东信息","确认房屋用途为商业","确认无违建风险"] },
      { title: "查费用和条款", content: "第4坑：押金退不回！合同里写清楚退租时押金多少天内退还、什么情况可以扣。第5坑：公摊面积虚高！要求房东出示公摊面积计算依据，别他说多少就多少。第6坑：递增条款藏雷！看清每年涨租多少、按什么比例涨、有没有封顶。第7坑：转租权没写！如果你以后想转让，合同里必须允许转租/转让。", checklist: ["明确押金退还条款","核实公摊面积计算依据","看清租金递增比例和封顶","确认合同允许转租/转让"] },
      { title: "查限制和责任", content: "第8坑：排烟排水不行！餐饮店签约前确认有排烟管道和隔油池，否则装不了被卡。第9坑：消防过不了！问物业之前有没有消防问题，有些铺子格局改不了消防永远过不了。第10坑：拆迁范围！去当地规划局网站或社区问，这片有没有近期拆迁规划，签了5年合同第2年被拆血亏。", checklist: ["确认排烟排水条件符合经营需求","核实消防验收情况","查询是否有近期拆迁规划"] },
      { title: "找专业人士审合同", content: "10个坑查完还不够，最后请律师或懂合同的朋友帮你看一遍合同全文，特别关注：违约责任是否对等、提前解约怎么赔、不可抗力条款、续约优先权。花几百块请律师审合同，可能帮你省几万块。", checklist: ["找律师或有经验的朋友审合同","重点看违约和解约条款","确保双方责任对等"] }
    ]
  },
  {
    _id: "sol_113",
    title: "拆迁风险预判法",
    summary: "签约前判断铺子会不会被拆，避免血本无归",
    difficulty: "中等",
    effectiveTime: "1-2天查清",
    costRange: "0元",
    problemCodes: ["COST_HIGH"],
    chapter: 1,
    sub: 105,
    steps: [
      { title: "查官方规划信息", content: "3个官方渠道查拆迁：①当地自然资源和规划局官网，查目标区域的控制性详细规划②当地住建局官网，查有没有旧城改造或城市更新项目③街道办事处/社区居委会，直接问有没有征迁计划。官方没说就暂时安全，但也要持续关注。", checklist: ["查规划局官网控规信息","查住建局城市更新项目","去街道办/居委会当面询问"] },
      { title: "看周边信号判断", content: "拆迁前会有蛛丝马迹：①周边突然有人大量抛售商铺（他们可能听到了消息）②附近有测绘人员在打桩测量③同一街区有旧改宣传标语④旁边建筑已经在拆或腾空。看到这些信号要高度警惕，宁可错过也别冒险。", checklist: ["观察周边商铺是否异常抛售","留意有无测绘/勘探活动","查看有无旧改宣传标牌","观察周边是否有拆迁腾空"] },
      { title: "合同中加入保护条款", content: "即使查了没风险，也要在合同里加保护：①如遇拆迁，甲方退还剩余租期租金和押金②装修补偿归乙方③提前3个月书面通知拆迁意向。房东如果不同意加这些条款，反而要怀疑他知道什么你不知道的。", checklist: ["起草拆迁保护条款","与房东协商写入合同","房东拒绝时提高警惕"] }
    ]
  },
  {
    _id: "sol_114",
    title: "转让费谈判指南",
    summary: "接手别人转让的铺子时，转让费怎么谈才不吃亏",
    difficulty: "困难",
    effectiveTime: "3-7天谈妥",
    costRange: "0元",
    problemCodes: ["COST_HIGH"],
    chapter: 1,
    sub: 105,
    steps: [
      { title: "拆解转让费看真实价值", content: "转让费不是一笔糊涂账，要拆开看：①装修残值（装修折旧后还值多少，一般按3年折旧算）②设备残值（设备新旧程度值多少，自己查市场二手价）③货品库存（按进货价算，别按零售价）④位置溢价（好位置确实值钱，但多少合理？）。拆完你就知道哪些该付、哪些不该付。", checklist: ["评估装修残值（3年折旧）","查设备二手市场价","按进货价算库存价值","评估位置溢价是否合理"] },
      { title: "用3招压转让费", content: "第1招：时间压力——「你这月底前不转就空置了，空1个月亏1个月租金」，让转让方着急降价。第2招：挑毛病——「这装修已经很旧了我接手要重装」「这设备快到寿命了」，每项都压价。第3招：拆开谈——「装修我认但设备我不要你搬走」，把不想要的部分剔除，总价就下来了。", checklist: ["了解转让方急迫程度","逐项评估装修和设备状况","把不要的部分要求对方搬走"] },
      { title: "绕过转让费的替代方案", content: "如果转让费实在谈不下来，有2个替代方案：①等空置——转让方如果一直转不出去，最后可能放弃转让直接退租，你跟房东直接签新合同就0转让费。②找房东斡旋——让房东出面协调，房东也想尽快租出去，有时会施压转让方降价。但别让房东觉得你在耍转让方，要把握好分寸。", checklist: ["评估等待空置的可行性","与房东沟通了解态度","权衡时间成本和转让费节省"] },
      { title: "签约前最后3个确认", content: "谈好价格后别急着签字，确认3件事：①房东同意转让（很多合同限制转让，房东不知情你的转让费可能打水漂）②前租客没有欠款欠费（查水电物业有没有欠费）③设备和装修确实和说的一致（签约当天现场清点验收）。确认无误再付钱签合同。", checklist: ["取得房东书面同意转让","查清前租客有无欠费欠款","现场清点设备和装修现状","确认无误后再付款签约"] }
    ]
  },
  {
    _id: "sol_115",
    title: "面试识人五问法",
    summary: "5个问题帮你快速判断候选人态度和能力，招到靠谱人",
    difficulty: "简单",
    effectiveTime: "1次面试即可",
    costRange: "0元",
    problemCodes: ["STAFF_LEAVE"],
    chapter: 5,
    sub: 501,
    steps: [
      { title: "准备五个核心问题", content: "设计5个看态度而非看技能的面试问题：『你上一份工作为什么离职』看人品、『如果客人无理取闹你会怎么做』看应变、『你觉得上一份工作最委屈的事是什么』看心态、『你觉得自己最大的缺点是什么』看自省、『如果今天入职你最想先学什么』看主动性。重点不是答案对错，而是回答时是否真诚、有没有推卸责任。", checklist: ["列出5个面试问题","给每个问题设定评分标准（1-5分）","打印面试记录表方便打分"] },
      { title: "设定观察重点", content: "面试时不光听回答，更要观察细节：眼神是否敢看你（心虚的人不敢对视）、说话是否前后矛盾（编故事容易露馅）、有没有不断抱怨前老板（推卸责任型）、是否主动提问（有上进心）。准备一张观察清单，每项勾选。", checklist: ["制作面试观察清单","练习边听边记录的习惯","安排两个人同时面试互相印证"] },
      { title: "情境模拟测试", content: "设计1-2个实操情境让候选人现场演示。比如让餐饮候选人当场演示端盘摆台、让销售候选人模拟推销一款产品。实操比嘴说靠谱100倍，干不了就是干不了，装不出来。", checklist: ["设计1个与岗位相关的实操情境","准备好模拟所需道具","明确实操评分标准"] },
      { title: "背调确认", content: "面试感觉不错的人，一定要打电话给前雇主确认。问三个问题就行：这个人在你们那干了多久、工作态度怎么样、你还会不会再雇他。前老板的回答比面试表现真实得多。", checklist: ["拿到候选人前雇主联系方式","打电话核实3个关键问题","对比面试说辞和背调结果是否一致"] }
    ]
  },
  {
    _id: "sol_116",
    title: "招聘渠道选择指南",
    summary: "告诉你去哪里招人最有效，少花冤枉钱少走弯路",
    difficulty: "简单",
    effectiveTime: "3-7天找到合适渠道",
    costRange: "0-500元",
    problemCodes: ["STAFF_LEAVE"],
    chapter: 5,
    sub: 501,
    steps: [
      { title: "按岗位选渠道", content: "不同岗位去不同的地方找人：基层服务员/导购优先问老员工推荐（熟人推荐最靠谱）、技术岗上58同城和BOSS直聘、管理岗去同行挖人或用猎头。别什么岗都去同一个平台，效果差还费钱。", checklist: ["列出当前需要招的岗位","为每个岗位匹配2-3个招聘渠道","估算每个渠道的招聘成本"] },
      { title: "激活内部推荐", content: "老员工推荐是最省钱的招人方式。设推荐奖：推荐1人入职满1个月奖200-500元，满3个月再奖200元。重赏之下必有勇夫，老员工不会推荐太差的人，因为面子挂不住。", checklist: ["制定内推奖金标准","在公司群发布招聘需求和奖励","让老员工帮忙转发朋友圈"] },
      { title: "用好免费渠道", content: "优先用不花钱的渠道：店门口贴招聘启事（路过的人就是潜在员工）、微信朋友圈和业主群发招聘信息、本地论坛和贴吧发帖。这些渠道来的都是附近的人，通勤短稳定性好。", checklist: ["制作招聘海报贴店门口","在3个以上业主群发招聘信息","朋友圈每周发1次招聘信息"] },
      { title: "评估渠道效果", content: "每个渠道来的候选人都记录来源，统计面试到场率、入职率和留存率。用3个月数据说话，砍掉效果差的渠道，把钱和精力砸在效果好的渠道上。", checklist: ["建立招聘来源追踪表","统计各渠道面试到场率","3个月后砍掉低效渠道"] }
    ]
  },
  {
    _id: "sol_117",
    title: "弹性排班省钱法",
    summary: "怎么排班人手够又不浪费工时，每月省下上千元人工成本",
    difficulty: "中等",
    effectiveTime: "1周排好班表",
    costRange: "0元",
    problemCodes: ["COST_HIGH","STAFF_LEAVE"],
    chapter: 5,
    sub: 504,
    steps: [
      { title: "画出客流时间表", content: "连续记录2周每天每小时的客流量，画出客流曲线图。你会发现：中午12-14点、晚上18-20点是高峰，其他时间客人很少。很多店全天排满人，闲时也白付工资，这就是最大的浪费。", checklist: ["记录2周每日分时段客流","标注出高峰时段和低谷时段","计算高峰与低谷的客流倍数差"] },
      { title: "设计弹性班次", content: "根据客流曲线设计班次：高峰时段全员上岗、低谷时段只留1-2人值班。比如餐饮店可以设AB班：A班10:00-14:00+17:00-21:00（高峰班）、B班14:00-17:00（过渡班）。避免所有人都是朝九晚九的排法，那最浪费。", checklist: ["设计2-3种弹性班次","计算每种班次的人数配置","确保高峰时段人手充足"] },
      { title: "错峰安排补休", content: "员工的休息日尽量安排在客流低谷日（比如周二周三），而不是周末。这样周末人手充足，闲时员工也得到休息。如果员工坚持要周末休，可以用轮休制保证每天都有足够人手。", checklist: ["确定每周低谷日安排补休","制定轮休表保证周末人手","提前1个月排好班让员工有预期"] },
      { title: "动态微调优化", content: "排班不是排好就完了，每周根据实际情况微调：上周某天特别忙就加人、某天特别闲就减人。月底统计人效（营业额÷总工时），如果人效持续下降说明排班太松了。", checklist: ["每周回顾上周客流变化","根据变化调整下周排班","月度统计人效指标"] }
    ]
  },
  {
    _id: "sol_118",
    title: "兼职用工管理手册",
    summary: "兼职怎么招、怎么管、怎么算工资，用好人不花冤枉钱",
    difficulty: "中等",
    effectiveTime: "1周搭建管理体系",
    costRange: "0元",
    problemCodes: ["STAFF_LEAVE","COST_HIGH"],
    chapter: 5,
    sub: 504,
    steps: [
      { title: "明确兼职需求", content: "先算清楚什么时候需要兼职：高峰时段缺人手？周末需要帮手？临时活动加人？把需求具体到『每周几、几点到几点、需要几个人』，别模糊地说『有时候需要帮忙』，那样根本管不好。", checklist: ["列出具体需要兼职的时段和人数","统计每周兼职总工时需求","算出兼职工资预算"] },
      { title: "建立兼职人才库", content: "平时就留意储备兼职人员，不要缺人了才临时找。可以找附近的大学生、退休阿姨、自由职业者。每人登记好：可工作时段、技能、时薪要求。需要人时从库里调，比现找快10倍。", checklist: ["制作兼职人员信息登记表","储备5-10名兼职候选人","定期更新候选人的可工作时段"] },
      { title: "规范工资计算", content: "兼职工资必须算清楚，避免纠纷。建议按小时计费，日结或周结。时薪参考当地最低工资的1.2-1.5倍。特别忙的时段（节假日）可以1.5-2倍时薪。每次工作结束当场确认工时并签字，绝不拖到下个月。", checklist: ["确定兼职时薪标准","制定节假日加班费标准","制作工时确认签字表"] },
      { title: "培训和管理", content: "兼职也要培训，至少花1小时讲清楚：工作流程、服务标准、注意事项。给兼职安排一个固定带班人，有问题直接找他。兼职犯错很正常，关键是有人指导、有标准可参照。", checklist: ["制作1小时兼职速成培训内容","指定带班负责人","准备兼职工作手册（流程+标准）"] },
      { title: "合规风险防范", content: "兼职用工要注意合规：签订劳务协议明确双方权利义务、买好意外险防止工伤纠纷、不要让兼职连续工作超过法定时长。万一出事没有协议和保险，赔的钱比省的工资多得多。", checklist: ["准备兼职劳务协议模板","为兼职购买意外险","了解当地兼职用工政策红线"] }
    ]
  },
  {
    _id: "sol_119",
    title: "员工离职面谈话术",
    summary: "怎么跟要走的人聊出真话，发现问题才能留住下一个",
    difficulty: "简单",
    effectiveTime: "1次面谈30分钟",
    costRange: "0元",
    problemCodes: ["STAFF_LEAVE"],
    chapter: 5,
    sub: 505,
    steps: [
      { title: "营造放松氛围", content: "离职面谈千万别在老板办公室里像审问一样。找个轻松的地方，比如附近咖啡馆，坐下来像朋友聊天。先说『不管你做什么决定我都尊重，就是想听听你的真实想法』。人放松了才说真话。", checklist: ["选择轻松的面谈场所","准备一两杯饮料缓和气氛","开场表明尊重对方决定的态度"] },
      { title: "问对三个问题", content: "离职面谈就问三个核心问题：『离开的最主要原因是什么』（听真因不是听场面话）、『你觉得店里最需要改的是什么』（离职员工说的是在职员工不敢说的）、『什么情况下你愿意留下来』（判断还能不能挽留）。追问2-3次才能听到真话。", checklist: ["准备3个核心问题","练习追问技巧","准备录音或笔记记录关键信息"] },
      { title: "别辩解只倾听", content: "员工说问题时，老板最容易犯的错就是当场辩解。他说工资低你就解释成本高，他说管理乱你就说已经改了。记住：面谈目的是听真话不是辩论。不管他说什么先记下来，点头表示理解就行。", checklist: ["提醒自己面谈中不辩解","用点头和『嗯我理解』回应","记录每一条反馈"] },
      { title: "整理行动清单", content: "面谈结束后立刻整理：他说的问题是不是真的？其他员工是不是也有同样感受？哪些问题可以改？按优先级排出来，能改的马上改。一个离职员工的问题可能是十个在职员工的心病，不改会继续走人。", checklist: ["整理面谈记录","判断哪些问题普遍存在","列出可改进项并设定完成时间"] }
    ]
  },
  {
    _id: "sol_120",
    title: "岗位交接防漏清单",
    summary: "人走了业务不能断，用清单确保每项工作都交接清楚",
    difficulty: "简单",
    effectiveTime: "2-3天完成交接",
    costRange: "0元",
    problemCodes: ["STAFF_LEAVE","MANAGEMENT_CHAOS"],
    chapter: 5,
    sub: 505,
    steps: [
      { title: "梳理岗位工作清单", content: "把离职员工每天、每周、每月要做的事全部列出来，一条不漏。别只列大事，那些每天随手做的小事最容易漏掉（比如每天检查冰箱温度、每周盘点调料库存）。让离职员工自己先列一份，再让带班人补充。", checklist: ["让离职员工自列工作清单","带班人补充遗漏项","按日/周/月分类整理"] },
      { title: "列出关键联系人和密码", content: "把该岗位涉及的所有外部联系人、账号密码整理出来：供应商联系方式和结算方式、线上平台账号密码、客户微信群、银行操作权限等。这些信息平时都在员工个人手机里，人一走全丢了。", checklist: ["整理供应商联系方式","导出所有工作账号密码","列出客户群和管理权限"] },
      { title: "现场实操交接", content: "交接不能只交接清单，必须让新旧员工一起干3天。老员工做、新员工看→新员工做、老员工看→新员工独立做、老员工兜底。特别注意那些『只可意会』的操作技巧，必须当面教。", checklist: ["安排3天实操交接期","按老做新看→新做老看→新做老兜底流程","记录实操中发现的新问题"] },
      { title: "签字确认存档", content: "交接完成后，新旧员工和带班人三方签字确认。内容包括：已交接的工作项、已知悉的注意事项、遗留问题及处理方案。签了字以后出问题有据可查，避免互相推诿。", checklist: ["制作交接确认书","三方签字确认","存档备查"] }
    ]
  },
  {
    _id: "sol_121",
    title: "个体户报税实操指南",
    summary: "个体户怎么报税不踩雷，按步骤操作不花冤枉钱请会计",
    difficulty: "中等",
    effectiveTime: "1-2天完成首次报税",
    costRange: "0元（自行申报）",
    problemCodes: ["COST_HIGH"],
    chapter: 6,
    sub: 604,
    steps: [
      { title: "搞清自己该交什么税", content: "个体户常见税种就三种：增值税（月销10万以下免征）、个人所得税（经营所得，按年汇算清缴）、附加税（城建税等，增值税免了它也免）。先登录电子税务局查看自己核定了哪些税种，别多交也别漏交。", checklist: ["登录电子税务局查看核定税种","确认自己是否享受免税政策","记录每个税种的申报周期"] },
      { title: "建好收支台账", content: "不管多小的店都要记账。买个便宜记账软件或用Excel表格，每天记录收入和支出。收入按实际收钱记，支出保留发票和转账记录。别等报税时才翻手机转账记录，根本翻不清。", checklist: ["选择记账工具（软件或Excel）","每天花5分钟记录收支","按月整理发票和转账记录"] },
      { title: "按时申报别逾期", content: "增值税一般按月或按季申报，个税按季预缴、年度汇算。在电子税务局设好提醒，每个申报期提前3天完成。逾期申报会罚款，严重的还会影响信用。就算这月没收入也要零申报，不申报和零申报是两码事。", checklist: ["在手机设置申报日提醒","提前3天完成申报","零收入也要做零申报"] },
      { title: "用好优惠政策", content: "国家对小微个体户有很多减税政策：小规模纳税人月销10万以下免增值税、六税两费减半征收、年应纳税所得额200万以下个税减半。定期关注当地税务局公众号，新政策出来了别错过。", checklist: ["关注当地税务局公众号","确认自己享受的减免政策","计算实际应缴税额"] }
    ]
  },
  {
    _id: "sol_122",
    title: "发票管理避坑法",
    summary: "开票收票的常见误区，避开这些坑省下的都是真金白银",
    difficulty: "简单",
    effectiveTime: "1天梳理完毕",
    costRange: "0元",
    problemCodes: ["COST_HIGH"],
    chapter: 6,
    sub: 604,
    steps: [
      { title: "搞清开票规则", content: "个体户开票常见三个坑：第一，不是所有收入都要开票，但不开票也要申报收入；第二，别帮别人代开发票，这是违法的，查到罚款很重；第三，发票金额要和实际交易一致，别多开也别少开。", checklist: ["了解当前开票限额和规则","确认哪些业务需要开票","绝不帮人代开发票"] },
      { title: "收票三查法", content: "收到供应商发票要查三件事：查真伪（在国家税务总局平台验真）、查信息（公司名称、税号、金额对不对）、查时效（发票有时效性，过期不能抵扣）。收到假票或错票要立刻退回重开，别将就留着。", checklist: ["收到发票先验真伪","核对发票信息是否正确","检查发票是否在有效期内"] },
      { title: "发票存放规范", content: "发票存放要分类管理：按月份装订、进项票和销项票分开、电子发票及时下载保存到电脑和云端。纸质发票防潮防丢，电子发票防误删。税务检查时要拿得出完整票据，拿不出来就是白花。", checklist: ["按月装订纸质发票","下载保存所有电子发票","备份到云端防丢失"] },
      { title: "定期自查对账", content: "每月末做一次发票自查：开的票和申报的收入对不对得上、收的票和付的款对不对得上、有没有遗漏的发票。对不上要查明原因，拖到年底再查根本查不清。", checklist: ["每月末核对开票与收入","核对收票与付款金额","发现差异立即查明原因"] }
    ]
  },
  {
    _id: "sol_123",
    title: "税务检查应对术",
    summary: "被查了怎么办，冷静应对不慌不乱少交罚款",
    difficulty: "困难",
    effectiveTime: "按检查周期",
    costRange: "0-3000元（可能补税罚款）",
    problemCodes: ["COST_HIGH"],
    chapter: 6,
    sub: 604,
    steps: [
      { title: "收到通知先别慌", content: "收到税务检查通知先冷静，不等于你一定有问题。常见检查原因：行业随机抽查、被举报、数据异常触发预警。先确认检查类型（日常检查还是专项检查）、检查时间段、需要准备的材料。把通知仔细读三遍，不要遗漏任何要求。", checklist: ["仔细阅读检查通知","确认检查类型和时间范围","列明需要准备的材料清单"] },
      { title: "快速补齐材料", content: "根据检查要求立刻整理材料：营业执照和税务登记证、检查期间的账本和凭证、银行对账单、发票存根和进项票、租赁合同和工资表。缺什么赶紧补，但绝不能造假。假的比缺的后果严重十倍。", checklist: ["整理检查期间的完整账本","准备银行流水和发票凭证","确保材料真实不造假"] },
      { title: "配合检查有技巧", content: "检查人员来了，态度要好但不卑不亢。问什么答什么，不问不多说。提供材料实事求是，不确定的别说『大概』，说『我查一下再回复』。千万别阻挠检查或提供虚假材料，这会从违规升级为违法。", checklist: ["安排专人对接检查人员","只答所问不多说","不确定的问题先查后答"] },
      { title: "处理结果要合理", content: "检查出问题后：先看处罚依据是否合理，有异议可以申辩；确实欠税的尽快补缴，主动补缴罚款可从轻；如果金额大或涉及复杂问题，建议找专业税务师帮忙处理，花小钱省大钱。", checklist: ["仔细阅读检查结论","有异议在规定时间内申辩","必要时请税务师协助"] }
    ]
  },
  {
    _id: "sol_124",
    title: "小额贷款避坑指南",
    summary: "借钱开店怎么不被坑，识别套路选对贷款省下几千利息",
    difficulty: "中等",
    effectiveTime: "1-2周完成贷款",
    costRange: "视贷款额度而定",
    problemCodes: ["COST_HIGH"],
    chapter: 6,
    sub: 605,
    steps: [
      { title: "先算清楚该不该借", content: "借钱之前先算三笔账：这笔钱用来干嘛能赚回多少（投资回报）、每月还多少能不能还上（还款压力）、最坏情况还不上怎么办（风险兜底）。如果借钱只是填窟窿而不是扩大收入，别借，越借越穷。", checklist: ["算清楚借款用途和预期回报","计算月还款额是否负担得起","评估最坏情况下的应对方案"] },
      { title: "选正规渠道", content: "贷款渠道按安全度排序：银行小微贷最安全利率最低、网商银行等持牌机构次之、信用卡分期应急可用、街边小贷公司和网贷平台千万别碰。利率超过年化15%的都不划算，超过24%的基本是套路贷。", checklist: ["优先咨询银行小微贷产品","对比3家以上机构利率","远离年化利率超24%的贷款"] },
      { title: "看穿常见套路", content: "贷款常见四个坑：砍头息（说借10万实际到手8万，2万被扣了）、隐形费（手续费、服务费、保险费加起来比利息还多）、等额本息陷阱（名义利率低实际利率高）、提前还款违约金（想早还钱反而被罚）。签合同前逐条看清楚。", checklist: ["确认实际到手金额","问清所有附加费用","计算真实年化利率","确认提前还款是否收违约金"] },
      { title: "签合同前必查", content: "签贷款合同前重点看四个条款：利率和费用（年化综合成本是多少）、还款方式（先息后本还是等额本息）、违约责任（逾期怎么罚）、提前还款条件（能不能提前还、要不要罚息）。所有口头承诺必须写进合同，没写等于没有。", checklist: ["逐条阅读合同条款","把口头承诺写进合同","保留合同副本和转账记录"] }
    ]
  },
  {
    _id: "sol_125",
    title: "加盟骗局识别法",
    summary: "加盟前必看的防骗清单，识别套路保住你的血汗钱",
    difficulty: "简单",
    effectiveTime: "1周完成尽职调查",
    costRange: "0元",
    problemCodes: ["COST_HIGH","REVENUE_DROP"],
    chapter: 6,
    sub: 605,
    steps: [
      { title: "查资质验真身", content: "正规加盟品牌必须有商业特许经营备案，在商务部网站就能查到。查不到备案的百分百有问题。同时查公司注册信息：成立不到2年的品牌别信、注册资本不到100万的慎选、有诉讼纠纷的坚决不碰。", checklist: ["在商务部网站查特许经营备案","查公司注册信息和成立年限","查是否有法律诉讼记录"] },
      { title: "识别夸大宣传", content: "加盟骗局最常见的套路：说3个月回本（餐饮行业平均回本8-14个月）、说免加盟费（后续物料费比市场贵3倍）、说保证月入多少（只算收入不算成本）、展示明星店数据（那是直营店你做不出来）。凡是承诺保本保收益的，99%是骗局。", checklist: ["对比行业平均回本周期","确认免加盟费是否有隐性收费","追问物料价格是否高于市场价","要求看多家加盟店真实数据"] },
      { title: "实地考察加盟店", content: "加盟品牌一定会带你看他们精心准备的形象店，这不算数。你必须自己偷偷去看3家以上的普通加盟店，最好在饭点去数客流量。跟加盟店老板聊真实经营情况，问问他们如果重新选还会不会加盟。", checklist: ["自己走访3家以上普通加盟店","在高峰时段数客流","与3位以上加盟商深聊真实情况"] },
      { title: "合同逐条过目", content: "加盟合同是维权唯一依据，签之前必须逐条看：加盟费多少包含什么不包含什么、物料是否必须从总部进价多少、解约条件和退款条款、区域保护范围多大。有条件的话找律师花几百块帮你审合同，比被坑几万块划算。", checklist: ["逐条阅读加盟合同","标出不合理条款要求修改","请律师审核合同"] }
    ]
  },
  {
    _id: "sol_126",
    title: "合伙人出资协议要点",
    summary: "合伙开店怎么写协议保平安，先说断后不乱",
    difficulty: "中等",
    effectiveTime: "1-2周拟定签署",
    costRange: "0-1000元（律师审合同）",
    problemCodes: ["COST_HIGH","MANAGEMENT_CHAOS"],
    chapter: 6,
    sub: 605,
    steps: [
      { title: "明确出资比例和方式", content: "协议第一条就写清楚：每人出多少钱、怎么出（现金还是实物折价）、什么时间到位。出钱的方式和比例决定股权分配，别含糊。实物出资的必须第三方估价，别自己商量着来，以后肯定扯皮。", checklist: ["写明每人出资金额和比例","约定出资到位时间节点","实物出资必须第三方估价"] },
      { title: "约定分工和决策权", content: "合伙最怕两个人都想说了算。协议写清楚：谁负责日常经营、谁负责财务管理、重大决策（超过一定金额的支出、招聘解雇核心岗位）怎么表决（简单多数还是全体同意）。决策机制不写清楚，迟早翻脸。", checklist: ["明确各自的分工和职责","约定重大事项的决策机制","写明争议时的仲裁方式"] },
      { title: "设计退出机制", content: "合伙协议必须有退出条款：如果一方要退出怎么算估值、什么条件下可以退、退出后股份怎么处理、退出的钱多久付清。别觉得谈退出不吉利，90%的合伙纠纷都因为退出没谈好。", checklist: ["约定退出条件","约定退出时的估值方法","约定退出款项支付周期"] },
      { title: "利润分配和亏损承担", content: "写清楚利润怎么分、什么时候分（按月、按季还是按年）、亏损怎么担。特别约定：利润留存多少用于再发展、分钱前要不要先提风险准备金。别赚了钱就分光，遇到困难没人愿意再掏钱。", checklist: ["约定利润分配比例和时间","约定亏损承担方式","约定利润留存比例"] },
      { title: "签完公正存档", content: "协议写好后双方签字按手印，最好做个公证或至少找个第三方见证人签字。每人保留一份原件，再复印一份放在店里的保险柜。口头约定不算数，没签字的协议等于没有。", checklist: ["双方签字按手印","做公证或找见证人签字","各自保留原件并备份"] }
    ]
  },
  {
    _id: "sol_127",
    title: "门店线上化转型三板斧",
    summary: "突发情况怎么快速转线上，三板斧帮你7天内上线营业",
    difficulty: "困难",
    effectiveTime: "7天内上线",
    costRange: "0-2000元",
    problemCodes: ["REVENUE_DROP","TRAFFIC_LOW"],
    chapter: 7,
    sub: 703,
    steps: [
      { title: "第一板斧：开通线上接单", content: "当天就做三件事：开通微信接单（建外卖自提群或用微信小店）、入驻外卖平台（美团饿了么选一个先上）、在大众点评标注线上购买。核心是让客人不用到店也能买到你的东西。先把线上渠道建起来，后面再慢慢优化。", checklist: ["开通微信接单渠道","入驻至少1个外卖平台","在大众点评标注线上购买"] },
      { title: "第二板斧：社群激活老客", content: "把所有老客户拉进微信群，每天在群里发布当天可售产品、限时特价、新品预告。群内下单直接转账或用小程序，老板自己配送或用同城配送。老客户是线上化转型的基本盘，他们信任你，愿意线上买。", checklist: ["建立客户微信群","制定群内每日发布节奏","打通群内下单支付流程"] },
      { title: "第三板斧：短视频引流", content: "用手机拍短视频发抖音/视频号，内容就三类：做产品的过程（治愈感）、打包发货的场景（信任感）、客户好评截图（说服力）。不用拍得多精美，真实就够了。每天发1条，坚持2周就会有效果。", checklist: ["注册抖音和视频号账号","拍摄3条不同类型的视频","制定每日发布计划"] },
      { title: "持续优化迭代", content: "线上运营1周后看数据：哪个渠道订单多就加码哪个、哪个产品线上卖得好就多推、客户反馈的问题马上改。线上化不是一步到位，是边做边调。最重要的是先跑起来，别追求完美。", checklist: ["统计各渠道订单量和成本","找出线上畅销品重点推广","根据客户反馈快速调整"] }
    ]
  },
  {
    _id: "sol_128",
    title: "社区团购自救法",
    summary: "开不了店时靠社区团购续命，把周边居民变成你的客户",
    difficulty: "中等",
    effectiveTime: "3-5天启动",
    costRange: "0-500元",
    problemCodes: ["REVENUE_DROP","TRAFFIC_LOW"],
    chapter: 7,
    sub: 703,
    steps: [
      { title: "选团购主打品", content: "选2-3款适合团购的产品：刚需高频（米面粮油、日用品）、方便配送（不易坏、好打包）、利润可控（团购价低但量大也能赚钱）。不要选太多品类，专注几款做到极致性价比。", checklist: ["选定2-3款团购主打品","核算成本设定团购价","准备打包耗材"] },
      { title: "铺设社区渠道", content: "找到周边3-5个小区的团长（社区团购的关键人），可以是物业、便利店老板、热心业主。给团长10%-15%的佣金，让他们在业主群推你的产品。团长比你更懂怎么卖，让他们帮你卖比自己卖效率高10倍。", checklist: ["联系3-5个小区团长","谈好佣金比例","准备好图文素材给团长用"] },
      { title: "设计配送方案", content: "团购最关键的是配送体验。方案一：和团长约好每天固定时间送到小区自提点；方案二：用同城配送平台直接送到客户家门口。选择哪种看成本和品类，生鲜类必须快，日用品可以慢。", checklist: ["确定配送方式和时间","和团长约定交接流程","测试配送时效和成本"] },
      { title: "用好评滚雪球", content: "每个拿到货的客户都请他们在群里晒图好评，好评是最好的广告。可以设奖励：晒图返2元、推荐新客户下单双方各得5元券。让老客户帮你带新客户，团购规模才能越滚越大。", checklist: ["设置晒图好评奖励","设计老带新奖励方案","每天收集好评截图做素材"] }
    ]
  },
  {
    _id: "sol_129",
    title: "应急现金流救命法",
    summary: "没收入时怎么撑过3个月，8招搞定应急现金流",
    difficulty: "困难",
    effectiveTime: "1周内见效",
    costRange: "0元",
    problemCodes: ["REVENUE_DROP","COST_HIGH"],
    chapter: 7,
    sub: 703,
    steps: [
      { title: "算清生存线", content: "立刻算出每个月必须花的钱：房租、员工底薪、水电、贷款月供、必要物料。这就是你的生存线。把这些加起来乘以3，就是你需要撑过3个月的现金。知道底线才不会乱。", checklist: ["列出每月固定支出清单","计算3个月生存所需现金","砍掉所有非必要开支"] },
      { title: "催收应收款", content: "所有欠你的钱立刻催：客户赊账的打电话催收、供应商该退的押金申请退回、平台未结算的款项加紧申请。态度要坚决但客气，分期回收也行，先拿到手再说。", checklist: ["列出所有应收款明细","逐一联系催收","接受分期回收但必须要有时间表"] },
      { title: "变卖闲置资产", content: "店里用不上的设备和存货尽快变现：闲置设备二手转卖、积压库存打折清仓、多余的储值卡打折转让。能变现的都变现，现金为王。别舍不得，这时候留着也用不上。", checklist: ["盘点闲置设备和积压库存","在二手平台和朋友圈挂出","价格可以低但必须快出手"] },
      { title: "谈延期降成本", content: "主动找房东谈减免或延期交租（很多房东愿意缓一缓而不是看你倒闭收空铺）、和供应商谈延长账期、和银行谈贷款展期。不开口永远没有机会，开口了很多人愿意帮忙。", checklist: ["联系房东谈减免或延期","联系供应商延长账期","联系银行申请贷款展期"] },
      { title: "创收求生存", content: "在保证核心业务的前提下想尽办法创收：外卖团购接单、出租闲置时段的场地、提供上门服务、开发预售卡和储值卡回笼资金。生存期不做利润最大化的选择，做现金流最大化的选择。", checklist: ["开通所有能接单的线上渠道","开发储值卡预售回笼资金","提供上门或外送服务创收"] }
    ]
  },
  {
    _id: "sol_130",
    title: "证照变更快速办理法",
    summary: "被要求改证照怎么快速搞定，少跑腿不耽误生意",
    difficulty: "中等",
    effectiveTime: "3-7个工作日",
    costRange: "0-500元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 7,
    sub: 704,
    steps: [
      { title: "搞清要改什么", content: "先搞清楚具体需要变更哪项证照、变更原因是什么。常见变更：经营范围（新增或减少品类）、经营地址（搬迁）、法人代表（换老板）、名称变更。不同变更需要的材料和流程不同，别瞎跑先问清楚。", checklist: ["确认需要变更的证照类型","了解变更的具体原因","查询该类变更所需材料清单"] },
      { title: "线上预约少跑腿", content: "现在大部分证照变更都能线上办：先在当地政务服务网或APP上查流程和材料清单，能线上提交的就在线上办，必须线下的先预约好时间。千万别材料没带齐就跑过去，白跑一趟浪费一天。", checklist: ["登录政务服务网查流程","线上提交预审材料","预约线下办理时间段"] },
      { title: "备齐材料一次过", content: "按材料清单逐项准备，特别注意：营业执照正副本原件必须带、变更事项相关的证明文件（如新地址的租赁合同）、法人身份证原件和复印件、公章。所有复印件多备2份，要盖章的提前盖好。", checklist: ["按清单逐项检查材料","多备2份复印件","提前盖好需要的公章"] },
      { title: "变更后同步更新", content: "证照变更后还要同步更新：外卖平台和点评的门店信息、银行对公账户信息、税务登记信息、门口的营业执照展示。漏了哪个都可能被查或影响经营，列个清单逐一更新。", checklist: ["更新线上平台门店信息","更新银行和税务信息","更换店内展示的营业执照"] }
    ]
  },
  {
    _id: "sol_131",
    title: "环保消防整改指南",
    summary: "被查了怎么快速过检，照着清单改一遍就过关",
    difficulty: "中等",
    effectiveTime: "1-2周完成整改",
    costRange: "500-5000元",
    problemCodes: ["MANAGEMENT_CHAOS","COST_HIGH"],
    chapter: 7,
    sub: 704,
    steps: [
      { title: "拿到整改通知书", content: "被查后一定会给整改通知书，上面写清楚了哪些不合格、整改期限是什么时候。把通知书逐条读懂，每一条标注优先级和整改难度。不懂的立刻问检查人员，别自己猜。", checklist: ["仔细阅读整改通知书","逐条标注整改要求","有不明白的立刻问检查人员"] },
      { title: "消防整改常见项", content: "小门店消防常见不合规项：灭火器数量不够或过期（每50平米至少2具4kg灭火器）、安全出口被堵或标识不亮、应急照明灯缺失、电气线路未穿管保护、厨房未装燃气报警器。对照自查，该买的买该装的装，花不了多少钱。", checklist: ["检查灭火器数量和有效期","清理安全出口确保畅通","安装应急照明和出口标识","检查电气线路穿管保护","厨房安装燃气报警器"] },
      { title: "环保整改常见项", content: "小门店环保常见不合规项：餐饮油烟未装净化器或未定期清洗、噪音超标（空调外机未减震）、污水排放不符合要求、垃圾分类不达标。油烟净化器是餐饮必备，买一台1000-3000元，每月清洗一次。", checklist: ["安装或清洗油烟净化器","检查空调外机减震措施","确认污水排放符合要求","落实垃圾分类制度"] },
      { title: "申请复查验收", content: "整改完成后主动联系检查部门申请复查，别等期限到了才着急。复查时把整改前后的对比照片带上，证明你确实改了。通过后保留好整改和验收材料，以备下次检查用。", checklist: ["整理整改前后对比照片","主动申请复查验收","保存整改验收材料备查"] }
    ]
  },
  {
    _id: "sol_132",
    title: "政策风向预判法",
    summary: "怎么提前知道政策要变，早准备不吃亏",
    difficulty: "困难",
    effectiveTime: "持续关注",
    costRange: "0元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 7,
    sub: 704,
    steps: [
      { title: "建立信息源", content: "提前关注3类信息源：当地市场监管和税务部门的公众号（政策变化第一时间发布）、行业协会或商会的群（同行之间消息最快）、政务服务网的公告栏。每天花5分钟浏览一遍，养成习惯。", checklist: ["关注市场监管和税务公众号","加入本地同行交流群","每天花5分钟浏览政策信息"] },
      { title: "读懂政策信号", content: "政策变化有3个信号：高频检查某类问题（说明要出整治政策了）、媒体报道某类现象（舆论铺垫政策要来了）、上级发了指导性文件（地方落地细则快了）。看到这些信号就开始做准备，别等正式文件下来才动。", checklist: ["关注近期检查重点方向","留意媒体报道的行业问题","追踪上级指导性文件动向"] },
      { title: "提前准备应对", content: "预判到可能的政策变化后提前行动：可能要查环保就先装好净化器、可能要查消防就先备好灭火器、可能要改证照就先把材料准备好。提前整改的成本远低于被查后罚款加停业的损失。", checklist: ["针对政策信号提前自查","该整改的先整改","备好可能需要的证照材料"] },
      { title: "同行互助预警", content: "加入本地同行交流群，谁先被查了就在群里说一声，其他人赶紧自查。这种第一手信息比任何官方渠道都快。同时也可以跟周边同行约好互相通风报信，有情况及时沟通。", checklist: ["加入2-3个本地同行群","主动分享自己遇到的政策信息","与周边同行建立互助预警机制"] }
    ]
  },
  {
    _id: "sol_133",
    title: "店铺估值计算法",
    summary: "你的店值多少钱，用3种方法算出合理价格不吃亏",
    difficulty: "中等",
    effectiveTime: "2-3天完成估值",
    costRange: "0元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 7,
    sub: 705,
    steps: [
      { title: "方法一：资产法", content: "最简单的算法：把店里的设备、装修、库存按二手市场价算一遍，加上转让时未到期的房租押金。这是店铺估值的底线，不管生意好不好这些硬资产都值这个钱。注意要按二手价算不是买的时候多少钱。", checklist: ["盘点所有设备和装修","按二手市场价估价","加上未到期房租押金"] },
      { title: "方法二：收益法", content: "最常见的算法：用过去12个月的平均月净利润乘以一个倍数。稳定老店乘18-24个月利润、新店或不太稳定的乘6-12个月利润。比如月均净利2万的老店，估值大约36-48万。这是买家最看重的算法。", checklist: ["计算过去12个月平均月净利润","根据稳定性选择乘数倍数","用月利润×倍数得出估值"] },
      { title: "方法三：市场法", content: "最接地气的算法：看看周边类似店铺转让的价格是多少。在58同城、赶集网上搜同地段同类型的转让信息，取3-5家的中间值。市场法最接近真实成交价，但要注意剔除虚高报价。", checklist: ["搜索同地段同类店铺转让价","收集3-5个参考价格","取中间值作为参考"] },
      { title: "综合定价", content: "三种方法算出来的价格取一个合理区间，然后根据实际情况调整：有稳定客源和好评的加价、设备新装修好的加价、有债务纠纷或待整改的减价。定价时留出谈判空间，挂牌价比心理底价高10%-20%。", checklist: ["综合三种方法得出估值区间","根据优劣势调整价格","挂牌价留10%-20%谈判空间"] }
    ]
  },
  {
    _id: "sol_134",
    title: "找买家最快渠道",
    summary: "想转让去哪里找人接盘，5个渠道帮你快速找到买家",
    difficulty: "简单",
    effectiveTime: "1-4周找到买家",
    costRange: "0-2000元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 7,
    sub: 705,
    steps: [
      { title: "优先找圈内人", content: "最快最靠谱的买家就在你身边：老员工想创业的、同行想扩店的、供应商有客户资源的。先在朋友圈和行业群里发转让信息，身边人最了解你店的价值，成交也最快。", checklist: ["在朋友圈发布转让信息","在行业群内发布信息","私下问老员工和同行是否有意向"] },
      { title: "上转让平台", content: "58同城和赶集网是店铺转让的主战场，发布时照片要拍好看、标题要吸引人（如『日均客流200+盈利店急转』）、描述写清楚优势和转让原因。每天刷新一次保持排名靠前。", checklist: ["在58同城和赶集网发布信息","拍好照片写好标题","每天刷新保持排名"] },
      { title: "贴门口转让告示", content: "别不好意思贴转让告示，路过的人就是最精准的潜在买家。告示要写清楚：经营品类、日均营业额、转让价格、联系方式。很多接盘的都是在这附近住或上班的人，路过看到就来了。", checklist: ["制作醒目的转让告示","写明关键经营数据","留下方便联系的微信和电话"] },
      { title: "找中介帮忙", content: "如果1个月内自己没找到合适买家，可以找店铺转让中介。费用一般是成交价的5%-10%，但中介手里有买家资源能加速成交。注意选靠谱的中介，签独家代理时要约定期限，别被套住。", checklist: ["找2-3家中介对比","确认中介费率和付款方式","签代理合同时约定期限"] }
    ]
  },
  {
    _id: "sol_135",
    title: "转让合同避坑清单",
    summary: "转让时怎么不被坑，合同里这7条必须写清楚",
    difficulty: "中等",
    effectiveTime: "3-5天完成签约",
    costRange: "0-1000元（律师审合同）",
    problemCodes: ["COST_HIGH"],
    chapter: 7,
    sub: 705,
    steps: [
      { title: "转让费包含什么", content: "合同第一条写清楚转让费包含哪些：设备清单、装修折价、库存商品、会员余额、品牌授权（如果是加盟店）。每项列明细，别笼统写『含所有设备』，到时候哪些算设备哪些不算就扯皮了。", checklist: ["列出设备清单和估价","列出库存商品清单","明确会员余额处理方式"] },
      { title: "房东同意和租约", content: "转让必须房东同意，否则无效。合同里写明：房东已书面同意转让、新租约的起止时间和租金标准、押金怎么转移、是否有转让费（很多房东要收转让费）。先跟房东谈好再跟买家签，顺序不能反。", checklist: ["取得房东书面同意转让","确认新租约条款","明确押金和转让费处理方式"] },
      { title: "债务和纠纷处理", content: "合同写明：转让前的债务由谁承担（必须是转让人）、是否有未处理的投诉或罚款、员工工资和补偿金是否结清。最怕接手后发现有暗债，前老板欠的钱被追到你头上。", checklist: ["约定转让前债务由转让人承担","确认无未处理投诉和罚款","确认员工工资已结清"] },
      { title: "过渡期安排", content: "约定7-15天的过渡期，老老板带新老板熟悉：客户交接、供应商交接、员工关系处理、日常操作培训。过渡期内老老板不拿收益也不担亏损，纯属帮忙。过渡期结束后才算正式交接完成。", checklist: ["约定过渡期天数和职责","安排客户和供应商交接","确认过渡期收益归属"] },
      { title: "违约责任", content: "写清楚违约条款：一方反悔不签了赔多少、交了定金不履约怎么处理、发现隐瞒重大问题怎么赔偿。有违约条款双方才不敢乱来。定金一般不低于转让费的10%，太少了约束力不够。", checklist: ["写明违约金金额或计算方式","约定定金金额（不低于10%）","约定隐瞒问题的赔偿方式"] }
    ]
  },
  {
    _id: "sol_136",
    title: "老板每日三件事法",
    summary: "每天只做最重要的3件事，告别忙乱回到正轨",
    difficulty: "简单",
    effectiveTime: "当天即可执行",
    costRange: "0元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 8,
    sub: 801,
    steps: [
      { title: "早起5分钟定三件事", content: "每天早上开店前花5分钟想：今天最重要的3件事是什么？判断标准：影响营业额的排第一、影响客户体验的排第二、影响团队稳定的排第三。其他事情能推就推、能交就交、能省就省。", checklist: ["准备一个每日三件事记录本","早上开店前写下当天三件事","按重要性排序1/2/3"] },
      { title: "先做最难的那件", content: "三件事里最难最不想做的那件，一定要上午完成。因为上午精力最好、干扰最少。拖到下午大概率找借口不做了。这就是吃青蛙理论：每天先吃掉最丑的那只青蛙，剩下的都不叫事。", checklist: ["找出三件事中最难的那件","上午10点前开始做它","不完成不吃午饭"] },
      { title: "砍掉无效忙碌", content: "检查你每天花时间最多的5件事，问自己：这件事非我不可吗？不做会怎样？能不能交给别人？能标准化吗？你会发现至少2件事是无效忙碌：无目的刷手机、反复检查同样的事、参加没必要的闲聊。砍掉它们，时间立刻多出来。", checklist: ["列出每天花时间最多的5件事","逐个问是否非我不可","砍掉2件无效忙碌"] },
      { title: "晚上复盘3分钟", content: "打烊后花3分钟回顾：今天的3件事做完了吗？没做完的原因是什么？明天需要调整什么？坚持一周你就会发现：真正重要的事其实很少，大部分忙碌都是自己给自己找的。", checklist: ["打烊后检查3件事完成情况","分析没完成的原因","为明天的三件事做准备"] }
    ]
  },
  {
    _id: "sol_137",
    title: "委托放权实操法",
    summary: "什么事该自己干什么该交给员工，放权不放乱",
    difficulty: "中等",
    effectiveTime: "1-2周建立放权习惯",
    costRange: "0元",
    problemCodes: ["MANAGEMENT_CHAOS","STAFF_LEAVE"],
    chapter: 8,
    sub: 801,
    steps: [
      { title: "列出所有工作项", content: "把你每天、每周、每月做的所有事情列出来，不管多小都列。然后给每件事打两个标签：重要程度（高/中/低）和可替代性（只有我能做/别人也能做）。『只有我能做+高重要』的才需要亲自干，其他的都可以考虑放权。", checklist: ["列出所有工作事项","标注每项的重要程度","标注每项的可替代性"] },
      { title: "先放低风险的", content: "从低重要+高可替代的事情开始放权：日常盘点、物料采购、排班考勤、客户回访。这些事交出去就算做差一点也不会伤筋动骨。关键是让员工练习着做，你在旁边兜底。", checklist: ["选出3-5件低风险事项","明确每件事的标准和流程","交给信任的员工并安排兜底方案"] },
      { title: "教标准不教做法", content: "放权不是甩手不管，是定好标准让别人去执行。告诉员工要什么结果、验收标准是什么、底线在哪里，但不要教他具体怎么做。给他空间用自己的方式达到标准，这样他才有责任感和主动性。", checklist: ["为每件放权事项定好验收标准","说明底线和红线","允许员工用自己的方式完成"] },
      { title: "建立检查机制", content: "放权后必须有检查：每日关键数据看一眼（营业额、客流量）、每周抽查1-2项工作质量、每月和员工复盘1次。检查不是为了挑毛病，而是及时发现问题。放权不等于放任，检查机制就是安全网。", checklist: ["设定每日必看的关键数据","每周抽查1-2项工作质量","每月和员工复盘改进"] }
    ]
  },
  {
    _id: "sol_138",
    title: "标杆探店学习法",
    summary: "怎么去别人店偷师，看5个关键点学精髓不学皮毛",
    difficulty: "简单",
    effectiveTime: "1次探店2小时",
    costRange: "0-200元（消费观察）",
    problemCodes: ["COMPETITION","REVENUE_DROP"],
    chapter: 8,
    sub: 802,
    steps: [
      { title: "选对标杆店", content: "标杆店选3个标准：比你生意好2倍以上（差距太大不具参考性就算了，选好1.5-3倍的）、品类或模式和你类似（学得了的）、3家以上（避免个例）。不要只看网红店，很多网红店靠烧钱撑着，学不来。", checklist: ["选定3家标杆店","确认品类和模式可参考","确认标杆店经营数据可靠"] },
      { title: "五点观察法", content: "进店后重点看5个方面：动线设计（客人从进门到消费怎么走的）、产品陈列（什么放C位什么藏角落）、服务触点（员工什么时候主动服务）、氛围营造（灯光音乐装修什么感觉）、价格策略（哪些引流哪些赚钱）。用手机拍照记录，事后整理。", checklist: ["观察并记录门店动线","拍下产品陈列方式","记录服务触点时机","感受氛围并记录细节","记录产品价格体系"] },
      { title: "当一回真实顾客", content: "以普通顾客身份进店消费，从头到尾体验完整流程。重点感受：第一印象是什么、哪里让你舒服或不舒服、会不会想来第二次。你的感受就是大众的感受，特别不舒服的地方一定有问题。", checklist: ["完整体验从进店到离店的全流程","记录每个环节的感受","标注让你惊喜或不适的细节"] },
      { title: "提炼可落地的改进", content: "探店回来后别急着全搬，先问自己：这个做法适合我的店吗？我的客群能接受吗？我能做到吗？每次只选1-2个最简单最有效的改进点落地。学100个不落地的，不如学1个马上用上的。", checklist: ["整理探店笔记","筛选适合自己店的做法","每次选1-2个改进点落地执行"] }
    ]
  },
  {
    _id: "sol_139",
    title: "周报复盘简易模板",
    summary: "一张表理清每周经营，5分钟写完不增加负担",
    difficulty: "简单",
    effectiveTime: "每周5分钟",
    costRange: "0元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 8,
    sub: 803,
    steps: [
      { title: "设计周报模板", content: "周报就5个模块，不用写长篇大论：1.本周数据（营业额、客流量、客单价，和上周比是涨是跌）；2.本周亮点（哪件事做得好）；3.本周问题（哪件事没做好）；4.下周计划（最重要的3件事）；5.需要帮助（需要什么资源或支持）。每个模块就写1-3句话。", checklist: ["制作5模块周报模板","设定每个模块的字数上限","准备Excel或纸笔记录"] },
      { title: "周五固定写", content: "固定每周五打烊后花5分钟写周报，雷打不动。不要拖到周末或下周，那时候记忆已经模糊了。写的时候翻翻这周的营业数据，不要凭感觉写。用数据说话，感觉会骗人数据不会。", checklist: ["设周五打烊后的周报提醒","翻看本周营业数据","5分钟写完不拖沓"] },
      { title: "抓重点不记流水账", content: "周报最忌讳写成流水账：周一做了什么、周二做了什么……没人看。只写3类信息：数据变化（涨了跌了多少）、关键事件（影响了经营的大事）、下周对策（准备怎么改）。越简短越容易坚持。", checklist: ["只记录数据变化和关键事件","每条不超过2句话","下周计划不超过3件事"] },
      { title: "月度对比找规律", content: "每月末把4份周报放在一起对比：营业额是持续涨还是持续跌？问题是不是同一个反复出现？亮点能不能复制放大？坚持3个月你就会发现经营规律，哪些动作有效哪些无效一清二楚。", checklist: ["月末对比4份周报","找出反复出现的问题","总结有效的动作并持续执行"] }
    ]
  },
  {
    _id: "sol_140",
    title: "月度经营分析会指南",
    summary: "每月一次看数据调方向，1小时搞定不拖沓",
    difficulty: "中等",
    effectiveTime: "每月1小时",
    costRange: "0元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 8,
    sub: 803,
    steps: [
      { title: "准备3张数据表", content: "开会前准备3张表：月度损益表（收入-成本=利润，看赚没赚）、月度客流表（新客多少老客多少，看增长还是萎缩）、月度问题清单（这月出了什么问题，哪天发生的）。数据不全的店至少要算出营业额、成本和利润3个数。", checklist: ["整理月度营业额和成本","统计新客和老客数量","记录本月发生的问题"] },
      { title: "按顺序分析", content: "会议按3个环节进行，每人发言不超过5分钟：第一环节报数据（这月赚了多少花了多少）、第二环节找原因（涨了是为什么跌了是为什么）、第三环节定行动（下月要改什么、谁负责、什么时候完成）。不发散不跑题，1小时足够。", checklist: ["设定3个环节的时间分配","每人发言限时5分钟","会议总时长控制在1小时内"] },
      { title: "重点看3个异常", content: "数据中重点找3类异常：环比大幅波动（比上个月涨跌超20%的项目）、持续恶化趋势（连续3个月下滑的指标）、异常单项支出（比预算多花很多的费用）。异常就是信号，说明有问题需要处理。", checklist: ["标注环比涨跌超20%的项目","圈出连续3个月下滑的指标","列出超预算的异常支出"] },
      { title: "形成行动清单", content: "会后必须形成行动清单：谁在什么时间完成什么事。清单贴在办公室墙上，下周检查进度。不开行动会的分析会就是聊天，没有行动的分析就是浪费时间的自嗨。", checklist: ["列出3-5项具体行动","每项指定负责人和完成时间","下周检查进度"] }
    ]
  },
  {
    _id: "sol_141",
    title: "夫妻店分工协议",
    summary: "夫妻开店怎么分工会处得更好，先说清后不吵架",
    difficulty: "简单",
    effectiveTime: "1次沟通1小时",
    costRange: "0元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 8,
    sub: 804,
    steps: [
      { title: "按性格分工", content: "夫妻分工别按谁更强来分，按性格来分：外向会说话的管前台和客户、细心有耐心的管账和采购、有主见能扛压的管经营决策。别硬让社恐管销售、让马大哈管账，越管越乱越吵越多。", checklist: ["分析双方的性格优势","按性格分配核心职责","确保每人管的是自己擅长的"] },
      { title: "明确决策权归属", content: "每件事谁说了算必须明确：采购多少钱以下自己定超过多少一起商量、员工管理谁说了算、客户投诉怎么处理。最怕两人都想说了算又都不服对方，天天吵架。原则是：谁负责谁拍板，另一个不干涉。", checklist: ["列出需要明确决策权的事项","约定每件事的拍板人","设定需要共同商量的金额门槛"] },
      { title: "划分工作和生活", content: "夫妻店最怕工作和生活搅在一起。约定3条铁律：下班后不聊工作（除非紧急）、不在店里吵私事（有情绪回家说）、每周至少1天完全属于家庭（不谈生意）。做不到这3条，店可能开了家却散了。", checklist: ["约定下班后不聊工作的时间","约定不在店里吵私事","每周固定1天家庭日"] },
      { title: "定期沟通调分工", content: "分工不是一次定终身，每月坐下来聊一次：最近哪里不顺手、哪里老吵架、怎么调更好。分工像调乐器，需要不断微调才能和谐。别等问题积累了再爆发，定期微调最健康。", checklist: ["每月安排1次分工沟通","记录需要调整的地方","及时调整分工方案"] }
    ]
  },
  {
    _id: "sol_142",
    title: "合伙经营协议模板",
    summary: "跟朋友合伙开店怎么不伤感情，先小人后君子",
    difficulty: "中等",
    effectiveTime: "1-2周拟定签署",
    costRange: "0-1000元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 8,
    sub: 804,
    steps: [
      { title: "先谈钱再谈感情", content: "合伙第一步把所有钱的事说清楚：每人出多少、股权怎么分、赚了怎么分、亏了怎么担、追加投入怎么算。谈钱不伤感情，不谈钱才伤感情。90%的合伙纠纷都是因为钱没提前说清楚。", checklist: ["写明每人出资金额和股权比例","约定利润分配方式","约定亏损承担方式","约定追加投入的规则"] },
      { title: "约定退出机制", content: "合伙必须约定退出条款：想退出时怎么估值、对方有没有优先购买权、退出款分期还是一次付清、什么情况可以强制要求对方退出（比如长期不参与经营）。退出条款是合伙关系的保险，没有它就等于裸奔。", checklist: ["约定退出条件","约定退出时的估值方法","约定退出款项支付方式","约定强制退出条件"] },
      { title: "日常经营约定", content: "约定日常经营规则：谁负责日常管理、重大支出多大金额需要双方同意、员工招聘解雇谁说了算、每月是否需要开经营分析会。规则越细越好，别留模糊地带，模糊就是以后吵架的种子。", checklist: ["约定日常管理者","约定重大支出审批金额线","约定人事决策权归属","约定月度经营沟通机制"] },
      { title: "签书面协议", content: "所有约定必须写成书面协议，双方签字。口头约定不算数，时间久了谁也记不清当时怎么说的。协议一式两份各存一份，最好找第三方见证。宁可签的时候尴尬，也别翻脸的时候没依据。", checklist: ["把所有约定写成书面条款","双方签字并注明日期","各保留一份原件"] }
    ]
  },
  {
    _id: "sol_143",
    title: "二代传承过渡法",
    summary: "老板想退休怎么把店交给孩子，平稳过渡不翻车",
    difficulty: "困难",
    effectiveTime: "6-12个月完成过渡",
    costRange: "0元",
    problemCodes: ["MANAGEMENT_CHAOS"],
    chapter: 8,
    sub: 804,
    steps: [
      { title: "先让孩子愿意接", content: "孩子不想接店是传承失败的头号原因。别硬塞，先让孩子来店里体验1-2个月，了解经营全貌。让他看到开店的真实收入和自由度，而不只是辛苦。如果真不想接，趁早找其他出路（卖给员工或转让），别拖到干不动了才着急。", checklist: ["安排孩子来店体验1-2个月","让他了解真实经营数据","尊重孩子的选择意愿"] },
      { title: "分阶段交接权力", content: "传承不能一刀切，分3个阶段：第1-3个月孩子跟着学（看你怎么做）、第4-6个月孩子尝试管（你看着他管）、第7-12个月孩子独立管（你退居幕后只看数据）。每个阶段有明确的标准，达标了才进入下一阶段。", checklist: ["制定3阶段过渡计划","设定每阶段的达标标准","每月评估过渡进展"] },
      { title: "传承核心关系", content: "开店最值钱的不是设备和装修，是关系：供应商的关系和账期、老客户的信任、员工的支持。带孩子逐一拜访关键供应商、给老客户正式介绍接班人、和核心员工当面确认待遇不变。关系接不上，生意就断了。", checklist: ["带孩子拜访核心供应商","向老客户介绍接班人","和核心员工确认过渡期安排"] },
      { title: "留好退路", content: "传承完成后给自己留3条退路：保留财务知情权（每月看一次数据）、留一笔应急资金（万一孩子撑不住可以救急）、保留核心供应商和客户的联系方式。放手不等于消失，关键时刻还能帮忙。", checklist: ["约定每月数据同步机制","准备应急备用资金","保留关键人脉联系方式"] }
    ]
  },
  {
    _id: "sol_144",
    title: "口碑积累慢工法",
    summary: "怎么用时间换口碑，3年积累出别人抄不走的护城河",
    difficulty: "中等",
    effectiveTime: "1-3年持续见效",
    costRange: "0元",
    problemCodes: ["TRAFFIC_LOW","REVENUE_DROP"],
    chapter: 8,
    sub: 805,
    steps: [
      { title: "定好口碑标准", content: "口碑不是泛泛说好，要有具体标准：产品口碑（顾客说『你家XX是我吃过最好的』）、服务口碑（顾客说『每次来都特别舒服』）、人情口碑（顾客说『老板人特别好』）。选1-2个你最想被记住的点，所有动作都围绕这个点做。", checklist: ["确定1-2个口碑标签","把口碑标签转化为具体行为标准","让每个员工知道我们的口碑标签"] },
      { title: "每次超预期一点点", content: "口碑的本质是超预期：客人期望值是8分你给9分他就惊喜。不需要大动作，小小超预期最有效：多送一个小菜、记住常客的口味、雨天递把伞、节日发个祝福。每次只超预期一点点，但每次都做，日积月累就是口碑。", checklist: ["列出10个低成本超预期动作","每周至少做3次超预期服务","鼓励员工也做超预期的事"] },
      { title: "让好评看得见", content: "口碑不只是存在于顾客心里，要让别人看得到：大众点评引导好评（满意度高的顾客主动请他评）、朋友圈转发真实好评截图、店里挂客户感谢信或合影。看不见的好评等于没有好评。", checklist: ["引导满意客户写线上好评","定期在朋友圈分享好评","在店内展示客户好评和合影"] },
      { title: "坚持做时间的朋友", content: "口碑是唯一不能速成也不能抄走的竞争优势。别人可以模仿你的产品、复制你的装修、挖走你的员工，但模仿不了3年积累的信任。坚持做好每天的小事，把口碑当作最重要的长期投资，时间会给你最好的回报。", checklist: ["每天坚持超预期服务","每月检查口碑指标变化","相信时间的力量不急功近利"] }
    ]
  },
  {
    _id: "sol_145",
    title: "限时挑战引流法",
    summary: "用限时挑战游戏吸引顾客围观参与，制造火爆氛围",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0-100元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 9,
    sub: 901,
    steps: [
      { title: "设计挑战规则", content: "选一个和你产品相关的挑战，规则越简单越好。比如：15秒吃完一碗面、30秒喝完一杯果汁、1分钟剥完10个橘子。时间要短，挑战要难但有人能成功，围观的人才有期待感。准备好计时器或秒表，增加仪式感。", checklist: ["选一个和产品相关的挑战项目","设定合理的挑战时间","准备计时器增加仪式感"] },
      { title: "设好奖惩吸引参与", content: "挑战成功送大奖（免费产品或大额折扣），挑战失败买一个产品。奖品要够吸引人，失败的成本不能太高，比如挑战失败买一杯奶茶或一份小吃。让顾客觉得试一试不亏，成功了赚翻。", checklist: ["设定成功奖品要足够吸引人","失败代价控制在低客单价范围","确保顾客觉得试一试不亏"] },
      { title: "制造围观氛围", content: "挑战时大声吆喝倒计时，吸引路人围观。可以安排店员或朋友先做示范，打破冷场。围观人越多参与欲越强，有人挑战成功立刻欢呼庆祝，让场面越热闹越好。拍视频发抖音，线上二次传播。", checklist: ["大声吆喝倒计时吸引围观","安排人示范打破冷场","拍视频发抖音二次传播"] },
      { title: "持续迭代新玩法", content: "同一个挑战玩一周就腻了，每周换一个新挑战。根据季节和产品调整：夏天吃西瓜挑战、冬天喝热饮挑战。定期更新挑战榜和纪录，激发顾客挑战欲。把挑战做成你的店招牌，让顾客专程来挑战。", checklist: ["每周更新挑战项目","根据季节调整挑战内容","维护挑战纪录激发参与"] }
    ]
  },
  {
    _id: "sol_146",
    title: "互动游戏拓客法",
    summary: "设计互动游戏让顾客自愿消费，玩着玩着就买了",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0-50元",
    problemCodes: ["TRAFFIC_LOW","REVENUE_DROP"],
    chapter: 9,
    sub: 901,
    steps: [
      { title: "选对游戏类型", content: "根据你的产品选游戏：卖吃的选择夹取游戏（筷子夹食物）、卖喝的选择喝的挑战、卖水果的选择称重猜猜乐。游戏要和产品强关联，顾客玩着玩着就在看你的产品，比纯吆喝有效10倍。道具越简单越好，筷子、飞镖、纸牌都可以。", checklist: ["选择和产品强关联的游戏","游戏道具简单易准备","让顾客玩的过程自然接触产品"] },
      { title: "设计消费触发点", content: "游戏的关键是让顾客自然产生消费。比如夹生蚝挑战：15秒夹完免费送，夹10个半价买。顾客为了赢会拼命夹，无论输赢都在和你的产品亲密接触，消费是自然而然的事。不要硬推销，让游戏结果决定消费。", checklist: ["游戏结果和消费自然挂钩","失败也有优惠降低抗拒","让顾客和产品亲密接触"] },
      { title: "降低参与门槛", content: "游戏规则一句话能说清，不需要学习成本。参与方式要简单：路过就能玩，不用先消费才能玩。越多人参与，围观的人越多，转化率就越高。可以设不同难度等级，让老顾客也能再来挑战。", checklist: ["规则一句话说清","零门槛参与不用先消费","设不同难度等级"] },
      { title: "放大传播效果", content: "每个参与游戏的人都拍短视频，让顾客自己发朋友圈或抖音，送小礼品做交换。精彩瞬间（成功欢呼、失败搞笑）是天然爆款素材。老板也可以做一些夸张举动增加话题性，比如顾客挑战成功老板倒立洗头。", checklist: ["拍短视频记录精彩瞬间","鼓励顾客发社交媒体","老板增加话题性举动"] }
    ]
  },
  {
    _id: "sol_147",
    title: "体能挑战吸睛术",
    summary: "吃货挑战、力量挑战等吸引围观，人气就是财气",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0-200元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 9,
    sub: 901,
    steps: [
      { title: "挑选挑战类型", content: "吃货挑战：限时吃完大份食物（30秒吃光一盘月饼、1分钟吃完一碗面）；力量挑战：砸凳子验证质量、掰手腕赢了打折；耐力挑战：能站多久送多少。选和产品相关的挑战，让挑战本身就是产品体验。", checklist: ["选择和产品相关的挑战类型","挑战难度适中有人能成功","准备大份量或特殊道具"] },
      { title: "设围观触发机制", content: "挑战开始前大喊3-2-1，路人会自动停下来看。围观时加入解说，像体育比赛一样播报战况：「还剩10秒！他能吃完吗？」人在围观时容易冲动，旁观者变参与者的概率很高。", checklist: ["挑战前大声倒计时","像解说员一样播报战况","引导围观者参与挑战"] },
      { title: "奖励要够辣", content: "挑战成功的奖励要够吸引人，免费产品、免单、大额折扣都可以。比如30秒吃光送188元月饼礼盒，吃不光买一盒98元。奖励的视觉冲击力要强，把奖品摆出来让所有人看到。失败要买单但价格合理，不是惩罚是促销。", checklist: ["成功奖励要足够吸引人","奖品摆在显眼位置","失败买单价格合理"] },
      { title: "持续运营造IP", content: "把挑战做成店的招牌IP，每周固定时间举办，积累粉丝。设置挑战榜单和纪录，激发顾客打破纪录的欲望。定期升级挑战难度和奖品，保持新鲜感。你的店=挑战店，顾客专程来玩。", checklist: ["固定时间举办形成习惯","设置挑战榜单和纪录","定期升级难度和奖品"] }
    ]
  },
  {
    _id: "sol_148",
    title: "摸球抽奖锁客法",
    summary: "摸球/抽签等随机玩法吸引参与，用概率锁住顾客",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "50-200元",
    problemCodes: ["TRAFFIC_LOW","REPEAT_LOW"],
    chapter: 9,
    sub: 902,
    steps: [
      { title: "准备抽奖道具", content: "最简单的是摸球：准备一个透明箱子，里面放不同颜色的球，每种颜色对应不同奖品。也可以用抽签桶、转盘。关键是让顾客看到抽奖过程，透明箱子最有效，因为能看到球在里面滚动，期待感拉满。", checklist: ["准备透明箱子或抽签桶","不同颜色球对应不同奖品","确保抽奖过程可视化"] },
      { title: "设计奖池结构", content: "奖池设计的核心是：大部分奖品是优惠和小礼品，少数是大奖，有一个「会员奖」是必须成为会员才能领。比如12个球：5个送小吃、3个送折扣券、2个送饮品、1个送大礼包、1个是会员专属奖。这样80%以上的顾客能中奖，但会员奖要入会才能拿。", checklist: ["80%以上中奖率保证体验","设会员专属奖锁客","奖品成本可控"] },
      { title: "设置参与条件", content: "消费满一定金额可抽奖，或者扫码加好友免费抽一次。关键是让每个顾客都参与进来，抽奖的门槛越低参与率越高。第一次免费抽是为了获客，后续消费抽奖是为了复购。", checklist: ["设低门槛参与条件","首次免费抽吸引参与","消费抽奖促复购"] },
      { title: "用概率锁住复购", content: "告诉顾客今天没摸到大奖没关系，下次来还有机会。可以在球上贴日期标签，每月更新奖池。顾客为了摸到大奖会反复来，概率游戏天然让人上瘾。公布中奖记录，让顾客看到真的有人中大奖。", checklist: ["每月更新奖池保持新鲜","公布中奖记录增加信任","强调下次还有机会"] }
    ]
  },
  {
    _id: "sol_149",
    title: "盲盒惊喜复购法",
    summary: "底部标签/隐藏奖励促使回头，拆盲盒的快乐让人上瘾",
    difficulty: "简单",
    effectiveTime: "1-3天见效",
    costRange: "50-300元",
    problemCodes: ["REPEAT_LOW"],
    chapter: 9,
    sub: 902,
    steps: [
      { title: "设计隐藏奖励", content: "在产品包装里藏惊喜：杯底贴标签设奖、袋子里塞刮刮卡、盒子里放幸运纸条。奖励分等级：谢谢惠顾、小奖品、中奖、大奖。关键是顾客只有打开产品才能知道中没中，拆盲盒的期待感天然让人上瘾。", checklist: ["选择合适的隐藏位置","设计多等级奖励","确保只有打开才能看到"] },
      { title: "搭配会员机制", content: "隐藏奖励和会员绑定：中奖后需要是会员才能兑奖，或者会员的中奖率更高（会员的杯底标签中奖概率翻倍）。这样发现标签的人为了领奖必须办会员卡，一杯奶茶就能锁定一个长期客户。", checklist: ["隐藏奖励和会员绑定","会员中奖率设更高","非会员中奖引导入会"] },
      { title: "制造社交传播", content: "鼓励顾客晒中奖结果，在杯底或包装上印「拍照发朋友圈额外送一份」。中奖的会晒，没中奖的也会好奇翻看。把精彩中奖视频发抖音，让更多人知道真的能中奖，吸引新客来试手气。", checklist: ["鼓励顾客晒中奖结果","拍照发圈额外奖励","发抖音扩大传播"] },
      { title: "定期更换惊喜", content: "每月更新一轮盲盒奖励，避免老顾客拆到重复失去兴趣。可以设主题月：春节红包月、情人节甜蜜月、夏日冰爽月。更新时发通知给老顾客，提醒他们来拆新盲盒，复购自然就来了。", checklist: ["每月更新盲盒奖励","设主题月增加趣味","更新时通知老顾客"] }
    ]
  },
  {
    _id: "sol_150",
    title: "数字游戏营销法",
    summary: "报数字/抽牌等简单游戏促单，玩着就把单下了",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0-50元",
    problemCodes: ["REVENUE_DROP","TRAFFIC_LOW"],
    chapter: 9,
    sub: 902,
    steps: [
      { title: "设计数字玩法", content: "最简单的三种玩法：报数字——顾客说1-100之间一个数，说中就打折；抽牌——扑克牌抽到红心打8折、抽到大王免单；掷骰子——点数对应折扣。道具越简单越好，一副扑克牌或一副骰子就能玩。关键是让顾客自己选，参与感越强成交率越高。", checklist: ["选择简单的数字游戏","准备扑克牌或骰子","让顾客自己参与选择"] },
      { title: "把游戏嵌入消费流程", content: "顾客点单时就说：「玩个小游戏吗？抽张牌可能免单哦。」不需要额外场地和时间，在收银台就能玩。游戏结果直接对应折扣，抽到什么就按什么价结账。让消费变成游戏，抗拒感大大降低。", checklist: ["点单时自然引入游戏","游戏结果直接对应折扣","在收银台就能完成"] },
      { title: "叠加盲盒惊喜", content: "数字游戏+盲盒双重刺激：先报数字打折，再打开产品发现底部还有隐藏奖励。双重惊喜让顾客觉得今天运气太好了，下次一定还来。两个机制可以分开用也可以叠加，叠加效果翻倍。", checklist: ["数字游戏搭配隐藏奖励","双重惊喜增加体验感","两个机制可叠加使用"] },
      { title: "营造运气氛围", content: "把中奖记录贴出来，让每个顾客看到别人中了什么。中大奖的顾客大声祝贺，全场鼓掌。运气是最强的社交货币，顾客会和朋友说「我在XX店抽到免单了」，免费帮你传播。", checklist: ["张贴中奖记录","中大奖全场祝贺","引导顾客社交传播"] }
    ]
  },
  {
    _id: "sol_151",
    title: "充值锁客三步法",
    summary: "充值送礼锁定长期消费，一次充值吃全年",
    difficulty: "中等",
    effectiveTime: "3-7天见效",
    costRange: "100-500元",
    problemCodes: ["REPEAT_LOW","REVENUE_DROP"],
    chapter: 9,
    sub: 903,
    steps: [
      { title: "设计引流产品", content: "拿一款爆款产品做极致低价引流。比如原价6元的奶茶只卖1元，1元是噱头不是目的，目的是让顾客为1元奶茶进店后，发现还有更好的选择。引流产品要选你店里最有辨识度的，让顾客冲着1元来，被其他产品留住。", checklist: ["选一款爆款做极致低价","价格低到让顾客无法拒绝","引流产品要有辨识度"] },
      { title: "设会员门槛和权益", content: "1元奶茶只有SVIP才能享受，SVIP门槛设300元左右（根据你的客单价调整）。会员权益要超值：除了1元奶茶特权，再送实物赠品（榨汁机、保温杯等价值感高的）+消费红包（每次消费送小额红包，累计可抵扣）。算好账：300元会员费-赠品成本-红包成本=锁定一个长期客户。", checklist: ["设合理的会员门槛","送实物赠品增加价值感","消费红包促进持续消费","算好成本确保不亏"] },
      { title: "叠加消费激励", content: "会员每次消费有额外激励：充值送额外金额（充300送50）、消费积分换产品、生日月双倍积分。让会员觉得充值后越消费越划算，不消费就亏了。心理账户从「花钱」变成「用之前存的钱」，消费阻力大幅降低。", checklist: ["充值送额外金额","积分兑换增加粘性","生日月双倍积分","让会员觉得不消费就亏了"] },
      { title: "维护会员关系", content: "充了值不代表结束，要把会员当VIP对待：新到好货第一时间通知会员、会员专属新品试吃、每月会员日特惠。用微信群维护会员，发新品通知和专属优惠。会员的活跃度决定了你的复购率。", checklist: ["新到好货通知会员","会员专属试吃体验","每月设会员日特惠","微信群维护会员活跃度"] }
    ]
  },
  {
    _id: "sol_152",
    title: "打卡返利绑定法",
    summary: "每日打卡累积返利深度绑定，让顾客天天来",
    difficulty: "中等",
    effectiveTime: "1周见效",
    costRange: "50-200元",
    problemCodes: ["REPEAT_LOW"],
    chapter: 9,
    sub: 903,
    steps: [
      { title: "设计打卡机制", content: "顾客每天到店签到打卡，累积天数解锁奖励。连续打卡7天送小礼品、15天送折扣券、30天送大礼包、365天送电动车（大奖成本可以用打卡率算，真正打满365天的人很少，但所有人都想试）。关键是要可视化，墙上贴打卡日历，顾客每来一次盖章或贴星。", checklist: ["设多级打卡奖励","最大奖要足够震撼","打卡进度可视化展示"] },
      { title: "绑定消费行为", content: "打卡不能白打，必须消费才能打卡（哪怕买一杯最便宜的产品）。这样打卡=到店消费，每一次打卡都是一笔营收。最低消费门槛设低一点，1杯奶茶或1份小吃即可，重点是让顾客形成每天来的习惯。", checklist: ["打卡必须消费","最低消费门槛设低","培养每天到店习惯"] },
      { title: "设计返利梯度", content: "打卡天数越多返利越高：第1-7天每次返1元、第8-15天每次返2元、第16-30天每次返3元。越往后返利越高，断签就从头来，顾客不舍得断。返利存在会员账户里，下次消费自动抵扣，锁住长期消费。", checklist: ["返利随天数递增","断签重新计算增加粘性","返利存账户锁定消费"] },
      { title: "制造打卡氛围", content: "在店里设打卡墙，贴上坚持打卡的顾客照片和天数。定期发朋友圈表扬坚持打卡的顾客。打卡满月的顾客举办小庆祝仪式，让其他人看到坚持的回报。打卡变成社交行为，顾客互相监督互相鼓励。", checklist: ["设打卡墙展示坚持者","发圈表扬打卡达人","满月庆祝仪式","打卡变社交行为"] }
    ]
  },
  {
    _id: "sol_153",
    title: "分时段免费引流术",
    summary: "不同时段免费送不同单品引流，免费是最强广告",
    difficulty: "中等",
    effectiveTime: "1天见效",
    costRange: "100-500元/月",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 9,
    sub: 903,
    steps: [
      { title: "选免费单品", content: "选成本最低、最有传播力的单品做免费。早餐店选3元小米粥、奶茶店选小杯柠檬水、水果店选小份试吃。免费单品是引流入口，顾客来了不会只吃免费的。单品成本控制在2-5元，每天限送50-100份，成本可控。", checklist: ["选低成本高传播力单品","每日限量控制成本","单品成本2-5元为宜"] },
      { title: "分时段错峰引流", content: "不同时段送不同免费品：早晨送小米粥、中午送小菜、晚上送甜品。目的是把客流从高峰期分散到全时段，同时每个时段都有人在排队，路过的人看到的就是「这家店什么时候都忙」。不同免费品吸引不同人群，扩大客源。", checklist: ["不同时段送不同免费品","把客流分散到全时段","不同免费品吸引不同人群"] },
      { title: "设计转化路径", content: "免费不是目的，转化才是关键。领免费的顾客：第一步加微信留联系方式；第二步推荐19.9元会员卡享受更多免费权益；第三步会员专属产品推荐促成消费。免费品是鱼饵，会员卡是鱼钩，后续消费才是鱼。", checklist: ["免费品引导加微信","推荐会员卡转化","会员专属产品促消费"] },
      { title: "裂变放大流量", content: "免费品+裂变：领免费的顾客发短视频或朋友圈，可以多领一份。一个人免费带来3个新曝光，成本只有2-5元。安排不同时段的免费品在不同的社交媒体预热，让线上流量变成线下客流。", checklist: ["发圈多领一份激励传播","一人免费带来三个新曝光","社交媒体预热引流到店"] }
    ]
  },
  {
    _id: "sol_154",
    title: "四人同行免单法",
    summary: "一人免单带三人实现裂变，免单是最好的邀请函",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0-100元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 9,
    sub: 904,
    steps: [
      { title: "设计免单规则", content: "核心规则：4人同行1人免单。免单的不是最贵的那位，而是随机抽签决定，增加趣味性。4人消费假设人均30元，免1人相当于75折，但比直接打75折更有话题性和传播力。门槛设为4人而非3人，因为4人更容易凑齐且免单比例更合理。", checklist: ["4人同行1人免单","随机抽签增加趣味","比打折更有传播力"] },
      { title: "叠加额外福利", content: "除了免单，再加1元购福利：1元买11瓶果汁（或同等价值产品）。1元购是第二层诱惑，让本来犹豫的人也愿意来。11瓶果汁不需要一次喝完，分11次来店里取，锁定11次到店。11次到店会产生多少消费？远超果汁成本。", checklist: ["叠加1元购福利","分次取锁定多次到店","多次到店带动其他消费"] },
      { title: "设置消费门槛", content: "免单和1元购都有最低消费门槛：4人每人至少消费满一定金额才能参与。设满520元退款活动：4人消费满520元退全款给发起人。520元对4人来说人均130元不难达到，退款的钱从4人的利润里出，实际退款概率不高但噱头十足。", checklist: ["设最低消费门槛","满额退款活动做噱头","门槛设定合理可达成"] },
      { title: "放大裂变效果", content: "享受免单的4人都会拍照发朋友圈，天然广告。鼓励他们拍合照+产品图发社交媒体，额外送小礼品。把每周四定为「同行免单日」，固定时间形成传播习惯。活动期间老板可以出镜拍短视频，增加话题度。", checklist: ["免单顾客自动发圈传播","固定时间形成习惯","拍短视频增加话题"] }
    ]
  },
  {
    _id: "sol_155",
    title: "副卡裂变拓客法",
    summary: "主卡+副卡模式让顾客帮你拉新，一人带两人裂变",
    difficulty: "中等",
    effectiveTime: "3-7天见效",
    costRange: "100-300元",
    problemCodes: ["TRAFFIC_LOW","REPEAT_LOW"],
    chapter: 9,
    sub: 904,
    steps: [
      { title: "设计主副卡机制", content: "顾客办会员卡时，除了自己的主卡，再给2张副卡。副卡可以送给朋友，朋友用副卡消费享8折。副卡消费产生的积分，主卡和副卡各得一半。主卡持有人为了积分会主动送副卡给朋友，朋友为了8折也愿意用，一拖二裂变自然形成。", checklist: ["主卡配2张副卡","副卡消费享8折","积分主副卡各一半","激励主卡主动送副卡"] },
      { title: "设置激活奖励", content: "副卡被朋友激活（首次消费）时，主卡获得奖励：送1杯饮品或20元储值。这样主卡有动力催朋友用副卡。副卡首次消费也送欢迎礼：免费小食或折扣券。两边都有激励，裂变才能跑起来。", checklist: ["副卡激活主卡获奖","副卡首次消费送欢迎礼","双边激励推动裂变"] },
      { title: "设计进阶权益", content: "副卡消费累计到一定金额后自动升级为独立会员卡，不再依赖主卡。升级时获得专属礼包。这样新客户从「朋友推荐来」变成「自己的会员」，完成了从获客到留客的闭环。主卡完成使命，副卡变新主卡。", checklist: ["副卡消费达标自动升级","升级获得专属礼包","完成从获客到留客闭环"] },
      { title: "追踪裂变效果", content: "记录每张主卡的副卡激活率和消费额，找出最会拉新的主卡客户。给裂变王额外奖励（每月评选拉新冠军），激励更多人主动推荐。用微信群维护主卡客户，定期通报副卡使用情况，提醒他们送副卡给还没用的朋友。", checklist: ["追踪副卡激活率","评选裂变王额外奖励","微信群维护主卡客户"] }
    ]
  },
  {
    _id: "sol_156",
    title: "社交传播奖励法",
    summary: "转发曝光换现金/折扣，让每个顾客变成你的广告位",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0-100元",
    problemCodes: ["TRAFFIC_LOW"],
    chapter: 9,
    sub: 904,
    steps: [
      { title: "设计传播任务", content: "给顾客3种传播任务选：发朋友圈带门店定位、拍抖音视频带话题标签、在大众点评写好评。每种任务对应不同奖励：发朋友圈送5元代金券、拍抖音送10元代金券、写好评送免费小食。任务越难奖励越高，让顾客自己选愿意做的。", checklist: ["设3种传播任务","任务难度对应奖励","让顾客自主选择"] },
      { title: "降低参与门槛", content: "不要要求顾客写长文或拍专业视频，越简单越好。发朋友圈只需要拍一张产品图+门店定位，9宫格图片素材你准备好，顾客直接转发就行。拍抖音用你提供的模板和音乐，10秒就拍完。门槛越低参与率越高。", checklist: ["任务要求尽量简单","提供现成素材模板","10秒内能完成的任务"] },
      { title: "即时兑现奖励", content: "顾客完成任务后立刻给奖励，不要说「下次来用」。当场发代金券、当场送小食、当场减折扣。即时反馈让人上瘾，下次他还愿意帮你传播。延迟奖励会让人觉得你在套路他。", checklist: ["完成立刻给奖励","不设下次使用的门槛","即时反馈增强参与感"] },
      { title: "叠加裂变机制", content: "传播任务+裂变机制：顾客发朋友圈后，朋友看到来店里消费，提他的名字，两人各得奖励。这样传播不只是曝光，还能追踪到具体的引流效果。每月公布「传播达人榜」，奖励引流最多的顾客，让传播变成竞赛。", checklist: ["朋友来消费双方各得奖励","追踪具体引流效果","公布传播达人榜"] }
    ]
  },
  {
    _id: "sol_157",
    title: "锚定对比定价法",
    summary: "用高价款衬托常规款促成交，问买哪种不问要不要",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 9,
    sub: 905,
    steps: [
      { title: "设计价格锚点", content: "准备3个价位的产品：低价款（3元）、中价位（4元）、高价款（10元）。低价款是引流款，中价位是主推款，高价款是锚点款。锚点款的作用不是卖出去，而是让中价位看起来很划算。顾客看到10元的，4元就显得很合理。", checklist: ["设3个价位梯度","高价款做锚点","主推中价位款"] },
      { title: "改变提问方式", content: "不要问「你要不要买」，要问「你要哪种」。前者顾客可以选不要，后者顾客已经在选了。比如卖菠萝：3元小号、4元中号、10元大号金枕。问「买哪种」的时候，大部分人选4元，因为比3元多1元但品质好很多，比10元便宜太多。", checklist: ["问买哪种不问要不要","引导顾客做选择而非拒绝","中价位自然成为首选"] },
      { title: "突出对比差异", content: "把三个价位的产品摆在一起，差异一目了然。大小对比、品质对比、数量对比，让顾客用眼睛看到差距。把高价款放在最显眼位置做参照物，主推款放在中间位置。顾客的决策不是绝对价格而是相对价格，有对比才有购买欲。", checklist: ["三款产品并排展示","高价款放显眼位置","差异一目了然"] },
      { title: "灵活调整锚点", content: "根据不同顾客群体调整锚点。对价格敏感的顾客，锚点设低一点（5元对比3元）；对品质敏感的顾客，锚点设高一点（15元对比6元）。观察顾客的反应，如果他一直在看高价款，说明品质需求高，推荐中高价位的；如果直奔低价款，就推荐中低价位的。", checklist: ["根据顾客类型调锚点","观察顾客关注哪款","灵活推荐对应价位"] }
    ]
  },
  {
    _id: "sol_158",
    title: "亏本引流赚钱法",
    summary: "用一款亏本产品引流其他赚钱，亏一样赚三样",
    difficulty: "中等",
    effectiveTime: "1-3天见效",
    costRange: "0元",
    problemCodes: ["TRAFFIC_LOW","REVENUE_DROP"],
    chapter: 9,
    sub: 905,
    steps: [
      { title: "选亏本引流产品", content: "选一款高频刚需产品做亏本价。奶茶店1元奶茶、水果店0.1元橘子、早餐店3元小米粥。亏本产品必须满足3个条件：人人需要（刚需）、价格低到让人惊讶（极致性价比）、和你其他产品有关联（买了这个还想买那个）。亏的钱是广告费，比发传单有效。", checklist: ["选高频刚需产品","价格低到让人惊讶","和其他产品有关联性"] },
      { title: "设计盈利产品线", content: "亏本产品吸引来的顾客不会只买亏本款，关键是你有没有盈利款等着他。奶茶店1元奶茶配18元蛋糕、水果店0.1元橘子配28元车厘子、早餐店3元粥配12元套餐。盈利款的毛利要够高，覆盖亏本款的损失还有利润。", checklist: ["准备高毛利盈利款","亏本款和盈利款自然搭配","盈利款毛利覆盖亏损"] },
      { title: "设消费引导路径", content: "顾客来买亏本款时，自然推荐盈利款：点1元奶茶时问「加个蛋糕只要18元哦」；买0.1元橘子时推荐「今天的车厘子特别甜」。不要硬推，用场景化推荐：「配着吃更好」「这个更划算」。店员话术统一培训，每次交易都要提一次盈利款。", checklist: ["购买亏本款时推荐盈利款","场景化推荐不硬推","统一培训店员话术"] },
      { title: "算好盈亏平衡点", content: "算出每卖一个亏本款需要搭配多少盈利款才能保本。比如1元奶茶亏3元，18元蛋糕赚10元，每卖1杯亏本奶茶需要搭配0.3个蛋糕就回本。实际转化率通常在30%-50%，远超盈亏平衡点。每周统计亏本款和盈利款的销售比例，确保整体盈利。", checklist: ["计算盈亏平衡点","统计实际转化率","每周核对整体盈利"] }
    ]
  },
  {
    _id: "sol_159",
    title: "袋子计价打包法",
    summary: "不按斤按袋子卖，提升客单价和购买体验",
    difficulty: "简单",
    effectiveTime: "1天见效",
    costRange: "0元",
    problemCodes: ["REVENUE_DROP"],
    chapter: 9,
    sub: 905,
    steps: [
      { title: "选袋子计价品类", content: "适合按袋卖的产品：水果（橘子、葡萄、小番茄）、零食（坚果、果干）、蔬菜（土豆、洋葱）。选择颗粒小、数量多的品类，顾客觉得25秒能装很多，实际装不了太多但心理上觉得赚了。袋子大小选中等偏小的，视觉上更容易装满。", checklist: ["选颗粒小数量多的品类","袋子选中等偏小","顾客觉得能装很多"] },
      { title: "设计计时规则", content: "核心规则：15元一个袋子，25秒内装满归你。计时开始顾客开始装，25秒倒计时结束必须停手。计时器要大声滴答，全场都能听到，增加紧张感和围观度。时间不能太长（25秒刚好够装但不够精挑细选），太长就没人围观了。", checklist: ["15元一袋25秒装满","计时器声音全场可听","时间设置紧凑有趣"] },
      { title: "制造围观和对比", content: "在旁边放一个按斤称的价格牌作为对比：橘子按斤5元/斤，按袋15元/袋。顾客心理是按袋划算（实际上可能差不多或略贵），但体验完全不同——自己装的觉得赚了。让装袋子的过程成为表演，围观的人也想试试。", checklist: ["按斤价格牌做对比","装袋过程成为表演","围观者也想参与"] },
      { title: "叠加挑战机制", content: "如果25秒装了特别多（超过一定重量），额外送一份小礼品。给「装袋达人」拍照贴墙上。也可以设挑战赛：谁装得最多送一箱。把简单的计价方式变成游戏，顾客为了破纪录反复来，客单价不知不觉就上去了。", checklist: ["装多了额外奖励","达人拍照上墙","设挑战赛促复购"] }
    ]
  }
],

// ============================================================
// 5. 案例（8条）
// ============================================================
cases: [
  {
    _id: "case_001",
    title: "社区餐厅3个月客流翻倍",
    industry: "餐饮",
    chapter: 1,
    sub: 103,
    problemType: "没有客流",
    effectData: "3个月日均客流从25人提升至58人，月营收增长130%",
    background: "一家开在居民区的小面馆，开业半年日均客流不足30人，老板一度想关店。通过门头优化、社区渗透和线上铺设三管齐下，3个月实现客流翻倍。",
    keyLessons: [
      "门头3秒原则：路人在3秒内能看出你卖什么，比漂亮更重要",
      "社区渗透是餐饮引流的基本功，周边1公里的住户就是你的基本盘",
      "线上铺设不求做得多好，先求有存在感，让搜到的人能找到你"
    ]
  },
  {
    _id: "case_002",
    title: "服装店通过会员体系扭亏为盈",
    industry: "零售",
    chapter: 3,
    sub: 303,
    problemType: "老客户流失",
    effectData: "6个月会员贡献率从15%提升至55%，月营收增长80%",
    background: "一家社区服装店，开业2年后老客户大量流失，月营收持续走低。通过建立3级会员体系、设计会员专属权益和转介绍机制，6个月实现会员贡献率大幅提升。",
    keyLessons: [
      "会员不是打折卡，要给会员真正的专属价值感",
      "转介绍是最便宜的获客方式，但需要设计奖励机制",
      "会员运营需要坚持，至少3个月才能看到明显效果"
    ]
  },
  {
    _id: "case_003",
    title: "美发店体验价引流到长期锁客",
    industry: "服务业",
    chapter: 4,
    sub: 405,
    problemType: "没有客流",
    effectData: "2个月新客到店增长200%，3个月储值客户占比达40%",
    background: "一家开在商业街的美发店，因周边竞品多，新客一直不足。通过设计29.9元体验价引流、服务后3级回访和储值锁客，2个月新客翻倍。",
    keyLessons: [
      "服务业的信任门槛最高，体验价是最有效的破冰手段",
      "服务后24h回访是留客关键，不做等于白引流",
      "储值锁客要设计好档位，首档门槛要低，高档位权益要够吸引"
    ]
  },
  {
    _id: "case_004",
    title: "火锅店成本管控利润翻3倍",
    industry: "餐饮",
    chapter: 6,
    sub: 602,
    problemType: "利润太低",
    effectData: "6个月净利润率从3%提升至11%，月利润从3000元增至2.1万元",
    background: "一家经营3年的社区火锅店，月营收6万但利润只有3%。通过食材成本精细化管控、菜单毛利优化和损耗治理，6个月利润率提升8个百分点。",
    keyLessons: [
      "餐饮利润是管出来的不是卖出来的，成本管控比增收更直接",
      "每道菜都要算毛利，不知道毛利的菜品就是在亏钱",
      "损耗是最大的隐形成本，每天记录损耗就能减少一半"
    ]
  },
  {
    _id: "case_005",
    title: "美容院绩效改革激活团队",
    industry: "服务业",
    chapter: 5,
    sub: 503,
    problemType: "员工管理困难",
    effectData: "3个月员工流失率从20%降至5%，人均产出提升60%",
    background: "一家经营2年的美容院，技师频繁离职导致客户流失严重。通过建立技师分级认证、绩效提成改革和师徒带教机制，3个月团队稳定性和产出大幅提升。",
    keyLessons: [
      "技师分级认证让员工看到成长空间，是留人的第一步",
      "底薪+手工+提成的薪酬结构让优秀技师收入翻倍",
      "师徒带教不仅加速新人成长，还增加了老员工的责任感和收入"
    ]
  },
  {
    _id: "case_006",
    title: "甜品店招牌爆品战略",
    industry: "餐饮",
    chapter: 2,
    sub: 201,
    problemType: "产品卖不动",
    effectData: "2个月招牌爆品占总营收45%，整体客单价提升35%",
    background: "一家社区甜品店，菜单30多种但缺少主打产品，客户选择困难。通过精简菜单至15种、打造1款招牌爆品和设计组合套餐，2个月实现爆品带动整体。",
    keyLessons: [
      "做减法比做加法更有效，少即是多在产品上尤其明显",
      "招牌爆品要占营收40%以上才算真正打造成功",
      "爆品+套餐的组合是提升客单价最有效的手段"
    ]
  },
  {
    _id: "case_007",
    title: "奶茶店抖音从0到月引200客",
    industry: "餐饮",
    chapter: 4,
    sub: 401,
    problemType: "营销推广困难",
    effectData: "3个月抖音粉丝从0到8000，月引流到店200+新客",
    background: "一家大学城奶茶店，老板完全不懂线上营销。从开通抖音开始，坚持每天1条内容，3个月积累8000粉丝，月均引流200+新客到店。",
    keyLessons: [
      "线上营销不怕从零开始，怕的是不开始",
      "坚持比创意更重要，持续发布比偶尔爆款更有效",
      "本地生活内容不用很专业，真实接地气更受欢迎"
    ]
  },
  {
    _id: "case_008",
    title: "便利店差异化对抗连锁品牌",
    industry: "零售",
    chapter: 7,
    sub: 702,
    problemType: "竞争压力大",
    effectData: "6个月在3家连锁包围下营收逆势增长40%",
    background: "一家社区便利店，周边新开了3家连锁便利店。通过引进独家商品、强化社区服务和建立会员体系，6个月在连锁包围下实现逆势增长。",
    keyLessons: [
      "连锁做不到的就是你最大的优势：灵活、有人情味、可定制",
      "独家商品是差异化竞争的利器，让客户只能在你这买到",
      "社区信任是单店对抗连锁的最强护城河"
    ]
  },
  {
    _id: "case_009",
    title: "李哥的烧烤摊3个月翻台率提升80%",
    industry: "餐饮",
    chapter: 4,
    sub: 402,
    problemType: "没有客流",
    effectData: "翻台率从1.2提升至2.16，月营收增长65%",
    background: "李哥在城中村经营烧烤摊3年，周边年轻人多但生意一般，翻台率长期只有1.2。通过优化灯光氛围、大众点评好评运营和精简烤串品种，3个月翻台率大幅提升。",
    keyLessons: [
      "夜宵摊灯光是第一引流要素，暖黄灯+串灯组合最能吸引路人",
      "大众点评好评直接影响30%的新客决策",
      "烤串品种不在多在精，15种足够覆盖需求"
    ]
  },
  {
    _id: "case_010",
    title: "张叔的早餐铺半年日均客流从60人增至110人",
    industry: "餐饮",
    chapter: 1,
    sub: 104,
    problemType: "没有客流",
    effectData: "日均客流从60人增至110人，早高峰排队常态化",
    background: "张叔在老小区门口开早餐铺5年，客流逐年下滑。通过增加现磨豆浆窗口、和物业合作送早餐上门、推出月卡锁定周边上班族，半年客流回升。",
    keyLessons: [
      "早餐的竞争力在速度和便利，出餐快比味道好更关键",
      "与物业合作是社区店最直接的获客渠道",
      "月卡模式能把散客变稳定客，日均消费可预期"
    ]
  },
  {
    _id: "case_011",
    title: "赵姐的家常菜馆营收止跌回升40%",
    industry: "餐饮",
    chapter: 2,
    sub: 201,
    problemType: "营收下滑",
    effectData: "月营收从4.2万回升至5.9万，周末翻台率提升50%",
    background: "赵姐经营家常菜馆4年，去年起营收连续下滑，一度跌到4.2万。通过升级招牌菜、增加外卖渠道和周末家庭套餐，3个月止跌回升。",
    keyLessons: [
      "营收下滑先查招牌菜是否老化，一道新招牌能拉动全店",
      "外卖不是分蛋糕而是做大蛋糕，堂食+外卖组合提升整体产出",
      "周末是家庭客高峰，专门设计的家庭套餐转化率远高于单点"
    ]
  },
  {
    _id: "case_012",
    title: "周哥的小龙虾店旺季营收翻倍",
    industry: "餐饮",
    chapter: 7,
    sub: 701,
    problemType: "营收下滑",
    effectData: "旺季月营收从6万增至12万，淡季营收也提升30%",
    background: "周哥开小龙虾店2年，旺季不旺、淡季更淡，月营收仅6万。通过增加夜间驻唱活动、开发冬季羊蝎子锅和线上限量预售，实现全年营收提升。",
    keyLessons: [
      "餐饮营收不旺先看氛围，驻唱等活动能让客人多坐一小时",
      "淡季要有替代品，小龙虾配羊蝎子能做全年生意",
      "限量预售制造稀缺感，比打折更能提升转化"
    ]
  },
  {
    _id: "case_013",
    title: "刘嫂的快餐店利润率从8%提到18%",
    industry: "餐饮",
    chapter: 6,
    sub: 602,
    problemType: "利润太低",
    effectData: "净利润率从8%提升至18%，月利润增加8000元",
    background: "刘嫂在工厂区开快餐店1年半，日客流不错但利润只有8%。通过食材统采降本、精简低毛利菜品和减少浪费，半年利润率翻倍。",
    keyLessons: [
      "快餐利润关键在食材成本，统采比零买便宜15%以上",
      "低毛利菜品果断砍掉，省下的备料时间和成本比营收更有价值",
      "后厨浪费占成本的10%-15%，日清日结是控损第一步"
    ]
  },
  {
    _id: "case_014",
    title: "陈哥的馄饨店招牌三鲜馄饨带动全店",
    industry: "餐饮",
    chapter: 2,
    sub: 201,
    problemType: "产品卖不动",
    effectData: "招牌馄饨占总营收52%，整体客单价从12元提至18元",
    background: "陈哥开馄饨店3年，菜单杂且无主打，客户常纠结半天。通过聚焦招牌三鲜馄饨、搭配小菜套餐和取消低销量品种，2个月实现爆品带动全店。",
    keyLessons: [
      "菜单超过20种就该精简，顾客选择越少下单越快",
      "招牌品要够特别，别人做不了或做不好的才叫招牌",
      "爆品+小菜套餐是提升客单价最自然的方式"
    ]
  },
  {
    _id: "case_015",
    title: "吴姐的米粉店老客复购率从20%提至55%",
    industry: "餐饮",
    chapter: 3,
    sub: 305,
    problemType: "老客户流失",
    effectData: "老客月复购率从20%提至55%，会员贡献营收占比60%",
    background: "吴姐经营米粉店2年，周边新店分流严重，老客月复购率跌到20%。通过建立微信社群、设计周卡和会员专属加料，3个月老客大幅回归。",
    keyLessons: [
      "餐饮老客靠习惯养，周卡比月卡更适合高频消费场景",
      "微信群是最低成本的老客触达渠道，但要控制发广告频率",
      "专属加料比打折更有价值感，客人觉得被特别对待"
    ]
  },
  {
    _id: "case_016",
    title: "马哥的炒饭店抖音月引150新客到店",
    industry: "餐饮",
    chapter: 4,
    sub: 401,
    problemType: "营销推广困难",
    effectData: "3个月抖音粉丝6000+，月均引流150新客到店",
    background: "马哥开炒饭店1年，从没做过线上推广。从拍颠勺视频开始做抖音，坚持日更+团购券，3个月积累6000粉丝，月均引流150+新客。",
    keyLessons: [
      "餐饮短视频最吸睛的是制作过程，颠勺、火光都是天然素材",
      "抖音团购券是到店转化的关键，没有券流量就是浪费",
      "日更比周更效果好3倍，算法偏爱稳定产出"
    ]
  },
  {
    _id: "case_017",
    title: "孙姐的童装店客流提升70%",
    industry: "零售",
    chapter: 2,
    sub: 203,
    problemType: "没有客流",
    effectData: "周末日均客流从15人增至25人，月营收增长55%",
    background: "孙姐在社区开童装店3年，进店客流逐年减少。通过橱窗换季主题陈列、与幼儿园合作穿搭分享会和社区团购引流，3个月客流大幅回升。",
    keyLessons: [
      "童装橱窗必须有时令感，换季陈列是天然促销信号",
      "幼儿园是童装精准客源地，合作一次胜发1000张传单",
      "社区团购把线上流量导到线下试穿，退货率远低于纯线上"
    ]
  },
  {
    _id: "case_018",
    title: "郑哥的五金店营收回升35%",
    industry: "零售",
    chapter: 1,
    sub: 104,
    problemType: "营收下滑",
    effectData: "月营收从3.8万回升至5.1万，大客户复购率提升40%",
    background: "郑哥经营社区五金店6年，线上分流导致营收持续下滑。通过开发装修工长期合作、增加水电小修上门服务和建立工地团购群，4个月营收回升。",
    keyLessons: [
      "五金店的核心客户是装修工，抓住他们就是抓住终端消费者",
      "增加上门服务能把低频五金消费变中频服务消费",
      "工地团购群是批量出货渠道，一次成单顶零售半个月"
    ]
  },
  {
    _id: "case_019",
    title: "钱姐的花店利润率从15%提到28%",
    industry: "零售",
    chapter: 2,
    sub: 204,
    problemType: "利润太低",
    effectData: "净利润率从15%提升至28%，损耗率从25%降至8%",
    background: "钱姐开花店2年，损耗大导致利润低。通过按预售备花减少库存、主推高毛利永生花和设计包月鲜花订阅，半年利润率大幅提升。",
    keyLessons: [
      "鲜花损耗是利润杀手，预售制能把损耗从25%降到10%以下",
      "永生花毛利是鲜花的3倍，且无损耗风险",
      "包月订阅锁定长期消费，客户粘性和收入稳定性同步提升"
    ]
  },
  {
    _id: "case_020",
    title: "冯哥的文具店爆款引流全店业绩涨50%",
    industry: "零售",
    chapter: 2,
    sub: 201,
    problemType: "产品卖不动",
    effectData: "爆款文创占总营收35%，整体月营收增长50%",
    background: "冯哥开文具店4年，传统文具销量下滑。通过引进网红文创产品、打造盲盒笔专区和学生手账体验角，2个月实现爆款带动整体。",
    keyLessons: [
      "传统文具要靠新奇特产品引流，网红文创自带流量",
      "盲盒模式把低频文具消费变高频复购",
      "体验角让店铺从卖货变社交空间，学生停留时间翻倍"
    ]
  },
  {
    _id: "case_021",
    title: "黄姐的母婴店差异化胜过3家连锁",
    industry: "零售",
    chapter: 7,
    sub: 702,
    problemType: "竞争压力大",
    effectData: "在3家连锁母婴店包围下营收逆势增长35%",
    background: "黄姐经营母婴店3年，周边新开3家连锁。通过提供育儿咨询服务、独家引进进口小众品牌和建立妈妈社群，6个月实现差异化突围。",
    keyLessons: [
      "连锁卖标准品，单店要卖专业服务和信任感",
      "育儿咨询是母婴店最强差异化，连锁做不到一对一服务",
      "妈妈社群是最好的口碑放大器，群内推荐转化率超60%"
    ]
  },
  {
    _id: "case_022",
    title: "杨哥的手机维修店对抗品牌授权店",
    industry: "零售",
    chapter: 4,
    sub: 404,
    problemType: "竞争压力大",
    effectData: "月维修单量提升45%，老客转介绍率达30%",
    background: "杨哥开手机维修店2年，品牌授权店入驻后客流锐减。通过透明维修直播、推出碎屏险和与周边商家异业联盟，4个月稳住并增长。",
    keyLessons: [
      "维修行业信任是第一位，透明操作+直播修机建立信任最快",
      "碎屏险把一次性维修变长期关系，锁客效果远超会员卡",
      "异业联盟让周边商家互推客户，零成本获客"
    ]
  },
  {
    _id: "case_023",
    title: "何姐的杂货店社群营销月营收增60%",
    industry: "零售",
    chapter: 3,
    sub: 305,
    problemType: "营销推广困难",
    effectData: "3个月社群人数达500+，月营收增长60%",
    background: "何姐开社区杂货店5年，从没做过线上营销。从建小区购物群开始，每日推送特价+到店自提优惠，3个月社群驱动营收大幅增长。",
    keyLessons: [
      "杂货店最该做的是小区购物群，距离近是天然优势",
      "每日特价+到店自提组合，比纯线上下单更促到店",
      "群运营关键是少发广告多发实用信息，比如天气提醒+应季推荐"
    ]
  },
  {
    _id: "case_024",
    title: "林姐的瑜伽馆老客续卡率从30%提至65%",
    industry: "服务业",
    chapter: 3,
    sub: 303,
    problemType: "老客户流失",
    effectData: "老客续卡率从30%提至65%，月营收稳定在8万+",
    background: "林姐开瑜伽馆3年，学员续卡率低导致营收不稳定。通过设计3阶课程体系、增加课后体测反馈和社群打卡激励，3个月续卡率翻倍。",
    keyLessons: [
      "续卡率低要先看课程有没有成长感，3阶体系让学员看到进阶路径",
      "体测反馈是续卡最强说服力，数据比感受更有说服力",
      "社群打卡把个人练习变社交行为，出勤率提升40%"
    ]
  },
  {
    _id: "case_025",
    title: "许哥的汽修店老客回店率从25%提至60%",
    industry: "服务业",
    chapter: 3,
    sub: 303,
    problemType: "老客户流失",
    effectData: "老客半年回店率从25%提至60%，保养项目营收翻倍",
    background: "许哥经营汽修店4年，客户修完就走很少回来。通过建立保养提醒系统、推出年卡套餐和维修后3天回访，半年老客大幅回归。",
    keyLessons: [
      "汽修是低频消费，不主动提醒客户不会回来",
      "保养年卡把低频变中频，一年4次进店是底线",
      "修后3天回访既是服务也是营销，回访客户下次选择率超70%"
    ]
  },
  {
    _id: "case_026",
    title: "沈姐的美甲店技师稳定后营收涨45%",
    industry: "服务业",
    chapter: 5,
    sub: 503,
    problemType: "员工管理困难",
    effectData: "技师流失率从30%降至0，人均月产出提升45%",
    background: "沈姐开美甲店1年半，技师频繁跳槽带走客户。通过改底薪+高提成制、师徒绑定分红和季度技能评级加薪，3个月实现零流失。",
    keyLessons: [
      "美甲技师最看重收入，高提成比高底薪更有吸引力",
      "师徒绑定分红让老技师愿意带新人，团队扩张不再难",
      "技能评级加薪让技师有奔头，每升一级收入涨15%"
    ]
  },
  {
    _id: "case_027",
    title: "韩哥的搬家队标准化后人效提升50%",
    industry: "服务业",
    chapter: 5,
    sub: 502,
    problemType: "员工管理困难",
    effectData: "人效提升50%，客户投诉率从15%降至2%",
    background: "韩哥经营搬家队5年，工人管理混乱、服务投诉多。通过制定SOP流程、计件工资+好评奖和月度之星评选，3个月团队效率和服务质量双升。",
    keyLessons: [
      "服务行业SOP是基础，标准化流程能把新手变熟手",
      "计件工资+好评奖组合激励，干得多干得好都加钱",
      "月度之星不用发大奖，荣誉感就是最好的非物质激励"
    ]
  },
  {
    _id: "case_028",
    title: "曹姐的宠物店靠专业服务突围连锁围攻",
    industry: "服务业",
    chapter: 7,
    sub: 702,
    problemType: "竞争压力大",
    effectData: "在2家连锁宠物店旁营收增长30%，洗护预约排到3天后",
    background: "曹姐开宠物店2年，周边新开2家连锁宠物店。通过提供一对一洗护服务、引进专业训犬课和建立宠物社群，6个月实现差异化突围。",
    keyLessons: [
      "宠物主最在意安全和情感，一对一服务比连锁流水线更受欢迎",
      "训犬课是高附加值服务，连带洗护产品销售",
      "宠物社群是最好的口碑场，晒宠物就是晒你的服务"
    ]
  },
  {
    _id: "case_029",
    title: "邓哥的洗车店小红书引流月增120新客",
    industry: "服务业",
    chapter: 4,
    sub: 401,
    problemType: "营销推广困难",
    effectData: "3个月小红书粉丝3000+，月引流120新客到店",
    background: "邓哥开洗车店3年，一直靠路边自然客流。从拍洗车前后对比图开始做小红书，搭配会员体验券和定位标签，3个月线上引流效果显著。",
    keyLessons: [
      "洗车前后对比图是小红书天然爆款内容，视觉冲击力强",
      "定位标签让3公里内的人搜到你是关键，本地生活要打地理标签",
      "体验券是线上到线下的桥梁，没有转化手段流量就是空转"
    ]
  },
  {
    _id: "case_030",
    title: "方姐的推拿店客流从日均8人增至18人",
    industry: "服务业",
    chapter: 4,
    sub: 402,
    problemType: "没有客流",
    effectData: "日均客流从8人增至18人，月营收增长120%",
    background: "方姐在写字楼区开推拿店1年，新客少且不稳定。通过午休快推30分钟套餐、企业团购合作和大众点评新客立减，3个月客流翻倍。",
    keyLessons: [
      "写字楼区推拿的黄金时段是午休，30分钟快推切中需求",
      "企业团购一次搞定批量获客，1家企业等于20个稳定客源",
      "点评新客立减是破冰利器，服务业信任门槛高需要降低首次尝试成本"
    ]
  },
  {
    _id: "case_g31",
    title: "奶茶店1元SVIP锁客",
    industry: "奶茶茶饮",
    chapter: 9,
    sub: 903,
    problem: "客流少、复购低",
    solution: "将原价6元的奶茶定价1元作为引流产品，但1元奶茶仅限SVIP会员享受。顾客需支付300元成为SVIP，入会即送榨汁机一台+500元红包卡（每次消费可抵扣一部分）。1元奶茶是鱼饵，300元会员费锁住长期消费，榨汁机和红包卡让会员觉得超值，每次来用红包抵扣又促进持续到店。",
    effectData: "SVIP会员数大幅增长，会员消费频次提升3倍",
    keyPoints: ["1元引流产品", "300元会员门槛", "榨汁机实物赠品", "500元红包卡分次抵扣"],
    steps: ["将爆款奶茶定价1元仅限SVIP会员", "设300元SVIP门槛，入会送榨汁机+500元红包卡", "会员每次消费用红包抵扣，培养持续到店习惯", "微信群维护会员，定期推送新品和专属优惠"]
  },
  {
    _id: "case_g32",
    title: "烧烤店摸球抽奖",
    industry: "烧烤烤串",
    chapter: 9,
    sub: 902,
    problem: "客流少、新客进店率低",
    solution: "准备透明箱子放12种不同颜色的球，每种颜色对应不同奖励：免费烤串、折扣券、加菜券、饮品券等。12种奖励中只有1种需要付费成为会员才能领取，其余11种当场兑现。顾客摸球时全场围观，中奖概率极高（11/12），体验感极好。唯一需要会员才能领的球自然引导办卡。",
    effectData: "新客进店率提升50%，会员转化率提升40%",
    keyPoints: ["12种奖励摸球", "11/12中奖率", "1种会员专属奖引导入会", "全场围观制造氛围"],
    steps: ["准备透明箱子和12种颜色球对应不同奖品", "设消费满额即可摸球一次", "11种奖励当场兑现，1种需会员才能领", "公布中奖记录，让顾客看到真实中奖"]
  },
  {
    _id: "case_g33",
    title: "卖凳子砸凳子挑战",
    industry: "家居办公",
    chapter: 9,
    sub: 901,
    problem: "产品信任度低、顾客犹豫不决",
    solution: "针对国庆推出凳子售卖活动，宣传凳子质量好不好不要钱，让顾客现场免费砸凳子验证质量。若砸坏承诺给100万赔偿（实际很难砸坏），砸不坏顾客需购买两个凳子。同时设置阶梯奖励：买一个凳子奖励100元，买两个奖励200元，买三个奖励300元。先让顾客站在凳子上跳动验证质量，之后尝试砸凳子。提醒顾客砸凳子时注意安全，每人只有一次砸凳子机会。",
    effectData: "成交率提升60%，老客转介绍率翻倍",
    keyPoints: ["免费砸凳子验证质量", "砸不坏就买砸坏白送", "围观效应引流", "转介绍送配件"],
    steps: ["国庆节推出凳子售卖活动，宣传质量好不好不要钱", "顾客现场验证：先站在凳子上跳动，再尝试砸凳子", "砸不坏则按阶梯规则购买（买1个奖100，买2个奖200，买3个奖300）", "砸坏给100万赔偿（实际很难砸坏），同时提醒安全注意事项", "活动过程拍视频发抖音二次传播"]
  },
  {
    _id: "case_g34",
    title: "卖鱼夹鸡蛋游戏",
    industry: "水果生鲜",
    chapter: 9,
    sub: 901,
    problem: "客流少、客单价低",
    solution: "先送鸡蛋引流：路过免费领鸡蛋吸引人气。鱼进价6元，正常卖12元亏本，但按此价售卖吸引顾客。消费夹鸡蛋规则：消费满10元夹5秒、满20元夹8秒、满30元夹10秒。顾客积极参与，有买5条鱼的、买4条鱼的，夹鸡蛋过程大家玩得很开心。鸡蛋免费送引流，夹鸡蛋提供情绪价值，时间分级促高消费。",
    effectData: "客单价提升45%，客流量增长30%",
    keyPoints: ["送鸡蛋引流", "消费额对应游戏时长", "筷子夹鸡蛋趣味性强", "时长分级促高消费"],
    steps: ["用免费送鸡蛋方式吸引人气引流", "鱼进价6元按12元价格售卖吸引顾客", "设置消费分级：满10元夹5秒、满20元夹8秒、满30元夹10秒", "顾客用筷子在限定时间夹鸡蛋，夹到归顾客", "活动过程拍视频发抖音二次传播"]
  },
  {
    _id: "case_g35",
    title: "奶茶抽吸管活动",
    industry: "奶茶茶饮",
    chapter: 9,
    sub: 902,
    problem: "新客少、缺乏话题性",
    solution: "准备27根吸管，三种颜色各9根。顾客抽9根吸管，对应不同数字有不同奖励。共12个奖励，只有数字234需要顾客任意买两杯（买单项），其他有免单、免费加料、回头奖励等。1个多小时后杨枝甘露卖完，基本达到销售目标。",
    effectData: "新客增长35%，社交媒体曝光量翻倍",
    keyPoints: ["27根吸管三种颜色", "9/27中免费奶茶", "三种奖励无空奖", "抽到大奖自然传播"],
    steps: ["准备27根吸管（三种颜色各9根）对应不同奖励", "设置12个奖励，仅1个需要买单（234=任意买两杯）", "顾客购买后抽吸管，按颜色/数字兑现奖励", "中奖结果鼓励顾客拍照分享", "活动结束统计销售数据"]
  },
  {
    _id: "case_g36",
    title: "卖红薯飞镖挑战",
    industry: "水果生鲜",
    chapter: 9,
    sub: 901,
    problem: "路边摊缺乏吸引力、客流不稳定",
    solution: "商家采用飞镖游戏1小时卖完红薯，吸引顾客参与。设置不同环数对应不同奖励：十环奖100元红包、九环奖刮刮乐（最高奖金25万）、八环请吃一个红薯，没丢中则照顾生意买两份红薯。顾客参与挑战，有人挑战十环未中，后选择九环也未成功，最终购买红薯付款。",
    effectData: "日销量提升50%，围观众转化为顾客比例达40%",
    keyPoints: ["飞镖不同环数对应不同奖励", "购买后免费投3镖", "红薯成本低奖励大方", "围观转化率高"],
    steps: ["设飞镖靶，不同环数对应不同奖品（十环100元、九环刮刮乐、八环红薯、未中买两份）", "顾客购买红薯后免费投飞镖挑战", "按环数兑现奖品，未中则买两份红薯", "全程拍视频记录挑战过程", "视频发抖音二次传播引流"]
  },
  {
    _id: "case_g37",
    title: "卖鸡爪数字抽牌",
    industry: "快餐简餐",
    chapter: 9,
    sub: 902,
    problem: "复购低、顾客吃完就走",
    solution: "广告词：抓住你的心抓住你的胃，吃了你的鸡爪就夜不能寐。老板报一个数字，消费者从扑克牌中抽牌。抽到相同数字送一份鸡爪，数字相近6折卖一份，都不中买两份。每份鸡爪下面有盲盒惊喜：买一送一、下次8折、三人同行一人免单等。即使没中奖需购买，也能获得不同奖励。",
    effectData: "复购率提升55%，会员转化率提升35%",
    keyPoints: ["报数字抽牌", "扑克牌对应不同奖励", "底部盲盒标签叠加", "中奖需会员兑奖锁客"],
    steps: ["摆摊前摆放广告词招牌吸引注意", "顾客买鸡爪后报一个1-10的数字", "老板报数字，消费者抽牌：相同数字送一份、相近6折、都不中买两份", "每份鸡爪底部贴盲盒标签（买一送一/8折/免单等）", "顾客拍照分享盲盒奖品二次传播"]
  },
  {
    _id: "case_g38",
    title: "卖橘子袋子计价",
    industry: "水果生鲜",
    chapter: 9,
    sub: 905,
    problem: "按斤卖利润薄、客单价低",
    solution: "广告词：四面八方都是客，齐聚一堂皆欢喜，菊香飘万里，果然在这里，橘子今天免费领。袋子卖15元一个，顾客用袋子装橘子，25秒内装满橘子都归顾客。橘子进价1.5元/斤，一个袋子最多装5斤，成本7.5元，卖15元能赚7.5元；正常卖2.5元/斤，5斤卖12.5元利润5元，此方法卖得快且多。",
    effectData: "客单价提升40%，利润率提升25%",
    keyPoints: ["15元一袋25秒装满", "计时器增加紧张感", "按斤价格牌做对比", "体验感远超按斤卖"],
    steps: ["用吸引性广告词开场宣传", "设15元一袋、25秒装满的规则", "用计时器大声倒计时增加紧张感", "旁边放按斤价格牌做对比，突出按袋划算", "装袋过程吸引围观，拍照二次传播"]
  },
  {
    _id: "case_g39",
    title: "卖菠萝锚定对比",
    industry: "水果生鲜",
    chapter: 9,
    sub: 905,
    problem: "顾客犹豫不决、成交率低",
    solution: "菠萝分三档定价：清仓款3元一斤（质量一般半生不熟）、常规款4元一斤（品质不错有水头）、精品款10元一斤（展示款，用于对比衬托）。改变询问方式：不问要不要3元的，而是问买哪一种，引导顾客对比选择。利用锚定营销，通过高价精品菠萝让顾客觉得其他两款价格合理。销售中会出现从众效应，某款快卖完时吸引更多人购买。",
    effectData: "成交率提升50%，中号菠萝销量占比达65%",
    keyPoints: ["三档定价3/4/10元", "问买哪种不问要不要", "10元高价款做锚点", "4元中号自然成首选"],
    steps: ["将菠萝分三档定价并排展示（3元/4元/10元）", "训练店员问买哪种不问要不要，引导选择而非拒绝", "10元精品菠萝放显眼位置做锚点", "销售中观察从众效应，适时提醒某款快卖完", "活动结束统计各档位销量"]
  },
  {
    _id: "case_g40",
    title: "早餐店引蛇出洞",
    industry: "早餐店",
    chapter: 9,
    sub: 903,
    problem: "客流少、新客进店率低",
    solution: "广告词：品尽世间味道，尽天下先一日之计在于晨，我想照顾你的每一个清晨。3元一份的小米粥免费送，但需顾客花19.9元加入早餐店会员，可免费喝365次。顾客领小米粥后可能会消费其他单品，收回送粥成本并吸引流量。",
    effectData: "会员数月增200+，会员日均消费比非会员高60%",
    keyPoints: ["3元小米粥免费送引流", "19.9元会员年卡", "喝粥顺手买主食", "粥是鱼饵主食是利润"],
    steps: ["在门店张贴广告词吸引注意", "3元小米粥免费送，条件是19.9元办会员", "会员一年内可免费喝365次小米粥", "顾客来喝粥时推荐包子油条等其他单品", "会员每天消费带来持续利润"]
  },
  {
    _id: "case_g41",
    title: "早餐店飞龙在天",
    industry: "早餐店",
    chapter: 9,
    sub: 903,
    problem: "顾客来几天就不来了、粘性差",
    solution: "建立打卡机制，顾客每天来早餐店吃早餐打卡，坚持365天年底送一辆电动车。虽然送电动车和365份小米粥有成本，但顾客每天消费带来利润，且不一定每个人都能坚持，无论如何商家都能盈利。",
    effectData: "日均到店率提升40%，连续打卡30天以上顾客占30%",
    keyPoints: ["打卡365天送电动车", "必须消费才能打卡", "电动车成本被365天消费覆盖", "打卡进度可视化"],
    steps: ["设打卡365天送电动车活动", "顾客每天消费后盖章打卡", "店内设打卡墙展示进度激励参与", "定期公布坚持最久的顾客", "电动车成本被365天消费覆盖"]
  },
  {
    _id: "case_g42",
    title: "早餐店双龙戏珠",
    industry: "早餐店",
    chapter: 9,
    sub: 904,
    problem: "客流集中在高峰、闲时没人",
    solution: "将成本差不多的单品分时段免费送，每人每天限领一份，吸引不同需求的顾客在不同时段前来。利用排队现象营造火爆氛围，打造品牌，开展招商加盟。要求顾客帮忙发短视频直播，带上门店定位和账号，增加线上曝光。",
    effectData: "闲时客流提升70%，抖音曝光量月增5000+",
    keyPoints: ["分时段送不同免费品", "错峰引流分散客流", "拍短视频加定位送奖励", "线上曝光+线下到店双驱动"],
    steps: ["设计不同时段免费品策略（7点前豆浆/7-8点鸡蛋/8-9点小菜）", "每个时段限量供应控制成本", "利用排队现象营造火爆氛围", "顾客发短视频+定位送额外小食", "打造本地网红打卡点"]
  },
  {
    _id: "case_g43",
    title: "卖生蚝筷子夹挑战",
    industry: "烧烤烤串",
    chapter: 9,
    sub: 901,
    problem: "生蚝销量平平、缺乏话题",
    solution: "广告词：生蚝不卖卖你玩。顾客用筷子在15秒内将一箱生蚝夹到空箱子且一个不落，可免费拿走一箱。15秒内夹10个以上到指定处，生蚝半价19.9元/箱。若都夹不中，则原价买两箱。生蚝滑溜溜筷子难夹，极具挑战性和观赏性。",
    effectData: "生蚝销量提升80%，围观转化率达35%",
    keyPoints: ["15秒筷子夹生蚝", "夹完免费夹10个半价", "生蚝滑溜极具挑战性", "围观者变参与者"],
    steps: ["设15秒筷子夹生蚝挑战规则", "夹完免费、夹10个以上半价19.9元、没夹中买两箱", "生蚝放在滑的容器中增加挑战难度", "挑战过程大声倒计时吸引围观", "拍视频发抖音二次传播"]
  },
  {
    _id: "case_g44",
    title: "卖月饼30秒吃光",
    industry: "烘焙蛋糕",
    chapter: 9,
    sub: 901,
    problem: "月饼季竞争激烈、缺乏差异化",
    solution: "广告词：佳节共赏天上月，中秋一品人间情，月是故乡明明表痴亲情。设计挑战月饼游戏，顾客30秒内吃光一个月饼送188元月饼礼盒，吃不光则买一盒。通过这种方式让顾客参与并品尝月饼，传递情感。",
    effectData: "月饼季销量提升90%，活动期间日客流翻倍",
    keyPoints: ["30秒吃光送188元礼盒", "吃不光买一盒98元", "月饼干货难速食极具挑战", "搞笑场面天然传播素材"],
    steps: ["用情感化广告词吸引顾客参与", "设30秒吃光月饼挑战", "成功送188元礼盒，失败买一盒", "挑战过程拍视频发抖音", "设置挑战纪录激励参与"]
  },
  {
    _id: "case_g45",
    title: "美容院天网人网地网",
    industry: "美容美甲",
    chapter: 9,
    sub: 904,
    problem: "新客获取成本高、老客裂变差",
    solution: "天网-互联网营销：头像换成工作照+门店环境，名字加本地关键词如小王在南宁做美容，个性签名表明身份价值。人网-锁客模式：九宫格营销，中间是25-40岁宝妈客群，周围八个格子是他们感兴趣的内容。地网-实体营销：到店玩幸运盲盒游戏，客户转发按曝光量领现金补贴。",
    effectData: "新客月增长60%，老客转介绍率提升3倍",
    keyPoints: ["头像签名本地化做天网", "九宫格锁客老带新", "到店游戏+转发奖励做地网", "三网合一全链路裂变"],
    steps: ["天网：微信头像签名本地化+门店定位", "人网：九宫格锁客，老带新享折扣", "地网：到店设幸运盲盒抽奖", "客户转发朋友圈按曝光量领现金补贴", "三网联动实现线上线下闭环"]
  },
  {
    _id: "case_g46",
    title: "面包挑战喝果汁",
    industry: "烘焙蛋糕",
    chapter: 9,
    sub: 901,
    problem: "果汁销量低、产品单一",
    solution: "游戏规则：30秒内吃完一片全麦面包（男生）、40秒内（女生），成功免费且奖励100元；挑战失败则买一杯西瓜汁。全麦面包吸干口腔水分，多数人难以完成。将西瓜汁从10元提至15元，同时调整男生40秒、女生50秒时间。",
    effectData: "果汁销量提升120%，整体利润率提升20%",
    keyPoints: ["30秒吃面包挑战", "失败买西瓜汁不买面包", "面包干货难速食失败率高", "果汁定价提高保证利润"],
    steps: ["设30/40秒吃面包挑战（男生30秒/女生40秒）", "成功免费+100元，失败买一杯15元西瓜汁", "全麦面包干导致失败率高", "西瓜汁定价提高保证利润", "挑战过程拍视频发抖音"]
  },
  {
    _id: "case_g47",
    title: "卖寿司挑战+裂变",
    industry: "餐饮",
    chapter: 9,
    sub: 904,
    problem: "新客少、老客不复购",
    solution: "双管齐下：挑战端——20秒吃寿司挑战，吃完免费吃不完买一份，挑战过程制造围观和话题；裂变端——主卡副卡一拖二，办会员卡送2张副卡给朋友，朋友凭副卡消费享8折，副卡消费积分主卡和副卡各一半。挑战引流+副卡裂变，新客不断来，老客帮你拉。",
    effectData: "新客月增长70%，会员副卡激活率达55%",
    keyPoints: ["20秒吃寿司挑战引流", "主卡副卡一拖二裂变", "副卡8折+积分共享", "挑战引流裂变留客"],
    steps: ["设20秒吃寿司挑战引流", "办会员卡配2张副卡送朋友", "副卡消费享8折积分主副各半", "追踪副卡激活率优化裂变"]
  },
  {
    _id: "case_g48",
    title: "果汁盲盒底部标签",
    industry: "奶茶茶饮",
    chapter: 9,
    sub: 902,
    problem: "复购低、顾客喝完就走",
    solution: "在果汁杯底贴隐藏标签设奖：再来一杯、半价券、免费加料、会员专属大奖。顾客喝完果汁翻过来才发现中奖，惊喜感拉满。中奖后需是19.9元会员才能兑奖，会员卡享全场8折。杯底标签让每一杯果汁都有期待，会员门槛极低，几乎没有人会拒绝19.9元的8折会员。",
    effectData: "复购率提升65%，会员转化率达50%",
    keyPoints: ["杯底贴隐藏标签", "喝完才发现中奖惊喜感强", "中奖需19.9元会员兑奖", "会员享8折低门槛高转化"],
    steps: ["在果汁杯底贴隐藏标签设多级奖励", "顾客喝完翻杯发现中奖", "中奖需19.9元办会员才能兑奖", "会员享8折促进持续消费"]
  },
  {
    _id: "case_g49",
    title: "烧烤店抓啤酒游戏",
    industry: "烧烤烤串",
    chapter: 9,
    sub: 901,
    problem: "客流少、缺乏爆点活动",
    solution: "广告词：一日不脱贫烧烤不能停，要想生活旺啤酒必须上。游戏规则：啤酒只捏不卖，顾客单手抓啤酒，能抓几瓶就送几瓶，只能店内消费。抓4瓶以上老板倒立洗头。实际效果：两个小时进行约6轮，每轮15瓶左右，共送出约90瓶啤酒。3-4瓶啤酒代表一桌消费，一桌3-4人，客单价100-200元，店铺上下两层基本坐满。",
    effectData: "活动期间客流翻3倍，抖音单条视频播放量10万+",
    keyPoints: ["单手抓啤酒能抓几瓶送几瓶", "4瓶以上老板倒立洗头", "规则极简人人会玩", "老板噱头天然爆款"],
    steps: ["用吸引性广告词开场", "设单手抓啤酒游戏：能抓几瓶送几瓶，店内消费", "抓4瓶以上老板倒立洗头", "每轮约15瓶，进行6轮送出约90瓶", "全程拍视频发抖音二次传播"]
  },
  {
    _id: "case_g50",
    title: "卖葡萄裂变营销",
    industry: "水果生鲜",
    chapter: 9,
    sub: 904,
    problem: "客流量不足、单客消费额低",
    solution: "三重裂变组合拳：第一重，四人同行一人免单，4人一起买葡萄随机一人免单，相当于75折但比打折更有传播力；第二重，1元购11瓶果汁，果汁分11次到店领取，锁定11次到店；第三重，消费满520元退款，4人消费满520元退全款给发起人，刺激拼团凑单。裂变7次，1人带3人带9人带27人。",
    effectData: "拼团订单占比达45%，客流量增长80%",
    keyPoints: ["四人同行一人免单", "1元11瓶果汁锁定11次到店", "满520元退款刺激拼团", "三重裂变叠加效果倍增"],
    steps: ["设四人同行一人免单活动", "叠加1元购11瓶果汁分次领取锁定11次到店", "消费满520元退全款刺激拼团", "三重裂变叠加实现指数级传播", "活动拍视频发社交媒体"]
  },
  {
    _id: "case_g51",
    title: "火锅店病毒式裂变30天收款190万",
    industry: "餐饮",
    chapter: 9,
    sub: 904,
    problem: "没有客流、竞争压力大",
    solution: "以重装升级为由头，推出1元吃138元火锅套餐（需4人同行），7天预热吸引576组客户。到店后花9.9元办卡并转发朋友圈，送100瓶啤酒（分次喝锁定回头率）。推出充500送1000返500再送100瓶啤酒：送的1000元是异业联盟礼品（美发、KTV等，0成本），返的500元让客户带朋友来消费，每带一位返50元现金。1元套餐通过4人同行的酒水加菜覆盖成本，9.9元会员费是纯利，充值500元除去啤酒和菜品成本仍有200元纯利。",
    effectData: "30天裂变充值3800名会员，收款190万元，净赚76万元",
    keyPoints: ["1元套餐4人同行锁客", "9.9元会员费纯利+啤酒分次喝", "异业联盟0成本送礼品", "带朋友返50元现金裂变"],
    steps: ["以重装升级为由头推1元吃138元火锅套餐（4人同行）", "7天预热吸引576组客户到店", "到店花9.9元办卡+转发朋友圈送100瓶啤酒", "推充500送1000（异业礼品）+返500（带朋友返现）", "30天实现3800名会员裂变收款190万"]
  },
  {
    _id: "case_g52",
    title: "大学城服装店2元投入赚23元",
    industry: "零售",
    chapter: 9,
    sub: 902,
    problem: "没有客流、老客户流失",
    solution: "凭学生证进店免费送价值18元冰爽防晒袖套（成本2元），每天限300个。进店逛的学生有10%转化率，结账时告知充值200元办会员卡，这件衣服打5折。会员卡不仅当次打折，以后消费享8折且优先通知新款。看似送袖套亏本、衣服半价利润薄，但锁定了学生大学4年消费。一个学生一年买3件，4年买12件，第一件不赚钱，后面11件都是高利润。",
    effectData: "月营业额从3万提升至18万，销售额提高6倍",
    keyPoints: ["2元袖套做诱饵引流", "充200元会员卡打5折成交", "锁定大学4年持续消费", "12件累计利润远超前1件亏损"],
    steps: ["凭学生证进店免费送18元防晒袖套（成本2元，日限300个）", "学生进店逛形成10%转化率", "结账时推充200元会员卡享5折当次消费", "会员后续享8折+新款优先通知", "锁定大学4年消费生命周期"]
  },
  {
    _id: "case_g53",
    title: "水果商城0成本招募1000会员",
    industry: "水果生鲜",
    chapter: 9,
    sub: 904,
    problem: "营销推广困难",
    solution: "充值99元得一箱水果（成本49元），且99元可在商城消费。分享朋友购买，朋友得一箱，自己也再得一箱。商城内水果只卖月套餐（398元起）、季度或年套餐，99元不能直接买单品，必须补差价。表面买一箱送一箱亏本，但99元被设计成抵扣券，用户为用掉99元必须购买398元套餐，实际支付299元现金。通过前后分离策略抹平赠送成本，筛选出高净值付费用户。",
    effectData: "不花广告费快速招募1000个精准付费会员",
    keyPoints: ["充值99元得水果+抵扣券双重权益", "分享裂变双方各得一箱", "99元不能直接用需补差价", "筛选高净值用户过滤低价值客户"],
    steps: ["推充值99元得一箱水果+99元抵扣券活动", "设置分享裂变：朋友购买双方各得一箱", "商城只卖月/季/年套餐，99元需补差价使用", "用户实际支付299元购买398元套餐", "零广告费筛选出1000个付费会员"]
  },
  {
    _id: "case_g54",
    title: "知识付费自动化管道收入",
    industry: "其他",
    chapter: 9,
    sub: 905,
    problem: "利润太低",
    solution: "建立知识付费平台（公众号/小程序），汇集实体店营销、抖音教程等课程。设置推广佣金（分销机制），粉丝推广即可赚钱，实现自动化裂变引流。设计低价高价值会员（99元学所有课程），利用巨大价值差实现无人值守自动成交。虚拟产品边际成本为零，一次制作无限售卖，会员费和课程费自动入账。利用粉丝社交关系链推广，平台只需维护内容更新。",
    effectData: "运营一年收获十万粉丝，赚取近百万利润",
    keyPoints: ["虚拟产品边际成本为零", "分销机制实现自动裂变引流", "99元高价值会员无人值守成交", "粉丝社交链推广零成本获客"],
    steps: ["建立知识付费平台汇集各行业课程", "设置分销推广佣金机制实现自动裂变", "设计99元全课程会员自动成交", "虚拟产品无限售卖零边际成本", "粉丝推广+平台维护实现管道收入"]
  },
  {
    _id: "case_g55",
    title: "烤鱼店1元吃套餐7天拓客1500人",
    industry: "餐饮",
    chapter: 9,
    sub: 901,
    problem: "没有客流",
    solution: "花19元办VIP卡，加1元即可吃价值128元烤鱼套餐（含烤鱼、素菜、啤酒、米饭）。店内设置娃娃机、唱歌屋，打造好吃又好玩的体验，增加等待乐趣。结账时推199元充值，送200元菜品、66瓶啤酒、口水鸡、游戏币等。1元套餐成本40元，扣除19元办卡费和1元餐费，获客成本20元。顾客通常2人以上同行，套餐不够吃，加点酒水菜品产生利润覆盖成本。199元充值门槛低，赠品分次消耗锁定后续消费。",
    effectData: "7天办理会员1500多人，天天爆满",
    keyPoints: ["19元办卡+1元吃套餐低门槛", "店内娃娃机唱歌屋增加体验", "199元充值送多重礼品锁客", "获客成本仅20元/人"],
    steps: ["推19元办VIP+1元吃128元烤鱼套餐", "店内设娃娃机唱歌屋增加等待乐趣", "顾客2人以上同行自然加点覆盖成本", "结账推199元充值送200元菜品+66瓶啤酒", "7天办理会员1500多人实现爆满"]
  },
  {
    _id: "case_g56",
    title: "酒店充588送3000超级成交",
    industry: "餐饮",
    chapter: 9,
    sub: 904,
    problem: "竞争压力大、没有客流",
    solution: "充588元得588元储值金，送1000元大礼包（床上四件套、电风扇、酒、KTV/足疗卡），利用批发价和异业联盟将成本压至极低。送1000元抵用卡（满300抵50），用完抵用卡后再返1000元现金（或转存1500元）。大礼包成本控制在294元以内（酒店毛利50%），返现1000元需消费6000元（20次），产生的毛利足以覆盖返现成本并盈利。利用沉淀资金和异业联盟导流提成获利。",
    effectData: "锁定顾客长期消费，实现现金流和利润双赢",
    keyPoints: ["充588送3000超级让利", "异业联盟+批发价压缩礼品成本", "抵用卡分次使用锁长期消费", "返现需消费6000元覆盖成本"],
    steps: ["推充588得588储值金+1000元大礼包", "大礼包含异业礼品成本控制在294元内", "送1000元抵用卡（满300抵50）分次使用", "用完抵用卡返1000元现金需消费6000元", "沉淀资金+异业导流实现长期盈利"]
  },
  {
    _id: "case_g57",
    title: "母婴店衣服卖1元年赚80万",
    industry: "零售",
    chapter: 9,
    sub: 904,
    problem: "老客户流失、营销推广困难",
    solution: "充值198元，送198件宝宝衣服（每次消费满98元送1件）、送168元平衡车、送洗浴卡11张、返现198元。送的10张洗浴体验券送给朋友，朋友每充值一位返给会员19.8元。衣服成本极低（15元/件）且需分次领取相当于打折。平衡车进货价仅30元，充值198元除去成本仍有余利。核心在于裂变，利用老客户送体验券带来新客户充值，实现滚雪球式增长。",
    effectData: "一年裂变赚80多万，彻底扭亏为盈",
    keyPoints: ["充值198元送198件衣服分次领", "平衡车进货价30元低毛利", "洗浴体验券送朋友裂变获客", "老带新返19.8元滚雪球增长"],
    steps: ["推充值198元送198件衣服+平衡车+洗浴卡+返现", "衣服分次领（每次满98元领1件）相当于打折", "送10张洗浴体验券让会员送朋友", "朋友充值返19.8元实现裂变", "一年裂变赚80多万扭亏为盈"]
  },
  {
    _id: "case_g58",
    title: "包子店365天免费吃干掉对手",
    industry: "早餐店",
    chapter: 9,
    sub: 904,
    problem: "竞争压力大、没有客流",
    solution: "交49元会员费，全年免费吃猪肉包子（每天限1个）。送10张5元午/晚餐抵扣券。包子成本6毛，一般人不会天天吃，且男性吃一个不够，或会搭配稀饭、茶叶蛋消费。早餐不亏或微亏，目的是截流。利用5元抵扣券将早餐流量引导至高利润的午/晚餐时段，培养顾客路径依赖，一旦习惯在店里吃早餐，午餐大概率也会选择这里。",
    effectData: "客流爆满，成功截流竞争对手客户",
    keyPoints: ["49元会员全年免费吃1个包子", "包子成本6毛微亏截流", "5元抵扣券引导至午晚餐高利润时段", "路径依赖锁定全时段消费"],
    steps: ["推49元会员全年免费吃1个猪肉包子", "送10张5元午/晚餐抵扣券", "早餐微亏截流竞争对手客户", "抵扣券引导至午晚餐高利润消费", "培养路径依赖锁定全时段客流"]
  },
  {
    _id: "case_g59",
    title: "0成本虚拟产品月赚300万信息差",
    industry: "其他",
    chapter: 9,
    sub: 905,
    problem: "利润太低",
    solution: "选择0成本虚拟产品（如课程、资料、软件），利用公众号、社群等自媒体渠道分发内容，通过销售虚拟资料或项目教程变现。纯利润模式，无物流、无仓储、无生产成本。利用信息不对称，将公开或半公开的信息整理打包销售。虚拟产品一次制作无限售卖，边际成本为零，操作灵活可快速调整产品方向。",
    effectData: "项目操盘手月入300万",
    keyPoints: ["0成本虚拟产品无物流仓储", "信息差变现纯利润模式", "公众号社群自媒体分发", "一次制作无限售卖边际成本为零"],
    steps: ["选择0成本虚拟产品方向（课程/资料/软件）", "整理打包信息形成可销售产品", "通过公众号社群分发内容吸引用户", "销售虚拟产品变现无生产成本", "持续优化产品快速调整方向"]
  },
  {
    _id: "case_g60",
    title: "便利店积赞领鸡蛋自动锁客",
    industry: "零售",
    chapter: 9,
    sub: 904,
    problem: "没有客流、老客户流失",
    solution: "设计全年积赞卡，消费每满15元送3个鸡蛋，累计12个可领走。累计领4次鸡蛋送食用油一桶，每月消费排名前列送代金券。必须加微信激活卡片，将客流导入私域流量池。利用游戏化思维让消费像嗑瓜子一样上瘾，高频带低频，为领鸡蛋顾客优先选择该店购买其他高毛利商品。掌握客户消费数据，为后续精准营销和开分店众筹打基础。",
    effectData: "锁定周边居民消费习惯，建立数据库实现持续复购",
    keyPoints: ["满15元送3个鸡蛋游戏化激励", "累计领4次送食用油连环奖励", "加微信激活导入私域流量池", "数据资产支撑精准营销和扩张"],
    steps: ["设计全年积赞卡，满15元送3个鸡蛋", "累计12个鸡蛋可领走，领4次送食用油", "每月消费排名前列送代金券", "必须加微信激活导入私域池", "积累消费数据支撑精准营销"]
  },
  {
    _id: "case_g61",
    title: "大型超市充值3万送10万汽车3年收款3000万",
    industry: "零售",
    chapter: 9,
    sub: 904,
    problem: "竞争压力大、老客户流失",
    solution: "放弃普通散客，锁定B端大客户（饭店、酒楼、大排档），他们每月采购量大。推出充值3万送10万汽车活动，汽车采用按揭，超市仅付一成首付（约8000元），每月月供约2000元由客户在超市的采购利润覆盖。签订3年供货协议，每月最低采购额需达到标准（如3000元），否则客户需自付月供。手握50家餐饮大客户采购订单，反向与上游供应商谈判压低进货成本。通过汽车锁定客户未来3年采购，确保稳定现金流和利润。",
    effectData: "2个月签约50家餐饮客户，3年累计收款3000万",
    keyPoints: ["锁定B端大客户而非散客", "充值3万送10万汽车按揭模式", "3年供货协议锁定长期采购", "反向整合供应链压低成本"],
    steps: ["锁定B端大客户（饭店酒楼大排档）", "推充值3万送10万汽车（首付8000元+月供覆盖）", "签订3年供货协议月最低采购3000元", "手握50家订单反向与供应商谈判压成本", "3年累计收款3000万扭亏为盈"]
  },
  {
    _id: "case_g62",
    title: "奶茶店0成本裂变3倍顾客",
    industry: "奶茶茶饮",
    chapter: 9,
    sub: 904,
    problem: "老客户流失、营销推广困难",
    solution: "设计三级会员体系：C级每月领9张3元券，B级每月领5张3元+4张5元券，A级每月领9张5元券。设置升级裂变机制：C级邀请3个朋友升级B级，B级再邀请6个朋友升级A级。利用中间价原理，B级用5元券有门槛（每用2张3元券才可用1张5元券），促使顾客升级为A级。老顾客为升级主动邀请朋友，实现零成本裂变，顾客为用掉优惠券大幅增加到店频次。",
    effectData: "1个月会员量增加3倍，销售额显著提升",
    keyPoints: ["三级会员阶梯升级", "邀请好友升级实现零成本裂变", "中间价原理设券门槛促升级", "优惠券驱动高频到店消费"],
    steps: ["设计C/B/A三级会员券梯度", "C邀3友升B，B邀6友升A", "B级券设门槛促升级A级", "老客主动邀请实现零成本裂变", "优惠券驱动到店频次大幅增加"]
  },
  {
    _id: "case_g63",
    title: "饭店充500送2500资源整合盈利",
    industry: "餐饮",
    chapter: 9,
    sub: 904,
    problem: "没有客流、老客户流失",
    solution: "充值500元获得总价值2500元权益：卡内储值500元，送价值1500元异业联盟大礼包（太空被、电暖扇、足疗卡、KTV卡等，0成本置换），送40瓶啤酒（成本80元，分10次领取每次4瓶），送500元消费抵用卡（满300抵50），用完后返500元现金。500元充值扣除菜品成本250元和啤酒成本80元，净赚170元。顾客为拿回500元返现需持续消费3000元，产生的利润足以覆盖返现成本。",
    effectData: "2个月内充值2600名会员，成功回笼大量现金流",
    keyPoints: ["充500送2500超级主张", "异业联盟0成本置换大礼包", "啤酒分次领锁定回头率", "500元返现需消费3000元覆盖"],
    steps: ["推充500元得2500元权益包", "异业联盟大礼包0成本置换", "啤酒分10次领取锁定回头率", "500元抵用卡分次使用", "持续消费3000元后返500元现金"]
  },
  {
    _id: "case_g64",
    title: "汗蒸馆后端盈利模型摆脱困境",
    industry: "美容美甲",
    chapter: 9,
    sub: 905,
    problem: "利润太低、老客户流失",
    solution: "将汗蒸作为前端引流产品不追求盈利。399元成为会员，送价值2080元汗蒸排毒年卡（每次送30元排毒茶）、价值3000元皮肤深层清洁年卡（36次每月3次）、价值300元实物礼品。通过每月3次皮肤清洁服务创造36次与顾客接触机会，销售后端美容护肤产品和服务。399元会员费足以覆盖汗蒸和礼品成本，只要30多次接触中成交一单后端项目即可收回所有成本。与高档女装店、4S店合作精准获取高净值客户。",
    effectData: "成功转型后端美容项目实现盈利",
    keyPoints: ["汗蒸前端引流不盈利", "399元会员送多重权益包", "36次皮肤清洁创造接触机会", "后端美容项目高额利润变现"],
    steps: ["汗蒸做前端引流不追求利润", "推399元会员送汗蒸年卡+皮肤清洁年卡+礼品", "每月3次清洁创造36次接触机会", "销售后端美容护肤产品变现", "与4S店等合作精准获客"]
  },
  {
    _id: "case_g65",
    title: "蛋糕店整合200家超市免费卖蛋糕",
    industry: "烘焙蛋糕",
    chapter: 9,
    sub: 904,
    problem: "营销推广困难",
    solution: "与社区超市合作，推出买50元蛋糕卡送40元超市购物卡活动。对顾客：花50元得90元价值极具吸引力。对超市：免费卖出40元购物卡锁定客户无需成本，合作意愿强。10天内与200家社区超市达成合作。50元蛋糕成本约10元，40元超市卡由超市承担，蛋糕店不亏不赚。通过蛋糕卡获取200个销售渠道和大量会员，为后续销售高利润蛋糕产品打下基础。",
    effectData: "10天打入200多个渠道，品牌知名度迅速提升",
    keyPoints: ["买50元蛋糕卡送40元超市购物卡", "超市零成本锁定客户愿意合作", "蛋糕成本10元前端不亏不赚", "200个渠道支撑后端高利润产品"],
    steps: ["设计买50元蛋糕卡送40元超市卡合作方案", "超市零成本获客愿意合作", "10天快速签约200家社区超市", "蛋糕卡铺入超市获取大量会员", "后端高利润蛋糕产品持续销售"]
  },
  {
    _id: "case_g66",
    title: "连锁超市免费送车扭亏为盈",
    industry: "零售",
    chapter: 9,
    sub: 904,
    problem: "竞争压力大",
    solution: "通过餐饮协会联系大饭店、酒店，推出充值3万送10万汽车活动。3万元分10个月使用，每月限用3000元，锁定客户长期采购。推行创业合伙制，员工交押金成为股东享受80%分红，解决员工积极性问题并回笼70万现金。大客户充值和员工押金带来大量现金流，大客户每月采购额远超3000元，超额利润足以支付汽车月供。员工成为合伙人后仓储物流成本下降60%。",
    effectData: "各分店实现盈利，成功扭亏为盈",
    keyPoints: ["B端大客户充值3万送车", "3万分10月使用锁定长期采购", "员工合伙制回笼70万现金", "合伙人模式成本降60%"],
    steps: ["通过餐饮协会联系大饭店酒店", "推充值3万分10月使用送汽车", "内部推合伙制员工交押金成股东", "回笼现金+锁定大客户采购", "各分店实现盈利扭亏为盈"]
  },
  {
    _id: "case_g67",
    title: "KTV一招锁定80%顾客办卡",
    industry: "餐饮",
    chapter: 9,
    sub: 902,
    problem: "老客户流失",
    solution: "针对未办卡新客户，结账时告知：只需加58元办卡，当天消费即可打8折，打折金额直接充值到卡内下次可抵用。例如消费1000元加58元办卡，立减200元，实付858元，卡内余额200元。58元门槛极低且当场享受优惠，顾客感觉占了便宜办卡率极高。卡内有余额顾客下次首选本店，带来持续利润。即使顾客不来，商家也只赚58元办卡费无实际成本。",
    effectData: "80%新顾客办理会员卡，有效锁定客户",
    keyPoints: ["加58元办卡当天打8折", "打折金额直接充卡内", "低门槛当场享优惠转化率高", "卡内余额锁定回头消费"],
    steps: ["结账时推加58元办卡当天打8折", "打折金额直接充值到卡内", "58元低门槛+当场优惠促高转化", "卡内余额锁定下次消费", "办卡率达80%锁定大量会员"]
  },
  {
    _id: "case_g68",
    title: "米线店投入5000元6个月赚600万",
    industry: "餐饮",
    chapter: 9,
    sub: 905,
    problem: "营销推广困难",
    solution: "在店内张贴海报谁想月入3-10万，每月1-15日老板分享赚钱秘诀，亏钱全额补贴。将加盟费从1.5万涨到5万，但提供全方位扶持（选址、装修、运营）。承诺6个月内亏损全额退还5万加盟费，并每月补贴5000元。在店内直接吸引认可产品的精准创业者，通过严格审核加盟商选址将失败率控制在20%以内。即使赔偿，总收入仍远高于传统模式。",
    effectData: "6个月发展120家加盟商，收款600万",
    keyPoints: ["店内海报精准引流创业者", "加盟费提至5万但配全方位扶持", "0风险承诺增强信任", "严格审核控制失败率在20%"],
    steps: ["店内张贴海报吸引创业者关注", "加盟费5万配选址装修运营扶持", "承诺6个月亏损全额退还+月补5000", "严格审核加盟商控制风险", "6个月发展120家收款600万"]
  },
  {
    _id: "case_g69",
    title: "女鞋店年销从100万到2000万",
    industry: "零售",
    chapter: 9,
    sub: 904,
    problem: "营销推广困难",
    solution: "线下用免费领网红袜鱼饵吸引顾客进店并收集客户信息。将鞋子与袜子搭配展示，播放穿搭视频刺激购买欲。买鞋送12双袜子每月领一双，锁定顾客一年12次进店机会。推返利卡消费返5%现金，余额贴卡上提醒消费。与电商学校合作免费授课，为学员提供货源发展35家淘宝C店。通过每月领袜子保持高频互动，利用学员闲散时间零成本扩张线上渠道。",
    effectData: "开3家连锁店，线上合作30多学员，年销2000万",
    keyPoints: ["免费领袜引流+信息收集", "买鞋送12双锁一年12次进店", "5%现金返利卡促复购", "电商学员零成本扩张线上渠道"],
    steps: ["线下免费领网红袜引流收集客户信息", "鞋袜搭配展示+穿搭视频促成交", "买鞋送12双袜子每月领1双锁一年", "返利卡5%现金返还促持续消费", "与电商学校合作发展35家C店扩张"]
  },
  {
    _id: "case_g70",
    title: "水果店免费领水果3天收款70万",
    industry: "水果生鲜",
    chapter: 9,
    sub: 901,
    problem: "没有客流",
    solution: "开业3天每天免费领一斤水果引流。3天累计消费满99元送价值189元夏凉被。同行3人免费领一桶洗衣液裂变。推99元月会员卡享会员价，再送半年洗衣液、夏凉被、定制雨伞。免费水果、夏凉被、洗衣液均通过批量采购将成本压至极低。通过多次赠送增加与顾客接触机会培养消费习惯。99元会员费基本覆盖所有赠品成本，后续消费均为纯利。",
    effectData: "3天充值收款超70万，锁定大量会员",
    keyPoints: ["免费领水果3天引流", "累计消费满99送夏凉被", "同行3人领洗衣液裂变", "99元会员卡覆盖赠品成本"],
    steps: ["开业3天每天免费领一斤水果引流", "累计消费满99元送189元夏凉被", "同行3人免费领一桶洗衣液", "推99元月会员卡送半年赠品", "3天充值收款超70万"]
  },
  {
    _id: "case_g71",
    title: "装修公司物业费全返15天收款200万",
    industry: "其他",
    chapter: 9,
    sub: 901,
    problem: "没有客流",
    solution: "与物业公司合作解决物业费收缴难痛点。业主交第一年物业费（约1500元），装修公司100%返还。业主只需缴纳3000元成为会员，即可享受全额返还1500元物业费、获得价值2130元净水机+760元滤芯+1.8万设计服务+1300元地砖吊顶+2380元车载加湿器。通过低价高值的会员方案锁定客户，后续转化整屋装修（平均一单利润2万）。",
    effectData: "15天签单20位客户，收款200万元",
    keyPoints: ["异业联盟物业解决收物业费难", "3000元会员费全返物业费+豪华礼包", "买客户思维不成交也不亏", "后端转化整屋装修利润2万/单"],
    steps: ["与物业公司合作解决收缴物业费痛点", "推3000元会员费全返物业费+5重豪礼", "礼品渠道采购成本极低覆盖有余利", "锁定客户转化整屋装修大单", "15天签20单收200万"]
  },
  {
    _id: "case_g72",
    title: "大学城鞋店预存200元月销翻7倍",
    industry: "零售",
    chapter: 9,
    sub: 904,
    problem: "没有客流、老客户流失",
    solution: "凭学生证进店免费送价值10元袜子（成本2元），每天限300双。顾客选购后收银员告知预存200元办会员卡，这双鞋打5折。预存200元可直接划扣鞋款，以后消费享9折新款优先通知。学生在校4年每年买2双鞋，第一双不赚钱锁定后续7双高额利润。每送出1元成本袜子可带来18元收入。",
    effectData: "月营业额从5万增长到35万，提高7倍",
    keyPoints: ["2元袜子做引流诱饵", "预存200元办卡享5折当次", "锁定大学4年14双鞋消费", "投入产出比1:18高回报"],
    steps: ["凭学生证进店免费送10元袜子（成本2元）", "顾客选购后推预存200元办卡享5折", "预存款直接划扣+后续9折+新款通知", "锁定学生大学4年持续消费", "月营业额翻7倍达35万"]
  },
  {
    _id: "case_g73",
    title: "教育机构99元辅导寒假作业招7000学员",
    industry: "其他",
    chapter: 9,
    sub: 901,
    problem: "没有客流、营销推广困难",
    solution: "推出99元7天寒假作业辅导（市场价每天100-200元），刚需且价值感强。原价699元邀请6个朋友砍价至99元，利用家长朋友圈裂变。通过四把锁锁客：服务锁（用心辅导建立情感）、优惠锁（辅导结束推年卡优惠）、资格锁（99元锁定3个月优惠资格）、跟进锁（3个月持续跟进）。辅导老师由入驻机构提供无需支付工资，99元为纯利。",
    effectData: "20天招收7000名付费学员",
    keyPoints: ["99元寒假辅导刚需高价值", "6人砍价裂变传播", "服务+优惠+资格+跟进四把锁", "老师由入驻机构提供零成本"],
    steps: ["推出99元7天寒假作业辅导刚需产品", "设6人砍价至99元裂变传播", "四把锁（服务+优惠+资格+跟进）锁客", "辅导老师由入驻机构提供零成本", "20天招7000学员机构抢着入驻"]
  },
  {
    _id: "case_g74",
    title: "库存鞋房地产抽奖10天清货赚12万",
    industry: "零售",
    chapter: 9,
    sub: 901,
    problem: "没有客流、营销推广困难",
    solution: "与50家高档商家（美容院、餐厅）合作，将鞋子作为其客户抽奖礼品，每家收取100元宣传费共5000元覆盖印刷成本。与房地产商合作，房地产商赞助12万元。中奖者需到房地产售楼处领取鞋子并留下联系方式。第三方买单：房地产商为获取2000-3000个高端客户线索愿意支付12万。商家获促销礼品、房地产获客流、库存鞋变现三方共赢。",
    effectData: "10天处理2000双鞋，净赚12万元",
    keyPoints: ["50家商家合作收宣传费覆盖印刷", "房地产商赞助12万获取高端线索", "中奖者到售楼处留资", "三方共赢快速清货变现"],
    steps: ["找50家高档商家合作收宣传费", "房地产商赞助12万获取高端客户线索", "中奖者到售楼处领鞋+留联系方式", "三方合作实现快速清货", "10天处理2000双赚12万"]
  },
  {
    _id: "case_g75",
    title: "水饺店9.9元吃一月抢洗碗机",
    industry: "餐饮",
    chapter: 9,
    sub: 902,
    problem: "老客户流失",
    solution: "支付9.9元参与刮奖100%中奖：头奖价值2999元洗碗机（收500元授权费净赚200元）、锦鲤奖免费吃1个月水饺（每天1份仅限白菜肉馅需搭配收费配菜）、幸运奖免费吃1周水饺。后端通过免费水饺带动高毛利配菜和酒水销售。未中大奖顾客可付19元买10张5元抵扣卡锁定10次消费。推299元年卡送20次免费水饺+洗碗机+啤酒。",
    effectData: "成功转化大量年卡会员，建立稳定回头客群体",
    keyPoints: ["9.9元刮奖100%中奖高吸引力", "免费水饺限白菜馅带高毛利配菜", "19元买抵扣卡锁定10次消费", "299元年卡锁全年消费"],
    steps: ["推9.9元刮奖100%中奖活动", "头奖洗碗机收500元授权费", "免费水饺限白菜馅带动配菜消费", "未中奖推19元抵扣卡锁10次到店", "推299元年卡锁全年消费"]
  },
  {
    _id: "case_g76",
    title: "红酒订货20万送30万宝马招募经销商",
    industry: "其他",
    chapter: 9,
    sub: 905,
    problem: "营销推广困难",
    solution: "订货20万红酒送价值30万宝马3系一辆，包年赚40万。红酒成本10万（利润50%），宝马首付6.3万（车价21万30%首付），经销商交20万除去成本16.3万净赚3.7万。宝马月供由经销商后续每月拿货利润支付（每月最低拿货1万）。指导经销商通过买酒送加油卡/礼品模式每月发展17个合作商。快速回笼资金，锁定经销商3年进货渠道。",
    effectData: "3天活动订货55位，收款1100万元",
    keyPoints: ["订20万送30万宝马超级主张", "首付6.3万+月供由拿货利润支付", "每月最低拿货1万锁定3年", "指导经销商发展17个合作商/月"],
    steps: ["推订20万红酒送30万宝马3系", "红酒成本10万+宝马首付6.3万", "月供由经销商拿货利润支付", "指导经销商买酒送加油卡发展客户", "3天订货55位收1100万"]
  },
  {
    _id: "case_g77",
    title: "快餐店3元吃15元盒饭日销1000份",
    industry: "餐饮",
    chapter: 9,
    sub: 901,
    problem: "没有客流",
    solution: "在写字楼派发PVC卡片，3元享原价15元快餐（免费送餐）。送餐时推销15元买5张3元餐券，明天可免费吃一顿以后订餐当现金用。充值39元送55瓶品牌饮料（每次订餐送一瓶）。饮料由厂家提供作为市场推广资源成本极低（约2元/瓶），相当于打八五折。90%以上顾客会购买餐券锁定后续消费。",
    effectData: "迅速占领周边市场，成为快餐龙头",
    keyPoints: ["3元吃15元盒饭低门槛引流", "15元买5张餐券锁定5次消费", "39元送55瓶饮料高频带低频", "饮料厂家提供零成本推广资源"],
    steps: ["写字楼派发3元吃15元快餐卡", "送餐时推15元买5张3元餐券", "推39元送55瓶饮料高频锁客", "饮料厂家提供零成本推广支持", "90%转化率迅速占领市场"]
  },
  {
    _id: "case_g78",
    title: "火锅店收押金送家电15天回笼75万",
    industry: "餐饮",
    chapter: 9,
    sub: 904,
    problem: "竞争压力大、没有客流",
    solution: "9.9元吃99元火锅套餐（含羊肉、蔬菜、沙拉），转发朋友圈送啤酒。交599元押金送599元电饭煲+59元消费卡，交1999元押金送1999元电动车+红酒+200元消费卡。押金分12个月返还或抵扣消费（抵扣更多）。充值500元送锅底、羊肉、亲友卡等。低价套餐带动酒水加菜消费，押金模式快速回笼50多万资金。",
    effectData: "15天回笼资金75万，锁定800多位会员",
    keyPoints: ["9.9元套餐低门槛引流", "599/1999押金送家电锁定消费", "押金分12月返还或抵扣", "低价套餐带动酒水加菜"],
    steps: ["推9.9元吃99元火锅套餐引流", "交599押金送电饭煲+59消费卡", "交1999押金送电动车+200消费卡", "押金分12月返还抵扣更多", "15天回笼75万锁定800会员"]
  },
  {
    _id: "case_g79",
    title: "超市1元抢3斤鸡蛋7天拓客8000人",
    industry: "零售",
    chapter: 9,
    sub: 901,
    problem: "没有客流、竞争压力大",
    solution: "转发朋友圈集赞，1元抢购3斤草鸡蛋（限1000斤）。故意放慢发鸡蛋速度制造长队营造火爆氛围，刺激店内冲动消费。预存500元得500元购物卡，再送烤羊腿、头疗卡、足疗卡、面粉等总价值超千元礼品。头疗足疗卡为0成本异业置换，利用鸡蛋吸引大爷大妈（高频）转化为超市购物（低频高利）。",
    effectData: "7天吸引8000人，充值3200名会员，收款160万",
    keyPoints: ["1元抢3斤鸡蛋吸引老年人", "排队营销营造火爆氛围", "预存500元送超千元大礼包", "鸡蛋高频带超市低频高毛利"],
    steps: ["转发朋友圈集赞1元抢3斤鸡蛋", "排队营销营造火爆氛围", "预存500元得500卡+千元豪礼", "头疗足疗卡异业0成本置换", "7天拓客8000人收160万"]
  },
  {
    _id: "case_g80",
    title: "桶装水订2000元送2000元电动车",
    industry: "其他",
    chapter: 9,
    sub: 902,
    problem: "老客户流失",
    solution: "订2000元桶装水送2000元电动车。水不一次送完分月配送（每月2桶），送水费另算，额外订水享7折优惠。电动车批发价1000元，2000元水成本800元，利润覆盖车成本后仍有盈余。通过分月送水锁定客户长期只喝自家水，送水费和额外购水产生持续利润，提前回笼大量资金。",
    effectData: "10天送出198台电动车，收款39.6万",
    keyPoints: ["订2000元水送2000元电动车", "水分月配送锁定长期消费", "送水费+额外购水持续盈利", "电动车批发价1000元压低成本"],
    steps: ["推订2000元桶装水送2000元电动车", "水分月配送（每月2桶）", "送水费另算+额外购水7折", "电动车批发价1000元控制成本", "10天送出198台收款39.6万"]
  },
  {
    _id: "case_g81",
    title: "饭店免费吃炒鸡15天锁客3200人",
    industry: "餐饮",
    chapter: 9,
    sub: 904,
    problem: "竞争压力大、没有客流",
    solution: "在周边3公里美发、美甲、超市等异业店铺投放卡片，邀请3位好友同行免费吃价值158元特色光棍鸡。结账时加5元办会员卡并转发朋友圈，再送每人一张光棍鸡券和20瓶啤酒，员工获得全部5元办卡费推广积极性高。推充1000得1000送5000返1000送100瓶啤酒。4人同行免费鸡成本59元，其他消费利润75元净赚16元。",
    effectData: "15天充值3200多名顾客，收款320万元",
    keyPoints: ["异业投卡邀3人同行免费吃鸡", "5元办卡费全给员工激积极性", "充1000送5000大礼包锁客", "4人同行其他消费覆盖免费鸡成本"],
    steps: ["周边异业店铺投卡邀3人免费吃鸡", "加5元办卡费全给员工激积极性", "推充1000得1000送5000大礼包", "鸡券送朋友朋友充值返100元", "15天锁客3200人收320万"]
  },
  {
    _id: "case_g82",
    title: "手机店20元会员卡锁定顾客利润翻番",
    industry: "零售",
    chapter: 9,
    sub: 902,
    problem: "老客户流失",
    solution: "向过去两年老客户推出20元办会员，一年半内回购手机可抵500元。旧手机市场价约100元但抵扣500元看似亏400元，拆解旧手机配件在深圳市场售卖价值远超100元弥补亏损。与联通/电信合作每卖一张电话卡提成100元+用户一年话费提成。向会员以10元低价销售成本5元的手机壳、耳机等配件。通过产业链整合实现利润翻番。",
    effectData: "成功锁定大量老客户，利润翻番",
    keyPoints: ["20元会员一年半回购抵500元", "旧机拆解配件售卖补亏损", "运营商合作卖卡提成为盈利点", "配件低价销售锁持续消费"],
    steps: ["推20元会员一年半回购抵500元", "旧机拆解配件售卖超100元补亏", "与运营商合作卖卡提成100元/张", "会员10元买手机壳耳机配件", "产业链整合利润翻番"]
  },
  {
    _id: "case_g83",
    title: "蛋糕店免费送蛋糕月收十万现金",
    industry: "烘焙蛋糕",
    chapter: 9,
    sub: 905,
    problem: "没有客流、营销推广困难",
    solution: "与企业合作免费向月薪3000以上女性白领派送价值3.5元早餐蛋糕，首批5000个。将蛋糕盒6个面作为广告位，以1500元/个卖给5个商家，收回7500元覆盖蛋糕和派送成本后还盈利。蛋糕盒上印制二维码引导用户关注公众号，通过每日签到免费领蛋糕活动收集用户信息建立私域流量池。前端卖广告位不亏反赚，后端线上平台精准促销生日蛋糕等高利润产品。",
    effectData: "不花广告费精准触达，月收现金超十万",
    keyPoints: ["免费派送5000个蛋糕精准触达白领", "蛋糕盒6面广告位卖7500元", "二维码引流+签到活动建私域", "前端盈利后端高利润产品变现"],
    steps: ["与企业合作派5000个蛋糕给白领", "蛋糕盒广告位卖1500元/个收回成本", "印二维码引导关注公众号签到", "收集用户建私域流量池", "后端精准促销生日蛋糕等产品"]
  },
  {
    _id: "case_g84",
    title: "美容店裂变异业一周拓客1000人",
    industry: "美容美甲",
    chapter: 9,
    sub: 901,
    problem: "没有客流",
    solution: "推出29元抢购价值1980元礼包，含网红黄金美容棒（280元）、店内项目6次（690元）、全店通用代金券（1010元）。设置二级裂变机制：一级返2元，二级返7元激励用户发展下线病毒式传播。与周边理发店、瑜伽馆合作赠送美甲VIP充值卡（78元），为对方引流同时导入精准客户。到店通过体验项目建立信任引导升级高价值会员。",
    effectData: "一周在线支付1200人，到店近1000人，月营收近百万",
    keyPoints: ["29元购1980元礼包高价值感", "一级2元二级7元二级裂变机制", "异业合作送美甲卡精准获客", "到店体验转化高价值会员"],
    steps: ["推29元购1980元礼包活动", "设二级裂变返现激励传播", "与理发店瑜伽馆异业合作获客", "到店体验建立信任", "转化高价值会员实现盈利"]
  },
  {
    _id: "case_g85",
    title: "德州扒鸡10天收款100万堂食充卡",
    industry: "餐饮",
    chapter: 9,
    sub: 904,
    problem: "老客户流失",
    solution: "推出5人进店免费送价值158元德州扒鸡一份，吸引白领群体。通过销售鸡汤（成本1元卖10元）、收取撕鸡手工费（5元）、搭配炒菜（加20元送原价40元炒菜）覆盖免费扒鸡成本并盈利。推充2000送10只扒鸡+1600元礼品+150瓶啤酒。礼品通过家电采购平台由品牌方免费提供作为引流产品。前端免费扒鸡通过高毛利汤和配菜盈利，后端充卡啤酒多次到店带动其他菜品。",
    effectData: "10天收款超100万元，转型为高利润堂食店",
    keyPoints: ["5人进店免费送扒鸡引流", "鸡汤1元成本卖10元高毛利", "充2000送10只扒鸡+1600元礼品", "啤酒多次到店带动其他消费"],
    steps: ["推5人进店免费送158元扒鸡引流", "鸡汤+手工费+配菜覆盖成本盈利", "推充2000送10只扒鸡+千元礼品", "礼品品牌方免费提供0成本", "10天收100万转型堂食店"]
  }
],

// ============================================================
// 6. 工具（10条）
// ============================================================
tools: [
  {
    _id: "tool_001",
    name: "客流追踪表",
    category: "客流管理",
    type: "表格模板",
    description: "每日记录各时段进店人数、客户来源渠道和转化情况，用于分析客流规律和引流效果"
  },
  {
    _id: "tool_002",
    name: "陈列规划模板",
    category: "门店运营",
    type: "表格模板",
    description: "按区域规划陈列方案，包括主推品、关联陈列、动线引导，提升驻足率和连带率"
  },
  {
    _id: "tool_003",
    name: "内容日历模板",
    category: "营销推广",
    type: "表格模板",
    description: "月度内容发布规划，包括平台、内容主题、发布时间、素材准备，确保内容持续输出"
  },
  {
    _id: "tool_004",
    name: "客户分层管理表",
    category: "客户管理",
    type: "表格模板",
    description: "按消费频次和金额将客户分为3-5级，制定各级别差异化运营策略"
  },
  {
    _id: "tool_005",
    name: "经营数据仪表盘",
    category: "经营分析",
    type: "表格模板",
    description: "核心经营指标追踪表，包括营收、客流、客单价、复购率、利润率等关键指标"
  },
  {
    _id: "tool_006",
    name: "成本管控追踪表",
    category: "成本管理",
    type: "表格模板",
    description: "各项成本记录和目标对比表，包括食材/进货、人工、房租、能耗等，设置超支预警"
  },
  {
    _id: "tool_007",
    name: "产品生命周期表",
    category: "产品管理",
    type: "表格模板",
    description: "追踪各产品销量趋势和生命周期阶段，标记衰退品和新品表现，指导产品迭代"
  },
  {
    _id: "tool_008",
    name: "员工培训与考核表",
    category: "人员管理",
    type: "表格模板",
    description: "新员工培训计划和考核记录，包括培训内容、考核标准、上岗评定等"
  },
  {
    _id: "tool_009",
    name: "绩效考核方案模板",
    category: "人员管理",
    type: "文档模板",
    description: "包含考核指标设定、评分标准、提成方案和绩效面谈流程的完整模板"
  },
  {
    _id: "tool_010",
    name: "营销活动策划模板",
    category: "营销推广",
    type: "文档模板",
    description: "活动策划全流程模板，包含目标设定、方案设计、执行清单、预算分配和效果评估"
  },
  {
    _id: "tool_011",
    name: "抖音探店脚本模板",
    category: "营销",
    type: "Word模板",
    description: "探店短视频脚本编写指南，含开场话术、产品展示、引导到店三段式结构"
  },
  {
    _id: "tool_012",
    name: "社群团购发布话术模板",
    category: "营销",
    type: "Word模板",
    description: "微信群团购文案模板，包含预热话术、开团公告、催单话术和售后跟进"
  },
  {
    _id: "tool_013",
    name: "员工排班与考勤优化表",
    category: "管理",
    type: "Excel模板",
    description: "按客流峰谷智能排班，含时段客流权重、工时统计和加班预警"
  },
  {
    _id: "tool_014",
    name: "新员工7天带教检查清单",
    category: "管理",
    type: "检查清单",
    description: "新员工首周每日带教任务清单，含业务学习、实操考核和师徒签字确认"
  },
  {
    _id: "tool_015",
    name: "月度损益分析表",
    category: "财务",
    type: "Excel模板",
    description: "按科目归集月度收支，自动计算毛利率和净利率，同比环比一目了然"
  },
  {
    _id: "tool_016",
    name: "现金流水周报模板",
    category: "财务",
    type: "Excel模板",
    description: "按周记录现金收支明细，含日均流水、异常波动标记和周趋势折线图"
  },
  {
    _id: "tool_017",
    name: "客户生命周期追踪表",
    category: "客户",
    type: "Excel模板",
    description: "按客户记录首次到店、消费频次、最近消费和流失预警，辅助分层运营"
  },
  {
    _id: "tool_018",
    name: "会员权益设计对比表",
    category: "客户",
    type: "Excel模板",
    description: "3-5级会员权益对比，含折扣、赠品、专属服务设计，测算各级别投入产出比"
  },
  {
    _id: "tool_019",
    name: "门店日常巡检操作指南",
    category: "运营",
    type: "操作指南",
    description: "开店前/营业中/打烊后三阶段巡检要点，含卫生、陈列、设备、安全四大模块"
  },
  {
    _id: "tool_020",
    name: "爆款产品孵化流程图",
    category: "运营",
    type: "PPT模板",
    description: "从选品测试到全面推广的6步孵化流程，含选品标准、试销指标和放量决策节点"
  }
]

};
