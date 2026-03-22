// 管理后台生成激活码云函数
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const vouchersCollection = db.collection('vip_vouchers')

exports.main = async (event, context) => {
  try {
    console.log('接收到的事件:', event)
    
    // 解析 HTTP 请求参数
    let vouchers;
    if (event.body) {
      try {
        // 尝试解析 body 为 JSON
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        vouchers = body.vouchers;
        console.log('从 body 解析的 vouchers:', vouchers);
      } catch (e) {
        console.error('解析 body 失败:', e);
      }
    }
    
    // 如果没有从 body 中获取到 vouchers，尝试从直接参数中获取
    if (!vouchers) {
      vouchers = event.vouchers;
      console.log('从直接参数获取的 vouchers:', vouchers);
    }
    
    console.log('最终确定的 vouchers:', vouchers);
    
    if (!vouchers || !Array.isArray(vouchers)) {
      return {
        success: false,
        message: '请提供有效的激活码列表'
      }
    }
    
    // 批量添加激活码
    const batchSize = 50
    const batches = []
    
    for (let i = 0; i < vouchers.length; i += batchSize) {
      const batch = vouchers.slice(i, i + batchSize)
      const promises = batch.map(voucher => {
        return vouchersCollection.add({
          data: {
            code: voucher.code,
            duration: voucher.duration,
            durationName: voucher.durationName,
            status: voucher.status || 'unused',
            createdAt: new Date(voucher.createdAt || new Date()),
            usedAt: null,
            usedBy: null
          }
        })
      })
      batches.push(Promise.all(promises))
    }
    
    await Promise.all(batches)
    
    return {
      success: true,
      message: `成功生成 ${vouchers.length} 个激活码`,
      data: vouchers
    }
  } catch (error) {
    console.error('生成激活码失败:', error)
    return {
      success: false,
      message: '生成激活码失败，请稍后重试'
    }
  }
}