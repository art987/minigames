/**
 * 闪喵经营诊断 - 数据服务层
 * 统一封装所有HTTP API调用
 */

var BizDataService = {
  // API网关地址
  API_BASE: 'https://api.peacelove.top/biz',

  // 初始化（兼容旧调用，HTTP模式下无需初始化）
  init: function() {
    console.log('[BizData] 数据服务已就绪（HTTP API模式）');
  },

  // 通用HTTP请求
  request: async function(path, data) {
    try {
      var response = await fetch(this.API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data || {})
      });
      var result = await response.json();
      if (result.code === 0) {
        return { success: true, data: result.data };
      }
      return { success: false, message: result.message || '请求失败' };
    } catch (e) {
      console.error('[BizData] API请求失败:', path, e);
      return { success: false, message: e.message || '网络异常' };
    }
  },

  // ===== 问题相关 =====
  getProblemList: async function() {
    var result = await this.request('/problems');
    if (!result.success && typeof BizData !== 'undefined') {
      // 接口失败时使用本地数据
      var problems = [];
      if (Array.isArray(BizData.problems)) {
        problems = BizData.problems;
      } else {
        Object.keys(BizData.problems).forEach(function(key) {
          problems.push(BizData.problems[key]);
        });
      }
      return { success: true, data: problems };
    }
    return result;
  },

  // ===== 诊断相关 =====
  queryDiagnosis: async function(problemCode, industry, stage, symptomIds) {
    var result = await this.request('/diagnosis', {
      problemCode: problemCode,
      industry: industry,
      stage: stage,
      symptomIds: symptomIds || []
    });
    if (!result.success && typeof BizData !== 'undefined') {
      // 接口失败时使用本地诊断匹配
      return { success: true, data: BizUtils.matchDiagnosis(problemCode, industry, stage, symptomIds) };
    }
    return result;
  },

  // ===== 方案相关 =====
  getSolutionDetail: async function(solutionId) {
    // 方案详情暂从本地数据读取
    if (typeof BizData !== 'undefined') {
      var solution = BizData.solutions[solutionId];
      if (solution) {
        return { success: true, data: solution };
      }
    }
    return { success: false, message: '方案不存在' };
  },

  // ===== 案例相关 =====
  getCaseDetail: async function(caseId) {
    if (typeof BizData !== 'undefined') {
      var caseItem = BizData.cases[caseId];
      if (caseItem) {
        return { success: true, data: caseItem };
      }
    }
    return { success: false, message: '案例不存在' };
  },

  // ===== 工具相关 =====
  getToolDetail: async function(toolId) {
    if (typeof BizData !== 'undefined') {
      var tool = BizData.tools[toolId];
      if (tool) {
        return { success: true, data: tool };
      }
    }
    return { success: false, message: '工具不存在' };
  }
};

/**
 * 本地模拟数据（开发调试用）
 */
var BizLocalData = {
  problems: [
    {
      _id: 'p1',
      name: '没有客流',
      code: 'TRAFFIC_LOW',
      icon: 'user-x',
      color: '#FF6D00',
      description: '进店的人不够多',
      sortOrder: 100,
      diagnosisCount: 1283
    },
    {
      _id: 'p2',
      name: '营业额下降',
      code: 'REVENUE_DROP',
      icon: 'trending-down',
      color: '#EF4444',
      description: '收入不如以前了',
      sortOrder: 90,
      diagnosisCount: 987
    },
    {
      _id: 'p3',
      name: '利润太低',
      code: 'PROFIT_LOW',
      icon: 'wallet',
      color: '#F59E0B',
      description: '赚不到钱，白忙活',
      sortOrder: 80,
      diagnosisCount: 876
    },
    {
      _id: 'p4',
      name: '员工管理难',
      code: 'STAFF_HARD',
      icon: 'users-round',
      color: '#8B5CF6',
      description: '招不到、留不住、管不好',
      sortOrder: 70,
      diagnosisCount: 621
    },
    {
      _id: 'p5',
      name: '顾客流失',
      code: 'CUSTOMER_LOSS',
      icon: 'repeat',
      color: '#EC4899',
      description: '老客户越来越少',
      sortOrder: 60,
      diagnosisCount: 734
    },
    {
      _id: 'p6',
      name: '竞争压力大',
      code: 'COMPETITION',
      icon: 'alert-triangle',
      color: '#6366F1',
      description: '对手太多太强',
      sortOrder: 50,
      diagnosisCount: 543
    },
    {
      _id: 'p7',
      name: '不会做营销',
      code: 'NO_MARKETING',
      icon: 'bar-chart-3',
      color: '#14B8A6',
      description: '想做不会做，做了没效果',
      sortOrder: 40,
      diagnosisCount: 856
    },
    {
      _id: 'p8',
      name: '其他问题',
      code: 'OTHER',
      icon: 'search',
      color: '#6B7280',
      description: '以上都不是，看看别的',
      sortOrder: 0,
      diagnosisCount: 234
    }
  ],

  industries: [
    { code: '通用', name: '通用', icon: 'star', group: '' },
    { code: '餐厅', name: '餐厅', icon: 'utensils', group: '餐饮美食' },
    { code: '奶茶茶饮', name: '奶茶茶饮', icon: 'cup-soda', group: '餐饮美食' },
    { code: '烧烤烤串', name: '烧烤烤串', icon: 'flame', group: '餐饮美食' },
    { code: '火锅店', name: '火锅店', icon: 'soup', group: '餐饮美食' },
    { code: '面馆小吃', name: '面馆小吃', icon: 'noodle', group: '餐饮美食' },
    { code: '烘焙蛋糕', name: '烘焙蛋糕', icon: 'cake-slice', group: '餐饮美食' },
    { code: '咖啡甜品', name: '咖啡甜品', icon: 'coffee', group: '餐饮美食' },
    { code: '酒吧清吧', name: '酒吧清吧', icon: 'beer', group: '餐饮美食' },
    { code: '西餐披萨', name: '西餐披萨', icon: 'pizza', group: '餐饮美食' },
    { code: '早餐店', name: '早餐店', icon: 'croissant', group: '餐饮美食' },
    { code: '包子铺', name: '包子铺', icon: 'steaming-bowl', group: '餐饮美食' },
    { code: '麻辣烫', name: '麻辣烫', icon: 'cooking-pot', group: '餐饮美食' },
    { code: '快餐简餐', name: '快餐简餐', icon: 'sandwich', group: '餐饮美食' },
    { code: '水果生鲜', name: '水果生鲜', icon: 'grape', group: '零售购物' },
    { code: '服饰鞋包', name: '服饰鞋包', icon: 'shirt', group: '零售购物' },
    { code: '饰品珠宝', name: '饰品珠宝', icon: 'gem', group: '零售购物' },
    { code: '母婴用品', name: '母婴用品', icon: 'baby', group: '零售购物' },
    { code: '美妆护肤', name: '美妆护肤', icon: 'lipstick', group: '零售购物' },
    { code: '数码家电', name: '数码家电', icon: 'smartphone', group: '零售购物' },
    { code: '药店药房', name: '药店药房', icon: 'pill', group: '零售购物' },
    { code: '绘画艺术', name: '绘画艺术', icon: 'palette', group: '教育培训' },
    { code: '音乐乐器', name: '音乐乐器', icon: 'music', group: '教育培训' },
    { code: '舞蹈培训', name: '舞蹈培训', icon: 'person-standing', group: '教育培训' },
    { code: '学科辅导', name: '学科辅导', icon: 'book-open', group: '教育培训' },
    { code: '武术跆拳道', name: '武术跆拳道', icon: 'sword', group: '教育培训' },
    { code: '驾考培训', name: '驾考培训', icon: 'car', group: '教育培训' },
    { code: '美容美甲', name: '美容美甲', icon: 'sparkle', group: '美容健康' },
    { code: '美发造型', name: '美发造型', icon: 'scissors', group: '美容健康' },
    { code: 'SPA养生', name: 'SPA养生', icon: 'flame-kindling', group: '美容健康' },
    { code: '瑜伽健身', name: '瑜伽健身', icon: 'yoga', group: '美容健康' },
    { code: '口腔眼科', name: '口腔眼科', icon: 'smile', group: '美容健康' },
    { code: '汽车服务', name: '汽车服务', icon: 'car', group: '生活服务' },
    { code: '房产装修', name: '房产装修', icon: 'home', group: '生活服务' },
    { code: '家政保洁', name: '家政保洁', icon: 'sparkles', group: '生活服务' },
    { code: '家电维修', name: '家电维修', icon: 'tv', group: '生活服务' },
    { code: '家居办公', name: '家居办公', icon: 'sofa', group: '生活服务' },
    { code: '建筑工程', name: '建筑工程', icon: 'hard-hat', group: '生活服务' },
    { code: 'KTV娱乐', name: 'KTV娱乐', icon: 'mic', group: '娱乐休闲' },
    { code: '电影网吧', name: '电影网吧', icon: 'clapboard', group: '娱乐休闲' },
    { code: '桌游密室', name: '桌游密室', icon: 'dice-5', group: '娱乐休闲' },
    { code: '儿童乐园', name: '儿童乐园', icon: 'ferris-wheel', group: '娱乐休闲' },
    { code: '旅游酒店', name: '旅游酒店', icon: 'plane', group: '娱乐休闲' },
    { code: '广告印刷', name: '广告印刷', icon: 'printer', group: '其他行业' },
    { code: '茶叶烟酒', name: '茶叶烟酒', icon: 'leaf', group: '其他行业' },
    { code: '花店花卉', name: '花店花卉', icon: 'flower-2', group: '其他行业' },
    { code: '直播', name: '直播', icon: 'video', group: '其他行业' },
    { code: '知识付费', name: '知识付费', icon: 'graduation-cap', group: '其他行业' },
    { code: '运动休闲', name: '运动休闲', icon: 'target', group: '其他行业' },
    { code: '心理咨询', name: '心理咨询', icon: 'brain', group: '其他行业' },
    { code: '加油站', name: '加油站', icon: 'fuel', group: '其他行业' }
  ],

  stages: [
    { code: '新店', name: '新店', icon: '🆕', desc: '开业不到3个月', sub: '刚起步，还在摸索' },
    { code: '成长期', name: '成长期', icon: '📈', desc: '经营3个月到1年', sub: '有起色，但遇到瓶颈' },
    { code: '老店', name: '老店', icon: '🏪', desc: '经营1年以上', sub: '稳定了，但增长乏力' }
  ],

  symptoms: {
    'TRAFFIC_LOW': [
      { _id: 's1', name: '路过的人少', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's2', name: '有人看但不进店', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's3', name: '进店但不消费', industryFilter: ['餐饮', '零售'], stageFilter: ['all'] },
      { _id: 's4', name: '老客户减少', industryFilter: ['all'], stageFilter: ['成长期', '老店'] },
      { _id: 's5', name: '周边没有目标客群', industryFilter: ['all'], stageFilter: ['新店'] }
    ],
    'REVENUE_DROP': [
      { _id: 's10', name: '客单价低', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's11', name: '复购率低', industryFilter: ['all'], stageFilter: ['成长期', '老店'] },
      { _id: 's12', name: '旺季不旺', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's13', name: '闲时太空', industryFilter: ['餐饮', '服务'], stageFilter: ['all'] },
      { _id: 's14', name: '忙时服务跟不上', industryFilter: ['餐饮', '服务'], stageFilter: ['all'] }
    ],
    'PROFIT_LOW': [
      { _id: 's20', name: '成本太高', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's21', name: '定价不合理', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's22', name: '损耗浪费大', industryFilter: ['餐饮', '零售'], stageFilter: ['all'] },
      { _id: 's23', name: '促销过度', industryFilter: ['all'], stageFilter: ['成长期', '老店'] },
      { _id: 's24', name: '隐性成本多', industryFilter: ['all'], stageFilter: ['老店'] }
    ],
    'STAFF_HARD': [
      { _id: 's30', name: '招不到人', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's31', name: '留不住人', industryFilter: ['all'], stageFilter: ['成长期', '老店'] },
      { _id: 's32', name: '积极性差', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's33', name: '服务态度差', industryFilter: ['餐饮', '服务'], stageFilter: ['all'] },
      { _id: 's34', name: '培训不到位', industryFilter: ['all'], stageFilter: ['新店', '成长期'] }
    ],
    'CUSTOMER_LOSS': [
      { _id: 's40', name: '回头客少', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's41', name: '差评增多', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's42', name: '会员不活跃', industryFilter: ['all'], stageFilter: ['成长期', '老店'] },
      { _id: 's43', name: '顾客转竞争对手', industryFilter: ['all'], stageFilter: ['成长期', '老店'] }
    ],
    'COMPETITION': [
      { _id: 's50', name: '周边新开同类店', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's51', name: '对手价格更低', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's52', name: '对手活动更多', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's53', name: '差异化不够', industryFilter: ['all'], stageFilter: ['all'] }
    ],
    'NO_MARKETING': [
      { _id: 's60', name: '从没做过活动', industryFilter: ['all'], stageFilter: ['新店'] },
      { _id: 's61', name: '活动做了没效果', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's62', name: '不懂线上推广', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's63', name: '预算有限', industryFilter: ['all'], stageFilter: ['all'] },
      { _id: 's64', name: '没时间做营销', industryFilter: ['all'], stageFilter: ['all'] }
    ],
    'OTHER': [
      { _id: 's70', name: '位置不好', industryFilter: ['all'], stageFilter: ['新店'] },
      { _id: 's71', name: '房租太高', industryFilter: ['all'], stageFilter: ['成长期', '老店'] },
      { _id: 's72', name: '想转型不知道怎么转', industryFilter: ['all'], stageFilter: ['老店'] },
      { _id: 's73', name: '供应链不稳定', industryFilter: ['餐饮', '零售'], stageFilter: ['all'] }
    ]
  },

  // 示例诊断结果
  diagnosisResult: {
    judgment: '你的门店引流能力不足，导致客流量低于行业平均水平。',
    severity: 72,
    causes: [
      { name: '门头不够醒目', weight: 85, judgment: '站在马路对面3秒内能说出店名和主营吗？', description: '门头是门店最大的免费广告位，80%的过路客是通过门头决定是否进店的。' },
      { name: '缺少线上引流渠道', weight: 72, judgment: '附近的人在网上能找到你的店吗？', description: '现在超过60%的新客是通过线上渠道发现门店的。' },
      { name: '没有复购机制', weight: 58, judgment: '来过的客人有理由再来吗？', description: '没有复购机制意味着每次都要花成本获取新客。' }
    ],
    solutions: [
      { _id: 'sol1', title: '门店引流三板斧', summary: '门头改造+线上开通+复购机制三步走', difficulty: '简单', effectiveTime: '3-7天', costRange: '0-500元' },
      { _id: 'sol2', title: '线上引流入门指南', summary: '抖音+小红书+美团三平台快速上手', difficulty: '中等', effectiveTime: '1-2周', costRange: '0-300元' }
    ],
    todayTasks: [
      { task: '拍一张自己店铺门头照片', duration: '5分钟', purpose: '客观评估门头吸引力' },
      { task: '在抖音搜索同行业附近店铺', duration: '10分钟', purpose: '看同行是怎么做引流的' },
      { task: '统计昨日进店人数和成交人数', duration: '5分钟', purpose: '建立基础数据意识' }
    ],
    weekPlan: [
      { day: 1, title: '诊断日', tasks: ['拍门头照片对比竞品', '统计昨日客流数据', '列出周边3家竞品优势'] },
      { day: 2, title: '改造日', tasks: ['优化门头文字和颜色', '增加门口引流物（展架/音响）', '设置进店有礼活动'] },
      { day: 3, title: '线上日', tasks: ['开通抖音商家号', '拍摄第一条门店短视频', '创建微信社群'] },
      { day: 4, title: '社群日', tasks: ['邀请今日进店客人加群', '发布群内首条优惠', '设计群内每日互动话题'] },
      { day: 5, title: '活动日', tasks: ['策划周末促销活动', '制作活动海报', '群内+朋友圈同步宣传'] },
      { day: 6, title: '优化日', tasks: ['复盘本周客流变化', '分析哪个渠道引流最多', '调整下周引流策略'] },
      { day: 7, title: '复盘日', tasks: ['对比一周前进店人数', '筛选有效引流方式', '制定下周改善计划'] }
    ],
    cases: [
      { _id: 'case1', title: '张姐的火锅店30天客流翻倍', industry: '餐饮', effectData: '客流+117%' }
    ],
    tools: [
      { _id: 'tool1', name: '客流统计表', category: '运营', type: 'Excel模板' },
      { _id: 'tool2', name: '活动策划表', category: '营销', type: 'Excel模板' },
      { _id: 'tool3', name: '社群运营表', category: '客户', type: 'Excel模板' }
    ]
  }
};
