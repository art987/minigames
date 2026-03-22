// VIP升级码生成器
window.vipVoucher = {
  // 升级码有效期配置（单位：月）
  durations: {
    '1个月': 1,
    '3个月': 3,
    '6个月': 6,
    '1年': 12,
    '2年': 24
  },
  
  // 生成8位随机码（不包含4，至少1个6，2个8）
  generateRandomCode: function() {
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
      
      // 检查是否满足条件
      if (sixCount >= min6Count && eightCount >= min8Count) {
        return code;
      }
    }
  },
  
  // 生成升级码
  generateVoucher: function(durationName) {
    const duration = this.durations[durationName];
    if (!duration) {
      return null;
    }
    
    const randomCode = this.generateRandomCode();
    const voucherCode = `VIP${randomCode}`;
    
    return {
      code: voucherCode,
      duration: duration,
      durationName: durationName
    };
  },
  
  // 批量生成升级码
  generateBatch: function() {
    const batch = {};
    
    for (const durationName in this.durations) {
      batch[durationName] = [];
      
      // 每种类型生成10个升级码
      for (let i = 0; i < 10; i++) {
        batch[durationName].push(this.generateVoucher(durationName));
      }
    }
    
    return batch;
  },
  
  // 验证升级码格式
  validateVoucherCode: function(code) {
    if (!code || !code.startsWith('VIP')) {
      return { valid: false, reason: '升级码格式错误，必须以VIP开头' };
    }
    
    const randomPart = code.substring(3);
    
    if (randomPart.length !== 8) {
      return { valid: false, reason: '升级码格式错误，必须是VIP加8位字符' };
    }
    
    // 检查是否包含数字4
    if (randomPart.includes('4')) {
      return { valid: false, reason: '升级码不能包含数字4' };
    }
    
    // 统计6和8的数量
    let sixCount = 0;
    let eightCount = 0;
    
    for (const char of randomPart) {
      if (char === '6') sixCount++;
      if (char === '8') eightCount++;
    }
    
    if (sixCount < 1) {
      return { valid: false, reason: '升级码必须至少包含1个数字6' };
    }
    
    if (eightCount < 2) {
      return { valid: false, reason: '升级码必须至少包含2个数字8' };
    }
    
    return { valid: true };
  },
  
  // 计算有效期截止日期
  calculateValidUntil: function(durationMonths) {
    const now = new Date();
    const validUntil = new Date(now);
    validUntil.setMonth(now.getMonth() + durationMonths);
    
    // 设置为当月最后一天的24:00:00
    validUntil.setMonth(validUntil.getMonth() + 1);
    validUntil.setDate(0);
    validUntil.setHours(24, 0, 0, 0);
    
    return validUntil;
  },
  
  // 格式化日期
  formatDate: function(date) {
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
};

// 页面加载时生成升级码示例
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('VIP升级码生成器已加载');
    
    // 生成示例升级码
    const examples = window.vipVoucher.generateBatch();
    console.log('升级码示例:', examples);
  });
}
