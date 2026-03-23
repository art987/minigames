const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  console.log('接收到的事件:', JSON.stringify(event));
  
  let params = event;
  
  if (event.body) {
    try {
      params = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      console.log('解析后的参数:', JSON.stringify(params));
    } catch (e) {
      console.error('解析body失败:', e);
    }
  }
  
  const userId = params.userId;
  const duration = params.duration;
  
  if (!userId || !duration) {
    console.error('缺少必要参数');
    return {
      success: false,
      message: '缺少必要参数: userId 和 duration'
    };
  }
  
  try {
    const userResult = await db.collection('users').doc(userId).get();
    
    if (!userResult.data) {
      return {
        success: false,
        message: '用户不存在'
      };
    }
    
    const userData = userResult.data;
    const now = new Date();
    let updatedValidUntil;
    
    if (userData.vipValidUntil) {
      const currentValidUntil = new Date(userData.vipValidUntil);
      if (currentValidUntil > now) {
        updatedValidUntil = new Date(currentValidUntil);
        updatedValidUntil.setMonth(updatedValidUntil.getMonth() + duration);
      } else {
        updatedValidUntil = new Date(now);
        updatedValidUntil.setMonth(updatedValidUntil.getMonth() + duration);
      }
    } else {
      updatedValidUntil = new Date(now);
      updatedValidUntil.setMonth(updatedValidUntil.getMonth() + duration);
    }
    
    await db.collection('users').doc(userId).update({
      data: {
        isVip: true,
        vipValidUntil: updatedValidUntil,
        vipDuration: (userData.vipDuration || 0) + duration,
        lastVipExtend: now
      }
    });
    
    console.log(`延长VIP成功: ${userId}, 新到期时间: ${updatedValidUntil}`);
    
    return {
      success: true,
      validUntil: updatedValidUntil,
      message: '延长成功'
    };
  } catch (e) {
    console.error('延长VIP失败:', e);
    return {
      success: false,
      message: '延长失败: ' + e.message
    };
  }
};
