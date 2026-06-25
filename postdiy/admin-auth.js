/**
 * 统一后台管理认证模块
 * 通过 localStorage 实现一次登录，所有管理页面共享登录状态
 */
(function() {
  const ADMIN_AUTH_KEY = 'postdiy_admin_auth';
  const ADMIN_CONFIG = {
    userId: '15160029349',
    password: '123456',
    expiryHours: 8 // 登录有效期8小时
  };

  window.AdminAuth = {
    /**
     * 登录验证
     */
    login: function(userId, password) {
      if (userId === ADMIN_CONFIG.userId && password === ADMIN_CONFIG.password) {
        const authData = {
          userId: userId,
          loginTime: Date.now(),
          expiry: Date.now() + ADMIN_CONFIG.expiryHours * 60 * 60 * 1000
        };
        localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(authData));
        return { success: true };
      }
      return { success: false, message: '用户ID或密码错误' };
    },

    /**
     * 退出登录
     */
    logout: function() {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    },

    /**
     * 检查是否已登录
     */
    isLoggedIn: function() {
      const authData = this.getAuthData();
      if (!authData) return false;
      
      // 检查是否过期
      if (Date.now() > authData.expiry) {
        localStorage.removeItem(ADMIN_AUTH_KEY);
        return false;
      }
      return true;
    },

    /**
     * 获取认证数据
     */
    getAuthData: function() {
      try {
        const data = localStorage.getItem(ADMIN_AUTH_KEY);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    },

    /**
     * 获取当前登录用户ID
     */
    getUserId: function() {
      const authData = this.getAuthData();
      return authData ? authData.userId : null;
    }
  };
})();