const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  let userId, page = 1, pageSize = 20
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    userId = body.userId
    page = body.page || 1
    pageSize = body.pageSize || 20
  } catch (error) {
    console.log('解析 body 失败:', error)
    userId = event.userId
    page = event.page || 1
    pageSize = event.pageSize || 20
  }
  
  if (!userId) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: false,
        message: '用户ID不能为空'
      })
    }
  }

  try {
    const countRes = await db.collection('orders')
      .where({
        userId: userId
      })
      .count()
    
    const total = countRes.total
    
    const ordersRes = await db.collection('orders')
      .where({
        userId: userId
      })
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    const orders = ordersRes.data.map(order => ({
      out_trade_no: order.out_trade_no,
      trade_no: order.trade_no || '',
      name: order.name,
      money: order.money,
      duration: order.duration,
      type: order.type,
      status: order.status,
      createTime: order.createTime,
      payTime: order.payTime
    }))
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: true,
        message: '获取成功',
        data: {
          orders: orders,
          total: total,
          page: page,
          pageSize: pageSize
        }
      })
    }
  } catch (error) {
    console.error('获取订单列表失败:', error)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: false,
        message: '获取订单列表失败: ' + error.message
      })
    }
  }
}
