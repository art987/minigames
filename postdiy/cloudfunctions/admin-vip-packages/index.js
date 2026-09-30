// 管理后台VIP套餐配置云函数
// 支持 action: list / get / create / update / delete / toggle
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

// 简单管理员鉴权（与 admin-auth.js 配置保持一致）
const ADMIN_USER_ID = '15160029349'
const ADMIN_PASSWORD = '123456'

function checkAuth(event) {
  // 从 header 取
  const authHeader =
    (event.headers && (event.headers['Authorization'] || event.headers['authorization'])) ||
    ''
  if (authHeader) {
    // 格式: Basic base64(userId:password)
    try {
      const parts = authHeader.split(' ')
      if (parts.length === 2 && parts[0] === 'Basic') {
        const decoded = Buffer.from(parts[1], 'base64').toString('utf-8')
        const [uid, pwd] = decoded.split(':')
        if (uid === ADMIN_USER_ID && pwd === ADMIN_PASSWORD) {
          return true
        }
      }
    } catch (e) {
      return false
    }
  }
  // 兼容直接传参
  if (event.adminUserId && event.adminPassword) {
    return event.adminUserId === ADMIN_USER_ID && event.adminPassword === ADMIN_PASSWORD
  }
  if (event.body) {
    try {
      const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
      if (body.adminUserId && body.adminPassword) {
        return body.adminUserId === ADMIN_USER_ID && body.adminPassword === ADMIN_PASSWORD
      }
    } catch (e) {
      return false
    }
  }
  return false
}

function parseBody(event) {
  if (event.body) {
    try {
      return typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    } catch (e) {
      return {}
    }
  }
  return event
}

function validatePackage(pkg) {
  if (!pkg) return '套餐数据不能为空'
  if (!pkg.title || !String(pkg.title).trim()) return '套餐名称不能为空'
  // 时长单位：month（月，默认，兼容旧数据）/ day（天，用于 7 天卡等）
  const unit = pkg.durationUnit === 'day' ? 'day' : 'month'
  const duration = Number(pkg.duration)
  if (!duration || duration <= 0 || !Number.isInteger(duration)) {
    return unit === 'day' ? '时长必须是正整数（单位：天）' : '时长必须是正整数（单位：月）'
  }
  const price = Number(pkg.price)
  if (isNaN(price) || price < 0) return '价格必须为非负数字'
  const originalPrice = Number(pkg.originalPrice)
  if (isNaN(originalPrice) || originalPrice < 0) return '原价必须为非负数字'
  // 虚拟支付道具ID（微信后台「道具管理」创建的道具 ID，选填；未填则该套餐不可在小程序内支付购买）
  if (pkg.vpayProductId != null && String(pkg.vpayProductId).trim()) {
    const pid = String(pkg.vpayProductId).trim()
    if (!/^[A-Za-z0-9_\-.]{1,64}$/.test(pid)) return '道具ID只能包含字母、数字、_--.，长度 1-64'
  }

  // 淘宝购买升级码字段校验（可选）
  if (pkg.taobaoEnabled) {
    const taobaoUrl = String(pkg.taobaoUrl || '').trim()
    if (!taobaoUrl) return '开启淘宝购买时必须填写淘宝链接'
    if (!/^https:\/\//i.test(taobaoUrl)) return '淘宝链接必须以 https:// 开头'
    const taobaoPrice = Number(pkg.taobaoPrice)
    if (isNaN(taobaoPrice) || taobaoPrice <= 0) return '淘宝价格必须为正数字'
  }
  return null
}

// 排序值：显式传 0 视为有效（体验卡排最前），空/非法才回退按时长
function resolveSortOrder(pkg) {
  if (pkg.sortOrder !== '' && pkg.sortOrder != null && !isNaN(Number(pkg.sortOrder))) {
    return Number(pkg.sortOrder)
  }
  return Number(pkg.duration) || 0
}

exports.main = async (event, context) => {
  // CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  // 鉴权
  if (!checkAuth(event)) {
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ success: false, message: '未授权访问，请先登录后台管理' })
    }
  }

  const body = parseBody(event)
  const action = body.action || 'list'

  try {
    switch (action) {
      case 'list': {
        // 列表查询（含已禁用）
        let list = []
        try {
          const result = await db
            .collection('vip_packages_config')
            .orderBy('sortOrder', 'asc')
            .limit(100)
            .get()
          list = result.data || []
        } catch (e) {
          const isCollectionNotExist =
            e.errCode === 'DATABASE_COLLECTION_NOT_EXIST' ||
            (e.message && (e.message.includes('collection not exists') || e.message.includes('DATABASE_COLLECTION_NOT_EXIST')))
          if (isCollectionNotExist) {
            try {
              await db.createCollection('vip_packages_config')
            } catch (createErr) {
              console.error('创建集合失败:', createErr)
            }
          }
        }
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({ success: true, data: { packages: list } })
        }
      }

      case 'get': {
        const id = body.id
        if (!id) {
          return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ success: false, message: '套餐ID不能为空' })
          }
        }
        const result = await db.collection('vip_packages_config').doc(id).get()
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({ success: true, data: result.data })
        }
      }

      case 'create': {
        const pkg = body.package
        const validateErr = validatePackage(pkg)
        if (validateErr) {
          return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ success: false, message: validateErr })
          }
        }
        const unit = pkg.durationUnit === 'day' ? 'day' : 'month'
        // 检查 同单位下 duration 是否重复（旧记录无 durationUnit 视为 month）
        try {
          const exists = await db
            .collection('vip_packages_config')
            .where({ duration: Number(pkg.duration) })
            .get()
          const dup = (exists.data || []).some((it) => (it.durationUnit === 'day' ? 'day' : 'month') === unit)
          if (dup) {
            return {
              statusCode: 200,
              headers: HEADERS,
              body: JSON.stringify({
                success: false,
                message: `已存在时长为 ${pkg.duration} ${unit === 'day' ? '天' : '个月'} 的套餐`
              })
            }
          }
        } catch (e) {
          // 集合可能不存在，忽略
        }

        const now = new Date()
        const newPkg = {
          duration: Number(pkg.duration),
          durationUnit: unit,
          vpayProductId: String(pkg.vpayProductId || '').trim(),
          title: String(pkg.title).trim(),
          price: Number(pkg.price),
          originalPrice: Number(pkg.originalPrice),
          saving: pkg.saving || '',
          badge: pkg.badge || '',
          featured: !!pkg.featured,
          enabled: pkg.enabled !== false,
          // 小程序端独立开关（关闭后小程序端不展示，网页端不受影响；缺省视为开启）
          miniEnabled: pkg.miniEnabled !== false,
          sortOrder: resolveSortOrder(pkg),
          promotionText: pkg.promotionText || '',
          // 淘宝购买升级码配置
          taobaoEnabled: !!pkg.taobaoEnabled,
          taobaoUrl: pkg.taobaoEnabled ? String(pkg.taobaoUrl || '').trim() : '',
          taobaoPrice: pkg.taobaoEnabled ? Number(pkg.taobaoPrice) || 0 : 0,
          createTime: now,
          updateTime: now
        }

        const addResult = await db.collection('vip_packages_config').add({ data: newPkg })
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({
            success: true,
            message: '套餐创建成功',
            data: { id: addResult._id, ...newPkg }
          })
        }
      }

      case 'update': {
        const id = body.id
        const pkg = body.package
        if (!id) {
          return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ success: false, message: '套餐ID不能为空' })
          }
        }
        const validateErr = validatePackage(pkg)
        if (validateErr) {
          return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ success: false, message: validateErr })
          }
        }
        const unit = pkg.durationUnit === 'day' ? 'day' : 'month'

        // 检查 duration 是否与其他套餐重复（同单位下）
        try {
          const dupCheck = await db
            .collection('vip_packages_config')
            .where({ _id: _.neq(id), duration: Number(pkg.duration) })
            .get()
          const dup = (dupCheck.data || []).some((it) => (it.durationUnit === 'day' ? 'day' : 'month') === unit)
          if (dup) {
            return {
              statusCode: 200,
              headers: HEADERS,
              body: JSON.stringify({
                success: false,
                message: `其他套餐已使用 ${pkg.duration} ${unit === 'day' ? '天' : '个月'} 时长`
              })
            }
          }
        } catch (e) {
          // 忽略
        }

        const updateData = {
          duration: Number(pkg.duration),
          durationUnit: unit,
          vpayProductId: String(pkg.vpayProductId || '').trim(),
          title: String(pkg.title).trim(),
          price: Number(pkg.price),
          originalPrice: Number(pkg.originalPrice),
          saving: pkg.saving || '',
          badge: pkg.badge || '',
          featured: !!pkg.featured,
          enabled: pkg.enabled !== false,
          // 小程序端独立开关（关闭后小程序端不展示，网页端不受影响；缺省视为开启）
          miniEnabled: pkg.miniEnabled !== false,
          sortOrder: resolveSortOrder(pkg),
          promotionText: pkg.promotionText || '',
          // 淘宝购买升级码配置
          taobaoEnabled: !!pkg.taobaoEnabled,
          taobaoUrl: pkg.taobaoEnabled ? String(pkg.taobaoUrl || '').trim() : '',
          taobaoPrice: pkg.taobaoEnabled ? Number(pkg.taobaoPrice) || 0 : 0,
          updateTime: new Date()
        }

        await db.collection('vip_packages_config').doc(id).update({ data: updateData })
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({
            success: true,
            message: '套餐更新成功',
            data: { id, ...updateData }
          })
        }
      }

      case 'delete': {
        const id = body.id
        if (!id) {
          return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ success: false, message: '套餐ID不能为空' })
          }
        }
        await db.collection('vip_packages_config').doc(id).remove()
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({ success: true, message: '套餐已删除' })
        }
      }

      case 'toggle': {
        // 启用/禁用
        const id = body.id
        if (!id) {
          return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ success: false, message: '套餐ID不能为空' })
          }
        }
        const enabled = body.enabled !== false
        await db
          .collection('vip_packages_config')
          .doc(id)
          .update({ data: { enabled: enabled, updateTime: new Date() } })
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({
            success: true,
            message: enabled ? '套餐已启用' : '套餐已禁用',
            data: { id, enabled }
          })
        }
      }

      default:
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({ success: false, message: `未知操作: ${action}` })
        }
    }
  } catch (error) {
    console.error('admin-vip-packages 执行失败:', error)
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ success: false, message: error.message || '操作失败，请稍后重试' })
    }
  }
}
