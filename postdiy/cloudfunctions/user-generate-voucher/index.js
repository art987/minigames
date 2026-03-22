const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

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

// 生成单个升级码
async function generateVoucher(duration, durationName) {
  try {
    const code = generateVoucherCode();
    const validUntil = calculateValidUntil(duration);
    
    await db.collection('vip_vouchers').add({
      data: {
        code: code,
        duration: duration,
        durationName: durationName,
        validUntil: validUntil,
        used: false,
        createdAt: new Date()
      }
    });
    
    return {
      success: true,
      code: code,
      duration: duration,
      durationName: durationName,
      validUntil: validUntil
    };
  } catch (e) {
    console.error('生成升级码失败:', e);
    return { success: false, error: e.message };
  }
}

// 批量生成升级码
async function generateBatchVouchers() {
  const durations = {
    '1个月': 1,
    '3个月': 3,
    '6个月': 6,
    '1年': 12,
    '2年': 24
  };
  
  const results = {};
  
  for (const durationName in durations) {
    results[durationName] = [];
    
    // 每种类型生成50个升级码
    for (let i = 0; i < 50; i++) {
      const result = await generateVoucher(durations[durationName], durationName);
      
      if (result.success) {
        results[durationName].push(result);
      }
    }
  }
  
  return results;
}

// 主函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  // 只有管理员可以生成升级码
  const adminId = process.env.ADMIN_USER_ID;
  if (adminId && wxContext.OPENID !== adminId) {
    return {
      success: false,
      reason: '无权限生成升级码'
    };
  }
  
  const duration = event.duration;
  const durationName = event.durationName;
  
  if (duration && durationName) {
    // 生成单个升级码
    return await generateVoucher(duration, durationName);
  } else {
    // 批量生成升级码（每种时长50个）
    return await generateBatchVouchers();
  }
};
