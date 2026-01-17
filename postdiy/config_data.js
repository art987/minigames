// 网站配置数据 - 包含各种设置和参数
window.siteConfig = {
  version: '1.2.3',
  theme: 'red',
  features: {
    templateSelection: true,
    businessInfo: true,
    posterDownload: true
  },
  
  // 海报下载设置
  downloadSettings: {
    maxSize: 5000,
    format: 'png',
    quality: 0.9
  },
  
  // 券码验证相关配置（隐藏在配置数据中）
  validationConfig: {
    couponRules: {
      length: 4,
      pattern: /^\\d{4}$/,
      maxAttempts: 3
    },
    
    // 券码数据（混淆存储）
    couponData: {
      '8866': { m: 1, v: '2026-02-28' },
      '9988': { m: 3, v: '2026-03-31' },
      '1016': { m: 9, v: '2026-09-30' },
      '9999': { m: 12, v: '2026-12-31' },
      '0001': { m: 1, v: '2024-01-31' }
    }
  }
};

// 验证券码函数
function validateCoupon(code) {
  const coupon = window.siteConfig.validationConfig.couponData[code];
  
  if (!coupon) {
    return {
      valid: false,
      message: '券码不存在，请检查后重试'
    };
  }
  
  const currentDate = new Date();
  const validUntil = new Date(coupon.v);
  
  if (currentDate > validUntil) {
    return {
      valid: false,
      message: `券码已于${coupon.v}过期，请重试`
    };
  }
  
  return {
    valid: true,
    message: `券码验证成功！有效期至${coupon.v}`,
    validUntil: coupon.v
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

console.log('网站配置数据已加载');