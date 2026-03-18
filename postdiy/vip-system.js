// 会员系统模块
const VIPSystem = (function() {
  // 云函数 API 地址
  const API_BASE_URL = 'https://api.peacelove.top';
  
  const APIs = {
    sendSMS: `${API_BASE_URL}/send-sms`,
    userRegister: `${API_BASE_URL}/user-register`,
    userLogin: `${API_BASE_URL}/user-login`,
    getUserInfo: `${API_BASE_URL}/user-get-info`,
    updateUserInfo: `${API_BASE_URL}/user-update-info`,
    userUpgrade: `${API_BASE_URL}/user-upgrade`,
    setPassword: `${API_BASE_URL}/set-password`,
    loginWithPassword: `${API_BASE_URL}/login-with-password`
  };

  // 本地存储键名
  const STORAGE_KEYS = {
    USER_ID: 'postdiy_user_id',
    USER_TOKEN: 'postdiy_user_token',
    USER_INFO: 'postdiy_user_info'
  };

  // 获取当前用户ID
  function getUserId() {
    return localStorage.getItem(STORAGE_KEYS.USER_ID);
  }

  // 获取当前用户信息
  function getUserInfo() {
    const info = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return info ? JSON.parse(info) : null;
  }

  // 设置当前用户信息
  function setUserInfo(info) {
    localStorage.setItem(STORAGE_KEYS.USER_ID, info.userId)
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(info))
    
    // 保存 VIP 相关信息
    if (info.phone) {
      localStorage.setItem('vipPhone', info.phone)
    }
    if (info.isVip !== undefined) {
      localStorage.setItem('vipIsVip', info.isVip)
    }
    if (info.vipExpireTime) {
      localStorage.setItem('vipExpireTime', info.vipExpireTime)
    }
    if (info.hasPassword !== undefined) {
      localStorage.setItem('vipHasPassword', info.hasPassword)
    }
  }

  // 清除用户信息
  function clearUserInfo() {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }

  // 发送短信验证码
  async function sendSMS(phone) {
    try {
      console.log('发送短信，手机号:', phone);
      console.log('API地址:', APIs.sendSMS);
      const response = await fetch(APIs.sendSMS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      console.log('响应状态:', response.status);
      const result = await response.json();
      console.log('响应结果:', result);
      return result;
    } catch (error) {
      console.error('发送短信失败:', error);
      return { success: false, message: '发送失败，请稍后重试' };
    }
  }

  // 用户注册/登录
  async function registerOrLogin(phone, code) {
    try {
      const response = await fetch(APIs.userRegister, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      });
      
      const result = await response.json();
      if (result.success) {
        setUserInfo(result.data);
      }
      return result;
    } catch (error) {
      console.error('注册/登录失败:', error);
      return { success: false, message: '操作失败，请稍后重试' };
    }
  }

  // 获取用户信息
  async function getUserInfoById(userId) {
    try {
      const response = await fetch(APIs.getUserInfo, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      const result = await response.json();
      if (result.success) {
        setUserInfo(result.data);
      }
      return result;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return { success: false, message: '获取失败，请稍后重试' };
    }
  }

  // 更新用户信息（logo、二维码）
  async function updateUserInfo(userId, logoUrl, qrcodeUrl) {
    try {
      const response = await fetch(APIs.updateUserInfo, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, logoUrl, qrcodeUrl })
      });
      
      const result = await response.json();
      if (result.success) {
        setUserInfo(result.data);
      }
      return result;
    } catch (error) {
      console.error('更新用户信息失败:', error);
      return { success: false, message: '更新失败，请稍后重试' };
    }
  }

  // 用户升级
  async function upgrade(userId, upgradeCode) {
    try {
      const response = await fetch(APIs.userUpgrade, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, upgradeCode })
      });
      
      const result = await response.json();
      if (result.success) {
        setUserInfo(result.data);
      }
      return result;
    } catch (error) {
      console.error('升级失败:', error);
      return { success: false, message: '升级失败，请稍后重试' };
    }
  }

  // 检查是否已登录
  function isLoggedIn() {
    return !!getUserId();
  }

  // 退出登录
  function logout() {
    clearUserInfo();
  }

  // 初始化
  function init() {
    const userId = getUserId()
    if (userId) {
      getUserInfoById(userId)
    }
  }
  
  // 设置密码
  async function updatePassword(userId, password) {
    try {
      const response = await fetch(APIs.setPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      })
      
      const result = await response.json()
      if (result.success) {
        const userInfo = getUserInfo()
        if (userInfo) {
          userInfo.hasPassword = true
          setUserInfo(userInfo)
        }
      }
      return result
    } catch (error) {
      console.error('设置密码失败:', error)
      return { success: false, message: '设置密码失败，请稍后重试' }
    }
  }
  
  // 密码登录
  async function loginWithPassword(phone, password) {
    try {
      const response = await fetch(APIs.loginWithPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      })
      
      const result = await response.json()
      if (result.success) {
        setUserInfo(result.data)
      }
      return result
    } catch (error) {
      console.error('密码登录失败:', error)
      return { success: false, message: '登录失败，请检查手机号和密码' }
    }
  }

  return {
    sendSMS,
    registerOrLogin,
    getUserInfoById,
    updateUserInfo,
    upgrade,
    updatePassword,
    loginWithPassword,
    isLoggedIn,
    logout,
    init,
    getUserId,
    getUserInfo
  };
})();

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  VIPSystem.init();
});
