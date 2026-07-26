/**
 * 种子数据 - 从 biz-data.js 自动转换生成
 * 生成时间: 2026-07-25T16:04:07.733Z
 * 数据统计: problems=8, symptoms=43, diagnosisPaths=100, solutions=100, cases=30, tools=20, tags=15, adminUsers=1
 */

const problems = [
  {
    "_id": "prob_001",
    "name": "没有客流",
    "code": "TRAFFIC_LOW",
    "icon": "🚶",
    "color": "#FF6D00",
    "description": "门店进店人数持续偏低，门前冷清，缺乏自然流量和主动引流手段",
    "sortOrder": 1,
    "diagnosisCount": 0,
    "status": 1
  },
  {
    "_id": "prob_002",
    "name": "营业额下降",
    "code": "REVENUE_DROP",
    "icon": "📉",
    "color": "#EF4444",
    "description": "整体营收持续走低，同比环比均出现下滑趋势，经营压力加大",
    "sortOrder": 2,
    "diagnosisCount": 0,
    "status": 1
  },
  {
    "_id": "prob_003",
    "name": "利润太低",
    "code": "PROFIT_LOW",
    "icon": "💰",
    "color": "#F59E0B",
    "description": "虽然有一定营业额，但扣除成本后利润微薄，甚至亏损经营",
    "sortOrder": 3,
    "diagnosisCount": 0,
    "status": 1
  },
  {
    "_id": "prob_004",
    "name": "产品卖不动",
    "code": "PRODUCT_SLOW",
    "icon": "🏷️",
    "color": "#8B5CF6",
    "description": "核心产品动销慢、库存积压，新品推广困难，产品缺乏市场竞争力",
    "sortOrder": 4,
    "diagnosisCount": 0,
    "status": 1
  },
  {
    "_id": "prob_005",
    "name": "老客户流失",
    "code": "CUSTOMER_LOSS",
    "icon": "💔",
    "color": "#EC4899",
    "description": "复购率持续走低，老客户不再回头，客户生命周期缩短",
    "sortOrder": 5,
    "diagnosisCount": 0,
    "status": 1
  },
  {
    "_id": "prob_006",
    "name": "员工管理困难",
    "code": "STAFF_HARD",
    "icon": "👷",
    "color": "#F97316",
    "description": "招人难、留人难、员工积极性差，团队执行力不足影响经营",
    "sortOrder": 6,
    "diagnosisCount": 0,
    "status": 1
  },
  {
    "_id": "prob_007",
    "name": "营销推广困难",
    "code": "MARKETING_HARD",
    "icon": "📢",
    "color": "#14B8A6",
    "description": "不懂营销、不会推广，投了钱没效果，线上运营无从下手",
    "sortOrder": 7,
    "diagnosisCount": 0,
    "status": 1
  },
  {
    "_id": "prob_008",
    "name": "竞争压力大",
    "code": "COMPETITION",
    "icon": "⚔️",
    "color": "#6366F1",
    "description": "周边竞品林立，同质化严重，价格战激烈，差异化优势不明显",
    "sortOrder": 8,
    "diagnosisCount": 0,
    "status": 1
  }
]

const symptoms = [
  {
    "_id": "sym_t01",
    "name": "工作日进店不足20人",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期",
      "老店"
    ],
    "problemCode": "TRAFFIC_LOW",
    "status": 1
  },
  {
    "_id": "sym_t02",
    "name": "门店周边500米内无明显客流来源",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "TRAFFIC_LOW",
    "status": 1
  },
  {
    "_id": "sym_t03",
    "name": "路过人群不进店，驻足率低",
    "industryFilter": [
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期",
      "老店"
    ],
    "problemCode": "TRAFFIC_LOW",
    "status": 1
  },
  {
    "_id": "sym_t04",
    "name": "线上引流到店转化率低于5%",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "TRAFFIC_LOW",
    "status": 1
  },
  {
    "_id": "sym_t05",
    "name": "门前有流量但门头无吸引力",
    "industryFilter": [
      "餐饮",
      "零售"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "TRAFFIC_LOW",
    "status": 1
  },
  {
    "_id": "sym_t06",
    "name": "周末与工作日客流无明显差异",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "老店"
    ],
    "problemCode": "TRAFFIC_LOW",
    "status": 1
  },
  {
    "_id": "sym_r01",
    "name": "月营收连续3个月环比下降",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "REVENUE_DROP",
    "status": 1
  },
  {
    "_id": "sym_r02",
    "name": "客单价同比下降超过15%",
    "industryFilter": [
      "餐饮",
      "零售"
    ],
    "stageFilter": [
      "老店"
    ],
    "problemCode": "REVENUE_DROP",
    "status": 1
  },
  {
    "_id": "sym_r03",
    "name": "高峰时段营收占比降低",
    "industryFilter": [
      "餐饮",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "REVENUE_DROP",
    "status": 1
  },
  {
    "_id": "sym_r04",
    "name": "促销活动效果越来越差",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "REVENUE_DROP",
    "status": 1
  },
  {
    "_id": "sym_r05",
    "name": "新品/新服务贡献营收占比不足10%",
    "industryFilter": [
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "REVENUE_DROP",
    "status": 1
  },
  {
    "_id": "sym_p01",
    "name": "毛利率低于行业平均水平",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期",
      "老店"
    ],
    "problemCode": "PROFIT_LOW",
    "status": 1
  },
  {
    "_id": "sym_p02",
    "name": "房租占营收比超过25%",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "PROFIT_LOW",
    "status": 1
  },
  {
    "_id": "sym_p03",
    "name": "食材/进货成本持续上涨",
    "industryFilter": [
      "餐饮",
      "零售"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "PROFIT_LOW",
    "status": 1
  },
  {
    "_id": "sym_p04",
    "name": "人工成本占比超过35%",
    "industryFilter": [
      "餐饮",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "PROFIT_LOW",
    "status": 1
  },
  {
    "_id": "sym_p05",
    "name": "月净利润为负或低于营收5%",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期",
      "老店"
    ],
    "problemCode": "PROFIT_LOW",
    "status": 1
  },
  {
    "_id": "sym_s01",
    "name": "核心单品月销量持续下滑",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "PRODUCT_SLOW",
    "status": 1
  },
  {
    "_id": "sym_s02",
    "name": "新品上市后一个月动销率不足30%",
    "industryFilter": [
      "餐饮",
      "零售"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "PRODUCT_SLOW",
    "status": 1
  },
  {
    "_id": "sym_s03",
    "name": "库存周转天数超过行业均值2倍",
    "industryFilter": [
      "零售"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "PRODUCT_SLOW",
    "status": 1
  },
  {
    "_id": "sym_s04",
    "name": "客户反馈产品缺乏新意",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "老店"
    ],
    "problemCode": "PRODUCT_SLOW",
    "status": 1
  },
  {
    "_id": "sym_s05",
    "name": "主推产品复购率低于15%",
    "industryFilter": [
      "餐饮",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "PRODUCT_SLOW",
    "status": 1
  },
  {
    "_id": "sym_s06",
    "name": "产品结构单一，缺乏利润款",
    "industryFilter": [
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "PRODUCT_SLOW",
    "status": 1
  },
  {
    "_id": "sym_c01",
    "name": "月复购率低于20%",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "CUSTOMER_LOSS",
    "status": 1
  },
  {
    "_id": "sym_c02",
    "name": "会员活跃度逐月下降",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "CUSTOMER_LOSS",
    "status": 1
  },
  {
    "_id": "sym_c03",
    "name": "无客户回访和关怀机制",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "CUSTOMER_LOSS",
    "status": 1
  },
  {
    "_id": "sym_c04",
    "name": "客户转介绍率几乎为零",
    "industryFilter": [
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "CUSTOMER_LOSS",
    "status": 1
  },
  {
    "_id": "sym_c05",
    "name": "差评和投诉处理不及时",
    "industryFilter": [
      "餐饮",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "CUSTOMER_LOSS",
    "status": 1
  },
  {
    "_id": "sym_h01",
    "name": "员工月流失率超过15%",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期",
      "老店"
    ],
    "problemCode": "STAFF_HARD",
    "status": 1
  },
  {
    "_id": "sym_h02",
    "name": "新员工培训周期超过2周仍无法独立上岗",
    "industryFilter": [
      "餐饮",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "STAFF_HARD",
    "status": 1
  },
  {
    "_id": "sym_h03",
    "name": "员工服务态度投诉频发",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "STAFF_HARD",
    "status": 1
  },
  {
    "_id": "sym_h04",
    "name": "无明确绩效考核和激励制度",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "STAFF_HARD",
    "status": 1
  },
  {
    "_id": "sym_h05",
    "name": "核心岗位依赖单一员工",
    "industryFilter": [
      "餐饮",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "STAFF_HARD",
    "status": 1
  },
  {
    "_id": "sym_m01",
    "name": "从未做过线上营销推广",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "MARKETING_HARD",
    "status": 1
  },
  {
    "_id": "sym_m02",
    "name": "投放过广告但ROI低于1:2",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "MARKETING_HARD",
    "status": 1
  },
  {
    "_id": "sym_m03",
    "name": "公众号/抖音号粉丝不足500",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "MARKETING_HARD",
    "status": 1
  },
  {
    "_id": "sym_m04",
    "name": "不知道如何策划促销活动",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "MARKETING_HARD",
    "status": 1
  },
  {
    "_id": "sym_m05",
    "name": "口碑传播完全依赖自然发生",
    "industryFilter": [
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期",
      "老店"
    ],
    "problemCode": "MARKETING_HARD",
    "status": 1
  },
  {
    "_id": "sym_m06",
    "name": "缺少可复制的获客渠道",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "MARKETING_HARD",
    "status": 1
  },
  {
    "_id": "sym_x01",
    "name": "1公里内同类型商家超过5家",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期",
      "老店"
    ],
    "problemCode": "COMPETITION",
    "status": 1
  },
  {
    "_id": "sym_x02",
    "name": "主要竞品价格比自己低20%以上",
    "industryFilter": [
      "餐饮",
      "零售"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "COMPETITION",
    "status": 1
  },
  {
    "_id": "sym_x03",
    "name": "客户经常拿竞品做对比后离开",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "成长期",
      "老店"
    ],
    "problemCode": "COMPETITION",
    "status": 1
  },
  {
    "_id": "sym_x04",
    "name": "缺乏差异化卖点，客户记不住你",
    "industryFilter": [
      "餐饮",
      "零售",
      "服务业"
    ],
    "stageFilter": [
      "新店",
      "成长期"
    ],
    "problemCode": "COMPETITION",
    "status": 1
  },
  {
    "_id": "sym_x05",
    "name": "竞品有品牌连锁优势，自己单店无力抗衡",
    "industryFilter": [
      "餐饮",
      "零售"
    ],
    "stageFilter": [
      "老店"
    ],
    "problemCode": "COMPETITION",
    "status": 1
  }
]

const diagnosisPaths = [
  {
    "problemCode": "TRAFFIC_LOW",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_t01",
      "sym_t02",
      "sym_t05"
    ],
    "judgment": "你的餐饮门店属于客流不足型问题，核心原因是引流能力不足，门头吸引力和线上曝光均需加强",
    "severity": 72,
    "causes": [
      {
        "name": "门头辨识度低",
        "weight": 35,
        "judgment": "路人3秒内能否看出你卖什么？门头是否清晰展示品类和招牌菜？",
        "description": "门头信息模糊、缺乏品类标识，路过的潜在顾客无法快速识别"
      },
      {
        "name": "线上曝光不足",
        "weight": 30,
        "judgment": "大众点评和抖音上能搜到你的店吗？月均有多少线上曝光量？",
        "description": "在本地生活平台缺少店铺信息和内容运营，线上引流几乎为零"
      },
      {
        "name": "缺乏引流品策略",
        "weight": 20,
        "judgment": "有没有一款低价高感知的引流产品吸引新客？",
        "description": "没有设计专门吸引新客的引流品，缺少'诱饵'拉动首次进店"
      },
      {
        "name": "周边社区渗透不够",
        "weight": 15,
        "judgment": "周边3公里内的居民知道你的店吗？做过社区推广吗？",
        "description": "没有覆盖周边社区的宣传动作，社区客群未激活"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_003",
      "sol_012"
    ],
    "todayTasks": [
      {
        "task": "拍摄门店外观照片，检查门头是否能在3秒内传达品类",
        "duration": "30分钟",
        "purpose": "诊断门头吸引力"
      },
      {
        "task": "在大众点评完善店铺信息，上传10张门店和菜品照片",
        "duration": "1小时",
        "purpose": "建立线上基础曝光"
      },
      {
        "task": "设计一款引流菜品（成本<8元，感知价值>25元）",
        "duration": "1小时",
        "purpose": "打造进店诱饵"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "门头优化日",
        "tasks": [
          "更换或增加门头品类横幅",
          "门口放置招牌菜立牌",
          "确保灯光晚间足够亮"
        ]
      },
      {
        "day": 2,
        "title": "线上铺设日",
        "tasks": [
          "大众点评认领门店",
          "上传高质量门店及菜品照片",
          "开通抖音来客门店"
        ]
      },
      {
        "day": 3,
        "title": "引流品上线日",
        "tasks": [
          "确定引流品并定价",
          "制作引流品宣传物料",
          "员工话术培训"
        ]
      },
      {
        "day": 4,
        "title": "社区推广日",
        "tasks": [
          "设计周边社区传单",
          "与物业沟通公告栏投放",
          "加入周边业主群"
        ]
      },
      {
        "day": 5,
        "title": "试营业引流日",
        "tasks": [
          "引流品限时推出",
          "引导首批顾客好评",
          "收集顾客反馈"
        ]
      },
      {
        "day": 6,
        "title": "内容生产日",
        "tasks": [
          "拍摄3条短视频素材",
          "发布1条探店视频",
          "回复线上所有评价"
        ]
      },
      {
        "day": 7,
        "title": "复盘调整日",
        "tasks": [
          "统计本周新增到店人数",
          "分析引流品转化率",
          "调整下周引流策略"
        ]
      }
    ],
    "longTermAdvice": [
      "建立持续的内容运营节奏，每周至少2条短视频+1次线上活动",
      "每季度更新一次引流品，保持新鲜感同时测试市场偏好",
      "与周边3公里内的异业商家建立互推联盟"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_003"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "TRAFFIC_LOW",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_t01",
      "sym_t03",
      "sym_t05"
    ],
    "judgment": "你的零售门店属于客流不足型问题，核心原因是进店动线受阻和缺乏驻足理由，需要优化橱窗和引流机制",
    "severity": 68,
    "causes": [
      {
        "name": "橱窗无吸引力",
        "weight": 35,
        "judgment": "橱窗是否展示了当季最吸引人的商品？是否定期更换？",
        "description": "橱窗陈列单调、无季节变化，路人没有驻足和进店的冲动"
      },
      {
        "name": "缺少引流活动",
        "weight": 25,
        "judgment": "有没有定期举办到店活动或限时优惠？",
        "description": "缺少主动制造进店理由的活动策划"
      },
      {
        "name": "门店位置偏僻",
        "weight": 25,
        "judgment": "门店是否在动线死角？是否有引导标识？",
        "description": "店铺位置不佳且缺乏导视指引，顾客难以发现"
      },
      {
        "name": "线上到店链路缺失",
        "weight": 15,
        "judgment": "顾客在线上看到你的产品能方便到店购买吗？",
        "description": "没有建立线上种草到线下体验的完整链路"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_005",
      "sol_013"
    ],
    "todayTasks": [
      {
        "task": "重新布置橱窗陈列，突出当季爆款或新品",
        "duration": "1小时",
        "purpose": "提升橱窗吸引力"
      },
      {
        "task": "设计一个到店引流活动（如满减、体验课）",
        "duration": "45分钟",
        "purpose": "制造进店理由"
      },
      {
        "task": "检查门店周边导视标识是否完善",
        "duration": "30分钟",
        "purpose": "改善可达性"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "橱窗焕新日",
        "tasks": [
          "更换橱窗主推商品",
          "增加灯光和色彩层次",
          "设置价格标签和卖点卡"
        ]
      },
      {
        "day": 2,
        "title": "引流活动策划日",
        "tasks": [
          "确定本周引流活动方案",
          "制作活动物料",
          "员工培训活动话术"
        ]
      },
      {
        "day": 3,
        "title": "导视优化日",
        "tasks": [
          "在路口设置指引立牌",
          "在电梯口贴楼层导引",
          "店门口增加活动告示"
        ]
      },
      {
        "day": 4,
        "title": "社群启动日",
        "tasks": [
          "建立门店粉丝群",
          "设计加群话术和福利",
          "首批种子用户入群"
        ]
      },
      {
        "day": 5,
        "title": "引流活动执行日",
        "tasks": [
          "执行首个引流活动",
          "引导顾客加群关注",
          "收集活动反馈"
        ]
      },
      {
        "day": 6,
        "title": "线上内容日",
        "tasks": [
          "拍摄橱窗和活动内容",
          "发布小红书/抖音种草",
          "同步到社群预热"
        ]
      },
      {
        "day": 7,
        "title": "数据复盘日",
        "tasks": [
          "统计本周到店客流变化",
          "分析活动ROI",
          "制定下周优化计划"
        ]
      }
    ],
    "longTermAdvice": [
      "每月至少策划2次主题到店活动，形成顾客期待",
      "建立橱窗月度更换机制，保持视觉新鲜度",
      "打通线上种草→到店体验→社群留存的闭环"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_001",
      "tool_002"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "TRAFFIC_LOW",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_t01",
      "sym_t02",
      "sym_t03"
    ],
    "judgment": "你的服务门店属于客流不足型问题，核心原因是信任壁垒高和体验展示不足，需要加强口碑传播和体验入口",
    "severity": 70,
    "causes": [
      {
        "name": "服务体验不可见",
        "weight": 35,
        "judgment": "顾客路过能看到你的服务过程和效果吗？",
        "description": "服务类门店天然存在体验不可见的问题，路人不了解服务质量"
      },
      {
        "name": "口碑传播薄弱",
        "weight": 25,
        "judgment": "现有客户中有多少会主动推荐你？有推荐奖励吗？",
        "description": "缺少口碑裂变机制，老客户没有推荐动力和工具"
      },
      {
        "name": "首单门槛过高",
        "weight": 25,
        "judgment": "新客户第一次体验的决策门槛高吗？有体验价吗？",
        "description": "服务定价和体验门槛高，新客户不敢轻易尝试"
      },
      {
        "name": "线上案例展示不足",
        "weight": 15,
        "judgment": "线上能找到你的服务案例和效果对比吗？",
        "description": "缺少线上案例展示，潜在客户无法远程评估服务品质"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_006",
      "sol_012"
    ],
    "todayTasks": [
      {
        "task": "设计一个新客体验套餐（正常价3-5折）",
        "duration": "45分钟",
        "purpose": "降低首单门槛"
      },
      {
        "task": "整理3个客户服务前后对比案例",
        "duration": "1小时",
        "purpose": "建立服务可视化素材"
      },
      {
        "task": "制定老客户推荐奖励方案",
        "duration": "30分钟",
        "purpose": "启动口碑裂变"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "体验入口设计日",
        "tasks": [
          "确定体验套餐内容和定价",
          "制作体验卡物料",
          "设计体验流程话术"
        ]
      },
      {
        "day": 2,
        "title": "案例素材日",
        "tasks": [
          "拍摄服务过程视频",
          "整理服务前后对比图",
          "撰写客户好评文案"
        ]
      },
      {
        "day": 3,
        "title": "线上铺设日",
        "tasks": [
          "案例发布到大众点评",
          "开通抖音/小红书账号",
          "发布首批3条案例内容"
        ]
      },
      {
        "day": 4,
        "title": "推荐体系启动日",
        "tasks": [
          "设计推荐奖励规则",
          "制作推荐卡",
          "向现有客户发布推荐计划"
        ]
      },
      {
        "day": 5,
        "title": "异业合作日",
        "tasks": [
          "联系2-3家周边互补商家",
          "商讨互推合作方案",
          "确定首批合作方式"
        ]
      },
      {
        "day": 6,
        "title": "体验活动首日",
        "tasks": [
          "接待首批体验客户",
          "收集体验反馈",
          "引导好评和推荐"
        ]
      },
      {
        "day": 7,
        "title": "复盘优化日",
        "tasks": [
          "统计体验客户到店数",
          "分析转化和推荐数据",
          "优化体验流程"
        ]
      }
    ],
    "longTermAdvice": [
      "持续积累服务案例，每周至少新增2个线上案例展示",
      "建立客户推荐体系，让每个满意客户成为你的推广员",
      "与周边互补型商家形成异业联盟，共享客源"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_001",
      "tool_004"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "REVENUE_DROP",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_r01",
      "sym_r02",
      "sym_r04"
    ],
    "judgment": "你的餐饮门店属于营收下滑型问题，核心原因是客单价下降和促销依赖，需要优化产品结构和提升客单价",
    "severity": 75,
    "causes": [
      {
        "name": "客单价持续走低",
        "weight": 35,
        "judgment": "人均消费额同比是上升还是下降？是否过度依赖低价引流？",
        "description": "长期低价促销导致客户价格敏感，客单价持续下滑"
      },
      {
        "name": "菜单结构不合理",
        "weight": 25,
        "judgment": "菜单中利润款占比多少？有组合套餐提升客单吗？",
        "description": "菜单缺少利润款和组合套餐设计，无法有效拉升消费"
      },
      {
        "name": "高峰产能不足",
        "weight": 20,
        "judgment": "午晚高峰翻台率是多少？有没有翻台瓶颈？",
        "description": "高峰期服务效率低、翻台慢，错失营收高峰"
      },
      {
        "name": "外卖渠道未有效利用",
        "weight": 20,
        "judgment": "外卖营收占比多少？外卖利润率如何？",
        "description": "外卖渠道未系统运营，缺少增量收入来源"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_007",
      "sol_014"
    ],
    "todayTasks": [
      {
        "task": "调出近3个月客单价数据，分析下降趋势",
        "duration": "30分钟",
        "purpose": "明确客单价问题"
      },
      {
        "task": "设计2-3个提升客单价的组合套餐",
        "duration": "1小时",
        "purpose": "拉升消费金额"
      },
      {
        "task": "检查外卖平台店铺状态和评分",
        "duration": "30分钟",
        "purpose": "评估外卖渠道潜力"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "数据分析日",
        "tasks": [
          "分析客单价变化趋势",
          "拆解各品类营收贡献",
          "找出营收下滑关键品类"
        ]
      },
      {
        "day": 2,
        "title": "菜单优化日",
        "tasks": [
          "标注利润款和引流款",
          "设计2-3个组合套餐",
          "重新排版菜单突出高毛利品"
        ]
      },
      {
        "day": 3,
        "title": "套餐上线日",
        "tasks": [
          "确定套餐定价和内容",
          "培训员工推套餐话术",
          "收银系统设置套餐"
        ]
      },
      {
        "day": 4,
        "title": "外卖优化日",
        "tasks": [
          "优化外卖店铺装修",
          "调整外卖菜品结构和定价",
          "设置满减和配送策略"
        ]
      },
      {
        "day": 5,
        "title": "效率提升日",
        "tasks": [
          "优化出餐流程",
          "减少点餐到出餐时间",
          "高峰期人员排班调整"
        ]
      },
      {
        "day": 6,
        "title": "话术培训日",
        "tasks": [
          "培训员工推荐套餐话术",
          "培训加购推荐话术",
          "模拟演练和考核"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计套餐销售数据",
          "分析客单价变化",
          "评估外卖增量效果"
        ]
      }
    ],
    "longTermAdvice": [
      "每季度更新一次菜单，淘汰低动销品，增加利润款",
      "建立外卖+堂食双轮驱动营收模型，外卖占比目标30%以上",
      "通过会员储值锁定客户消费，稳定营收现金流"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_005"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "REVENUE_DROP",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_r01",
      "sym_r02",
      "sym_r05"
    ],
    "judgment": "你的零售门店属于营收下滑型问题，核心原因是品类老化和连带率低，需要优化选品和提升连带销售",
    "severity": 73,
    "causes": [
      {
        "name": "品类结构老化",
        "weight": 30,
        "judgment": "过去半年有没有引进新品类？爆款品类占比多少？",
        "description": "产品结构长期不变，缺少新爆款拉动，客户购买意愿降低"
      },
      {
        "name": "连带率偏低",
        "weight": 30,
        "judgment": "平均客单包含几件商品？有做关联陈列吗？",
        "description": "商品陈列和推荐缺乏关联性，客户只买目标商品就离开"
      },
      {
        "name": "会员贡献率低",
        "weight": 20,
        "judgment": "会员消费占总营收多少？会员客单价是否明显高于非会员？",
        "description": "会员体系未发挥作用，会员与非会员消费差异不大"
      },
      {
        "name": "季节性波动大",
        "weight": 20,
        "judgment": "淡季营收是否比旺季低50%以上？有淡季经营策略吗？",
        "description": "缺少淡季经营对策，营收波动剧烈"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_008",
      "sol_015"
    ],
    "todayTasks": [
      {
        "task": "统计各品类近3个月销售排名，找出下滑品类",
        "duration": "45分钟",
        "purpose": "诊断品类问题"
      },
      {
        "task": "设计3组关联陈列方案",
        "duration": "1小时",
        "purpose": "提升连带率"
      },
      {
        "task": "分析会员消费数据，计算会员贡献率",
        "duration": "30分钟",
        "purpose": "评估会员价值"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "品类诊断日",
        "tasks": [
          "完成品类销售排名分析",
          "标记下滑品类和增长品类",
          "制定品类汰换计划"
        ]
      },
      {
        "day": 2,
        "title": "选品更新日",
        "tasks": [
          "联系供应商了解新品",
          "确定引进新品清单",
          "规划新品上架排期"
        ]
      },
      {
        "day": 3,
        "title": "陈列优化日",
        "tasks": [
          "实施关联陈列方案",
          "增加场景化展示区",
          "优化动线引导"
        ]
      },
      {
        "day": 4,
        "title": "会员体系优化日",
        "tasks": [
          "梳理现有会员权益",
          "设计会员专享价格和活动",
          "制定会员激活计划"
        ]
      },
      {
        "day": 5,
        "title": "淡季策略日",
        "tasks": [
          "分析淡旺季规律",
          "设计淡季引流方案",
          "规划淡季促销日历"
        ]
      },
      {
        "day": 6,
        "title": "员工培训日",
        "tasks": [
          "培训连带推荐话术",
          "培训会员转化话术",
          "演练和考核"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "检查陈列优化效果",
          "统计会员转化数据",
          "调整下周执行方案"
        ]
      }
    ],
    "longTermAdvice": [
      "建立月度品类复盘机制，淘汰后20%品类，持续引入新品",
      "通过场景化陈列和连带推荐将连带率提升至2.0以上",
      "深化会员运营，目标会员贡献率达到60%以上"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "REVENUE_DROP",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_r01",
      "sym_r03",
      "sym_r05"
    ],
    "judgment": "你的服务门店属于营收下滑型问题，核心原因是服务项目单一和客户生命周期短，需要丰富服务层次和延长客户价值",
    "severity": 71,
    "causes": [
      {
        "name": "服务项目单一",
        "weight": 35,
        "judgment": "客户到店消费的项目选择有几种？是否只有1-2个主力项目？",
        "description": "服务项目有限，客户选择少，无法满足多样化需求"
      },
      {
        "name": "客户生命周期短",
        "weight": 25,
        "judgment": "客户平均消费几次后流失？有升级和续费设计吗？",
        "description": "缺少服务递进和续费机制，客户消费1-2次后不再回来"
      },
      {
        "name": "定价策略不当",
        "weight": 25,
        "judgment": "服务定价是否与目标客户匹配？有没有阶梯定价？",
        "description": "定价缺乏层次感，没有覆盖不同消费能力的客户群"
      },
      {
        "name": "时段利用率低",
        "weight": 15,
        "judgment": "非高峰时段闲置率多高？有闲时优惠吗？",
        "description": "服务时段利用不均衡，非高峰时段大量产能闲置"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_008",
      "sol_014"
    ],
    "todayTasks": [
      {
        "task": "列出所有服务项目和营收贡献占比",
        "duration": "30分钟",
        "purpose": "诊断服务结构"
      },
      {
        "task": "设计1-2个增值服务或升级套餐",
        "duration": "1小时",
        "purpose": "丰富服务层次"
      },
      {
        "task": "制定非高峰时段的优惠方案",
        "duration": "30分钟",
        "purpose": "提升时段利用率"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "服务审计日",
        "tasks": [
          "梳理所有服务项目",
          "分析各项目营收和利润贡献",
          "找出明星和瘦狗项目"
        ]
      },
      {
        "day": 2,
        "title": "服务升级设计日",
        "tasks": [
          "设计基础-进阶-尊享服务阶梯",
          "制定升级套餐内容和定价",
          "设计服务升级话术"
        ]
      },
      {
        "day": 3,
        "title": "定价优化日",
        "tasks": [
          "制定阶梯定价方案",
          "设计闲时优惠策略",
          "更新价格公示"
        ]
      },
      {
        "day": 4,
        "title": "会员体系优化日",
        "tasks": [
          "设计储值卡分级方案",
          "制定会员专属服务权益",
          "建立会员到期提醒机制"
        ]
      },
      {
        "day": 5,
        "title": "闲时引流启动日",
        "tasks": [
          "上线闲时优惠方案",
          "社群发布闲时特惠",
          "联系老客户预约闲时服务"
        ]
      },
      {
        "day": 6,
        "title": "员工培训日",
        "tasks": [
          "培训服务升级推荐话术",
          "培训会员转化话术",
          "情景模拟演练"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计新套餐销售情况",
          "分析闲时利用率变化",
          "评估会员转化效果"
        ]
      }
    ],
    "longTermAdvice": [
      "建立基础-进阶-尊享三级服务体系，让客户有持续升级空间",
      "通过储值卡锁定客户长期消费，目标储值客户占比40%以上",
      "利用闲时产能开展体验活动或异业合作，最大化时段利用率"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_005"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "PROFIT_LOW",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_p01",
      "sym_p03",
      "sym_p04"
    ],
    "judgment": "你的餐饮门店属于利润薄弱型问题，核心原因是成本结构失衡和定价策略不足，需要精细化成本管控和优化毛利",
    "severity": 78,
    "causes": [
      {
        "name": "食材成本过高",
        "weight": 35,
        "judgment": "食材成本占营收比例是否超过35%？有没有定期比价和供应商评估？",
        "description": "食材采购缺少比价机制，成本占比过高侵蚀利润"
      },
      {
        "name": "定价策略缺失",
        "weight": 25,
        "judgment": "菜品定价是拍脑袋还是有毛利测算？招牌菜毛利是否达到65%+？",
        "description": "菜品定价缺乏科学依据，部分菜品毛利过低拉低整体利润"
      },
      {
        "name": "损耗和浪费严重",
        "weight": 25,
        "judgment": "食材损耗率是多少？是否有过量采购导致的浪费？",
        "description": "采购和备菜缺乏精确预估，导致大量食材损耗"
      },
      {
        "name": "人工效率低",
        "weight": 15,
        "judgment": "人效（人均产出）是否低于行业均值？有无冗余岗位？",
        "description": "人员配置不合理，部分时段人员闲置但高峰期不够用"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_010",
      "sol_016"
    ],
    "todayTasks": [
      {
        "task": "统计上周食材成本占营收比例，标记超35%的品类",
        "duration": "45分钟",
        "purpose": "找出成本漏洞"
      },
      {
        "task": "计算招牌菜和引流菜的毛利，识别低毛利菜品",
        "duration": "30分钟",
        "purpose": "诊断定价问题"
      },
      {
        "task": "记录一天的食材损耗情况",
        "duration": "全天观察",
        "purpose": "量化损耗程度"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "成本审计日",
        "tasks": [
          "完成食材成本占比分析",
          "列出低毛利菜品清单",
          "统计食材损耗数据"
        ]
      },
      {
        "day": 2,
        "title": "供应商优化日",
        "tasks": [
          "联系3家以上供应商比价",
          "评估供应商性价比",
          "制定采购优化方案"
        ]
      },
      {
        "day": 3,
        "title": "定价调整日",
        "tasks": [
          "调整低毛利菜品定价或配方",
          "确保招牌菜毛利≥65%",
          "设计高毛利新品"
        ]
      },
      {
        "day": 4,
        "title": "损耗管控日",
        "tasks": [
          "建立每日采购预估机制",
          "制定备菜标准份量",
          "设置损耗记录表"
        ]
      },
      {
        "day": 5,
        "title": "人效优化日",
        "tasks": [
          "分析各时段人效数据",
          "优化排班减少闲置",
          "明确岗位工作标准"
        ]
      },
      {
        "day": 6,
        "title": "流程标准化日",
        "tasks": [
          "制定核心菜品SOP",
          "规范出菜份量和摆盘",
          "培训执行并检查"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算本周毛利变化",
          "评估成本优化效果",
          "制定下月成本目标"
        ]
      }
    ],
    "longTermAdvice": [
      "建立月度成本复盘机制，食材成本占比控制在30%以内",
      "持续优化菜品结构，确保60%以上菜品毛利达到60%+",
      "引入数字化进销存系统，实现采购-库存-损耗全链路管理"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "PROFIT_LOW",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_p01",
      "sym_p02",
      "sym_p03"
    ],
    "judgment": "你的零售门店属于利润薄弱型问题，核心原因是进货成本高和毛利结构差，需要优化供应链和调整品类毛利",
    "severity": 76,
    "causes": [
      {
        "name": "进货渠道单一",
        "weight": 30,
        "judgment": "主要进货渠道有几个？是否过度依赖单一供应商？",
        "description": "进货渠道有限，缺少议价能力，采购成本偏高"
      },
      {
        "name": "低毛利品类占比过高",
        "weight": 30,
        "judgment": "毛利率低于20%的品类占多大比例？高毛利品类占比多少？",
        "description": "产品结构中低毛利品类占比过大，拖累整体利润"
      },
      {
        "name": "库存积压严重",
        "weight": 25,
        "judgment": "库存周转天数是多少？滞销品占库存金额多少比例？",
        "description": "大量资金被滞销品占用，形成隐性成本损失"
      },
      {
        "name": "房租等固定成本过高",
        "weight": 15,
        "judgment": "房租占营收比例超过20%吗？有没有考虑空间利用优化？",
        "description": "固定成本占比过高，营收增长时利润弹性不足"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_010",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "统计各品类毛利率，标记低于20%的品类",
        "duration": "45分钟",
        "purpose": "诊断毛利结构"
      },
      {
        "task": "盘点滞销品库存金额占比",
        "duration": "30分钟",
        "purpose": "量化库存积压"
      },
      {
        "task": "联系2家新供应商询价对比",
        "duration": "1小时",
        "purpose": "探索降本空间"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "毛利分析日",
        "tasks": [
          "完成品类毛利排名",
          "标记低毛利和高毛利品类",
          "制定品类毛利优化目标"
        ]
      },
      {
        "day": 2,
        "title": "渠道拓展日",
        "tasks": [
          "联系3家以上新供应商",
          "进行价格和品质对比",
          "确定优化采购方案"
        ]
      },
      {
        "day": 3,
        "title": "滞销品处理日",
        "tasks": [
          "制定滞销品清仓方案",
          "启动清仓促销",
          "释放库存资金"
        ]
      },
      {
        "day": 4,
        "title": "品类调整日",
        "tasks": [
          "压缩低毛利品类占比",
          "增加高毛利品类选品",
          "调整陈列面积分配"
        ]
      },
      {
        "day": 5,
        "title": "自有品牌探索日",
        "tasks": [
          "调研自有品牌可行性",
          "联系代工厂了解起订量",
          "评估自有品牌毛利空间"
        ]
      },
      {
        "day": 6,
        "title": "空间优化日",
        "tasks": [
          "分析门店各区域坪效",
          "优化低效区域利用",
          "考虑分租或联营可能性"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计本周毛利变化",
          "评估库存周转改善",
          "调整下月采购计划"
        ]
      }
    ],
    "longTermAdvice": [
      "逐步引入自有品牌或独家代理，目标高毛利品类占比50%以上",
      "建立季度供应商评估和比价机制，持续优化采购成本",
      "推行精细化库存管理，库存周转天数控制在45天以内"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "PROFIT_LOW",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_p01",
      "sym_p04",
      "sym_p05"
    ],
    "judgment": "你的服务门店属于利润薄弱型问题，核心原因是人工成本过高和服务溢价不足，需要提升人效和服务附加值",
    "severity": 74,
    "causes": [
      {
        "name": "人工成本占比过高",
        "weight": 35,
        "judgment": "人工成本占营收比例是否超过40%？技术人员利用率和产出如何？",
        "description": "服务行业人力密集，人工成本占比过高严重压缩利润空间"
      },
      {
        "name": "服务溢价不足",
        "weight": 30,
        "judgment": "你的服务定价是否有品牌溢价？客户是否觉得物超所值？",
        "description": "服务缺少品牌感和附加值支撑，只能靠低价竞争"
      },
      {
        "name": "技师/员工效率低",
        "weight": 20,
        "judgment": "员工有效服务时间占比多少？空等时间多长？",
        "description": "员工有效工时占比较低，大量时间处于待工状态"
      },
      {
        "name": "耗材成本失控",
        "weight": 15,
        "judgment": "服务耗材是否有标准用量？实际用量和标准用量差异多大？",
        "description": "服务耗材缺少用量标准，浪费和损耗严重"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_010",
      "sol_018"
    ],
    "todayTasks": [
      {
        "task": "计算人工成本占营收比例和人均产出",
        "duration": "30分钟",
        "purpose": "诊断人效问题"
      },
      {
        "task": "梳理服务流程中的增值点，设计2个加价选项",
        "duration": "1小时",
        "purpose": "提升服务溢价"
      },
      {
        "task": "制定核心耗材标准用量表",
        "duration": "30分钟",
        "purpose": "管控耗材成本"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "人效分析日",
        "tasks": [
          "统计各员工有效服务时长",
          "计算人均日产出",
          "找出人效瓶颈点"
        ]
      },
      {
        "day": 2,
        "title": "排班优化日",
        "tasks": [
          "根据客流曲线调整排班",
          "减少空等时段人力浪费",
          "引入弹性排班机制"
        ]
      },
      {
        "day": 3,
        "title": "服务增值日",
        "tasks": [
          "设计服务升级选项",
          "制定增值服务定价",
          "培训员工增值推荐话术"
        ]
      },
      {
        "day": 4,
        "title": "耗材管控日",
        "tasks": [
          "制定耗材标准用量",
          "建立领用登记制度",
          "设置用量异常预警"
        ]
      },
      {
        "day": 5,
        "title": "品牌提升日",
        "tasks": [
          "优化服务环境和细节",
          "增加客户感知到的品质感",
          "打造服务仪式感"
        ]
      },
      {
        "day": 6,
        "title": "绩效优化日",
        "tasks": [
          "设计人效考核指标",
          "制定超额产出奖励方案",
          "公布新绩效方案"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计人工成本占比变化",
          "评估增值服务转化率",
          "计算耗材节约金额"
        ]
      }
    ],
    "longTermAdvice": [
      "通过服务品牌化和差异化实现溢价，目标毛利率65%以上",
      "持续优化排班和流程，人工成本占比控制在35%以内",
      "建立技术人才培养体系，提升服务质量和客户黏性"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "PRODUCT_SLOW",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_s01",
      "sym_s02",
      "sym_s05"
    ],
    "judgment": "你的餐饮门店属于产品动销缓慢型问题，核心原因是产品缺乏竞争力和菜品结构不合理，需要打造爆款和优化菜单",
    "severity": 70,
    "causes": [
      {
        "name": "缺少招牌爆款",
        "weight": 35,
        "judgment": "有没有一道让客户专门为你而来的招牌菜？该菜销量占总营收多少？",
        "description": "菜品缺少记忆点和差异化，没有形成'必点'招牌菜"
      },
      {
        "name": "菜品结构臃肿",
        "weight": 25,
        "judgment": "菜单上有多少道菜？有多少道月销不足10份？",
        "description": "菜单菜品过多，增加备菜难度和损耗，分散客户注意力"
      },
      {
        "name": "新品研发滞后",
        "weight": 25,
        "judgment": "多久没有推出新品了？新品上市有没有做市场测试？",
        "description": "缺少新品研发节奏，客户消费疲劳，回头率降低"
      },
      {
        "name": "菜品呈现缺乏吸引力",
        "weight": 15,
        "judgment": "菜品摆盘和出品能激发客户拍照分享吗？",
        "description": "菜品出品缺乏颜值和仪式感，缺少自发传播点"
      }
    ],
    "solutionIds": [
      "sol_003",
      "sol_004",
      "sol_019"
    ],
    "todayTasks": [
      {
        "task": "统计各菜品月销量，标记月销不足10份的菜品",
        "duration": "45分钟",
        "purpose": "识别滞销菜品"
      },
      {
        "task": "确定1道招牌菜打造计划",
        "duration": "1小时",
        "purpose": "聚焦爆款打造"
      },
      {
        "task": "收集最近3个月客户菜品评价和反馈",
        "duration": "30分钟",
        "purpose": "了解客户偏好"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "菜品诊断日",
        "tasks": [
          "完成菜品销量排名",
          "标记淘汰候选菜品",
          "确定保留和优化菜品"
        ]
      },
      {
        "day": 2,
        "title": "爆款打造日",
        "tasks": [
          "确定招牌菜品类和定位",
          "优化招牌菜配方和出品",
          "设计招牌菜专属器皿和摆盘"
        ]
      },
      {
        "day": 3,
        "title": "菜单精简日",
        "tasks": [
          "淘汰月销<10份的菜品",
          "精简菜单至30-40道",
          "重新设计菜单排版逻辑"
        ]
      },
      {
        "day": 4,
        "title": "新品研发日",
        "tasks": [
          "研发1-2道应季新品",
          "内部品鉴和调整",
          "确定新品定价和上市计划"
        ]
      },
      {
        "day": 5,
        "title": "出品升级日",
        "tasks": [
          "优化核心菜品摆盘",
          "增加出品仪式感",
          "培训出品标准"
        ]
      },
      {
        "day": 6,
        "title": "新品测试日",
        "tasks": [
          "邀请老客户免费试吃新品",
          "收集反馈意见",
          "确定最终版本"
        ]
      },
      {
        "day": 7,
        "title": "上新推广日",
        "tasks": [
          "新菜单正式上线",
          "线上发布新品内容",
          "门店推广招牌菜和新品"
        ]
      }
    ],
    "longTermAdvice": [
      "每季度推出2-3道新品，淘汰低动销品，保持菜单活力",
      "打造1-2道区域必吃招牌菜，形成品类认知和口碑效应",
      "注重菜品颜值和仪式感，激发客户自发分享传播"
    ],
    "caseIds": [
      "case_006"
    ],
    "toolIds": [
      "tool_003",
      "tool_007"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "PRODUCT_SLOW",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_s01",
      "sym_s03",
      "sym_s06"
    ],
    "judgment": "你的零售门店属于产品动销缓慢型问题，核心原因是选品偏差和库存结构不合理，需要优化选品策略和加速周转",
    "severity": 72,
    "causes": [
      {
        "name": "选品脱离市场需求",
        "weight": 35,
        "judgment": "选品是基于个人喜好还是数据驱动？有没有定期分析客户购买偏好？",
        "description": "选品凭感觉而非数据，导致大量产品不符合当地客户需求"
      },
      {
        "name": "库存结构不合理",
        "weight": 30,
        "judgment": "畅销品是否经常断货？滞销品占库存金额多少？",
        "description": "畅销品补货不及时，滞销品大量积压，资金周转效率低"
      },
      {
        "name": "产品组合缺乏层次",
        "weight": 20,
        "judgment": "产品线有没有引流款、利润款、形象款的分层？",
        "description": "产品缺乏角色分工，既不引流也不赚钱"
      },
      {
        "name": "新品引进流程缓慢",
        "weight": 15,
        "judgment": "从发现趋势到产品上架需要多久？",
        "description": "缺少快速上新机制，错过市场热点和流行趋势"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_008",
      "sol_019"
    ],
    "todayTasks": [
      {
        "task": "标记库存周转超过60天的SKU",
        "duration": "45分钟",
        "purpose": "识别滞销品"
      },
      {
        "task": "分析近30天TOP20畅销品，检查库存充足率",
        "duration": "30分钟",
        "purpose": "确保畅销品不缺货"
      },
      {
        "task": "制定产品分层策略（引流/利润/形象）",
        "duration": "45分钟",
        "purpose": "优化产品结构"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "库存诊断日",
        "tasks": [
          "完成库存周转分析",
          "标记滞销品和断货风险品",
          "制定清仓和补货计划"
        ]
      },
      {
        "day": 2,
        "title": "选品优化日",
        "tasks": [
          "分析客户购买偏好数据",
          "确定下月新品引进清单",
          "淘汰后20%滞销品"
        ]
      },
      {
        "day": 3,
        "title": "产品分层日",
        "tasks": [
          "定义引流款/利润款/形象款",
          "调整各层产品占比",
          "优化陈列位置分配"
        ]
      },
      {
        "day": 4,
        "title": "供应链优化日",
        "tasks": [
          "与核心供应商谈判起订量和交期",
          "建立畅销品安全库存机制",
          "签订快速补货协议"
        ]
      },
      {
        "day": 5,
        "title": "新品引进日",
        "tasks": [
          "引进3-5款测试新品",
          "设置新品测试区域",
          "制定新品动销考核标准"
        ]
      },
      {
        "day": 6,
        "title": "清仓启动日",
        "tasks": [
          "启动滞销品清仓活动",
          "制定阶梯清仓策略",
          "释放库存资金"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计清仓回款金额",
          "分析新品首周动销",
          "调整产品结构计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立月度选品复盘机制，持续淘汰滞销品、引进新品",
      "优化库存结构，目标畅销品占比60%以上，周转天数<45天",
      "构建引流-利润-形象三层产品体系，各司其职"
    ],
    "caseIds": [
      "case_006"
    ],
    "toolIds": [
      "tool_002",
      "tool_007"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "PRODUCT_SLOW",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_s04",
      "sym_s05",
      "sym_s06"
    ],
    "judgment": "你的服务门店属于产品动销缓慢型问题，核心原因是服务项目老化和客户价值感知不足，需要创新服务和强化价值传递",
    "severity": 68,
    "causes": [
      {
        "name": "服务项目长期不变",
        "weight": 35,
        "judgment": "最近一次推出新服务是什么时候？现有服务项目多久没有更新？",
        "description": "服务项目一成不变，客户消费疲劳，缺乏新鲜感"
      },
      {
        "name": "价值传递不到位",
        "weight": 30,
        "judgment": "客户是否清楚了解你服务的价值？有没有服务前后的对比展示？",
        "description": "服务价值不直观，客户感知不到投入与产出的对应关系"
      },
      {
        "name": "服务同质化严重",
        "weight": 20,
        "judgment": "你的服务和竞品有什么不同？客户能说出差异吗？",
        "description": "服务内容和竞品高度雷同，缺少差异化特色"
      },
      {
        "name": "套餐设计不科学",
        "weight": 15,
        "judgment": "有没有设计不同价位的套餐？套餐组合是否有消费心理依据？",
        "description": "缺少科学的套餐设计，客户选择困难或只选最低价"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_008",
      "sol_019"
    ],
    "todayTasks": [
      {
        "task": "列出所有服务项目及近3月销售占比",
        "duration": "30分钟",
        "purpose": "诊断服务结构"
      },
      {
        "task": "设计1个差异化特色服务项目",
        "duration": "1小时",
        "purpose": "打造服务差异点"
      },
      {
        "task": "整理服务前后对比案例3个",
        "duration": "45分钟",
        "purpose": "建立价值可视化"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "服务审计日",
        "tasks": [
          "梳理所有服务项目",
          "分析各项目销售和利润贡献",
          "标记需要优化和淘汰的项目"
        ]
      },
      {
        "day": 2,
        "title": "差异服务设计日",
        "tasks": [
          "设计1个独家特色服务",
          "确定服务内容和流程",
          "设计差异化卖点"
        ]
      },
      {
        "day": 3,
        "title": "套餐优化日",
        "tasks": [
          "设计基础/进阶/尊享三级套餐",
          "用价格锚点优化套餐结构",
          "确保中间套餐最具吸引力"
        ]
      },
      {
        "day": 4,
        "title": "价值可视化日",
        "tasks": [
          "制作服务前后对比素材",
          "拍摄服务过程视频",
          "设计价值传达话术"
        ]
      },
      {
        "day": 5,
        "title": "新品内测日",
        "tasks": [
          "邀请3-5位老客户免费体验新服务",
          "收集体验反馈",
          "优化服务流程"
        ]
      },
      {
        "day": 6,
        "title": "员工培训日",
        "tasks": [
          "培训新服务操作流程",
          "培训价值传达话术",
          "培训套餐推荐技巧"
        ]
      },
      {
        "day": 7,
        "title": "新服务上线日",
        "tasks": [
          "新服务和套餐正式上线",
          "线上发布新服务内容",
          "老客户专享体验价推广"
        ]
      }
    ],
    "longTermAdvice": [
      "每季度推出1-2个新服务项目，保持客户新鲜感和消费动力",
      "持续积累服务效果案例，让服务价值可感知、可传播",
      "建立三级套餐体系，引导客户从基础到尊享逐步升级"
    ],
    "caseIds": [
      "case_006"
    ],
    "toolIds": [
      "tool_003",
      "tool_007"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "CUSTOMER_LOSS",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_c01",
      "sym_c02",
      "sym_c05"
    ],
    "judgment": "你的餐饮门店属于客户流失型问题，核心原因是缺少客户留存体系和体验一致性不足，需要建立客户经营机制",
    "severity": 73,
    "causes": [
      {
        "name": "无客户留存体系",
        "weight": 35,
        "judgment": "有没有会员系统？会员有什么特权？多久做一次客户回访？",
        "description": "缺少系统化的客户留存和运营机制，客户来不来全靠缘分"
      },
      {
        "name": "体验不一致",
        "weight": 25,
        "judgment": "不同时间来用餐，菜品口味和服务质量一致吗？",
        "description": "出品和服务质量波动大，客户无法形成稳定预期"
      },
      {
        "name": "差评处理不当",
        "weight": 25,
        "judgment": "收到差评后的处理流程是什么？平均响应时间多久？",
        "description": "差评处理不及时不到位，负面影响扩散并劝退潜在客户"
      },
      {
        "name": "缺少情感连接",
        "weight": 15,
        "judgment": "老板和服务员能叫出多少常客的名字和喜好？",
        "description": "与客户缺少情感互动，客户对门店没有归属感"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_011",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "查看近1个月所有差评，逐一分析原因",
        "duration": "45分钟",
        "purpose": "诊断流失原因"
      },
      {
        "task": "设计一个简单的会员权益方案",
        "duration": "1小时",
        "purpose": "启动留存体系"
      },
      {
        "task": "整理常客名单（月消费3次以上）",
        "duration": "30分钟",
        "purpose": "识别核心客户"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "流失诊断日",
        "tasks": [
          "分析近3月客户流失率",
          "梳理差评和投诉数据",
          "找出流失核心原因"
        ]
      },
      {
        "day": 2,
        "title": "体验标准化日",
        "tasks": [
          "制定核心菜品出品标准",
          "制定服务流程SOP",
          "设置出品检查点"
        ]
      },
      {
        "day": 3,
        "title": "会员体系日",
        "tasks": [
          "确定会员等级和权益",
          "选择会员管理工具",
          "设计入会引导流程"
        ]
      },
      {
        "day": 4,
        "title": "差评修复日",
        "tasks": [
          "回复所有未处理差评",
          "制定差评处理SOP",
          "设置差评预警通知"
        ]
      },
      {
        "day": 5,
        "title": "客户关怀日",
        "tasks": [
          "给TOP20常客发送专属关怀",
          "设计生日/节日关怀方案",
          "建立客户喜好记录"
        ]
      },
      {
        "day": 6,
        "title": "回访启动日",
        "tasks": [
          "制定流失客户回访计划",
          "设计回归优惠方案",
          "逐一联系高价值流失客户"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计会员入会转化率",
          "评估差评修复效果",
          "调整客户经营策略"
        ]
      }
    ],
    "longTermAdvice": [
      "建立分层客户经营体系，核心客户月度回访率100%",
      "确保出品和服务体验一致性，差评24小时内响应处理",
      "通过情感化运营让门店成为客户的'第三空间'"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_004",
      "tool_008"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "CUSTOMER_LOSS",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_c01",
      "sym_c02",
      "sym_c04"
    ],
    "judgment": "你的零售门店属于客户流失型问题，核心原因是缺少客户运营和差异化服务，需要建立会员深度运营体系",
    "severity": 71,
    "causes": [
      {
        "name": "会员运营薄弱",
        "weight": 35,
        "judgment": "会员活跃率多少？多久联系一次沉睡会员？",
        "description": "会员数据沉淀但未有效运营，大量会员变成沉睡状态"
      },
      {
        "name": "缺乏差异化服务",
        "weight": 25,
        "judgment": "会员和非会员的消费体验有区别吗？会员有专属权益吗？",
        "description": "缺少会员专属权益和服务，客户没有成为会员和续费的动力"
      },
      {
        "name": "转介绍率低",
        "weight": 25,
        "judgment": "有没有推荐奖励机制？客户推荐新客有什么好处？",
        "description": "缺少口碑裂变机制，老客户没有推荐动力"
      },
      {
        "name": "购买后无跟进",
        "weight": 15,
        "judgment": "客户购买后有没有使用指导或回访？",
        "description": "完成交易即结束，缺少售后关怀和使用指导"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_011",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "统计会员总数和活跃会员占比",
        "duration": "30分钟",
        "purpose": "诊断会员健康度"
      },
      {
        "task": "设计3个会员专属权益",
        "duration": "1小时",
        "purpose": "提升会员价值感"
      },
      {
        "task": "制定老客推荐奖励方案",
        "duration": "30分钟",
        "purpose": "启动口碑裂变"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "会员诊断日",
        "tasks": [
          "完成会员数据分析",
          "标记活跃/沉默/流失会员",
          "制定分层激活计划"
        ]
      },
      {
        "day": 2,
        "title": "权益升级日",
        "tasks": [
          "设计会员专属权益",
          "制定会员日活动方案",
          "更新会员卡和宣传物料"
        ]
      },
      {
        "day": 3,
        "title": "沉默激活日",
        "tasks": [
          "设计沉默会员召回方案",
          "发送专属回归优惠",
          "电话回访高价值沉默会员"
        ]
      },
      {
        "day": 4,
        "title": "转介绍启动日",
        "tasks": [
          "制定推荐奖励规则",
          "制作推荐码和海报",
          "向活跃会员发布推荐计划"
        ]
      },
      {
        "day": 5,
        "title": "售后关怀日",
        "tasks": [
          "回访近1周购买客户",
          "提供使用指导和建议",
          "收集产品使用反馈"
        ]
      },
      {
        "day": 6,
        "title": "会员活动日",
        "tasks": [
          "举办首次会员日活动",
          "推出会员专属优惠",
          "引导现场入会和续费"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计会员激活率",
          "评估推荐转化效果",
          "制定下月会员运营计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立月度会员运营日历，每月至少1次会员专属活动",
      "打造会员专属权益体系，让会员身份有真正的价值感",
      "通过转介绍机制实现口碑裂变，目标推荐新客占比20%以上"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_004",
      "tool_008"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "CUSTOMER_LOSS",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_c01",
      "sym_c03",
      "sym_c05"
    ],
    "judgment": "你的服务门店属于客户流失型问题，核心原因是缺少服务后跟进和客户关系维护，需要建立全周期客户经营",
    "severity": 72,
    "causes": [
      {
        "name": "服务后无跟进",
        "weight": 35,
        "judgment": "服务完成后多久联系客户？有没有效果跟踪和关怀？",
        "description": "服务完成后缺少后续跟进，客户感觉被忽视"
      },
      {
        "name": "无客户分级管理",
        "weight": 25,
        "judgment": "有没有区分高价值客户和普通客户？服务有差异化吗？",
        "description": "所有客户一视同仁，高价值客户没有获得应有重视"
      },
      {
        "name": "投诉处理不满意",
        "weight": 25,
        "judgment": "客户投诉后的处理满意度如何？有没有投诉转满意的案例？",
        "description": "投诉处理流程不完善，客户不满后直接流失"
      },
      {
        "name": "缺少持续消费理由",
        "weight": 15,
        "judgment": "客户有持续消费的计划或套餐吗？有消费周期提醒吗？",
        "description": "缺少引导客户持续消费的机制和理由"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_006",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "整理近3月流失客户名单和原因",
        "duration": "45分钟",
        "purpose": "诊断流失原因"
      },
      {
        "task": "设计服务后24小时关怀流程",
        "duration": "30分钟",
        "purpose": "建立服务后跟进"
      },
      {
        "task": "制定客户分级标准和对应服务策略",
        "duration": "45分钟",
        "purpose": "启动分级管理"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "流失分析日",
        "tasks": [
          "完成客户流失率统计",
          "分析流失原因分布",
          "标记可挽回客户"
        ]
      },
      {
        "day": 2,
        "title": "服务后流程日",
        "tasks": [
          "制定服务后跟进SOP",
          "设计24h/3天/7天回访节奏",
          "准备回访话术模板"
        ]
      },
      {
        "day": 3,
        "title": "分级管理日",
        "tasks": [
          "制定客户分级标准",
          "设计各级别差异化服务",
          "培训员工识别和应对策略"
        ]
      },
      {
        "day": 4,
        "title": "投诉修复日",
        "tasks": [
          "制定投诉处理SOP",
          "逐一联系未满意客户",
          "提供补偿和回归方案"
        ]
      },
      {
        "day": 5,
        "title": "持续消费设计日",
        "tasks": [
          "设计消费周期提醒",
          "制定续费和升级优惠",
          "建立自动提醒机制"
        ]
      },
      {
        "day": 6,
        "title": "挽回行动日",
        "tasks": [
          "联系可挽回流失客户",
          "提供专属回归方案",
          "记录挽回情况"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计流失率变化",
          "评估挽回成功率",
          "优化客户经营体系"
        ]
      }
    ],
    "longTermAdvice": [
      "建立服务后24h/3天/7天三级回访机制，确保客户满意度",
      "实施客户分级管理，核心客户月度个性化关怀不低于1次",
      "设计持续消费计划，引导客户从单次消费转为周期消费"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_004",
      "tool_008"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "STAFF_HARD",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_h01",
      "sym_h02",
      "sym_h03"
    ],
    "judgment": "你的餐饮门店属于员工管理困难型问题，核心原因是培训体系和激励机制缺失，需要标准化管理和绩效改革",
    "severity": 69,
    "causes": [
      {
        "name": "培训体系缺失",
        "weight": 35,
        "judgment": "新员工有标准培训流程吗？多久能独立上岗？",
        "description": "缺少系统化培训，新员工靠老带新，上手慢、出错多"
      },
      {
        "name": "薪酬激励不合理",
        "weight": 30,
        "judgment": "员工薪资结构是纯固定还是有提成？有超额奖励吗？",
        "description": "薪酬缺少激励性，干多干少差不多，员工积极性低"
      },
      {
        "name": "工作环境和文化差",
        "weight": 20,
        "judgment": "员工对工作环境满意吗？团队氛围如何？",
        "description": "工作环境简陋、团队氛围差，员工留不住"
      },
      {
        "name": "核心岗位依赖个人",
        "weight": 15,
        "judgment": "厨师长或核心服务员离职会怎样？有备岗人员吗？",
        "description": "核心岗位缺乏备岗和知识传承，人员风险高"
      }
    ],
    "solutionIds": [
      "sol_011",
      "sol_015",
      "sol_018"
    ],
    "todayTasks": [
      {
        "task": "列出所有岗位的培训现状和独立上岗周期",
        "duration": "30分钟",
        "purpose": "诊断培训缺口"
      },
      {
        "task": "分析现有薪资结构，计算激励空间",
        "duration": "45分钟",
        "purpose": "评估激励改革可行性"
      },
      {
        "task": "与2-3名员工沟通工作感受和期望",
        "duration": "30分钟",
        "purpose": "了解员工真实想法"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "岗位梳理日",
        "tasks": [
          "梳理所有岗位职责",
          "制定岗位能力要求",
          "识别核心风险岗位"
        ]
      },
      {
        "day": 2,
        "title": "培训体系日",
        "tasks": [
          "制定新员工7天培训计划",
          "编写核心岗位SOP手册",
          "设计培训考核标准"
        ]
      },
      {
        "day": 3,
        "title": "薪酬改革日",
        "tasks": [
          "设计底薪+提成+奖金结构",
          "制定营业额提成方案",
          "设置超额完成奖励"
        ]
      },
      {
        "day": 4,
        "title": "文化建设日",
        "tasks": [
          "制定团队活动计划",
          "优化员工休息和就餐环境",
          "建立员工意见反馈渠道"
        ]
      },
      {
        "day": 5,
        "title": "备岗计划日",
        "tasks": [
          "为核心岗位培养AB角",
          "制定知识传承文档",
          "设计轮岗学习机制"
        ]
      },
      {
        "day": 6,
        "title": "落地执行日",
        "tasks": [
          "公布新培训方案",
          "公布新薪酬方案",
          "解答员工疑问"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "收集员工反馈",
          "评估方案接受度",
          "优化执行细节"
        ]
      }
    ],
    "longTermAdvice": [
      "建立标准化培训和晋升体系，让员工看到成长路径",
      "推行绩效激励制度，让员工分享经营成果",
      "打造正向团队文化，定期团建和员工关怀"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_008",
      "tool_009"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "STAFF_HARD",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_h01",
      "sym_h03",
      "sym_h04"
    ],
    "judgment": "你的零售门店属于员工管理困难型问题，核心原因是激励机制缺失和销售能力不足，需要建立绩效体系和销售培训",
    "severity": 67,
    "causes": [
      {
        "name": "无绩效考核体系",
        "weight": 35,
        "judgment": "员工有明确的业绩指标吗？干好干坏有差别吗？",
        "description": "缺少量化的绩效考核标准，员工缺乏目标感和紧迫感"
      },
      {
        "name": "销售能力不足",
        "weight": 30,
        "judgment": "员工能主动推荐产品吗？连带推荐成功率高吗？",
        "description": "员工销售技能不足，只能被动等客户选购，缺少主动推荐"
      },
      {
        "name": "招人留人难",
        "weight": 20,
        "judgment": "招聘渠道有哪些？新员工平均多久离职？",
        "description": "招聘渠道有限，新员工流失率高，人员不稳定"
      },
      {
        "name": "排班不合理",
        "weight": 15,
        "judgment": "各时段人手是否匹配客流？闲时人多忙时人少？",
        "description": "排班与客流不匹配，人力利用效率低"
      }
    ],
    "solutionIds": [
      "sol_011",
      "sol_015",
      "sol_018"
    ],
    "todayTasks": [
      {
        "task": "统计各员工月销售业绩排名",
        "duration": "30分钟",
        "purpose": "诊断人效差异"
      },
      {
        "task": "设计基础绩效考核指标（销售额、连带率、会员转化）",
        "duration": "1小时",
        "purpose": "启动绩效改革"
      },
      {
        "task": "分析客流曲线与排班匹配度",
        "duration": "30分钟",
        "purpose": "优化排班效率"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "绩效设计日",
        "tasks": [
          "确定核心考核指标",
          "设计绩效评分和奖励方案",
          "制定绩效面谈机制"
        ]
      },
      {
        "day": 2,
        "title": "销售培训日",
        "tasks": [
          "编写推荐话术手册",
          "培训产品知识和卖点",
          "模拟演练和考核"
        ]
      },
      {
        "day": 3,
        "title": "排班优化日",
        "tasks": [
          "根据客流数据调整排班",
          "设计弹性排班机制",
          "确保高峰时段人手充足"
        ]
      },
      {
        "day": 4,
        "title": "招聘优化日",
        "tasks": [
          "拓展招聘渠道",
          "优化招聘信息描述",
          "设计新员工入职体验"
        ]
      },
      {
        "day": 5,
        "title": "新人培训日",
        "tasks": [
          "制定新员工3天入职培训",
          "安排师徒带教",
          "设置首周考核点"
        ]
      },
      {
        "day": 6,
        "title": "激励落地日",
        "tasks": [
          "公布绩效和激励方案",
          "培训绩效计算方式",
          "设置首月目标"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估方案接受度",
          "调整不合理指标",
          "制定持续优化计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立销售导向的绩效体系，让优秀员工收入明显更高",
      "持续进行销售技能培训，每周至少1次话术演练",
      "优化招聘和留人机制，目标员工月流失率控制在5%以内"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_008",
      "tool_009"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "STAFF_HARD",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_h01",
      "sym_h02",
      "sym_h05"
    ],
    "judgment": "你的服务门店属于员工管理困难型问题，核心原因是技师培养成本高和激励方式单一，需要建立人才培养和多元激励",
    "severity": 70,
    "causes": [
      {
        "name": "技师培养周期长",
        "weight": 35,
        "judgment": "培养一个合格技师需要多久？培养期间产出如何？",
        "description": "技术人员培养成本高周期长，流失后恢复难度大"
      },
      {
        "name": "激励方式单一",
        "weight": 25,
        "judgment": "技师收入只有手工费吗？有没有提成和分红机制？",
        "description": "激励方式仅限于计件，缺少多元激励手段"
      },
      {
        "name": "核心人员依赖",
        "weight": 25,
        "judgment": "核心技师离职会影响多少营收？有备份技师吗？",
        "description": "业务高度依赖少数核心技师，人员风险极大"
      },
      {
        "name": "职业发展路径模糊",
        "weight": 15,
        "judgment": "技师能看到晋升和成长空间吗？有分级认证体系吗？",
        "description": "缺少清晰的职业发展路径，员工看不到未来"
      }
    ],
    "solutionIds": [
      "sol_011",
      "sol_015",
      "sol_018"
    ],
    "todayTasks": [
      {
        "task": "统计各技师月产出和收入占比",
        "duration": "30分钟",
        "purpose": "诊断人效分布"
      },
      {
        "task": "设计技师分级认证标准（初级/中级/高级/督导）",
        "duration": "1小时",
        "purpose": "建立成长路径"
      },
      {
        "task": "制定核心技师保留方案",
        "duration": "30分钟",
        "purpose": "降低核心人员风险"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "人才盘点日",
        "tasks": [
          "完成技师能力评估",
          "标记核心人才和风险点",
          "制定人才发展计划"
        ]
      },
      {
        "day": 2,
        "title": "分级认证日",
        "tasks": [
          "制定技师分级标准",
          "设计各级别薪酬和服务定价",
          "公布认证和晋升通道"
        ]
      },
      {
        "day": 3,
        "title": "激励改革日",
        "tasks": [
          "设计底薪+手工+提成+奖金结构",
          "制定带教和培养奖励",
          "设置季度优秀技师评选"
        ]
      },
      {
        "day": 4,
        "title": "备岗培养日",
        "tasks": [
          "为核心岗位指定备岗人员",
          "启动备岗培训计划",
          "建立知识沉淀文档"
        ]
      },
      {
        "day": 5,
        "title": "新人加速日",
        "tasks": [
          "制定新技师30天速成计划",
          "设计师徒带教机制",
          "设置阶段性考核"
        ]
      },
      {
        "day": 6,
        "title": "团队建设日",
        "tasks": [
          "组织团队活动",
          "建立技师交流分享机制",
          "营造正向竞争氛围"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估方案执行情况",
          "收集技师反馈",
          "优化认证和激励细节"
        ]
      }
    ],
    "longTermAdvice": [
      "建立技师分级认证体系，让优秀技师有更高的收入和地位",
      "推行多元激励机制，让核心人才分享经营成果",
      "加速新人培养，目标新人3个月内达到独立服务标准"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_008",
      "tool_009"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "MARKETING_HARD",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_m01",
      "sym_m03",
      "sym_m04"
    ],
    "judgment": "你的餐饮门店属于营销推广困难型问题，核心原因是线上运营基础薄弱和内容生产能力不足，需要搭建线上运营体系",
    "severity": 66,
    "causes": [
      {
        "name": "线上渠道未开通",
        "weight": 35,
        "judgment": "大众点评、抖音、小红书等平台有你的门店吗？",
        "description": "基础线上渠道未铺设，潜在客户线上搜不到你"
      },
      {
        "name": "内容生产能力弱",
        "weight": 25,
        "judgment": "有没有定期发布门店相关内容？谁负责内容制作？",
        "description": "缺少内容创作能力和节奏，线上没有任何内容资产"
      },
      {
        "name": "不会策划活动",
        "weight": 25,
        "judgment": "过去半年做过几次营销活动？效果如何？",
        "description": "缺少活动策划经验，即使做活动也缺乏系统性和持续性"
      },
      {
        "name": "营销预算不知怎么花",
        "weight": 15,
        "judgment": "月营销预算多少？花在了哪些渠道？ROI如何？",
        "description": "营销投入盲目，缺少数据驱动的预算分配策略"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_013",
      "sol_016"
    ],
    "todayTasks": [
      {
        "task": "在大众点评认领门店并完善所有信息",
        "duration": "1小时",
        "purpose": "建立线上基础阵地"
      },
      {
        "task": "拍摄5张高质量门店和菜品照片",
        "duration": "45分钟",
        "purpose": "准备内容素材"
      },
      {
        "task": "列出周边3公里内的线上营销机会",
        "duration": "30分钟",
        "purpose": "规划营销方向"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "线上铺设日",
        "tasks": [
          "完善大众点评店铺信息",
          "开通抖音来客",
          "注册小红书账号"
        ]
      },
      {
        "day": 2,
        "title": "内容规划日",
        "tasks": [
          "制定月度内容日历",
          "确定3个核心内容方向",
          "准备首批10条内容素材"
        ]
      },
      {
        "day": 3,
        "title": "首次内容发布日",
        "tasks": [
          "发布3条大众点评笔记",
          "发布1条抖音短视频",
          "发布1条小红书种草"
        ]
      },
      {
        "day": 4,
        "title": "活动策划日",
        "tasks": [
          "设计本月引流活动方案",
          "制定活动推广计划",
          "准备活动物料"
        ]
      },
      {
        "day": 5,
        "title": "活动预热日",
        "tasks": [
          "线上发布活动预热内容",
          "社群同步活动信息",
          "门店布置活动氛围"
        ]
      },
      {
        "day": 6,
        "title": "活动执行日",
        "tasks": [
          "执行首个线上引流活动",
          "引导到店客户好评",
          "收集活动数据"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计活动到店转化",
          "分析各渠道内容数据",
          "优化下周内容和活动策略"
        ]
      }
    ],
    "longTermAdvice": [
      "坚持每周至少3条内容发布，逐步建立线上内容资产",
      "每月策划1次主题营销活动，形成客户期待",
      "用数据驱动营销决策，重点投入ROI最高的渠道"
    ],
    "caseIds": [
      "case_007"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "MARKETING_HARD",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_m02",
      "sym_m05",
      "sym_m06"
    ],
    "judgment": "你的零售门店属于营销推广困难型问题，核心原因是缺乏种草渠道和转化链路断裂，需要打通内容到购买闭环",
    "severity": 65,
    "causes": [
      {
        "name": "种草渠道缺失",
        "weight": 35,
        "judgment": "在小红书/抖音上有种草内容吗？客户线上能看到你的产品吗？",
        "description": "缺少线上种草渠道，产品曝光仅依赖线下自然流量"
      },
      {
        "name": "转化链路断裂",
        "weight": 30,
        "judgment": "客户从看到产品到完成购买有几个步骤？步骤能更短吗？",
        "description": "从内容种草到实际购买的路径太长，流失严重"
      },
      {
        "name": "品牌声量不足",
        "weight": 20,
        "judgment": "本地客户提起你这个品类会想到你吗？",
        "description": "品牌知名度低，在客户心智中没有位置"
      },
      {
        "name": "不会利用社交裂变",
        "weight": 15,
        "judgment": "有拼团、砍价、分销等社交裂变工具吗？",
        "description": "没有利用社交裂变放大营销效果"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_013",
      "sol_016"
    ],
    "todayTasks": [
      {
        "task": "在小红书/抖音搜索同品类热门内容，记录爆款特征",
        "duration": "1小时",
        "purpose": "学习竞品内容策略"
      },
      {
        "task": "拍摄3组产品场景化照片",
        "duration": "45分钟",
        "purpose": "准备种草素材"
      },
      {
        "task": "设计一个社交裂变活动方案（拼团/分销）",
        "duration": "45分钟",
        "purpose": "规划裂变机制"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞品调研日",
        "tasks": [
          "分析5个同品类优秀账号",
          "提炼爆款内容规律",
          "制定自己的内容定位"
        ]
      },
      {
        "day": 2,
        "title": "内容启动日",
        "tasks": [
          "发布3条种草内容",
          "测试不同内容风格",
          "分析数据反馈"
        ]
      },
      {
        "day": 3,
        "title": "转化链路日",
        "tasks": [
          "优化线上到店的转化路径",
          "设置线上预约/到店指引",
          "确保每个内容有明确CTA"
        ]
      },
      {
        "day": 4,
        "title": "裂变设计日",
        "tasks": [
          "确定裂变活动形式",
          "制作裂变海报和链接",
          "设置裂变奖励规则"
        ]
      },
      {
        "day": 5,
        "title": "裂变启动日",
        "tasks": [
          "发布裂变活动",
          "种子用户启动传播",
          "监控裂变数据"
        ]
      },
      {
        "day": 6,
        "title": "品牌建设日",
        "tasks": [
          "提炼品牌差异化定位",
          "设计品牌视觉升级方案",
          "制定品牌故事和口号"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计内容曝光和互动数据",
          "分析裂变传播效果",
          "优化下周内容和裂变策略"
        ]
      }
    ],
    "longTermAdvice": [
      "持续在小红书/抖音种草，每周至少5条内容，建立品牌内容资产",
      "打通线上种草→到店体验→社群留存的完整链路",
      "每季度策划1次社交裂变活动，低成本获取新客户"
    ],
    "caseIds": [
      "case_007"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "MARKETING_HARD",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_m01",
      "sym_m03",
      "sym_m05"
    ],
    "judgment": "你的服务门店属于营销推广困难型问题，核心原因是信任营销缺失和线上口碑薄弱，需要建立信任体系和口碑传播",
    "severity": 67,
    "causes": [
      {
        "name": "信任壁垒高",
        "weight": 35,
        "judgment": "新客户最担心什么？有没有打消顾虑的信任背书？",
        "description": "服务行业天然信任门槛高，缺少有效的信任建设手段"
      },
      {
        "name": "线上口碑薄弱",
        "weight": 30,
        "judgment": "大众点评有多少条评价？评分多少？有案例展示吗？",
        "description": "线上口碑评价少、内容薄，新客户难以建立信任"
      },
      {
        "name": "缺少内容化表达",
        "weight": 20,
        "judgment": "服务过程和效果能用内容呈现吗？有做对比展示吗？",
        "description": "服务效果没有可视化呈现，客户无法远程感知价值"
      },
      {
        "name": "不会利用老客户传播",
        "weight": 15,
        "judgment": "满意客户有帮你传播吗？有鼓励传播的机制吗？",
        "description": "缺少将客户满意度转化为口碑传播的机制"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_006",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "整理5个客户服务案例（含前后对比）",
        "duration": "1小时",
        "purpose": "建立信任素材库"
      },
      {
        "task": "邀请3位满意客户写好评",
        "duration": "30分钟",
        "purpose": "启动口碑建设"
      },
      {
        "task": "设计新客户信任保障方案（如不满意退款）",
        "duration": "45分钟",
        "purpose": "降低信任门槛"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "口碑基础日",
        "tasks": [
          "完善大众点评门店信息",
          "上传高质量案例图片",
          "邀请10位满意客户写好评"
        ]
      },
      {
        "day": 2,
        "title": "内容化日",
        "tasks": [
          "拍摄服务过程视频3条",
          "制作前后对比图文2组",
          "发布首批线上内容"
        ]
      },
      {
        "day": 3,
        "title": "信任保障日",
        "tasks": [
          "制定满意度保障承诺",
          "设计首次体验保障方案",
          "在所有渠道展示保障信息"
        ]
      },
      {
        "day": 4,
        "title": "口碑裂变日",
        "tasks": [
          "设计好评返利机制",
          "制定推荐奖励方案",
          "向满意客户发布推荐计划"
        ]
      },
      {
        "day": 5,
        "title": "异业推广日",
        "tasks": [
          "联系3家互补型商家",
          "商讨互推合作方案",
          "确定首批互推内容"
        ]
      },
      {
        "day": 6,
        "title": "活动引流日",
        "tasks": [
          "推出新客体验价活动",
          "线上发布活动内容",
          "老客户帮转介绍"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计口碑数据变化",
          "分析新客到店渠道",
          "优化口碑传播策略"
        ]
      }
    ],
    "longTermAdvice": [
      "持续积累线上口碑，目标大众点评评分4.5以上，评价200条以上",
      "建立客户推荐体系，让每个满意客户成为信任传播节点",
      "通过保障承诺和案例展示降低新客信任门槛"
    ],
    "caseIds": [
      "case_007"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "COMPETITION",
    "industry": "餐饮",
    "stage": "all",
    "symptomIds": [
      "sym_x01",
      "sym_x02",
      "sym_x04"
    ],
    "judgment": "你的餐饮门店属于竞争压力大型问题，核心原因是同质化严重和缺乏差异化壁垒，需要打造品类占位和独特体验",
    "severity": 77,
    "causes": [
      {
        "name": "品类同质化",
        "weight": 35,
        "judgment": "你和竞品的菜品有什么不同？客户能说出差异吗？",
        "description": "菜品和竞品高度同质，客户无感知差异，只能拼价格"
      },
      {
        "name": "无品类占位",
        "weight": 25,
        "judgment": "提到某个品类，客户会第一个想到你吗？你的品类标签是什么？",
        "description": "缺少在客户心智中的品类占位，没有品牌认知优势"
      },
      {
        "name": "体验无特色",
        "weight": 25,
        "judgment": "除了菜品，你的用餐体验有什么独特之处？",
        "description": "用餐环境和服务体验与竞品无差异，缺少记忆点"
      },
      {
        "name": "价格战消耗利润",
        "weight": 15,
        "judgment": "竞品降价时你怎么应对？有没有不降价也能赢的策略？",
        "description": "被动参与价格战，利润被不断压缩"
      }
    ],
    "solutionIds": [
      "sol_003",
      "sol_013",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "实地走访3家竞品，记录菜品/价格/环境差异",
        "duration": "2小时",
        "purpose": "竞品差异化调研"
      },
      {
        "task": "提炼1个你能做到但竞品做不到的差异化卖点",
        "duration": "1小时",
        "purpose": "确立差异化定位"
      },
      {
        "task": "设计1个不依赖降价的竞争应对方案",
        "duration": "45分钟",
        "purpose": "跳出价格战"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞品调研日",
        "tasks": [
          "完成3家竞品详细调研",
          "对比菜品/价格/环境差异",
          "找出竞品弱点和你的优势"
        ]
      },
      {
        "day": 2,
        "title": "差异化定位日",
        "tasks": [
          "确定差异化品类定位",
          "设计差异化核心卖点",
          "制定品类占位口号"
        ]
      },
      {
        "day": 3,
        "title": "体验升级日",
        "tasks": [
          "设计1个独特用餐体验点",
          "优化环境氛围细节",
          "增加服务仪式感"
        ]
      },
      {
        "day": 4,
        "title": "招牌菜打造日",
        "tasks": [
          "确定1道独门招牌菜",
          "优化配方和出品",
          "设计招牌菜专属故事"
        ]
      },
      {
        "day": 5,
        "title": "价值战启动日",
        "tasks": [
          "推出价值而非价格的活动",
          "强化差异化内容传播",
          "引导客户感知独特价值"
        ]
      },
      {
        "day": 6,
        "title": "壁垒构建日",
        "tasks": [
          "建立供应链独占优势",
          "培养核心技术壁垒",
          "构建客户情感连接"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估差异化反馈",
          "分析客户认知变化",
          "强化差异化传播策略"
        ]
      }
    ],
    "longTermAdvice": [
      "坚持差异化竞争，在一个细分品类做第一而非大品类做跟风",
      "通过独特体验和品牌故事建立情感壁垒，让价格不再是决定因素",
      "持续构建竞争壁垒：独家供应/技术秘方/品牌认知/客户关系"
    ],
    "caseIds": [
      "case_008"
    ],
    "toolIds": [
      "tool_001",
      "tool_010"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "COMPETITION",
    "industry": "零售",
    "stage": "all",
    "symptomIds": [
      "sym_x01",
      "sym_x03",
      "sym_x05"
    ],
    "judgment": "你的零售门店属于竞争压力大型问题，核心原因是选品无差异和品牌势能弱，需要建立独家选品优势和品牌认知",
    "severity": 75,
    "causes": [
      {
        "name": "选品无独占性",
        "weight": 35,
        "judgment": "你卖的产品竞品也有吗？有独家或独家代理的产品吗？",
        "description": "产品与竞品高度重合，客户随时可以去别家买"
      },
      {
        "name": "品牌势能弱",
        "weight": 25,
        "judgment": "你的门店有品牌感吗？客户觉得在你这买和在别处买有区别吗？",
        "description": "缺少品牌力支撑，在客户心中与竞品无差异"
      },
      {
        "name": "服务无差异化",
        "weight": 25,
        "judgment": "你提供的购物服务和竞品有什么不同？有增值服务吗？",
        "description": "购物体验与竞品无异，缺少让客户选择的理由"
      },
      {
        "name": "规模劣势明显",
        "weight": 15,
        "judgment": "连锁竞品有供应链和品牌优势，你怎么应对？",
        "description": "面对连锁品牌的规模优势，单店缺乏抗衡能力"
      }
    ],
    "solutionIds": [
      "sol_008",
      "sol_013",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "统计独家产品和通用产品的占比",
        "duration": "30分钟",
        "purpose": "诊断选品差异化"
      },
      {
        "task": "列出你能提供但竞品做不到的3个服务点",
        "duration": "45分钟",
        "purpose": "发现服务差异机会"
      },
      {
        "task": "设计1个品牌差异化定位方案",
        "duration": "1小时",
        "purpose": "明确品牌方向"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "选品差异化日",
        "tasks": [
          "分析产品与竞品重合度",
          "联系独家/定制产品供应商",
          "制定独家选品引进计划"
        ]
      },
      {
        "day": 2,
        "title": "品牌定位日",
        "tasks": [
          "确定品牌差异化定位",
          "设计品牌视觉升级方案",
          "提炼品牌口号和故事"
        ]
      },
      {
        "day": 3,
        "title": "服务差异化日",
        "tasks": [
          "设计2个竞品没有的增值服务",
          "制定专业咨询和搭配方案",
          "培训员工差异化服务话术"
        ]
      },
      {
        "day": 4,
        "title": "私域运营日",
        "tasks": [
          "建立核心客户社群",
          "设计社群专属福利",
          "用社群对抗竞品价格战"
        ]
      },
      {
        "day": 5,
        "title": "联盟对抗日",
        "tasks": [
          "联合周边非竞争商家",
          "建立异业联盟互推",
          "共享客户资源对抗连锁"
        ]
      },
      {
        "day": 6,
        "title": "本地化优势日",
        "tasks": [
          "强化本地服务优势",
          "设计本地专属产品",
          "打造社区型品牌认知"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估差异化方案反馈",
          "分析客户认知变化",
          "优化竞争策略"
        ]
      }
    ],
    "longTermAdvice": [
      "逐步提高独家/定制产品占比，目标30%以上产品在竞品买不到",
      "用品牌化和专业化服务对抗连锁的价格和规模优势",
      "深耕本地社区，成为周边居民的首选信任品牌"
    ],
    "caseIds": [
      "case_008"
    ],
    "toolIds": [
      "tool_002",
      "tool_010"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "COMPETITION",
    "industry": "服务业",
    "stage": "all",
    "symptomIds": [
      "sym_x01",
      "sym_x03",
      "sym_x04"
    ],
    "judgment": "你的服务门店属于竞争压力大型问题，核心原因是服务无特色和客户黏性不足，需要打造服务IP和深度客户关系",
    "severity": 74,
    "causes": [
      {
        "name": "服务无特色IP",
        "weight": 35,
        "judgment": "你的服务有个人风格或特色标签吗？客户能记住你的独特之处吗？",
        "description": "服务缺少个人风格和记忆点，客户体验与其他店无差异"
      },
      {
        "name": "客户黏性不足",
        "weight": 30,
        "judgment": "客户为什么持续选择你而不是更便宜的竞品？",
        "description": "客户忠诚度低，容易被竞品的价格和活动吸引走"
      },
      {
        "name": "专业度感知弱",
        "weight": 20,
        "judgment": "客户觉得你比竞品更专业吗？怎么体现专业度？",
        "description": "专业优势没有有效传达，客户感知不到差异"
      },
      {
        "name": "抗风险能力差",
        "weight": 15,
        "judgment": "竞品开促销时你的客户流失多少？有防御机制吗？",
        "description": "缺少客户防御机制，竞品一促销就流失客户"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_013",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "列出3个你的服务比竞品做得更好的方面",
        "duration": "30分钟",
        "purpose": "发现竞争优势点"
      },
      {
        "task": "设计1个让客户记住的服务特色或仪式",
        "duration": "1小时",
        "purpose": "打造服务IP"
      },
      {
        "task": "制定客户防流失预警方案",
        "duration": "45分钟",
        "purpose": "建立客户防御"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "服务IP设计日",
        "tasks": [
          "确定服务特色标签",
          "设计独特服务仪式感",
          "打造个人/团队服务IP"
        ]
      },
      {
        "day": 2,
        "title": "专业度强化日",
        "tasks": [
          "制作专业资质展示墙",
          "制定专业咨询和诊断流程",
          "培训专业表达话术"
        ]
      },
      {
        "day": 3,
        "title": "黏性提升日",
        "tasks": [
          "设计客户长期服务计划",
          "制定储值和长期套餐",
          "建立消费里程碑奖励"
        ]
      },
      {
        "day": 4,
        "title": "防御体系日",
        "tasks": [
          "建立客户活跃度监控",
          "设置流失预警机制",
          "制定竞品促销应对方案"
        ]
      },
      {
        "day": 5,
        "title": "口碑差异化日",
        "tasks": [
          "鼓励客户写差异化好评",
          "发布专业内容建立权威",
          "突出服务特色案例"
        ]
      },
      {
        "day": 6,
        "title": "圈层运营日",
        "tasks": [
          "建立核心客户VIP社群",
          "设计社群专属活动和福利",
          "培养客户归属感"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估差异化效果",
          "分析客户黏性变化",
          "优化竞争防御策略"
        ]
      }
    ],
    "longTermAdvice": [
      "打造个人/团队服务IP，让客户因为你这个人而选择你",
      "通过专业度和深度服务建立客户黏性，降低被竞品抢走的概率",
      "建立客户防御体系，及时发现和挽回有流失风险的客户"
    ],
    "caseIds": [
      "case_008"
    ],
    "toolIds": [
      "tool_004",
      "tool_010"
    ],
    "priority": 10,
    "status": 1
  },
  {
    "problemCode": "TRAFFIC_LOW",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_t01",
      "sym_t02",
      "sym_t05"
    ],
    "judgment": "你的新店属于起步期客流不足型问题，核心原因是知名度为零和缺乏初始流量注入，需要快速建立周边认知",
    "severity": 80,
    "causes": [
      {
        "name": "新店零知名度",
        "weight": 40,
        "judgment": "开业以来周边有多少人知道你的店？做了哪些开业推广？",
        "description": "新开门店没有任何品牌认知积累，周边人群完全不知道"
      },
      {
        "name": "开业引流不足",
        "weight": 30,
        "judgment": "开业活动效果如何？到店人数达到预期了吗？",
        "description": "开业引流不够猛，错失了黄金推广期"
      },
      {
        "name": "产品/服务未验证",
        "weight": 20,
        "judgment": "产品和服务经过市场验证吗？有根据早期客户反馈调整吗？",
        "description": "产品和服务尚未经过市场检验，可能不符合本地需求"
      },
      {
        "name": "缺乏种子用户",
        "weight": 10,
        "judgment": "有多少回头客？种子用户群体形成了吗？",
        "description": "缺少第一批种子用户，口碑传播基础尚未建立"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_012",
      "sol_013"
    ],
    "todayTasks": [
      {
        "task": "设计一个强力开业/重新开业引流活动方案",
        "duration": "1小时",
        "purpose": "规划引流爆发"
      },
      {
        "task": "印制500份周边社区推广传单",
        "duration": "30分钟",
        "purpose": "启动地推宣传"
      },
      {
        "task": "邀请5位朋友/家人免费体验并提建议",
        "duration": "2小时",
        "purpose": "获取首批反馈"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "开业引爆日",
        "tasks": [
          "确定引流活动力度和方案",
          "准备活动物料",
          "培训员工活动话术"
        ]
      },
      {
        "day": 2,
        "title": "周边轰炸日",
        "tasks": [
          "周边500米派发传单",
          "社区公告栏张贴广告",
          "进入业主群发布开业信息"
        ]
      },
      {
        "day": 3,
        "title": "线上铺设日",
        "tasks": [
          "完善所有线上平台信息",
          "发布开业优惠内容",
          "邀请本地达人探店"
        ]
      },
      {
        "day": 4,
        "title": "种子用户日",
        "tasks": [
          "设计种子用户专属福利",
          "首批到店客户深度服务",
          "收集产品和服务反馈"
        ]
      },
      {
        "day": 5,
        "title": "产品验证日",
        "tasks": [
          "根据首批反馈调整产品",
          "优化服务流程",
          "确定核心主打产品"
        ]
      },
      {
        "day": 6,
        "title": "口碑启动日",
        "tasks": [
          "引导满意客户写好评",
          "拍摄客户真实反馈视频",
          "启动推荐奖励计划"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计本周到店总人数",
          "分析客户来源渠道",
          "制定第二周引流计划"
        ]
      }
    ],
    "longTermAdvice": [
      "新店前3个月是黄金引流期，要保持高频推广不间断",
      "快速验证产品和服务，根据市场反馈敏捷调整",
      "尽早建立种子用户群体，为口碑传播打下基础"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_003"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "TRAFFIC_LOW",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_t01",
      "sym_t04",
      "sym_t06"
    ],
    "judgment": "你的成长期门店属于客流增长瓶颈型问题，核心原因是引流渠道单一和线上转化率低，需要拓展流量渠道",
    "severity": 68,
    "causes": [
      {
        "name": "引流渠道单一",
        "weight": 35,
        "judgment": "目前主要客源来自哪些渠道？有没有过度依赖单一渠道？",
        "description": "客源渠道过于集中，一旦该渠道效果下滑就陷入被动"
      },
      {
        "name": "线上转化率低",
        "weight": 25,
        "judgment": "线上看到你门店信息的人有多少实际到店？转化率多少？",
        "description": "有一定线上曝光，但从看到到到店的转化效率低"
      },
      {
        "name": "增长策略模糊",
        "weight": 25,
        "judgment": "有明确的月度客流增长目标吗？有对应的增长策略吗？",
        "description": "缺少系统化的增长策略，客流增长全凭运气"
      },
      {
        "name": "竞争对手分流",
        "weight": 15,
        "judgment": "新开的竞品有没有抢走你的客流？",
        "description": "新入局者分流了部分客源，需要建立防御"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_012",
      "sol_005"
    ],
    "todayTasks": [
      {
        "task": "分析各渠道客源占比，识别过度依赖渠道",
        "duration": "30分钟",
        "purpose": "诊断渠道结构"
      },
      {
        "task": "列出3个尚未尝试的潜在引流渠道",
        "duration": "30分钟",
        "purpose": "拓展渠道思路"
      },
      {
        "task": "制定月度客流增长目标和分解方案",
        "duration": "1小时",
        "purpose": "明确增长方向"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "渠道审计日",
        "tasks": [
          "完成各渠道客源分析",
          "标记过度依赖渠道",
          "制定渠道多元化计划"
        ]
      },
      {
        "day": 2,
        "title": "新渠道探索日",
        "tasks": [
          "测试2个新引流渠道",
          "评估新渠道获取成本",
          "确定重点投入渠道"
        ]
      },
      {
        "day": 3,
        "title": "线上优化日",
        "tasks": [
          "优化线上店铺页面",
          "提升线上到店转化率",
          "增加线上引导到店的触点"
        ]
      },
      {
        "day": 4,
        "title": "内容引流日",
        "tasks": [
          "发布高质量引流内容",
          "利用热点话题增加曝光",
          "测试付费推广效果"
        ]
      },
      {
        "day": 5,
        "title": "异业引流日",
        "tasks": [
          "联系3家异业合作伙伴",
          "设计互推引流方案",
          "启动首次异业合作"
        ]
      },
      {
        "day": 6,
        "title": "老客裂变日",
        "tasks": [
          "设计老客推荐引流方案",
          "制作推荐码和海报",
          "向活跃客户发布推荐计划"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各渠道新增客流",
          "计算各渠道获客成本",
          "优化渠道投入分配"
        ]
      }
    ],
    "longTermAdvice": [
      "建立多元化引流渠道体系，任一渠道占比不超过40%",
      "持续优化线上到店转化率，目标转化率8%以上",
      "将增长目标数字化，月度跟踪并调整策略"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_001",
      "tool_003"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "TRAFFIC_LOW",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_t01",
      "sym_t04",
      "sym_t06"
    ],
    "judgment": "你的老店属于客流萎缩型问题，核心原因是品牌老化和新鲜感缺失，需要品牌焕新和重新激活周边市场",
    "severity": 72,
    "causes": [
      {
        "name": "品牌形象老化",
        "weight": 35,
        "judgment": "门店装修和品牌形象多久没更新了？客户是否觉得你过时了？",
        "description": "门店形象和品牌老化，对新一代客户缺乏吸引力"
      },
      {
        "name": "新鲜感缺失",
        "weight": 25,
        "judgment": "最近一次给客户新鲜感是什么时候？老客户是不是审美疲劳了？",
        "description": "长期不变导致客户审美疲劳，缺少回头动力"
      },
      {
        "name": "线上阵地缺失",
        "weight": 25,
        "judgment": "在年轻人的线上平台上有存在感吗？",
        "description": "在新兴线上平台缺少布局，错失年轻客群"
      },
      {
        "name": "周边人口结构变化",
        "weight": 15,
        "judgment": "周边3公里的居住人群这些年有变化吗？你的客户定位需要调整吗？",
        "description": "周边人口结构变化，但门店定位和产品未跟上变化"
      }
    ],
    "solutionIds": [
      "sol_003",
      "sol_013",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "拍摄门店外观和内部现状照片，客观审视老化程度",
        "duration": "30分钟",
        "purpose": "诊断品牌老化"
      },
      {
        "task": "调研周边3公里人口结构和消费习惯变化",
        "duration": "1小时",
        "purpose": "了解市场变化"
      },
      {
        "task": "设计一个品牌焕新的初步方案",
        "duration": "1小时",
        "purpose": "规划焕新方向"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "品牌审计日",
        "tasks": [
          "完成品牌形象评估",
          "收集客户对门店印象反馈",
          "确定焕新优先级"
        ]
      },
      {
        "day": 2,
        "title": "市场更新日",
        "tasks": [
          "调研周边人口结构变化",
          "分析新客群消费偏好",
          "调整目标客群定位"
        ]
      },
      {
        "day": 3,
        "title": "视觉焕新日",
        "tasks": [
          "制定门店视觉升级方案",
          "优化门头和店内装饰",
          "更新宣传物料风格"
        ]
      },
      {
        "day": 4,
        "title": "产品焕新日",
        "tasks": [
          "推出应季新品/新服务",
          "设计怀旧+创新组合",
          "制造'焕新回归'话题"
        ]
      },
      {
        "day": 5,
        "title": "线上重启日",
        "tasks": [
          "入驻抖音/小红书等新平台",
          "发布焕新内容",
          "投放周边3公里精准广告"
        ]
      },
      {
        "day": 6,
        "title": "活动引爆日",
        "tasks": [
          "举办焕新开业活动",
          "邀请老客户回店体验",
          "制造社交话题传播"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计焕新后客流变化",
          "分析新客年龄结构",
          "持续优化焕新策略"
        ]
      }
    ],
    "longTermAdvice": [
      "每2-3年进行一次品牌焕新，保持对新一代客群的吸引力",
      "紧跟线上平台趋势，在年轻人聚集的渠道建立存在感",
      "定期调研周边市场变化，及时调整定位和产品结构"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_001",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "REVENUE_DROP",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_r01",
      "sym_r04"
    ],
    "judgment": "你的新店属于营收未达预期型问题，核心原因是客群积累不足和定价策略需调整，需要加速客群积累和优化营收结构",
    "severity": 75,
    "causes": [
      {
        "name": "客群积累不足",
        "weight": 40,
        "judgment": "日均到店人数达到盈亏平衡点了吗？",
        "description": "新店客群积累不够，到店人数远未达到营收预期"
      },
      {
        "name": "定价策略需优化",
        "weight": 25,
        "judgment": "定价是基于成本还是市场？和周边消费力匹配吗？",
        "description": "定价缺乏市场依据，可能过高或过低影响营收"
      },
      {
        "name": "产品结构未成熟",
        "weight": 20,
        "judgment": "哪些产品好卖哪些不好卖？有做调整吗？",
        "description": "产品结构还在摸索期，缺少经过验证的营收支柱"
      },
      {
        "name": "开业红利消退",
        "weight": 15,
        "judgment": "开业后营收是不是快速下滑？有后续经营计划吗？",
        "description": "开业期新鲜感过后营收下滑，缺少持续经营规划"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_004",
      "sol_014"
    ],
    "todayTasks": [
      {
        "task": "计算日均盈亏平衡点到店人数，对比实际差距",
        "duration": "30分钟",
        "purpose": "明确营收缺口"
      },
      {
        "task": "调研周边3家竞品的定价水平",
        "duration": "1小时",
        "purpose": "校准定价策略"
      },
      {
        "task": "标记近1个月销量TOP5和BOTTOM5产品",
        "duration": "30分钟",
        "purpose": "优化产品结构"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "营收拆解日",
        "tasks": [
          "拆解营收=客流×客单价",
          "找出营收缺口主要来源",
          "制定针对性补缺计划"
        ]
      },
      {
        "day": 2,
        "title": "定价校准日",
        "tasks": [
          "完成竞品定价调研",
          "调整偏离市场的定价",
          "设计价格测试方案"
        ]
      },
      {
        "day": 3,
        "title": "产品聚焦日",
        "tasks": [
          "聚焦推广TOP5产品",
          "淘汰或替换BOTTOM5",
          "设计组合套餐提升客单"
        ]
      },
      {
        "day": 4,
        "title": "客流提升日",
        "tasks": [
          "推出限时引流活动",
          "设计到店转化诱饵",
          "加强周边推广力度"
        ]
      },
      {
        "day": 5,
        "title": "储值启动日",
        "tasks": [
          "设计储值卡方案",
          "推出储值优惠激励",
          "引导首批储值客户"
        ]
      },
      {
        "day": 6,
        "title": "二次消费日",
        "tasks": [
          "设计首次消费后的回访机制",
          "推出7天内二次消费优惠",
          "加速新客转化为熟客"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计本周营收变化",
          "分析客单价和客流走势",
          "制定下周营收目标"
        ]
      }
    ],
    "longTermAdvice": [
      "新店前3个月聚焦客群积累，日均到店人数是第一指标",
      "持续优化定价和产品结构，找到营收最优组合",
      "尽早启动储值和会员体系，锁定客户长期消费"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_005"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "REVENUE_DROP",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_r01",
      "sym_r02",
      "sym_r04"
    ],
    "judgment": "你的成长期门店属于营收增长停滞型问题，核心原因是增长模式见顶和缺少新增长点，需要突破增长天花板",
    "severity": 70,
    "causes": [
      {
        "name": "增长模式见顶",
        "weight": 35,
        "judgment": "现有增长方式的天花板在哪里？还有多大增长空间？",
        "description": "原有增长模式已接近极限，需要找到新增长引擎"
      },
      {
        "name": "缺少第二增长曲线",
        "weight": 25,
        "judgment": "除了现有业务，有没有新的收入来源？",
        "description": "过度依赖单一收入来源，缺少多元化营收"
      },
      {
        "name": "客户价值未充分挖掘",
        "weight": 25,
        "judgment": "现有客户的消费频次和客单价还有提升空间吗？",
        "description": "现有客户价值挖掘不充分，客单价和频次有提升空间"
      },
      {
        "name": "外部环境变化",
        "weight": 15,
        "judgment": "市场环境、消费习惯或政策有没有发生变化？",
        "description": "外部环境变化导致原有营收模式效果下降"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_007",
      "sol_014"
    ],
    "todayTasks": [
      {
        "task": "分析现有增长模式的天花板位置",
        "duration": "45分钟",
        "purpose": "评估增长空间"
      },
      {
        "task": "列出3个可能的第二增长曲线方向",
        "duration": "1小时",
        "purpose": "拓展增长思路"
      },
      {
        "task": "计算现有客户的消费频次和客单价提升空间",
        "duration": "30分钟",
        "purpose": "挖掘客户价值"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "增长审计日",
        "tasks": [
          "分析现有增长模式瓶颈",
          "评估各增长指标天花板",
          "制定突破策略"
        ]
      },
      {
        "day": 2,
        "title": "第二曲线探索日",
        "tasks": [
          "评估新业务/新产品可行性",
          "选择1-2个方向小规模测试",
          "制定测试方案和指标"
        ]
      },
      {
        "day": 3,
        "title": "客户价值深挖日",
        "tasks": [
          "设计提升客单价方案",
          "制定提升消费频次策略",
          "推出升级和增值服务"
        ]
      },
      {
        "day": 4,
        "title": "渠道拓展日",
        "tasks": [
          "评估线上渠道增量空间",
          "探索B端或团购渠道",
          "制定渠道拓展计划"
        ]
      },
      {
        "day": 5,
        "title": "效率提升日",
        "tasks": [
          "优化运营效率降低成本",
          "提升服务效率增加产能",
          "用效率换营收增长"
        ]
      },
      {
        "day": 6,
        "title": "测试启动日",
        "tasks": [
          "启动第二曲线小规模测试",
          "推出客户价值提升方案",
          "收集数据和反馈"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "分析测试数据",
          "评估增长突破效果",
          "确定下一步重点方向"
        ]
      }
    ],
    "longTermAdvice": [
      "不要在一条增长曲线上死磕，提前布局第二增长曲线",
      "深挖现有客户价值是最经济的增长方式",
      "关注外部环境变化，及时调整经营策略适应新形势"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_005",
      "tool_007"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "REVENUE_DROP",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_r01",
      "sym_r02",
      "sym_r05"
    ],
    "judgment": "你的老店属于营收持续萎缩型问题，核心原因是客户基础萎缩和产品老化，需要客户回归和产品焕新双管齐下",
    "severity": 76,
    "causes": [
      {
        "name": "老客户持续流失",
        "weight": 35,
        "judgment": "月流失率多少？流失客户的主要原因是什么？",
        "description": "老客户逐渐流失，客户基础不断萎缩"
      },
      {
        "name": "产品/服务老化",
        "weight": 25,
        "judgment": "核心产品多久没更新了？客户是不是审美疲劳了？",
        "description": "产品和服务长期不更新，无法满足变化的市场需求"
      },
      {
        "name": "新客获取能力退化",
        "weight": 25,
        "judgment": "新客户占客户总数比例多少？有新客增长吗？",
        "description": "新客获取能力退化，入不敷出"
      },
      {
        "name": "经营模式陈旧",
        "weight": 15,
        "judgment": "经营方式还是3年前的吗？有没有尝试新方法？",
        "description": "经营模式停留在过去，不适应新的市场环境"
      }
    ],
    "solutionIds": [
      "sol_003",
      "sol_014",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "统计近6个月客户流失率和新客增长率",
        "duration": "30分钟",
        "purpose": "诊断客户基础"
      },
      {
        "task": "设计老客户回归方案（专属优惠+新品体验邀请）",
        "duration": "1小时",
        "purpose": "启动客户回归"
      },
      {
        "task": "规划1次产品/服务焕新升级",
        "duration": "1小时",
        "purpose": "启动产品焕新"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "客户审计日",
        "tasks": [
          "完成客户流失率分析",
          "标记流失原因TOP3",
          "制定客户挽回和新增计划"
        ]
      },
      {
        "day": 2,
        "title": "回归行动日",
        "tasks": [
          "联系流失6个月内的高价值客户",
          "提供专属回归优惠",
          "收集流失原因反馈"
        ]
      },
      {
        "day": 3,
        "title": "产品焕新日",
        "tasks": [
          "推出1-2个升级版产品/服务",
          "保留经典款+增加创新款",
          "设计焕新包装和呈现"
        ]
      },
      {
        "day": 4,
        "title": "模式升级日",
        "tasks": [
          "引入线上预订/外卖/团购",
          "更新会员和储值体系",
          "尝试新的经营方式"
        ]
      },
      {
        "day": 5,
        "title": "新客获取日",
        "tasks": [
          "启动线上引流活动",
          "与周边新开商家互推",
          "投放周边3公里精准广告"
        ]
      },
      {
        "day": 6,
        "title": "焕新发布日",
        "tasks": [
          "举办焕新回归活动",
          "线上线下同步宣传",
          "邀请老客户和新客户到店"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计回归客户数",
          "分析新客获取效果",
          "评估营收回暖情况"
        ]
      }
    ],
    "longTermAdvice": [
      "建立客户流失预警机制，提前干预而非事后补救",
      "每年至少1次产品/服务焕新，保持市场竞争力",
      "拥抱新的经营方式和工具，不要固守旧模式"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "PROFIT_LOW",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_p02",
      "sym_p04",
      "sym_p05"
    ],
    "judgment": "你的新店属于亏损/低利润型问题，核心原因是固定成本高和规模未达盈亏平衡，需要快速提升营收规模和精简成本",
    "severity": 82,
    "causes": [
      {
        "name": "未达盈亏平衡点",
        "weight": 40,
        "judgment": "月盈亏平衡点营收是多少？实际营收差距多大？",
        "description": "营收规模尚未覆盖固定成本，处于亏损经营状态"
      },
      {
        "name": "前期投入过大",
        "weight": 25,
        "judgment": "装修和设备投入是否超出预算？每月折旧压力多大？",
        "description": "开业前期投入过大，每月折旧和还款压力侵蚀利润"
      },
      {
        "name": "固定成本占比高",
        "weight": 20,
        "judgment": "房租+人工占营收比例多少？超过60%了吗？",
        "description": "固定成本占比过高，营收增长时利润弹性不足"
      },
      {
        "name": "定价偏低",
        "weight": 15,
        "judgment": "是不是因为新店不敢定高价？实际可以定多少？",
        "description": "新店因不自信而定价偏低，利润空间被压缩"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_010",
      "sol_016"
    ],
    "todayTasks": [
      {
        "task": "计算月盈亏平衡点和当前差距",
        "duration": "30分钟",
        "purpose": "明确生存目标"
      },
      {
        "task": "列出所有成本项，标记可削减的支出",
        "duration": "45分钟",
        "purpose": "找到降本空间"
      },
      {
        "task": "评估3个核心产品的定价提升空间",
        "duration": "30分钟",
        "purpose": "测试提价可能"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "盈亏分析日",
        "tasks": [
          "完成盈亏平衡点计算",
          "分析各成本项占比",
          "制定减亏行动计划"
        ]
      },
      {
        "day": 2,
        "title": "成本精简日",
        "tasks": [
          "削减非必要支出",
          "优化供应商降低进货成本",
          "减少浪费和损耗"
        ]
      },
      {
        "day": 3,
        "title": "定价优化日",
        "tasks": [
          "测试核心产品提价",
          "设计价值感提升方案",
          "确保提价后客户仍觉得值"
        ]
      },
      {
        "day": 4,
        "title": "产能最大化日",
        "tasks": [
          "延长有效营业时间",
          "提升高峰期服务效率",
          "增加单位时间产出"
        ]
      },
      {
        "day": 5,
        "title": "增量渠道日",
        "tasks": [
          "开拓外卖/团购等增量渠道",
          "承接小型团餐/团购订单",
          "最大化场地利用率"
        ]
      },
      {
        "day": 6,
        "title": "效率提升日",
        "tasks": [
          "优化排班减少冗余",
          "简化流程提高效率",
          "用更少人做更多事"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算本周利润改善",
          "评估距盈亏平衡的差距",
          "制定下周减亏目标"
        ]
      }
    ],
    "longTermAdvice": [
      "新店首要目标是尽快达到盈亏平衡，一切围绕这个目标",
      "精简一切非必要开支，保留核心投入",
      "在提升价值感的基础上逐步优化定价，扩大利润空间"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "PROFIT_LOW",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_p01",
      "sym_p03",
      "sym_p05"
    ],
    "judgment": "你的成长期门店属于增收不增利型问题，核心原因是成本随规模同步增长和毛利结构不佳，需要精细化成本管控和优化毛利",
    "severity": 73,
    "causes": [
      {
        "name": "成本随规模同步增长",
        "weight": 35,
        "judgment": "营收增长时成本是否同比例增长？规模效应在哪里？",
        "description": "营收增长但成本同步增加，没有形成规模效应"
      },
      {
        "name": "毛利结构不佳",
        "weight": 25,
        "judgment": "高毛利产品占比多少？低毛利产品占比多少？",
        "description": "产品毛利结构不合理，低毛利占比过大拉低整体"
      },
      {
        "name": "管理粗放",
        "weight": 25,
        "judgment": "有没有精细化的成本管控？各项成本有目标值吗？",
        "description": "管理粗放，缺少精细化成本管控机制"
      },
      {
        "name": "隐性成本被忽视",
        "weight": 15,
        "judgment": "有没有算过损耗、返工、空置等隐性成本？",
        "description": "大量隐性成本被忽视，实际利润比账面更差"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_010",
      "sol_016"
    ],
    "todayTasks": [
      {
        "task": "制作详细的成本结构表，找出占比最大的3项",
        "duration": "45分钟",
        "purpose": "诊断成本结构"
      },
      {
        "task": "计算各产品/服务的毛利率排名",
        "duration": "30分钟",
        "purpose": "优化毛利结构"
      },
      {
        "task": "盘点1天的隐性成本（损耗、返工、空置等）",
        "duration": "全天观察",
        "purpose": "暴露隐性损失"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "成本审计日",
        "tasks": [
          "完成成本结构详细分析",
          "标记可控成本和固定成本",
          "制定各成本项目标值"
        ]
      },
      {
        "day": 2,
        "title": "毛利优化日",
        "tasks": [
          "调整低毛利产品定价或配方",
          "增加高毛利产品推广力度",
          "目标整体毛利率提升5%"
        ]
      },
      {
        "day": 3,
        "title": "采购优化日",
        "tasks": [
          "与供应商重新谈判价格",
          "拓展采购渠道比价",
          "制定采购成本降低目标"
        ]
      },
      {
        "day": 4,
        "title": "损耗治理日",
        "tasks": [
          "统计各项损耗数据",
          "制定损耗降低目标和措施",
          "建立损耗监控机制"
        ]
      },
      {
        "day": 5,
        "title": "人效提升日",
        "tasks": [
          "分析人均产出和人工成本",
          "优化排班和工作流程",
          "制定人效提升目标"
        ]
      },
      {
        "day": 6,
        "title": "管理精细化日",
        "tasks": [
          "建立成本日报/周报机制",
          "设置成本预警线",
          "培训全员成本意识"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计本周成本变化",
          "评估利润改善情况",
          "制定下月利润目标"
        ]
      }
    ],
    "longTermAdvice": [
      "建立精细化成本管控体系，每项成本都有目标值和监控",
      "持续优化产品毛利结构，高毛利产品占比目标50%以上",
      "重视隐性成本，定期盘点和治理损耗、返工、空置"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "PROFIT_LOW",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_p01",
      "sym_p03",
      "sym_p05"
    ],
    "judgment": "你的老店属于利润持续走低型问题，核心原因是成本刚性上涨和定价能力不足，需要结构性改革和提升定价权",
    "severity": 78,
    "causes": [
      {
        "name": "成本刚性上涨",
        "weight": 35,
        "judgment": "房租、人工、食材/进货成本每年涨多少？有应对方案吗？",
        "description": "各项成本持续上涨，但营收增长跟不上成本增长"
      },
      {
        "name": "定价权不足",
        "weight": 30,
        "judgment": "你敢涨价吗？客户对价格敏感度多高？",
        "description": "长期不敢涨价，利润空间被成本上涨不断压缩"
      },
      {
        "name": "效率损失积累",
        "weight": 20,
        "judgment": "经营多年积累的流程冗余有多少？有做过流程再造吗？",
        "description": "多年经营积累的效率损失，流程冗余和浪费严重"
      },
      {
        "name": "收入结构单一",
        "weight": 15,
        "judgment": "收入来源有几个？有没有额外的利润增长点？",
        "description": "过度依赖单一收入来源，缺少利润补充渠道"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_010",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "对比近3年各项成本涨幅，标记涨幅最大的3项",
        "duration": "45分钟",
        "purpose": "明确成本压力"
      },
      {
        "task": "设计1个有理由的涨价方案（配合产品升级）",
        "duration": "1小时",
        "purpose": "突破定价困境"
      },
      {
        "task": "梳理1个核心业务流程，找出可优化环节",
        "duration": "30分钟",
        "purpose": "启动效率改进"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "成本结构分析日",
        "tasks": [
          "完成3年成本对比分析",
          "预测未来成本趋势",
          "制定成本控制战略"
        ]
      },
      {
        "day": 2,
        "title": "定价策略日",
        "tasks": [
          "设计价值支撑型涨价方案",
          "配合产品升级合理涨价",
          "制定分步涨价计划"
        ]
      },
      {
        "day": 3,
        "title": "流程再造日",
        "tasks": [
          "梳理核心业务流程",
          "消除冗余环节和浪费",
          "制定标准化操作流程"
        ]
      },
      {
        "day": 4,
        "title": "收入多元化日",
        "tasks": [
          "探索新增收入来源",
          "评估外卖/团购/团采渠道",
          "设计增值服务收入"
        ]
      },
      {
        "day": 5,
        "title": "成本谈判日",
        "tasks": [
          "与房东谈租金条件",
          "与供应商谈价格优化",
          "与员工谈效率提升方案"
        ]
      },
      {
        "day": 6,
        "title": "执行启动日",
        "tasks": [
          "启动首轮涨价",
          "执行流程优化",
          "开通新增收入渠道"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估涨价客户反应",
          "统计利润改善效果",
          "制定持续优化计划"
        ]
      }
    ],
    "longTermAdvice": [
      "每年合理涨价1-2次，通过价值提升支撑价格",
      "持续进行流程再造，消除多年积累的效率损失",
      "拓展收入来源，不把利润押注在单一渠道上"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "PRODUCT_SLOW",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_s02",
      "sym_s06"
    ],
    "judgment": "你的新店属于产品验证不足型问题，核心原因是产品组合未经市场验证和缺乏主打爆品，需要快速验证和聚焦",
    "severity": 74,
    "causes": [
      {
        "name": "产品组合未经验证",
        "weight": 40,
        "judgment": "开业时的产品组合有经过测试吗？有多少产品是凭感觉选的？",
        "description": "产品组合缺乏市场验证，大量产品不符合本地需求"
      },
      {
        "name": "缺乏主打爆品",
        "weight": 30,
        "judgment": "有没有一款让客户必须来的拳头产品？",
        "description": "没有形成主打爆品，客户缺少明确的进店理由"
      },
      {
        "name": "产品线过宽或过窄",
        "weight": 20,
        "judgment": "产品数量是太多还是太少？客户是选择困难还是选择太少？",
        "description": "产品线宽度不当，影响客户决策和运营效率"
      },
      {
        "name": "定价与价值不匹配",
        "weight": 10,
        "judgment": "客户觉得你的产品值这个价吗？",
        "description": "产品定价与客户感知价值不匹配，影响购买决策"
      }
    ],
    "solutionIds": [
      "sol_003",
      "sol_004",
      "sol_019"
    ],
    "todayTasks": [
      {
        "task": "统计所有产品的销量和毛利，标记明星产品和问题产品",
        "duration": "45分钟",
        "purpose": "完成产品矩阵分析"
      },
      {
        "task": "选出1个最具潜力的爆品候选，制定打造计划",
        "duration": "1小时",
        "purpose": "聚焦爆品打造"
      },
      {
        "task": "设计3组不同价位的产品组合供客户选择",
        "duration": "30分钟",
        "purpose": "优化选择结构"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "产品验证日",
        "tasks": [
          "完成产品销量毛利矩阵",
          "标记明星/现金牛/问题/瘦狗",
          "制定产品调整方案"
        ]
      },
      {
        "day": 2,
        "title": "爆品聚焦日",
        "tasks": [
          "确定1个主打爆品",
          "集中资源推广爆品",
          "设计爆品专属体验"
        ]
      },
      {
        "day": 3,
        "title": "产品线优化日",
        "tasks": [
          "精简低效产品线",
          "聚焦核心品类",
          "确保产品线宽度适中"
        ]
      },
      {
        "day": 4,
        "title": "定价校准日",
        "tasks": [
          "测试不同定价的市场反应",
          "找到最佳价格点",
          "确保价值感匹配定价"
        ]
      },
      {
        "day": 5,
        "title": "爆品测试日",
        "tasks": [
          "推出爆品限时体验活动",
          "收集客户反馈",
          "优化爆品体验"
        ]
      },
      {
        "day": 6,
        "title": "组合设计日",
        "tasks": [
          "设计引流+利润组合套餐",
          "优化套餐价格锚点",
          "培训组合推荐话术"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计爆品销售数据",
          "分析套餐转化率",
          "确定产品战略方向"
        ]
      }
    ],
    "longTermAdvice": [
      "新店先做减法再做加法，聚焦1-2个爆品打透市场",
      "通过数据驱动选品，持续验证和迭代产品组合",
      "设计清晰的产品选择结构，降低客户决策成本"
    ],
    "caseIds": [
      "case_006"
    ],
    "toolIds": [
      "tool_007"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "PRODUCT_SLOW",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_s01",
      "sym_s02",
      "sym_s05"
    ],
    "judgment": "你的成长期门店属于产品竞争力下降型问题，核心原因是爆品衰退和新品断档，需要持续创新和延长产品生命周期",
    "severity": 71,
    "causes": [
      {
        "name": "爆品衰退",
        "weight": 35,
        "judgment": "原来的爆款产品销量是不是在下降？有替代品吗？",
        "description": "曾经的爆品进入衰退期，缺少接替的新爆品"
      },
      {
        "name": "新品研发断档",
        "weight": 30,
        "judgment": "多久没出新品了？新品上市后的成功率多少？",
        "description": "新品研发节奏断裂，产品线老化严重"
      },
      {
        "name": "客户口味变化",
        "weight": 20,
        "judgment": "客户的需求和偏好在变化吗？你有跟踪吗？",
        "description": "客户口味和需求变化，但产品没有跟上变化"
      },
      {
        "name": "产品迭代机制缺失",
        "weight": 15,
        "judgment": "有定期的产品复盘和迭代计划吗？",
        "description": "缺少系统化的产品迭代机制，产品更新靠灵感"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_007",
      "sol_019"
    ],
    "todayTasks": [
      {
        "task": "分析各产品生命周期阶段，标记衰退期产品",
        "duration": "45分钟",
        "purpose": "诊断产品生命周期"
      },
      {
        "task": "设计2款新品研发方案",
        "duration": "1小时",
        "purpose": "启动新品研发"
      },
      {
        "task": "收集客户对现有产品的改进建议",
        "duration": "30分钟",
        "purpose": "了解需求变化"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "生命周期审计日",
        "tasks": [
          "标记各产品生命周期阶段",
          "制定衰退品替代计划",
          "设计爆品续命方案"
        ]
      },
      {
        "day": 2,
        "title": "新品研发日",
        "tasks": [
          "研发2款新品",
          "内部品鉴筛选",
          "确定1款主推新品"
        ]
      },
      {
        "day": 3,
        "title": "老品升级日",
        "tasks": [
          "优化衰退期产品配方/设计",
          "增加新鲜元素",
          "延长产品生命周期"
        ]
      },
      {
        "day": 4,
        "title": "新品内测日",
        "tasks": [
          "邀请老客户试吃/试用新品",
          "收集反馈和改进建议",
          "确定新品最终版本"
        ]
      },
      {
        "day": 5,
        "title": "迭代机制日",
        "tasks": [
          "制定季度产品迭代计划",
          "建立新品研发SOP",
          "设置产品复盘日历"
        ]
      },
      {
        "day": 6,
        "title": "新品上线日",
        "tasks": [
          "新品正式上市",
          "设计新品专属推广活动",
          "线上线下同步宣传"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计新品首周销量",
          "分析老品升级效果",
          "优化产品迭代节奏"
        ]
      }
    ],
    "longTermAdvice": [
      "建立季度产品迭代机制，持续淘汰衰退品、推出新品",
      "提前布局下一代爆品，不让爆品断档",
      "跟踪客户需求变化，让产品始终与市场同步"
    ],
    "caseIds": [
      "case_006"
    ],
    "toolIds": [
      "tool_007"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "PRODUCT_SLOW",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_s01",
      "sym_s04",
      "sym_s05"
    ],
    "judgment": "你的老店属于产品老化型问题，核心原因是创新停滞和客户审美疲劳，需要产品全面革新和引入新鲜元素",
    "severity": 73,
    "causes": [
      {
        "name": "创新长期停滞",
        "weight": 35,
        "judgment": "过去1年推出了几款新品？成功了几款？",
        "description": "产品创新停滞，长期没有令人眼前一亮的新品"
      },
      {
        "name": "客户审美疲劳",
        "weight": 30,
        "judgment": "老客户是不是说'都吃/买腻了'？",
        "description": "客户对现有产品产生审美疲劳，消费频次下降"
      },
      {
        "name": "脱离市场趋势",
        "weight": 20,
        "judgment": "你知道当前市场流行什么吗？你的产品跟上趋势了吗？",
        "description": "产品脱轨市场趋势，无法吸引新一代消费者"
      },
      {
        "name": "品质管控松懈",
        "weight": 15,
        "judgment": "老产品的品质有没有下降？客户有没有反馈不如从前？",
        "description": "长期经营后品质管控松懈，核心产品质量下滑"
      }
    ],
    "solutionIds": [
      "sol_003",
      "sol_019",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "调研当前市场热门趋势和爆款产品",
        "duration": "1小时",
        "purpose": "了解市场风向"
      },
      {
        "task": "对核心产品进行品质检查，对比过去标准",
        "duration": "45分钟",
        "purpose": "排查品质滑坡"
      },
      {
        "task": "设计1个产品革新方案（保留经典+引入创新）",
        "duration": "1小时",
        "purpose": "规划产品革新"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "趋势调研日",
        "tasks": [
          "调研行业热门趋势",
          "分析年轻客群偏好",
          "确定产品革新方向"
        ]
      },
      {
        "day": 2,
        "title": "品质回归日",
        "tasks": [
          "恢复核心产品品质标准",
          "重新制定出品SOP",
          "培训出品标准执行"
        ]
      },
      {
        "day": 3,
        "title": "创新设计日",
        "tasks": [
          "设计3款创新产品方案",
          "结合经典+潮流元素",
          "确保创新不离核心定位"
        ]
      },
      {
        "day": 4,
        "title": "新品研发日",
        "tasks": [
          "实现1-2款创新产品",
          "内部品鉴和优化",
          "确定上市版本"
        ]
      },
      {
        "day": 5,
        "title": "老品升级日",
        "tasks": [
          "给经典产品增加新元素",
          "优化包装和呈现",
          "让老品焕发新生"
        ]
      },
      {
        "day": 6,
        "title": "新品发布日",
        "tasks": [
          "举办新品品鉴活动",
          "邀请老客户和KOL体验",
          "线上线下同步推广"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计新品市场反馈",
          "分析老品升级效果",
          "制定持续创新计划"
        ]
      }
    ],
    "longTermAdvice": [
      "每季度至少推出2款新品，保持产品和品牌活力",
      "坚持品质底线，核心产品的品质只会升不能降",
      "紧跟市场趋势但不盲从，找到经典与创新的平衡"
    ],
    "caseIds": [
      "case_006"
    ],
    "toolIds": [
      "tool_007"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "CUSTOMER_LOSS",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_c01",
      "sym_c03"
    ],
    "judgment": "你的新店属于客户留存困难型问题，核心原因是首单体验不完善和缺乏留存机制，需要优化首单体验和建立留存基础",
    "severity": 72,
    "causes": [
      {
        "name": "首单体验不完善",
        "weight": 35,
        "judgment": "新客户第一次到店体验完整吗？有没有给到超预期的惊喜？",
        "description": "首单体验缺乏设计，客户没有留下深刻印象"
      },
      {
        "name": "无留存触点",
        "weight": 30,
        "judgment": "客户离店后还能联系到吗？加了微信或留了电话吗？",
        "description": "没有留存触点，客户离店即失联"
      },
      {
        "name": "服务流程不稳定",
        "weight": 20,
        "judgment": "新店服务流程是否稳定？不同时间体验一致吗？",
        "description": "新店服务流程尚未稳定，体验时好时坏"
      },
      {
        "name": "缺少回店理由",
        "weight": 15,
        "judgment": "客户第二次来有什么理由？有设计回店诱饵吗？",
        "description": "没有设计引导客户二次到店的理由和机制"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_011",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "从客户视角完整走一遍首单体验流程，记录感受",
        "duration": "1小时",
        "purpose": "诊断首单体验"
      },
      {
        "task": "设计1个加微信/留联系方式的自然触点",
        "duration": "30分钟",
        "purpose": "建立留存通道"
      },
      {
        "task": "设计1个二次到店的专属优惠",
        "duration": "30分钟",
        "purpose": "制造回店理由"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "体验设计日",
        "tasks": [
          "设计完整首单体验流程",
          "增加超预期惊喜环节",
          "培训首单体验话术"
        ]
      },
      {
        "day": 2,
        "title": "留存触点日",
        "tasks": [
          "设计加微信/留电话的自然方式",
          "准备加粉话术和福利",
          "确保100%新客户留存触点"
        ]
      },
      {
        "day": 3,
        "title": "服务标准化日",
        "tasks": [
          "制定核心服务SOP",
          "设置服务检查点",
          "确保体验一致性"
        ]
      },
      {
        "day": 4,
        "title": "回店机制日",
        "tasks": [
          "设计二次到店专属优惠",
          "制定离店后3天内回访计划",
          "准备回访话术"
        ]
      },
      {
        "day": 5,
        "title": "社群基础日",
        "tasks": [
          "建立客户社群",
          "设计社群入群福利",
          "首批客户入群"
        ]
      },
      {
        "day": 6,
        "title": "回访启动日",
        "tasks": [
          "对本周所有到店客户进行回访",
          "引导二次到店",
          "收集体验反馈"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计新客留存率",
          "分析回访转化效果",
          "优化留存机制"
        ]
      }
    ],
    "longTermAdvice": [
      "将首单体验作为核心设计，让每个新客户都成为传播者",
      "确保100%新客户留下联系方式，建立留存基础",
      "设计持续的回店理由，新店3个月内复购率目标30%以上"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_004",
      "tool_008"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "CUSTOMER_LOSS",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_c01",
      "sym_c02",
      "sym_c04"
    ],
    "judgment": "你的成长期门店属于客户黏性不足型问题，核心原因是会员体系薄弱和客户运营粗放，需要深化会员运营和精细化客户管理",
    "severity": 70,
    "causes": [
      {
        "name": "会员体系薄弱",
        "weight": 35,
        "judgment": "会员占比多少？会员活跃率多少？会员和非会员消费差异大吗？",
        "description": "会员体系存在但效果差，会员权益无吸引力"
      },
      {
        "name": "客户运营粗放",
        "weight": 25,
        "judgment": "有没有客户分层？不同客户有不同的运营策略吗？",
        "description": "客户运营一刀切，缺少分层精细化管理"
      },
      {
        "name": "缺少情感连接",
        "weight": 25,
        "judgment": "客户对你有感情吗？离开会觉得可惜吗？",
        "description": "缺少情感化运营，客户与门店关系脆弱"
      },
      {
        "name": "竞品挖客严重",
        "weight": 15,
        "judgment": "竞品有没有专门针对你的客户做活动？",
        "description": "竞品有针对性挖客，缺少客户防御机制"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_011",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "分析会员数据：会员占比、活跃率、消费差异",
        "duration": "45分钟",
        "purpose": "诊断会员体系"
      },
      {
        "task": "设计3级客户分层标准和对应运营策略",
        "duration": "1小时",
        "purpose": "启动分层运营"
      },
      {
        "task": "制定1个客户情感连接方案",
        "duration": "30分钟",
        "purpose": "增强情感黏性"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "会员体系升级日",
        "tasks": [
          "重新设计会员权益",
          "增加会员专属服务和优惠",
          "制定会员升级机制"
        ]
      },
      {
        "day": 2,
        "title": "客户分层日",
        "tasks": [
          "完成客户3级分层",
          "制定各级别差异化运营策略",
          "培训员工分层服务标准"
        ]
      },
      {
        "day": 3,
        "title": "情感运营日",
        "tasks": [
          "设计客户生日/纪念日关怀",
          "建立客户喜好档案",
          "增加人情味服务细节"
        ]
      },
      {
        "day": 4,
        "title": "防御体系日",
        "tasks": [
          "建立客户流失预警",
          "制定竞品挖客应对方案",
          "设置核心客户防流失措施"
        ]
      },
      {
        "day": 5,
        "title": "社群激活日",
        "tasks": [
          "制定社群运营日历",
          "设计社群专属活动",
          "激活沉睡社群成员"
        ]
      },
      {
        "day": 6,
        "title": "口碑裂变日",
        "tasks": [
          "设计老客推荐奖励",
          "制作分享素材和工具",
          "启动口碑裂变活动"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计会员活跃率变化",
          "评估客户黏性指标",
          "优化客户运营策略"
        ]
      }
    ],
    "longTermAdvice": [
      "深化会员运营，让会员真正感受到专属价值",
      "实施客户分层精细化管理，核心客户月度个性化关怀",
      "建立情感连接和防御机制，让客户不容易被挖走"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_004",
      "tool_008"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "CUSTOMER_LOSS",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_c01",
      "sym_c02",
      "sym_c05"
    ],
    "judgment": "你的老店属于客户大规模流失型问题，核心原因是服务品质下滑和新鲜感缺失，需要品质回归和体验升级",
    "severity": 76,
    "causes": [
      {
        "name": "服务品质下滑",
        "weight": 35,
        "judgment": "客户有没有反馈不如从前？品质标准还在执行吗？",
        "description": "长期经营后品质管控松懈，客户体验下降"
      },
      {
        "name": "新鲜感缺失",
        "weight": 25,
        "judgment": "最近一次给客户新鲜感是什么时候？",
        "description": "长期不变导致客户审美疲劳，缺少回头动力"
      },
      {
        "name": "老客户关怀缺失",
        "weight": 25,
        "judgment": "有多久没主动联系老客户了？有老客户回馈活动吗？",
        "description": "对老客户缺少关怀和回馈，忠诚度降低"
      },
      {
        "name": "新客替代不足",
        "weight": 15,
        "judgment": "流失的老客户有新客户补充吗？新客获取率多少？",
        "description": "老客户流失严重，新客补充跟不上流失速度"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_003",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "整理近半年所有客户投诉和差评，找出品质问题",
        "duration": "45分钟",
        "purpose": "诊断品质滑坡"
      },
      {
        "task": "制定核心产品品质回归标准",
        "duration": "1小时",
        "purpose": "启动品质回归"
      },
      {
        "task": "设计1个老客户专属回馈方案",
        "duration": "30分钟",
        "purpose": "启动老客关怀"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "品质审计日",
        "tasks": [
          "全面检查出品和服务品质",
          "对比标准找出偏差",
          "制定品质回归清单"
        ]
      },
      {
        "day": 2,
        "title": "品质回归日",
        "tasks": [
          "恢复核心出品SOP",
          "培训品质标准执行",
          "设置品质检查岗"
        ]
      },
      {
        "day": 3,
        "title": "体验升级日",
        "tasks": [
          "设计1个让老客户眼前一亮的升级",
          "推出怀旧+创新组合",
          "增加服务仪式感"
        ]
      },
      {
        "day": 4,
        "title": "老客回馈日",
        "tasks": [
          "联系TOP30老客户",
          "发送专属回馈福利",
          "收集老客户建议"
        ]
      },
      {
        "day": 5,
        "title": "新客获取日",
        "tasks": [
          "启动线上引流活动",
          "设计新客体验价",
          "异业合作引流"
        ]
      },
      {
        "day": 6,
        "title": "口碑修复日",
        "tasks": [
          "回复所有线上差评",
          "发布品质升级内容",
          "邀请客户重新体验"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计品质回归效果",
          "评估老客户回流情况",
          "制定持续改善计划"
        ]
      }
    ],
    "longTermAdvice": [
      "坚持品质底线，宁可少做也不降低标准",
      "每半年做1次老客户回馈活动，让老客户感受到重视",
      "建立品质监控机制，防止品质在忙碌中悄悄下降"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_004",
      "tool_008"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "STAFF_HARD",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_h01",
      "sym_h02",
      "sym_h04"
    ],
    "judgment": "你的新店属于团队建设初期型问题，核心原因是培训体系未建立和人员配置不合理，需要快速建立标准化培训",
    "severity": 71,
    "causes": [
      {
        "name": "培训体系未建立",
        "weight": 40,
        "judgment": "新员工有标准培训流程吗？入职多久能独立工作？",
        "description": "新店培训体系尚未建立，员工上手慢影响经营"
      },
      {
        "name": "人员配置不合理",
        "weight": 25,
        "judgment": "现有人员数量和结构合理吗？有没有冗余或缺口？",
        "description": "人员配置凭感觉，不够科学"
      },
      {
        "name": "管理经验不足",
        "weight": 20,
        "judgment": "老板有管理经验吗？遇到人事问题怎么处理？",
        "description": "新店老板管理经验不足，人员管理粗放"
      },
      {
        "name": "薪资缺乏竞争力",
        "weight": 15,
        "judgment": "薪资水平在周边有竞争力吗？员工觉得公平吗？",
        "description": "薪资缺乏市场竞争力，招不到也留不住好员工"
      }
    ],
    "solutionIds": [
      "sol_011",
      "sol_015",
      "sol_018"
    ],
    "todayTasks": [
      {
        "task": "制定核心岗位的7天培训计划",
        "duration": "1小时",
        "purpose": "启动培训体系"
      },
      {
        "task": "调研周边3家竞品的薪资水平",
        "duration": "45分钟",
        "purpose": "校准薪资竞争力"
      },
      {
        "task": "梳理各岗位人数和技能需求",
        "duration": "30分钟",
        "purpose": "优化人员配置"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "培训体系日",
        "tasks": [
          "制定7天培训计划",
          "编写核心岗位SOP",
          "设计培训考核标准"
        ]
      },
      {
        "day": 2,
        "title": "薪资校准日",
        "tasks": [
          "完成竞品薪资调研",
          "调整薪资至市场水平",
          "设计绩效提成方案"
        ]
      },
      {
        "day": 3,
        "title": "岗位优化日",
        "tasks": [
          "梳理岗位需求",
          "调整人员配置",
          "消除冗余和缺口"
        ]
      },
      {
        "day": 4,
        "title": "流程标准日",
        "tasks": [
          "制定核心工作流程SOP",
          "设置工作检查点",
          "培训执行标准"
        ]
      },
      {
        "day": 5,
        "title": "师徒带教日",
        "tasks": [
          "设计师徒带教机制",
          "指定带教师傅",
          "建立带教考核"
        ]
      },
      {
        "day": 6,
        "title": "团队建设日",
        "tasks": [
          "组织首次团队活动",
          "建立每日晨会制度",
          "营造团队氛围"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估培训效果",
          "收集员工反馈",
          "优化管理方式"
        ]
      }
    ],
    "longTermAdvice": [
      "尽快建立标准化培训体系，缩短新人上手周期",
      "确保薪资有市场竞争力，这是留人的基础",
      "从第一天就建立管理规范，避免后期纠正成本"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_008",
      "tool_009"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "STAFF_HARD",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_h01",
      "sym_h03",
      "sym_h05"
    ],
    "judgment": "你的成长期门店属于管理瓶颈型问题，核心原因是管理制度跟不上发展速度和核心人员依赖，需要管理升级",
    "severity": 70,
    "causes": [
      {
        "name": "管理滞后于发展",
        "weight": 35,
        "judgment": "业务增长了但管理方式还是小作坊式吗？",
        "description": "业务规模增长但管理方式滞后，产生各种管理问题"
      },
      {
        "name": "核心人员依赖",
        "weight": 30,
        "judgment": "如果核心员工离职，门店还能正常运转吗？",
        "description": "过度依赖少数核心人员，风险集中"
      },
      {
        "name": "激励机制不匹配",
        "weight": 20,
        "judgment": "现有激励能留住优秀员工吗？有成长空间吗？",
        "description": "激励机制跟不上员工期望，优秀员工流失"
      },
      {
        "name": "沟通机制不畅",
        "weight": 15,
        "judgment": "员工愿意反馈问题吗？有定期沟通机制吗？",
        "description": "缺少有效的沟通机制，问题积累到爆发"
      }
    ],
    "solutionIds": [
      "sol_011",
      "sol_015",
      "sol_018"
    ],
    "todayTasks": [
      {
        "task": "列出所有核心岗位和备岗情况",
        "duration": "30分钟",
        "purpose": "评估人员风险"
      },
      {
        "task": "设计1个绩效激励升级方案",
        "duration": "1小时",
        "purpose": "提升激励性"
      },
      {
        "task": "建立每周1次的员工沟通会制度",
        "duration": "30分钟",
        "purpose": "改善沟通机制"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "管理升级日",
        "tasks": [
          "梳理现有管理制度",
          "识别管理短板",
          "制定升级计划"
        ]
      },
      {
        "day": 2,
        "title": "备岗计划日",
        "tasks": [
          "为核心岗位指定AB角",
          "制定知识沉淀文档",
          "启动备岗培训"
        ]
      },
      {
        "day": 3,
        "title": "激励改革日",
        "tasks": [
          "设计底薪+绩效+分红结构",
          "制定晋升通道和标准",
          "公布激励改革方案"
        ]
      },
      {
        "day": 4,
        "title": "沟通机制日",
        "tasks": [
          "建立定期沟通制度",
          "设置意见反馈渠道",
          "开展首次员工座谈"
        ]
      },
      {
        "day": 5,
        "title": "授权日",
        "tasks": [
          "制定岗位授权清单",
          "下放日常决策权",
          "减少老板亲力亲为"
        ]
      },
      {
        "day": 6,
        "title": "文化建设日",
        "tasks": [
          "明确团队价值观",
          "设计团队活动计划",
          "建立正向激励机制"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估管理升级效果",
          "收集员工反馈",
          "持续优化管理制度"
        ]
      }
    ],
    "longTermAdvice": [
      "管理要跟上业务发展速度，不能让管理成为瓶颈",
      "培养核心岗位备岗，降低人员依赖风险",
      "建立有激励性的薪酬和晋升体系，留住优秀人才"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_008",
      "tool_009"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "STAFF_HARD",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_h01",
      "sym_h03",
      "sym_h05"
    ],
    "judgment": "你的老店属于团队老化型问题，核心原因是管理僵化和缺乏新鲜血液，需要注入新活力和改革激励机制",
    "severity": 72,
    "causes": [
      {
        "name": "管理方式僵化",
        "weight": 35,
        "judgment": "管理制度多久没更新了？是否还停留在创立初期？",
        "description": "管理方式陈旧僵化，不适应现有团队和发展需要"
      },
      {
        "name": "缺乏新鲜血液",
        "weight": 25,
        "judgment": "团队平均在职多久？有引进新人才吗？",
        "description": "团队老化缺少新思维，创新和变革动力不足"
      },
      {
        "name": "老员工倦怠",
        "weight": 25,
        "judgment": "老员工是否积极性下降？有倦怠现象吗？",
        "description": "长期在岗的老员工产生职业倦怠，影响团队氛围"
      },
      {
        "name": "晋升天花板",
        "weight": 15,
        "judgment": "老员工还有上升空间吗？有退出和接班机制吗？",
        "description": "老员工遇到晋升天花板，看不到发展空间"
      }
    ],
    "solutionIds": [
      "sol_011",
      "sol_015",
      "sol_018"
    ],
    "todayTasks": [
      {
        "task": "与3位核心老员工深度沟通，了解期望和痛点",
        "duration": "1.5小时",
        "purpose": "了解团队现状"
      },
      {
        "task": "设计1个老员工激活方案（新角色/新挑战/新激励）",
        "duration": "1小时",
        "purpose": "激活老员工"
      },
      {
        "task": "制定1个新人引进计划",
        "duration": "30分钟",
        "purpose": "注入新鲜血液"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "团队诊断日",
        "tasks": [
          "完成团队能力和状态评估",
          "识别倦怠和风险员工",
          "制定激活和更新计划"
        ]
      },
      {
        "day": 2,
        "title": "老员工激活日",
        "tasks": [
          "设计老员工新角色或新挑战",
          "制定专项激励方案",
          "赋予更多授权和责任"
        ]
      },
      {
        "day": 3,
        "title": "制度更新日",
        "tasks": [
          "更新过时的管理制度",
          "引入现代化管理工具",
          "制定弹性管理方案"
        ]
      },
      {
        "day": 4,
        "title": "新人引进日",
        "tasks": [
          "启动新岗位招聘",
          "设计新人融入计划",
          "安排老带新组合"
        ]
      },
      {
        "day": 5,
        "title": "晋升改革日",
        "tasks": [
          "设计多通道晋升路径",
          "制定合伙人/分红机制",
          "打破晋升天花板"
        ]
      },
      {
        "day": 6,
        "title": "团队重塑日",
        "tasks": [
          "组织团队重塑活动",
          "建立新老融合机制",
          "营造积极竞争氛围"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估团队状态变化",
          "收集员工反馈",
          "持续优化团队建设"
        ]
      }
    ],
    "longTermAdvice": [
      "定期注入新鲜血液，保持团队活力和创新力",
      "为老员工设计新的成长通道，避免晋升天花板",
      "更新管理方式，让制度适应发展而非束缚发展"
    ],
    "caseIds": [
      "case_005"
    ],
    "toolIds": [
      "tool_008",
      "tool_009"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "MARKETING_HARD",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_m01",
      "sym_m03",
      "sym_m04"
    ],
    "judgment": "你的新店属于营销起步型问题，核心原因是营销基础为零和不知从何下手，需要从0搭建线上营销基础",
    "severity": 68,
    "causes": [
      {
        "name": "营销基础为零",
        "weight": 40,
        "judgment": "线上渠道有没有开店？线下有做过推广吗？",
        "description": "营销从零开始，缺少任何线上线下的营销动作"
      },
      {
        "name": "不知从何入手",
        "weight": 25,
        "judgment": "营销方式那么多，你觉得最该先做哪个？",
        "description": "面对众多营销方式无从下手，不知道优先级"
      },
      {
        "name": "缺少营销预算",
        "weight": 20,
        "judgment": "月营销预算多少？有没有分配营销资金？",
        "description": "缺少专门的营销预算，所有投入靠试"
      },
      {
        "name": "没有营销人才",
        "weight": 15,
        "judgment": "团队中有懂营销的人吗？谁负责营销？",
        "description": "团队缺少营销能力，老板也不擅长"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_013",
      "sol_016"
    ],
    "todayTasks": [
      {
        "task": "在大众点评认领门店并完善信息",
        "duration": "1小时",
        "purpose": "建立线上基础"
      },
      {
        "task": "拍摄10张门店/产品/环境照片",
        "duration": "45分钟",
        "purpose": "准备营销素材"
      },
      {
        "task": "制定每月2000元以内的营销预算分配",
        "duration": "30分钟",
        "purpose": "规划营销投入"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "线上建店日",
        "tasks": [
          "完善大众点评信息",
          "开通抖音来客",
          "注册小红书账号"
        ]
      },
      {
        "day": 2,
        "title": "素材准备日",
        "tasks": [
          "拍摄门店和产品照片",
          "录制短视频素材",
          "撰写店铺介绍文案"
        ]
      },
      {
        "day": 3,
        "title": "首次发布日",
        "tasks": [
          "发布3条大众点评笔记",
          "发布1条抖音视频",
          "发布1条小红书内容"
        ]
      },
      {
        "day": 4,
        "title": "开业活动日",
        "tasks": [
          "设计开业引流活动",
          "制作活动海报",
          "门店布置活动氛围"
        ]
      },
      {
        "day": 5,
        "title": "地推启动日",
        "tasks": [
          "周边500米派发传单",
          "进入社区群推广",
          "与周边商家互推"
        ]
      },
      {
        "day": 6,
        "title": "好评引导日",
        "tasks": [
          "引导到店客户写好评",
          "设置好评小礼品",
          "积累线上口碑"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各渠道曝光数据",
          "评估活动引流效果",
          "制定下周营销计划"
        ]
      }
    ],
    "longTermAdvice": [
      "从最基础的线上铺设开始，先有存在感再求效果",
      "每月固定营销预算，哪怕很少也要坚持投入",
      "学习基础营销技能，或找一个靠谱的营销服务"
    ],
    "caseIds": [
      "case_007"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "MARKETING_HARD",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_m02",
      "sym_m04",
      "sym_m06"
    ],
    "judgment": "你的成长期门店属于营销效率型问题，核心原因是营销投入产出比低和缺少系统化策略，需要优化营销ROI和建立系统",
    "severity": 66,
    "causes": [
      {
        "name": "营销ROI低",
        "weight": 35,
        "judgment": "每花1块钱营销能带来多少营收？哪些渠道效果最好？",
        "description": "营销有投入但产出不明确，缺少ROI衡量"
      },
      {
        "name": "营销方式零散",
        "weight": 25,
        "judgment": "营销活动是零散的还是系统的？有年度营销计划吗？",
        "description": "营销动作零散无系统，缺少整体规划"
      },
      {
        "name": "缺少可复制渠道",
        "weight": 25,
        "judgment": "有没有一个稳定产出新客的获客渠道？",
        "description": "缺少稳定的可复制获客渠道，获客全靠碰运气"
      },
      {
        "name": "内容质量不稳定",
        "weight": 15,
        "judgment": "线上内容质量和频率稳定吗？",
        "description": "内容发布不规律，质量参差不齐"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_013",
      "sol_016"
    ],
    "todayTasks": [
      {
        "task": "计算各营销渠道的ROI，标记最有效和最低效的",
        "duration": "45分钟",
        "purpose": "优化营销投入"
      },
      {
        "task": "制定月度营销日历（4周活动+内容规划）",
        "duration": "1小时",
        "purpose": "系统化营销"
      },
      {
        "task": "选定1个主攻获客渠道，集中资源突破",
        "duration": "30分钟",
        "purpose": "建立可复制渠道"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "ROI审计日",
        "tasks": [
          "分析各渠道ROI",
          "砍掉低效营销投入",
          "聚焦高效渠道"
        ]
      },
      {
        "day": 2,
        "title": "系统规划日",
        "tasks": [
          "制定月度营销日历",
          "设计4次活动节奏",
          "明确内容发布频率"
        ]
      },
      {
        "day": 3,
        "title": "渠道深耕日",
        "tasks": [
          "选定1个主攻渠道",
          "投入资源集中突破",
          "建立稳定获客流程"
        ]
      },
      {
        "day": 4,
        "title": "内容体系日",
        "tasks": [
          "制定内容模板和标准",
          "批量生产1周内容",
          "建立内容素材库"
        ]
      },
      {
        "day": 5,
        "title": "数据驱动日",
        "tasks": [
          "设置营销数据追踪",
          "建立周度数据复盘",
          "用数据指导投入"
        ]
      },
      {
        "day": 6,
        "title": "自动化日",
        "tasks": [
          "设置自动回复和提醒",
          "利用工具提升效率",
          "减少重复手动操作"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算本周营销ROI",
          "评估获客成本变化",
          "优化营销系统"
        ]
      }
    ],
    "longTermAdvice": [
      "用数据驱动营销决策，只投入ROI为正的渠道",
      "建立系统化的营销日历，不再零散做活动",
      "深耕1-2个可复制的获客渠道，实现稳定获客"
    ],
    "caseIds": [
      "case_007"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "MARKETING_HARD",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_m02",
      "sym_m05",
      "sym_m06"
    ],
    "judgment": "你的老店属于营销转型型问题，核心原因是营销方式停留在传统模式和不懂新渠道玩法，需要拥抱新媒体和数字化营销",
    "severity": 70,
    "causes": [
      {
        "name": "营销方式传统",
        "weight": 35,
        "judgment": "还在只靠发传单和口碑吗？有没有尝试过线上营销？",
        "description": "营销方式停留在传统阶段，没有跟上数字化趋势"
      },
      {
        "name": "不懂新渠道玩法",
        "weight": 30,
        "judgment": "抖音、小红书、直播这些新渠道会玩吗？",
        "description": "对新渠道不熟悉，无法利用新媒体获客"
      },
      {
        "name": "线上资产空白",
        "weight": 20,
        "judgment": "搜索你的店名能搜到什么？有线上内容沉淀吗？",
        "description": "多年经营但线上内容资产几乎为零"
      },
      {
        "name": "品牌老化影响传播",
        "weight": 15,
        "judgment": "品牌形象是否让人感觉过时？影响客户分享意愿吗？",
        "description": "品牌形象老化，客户不愿意主动传播分享"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_013",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "搜索你的店名，看线上能找到什么信息",
        "duration": "30分钟",
        "purpose": "诊断线上资产"
      },
      {
        "task": "在抖音上找3个同行业爆款视频学习",
        "duration": "1小时",
        "purpose": "学习新渠道玩法"
      },
      {
        "task": "制定1个新媒体入门行动计划",
        "duration": "45分钟",
        "purpose": "规划营销转型"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "线上资产日",
        "tasks": [
          "完善所有线上平台信息",
          "上传门店和产品内容",
          "补充缺失的线上信息"
        ]
      },
      {
        "day": 2,
        "title": "新渠道学习日",
        "tasks": [
          "学习抖音基础运营",
          "学习小红书种草方法",
          "制定新渠道运营计划"
        ]
      },
      {
        "day": 3,
        "title": "内容启动日",
        "tasks": [
          "拍摄3条短视频",
          "撰写2条种草笔记",
          "发布首批新渠道内容"
        ]
      },
      {
        "day": 4,
        "title": "直播尝试日",
        "tasks": [
          "尝试1次直播（哪怕只是门店日常）",
          "学习直播基本技巧",
          "积累直播经验"
        ]
      },
      {
        "day": 5,
        "title": "品牌焕新日",
        "tasks": [
          "优化门店视觉呈现",
          "更新宣传物料风格",
          "让品牌看起来更时尚"
        ]
      },
      {
        "day": 6,
        "title": "口碑激活日",
        "tasks": [
          "邀请老客户写线上好评",
          "发布老店故事和情怀内容",
          "激活线上口碑传播"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计新渠道数据",
          "评估品牌焕新反馈",
          "制定持续运营计划"
        ]
      }
    ],
    "longTermAdvice": [
      "从传统营销向数字化营销转型，这是不可逆的趋势",
      "利用老店的积累做内容，老店的故事和口碑是最大资产",
      "不要追求完美，先在新渠道做起来再逐步优化"
    ],
    "caseIds": [
      "case_007"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "COMPETITION",
    "industry": "all",
    "stage": "新店",
    "symptomIds": [
      "sym_x01",
      "sym_x04"
    ],
    "judgment": "你的新店属于竞争突围型问题，核心原因是品牌未建立和客户认知为零，需要在竞品包围中找到差异切入口",
    "severity": 78,
    "causes": [
      {
        "name": "品牌认知为零",
        "weight": 40,
        "judgment": "新客户凭什么选你而不选老品牌？有给出选择理由吗？",
        "description": "新店品牌认知为零，客户没有选择你的理由"
      },
      {
        "name": "缺乏差异化切入口",
        "weight": 30,
        "judgment": "在竞品林立的市场中，你的差异化定位是什么？",
        "description": "没有找到差异化的市场切入口，泯然众人"
      },
      {
        "name": "资源劣势明显",
        "weight": 20,
        "judgment": "与老店/连锁相比，你的资源优势在哪？",
        "description": "新店资源有限，无法与成熟竞品正面竞争"
      },
      {
        "name": "客户信任未建立",
        "weight": 10,
        "judgment": "新客户对你有信任吗？怎么建立信任？",
        "description": "新店缺少信任积累，客户更倾向选择老品牌"
      }
    ],
    "solutionIds": [
      "sol_003",
      "sol_012",
      "sol_013"
    ],
    "todayTasks": [
      {
        "task": "走访周边3家竞品，找出它们的弱点",
        "duration": "2小时",
        "purpose": "发现差异化机会"
      },
      {
        "task": "确定1个你能做但竞品没做到的差异点",
        "duration": "1小时",
        "purpose": "确立竞争定位"
      },
      {
        "task": "设计1个新客信任保障方案",
        "duration": "30分钟",
        "purpose": "降低信任门槛"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞品分析日",
        "tasks": [
          "完成3家竞品详细分析",
          "找出竞品弱点和市场空白",
          "确定差异化方向"
        ]
      },
      {
        "day": 2,
        "title": "差异定位日",
        "tasks": [
          "确定1个核心差异点",
          "围绕差异点设计体验",
          "制定差异化传播话术"
        ]
      },
      {
        "day": 3,
        "title": "信任建设日",
        "tasks": [
          "设计新客保障承诺",
          "制定体验价方案",
          "建立信任背书"
        ]
      },
      {
        "day": 4,
        "title": "聚焦突破日",
        "tasks": [
          "在差异化点集中发力",
          "用极致体验打口碑",
          "首批客户深度服务"
        ]
      },
      {
        "day": 5,
        "title": "侧翼竞争日",
        "tasks": [
          "避开竞品强势正面",
          "选择竞品薄弱环节进攻",
          "用灵活对抗规模"
        ]
      },
      {
        "day": 6,
        "title": "口碑引爆日",
        "tasks": [
          "引导首批客户好评",
          "制造差异化话题",
          "启动老客推荐"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估差异化认知度",
          "统计新客选择原因",
          "优化竞争策略"
        ]
      }
    ],
    "longTermAdvice": [
      "新店不要正面竞争，找竞品忽视的差异化切入口",
      "用极致体验在差异化点做出口碑，建立品牌认知",
      "快速建立客户信任，让新客户敢于选择你"
    ],
    "caseIds": [
      "case_008"
    ],
    "toolIds": [
      "tool_001",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "COMPETITION",
    "industry": "all",
    "stage": "成长期",
    "symptomIds": [
      "sym_x01",
      "sym_x03",
      "sym_x04"
    ],
    "judgment": "你的成长期门店属于竞争加剧型问题，核心原因是竞争壁垒薄弱和客户忠诚度不足，需要构建竞争壁垒和强化客户关系",
    "severity": 74,
    "causes": [
      {
        "name": "竞争壁垒薄弱",
        "weight": 35,
        "judgment": "竞品容易复制你吗？你有难以复制的优势吗？",
        "description": "缺少真正的竞争壁垒，竞品可以轻易模仿"
      },
      {
        "name": "客户忠诚度不足",
        "weight": 25,
        "judgment": "客户是因为你独特还是因为方便？换一家也行吗？",
        "description": "客户忠诚度不够，容易被竞品活动吸引走"
      },
      {
        "name": "市场份额被蚕食",
        "weight": 25,
        "judgment": "新竞品进入后你的客户有减少吗？",
        "description": "新竞品不断蚕食市场份额，增长被压制"
      },
      {
        "name": "缺乏联盟防御",
        "weight": 15,
        "judgment": "有没有和其他商家形成联盟对抗竞品？",
        "description": "单打独斗对抗竞品，缺少联合防御"
      }
    ],
    "solutionIds": [
      "sol_008",
      "sol_013",
      "sol_017"
    ],
    "todayTasks": [
      {
        "task": "列出3个你最核心但竞品难以复制的优势",
        "duration": "45分钟",
        "purpose": "识别竞争壁垒"
      },
      {
        "task": "设计1个客户锁客方案（储值/会员/长期套餐）",
        "duration": "1小时",
        "purpose": "强化客户忠诚"
      },
      {
        "task": "联系2家非竞争商家探讨联盟合作",
        "duration": "30分钟",
        "purpose": "启动联盟防御"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "壁垒构建日",
        "tasks": [
          "强化核心竞争优势",
          "构建难以复制的壁垒",
          "申请相关资质或独家"
        ]
      },
      {
        "day": 2,
        "title": "锁客方案日",
        "tasks": [
          "设计储值锁客方案",
          "制定长期会员套餐",
          "建立客户沉没成本"
        ]
      },
      {
        "day": 3,
        "title": "客户深耕日",
        "tasks": [
          "深化核心客户关系",
          "提供竞品没有的专属服务",
          "打造客户归属感"
        ]
      },
      {
        "day": 4,
        "title": "差异化强化日",
        "tasks": [
          "放大差异化优势传播",
          "在差异化点做极致",
          "让差异成为标签"
        ]
      },
      {
        "day": 5,
        "title": "联盟组建日",
        "tasks": [
          "联合3-5家非竞争商家",
          "建立异业互推联盟",
          "共享客户资源"
        ]
      },
      {
        "day": 6,
        "title": "防御演练日",
        "tasks": [
          "制定竞品促销应对方案",
          "准备客户挽留预案",
          "设置竞品动态监控"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估壁垒加固效果",
          "分析客户忠诚度变化",
          "优化竞争防御策略"
        ]
      }
    ],
    "longTermAdvice": [
      "持续构建竞争壁垒，让竞品越来越难以复制",
      "通过储值和深度关系锁住核心客户，降低流失风险",
      "建立商家联盟，用群体力量对抗竞品压力"
    ],
    "caseIds": [
      "case_008"
    ],
    "toolIds": [
      "tool_004",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "COMPETITION",
    "industry": "all",
    "stage": "老店",
    "symptomIds": [
      "sym_x01",
      "sym_x03",
      "sym_x05"
    ],
    "judgment": "你的老店属于竞争防御型问题，核心原因是品牌创新不足和规模劣势明显，需要品牌升级和发挥本地优势",
    "severity": 76,
    "causes": [
      {
        "name": "品牌创新不足",
        "weight": 35,
        "judgment": "老品牌有没有注入新活力？还是停留在过去？",
        "description": "老品牌缺少创新活力，对新一代客户缺乏吸引力"
      },
      {
        "name": "规模劣势",
        "weight": 25,
        "judgment": "面对连锁品牌的规模优势，你的优势在哪？",
        "description": "连锁品牌的供应链和品牌优势越来越明显"
      },
      {
        "name": "客户基础被蚕食",
        "weight": 25,
        "judgment": "老客户有没有被新品牌吸引走？比例多少？",
        "description": "积累的客户基础被新品牌不断蚕食"
      },
      {
        "name": "经营模式落后",
        "weight": 15,
        "judgment": "经营方式跟上了时代吗？还在用5年前的方法吗？",
        "description": "经营模式落后，无法适应新的竞争环境"
      }
    ],
    "solutionIds": [
      "sol_013",
      "sol_017",
      "sol_020"
    ],
    "todayTasks": [
      {
        "task": "列出你的老店最大3个优势（口碑/信任/客户关系）",
        "duration": "30分钟",
        "purpose": "识别本地优势"
      },
      {
        "task": "设计1个品牌升级方案（保留老味道+注入新元素）",
        "duration": "1小时",
        "purpose": "规划品牌升级"
      },
      {
        "task": "制定1个客户回归计划",
        "duration": "30分钟",
        "purpose": "激活客户基础"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "品牌升级日",
        "tasks": [
          "制定品牌升级方案",
          "保留经典+注入创新",
          "设计焕新视觉形象"
        ]
      },
      {
        "day": 2,
        "title": "本地优势日",
        "tasks": [
          "强化本地深耕优势",
          "打造社区信任品牌",
          "发挥人情味服务"
        ]
      },
      {
        "day": 3,
        "title": "客户回归日",
        "tasks": [
          "联系流失客户",
          "提供老客专属回归方案",
          "激活沉睡客户基础"
        ]
      },
      {
        "day": 4,
        "title": "差异化强化日",
        "tasks": [
          "放大连锁做不到的优势",
          "突出个性化服务",
          "强化本地情感连接"
        ]
      },
      {
        "day": 5,
        "title": "模式升级日",
        "tasks": [
          "引入数字化经营工具",
          "升级会员和营销体系",
          "用新技术提升效率"
        ]
      },
      {
        "day": 6,
        "title": "联盟对抗日",
        "tasks": [
          "联合周边商家",
          "建立本地商业联盟",
          "集体对抗连锁品牌"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估品牌升级反馈",
          "分析客户回归效果",
          "优化竞争策略"
        ]
      }
    ],
    "longTermAdvice": [
      "老店要发挥本地信任和关系优势，这是连锁做不到的",
      "品牌升级但不丢根基，让老客户觉得焕然一新但仍熟悉",
      "用数字化工具弥补规模劣势，小而美也可以很强"
    ],
    "caseIds": [
      "case_008"
    ],
    "toolIds": [
      "tool_004",
      "tool_010"
    ],
    "priority": 9,
    "status": 1
  },
  {
    "problemCode": "TRAFFIC_LOW",
    "industry": "all",
    "stage": "all",
    "symptomIds": [
      "sym_t01",
      "sym_r01",
      "sym_p01"
    ],
    "judgment": "你的门店存在多维度经营问题，核心原因是经营系统化不足，需要从引流、转化、留存三个环节全面优化",
    "severity": 65,
    "causes": [
      {
        "name": "引流能力不足",
        "weight": 30,
        "judgment": "月新增客户数多少？获客渠道有几个？",
        "description": "缺少主动引流手段，新客户来源不稳定"
      },
      {
        "name": "转化效率低",
        "weight": 30,
        "judgment": "进店客户转化率多少？客单价合理吗？",
        "description": "客户进店后转化不充分，客单价和成交率偏低"
      },
      {
        "name": "留存能力弱",
        "weight": 25,
        "judgment": "复购率和转介绍率各多少？",
        "description": "客户留存能力弱，缺少系统化的客户经营"
      },
      {
        "name": "经营缺少系统",
        "weight": 15,
        "judgment": "各项经营动作是系统规划还是随机进行？",
        "description": "经营缺少系统规划，头疼医头脚疼医脚"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_002",
      "sol_009"
    ],
    "todayTasks": [
      {
        "task": "计算3个核心指标：月新增客、客单价、复购率",
        "duration": "45分钟",
        "purpose": "明确经营现状"
      },
      {
        "task": "找出3个指标中最薄弱的1个，确定优先改善",
        "duration": "30分钟",
        "purpose": "聚焦关键问题"
      },
      {
        "task": "制定1个7天改善行动计划",
        "duration": "45分钟",
        "purpose": "启动系统改善"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "全面诊断日",
        "tasks": [
          "完成引流-转化-留存全链路分析",
          "找出最薄弱环节",
          "确定优先改善方向"
        ]
      },
      {
        "day": 2,
        "title": "引流改善日",
        "tasks": [
          "启动1个新引流动作",
          "优化线上店铺信息",
          "设计1个到店活动"
        ]
      },
      {
        "day": 3,
        "title": "转化提升日",
        "tasks": [
          "优化产品/服务组合",
          "设计提升客单价方案",
          "培训推荐话术"
        ]
      },
      {
        "day": 4,
        "title": "留存启动日",
        "tasks": [
          "建立客户联系方式留存",
          "设计复购激励方案",
          "启动客户回访"
        ]
      },
      {
        "day": 5,
        "title": "系统搭建日",
        "tasks": [
          "制定月度经营日历",
          "设置关键指标追踪",
          "建立每日经营复盘"
        ]
      },
      {
        "day": 6,
        "title": "执行加速日",
        "tasks": [
          "全面落实本周计划",
          "检查各环节执行情况",
          "解决执行中的问题"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计3个核心指标变化",
          "评估各环节改善效果",
          "制定下月系统优化计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立引流-转化-留存全链路经营系统，每个环节都有明确动作",
      "用数据驱动经营决策，关键指标每周追踪",
      "系统化经营取代随机经营，持续优化而非临时应对"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_005"
    ],
    "priority": 1,
    "status": 1
  },
  {
    "problemCode": "PROFIT_LOW",
    "industry": "all",
    "stage": "all",
    "symptomIds": [
      "sym_p01",
      "sym_p05",
      "sym_r01"
    ],
    "judgment": "你的门店存在营收与利润双重压力，核心原因是开源不足和节流不力，需要同时推进增收和降本",
    "severity": 70,
    "causes": [
      {
        "name": "增收渠道单一",
        "weight": 30,
        "judgment": "收入来源有几个？有没有开拓新收入渠道？",
        "description": "收入来源单一，缺少增收渠道"
      },
      {
        "name": "成本管控粗放",
        "weight": 30,
        "judgment": "各项成本有目标值吗？超支有预警吗？",
        "description": "成本管控粗放，缺少精细化管理"
      },
      {
        "name": "产品结构低效",
        "weight": 25,
        "judgment": "高毛利产品占比多少？有优化产品结构吗？",
        "description": "产品结构效率低，低毛利占比过高"
      },
      {
        "name": "经营效率不足",
        "weight": 15,
        "judgment": "坪效和人效达标吗？有提升空间吗？",
        "description": "经营效率不足，资源和人力利用不充分"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_009",
      "sol_014"
    ],
    "todayTasks": [
      {
        "task": "计算营收-成本=利润的详细拆解表",
        "duration": "45分钟",
        "purpose": "明确利润结构"
      },
      {
        "task": "标记3个最有可能降本的成本项",
        "duration": "30分钟",
        "purpose": "找到节流方向"
      },
      {
        "task": "列出2个增收机会并评估可行性",
        "duration": "45分钟",
        "purpose": "找到开源方向"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "利润拆解日",
        "tasks": [
          "完成利润结构详细分析",
          "找出利润漏水点",
          "制定增收降本双线计划"
        ]
      },
      {
        "day": 2,
        "title": "增收行动日",
        "tasks": [
          "启动1个增收渠道",
          "设计提升客单价方案",
          "优化产品组合"
        ]
      },
      {
        "day": 3,
        "title": "降本行动日",
        "tasks": [
          "削减3项非必要支出",
          "优化采购降低成本",
          "减少浪费和损耗"
        ]
      },
      {
        "day": 4,
        "title": "结构优化日",
        "tasks": [
          "调整产品毛利结构",
          "增加高毛利产品占比",
          "设计利润款组合"
        ]
      },
      {
        "day": 5,
        "title": "效率提升日",
        "tasks": [
          "提升坪效和人效",
          "优化排班和流程",
          "用更少资源做更多事"
        ]
      },
      {
        "day": 6,
        "title": "机制建设日",
        "tasks": [
          "建立成本管控机制",
          "设置利润预警线",
          "培训全员利润意识"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算本周利润改善",
          "评估增收降本效果",
          "制定下月利润目标"
        ]
      }
    ],
    "longTermAdvice": [
      "增收和降本双线并行，不要只做一头",
      "建立精细化成本管控，每项成本都有目标值",
      "优化产品结构提升整体毛利，这是最有效的利润提升方式"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 1,
    "status": 1
  },
  {
    "_id": "path_51",
    "problemCode": "PRODUCT_SLOW",
    "industry": "餐饮",
    "stage": "新店",
    "symptomIds": [
      "sym_s01",
      "sym_s02",
      "sym_s04"
    ],
    "judgment": "你的新开餐饮门店菜品尚未经市场验证，缺乏主打爆款导致顾客选择困难",
    "severity": 65,
    "causes": [
      {
        "name": "菜品未经市场验证",
        "weight": 40,
        "judgment": "开业前做过菜品测试吗？哪些菜是顾客必点的？",
        "description": "新店菜品凭经验设计，未在目标客群中测试，导致核心菜品不受欢迎"
      },
      {
        "name": "缺少招牌爆款",
        "weight": 30,
        "judgment": "顾客提到你的店会想到哪道菜？有记忆点吗？",
        "description": "没有打造出让人记住的招牌菜，顾客无法形成品类认知"
      },
      {
        "name": "菜品数量过多",
        "weight": 20,
        "judgment": "菜单上有多少道菜？新店是否贪多嚼不烂？",
        "description": "新店菜品过多分散了出品质量，备料压力大损耗高"
      },
      {
        "name": "出品不稳定",
        "weight": 10,
        "judgment": "同一道菜每次口味一致吗？新员工出品达标吗？",
        "description": "新团队配合不熟练，出品标准不统一，影响复购意愿"
      }
    ],
    "solutionIds": [
      "sol_007",
      "sol_021",
      "sol_022"
    ],
    "todayTasks": [
      {
        "task": "统计开业以来各菜品销售数据，标记畅销与滞销品",
        "duration": "45分钟",
        "purpose": "识别菜品表现"
      },
      {
        "task": "确定1-2道招牌菜并制定标准化SOP",
        "duration": "1小时",
        "purpose": "打造记忆点"
      },
      {
        "task": "精简菜单，将菜品数控制在合理范围",
        "duration": "30分钟",
        "purpose": "聚焦出品"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "菜品数据盘点日",
        "tasks": [
          "统计各菜品销量和毛利",
          "标记畅销/滞销/潜力菜品",
          "收集顾客点单偏好反馈"
        ]
      },
      {
        "day": 2,
        "title": "招牌菜打造日",
        "tasks": [
          "确定1-2道招牌菜",
          "制定招牌菜标准SOP",
          "设计招牌菜呈现方式"
        ]
      },
      {
        "day": 3,
        "title": "菜单精简日",
        "tasks": [
          "淘汰后30%滞销菜品",
          "优化菜单排版突出招牌菜",
          "控制备料种类降低损耗"
        ]
      },
      {
        "day": 4,
        "title": "出品标准化日",
        "tasks": [
          "制定核心菜品出餐SOP",
          "培训厨师团队标准操作",
          "建立出品抽检机制"
        ]
      },
      {
        "day": 5,
        "title": "招牌菜推广日",
        "tasks": [
          "制作招牌菜宣传物料",
          "线上发布招牌菜内容",
          "员工推荐招牌菜话术培训"
        ]
      },
      {
        "day": 6,
        "title": "新品测试日",
        "tasks": [
          "设计1-2道潜力新菜品",
          "邀请老顾客免费试吃",
          "收集试吃反馈并调整"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计招牌菜销售占比",
          "分析菜品结构调整效果",
          "制定下周优化方向"
        ]
      }
    ],
    "longTermAdvice": [
      "坚持'少而精'菜品策略，新店菜单控制在25-35道之间",
      "每季度淘汰末位10%菜品，引入1-2道新品保持新鲜感",
      "持续强化招牌菜认知，让顾客提到品类就想到你的店"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_52",
    "problemCode": "PRODUCT_SLOW",
    "industry": "餐饮",
    "stage": "成长期",
    "symptomIds": [
      "sym_s01",
      "sym_s02",
      "sym_s05"
    ],
    "judgment": "你的餐饮门店核心菜品动销放缓，新品推广不力导致增长停滞",
    "severity": 70,
    "causes": [
      {
        "name": "核心菜品老化",
        "weight": 35,
        "judgment": "招牌菜多久没更新了？顾客是否吃腻了？",
        "description": "核心菜品长期未变，顾客消费疲劳，点单频次下降"
      },
      {
        "name": "新品推广不力",
        "weight": 30,
        "judgment": "新品上市有配套推广吗？员工有主动推荐吗？",
        "description": "新品缺少推广配套，员工不推荐，顾客不知道"
      },
      {
        "name": "菜品结构失衡",
        "weight": 20,
        "judgment": "引流款、利润款、形象款的比例合理吗？",
        "description": "菜品缺少角色分工，引流款不引流、利润款不赚钱"
      },
      {
        "name": "口味同质化",
        "weight": 15,
        "judgment": "你的口味和周边竞品有差异吗？顾客能区分吗？",
        "description": "菜品口味与竞品无明显差异，缺乏独特味型记忆"
      }
    ],
    "solutionIds": [
      "sol_007",
      "sol_022",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "分析各菜品近3个月销量趋势，识别下滑菜品",
        "duration": "45分钟",
        "purpose": "诊断动销问题"
      },
      {
        "task": "设计1道特色新品并制定推广计划",
        "duration": "1小时",
        "purpose": "注入新鲜感"
      },
      {
        "task": "按引流款/利润款/形象款重新分类菜品",
        "duration": "30分钟",
        "purpose": "优化菜品结构"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "动销诊断日",
        "tasks": [
          "完成菜品销量排名和趋势分析",
          "标记下滑菜品和稳定菜品",
          "分析下滑原因（口味/价格/竞争）"
        ]
      },
      {
        "day": 2,
        "title": "新品研发日",
        "tasks": [
          "确定新品方向和定位",
          "完成新品试制和口味调整",
          "制定新品定价和推广方案"
        ]
      },
      {
        "day": 3,
        "title": "结构优化日",
        "tasks": [
          "按角色重新分类菜品",
          "调整引流款定价策略",
          "设计利润款组合套餐"
        ]
      },
      {
        "day": 4,
        "title": "新品上市日",
        "tasks": [
          "新品正式上线",
          "员工培训新品推荐话术",
          "线上发布新品内容"
        ]
      },
      {
        "day": 5,
        "title": "口味差异化日",
        "tasks": [
          "强化1-2道独特口味菜品",
          "制作口味故事和来源介绍",
          "在菜单和物料上突出独特性"
        ]
      },
      {
        "day": 6,
        "title": "推广加码日",
        "tasks": [
          "设计新品限时优惠",
          "社群推送新品活动",
          "引导顾客点评新品"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计新品销量和复购率",
          "分析菜品结构优化效果",
          "调整下周推广力度"
        ]
      }
    ],
    "longTermAdvice": [
      "建立季度菜品更新机制，每季淘汰2-3道末位品、引入1-2道新品",
      "给每道菜品明确角色定位：引流款占20%、利润款占50%、形象款占10%、填位款占20%",
      "打造独特味型标签，让顾客形成'只有你家能吃到这个味'的认知"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_53",
    "problemCode": "PRODUCT_SLOW",
    "industry": "餐饮",
    "stage": "老店",
    "symptomIds": [
      "sym_s01",
      "sym_s04",
      "sym_s05"
    ],
    "judgment": "你的老店菜品老化严重、顾客审美疲劳，核心品类复购率持续走低",
    "severity": 75,
    "causes": [
      {
        "name": "菜品多年未更新",
        "weight": 35,
        "judgment": "最近一次菜单大更新是什么时候？超过1年了吗？",
        "description": "菜单长期固化，老顾客吃遍后失去新鲜感，新顾客没有惊喜"
      },
      {
        "name": "复购率持续下降",
        "weight": 25,
        "judgment": "主推菜品的复购率是多少？趋势如何？",
        "description": "核心菜品复购率走低，顾客尝鲜后不再回头"
      },
      {
        "name": "跟不上口味潮流",
        "weight": 25,
        "judgment": "你关注当下的餐饮消费趋势吗？有跟上新口味新吃法吗？",
        "description": "口味和呈现方式落后于潮流，年轻客群不买账"
      },
      {
        "name": "成本上涨挤压利润",
        "weight": 15,
        "judgment": "食材成本上涨后菜品有调整吗？还是硬扛？",
        "description": "食材涨价但菜品未调整，利润被持续挤压"
      }
    ],
    "solutionIds": [
      "sol_007",
      "sol_021",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "统计各菜品复购率和销量趋势，标记需要淘汰的菜品",
        "duration": "45分钟",
        "purpose": "诊断老化程度"
      },
      {
        "task": "调研当下同品类热门新菜趋势",
        "duration": "30分钟",
        "purpose": "把握潮流方向"
      },
      {
        "task": "制定菜单焕新计划，分批更新",
        "duration": "1小时",
        "purpose": "规划菜品升级"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "全面诊断日",
        "tasks": [
          "完成菜品复购率分析",
          "标记淘汰候补和新品方向",
          "调研3家竞品菜单变化"
        ]
      },
      {
        "day": 2,
        "title": "潮流对标日",
        "tasks": [
          "研究同品类热门新菜趋势",
          "确定3-5道新品方向",
          "评估现有设备能否支持新品"
        ]
      },
      {
        "day": 3,
        "title": "新品研发日",
        "tasks": [
          "试制3道候选新品",
          "内部品鉴和口味调整",
          "确定首批上新菜品"
        ]
      },
      {
        "day": 4,
        "title": "菜单焕新日",
        "tasks": [
          "淘汰3道末位老品",
          "上线2-3道新品",
          "重新设计菜单版面突出新品"
        ]
      },
      {
        "day": 5,
        "title": "新品推广日",
        "tasks": [
          "设计新品尝鲜价",
          "员工全员推荐新品",
          "社群和线上发布新品内容"
        ]
      },
      {
        "day": 6,
        "title": "成本优化日",
        "tasks": [
          "调整受食材涨价影响的菜品",
          "优化部分菜品的食材替代",
          "重新核算菜品毛利"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计新品销量和老品变化",
          "分析顾客反馈",
          "制定下批菜品更新计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立季度菜单更新节奏，每次淘汰10%末位品、上新2-3道",
      "紧跟口味潮流但保持核心味型不变，创新不忘本",
      "用数据驱动菜品决策，每月review销量、毛利和复购率"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_54",
    "problemCode": "PRODUCT_SLOW",
    "industry": "零售",
    "stage": "新店",
    "symptomIds": [
      "sym_s02",
      "sym_s03",
      "sym_s06"
    ],
    "judgment": "你的新开零售门店选品未经验证，产品结构单一且库存周转极慢",
    "severity": 68,
    "causes": [
      {
        "name": "选品凭感觉",
        "weight": 35,
        "judgment": "首批进货有数据支撑吗？还是凭个人喜好？",
        "description": "新店选品缺乏市场数据支撑，凭经验进货导致品类不受欢迎"
      },
      {
        "name": "产品结构单一",
        "weight": 30,
        "judgment": "门店SKU覆盖了几个品类？有引流款和利润款吗？",
        "description": "SKU少且品类单一，缺少引流款和利润款的分层设计"
      },
      {
        "name": "库存周转慢",
        "weight": 20,
        "judgment": "首批进货多久能卖完？库存周转天数是多少？",
        "description": "首批进货量偏大且动销慢，资金大量积压在库存中"
      },
      {
        "name": "缺少试销机制",
        "weight": 15,
        "judgment": "有没有小批量试销再决定是否大批量进货？",
        "description": "没有试销机制，新品直接大批量进货风险高"
      }
    ],
    "solutionIds": [
      "sol_008",
      "sol_021",
      "sol_022"
    ],
    "todayTasks": [
      {
        "task": "盘点所有SKU的销售数据，标记滞销品",
        "duration": "45分钟",
        "purpose": "诊断选品问题"
      },
      {
        "task": "设计引流款+利润款+搭配款的产品组合",
        "duration": "1小时",
        "purpose": "优化产品结构"
      },
      {
        "task": "制定滞销品清仓和试销品引入计划",
        "duration": "30分钟",
        "purpose": "调整库存结构"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "选品审计日",
        "tasks": [
          "完成全SKU销量排名",
          "标记畅销/滞销/潜力品",
          "分析滞销原因"
        ]
      },
      {
        "day": 2,
        "title": "结构优化日",
        "tasks": [
          "按引流/利润/搭配重新分类",
          "确定各角色产品比例",
          "设计产品组合方案"
        ]
      },
      {
        "day": 3,
        "title": "清仓行动日",
        "tasks": [
          "制定滞销品清仓方案",
          "启动清仓促销活动",
          "释放库存和资金空间"
        ]
      },
      {
        "day": 4,
        "title": "新品试销日",
        "tasks": [
          "引入3-5款潜力新品小量试销",
          "设置试销追踪指标",
          "员工新品推荐培训"
        ]
      },
      {
        "day": 5,
        "title": "陈列优化日",
        "tasks": [
          "按产品角色优化陈列",
          "爆款端架突出展示",
          "搭配品关联陈列"
        ]
      },
      {
        "day": 6,
        "title": "数据追踪日",
        "tasks": [
          "追踪新品试销数据",
          "追踪清仓进度",
          "记录顾客反馈"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估选品调整效果",
          "确定正式引进和淘汰清单",
          "制定下月选品计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立试销机制：新品先少量进货测试2周，数据好再大批量引进",
      "保持产品结构合理：引流款20%、利润款50%、搭配款30%",
      "每月盘点库存周转，滞销超60天的果断清仓"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_55",
    "problemCode": "PRODUCT_SLOW",
    "industry": "零售",
    "stage": "成长期",
    "symptomIds": [
      "sym_s01",
      "sym_s03",
      "sym_s06"
    ],
    "judgment": "你的成长期零售门店爆款后劲不足，品类扩展不当导致整体动销放缓",
    "severity": 72,
    "causes": [
      {
        "name": "爆款生命周期衰退",
        "weight": 30,
        "judgment": "曾经的主力爆款销量还在增长吗？是否已过巅峰？",
        "description": "主力爆款进入衰退期，销量下滑但未找到新爆款替代"
      },
      {
        "name": "品类扩展不当",
        "weight": 25,
        "judgment": "新增品类是否与原有客群匹配？有蚕食效应吗？",
        "description": "为增长而扩张品类，但新品类与客群不匹配，分散了经营焦点"
      },
      {
        "name": "陈列空间浪费",
        "weight": 25,
        "judgment": "滞销品占了多少陈列面？黄金位置给了畅销品吗？",
        "description": "滞销品占据大量陈列空间，畅销品反而展示不足"
      },
      {
        "name": "供应链响应慢",
        "weight": 20,
        "judgment": "畅销品补货周期多长？有缺货情况吗？",
        "description": "畅销品经常缺货，补货周期长，错失销售机会"
      }
    ],
    "solutionIds": [
      "sol_008",
      "sol_022",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "分析各品类销量占比和增长趋势",
        "duration": "45分钟",
        "purpose": "诊断品类健康度"
      },
      {
        "task": "调整陈列：畅销品扩面、滞销品缩面",
        "duration": "1小时",
        "purpose": "优化陈列产出"
      },
      {
        "task": "联系供应商缩短畅销品补货周期",
        "duration": "30分钟",
        "purpose": "减少缺货损失"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "品类诊断日",
        "tasks": [
          "完成品类销售占比分析",
          "识别增长品类和衰退品类",
          "评估品类间蚕食效应"
        ]
      },
      {
        "day": 2,
        "title": "爆款焕新日",
        "tasks": [
          "设计爆款升级或延伸版本",
          "测试新爆款候选产品",
          "规划爆款迭代路线图"
        ]
      },
      {
        "day": 3,
        "title": "陈列重构日",
        "tasks": [
          "按销售贡献重新分配陈列面",
          "黄金位给Top20%畅销品",
          "滞销品集中到清仓区"
        ]
      },
      {
        "day": 4,
        "title": "供应链优化日",
        "tasks": [
          "与供应商协商缩短补货周期",
          "建立畅销品安全库存线",
          "设置缺货预警机制"
        ]
      },
      {
        "day": 5,
        "title": "品类精简日",
        "tasks": [
          "淘汰贡献率最低的5%品类",
          "释放空间给增长品类",
          "重新规划品类布局"
        ]
      },
      {
        "day": 6,
        "title": "新品培育日",
        "tasks": [
          "引入2-3款新爆款候选",
          "小量试销并追踪数据",
          "员工新品知识和话术培训"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计品类调整后动销变化",
          "分析缺货率和补货效率",
          "制定下周优化重点"
        ]
      }
    ],
    "longTermAdvice": [
      "建立爆款生命周期管理，在旧爆款衰退前培育新爆款",
      "保持品类聚焦，每个品类都要达到最低销售贡献率门槛",
      "优化供应链响应速度，畅销品缺货率控制在5%以内"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_56",
    "problemCode": "PRODUCT_SLOW",
    "industry": "零售",
    "stage": "老店",
    "symptomIds": [
      "sym_s01",
      "sym_s03",
      "sym_s04"
    ],
    "judgment": "你的老店产品线固化严重，库存积压与缺货并存，急需汰换刷新产品池",
    "severity": 74,
    "causes": [
      {
        "name": "产品线长期固化",
        "weight": 30,
        "judgment": "多久没做过产品线全面review了？末位淘汰执行了吗？",
        "description": "产品线长期不变，没有末位淘汰机制，滞销品长期占位"
      },
      {
        "name": "库存积压严重",
        "weight": 25,
        "judgment": "库龄超过90天的商品占比多少？有多少死库存？",
        "description": "大量商品库龄过长，资金被死库存锁定，无法投入新品"
      },
      {
        "name": "缺货与积压并存",
        "weight": 25,
        "judgment": "畅销品经常缺货而滞销品堆满仓库？",
        "description": "库存结构严重失衡，畅销品缺货、滞销品积压"
      },
      {
        "name": "选品信息滞后",
        "weight": 20,
        "judgment": "你的选品信息来源是什么？还跟上市场趋势吗？",
        "description": "选品依赖过时的经验和渠道，不了解当下市场新品趋势"
      }
    ],
    "solutionIds": [
      "sol_008",
      "sol_021",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "盘点全SKU库龄，标记90天以上滞销品",
        "duration": "1小时",
        "purpose": "摸清库存家底"
      },
      {
        "task": "统计近30天缺货次数和影响销售额",
        "duration": "30分钟",
        "purpose": "量化缺货损失"
      },
      {
        "task": "制定分批清仓计划（本周清仓一批）",
        "duration": "30分钟",
        "purpose": "释放库存资金"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "库存审计日",
        "tasks": [
          "完成全SKU库龄分析",
          "标记滞销/死库存/畅销缺货品",
          "计算库存健康指数"
        ]
      },
      {
        "day": 2,
        "title": "清仓启动日",
        "tasks": [
          "制定分批清仓方案",
          "启动首批清仓促销",
          "设置清仓进度追踪"
        ]
      },
      {
        "day": 3,
        "title": "缺货治理日",
        "tasks": [
          "增加畅销品安全库存量",
          "缩短畅销品补货周期",
          "建立缺货实时预警"
        ]
      },
      {
        "day": 4,
        "title": "选品更新日",
        "tasks": [
          "调研市场新品趋势",
          "确定引进新品清单",
          "小批量试销引入"
        ]
      },
      {
        "day": 5,
        "title": "陈列焕新日",
        "tasks": [
          "清仓区集中处理滞销品",
          "畅销品扩面陈列",
          "新品设置试销专位"
        ]
      },
      {
        "day": 6,
        "title": "机制建设日",
        "tasks": [
          "建立月度末位淘汰机制",
          "设置库龄预警线90天",
          "制定新品试销流程"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计清仓回笼资金",
          "分析缺货改善情况",
          "制定下月产品线更新计划"
        ]
      }
    ],
    "longTermAdvice": [
      "严格执行月度末位淘汰，销售排名后10%且库龄超60天的果断清退",
      "建立库存健康度指标，库龄超90天占比控制在5%以内",
      "保持选品渠道更新，每季度参加行业展会或对接新供应商"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_57",
    "problemCode": "PRODUCT_SLOW",
    "industry": "服务业",
    "stage": "新店",
    "symptomIds": [
      "sym_s02",
      "sym_s05",
      "sym_s06"
    ],
    "judgment": "你的新开服务门店服务项目设计未验证，缺乏爆款项目吸引首单客户",
    "severity": 66,
    "causes": [
      {
        "name": "服务项目未验证",
        "weight": 35,
        "judgment": "开业前有请目标客户试体验吗？反馈如何？",
        "description": "服务项目凭经验设计，未在目标客群中验证需求和定价"
      },
      {
        "name": "缺少爆款项目",
        "weight": 30,
        "judgment": "哪个项目是客户必选的？有让人一口就能记住的服务吗？",
        "description": "没有打造出高认知度的爆款服务，客户选择犹豫"
      },
      {
        "name": "服务定价门槛高",
        "weight": 20,
        "judgment": "首单价格是否让新客户犹豫？有体验价吗？",
        "description": "服务项目定价偏高，缺少低门槛的体验入口"
      },
      {
        "name": "效果展示不足",
        "weight": 15,
        "judgment": "新客户能看到服务效果案例吗？",
        "description": "缺少服务效果的可视化展示，新客户无法评估价值"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_022",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "统计各服务项目首月销售数据，找出受欢迎项目",
        "duration": "45分钟",
        "purpose": "识别潜力项目"
      },
      {
        "task": "设计1个体验价爆款项目（正常价3-5折）",
        "duration": "30分钟",
        "purpose": "降低首单门槛"
      },
      {
        "task": "整理3个服务前后对比案例并展示",
        "duration": "1小时",
        "purpose": "可视化服务效果"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "项目诊断日",
        "tasks": [
          "分析各项目销量和客户反馈",
          "标记受欢迎/冷门项目",
          "收集客户选择偏好"
        ]
      },
      {
        "day": 2,
        "title": "爆款打造日",
        "tasks": [
          "确定1个爆款服务项目",
          "制定体验价策略",
          "设计爆款项目展示方案"
        ]
      },
      {
        "day": 3,
        "title": "效果展示日",
        "tasks": [
          "拍摄服务前后对比案例",
          "制作效果展示墙/册",
          "线上发布案例内容"
        ]
      },
      {
        "day": 4,
        "title": "定价优化日",
        "tasks": [
          "设置体验价入口",
          "设计阶梯定价引导升级",
          "员工推荐话术培训"
        ]
      },
      {
        "day": 5,
        "title": "项目精简日",
        "tasks": [
          "暂停冷门项目减少资源分散",
          "聚焦2-3个核心项目",
          "优化服务流程提升效率"
        ]
      },
      {
        "day": 6,
        "title": "推广启动日",
        "tasks": [
          "线上发布爆款项目内容",
          "社群推广体验价",
          "引导首批体验客户"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计爆款项目到店转化",
          "分析体验客户满意度",
          "调整下周推广策略"
        ]
      }
    ],
    "longTermAdvice": [
      "新店聚焦2-3个核心服务项目打透，不要贪多",
      "持续积累服务案例，每周至少新增2个线上展示",
      "体验价→正价→升级套餐的递进设计，拉长客户价值链"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_58",
    "problemCode": "PRODUCT_SLOW",
    "industry": "服务业",
    "stage": "成长期",
    "symptomIds": [
      "sym_s01",
      "sym_s05",
      "sym_s06"
    ],
    "judgment": "你的成长期服务门店核心项目增长遇瓶颈，缺少项目升级路径限制客单提升",
    "severity": 71,
    "causes": [
      {
        "name": "核心项目增长见顶",
        "weight": 30,
        "judgment": "主力项目订单量还在增长吗？还是已趋于稳定？",
        "description": "主力项目市场渗透到一定程度后增长放缓，需要新增长点"
      },
      {
        "name": "缺少升级路径",
        "weight": 30,
        "judgment": "客户消费基础项目后有升级引导吗？",
        "description": "服务项目之间缺少递进关系，客户消费基础项目后没有升级路径"
      },
      {
        "name": "新项目孵化慢",
        "weight": 20,
        "judgment": "从构思到上线一个新项目要多久？",
        "description": "新项目从设计到上线周期长，跟不上市场需求变化"
      },
      {
        "name": "时段产能不均",
        "weight": 20,
        "judgment": "高峰时段能全部排满吗？闲时有浪费吗？",
        "description": "服务产能时段分布不均，高峰排不下闲时排不满"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_021",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "分析各项目订单量趋势和客单贡献",
        "duration": "45分钟",
        "purpose": "诊断增长瓶颈"
      },
      {
        "task": "设计基础→进阶→尊享的项目升级路径",
        "duration": "1小时",
        "purpose": "打通升级链路"
      },
      {
        "task": "制定闲时特惠方案填充产能空档",
        "duration": "30分钟",
        "purpose": "提升时段利用率"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "项目审计日",
        "tasks": [
          "完成各项目增长趋势分析",
          "识别增长见顶和潜力项目",
          "计算各项目客单和利润贡献"
        ]
      },
      {
        "day": 2,
        "title": "升级路径设计日",
        "tasks": [
          "设计三级服务阶梯",
          "制定升级内容和定价",
          "编写升级推荐话术"
        ]
      },
      {
        "day": 3,
        "title": "新项目孵化日",
        "tasks": [
          "确定1-2个新项目方向",
          "快速试制最小化服务版本",
          "邀请老客户试体验"
        ]
      },
      {
        "day": 4,
        "title": "闲时运营日",
        "tasks": [
          "设计闲时特惠方案",
          "社群发布闲时优惠",
          "预约系统设置闲时折扣"
        ]
      },
      {
        "day": 5,
        "title": "培训日",
        "tasks": [
          "培训升级推荐话术",
          "培训新项目操作流程",
          "培训闲时优惠引导"
        ]
      },
      {
        "day": 6,
        "title": "上线日",
        "tasks": [
          "升级路径正式上线",
          "新项目试运营启动",
          "闲时优惠开始执行"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计升级转化率",
          "分析新项目试运营数据",
          "评估闲时利用率变化"
        ]
      }
    ],
    "longTermAdvice": [
      "构建基础→进阶→尊享三级服务体系，让每级客户都有升级空间",
      "新项目采用最小化可行性测试，2周验证再决定是否正式上线",
      "闲时利用率提升到70%以上，配合高峰时段形成全时段营收"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_59",
    "problemCode": "PRODUCT_SLOW",
    "industry": "服务业",
    "stage": "老店",
    "symptomIds": [
      "sym_s01",
      "sym_s04",
      "sym_s05"
    ],
    "judgment": "你的老店服务项目严重老化，客户审美疲劳且复购率持续走低",
    "severity": 76,
    "causes": [
      {
        "name": "服务项目老化",
        "weight": 35,
        "judgment": "核心服务项目多久没升级了？客户反馈是否缺乏新意？",
        "description": "服务内容和形式长期未更新，老客户失去新鲜感"
      },
      {
        "name": "复购率走低",
        "weight": 25,
        "judgment": "老客户的消费频次在下降吗？多少月未消费算流失？",
        "description": "老客户消费频次下降，3个月未回头比例增加"
      },
      {
        "name": "跟不上行业趋势",
        "weight": 25,
        "judgment": "同行在推什么新服务？你有了解吗？",
        "description": "行业服务形式和理念在升级，但门店没有跟上"
      },
      {
        "name": "技术手法陈旧",
        "weight": 15,
        "judgment": "员工的手法和技能有定期培训更新吗？",
        "description": "员工技能没有持续培训更新，服务质量与同行拉开差距"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_021",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "统计各项目复购率和客户消费频次变化",
        "duration": "45分钟",
        "purpose": "量化老化程度"
      },
      {
        "task": "调研同行业3家竞品的新服务项目",
        "duration": "30分钟",
        "purpose": "对标行业趋势"
      },
      {
        "task": "制定服务焕新计划：升级2个老项目+引入1个新项目",
        "duration": "1小时",
        "purpose": "规划服务更新"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "全面诊断日",
        "tasks": [
          "完成复购率和消费频次分析",
          "标记高流失风险客户",
          "调研竞品服务更新"
        ]
      },
      {
        "day": 2,
        "title": "服务升级设计日",
        "tasks": [
          "确定2个需升级的老项目",
          "设计升级内容和形式",
          "制定升级定价策略"
        ]
      },
      {
        "day": 3,
        "title": "新项目研发日",
        "tasks": [
          "确定1个新服务项目方向",
          "完成新项目流程设计",
          "内部试运行和调整"
        ]
      },
      {
        "day": 4,
        "title": "技能培训日",
        "tasks": [
          "组织员工学习升级后服务标准",
          "培训新项目操作流程",
          "考核和认证上岗"
        ]
      },
      {
        "day": 5,
        "title": "焕新上线日",
        "tasks": [
          "升级项目正式推出",
          "新项目试运营",
          "制作焕新宣传内容"
        ]
      },
      {
        "day": 6,
        "title": "老客激活日",
        "tasks": [
          "定向通知老客户服务升级",
          "设计老客专享体验优惠",
          "引导老客体验新项目"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计升级和新项目数据",
          "分析老客回流情况",
          "制定下阶段焕新计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立半年度服务焕新机制，每次升级2-3个项目、引入1个新项目",
      "持续投资员工技能培训，每季度至少1次专业技能提升培训",
      "用客户消费频次数据驱动服务决策，频次下降是服务老化的早期信号"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_60",
    "problemCode": "PRODUCT_SLOW",
    "industry": "all",
    "stage": "all",
    "symptomIds": [
      "sym_s01",
      "sym_s04",
      "sym_s06"
    ],
    "judgment": "你的门店产品动销缓慢，核心问题是产品缺乏竞争力和营销推广不足",
    "severity": 70,
    "causes": [
      {
        "name": "产品缺乏竞争力",
        "weight": 35,
        "judgment": "你的产品与竞品相比有突出优势吗？客户选择你的理由是什么？",
        "description": "产品在品质、价格、特色上缺乏明显优势，客户没有必须选择的理由"
      },
      {
        "name": "推广力度不足",
        "weight": 25,
        "judgment": "产品有配套推广吗？客户知道你的好产品吗？",
        "description": "好产品缺少推广，酒香也怕巷子深"
      },
      {
        "name": "定价策略不当",
        "weight": 20,
        "judgment": "产品定价与目标客户支付意愿匹配吗？",
        "description": "定价与客户心理价位不匹配，过高吓跑客户、过低损害价值感"
      },
      {
        "name": "缺少产品迭代",
        "weight": 20,
        "judgment": "产品多久没更新了？有根据客户反馈改进吗？",
        "description": "产品长期不迭代，跟不上客户需求变化"
      }
    ],
    "solutionIds": [
      "sol_007",
      "sol_022",
      "sol_028"
    ],
    "todayTasks": [
      {
        "task": "列出所有产品并标注销量、毛利和竞争力评分",
        "duration": "1小时",
        "purpose": "全面评估产品"
      },
      {
        "task": "选出1个最有潜力的产品制定推广方案",
        "duration": "45分钟",
        "purpose": "打造突破口"
      },
      {
        "task": "收集最近30天客户对产品的反馈意见",
        "duration": "30分钟",
        "purpose": "发现改进方向"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "产品审计日",
        "tasks": [
          "完成全产品销量毛利排名",
          "评估每个产品竞争力",
          "标记核心问题和机会点"
        ]
      },
      {
        "day": 2,
        "title": "竞争力提升日",
        "tasks": [
          "确定产品差异化方向",
          "制定品质或特色提升方案",
          "设计产品独特卖点"
        ]
      },
      {
        "day": 3,
        "title": "定价优化日",
        "tasks": [
          "分析目标客户支付意愿",
          "调整定价策略",
          "设计价格测试方案"
        ]
      },
      {
        "day": 4,
        "title": "推广启动日",
        "tasks": [
          "制作产品推广内容",
          "线上多渠道发布",
          "设计产品体验活动"
        ]
      },
      {
        "day": 5,
        "title": "迭代改进日",
        "tasks": [
          "根据客户反馈优化产品",
          "测试改进方案",
          "快速迭代上线"
        ]
      },
      {
        "day": 6,
        "title": "效果追踪日",
        "tasks": [
          "追踪推广后销量变化",
          "收集新客户反馈",
          "分析转化数据"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估产品竞争力提升效果",
          "分析推广ROI",
          "制定下阶段产品策略"
        ]
      }
    ],
    "longTermAdvice": [
      "持续打磨产品竞争力，让客户有非你不可的理由",
      "建立产品迭代节奏，每月根据数据和反馈做小步快跑改进",
      "产品力+推广力双轮驱动，好产品配上好推广才能卖动"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 7,
    "status": 1
  },
  {
    "_id": "path_61",
    "problemCode": "MARKETING_HARD",
    "industry": "餐饮",
    "stage": "新店",
    "symptomIds": [
      "sym_m01",
      "sym_m03",
      "sym_m04"
    ],
    "judgment": "你的新开餐饮店从未做过线上营销，缺少基础曝光和开业推广经验",
    "severity": 69,
    "causes": [
      {
        "name": "零线上运营经验",
        "weight": 35,
        "judgment": "老板或团队有线上营销经验吗？用过大红点评商家端吗？",
        "description": "团队完全没有线上营销经验，不知从何入手"
      },
      {
        "name": "缺少内容生产能力",
        "weight": 25,
        "judgment": "能拍出有吸引力的菜品视频和照片吗？",
        "description": "缺少内容创作能力，无法产出吸引人的图文和视频"
      },
      {
        "name": "开业推广不足",
        "weight": 25,
        "judgment": "开业期间做了哪些推广？有多少人知道新店开业？",
        "description": "开业推广投入不够，错失了最佳曝光窗口期"
      },
      {
        "name": "预算有限不敢投",
        "weight": 15,
        "judgment": "有营销预算吗？担心投了没效果不敢花？",
        "description": "营销预算有限且不敢投入，怕打水漂而不作为"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_026",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "注册大众点评商家版并完善店铺信息",
        "duration": "1小时",
        "purpose": "建立线上基础阵地"
      },
      {
        "task": "拍摄10张高质量菜品和门店照片",
        "duration": "1小时",
        "purpose": "准备内容素材"
      },
      {
        "task": "制定开业首月推广计划（低预算高创意）",
        "duration": "30分钟",
        "purpose": "规划推广节奏"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "阵地铺设日",
        "tasks": [
          "认领大众点评门店",
          "开通抖音来客",
          "注册小红书账号"
        ]
      },
      {
        "day": 2,
        "title": "内容准备日",
        "tasks": [
          "拍摄菜品和门店照片",
          "撰写店铺介绍文案",
          "制作开业优惠海报"
        ]
      },
      {
        "day": 3,
        "title": "开业推广日",
        "tasks": [
          "发布开业优惠到各平台",
          "周边500米派发传单",
          "进业主群发开业信息"
        ]
      },
      {
        "day": 4,
        "title": "达人合作日",
        "tasks": [
          "联系2-3个本地美食博主",
          "邀请免费试吃换探店内容",
          "整理探店合作清单"
        ]
      },
      {
        "day": 5,
        "title": "社群启动日",
        "tasks": [
          "建立门店粉丝群",
          "设计加群福利",
          "首批到店客户入群"
        ]
      },
      {
        "day": 6,
        "title": "内容发布日",
        "tasks": [
          "发布3条小红书种草笔记",
          "发布1条抖音短视频",
          "回复所有线上评价"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各平台曝光数据",
          "分析到店转化来源",
          "调整下周推广重点"
        ]
      }
    ],
    "longTermAdvice": [
      "新店前3个月必须高频曝光，每周至少3条线上内容+1次到店活动",
      "从零开始不要怕粗糙，先做起来再做好，完美主义是营销大敌",
      "用好免费渠道：大众点评、抖音来客、小红书、业主群都是零成本"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_62",
    "problemCode": "MARKETING_HARD",
    "industry": "餐饮",
    "stage": "成长期",
    "symptomIds": [
      "sym_m02",
      "sym_m04",
      "sym_m06"
    ],
    "judgment": "你的餐饮门店广告投放效果差ROI低于1:2，缺少可复制的获客渠道",
    "severity": 72,
    "causes": [
      {
        "name": "投放策略粗糙",
        "weight": 30,
        "judgment": "广告投了多少钱？带来多少到店？ROI算过吗？",
        "description": "广告投放缺少精细化策略，花钱买流量但转化率低"
      },
      {
        "name": "缺少可复制获客渠道",
        "weight": 25,
        "judgment": "除了自然到店，有稳定的获客渠道吗？",
        "description": "没有建立稳定的可复制获客渠道，客流来源不可控"
      },
      {
        "name": "内容质量低",
        "weight": 25,
        "judgment": "发布的线上内容有人看吗？点赞评论数据如何？",
        "description": "线上内容质量低、没有吸引力，无法有效种草引流"
      },
      {
        "name": "缺少数据分析能力",
        "weight": 20,
        "judgment": "有追踪各渠道获客成本和转化率吗？",
        "description": "不做数据分析，不知道钱花在哪里有效、哪里浪费"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_026",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "调出近3个月广告投放数据，计算各渠道ROI",
        "duration": "45分钟",
        "purpose": "诊断投放效率"
      },
      {
        "task": "学习1个成功同行的线上营销打法",
        "duration": "1小时",
        "purpose": "借鉴有效方法"
      },
      {
        "task": "设计1个低成本内容引流方案",
        "duration": "30分钟",
        "purpose": "测试新获客方式"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "投放审计日",
        "tasks": [
          "分析各渠道投放ROI",
          "砍掉ROI低于1:1的渠道",
          "识别高潜力渠道加码"
        ]
      },
      {
        "day": 2,
        "title": "内容升级日",
        "tasks": [
          "学习竞品高赞内容套路",
          "提升拍摄和剪辑质量",
          "制定内容发布日历"
        ]
      },
      {
        "day": 3,
        "title": "社群深耕日",
        "tasks": [
          "优化社群运营内容",
          "设计群专属福利和活动",
          "提升群活跃度和转化"
        ]
      },
      {
        "day": 4,
        "title": "本地生活深耕日",
        "tasks": [
          "优化抖音来客店铺",
          "参与平台活动获取流量",
          "设置团购引流款"
        ]
      },
      {
        "day": 5,
        "title": "口碑运营日",
        "tasks": [
          "引导满意客户写好评",
          "回复所有差评和好评",
          "设计好评奖励机制"
        ]
      },
      {
        "day": 6,
        "title": "异业合作日",
        "tasks": [
          "联系3家互补商家谈互推",
          "设计联合活动方案",
          "启动首次合作引流"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各渠道获客数据",
          "计算获客成本和转化率",
          "优化渠道投入分配"
        ]
      }
    ],
    "longTermAdvice": [
      "建立数据驱动的营销决策，每分钱都要追踪效果",
      "内容营销是餐饮最低成本的获客方式，坚持每周3条以上",
      "构建3个以上稳定获客渠道，任一渠道占比不超过40%"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_63",
    "problemCode": "MARKETING_HARD",
    "industry": "餐饮",
    "stage": "老店",
    "symptomIds": [
      "sym_m02",
      "sym_m05",
      "sym_m06"
    ],
    "judgment": "你的老餐饮店营销方式陈旧，口碑传播仅靠自然发生，缺少主动获客手段",
    "severity": 74,
    "causes": [
      {
        "name": "营销方式陈旧",
        "weight": 30,
        "judgment": "现在还在靠发传单和自然客流吗？线上营销做了哪些？",
        "description": "仍依赖传统营销方式，未跟上数字化营销趋势"
      },
      {
        "name": "口碑无主动运营",
        "weight": 25,
        "judgment": "好评是自然产生的还是有引导机制？差评怎么处理？",
        "description": "口碑完全靠自然传播，没有主动引导好评和处理差评"
      },
      {
        "name": "老客激活不足",
        "weight": 25,
        "judgment": "有多少老客户3个月没来了？有激活动作吗？",
        "description": "老客户大量沉睡但缺少激活机制，流失率持续上升"
      },
      {
        "name": "线上布局空白",
        "weight": 20,
        "judgment": "在年轻人用的平台上有存在感吗？",
        "description": "在新媒体平台几乎无存在感，错失年轻客群"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_024",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "盘点当前所有营销动作和效果",
        "duration": "30分钟",
        "purpose": "诊断营销现状"
      },
      {
        "task": "注册/完善2个新媒体平台账号",
        "duration": "1小时",
        "purpose": "补齐线上短板"
      },
      {
        "task": "设计老客唤醒方案（短信/社群/电话）",
        "duration": "30分钟",
        "purpose": "激活沉睡客户"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "营销转型日",
        "tasks": [
          "盘点现有营销方式和效果",
          "制定线上营销转型计划",
          "分配营销时间和预算"
        ]
      },
      {
        "day": 2,
        "title": "线上建阵日",
        "tasks": [
          "完善抖音/小红书账号",
          "发布首批3条内容",
          "学习平台运营基础"
        ]
      },
      {
        "day": 3,
        "title": "口碑运营日",
        "tasks": [
          "建立好评引导机制",
          "制定差评回复标准",
          "邀请满意客户写评价"
        ]
      },
      {
        "day": 4,
        "title": "老客唤醒日",
        "tasks": [
          "筛选3个月未消费客户",
          "设计唤醒优惠和话术",
          "分批发送唤醒信息"
        ]
      },
      {
        "day": 5,
        "title": "社群运营日",
        "tasks": [
          "建立或激活门店社群",
          "设计群内容和活动节奏",
          "提升群活跃度"
        ]
      },
      {
        "day": 6,
        "title": "活动策划日",
        "tasks": [
          "设计1个线上引流到店活动",
          "制作活动物料",
          "活动预热和发布"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计线上曝光和到店转化",
          "分析老客唤醒效果",
          "调整下周营销节奏"
        ]
      }
    ],
    "longTermAdvice": [
      "老店营销转型要'两条腿走路'：维护老客+开拓线上新客",
      "建立口碑主动运营机制，好评率目标95%以上",
      "每月至少策划2次线上引流活动，形成稳定的获客节奏"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_64",
    "problemCode": "MARKETING_HARD",
    "industry": "零售",
    "stage": "新店",
    "symptomIds": [
      "sym_m01",
      "sym_m03",
      "sym_m04"
    ],
    "judgment": "你的新开零售门店完全未做线上推广，在新媒体平台零粉丝零内容",
    "severity": 67,
    "causes": [
      {
        "name": "线上零布局",
        "weight": 35,
        "judgment": "小红书、抖音、微信有做吗？有线上流量来源吗？",
        "description": "完全没布局线上渠道，新店在新媒体上零存在感"
      },
      {
        "name": "不懂内容种草",
        "weight": 25,
        "judgment": "知道怎么拍产品种草内容吗？有学习过吗？",
        "description": "不懂零售内容种草逻辑，无法产出吸引目标客群的内容"
      },
      {
        "name": "开业声量不足",
        "weight": 25,
        "judgment": "开业时周边有多少人知道？做了什么推广？",
        "description": "开业缺乏声量，周边目标客群不知道新店存在"
      },
      {
        "name": "无社群基础",
        "weight": 15,
        "judgment": "有门店社群吗？第一批粉丝怎么聚集？",
        "description": "没有社群作为私域流量池，客户无法持续触达"
      }
    ],
    "solutionIds": [
      "sol_005",
      "sol_026",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "注册小红书和抖音账号，完成基础设置",
        "duration": "45分钟",
        "purpose": "建立线上阵地"
      },
      {
        "task": "拍摄5张产品种草图和1条开箱视频",
        "duration": "1小时",
        "purpose": "准备首波内容"
      },
      {
        "task": "设计开业到店有礼活动吸引首批客户",
        "duration": "30分钟",
        "purpose": "制造到店理由"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "平台注册日",
        "tasks": [
          "完成小红书/抖音/视频号注册",
          "完善店铺信息和头像",
          "学习平台基础操作"
        ]
      },
      {
        "day": 2,
        "title": "内容生产日",
        "tasks": [
          "拍摄产品种草内容",
          "学习简单剪辑和排版",
          "发布首批3条内容"
        ]
      },
      {
        "day": 3,
        "title": "开业推广日",
        "tasks": [
          "发布开业优惠信息",
          "周边派发传单和体验券",
          "进业主群发布开业消息"
        ]
      },
      {
        "day": 4,
        "title": "社群建池日",
        "tasks": [
          "创建门店微信社群",
          "设计加群专属福利",
          "到店客户引导入群"
        ]
      },
      {
        "day": 5,
        "title": "达人合作日",
        "tasks": [
          "联系本地生活类博主",
          "送样换种草内容",
          "建立达人合作清单"
        ]
      },
      {
        "day": 6,
        "title": "到店活动日",
        "tasks": [
          "执行开业到店有礼活动",
          "引导客户关注和入群",
          "收集首批客户反馈"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各平台曝光数据",
          "分析到店客户来源",
          "制定下周内容计划"
        ]
      }
    ],
    "longTermAdvice": [
      "零售新店线上种草是必修课，每周至少3条小红书+2条短视频",
      "社群是零售最有效的私域渠道，目标3个月积累500+群成员",
      "与达人合作种草是性价比最高的推广，持续维护合作网络"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_65",
    "problemCode": "MARKETING_HARD",
    "industry": "零售",
    "stage": "成长期",
    "symptomIds": [
      "sym_m02",
      "sym_m05",
      "sym_m06"
    ],
    "judgment": "你的零售门店推广ROI低且缺少可复制获客渠道，营销投入产出严重失衡",
    "severity": 73,
    "causes": [
      {
        "name": "投放ROI过低",
        "weight": 30,
        "judgment": "每月营销费用多少？带来多少新客？ROI是多少？",
        "description": "广告投放花钱多效果差，缺少精准投放策略"
      },
      {
        "name": "内容无种草力",
        "weight": 25,
        "judgment": "发布的内容有互动吗？有人因为内容到店吗？",
        "description": "内容缺少种草能力，发布了但无人互动和转化"
      },
      {
        "name": "缺少促销策划能力",
        "weight": 25,
        "judgment": "促销活动是自己想还是系统策划？效果如何？",
        "description": "促销活动缺少系统策划，折扣力度大但效果差"
      },
      {
        "name": "私域运营空白",
        "weight": 20,
        "judgment": "社群有多少人？有定期发内容和活动吗？",
        "description": "私域社群建了但没运营，缺少内容和活动节奏"
      }
    ],
    "solutionIds": [
      "sol_023",
      "sol_026",
      "sol_029"
    ],
    "todayTasks": [
      {
        "task": "分析近3月各渠道投放ROI，砍掉低效渠道",
        "duration": "45分钟",
        "purpose": "止血低效投放"
      },
      {
        "task": "学习1个同品类零售高赞内容案例",
        "duration": "30分钟",
        "purpose": "提升内容能力"
      },
      {
        "task": "策划1个有主题的限时促销活动",
        "duration": "1小时",
        "purpose": "提升促销策划力"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "投放优化日",
        "tasks": [
          "分析各渠道ROI数据",
          "砍掉ROI低于1:1的渠道",
          "重新分配营销预算"
        ]
      },
      {
        "day": 2,
        "title": "内容升级日",
        "tasks": [
          "分析竞品高互动内容套路",
          "提升拍摄和文案质量",
          "制定内容主题日历"
        ]
      },
      {
        "day": 3,
        "title": "促销策划日",
        "tasks": [
          "确定促销主题和力度",
          "设计促销组合方案",
          "制作促销物料"
        ]
      },
      {
        "day": 4,
        "title": "私域激活日",
        "tasks": [
          "制定社群内容节奏",
          "设计群专属优惠",
          "提升群活跃度"
        ]
      },
      {
        "day": 5,
        "title": "活动执行日",
        "tasks": [
          "启动限时促销活动",
          "全渠道推送活动信息",
          "追踪活动实时数据"
        ]
      },
      {
        "day": 6,
        "title": "口碑运营日",
        "tasks": [
          "引导客户写好评和晒图",
          "回复所有线上评价",
          "设计好评激励机制"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计促销活动ROI",
          "分析各渠道获客效果",
          "制定下周营销计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立数据驱动的投放策略，每笔营销费用都要追踪效果",
      "内容种草+促销转化是零售营销的双引擎，缺一不可",
      "深耕私域运营，社群贡献率目标达到20%以上"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_66",
    "problemCode": "MARKETING_HARD",
    "industry": "零售",
    "stage": "老店",
    "symptomIds": [
      "sym_m02",
      "sym_m05",
      "sym_m06"
    ],
    "judgment": "你的老零售店营销手段落后于时代，完全依赖自然客流和口碑，缺少主动获客",
    "severity": 71,
    "causes": [
      {
        "name": "营销理念落后",
        "weight": 30,
        "judgment": "还在等客上门吗？有没有想过主动出击获客？",
        "description": "等客上门的思维根深蒂固，缺少主动获客的意识和行动"
      },
      {
        "name": "线上几乎空白",
        "weight": 25,
        "judgment": "在主流线上平台有布局吗？年轻人能找到你吗？",
        "description": "在线上平台几乎无存在感，年轻消费群体触达不到"
      },
      {
        "name": "促销只会打折",
        "weight": 25,
        "judgment": "促销方式是不是只有打折？有体验活动吗？",
        "description": "促销手段单一只会打折，损害品牌价值且效果递减"
      },
      {
        "name": "客户资产浪费",
        "weight": 20,
        "judgment": "多年积累了多少客户信息？有利用吗？",
        "description": "多年经营积累了大量客户但未建立客户资产，无法持续触达"
      }
    ],
    "solutionIds": [
      "sol_023",
      "sol_024",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "盘点所有营销方式和对应效果",
        "duration": "30分钟",
        "purpose": "诊断营销现状"
      },
      {
        "task": "开通2个线上平台（小红书+抖音）",
        "duration": "1小时",
        "purpose": "补齐线上布局"
      },
      {
        "task": "整理历史客户信息，建立客户档案",
        "duration": "1小时",
        "purpose": "沉淀客户资产"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "转型启动日",
        "tasks": [
          "制定线上营销转型计划",
          "确定3个月营销目标",
          "分配每周营销时间"
        ]
      },
      {
        "day": 2,
        "title": "线上建阵日",
        "tasks": [
          "完善小红书和抖音账号",
          "学习基础运营操作",
          "发布首批3条种草内容"
        ]
      },
      {
        "day": 3,
        "title": "客户资产日",
        "tasks": [
          "整理历史客户联系方式",
          "建立客户分类档案",
          "启动客户社群建设"
        ]
      },
      {
        "day": 4,
        "title": "促销升级日",
        "tasks": [
          "设计1个非打折型体验活动",
          "策划会员专属活动",
          "制作活动物料"
        ]
      },
      {
        "day": 5,
        "title": "活动执行日",
        "tasks": [
          "执行体验型活动",
          "引导客户入群关注",
          "收集活动反馈"
        ]
      },
      {
        "day": 6,
        "title": "内容运营日",
        "tasks": [
          "拍摄产品种草内容",
          "发布线上内容",
          "回复线上互动"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估转型首周效果",
          "分析线上曝光数据",
          "调整下周节奏"
        ]
      }
    ],
    "longTermAdvice": [
      "从'等客上门'到'主动获客'的思维转变是老店营销转型的第一步",
      "线上种草+线下体验+私域留存是零售营销的铁三角",
      "把多年积累的客户变成可触达的资产，这是老店最大的优势"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_67",
    "problemCode": "MARKETING_HARD",
    "industry": "服务业",
    "stage": "新店",
    "symptomIds": [
      "sym_m01",
      "sym_m03",
      "sym_m04"
    ],
    "judgment": "你的新开服务门店缺少线上案例展示和口碑积累，新客户不敢信任尝试",
    "severity": 68,
    "causes": [
      {
        "name": "缺少案例背书",
        "weight": 35,
        "judgment": "线上能找到你的服务案例和客户好评吗？",
        "description": "新店没有历史案例和口碑，信任壁垒高导致转化难"
      },
      {
        "name": "服务不可见难传播",
        "weight": 25,
        "judgment": "服务过程和效果能被看到吗？有内容化呈现吗？",
        "description": "服务天然不可见，缺少内容化展示让潜在客户评估品质"
      },
      {
        "name": "缺少体验入口",
        "weight": 25,
        "judgment": "新客户第一次怎么知道你好不好？有体验价吗？",
        "description": "没有低门槛的体验入口，新客户决策风险高不敢尝试"
      },
      {
        "name": "线上零布局",
        "weight": 15,
        "judgment": "在大众点评和小红书上有信息吗？",
        "description": "线上平台完全没有布局，搜索不到任何信息"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_026",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "整理3个服务案例（含前后对比和客户好评）",
        "duration": "1小时",
        "purpose": "建立信任素材"
      },
      {
        "task": "设计新客体验价套餐（正常价3折）",
        "duration": "30分钟",
        "purpose": "降低信任门槛"
      },
      {
        "task": "在大众点评和小红书发布首批内容",
        "duration": "1小时",
        "purpose": "建立线上存在感"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "案例准备日",
        "tasks": [
          "整理3-5个服务案例",
          "拍摄服务过程和效果",
          "撰写客户好评文案"
        ]
      },
      {
        "day": 2,
        "title": "线上铺设日",
        "tasks": [
          "认领大众点评门店",
          "注册小红书账号",
          "发布首批案例内容"
        ]
      },
      {
        "day": 3,
        "title": "体验价上线日",
        "tasks": [
          "确定体验套餐和定价",
          "制作体验卡和物料",
          "设计体验流程话术"
        ]
      },
      {
        "day": 4,
        "title": "内容种草日",
        "tasks": [
          "拍摄服务过程短视频",
          "发布3条种草内容",
          "学习内容运营技巧"
        ]
      },
      {
        "day": 5,
        "title": "异业合作日",
        "tasks": [
          "联系互补型商家谈互推",
          "设计合作引流方案",
          "启动首次合作"
        ]
      },
      {
        "day": 6,
        "title": "体验活动日",
        "tasks": [
          "接待首批体验客户",
          "引导写好评和晒图",
          "收集体验反馈"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计线上曝光和到店数据",
          "分析体验客户转化率",
          "调整下周运营节奏"
        ]
      }
    ],
    "longTermAdvice": [
      "服务行业营销的核心是'让看不见的服务被看见'，持续积累案例",
      "体验价是服务业获客的标配，新客体验转化率目标30%以上",
      "案例+体验价+口碑三管齐下，逐步建立信任壁垒"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_68",
    "problemCode": "MARKETING_HARD",
    "industry": "服务业",
    "stage": "成长期",
    "symptomIds": [
      "sym_m02",
      "sym_m04",
      "sym_m06"
    ],
    "judgment": "你的成长期服务门店营销投放ROI低，缺少稳定获客渠道和系统化运营",
    "severity": 73,
    "causes": [
      {
        "name": "投放效率低下",
        "weight": 30,
        "judgment": "每月营销预算多少？获客成本多少？ROI达标吗？",
        "description": "有一定营销投入但效率低下，获客成本高且转化率低"
      },
      {
        "name": "缺少系统化运营",
        "weight": 25,
        "judgment": "营销动作是随机的还是有计划的？有内容日历吗？",
        "description": "营销缺少系统规划，东一榔头西一棒，无法持续积累效果"
      },
      {
        "name": "口碑运营缺失",
        "weight": 25,
        "judgment": "好评率多少？有主动引导好评吗？差评处理及时吗？",
        "description": "缺少口碑主动运营，好评自然增长慢，差评影响大"
      },
      {
        "name": "老客裂变未启动",
        "weight": 20,
        "judgment": "有推荐奖励机制吗？老客转介绍率多少？",
        "description": "没有启动老客裂变，浪费了最经济的获客方式"
      }
    ],
    "solutionIds": [
      "sol_024",
      "sol_026",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "制定月度营销日历（内容+活动+投放）",
        "duration": "1小时",
        "purpose": "建立系统化节奏"
      },
      {
        "task": "计算各渠道获客成本和ROI",
        "duration": "30分钟",
        "purpose": "优化投放效率"
      },
      {
        "task": "设计老客推荐奖励方案",
        "duration": "30分钟",
        "purpose": "启动裂变获客"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "系统规划日",
        "tasks": [
          "制定月度营销日历",
          "分配每周内容+活动+投放",
          "确定各渠道预算分配"
        ]
      },
      {
        "day": 2,
        "title": "投放优化日",
        "tasks": [
          "分析各渠道ROI数据",
          "优化投放策略和定向",
          "砍低效渠道加码高效渠道"
        ]
      },
      {
        "day": 3,
        "title": "口碑运营日",
        "tasks": [
          "建立好评引导机制",
          "制定差评24h回复标准",
          "设计好评激励方案"
        ]
      },
      {
        "day": 4,
        "title": "裂变启动日",
        "tasks": [
          "确定推荐奖励规则",
          "制作推荐码和海报",
          "向活跃客户发布推荐计划"
        ]
      },
      {
        "day": 5,
        "title": "内容升级日",
        "tasks": [
          "提升内容质量和频率",
          "拍摄服务过程专业视频",
          "优化种草文案和标签"
        ]
      },
      {
        "day": 6,
        "title": "活动策划日",
        "tasks": [
          "策划1个线上引流活动",
          "设计活动到店转化路径",
          "活动预热和发布"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各渠道获客数据",
          "分析裂变效果",
          "优化下周营销执行"
        ]
      }
    ],
    "longTermAdvice": [
      "建立月度营销日历，让营销从随机变系统，从拍脑袋变数据驱动",
      "口碑是服务业的生命线，好评率目标97%以上",
      "老客裂变是最低成本的获客，推荐率目标15%以上"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_69",
    "problemCode": "MARKETING_HARD",
    "industry": "服务业",
    "stage": "老店",
    "symptomIds": [
      "sym_m02",
      "sym_m05",
      "sym_m06"
    ],
    "judgment": "你的老服务店多年未更新营销方式，口碑传播被动且缺少数字化获客能力",
    "severity": 72,
    "causes": [
      {
        "name": "营销方式老化",
        "weight": 30,
        "judgment": "获客还是靠老客户介绍和门口自然流量吗？",
        "description": "营销方式停留在10年前，未跟上数字化获客趋势"
      },
      {
        "name": "口碑被动传播",
        "weight": 25,
        "judgment": "好评是自然产生的还是有引导？线上评价管理了吗？",
        "description": "口碑完全被动，没有主动引导好评和管理线上评价"
      },
      {
        "name": "数字化能力为零",
        "weight": 25,
        "judgment": "会用短视频和社交媒体获客吗？",
        "description": "完全不具备数字化营销能力，错失年轻客群"
      },
      {
        "name": "老客关系断裂",
        "weight": 20,
        "judgment": "和老客户还有联系吗？有定期触达吗？",
        "description": "多年积累的老客关系没有持续维护，大量客户失联"
      }
    ],
    "solutionIds": [
      "sol_024",
      "sol_026",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "盘点所有营销方式，标记过时和空白项",
        "duration": "30分钟",
        "purpose": "诊断营销差距"
      },
      {
        "task": "学习1个同行业数字化营销成功案例",
        "duration": "1小时",
        "purpose": "找到转型方向"
      },
      {
        "task": "整理老客户名单，制定重新联系计划",
        "duration": "30分钟",
        "purpose": "修复客户关系"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "差距诊断日",
        "tasks": [
          "对比同行数字化营销做法",
          "标记自身营销短板",
          "制定3个月转型计划"
        ]
      },
      {
        "day": 2,
        "title": "数字基础日",
        "tasks": [
          "开通/完善线上平台账号",
          "学习短视频拍摄和发布",
          "发布首批3条内容"
        ]
      },
      {
        "day": 3,
        "title": "口碑管理日",
        "tasks": [
          "认领大众点评管理评价",
          "建立好评引导和差评回复",
          "设计好评激励方案"
        ]
      },
      {
        "day": 4,
        "title": "老客修复日",
        "tasks": [
          "分批联系沉睡老客户",
          "设计回归专属优惠",
          "建立客户定期触达机制"
        ]
      },
      {
        "day": 5,
        "title": "内容运营日",
        "tasks": [
          "制定内容发布节奏",
          "拍摄服务案例和专业内容",
          "学习内容标签和推广技巧"
        ]
      },
      {
        "day": 6,
        "title": "社群建设日",
        "tasks": [
          "建立门店客户社群",
          "设计群内容和活动节奏",
          "邀请老客户入群"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估转型首周进展",
          "分析线上数据",
          "调整下周执行重点"
        ]
      }
    ],
    "longTermAdvice": [
      "老店数字化营销转型不是选修课，是生存必修课",
      "老客户是最大资产，先修复关系再开拓新客，两手都要硬",
      "给自己6个月时间完成营销数字化转型，不求快但求稳"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_010"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_70",
    "problemCode": "MARKETING_HARD",
    "industry": "all",
    "stage": "all",
    "symptomIds": [
      "sym_m01",
      "sym_m02",
      "sym_m06"
    ],
    "judgment": "你的门店营销推广能力严重不足，既缺方法也缺渠道，需要从零构建营销体系",
    "severity": 70,
    "causes": [
      {
        "name": "营销知识空白",
        "weight": 30,
        "judgment": "老板或负责人有系统学习过营销吗？",
        "description": "团队缺少营销基础知识，不知道有哪些有效方法"
      },
      {
        "name": "没有获客渠道",
        "weight": 25,
        "judgment": "除了等客上门，有主动获客的方式吗？",
        "description": "没有建立任何主动获客渠道，完全被动等客"
      },
      {
        "name": "内容能力为零",
        "weight": 25,
        "judgment": "能写文案拍视频吗？有产出过营销内容吗？",
        "description": "缺少内容创作能力，无法产出任何营销内容"
      },
      {
        "name": "预算和信心不足",
        "weight": 20,
        "judgment": "有营销预算吗？试过但失败了所以不敢再投？",
        "description": "没有营销预算或试错后丧失信心，不敢投入"
      }
    ],
    "solutionIds": [
      "sol_012",
      "sol_026",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "列出你知道的所有营销方法，标注已做和未做",
        "duration": "30分钟",
        "purpose": "摸清营销差距"
      },
      {
        "task": "学习1个同行业成功营销案例（搜索或请教同行）",
        "duration": "1小时",
        "purpose": "找到可借鉴方法"
      },
      {
        "task": "选择1个最易上手的营销方法立刻开始",
        "duration": "30分钟",
        "purpose": "迈出第一步"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "知识补课日",
        "tasks": [
          "学习营销基础知识",
          "了解主流营销渠道和方法",
          "确定3个适合自身的营销方向"
        ]
      },
      {
        "day": 2,
        "title": "渠道铺设日",
        "tasks": [
          "注册2-3个线上平台",
          "完善店铺基础信息",
          "学习平台基本操作"
        ]
      },
      {
        "day": 3,
        "title": "内容起步日",
        "tasks": [
          "学习简单拍照和文案",
          "制作并发布首条内容",
          "不求完美先做起来"
        ]
      },
      {
        "day": 4,
        "title": "小步试错日",
        "tasks": [
          "设计1个小成本营销测试",
          "执行并追踪效果",
          "记录数据和感受"
        ]
      },
      {
        "day": 5,
        "title": "社群起步日",
        "tasks": [
          "创建客户微信群",
          "设计入群福利",
          "引导到店客户入群"
        ]
      },
      {
        "day": 6,
        "title": "口碑起步日",
        "tasks": [
          "引导满意客户写好评",
          "回复线上所有评价",
          "设计好评小激励"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "总结本周营销行动",
          "分析哪些有效哪些无效",
          "制定下周营销计划"
        ]
      }
    ],
    "longTermAdvice": [
      "营销不在于花多少钱，而在于持续做和不断学习优化",
      "先从免费渠道做起：社群+内容+口碑，零成本也能获客",
      "给自己3个月学习期，营销能力是练出来的不是学出来的"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_010"
    ],
    "priority": 7,
    "status": 1
  },
  {
    "_id": "path_71",
    "problemCode": "COMPETITION",
    "industry": "餐饮",
    "stage": "新店",
    "symptomIds": [
      "sym_x01",
      "sym_x03",
      "sym_x04"
    ],
    "judgment": "你的新开餐饮店在竞品密集区域缺乏差异化卖点，客户无法记住你选择你",
    "severity": 72,
    "causes": [
      {
        "name": "缺乏差异化定位",
        "weight": 35,
        "judgment": "和周边竞品比，你有什么不同？客户为什么选你不选他？",
        "description": "新店没有明确的差异化定位，与竞品同质化严重"
      },
      {
        "name": "品牌认知为零",
        "weight": 25,
        "judgment": "周边客户知道你开了一家什么店吗？",
        "description": "新店零品牌认知，在竞品林立的环境中很难被注意到"
      },
      {
        "name": "价格无优势",
        "weight": 20,
        "judgment": "定价和老店比有优势吗？",
        "description": "新店定价不比老店低，缺乏价格吸引力"
      },
      {
        "name": "产品无记忆点",
        "weight": 20,
        "judgment": "有让人吃一次就记住的菜品吗？",
        "description": "菜品没有独特记忆点，吃完就忘无法形成复购理由"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "实地走访周边5家竞品，记录其定位和特色",
        "duration": "2小时",
        "purpose": "摸清竞争格局"
      },
      {
        "task": "确定1个差异化定位（品类/口味/场景/客群）",
        "duration": "1小时",
        "purpose": "找到独特站位"
      },
      {
        "task": "打造1道竞品没有的记忆点菜品",
        "duration": "1小时",
        "purpose": "建立产品护城河"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞品调研日",
        "tasks": [
          "实地走访5家竞品",
          "分析其定位/特色/价格/客群",
          "找到竞争空白点"
        ]
      },
      {
        "day": 2,
        "title": "差异化定位日",
        "tasks": [
          "确定差异化方向",
          "设计独特价值主张",
          "围绕定位调整菜单和装修"
        ]
      },
      {
        "day": 3,
        "title": "记忆点打造日",
        "tasks": [
          "研发1道独特记忆点菜品",
          "制定标准SOP",
          "设计呈现方式讲好故事"
        ]
      },
      {
        "day": 4,
        "title": "价值主张传播日",
        "tasks": [
          "将差异化信息融入门头和物料",
          "线上发布差异化内容",
          "员工话术培训"
        ]
      },
      {
        "day": 5,
        "title": "首波引流日",
        "tasks": [
          "设计新店专属开业优惠",
          "周边密集推广",
          "利用差异化吸引尝鲜客"
        ]
      },
      {
        "day": 6,
        "title": "竞品监控日",
        "tasks": [
          "持续关注竞品动态",
          "记录竞品促销和变化",
          "调整自身应对策略"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估差异化定位效果",
          "分析客户选择理由",
          "优化差异化策略"
        ]
      }
    ],
    "longTermAdvice": [
      "在竞品密集区域，差异化是生存之本，宁可小众也不要平庸",
      "持续监控竞品动态，每月至少1次竞品走访和策略review",
      "差异化不是一劳永逸的，需要持续强化和更新"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_72",
    "problemCode": "COMPETITION",
    "industry": "餐饮",
    "stage": "成长期",
    "symptomIds": [
      "sym_x01",
      "sym_x02",
      "sym_x03"
    ],
    "judgment": "你的成长期餐饮门店被竞品分流严重，价格战和同质化侵蚀你的市场份额",
    "severity": 75,
    "causes": [
      {
        "name": "竞品分流加剧",
        "weight": 30,
        "judgment": "近半年新开了几家同类店？你的客流有被分流吗？",
        "description": "新竞品不断进入，分流了核心客源，市场份额被蚕食"
      },
      {
        "name": "陷入价格战",
        "weight": 25,
        "judgment": "竞品降价你跟着降了吗？利润被挤压了吗？",
        "description": "被竞品拖入价格战，利润持续被挤压"
      },
      {
        "name": "同质化严重",
        "weight": 25,
        "judgment": "你的产品和竞品有多大差异？客户能区分吗？",
        "description": "产品和服务与竞品高度同质，客户没有忠诚度"
      },
      {
        "name": "客户易被撬走",
        "weight": 20,
        "judgment": "客户去竞品消费的原因是什么？",
        "description": "客户忠诚度低，促销一停就被竞品抢走"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_024",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "分析近6个月客流和营收变化，对比竞品开业时间",
        "duration": "45分钟",
        "purpose": "量化分流影响"
      },
      {
        "task": "列出3个与竞品的核心差异点",
        "duration": "30分钟",
        "purpose": "明确差异化优势"
      },
      {
        "task": "设计1个竞品难以模仿的特色菜品或服务",
        "duration": "1小时",
        "purpose": "建立竞争壁垒"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞争审计日",
        "tasks": [
          "分析客流和营收被分流程度",
          "识别主要竞品和其策略",
          "计算市场份额变化"
        ]
      },
      {
        "day": 2,
        "title": "差异化强化日",
        "tasks": [
          "确定3个核心差异点",
          "将差异化融入所有客户触点",
          "设计差异化体验方案"
        ]
      },
      {
        "day": 3,
        "title": "壁垒构建日",
        "tasks": [
          "研发竞品难模仿的特色菜品",
          "打造独家配方或工艺",
          "建立特色保护意识"
        ]
      },
      {
        "day": 4,
        "title": "会员锁客日",
        "tasks": [
          "强化会员储值锁定客户",
          "设计会员专享非价格权益",
          "提升客户转换成本"
        ]
      },
      {
        "day": 5,
        "title": "价值战替代价格战日",
        "tasks": [
          "停止无底线跟价",
          "用增值服务替代降价",
          "强化价值感而非低价感"
        ]
      },
      {
        "day": 6,
        "title": "竞品应对日",
        "tasks": [
          "分析竞品最新动态",
          "制定针对性应对策略",
          "保持差异化领先优势"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估竞争策略效果",
          "分析客户留存和流失原因",
          "调整下阶段竞争策略"
        ]
      }
    ],
    "longTermAdvice": [
      "绝不打价格战，用价值战和差异化竞争替代",
      "会员储值是锁客抗竞争最有效的武器，储值客户占比目标50%以上",
      "持续创新保持差异化领先，让竞品追不上而非你追竞品"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_73",
    "problemCode": "COMPETITION",
    "industry": "餐饮",
    "stage": "老店",
    "symptomIds": [
      "sym_x01",
      "sym_x02",
      "sym_x05"
    ],
    "judgment": "你的老餐饮店面临品牌连锁竞品和新兴网红店双重夹击，单店竞争力持续衰减",
    "severity": 78,
    "causes": [
      {
        "name": "连锁品牌挤压",
        "weight": 30,
        "judgment": "周边有连锁品牌入驻吗？他们的品牌和供应链优势你怎么抗衡？",
        "description": "连锁品牌凭借品牌力和供应链优势持续挤压单店生存空间"
      },
      {
        "name": "新兴网红分流",
        "weight": 25,
        "judgment": "新开的网红店抢走了年轻客群吗？",
        "description": "新兴网红店吸引年轻客群，老店客群结构老化"
      },
      {
        "name": "品牌力不足",
        "weight": 25,
        "judgment": "你的店在当地有品牌认知度吗？还是只有老街坊知道？",
        "description": "单店品牌力弱，辐射范围有限，无法与品牌连锁竞争"
      },
      {
        "name": "运营效率落后",
        "weight": 20,
        "judgment": "你的运营效率和成本控制比连锁品牌差多少？",
        "description": "单店运营效率低、成本控制弱，在效率型竞争中处于劣势"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "分析竞品类型（连锁/网红/单店）和各自优势",
        "duration": "1小时",
        "purpose": "厘清竞争格局"
      },
      {
        "task": "列出3个单店相对连锁的差异化优势",
        "duration": "30分钟",
        "purpose": "找到竞争支点"
      },
      {
        "task": "设计1个品牌焕新动作提升认知度",
        "duration": "1小时",
        "purpose": "强化品牌力"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞争分析日",
        "tasks": [
          "分析各类竞品优势和威胁",
          "识别自身核心竞争优势",
          "确定竞争策略方向"
        ]
      },
      {
        "day": 2,
        "title": "差异化战略日",
        "tasks": [
          "强化单店独有优势（人情味/灵活/定制）",
          "设计差异化体验方案",
          "将差异化转化为具体行动"
        ]
      },
      {
        "day": 3,
        "title": "品牌焕新日",
        "tasks": [
          "门店视觉升级",
          "菜品和服务焕新",
          "强化在地文化和社区连接"
        ]
      },
      {
        "day": 4,
        "title": "社区深耕日",
        "tasks": [
          "强化周边3公里社区服务",
          "建立社区专属优惠",
          "成为社区居民的食堂"
        ]
      },
      {
        "day": 5,
        "title": "效率提升日",
        "tasks": [
          "优化采购降本",
          "提升出餐效率",
          "减少浪费提高利润率"
        ]
      },
      {
        "day": 6,
        "title": "线上突围日",
        "tasks": [
          "加强线上内容运营",
          "打造特色内容差异化",
          "吸引年轻客群关注"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估竞争策略效果",
          "分析客群结构变化",
          "调整下阶段竞争重点"
        ]
      }
    ],
    "longTermAdvice": [
      "单店抗连锁的核心是：更懂本地客群、更灵活、更有温度",
      "深耕周边3公里社区，成为社区居民不可替代的选择",
      "品牌焕新+效率提升双线并行，才能在与连锁的竞争中生存"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_74",
    "problemCode": "COMPETITION",
    "industry": "零售",
    "stage": "新店",
    "symptomIds": [
      "sym_x01",
      "sym_x03",
      "sym_x04"
    ],
    "judgment": "你的新开零售门店在成熟商圈缺乏选品差异和品牌优势，客户选择竞品的概率更高",
    "severity": 70,
    "causes": [
      {
        "name": "选品无差异化",
        "weight": 35,
        "judgment": "你卖的东西周边竞品也在卖吗？有独家产品吗？",
        "description": "选品与竞品高度重叠，缺少独家或差异化产品"
      },
      {
        "name": "品牌认知劣势",
        "weight": 25,
        "judgment": "客户面对你和老店，更倾向选谁？",
        "description": "新店品牌零认知，客户天然倾向选择熟悉的老店"
      },
      {
        "name": "价格无竞争力",
        "weight": 20,
        "judgment": "你的进货价和零售价比竞品有优势吗？",
        "description": "新店进货量小无价格优势，零售价无法低于竞品"
      },
      {
        "name": "购物体验未建立",
        "weight": 20,
        "judgment": "客户在你店和竞品店的体验有区别吗？",
        "description": "缺少独特的购物体验设计，客户感受不到差异"
      }
    ],
    "solutionIds": [
      "sol_008",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "走访3家竞品记录其核心SKU和价格",
        "duration": "1小时",
        "purpose": "了解竞品选品"
      },
      {
        "task": "确定3个独家或差异化产品方向",
        "duration": "1小时",
        "purpose": "建立选品差异"
      },
      {
        "task": "设计1个独特的购物体验亮点",
        "duration": "30分钟",
        "purpose": "差异化体验"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞品摸底日",
        "tasks": [
          "走访3家竞品记录选品和价格",
          "分析其优势和你的机会",
          "找到选品空白点"
        ]
      },
      {
        "day": 2,
        "title": "差异化选品日",
        "tasks": [
          "引进3-5款竞品没有的产品",
          "寻找独家代理或小众品牌",
          "设计独家产品陈列方案"
        ]
      },
      {
        "day": 3,
        "title": "体验差异化日",
        "tasks": [
          "设计独特购物体验亮点",
          "优化陈列和动线",
          "增加体验互动元素"
        ]
      },
      {
        "day": 4,
        "title": "社群差异日",
        "tasks": [
          "建立精准客群社群",
          "提供竞品没有的社群服务",
          "培养社群粘性"
        ]
      },
      {
        "day": 5,
        "title": "服务差异日",
        "tasks": [
          "提供比竞品更贴心的服务",
          "设计售后保障差异",
          "用服务弥补品牌劣势"
        ]
      },
      {
        "day": 6,
        "title": "开业引爆日",
        "tasks": [
          "利用差异化优势做开业推广",
          "突出独家产品和体验",
          "吸引竞品客户尝鲜"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估差异化效果",
          "分析客户选择原因",
          "优化差异化策略"
        ]
      }
    ],
    "longTermAdvice": [
      "新店在成熟商圈竞争，差异化选品是第一竞争力",
      "独家产品+独特体验+贴心服务，三重差异化抵御品牌劣势",
      "持续寻找独家和小众产品，每月至少引进2-3款竞品没有的新品"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_75",
    "problemCode": "COMPETITION",
    "industry": "零售",
    "stage": "成长期",
    "symptomIds": [
      "sym_x01",
      "sym_x02",
      "sym_x03"
    ],
    "judgment": "你的成长期零售门店正被竞品通过更低价格和更丰富选品蚕食市场份额",
    "severity": 74,
    "causes": [
      {
        "name": "竞品价格侵蚀",
        "weight": 30,
        "judgment": "竞品价格比你低多少？你有价格匹配能力吗？",
        "description": "竞品利用规模优势或亏本引流拉低市场价格"
      },
      {
        "name": "选品丰富度落后",
        "weight": 25,
        "judgment": "竞品SKU比你多吗？品类覆盖比你广吗？",
        "description": "竞品选品更丰富，一站式购物体验更好"
      },
      {
        "name": "客户忠诚度低",
        "weight": 25,
        "judgment": "客户因为什么选你？会因为更便宜就跑吗？",
        "description": "客户选择你缺乏深层理由，价格敏感度高容易被撬"
      },
      {
        "name": "缺少竞争壁垒",
        "weight": 20,
        "judgment": "你有什么是竞品短期内做不到的？",
        "description": "没有建立有效的竞争壁垒，优势容易被模仿和超越"
      }
    ],
    "solutionIds": [
      "sol_024",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "比价核心SKU与竞品的价差，计算可承受的让利空间",
        "duration": "45分钟",
        "purpose": "评估价格竞争力"
      },
      {
        "task": "设计1个竞品难以模仿的会员权益",
        "duration": "1小时",
        "purpose": "建立客户粘性壁垒"
      },
      {
        "task": "引进3款独家或小众差异化产品",
        "duration": "1小时",
        "purpose": "差异化选品"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞争审计日",
        "tasks": [
          "完成核心SKU价格对比",
          "分析竞品选品优势",
          "识别自身竞争短板"
        ]
      },
      {
        "day": 2,
        "title": "壁垒构建日",
        "tasks": [
          "强化会员体系锁定客户",
          "设计高转换成本的会员权益",
          "提升客户离开的代价"
        ]
      },
      {
        "day": 3,
        "title": "选品差异化日",
        "tasks": [
          "引进独家或小众品牌",
          "补充竞品没有的品类",
          "优化差异化选品陈列"
        ]
      },
      {
        "day": 4,
        "title": "服务增值日",
        "tasks": [
          "增加竞品没有的增值服务",
          "提升购物体验差异化",
          "用服务替代价格竞争"
        ]
      },
      {
        "day": 5,
        "title": "会员锁客日",
        "tasks": [
          "推广储值卡和长期套餐",
          "设计会员专属价格和权益",
          "提升会员占比和粘性"
        ]
      },
      {
        "day": 6,
        "title": "内容差异化日",
        "tasks": [
          "打造专业选品内容人设",
          "线上发布选品测评和推荐",
          "建立专业可信赖的品牌形象"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估竞争策略效果",
          "分析客户留存数据",
          "调整下阶段竞争重点"
        ]
      }
    ],
    "longTermAdvice": [
      "不拼价格拼价值，用会员锁客+独家选品+增值服务构建壁垒",
      "会员储值是最强的客户锁定手段，目标储值客户占比40%以上",
      "建立专业选品人设，让客户信任你的选品眼光而非只看价格"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_76",
    "problemCode": "COMPETITION",
    "industry": "零售",
    "stage": "老店",
    "symptomIds": [
      "sym_x01",
      "sym_x04",
      "sym_x05"
    ],
    "judgment": "你的老零售店面临连锁便利和电商双重挤压，传统优势正在快速丧失",
    "severity": 77,
    "causes": [
      {
        "name": "连锁便利分流",
        "weight": 30,
        "judgment": "周边新开了连锁便利店吗？他们抢走了多少日常消费？",
        "description": "连锁便利店24小时+标准化分流了日常消费品市场"
      },
      {
        "name": "电商替代效应",
        "weight": 25,
        "judgment": "客户说的最多的就是'网上更便宜'吗？",
        "description": "电商在价格和品类上的优势持续替代线下零售"
      },
      {
        "name": "传统模式老化",
        "weight": 25,
        "judgment": "经营模式还是10年前那一套吗？",
        "description": "经营模式传统老化，无法与新型零售形态竞争"
      },
      {
        "name": "缺少不可替代性",
        "weight": 20,
        "judgment": "客户有什么理由非来你店不可？",
        "description": "缺少不可替代的价值，客户随时可以找到替代渠道"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "分析营收下滑品类，区分电商可替代和不可替代品类",
        "duration": "1小时",
        "purpose": "找到防守方向"
      },
      {
        "task": "确定2-3个线下不可替代的品类或服务",
        "duration": "30分钟",
        "purpose": "建立不可替代性"
      },
      {
        "task": "设计1个体验型到店活动（电商做不了）",
        "duration": "1小时",
        "purpose": "发挥线下优势"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞争格局日",
        "tasks": [
          "分析连锁便利和电商的分流程度",
          "区分可替代和不可替代品类",
          "确定防守和进攻方向"
        ]
      },
      {
        "day": 2,
        "title": "品类重构日",
        "tasks": [
          "收缩电商可替代品类",
          "强化线下不可替代品类",
          "增加体验型和服务型品类"
        ]
      },
      {
        "day": 3,
        "title": "体验升级日",
        "tasks": [
          "设计线下独有购物体验",
          "增加试穿/试用/体验区",
          "打造'来了才有的体验'"
        ]
      },
      {
        "day": 4,
        "title": "社区深耕日",
        "tasks": [
          "强化社区即时需求服务",
          "提供代收代寄便民服务",
          "成为社区生活服务中心"
        ]
      },
      {
        "day": 5,
        "title": "私域建设日",
        "tasks": [
          "建立社群+小程序闭环",
          "线上线下联动",
          "社群专属价格和选品"
        ]
      },
      {
        "day": 6,
        "title": "效率提升日",
        "tasks": [
          "优化库存减少资金占用",
          "提升坪效和人效",
          "用数据驱动选品决策"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估品类调整效果",
          "分析体验活动数据",
          "制定下阶段转型重点"
        ]
      }
    ],
    "longTermAdvice": [
      "线下零售的出路是做电商做不了的事：体验、即时、服务、社交",
      "收缩可替代品类、强化不可替代品类，做精不做全",
      "社区化+私域化是老零售店的转型方向"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_77",
    "problemCode": "COMPETITION",
    "industry": "服务业",
    "stage": "新店",
    "symptomIds": [
      "sym_x01",
      "sym_x03",
      "sym_x04"
    ],
    "judgment": "你的新开服务门店在竞品成熟区域缺乏口碑和案例背书，客户倾向选择老店",
    "severity": 70,
    "causes": [
      {
        "name": "信任劣势明显",
        "weight": 35,
        "judgment": "客户面对新店和老店，担心你的服务品质不过关吗？",
        "description": "新店没有口碑积累，客户天然信任经营更久的老店"
      },
      {
        "name": "缺少案例展示",
        "weight": 25,
        "judgment": "有展示过服务效果案例吗？客户能评估你的水平吗？",
        "description": "没有案例展示让客户评估服务品质，信任门槛高"
      },
      {
        "name": "品牌零认知",
        "weight": 25,
        "judgment": "目标客群知道你的店吗？",
        "description": "新店品牌零认知，在竞品林立中几乎不被注意"
      },
      {
        "name": "定价无吸引力",
        "weight": 15,
        "judgment": "有新客体验价吗？比老店有价格优势吗？",
        "description": "定价与老店持平甚至更高，缺少吸引尝鲜的理由"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "走访3家竞品了解其定价、客群和口碑",
        "duration": "1小时",
        "purpose": "摸清竞争环境"
      },
      {
        "task": "设计强力新客体验价（正常价3折）+效果承诺",
        "duration": "30分钟",
        "purpose": "突破信任壁垒"
      },
      {
        "task": "准备3个服务案例用于线上展示",
        "duration": "1小时",
        "purpose": "建立信任素材"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞品分析日",
        "tasks": [
          "走访3家竞品",
          "分析其优势和弱点",
          "找到竞争突破口"
        ]
      },
      {
        "day": 2,
        "title": "信任建设日",
        "tasks": [
          "准备服务案例和效果展示",
          "制作案例内容",
          "线上发布建立初步信任"
        ]
      },
      {
        "day": 3,
        "title": "体验价上线日",
        "tasks": [
          "确定体验套餐和定价",
          "制作体验卡",
          "设计效果承诺方案"
        ]
      },
      {
        "day": 4,
        "title": "差异化服务日",
        "tasks": [
          "设计1个竞品没有的特色服务",
          "打造服务差异化亮点",
          "将差异化融入营销内容"
        ]
      },
      {
        "day": 5,
        "title": "口碑启动日",
        "tasks": [
          "引导首批体验客户好评",
          "制作好评展示内容",
          "线上积极回复互动"
        ]
      },
      {
        "day": 6,
        "title": "异业引流日",
        "tasks": [
          "联系互补商家互推客户",
          "设计联合服务套餐",
          "启动首批合作引流"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计体验客户到店和转化",
          "分析口碑积累效果",
          "调整下周竞争策略"
        ]
      }
    ],
    "longTermAdvice": [
      "新店在成熟商圈竞争，信任+体验价+案例是破局三板斧",
      "服务行业的口碑是护城河，前6个月必须全力积累好评",
      "差异化服务是长期竞争武器，持续创新让竞品追不上"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_78",
    "problemCode": "COMPETITION",
    "industry": "服务业",
    "stage": "成长期",
    "symptomIds": [
      "sym_x01",
      "sym_x02",
      "sym_x03"
    ],
    "judgment": "你的成长期服务门店被竞品低价抢单和模仿跟进，市场份额增长受阻",
    "severity": 74,
    "causes": [
      {
        "name": "竞品低价抢单",
        "weight": 30,
        "judgment": "竞品用低于你的价格抢客户了吗？",
        "description": "竞品用低价策略主动抢单，侵蚀你的市场份额"
      },
      {
        "name": "特色被竞品模仿",
        "weight": 25,
        "judgment": "你的特色服务竞品开始做了吗？",
        "description": "创新服务被竞品快速模仿，差异化优势被消解"
      },
      {
        "name": "客户比价严重",
        "weight": 25,
        "judgment": "客户消费前会多家比价吗？",
        "description": "客户消费前习惯多家比较，价格敏感度高"
      },
      {
        "name": "缺少客户锁定",
        "weight": 20,
        "judgment": "客户在你家消费后有多大粘性？",
        "description": "缺少客户锁定机制，客户随时可以被竞品抢走"
      }
    ],
    "solutionIds": [
      "sol_024",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "分析竞品最新策略和定价变化",
        "duration": "45分钟",
        "purpose": "掌握竞品动态"
      },
      {
        "task": "强化会员体系，设计竞品难模仿的专属权益",
        "duration": "1小时",
        "purpose": "锁定核心客户"
      },
      {
        "task": "设计1个创新服务项，保持差异化领先",
        "duration": "1小时",
        "purpose": "持续创新领跑"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞品监控日",
        "tasks": [
          "更新竞品策略和价格信息",
          "分析竞品模仿你的哪些特色",
          "制定应对策略"
        ]
      },
      {
        "day": 2,
        "title": "客户锁定日",
        "tasks": [
          "强化储值卡锁定客户",
          "设计会员专属不可替代权益",
          "提升客户离开成本"
        ]
      },
      {
        "day": 3,
        "title": "创新领先日",
        "tasks": [
          "设计1个竞品没有的新服务",
          "快速试制上线",
          "保持差异化创新节奏"
        ]
      },
      {
        "day": 4,
        "title": "口碑加固日",
        "tasks": [
          "强化好评率和口碑传播",
          "引导核心客户写深度好评",
          "用口碑抵御低价竞争"
        ]
      },
      {
        "day": 5,
        "title": "价值战日",
        "tasks": [
          "停止跟价打价值战",
          "强化服务品质和效果保障",
          "让客户感受到价值而非低价"
        ]
      },
      {
        "day": 6,
        "title": "老客深耕日",
        "tasks": [
          "提升核心客户服务体验",
          "设计老客专属升级服务",
          "让核心客户成为口碑传播者"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估竞争策略效果",
          "分析客户留存和新增",
          "调整下阶段竞争重点"
        ]
      }
    ],
    "longTermAdvice": [
      "服务业竞争的终局是口碑+专业+客户关系，不是价格",
      "持续创新保持差异化领先，让竞品永远在追赶而非超越",
      "客户锁定是抗竞争的根本，储值+会员+专属权益三重锁定"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_79",
    "problemCode": "COMPETITION",
    "industry": "服务业",
    "stage": "老店",
    "symptomIds": [
      "sym_x01",
      "sym_x04",
      "sym_x05"
    ],
    "judgment": "你的老服务店面临新式连锁和精品工作室双向挤压，传统经营模式优势渐失",
    "severity": 76,
    "causes": [
      {
        "name": "连锁品牌冲击",
        "weight": 30,
        "judgment": "连锁品牌有标准化和品牌优势，你怎么应对？",
        "description": "新式连锁品牌凭借品牌+标准+规模优势抢走中端客群"
      },
      {
        "name": "精品工作室分流",
        "weight": 25,
        "judgment": "独立精品工作室有个性化优势，高端客群被分流了吗？",
        "description": "精品工作室用个性化服务分流高端客群"
      },
      {
        "name": "服务模式老化",
        "weight": 25,
        "judgment": "你的服务方式和体验还停留在5年前吗？",
        "description": "服务形式和空间体验老化，无法满足升级的消费需求"
      },
      {
        "name": "技师流失严重",
        "weight": 20,
        "judgment": "核心技师被竞品挖走了吗？",
        "description": "优秀技师流失到竞品，服务品质下降形成恶性循环"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "分析客群流失方向：去了连锁还是工作室？",
        "duration": "45分钟",
        "purpose": "明确竞争威胁来源"
      },
      {
        "task": "确定差异化竞争策略：做连锁做不了的",
        "duration": "1小时",
        "purpose": "找到竞争支点"
      },
      {
        "task": "设计核心技师留人和激励方案",
        "duration": "30分钟",
        "purpose": "稳住服务品质根基"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "双向威胁分析日",
        "tasks": [
          "分析连锁和工作室的分流程度",
          "确定主要竞争威胁方向",
          "制定差异化竞争策略"
        ]
      },
      {
        "day": 2,
        "title": "差异化定位日",
        "tasks": [
          "强化人情味和定制化服务",
          "打造连锁做不了的温度感",
          "发挥老店的在地信任优势"
        ]
      },
      {
        "day": 3,
        "title": "服务升级日",
        "tasks": [
          "更新服务空间和体验",
          "引入新式服务手法和设备",
          "保持传统内核升级外在体验"
        ]
      },
      {
        "day": 4,
        "title": "人才保卫日",
        "tasks": [
          "制定核心技师留人方案",
          "提升薪酬和成长空间",
          "建立师徒制传承机制"
        ]
      },
      {
        "day": 5,
        "title": "口碑加固日",
        "tasks": [
          "强化老客户口碑传播",
          "设计老客推荐专属福利",
          "用好多年积累的信任资产"
        ]
      },
      {
        "day": 6,
        "title": "线上突围日",
        "tasks": [
          "打造专业人设线上内容",
          "发布技师故事和服务案例",
          "吸引年轻客群关注"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估竞争策略效果",
          "分析客群结构变化",
          "调整下阶段竞争重点"
        ]
      }
    ],
    "longTermAdvice": [
      "老店的竞争武器是信任+温度+专业，这是连锁和工作室都不具备的组合",
      "稳住核心技师就是稳住服务品质，人才是服务业最大的资产",
      "传统内核+现代体验的融合，是老店焕新的正确打开方式"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_80",
    "problemCode": "COMPETITION",
    "industry": "all",
    "stage": "all",
    "symptomIds": [
      "sym_x01",
      "sym_x02",
      "sym_x04"
    ],
    "judgment": "你的门店面临激烈同质化竞争，缺乏差异化优势导致客户随时可能被竞品抢走",
    "severity": 72,
    "causes": [
      {
        "name": "同质化严重",
        "weight": 30,
        "judgment": "你的产品/服务和竞品有多大同质化？客户能区分吗？",
        "description": "与竞品高度同质化，客户没有必须选择你的理由"
      },
      {
        "name": "缺少竞争壁垒",
        "weight": 25,
        "judgment": "你有什么是竞品短期内做不到或做不到这么好的？",
        "description": "没有建立有效的竞争壁垒，优势容易被模仿"
      },
      {
        "name": "客户忠诚度低",
        "weight": 25,
        "judgment": "客户是因为什么选你？换个更便宜的会跑吗？",
        "description": "客户选择缺乏深层理由，忠诚度低容易被撬"
      },
      {
        "name": "被动应对竞争",
        "weight": 20,
        "judgment": "是主动制定竞争策略还是被动应对？",
        "description": "缺少主动竞争策略，总是在被动应对竞品动作"
      }
    ],
    "solutionIds": [
      "sol_009",
      "sol_025",
      "sol_030"
    ],
    "todayTasks": [
      {
        "task": "列出3个竞品和你的核心差异对比",
        "duration": "45分钟",
        "purpose": "明确差异化现状"
      },
      {
        "task": "确定1个可以建立壁垒的差异化方向",
        "duration": "1小时",
        "purpose": "选择竞争策略"
      },
      {
        "task": "设计1个竞品难模仿的客户锁定机制",
        "duration": "30分钟",
        "purpose": "建立护城河"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "竞争诊断日",
        "tasks": [
          "全面分析竞品优劣势",
          "识别自身差异化机会",
          "确定竞争策略方向"
        ]
      },
      {
        "day": 2,
        "title": "差异化打造日",
        "tasks": [
          "强化1个核心差异化点",
          "将差异化融入所有客户触点",
          "让客户明确感知到差异"
        ]
      },
      {
        "day": 3,
        "title": "壁垒构建日",
        "tasks": [
          "建立客户锁定机制",
          "强化会员或储值体系",
          "提升客户转换成本"
        ]
      },
      {
        "day": 4,
        "title": "价值提升日",
        "tasks": [
          "用增值服务替代价格竞争",
          "强化品质和体验差异化",
          "让客户感受到不可替代的价值"
        ]
      },
      {
        "day": 5,
        "title": "口碑加固日",
        "tasks": [
          "强化好评率和口碑传播",
          "引导客户分享差异化体验",
          "用口碑抵御同质化竞争"
        ]
      },
      {
        "day": 6,
        "title": "竞品监控日",
        "tasks": [
          "持续跟踪竞品动态",
          "分析竞品策略变化",
          "及时调整应对方案"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估竞争策略效果",
          "分析客户留存数据",
          "优化下阶段竞争计划"
        ]
      }
    ],
    "longTermAdvice": [
      "差异化是竞争的万能钥匙，找到并持续强化你的独特价值",
      "客户锁定比获新客更重要，会员储值是最有效的锁客工具",
      "从被动应对到主动竞争，定期review竞品动态并调整策略"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 7,
    "status": 1
  },
  {
    "_id": "path_81",
    "problemCode": "TRAFFIC_LOW",
    "industry": "餐饮",
    "stage": "新店",
    "symptomIds": [
      "sym_t01",
      "sym_t02",
      "sym_t05"
    ],
    "judgment": "你的新开餐饮店周边无人知晓，门头辨识度低且缺少开业引流爆发力",
    "severity": 78,
    "causes": [
      {
        "name": "开业声量不足",
        "weight": 35,
        "judgment": "开业活动力度够吗？周边有多少人知道？",
        "description": "开业引流力度不够，错失了最佳曝光窗口"
      },
      {
        "name": "门头品类不清",
        "weight": 30,
        "judgment": "3秒内路人能看出你卖什么吗？",
        "description": "门头信息不清晰，路人无法快速判断品类"
      },
      {
        "name": "周边渗透为零",
        "weight": 20,
        "judgment": "做过任何周边推广吗？",
        "description": "完全没有周边社区推广动作，认知度接近零"
      },
      {
        "name": "线上未铺设",
        "weight": 15,
        "judgment": "在大众点评能搜到你吗？",
        "description": "线上平台未认领和运营，搜索不到店铺信息"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_003",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "检查门头是否3秒内能传达品类和招牌菜",
        "duration": "30分钟",
        "purpose": "优化门头辨识度"
      },
      {
        "task": "策划一个强力开业引流活动方案",
        "duration": "1小时",
        "purpose": "规划引流爆发"
      },
      {
        "task": "认领大众点评门店并完善信息",
        "duration": "30分钟",
        "purpose": "建立线上基础"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "门头优化日",
        "tasks": [
          "增加品类标识横幅",
          "门口放招牌菜立牌",
          "确保晚间灯光醒目"
        ]
      },
      {
        "day": 2,
        "title": "开业引爆日",
        "tasks": [
          "执行强力引流活动",
          "周边500米密集派单",
          "进3个业主群发开业信息"
        ]
      },
      {
        "day": 3,
        "title": "线上铺设日",
        "tasks": [
          "完善所有线上平台信息",
          "发布开业优惠内容",
          "邀请本地美食博主探店"
        ]
      },
      {
        "day": 4,
        "title": "种子客户日",
        "tasks": [
          "深度服务首批到店客户",
          "引导好评和分享",
          "收集产品和体验反馈"
        ]
      },
      {
        "day": 5,
        "title": "引流品上线日",
        "tasks": [
          "推出引流特价菜",
          "制作宣传物料",
          "员工推荐话术培训"
        ]
      },
      {
        "day": 6,
        "title": "内容生产日",
        "tasks": [
          "拍摄3条短视频素材",
          "发布探店和引流内容",
          "回复线上所有评价"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计本周到店人数和来源",
          "分析引流品转化率",
          "制定第二周引流计划"
        ]
      }
    ],
    "longTermAdvice": [
      "新店前3个月必须持续高频引流，每周至少1次到店活动",
      "门头3秒原则：路人3秒内能看出品类+招牌菜",
      "线上平台是免费流量入口，必须第一时间完善和运营"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_003"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_82",
    "problemCode": "TRAFFIC_LOW",
    "industry": "零售",
    "stage": "老店",
    "symptomIds": [
      "sym_t01",
      "sym_t04",
      "sym_t06"
    ],
    "judgment": "你的老零售店客流萎缩严重，品牌老化且线上到店链路断裂，急需焕新引流",
    "severity": 73,
    "causes": [
      {
        "name": "品牌形象老化",
        "weight": 30,
        "judgment": "门店形象多久没更新了？看起来过时吗？",
        "description": "门店装修和品牌形象老化，对新一代客户缺乏吸引力"
      },
      {
        "name": "线上到店链路断",
        "weight": 25,
        "judgment": "线上能看到你的店吗？有引导到店的设计吗？",
        "description": "线上缺少到店引导，看了也无法方便到店消费"
      },
      {
        "name": "缺少新鲜理由",
        "weight": 25,
        "judgment": "老客户还有什么理由再来？",
        "description": "长期缺少新鲜元素，老客户消费疲劳新客户不感兴趣"
      },
      {
        "name": "周边商圈变迁",
        "weight": 20,
        "judgment": "周边人流这些年有变化吗？",
        "description": "周边商圈人流变迁，但门店没有跟进调整"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_005",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "拍摄门店现状照片客观评估老化程度",
        "duration": "30分钟",
        "purpose": "诊断品牌老化"
      },
      {
        "task": "设计1个主题焕新活动制造话题",
        "duration": "1小时",
        "purpose": "制造新鲜感"
      },
      {
        "task": "开通线上到店功能（小程序/社群预订）",
        "duration": "1小时",
        "purpose": "修复到店链路"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "焕新规划日",
        "tasks": [
          "制定门店视觉焕新计划",
          "确定主题焕新活动方案",
          "规划焕新排期和预算"
        ]
      },
      {
        "day": 2,
        "title": "视觉升级日",
        "tasks": [
          "更换关键视觉元素",
          "优化橱窗陈列",
          "提升灯光和氛围"
        ]
      },
      {
        "day": 3,
        "title": "线上修复日",
        "tasks": [
          "完善线上平台信息",
          "开通到店功能",
          "发布焕新内容"
        ]
      },
      {
        "day": 4,
        "title": "活动策划日",
        "tasks": [
          "设计主题焕新活动",
          "制作活动物料",
          "活动预热推广"
        ]
      },
      {
        "day": 5,
        "title": "活动执行日",
        "tasks": [
          "执行焕新活动",
          "引导客户关注和入群",
          "收集客户反馈"
        ]
      },
      {
        "day": 6,
        "title": "老客激活日",
        "tasks": [
          "通知老客户门店焕新",
          "设计老客回归优惠",
          "激活沉睡客户"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计焕新后客流变化",
          "分析活动效果",
          "制定持续焕新计划"
        ]
      }
    ],
    "longTermAdvice": [
      "老店每2-3年需要一次视觉焕新，保持对新一代客户的吸引力",
      "线上到店链路是命脉，必须打通从种草到到店的完整路径",
      "定期给老客户新鲜理由回来，每月至少1次主题更新"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_001",
      "tool_002"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_83",
    "problemCode": "TRAFFIC_LOW",
    "industry": "服务业",
    "stage": "成长期",
    "symptomIds": [
      "sym_t01",
      "sym_t04",
      "sym_t06"
    ],
    "judgment": "你的成长期服务门店线上引流转化率低，缺少可复制的获客渠道导致增长停滞",
    "severity": 70,
    "causes": [
      {
        "name": "线上转化率低",
        "weight": 30,
        "judgment": "线上有曝光吗？看到的人有多少实际到店？",
        "description": "有一定线上曝光但到店转化率低，缺少转化引导设计"
      },
      {
        "name": "获客渠道单一",
        "weight": 25,
        "judgment": "新客主要来自哪个渠道？过度依赖吗？",
        "description": "获客渠道单一，一旦该渠道效果下降就陷入增长瓶颈"
      },
      {
        "name": "缺少转化诱饵",
        "weight": 25,
        "judgment": "线上看到你的客户有强理由到店吗？",
        "description": "缺少到店转化诱饵，客户看了不行动"
      },
      {
        "name": "时段利用不均",
        "weight": 20,
        "judgment": "闲时大量空档？高峰又排不下？",
        "description": "时段利用不均衡，整体产能利用率低"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_006",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "分析各渠道获客数据和转化率",
        "duration": "45分钟",
        "purpose": "诊断渠道效率"
      },
      {
        "task": "设计1个强力的到店转化诱饵（限时体验价）",
        "duration": "30分钟",
        "purpose": "提升转化率"
      },
      {
        "task": "列出3个未尝试的潜在获客渠道",
        "duration": "30分钟",
        "purpose": "拓展渠道"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "渠道审计日",
        "tasks": [
          "完成各渠道数据分析",
          "标记高效和低效渠道",
          "制定渠道多元化计划"
        ]
      },
      {
        "day": 2,
        "title": "转化优化日",
        "tasks": [
          "设计到店转化诱饵",
          "优化线上到店引导链路",
          "增加预约和咨询入口"
        ]
      },
      {
        "day": 3,
        "title": "新渠道测试日",
        "tasks": [
          "测试2个新获客渠道",
          "追踪新渠道数据",
          "评估获客成本"
        ]
      },
      {
        "day": 4,
        "title": "闲时运营日",
        "tasks": [
          "设计闲时特惠引流",
          "优化时段利用率",
          "闲时增加体验活动"
        ]
      },
      {
        "day": 5,
        "title": "内容引流日",
        "tasks": [
          "发布高质量种草内容",
          "增加线上互动引导",
          "设计内容到店转化路径"
        ]
      },
      {
        "day": 6,
        "title": "异业合作日",
        "tasks": [
          "联系3家互补商家",
          "设计互推合作方案",
          "启动联合引流"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各渠道新增到店数",
          "计算各渠道获客成本",
          "优化渠道投入分配"
        ]
      }
    ],
    "longTermAdvice": [
      "构建3个以上稳定获客渠道，任一渠道占比不超过40%",
      "线上到店转化率目标8%以上，关键是设计强转化诱饵",
      "闲时利用率提升到70%以上，配合高峰形成全时段营收"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_001",
      "tool_004"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_84",
    "problemCode": "TRAFFIC_LOW",
    "industry": "餐饮",
    "stage": "成长期",
    "symptomIds": [
      "sym_t01",
      "sym_t04",
      "sym_t06"
    ],
    "judgment": "你的成长期餐饮门店客流增长遇瓶颈，线上引流效率低且渠道过于单一",
    "severity": 69,
    "causes": [
      {
        "name": "渠道过于单一",
        "weight": 35,
        "judgment": "新客主要来自哪里？过度依赖大众点评吗？",
        "description": "获客渠道集中在一个平台，抗风险能力弱"
      },
      {
        "name": "线上转化低",
        "weight": 25,
        "judgment": "线上曝光到实际到店转化率多少？",
        "description": "线上有曝光但缺少有效到店转化设计"
      },
      {
        "name": "缺少裂变获客",
        "weight": 20,
        "judgment": "老客推荐带来多少新客？有推荐机制吗？",
        "description": "没有利用老客推荐裂变，浪费最经济的获客方式"
      },
      {
        "name": "内容吸引力弱",
        "weight": 20,
        "judgment": "发布的内容有人看有人来吗？",
        "description": "线上内容缺少吸引力，曝光量大但互动和转化少"
      }
    ],
    "solutionIds": [
      "sol_001",
      "sol_012",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "统计各渠道新客占比，识别过度依赖渠道",
        "duration": "30分钟",
        "purpose": "诊断渠道风险"
      },
      {
        "task": "启动老客推荐奖励计划",
        "duration": "30分钟",
        "purpose": "启动裂变获客"
      },
      {
        "task": "提升内容质量，学习1个高赞同行内容",
        "duration": "1小时",
        "purpose": "提升内容获客力"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "渠道多元化日",
        "tasks": [
          "分析渠道风险和机会",
          "制定渠道拓展计划",
          "测试1个新渠道"
        ]
      },
      {
        "day": 2,
        "title": "内容升级日",
        "tasks": [
          "学习高赞内容创作技巧",
          "提升拍摄和剪辑质量",
          "制定内容发布日历"
        ]
      },
      {
        "day": 3,
        "title": "裂变启动日",
        "tasks": [
          "设计推荐奖励规则",
          "制作推荐码和海报",
          "向活跃客户发布推荐计划"
        ]
      },
      {
        "day": 4,
        "title": "转化优化日",
        "tasks": [
          "优化线上到店引导",
          "增加预约和到店诱饵",
          "提升转化率"
        ]
      },
      {
        "day": 5,
        "title": "异业引流日",
        "tasks": [
          "联系3家互补商家",
          "设计互推方案",
          "启动合作引流"
        ]
      },
      {
        "day": 6,
        "title": "活动引流日",
        "tasks": [
          "策划1个线上引流到店活动",
          "全渠道推送",
          "追踪活动效果"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计各渠道新增客流",
          "计算裂变获客效果",
          "优化渠道投入分配"
        ]
      }
    ],
    "longTermAdvice": [
      "渠道多元化是抗风险的根本，至少3个稳定获客渠道",
      "内容获客+老客裂变+异业合作三管齐下打破增长瓶颈",
      "每周至少3条高质量内容+1次引流活动，持续获客不间断"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_003"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_85",
    "problemCode": "TRAFFIC_LOW",
    "industry": "服务业",
    "stage": "新店",
    "symptomIds": [
      "sym_t01",
      "sym_t02",
      "sym_t03"
    ],
    "judgment": "你的新开服务门店信任壁垒高且体验不可见，路人不敢进店尝试",
    "severity": 71,
    "causes": [
      {
        "name": "服务体验不可见",
        "weight": 35,
        "judgment": "路人能看到你的服务过程和效果吗？",
        "description": "服务天然不可见，路人无法判断品质不敢进店"
      },
      {
        "name": "零信任积累",
        "weight": 25,
        "judgment": "没有任何好评和案例展示吗？",
        "description": "新店零信任积累，客户决策风险高"
      },
      {
        "name": "首单门槛过高",
        "weight": 25,
        "judgment": "第一次体验需要付全价吗？有体验价吗？",
        "description": "缺少体验价入口，首单决策门槛过高"
      },
      {
        "name": "门面信息不清",
        "weight": 15,
        "judgment": "门面能看出做什么服务吗？效果如何展示？",
        "description": "门面信息不清晰，无法传达服务内容和品质"
      }
    ],
    "solutionIds": [
      "sol_002",
      "sol_006",
      "sol_027"
    ],
    "todayTasks": [
      {
        "task": "在门面增加服务项目和效果展示",
        "duration": "1小时",
        "purpose": "让服务被看见"
      },
      {
        "task": "设计新客体验套餐（正常价3折）",
        "duration": "30分钟",
        "purpose": "降低首单门槛"
      },
      {
        "task": "准备3个案例用于线上展示和门面陈列",
        "duration": "1小时",
        "purpose": "建立信任素材"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "可视化日",
        "tasks": [
          "门面增加效果展示",
          "设置服务过程可视窗口",
          "让路人能感知服务品质"
        ]
      },
      {
        "day": 2,
        "title": "体验价上线日",
        "tasks": [
          "确定体验套餐和定价",
          "制作体验卡和物料",
          "设计体验流程话术"
        ]
      },
      {
        "day": 3,
        "title": "案例展示日",
        "tasks": [
          "整理服务前后对比案例",
          "制作案例展示墙/册",
          "线上发布案例内容"
        ]
      },
      {
        "day": 4,
        "title": "开业引流日",
        "tasks": [
          "设计强力开业体验活动",
          "周边密集推广",
          "邀请目标客群免费体验"
        ]
      },
      {
        "day": 5,
        "title": "线上铺设日",
        "tasks": [
          "完善大众点评信息",
          "发布首批种草内容",
          "开通预约功能"
        ]
      },
      {
        "day": 6,
        "title": "异业引流日",
        "tasks": [
          "联系互补商家谈互推",
          "设计联合服务方案",
          "启动首批合作引流"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计体验客户到店数",
          "分析转化率",
          "优化下周引流策略"
        ]
      }
    ],
    "longTermAdvice": [
      "让看不见的服务被看见，这是服务行业获客的第一步",
      "体验价+效果保障+案例展示三管齐下突破信任壁垒",
      "前3个月全力积累好评和案例，信任是服务行业的命脉"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_001",
      "tool_004"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_86",
    "problemCode": "REVENUE_DROP",
    "industry": "餐饮",
    "stage": "老店",
    "symptomIds": [
      "sym_r01",
      "sym_r02",
      "sym_r04"
    ],
    "judgment": "你的老餐饮店营收持续下滑，菜品老化+促销依赖+客单价走低三重困境",
    "severity": 76,
    "causes": [
      {
        "name": "菜品老化无新品拉动",
        "weight": 30,
        "judgment": "多久没上新菜了？新品对营收贡献多少？",
        "description": "菜品长期不变，缺少新品拉动消费频次和金额"
      },
      {
        "name": "促销依赖恶性循环",
        "weight": 25,
        "judgment": "不打折就没客人？促销效果越来越差？",
        "description": "长期依赖促销，不打折客户不来，促销效果递减"
      },
      {
        "name": "客单价持续走低",
        "weight": 25,
        "judgment": "人均消费同比是升还是降？",
        "description": "客单价同比持续下降，消费升级做不上去"
      },
      {
        "name": "外卖运营粗放",
        "weight": 20,
        "judgment": "外卖营收占比和利润率多少？",
        "description": "外卖渠道运营粗放，增收效果有限且利润率低"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_007",
      "sol_023"
    ],
    "todayTasks": [
      {
        "task": "分析近6个月客单价和营收趋势",
        "duration": "30分钟",
        "purpose": "量化营收下滑"
      },
      {
        "task": "设计2个提升客单价的组合套餐",
        "duration": "1小时",
        "purpose": "拉升消费金额"
      },
      {
        "task": "制定菜品更新计划（淘汰3旧上新2）",
        "duration": "45分钟",
        "purpose": "注入增长动力"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "数据诊断日",
        "tasks": [
          "分析客单价和品类贡献",
          "识别下滑关键因素",
          "制定增收策略方向"
        ]
      },
      {
        "day": 2,
        "title": "菜品焕新日",
        "tasks": [
          "淘汰3道末位菜品",
          "上线2道新菜品",
          "菜单重新排版"
        ]
      },
      {
        "day": 3,
        "title": "客单提升日",
        "tasks": [
          "上线组合套餐",
          "培训员工推套餐话术",
          "设计加购推荐"
        ]
      },
      {
        "day": 4,
        "title": "促销转型日",
        "tasks": [
          "减少打折型促销",
          "增加增值型活动",
          "用会员权益替代打折"
        ]
      },
      {
        "day": 5,
        "title": "外卖优化日",
        "tasks": [
          "优化外卖菜单和定价",
          "设置满减和配送策略",
          "提升外卖利润率"
        ]
      },
      {
        "day": 6,
        "title": "会员运营日",
        "tasks": [
          "强化储值锁定客户",
          "设计会员专享非价格权益",
          "提升会员复购频次"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计套餐和客单价数据",
          "分析菜品更新效果",
          "调整下月营收策略"
        ]
      }
    ],
    "longTermAdvice": [
      "从打折驱动转为价值驱动，用套餐和增值提升客单价",
      "每季度更新菜品保持新鲜感，新品贡献营收目标15%以上",
      "储值锁客+外卖增量双线并行，稳定和扩大营收基础"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_87",
    "problemCode": "REVENUE_DROP",
    "industry": "零售",
    "stage": "新店",
    "symptomIds": [
      "sym_r01",
      "sym_r02",
      "sym_r05"
    ],
    "judgment": "你的新开零售店选品未经验证导致连带率低，营收远未达到预期水平",
    "severity": 67,
    "causes": [
      {
        "name": "选品验证不足",
        "weight": 30,
        "judgment": "首批选品是根据数据还是感觉？",
        "description": "选品未经验证，部分品类不受目标客群欢迎"
      },
      {
        "name": "连带率极低",
        "weight": 25,
        "judgment": "平均每单含几件商品？有做关联陈列吗？",
        "description": "缺少关联陈列和连带推荐，客户买一件就走"
      },
      {
        "name": "定价策略失当",
        "weight": 25,
        "judgment": "定价有做过A/B测试吗？有价格弹性分析吗？",
        "description": "定价缺少测试和优化，部分品类定价不合理影响转化"
      },
      {
        "name": "促销缺少体系",
        "weight": 20,
        "judgment": "促销是随意的还是系统策划的？",
        "description": "促销缺少系统策划，随机打折效果差且伤害价值感"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_008",
      "sol_023"
    ],
    "todayTasks": [
      {
        "task": "统计各品类连带率和客单价",
        "duration": "30分钟",
        "purpose": "诊断连带问题"
      },
      {
        "task": "设计3组关联陈列方案提升连带",
        "duration": "1小时",
        "purpose": "提升连带率"
      },
      {
        "task": "制定系统促销日历替代随机打折",
        "duration": "30分钟",
        "purpose": "规范促销体系"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "连带诊断日",
        "tasks": [
          "完成连带率和客单价分析",
          "标记低连带品类",
          "设计关联陈列方案"
        ]
      },
      {
        "day": 2,
        "title": "陈列优化日",
        "tasks": [
          "实施关联陈列",
          "增加场景化展示区",
          "优化动线引导增加接触面"
        ]
      },
      {
        "day": 3,
        "title": "定价测试日",
        "tasks": [
          "选取3个品类做价格测试",
          "设置不同价格看转化",
          "记录数据找最优价格"
        ]
      },
      {
        "day": 4,
        "title": "促销体系日",
        "tasks": [
          "制定月度促销日历",
          "设计非打折型活动",
          "用会员权益替代随意打折"
        ]
      },
      {
        "day": 5,
        "title": "员工培训日",
        "tasks": [
          "培训连带推荐话术",
          "培训关联产品知识",
          "考核和激励设置"
        ]
      },
      {
        "day": 6,
        "title": "会员启动日",
        "tasks": [
          "建立会员体系",
          "设计入会福利",
          "引导到店客户注册"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计连带率和客单价变化",
          "评估促销效果",
          "制定下周优化方向"
        ]
      }
    ],
    "longTermAdvice": [
      "关联陈列+连带推荐是提升零售营收的基本功，连带率目标2.0以上",
      "用数据驱动定价和选品决策，少凭感觉多看数字",
      "建立系统促销日历，告别随机打折"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_88",
    "problemCode": "REVENUE_DROP",
    "industry": "服务业",
    "stage": "成长期",
    "symptomIds": [
      "sym_r01",
      "sym_r03",
      "sym_r05"
    ],
    "judgment": "你的成长期服务门店营收增长遇瓶颈，服务项目单一且客户生命周期价值低",
    "severity": 71,
    "causes": [
      {
        "name": "项目单一限制营收天花板",
        "weight": 30,
        "judgment": "客户到店消费几种服务？有没有升级和加购设计？",
        "description": "服务项目少且缺少升级设计，客单和消费频次都上不去"
      },
      {
        "name": "客户生命周期短",
        "weight": 25,
        "judgment": "客户平均消费几次后流失？LTV是多少？",
        "description": "客户生命周期短，消费1-2次就流失，LTV低"
      },
      {
        "name": "闲时产能浪费",
        "weight": 25,
        "judgment": "非高峰时段利用率多高？",
        "description": "非高峰时段大量产能闲置，错失营收增量"
      },
      {
        "name": "缺少储值锁定",
        "weight": 20,
        "judgment": "储值客户占比多少？",
        "description": "缺少储值卡锁定长期消费，客户随时可走"
      }
    ],
    "solutionIds": [
      "sol_006",
      "sol_008",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "分析各项目营收贡献和客户消费频次",
        "duration": "45分钟",
        "purpose": "诊断营收结构"
      },
      {
        "task": "设计基础→进阶→尊享三级服务阶梯",
        "duration": "1小时",
        "purpose": "延长客户价值链"
      },
      {
        "task": "制定闲时特惠方案填充产能空档",
        "duration": "30分钟",
        "purpose": "提升时段利用"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "营收结构日",
        "tasks": [
          "分析各项目营收和利润贡献",
          "计算客户平均LTV",
          "识别营收增长瓶颈"
        ]
      },
      {
        "day": 2,
        "title": "服务升级日",
        "tasks": [
          "设计三级服务阶梯",
          "制定升级内容和定价",
          "编写升级推荐话术"
        ]
      },
      {
        "day": 3,
        "title": "闲时运营日",
        "tasks": [
          "设计闲时特惠方案",
          "社群发布闲时优惠",
          "预约系统设置闲时折扣"
        ]
      },
      {
        "day": 4,
        "title": "储值体系日",
        "tasks": [
          "设计储值卡方案",
          "制定储值专属权益",
          "启动储值推广"
        ]
      },
      {
        "day": 5,
        "title": "增值服务日",
        "tasks": [
          "设计1-2个增值加购服务",
          "培训增值推荐话术",
          "设置加购激励机制"
        ]
      },
      {
        "day": 6,
        "title": "培训考核日",
        "tasks": [
          "培训升级和加购话术",
          "情景模拟演练",
          "考核和上岗认证"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计升级和加购数据",
          "分析闲时利用率变化",
          "评估储值转化效果"
        ]
      }
    ],
    "longTermAdvice": [
      "构建基础→进阶→尊享三级服务，延长客户生命周期提升LTV",
      "闲时利用率提升到70%以上，最大化产能变现",
      "储值卡是最强的营收稳定器，目标储值客户占比40%以上"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_89",
    "problemCode": "REVENUE_DROP",
    "industry": "餐饮",
    "stage": "成长期",
    "symptomIds": [
      "sym_r01",
      "sym_r03",
      "sym_r04"
    ],
    "judgment": "你的成长期餐饮门店高峰产能不足且外卖增量未释放，营收增长受限",
    "severity": 72,
    "causes": [
      {
        "name": "高峰翻台瓶颈",
        "weight": 30,
        "judgment": "午晚高峰翻台率是多少？排队流失多少？",
        "description": "高峰期翻台率遇瓶颈，排队流失客户营收上不去"
      },
      {
        "name": "外卖增量未释放",
        "weight": 25,
        "judgment": "外卖营收占比多少？有系统运营吗？",
        "description": "外卖渠道未系统运营，缺少重要的增量收入来源"
      },
      {
        "name": "套餐设计缺失",
        "weight": 25,
        "judgment": "有组合套餐提升客单价吗？",
        "description": "缺少套餐设计，客单价无法有效提升"
      },
      {
        "name": "非餐收入为零",
        "weight": 20,
        "judgment": "有零售周边产品或饮品收入吗？",
        "description": "没有开发饮品、零售周边等非餐收入来源"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_007",
      "sol_014"
    ],
    "todayTasks": [
      {
        "task": "统计高峰期翻台率和排队流失数据",
        "duration": "30分钟",
        "purpose": "诊断产能瓶颈"
      },
      {
        "task": "设计2-3个高毛利组合套餐",
        "duration": "1小时",
        "purpose": "拉升客单价"
      },
      {
        "task": "检查外卖店铺状态，制定优化方案",
        "duration": "30分钟",
        "purpose": "释放外卖增量"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "产能优化日",
        "tasks": [
          "优化出餐流程提速",
          "调整高峰排班",
          "减少翻台间隔时间"
        ]
      },
      {
        "day": 2,
        "title": "套餐上线日",
        "tasks": [
          "确定套餐定价和内容",
          "收银系统设置套餐",
          "员工推套餐话术培训"
        ]
      },
      {
        "day": 3,
        "title": "外卖优化日",
        "tasks": [
          "优化外卖菜品结构",
          "调整外卖定价和满减",
          "提升外卖评分和曝光"
        ]
      },
      {
        "day": 4,
        "title": "饮品开发日",
        "tasks": [
          "增加2-3款特色饮品",
          "饮品毛利通常70%以上",
          "设置餐+饮套餐组合"
        ]
      },
      {
        "day": 5,
        "title": "效率提升日",
        "tasks": [
          "优化后厨动线",
          "减少点餐到出餐时间",
          "提升整体服务效率"
        ]
      },
      {
        "day": 6,
        "title": "培训日",
        "tasks": [
          "培训套餐和加饮推荐话术",
          "模拟演练和考核",
          "设置连带销售激励"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计套餐销售和客单价变化",
          "分析外卖增量效果",
          "评估产能利用率"
        ]
      }
    ],
    "longTermAdvice": [
      "堂食+外卖双轮驱动，外卖营收占比目标30%以上",
      "套餐+饮品是提升客单价的双引擎，客单价提升15%目标",
      "高峰效率决定营收天花板，持续优化翻台率"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_001",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_90",
    "problemCode": "REVENUE_DROP",
    "industry": "零售",
    "stage": "老店",
    "symptomIds": [
      "sym_r01",
      "sym_r02",
      "sym_r04"
    ],
    "judgment": "你的老零售店品类老化促销疲劳，会员贡献率低且淡旺季波动剧烈",
    "severity": 74,
    "causes": [
      {
        "name": "品类结构固化",
        "weight": 30,
        "judgment": "多久没做过品类大调整了？后20%品类贡献多少营收？",
        "description": "品类结构长期固化，缺少新爆款拉动消费"
      },
      {
        "name": "促销疲劳效应",
        "weight": 25,
        "judgment": "促销越来越不灵了？客户对打折麻木了吗？",
        "description": "长期促销导致客户对折扣麻木，不促销就不买"
      },
      {
        "name": "会员体系失效",
        "weight": 25,
        "judgment": "会员消费占总营收多少？会员客单比非会员高吗？",
        "description": "会员体系形同虚设，会员与非会员消费差异不大"
      },
      {
        "name": "淡季无对策",
        "weight": 20,
        "judgment": "淡季营收比旺季低多少？有淡季经营方案吗？",
        "description": "缺少淡季专项经营方案，营收波动剧烈"
      }
    ],
    "solutionIds": [
      "sol_004",
      "sol_008",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "分析品类销售排名，标记需淘汰和需引进的",
        "duration": "45分钟",
        "purpose": "诊断品类问题"
      },
      {
        "task": "重新设计会员权益，拉开会员与非会员差异",
        "duration": "1小时",
        "purpose": "激活会员价值"
      },
      {
        "task": "制定淡季专项经营方案",
        "duration": "30分钟",
        "purpose": "平滑营收波动"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "品类调整日",
        "tasks": [
          "淘汰后20%低贡献品类",
          "规划新品类引进",
          "释放陈列和资金空间"
        ]
      },
      {
        "day": 2,
        "title": "会员重塑日",
        "tasks": [
          "重新设计会员权益体系",
          "拉开会员与非会员价差",
          "设计会员积分和等级"
        ]
      },
      {
        "day": 3,
        "title": "促销转型日",
        "tasks": [
          "减少打折型促销",
          "增加体验型和会员型活动",
          "用价值替代折扣"
        ]
      },
      {
        "day": 4,
        "title": "淡季方案日",
        "tasks": [
          "设计淡季引流活动",
          "规划淡季品类调整",
          "制定淡季成本控制方案"
        ]
      },
      {
        "day": 5,
        "title": "新品引入日",
        "tasks": [
          "引进3-5款新爆款候选",
          "小量试销追踪数据",
          "员工新品知识培训"
        ]
      },
      {
        "day": 6,
        "title": "陈列优化日",
        "tasks": [
          "按销售贡献重分配陈列面",
          "增加场景化展示",
          "优化动线增加连带"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估品类和会员调整效果",
          "分析促销转型进展",
          "制定下月经营计划"
        ]
      }
    ],
    "longTermAdvice": [
      "建立品类月度复盘机制，持续汰换保持选品活力",
      "会员体系要真正拉开差异，让会员感受到专属价值",
      "淡季要有专项方案，目标淡季营收不低于旺季的60%"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_91",
    "problemCode": "PROFIT_LOW",
    "industry": "餐饮",
    "stage": "新店",
    "symptomIds": [
      "sym_p01",
      "sym_p02",
      "sym_p04"
    ],
    "judgment": "你的新开餐饮店房租和人工占比过高，加上食材损耗大，开业即亏损",
    "severity": 76,
    "causes": [
      {
        "name": "房租占比过高",
        "weight": 30,
        "judgment": "房租占营收比多少？超过25%了吗？",
        "description": "房租压力过大，在营收未达预期时直接导致亏损"
      },
      {
        "name": "人工效率低下",
        "weight": 25,
        "judgment": "人效是多少？员工配置合理吗？",
        "description": "新店人员配置不合理，人效低人工成本占比超35%"
      },
      {
        "name": "食材损耗严重",
        "weight": 25,
        "judgment": "食材损耗率多少？有标准化备料吗？",
        "description": "缺少标准化备料和库存管理，食材损耗率高达15%以上"
      },
      {
        "name": "毛利结构不合理",
        "weight": 20,
        "judgment": "高毛利菜品占比多少？整体毛利率达标吗？",
        "description": "菜品毛利结构不合理，低毛利品占比过高"
      }
    ],
    "solutionIds": [
      "sol_010",
      "sol_011",
      "sol_021"
    ],
    "todayTasks": [
      {
        "task": "计算房租/人工/食材占营收比，找出最大漏水点",
        "duration": "30分钟",
        "purpose": "明确成本结构"
      },
      {
        "task": "制定标准化备料SOP降低食材损耗",
        "duration": "1小时",
        "purpose": "控制食材成本"
      },
      {
        "task": "调整菜品结构增加高毛利品占比",
        "duration": "45分钟",
        "purpose": "优化毛利结构"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "成本拆解日",
        "tasks": [
          "完成成本结构详细分析",
          "标记最大漏水点",
          "制定降本优先级"
        ]
      },
      {
        "day": 2,
        "title": "食材管控日",
        "tasks": [
          "制定标准化备料SOP",
          "建立食材领用和盘点制度",
          "设置损耗预警线"
        ]
      },
      {
        "day": 3,
        "title": "人力优化日",
        "tasks": [
          "优化排班减少冗余人力",
          "一岗多能交叉培训",
          "设置人效目标考核"
        ]
      },
      {
        "day": 4,
        "title": "毛利优化日",
        "tasks": [
          "调整菜品毛利结构",
          "增加高毛利品占比",
          "设计套餐提升整体毛利"
        ]
      },
      {
        "day": 5,
        "title": "采购优化日",
        "tasks": [
          "优化供应商比价",
          "集中采购降低单价",
          "建立采购审批制度"
        ]
      },
      {
        "day": 6,
        "title": "浪费治理日",
        "tasks": [
          "建立全链路减少浪费",
          "设置能源消耗标准",
          "培训全员成本意识"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算成本改善幅度",
          "分析各项占比变化",
          "制定下月降本目标"
        ]
      }
    ],
    "longTermAdvice": [
      "房租占比控制在20%以内，人工占比控制在30%以内，食材成本控制在35%以内",
      "标准化备料是控制食材损耗的关键，损耗率控制在5%以内",
      "新店前6个月是成本优化的黄金期，越早建立标准越早盈利"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_92",
    "problemCode": "PROFIT_LOW",
    "industry": "零售",
    "stage": "成长期",
    "symptomIds": [
      "sym_p01",
      "sym_p03",
      "sym_p05"
    ],
    "judgment": "你的成长期零售门店进货成本上升挤压毛利，坪效和人效偏低导致利润微薄",
    "severity": 72,
    "causes": [
      {
        "name": "进货成本上升",
        "weight": 30,
        "judgment": "进货价同比上涨多少？有找替代供应商吗？",
        "description": "进货成本持续上涨但售价未同步调整，毛利被挤压"
      },
      {
        "name": "坪效偏低",
        "weight": 25,
        "judgment": "每平米月产出多少？有优化空间吗？",
        "description": "空间利用率低，坪效低于行业平均水平"
      },
      {
        "name": "人效不高",
        "weight": 25,
        "judgment": "人均月产出多少？员工配置合理吗？",
        "description": "人员配置不合理或效率低，人效不达标"
      },
      {
        "name": "损耗和浪费",
        "weight": 20,
        "judgment": "商品损耗率多少？有盘点差异吗？",
        "description": "商品损耗、盘点差异和运营浪费侵蚀利润"
      }
    ],
    "solutionIds": [
      "sol_010",
      "sol_011",
      "sol_015"
    ],
    "todayTasks": [
      {
        "task": "分析各品类毛利率，找出毛利漏水点",
        "duration": "45分钟",
        "purpose": "诊断毛利结构"
      },
      {
        "task": "联系3家替代供应商比价",
        "duration": "1小时",
        "purpose": "降低进货成本"
      },
      {
        "task": "计算当前坪效和人效，设定提升目标",
        "duration": "30分钟",
        "purpose": "量化效率指标"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "毛利诊断日",
        "tasks": [
          "完成各品类毛利率分析",
          "标记低于均值的品类",
          "制定毛利提升方案"
        ]
      },
      {
        "day": 2,
        "title": "采购优化日",
        "tasks": [
          "完成供应商比价",
          "切换或新增供应商",
          "争取更优结算条件"
        ]
      },
      {
        "day": 3,
        "title": "坪效提升日",
        "tasks": [
          "优化陈列提升产出",
          "减少低效区域",
          "增加高产出品类面积"
        ]
      },
      {
        "day": 4,
        "title": "人效提升日",
        "tasks": [
          "优化排班减少冗余",
          "一岗多能培训",
          "设置人效考核指标"
        ]
      },
      {
        "day": 5,
        "title": "损耗治理日",
        "tasks": [
          "建立盘点制度",
          "分析损耗原因",
          "制定减损措施"
        ]
      },
      {
        "day": 6,
        "title": "定价调整日",
        "tasks": [
          "对低毛利品适当调价",
          "设计组合促销保毛利",
          "测试价格弹性"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算毛利改善幅度",
          "分析坪效人效变化",
          "制定下月利润目标"
        ]
      }
    ],
    "longTermAdvice": [
      "每季度review供应商和采购成本，持续优化供应链",
      "坪效和人效是零售利润的两大引擎，每月追踪改善",
      "损耗率控制在2%以内，建立严格的盘点和损耗管理制度"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_93",
    "problemCode": "PROFIT_LOW",
    "industry": "服务业",
    "stage": "老店",
    "symptomIds": [
      "sym_p01",
      "sym_p04",
      "sym_p05"
    ],
    "judgment": "你的老服务店人工成本占比过高，定价多年未调且闲时产能大量浪费",
    "severity": 74,
    "causes": [
      {
        "name": "人工成本占比过高",
        "weight": 30,
        "judgment": "人工占营收比多少？超过40%了吗？",
        "description": "人工成本是服务业最大支出，占比过高直接吞噬利润"
      },
      {
        "name": "定价长期未调整",
        "weight": 25,
        "judgment": "服务定价多久没调了？成本上涨后有提价吗？",
        "description": "定价多年未调整，成本上涨但售价不动，利润持续缩水"
      },
      {
        "name": "闲时产能浪费",
        "weight": 25,
        "judgment": "闲时利用率多低？有多少时间在空等？",
        "description": "非高峰时段大量产能闲置，直接影响利润率"
      },
      {
        "name": "技师效率低",
        "weight": 20,
        "judgment": "技师日均服务几单？有效率考核吗？",
        "description": "技师服务效率低，日均产出不达标"
      }
    ],
    "solutionIds": [
      "sol_010",
      "sol_011",
      "sol_015"
    ],
    "todayTasks": [
      {
        "task": "计算人工/房租/物料占营收比，找出最大成本项",
        "duration": "30分钟",
        "purpose": "明确成本结构"
      },
      {
        "task": "设计分时段定价方案提升闲时利用率",
        "duration": "1小时",
        "purpose": "提升产能变现"
      },
      {
        "task": "制定定价调整计划（分步小幅提价）",
        "duration": "30分钟",
        "purpose": "修复定价滞后"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "成本拆解日",
        "tasks": [
          "完成成本结构详细分析",
          "标记最大漏水点",
          "制定降本优先级"
        ]
      },
      {
        "day": 2,
        "title": "定价调整日",
        "tasks": [
          "设计分步提价方案",
          "先调高毛利品价格",
          "通知客户并做好解释"
        ]
      },
      {
        "day": 3,
        "title": "闲时运营日",
        "tasks": [
          "设计闲时优惠引流",
          "提升闲时利用率",
          "闲时增加体验活动"
        ]
      },
      {
        "day": 4,
        "title": "人效优化日",
        "tasks": [
          "优化排班减少闲置人力",
          "设置技师效率考核",
          "一岗多能交叉培训"
        ]
      },
      {
        "day": 5,
        "title": "流程优化日",
        "tasks": [
          "优化服务流程提效率",
          "减少非服务时间浪费",
          "设置服务时长标准"
        ]
      },
      {
        "day": 6,
        "title": "成本管控日",
        "tasks": [
          "建立成本月度review机制",
          "设置各成本项预警线",
          "培训全员成本意识"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算利润改善幅度",
          "分析各成本项变化",
          "制定下月利润目标"
        ]
      }
    ],
    "longTermAdvice": [
      "服务业人工占比控制在35%以内，通过效率和排班优化实现",
      "每半年评估一次定价，成本上涨必须传导到售价",
      "闲时利用率提升到70%以上，这是服务业利润提升的捷径"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_94",
    "problemCode": "PROFIT_LOW",
    "industry": "餐饮",
    "stage": "老店",
    "symptomIds": [
      "sym_p01",
      "sym_p03",
      "sym_p05"
    ],
    "judgment": "你的老餐饮店食材成本和房租双重上涨，利润被两头挤压至亏损边缘",
    "severity": 77,
    "causes": [
      {
        "name": "食材成本持续上涨",
        "weight": 30,
        "judgment": "食材成本占营收比多少？同比上涨多少？",
        "description": "食材价格持续上涨，但菜品售价和结构未调整"
      },
      {
        "name": "房租固定压力大",
        "weight": 25,
        "judgment": "房租占营收比多少？租约还有多久？",
        "description": "房租占比过高且每年递增，营收下滑时压力更大"
      },
      {
        "name": "浪费和损耗严重",
        "weight": 25,
        "judgment": "食材损耗率多少？后厨浪费严重吗？",
        "description": "缺少精细化成本管理，浪费和损耗侵蚀利润"
      },
      {
        "name": "毛利结构不合理",
        "weight": 20,
        "judgment": "高毛利品贡献率多少？有优化过毛利结构吗？",
        "description": "菜品毛利结构不合理，低毛利品占比过高"
      }
    ],
    "solutionIds": [
      "sol_010",
      "sol_011",
      "sol_021"
    ],
    "todayTasks": [
      {
        "task": "核算各菜品毛利率，标记低于40%的菜品",
        "duration": "45分钟",
        "purpose": "诊断毛利结构"
      },
      {
        "task": "优化3个高成本菜品的食材配比或替代",
        "duration": "1小时",
        "purpose": "降低食材成本"
      },
      {
        "task": "建立后厨损耗追踪，找出最大浪费点",
        "duration": "30分钟",
        "purpose": "控制浪费"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "成本拆解日",
        "tasks": [
          "完成成本结构详细分析",
          "标记各成本项占比和趋势",
          "制定降本优先级"
        ]
      },
      {
        "day": 2,
        "title": "食材降本日",
        "tasks": [
          "优化高成本菜品配比",
          "寻找替代食材降低成本",
          "与供应商重新谈判价格"
        ]
      },
      {
        "day": 3,
        "title": "毛利优化日",
        "tasks": [
          "调整菜品毛利结构",
          "增加高毛利品占比",
          "低毛利品提价或优化配方"
        ]
      },
      {
        "day": 4,
        "title": "损耗治理日",
        "tasks": [
          "建立标准化备料减少损耗",
          "设置损耗追踪和预警",
          "后厨浪费专项治理"
        ]
      },
      {
        "day": 5,
        "title": "定价调整日",
        "tasks": [
          "对受成本上涨影响菜品调价",
          "设计调价过渡方案",
          "用套餐组合淡化单品涨价感知"
        ]
      },
      {
        "day": 6,
        "title": "效率提升日",
        "tasks": [
          "优化人力配置降人工成本",
          "提升翻台率摊薄固定成本",
          "减少非必要支出"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "计算毛利和利润改善",
          "分析各成本项变化",
          "制定下月利润目标"
        ]
      }
    ],
    "longTermAdvice": [
      "食材成本占比控制在30-35%，超标必须调整菜品或售价",
      "每季度review供应商和采购价格，持续优化供应链",
      "建立精细化成本管控体系，每项成本都有目标值和预警线"
    ],
    "caseIds": [
      "case_004"
    ],
    "toolIds": [
      "tool_005",
      "tool_006"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_95",
    "problemCode": "CUSTOMER_LOSS",
    "industry": "餐饮",
    "stage": "成长期",
    "symptomIds": [
      "sym_c01",
      "sym_c02",
      "sym_c05"
    ],
    "judgment": "你的成长期餐饮门店复购率走低且差评处理不力，老客户流失加速",
    "severity": 73,
    "causes": [
      {
        "name": "复购率持续走低",
        "weight": 30,
        "judgment": "月复购率多少？趋势如何？",
        "description": "老客户回头频次下降，复购率逐月走低"
      },
      {
        "name": "差评处理不及时",
        "weight": 25,
        "judgment": "差评24小时内回复了吗？有改进跟进吗？",
        "description": "差评处理不及时，负面口碑扩散加速客户流失"
      },
      {
        "name": "缺少客户关怀",
        "weight": 25,
        "judgment": "有客户回访机制吗？消费后有跟进吗？",
        "description": "缺少消费后的客户关怀和回访，客户感受不到重视"
      },
      {
        "name": "会员权益无感",
        "weight": 20,
        "judgment": "会员享有什么权益？权益有吸引力吗？",
        "description": "会员权益设计缺乏吸引力，无法有效留存客户"
      }
    ],
    "solutionIds": [
      "sol_016",
      "sol_020",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "统计近3个月复购率和客户流失数据",
        "duration": "30分钟",
        "purpose": "量化流失程度"
      },
      {
        "task": "制定差评24小时回复标准",
        "duration": "30分钟",
        "purpose": "止损差评扩散"
      },
      {
        "task": "设计1个有吸引力的会员专属权益",
        "duration": "1小时",
        "purpose": "增强留存动力"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "流失诊断日",
        "tasks": [
          "分析复购率和流失趋势",
          "标记高流失风险客户",
          "识别流失主要原因"
        ]
      },
      {
        "day": 2,
        "title": "口碑修复日",
        "tasks": [
          "建立差评24h回复机制",
          "主动联系差评客户补救",
          "设计好评引导方案"
        ]
      },
      {
        "day": 3,
        "title": "会员升级日",
        "tasks": [
          "重新设计有吸引力的会员权益",
          "拉开会员与非会员差异",
          "设计会员专享活动"
        ]
      },
      {
        "day": 4,
        "title": "客户关怀日",
        "tasks": [
          "建立消费后回访机制",
          "设计客户生日和节日关怀",
          "设置流失预警和挽回"
        ]
      },
      {
        "day": 5,
        "title": "储值锁客日",
        "tasks": [
          "设计储值卡方案",
          "储值客户享受更多权益",
          "推广储值锁定长期消费"
        ]
      },
      {
        "day": 6,
        "title": "社群运营日",
        "tasks": [
          "建立门店客户社群",
          "设计群内容和活动节奏",
          "提升客户归属感"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计复购率变化",
          "分析会员和储值转化",
          "调整下月客户经营计划"
        ]
      }
    ],
    "longTermAdvice": [
      "复购率是餐饮的生命线，月复购率目标40%以上",
      "差评必须24小时内回复并改进，好评率目标95%以上",
      "储值+会员+社群三重锁定，让客户舍不得走"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_96",
    "problemCode": "CUSTOMER_LOSS",
    "industry": "零售",
    "stage": "老店",
    "symptomIds": [
      "sym_c01",
      "sym_c02",
      "sym_c04"
    ],
    "judgment": "你的老零售店老客户大量流失且转介绍率为零，客户资产持续贬值",
    "severity": 75,
    "causes": [
      {
        "name": "老客流失严重",
        "weight": 30,
        "judgment": "3个月未消费的客户占比多少？",
        "description": "大量老客户不再回头，客户基础持续萎缩"
      },
      {
        "name": "转介绍率为零",
        "weight": 25,
        "judgment": "有客户主动推荐朋友来吗？有推荐机制吗？",
        "description": "完全没有转介绍，说明客户满意度和忠诚度都不够"
      },
      {
        "name": "会员体系失效",
        "weight": 25,
        "judgment": "会员活跃度多少？会员权益有感知吗？",
        "description": "会员体系名存实亡，会员不活跃权益无感"
      },
      {
        "name": "缺少情感连接",
        "weight": 20,
        "judgment": "和客户有情感联系吗？客户对你有归属感吗？",
        "description": "纯粹交易关系，缺少情感连接，客户随时可替代"
      }
    ],
    "solutionIds": [
      "sol_016",
      "sol_020",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "筛选3个月未消费的老客户名单",
        "duration": "30分钟",
        "purpose": "识别流失客户"
      },
      {
        "task": "设计老客唤醒方案（专属优惠+新品通知）",
        "duration": "1小时",
        "purpose": "挽回流失客户"
      },
      {
        "task": "重新设计会员权益和推荐奖励",
        "duration": "1小时",
        "purpose": "重建客户关系"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "流失盘点日",
        "tasks": [
          "完成客户流失分析",
          "标记沉睡/流失/活跃客户",
          "制定分层经营策略"
        ]
      },
      {
        "day": 2,
        "title": "唤醒行动日",
        "tasks": [
          "设计唤醒优惠和话术",
          "分批联系沉睡客户",
          "设置唤醒效果追踪"
        ]
      },
      {
        "day": 3,
        "title": "会员重塑日",
        "tasks": [
          "重新设计有感知的会员权益",
          "拉开会员与非会员差异",
          "设计会员专属体验"
        ]
      },
      {
        "day": 4,
        "title": "推荐启动日",
        "tasks": [
          "设计推荐奖励方案",
          "制作推荐码和海报",
          "向活跃客户推广推荐计划"
        ]
      },
      {
        "day": 5,
        "title": "情感连接日",
        "tasks": [
          "建立客户生日/节日关怀",
          "设计客户专属活动",
          "让客户感受到被重视"
        ]
      },
      {
        "day": 6,
        "title": "社群建设日",
        "tasks": [
          "建立门店客户社群",
          "设计群内容和互动节奏",
          "培养客户归属感"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计唤醒成功率",
          "分析推荐转化数据",
          "调整下月客户经营计划"
        ]
      }
    ],
    "longTermAdvice": [
      "客户是最大的资产，老店要像经营朋友一样经营客户关系",
      "推荐率是客户忠诚度的终极指标，目标15%以上",
      "储值+会员+社群+关怀四维锁定，让客户成为品牌的粉丝"
    ],
    "caseIds": [
      "case_002"
    ],
    "toolIds": [
      "tool_002",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_97",
    "problemCode": "CUSTOMER_LOSS",
    "industry": "服务业",
    "stage": "新店",
    "symptomIds": [
      "sym_c01",
      "sym_c03",
      "sym_c05"
    ],
    "judgment": "你的新开服务门店缺少客户回访和关怀机制，首单客户大量流失无复购",
    "severity": 70,
    "causes": [
      {
        "name": "无回访机制",
        "weight": 30,
        "judgment": "客户消费后有跟进吗？有了解满意度吗？",
        "description": "缺少消费后回访，不知道客户是否满意，也无法引导复购"
      },
      {
        "name": "首单流失率高",
        "weight": 25,
        "judgment": "首单客户有多少会第二次来？",
        "description": "首单客户体验后不回头，流失率高"
      },
      {
        "name": "服务质量不稳定",
        "weight": 25,
        "judgment": "每次服务品质一致吗？有客户投诉吗？",
        "description": "新店服务品质不稳定，客户体验参差不齐"
      },
      {
        "name": "缺少留存设计",
        "weight": 20,
        "judgment": "有会员卡、储值卡或套餐卡吗？",
        "description": "缺少任何客户留存机制，消费完就走无联系"
      }
    ],
    "solutionIds": [
      "sol_016",
      "sol_020",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "设计消费后24小时回访话术和流程",
        "duration": "30分钟",
        "purpose": "建立回访机制"
      },
      {
        "task": "制定服务质量标准化SOP",
        "duration": "1小时",
        "purpose": "稳定服务品质"
      },
      {
        "task": "设计储值卡/次卡锁定客户复购",
        "duration": "1小时",
        "purpose": "建立留存机制"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "回访建设日",
        "tasks": [
          "设计回访话术和时机",
          "培训员工回访技巧",
          "建立客户满意度追踪"
        ]
      },
      {
        "day": 2,
        "title": "品质标准日",
        "tasks": [
          "制定服务标准SOP",
          "培训全员统一标准",
          "建立品质抽检机制"
        ]
      },
      {
        "day": 3,
        "title": "留存设计日",
        "tasks": [
          "设计储值卡/次卡方案",
          "制定留存权益",
          "设置首单转复购引导"
        ]
      },
      {
        "day": 4,
        "title": "会员体系日",
        "tasks": [
          "建立会员等级和权益",
          "设计升级路径",
          "会员专属服务设计"
        ]
      },
      {
        "day": 5,
        "title": "关怀机制日",
        "tasks": [
          "设计客户生日关怀",
          "消费满额感谢和回访",
          "差评快速响应机制"
        ]
      },
      {
        "day": 6,
        "title": "社群运营日",
        "tasks": [
          "建立客户社群",
          "设计群内容和福利",
          "引导客户入群"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计首单复购率",
          "分析回访和留存效果",
          "调整下周运营节奏"
        ]
      }
    ],
    "longTermAdvice": [
      "服务业的复购率决定生存，首单转复购率目标50%以上",
      "消费后24小时回访是新店留客的标配动作",
      "储值/次卡是最直接的留存工具，新店必须第一时间推出"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_003",
      "tool_005"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_98",
    "problemCode": "CUSTOMER_LOSS",
    "industry": "餐饮",
    "stage": "新店",
    "symptomIds": [
      "sym_c01",
      "sym_c03",
      "sym_c05"
    ],
    "judgment": "你的新开餐饮店缺少客户留存设计，顾客吃完就走无法形成回头习惯",
    "severity": 68,
    "causes": [
      {
        "name": "无留存机制",
        "weight": 35,
        "judgment": "有会员卡、关注有礼、加群福利吗？",
        "description": "缺少任何客户留存机制，客户消费完就失联"
      },
      {
        "name": "缺少复购理由",
        "weight": 25,
        "judgment": "客户有什么理由再来？招牌菜？特别体验？",
        "description": "没有打造出让客户想再来的理由"
      },
      {
        "name": "服务无记忆点",
        "weight": 25,
        "judgment": "客户对你的服务有印象吗？",
        "description": "服务缺乏特色和记忆点，吃完就忘"
      },
      {
        "name": "无客户触达渠道",
        "weight": 15,
        "judgment": "有客户联系方式吗？能主动联系他们吗？",
        "description": "没有建立客户触达渠道，无法主动营销"
      }
    ],
    "solutionIds": [
      "sol_016",
      "sol_020",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "设计关注有礼/加群福利引导客户留存",
        "duration": "30分钟",
        "purpose": "建立留存入口"
      },
      {
        "task": "确定1个让客户想再来的理由（招牌菜/特色服务）",
        "duration": "1小时",
        "purpose": "打造复购理由"
      },
      {
        "task": "设计储值卡方案锁定客户长期消费",
        "duration": "30分钟",
        "purpose": "锁客工具"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "留存设计日",
        "tasks": [
          "设计关注有礼/加群福利",
          "制作留存引导物料",
          "培训员工留存话术"
        ]
      },
      {
        "day": 2,
        "title": "复购理由日",
        "tasks": [
          "强化1个招牌菜或特色体验",
          "制作复购诱饵设计",
          "设置二次消费优惠"
        ]
      },
      {
        "day": 3,
        "title": "储值推出日",
        "tasks": [
          "确定储值卡方案和权益",
          "制作储值卡物料",
          "员工储值推荐话术培训"
        ]
      },
      {
        "day": 4,
        "title": "社群建设日",
        "tasks": [
          "建立客户社群",
          "设计群专属内容和福利",
          "引导到店客户入群"
        ]
      },
      {
        "day": 5,
        "title": "服务记忆日",
        "tasks": [
          "设计1个特色服务动作",
          "让客户记住你的温度",
          "服务差异化培训"
        ]
      },
      {
        "day": 6,
        "title": "回访启动日",
        "tasks": [
          "建立消费后回访机制",
          "设置3天/7天回访节点",
          "收集客户反馈并改进"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "统计留存转化率",
          "分析储值和社群数据",
          "调整下周留客策略"
        ]
      }
    ],
    "longTermAdvice": [
      "新店留客比获客更重要，每个到店客户都要引导留存",
      "招牌菜/特色体验+储值卡+社群是餐饮留客三板斧",
      "首月复购率目标30%以上，做不到就要检讨留存设计"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_005",
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_99",
    "problemCode": "STAFF_HARD",
    "industry": "餐饮",
    "stage": "成长期",
    "symptomIds": [
      "sym_h01",
      "sym_h03",
      "sym_h04"
    ],
    "judgment": "你的成长期餐饮门店员工流失率高且缺少绩效激励，团队执行力不足拖累增长",
    "severity": 72,
    "causes": [
      {
        "name": "员工流失率高",
        "weight": 30,
        "judgment": "月流失率多少？核心岗位有流失吗？",
        "description": "员工频繁流失，招聘和培训成本高，服务连续性差"
      },
      {
        "name": "缺少绩效激励",
        "weight": 25,
        "judgment": "有明确的提成和奖金方案吗？员工有动力吗？",
        "description": "缺少有效的绩效激励体系，员工做多做少一个样"
      },
      {
        "name": "培训不到位",
        "weight": 25,
        "judgment": "新员工多久能独立上岗？培训有标准吗？",
        "description": "培训不系统不标准，新员工上手慢影响服务品质"
      },
      {
        "name": "管理方式粗放",
        "weight": 20,
        "judgment": "管理靠吼还是靠制度？",
        "description": "管理方式粗放，靠人治不靠制度，团队效率低"
      }
    ],
    "solutionIds": [
      "sol_018",
      "sol_019",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "计算近3个月员工流失率和招聘成本",
        "duration": "30分钟",
        "purpose": "量化人员问题"
      },
      {
        "task": "设计绩效提成方案（营业额提成+好评奖）",
        "duration": "1小时",
        "purpose": "建立激励机制"
      },
      {
        "task": "制定新员工标准化培训手册",
        "duration": "1小时",
        "purpose": "缩短培训周期"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "人事诊断日",
        "tasks": [
          "完成流失率和成本分析",
          "分析流失原因",
          "制定留人优先级"
        ]
      },
      {
        "day": 2,
        "title": "激励设计日",
        "tasks": [
          "设计绩效提成方案",
          "设置好评和推荐奖励",
          "制定激励发放规则"
        ]
      },
      {
        "day": 3,
        "title": "培训体系日",
        "tasks": [
          "制定标准化培训手册",
          "设计培训考核标准",
          "缩短新员工上岗周期"
        ]
      },
      {
        "day": 4,
        "title": "制度规范日",
        "tasks": [
          "制定关键岗位SOP",
          "建立值班和巡检制度",
          "用制度替代人治"
        ]
      },
      {
        "day": 5,
        "title": "沟通改善日",
        "tasks": [
          "建立定期团队会议",
          "设置意见反馈渠道",
          "改善管理沟通方式"
        ]
      },
      {
        "day": 6,
        "title": "激励上线日",
        "tasks": [
          "宣布新绩效方案",
          "培训计算和兑现规则",
          "观察团队反应并调整"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估激励方案接受度",
          "分析团队氛围变化",
          "制定下月人事优化重点"
        ]
      }
    ],
    "longTermAdvice": [
      "绩效激励是餐饮团队管理的核心，让员工为自己干而不是为老板干",
      "月流失率控制在8%以内，核心岗位零容忍流失",
      "培训标准化+制度化管理，减少对个人经验的依赖"
    ],
    "caseIds": [
      "case_001"
    ],
    "toolIds": [
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  },
  {
    "_id": "path_100",
    "problemCode": "STAFF_HARD",
    "industry": "服务业",
    "stage": "新店",
    "symptomIds": [
      "sym_h01",
      "sym_h02",
      "sym_h04"
    ],
    "judgment": "你的新开服务门店招人难培训慢，员工无法独立上岗严重影响开业运营",
    "severity": 70,
    "causes": [
      {
        "name": "招人困难",
        "weight": 30,
        "judgment": "招聘渠道有几个？多久能招到合适的人？",
        "description": "服务行业招人难，新店知名度低更难吸引优秀人才"
      },
      {
        "name": "培训周期过长",
        "weight": 25,
        "judgment": "新员工多久能独立上岗？超过2周了吗？",
        "description": "培训不系统效率低，新员工长期无法独立服务"
      },
      {
        "name": "无绩效激励",
        "weight": 25,
        "judgment": "有提成和奖金方案吗？",
        "description": "缺少绩效激励，员工没有积极性"
      },
      {
        "name": "核心技师依赖",
        "weight": 20,
        "judgment": "关键服务是否依赖个别技师？",
        "description": "核心服务依赖个别技师，一旦离开服务停摆"
      }
    ],
    "solutionIds": [
      "sol_018",
      "sol_019",
      "sol_024"
    ],
    "todayTasks": [
      {
        "task": "拓展招聘渠道（58/BOSS/同行推荐/门店直招）",
        "duration": "1小时",
        "purpose": "解决招人难"
      },
      {
        "task": "制定快速培训方案（7天独立上岗目标）",
        "duration": "1小时",
        "purpose": "缩短培训周期"
      },
      {
        "task": "设计技师提成和奖金方案",
        "duration": "30分钟",
        "purpose": "建立激励机制"
      }
    ],
    "weekPlan": [
      {
        "day": 1,
        "title": "招聘攻坚日",
        "tasks": [
          "发布多渠道招聘信息",
          "联系同行推荐人才",
          "设置推荐奖励"
        ]
      },
      {
        "day": 2,
        "title": "培训体系日",
        "tasks": [
          "制定7天速成培训方案",
          "编写核心服务SOP",
          "设计培训考核认证"
        ]
      },
      {
        "day": 3,
        "title": "激励设计日",
        "tasks": [
          "设计技师提成方案",
          "设置服务和好评奖励",
          "制定激励兑现规则"
        ]
      },
      {
        "day": 4,
        "title": "备份培训日",
        "tasks": [
          "核心服务备份培训",
          "减少对单一技师依赖",
          "建立师徒制传承"
        ]
      },
      {
        "day": 5,
        "title": "团队建设日",
        "tasks": [
          "团队沟通和愿景宣导",
          "建立值班和排班制度",
          "营造积极团队氛围"
        ]
      },
      {
        "day": 6,
        "title": "制度落地日",
        "tasks": [
          "宣布绩效方案",
          "培训SOP开始执行",
          "设置每日检查机制"
        ]
      },
      {
        "day": 7,
        "title": "复盘日",
        "tasks": [
          "评估招聘进展",
          "检查培训效果",
          "调整下周人事重点"
        ]
      }
    ],
    "longTermAdvice": [
      "服务业人才是最核心的资产，招人要舍得花时间和成本",
      "7天速成培训+考核认证，让新员工快速创造价值",
      "核心服务必须有备份人员，降低对单一技师的依赖风险"
    ],
    "caseIds": [
      "case_003"
    ],
    "toolIds": [
      "tool_009"
    ],
    "priority": 8,
    "status": 1
  }
]

const solutions = [
  {
    "_id": "sol_001",
    "title": "周边3公里精准引流方案",
    "summary": "通过线上线下组合覆盖周边3公里客群，快速提升到店客流",
    "difficulty": "简单",
    "effectiveTime": "1-2周见效",
    "costRange": "500-2000元/月",
    "problemCodes": [
      "TRAFFIC_LOW",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "绘制3公里客群地图",
        "content": "在地图上标注门店位置，画出3公里范围圈，标记住宅区、写字楼、学校等客流来源点",
        "checklist": [
          "标注3公里内所有住宅小区",
          "标记写字楼和商业区",
          "记录各区域人口估算"
        ]
      },
      {
        "title": "铺设线上引流渠道",
        "content": "在大众点评、抖音来客、小红书等平台完善门店信息，上传高质量照片和介绍",
        "checklist": [
          "大众点评认领并完善信息",
          "抖音来客开通门店",
          "小红书注册并发布首条内容"
        ]
      },
      {
        "title": "设计到店引流品",
        "content": "设计一款低成本高感知的引流产品或服务，让新客户有强烈的进店理由",
        "checklist": [
          "确定引流品内容和定价",
          "制作引流品宣传物料",
          "培训员工引流品话术"
        ]
      },
      {
        "title": "执行社区覆盖",
        "content": "通过传单、社区群、公告栏等方式覆盖周边3公里住宅区",
        "checklist": [
          "印制并派发社区传单",
          "加入3个以上业主群",
          "在公告栏张贴广告"
        ]
      },
      {
        "title": "追踪效果并优化",
        "content": "统计各渠道引流效果，计算获客成本，优化渠道投入",
        "checklist": [
          "建立客流来源追踪表",
          "计算各渠道获客成本",
          "砍掉低效渠道加码高效渠道"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_002",
    "title": "会员留存与复购提升方案",
    "summary": "建立会员体系和客户经营机制，提升复购率和客户生命周期价值",
    "difficulty": "中等",
    "effectiveTime": "2-4周见效",
    "costRange": "1000-3000元/月",
    "problemCodes": [
      "CUSTOMER_LOSS",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "设计会员体系",
        "content": "设计3级会员体系（普通/银卡/金卡），明确各级别权益和升级条件",
        "checklist": [
          "确定会员等级和权益",
          "选择会员管理工具",
          "设计入会引导流程"
        ]
      },
      {
        "title": "建立客户触点",
        "content": "确保100%到店客户留下联系方式，建立微信/电话留存机制",
        "checklist": [
          "设计加微信话术和福利",
          "培训员工留存触点执行",
          "设置留存率考核"
        ]
      },
      {
        "title": "制定回访计划",
        "content": "建立服务后24h/3天/7天/30天回访节奏，保持客户连接",
        "checklist": [
          "制定回访时间表",
          "准备回访话术模板",
          "设置回访提醒"
        ]
      },
      {
        "title": "设计复购激励",
        "content": "设计二次消费优惠、积分兑换、消费里程碑奖励等复购激励",
        "checklist": [
          "设计二次消费优惠",
          "制定积分兑换规则",
          "设置消费里程碑奖励"
        ]
      },
      {
        "title": "启动口碑裂变",
        "content": "设计老客推荐奖励机制，让满意客户帮你带来新客户",
        "checklist": [
          "制定推荐奖励规则",
          "制作推荐码和海报",
          "向活跃会员发布推荐计划"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_003",
    "title": "招牌爆品打造方案",
    "summary": "从选品到包装到传播，系统打造让客户专程而来的招牌爆品",
    "difficulty": "中等",
    "effectiveTime": "2-3周见效",
    "costRange": "500-1500元",
    "problemCodes": [
      "TRAFFIC_LOW",
      "PRODUCT_SLOW",
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "确定爆品方向",
        "content": "分析现有产品数据和客户反馈，确定最具潜力的爆品方向",
        "checklist": [
          "分析产品销量和毛利数据",
          "收集客户好评最多的产品",
          "确定1个爆品打造方向"
        ]
      },
      {
        "title": "优化爆品体验",
        "content": "从配方/选品、出品/包装、命名/故事三个维度优化爆品",
        "checklist": [
          "优化爆品核心品质",
          "设计专属包装或器皿",
          "创造爆品专属故事"
        ]
      },
      {
        "title": "设计爆品传播",
        "content": "让爆品自带传播力：颜值高、有仪式感、可拍照分享",
        "checklist": [
          "确保爆品拍照效果出色",
          "增加仪式感环节",
          "设计分享引导话术"
        ]
      },
      {
        "title": "爆品营销推广",
        "content": "集中资源推广爆品，在所有渠道突出爆品位置",
        "checklist": [
          "线上渠道突出爆品",
          "门店C位陈列爆品",
          "设计爆品专属活动"
        ]
      },
      {
        "title": "数据追踪优化",
        "content": "追踪爆品销量和口碑数据，持续优化爆品体验",
        "checklist": [
          "统计爆品销量变化",
          "收集爆品客户反馈",
          "每月优化1次爆品体验"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_004",
    "title": "菜单/产品结构优化方案",
    "summary": "科学优化产品结构，淘汰低效品、打造利润款、设计组合套餐",
    "difficulty": "中等",
    "effectiveTime": "1-2周见效",
    "costRange": "0-500元",
    "problemCodes": [
      "REVENUE_DROP",
      "PRODUCT_SLOW",
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "产品矩阵分析",
        "content": "将所有产品按销量和毛利分为明星/现金牛/问题/瘦狗四类",
        "checklist": [
          "统计各产品销量和毛利",
          "完成产品矩阵分类",
          "标记淘汰和优化候选"
        ]
      },
      {
        "title": "淘汰低效产品",
        "content": "果断淘汰销量低且毛利低的瘦狗产品，精简产品线",
        "checklist": [
          "淘汰月销排名后20%产品",
          "精简备料和库存",
          "集中资源到核心产品"
        ]
      },
      {
        "title": "强化利润产品",
        "content": "增加高毛利产品的曝光和推广，提升利润款销量占比",
        "checklist": [
          "标记TOP5高毛利产品",
          "增加利润款陈列面积",
          "培训利润款推荐话术"
        ]
      },
      {
        "title": "设计组合套餐",
        "content": "设计引流品+利润品的组合套餐，提升客单价和毛利",
        "checklist": [
          "设计2-3个组合套餐",
          "确保套餐毛利合理",
          "设置价格锚点突出套餐价值"
        ]
      },
      {
        "title": "重新排版展示",
        "content": "优化菜单/陈列排版，引导客户优先选择高毛利和套餐",
        "checklist": [
          "高毛利品放在显眼位置",
          "套餐设置醒目标识",
          "优化价格呈现方式"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_005",
    "title": "门店动线与陈列优化方案",
    "summary": "优化门店动线和陈列布局，提升驻足率和连带销售",
    "difficulty": "简单",
    "effectiveTime": "3-7天见效",
    "costRange": "0-1000元",
    "problemCodes": [
      "TRAFFIC_LOW",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "绘制现有动线图",
        "content": "记录客户从进门到离店的行走路线，标记停留点和流失点",
        "checklist": [
          "观察并记录10位客户动线",
          "标记停留热点和冷区",
          "识别动线瓶颈点"
        ]
      },
      {
        "title": "优化入口区域",
        "content": "让入口有吸引力且引导客户自然深入，避免一览无余",
        "checklist": [
          "入口设置吸引物",
          "增加视觉引导",
          "避免入口直通出口"
        ]
      },
      {
        "title": "优化陈列布局",
        "content": "按关联性和场景化布置陈列，增加连带销售机会",
        "checklist": [
          "设置关联陈列区",
          "增加场景化展示",
          "优化商品间距和层次"
        ]
      },
      {
        "title": "设置冲动消费点",
        "content": "在收银区和等待区设置小件/低客单商品，增加冲动消费",
        "checklist": [
          "收银台设置小件商品",
          "等待区放置推荐品",
          "设置限时特价标识"
        ]
      },
      {
        "title": "持续测试优化",
        "content": "每周微调陈列，A/B测试不同布局的效果",
        "checklist": [
          "记录调整前后数据对比",
          "保留有效布局",
          "持续优化动线"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_006",
    "title": "服务升级与差异化方案",
    "summary": "设计分层服务体系和差异化服务体验，提升客户感知价值和复购",
    "difficulty": "较难",
    "effectiveTime": "2-4周见效",
    "costRange": "1000-3000元/月",
    "problemCodes": [
      "PRODUCT_SLOW",
      "CUSTOMER_LOSS",
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "服务分层设计",
        "content": "设计基础/进阶/尊享三级服务体系，满足不同客户需求",
        "checklist": [
          "确定三级服务内容和定价",
          "确保每级有明确价值差异",
          "中间级设置最有吸引力"
        ]
      },
      {
        "title": "打造差异化仪式",
        "content": "设计1-2个让客户记住的独特服务仪式或环节",
        "checklist": [
          "确定差异化仪式内容",
          "培训仪式执行标准",
          "确保每次执行一致"
        ]
      },
      {
        "title": "增值服务设计",
        "content": "在不大幅增加成本的前提下增加2-3个增值服务点",
        "checklist": [
          "列出可低成本提供的增值服务",
          "设计增值服务话术",
          "培训员工推荐技巧"
        ]
      },
      {
        "title": "服务流程SOP化",
        "content": "将服务流程标准化，确保体验一致性",
        "checklist": [
          "制定核心服务SOP",
          "设置关键检查点",
          "培训全员执行标准"
        ]
      },
      {
        "title": "效果追踪优化",
        "content": "追踪服务升级后的客户满意度和复购变化",
        "checklist": [
          "设置满意度调查",
          "追踪复购率变化",
          "每月优化1个服务点"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_007",
    "title": "外卖与线上渠道拓展方案",
    "summary": "系统搭建外卖和线上销售渠道，开拓增量营收来源",
    "difficulty": "中等",
    "effectiveTime": "1-2周上线",
    "costRange": "2000-5000元/月",
    "problemCodes": [
      "REVENUE_DROP",
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "渠道选择与开通",
        "content": "选择适合的线上渠道（美团外卖/饿了么/抖音团购/小程序）并开通",
        "checklist": [
          "评估各渠道适配度",
          "开通2-3个线上渠道",
          "完成店铺信息设置"
        ]
      },
      {
        "title": "线上产品适配",
        "content": "根据线上渠道特点调整产品结构和定价",
        "checklist": [
          "选择适合线上的产品",
          "设计线上专属定价",
          "设置满减和配送策略"
        ]
      },
      {
        "title": "店铺装修优化",
        "content": "优化线上店铺视觉和内容，提升转化率",
        "checklist": [
          "上传高质量产品图片",
          "优化产品描述文案",
          "设置店铺活动标签"
        ]
      },
      {
        "title": "运营推广启动",
        "content": "制定线上推广策略，获取平台流量支持",
        "checklist": [
          "参与平台活动",
          "设置推广预算",
          "优化搜索排名"
        ]
      },
      {
        "title": "数据驱动优化",
        "content": "分析线上渠道数据，持续优化产品和运营策略",
        "checklist": [
          "建立线上数据追踪",
          "分析转化率和客单价",
          "优化低效产品和策略"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_008",
    "title": "品类优化与新品引进方案",
    "summary": "基于数据优化品类结构，引进新品测试，淘汰滞销品",
    "difficulty": "中等",
    "effectiveTime": "2-4周见效",
    "costRange": "1000-3000元/月",
    "problemCodes": [
      "REVENUE_DROP",
      "PRODUCT_SLOW",
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "品类数据分析",
        "content": "全面分析各品类销售、毛利、周转数据，找出优化空间",
        "checklist": [
          "完成品类销售排名",
          "分析毛利和周转数据",
          "标记优化和淘汰品类"
        ]
      },
      {
        "title": "淘汰低效品类",
        "content": "果断淘汰销量低、毛利低、周转慢的品类",
        "checklist": [
          "确定淘汰清单",
          "制定清仓方案",
          "释放资金和空间"
        ]
      },
      {
        "title": "引进新品测试",
        "content": "引进3-5款新品进行市场测试，设置测试标准",
        "checklist": [
          "选择3-5款候选新品",
          "设置新品测试区域",
          "制定2周动销考核标准"
        ]
      },
      {
        "title": "优化品类结构",
        "content": "调整引流/利润/形象品类占比，确保结构健康",
        "checklist": [
          "引流品占20%",
          "利润品占60%",
          "形象品占20%"
        ]
      },
      {
        "title": "建立迭代机制",
        "content": "建立月度品类复盘和季度迭代机制",
        "checklist": [
          "制定月度品类复盘日历",
          "设置品类健康度指标",
          "持续优化品类结构"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_009",
    "title": "成本精细化管控方案",
    "summary": "建立精细化成本管理体系，从采购到消耗全链路降本",
    "difficulty": "中等",
    "effectiveTime": "1-2周见效",
    "costRange": "0-500元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "成本结构审计",
        "content": "详细拆解所有成本项，标记占比和可控性",
        "checklist": [
          "列出所有成本项及占比",
          "标记可控和不可控成本",
          "制定各项目标占比"
        ]
      },
      {
        "title": "采购优化",
        "content": "拓展供应商、比价谈判、优化采购频率和批量",
        "checklist": [
          "联系3家以上供应商比价",
          "与核心供应商谈优惠",
          "优化采购批次和频率"
        ]
      },
      {
        "title": "损耗治理",
        "content": "建立损耗记录和管控机制，减少浪费",
        "checklist": [
          "设置损耗记录表",
          "分析损耗原因TOP3",
          "制定损耗降低目标"
        ]
      },
      {
        "title": "能耗优化",
        "content": "优化水电等能耗使用，减少不必要的浪费",
        "checklist": [
          "检查设备能耗效率",
          "设置用电用水规范",
          "安装节能设备"
        ]
      },
      {
        "title": "成本监控机制",
        "content": "建立成本日报/周报和预警机制",
        "checklist": [
          "设置成本日报表",
          "设置超支预警线",
          "每周成本复盘"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_010",
    "title": "定价策略优化方案",
    "summary": "基于市场和毛利目标科学定价，提升整体毛利水平",
    "difficulty": "中等",
    "effectiveTime": "1-2周见效",
    "costRange": "0元",
    "problemCodes": [
      "PROFIT_LOW",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "现有定价审计",
        "content": "计算所有产品毛利，标记定价不合理的产品",
        "checklist": [
          "计算各产品毛利率",
          "标记低于目标毛利的产品",
          "分析竞品定价水平"
        ]
      },
      {
        "title": "制定定价策略",
        "content": "按产品角色制定不同定价策略：引流品走量、利润品走价",
        "checklist": [
          "引流品定价：低毛利高感知",
          "利润品定价：高毛利合理价",
          "形象品定价：高定价树标杆"
        ]
      },
      {
        "title": "价格锚点设计",
        "content": "利用价格锚点心理引导客户选择目标产品",
        "checklist": [
          "设置高价格锚点产品",
          "目标产品居中定价",
          "确保目标产品看起来最划算"
        ]
      },
      {
        "title": "分步调价执行",
        "content": "先调低敏感度产品，逐步调整核心产品定价",
        "checklist": [
          "首批调整低敏感度产品",
          "观察客户反应",
          "逐步调整核心产品"
        ]
      },
      {
        "title": "价值感提升",
        "content": "在调价同时提升产品价值感，让客户觉得物超所值",
        "checklist": [
          "优化出品/包装",
          "增加附加值描述",
          "培训价值传达话术"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_011",
    "title": "员工培训与激励体系方案",
    "summary": "建立标准化培训和绩效激励体系，提升团队执行力和稳定性",
    "difficulty": "中等",
    "effectiveTime": "2-4周见效",
    "costRange": "500-2000元/月",
    "problemCodes": [
      "STAFF_HARD",
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "培训体系搭建",
        "content": "制定各岗位标准化培训计划，缩短新人上手周期",
        "checklist": [
          "编写核心岗位SOP",
          "制定7天培训计划",
          "设计培训考核标准"
        ]
      },
      {
        "title": "绩效体系设计",
        "content": "设计量化的绩效考核指标和激励方案",
        "checklist": [
          "确定3-5个核心考核指标",
          "设计绩效评分和奖励",
          "制定绩效面谈机制"
        ]
      },
      {
        "title": "薪酬结构优化",
        "content": "调整为底薪+提成+奖金的结构，激发员工积极性",
        "checklist": [
          "设计底薪+提成+奖金比例",
          "制定超额奖励方案",
          "确保优秀员工收入明显更高"
        ]
      },
      {
        "title": "师徒带教机制",
        "content": "建立老带新的师徒制度，加速新人融入",
        "checklist": [
          "指定带教师傅",
          "制定带教奖励",
          "设置新人考核节点"
        ]
      },
      {
        "title": "团队文化建设",
        "content": "通过定期活动、意见反馈、关怀激励营造正向团队氛围",
        "checklist": [
          "制定月度团建计划",
          "建立意见反馈渠道",
          "设计员工关怀方案"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_012",
    "title": "线上内容营销启动方案",
    "summary": "从0搭建线上内容运营体系，建立线上品牌存在感",
    "difficulty": "简单",
    "effectiveTime": "1-2周见效",
    "costRange": "0-1000元/月",
    "problemCodes": [
      "TRAFFIC_LOW",
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "平台开通与设置",
        "content": "在大众点评、抖音、小红书等平台开通门店账号",
        "checklist": [
          "大众点评认领门店",
          "抖音来客开通",
          "小红书注册账号"
        ]
      },
      {
        "title": "内容定位与规划",
        "content": "确定内容方向和风格，制定月度内容日历",
        "checklist": [
          "确定3个核心内容方向",
          "制定月度内容计划",
          "准备首批内容素材"
        ]
      },
      {
        "title": "首批内容制作",
        "content": "拍摄门店、产品、环境等内容素材并发布",
        "checklist": [
          "拍摄10张高质量照片",
          "录制3条短视频",
          "发布首批5条内容"
        ]
      },
      {
        "title": "发布节奏建立",
        "content": "建立稳定的内容发布节奏，保持线上活跃度",
        "checklist": [
          "每周至少3条内容发布",
          "固定发布时间",
          "内容形式多样化"
        ]
      },
      {
        "title": "互动与优化",
        "content": "积极回复评论和私信，根据数据优化内容策略",
        "checklist": [
          "24小时内回复所有互动",
          "分析内容数据表现",
          "优化高互动内容方向"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_013",
    "title": "差异化品牌定位方案",
    "summary": "找到独特差异化定位，打造让客户记住的品牌标签",
    "difficulty": "较难",
    "effectiveTime": "2-4周见效",
    "costRange": "1000-5000元",
    "problemCodes": [
      "COMPETITION",
      "MARKETING_HARD",
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "竞品与市场分析",
        "content": "分析竞品定位和市场空白，找到差异化机会",
        "checklist": [
          "分析5家竞品定位",
          "找出市场空白点",
          "确定差异化方向"
        ]
      },
      {
        "title": "差异化定位确定",
        "content": "在细分品类或独特体验上建立差异化定位",
        "checklist": [
          "确定1个核心差异点",
          "设计差异化口号",
          "制定品类占位策略"
        ]
      },
      {
        "title": "品牌视觉升级",
        "content": "围绕差异化定位升级品牌视觉和门店形象",
        "checklist": [
          "设计差异化视觉元素",
          "优化门头和店内装饰",
          "更新宣传物料风格"
        ]
      },
      {
        "title": "差异化体验落地",
        "content": "将差异化定位转化为客户可感知的独特体验",
        "checklist": [
          "设计1-2个差异体验点",
          "培训差异化服务执行",
          "确保每次体验一致"
        ]
      },
      {
        "title": "差异化传播",
        "content": "在所有触点强化差异化信息，建立客户认知",
        "checklist": [
          "线上内容突出差异化",
          "门店物料强化差异化",
          "口碑引导差异化好评"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_014",
    "title": "储值卡与会员锁客方案",
    "summary": "设计储值卡和长期会员套餐，锁定客户长期消费",
    "difficulty": "中等",
    "effectiveTime": "1-2周见效",
    "costRange": "500-1000元",
    "problemCodes": [
      "REVENUE_DROP",
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "储值方案设计",
        "content": "设计多档位储值方案，确保每档都有吸引力",
        "checklist": [
          "设计3个储值档位",
          "每档赠送金额递增",
          "最高档设置超值权益"
        ]
      },
      {
        "title": "会员套餐设计",
        "content": "设计月卡/季卡/年卡等长期消费套餐",
        "checklist": [
          "确定套餐内容和服务量",
          "定价低于单次消费总额",
          "设置有效期限制"
        ]
      },
      {
        "title": "储值引导执行",
        "content": "培训员工储值推荐话术，设置储值激励",
        "checklist": [
          "编写储值推荐话术",
          "设置员工储值提成",
          "设计储值首推活动"
        ]
      },
      {
        "title": "会员权益兑现",
        "content": "确保储值和会员权益按时兑现，建立信任",
        "checklist": [
          "设置权益兑现提醒",
          "定期推送会员专属活动",
          "保持会员活跃度"
        ]
      },
      {
        "title": "续费与升级",
        "content": "在到期前主动联系续费，引导会员升级",
        "checklist": [
          "设置到期提醒",
          "设计续费优惠",
          "制定升级激励方案"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_015",
    "title": "绩效考核与提成方案",
    "summary": "建立销售导向的绩效体系，激发员工积极性提升业绩",
    "difficulty": "中等",
    "effectiveTime": "1-2周见效",
    "costRange": "0-1000元/月",
    "problemCodes": [
      "STAFF_HARD",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "考核指标确定",
        "content": "确定3-5个核心绩效考核指标",
        "checklist": [
          "销售额/营业额指标",
          "服务质量指标",
          "会员转化指标"
        ]
      },
      {
        "title": "提成方案设计",
        "content": "设计底薪+提成的薪酬结构，让优秀员工收入更高",
        "checklist": [
          "确定底薪和提成比例",
          "设置阶梯提成标准",
          "制定超额奖励方案"
        ]
      },
      {
        "title": "考核流程制定",
        "content": "制定月度考核流程，包括目标设定、过程追踪、结果评估",
        "checklist": [
          "月初设定个人目标",
          "每周追踪进度",
          "月末绩效面谈"
        ]
      },
      {
        "title": "方案公布与培训",
        "content": "向全体员工公布方案，确保理解并认同",
        "checklist": [
          "召开方案说明会",
          "解答员工疑问",
          "设置首月过渡期"
        ]
      },
      {
        "title": "持续优化",
        "content": "根据执行效果持续优化考核指标和提成比例",
        "checklist": [
          "每月评估方案效果",
          "调整不合理指标",
          "保持激励有效性"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_016",
    "title": "低成本营销活动策划方案",
    "summary": "用创意代替预算，策划高传播低成本的营销活动",
    "difficulty": "简单",
    "effectiveTime": "1周见效",
    "costRange": "0-500元/次",
    "problemCodes": [
      "MARKETING_HARD",
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "活动创意选择",
        "content": "选择适合门店的低成本高传播活动形式",
        "checklist": [
          "选择1个活动形式",
          "评估活动传播潜力",
          "确保执行难度可控"
        ]
      },
      {
        "title": "活动方案制定",
        "content": "制定活动详细方案，包括时间、规则、物料、推广",
        "checklist": [
          "确定活动时间和周期",
          "制定活动规则和奖励",
          "准备活动物料"
        ]
      },
      {
        "title": "线上预热",
        "content": "在所有线上渠道发布活动预热，制造期待感",
        "checklist": [
          "提前3天发布预热内容",
          "社群同步活动信息",
          "设置活动提醒"
        ]
      },
      {
        "title": "线下执行",
        "content": "门店布置活动氛围，培训员工活动话术",
        "checklist": [
          "布置活动氛围物料",
          "培训活动执行话术",
          "设置活动追踪表"
        ]
      },
      {
        "title": "活动复盘",
        "content": "统计活动数据，总结经验，优化下次活动",
        "checklist": [
          "统计参与人数和转化",
          "计算活动ROI",
          "记录经验教训"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_017",
    "title": "经营模式升级方案",
    "summary": "引入数字化工具和新的经营方式，提升经营效率和竞争力",
    "difficulty": "较难",
    "effectiveTime": "2-4周见效",
    "costRange": "1000-5000元",
    "problemCodes": [
      "PROFIT_LOW",
      "COMPETITION",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "现状诊断",
        "content": "分析现有经营模式的痛点和升级空间",
        "checklist": [
          "梳理现有经营流程",
          "识别效率瓶颈",
          "确定升级优先级"
        ]
      },
      {
        "title": "数字化工具引入",
        "content": "选择适合的数字化工具提升经营效率",
        "checklist": [
          "引入收银/管理系统",
          "开通线上预约/点单",
          "建立客户管理系统"
        ]
      },
      {
        "title": "流程再造",
        "content": "围绕数字化工具重新设计核心业务流程",
        "checklist": [
          "重构客户服务流程",
          "优化进销存管理",
          "建立数据驱动决策"
        ]
      },
      {
        "title": "新模式试运行",
        "content": "先在部分业务线试运行新模式，验证效果",
        "checklist": [
          "选择1个业务线试点",
          "设置试运行周期",
          "收集效果数据"
        ]
      },
      {
        "title": "全面推广",
        "content": "验证有效后全面推广新模式",
        "checklist": [
          "培训全员新模式操作",
          "全面切换新系统",
          "持续优化磨合"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_018",
    "title": "团队激活与人才发展方案",
    "summary": "激活老员工、培养新人才，建立可持续的团队发展体系",
    "difficulty": "较难",
    "effectiveTime": "2-4周见效",
    "costRange": "1000-3000元/月",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "人才盘点",
        "content": "评估现有团队结构和人才状态，识别激活和培养对象",
        "checklist": [
          "完成团队能力评估",
          "标记核心人才和风险",
          "制定人才发展计划"
        ]
      },
      {
        "title": "老员工激活",
        "content": "通过新角色、新挑战、新激励激活倦怠的老员工",
        "checklist": [
          "赋予新职责或新项目",
          "设计专项激励方案",
          "增加成长和表现机会"
        ]
      },
      {
        "title": "新人培养加速",
        "content": "建立标准化培训和师徒带教，加速新人成长",
        "checklist": [
          "制定30天速成计划",
          "设计师徒带教机制",
          "设置阶段性考核"
        ]
      },
      {
        "title": "晋升通道建设",
        "content": "设计多通道晋升路径，让员工看到发展空间",
        "checklist": [
          "设计专业/管理双通道",
          "制定各级别标准和待遇",
          "建立晋升评审机制"
        ]
      },
      {
        "title": "合伙人机制",
        "content": "为核心人才设计合伙人或分红机制，深度绑定",
        "checklist": [
          "设计合伙人准入条件",
          "制定分红方案",
          "签订合伙人协议"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_019",
    "title": "产品迭代与创新方案",
    "summary": "建立产品迭代机制，持续推出新品保持市场竞争力",
    "difficulty": "中等",
    "effectiveTime": "2-3周见效",
    "costRange": "500-2000元/次",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "产品生命周期盘点",
        "content": "分析各产品生命周期阶段，确定迭代优先级",
        "checklist": [
          "标记导入期/成长期/成熟期/衰退期",
          "制定衰退品退出计划",
          "确定新品开发优先级"
        ]
      },
      {
        "title": "市场趋势调研",
        "content": "调研当前市场趋势和客户需求变化",
        "checklist": [
          "分析行业热门趋势",
          "收集客户需求反馈",
          "确定创新方向"
        ]
      },
      {
        "title": "新品研发测试",
        "content": "研发1-2款新品，内部测试和老客户试吃/试用",
        "checklist": [
          "研发新品样品",
          "内部品鉴筛选",
          "邀请老客户试吃/试用"
        ]
      },
      {
        "title": "新品上市推广",
        "content": "设计新品上市活动，线上线下同步推广",
        "checklist": [
          "确定新品定价和定位",
          "设计上市推广活动",
          "线上线下同步发布"
        ]
      },
      {
        "title": "迭代机制固化",
        "content": "建立季度产品迭代日历，形成持续创新节奏",
        "checklist": [
          "制定季度迭代计划",
          "设置产品复盘日历",
          "建立新品研发SOP"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_020",
    "title": "客户全生命周期经营方案",
    "summary": "建立从获客到留存到裂变的完整客户经营闭环",
    "difficulty": "较难",
    "effectiveTime": "3-4周见效",
    "costRange": "1000-3000元/月",
    "problemCodes": [
      "CUSTOMER_LOSS",
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "客户旅程梳理",
        "content": "梳理客户从认知到忠诚的完整旅程，识别优化点",
        "checklist": [
          "绘制客户旅程地图",
          "标记各环节流失率",
          "确定关键优化点"
        ]
      },
      {
        "title": "获客环节优化",
        "content": "优化首次接触和到店转化，提升新客获取效率",
        "checklist": [
          "优化线上到店转化路径",
          "设计新客到店诱饵",
          "设置首单体验保障"
        ]
      },
      {
        "title": "激活环节优化",
        "content": "优化首次消费后的回访和二次消费引导",
        "checklist": [
          "设计24h回访机制",
          "制定二次消费优惠",
          "建立7天内回店引导"
        ]
      },
      {
        "title": "留存环节优化",
        "content": "建立会员体系和长期消费绑定机制",
        "checklist": [
          "设计储值/长期套餐",
          "制定会员专属权益",
          "设置消费里程碑奖励"
        ]
      },
      {
        "title": "裂变环节优化",
        "content": "建立推荐奖励和口碑传播机制",
        "checklist": [
          "设计推荐奖励方案",
          "制作分享工具和素材",
          "启动口碑裂变活动"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_021",
    "title": "产品结构优化方案",
    "summary": "通过数据分析重新梳理产品角色和结构，提升整体动销和毛利水平",
    "difficulty": "中等",
    "effectiveTime": "2-3周见效",
    "costRange": "0-500元",
    "problemCodes": [
      "PRODUCT_SLOW",
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "产品全盘审计",
        "content": "统计所有产品的销量、毛利、复购率数据，按引流款/利润款/形象款/淘汰款分类",
        "checklist": [
          "完成全产品销量毛利排名",
          "计算各产品复购率",
          "按角色分类标注"
        ]
      },
      {
        "title": "结构重新设计",
        "content": "设计合理的产品角色配比：引流款20%、利润款50%、形象款10%、填位款20%",
        "checklist": [
          "确定各角色产品清单",
          "调整产品定价策略",
          "设计产品组合和套餐"
        ]
      },
      {
        "title": "末位淘汰执行",
        "content": "淘汰贡献率最低的10-20%产品，释放资源给核心品和新品",
        "checklist": [
          "制定淘汰清单和时间表",
          "执行淘汰和清仓",
          "释放陈列和备料空间"
        ]
      },
      {
        "title": "效果追踪优化",
        "content": "追踪结构调整后的动销和毛利变化，持续优化",
        "checklist": [
          "设置周度追踪指标",
          "分析各角色产品表现",
          "微调结构和定价"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_022",
    "title": "爆款打造方案",
    "summary": "从选品到推广系统性打造爆款产品，带动整体销售和品牌认知",
    "difficulty": "中等",
    "effectiveTime": "2-4周见效",
    "costRange": "500-2000元",
    "problemCodes": [
      "PRODUCT_SLOW",
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "爆款候选筛选",
        "content": "根据数据和市场趋势筛选2-3个爆款候选产品，评估打造可行性",
        "checklist": [
          "分析销量增长潜力品",
          "评估供应链支持能力",
          "确定爆款打造优先级"
        ]
      },
      {
        "title": "爆款产品打磨",
        "content": "优化爆款候选的品质、定价、呈现，确保有记忆点和传播力",
        "checklist": [
          "优化产品品质和口味",
          "设计最优定价策略",
          "打造独特呈现和故事"
        ]
      },
      {
        "title": "爆款推广引爆",
        "content": "集中资源推广爆款，线上+线下+口碑多渠道引爆",
        "checklist": [
          "线上发布爆款内容",
          "设计爆款体验活动",
          "引导顾客好评和分享"
        ]
      },
      {
        "title": "爆款生命周期管理",
        "content": "追踪爆款数据，在衰退前培育新爆款，保持持续增长",
        "checklist": [
          "设置爆款数据看板",
          "监测爆款生命周期阶段",
          "提前培育下代爆款"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_023",
    "title": "限时促销策略方案",
    "summary": "用有主题有节奏的限时促销替代随机打折，提升促销效果同时保护品牌价值",
    "difficulty": "简单",
    "effectiveTime": "1周见效",
    "costRange": "0-1000元",
    "problemCodes": [
      "MARKETING_HARD",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "促销日历规划",
        "content": "制定月度促销日历，每次促销都有明确主题、目标和力度",
        "checklist": [
          "规划月度促销节奏",
          "确定每次促销主题",
          "设置促销力度和预算"
        ]
      },
      {
        "title": "促销方案设计",
        "content": "设计多样化的促销形式：限时/限量/主题/会员专属，不局限于打折",
        "checklist": [
          "设计3种以上促销形式",
          "每次促销设置明确目标",
          "制作促销物料和话术"
        ]
      },
      {
        "title": "促销执行追踪",
        "content": "执行促销活动并实时追踪效果数据，及时调整",
        "checklist": [
          "按时启动促销活动",
          "追踪实时销售数据",
          "分析促销ROI"
        ]
      },
      {
        "title": "促销复盘优化",
        "content": "每次促销后复盘效果，积累经验优化下次方案",
        "checklist": [
          "完成促销效果复盘",
          "记录经验和改进点",
          "优化下次促销方案"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_024",
    "title": "会员体系搭建方案",
    "summary": "从零搭建或升级会员体系，用权益和储值锁定客户长期消费",
    "difficulty": "较难",
    "effectiveTime": "3-4周见效",
    "costRange": "500-3000元/月",
    "problemCodes": [
      "CUSTOMER_LOSS",
      "COMPETITION",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "会员体系设计",
        "content": "设计会员等级、权益和升级规则，拉开会员与非会员差异",
        "checklist": [
          "设计3-4个会员等级",
          "确定各级专属权益",
          "设置升级和保级规则"
        ]
      },
      {
        "title": "储值卡方案",
        "content": "设计储值卡方案和权益，用储值锁定客户长期消费",
        "checklist": [
          "确定储值档位和赠送比例",
          "设计储值专属权益",
          "制定储值推广话术"
        ]
      },
      {
        "title": "会员运营机制",
        "content": "建立会员激活、关怀和挽回机制，持续提升会员活跃度",
        "checklist": [
          "设计新会员激活流程",
          "设置会员定期关怀",
          "建立沉睡会员挽回机制"
        ]
      },
      {
        "title": "数据追踪优化",
        "content": "追踪会员数据指标，持续优化会员体系和运营",
        "checklist": [
          "设置会员核心指标看板",
          "分析会员消费行为",
          "优化权益和运营策略"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_025",
    "title": "竞争差异化突围方案",
    "summary": "找到并强化差异化优势，用非价格竞争手段在竞品包围中突围",
    "difficulty": "较难",
    "effectiveTime": "3-4周见效",
    "costRange": "1000-5000元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "竞争格局分析",
        "content": "全面分析竞品优劣势，找到差异化机会和自身竞争优势",
        "checklist": [
          "分析3-5家核心竞品",
          "识别竞品弱点和空白",
          "确定差异化方向"
        ]
      },
      {
        "title": "差异化定位设计",
        "content": "设计独特的差异化定位和价值主张，让客户有选择你的理由",
        "checklist": [
          "确定差异化核心主张",
          "设计差异化体验方案",
          "将差异化融入所有触点"
        ]
      },
      {
        "title": "竞争壁垒构建",
        "content": "建立客户锁定和竞品难以模仿的壁垒，保护市场份额",
        "checklist": [
          "强化会员储值锁客",
          "打造独家产品或服务",
          "建立口碑和信任壁垒"
        ]
      },
      {
        "title": "持续竞争监控",
        "content": "建立竞品监控机制，定期调整竞争策略保持领先",
        "checklist": [
          "设置月度竞品review",
          "追踪竞品策略变化",
          "及时调整应对方案"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_026",
    "title": "社群营销运营方案",
    "summary": "建立和运营门店客户社群，实现零成本持续触达和转化",
    "difficulty": "中等",
    "effectiveTime": "2-3周见效",
    "costRange": "0-500元/月",
    "problemCodes": [
      "MARKETING_HARD",
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "社群搭建",
        "content": "建立门店客户社群，设计入群诱饵和首批种子用户引入",
        "checklist": [
          "创建微信客户群",
          "设计入群专属福利",
          "引导首批50人入群"
        ]
      },
      {
        "title": "内容节奏设计",
        "content": "设计社群内容发布节奏：每日互动+每周活动+每月福利",
        "checklist": [
          "制定内容日历",
          "设计每日互动话题",
          "规划每周群活动"
        ]
      },
      {
        "title": "社群活跃运营",
        "content": "持续运营提升群活跃度，防止变成死群",
        "checklist": [
          "每日发布互动内容",
          "定期群活动和福利",
          "培养群KOC和氛围"
        ]
      },
      {
        "title": "社群转化追踪",
        "content": "追踪社群到店转化和营收贡献，优化运营策略",
        "checklist": [
          "统计群转化率和贡献",
          "分析高效内容和活动",
          "优化运营节奏和内容"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_027",
    "title": "本地生活平台运营方案",
    "summary": "系统运营大众点评、抖音来客、小红书等本地生活平台，获取线上流量到店转化",
    "difficulty": "中等",
    "effectiveTime": "2-3周见效",
    "costRange": "0-2000元/月",
    "problemCodes": [
      "MARKETING_HARD",
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "平台基础铺设",
        "content": "在主流本地生活平台完善门店信息，建立线上阵地",
        "checklist": [
          "认领大众点评门店",
          "开通抖音来客",
          "注册小红书账号"
        ]
      },
      {
        "title": "内容运营启动",
        "content": "制定内容发布日历，持续产出种草内容吸引线上流量",
        "checklist": [
          "制定内容发布日历",
          "拍摄高质量素材",
          "每周至少3条内容"
        ]
      },
      {
        "title": "口碑运营管理",
        "content": "主动管理线上评价，引导好评、及时回复差评",
        "checklist": [
          "建立好评引导机制",
          "差评24h内回复",
          "设计好评激励方案"
        ]
      },
      {
        "title": "投放和活动",
        "content": "适时投放本地广告和参与平台活动，放大线上曝光",
        "checklist": [
          "设置小额投放测试ROI",
          "参与平台官方活动",
          "优化投放策略"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_028",
    "title": "产品迭代升级方案",
    "summary": "建立产品持续迭代机制，根据数据和客户反馈不断优化升级产品",
    "difficulty": "中等",
    "effectiveTime": "2-4周见效",
    "costRange": "500-2000元",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "迭代机制建立",
        "content": "建立月度产品review和迭代节奏，让产品持续进化",
        "checklist": [
          "设置月度产品review日",
          "建立客户反馈收集渠道",
          "制定迭代优先级规则"
        ]
      },
      {
        "title": "数据驱动决策",
        "content": "用销量、毛利、复购率、客户反馈数据驱动产品决策",
        "checklist": [
          "建立产品数据看板",
          "设置核心指标阈值",
          "用数据做迭代决策"
        ]
      },
      {
        "title": "小步快跑迭代",
        "content": "每次小幅度改进快速上线验证，持续积累效果",
        "checklist": [
          "确定本次迭代内容",
          "快速上线测试",
          "收集数据验证效果"
        ]
      },
      {
        "title": "新品孵化流程",
        "content": "建立新品从构思到上线到评估的标准流程",
        "checklist": [
          "设计新品孵化流程",
          "小量试销验证",
          "数据好则正式引进"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_029",
    "title": "促销活动组合拳方案",
    "summary": "设计多种促销形式组合使用，形成引流-转化-复购的完整促销链条",
    "difficulty": "中等",
    "effectiveTime": "1-2周见效",
    "costRange": "500-3000元",
    "problemCodes": [
      "MARKETING_HARD",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "促销组合设计",
        "content": "设计引流型+转化型+复购型三种促销组合，形成完整链路",
        "checklist": [
          "设计引流型促销（体验价/首单礼）",
          "设计转化型促销（限时/套餐）",
          "设计复购型促销（会员日/储值赠）"
        ]
      },
      {
        "title": "促销节奏排期",
        "content": "将促销组合排入月度日历，形成有节奏的促销波次",
        "checklist": [
          "制定月度促销日历",
          "设置促销波次和间隔",
          "避免促销疲劳"
        ]
      },
      {
        "title": "促销物料准备",
        "content": "制作所有促销所需的物料、话术和系统设置",
        "checklist": [
          "制作促销宣传物料",
          "培训员工促销话术",
          "收银/预约系统设置"
        ]
      },
      {
        "title": "执行和复盘",
        "content": "执行促销活动并复盘效果，优化下次方案",
        "checklist": [
          "按计划执行促销",
          "追踪实时数据",
          "复盘ROI和改进点"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_030",
    "title": "竞品分析与应对方案",
    "summary": "系统分析竞品策略和动态，制定针对性竞争应对方案",
    "difficulty": "中等",
    "effectiveTime": "1-2周见效",
    "costRange": "0-500元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "竞品全面调研",
        "content": "实地走访和线上调研核心竞品，全面了解其策略",
        "checklist": [
          "走访3-5家核心竞品",
          "记录其产品/价格/活动/服务",
          "分析其优势和弱点"
        ]
      },
      {
        "title": "竞争策略制定",
        "content": "根据竞品分析制定差异化竞争策略，避免正面硬刚",
        "checklist": [
          "确定差异化竞争方向",
          "设计非价格竞争手段",
          "制定客户锁定方案"
        ]
      },
      {
        "title": "应对方案准备",
        "content": "针对竞品可能的价格战、模仿等行为准备应对预案",
        "checklist": [
          "准备价格战应对预案",
          "准备竞品模仿应对方案",
          "建立快速反应机制"
        ]
      },
      {
        "title": "持续监控调整",
        "content": "建立竞品监控机制，持续追踪竞品动态并及时调整",
        "checklist": [
          "设置月度竞品走访",
          "追踪竞品线上动态",
          "定期调整竞争策略"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_031",
    "title": "社区团购引流术",
    "summary": "借助社区团购模式低成本获取周边居民精准客流",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-300元",
    "problemCodes": [
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "选品定价",
        "content": "选择1-2款高频刚需产品作为团购引流品，定价低于市场价10%-20%，不求利润只求引流到店。比如生鲜店选鸡蛋、粮油店选大米。注意引流品必须是刚需高频品，不能选冷门品。",
        "checklist": [
          "确定1-2款团购引流品",
          "核算成本确保不亏太多",
          "设定团购价低于周边10%以上"
        ]
      },
      {
        "title": "社区群铺设",
        "content": "联系周边3-5个小区的业主群群主或物业，发布团购信息。可给群主一定佣金或免费品作为回报。也可自己建小区专属团购群，入群即享团购价。",
        "checklist": [
          "联系3-5个小区业主群",
          "与群主谈好合作方式",
          "准备团购图文素材"
        ]
      },
      {
        "title": "到店核销设计",
        "content": "团购产品必须到店自提，到店时引导顾客加微信、浏览其他商品。在门店设置团购自提专区，放置热门商品和当期促销信息，实现交叉销售。",
        "checklist": [
          "设置到店自提专区",
          "准备加微信引导话术",
          "摆放交叉促销商品"
        ]
      },
      {
        "title": "复购转化跟进",
        "content": "团购客户到店后3天内微信推送专属复购券，7天后推送门店活动，逐步将团购客转化为日常消费客。持续在群内发布每日特价和限时抢购维持活跃。",
        "checklist": [
          "设置3天复购券推送",
          "7天后推送门店活动",
          "维护团购群日更内容"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_032",
    "title": "异业联盟引流法",
    "summary": "与周边非竞争商家互换客流，零成本共享客源池",
    "difficulty": "简单",
    "effectiveTime": "5-10天",
    "costRange": "0-200元",
    "problemCodes": [
      "TRAFFIC_LOW",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "筛选联盟伙伴",
        "content": "在门店1公里范围内筛选3-5家目标客群重叠但非竞争的商家，比如美甲店+奶茶店、花店+蛋糕店。要求对方客流量尚可、老板配合意愿强。",
        "checklist": [
          "列出周边5家候选商家",
          "确认客群重叠但非竞争",
          "逐一拜访确认合作意向"
        ]
      },
      {
        "title": "设计互推方案",
        "content": "设计双向引流方案：互相放置对方优惠券/体验卡、互相推荐客户、联合做活动。关键是双方投入对等、获益均衡，避免一方单方面获利。",
        "checklist": [
          "设计双方互换的优惠券",
          "约定互相推荐的提成",
          "确认双方投入基本对等"
        ]
      },
      {
        "title": "物料制作铺设",
        "content": "制作联盟商家的互推物料，在各自门店摆放。包括易拉宝、优惠券架、对方品牌展示卡。物料设计要美观且信息清晰，突出专属优惠。",
        "checklist": [
          "设计互推优惠券/体验卡",
          "制作易拉宝或展示卡",
          "在各自门店显眼位置摆放"
        ]
      },
      {
        "title": "效果追踪优化",
        "content": "建立引流效果追踪机制，记录每家联盟商家带来的到店客数和消费额。每月评估联盟效果，淘汰无效联盟，拓展新的联盟伙伴。",
        "checklist": [
          "建立联盟引流登记表",
          "每周统计各联盟引流效果",
          "月度评估并优化联盟组合"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_033",
    "title": "门前引流氛围营造法",
    "summary": "通过门店外摆、氛围装饰和互动装置吸引路人进店",
    "difficulty": "简单",
    "effectiveTime": "1-3天",
    "costRange": "100-500元",
    "problemCodes": [
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "门头吸引力诊断",
        "content": "站在马路对面看自己的门头，3秒内能否判断卖什么、有什么特色？如果看不出来就需要优化。门头信息三要素：品类名+核心卖点+吸引力符号（如爆款价、人气第一）。",
        "checklist": [
          "站在对面测试3秒识别度",
          "检查品类名是否清晰",
          "添加核心卖点或吸引力符号"
        ]
      },
      {
        "title": "外摆氛围布置",
        "content": "在门口设置外摆区域，摆放产品样品、体验道具或趣味装置。餐饮店可摆菜品模型+试吃台，服装店可摆当季爆款+镜子，水果店可摆切试台。让路人可以零门槛互动。",
        "checklist": [
          "设计外摆区域布局",
          "准备互动/体验道具",
          "确保外摆不影响通行"
        ]
      },
      {
        "title": "动态引流元素",
        "content": "增加动态元素吸引注意力：滚动LED屏显示当日特价、门口播放轻快音乐、定时叫卖或互动小游戏。动态比静态吸引力强5倍，哪怕是小喇叭循环播放也有明显效果。",
        "checklist": [
          "设置LED屏或活动海报",
          "配置背景音乐",
          "安排员工定时互动引流"
        ]
      },
      {
        "title": "时段流量匹配",
        "content": "分析门前人流高峰时段，在高峰期集中投入引流资源。如早高峰派发试吃、午休时段播放音乐、晚间亮化灯光。非高峰时段可缩减投入，聚焦高效时段。",
        "checklist": [
          "统计门前人流高峰时段",
          "高峰期安排引流活动",
          "非高峰期调整引流节奏"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_034",
    "title": "抖音同城引流实战法",
    "summary": "用短视频+同城流量获取周边3公里精准到店客流",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-500元",
    "problemCodes": [
      "TRAFFIC_LOW",
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "账号基础搭建",
        "content": "注册抖音企业号，完善门店地址、营业时间、联系方式，开通团购功能。账号名称格式：品牌名+品类+地址（如“张姐包子铺·中关村“），让同城用户搜索时容易找到。",
        "checklist": [
          "注册抖音企业号",
          "完善门店地址和联系方式",
          "开通团购/来客功能"
        ]
      },
      {
        "title": "爆款内容制作",
        "content": "拍摄3类视频：制作过程展示（视觉冲击）、顾客真实反应（口碑证言）、老板日常分享（人设信任）。每条视频带上同城定位和话题标签，视频时长控制在15-30秒。",
        "checklist": [
          "拍摄3条不同类型视频",
          "每条带同城定位标签",
          "视频时长15-30秒"
        ]
      },
      {
        "title": "同城流量获取",
        "content": "每条视频发布时添加门店POI定位，参与同城话题挑战。每天发布1-2条，坚持2周算法会打上同城标签。适当投放DOU+同城100元测试，观察到店转化。",
        "checklist": [
          "每条视频添加门店定位",
          "参与同城话题挑战",
          "小额投放DOU+测试效果"
        ]
      },
      {
        "title": "到店转化闭环",
        "content": "视频评论区置顶门店地址和优惠信息，私信自动回复引导到店。设置抖音专属到店券（如“抖音粉丝到店送XX”），追踪抖音渠道到店人数。",
        "checklist": [
          "评论区置顶门店信息",
          "设置私信自动回复",
          "创建抖音专属到店券"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_035",
    "title": "停车场驻点引流法",
    "summary": "在周边停车场设点精准触达有消费能力的车主客流",
    "difficulty": "简单",
    "effectiveTime": "3-5天",
    "costRange": "100-300元",
    "problemCodes": [
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "停车场筛选",
        "content": "调研门店2公里内的商业停车场和小区停车场，优先选择停车量大、车主消费力强的点位。与停车场管理方沟通合作方式，可支付少量场地费或交换福利。",
        "checklist": [
          "调研周边3-5个停车场",
          "评估各停车场车主画像",
          "与管理方谈妥合作方式"
        ]
      },
      {
        "title": "引流物料设计",
        "content": "设计车窗夹页或停车券背面的广告，内容包含：门店名+品类+专属车主优惠（如“凭此券到店享8折“）+导航二维码。设计要简洁醒目，优惠力度要足够吸引。",
        "checklist": [
          "设计车窗夹页物料",
          "设置车主专属优惠",
          "印制导航二维码"
        ]
      },
      {
        "title": "精准投放执行",
        "content": "选择周五下午和周末上午等高消费时段，在停车场出入口派发或放置引流物料。也可与停车场合作，在停车小票背面印刷门店广告，覆盖面更广。",
        "checklist": [
          "选择高消费时段投放",
          "培训派发人员话术",
          "尝试停车小票广告合作"
        ]
      },
      {
        "title": "效果追踪迭代",
        "content": "追踪车主券的到店核销率，计算引流成本。根据数据优化投放时段和优惠力度，效果好的停车场加大投入，效果差的及时更换。",
        "checklist": [
          "统计车主券核销率",
          "计算单个引流成本",
          "优化投放策略和时段"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_036",
    "title": "宝妈社群裂变引流",
    "summary": "以宝妈群体为种子用户，通过社群裂变获取家庭消费客流",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "宝妈需求洞察",
        "content": "分析门店产品/服务与宝妈需求的重叠点。如生鲜店主打儿童食材、烘焙店做亲子DIY、童装店做搭配指南。找到宝妈最关心的1-2个痛点作为引流切入点。",
        "checklist": [
          "分析宝妈与门店需求交集",
          "确定1-2个宝妈痛点切入点",
          "设计对应的引流价值点"
        ]
      },
      {
        "title": "种子宝妈招募",
        "content": "通过到店宝妈客户、周边幼儿园家长群、小区业主群招募首批20-30位种子宝妈。给种子宝妈专属福利（如VIP折扣、免费体验），换取她们拉人入群。",
        "checklist": [
          "招募20-30位种子宝妈",
          "设计种子宝妈专属福利",
          "约定拉人入群奖励"
        ]
      },
      {
        "title": "裂变活动设计",
        "content": "设计宝妈专属裂变活动：邀请3位宝妈入群送XX、宝妈拼团享特价、带娃到店送伴手礼。裂变门槛要低，奖励要即时，让宝妈有动力主动分享。",
        "checklist": [
          "设计邀请入群奖励",
          "设计宝妈拼团活动",
          "准备带娃到店伴手礼"
        ]
      },
      {
        "title": "社群持续运营",
        "content": "每日在群内发布1条实用内容（育儿技巧、食材挑选等），每周1次群内专属优惠，每月1次线下亲子活动。保持群活跃度，避免变成纯广告群。",
        "checklist": [
          "制定社群内容日历",
          "每周1次群专属优惠",
          "策划月度亲子活动"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_037",
    "title": "地推精准获客法",
    "summary": "通过系统化地推在目标客群聚集地精准获取新客",
    "difficulty": "简单",
    "effectiveTime": "3-5天",
    "costRange": "100-500元",
    "problemCodes": [
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "地推点位规划",
        "content": "根据目标客群画像选择3-5个地推点位：写字楼（午餐时段）、小区门口（下班时段）、学校门口（放学时段）。每个点位测算人流量和目标客群占比，优先选择转化潜力高的点位。",
        "checklist": [
          "选择3-5个地推点位",
          "测算各点位人流量",
          "确定各点位最佳时段"
        ]
      },
      {
        "title": "引流诱饵设计",
        "content": "设计有吸引力的引流诱饵：体验装/试用装（低成本高感知价值）、超值体验券（限首次到店）、免费服务（如皮肤测试、身材量测）。诱饵成本控制在5元以内，感知价值20元以上。",
        "checklist": [
          "设计引流诱饵方案",
          "核算诱饵成本<5元/份",
          "确保感知价值>20元"
        ]
      },
      {
        "title": "话术和物料准备",
        "content": "准备15秒地推话术：打招呼+亮身份+给福利+引到店。如“您好，XX店新开业送您一份XX，就在前面50米，凭这个免费领“。准备小卡片或传单，印有门店信息和专属优惠码。",
        "checklist": [
          "编写15秒地推话术",
          "印制引流小卡片",
          "培训地推人员话术"
        ]
      },
      {
        "title": "执行与数据追踪",
        "content": "按计划执行地推，记录每个点位的派发量和到店转化率。重点追踪：加微信率、到店核销率、到店消费额。根据数据调整点位、时段和话术，持续优化。",
        "checklist": [
          "按计划执行地推",
          "记录派发量和加微率",
          "追踪到店核销和消费"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_038",
    "title": "微信朋友圈广告引流",
    "summary": "利用微信朋友圈本地广告精准触达周边3公里潜在客户",
    "difficulty": "中等",
    "effectiveTime": "3-7天",
    "costRange": "300-1000元",
    "problemCodes": [
      "TRAFFIC_LOW",
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "广告账户搭建",
        "content": "在微信公众平台创建广告账户，选择“推广门店“目标。设置定向：地理位置选门店周边3公里，人群标签选与门店品类相关的兴趣标签（如餐饮选“美食爱好者“）。日预算设100-200元测试。",
        "checklist": [
          "创建微信广告账户",
          "设置3公里地理定向",
          "设置相关兴趣标签"
        ]
      },
      {
        "title": "广告素材制作",
        "content": "制作朋友圈广告素材：3-6张高质量门店/产品图片+简洁文案。文案公式：痛点+解决方案+限时福利+行动指令。如“附近的朋友看过来！XX新品上市，限时到店享5折，点击领券→”。",
        "checklist": [
          "拍摄3-6张高质量素材",
          "编写痛点+福利型文案",
          "添加行动按钮引导"
        ]
      },
      {
        "title": "优惠卡券配置",
        "content": "在广告中嵌入微信卡券，用户点击即可领取到店优惠券。券面设计要醒目，优惠力度要有吸引力（至少7折或满减20元以上），设置有效期7-14天制造紧迫感。",
        "checklist": [
          "创建微信卡券",
          "设置有吸引力的优惠力度",
          "设置7-14天有效期"
        ]
      },
      {
        "title": "投放优化迭代",
        "content": "首日投放后查看数据：曝光量、点击率、领券率、核销率。点击率低于1%优化素材，领券率低优化优惠力度，核销率低增加到店引导。3天一迭代，逐步降低获客成本。",
        "checklist": [
          "每日查看投放数据",
          "3天一次优化迭代",
          "追踪到店核销ROI"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_039",
    "title": "学校门口定点引流法",
    "summary": "在学校门口设点触达家长群体，带动家庭消费到店",
    "difficulty": "简单",
    "effectiveTime": "3-5天",
    "costRange": "0-200元",
    "problemCodes": [
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "学校点位选择",
        "content": "筛选门店1公里内的中小学和幼儿园，优先选择学生数量多、家长消费力强的学校。调研放学时段（通常15:30-17:00），估算家长等候人数。",
        "checklist": [
          "列出周边3所学校",
          "确认放学时段和家长量",
          "选择最优1-2所学校"
        ]
      },
      {
        "title": "家长需求匹配",
        "content": "分析等候家长的需求：接送等待无聊→可推体验/休闲类；孩子放学饿了→可推食品/零食类；家长关心孩子→可推教育/健康类。找到门店产品与家长需求的最短路径。",
        "checklist": [
          "分析家长等候痛点",
          "匹配门店产品与需求",
          "设计对应的引流方案"
        ]
      },
      {
        "title": "引流方案执行",
        "content": "在放学时段于学校门口设置小型体验台，提供免费试吃/试用/小礼物。派发门店体验券（如“家长专属到店礼“），同时加微信推送每日家长福利。保持亲和力，避免商业感太强。",
        "checklist": [
          "准备体验台和试用品",
          "设计家长专属体验券",
          "培训人员亲和力话术"
        ]
      },
      {
        "title": "家长群持续运营",
        "content": "加到微信的家长拉入专属福利群，每天放学时段推送“今日家长特惠“，周末推送亲子到店活动。群内定期做限时秒杀，培养家长到店消费习惯。",
        "checklist": [
          "建立家长专属福利群",
          "设置每日家长特惠推送",
          "策划周末亲子到店活动"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_040",
    "title": "快递站合作引流法",
    "summary": "与菜鸟驿站等快递站合作，借助取件流量获取周边客流",
    "difficulty": "简单",
    "effectiveTime": "5-7天",
    "costRange": "0-200元",
    "problemCodes": [
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "快递站合作谈判",
        "content": "拜访门店周边500米内的菜鸟驿站、丰巢柜点或快递代收点。提出合作方案：在取件处放置门店优惠券，每核销一张给驿站1-2元佣金。对驿站而言是零成本增收，极易谈成。",
        "checklist": [
          "拜访周边2-3家快递站",
          "提出佣金合作方案",
          "确认合作细节和佣金标准"
        ]
      },
      {
        "title": "专属优惠券设计",
        "content": "设计快递取件专属优惠：凭取件码到店享XX优惠。优惠力度要比普通新客优惠更大，因为取件者就在附近，到店门槛低。券面设计要醒目，印上门店导航二维码。",
        "checklist": [
          "设计取件专属优惠券",
          "设置比常规更大的优惠",
          "印制导航二维码"
        ]
      },
      {
        "title": "物料铺设执行",
        "content": "在快递站取件台、货架旁、取件提醒短信中植入门店优惠信息。也可在快递站门口摆放门店小型展架，配合“取完快递顺路来“的引导语。",
        "checklist": [
          "在取件台放置优惠券",
          "在货架旁放置展架",
          "协商短信植入优惠信息"
        ]
      },
      {
        "title": "数据追踪优化",
        "content": "追踪快递站渠道的到店核销率，计算每个快递站带来的客流量。效果好的加大投入（增加优惠券投放量），效果差的调整优惠力度或更换快递站。",
        "checklist": [
          "统计快递站渠道核销率",
          "计算各站点引流效果",
          "优化合作策略"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_041",
    "title": "客单价提升组合策略",
    "summary": "通过套餐设计、连带推荐和满减阶梯系统提升客单价",
    "difficulty": "中等",
    "effectiveTime": "3-7天",
    "costRange": "0-300元",
    "problemCodes": [
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "客单价基线分析",
        "content": "调取近3个月销售数据，统计平均客单价和客单价分布。找出：低客单客户占比、高客单客户购买组合、价格敏感区间。设定目标：客单价提升15%-20%。",
        "checklist": [
          "统计当前平均客单价",
          "分析客单价分布结构",
          "设定提升目标15%-20%"
        ]
      },
      {
        "title": "套餐组合设计",
        "content": "设计3档套餐：入门套餐（客单价+20%）、黄金套餐（客单价+50%）、尊享套餐（客单价+100%）。每个套餐内产品要有互补性和搭配感，价格比单买优惠10%-15%。",
        "checklist": [
          "设计3档价位套餐",
          "确保套餐内产品互补",
          "套餐价比单买优惠10%以上"
        ]
      },
      {
        "title": "连带推荐话术",
        "content": "编写各品类的连带推荐话术库，培训员工主动推荐。话术公式：确认需求+推荐搭配+说明优惠。如“您选了这个，搭配XX一起口感更好，套餐价还省15元“。",
        "checklist": [
          "编写连带推荐话术库",
          "培训员工推荐技巧",
          "设置推荐成功奖励"
        ]
      },
      {
        "title": "满减阶梯设置",
        "content": "设置3级满减阶梯：满X减Y1、满2X减Y2、满3X减Y3。每级门槛略高于当前客单价分布的峰值，引导客户多买一级。满减标识要醒目张贴。",
        "checklist": [
          "设计3级满减阶梯",
          "每级门槛高于客单价峰值",
          "醒目张贴满减标识"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_042",
    "title": "闲时营收激活法",
    "summary": "通过闲时专属优惠和活动，填补低峰时段营收空白",
    "difficulty": "简单",
    "effectiveTime": "3-5天",
    "costRange": "0-200元",
    "problemCodes": [
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "闲时识别定位",
        "content": "统计每日各时段营收，识别出2-3个闲时时段。餐饮店常见闲时：14:00-17:00下午茶时段；零售店常见闲时：工作日上午。闲时营收通常只占全天的10%-15%，是最大提升空间。",
        "checklist": [
          "统计每日各时段营收",
          "识别2-3个闲时时段",
          "计算闲时营收占比"
        ]
      },
      {
        "title": "闲时专属产品",
        "content": "为闲时开发专属产品线：餐饮做下午茶套餐、零售做上午特惠组合、服务做午间速效套餐。专属产品要成本低、毛利可、有吸引力，且不与高峰期主力产品冲突。",
        "checklist": [
          "设计闲时专属产品线",
          "确保成本低毛利可",
          "与高峰产品不冲突"
        ]
      },
      {
        "title": "闲时优惠机制",
        "content": "设置闲时专属优惠：闲时到店享X折、闲时套餐半价、闲时买一送一等。优惠力度要足够大，让原本不会来的客人愿意专程在闲时到店。在门口和线上明确标注闲时优惠时段。",
        "checklist": [
          "设计闲时专属优惠力度",
          "确保优惠有足够吸引力",
          "标注闲时优惠时段"
        ]
      },
      {
        "title": "闲时客群定向",
        "content": "针对闲时可能到店的客群做定向推广：自由职业者、退休老人、全职宝妈。通过社群、朋友圈定向推送闲时福利，培养闲时到店习惯。",
        "checklist": [
          "识别闲时目标客群",
          "社群定向推送闲时福利",
          "培养闲时到店习惯"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_043",
    "title": "储值锁客增收法",
    "summary": "设计多档储值方案锁定客户长期消费，一次性提升营收",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-500元",
    "problemCodes": [
      "REVENUE_DROP",
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "储值档位设计",
        "content": "设计3-4档储值方案：入门档（充值200送30）、进阶档（充值500送100）、尊享档（充值1000送250）、顶配档（充值2000送600）。每档赠送比例递增，激励客户选择高档位。",
        "checklist": [
          "设计3-4档储值方案",
          "赠送比例随档位递增",
          "确保高档位性价比最诱人"
        ]
      },
      {
        "title": "储值权益叠加",
        "content": "除充值赠送外，叠加储值专属权益：储值客户享会员价、生日双倍积分、新品优先体验、专属服务通道。权益要真实可感知，让储值客户有明显的身份优越感。",
        "checklist": [
          "设计储值专属权益3项以上",
          "确保权益真实可感知",
          "制作储值权益对比表"
        ]
      },
      {
        "title": "储值推广话术",
        "content": "编写储值推荐话术：结账时“您今天消费XX元，充值XX元的话这单免费还剩XX元“。话术要在客户消费体验最好的时刻（结账时）自然提出，不生硬推销。",
        "checklist": [
          "编写结账储值推荐话术",
          "培训员工自然推荐技巧",
          "设置储值推荐成功奖励"
        ]
      },
      {
        "title": "储值客户维护",
        "content": "储值客户是高价值客户，需重点维护。每月1次专属活动邀请、消费余额不足时推送充值提醒、储值到期前1个月提醒。防止储值客户流失，持续贡献营收。",
        "checklist": [
          "设置月度储值客户活动",
          "余额不足推送充值提醒",
          "到期前1个月提醒续充"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_044",
    "title": "外卖增量营收法",
    "summary": "系统入驻外卖平台并优化运营，开辟线上营收增量渠道",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-1000元",
    "problemCodes": [
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "平台选择入驻",
        "content": "根据品类选择1-2个主流外卖平台入驻（美团/饿了么/抖音外卖）。准备资质材料完成入驻，拍摄高质量菜品图，设计线上菜单和包装。新店首月利用平台流量扶持期全力冲单。",
        "checklist": [
          "选择1-2个外卖平台",
          "准备资质完成入驻",
          "拍摄高质量产品图"
        ]
      },
      {
        "title": "线上菜单优化",
        "content": "线上菜单不同于堂食，需专门设计：设置引流款（低价走量）、利润款（核心毛利）、套餐款（提客单价）。菜品命名加修饰词提升价值感（如“秘制“ “手作“ “招牌“）。",
        "checklist": [
          "设置引流款/利润款/套餐款",
          "优化菜品命名增加价值感",
          "设计3-5款线上专属套餐"
        ]
      },
      {
        "title": "好评运营管理",
        "content": "外卖好评率直接影响排名和流量。随餐附赠小卡片引导好评（好评截图返现2-3元），差评24小时内回复处理。保持评分4.5分以上才能获得平台流量倾斜。",
        "checklist": [
          "设计好评引导卡片",
          "设置好评返现机制",
          "差评24h内处理回复"
        ]
      },
      {
        "title": "利润率管控",
        "content": "外卖平台抽成20%-25%，必须管控利润率：调整线上定价（比堂食高10%-15%）、优化包装成本、选择高毛利菜品主推。每周核算外卖利润率，低于15%需调整。",
        "checklist": [
          "线上定价比堂食高10%-15%",
          "优化包装降低成本",
          "每周核算外卖利润率"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_045",
    "title": "老客户激活增收法",
    "summary": "唤醒沉睡老客户回店消费，低成本快速提升营收",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-200元",
    "problemCodes": [
      "REVENUE_DROP",
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "沉睡客户识别",
        "content": "从会员系统或微信好友中筛选出3个月以上未到店的沉睡客户。按消费历史排序，优先激活历史消费额TOP30%的高价值客户。预计可激活20%-30%。",
        "checklist": [
          "筛选3个月未到店客户",
          "按历史消费额排序",
          "标记TOP30%高价值客户"
        ]
      },
      {
        "title": "回归诱饵设计",
        "content": "为沉睡客户设计专属回归礼：高价值客户送高感知价值回归礼（如免费服务/大额券），普通客户送限时超值优惠。诱饵要超出常规新客优惠，让老客户感受到被重视。",
        "checklist": [
          "设计分层回归诱饵",
          "高价值客户送高感知礼",
          "确保回归礼超新客优惠"
        ]
      },
      {
        "title": "激活触达执行",
        "content": "通过微信一对一私聊（非群发）触达沉睡客户，话术要真诚：“XX姐好久不见，准备了专属回归礼给您，这周来就能领“。配合朋友圈定点推送回归活动。",
        "checklist": [
          "编写一对一激活话术",
          "逐一私聊高价值客户",
          "朋友圈定点推送回归活动"
        ]
      },
      {
        "title": "回店体验升级",
        "content": "老客户回店时给予超出预期的体验：员工叫出名字、赠送专属小礼、介绍近期新变化。让回归客户感受到“回来真好“，而非“不过如此“。回店后7天内推送专属复购券锁定。",
        "checklist": [
          "培训员工识别回归客户",
          "准备专属回归体验",
          "7天内推送复购券"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_046",
    "title": "私域直播带货法",
    "summary": "在微信视频号开设私域直播，将粉丝转化为即时消费",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-500元",
    "problemCodes": [
      "REVENUE_DROP",
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "直播基础设施",
        "content": "注册微信视频号，绑定门店公众号/企业微信。准备直播设备：手机支架、补光灯、收音麦（总投入200-500元）。选定固定直播时段，建议晚8-9点流量高峰。",
        "checklist": [
          "注册微信视频号",
          "购置基础直播设备",
          "确定固定直播时段"
        ]
      },
      {
        "title": "直播内容策划",
        "content": "设计直播内容框架：开场5分钟福利预热→20分钟产品展示/制作过程→10分钟限时秒杀→5分钟下期预告。每场准备3-5款主推品，其中1款超低价秒杀引流。",
        "checklist": [
          "设计直播内容框架",
          "准备3-5款主推品",
          "设计1款秒杀引流品"
        ]
      },
      {
        "title": "私域流量导入",
        "content": "直播前1天在微信群和朋友圈预告，设置预约提醒。直播中通过群分享链接拉人，员工转发直播间。私域直播核心是粉丝信任，不需要大流量，100人在线就能产生可观销售。",
        "checklist": [
          "直播前1天群内预告",
          "设置直播预约提醒",
          "直播中群分享拉人"
        ]
      },
      {
        "title": "直播转化优化",
        "content": "直播间设置专属优惠：直播价低于日常价、限时限量制造紧迫感。展示下单量增加信任（“已经有XX人下单了“）。每场直播后复盘数据：观看人数、下单转化率、客单价。",
        "checklist": [
          "设置直播专属优惠",
          "展示实时下单量",
          "每场复盘核心数据"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_047",
    "title": "节日营销增收方案",
    "summary": "系统规划全年节日营销日历，借势节日消费浪潮提升营收",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "200-1000元",
    "problemCodes": [
      "REVENUE_DROP",
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "节日营销日历",
        "content": "制作全年节日营销日历，标注每个节日的营销窗口期。重点把握5大节点：春节、情人节、母亲节、中秋、双十一。每个节点提前2周启动预热，1周冲刺，节日当天引爆。",
        "checklist": [
          "制作全年节日营销日历",
          "标注5大重点节点",
          "规划每个节点时间节奏"
        ]
      },
      {
        "title": "节日产品开发",
        "content": "为每个节日开发1-2款限定产品/套餐：情人节双人套餐、母亲节感恩礼盒、中秋限定口味。节日产品要有仪式感和限量性，可溢价20%-30%。",
        "checklist": [
          "为5大节点设计限定产品",
          "产品需有仪式感和限量性",
          "设置节日溢价空间"
        ]
      },
      {
        "title": "节日氛围营造",
        "content": "提前1周完成门店节日氛围布置：主题装饰、节日音乐、节日包装。氛围感直接影响消费冲动，好的氛围能提升20%-30%的冲动消费。",
        "checklist": [
          "提前1周布置节日氛围",
          "准备节日主题包装",
          "配置节日背景音乐"
        ]
      },
      {
        "title": "节日引流转化",
        "content": "节日营销三段式：预热期社群/朋友圈种草→爆发期限时限量促销→长尾期节日余温返场。每个阶段设置不同优惠力度和话术，持续收割节日流量。",
        "checklist": [
          "设计三段式营销节奏",
          "预热期社群种草",
          "爆发期限时限量引爆"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_048",
    "title": "增值服务增收法",
    "summary": "在主营业务基础上增加高毛利增值服务，提升单客贡献",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-500元",
    "problemCodes": [
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "增值服务盘点",
        "content": "盘点门店可增加的增值服务：餐饮可加外卖代煮/定制宴席、零售可加配送上门/礼品包装、服务可加上门服务/VIP专属时段。增值服务要满足“客户有需求+边际成本低+毛利高“三个条件。",
        "checklist": [
          "列出5-10个候选增值服务",
          "评估边际成本和毛利",
          "筛选3个最优增值服务"
        ]
      },
      {
        "title": "增值服务定价",
        "content": "增值服务定价采用“基础价+溢价“模式：基础价覆盖成本，溢价体现价值。如礼品包装基础价5元（成本2元），定制包装15元（成本5元）。定价要让客户觉得“值这个价“而非“太贵了“。",
        "checklist": [
          "设计增值服务定价体系",
          "确保基础价覆盖成本",
          "溢价体现差异化价值"
        ]
      },
      {
        "title": "增值服务推广",
        "content": "在核心消费环节自然推荐增值服务：结账时推荐礼品包装、点餐时推荐升级套餐、预约时推荐VIP时段。话术要自然不推销感，“要不要顺便XX”比“我推荐您XX”更有效。",
        "checklist": [
          "编写增值服务推荐话术",
          "在核心环节设置推荐触点",
          "培训员工自然推荐技巧"
        ]
      },
      {
        "title": "效果评估优化",
        "content": "追踪增值服务的采纳率和贡献率：多少客户购买了增值服务、增值服务占总营收比例。采纳率低于10%需优化价值感，低于5%需考虑更换服务。",
        "checklist": [
          "统计增值服务采纳率",
          "计算增值服务营收贡献",
          "优化低采纳率的服务"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_049",
    "title": "会员日营收爆发法",
    "summary": "设立固定会员日制造消费脉冲，定期引爆营收高峰",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-300元",
    "problemCodes": [
      "REVENUE_DROP",
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "会员日规则制定",
        "content": "选择每月固定1-2天作为会员日（如每月8号、18号）。会员日权益：会员价再享折上折、积分双倍、专属限时抢购、到店礼。规则简单明了，客户一听就懂。",
        "checklist": [
          "确定会员日日期",
          "制定3-4项会员日权益",
          "确保规则简单易懂"
        ]
      },
      {
        "title": "会员日产品准备",
        "content": "为会员日准备专属产品：限量爆款特价、会员日首发新品、专属组合套餐。产品要有“只有会员日才有“的稀缺感，驱动客户专门在会员日到店消费。",
        "checklist": [
          "准备会员日限量爆款",
          "安排新品会员日首发",
          "设计专属组合套餐"
        ]
      },
      {
        "title": "会员日预热推广",
        "content": "会员日前3天开始预热：社群倒计时海报、朋友圈每日悬念、短信提醒全部会员。预热要制造期待感，“本月8号会员日，这3款产品跌破底价“比“会员日来啦“有效10倍。",
        "checklist": [
          "提前3天社群倒计时",
          "每日朋友圈悬念预热",
          "群发短信提醒会员"
        ]
      },
      {
        "title": "会员日当天引爆",
        "content": "会员日当天全力引爆：早中晚社群3次推送、限时秒杀分时段引爆、门店设置会员日专区。统计当日营收对比平日，评估会员日拉动效果，逐月优化方案。",
        "checklist": [
          "当日社群3次推送",
          "设置分时段限时秒杀",
          "统计当日营收对比平日"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_050",
    "title": "菜品毛利优化法",
    "summary": "系统优化菜品结构和定价，整体提升菜品毛利率5-10个百分点",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-200元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "全菜品毛利盘点",
        "content": "逐道菜品计算毛利率：售价-原材料成本÷售价。将所有菜品按毛利高低分为4类：高毛利高销量（明星）、高毛利低销量（潜力）、低毛利高销量（引流）、低毛利低销量（淘汰）。",
        "checklist": [
          "计算每道菜品毛利率",
          "按毛利/销量四象限分类",
          "标记淘汰类菜品清单"
        ]
      },
      {
        "title": "低毛利菜品优化",
        "content": "对低毛利菜品逐个处理：可调价的适当提价（每次5%-10%）、可换食材的用平替食材（不影响口感）、可缩减份量的适当减量。实在无法优化的低毛利低销量菜品直接下架。",
        "checklist": [
          "低毛利菜品逐一评估",
          "可调价的提价5%-10%",
          "无法优化的直接下架"
        ]
      },
      {
        "title": "高毛利菜品推广",
        "content": "重点推广高毛利菜品：在菜单上突出展示（加星标/放C位）、员工主动推荐、搭配套餐推送。目标是将高毛利菜品销量占比从当前提升到40%以上。",
        "checklist": [
          "菜单突出高毛利菜品",
          "培训员工推荐话术",
          "设计高毛利菜品套餐"
        ]
      },
      {
        "title": "菜品结构动态调整",
        "content": "建立月度菜品毛利复盘机制：每月统计各品类毛利贡献，动态调整菜品结构。新菜品上架前必须测算毛利达标（建议60%以上）才可上架，从源头管控毛利。",
        "checklist": [
          "建立月度毛利复盘机制",
          "新菜上架毛利达标才放行",
          "目标整体毛利率提升5%"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_051",
    "title": "食材采购降本法",
    "summary": "通过采购渠道优化和集中采购策略降低食材成本10%-20%",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-200元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "采购成本审计",
        "content": "梳理全部食材供应商和采购价格，与市场批发价对比找出溢价项。统计各供应商采购额占比，识别过度依赖单一供应商的风险。目标找出10%以上的降本空间。",
        "checklist": [
          "列出全部供应商和价格",
          "与市场批发价对比",
          "标记溢价超过10%的品类"
        ]
      },
      {
        "title": "多渠道比价采购",
        "content": "对溢价品类启动多渠道比价：批发市场实地询价、线上批发平台（快驴、美菜）对比、同行拼单团购。不要只在一家采购，同品类至少保持2-3家供应商比价。",
        "checklist": [
          "实地批发市场询价",
          "线上平台比价",
          "同品类保持2-3家供应商"
        ]
      },
      {
        "title": "集中采购谈判",
        "content": "将分散采购集中到核心供应商，用采购量换取价格优惠。与供应商谈判：承诺月采购量X，换取价格降Y%。大宗食材可月结或预付锁定低价，但避免预付超过1个月用量。",
        "checklist": [
          "集中采购到核心供应商",
          "用量承诺换取价格优惠",
          "大宗食材锁定低价"
        ]
      },
      {
        "title": "损耗管控降本",
        "content": "采购降本不只是压价，还要减少损耗。建立每日食材损耗记录，分析损耗原因：过期、浪费、存储不当。针对top3损耗原因制定改善方案，通常可减少30%-50%损耗。",
        "checklist": [
          "建立每日损耗记录",
          "分析top3损耗原因",
          "制定损耗改善方案"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_052",
    "title": "固定成本瘦身法",
    "summary": "系统审查和削减房租、水电、设备等固定成本支出",
    "difficulty": "较难",
    "effectiveTime": "2-4周",
    "costRange": "0-500元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "固定成本全盘点",
        "content": "逐项列出所有固定成本：房租、物业费、水电燃气、设备租赁、网络通讯、保险、软件订阅等。按金额排序，找出占比较高的top5项目，作为优先优化对象。",
        "checklist": [
          "列出全部固定成本项目",
          "按金额排序找top5",
          "标记每项的合同到期日"
        ]
      },
      {
        "title": "房租谈判优化",
        "content": "房租通常是最大固定支出。如合同即将到期，以续约为筹码谈判降租10%-15%。周边商铺租金下行是谈判筹码。如无法降租，可谈减免物业费、增加免租期等变相降租。",
        "checklist": [
          "调研周边商铺租金水平",
          "以续约为筹码谈降租",
          "备选变相降租方案"
        ]
      },
      {
        "title": "水电能耗管控",
        "content": "水电是可优化的半固定成本：更换LED灯泡省电60%、安装定时开关控制非营业时间用电、空调设置合理温度（夏26度冬20度）、定期维护设备减少能耗。每月对比水电费变化。",
        "checklist": [
          "更换LED节能灯泡",
          "安装定时开关控制器",
          "空调温度设置合理标准"
        ]
      },
      {
        "title": "冗余支出清理",
        "content": "审查并清理冗余支出：未使用的软件订阅、重复的保险、闲置设备租赁。与供应商重新谈判：能否减免、能否降档、能否合并。每月可省出的固定成本直接转化为利润。",
        "checklist": [
          "审查并取消未使用订阅",
          "重新谈判保险和设备租赁",
          "记录每月节省金额"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_053",
    "title": "人员排班优化法",
    "summary": "科学优化排班制度，用更少工时覆盖同等业务量，降低人力成本",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-100元",
    "problemCodes": [
      "PROFIT_LOW",
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "工时与客流匹配分析",
        "content": "统计每日各时段客流和对应在岗人数，计算每个时段的“人均服务客数“。找出人员过剩时段（人均服务客数过低）和人员不足时段（人均服务客数过高），精准匹配排班。",
        "checklist": [
          "统计各时段客流和人员",
          "计算各时段人均服务客数",
          "标记人员过剩和不足时段"
        ]
      },
      {
        "title": "弹性排班制度",
        "content": "取消固定排班，改为弹性排班：高峰时段全员在岗，闲时只留核心人员，其他人员调休。引入兼职覆盖突发高峰，全职人员集中排关键班次。每月根据客流趋势调整排班。",
        "checklist": [
          "设计弹性排班表",
          "高峰全岗闲时精简",
          "引入兼职覆盖突发高峰"
        ]
      },
      {
        "title": "跨岗位技能培训",
        "content": "培训员工掌握2-3个岗位技能，实现“一专多能“。高峰时任何岗位缺人都能顶上，减少备岗人员。例如收银员也能做简单服务，服务员也能做基础备餐。",
        "checklist": [
          "制定跨岗位培训计划",
          "每位员工掌握2-3岗技能",
          "定期轮岗巩固技能"
        ]
      },
      {
        "title": "人力成本监控",
        "content": "建立人力成本占比监控：人力成本÷营业额，行业合理标准15%-25%。超过25%必须优化排班，低于15%可能影响服务质量。每周复盘人力成本占比，持续优化。",
        "checklist": [
          "每周计算人力成本占比",
          "对标行业合理标准",
          "持续优化排班方案"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_054",
    "title": "库存周转加速法",
    "summary": "优化库存管理和周转速度，减少库存积压和资金占用",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "库存全面盘点",
        "content": "进行一次全面库存盘点，记录每个SKU的库存量、周转天数和滞销天数。将库存分为4类：快周转（7天内）、正常周转（7-30天）、慢周转（30-90天）、滞销（90天以上）。",
        "checklist": [
          "完成全部SKU库存盘点",
          "计算每个SKU周转天数",
          "标记慢周转和滞销品"
        ]
      },
      {
        "title": "滞销库存清理",
        "content": "对滞销品启动清理：90天以上滞销品做清仓特卖或捆绑销售，60-90天滞销品做促销打折加速出清。清理回收的资金用于补充快周转品库存，提升整体周转效率。",
        "checklist": [
          "制定滞销品清仓方案",
          "60天以上产品加速促销",
          "回收资金补充快周转品"
        ]
      },
      {
        "title": "安全库存优化",
        "content": "根据历史销量和供应周期计算每个SKU的安全库存量，避免过度备货。快消品保持7天安全库存，常规品保持14天，慢消品保持7天并考虑是否淘汰。",
        "checklist": [
          "计算各SKU安全库存量",
          "快消品7天常规品14天",
          "慢消品降低安全库存"
        ]
      },
      {
        "title": "进销存系统化管理",
        "content": "建立系统化的进销存管理：每日记录进货和销售数据，设置库存预警线（低于安全库存自动提醒补货）。每周复盘库存周转数据，持续优化采购频率和批量。",
        "checklist": [
          "建立每日进销存记录",
          "设置库存预警线",
          "每周复盘周转数据"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_055",
    "title": "包装成本精简法",
    "summary": "优化包装策略降低包装成本，兼顾品牌形象和成本控制",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-200元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "包装成本审计",
        "content": "统计所有包装物料成本：外卖盒、袋子、封签、餐具、赠品包装等。计算包装成本占售价的比例，通常应控制在3%-5%。超过5%的品类需重点优化。",
        "checklist": [
          "列出全部包装物料及单价",
          "计算包装成本占比",
          "标记超过5%的品类"
        ]
      },
      {
        "title": "包装减量优化",
        "content": "在不影响客户体验前提下精简包装：减小包装尺寸匹配实际份量、减少不必要的装饰性包装、统一包装规格降低采购成本。例如去掉过度填充物、用通用盒替代定制盒。",
        "checklist": [
          "审查可精简的包装项",
          "统一包装规格",
          "去除不必要装饰性包装"
        ]
      },
      {
        "title": "供应商重新比价",
        "content": "包装物料每季度比价一次，在1688等批发平台找源头工厂直供。采购量大的品类可找工厂定制，量小的可与其他商户拼单。目标降低包装采购成本15%-20%。",
        "checklist": [
          "线上平台比价包装物料",
          "大品类找工厂直供",
          "小品类拼单采购"
        ]
      },
      {
        "title": "包装收费策略",
        "content": "对外卖和打包场景实施包装收费：基础包装免费，升级包装收费。如普通餐盒免费，环保餐盒收1元；普通袋子免费，保温袋收3元。既降低成本又满足差异化需求。",
        "checklist": [
          "设计基础/升级包装方案",
          "制定升级包装收费标准",
          "线上菜单标注包装费"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_056",
    "title": "产品定价策略优化",
    "summary": "科学调整产品定价，在客户可接受范围内最大化利润空间",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-100元",
    "problemCodes": [
      "PROFIT_LOW",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "价格弹性测试",
        "content": "选择3-5款核心产品做价格弹性测试：提价5%-10%后观察2周销量变化。如销量下降不超过5%说明弹性低可提价，下降超过15%说明弹性高需谨慎。测试期间密切监控客户反馈。",
        "checklist": [
          "选择3-5款核心产品",
          "提价5%-10%测试2周",
          "监控销量和客户反馈"
        ]
      },
      {
        "title": "锚定价格策略",
        "content": "在菜单/价格表上设置“锚定价“：放一个高价产品做参照，让中档产品显得更划算。如298元的精品套餐让158元的标准套餐显得很值。锚定价产品不指望多卖，但能提升其他产品成交率。",
        "checklist": [
          "设计锚定价格产品",
          "合理拉开价格梯度",
          "测试锚定效果"
        ]
      },
      {
        "title": "尾数定价优化",
        "content": "将整数定价改为尾数定价：100元→98元、50元→48元。虽然只差2元，但心理学上48元属于“40多“而非“50”，感知差异远大于实际差异。但不要全部改尾数，部分保持整数显品质。",
        "checklist": [
          "选择适合尾数定价的产品",
          "改为X8或X9定价",
          "保留部分整数定价显品质"
        ]
      },
      {
        "title": "动态定价机制",
        "content": "建立动态定价机制：新品上市定价略高试探市场→1个月后根据反馈调整→稳定后定期小调。季节性产品旺季提价淡季降价。每月review一次核心产品定价合理性。",
        "checklist": [
          "建立新品定价-调价流程",
          "季节性产品动态调价",
          "月度定价合理性review"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_057",
    "title": "水电能耗精细管控",
    "summary": "精细化管理门店水电能耗，每月节省10%-20%能源支出",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-300元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "能耗基线摸底",
        "content": "调取近6个月水电费账单，计算月均能耗成本和每平米能耗。找到能耗高峰月和低谷月，分析异常波动原因。设定降耗目标：比当前降低10%-15%。",
        "checklist": [
          "调取6个月水电费账单",
          "计算月均能耗和单位能耗",
          "设定10%-15%降耗目标"
        ]
      },
      {
        "title": "用电设备优化",
        "content": "逐一检查用电设备：照明全部换LED、冰箱冷柜定期除霜、空调滤网月清洗、老旧高耗设备考虑更换。非营业时间切断非必要电源，安装定时器自动控制。",
        "checklist": [
          "全部换装LED照明",
          "冰柜定期除霜月清滤网",
          "安装定时器控非营业用电"
        ]
      },
      {
        "title": "用水用气管控",
        "content": "检查全部水龙头是否漏水、马桶是否节水、热水系统是否高效。厨房燃气灶具定期清理喷嘴提升热效率、管线检查漏气。小问题修复成本极低但节能效果明显。",
        "checklist": [
          "检查全部水龙头是否漏水",
          "燃气灶具清理喷嘴",
          "管线检查漏气漏水"
        ]
      },
      {
        "title": "能耗监控机制",
        "content": "建立每日能耗记录：记录电表/水表读数，与营业额对比计算能耗占比。发现异常波动立即排查。每月对比能耗趋势，持续优化管控措施。",
        "checklist": [
          "建立每日能耗记录表",
          "对比能耗占比趋势",
          "异常波动立即排查"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_058",
    "title": "浪费治理利润修复法",
    "summary": "识别和治理门店运营中的各类浪费，将浪费转化为利润",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-100元",
    "problemCodes": [
      "PROFIT_LOW"
    ],
    "steps": [
      {
        "title": "浪费全面排查",
        "content": "从7个维度排查浪费：食材浪费、物料浪费、时间浪费、空间浪费、能源浪费、人力浪费、客户浪费（未充分开发客户价值）。每个维度列出具体浪费项目和估算金额。",
        "checklist": [
          "逐一排查7大浪费维度",
          "列出具体浪费项目",
          "估算各浪费项的月损失额"
        ]
      },
      {
        "title": "食材浪费治理",
        "content": "重点治理食材浪费：建立每日食材损耗记录（含原因）、规范切配标准减少边角料浪费、用边角料开发员工餐或特价菜、过期食材每日清点及时处理。目标将食材损耗率从5%-10%降至2%-3%。",
        "checklist": [
          "建立每日食材损耗记录",
          "规范切配标准减少浪费",
          "边角料二次利用"
        ]
      },
      {
        "title": "时间和人力浪费治理",
        "content": "优化工作流程减少时间浪费：制定标准操作流程SOP、减少重复劳动和无效等待、用数字化工具替代手工记录。人力浪费的核心是“忙的忙死闲的闲死“，需优化分工和排班。",
        "checklist": [
          "制定核心岗位SOP",
          "消除重复劳动和等待",
          "优化分工平衡工作量"
        ]
      },
      {
        "title": "浪费治理长效机制",
        "content": "建立浪费治理长效机制：每日浪费记录+每周浪费复盘+每月浪费目标。将浪费治理纳入员工考核，设置“浪费减少奖“。每月公布浪费治理成果，形成全员节约文化。",
        "checklist": [
          "建立每日浪费记录制度",
          "将浪费治理纳入考核",
          "每月公布浪费治理成果"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_059",
    "title": "爆款打造四步法",
    "summary": "系统打造门店爆款产品，用单品爆发带动整体销量",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "200-1000元",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "爆款候选筛选",
        "content": "从现有产品中筛选爆款候选：选择成本可控、制作/采购标准化、口感/体验有记忆点的2-3款产品。爆款不一定是利润最高的，但必须是能形成口碑传播和复购的。",
        "checklist": [
          "筛选2-3款爆款候选",
          "确认成本可控可标准化",
          "验证口感/体验有记忆点"
        ]
      },
      {
        "title": "爆款体验打磨",
        "content": "对候选爆款进行体验打磨：优化口味/效果到极致、设计独特的呈现方式（造型/包装/上桌仪式）、给爆款起一个有传播力的名字（如“爆汁牛堡“而非“牛肉汉堡“）。",
        "checklist": [
          "优化口味/效果到极致",
          "设计独特呈现方式",
          "起一个有传播力的名字"
        ]
      },
      {
        "title": "爆款冷启动",
        "content": "选择1周时间集中推广爆款：门口设试吃/试用台、社群每日推一条爆款内容、限时特价制造尝鲜冲动。首周目标让100个客户体验并收集反馈，好评率需达85%以上。",
        "checklist": [
          "设置门口试吃/试用台",
          "社群每日推爆款内容",
          "收集100份体验反馈"
        ]
      },
      {
        "title": "爆款口碑放大",
        "content": "好评率达标的爆款启动口碑放大：引导客户拍照打卡分享、设计“买爆款的N种搭配“引导连带消费、设置爆款订阅/预定机制保证复购。爆款稳定后逐步提价回归正常毛利。",
        "checklist": [
          "引导客户拍照打卡分享",
          "设计爆款搭配推荐",
          "设置爆款预定/订阅机制"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_060",
    "title": "滞销品清仓术",
    "summary": "快速清理滞销库存回笼资金，腾出货架给畅销品",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-100元",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "滞销品全面识别",
        "content": "按销售数据标记所有滞销品：30天无销量的为重度滞销、60天无销量的为死库存。列出滞销品清单及库存量、成本价、当前售价，计算滞销占用的资金总额。",
        "checklist": [
          "标记30天/60天无销量产品",
          "列出滞销品清单及库存量",
          "计算滞销占用资金总额"
        ]
      },
      {
        "title": "分批清仓策略",
        "content": "制定分批清仓方案：第一批5折清30天滞销品、第二批3折清60天滞销品、第三批1折或赠品清死库存。每批限时7天，制造紧迫感。可设“清仓专区“集中展示。",
        "checklist": [
          "制定分批折扣方案",
          "设置清仓专区",
          "每批限时7天"
        ]
      },
      {
        "title": "捆绑搭售清理",
        "content": "将滞销品与畅销品捆绑销售：买畅销品送滞销品、畅销品+滞销品组合特价。让客户因畅销品而顺便带走滞销品，比单独打折清仓更有效。",
        "checklist": [
          "设计畅销+滞销捆绑组合",
          "设置组合特价",
          "培训员工推荐捆绑方案"
        ]
      },
      {
        "title": "清仓渠道拓展",
        "content": "除门店清仓外拓展线上渠道：闲鱼批量出、社区团购低价清、同行调货（品类互补的同行可能需要）。实在无法清掉的做捐赠获取税务抵扣，或做员工福利处理。",
        "checklist": [
          "闲鱼/线上批量出清",
          "社区团购低价清",
          "剩余做捐赠或员工福利"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_061",
    "title": "季节性产品规划法",
    "summary": "提前规划季节性产品线，把握季节消费窗口期最大化销量",
    "difficulty": "中等",
    "effectiveTime": "2-4周",
    "costRange": "200-1000元",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "季节需求预判",
        "content": "分析门店品类在各季节的需求变化：春夏秋冬各有什么消费热点、去年同期什么产品最好卖、今年有什么新趋势。提前2个月开始筹备下一季的产品线。",
        "checklist": [
          "分析四季需求变化规律",
          "回顾去年同期热销品",
          "提前2个月筹备下季产品"
        ]
      },
      {
        "title": "应季产品开发",
        "content": "为每个季节开发2-3款应季新品：春季清爽系列、夏季消暑系列、秋季滋补系列、冬季暖身系列。新品需提前1个月试销验证，确认市场接受度后再正式推广。",
        "checklist": [
          "开发2-3款应季新品",
          "提前1个月试销验证",
          "确认市场接受度再推广"
        ]
      },
      {
        "title": "换季库存过渡",
        "content": "换季时做好库存过渡：当季产品提前1个月开始清仓，新品提前2周开始预热上架。避免“青黄不接“导致销售断档，也避免旧品大量积压到下一年。",
        "checklist": [
          "当季品提前1个月清仓",
          "新品提前2周预热上架",
          "避免换季销售断档"
        ]
      },
      {
        "title": "反季节营销策略",
        "content": "淡季做反季节营销创造需求：夏天推“冬品夏卖“特惠（羽绒服反季特卖）、冬天推“夏日提前订“锁定客户。反季节营销核心是价格优势，折扣力度要足够大。",
        "checklist": [
          "设计反季节营销方案",
          "折扣力度要足够吸引",
          "提前锁定淡季客户需求"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_062",
    "title": "产品组合套餐法",
    "summary": "设计多种产品组合套餐，提升连带率和客单价带动整体销量",
    "difficulty": "简单",
    "effectiveTime": "3-5天",
    "costRange": "0-200元",
    "problemCodes": [
      "PRODUCT_SLOW",
      "REVENUE_DROP"
    ],
    "steps": [
      {
        "title": "消费场景分析",
        "content": "分析客户主要消费场景：早餐/午餐/晚餐、个人/情侣/家庭、日常/聚会/送礼。每个场景对应设计1-2款套餐，让客户不用思考就能找到适合的组合。",
        "checklist": [
          "列出5-8个主要消费场景",
          "每场景设计1-2款套餐",
          "确保套餐覆盖核心场景"
        ]
      },
      {
        "title": "套餐搭配设计",
        "content": "套餐设计原则：主品+搭配品+惊喜品。主品是客户想买的，搭配品是自然关联的，惊喜品是超预期的（如赠品或小份尝鲜品）。套餐总价要比单买省10%-15%。",
        "checklist": [
          "设计主品+搭配+惊喜结构",
          "确保比单买省10%-15%",
          "每款套餐含1个惊喜品"
        ]
      },
      {
        "title": "套餐定价策略",
        "content": "套餐定价用“锚定效应“：菜单上先标各单品总价，再划掉写套餐价。如“单买68元，套餐价52元“。视觉上让客户感受到明确的节省金额，刺激决策。",
        "checklist": [
          "标注单买总价和套餐价",
          "划掉原价突显节省金额",
          "确保节省金额视觉醒目"
        ]
      },
      {
        "title": "套餐推广追踪",
        "content": "统计各套餐的销量和占比，找出最受欢迎的套餐加大推广，不受欢迎的优化搭配或淘汰。每月更新1-2款新套餐保持新鲜感，同时保留经典套餐作为稳定产出。",
        "checklist": [
          "统计各套餐销量占比",
          "优化低销量套餐",
          "月度更新1-2款新套餐"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_063",
    "title": "产品体验升级法",
    "summary": "从感官、服务和仪式感三维度升级产品体验，提升购买转化",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "200-1000元",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "体验差距诊断",
        "content": "从客户视角体验自家产品和竞品产品，找出体验差距。关注5个触点：视觉（外观/陈列）、嗅觉（气味/新鲜度）、味觉/触觉（品质/手感）、听觉（环境音/上桌声）、仪式感（上桌方式/包装）。",
        "checklist": [
          "从客户视角体验自家产品",
          "对比竞品找出体验差距",
          "列出5个触点的改进项"
        ]
      },
      {
        "title": "感官体验升级",
        "content": "重点升级视觉和仪式感（成本最低效果最明显）：改善产品摆盘/陈列、增加上桌仪式（如揭盖/淋酱）、优化包装设计、增加视觉亮点（如点缀/装饰）。微小的视觉改变能大幅提升感知价值。",
        "checklist": [
          "改善产品摆盘和陈列",
          "设计上桌仪式感",
          "优化包装视觉设计"
        ]
      },
      {
        "title": "服务体验配套",
        "content": "产品体验升级需配套服务升级：点单时介绍产品故事、上产品时说明特色/食用方式、用餐后主动询问体验。让客户从“买了一个产品“变成“获得了一次体验“。",
        "checklist": [
          "编写产品故事和介绍话术",
          "培训上产品时的说明方式",
          "设置餐后体验回访"
        ]
      },
      {
        "title": "体验效果验证",
        "content": "体验升级后追踪关键指标：客户好评率、拍照分享率、复购率。三项指标均提升说明升级有效。仅好评率提升但复购率不升，需检查是否“好看不好吃“，调整产品本身品质。",
        "checklist": [
          "追踪好评率和分享率",
          "追踪复购率变化",
          "根据数据调整升级方向"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_064",
    "title": "试吃试用转化法",
    "summary": "通过免费试吃试用打破客户购买犹豫，直接提升成交率",
    "difficulty": "简单",
    "effectiveTime": "1-3天",
    "costRange": "100-500元",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "试吃选品策略",
        "content": "选择适合试吃的产品：味道有冲击力的（闻着香/看着诱人）、新品需教育市场的、高毛利值得投入试吃成本的。避免选择味道平淡或需多次体验才能感受价值的产品做试吃。",
        "checklist": [
          "筛选2-3款适合试吃的产品",
          "确保味道有冲击力",
          "确认毛利覆盖试吃成本"
        ]
      },
      {
        "title": "试吃场景设计",
        "content": "在客户必经动线上设试吃点：门口（引流进店）、货架旁（促进决策）、收银台旁（冲动加购）。试吃份量要小而精，一口能尝到核心味道即可，避免吃饱不买。",
        "checklist": [
          "设3个试吃触点",
          "控制试吃份量小而精",
          "确保一口尝到核心味道"
        ]
      },
      {
        "title": "试吃话术设计",
        "content": "试吃时配合精准话术：递上试吃→”尝尝我们家新出的XX”→客户品尝→”怎么样？现在买还有XX优惠“。关键是试吃后立即给一个限时优惠促进即时决策，错过就没了。",
        "checklist": [
          "编写试吃递品话术",
          "设计试吃后即时优惠",
          "训练员工自然过渡促单"
        ]
      },
      {
        "title": "试吃效果追踪",
        "content": "统计试吃转化率：多少人试吃→多少人购买→转化率多少。行业平均试吃转化率15%-25%，低于10%需优化产品味道或话术，高于25%可加大试吃投入。",
        "checklist": [
          "统计试吃人数和购买人数",
          "计算试吃转化率",
          "优化低转化率的环节"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_065",
    "title": "产品故事化营销法",
    "summary": "为产品注入故事和情感价值，从卖功能升级为卖故事",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "PRODUCT_SLOW",
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "产品故事挖掘",
        "content": "为每款核心产品挖掘1个独特故事：食材的产地故事、制作工艺的匠心故事、创始人的初心故事、客户的感人故事。故事要真实而非编造，真实才能打动人。",
        "checklist": [
          "为3-5款核心产品找故事",
          "确保故事真实可追溯",
          "故事要有情感共鸣点"
        ]
      },
      {
        "title": "故事内容制作",
        "content": "将故事制作成可传播的内容：产品卡片印上故事摘要、菜单/价签加故事标签、朋友圈/短视频拍故事版产品介绍。故事版内容比纯产品介绍互动量高3-5倍。",
        "checklist": [
          "制作产品故事卡片",
          "菜单加故事标签",
          "拍摄故事版短视频"
        ]
      },
      {
        "title": "故事场景植入",
        "content": "在客户接触产品的各个环节植入故事：点单时讲食材故事、上产品时讲工艺故事、包装上印品牌故事。让客户每次接触产品都感受到“这不只是一个产品，背后还有故事“。",
        "checklist": [
          "点单话术植入故事",
          "上产品时讲述工艺",
          "包装印品牌故事"
        ]
      },
      {
        "title": "客户共创故事",
        "content": "邀请客户参与故事共创：征集“你和XX产品的故事“、客户体验故事分享有奖、老客户见证视频。客户讲的故事比商家讲的有10倍信任度，是最有力的营销素材。",
        "checklist": [
          "征集客户产品故事",
          "设置故事分享奖励",
          "制作客户见证视频"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_066",
    "title": "新品孵化试销法",
    "summary": "建立小批量试销验证机制，降低新品上市风险提高成功率",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "100-500元",
    "problemCodes": [
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "新品创意收集",
        "content": "建立新品创意来源：客户反馈高频需求、竞品热销品分析、行业趋势洞察、员工前线观察。每月收集5-10个新品创意，筛选出2-3个进入试销流程。",
        "checklist": [
          "建立新品创意收集渠道",
          "每月收集5-10个创意",
          "筛选2-3个进入试销"
        ]
      },
      {
        "title": "小批量试产",
        "content": "对入选创意做小批量试产（10-20份），成本控制在500元以内。试产品不需要完美包装，但产品本身品质要到位。试产同时准备试销话术和反馈问卷。",
        "checklist": [
          "小批量试产10-20份",
          "控制试产成本500元内",
          "准备试销话术和问卷"
        ]
      },
      {
        "title": "定向试销验证",
        "content": "将试产品向3类人群定向试销：老客户（忠实度测试）、新客户（吸引力测试）、挑剔客户（品质测试）。收集3类人群的评分和改进建议，综合评分7分以上方可正式上市。",
        "checklist": [
          "向3类人群定向试销",
          "收集评分和改进建议",
          "综合7分以上可上市"
        ]
      },
      {
        "title": "正式上市推广",
        "content": "试销通过的新品启动正式上市：首周“新品尝鲜价“引流、门店重点陈列展示、社群/朋友圈新品尝鲜活动、员工主动推荐。上市2周复盘销量和好评率，不达预期及时调整或下架。",
        "checklist": [
          "设置新品尝鲜价",
          "重点陈列和主动推荐",
          "2周复盘决定去留"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_067",
    "title": "产品差异化定位法",
    "summary": "从同质化竞争中突围，打造不可替代的产品差异化定位",
    "difficulty": "较难",
    "effectiveTime": "2-4周",
    "costRange": "500-2000元",
    "problemCodes": [
      "PRODUCT_SLOW",
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "同质化诊断",
        "content": "对比自家产品和周边竞品，列出相同点和不同点。如果相同点超过80%，说明严重同质化。客户没有理由选你不选别人，只能拼价格，陷入恶性循环。",
        "checklist": [
          "对比5家竞品找差异",
          "统计同质化程度",
          "找出可差异化的方向"
        ]
      },
      {
        "title": "差异化方向选择",
        "content": "从4个方向寻找差异化：品类差异化（做别人不做的细分）、品质差异化（做得比别人更好）、体验差异化（服务比别人更好）、人群差异化（服务别人忽略的客群）。选择1-2个方向深度突破。",
        "checklist": [
          "评估4个差异化方向可行性",
          "选择1-2个方向突破",
          "确认差异化可持续性"
        ]
      },
      {
        "title": "差异化产品打造",
        "content": "围绕选定的差异化方向打造产品：如选品质差异化则升级原材料和工艺、选体验差异化则设计独特服务和仪式、选人群差异化则定制专属产品线。差异化要有壁垒，竞品短期无法模仿。",
        "checklist": [
          "围绕方向打造差异化产品",
          "确保差异化有模仿壁垒",
          "测试差异化产品的市场反应"
        ]
      },
      {
        "title": "差异化传播强化",
        "content": "将差异化定位变成一句话传播语：“全城唯一XX””XX领域最XX的店“。在所有触点强化这一定位：门头、菜单、宣传、话术。让客户一提到某个品类就想到你的差异化标签。",
        "checklist": [
          "提炼差异化传播语",
          "全触点强化差异化定位",
          "持续传播建立心智占位"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_068",
    "title": "会员等级体系搭建法",
    "summary": "搭建3级会员等级体系，用成长机制锁定客户长期消费",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-500元",
    "problemCodes": [
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "等级规则设计",
        "content": "设计3级会员体系：银卡（注册即享，基础权益）、金卡（消费满500元或3个月内消费5次，进阶权益）、钻石卡（消费满2000元或半年消费15次，顶级权益）。等级门槛要“跳一跳够得着“。",
        "checklist": [
          "设计3级会员等级规则",
          "设置合理的升级门槛",
          "确保每级权益有明显差异"
        ]
      },
      {
        "title": "分级权益设计",
        "content": "为每级会员设计差异化权益：银卡享积分+生日礼、金卡享折扣+优先预约+专属活动、钻石卡享折上折+免费配送+私人顾问。权益要真实有用，不能是“看起来很多实际没用“的伪权益。",
        "checklist": [
          "银卡设计基础权益",
          "金卡设计进阶权益",
          "钻石卡设计顶级权益"
        ]
      },
      {
        "title": "升级激励机制",
        "content": "设计“即将升级“推送机制：距升级差XX元时推送“再消费XX元即可升级金卡享XX权益“。利用损失厌恶心理（不消费就失去升级机会）驱动客户加速消费。升级瞬间给予仪式感（如升级礼包）。",
        "checklist": [
          "设置即将升级推送提醒",
          "设计升级仪式感礼包",
          "利用损失厌恶促消费"
        ]
      },
      {
        "title": "降级预警机制",
        "content": "设置会员降级预警：3个月未消费的会员推送“您的金卡将于X日降级，再消费1次即可保级“。降级预警比升级激励更有效，因为“失去已有“比“得到未得“更痛苦。",
        "checklist": [
          "设置3个月未消费预警",
          "推送降级提醒保级引导",
          "降级后提供重新升级通道"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_069",
    "title": "客户生命周期管理法",
    "summary": "按客户生命周期阶段精准运营，降低每个阶段的流失率",
    "difficulty": "较难",
    "effectiveTime": "2-4周",
    "costRange": "0-500元",
    "problemCodes": [
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "生命周期划分",
        "content": "将客户划分为5个阶段：新客期（首次到店1个月内）、成长期（1-3个月消费3次以上）、成熟期（3个月以上稳定消费）、衰退期（消费频率下降50%）、流失期（3个月未消费）。",
        "checklist": [
          "定义5个生命周期阶段",
          "制定各阶段判定标准",
          "给所有客户打上阶段标签"
        ]
      },
      {
        "title": "新客期转化运营",
        "content": "新客期是流失率最高的阶段（约60%新客不会再来）。对策：到店后24小时微信回访、7天内推送专属复购券、30天内邀请参加门店活动。目标将新客留存率提升到50%以上。",
        "checklist": [
          "设置24h回访机制",
          "7天内推送复购券",
          "30天内邀请门店活动"
        ]
      },
      {
        "title": "成熟期深耕运营",
        "content": "成熟期客户是核心资产，要深耕提升价值：推荐更高价位产品、邀请成为品鉴官/KOC、设计专属尊享体验。目标将成熟期客户客单价提升20%以上，同时延长成熟期时长。",
        "checklist": [
          "推荐高价位产品",
          "邀请成为门店KOC",
          "设计专属尊享体验"
        ]
      },
      {
        "title": "衰退期挽回运营",
        "content": "衰退期是挽回的最后窗口，必须高度重视：消费频率下降时立即触达、推送超常规回归福利、安排一对一深度沟通了解原因。挽回一个衰退客户成本是维护成熟客户的5倍，但远低于获新客。",
        "checklist": [
          "消费频率下降立即触达",
          "推送超常规回归福利",
          "一对一沟通了解流失原因"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_070",
    "title": "转介绍裂变锁客法",
    "summary": "设计客户转介绍奖励机制，用老客户带来新客户降低流失",
    "difficulty": "简单",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "CUSTOMER_LOSS",
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "转介绍机制设计",
        "content": "设计双向奖励的转介绍机制：老客户推荐新客户，双方各得奖励。如推荐1人各得20元券、推荐3人各得50元券、推荐5人各得100元券。奖励要有阶梯，激励多推荐。",
        "checklist": [
          "设计双向奖励方案",
          "设置推荐阶梯奖励",
          "确保双方都有足够动力"
        ]
      },
      {
        "title": "推荐工具准备",
        "content": "为老客户提供简单的推荐工具：专属推荐二维码/小程序链接、精美推荐海报（含老客户专属优惠）、一键转发朋友圈的素材。降低推荐门槛，3步内完成推荐。",
        "checklist": [
          "生成专属推荐二维码",
          "制作推荐海报素材",
          "准备一键转发朋友圈素材"
        ]
      },
      {
        "title": "推荐场景引导",
        "content": "在客户体验最好的时刻引导推荐：消费后结账时“满意的话推荐朋友来，双方都有礼“、会员日“今天介绍朋友，你俩都享会员价“。在客户满意时提出，转化率最高。",
        "checklist": [
          "在结账时引导推荐",
          "会员日推荐享额外权益",
          "培训员工把握推荐时机"
        ]
      },
      {
        "title": "推荐数据追踪",
        "content": "追踪转介绍数据：每月推荐人数、推荐转化率、推荐新客留存率。根据数据优化：奖励力度不够则加大、推荐流程太复杂则简化、推荐时机不对则调整。",
        "checklist": [
          "统计月度推荐人数和转化率",
          "追踪推荐新客留存率",
          "根据数据优化机制"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_071",
    "title": "客户满意度提升法",
    "summary": "系统提升客户满意度，从源头降低客户流失率",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "满意度基线调研",
        "content": "通过3种方式调研客户满意度：离店时简单评分（1-5分）、微信回访满意度调查、匿名意见箱。重点关注“不满意“和“一般“的客户，他们的具体不满就是改进方向。",
        "checklist": [
          "设置离店评分机制",
          "微信回访满意度调查",
          "收集匿名改进意见"
        ]
      },
      {
        "title": "不满原因分析",
        "content": "汇总不满意客户的反馈，按频率排序不满原因TOP5。常见不满原因：等位/等餐太久、服务态度不好、产品质量不稳定、环境不干净、价格不透明。针对每个原因制定改进方案。",
        "checklist": [
          "汇总不满原因并排序",
          "确定TOP5不满原因",
          "逐一制定改进方案"
        ]
      },
      {
        "title": "关键触点优化",
        "content": "优化客户体验的5个关键触点：进门第一印象（招呼+引导）、等待过程（提供茶水/杂志）、消费过程（主动服务+品质保证）、结账体验（快捷+感谢）、离店后（回访+关怀）。",
        "checklist": [
          "优化进门第一印象",
          "改善等待过程体验",
          "优化结账和离店体验"
        ]
      },
      {
        "title": "满意度持续监控",
        "content": "建立满意度持续监控机制：每周统计满意度评分、每月分析不满趋势、每季度做深度满意度调研。满意度低于4分（5分制）的时段/品类/员工重点改进，持续追踪改善效果。",
        "checklist": [
          "每周统计满意度评分",
          "月度分析不满趋势",
          "季度深度满意度调研"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_072",
    "title": "老客户专属权益法",
    "summary": "设计老客户专属权益体系，让客户舍不得离开",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "200-500元",
    "problemCodes": [
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "老客户识别分层",
        "content": "定义老客户标准：累计消费满X元或消费满X次。将老客户分为3层：普通老客户（基础权益）、核心老客户（进阶权益）、超级老客户（顶级权益）。每层设置不同的专属权益。",
        "checklist": [
          "定义老客户标准",
          "分3层设定门槛",
          "确保分层标准清晰可执行"
        ]
      },
      {
        "title": "专属权益设计",
        "content": "设计只有老客户才能享受的专属权益：老客户专属折扣（比新客多5%-10%）、优先新品体验权、生日月专属礼物、年度回馈礼、专属服务通道。权益要让老客户感到“被特别对待“。",
        "checklist": [
          "设计5项以上专属权益",
          "确保权益有排他性",
          "权益让老客户感到被重视"
        ]
      },
      {
        "title": "权益感知强化",
        "content": "让老客户清晰感知到自己的专属权益：消费时标注“老客户专享价，为您省了XX元“、生日当天收到专属祝福和礼物、每次到店有专属标识（如专属杯垫/餐具）。感知比实际更重要。",
        "checklist": [
          "消费时标注节省金额",
          "生日当天专属祝福",
          "到店时提供专属标识"
        ]
      },
      {
        "title": "流失预警与挽留",
        "content": "监控老客户消费频率，频率下降50%时触发预警。通过店长亲自回访、赠送超常规回归礼（如免费服务一次）、提供专属问题解决方案来挽留。挽留成功率目标50%以上。",
        "checklist": [
          "设置消费频率下降预警",
          "店长亲自回访流失客户",
          "提供超常规回归福利"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_073",
    "title": "售后服务升级法",
    "summary": "升级售后服务体系，用超预期售后赢得客户终身忠诚",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "售后标准制定",
        "content": "制定售后服务的5项标准：响应速度（投诉30分钟内响应）、解决时效（24小时内给出方案）、补偿标准（不满意即补偿）、回访确认（解决后24小时回访）、升级通道（店长级二次处理）。",
        "checklist": [
          "制定5项售后标准",
          "全员培训达标",
          "标准上墙公示给客户看"
        ]
      },
      {
        "title": "主动售后机制",
        "content": "变被动等待投诉为主动售后回访：消费后24小时微信回访体验、新品消费后3天主动问感受、大额消费后1周电话关怀。主动售后能发现90%的潜在不满，在客户决定离开前解决问题。",
        "checklist": [
          "设置24h微信回访",
          "新品3天主动问感受",
          "大额消费1周电话关怀"
        ]
      },
      {
        "title": "超预期补偿方案",
        "content": "遇到客户不满时给予超预期补偿：客户期望退换，你退换+赠送+道歉；客户期望道歉，你道歉+补偿+改进承诺。超预期补偿的成本远低于流失一个客户的损失，且能将不满客户转化为忠诚客户。",
        "checklist": [
          "制定超预期补偿方案",
          "补偿要超出客户预期",
          "将不满客户转化为忠实客户"
        ]
      },
      {
        "title": "售后数据复盘",
        "content": "每月复盘售后数据：投诉类型分布、处理时效达标率、客户满意度恢复率。投诉最多的类型是品质问题还是服务问题？针对性改进。售后数据是最好的产品和服务改进指南。",
        "checklist": [
          "月度售后数据复盘",
          "分析投诉类型和趋势",
          "针对性改进高频问题"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_074",
    "title": "客户社群精细化运营",
    "summary": "将客户社群精细化分层运营，提升社群客户留存和消费",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-300元",
    "problemCodes": [
      "CUSTOMER_LOSS",
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "社群分层设计",
        "content": "将大群按客户价值分层运营：新客群（引流和转化）、活跃群（日常运营和复购）、VIP群（专属权益和深度运营）。分层后每群内容不同、频率不同、权益不同，精准运营。",
        "checklist": [
          "设计3层社群结构",
          "制定各层内容策略",
          "配置各层专属权益"
        ]
      },
      {
        "title": "内容价值输出",
        "content": "每层社群提供不同价值内容：新客群推门店介绍和体验优惠、活跃群推每日特惠和互动话题、VIP群推新品首发和专属活动。内容比例7:3（价值内容:营销内容），避免纯广告群。",
        "checklist": [
          "新客群侧重引流内容",
          "活跃群推互动+特惠",
          "VIP群推专属+首发"
        ]
      },
      {
        "title": "社群活跃维护",
        "content": "维护社群活跃度：每日1条互动内容（投票/话题/小知识）、每周1次群活动（秒杀/抽奖/接龙）、每月1次线下活动（品鉴/DIY/沙龙）。培养3-5个群KOC带头互动，防止群变成死群。",
        "checklist": [
          "每日1条互动内容",
          "每周1次群内活动",
          "培养3-5个群KOC"
        ]
      },
      {
        "title": "社群转化追踪",
        "content": "追踪社群运营数据：群人数增长、日活跃率、群到店转化率、群消费贡献占比。日活跃率低于5%需优化内容，到店转化率低于3%需优化权益设计。",
        "checklist": [
          "追踪群人数和活跃率",
          "统计群到店转化率",
          "计算群消费贡献占比"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_075",
    "title": "客户反馈驱动改进法",
    "summary": "建立客户反馈收集和响应闭环，用客户声音驱动产品服务迭代",
    "difficulty": "简单",
    "effectiveTime": "1-2周",
    "costRange": "0-200元",
    "problemCodes": [
      "CUSTOMER_LOSS",
      "PRODUCT_SLOW"
    ],
    "steps": [
      {
        "title": "反馈渠道搭建",
        "content": "搭建4个客户反馈渠道：门店意见箱（匿名更真实）、微信反馈入口（便捷低门槛）、消费后满意度调查（结构化数据）、店员主动询问（即时互动）。多渠道覆盖不同习惯的客户。",
        "checklist": [
          "设置门店意见箱",
          "开通微信反馈入口",
          "设计消费后满意度调查"
        ]
      },
      {
        "title": "反馈分类整理",
        "content": "每周整理反馈分为4类：产品问题（口味/品质/品类）、服务问题（态度/速度/专业度）、环境问题（卫生/氛围/设施）、建议需求（新品/活动/改善）。按频率排序，聚焦TOP3改进。",
        "checklist": [
          "每周整理分类反馈",
          "按频率排序TOP3",
          "制定TOP3改进计划"
        ]
      },
      {
        "title": "快速响应闭环",
        "content": "对每条反馈做到3个响应：24小时内回复客户、7天内给出改进方案、14天内落地改进并告知客户。快速响应比完美方案更重要，客户感到“被重视“本身就是最好的挽留。",
        "checklist": [
          "24h内回复反馈客户",
          "7天内制定改进方案",
          "14天内落地并告知客户"
        ]
      },
      {
        "title": "反馈驱动迭代",
        "content": "将客户反馈作为产品和服务迭代的核心输入：高频反馈的问题优先解决、多客户建议的需求优先开发、客户投诉的产品优先优化。每季度发布“因你而变“改进清单，让客户看到反馈的力量。",
        "checklist": [
          "用反馈驱动迭代优先级",
          "季度发布改进清单",
          "让客户看到反馈的力量"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_076",
    "title": "情感连接锁客法",
    "summary": "通过情感连接和人际温度深度绑定客户，降低流失率",
    "difficulty": "简单",
    "effectiveTime": "1-2周",
    "costRange": "0-200元",
    "problemCodes": [
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "客户画像建立",
        "content": "为TOP50高频客户建立个人画像：姓名、偏好、家庭情况、重要日期、消费习惯。不需要复杂的CRM系统，一个Excel表格或微信备注就够。记住客户的名字和偏好是最廉价也最有效的情感连接。",
        "checklist": [
          "为TOP50客户建个人画像",
          "记录姓名偏好和重要日期",
          "微信备注关键信息"
        ]
      },
      {
        "title": "关键时刻关怀",
        "content": "在客户人生的关键时刻给予关怀：生日送专属礼物（非券而是实物）、重大节日发祝福（非群发而是私聊）、客户提到的重要事情后续跟进问候。情感连接不是交易，是人与人之间的真实关怀。",
        "checklist": [
          "生日送专属实物礼物",
          "节日私聊祝福非群发",
          "跟进客户提到的重要事"
        ]
      },
      {
        "title": "个性化服务",
        "content": "用客户画像提供个性化服务：记住常点的菜提前准备、知道喜好主动推荐新品、了解忌口主动提醒。如“张姐您常点的红烧肉今天食材特别好，给您留着了“。这种被记住的感觉是最大的忠诚来源。",
        "checklist": [
          "记住常点菜提前准备",
          "根据偏好主动推荐",
          "用客户名字称呼"
        ]
      },
      {
        "title": "社区感营造",
        "content": "将门店营造为客户归属的“第三空间“：记住熟客的名字和故事、创造客户之间的连接（如介绍同兴趣的客户认识）、举办社区活动（读书会/品鉴会）。客户不是因为产品不走，是因为“这里的人“而不走。",
        "checklist": [
          "记住熟客名字和故事",
          "创造客户间连接",
          "定期举办社区活动"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_077",
    "title": "员工绩效激励改革法",
    "summary": "设计科学的绩效提成体系，激发员工积极性和主人翁意识",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-500元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "现有绩效诊断",
        "content": "评估现有绩效体系的问题：提成方式是否合理（按营业额还是利润）、提成比例是否有激励性、是否有团队协作激励、是否有成长空间。最常见的问题是“干多干少差不多“，缺乏差异化的激励。",
        "checklist": [
          "评估现有提成方式",
          "员工满意度匿名调查",
          "对标行业绩效标准"
        ]
      },
      {
        "title": "绩效方案设计",
        "content": "设计三级绩效方案：基础薪资保障基本生活、个人提成激励个人业绩（营业额提成3%-8%）、团队奖金激励协作（超额利润分享）。关键是要让“努力的人明显多赚“，拉开收入差距。",
        "checklist": [
          "设计三级绩效结构",
          "个人提成3%-8%",
          "设置团队超额利润分享"
        ]
      },
      {
        "title": "多元激励设计",
        "content": "除金钱外增加多元激励：月度优秀员工表彰、技能等级津贴（掌握技能越多时薪越高）、晋升通道透明化、弹性福利自选。不同员工被不同因素激励，多元覆盖比单一金钱激励更有效。",
        "checklist": [
          "设置月度表彰机制",
          "建立技能等级津贴",
          "设计弹性福利自选"
        ]
      },
      {
        "title": "绩效反馈优化",
        "content": "每月1对1绩效面谈：告知上月业绩和收入、肯定优点、指出改进方向、讨论下月目标。绩效不是扣钱的工具，而是帮助员工成长的框架。持续优化提成比例和考核指标，确保激励有效。",
        "checklist": [
          "每月1对1绩效面谈",
          "绩效作为成长框架",
          "持续优化考核指标"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_078",
    "title": "新人30天速成法",
    "summary": "建立标准化新人培训体系，让新人30天从零到独当一面",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-300元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "培训内容标准化",
        "content": "将岗位所需知识技能分解为标准化培训模块：产品知识（1-3天）、服务流程（2-3天）、操作技能（3-5天）、客户沟通（2-3天）、应急处理（1-2天）。每个模块有明确的学习目标和考核标准。",
        "checklist": [
          "分解岗位技能为5大模块",
          "每模块设学习目标和考核",
          "编写标准化培训手册"
        ]
      },
      {
        "title": "师徒带教机制",
        "content": "为每位新人指定1位资深员工作为师傅，负责30天全程带教。师傅有带教津贴（每月200-500元），新人出师后师傅获额外奖励。带教内容按周分解：第1周观察学习、第2周在指导下操作、第3周独立操作师傅旁站、第4周独立上岗。",
        "checklist": [
          "为新人指定带教师傅",
          "师傅获带教津贴和出师奖",
          "按4周阶段分解带教"
        ]
      },
      {
        "title": "阶段考核验收",
        "content": "每周末进行阶段考核：第1周产品知识笔试、第2周服务流程实操、第3周独立服务观察评分、第4周综合考核。考核不通过的延长带教1周，2次不通过考虑调岗或淘汰。",
        "checklist": [
          "设置4周阶段考核",
          "考核不通过延长带教",
          "2次不通过考虑调岗"
        ]
      },
      {
        "title": "新人留存关怀",
        "content": "新人流失率最高在第1个月，需特别关怀：每日师傅1次交流、每周店长1次面谈、融入团队活动（聚餐/团建）。让新人感受到“被需要、被关心、有成长“，30天内留存率目标80%以上。",
        "checklist": [
          "师傅每日1次交流",
          "店长每周1次面谈",
          "安排融入团队活动"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_079",
    "title": "员工流失预警与挽留法",
    "summary": "建立员工流失预警机制，在离职前及时干预挽留核心人才",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "流失信号识别",
        "content": "识别员工离职前的5大信号：工作积极性明显下降、频繁请假或迟到、不再参与团队活动、开始收拾个人物品、打听其他工作机会。发现2个以上信号应立即启动关注和沟通。",
        "checklist": [
          "培训管理者识别5大信号",
          "发现2个信号立即关注",
          "建立员工状态日常观察机制"
        ]
      },
      {
        "title": "流失原因分析",
        "content": "员工离职5大原因：薪资不满意、发展空间有限、管理方式不适、团队氛围不好、工作强度过大。通过匿名问卷和1对1面谈了解核心员工的真实想法，不要等到提离职才知道问题。",
        "checklist": [
          "开展匿名满意度调查",
          "店长每月1对1面谈核心员工",
          "分析主要流失原因"
        ]
      },
      {
        "title": "针对性挽留方案",
        "content": "根据离职原因提供针对性挽留：薪资问题→调薪或调整提成、发展问题→给新项目或晋升机会、管理问题→调整管理方式或换汇报线、氛围问题→改善团建和沟通、强度问题→优化排班或增人。挽留要真诚，不能只画饼不给实际。",
        "checklist": [
          "根据原因制定挽留方案",
          "方案要具体可兑现",
          "48小时内给出回应"
        ]
      },
      {
        "title": "留任后持续关注",
        "content": "成功挽留后不能松懈：1周后回访确认承诺兑现、1个月后再次沟通感受、3个月内重点关注其状态变化。如果同一员工2次提出离职，说明根因未解，需要从根本上改变。",
        "checklist": [
          "1周后确认承诺兑现",
          "1个月后再沟通感受",
          "3个月持续关注状态"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_080",
    "title": "门店SOP标准化管理法",
    "summary": "建立核心岗位标准操作流程，降低对个人经验依赖提升一致性",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-300元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "核心流程梳理",
        "content": "梳理门店5大核心流程：开店准备流程、客户接待流程、产品制作/服务流程、结账收银流程、闭店整理流程。每个流程按步骤分解，标注关键控制点和注意事项。",
        "checklist": [
          "梳理5大核心流程",
          "按步骤分解每个流程",
          "标注关键控制点"
        ]
      },
      {
        "title": "SOP文档编写",
        "content": "将每个流程编写成可视化SOP文档：步骤用图文结合展示、关键点用红色标注、错误操作用X标记。SOP要让新人看一遍就能上手，老员工看一遍能纠正偏差。每份SOP控制在1-2页。",
        "checklist": [
          "编写5份可视化SOP",
          "关键点红色标注",
          "每份控制在1-2页"
        ]
      },
      {
        "title": "SOP培训落地",
        "content": "全员SOP培训：逐个流程讲解+实操演练+考核验收。培训后1周内进行现场检查，观察员工是否按SOP执行。未执行的先了解原因（不理解/不方便/忘了），针对性解决。",
        "checklist": [
          "全员逐流程培训",
          "实操演练+考核",
          "1周后现场检查执行率"
        ]
      },
      {
        "title": "SOP持续优化",
        "content": "SOP不是写完就结束的，要持续优化：每月收集员工对SOP的改进建议、每季度review一次SOP合理性、遇到问题先查SOP是否覆盖再补完。好的SOP是“活的文档“，持续进化。",
        "checklist": [
          "每月收集SOP改进建议",
          "季度review合理性",
          "持续迭代优化SOP"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_081",
    "title": "团队文化建设法",
    "summary": "打造积极向上的团队文化，用文化凝聚力降低员工流失",
    "difficulty": "较难",
    "effectiveTime": "3-4周",
    "costRange": "200-1000元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "团队文化定义",
        "content": "与核心团队讨论确定3条团队价值观：如“客户第一““真诚协作““持续成长“。价值观不是挂在墙上的口号，而是每天的行为准则，所有人包括老板都要遵守。",
        "checklist": [
          "与核心团队讨论价值观",
          "确定3条团队价值观",
          "确保所有人认同并遵守"
        ]
      },
      {
        "title": "文化仪式设计",
        "content": "设计4个文化仪式：每日晨会（5分钟分享+激励）、每周表彰（优秀员工/进步之星）、每月团建（聚餐/活动/生日会）、季度总结（回顾+展望+奖励）。仪式感是文化的载体。",
        "checklist": [
          "建立每日晨会制度",
          "设置每周表彰仪式",
          "安排月度团建和季度总结"
        ]
      },
      {
        "title": "沟通机制建设",
        "content": "建立3层沟通机制：每日晨会沟通当日重点、每周例会沟通问题改进、每月1对1深度沟通个人发展。沟通要“听得见真话“，老板先坦诚才能换来员工坦诚。匿名意见箱是兜底通道。",
        "checklist": [
          "每日晨会沟通重点",
          "每周例会沟通问题",
          "每月1对1沟通发展"
        ]
      },
      {
        "title": "文化落地检查",
        "content": "定期检查文化是否真正落地：员工是否知道价值观是什么、日常行为是否符合价值观、违规是否被纠正。文化不是说的而是做的，老板以身作则是最强的文化信号。",
        "checklist": [
          "抽查员工价值观认知",
          "观察日常行为一致性",
          "老板以身作则示范"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_082",
    "title": "员工技能认证体系法",
    "summary": "建立多级技能认证体系，用技能成长驱动员工留任和提效",
    "difficulty": "中等",
    "effectiveTime": "2-4周",
    "costRange": "0-500元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "技能等级设计",
        "content": "设计3-4级技能等级：初级（基础操作，入门级薪资）、中级（独立操作+带新人，加薪10%）、高级（疑难处理+技能培训，加薪20%）、专家级（标准制定+技术攻关，加薪30%+分红）。每级有明确的技能清单和考核标准。",
        "checklist": [
          "设计3-4级技能等级",
          "每级设明确技能清单",
          "制定考核标准和薪资挂钩"
        ]
      },
      {
        "title": "认证考核体系",
        "content": "建立季度技能认证考核：理论笔试+实操考核+日常表现评分，三项综合达标方可升级。考核要公平透明，标准提前公布，结果公示接受申诉。避免“凭感觉评“，让每个人看到升级路径。",
        "checklist": [
          "设计季度认证考核",
          "理论+实操+日常综合评估",
          "标准公开结果公示"
        ]
      },
      {
        "title": "技能培训支持",
        "content": "为员工升级提供培训支持：每级配套培训课程和练习时间、师傅1对1指导、模拟考核练习。员工升级等于门店能力升级，培训投入是投资而非成本。",
        "checklist": [
          "配套各级培训课程",
          "安排师傅1对1指导",
          "提供模拟考核练习机会"
        ]
      },
      {
        "title": "技能价值体现",
        "content": "让技能价值在日常工作中有体现：高级员工负责带教和质检、专家级参与新品研发和标准制定、技能等级与排班优先权挂钩。让员工感到“技能越高越重要越受尊重“，而非“技能高只是多干活“。",
        "checklist": [
          "高级员工负责带教质检",
          "专家参与研发和标准制定",
          "技能等级与排班优先权挂钩"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_083",
    "title": "排班弹性优化法",
    "summary": "设计弹性排班制度，平衡员工需求和门店运营效率",
    "difficulty": "简单",
    "effectiveTime": "3-7天",
    "costRange": "0-100元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "排班痛点诊断",
        "content": "收集员工对现有排班的主要不满：排班不灵活无法调休、连续上班天数太多、高峰期排班不合理、个人时间被侵占。同时分析门店排班问题：闲时人员冗余、高峰人手不足、周末排班困难。",
        "checklist": [
          "收集员工排班不满",
          "分析门店排班效率问题",
          "找出双赢优化空间"
        ]
      },
      {
        "title": "弹性排班规则",
        "content": "制定弹性排班规则：每月25号前提交下月排班偏好、优先保障高峰时段全员在岗、闲时允许轮休调休、连续上班不超过5天、每月至少4天完整休息日。规则要公平透明，避免偏袒。",
        "checklist": [
          "制定排班偏好提交机制",
          "保障高峰全员在岗",
          "设置连续上班上限"
        ]
      },
      {
        "title": "调休互换机制",
        "content": "建立员工调休互换机制：提前3天申请调休、同岗位员工可互换班次、紧急情况有备用方案（兼职/店长顶岗）。调休不影响薪资，让员工有灵活度又保障门店运营。",
        "checklist": [
          "设计调休申请流程",
          "建立同岗互换机制",
          "准备紧急顶岗方案"
        ]
      },
      {
        "title": "排班效果评估",
        "content": "每月评估排班效果：员工满意度调查、各时段人效比分析、加班时长统计。满意度低于70%需调整排班规则，人效比低说明排班不合理，加班多说明人手不足。",
        "checklist": [
          "月度排班满意度调查",
          "分析各时段人效比",
          "统计加班时长优化人手"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_084",
    "title": "店长管理能力提升法",
    "summary": "系统提升店长管理能力，让店长成为门店运营的核心驱动力",
    "difficulty": "较难",
    "effectiveTime": "3-4周",
    "costRange": "500-2000元",
    "problemCodes": [
      "STAFF_HARD"
    ],
    "steps": [
      {
        "title": "管理能力诊断",
        "content": "评估店长在6个维度的管理能力：目标管理、团队激励、沟通协调、问题解决、数据分析、客户服务。通过自评+员工评价+老板评价360度诊断，找出最弱的2个维度重点提升。",
        "checklist": [
          "360度管理能力评估",
          "识别2个最弱维度",
          "制定针对性提升计划"
        ]
      },
      {
        "title": "管理技能培训",
        "content": "针对弱项进行专项培训：目标管理→学会分解目标和追踪进度、团队激励→学会认可和奖惩、沟通协调→学会1对1面谈和冲突处理。培训形式以实操+案例为主，每月1-2次。",
        "checklist": [
          "针对弱项设计培训",
          "实操+案例为主",
          "每月1-2次培训"
        ]
      },
      {
        "title": "管理工具赋能",
        "content": "为店长提供管理工具：每日运营检查清单、周度数据分析模板、员工1对1面谈模板、问题处理SOP。工具让管理有抓手，避免凭感觉管理。好的管理=正确的方法+趁手的工具+持续的习惯。",
        "checklist": [
          "制作运营检查清单",
          "设计数据分析模板",
          "提供1对1面谈模板"
        ]
      },
      {
        "title": "管理效果复盘",
        "content": "每月与店长复盘管理效果：团队绩效是否提升、员工流失率是否下降、客户满意度是否上升、门店运营是否更顺畅。好的管理效果会体现在数据上，店长需学会用数据证明管理价值。",
        "checklist": [
          "月度管理效果复盘",
          "用数据验证管理成效",
          "持续优化管理方法"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_085",
    "title": "小红书种草引流法",
    "summary": "在小红书持续种草输出，吸引同城目标客群到店消费",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-300元",
    "problemCodes": [
      "MARKETING_HARD",
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "账号定位与搭建",
        "content": "注册小红书企业号或个人号，账号定位为“本地XX品类推荐官“。完善资料：头像用门店logo或老板形象、简介写明品类和地址、背景图展示门店特色。账号人设要有温度，比官方号更亲切。",
        "checklist": [
          "注册小红书账号",
          "完善资料和定位",
          "建立有温度的人设"
        ]
      },
      {
        "title": "种草内容策划",
        "content": "策划3类种草内容：探店推荐（场景化展示门店体验）、产品测评（真实展示产品优势）、攻略干货（分享专业知识建立信任）。每篇笔记配5-9张高质量图片，标题用数字+痛点+解决方案公式。",
        "checklist": [
          "策划3类内容方向",
          "每篇5-9张高质量图",
          "标题用数字+痛点公式"
        ]
      },
      {
        "title": "本地标签运营",
        "content": "每篇笔记添加本地标签：#城市名+品类、#城市名+探店、#城市名+好店推荐。参与本地话题和同城活动，让同城用户搜索时能找到你。每周发布3-4篇，保持活跃度。",
        "checklist": [
          "添加本地标签3-5个",
          "参与本地话题",
          "每周发布3-4篇"
        ]
      },
      {
        "title": "互动转化引导",
        "content": "积极回复评论区咨询，私信引导到店：提供到店专属福利码、分享门店地址和导航、邀请体验并写反馈。评论区是流量入口，每条评论都认真回复，增加互动权重获得更多推荐。",
        "checklist": [
          "评论区积极互动回复",
          "私信引导到店+专属福利",
          "邀请体验写反馈"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_086",
    "title": "微信视频号运营法",
    "summary": "系统运营微信视频号，借助微信生态获取同城精准流量",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-300元",
    "problemCodes": [
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "视频号基础搭建",
        "content": "开通微信视频号，绑定公众号和企业微信。设置门店地址定位、完善简介（品类+地址+营业时间）、设计统一封面风格。视频号最大的优势是与微信生态无缝打通，直接触达微信好友和社群。",
        "checklist": [
          "开通视频号并绑定公众号",
          "完善地址和简介",
          "设计统一封面风格"
        ]
      },
      {
        "title": "内容栏目规划",
        "content": "规划3个固定内容栏目：制作过程类（展示专业度和品质）、知识分享类（建立专业权威）、客户故事类（口碑证言增加信任）。每个栏目每周1条，固定发布时间培养粉丝期待。",
        "checklist": [
          "规划3个内容栏目",
          "每栏目每周1条",
          "固定发布时间"
        ]
      },
      {
        "title": "同城流量获取",
        "content": "每条视频添加门店地理位置定位，使用同城话题标签。视频号会优先推送给同城和好友，所以前期发动员工和好友点赞评论增加初始互动量，帮助视频获得更多同城推荐。",
        "checklist": [
          "每条视频添加地理定位",
          "使用同城话题标签",
          "发动好友增加初始互动"
        ]
      },
      {
        "title": "私域转化闭环",
        "content": "视频号内容引导到私域：评论区置顶门店福利信息、主页挂载企业微信二维码、视频内引导“点击下方添加门店微信“。视频号是公域入口，微信是私域阵地，打通才能持续转化。",
        "checklist": [
          "评论区置顶福利信息",
          "主页挂载企业微信",
          "视频内引导加微信"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_087",
    "title": "口碑传播裂变法",
    "summary": "设计口碑传播机制，让满意客户主动为你传播带来新客",
    "difficulty": "简单",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "MARKETING_HARD",
      "TRAFFIC_LOW"
    ],
    "steps": [
      {
        "title": "传播诱因设计",
        "content": "设计让客户主动传播的诱因：拍照打卡送小礼品/折扣、写好评返现/送券、分享朋友圈集赞换福利。传播诱因要简单直接，客户3步内完成：拍照→发圈→领福利。",
        "checklist": [
          "设计拍照打卡奖励",
          "设置好评返现/送券",
          "分享集赞换福利方案"
        ]
      },
      {
        "title": "传播素材准备",
        "content": "为客户准备易于传播的素材：门店网红打卡点（背景墙/特色装置）、适合拍照的产品摆盘/包装、朋友圈文案模板和图片模板。素材越精美客户越愿意分享，降低传播门槛。",
        "checklist": [
          "设置网红打卡点",
          "优化产品拍照效果",
          "提供朋友圈文案模板"
        ]
      },
      {
        "title": "传播时机把握",
        "content": "在客户体验最好的时刻引导传播：产品刚上桌/刚完成时“好看吧？拍了发圈有福利哦“、客户表达满意时“太好了！帮我们分享一下更多人知道“。时机对了一半成功，别等客户体验消退再提。",
        "checklist": [
          "在体验最佳时刻引导",
          "话术自然不推销感",
          "培训员工把握时机"
        ]
      },
      {
        "title": "传播效果追踪",
        "content": "追踪口碑传播效果：每周统计打卡分享人数、新客来源中口碑推荐占比、口碑获客成本。优化传播机制：分享率低则优化诱因，到店率低则优化引导话术。",
        "checklist": [
          "统计每周打卡分享人数",
          "追踪口碑推荐新客占比",
          "持续优化传播机制"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_088",
    "title": "低成本地推营销法",
    "summary": "用最低成本做最高效的地面推广，精准触达目标客群",
    "difficulty": "简单",
    "effectiveTime": "3-5天",
    "costRange": "50-300元",
    "problemCodes": [
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "地推场景选择",
        "content": "选择目标客群聚集的3个场景：社区（居民客户）、商圈（白领客户）、学校（家长客户）。每个场景选择1-2个最佳触达点位和时间，比如社区晚上6-8点下班高峰。",
        "checklist": [
          "选择3个地推场景",
          "确定各场景最佳时段",
          "估算各场景人流量"
        ]
      },
      {
        "title": "低成本物料制作",
        "content": "地推物料不用花大钱：手写小黑板+粉笔（20元）、彩色A4传单打印（50元/500张）、小礼品（1-2元/个的贴纸/气球/试吃装）。关键是信息醒目+福利明确+行动指令清晰。",
        "checklist": [
          "制作手写小黑板",
          "打印彩色传单",
          "准备低成本小礼品"
        ]
      },
      {
        "title": "互动引流执行",
        "content": "地推不是发传单，是互动：用小黑板写“扫码免费领XX”、用小游戏（转盘/猜谜）吸引停留、用试吃试用降低体验门槛。停留5秒以上的人才有转化可能，纯发传单转化率不到1%。",
        "checklist": [
          "设计互动引流方式",
          "设置小游戏增加停留",
          "试吃试用降低门槛"
        ]
      },
      {
        "title": "加微留存转化",
        "content": "地推的终极目标不是当场成交而是加微信留存：所有福利通过微信领取、加微信送额外福利、拉群享持续优惠。地推获客→微信留存→持续运营→到店转化，形成完整链路。",
        "checklist": [
          "所有福利通过微信领取",
          "加微信送额外福利",
          "拉群享持续优惠"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_089",
    "title": "线上活动策划执行法",
    "summary": "策划和执行高参与度线上活动，低成本获取大量曝光和互动",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-500元",
    "problemCodes": [
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "活动类型选择",
        "content": "选择适合门店的线上活动类型：投票评选类（最受欢迎产品投票）、UGC征集类（晒图/故事征集）、互动游戏类（猜谜/答题/抽奖）、限时抢购类（群内限时秒杀）。选活动要看目的：要曝光选UGC，要转化选秒杀。",
        "checklist": [
          "确定活动目的和类型",
          "评估各类型可行性",
          "选择1-2个活动类型"
        ]
      },
      {
        "title": "活动方案设计",
        "content": "设计活动方案5要素：主题（有趣+相关）、规则（简单易懂3步内参与）、奖励（有吸引力阶梯式）、时间（3-7天不宜太长）、传播（如何让参与者帮忙扩散）。方案设计好先小范围测试再正式上线。",
        "checklist": [
          "设计活动5要素",
          "规则简单3步内参与",
          "先小范围测试再上线"
        ]
      },
      {
        "title": "活动预热推广",
        "content": "活动前3天开始预热：社群每日倒计时、朋友圈悬念海报、门店海报预告。预热要制造期待感而非直接暴露全部福利，“即将揭晓“比“XX元大奖“更能激发好奇心和参与欲。",
        "checklist": [
          "提前3天预热",
          "社群每日倒计时",
          "制造悬念和期待感"
        ]
      },
      {
        "title": "活动执行与复盘",
        "content": "活动期间每日公布参与数据维持热度，活动结束后公布结果并兑现奖励。复盘3个数据：参与人数、新增粉丝数、到店转化数。ROI=到店转化营收÷活动总成本，低于1:3需优化方案。",
        "checklist": [
          "活动期间每日公布数据",
          "活动后兑现奖励",
          "复盘参与/粉丝/转化数据"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_090",
    "title": "本地KOL合作推广法",
    "summary": "与本地自媒体和KOL合作，借助其影响力快速获取曝光",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "500-2000元",
    "problemCodes": [
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "KOL筛选评估",
        "content": "筛选本地生活类KOL：大众点评Lv7+达人、小红书同城博主、抖音同城达人、本地公众号博主。评估维度：粉丝数（1万+）、互动率（3%+）、调性匹配度、合作费用。不追求最大号，追求最精准的号。",
        "checklist": [
          "筛选5-10个本地KOL",
          "评估粉丝量和互动率",
          "确认调性与门店匹配"
        ]
      },
      {
        "title": "合作方案设计",
        "content": "设计KOL合作方案：探店体验（免费体验写真实评价）、专属福利（给KOL粉丝专属优惠码）、联合活动（KOL到店直播/互动）。合作方式比纯投放更有信任度，KOL的真实体验比广告更有说服力。",
        "checklist": [
          "设计探店体验方案",
          "设置KOL粉丝专属优惠",
          "策划联合活动方案"
        ]
      },
      {
        "title": "效果追踪评估",
        "content": "为每个KOL设置专属优惠码或链接，追踪其带来的到店人数和消费额。计算CPA（单客获取成本）=KOL合作费÷带来到店人数。CPA低于门店平均获客成本则合作有效，否则优化或更换KOL。",
        "checklist": [
          "设置KOL专属优惠码",
          "追踪到店人数和消费额",
          "计算CPA评估效果"
        ]
      },
      {
        "title": "长期关系维护",
        "content": "与效果好的KOL建立长期合作关系：季度合作套餐、优先体验新品、独家活动邀请。长期合作的KOL比一次性合作效果好3-5倍，因为粉丝信任度会随持续推荐而增强。",
        "checklist": [
          "建立长期合作KOL名单",
          "设计季度合作套餐",
          "提供新品优先体验权"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_091",
    "title": "大众点评优化运营法",
    "summary": "系统优化大众点评门店信息，提升搜索排名和到店转化率",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-500元",
    "problemCodes": [
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "门店信息完善",
        "content": "完善大众点评门店全部信息：高清门店照片（至少15张）、完整营业时间和地址、详细菜单/服务项目和价格、门店特色标签、停车信息。信息完整度直接影响搜索排名，缺失信息会被算法降权。",
        "checklist": [
          "上传15张以上高清照片",
          "完善营业时间和地址",
          "填写菜单和特色标签"
        ]
      },
      {
        "title": "评价管理体系",
        "content": "建立评价管理机制：每条好评当天回复感谢、每条差评2小时内回复致歉+解决方案、设置好评引导机制（到店客户扫码评价送小礼）。评分4.5分以上才能获得平台流量推荐。",
        "checklist": [
          "好评当天回复",
          "差评2h内回复处理",
          "设置好评引导机制"
        ]
      },
      {
        "title": "团购和优惠设置",
        "content": "设置2-3档团购套餐：引流款（低价走量拉新客）、利润款（正常毛利）、高端款（提升品牌形象）。配合代金券和优惠券使用。团购价要有竞争力，但不要低到亏本。",
        "checklist": [
          "设置2-3档团购套餐",
          "配合代金券使用",
          "团购价有竞争力不亏本"
        ]
      },
      {
        "title": "搜索排名优化",
        "content": "优化搜索排名3要素：关键词（门店名包含品类词+地名）、评价数量和质量（持续积累好评）、活跃度（经常更新动态和活动）。每月检查排名变化，排名下滑时加大评价管理和活动投放。",
        "checklist": [
          "优化门店名关键词",
          "持续积累好评",
          "定期更新门店动态"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_092",
    "title": "私域流量池构建法",
    "summary": "从零搭建微信私域流量池，实现零成本持续触达和转化客户",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-300元",
    "problemCodes": [
      "MARKETING_HARD"
    ],
    "steps": [
      {
        "title": "加粉渠道铺设",
        "content": "铺设4个加粉渠道：门店扫码加微信（桌牌+收银台+员工引导）、外卖包裹内加微卡、朋友圈广告加微入口、活动报名必须加微。目标每月新增200+微信好友。",
        "checklist": [
          "门店设置3处加微触点",
          "外卖包裹放加微卡",
          "目标月增200+好友"
        ]
      },
      {
        "title": "企业微信配置",
        "content": "使用企业微信管理客户：自动欢迎语+标签分组+朋友圈+群发功能。企业微信的优势是员工离职客户不丢失、可统一管理和运营、群发不限制人数。基础功能免费，够用。",
        "checklist": [
          "注册企业微信",
          "配置自动欢迎语",
          "设置客户标签体系"
        ]
      },
      {
        "title": "标签分层管理",
        "content": "给所有微信客户打标签：按消费频次（高频/中频/低频/沉睡）、按偏好（品类/时段/价位）、按来源（到店/外卖/推荐/地推）。标签越精细运营越精准，群发不骚扰不对的人。",
        "checklist": [
          "设计标签体系",
          "给现有客户打标签",
          "新客户入微即打标签"
        ]
      },
      {
        "title": "触达节奏设计",
        "content": "设计分层触达节奏：高频客户月2次专属推荐+1次活动邀请、中频客户周1次朋友圈触达+月1次优惠推送、低频客户月1次福利唤醒、沉睡客户季1次超值回归礼。避免过度打扰导致拉黑。",
        "checklist": [
          "设计4层触达节奏",
          "控制每月群发不超过4次",
          "朋友圈日更不超过2条"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_093",
    "title": "差异化竞争突围法",
    "summary": "从同质化价格战中突围，建立差异化竞争优势摆脱低价竞争",
    "difficulty": "较难",
    "effectiveTime": "2-4周",
    "costRange": "500-2000元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "竞争格局分析",
        "content": "绘制周边竞品地图：标注3-5家核心竞品的位置、品类、价格带、核心优势和弱点。找到竞争空白带：没人做的品类细分、没人服务的人群、没人提供的体验。空白带就是差异化的起点。",
        "checklist": [
          "绘制竞品地图",
          "标注3-5家竞品信息",
          "识别竞争空白带"
        ]
      },
      {
        "title": "差异化定位选择",
        "content": "从4个维度选择差异化定位：品类差异化（做细分品类第一）、品质差异化（做最好不是最便宜）、服务差异化（做最贴心）、场景差异化（做独特消费场景）。选择1个维度深扎，不要贪多。",
        "checklist": [
          "评估4个差异化维度",
          "选择1个维度深扎",
          "确保差异化有壁垒"
        ]
      },
      {
        "title": "差异化能力建设",
        "content": "围绕选定的差异化定位建设能力：品类差异化→深耕供应链和产品研发、品质差异化→升级原材料和工艺、服务差异化→培训团队和设计流程、场景差异化→改造空间和体验设计。能力建设要投入到位。",
        "checklist": [
          "围绕定位建设核心能力",
          "投入资源到位",
          "确保差异化可持续"
        ]
      },
      {
        "title": "差异化传播占位",
        "content": "将差异化变成客户心智中的占位：提炼一句差异化口号（如“XX街最好吃的牛肉面“）、所有传播素材统一强化这一定位、持续6个月以上不换定位。心智占位需要时间和一致性，切忌摇摆。",
        "checklist": [
          "提炼差异化口号",
          "全传播素材统一强化",
          "坚持6个月不换定位"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_094",
    "title": "价格战应对策略",
    "summary": "系统应对竞品价格战，在不伤利润的前提下守住客户",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "价格战态势评估",
        "content": "评估价格战的真实威胁：竞品降价幅度多大、影响了你多少客流、是短期促销还是长期策略。不要听到竞品降价就恐慌跟进，很多时候竞品降价对你的影响远没有想象中大。",
        "checklist": [
          "评估竞品降价幅度",
          "统计对我客流实际影响",
          "判断竞品是短期还是长期策略"
        ]
      },
      {
        "title": "非价格应对方案",
        "content": "优先用非价格手段应对：提升服务体验（竞品降价往往伴随服务下降）、增加附加价值（赠品/延保/售后）、强化情感连接（老客户专属关怀）。让客户觉得“虽然贵一点但更值“。",
        "checklist": [
          "制定服务提升方案",
          "设计附加价值权益",
          "强化老客户情感连接"
        ]
      },
      {
        "title": "精准价格应对",
        "content": "如需价格应对，做精准而非全面降价：只对竞品直接对标的产品做防御性定价、设置专属优惠卡（非公开降价避免价格战升级）、用套餐捆绑而非单品降价保持客单价。保护主力产品的价格体系。",
        "checklist": [
          "只对直接对标品做防御定价",
          "用优惠卡替代公开降价",
          "套餐捆绑代替单品降价"
        ]
      },
      {
        "title": "长期竞争壁垒",
        "content": "价格战本质是同质化竞争的结果，长远出路是建立非价格壁垒：客户关系壁垒（会员和社群锁定客户）、供应链壁垒（更低成本结构）、品牌壁垒（更高的客户信任度）、体验壁垒（不可复制的消费体验）。",
        "checklist": [
          "建立客户关系壁垒",
          "优化供应链降低成本",
          "打造不可复制的体验"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_095",
    "title": "竞品情报监控系统",
    "summary": "建立系统化的竞品情报监控机制，知己知彼提前应对竞争",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-200元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "监控对象确定",
        "content": "确定3-5家核心竞品作为重点监控对象：同一商圈同品类的直接竞品、跨界打劫的间接竞品（如便利店抢餐饮生意）、新进入者的潜在竞品。每家竞品建立档案卡记录基本信息。",
        "checklist": [
          "确定3-5家核心竞品",
          "建立竞品档案卡",
          "区分直接/间接/潜在竞品"
        ]
      },
      {
        "title": "情报采集渠道",
        "content": "建立4个情报采集渠道：定期到店消费体验（月1次）、线上平台追踪（大众点评/抖音/朋友圈）、行业信息和同行交流、客户反馈提及竞品信息。多渠道交叉验证确保情报准确。",
        "checklist": [
          "月度到店消费体验",
          "线上平台日常追踪",
          "收集客户提及竞品信息"
        ]
      },
      {
        "title": "情报分析框架",
        "content": "用5维分析框架处理竞品情报：产品（品类/新品/特色）、价格（定价/促销/套餐）、渠道（线上/线下/新增）、营销（活动/推广/口碑）、服务（体验/售后/会员）。每月形成竞品分析简报。",
        "checklist": [
          "按5维框架分析竞品",
          "月度形成竞品简报",
          "识别竞品最新变化趋势"
        ]
      },
      {
        "title": "应对决策机制",
        "content": "建立竞品变化→应对决策的机制：竞品上新→评估影响→决定跟进还是差异化、竞品降价→评估威胁→决定价格还是非价格应对、竞品新活动→评估效果→决定对标还是错位。决策要有速度，但不能冲动。",
        "checklist": [
          "建立竞品变化应对流程",
          "决策有速度不冲动",
          "每季度调整竞争策略"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_096",
    "title": "商圈联合抗竞法",
    "summary": "联合商圈内非竞争商家形成联盟，共同对抗外部大型竞品",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-500元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "联盟伙伴召集",
        "content": "召集商圈内5-8家非竞争但客群重叠的商家组建联盟。选择标准：品类互补、客群相似、老板配合意愿强、经营稳定。召开联盟成立会，确定联盟名称和共同目标。",
        "checklist": [
          "筛选5-8家联盟候选",
          "逐一沟通确认意向",
          "召开联盟成立会"
        ]
      },
      {
        "title": "联合会员体系",
        "content": "设计联盟联合会员：1张卡通享联盟所有商家优惠，会员消费积分通用。联合会员的吸引力远大于单店会员，“一张卡逛5家店“对客户极具价值。积分可在任意联盟商家兑换。",
        "checklist": [
          "设计联合会员权益",
          "积分通用通兑",
          "制作联合会员卡"
        ]
      },
      {
        "title": "联合活动策划",
        "content": "策划联盟联合活动：商圈购物节（联盟商家联合促销）、主题消费月（每月1个主题跨店联动）、联盟优惠券册（包含所有商家优惠的小册子）。联合活动的曝光量是单店的5-10倍。",
        "checklist": [
          "策划商圈购物节",
          "设计每月主题消费月",
          "制作联盟优惠券册"
        ]
      },
      {
        "title": "联盟运营管理",
        "content": "建立联盟运营机制：月度联盟例会、季度联合活动、积分结算规则、退出和加入机制。联盟成功的关键是利益均衡和规则透明，避免个别商家“占便宜不贡献“。",
        "checklist": [
          "建立月度例会制度",
          "制定积分结算规则",
          "设置公平的退出加入机制"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_097",
    "title": "客户锁定防竞法",
    "summary": "通过深度锁定客户关系，让客户不因竞品诱惑而流失",
    "difficulty": "中等",
    "effectiveTime": "2-3周",
    "costRange": "0-500元",
    "problemCodes": [
      "COMPETITION",
      "CUSTOMER_LOSS"
    ],
    "steps": [
      {
        "title": "客户锁定强度评估",
        "content": "评估当前客户锁定强度：会员储值占比多少、客户复购率多高、客户转介绍率多少。锁定强度低的客户最容易被竞品抢走。目标：会员储值占比>30%、月复购率>40%、转介绍率>15%。",
        "checklist": [
          "评估会员储值占比",
          "统计月度复购率",
          "测算客户转介绍率"
        ]
      },
      {
        "title": "储值锁客升级",
        "content": "升级储值锁客方案：提高储值赠送比例、增加储值专属权益（如储值客户享优先权/专属产品）、设置储值客户消费日特权。让客户“钱存在你这“，离开就有沉没成本，不会轻易走。",
        "checklist": [
          "提高储值赠送比例",
          "增加储值专属权益",
          "设置储值客户特权日"
        ]
      },
      {
        "title": "习惯锁客机制",
        "content": "设计消费习惯锁定机制：固定会员日养成到店习惯、订阅式消费（包月/包季）锁定长期消费、积分体系让客户舍不得离开（积分清零的恐惧>积分兑换的价值）。",
        "checklist": [
          "固定会员日养成习惯",
          "设计包月/包季订阅",
          "积分体系增加离开成本"
        ]
      },
      {
        "title": "情感锁客深化",
        "content": "深化情感锁客：记住客户的名字和偏好、在客户重要时刻给予关怀、创造客户与门店的情感记忆点。客户可以被更便宜的价格吸引走，但很难被从“有感情的地方“带走。情感是最深的锁。",
        "checklist": [
          "记住TOP客户名字和偏好",
          "客户重要时刻给关怀",
          "创造情感记忆点"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_098",
    "title": "蓝海市场开拓法",
    "summary": "跳出红海竞争开辟蓝海细分市场，在新赛道建立先发优势",
    "difficulty": "较难",
    "effectiveTime": "3-4周",
    "costRange": "1000-3000元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "蓝海机会识别",
        "content": "用“剔除-减少-增加-创造“四步法识别蓝海：剔除行业中理所当然但客户不在意的元素、减少过度提供的元素、增加客户重视但行业忽视的元素、创造行业从未提供的新价值。画出你的蓝海战略画布。",
        "checklist": [
          "完成四步法分析",
          "画出蓝海战略画布",
          "识别2-3个蓝海机会"
        ]
      },
      {
        "title": "细分市场选择",
        "content": "评估蓝海机会选择最具潜力的细分市场：市场规模足够支撑门店、竞争程度低、我有能力满足需求、客户愿意付费。优先选择“小而美“的细分市场，避免贪大求全。",
        "checklist": [
          "评估各蓝海机会潜力",
          "选择1个细分市场聚焦",
          "确认我有能力满足需求"
        ]
      },
      {
        "title": "蓝海产品开发",
        "content": "为蓝海细分市场开发专属产品线：如为健身人群开发低卡餐、为宝妈开发亲子烘焙课、为商务人群开发快速套餐。产品要精准匹配细分人群的特定需求，不是简单改个名字。",
        "checklist": [
          "开发细分人群专属产品",
          "产品精准匹配特定需求",
          "验证产品解决真实痛点"
        ]
      },
      {
        "title": "蓝海先发优势建立",
        "content": "在蓝海市场建立先发优势：快速占领客户心智（成为该细分品类的代名词）、建立社群和口碑壁垒、持续迭代产品巩固领先地位。先发优势的窗口期通常只有6-12个月，要快。",
        "checklist": [
          "快速占领细分品类心智",
          "建立社群口碑壁垒",
          "6个月内巩固先发地位"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_099",
    "title": "竞品弱点攻击法",
    "summary": "精准识别竞品弱点并针对性放大优势，抢夺竞品客户",
    "difficulty": "中等",
    "effectiveTime": "1-2周",
    "costRange": "0-300元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "竞品弱点侦察",
        "content": "通过3种方式侦察竞品弱点：消费体验（亲自去体验找问题）、客户反馈（收集从竞品转来的客户抱怨）、线上差评（分析竞品的差评集中点）。最常见的弱点：服务差、出品不稳定、环境脏乱、等位太久、售后无保障。",
        "checklist": [
          "亲自消费体验竞品",
          "收集从竞品转来的客户反馈",
          "分析竞品线上差评"
        ]
      },
      {
        "title": "针对性优势建设",
        "content": "针对竞品核心弱点建设自己的核心优势：竞品服务差→我打造极致服务、竞品出品不稳定→我做标准化品控、竞品等位久→我做预约制+快速通道。优势要直击竞品弱点，让竞品客户“对比之下选我“。",
        "checklist": [
          "针对竞品弱点建优势",
          "确保优势是竞品短期内无法模仿的",
          "宣传优势直击竞品弱点"
        ]
      },
      {
        "title": "竞品客户转化",
        "content": "设计竞品客户专属转化方案：凭竞品会员卡到店享专属优惠、“从XX店转过来的首单半价“、竞品客户专属体验活动。转化话术要尊重竞品不贬低，但突出“在我这里你能得到什么不同“。",
        "checklist": [
          "设计竞品客户专属优惠",
          "设置转店首单特惠",
          "话术尊重竞品突出差异"
        ]
      },
      {
        "title": "防守反击策略",
        "content": "竞品可能反击（模仿你或更激进降价），准备防守方案：持续升级优势保持领先、巩固老客户关系防止被反向抢客、监控竞品反击动作及时调整策略。竞争是动态的，要持续迭代。",
        "checklist": [
          "持续升级核心优势",
          "巩固老客户防被抢",
          "监控竞品反击动态"
        ]
      }
    ],
    "status": 1
  },
  {
    "_id": "sol_100",
    "title": "竞争壁垒长效建设法",
    "summary": "从长计议建设3层竞争壁垒，构建持续竞争力护城河",
    "difficulty": "较难",
    "effectiveTime": "1-3个月",
    "costRange": "1000-5000元",
    "problemCodes": [
      "COMPETITION"
    ],
    "steps": [
      {
        "title": "三层壁垒规划",
        "content": "规划3层竞争壁垒：第一层客户壁垒（会员体系+私域+情感连接）、第二层运营壁垒（供应链+标准化+数字化）、第三层品牌壁垒（口碑+心智占位+文化认同）。从第一层开始逐层建设，第一层3个月见效，第三层需要1年以上。",
        "checklist": [
          "规划3层壁垒建设路径",
          "从第一层客户壁垒开始",
          "设定各层时间节点"
        ]
      },
      {
        "title": "客户壁垒建设",
        "content": "建设客户壁垒核心3件事：会员体系让客户有沉没成本（储值+积分）、私域运营让客户有持续触达（微信+社群）、情感连接让客户有归属感（关怀+仪式+社区）。客户壁垒是最基础也最有效的护城河。",
        "checklist": [
          "完善会员储值和积分体系",
          "建立私域触达体系",
          "深化客户情感连接"
        ]
      },
      {
        "title": "运营壁垒建设",
        "content": "建设运营壁垒核心3件事：供应链优化获得成本优势（比竞品低10%-15%）、标准化运营保证品质一致（不依赖个人）、数字化管理提升效率和决策质量。运营壁垒让竞品“看得到学不会“。",
        "checklist": [
          "优化供应链降本10%-15%",
          "建设标准化运营体系",
          "引入数字化管理工具"
        ]
      },
      {
        "title": "品牌壁垒建设",
        "content": "建设品牌壁垒核心3件事：口碑积累（持续好评和客户证言）、心智占位（成为某品类的第一联想）、文化认同（客户认同门店价值观和生活方式）。品牌壁垒最难建但最持久，一旦建成竞品几乎无法撼动。",
        "checklist": [
          "持续积累好评和客户证言",
          "建立品类第一联想心智",
          "塑造客户认同的品牌文化"
        ]
      }
    ],
    "status": 1
  }
]

const cases = [
  {
    "_id": "case_001",
    "title": "社区餐厅3个月客流翻倍",
    "industry": "餐饮",
    "problemType": "没有客流",
    "effectData": "3个月日均客流从25人提升至58人，月营收增长130%",
    "background": "一家开在居民区的小面馆，开业半年日均客流不足30人，老板一度想关店。通过门头优化、社区渗透和线上铺设三管齐下，3个月实现客流翻倍。",
    "keyLessons": [
      "门头3秒原则：路人在3秒内能看出你卖什么，比漂亮更重要",
      "社区渗透是餐饮引流的基本功，周边1公里的住户就是你的基本盘",
      "线上铺设不求做得多好，先求有存在感，让搜到的人能找到你"
    ],
    "status": 1
  },
  {
    "_id": "case_002",
    "title": "服装店通过会员体系扭亏为盈",
    "industry": "零售",
    "problemType": "老客户流失",
    "effectData": "6个月会员贡献率从15%提升至55%，月营收增长80%",
    "background": "一家社区服装店，开业2年后老客户大量流失，月营收持续走低。通过建立3级会员体系、设计会员专属权益和转介绍机制，6个月实现会员贡献率大幅提升。",
    "keyLessons": [
      "会员不是打折卡，要给会员真正的专属价值感",
      "转介绍是最便宜的获客方式，但需要设计奖励机制",
      "会员运营需要坚持，至少3个月才能看到明显效果"
    ],
    "status": 1
  },
  {
    "_id": "case_003",
    "title": "美发店体验价引流到长期锁客",
    "industry": "服务业",
    "problemType": "没有客流",
    "effectData": "2个月新客到店增长200%，3个月储值客户占比达40%",
    "background": "一家开在商业街的美发店，因周边竞品多，新客一直不足。通过设计29.9元体验价引流、服务后3级回访和储值锁客，2个月新客翻倍。",
    "keyLessons": [
      "服务业的信任门槛最高，体验价是最有效的破冰手段",
      "服务后24h回访是留客关键，不做等于白引流",
      "储值锁客要设计好档位，首档门槛要低，高档位权益要够吸引"
    ],
    "status": 1
  },
  {
    "_id": "case_004",
    "title": "火锅店成本管控利润翻3倍",
    "industry": "餐饮",
    "problemType": "利润太低",
    "effectData": "6个月净利润率从3%提升至11%，月利润从3000元增至2.1万元",
    "background": "一家经营3年的社区火锅店，月营收6万但利润只有3%。通过食材成本精细化管控、菜单毛利优化和损耗治理，6个月利润率提升8个百分点。",
    "keyLessons": [
      "餐饮利润是管出来的不是卖出来的，成本管控比增收更直接",
      "每道菜都要算毛利，不知道毛利的菜品就是在亏钱",
      "损耗是最大的隐形成本，每天记录损耗就能减少一半"
    ],
    "status": 1
  },
  {
    "_id": "case_005",
    "title": "美容院绩效改革激活团队",
    "industry": "服务业",
    "problemType": "员工管理困难",
    "effectData": "3个月员工流失率从20%降至5%，人均产出提升60%",
    "background": "一家经营2年的美容院，技师频繁离职导致客户流失严重。通过建立技师分级认证、绩效提成改革和师徒带教机制，3个月团队稳定性和产出大幅提升。",
    "keyLessons": [
      "技师分级认证让员工看到成长空间，是留人的第一步",
      "底薪+手工+提成的薪酬结构让优秀技师收入翻倍",
      "师徒带教不仅加速新人成长，还增加了老员工的责任感和收入"
    ],
    "status": 1
  },
  {
    "_id": "case_006",
    "title": "甜品店招牌爆品战略",
    "industry": "餐饮",
    "problemType": "产品卖不动",
    "effectData": "2个月招牌爆品占总营收45%，整体客单价提升35%",
    "background": "一家社区甜品店，菜单30多种但缺少主打产品，客户选择困难。通过精简菜单至15种、打造1款招牌爆品和设计组合套餐，2个月实现爆品带动整体。",
    "keyLessons": [
      "做减法比做加法更有效，少即是多在产品上尤其明显",
      "招牌爆品要占营收40%以上才算真正打造成功",
      "爆品+套餐的组合是提升客单价最有效的手段"
    ],
    "status": 1
  },
  {
    "_id": "case_007",
    "title": "奶茶店抖音从0到月引200客",
    "industry": "餐饮",
    "problemType": "营销推广困难",
    "effectData": "3个月抖音粉丝从0到8000，月引流到店200+新客",
    "background": "一家大学城奶茶店，老板完全不懂线上营销。从开通抖音开始，坚持每天1条内容，3个月积累8000粉丝，月均引流200+新客到店。",
    "keyLessons": [
      "线上营销不怕从零开始，怕的是不开始",
      "坚持比创意更重要，持续发布比偶尔爆款更有效",
      "本地生活内容不用很专业，真实接地气更受欢迎"
    ],
    "status": 1
  },
  {
    "_id": "case_008",
    "title": "便利店差异化对抗连锁品牌",
    "industry": "零售",
    "problemType": "竞争压力大",
    "effectData": "6个月在3家连锁包围下营收逆势增长40%",
    "background": "一家社区便利店，周边新开了3家连锁便利店。通过引进独家商品、强化社区服务和建立会员体系，6个月在连锁包围下实现逆势增长。",
    "keyLessons": [
      "连锁做不到的就是你最大的优势：灵活、有人情味、可定制",
      "独家商品是差异化竞争的利器，让客户只能在你这买到",
      "社区信任是单店对抗连锁的最强护城河"
    ],
    "status": 1
  },
  {
    "_id": "case_009",
    "title": "李哥的烧烤摊3个月翻台率提升80%",
    "industry": "餐饮",
    "problemType": "没有客流",
    "effectData": "翻台率从1.2提升至2.16，月营收增长65%",
    "background": "李哥在城中村经营烧烤摊3年，周边年轻人多但生意一般，翻台率长期只有1.2。通过优化灯光氛围、大众点评好评运营和精简烤串品种，3个月翻台率大幅提升。",
    "keyLessons": [
      "夜宵摊灯光是第一引流要素，暖黄灯+串灯组合最能吸引路人",
      "大众点评好评直接影响30%的新客决策",
      "烤串品种不在多在精，15种足够覆盖需求"
    ],
    "status": 1
  },
  {
    "_id": "case_010",
    "title": "张叔的早餐铺半年日均客流从60人增至110人",
    "industry": "餐饮",
    "problemType": "没有客流",
    "effectData": "日均客流从60人增至110人，早高峰排队常态化",
    "background": "张叔在老小区门口开早餐铺5年，客流逐年下滑。通过增加现磨豆浆窗口、和物业合作送早餐上门、推出月卡锁定周边上班族，半年客流回升。",
    "keyLessons": [
      "早餐的竞争力在速度和便利，出餐快比味道好更关键",
      "与物业合作是社区店最直接的获客渠道",
      "月卡模式能把散客变稳定客，日均消费可预期"
    ],
    "status": 1
  },
  {
    "_id": "case_011",
    "title": "赵姐的家常菜馆营收止跌回升40%",
    "industry": "餐饮",
    "problemType": "营收下滑",
    "effectData": "月营收从4.2万回升至5.9万，周末翻台率提升50%",
    "background": "赵姐经营家常菜馆4年，去年起营收连续下滑，一度跌到4.2万。通过升级招牌菜、增加外卖渠道和周末家庭套餐，3个月止跌回升。",
    "keyLessons": [
      "营收下滑先查招牌菜是否老化，一道新招牌能拉动全店",
      "外卖不是分蛋糕而是做大蛋糕，堂食+外卖组合提升整体产出",
      "周末是家庭客高峰，专门设计的家庭套餐转化率远高于单点"
    ],
    "status": 1
  },
  {
    "_id": "case_012",
    "title": "周哥的小龙虾店旺季营收翻倍",
    "industry": "餐饮",
    "problemType": "营收下滑",
    "effectData": "旺季月营收从6万增至12万，淡季营收也提升30%",
    "background": "周哥开小龙虾店2年，旺季不旺、淡季更淡，月营收仅6万。通过增加夜间驻唱活动、开发冬季羊蝎子锅和线上限量预售，实现全年营收提升。",
    "keyLessons": [
      "餐饮营收不旺先看氛围，驻唱等活动能让客人多坐一小时",
      "淡季要有替代品，小龙虾配羊蝎子能做全年生意",
      "限量预售制造稀缺感，比打折更能提升转化"
    ],
    "status": 1
  },
  {
    "_id": "case_013",
    "title": "刘嫂的快餐店利润率从8%提到18%",
    "industry": "餐饮",
    "problemType": "利润太低",
    "effectData": "净利润率从8%提升至18%，月利润增加8000元",
    "background": "刘嫂在工厂区开快餐店1年半，日客流不错但利润只有8%。通过食材统采降本、精简低毛利菜品和减少浪费，半年利润率翻倍。",
    "keyLessons": [
      "快餐利润关键在食材成本，统采比零买便宜15%以上",
      "低毛利菜品果断砍掉，省下的备料时间和成本比营收更有价值",
      "后厨浪费占成本的10%-15%，日清日结是控损第一步"
    ],
    "status": 1
  },
  {
    "_id": "case_014",
    "title": "陈哥的馄饨店招牌三鲜馄饨带动全店",
    "industry": "餐饮",
    "problemType": "产品卖不动",
    "effectData": "招牌馄饨占总营收52%，整体客单价从12元提至18元",
    "background": "陈哥开馄饨店3年，菜单杂且无主打，客户常纠结半天。通过聚焦招牌三鲜馄饨、搭配小菜套餐和取消低销量品种，2个月实现爆品带动全店。",
    "keyLessons": [
      "菜单超过20种就该精简，顾客选择越少下单越快",
      "招牌品要够特别，别人做不了或做不好的才叫招牌",
      "爆品+小菜套餐是提升客单价最自然的方式"
    ],
    "status": 1
  },
  {
    "_id": "case_015",
    "title": "吴姐的米粉店老客复购率从20%提至55%",
    "industry": "餐饮",
    "problemType": "老客户流失",
    "effectData": "老客月复购率从20%提至55%，会员贡献营收占比60%",
    "background": "吴姐经营米粉店2年，周边新店分流严重，老客月复购率跌到20%。通过建立微信社群、设计周卡和会员专属加料，3个月老客大幅回归。",
    "keyLessons": [
      "餐饮老客靠习惯养，周卡比月卡更适合高频消费场景",
      "微信群是最低成本的老客触达渠道，但要控制发广告频率",
      "专属加料比打折更有价值感，客人觉得被特别对待"
    ],
    "status": 1
  },
  {
    "_id": "case_016",
    "title": "马哥的炒饭店抖音月引150新客到店",
    "industry": "餐饮",
    "problemType": "营销推广困难",
    "effectData": "3个月抖音粉丝6000+，月均引流150新客到店",
    "background": "马哥开炒饭店1年，从没做过线上推广。从拍颠勺视频开始做抖音，坚持日更+团购券，3个月积累6000粉丝，月均引流150+新客。",
    "keyLessons": [
      "餐饮短视频最吸睛的是制作过程，颠勺、火光都是天然素材",
      "抖音团购券是到店转化的关键，没有券流量就是浪费",
      "日更比周更效果好3倍，算法偏爱稳定产出"
    ],
    "status": 1
  },
  {
    "_id": "case_017",
    "title": "孙姐的童装店客流提升70%",
    "industry": "零售",
    "problemType": "没有客流",
    "effectData": "周末日均客流从15人增至25人，月营收增长55%",
    "background": "孙姐在社区开童装店3年，进店客流逐年减少。通过橱窗换季主题陈列、与幼儿园合作穿搭分享会和社区团购引流，3个月客流大幅回升。",
    "keyLessons": [
      "童装橱窗必须有时令感，换季陈列是天然促销信号",
      "幼儿园是童装精准客源地，合作一次胜发1000张传单",
      "社区团购把线上流量导到线下试穿，退货率远低于纯线上"
    ],
    "status": 1
  },
  {
    "_id": "case_018",
    "title": "郑哥的五金店营收回升35%",
    "industry": "零售",
    "problemType": "营收下滑",
    "effectData": "月营收从3.8万回升至5.1万，大客户复购率提升40%",
    "background": "郑哥经营社区五金店6年，线上分流导致营收持续下滑。通过开发装修工长期合作、增加水电小修上门服务和建立工地团购群，4个月营收回升。",
    "keyLessons": [
      "五金店的核心客户是装修工，抓住他们就是抓住终端消费者",
      "增加上门服务能把低频五金消费变中频服务消费",
      "工地团购群是批量出货渠道，一次成单顶零售半个月"
    ],
    "status": 1
  },
  {
    "_id": "case_019",
    "title": "钱姐的花店利润率从15%提到28%",
    "industry": "零售",
    "problemType": "利润太低",
    "effectData": "净利润率从15%提升至28%，损耗率从25%降至8%",
    "background": "钱姐开花店2年，损耗大导致利润低。通过按预售备花减少库存、主推高毛利永生花和设计包月鲜花订阅，半年利润率大幅提升。",
    "keyLessons": [
      "鲜花损耗是利润杀手，预售制能把损耗从25%降到10%以下",
      "永生花毛利是鲜花的3倍，且无损耗风险",
      "包月订阅锁定长期消费，客户粘性和收入稳定性同步提升"
    ],
    "status": 1
  },
  {
    "_id": "case_020",
    "title": "冯哥的文具店爆款引流全店业绩涨50%",
    "industry": "零售",
    "problemType": "产品卖不动",
    "effectData": "爆款文创占总营收35%，整体月营收增长50%",
    "background": "冯哥开文具店4年，传统文具销量下滑。通过引进网红文创产品、打造盲盒笔专区和学生手账体验角，2个月实现爆款带动整体。",
    "keyLessons": [
      "传统文具要靠新奇特产品引流，网红文创自带流量",
      "盲盒模式把低频文具消费变高频复购",
      "体验角让店铺从卖货变社交空间，学生停留时间翻倍"
    ],
    "status": 1
  },
  {
    "_id": "case_021",
    "title": "黄姐的母婴店差异化胜过3家连锁",
    "industry": "零售",
    "problemType": "竞争压力大",
    "effectData": "在3家连锁母婴店包围下营收逆势增长35%",
    "background": "黄姐经营母婴店3年，周边新开3家连锁。通过提供育儿咨询服务、独家引进进口小众品牌和建立妈妈社群，6个月实现差异化突围。",
    "keyLessons": [
      "连锁卖标准品，单店要卖专业服务和信任感",
      "育儿咨询是母婴店最强差异化，连锁做不到一对一服务",
      "妈妈社群是最好的口碑放大器，群内推荐转化率超60%"
    ],
    "status": 1
  },
  {
    "_id": "case_022",
    "title": "杨哥的手机维修店对抗品牌授权店",
    "industry": "零售",
    "problemType": "竞争压力大",
    "effectData": "月维修单量提升45%，老客转介绍率达30%",
    "background": "杨哥开手机维修店2年，品牌授权店入驻后客流锐减。通过透明维修直播、推出碎屏险和与周边商家异业联盟，4个月稳住并增长。",
    "keyLessons": [
      "维修行业信任是第一位，透明操作+直播修机建立信任最快",
      "碎屏险把一次性维修变长期关系，锁客效果远超会员卡",
      "异业联盟让周边商家互推客户，零成本获客"
    ],
    "status": 1
  },
  {
    "_id": "case_023",
    "title": "何姐的杂货店社群营销月营收增60%",
    "industry": "零售",
    "problemType": "营销推广困难",
    "effectData": "3个月社群人数达500+，月营收增长60%",
    "background": "何姐开社区杂货店5年，从没做过线上营销。从建小区购物群开始，每日推送特价+到店自提优惠，3个月社群驱动营收大幅增长。",
    "keyLessons": [
      "杂货店最该做的是小区购物群，距离近是天然优势",
      "每日特价+到店自提组合，比纯线上下单更促到店",
      "群运营关键是少发广告多发实用信息，比如天气提醒+应季推荐"
    ],
    "status": 1
  },
  {
    "_id": "case_024",
    "title": "林姐的瑜伽馆老客续卡率从30%提至65%",
    "industry": "服务业",
    "problemType": "老客户流失",
    "effectData": "老客续卡率从30%提至65%，月营收稳定在8万+",
    "background": "林姐开瑜伽馆3年，学员续卡率低导致营收不稳定。通过设计3阶课程体系、增加课后体测反馈和社群打卡激励，3个月续卡率翻倍。",
    "keyLessons": [
      "续卡率低要先看课程有没有成长感，3阶体系让学员看到进阶路径",
      "体测反馈是续卡最强说服力，数据比感受更有说服力",
      "社群打卡把个人练习变社交行为，出勤率提升40%"
    ],
    "status": 1
  },
  {
    "_id": "case_025",
    "title": "许哥的汽修店老客回店率从25%提至60%",
    "industry": "服务业",
    "problemType": "老客户流失",
    "effectData": "老客半年回店率从25%提至60%，保养项目营收翻倍",
    "background": "许哥经营汽修店4年，客户修完就走很少回来。通过建立保养提醒系统、推出年卡套餐和维修后3天回访，半年老客大幅回归。",
    "keyLessons": [
      "汽修是低频消费，不主动提醒客户不会回来",
      "保养年卡把低频变中频，一年4次进店是底线",
      "修后3天回访既是服务也是营销，回访客户下次选择率超70%"
    ],
    "status": 1
  },
  {
    "_id": "case_026",
    "title": "沈姐的美甲店技师稳定后营收涨45%",
    "industry": "服务业",
    "problemType": "员工管理困难",
    "effectData": "技师流失率从30%降至0，人均月产出提升45%",
    "background": "沈姐开美甲店1年半，技师频繁跳槽带走客户。通过改底薪+高提成制、师徒绑定分红和季度技能评级加薪，3个月实现零流失。",
    "keyLessons": [
      "美甲技师最看重收入，高提成比高底薪更有吸引力",
      "师徒绑定分红让老技师愿意带新人，团队扩张不再难",
      "技能评级加薪让技师有奔头，每升一级收入涨15%"
    ],
    "status": 1
  },
  {
    "_id": "case_027",
    "title": "韩哥的搬家队标准化后人效提升50%",
    "industry": "服务业",
    "problemType": "员工管理困难",
    "effectData": "人效提升50%，客户投诉率从15%降至2%",
    "background": "韩哥经营搬家队5年，工人管理混乱、服务投诉多。通过制定SOP流程、计件工资+好评奖和月度之星评选，3个月团队效率和服务质量双升。",
    "keyLessons": [
      "服务行业SOP是基础，标准化流程能把新手变熟手",
      "计件工资+好评奖组合激励，干得多干得好都加钱",
      "月度之星不用发大奖，荣誉感就是最好的非物质激励"
    ],
    "status": 1
  },
  {
    "_id": "case_028",
    "title": "曹姐的宠物店靠专业服务突围连锁围攻",
    "industry": "服务业",
    "problemType": "竞争压力大",
    "effectData": "在2家连锁宠物店旁营收增长30%，洗护预约排到3天后",
    "background": "曹姐开宠物店2年，周边新开2家连锁宠物店。通过提供一对一洗护服务、引进专业训犬课和建立宠物社群，6个月实现差异化突围。",
    "keyLessons": [
      "宠物主最在意安全和情感，一对一服务比连锁流水线更受欢迎",
      "训犬课是高附加值服务，连带洗护产品销售",
      "宠物社群是最好的口碑场，晒宠物就是晒你的服务"
    ],
    "status": 1
  },
  {
    "_id": "case_029",
    "title": "邓哥的洗车店小红书引流月增120新客",
    "industry": "服务业",
    "problemType": "营销推广困难",
    "effectData": "3个月小红书粉丝3000+，月引流120新客到店",
    "background": "邓哥开洗车店3年，一直靠路边自然客流。从拍洗车前后对比图开始做小红书，搭配会员体验券和定位标签，3个月线上引流效果显著。",
    "keyLessons": [
      "洗车前后对比图是小红书天然爆款内容，视觉冲击力强",
      "定位标签让3公里内的人搜到你是关键，本地生活要打地理标签",
      "体验券是线上到线下的桥梁，没有转化手段流量就是空转"
    ],
    "status": 1
  },
  {
    "_id": "case_030",
    "title": "方姐的推拿店客流从日均8人增至18人",
    "industry": "服务业",
    "problemType": "没有客流",
    "effectData": "日均客流从8人增至18人，月营收增长120%",
    "background": "方姐在写字楼区开推拿店1年，新客少且不稳定。通过午休快推30分钟套餐、企业团购合作和大众点评新客立减，3个月客流翻倍。",
    "keyLessons": [
      "写字楼区推拿的黄金时段是午休，30分钟快推切中需求",
      "企业团购一次搞定批量获客，1家企业等于20个稳定客源",
      "点评新客立减是破冰利器，服务业信任门槛高需要降低首次尝试成本"
    ],
    "status": 1
  }
]

const tools = [
  {
    "_id": "tool_001",
    "name": "客流追踪表",
    "category": "客流管理",
    "type": "表格模板",
    "description": "每日记录各时段进店人数、客户来源渠道和转化情况，用于分析客流规律和引流效果",
    "status": 1
  },
  {
    "_id": "tool_002",
    "name": "陈列规划模板",
    "category": "门店运营",
    "type": "表格模板",
    "description": "按区域规划陈列方案，包括主推品、关联陈列、动线引导，提升驻足率和连带率",
    "status": 1
  },
  {
    "_id": "tool_003",
    "name": "内容日历模板",
    "category": "营销推广",
    "type": "表格模板",
    "description": "月度内容发布规划，包括平台、内容主题、发布时间、素材准备，确保内容持续输出",
    "status": 1
  },
  {
    "_id": "tool_004",
    "name": "客户分层管理表",
    "category": "客户管理",
    "type": "表格模板",
    "description": "按消费频次和金额将客户分为3-5级，制定各级别差异化运营策略",
    "status": 1
  },
  {
    "_id": "tool_005",
    "name": "经营数据仪表盘",
    "category": "经营分析",
    "type": "表格模板",
    "description": "核心经营指标追踪表，包括营收、客流、客单价、复购率、利润率等关键指标",
    "status": 1
  },
  {
    "_id": "tool_006",
    "name": "成本管控追踪表",
    "category": "成本管理",
    "type": "表格模板",
    "description": "各项成本记录和目标对比表，包括食材/进货、人工、房租、能耗等，设置超支预警",
    "status": 1
  },
  {
    "_id": "tool_007",
    "name": "产品生命周期表",
    "category": "产品管理",
    "type": "表格模板",
    "description": "追踪各产品销量趋势和生命周期阶段，标记衰退品和新品表现，指导产品迭代",
    "status": 1
  },
  {
    "_id": "tool_008",
    "name": "员工培训与考核表",
    "category": "人员管理",
    "type": "表格模板",
    "description": "新员工培训计划和考核记录，包括培训内容、考核标准、上岗评定等",
    "status": 1
  },
  {
    "_id": "tool_009",
    "name": "绩效考核方案模板",
    "category": "人员管理",
    "type": "文档模板",
    "description": "包含考核指标设定、评分标准、提成方案和绩效面谈流程的完整模板",
    "status": 1
  },
  {
    "_id": "tool_010",
    "name": "营销活动策划模板",
    "category": "营销推广",
    "type": "文档模板",
    "description": "活动策划全流程模板，包含目标设定、方案设计、执行清单、预算分配和效果评估",
    "status": 1
  },
  {
    "_id": "tool_011",
    "name": "抖音探店脚本模板",
    "category": "营销",
    "type": "Word模板",
    "description": "探店短视频脚本编写指南，含开场话术、产品展示、引导到店三段式结构",
    "status": 1
  },
  {
    "_id": "tool_012",
    "name": "社群团购发布话术模板",
    "category": "营销",
    "type": "Word模板",
    "description": "微信群团购文案模板，包含预热话术、开团公告、催单话术和售后跟进",
    "status": 1
  },
  {
    "_id": "tool_013",
    "name": "员工排班与考勤优化表",
    "category": "管理",
    "type": "Excel模板",
    "description": "按客流峰谷智能排班，含时段客流权重、工时统计和加班预警",
    "status": 1
  },
  {
    "_id": "tool_014",
    "name": "新员工7天带教检查清单",
    "category": "管理",
    "type": "检查清单",
    "description": "新员工首周每日带教任务清单，含业务学习、实操考核和师徒签字确认",
    "status": 1
  },
  {
    "_id": "tool_015",
    "name": "月度损益分析表",
    "category": "财务",
    "type": "Excel模板",
    "description": "按科目归集月度收支，自动计算毛利率和净利率，同比环比一目了然",
    "status": 1
  },
  {
    "_id": "tool_016",
    "name": "现金流水周报模板",
    "category": "财务",
    "type": "Excel模板",
    "description": "按周记录现金收支明细，含日均流水、异常波动标记和周趋势折线图",
    "status": 1
  },
  {
    "_id": "tool_017",
    "name": "客户生命周期追踪表",
    "category": "客户",
    "type": "Excel模板",
    "description": "按客户记录首次到店、消费频次、最近消费和流失预警，辅助分层运营",
    "status": 1
  },
  {
    "_id": "tool_018",
    "name": "会员权益设计对比表",
    "category": "客户",
    "type": "Excel模板",
    "description": "3-5级会员权益对比，含折扣、赠品、专属服务设计，测算各级别投入产出比",
    "status": 1
  },
  {
    "_id": "tool_019",
    "name": "门店日常巡检操作指南",
    "category": "运营",
    "type": "操作指南",
    "description": "开店前/营业中/打烊后三阶段巡检要点，含卫生、陈列、设备、安全四大模块",
    "status": 1
  },
  {
    "_id": "tool_020",
    "name": "爆款产品孵化流程图",
    "category": "运营",
    "type": "PPT模板",
    "description": "从选品测试到全面推广的6步孵化流程，含选品标准、试销指标和放量决策节点",
    "status": 1
  }
]

const tags = [
  {
    "_id": "tag_001",
    "name": "引流获客",
    "type": "solution",
    "sortOrder": 1,
    "status": 1
  },
  {
    "_id": "tag_002",
    "name": "成本管控",
    "type": "solution",
    "sortOrder": 2,
    "status": 1
  },
  {
    "_id": "tag_003",
    "name": "产品优化",
    "type": "solution",
    "sortOrder": 3,
    "status": 1
  },
  {
    "_id": "tag_004",
    "name": "会员运营",
    "type": "solution",
    "sortOrder": 4,
    "status": 1
  },
  {
    "_id": "tag_005",
    "name": "团队管理",
    "type": "solution",
    "sortOrder": 5,
    "status": 1
  },
  {
    "_id": "tag_006",
    "name": "线上营销",
    "type": "solution",
    "sortOrder": 6,
    "status": 1
  },
  {
    "_id": "tag_007",
    "name": "差异化竞争",
    "type": "solution",
    "sortOrder": 7,
    "status": 1
  },
  {
    "_id": "tag_008",
    "name": "餐饮",
    "type": "industry",
    "sortOrder": 1,
    "status": 1
  },
  {
    "_id": "tag_009",
    "name": "零售",
    "type": "industry",
    "sortOrder": 2,
    "status": 1
  },
  {
    "_id": "tag_010",
    "name": "服务业",
    "type": "industry",
    "sortOrder": 3,
    "status": 1
  },
  {
    "_id": "tag_011",
    "name": "新店",
    "type": "stage",
    "sortOrder": 1,
    "status": 1
  },
  {
    "_id": "tag_012",
    "name": "成长期",
    "type": "stage",
    "sortOrder": 2,
    "status": 1
  },
  {
    "_id": "tag_013",
    "name": "老店",
    "type": "stage",
    "sortOrder": 3,
    "status": 1
  },
  {
    "_id": "tag_014",
    "name": "快速见效",
    "type": "difficulty",
    "sortOrder": 1,
    "status": 1
  },
  {
    "_id": "tag_015",
    "name": "系统提升",
    "type": "difficulty",
    "sortOrder": 2,
    "status": 1
  }
]

const adminUsers = [
  {
    "username": "admin",
    "passwordHash": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
    "role": "super_admin",
    "status": 1
  }
]

module.exports = { problems, symptoms, diagnosisPaths, solutions, cases, tools, tags, adminUsers }
