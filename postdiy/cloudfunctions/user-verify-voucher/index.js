const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

// 验证升级码格式（仅做基本检查）
function validateVoucherCode(code) {
  if (!code || typeof code !== 'string') {
    return { valid: false, reason: '升级码不能为空' };
  }
  return { valid: true };
}

// 计算有效期截止日期
function calculateValidUntil(durationMonths) {
  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setMonth(now.getMonth() + durationMonths);
  
  // 设置为当月最后一天的24:00:00
  validUntil.setMonth(validUntil.getMonth() + 1);
  validUntil.setDate(0);
  validUntil.setHours(24, 0, 0, 0);
  
  return validUntil;
}

// 格式化日期
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return {
    dateStr: `${year}-${month}-${day}`,
    timeStr: `${hours}时${minutes}分${seconds}秒`,
    fullStr: `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`
  };
}

// 生成升级码
function generateVoucherCode() {
  const chars = '012356789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const min6Count = 1;
  const min8Count = 2;
  
  while (true) {
    let code = '';
    let sixCount = 0;
    let eightCount = 0;
    
    for (let i = 0; i < 8; i++) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      code += randomChar;
      
      if (randomChar === '6') sixCount++;
      if (randomChar === '8') eightCount++;
    }
    
    if (sixCount >= min6Count && eightCount >= min8Count) {
      return `VIP${code}`;
    }
  }
}

// 验证升级码是否已使用
async function checkVoucherUsage(code) {
  try {
    const result = await db.collection('vip_vouchers').where({
      code: code
    }).get();
    
    if (result.data.length === 0) {
      return { exists: false, used: false };
    }
    
    const voucher = result.data[0];
    
    if (voucher.used) {
      return { 
        exists: true, 
        used: true,
        usedBy: voucher.usedBy,
        usedAt: voucher.usedAt,
        duration: voucher.duration
      };
    }
    
    return { 
      exists: true, 
      used: false,
      duration: voucher.duration,
      durationName: voucher.durationName
    };
  } catch (e) {
    console.error('查询升级码失败:', e);
    return { exists: false, used: false, error: e.message };
  }
}

// 标记升级码为已使用
async function markVoucherAsUsed(code, userId, duration, durationName) {
  try {
    const validUntil = calculateValidUntil(duration);
    const now = new Date();
    
    await db.collection('vip_vouchers').where({
      code: code
    }).update({
      data: {
        used: true,
        usedBy: userId,
        usedAt: now,
        validUntil: validUntil
      }
    });
    
    return {
      success: true,
      validUntil: validUntil,
      duration: duration,
      durationName: durationName
    };
  } catch (e) {
    console.error('标记升级码为已使用失败:', e);
    return { success: false, error: e.message };
  }
}

// 更新用户VIP状态
async function updateUserVipStatus(userId, duration, validUntil) {
  try {
    // 获取用户当前的VIP状态
    const userResult = await db.collection('users').doc(userId).get();
    
    if (!userResult.data) {
      return { success: false, reason: '用户不存在' };
    }
    
    const userData = userResult.data;
    const now = new Date();
    let updatedValidUntil;
    
    // 检查用户当前是否在VIP有效期内
    if (userData.vipValidUntil) {
      const currentValidUntil = new Date(userData.vipValidUntil);
      if (currentValidUntil > now) {
        // 用户当前还在有效期内，在有效期基础上增加时间
        updatedValidUntil = new Date(currentValidUntil);
        updatedValidUntil.setMonth(updatedValidUntil.getMonth() + duration);
      } else {
        // 用户已过期，从当前时间开始计算
        updatedValidUntil = new Date(now);
        updatedValidUntil.setMonth(updatedValidUntil.getMonth() + duration);
      }
    } else {
      // 用户从未是VIP，从当前时间开始计算
      updatedValidUntil = new Date(now);
      updatedValidUntil.setMonth(updatedValidUntil.getMonth() + duration);
    }
    
    await db.collection('users').doc(userId).update({
      data: {
        isVip: true,
        vipValidUntil: updatedValidUntil,
        vipDuration: duration
      }
    });
    
    return {
      success: true,
      validUntil: updatedValidUntil,
      duration: duration
    };
  } catch (e) {
    console.error('更新用户VIP状态失败:', e);
    return { success: false, error: e.message };
  }
}

// 主函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  // 解析请求体
  let requestBody = event;
  if (event.body) {
    try {
      requestBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (e) {
      console.error('解析请求体失败:', e);
      return {
        success: false,
        reason: '请求体格式错误'
      };
    }
  }
  
  const userId = requestBody.userId;
  const code = requestBody.code;
  
  console.log('接收到的参数:', { userId, code });
  
  if (!userId || !code) {
    return {
      success: false,
      reason: '缺少必要参数'
    };
  }
  
  // 验证升级码格式
  const validation = validateVoucherCode(code);
  if (!validation.valid) {
    return {
      success: false,
      reason: validation.reason
    };
  }
  
  // 检查升级码是否已使用
  const voucherStatus = await checkVoucherUsage(code);
  
  if (!voucherStatus.exists) {
    return {
      success: false,
      reason: '升级码不存在'
    };
  }
  
  if (voucherStatus.used) {
    // 升级码已使用，获取使用该升级码的用户信息
    let usedByPhone = '';
    try {
      const userResult = await db.collection('users').doc(voucherStatus.usedBy).get();
      if (userResult.data && userResult.data.phone) {
        usedByPhone = userResult.data.phone;
      }
    } catch (e) {
      console.error('获取用户信息失败:', e);
    }
    
    const usedAt = new Date(voucherStatus.usedAt);
    
    return {
      success: true,
      used: true,
      usedBy: voucherStatus.usedBy,
      usedByPhone: usedByPhone,
      usedAt: voucherStatus.usedAt,
      duration: voucherStatus.duration
    };
  }
  
  // 升级码未使用，进行升级
  const markResult = await markVoucherAsUsed(code, userId, voucherStatus.duration, voucherStatus.durationName);
  
  if (!markResult.success) {
    return {
      success: false,
      reason: markResult.error || '标记升级码失败'
    };
  }
  
  // 更新用户VIP状态
  const updateResult = await updateUserVipStatus(userId, voucherStatus.duration, markResult.validUntil);
  
  if (!updateResult.success) {
    return {
      success: false,
      reason: updateResult.error || '更新VIP状态失败'
    };
  }
  
  // 获取更新后的用户信息
  let userData = null;
  try {
    const userResult = await db.collection('users').doc(userId).get();
    userData = userResult.data;
  } catch (e) {
    console.error('获取用户信息失败:', e);
  }
  
  return {
    success: true,
    used: false,
    validUntil: updateResult.validUntil,
    duration: updateResult.duration,
    data: userData
  };
};
