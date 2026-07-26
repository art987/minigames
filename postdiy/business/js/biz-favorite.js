/**
 * 闪喵经营诊断 - 收藏管理模块
 * 使用 localStorage 存储收藏数据
 */
var BizFavorite = {
  // localStorage 存储键名
  STORAGE_KEY: 'biz_favorites',

  // 获取所有收藏
  getAll: function() {
    try {
      var data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // 保存所有收藏
  saveAll: function(list) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('保存收藏数据失败', e);
    }
  },

  // 添加收藏
  // type: 'solution' / 'tool' / 'case' / 'diagnosis'
  // id: 目标ID
  // title: 标题（冗余存储方便列表展示）
  add: function(type, id, title) {
    if (!type || !id) return false;
    var list = this.getAll();
    // 检查是否已存在
    for (var i = 0; i < list.length; i++) {
      if (list[i].type === type && list[i].id === id) {
        return false; // 已收藏
      }
    }
    list.push({
      type: type,
      id: id,
      title: title || '',
      addedAt: new Date().toISOString()
    });
    this.saveAll(list);
    return true;
  },

  // 移除收藏
  remove: function(type, id) {
    if (!type || !id) return false;
    var list = this.getAll();
    var found = false;
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].type === type && list[i].id === id) {
        list.splice(i, 1);
        found = true;
      }
    }
    if (found) {
      this.saveAll(list);
    }
    return found;
  },

  // 检查是否已收藏
  isFavorited: function(type, id) {
    var list = this.getAll();
    for (var i = 0; i < list.length; i++) {
      if (list[i].type === type && list[i].id === id) {
        return true;
      }
    }
    return false;
  },

  // 按类型获取收藏列表
  getByType: function(type) {
    var list = this.getAll();
    var result = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].type === type) {
        result.push(list[i]);
      }
    }
    return result;
  },

  // 获取收藏总数
  getCount: function() {
    return this.getAll().length;
  },

  // 检查用户是否已登录
  isLoggedIn: function() {
    try {
      var info = localStorage.getItem('biz_user_info');
      return !!info;
    } catch (e) {
      return false;
    }
  },

  // 获取登录用户信息（优先读取海报系统共享登录态）
  getUserInfo: function() {
    return BizUtils.getSharedUser();
  },

  // 未登录时跳转登录页
  // fromPage: 来源页面标识（如 'result', 'profile'）
  requireLogin: function(fromPage) {
    BizUtils.showToast('请先登录');
    setTimeout(function() {
      window.location.href = 'login.html?from=' + (fromPage || 'profile');
    }, 600);
  }
};
