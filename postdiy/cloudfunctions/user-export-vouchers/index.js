const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

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
  
  const duration = params.duration;
  const status = params.status;
  const exported = params.exported;
  const limit = params.limit || 500;
  
  try {
    const query = {};
    
    if (duration) {
      query.duration = duration;
    }
    
    if (status === 'unused') {
      query.used = false;
    } else if (status === 'used') {
      query.used = true;
    }
    
    if (exported === 'exported') {
      query.exported = true;
    } else if (exported === 'unexported') {
      query.exported = false;
    }
    
    console.log('查询条件:', JSON.stringify(query));
    
    const result = await db.collection('vip_vouchers')
      .where(query)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    
    const vouchers = result.data;
    console.log(`查询到 ${vouchers.length} 条激活码`);
    
    if (vouchers.length > 0) {
      const now = new Date();
      const codeIds = vouchers.map(v => v._id);
      
      await db.collection('vip_vouchers').where({
        _id: _.in(codeIds)
      }).update({
        data: {
          exported: true,
          exportedAt: now
        }
      });
      
      console.log(`已更新 ${codeIds.length} 条激活码的导出状态`);
    }
    
    return {
      success: true,
      data: vouchers,
      message: `成功获取 ${vouchers.length} 条激活码`
    };
  } catch (e) {
    console.error('导出激活码失败:', e);
    return {
      success: false,
      message: '导出失败: ' + e.message
    };
  }
};
