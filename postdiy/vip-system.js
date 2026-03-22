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
    loginWithPassword: `${API_BASE_URL}/login-with-password`,
    verifyVoucher: `${API_BASE_URL}/user-verify-voucher`,
    voucherList: `${API_BASE_URL}/user-voucher-list`,
    checkVipStatus: `${API_BASE_URL}/check-vip-status`,
    generateVoucher: `${API_BASE_URL}/user-generate-voucher`,
    adminGenerateVouchers: `${API_BASE_URL}/admin-generate-vouchers`,
    adminManageVouchers: `${API_BASE_URL}/admin-manage-vouchers`
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
    if (info.vipValidUntil) {
      localStorage.setItem('vipValidUntil', info.vipValidUntil)
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

  // 验证升级码
  async function verifyVoucher(code, userId) {
    try {
      console.log('VIPSystem.verifyVoucher被调用');
      console.log('参数code:', code);
      console.log('参数userId:', userId);
      console.log('API地址:', APIs.verifyVoucher);
      
      // 检查参数
      if (!code || !userId) {
        console.error('缺少必要参数:', { code, userId });
        return { success: false, reason: '缺少必要参数' };
      }
      
      const requestData = { code, userId };
      console.log('发送的请求数据:', requestData);
      console.log('请求数据JSON字符串:', JSON.stringify(requestData));
      
      // 测试网络连接
      console.log('开始发送网络请求...');
      const response = await fetch(APIs.verifyVoucher, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      
      console.log('响应状态:', response.status);
      console.log('响应头:', Object.fromEntries(response.headers.entries()));
      
      // 检查响应状态
      if (!response.ok) {
        console.error('HTTP错误:', response.status, response.statusText);
        return { success: false, reason: `HTTP错误: ${response.status}` };
      }
      
      // 解析响应
      const result = await response.json()
      console.log('响应结果:', result);
      
      if (result.success && result.data) {
        setUserInfo(result.data)
      }
      return result
    } catch (error) {
      console.error('验证升级码失败:', error);
      console.error('错误堆栈:', error.stack);
      return { success: false, message: '验证失败，请稍后重试' };
    }
  }

  // 获取用户升级码列表
  async function getVoucherList(userId) {
    try {
      const response = await fetch(APIs.voucherList, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      
      return await response.json()
    } catch (error) {
      console.error('获取升级码列表失败:', error)
      return { success: false, message: '获取失败，请稍后重试' }
    }
  }

  // 检查VIP状态
  async function checkVipStatus(userId, phone) {
    try {
      const response = await fetch(APIs.checkVipStatus, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getVIPStatus', userId, phone })
      })
      
      const result = await response.json()
      console.log('checkVipStatus响应结果:', result);
      
      if (result.code === 200 && result.data) {
        setUserInfo(result.data)
        return { success: true, data: result.data }
      } else {
        return { success: false, message: result.message || '检查失败' }
      }
    } catch (error) {
      console.error('检查VIP状态失败:', error)
      return { success: false, message: '检查失败，请稍后重试' }
    }
  }

  // 生成升级码
  async function generateVoucher(duration, durationName) {
    try {
      const response = await fetch(APIs.generateVoucher, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration, durationName })
      })
      
      return await response.json()
    } catch (error) {
      console.error('生成升级码失败:', error)
      return { success: false, message: '生成失败，请稍后重试' }
    }
  }

  // 检查本地VIP状态
  function isVip() {
    const userInfo = getUserInfo()
    if (!userInfo) return false
    
    if (userInfo.isVip && userInfo.vipValidUntil) {
      const now = new Date()
      const expireTime = new Date(userInfo.vipValidUntil)
      return now < expireTime
    }
    
    return userInfo.isVip || false
  }

  // 获取VIP过期时间
  function getVipExpireTime() {
    const userInfo = getUserInfo()
    if (!userInfo) return null
    return userInfo.vipValidUntil || null
  }

  return {
    sendSMS,
    registerOrLogin,
    getUserInfoById,
    updateUserInfo,
    upgrade,
    updatePassword,
    loginWithPassword,
    verifyVoucher,
    getVoucherList,
    checkVipStatus,
    generateVoucher,
    isLoggedIn,
    logout,
    init,
    getUserId,
    getUserInfo,
    isVip,
    getVipExpireTime
  };
})();

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  VIPSystem.init();
});
