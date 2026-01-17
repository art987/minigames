// 券码库数据
window.coupons = {
  // 示例券码（用于测试）
  "8866": {
    code: "8866",
    month: 1,
    validUntil: "2026-02-31",
    used: false
  },
  "9988": {
    code: "9988",
    month: 3,
    validUntil: "2026-03-31",
    used: false
  },

  "1016": {
    code: "1016",
    month: 9,
    validUntil: "2026-09-30",
    used: false
  },
  "9999": {
    code: "9999",
    month: 12,
    validUntil: "2026-12-31",
    used: false
  },
  // 已过期的券码示例
  "0001": {
    code: "0001",
    month: 1,
    validUntil: "2024-01-31",
    used: false
  },
  // 测试券码示例
  "9999": {
    code: "9999",
    month: 12,
    validUntil: "2026-12-31"
  }
};

// 生成每月100个随机券码
function generateMonthlyCoupons() {
  const coupons = {};
  
  for (let month = 1; month <= 12; month++) {
    // 生成该月的100个券码
    for (let i = 0; i < 100; i++) {
      let code;
      do {
        // 生成4位随机数字
        code = Math.floor(Math.random() * 9000 + 1000).toString();
      } while (coupons[code]); // 确保券码唯一
      
      // 设置有效期到该月最后一天
      const currentYear = new Date().getFullYear();
      const lastDay = new Date(currentYear, month, 0).getDate();
      const validUntil = `${currentYear}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
      
      coupons[code] = {
        code: code,
        month: month,
        validUntil: validUntil
      };
    }
  }
  
  return coupons;
}

// 初始化券码库
function initCoupons() {
  // 如果券码库为空，则生成新的券码
  if (Object.keys(window.coupons).length === 0) {
    window.coupons = generateMonthlyCoupons();
    console.log('券码库已初始化，共生成', Object.keys(window.coupons).length, '个券码');
  }
}

// 验证券码
function validateCoupon(code) {
  const coupon = window.coupons[code];
  
  if (!coupon) {
    return {
      valid: false,
      message: '券码不存在，请检查后重试'
    };
  }
  
  const currentDate = new Date();
  const validUntil = new Date(coupon.validUntil);
  
  if (currentDate > validUntil) {
    return {
      valid: false,
      message: `券码已于${coupon.validUntil}过期，请重试`
    };
  }
  

  
  return {
    valid: true,
    message: `券码验证成功！有效期至${coupon.validUntil}`,
    validUntil: coupon.validUntil
  };
}

// 获取上次成功的券码
function getLastValidCoupon() {
  return localStorage.getItem('lastValidCoupon');
}

// 保存成功的券码
function saveLastValidCoupon(code) {
  localStorage.setItem('lastValidCoupon', code);
}

// 清除保存的券码
function clearLastValidCoupon() {
  localStorage.removeItem('lastValidCoupon');
}

// 页面加载时初始化券码库
document.addEventListener('DOMContentLoaded', function() {
  initCoupons();
});