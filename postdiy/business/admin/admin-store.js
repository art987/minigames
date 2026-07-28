/**
 * 管理后台数据持久化模块
 * 使用 localStorage 持久化管理后台的数据修改
 */

var AdminStore = {
  // 数据版本（每次数据结构变更时递增，使旧缓存自动失效）
  VERSION: 3,

  // localStorage 键名（带版本号）
  KEYS: {
    CASES: 'admin_cases_v3',
    TOOLS: 'admin_tools_v3',
    TAGS: 'admin_tags_v3',
    PROBLEMS: 'admin_problems_v3',
    SOLUTIONS: 'admin_solutions_v3',
    PATHS: 'admin_paths_v3'
  },

  /**
   * 加载数据：优先从localStorage读取，没有则使用BizData默认值
   */
  load: function(key, defaultData) {
    try {
      var stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('读取localStorage失败:', e);
    }
    return defaultData || [];
  },

  /**
   * 保存数据到localStorage
   */
  save: function(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('保存到localStorage失败:', e);
      return false;
    }
  },

  /**
   * 清除所有管理后台数据，恢复默认值
   */
  clearAll: function() {
    Object.values(this.KEYS).forEach(function(key) {
      localStorage.removeItem(key);
    });
    // 清理旧版本缓存
    var oldKeys = ['admin_cases','admin_tools','admin_tags','admin_problems','admin_solutions','admin_paths'];
    oldKeys.forEach(function(key) { localStorage.removeItem(key); });
  },

  /**
   * 获取案例数据
   */
  getCases: function() {
    return this.load(this.KEYS.CASES, BizData.cases || []);
  },

  /**
   * 保存案例数据
   */
  saveCases: function(data) {
    return this.save(this.KEYS.CASES, data);
  },

  /**
   * 获取工具数据
   */
  getTools: function() {
    return this.load(this.KEYS.TOOLS, BizData.tools || []);
  },

  /**
   * 保存工具数据
   */
  saveTools: function(data) {
    return this.save(this.KEYS.TOOLS, data);
  },

  /**
   * 获取标签数据
   */
  getTags: function() {
    return this.load(this.KEYS.TAGS, this.getDefaultTags());
  },

  /**
   * 保存标签数据
   */
  saveTags: function(data) {
    return this.save(this.KEYS.TAGS, data);
  },

  /**
   * 获取问题数据
   */
  getProblems: function() {
    return this.load(this.KEYS.PROBLEMS, BizData.problems || []);
  },

  /**
   * 保存问题数据
   */
  saveProblems: function(data) {
    return this.save(this.KEYS.PROBLEMS, data);
  },

  /**
   * 获取方案数据
   */
  getSolutions: function() {
    return this.load(this.KEYS.SOLUTIONS, BizData.solutions || []);
  },

  /**
   * 保存方案数据
   */
  saveSolutions: function(data) {
    return this.save(this.KEYS.SOLUTIONS, data);
  },

  /**
   * 获取诊断路径数据
   */
  getPaths: function() {
    return this.load(this.KEYS.PATHS, BizData.diagnosisPaths || []);
  },

  /**
   * 保存诊断路径数据
   */
  savePaths: function(data) {
    return this.save(this.KEYS.PATHS, data);
  },

  /**
   * 默认标签数据
   */
  getDefaultTags: function() {
    return [
      { _id: 'tag_001', name: '餐饮', type: 'industry', status: 'active' },
      { _id: 'tag_002', name: '零售', type: 'industry', status: 'active' },
      { _id: 'tag_003', name: '服务业', type: 'industry', status: 'active' },
      { _id: 'tag_004', name: '新店', type: 'stage', status: 'active' },
      { _id: 'tag_005', name: '成长期', type: 'stage', status: 'active' },
      { _id: 'tag_006', name: '老店', type: 'stage', status: 'active' },
      { _id: 'tag_007', name: '没有客流', type: 'problem', status: 'active' },
      { _id: 'tag_008', name: '营业额下降', type: 'problem', status: 'active' },
      { _id: 'tag_009', name: '利润太低', type: 'problem', status: 'active' }
    ];
  }
};