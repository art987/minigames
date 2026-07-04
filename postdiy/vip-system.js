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
    adminManageVouchers: `${API_BASE_URL}/admin-manage-vouchers`,
    paymentCreateOrder: `${API_BASE_URL}/payment-create-order`,
    paymentOrderList: `${API_BASE_URL}/payment-order-list`,
    upgradeHistory: `${API_BASE_URL}/user-upgrade-history`,
    paymentOrderStatus: `${API_BASE_URL}/payment-order-status`,
    getVipPackages: `${API_BASE_URL}/get-vip-packages`,
    adminVipPackages: `${API_BASE_URL}/admin-vip-packages`,
    downloadQuotaManage: `${API_BASE_URL}/download-quota-manage`,
    downloadQuotaLogs: `${API_BASE_URL}/download-quota-logs`
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

  // 设置当前用户信息（合并模式：新数据合并到原有信息上，避免部分数据覆盖完整 userInfo）
  // 注意：newInfo 中值为 undefined 的字段会被忽略，不会覆盖已有值
  function setUserInfo(newInfo) {
    const existingInfo = getUserInfo() || {}
    const mergedInfo = Object.assign({}, existingInfo)
    // 只合并 newInfo 中值不为 undefined 的字段
    Object.keys(newInfo || {}).forEach(key => {
      if (newInfo[key] !== undefined && newInfo[key] !== null) {
        mergedInfo[key] = newInfo[key]
      }
    })
    localStorage.setItem(STORAGE_KEYS.USER_ID, mergedInfo.userId)
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(mergedInfo))

    // 保存 VIP 相关信息
    if (mergedInfo.phone) {
      localStorage.setItem('vipPhone', mergedInfo.phone)
    }
    if (mergedInfo.isVip !== undefined) {
      localStorage.setItem('vipIsVip', mergedInfo.isVip)
    }
    if (mergedInfo.vipValidUntil) {
      localStorage.setItem('vipValidUntil', mergedInfo.vipValidUntil)
    }
    if (mergedInfo.hasPassword !== undefined) {
      localStorage.setItem('vipHasPassword', mergedInfo.hasPassword)
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

  // 检查是否已登录（userId 和 userInfo 必须同时存在，避免伪登录态）
  function isLoggedIn() {
    const userId = getUserId()
    const userInfo = getUserInfo()
    return !!(userId && userInfo && userInfo.userId)
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
      let result = await response.json()
      console.log('响应结果:', result);
      
      // 处理新的响应格式
      if (result.body && typeof result.body === 'string') {
        try {
          result = JSON.parse(result.body);
          console.log('解析后的响应结果:', result);
        } catch (e) {
          console.error('解析body失败:', e);
        }
      }
      
      // 处理升级码验证成功的情况
      if (result.success && !result.used) {
        // 升级码未使用且验证成功，合并更新到现有 userInfo，避免覆盖完整数据
        const patch = {
          userId: userId,
          isVip: true
        }
        if (result.validUntil) {
          patch.vipValidUntil = result.validUntil
        }
        setUserInfo(patch);
        console.log('已合并更新本地存储中的VIP状态:', patch);

        // 主动从服务器拉取最新完整用户信息，确保数据一致
        try {
          await getUserInfoById(userId)
          console.log('升级成功后已从服务器刷新用户信息')
        } catch (e) {
          console.warn('升级后刷新用户信息失败（不影响升级结果）:', e)
        }
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
      
      // 处理不同的响应格式
      if (result.success && result.data) {
        setUserInfo(result.data)
        return { success: true, data: result.data }
      } else if (result.code === 200 && result.data) {
        // 兼容旧格式
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

  // 按订单号查询支付状态（后端代理查询 zpay，必要时补单）
  // 优先于 VIP 状态查询，能更准确反映单笔订单的真实支付结果
  async function queryPaymentOrder(outTradeNo) {
    console.log('[payment-flow] query order status, outTradeNo:', outTradeNo)
    if (!outTradeNo) {
      return { success: false, message: '订单号不能为空' }
    }
    try {
      const response = await fetch(APIs.paymentOrderStatus, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outTradeNo })
      })
      const result = await response.json()
      console.log('[payment-flow] query order status result:', result)
      if (result.success && result.data) {
        return { success: true, data: result.data }
      }
      return { success: false, message: result.message || '查询订单状态失败' }
    } catch (error) {
      console.error('[payment-flow] 查询订单状态失败:', error)
      return { success: false, message: '查询订单状态失败，请稍后重试' }
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

  async function createPaymentOrder(money, duration, type, returnUrl, packageId) {
    try {
      const userId = getUserId()
      const userInfo = getUserInfo()

      if (!userId) {
        return { success: false, message: '请先登录' }
      }

      const response = await fetch(APIs.paymentCreateOrder, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          phone: userInfo ? userInfo.phone : '',
          money: money,
          duration: duration,
          type: type,
          returnUrl: returnUrl,
          packageId: packageId || ''
        })
      })

      const result = await response.json()
      console.log('payment-create-order 返回:', result)
      return result
    } catch (error) {
      console.error('创建支付订单失败:', error)
      return { success: false, message: '创建订单失败，请稍后重试' }
    }
  }

  // ===== VIP 套餐（云端管理） =====
  // 内存缓存 + 5 分钟过期，减少重复请求
  let _vipPackagesCache = null
  let _vipPackagesCacheAt = 0
  const VIP_PACKAGES_CACHE_TTL = 5 * 60 * 1000

  async function getVipPackages(forceRefresh) {
    // 强制刷新或缓存过期时重新拉取
    const now = Date.now()
    if (!forceRefresh && _vipPackagesCache && (now - _vipPackagesCacheAt) < VIP_PACKAGES_CACHE_TTL) {
      return { success: true, data: { packages: _vipPackagesCache } }
    }

    try {
      const response = await fetch(APIs.getVipPackages, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      let result = await response.json()
      // 兼容 API 网关返回格式（body 为 JSON 字符串）
      if (result && result.body && typeof result.body === 'string') {
        try { result = JSON.parse(result.body) } catch (e) { /* ignore */ }
      }
      if (result.success && result.data && Array.isArray(result.data.packages)) {
        _vipPackagesCache = result.data.packages
        _vipPackagesCacheAt = now
        return { success: true, data: { packages: result.data.packages } }
      }
      return { success: false, message: (result && result.message) || '获取套餐失败', data: { packages: [] } }
    } catch (error) {
      console.error('获取 VIP 套餐失败:', error)
      // 失败时返回缓存（如果有）
      if (_vipPackagesCache && _vipPackagesCache.length > 0) {
        return { success: true, data: { packages: _vipPackagesCache } }
      }
      return { success: false, message: '获取套餐失败，请稍后重试', data: { packages: [] } }
    }
  }

  // 兜底默认套餐（仅当云端无套餐或网络异常时使用，与云端默认配置保持一致）
  function getDefaultVipPackages() {
    return [
      { _id: '', duration: 1, title: '1个月VIP', price: 9.9, originalPrice: 60, saving: '≈半杯奶茶', badge: '', featured: false, sortOrder: 1, promotionText: '' },
      { _id: '', duration: 3, title: '3个月VIP', price: 16.9, originalPrice: 60, saving: '≈买1月送2月', badge: '', featured: false, sortOrder: 2, promotionText: '' },
      { _id: '', duration: 6, title: '6个月VIP', price: 19.9, originalPrice: 120, saving: '≈买1月送5月', badge: '', featured: false, sortOrder: 3, promotionText: '' },
      { _id: '', duration: 12, title: '1年VIP', price: 23.9, originalPrice: 240, saving: '≈买1月送11月', badge: '超值', featured: true, sortOrder: 4, promotionText: '' },
      { _id: '', duration: 24, title: '2年VIP', price: 33.9, originalPrice: 480, saving: '≈买2月送22月', badge: '', featured: false, sortOrder: 5, promotionText: '' }
    ]
  }

  // 清空前端套餐缓存（管理后台修改后调用）
  function clearVipPackagesCache() {
    _vipPackagesCache = null
    _vipPackagesCacheAt = 0
  }

  // 管理后台调用 admin-vip-packages 云函数（需 Basic Auth 鉴权）
  // action: list / get / create / update / delete / toggle
  async function adminVipPackages(action, params) {
    try {
      // 从 localStorage 读取管理员凭据（admin-auth.js 登录时写入）
      const adminUserId = localStorage.getItem('postdiy_admin_user_id') || ''
      const adminPassword = localStorage.getItem('postdiy_admin_password') || ''
      const basicAuth = 'Basic ' + btoa(unescape(encodeURIComponent(`${adminUserId}:${adminPassword}`)))

      const body = Object.assign({ action: action || 'list' }, params || {})
      const response = await fetch(APIs.adminVipPackages, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth
        },
        body: JSON.stringify(body)
      })
      let result = await response.json()
      // 兼容 API 网关返回格式（body 为 JSON 字符串）
      if (result && result.body && typeof result.body === 'string') {
        try { result = JSON.parse(result.body) } catch (e) { /* ignore */ }
      }
      return result
    } catch (error) {
      console.error('adminVipPackages 调用失败:', error)
      return { success: false, message: '操作失败，请稍后重试' }
    }
  }

  async function getPaymentOrderList(page = 1, pageSize = 20) {
    try {
      const userId = getUserId()
      
      if (!userId) {
        return { success: false, message: '请先登录' }
      }
      
      const response = await fetch(APIs.paymentOrderList, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          page: page,
          pageSize: pageSize
        })
      })
      
      const result = await response.json()
      return result
    } catch (error) {
      console.error('获取订单列表失败:', error)
      return { success: false, message: '获取订单列表失败' }
    }
  }

  // 获取用户升级记录（合并激活码 + 支付升级，含每条记录的有效期区间）
  async function getUpgradeHistory() {
    try {
      const userId = getUserId()
      if (!userId) {
        return { success: false, message: '请先登录' }
      }
      const response = await fetch(APIs.upgradeHistory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId })
      })
      let result = await response.json()
      // 兼容 API 网关返回格式（body 为 JSON 字符串）
      if (result && result.body && typeof result.body === 'string') {
        try { result = JSON.parse(result.body) } catch (e) { /* ignore */ }
      }
      return result
    } catch (error) {
      console.error('获取升级记录失败:', error)
      return { success: false, message: '获取升级记录失败' }
    }
  }

  // ============ 下载额度相关 ============

  // 获取用户剩余下载次数
  async function getDownloadQuota() {
    try {
      const userId = getUserId()
      if (!userId) {
        return { success: false, message: '请先登录', data: { downloadQuota: 0 } }
      }

      const response = await fetch(APIs.downloadQuotaManage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get', userId })
      })

      const result = await response.json()
      if (result.success && result.data) {
        // 同步到本地缓存
        const userInfo = getUserInfo()
        if (userInfo) {
          userInfo.downloadQuota = result.data.downloadQuota
          setUserInfo(userInfo)
        }
      }
      return result
    } catch (error) {
      console.error('获取下载次数失败:', error)
      return { success: false, message: '获取下载次数失败', data: { downloadQuota: 0 } }
    }
  }

  // 扣减下载次数（下载海报时调用）
  async function deductDownloadQuota(templateId, templateName) {
    try {
      const userId = getUserId()
      if (!userId) {
        return { success: false, message: '请先登录' }
      }

      const response = await fetch(APIs.downloadQuotaManage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deduct',
          userId,
          templateId: templateId || '',
          templateName: templateName || ''
        })
      })

      const result = await response.json()
      if (result.success && result.data) {
        // 同步到本地缓存
        const userInfo = getUserInfo()
        if (userInfo) {
          userInfo.downloadQuota = result.data.downloadQuota
          setUserInfo(userInfo)
        }
      }
      return result
    } catch (error) {
      console.error('扣减下载次数失败:', error)
      return { success: false, message: '扣减下载次数失败' }
    }
  }

  // 增加下载次数（购买/赠送/抽奖等）
  async function addDownloadQuota(amount, source, remark) {
    try {
      const userId = getUserId()
      if (!userId) {
        return { success: false, message: '请先登录' }
      }

      const response = await fetch(APIs.downloadQuotaManage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          userId,
          amount,
          source,
          remark: remark || ''
        })
      })

      const result = await response.json()
      if (result.success && result.data) {
        // 同步到本地缓存
        const userInfo = getUserInfo()
        if (userInfo) {
          userInfo.downloadQuota = result.data.downloadQuota
          setUserInfo(userInfo)
        }
      }
      return result
    } catch (error) {
      console.error('增加下载次数失败:', error)
      return { success: false, message: '增加下载次数失败' }
    }
  }

  // 获取下载次数变更记录
  async function getDownloadQuotaLogs(page = 1, pageSize = 20) {
    try {
      const userId = getUserId()
      if (!userId) {
        return { success: false, message: '请先登录' }
      }

      const response = await fetch(APIs.downloadQuotaLogs, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, page, pageSize })
      })

      return await response.json()
    } catch (error) {
      console.error('获取下载记录失败:', error)
      return { success: false, message: '获取下载记录失败' }
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
    verifyVoucher,
    getVoucherList,
    checkVipStatus,
    queryPaymentOrder,
    generateVoucher,
    isLoggedIn,
    logout,
    init,
    getUserId,
    getUserInfo,
    isVip,
    getVipExpireTime,
    createPaymentOrder,
    getVipPackages,
    getDefaultVipPackages,
    clearVipPackagesCache,
    adminVipPackages,
    getPaymentOrderList,
    getUpgradeHistory,
    getDownloadQuota,
    deductDownloadQuota,
    addDownloadQuota,
    getDownloadQuotaLogs
  };
})();

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  VIPSystem.init();
});

// 显式挂到 window，便于其他脚本通过 window.VIPSystem 访问
if (typeof window !== 'undefined') {
  window.VIPSystem = VIPSystem;
}
