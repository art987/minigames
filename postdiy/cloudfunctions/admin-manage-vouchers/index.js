// 管理后台管理激活码云函数
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
    let action;
    if (event.body) {
      try {
        // 尝试解析 body 为 JSON
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        action = body.action;
        console.log('从 body 解析的 action:', action);
      } catch (e) {
        console.error('解析 body 失败:', e);
      }
    }
    
    // 如果没有从 body 中获取到 action，尝试从直接参数中获取
    if (!action) {
      action = event.action;
      console.log('从直接参数获取的 action:', action);
    }
    
    console.log('最终确定的 action:', action);
    
    switch (action) {
      case 'list':
        return await getVoucherList()
      case 'delete':
        return await deleteVoucher(event.code)
      default:
        return {
          success: false,
          message: '不支持的操作',
          receivedAction: action,
          receivedEvent: event
        }
    }
  } catch (error) {
    console.error('管理激活码失败:', error)
    return {
      success: false,
      message: '操作失败，请稍后重试',
      error: error.message
    }
  }
}

// 获取激活码列表
async function getVoucherList() {
  try {
    const result = await vouchersCollection
      .orderBy('createdAt', 'desc')
      .get()
    
    return {
      success: true,
      data: result.data
    }
  } catch (error) {
    console.error('获取激活码列表失败:', error)
    throw error
  }
}

// 删除激活码
async function deleteVoucher(code) {
  try {
    if (!code) {
      return {
        success: false,
        message: '请提供激活码'
      }
    }
    
    const result = await vouchersCollection
      .where({ code })
      .remove()
    
    return {
      success: true,
      message: '删除成功',
      data: { deleted: result.stats.removed }
    }
  } catch (error) {
    console.error('删除激活码失败:', error)
    throw error
  }
}