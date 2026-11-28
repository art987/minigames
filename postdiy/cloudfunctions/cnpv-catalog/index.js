const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// CORS 响应头（前台页面走 HTTP 网关调用）
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'public, max-age=120'
}

function response(success, dataOrMessage) {
  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify(
      success
        ? { success: true, data: dataOrMessage }
        : { success: false, message: dataOrMessage }
    )
  }
}

exports.main = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: HEADERS, body: '' }
  }

  try {
    const [cats, secs, vids] = await Promise.all([
      db.collection('cnpv_categories').orderBy('order', 'asc').limit(200).get(),
      db.collection('cnpv_sections').orderBy('order', 'asc').limit(500).get(),
      db.collection('cnpv_videos').where({ online: true }).orderBy('order', 'asc').limit(1000).get()
    ])

    const sectionsByCat = {}
    for (const s of secs.data || []) {
      (sectionsByCat[s.categoryId] = sectionsByCat[s.categoryId] || []).push(s)
    }
    const videosBySec = {}
    for (const v of vids.data || []) {
      (videosBySec[v.sectionId] = videosBySec[v.sectionId] || []).push(v)
    }

    let maxUpdated = 0
    const catalog = (cats.data || []).map(c => ({
      name: c.name,
      sections: (sectionsByCat[c._id] || []).map(s => ({
        id: s._id,
        title: s.title,
        items: (videosBySec[s._id] || []).map(v => {
          if (v.updatedAt && v.updatedAt > maxUpdated) maxUpdated = v.updatedAt
          if (c.updatedAt && c.updatedAt > maxUpdated) maxUpdated = c.updatedAt
          if (s.updatedAt && s.updatedAt > maxUpdated) maxUpdated = s.updatedAt
          return {
            t: v.type || 'v',
            s: v.r2Url,      // 主源：R2
            f: v.qiniuUrl,   // 备用：七牛
            l: v.title
          }
        })
      }))
    }))

    // 版本号：内容数量 + 最新更新时间，前台用于 localStorage 缓存判断
    const version = `${cats.data.length}-${secs.data.length}-${vids.data.length}-${maxUpdated}`

    return response(true, { version, catalog })
  } catch (e) {
    console.error('[cnpv-catalog] error', e)
    return response(false, '获取目录失败: ' + e.message)
  }
}
