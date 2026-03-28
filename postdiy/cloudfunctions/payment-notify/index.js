const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const ZPAY_CONFIG = {
  PKEY: 'dUbS7RLclWErZSyH32n00fMi5CCvsIwb'
}

function generateMD5(str) {
  const crypto = require('crypto')
  return crypto.createHash('md5').update(str).digest('hex')
}

function generateSign(params, key) {
  const sortedKeys = Object.keys(params).sort()
  const signStr = sortedKeys
    .filter(k => params[k] !== '' && params[k] !== null && params[k] !== undefined && k !== 'sign' && k !== 'sign_type')
    .map(k => `${k}=${params[k]}`)
    .join('&')
  return generateMD5(signStr + key)
}

function getDaysByDuration(duration) {
  return duration * 30
}

exports.main = async (event, context) => {
  console.log('收到支付回调:', JSON.stringify(event))
  
  const { pid, trade_no, out_trade_no, type, name, money, trade_status, param, sign } = event
  
  if (!out_trade_no || !trade_status || !sign) {
    return 'fail: 缺少必要参数'
  }
  
  const calculatedSign = generateSign(event, ZPAY_CONFIG.PKEY)
  if (calculatedSign !== sign) {
    console.error('签名验证失败', { calculatedSign, sign })
    return 'fail: 签名验证失败'
  }
  
  if (trade_status !== 'TRADE_SUCCESS') {
    console.log('交易状态非成功:', trade_status)
    return 'success'
  }
  
  try {
    const orderRes = await db.collection('orders')
      .where({
        out_trade_no: out_trade_no
      })
      .get()
    
    if (orderRes.data.length === 0) {
      console.error('订单不存在:', out_trade_no)
      return 'fail: 订单不存在'
    }
    
    const order = orderRes.data[0]
    
    if (order.status === 1) {
      console.log('订单已处理:', out_trade_no)
      return 'success'
    }
    
    const orderMoney = parseFloat(order.money)
    const callbackMoney = parseFloat(money)
    if (Math.abs(orderMoney - callbackMoney) > 0.01) {
      console.error('金额不一致', { orderMoney, callbackMoney })
      return 'fail: 金额不一致'
    }
    
    const userId = param || order.userId
    
    const userRes = await db.collection('users').doc(userId).get()
    if (!userRes.data) {
      console.error('用户不存在:', userId)
      return 'fail: 用户不存在'
    }
    
    const user = userRes.data
    const now = new Date()
    let currentExpireTime = user.vipExpireTime ? new Date(user.vipExpireTime) : now
    if (currentExpireTime < now) {
      currentExpireTime = now
    }
    
    const days = getDaysByDuration(order.duration)
    const newExpireTime = new Date(currentExpireTime)
    newExpireTime.setDate(newExpireTime.getDate() + days)
    
    await db.collection('users').doc(userId).update({
      data: {
        vipExpireTime: newExpireTime,
        isVip: true,
        updateTime: db.serverDate()
      }
    })
    
    await db.collection('orders').doc(order._id).update({
      data: {
        status: 1,
        trade_no: trade_no || '',
        payTime: db.serverDate(),
        notifyData: event
      }
    })
    
    console.log('订单处理成功:', out_trade_no, '用户VIP延长', days, '天')
    
    return 'success'
  } catch (error) {
    console.error('处理支付回调失败:', error)
    return 'fail: ' + error.message
  }
}
