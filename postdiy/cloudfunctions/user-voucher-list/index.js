const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

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
  
  const page = params.page || 1;
  const limit = params.limit || 20;
  const status = params.status;
  const duration = params.duration;
  const exported = params.exported;
  const search = params.search;
  
  try {
    const query = {};
    
    if (status === 'unused') {
      query.used = false;
    } else if (status === 'used') {
      query.used = true;
    }
    
    if (duration) {
      query.duration = duration;
    }
    
    if (exported === 'unexported') {
      query.exported = _.neq(true);
    } else if (exported === 'exported') {
      query.exported = true;
    }
    
    if (search && typeof search === 'string' && search.trim() !== '') {
      const searchStr = search.trim();
      query.$or = [
        { code: db.RegExp({ regexp: searchStr, options: 'i' }) },
        { usedBy: db.RegExp({ regexp: searchStr, options: 'i' }) },
        { usedByPhone: db.RegExp({ regexp: searchStr, options: 'i' }) }
      ];
    }
    
    const totalResult = await db.collection('vip_vouchers').where(query).count();
    const total = totalResult.total;
    
    const skip = (page - 1) * limit;
    const listResult = await db.collection('vip_vouchers')
      .where(query)
      .orderBy('createdAt', 'desc')
      .skip(skip)
      .limit(limit)
      .get();
    
    const totalStats = await db.collection('vip_vouchers').count();
    const unusedStats = await db.collection('vip_vouchers').where({ used: false }).count();
    const usedStats = await db.collection('vip_vouchers').where({ used: true }).count();
    
    const stats = {
      total: totalStats.total,
      unused: unusedStats.total,
      used: usedStats.total
    };
    
    console.log(`查询成功: 总数=${total}, 当前页=${listResult.data.length}`);
    console.log(`统计数据: 总数=${stats.total}, 未使用=${stats.unused}, 已使用=${stats.used}`);
    
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
        data: {
          total: total,
          list: listResult.data,
          stats: stats
        }
      })
    };
  } catch (e) {
    console.error('查询激活码列表失败:', e);
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
        message: '查询失败: ' + e.message
      })
    };
  }
};
