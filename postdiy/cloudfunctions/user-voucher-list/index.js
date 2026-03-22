const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 主函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  // 只有管理员可以查询激活码列表
  const adminId = process.env.ADMIN_USER_ID;
  if (wxContext.OPENID !== adminId) {
    return {
      success: false,
      reason: '无权限查询激活码列表'
    };
  }
  
  const page = event.page || 1;
  const limit = event.limit || 20;
  const status = event.status;
  const duration = event.duration;
  const search = event.search;
  
  try {
    // 构建查询条件
    const query = {};
    
    if (status === 'unused') {
      query.used = false;
    } else if (status === 'used') {
      query.used = true;
    }
    
    if (duration) {
      query.duration = duration;
    }
    
    if (search) {
      // 模糊搜索激活码或用户ID
      query.$or = [
        { code: new db.RegExp({ 
          expression: search, 
          options: 'i' 
        }) },
        { usedBy: new db.RegExp({ 
          expression: search, 
          options: 'i' 
        }) }
      ];
    }
    
    // 获取总数
    const totalResult = await db.collection('vip_vouchers').where(query).count();
    const total = totalResult.total;
    
    // 分页查询
    const skip = (page - 1) * limit;
    const listResult = await db.collection('vip_vouchers')
      .where(query)
      .orderBy('createdAt', 'desc')
      .skip(skip)
      .limit(limit)
      .get();
    
    return {
      success: true,
      data: {
        total: total,
        list: listResult.data
      }
    };
  } catch (e) {
    console.error('查询激活码列表失败:', e);
    return {
      success: false,
      reason: '查询失败: ' + e.message
    };
  }
};
