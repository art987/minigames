/**
 * 闪喵经营诊断 - 工具函数
 */

var BizUtils = {
  // ===== 图标渲染（Lucide 单色线条图标） =====
  // 渲染 Lucide SVG 图标，name 为图标名，size 为像素，classStr 为额外 class
  icon: function(name, size, classStr) {
    if (!name) return '';
    size = size || 20;
    classStr = classStr || '';
    return '<i data-lucide="' + name + '" class="biz-icon ' + classStr + '" style="width:' + size + 'px;height:' + size + 'px;"></i>';
  },

  // 批量替换页面中所有 data-lucide 图标为 SVG（在DOM更新后调用）
  replaceIcons: function() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  // 格式化数字（如 1283 → 1,283）
  formatNumber: function(num) {
    if (num === undefined || num === null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // 生成唯一ID
  genId: function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  },

  // 获取URL参数
  getParam: function(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },

  // 保存诊断流程状态
  saveDiagnosisState: function(state) {
    try {
      sessionStorage.setItem('biz_diagnosis_state', JSON.stringify(state));
    } catch (e) {
      console.warn('保存状态失败', e);
    }
  },

  // 读取诊断流程状态
  loadDiagnosisState: function() {
    try {
      var data = sessionStorage.getItem('biz_diagnosis_state');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  // 清除诊断流程状态
  clearDiagnosisState: function() {
    sessionStorage.removeItem('biz_diagnosis_state');
  },

  // 显示Toast提示
  showToast: function(message, duration) {
    duration = duration || 2000;
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;pointer-events:none;';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, duration);
  },

  // 严重程度对应颜色
  getSeverityColor: function(severity) {
    if (severity <= 33) return '#10B981';
    if (severity <= 66) return '#F59E0B';
    if (severity <= 85) return '#FF6D00';
    return '#EF4444';
  },

  // 严重程度对应文字
  getSeverityLabel: function(severity) {
    if (severity <= 33) return '轻度';
    if (severity <= 66) return '中等';
    if (severity <= 85) return '中高';
    return '严重';
  },

  // ===== 共享登录系统（与海报系统共用） =====
  // 优先读取海报系统登录态，回退到经营诊断自有登录态
  getSharedUser: function() {
    // 1. 先检查海报系统登录态
    try {
      var postdiyUserId = localStorage.getItem('postdiy_user_id');
      var postdiyUserInfo = localStorage.getItem('postdiy_user_info');
      if (postdiyUserId && postdiyUserInfo) {
        var info = JSON.parse(postdiyUserInfo);
        // 同步到经营诊断的登录信息
        var bizUser = {
          userId: postdiyUserId,
          phone: info.phone || info.nickname || '',
          nickname: info.nickname || info.phone || '',
          brandname: info.brandname || ''
        };
        localStorage.setItem('biz_user_info', JSON.stringify(bizUser));
        return bizUser;
      }
    } catch (e) {
      console.warn('读取海报系统登录态失败', e);
    }
    // 2. 回退到经营诊断自有登录态
    try {
      var bizInfo = localStorage.getItem('biz_user_info');
      return bizInfo ? JSON.parse(bizInfo) : null;
    } catch (e) {
      return null;
    }
  },

  // 获取共享的商家名称（海报 brandname 优先）
  getSharedShopName: function() {
    var user = this.getSharedUser();
    if (user && user.brandname) return user.brandname;
    // 回退到 biz_shop_profile
    try {
      var profile = localStorage.getItem('biz_shop_profile');
      if (profile) {
        var p = JSON.parse(profile);
        if (p.shopName) return p.shopName;
      }
    } catch (e) {}
    return '';
  },

  // 检查是否已登录（任一系统登录即可）
  isLoggedIn: function() {
    return !!(localStorage.getItem('postdiy_user_id') || localStorage.getItem('biz_user_info'));
  }
};
