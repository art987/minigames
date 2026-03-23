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
  
  const page = params.page || 1;
  const limit = params.limit || 20;
  const vipStatus = params.vipStatus;
  const sort = params.sort;
  const search = params.search;
  
  try {
    const query = {};
    
    if (vipStatus === 'vip') {
      query.isVip = true;
    } else if (vipStatus === 'normal') {
      query.isVip = false;
    }
    
    if (search && typeof search === 'string' && search.trim() !== '') {
      query.$or = [
        { phone: db.RegExp({ 
          expression: search.trim(), 
          options: 'i' 
        }) },
        { _id: db.RegExp({ 
          expression: search.trim(), 
          options: 'i' 
        }) }
      ];
    }
    
    console.log('开始查询总数...');
    const totalResult = await db.collection('users').where(query).count();
    const total = totalResult.total;
    console.log('总数查询结果:', total);
    
    const skip = (page - 1) * limit;
    
    let orderByField = 'createdAt';
    let orderByOrder = 'desc';
    
    if (sort === 'oldest') {
      orderByOrder = 'asc';
    } else if (sort === 'vip-expiry') {
      orderByField = 'vipValidUntil';
      orderByOrder = 'asc';
    } else if (sort === 'vip-longest') {
      orderByField = 'vipValidUntil';
      orderByOrder = 'desc';
    }
    
    console.log('开始查询列表...');
    const listResult = await db.collection('users')
      .where(query)
      .orderBy(orderByField, orderByOrder)
      .skip(skip)
      .limit(limit)
      .get();
    console.log('列表查询结果:', listResult.data.length);
    
    console.log('开始查询统计数据...');
    const totalStats = await db.collection('users').count();
    const vipStats = await db.collection('users').where({ isVip: true }).count();
    const normalStats = await db.collection('users').where({ isVip: false }).count();
    
    const stats = {
      total: totalStats.total,
      vip: vipStats.total,
      normal: normalStats.total
    };
    
    console.log(`查询成功: 总数=${total}, 当前页=${listResult.data.length}`);
    console.log(`统计数据: 总数=${stats.total}, VIP=${stats.vip}, 普通=${stats.normal}`);
    
    return {
      success: true,
      data: {
        total: total,
        list: listResult.data,
        stats: stats
      }
    };
  } catch (e) {
    console.error('查询会员列表失败:', e);
    console.error('错误堆栈:', e.stack);
    return {
      success: false,
      message: '查询失败: ' + e.message
    };
  }
};
