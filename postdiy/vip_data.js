// VIP数据存储系统
window.vipData = {
  // VIP用户数据
  users: {
    'pepsi': {
      id: 'pepsi',
      password: '123456',
      name: '百事可乐',
      logo: 'images/vip-logo.png',
      validUntil: '2026-12-31',
      isActive: true
    },
    'cocacola': {
      id: 'cocacola',
      password: 'vip1234',
      name: '可口可乐',
      logo: 'images/vip-logo.png',
      validUntil: '2026-06-30',
      isActive: true
    },
    'starbucks': {
      id: 'starbucks',
      password: 'vip2026',
      name: '星巴克',
      logo: 'images/vip-logo.png',
      validUntil: '2026-09-30',
      isActive: true
    },
    'mcdonalds': {
      id: 'mcdonalds',
      password: 'vip1234',
      name: '麦当劳',
      logo: 'images/vip-logo.png',
      validUntil: '2026-12-31',
      isActive: true
    }
  }
};

// VIP验证函数
function validateVipLogin(id, password) {
  const user = window.vipData.users[id];
  
  if (!user) {
    return {
      success: false,
      message: 'VIP ID不存在'
    };
  }
  
  if (user.password !== password) {
    return {
      success: false,
      message: '密码错误'
    };
  }
  
  if (!user.isActive) {
    return {
      success: false,
      message: 'VIP账户已停用'
    };
  }
  
  const currentDate = new Date();
  const validUntil = new Date(user.validUntil);
  
  if (currentDate > validUntil) {
    return {
      success: false,
      message: 'VIP服务已过期'
    };
  }
  
  return {
    success: true,
    message: '登录成功',
    user: user
  };
}

// 检查当前是否为VIP状态
function isVipActive() {
  const vipId = localStorage.getItem('vipId');
  const vipValidUntil = localStorage.getItem('vipValidUntil');
  
  if (!vipId || !vipValidUntil) {
    return false;
  }
  
  const currentDate = new Date();
  const validUntil = new Date(vipValidUntil);
  
  return currentDate <= validUntil;
}

// 获取当前VIP信息
function getCurrentVipInfo() {
  if (!isVipActive()) {
    return null;
  }
  
  const vipId = localStorage.getItem('vipId');
  return window.vipData.users[vipId] || null;
}

// 保存VIP登录状态
function saveVipLogin(user) {
  localStorage.setItem('vipId', user.id);
  localStorage.setItem('vipValidUntil', user.validUntil);
  localStorage.setItem('vipName', user.name);
  localStorage.setItem('vipLogo', user.logo);
}

// 清除VIP登录状态
function clearVipLogin() {
  localStorage.removeItem('vipId');
  localStorage.removeItem('vipValidUntil');
  localStorage.removeItem('vipName');
  localStorage.removeItem('vipLogo');
}

// 获取VIP固定信息
function getVipFixedInfo() {
  const currentUser = getCurrentVipInfo();
  if (currentUser) {
    return {
      name: currentUser.name,
      logo: currentUser.logo,
      validUntil: currentUser.validUntil
    };
  }
  return null;
}

// 页面加载时检查VIP状态
function checkVipStatusOnLoad() {
  if (isVipActive()) {
    console.log('VIP状态：已登录');
    
    // 检查URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const vipParam = urlParams.get('vip');
    
    if (vipParam) {
      console.log('通过URL参数识别VIP：', vipParam);
    }
  } else {
    console.log('VIP状态：未登录');
  }
}

// 初始化VIP系统
document.addEventListener('DOMContentLoaded', function() {
  checkVipStatusOnLoad();
});