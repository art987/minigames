const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

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

function calculateValidUntil(durationMonths) {
  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setMonth(now.getMonth() + durationMonths);
  validUntil.setMonth(validUntil.getMonth() + 1);
  validUntil.setDate(0);
  validUntil.setHours(24, 0, 0, 0);
  return validUntil;
}

exports.main = async (event, context) => {
  console.log('接收到的事件:', JSON.stringify(event));
  
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }
  
  let params = event;
  if (event.body) {
    try {
      params = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      console.log('解析后的参数:', JSON.stringify(params));
    } catch (e) {
      console.error('解析body失败:', e);
    }
  }
  
  const duration = params.duration;
  const durationName = params.durationName;
  const count = params.count || 1;
  
  console.log(`生成参数: duration=${duration}, durationName=${durationName}, count=${count}`);
  
  if (!duration || !durationName) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        message: '缺少必要参数: duration 或 durationName'
      })
    };
  }
  
  const codes = [];
  const validUntil = calculateValidUntil(duration);
  
  try {
    for (let i = 0; i < count; i++) {
      const code = generateVoucherCode();
      
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
      
      codes.push(code);
      console.log(`成功生成第 ${i + 1} 个激活码: ${code}`);
    }
    
    console.log(`成功生成 ${codes.length} 个激活码`);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        codes: codes,
        count: codes.length,
        durationName: durationName,
        message: `成功生成 ${codes.length} 个激活码`
      })
    };
  } catch (e) {
    console.error('生成激活码失败:', e);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        message: '生成激活码失败: ' + e.message
      })
    };
  }
};
