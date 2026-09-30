/**
 * 虚拟支付发货推送接收（HTTP 网关函数，地址 https://api.peacelove.top/vpay-notify）
 * MP后台【虚拟支付 → 基本配置 → 基础配置 → 发货推送配置】填本地址 + Token（与 app_config/wxa.payPushToken 一致）
 *
 * - GET  验证：sha1(字典序排序(token,timestamp,nonce)) === signature → 原样返回 echostr（「模拟推送」握手）
 * - POST：解析 XML（兼容 JSON）
 *    · xpay_goods_deliver_notify 发货：按订单 status 幂等（已 delivered 直接回 0），
 *      会员到期时间向后顺延（月 setMonth / 天 setDate，按 Quantity 倍数）
 *    · xpay_refund_notify 退款：订单置 refunded（权益暂不自动回收）
 *    · 其他事件：忽略
 * - 响应：XML 请求回 <xml><ErrCode>0</ErrCode>...（非 0 平台最多重试 15 次）；JSON 请求回 JSON
 */
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

const XML_OK = '<xml><ErrCode>0</ErrCode><ErrMsg><![CDATA[OK]]></ErrMsg></xml>'
const XML_FAIL = '<xml><ErrCode>-1</ErrCode><ErrMsg><![CDATA[FAIL]]></ErrMsg></xml>'

function httpResponse(statusCode, contentType, body) {
  return {
    statusCode,
    headers: { 'Content-Type': contentType },
    body
  }
}

function getQuery(event) {
  if (event.queryStringParameters && typeof event.queryStringParameters === 'object') {
    return event.queryStringParameters
  }
  const qs = event.rawQuery || event.query || (typeof event.url === 'string' ? event.url.split('?')[1] : '') || ''
  const out = {}
  String(qs)
    .split('&')
    .forEach((kv) => {
      if (!kv) return
      const idx = kv.indexOf('=')
      if (idx < 0) return
      try {
        out[decodeURIComponent(kv.slice(0, idx))] = decodeURIComponent(kv.slice(idx + 1))
      } catch (e) { /* 忽略非法编码 */ }
    })
  return out
}

function checkSignature(token, query) {
  if (!token) return true // 首次配置时尚未入库 Token：放行以便「模拟推送」握手成功
  const { signature, timestamp, nonce } = query
  if (!signature || !timestamp || !nonce) return false
  const tmp = [String(token), String(timestamp), String(nonce)].sort().join('')
  return crypto.createHash('sha1').update(tmp, 'utf8').digest('hex') === signature
}

/** 极简 XML → 对象（支持一层嵌套：WeChatPayInfo / GoodsInfo） */
function parseXml(xml) {
  const obj = {}
  const tagRe = /<([A-Za-z0-9_]+)>([\s\S]*?)<\/\1>/g
  let m
  while ((m = tagRe.exec(xml)) !== null) {
    const tag = m[1]
    const inner = m[2]
    if (/<[A-Za-z0-9_]+>/.test(inner)) {
      obj[tag] = parseXml(inner)
    } else {
      obj[tag] = inner.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
    }
  }
  return obj
}

/** 发货：vipValidUntil 向后顺延（到期叠加：base = max(now, 当前到期)） */
async function deliverVip(order, wxOrderId, quantity) {
  const now = new Date()
  const times = Math.max(1, Number(quantity) || 1)
  const found = await db.collection('users').where({ miniOpenid: order.openid }).get()
  let user = found.data && found.data[0]
  if (found.data && found.data.length > 1) user = found.data.find((it) => it.phone) || user
  if (!user) throw new Error('未找到用户记录: ' + order.openid)

  let base = user.vipValidUntil ? new Date(user.vipValidUntil) : null
  if (!base || isNaN(base.getTime()) || base.getTime() < now.getTime()) base = now
  const next = new Date(base.getTime())
  const duration = Number(order.duration) * times
  if (order.durationUnit === 'day') next.setDate(next.getDate() + duration)
  else next.setMonth(next.getMonth() + duration)

  await db.collection('users').doc(user._id).update({
    data: { vipValidUntil: next.toISOString(), vipExpire: next.getTime(), updateTime: now }
  })
  await db.collection('vpay_orders').doc(order._id).update({
    data: { status: 'delivered', wxOrderId: wxOrderId || order.wxOrderId || '', deliveredAt: now }
  })
  console.info('[vpay-notify] 发货成功:', order._id, '→', next.toISOString())
}

async function handleDeliver(payload) {
  const outTradeNo = payload.OutTradeNo || payload.outTradeNo || ''
  const wxInfo = payload.WeChatPayInfo || payload.weChatPayInfo || {}
  const mchOrderNo = wxInfo.MchOrderNo || wxInfo.mchOrderNo || '' // 平台单号 wx_order_id
  const goods = payload.GoodsInfo || payload.goodsInfo || {}
  const quantity = Number(goods.Quantity || goods.quantity || 1)

  if (!outTradeNo) {
    console.error('[vpay-notify] 推送缺少 OutTradeNo:', JSON.stringify(payload).slice(0, 500))
    return // 回 OK 防无意义重试
  }
  const orderRes = await db.collection('vpay_orders').doc(outTradeNo).get().catch(() => null)
  const order = orderRes && orderRes.data
  if (!order) {
    console.error('[vpay-notify] 订单不存在:', outTradeNo)
    return // 回 OK 防重试（异常单人工排查）
  }
  // 幂等：已发货（重复推送 / 平台单号一致）只发一次货
  if (order.status === 'delivered') {
    console.info('[vpay-notify] 重复推送，幂等跳过:', outTradeNo)
    return
  }
  await deliverVip(order, mchOrderNo, quantity)
}

async function handleRefund(payload) {
  const outTradeNo = payload.OutTradeNo || payload.outTradeNo || ''
  if (!outTradeNo) return
  await db
    .collection('vpay_orders')
    .doc(outTradeNo)
    .update({ data: { status: 'refunded', refundTime: new Date() } })
    .catch(() => {})
  // 注：会员权益暂不自动回收，如需回收在此扩展
  console.info('[vpay-notify] 退款已记录:', outTradeNo)
}

exports.main = async (event) => {
  try {
    const method = String(event.httpMethod || 'POST').toUpperCase()
    if (method === 'OPTIONS') return httpResponse(200, 'text/plain', '')

    const query = getQuery(event)
    const wxaRes = await db.collection('app_config').doc('wxa').get().catch(() => null)
    const wxa = (wxaRes && wxaRes.data) || {}
    const token = String(wxa.payPushToken || '')

    if (!checkSignature(token, query)) {
      console.error('[vpay-notify] 签名校验失败')
      return httpResponse(403, 'text/plain', 'signature check failed')
    }

    // GET：平台「模拟推送」验证服务器有效性，原样返回 echostr
    if (method === 'GET') {
      return httpResponse(200, 'text/plain', query.echostr || 'ok')
    }

    // POST：解析推送体（XML 为主，兼容 JSON）
    const raw = typeof event.body === 'string' ? event.body : event.body ? JSON.stringify(event.body) : ''
    if (!raw) return httpResponse(200, 'application/xml', XML_OK)

    let payload = null
    let isJson = false
    const trimmed = raw.trim()
    if (trimmed.startsWith('{')) {
      try { payload = JSON.parse(trimmed); isJson = true } catch (e) { /* 落到空判断 */ }
    } else if (trimmed.startsWith('<')) {
      payload = parseXml(trimmed)
    }
    if (!payload) {
      console.error('[vpay-notify] 无法解析推送体:', raw.slice(0, 300))
      return httpResponse(200, 'application/xml', XML_OK)
    }

    const eventName = payload.Event || payload.event || ''
    if (eventName === 'xpay_goods_deliver_notify') {
      await handleDeliver(payload)
    } else if (eventName === 'xpay_refund_notify') {
      await handleRefund(payload)
    } else {
      console.info('[vpay-notify] 其他事件忽略:', eventName)
    }

    return isJson
      ? httpResponse(200, 'application/json', JSON.stringify({ ErrCode: 0, ErrMsg: 'success' }))
      : httpResponse(200, 'application/xml', XML_OK)
  } catch (err) {
    // 处理异常：回非 0 让平台重试（发货失败场景）；同时前端 vpay-query 查单可兜底
    console.error('[vpay-notify] 处理失败:', err)
    return httpResponse(200, 'application/xml', XML_FAIL)
  }
}
