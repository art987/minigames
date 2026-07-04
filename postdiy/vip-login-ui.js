// 打开支付页面：优先通知 App 打开独立收银台页，避免首页 webview 真的跳入支付链路。
// 如果当前不是 App 内嵌环境，再降级使用 location.assign 直接跳转支付页。
const PAYMENT_SESSION_STORAGE_KEY = 'VIP_PAYMENT_SESSION'
const PAYMENT_REOPEN_GAP_MS = 8000

// 支付状态恢复相关 localStorage key
// VIP_PENDING_PAYMENT：首页发起支付时写入，用于 App 关闭收银台后恢复检测
// VIP_PAYMENT_RETURN：payment-return.html 写入，用于首页恢复可见时读取支付结果
const PENDING_PAYMENT_STORAGE_KEY = 'VIP_PENDING_PAYMENT'
const PAYMENT_RETURN_STORAGE_KEY = 'VIP_PAYMENT_RETURN'
// pending payment 视为过期的时间（30 分钟），过期后不再恢复检测
const PENDING_PAYMENT_MAX_AGE_MS = 30 * 60 * 1000

// ===== VIP 套餐（云端管理）统一渲染函数 =====
// 在 vip-login-ui.js / editor-script.js 中复用
// options.style: 'inline'（内联 style） | 'class'（对接 styles.css 的 .vip-package 类）
// options.autoSelectFirst: 是否自动选中第一个套餐
async function renderVipPackagesToGrid(container, options) {
  if (!container) return
  const opts = options || {}
  const styleMode = opts.style || 'inline'

  // 先显示 loading
  container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #999; font-size: 13px;">套餐加载中...</div>`

  let packages = []
  try {
    const result = await (window.VIPSystem && typeof window.VIPSystem.getVipPackages === 'function'
      ? window.VIPSystem.getVipPackages()
      : Promise.resolve({ success: false, data: { packages: [] } }))
    if (result.success && result.data && Array.isArray(result.data.packages) && result.data.packages.length > 0) {
      packages = result.data.packages
    } else {
      // 云端无套餐时使用兜底默认套餐
      packages = window.VIPSystem && typeof window.VIPSystem.getDefaultVipPackages === 'function'
        ? window.VIPSystem.getDefaultVipPackages()
        : []
      console.warn('[vip-packages] 云端套餐为空，使用兜底默认套餐')
    }
  } catch (err) {
    console.error('[vip-packages] 拉取云端套餐失败，使用兜底默认套餐:', err)
    packages = window.VIPSystem && typeof window.VIPSystem.getDefaultVipPackages === 'function'
      ? window.VIPSystem.getDefaultVipPackages()
      : []
  }

  // 按 sortOrder 升序
  packages.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

  if (packages.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #999; font-size: 13px;">暂无可选套餐</div>`
    return
  }

  container.innerHTML = packages.map(pkg => {
    const pid = pkg._id || ''
    const duration = pkg.duration
    const price = pkg.price
    const originalPrice = pkg.originalPrice
    const title = pkg.title || `${duration}个月VIP`
    const saving = pkg.saving || ''
    const badge = pkg.badge || ''
    const featured = !!pkg.featured

    if (styleMode === 'class') {
      // 对接 styles.css 的 .vip-package 类（用于 VIP 升级弹窗）
      const featuredClass = featured ? ' vip-package-featured' : ''
      const badgeHtml = badge ? `<div class="package-badge">${badge}</div>` : ''
      return `
        <div class="vip-package${featuredClass}" data-duration="${duration}" data-price="${price}" data-original-price="${originalPrice}" data-package-id="${pid}">
          ${badgeHtml}
          <h5 class="package-title">${title}</h5>
          <div class="package-price">
            <span class="package-current-price">¥${price}</span>
            <span class="package-original-price">¥${originalPrice}</span>
          </div>
          <div class="package-saving">${saving}</div>
          <button class="select-package-btn">选择</button>
        </div>
      `
    }

    // inline 风格（用于 VIP Login Modal 内的 grid）
    const badgeHtml = badge ? `<div style="position: absolute; top: -8px; right: -8px; background: #d32f2f; color: white; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px;">${badge}</div>` : ''
    const featuredBorder = featured ? 'border: 2px solid #d32f2f;' : 'border: 2px solid #ffcdd2;'
    return `
      <div class="vip-package" data-duration="${duration}" data-price="${price}" data-original-price="${originalPrice}" data-package-id="${pid}" style="padding: 16px; background: #fff; ${featuredBorder} border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative;">
        ${badgeHtml}
        <h5 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">${title}</h5>
        <div style="margin-bottom: 8px;">
          <span style="color: #d32f2f; font-size: 18px; font-weight: bold;">¥${price}</span>
          <span style="color: #999; font-size: 12px; text-decoration: line-through; margin-left: 4px;">¥${originalPrice}</span>
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 12px;">${saving}</div>
        <button class="select-package-btn" style="width: 100%; padding: 8px; background: #fff; border: 1px solid #d32f2f; color: #d32f2f; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">选择</button>
      </div>
    `
  }).join('')

  // 默认选中 featured 套餐，没有则选第一个
  const featuredPkg = container.querySelector('.vip-package.vip-package-featured') || container.querySelector('.vip-package')
  if (featuredPkg) {
    if (styleMode === 'class') {
      featuredPkg.classList.add('selected')
      const btn = featuredPkg.querySelector('.select-package-btn')
      if (btn) btn.textContent = '✔ 已选择'
      // 同步外部"立即支付"按钮文案
      const price = featuredPkg.dataset.price
      const proceedBtn = document.getElementById('proceedToPaymentBtn')
      if (proceedBtn) {
        proceedBtn.textContent = `立即支付${price}元`
        proceedBtn.style.display = 'block'
      }
    } else {
      // inline 风格默认不选中，让用户主动选（保持原行为）
      // 如果想要默认选中可在此处设置
    }
  }
}

function buildPaymentReturnUrl() {
  try {
    const currentUrl = new URL(window.location.href)
    const pathname = currentUrl.pathname || '/'
    const lastSlashIndex = pathname.lastIndexOf('/')
    const basePath = lastSlashIndex >= 0 ? pathname.slice(0, lastSlashIndex + 1) : '/'
    return `${currentUrl.origin}${basePath}payment-return.html`
  } catch (e) {
    console.warn('[payment-flow] 构建支付回跳页失败，回退默认文件名:', e)
    return 'payment-return.html'
  }
}

// 暴露给 editor-script.js 等其他脚本使用
window.renderVipPackagesToGrid = renderVipPackagesToGrid

function postPaymentMessageToApp(payUrl, outTradeNo) {
  const payload = {
    action: 'openPaymentUrl',
    url: payUrl,
    outTradeNo: outTradeNo || '',
    returnMode: 'success-relay'
  }

  try {
    if (window.uni && window.uni.webView && typeof window.uni.webView.postMessage === 'function') {
      window.uni.webView.postMessage({ data: payload })
      console.log('[payment-flow] 已通过 uni.webView.postMessage 通知 App 打开收银台')
      return true
    }

    if (window.__uniapp_x_postMessage) {
      window.__uniapp_x_postMessage({ data: payload })
      console.log('[payment-flow] 已通过 __uniapp_x_postMessage 通知 App 打开收银台')
      return true
    }

    if (window.__uniapp_x_ && typeof window.__uniapp_x_.postMessage === 'function') {
      window.__uniapp_x_.postMessage(JSON.stringify({ data: payload }))
      console.log('[payment-flow] 已通过 __uniapp_x_.postMessage 通知 App 打开收银台')
      return true
    }
  } catch (e) {
    console.error('[payment-flow] 通知 App 打开收银台失败:', e)
  }

  return false
}

function getPaymentSession() {
  try {
    const raw = window.sessionStorage.getItem(PAYMENT_SESSION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch (e) {
    console.warn('[payment-flow] 读取支付会话失败:', e)
    return null
  }
}

function setPaymentSession(session) {
  try {
    window.sessionStorage.setItem(PAYMENT_SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch (e) {
    console.warn('[payment-flow] 保存支付会话失败:', e)
  }
}

function clearPaymentSession() {
  try {
    window.sessionStorage.removeItem(PAYMENT_SESSION_STORAGE_KEY)
  } catch (e) {
    console.warn('[payment-flow] 清理支付会话失败:', e)
  }
}

function isSamePaymentSession(payUrl, outTradeNo) {
  const current = getPaymentSession()
  if (!current) return false
  const now = Date.now()
  const sameUrl = current.payUrl === payUrl
  const sameOrder = !!outTradeNo && current.outTradeNo === outTradeNo
  return (sameUrl || sameOrder) && now - (current.createdAt || 0) < PAYMENT_REOPEN_GAP_MS
}

// ==================== pending payment 状态管理 ====================
// 这一组方法用 localStorage 持久化"正在进行的支付"，
// 用于 App 关闭收银台、首页 webview 恢复可见后恢复检测。
// sessionStorage 在 App 切换收银台过程中不一定可靠，所以这里用 localStorage。

function getPendingPayment() {
  try {
    const raw = window.localStorage.getItem(PENDING_PAYMENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    console.log('[payment-flow] get pending payment:', parsed)
    return parsed
  } catch (e) {
    console.warn('[payment-flow] get pending payment 失败:', e)
    return null
  }
}

function setPendingPayment(data) {
  try {
    const session = {
      outTradeNo: (data && data.outTradeNo) || '',
      payUrl: (data && data.payUrl) || '',
      createdAt: Date.now(),
      status: 'pending'
    }
    window.localStorage.setItem(PENDING_PAYMENT_STORAGE_KEY, JSON.stringify(session))
    console.log('[payment-flow] set pending payment:', session)
  } catch (e) {
    console.warn('[payment-flow] set pending payment 失败:', e)
  }
}

function clearPendingPayment() {
  try {
    window.localStorage.removeItem(PENDING_PAYMENT_STORAGE_KEY)
    console.log('[payment-flow] clear pending payment')
  } catch (e) {
    console.warn('[payment-flow] clear pending payment 失败:', e)
  }
}

// ==================== payment-return 结果读取 ====================
// payment-return.html 在收到 zpay 回跳时，会把支付结果写入 VIP_PAYMENT_RETURN。
// 首页恢复可见后，通过下面这些方法读取并消费这份结果。

function getPaymentReturnResult() {
  try {
    const raw = window.localStorage.getItem(PAYMENT_RETURN_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch (e) {
    console.warn('[payment-flow] get payment return 失败:', e)
    return null
  }
}

function clearPaymentReturnResult() {
  try {
    window.localStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY)
    console.log('[payment-flow] clear payment return')
  } catch (e) {
    console.warn('[payment-flow] clear payment return 失败:', e)
  }
}

// 消费 payment-return 留下的结果：如果与当前 pending payment 匹配且为成功，
// 立即触发订单确认。返回是否已触发确认。
function consumePaymentReturnResult() {
  const result = getPaymentReturnResult()
  const pending = getPendingPayment()
  console.log('[payment-flow] consume payment return, result:', result, 'pending:', pending)

  if (!result || !pending) return false
  if (!result.outTradeNo || !pending.outTradeNo) return false
  if (result.outTradeNo !== pending.outTradeNo) return false
  if (result.tradeStatus !== 'TRADE_SUCCESS') return false

  // 命中成功结果，立即去确认
  verifyPendingPaymentResult(pending.outTradeNo)
  return true
}

// 确认支付结果：优先按订单号查询（更准确），VIP 状态作为兜底。
// 确认成功后统一收尾：停轮询、关弹窗、清状态、弹成功提示。
// 若本次未确认成功，启动轮询兜底，避免出现“没人继续检测”的空窗。
async function verifyPendingPaymentResult(outTradeNo) {
  console.log('[payment-flow] verify pending payment result, outTradeNo:', outTradeNo)
  try {
    // 第一优先级：按订单号查询支付状态
    if (outTradeNo && typeof VIPSystem !== 'undefined' && VIPSystem.queryPaymentOrder) {
      console.log('[payment-flow] query order status by outTradeNo')
      const orderResult = await VIPSystem.queryPaymentOrder(outTradeNo)
      console.log('[payment-flow] query order status result:', orderResult)
      if (orderResult && orderResult.success && orderResult.data && orderResult.data.paid) {
        console.log('[payment-flow] payment confirmed success (by order query), outTradeNo:', outTradeNo)
        stopPaymentPolling()
        const waitingModal = document.getElementById('paymentWaitingModal')
        if (waitingModal) waitingModal.remove()
        clearPendingPayment()
        clearPaymentReturnResult()
        // 订单查询已确认支付成功，主动刷新一次本地 VIP 状态（避免后端补单延迟导致前端显示未开通）
        try {
          const userId = VIPSystem.getUserId ? VIPSystem.getUserId() : null
          if (userId) {
            await VIPSystem.checkVipStatus(userId)
            console.log('[payment-flow] vip status refreshed after order confirmed')
          }
        } catch (e) {
          console.warn('[payment-flow] 刷新 VIP 状态失败（不影响支付成功提示）:', e)
        }
        showPaymentResultModal({ success: true, outTradeNo: outTradeNo || '' })
        return true
      }
      console.log('[payment-flow] order query 未确认成功，fallback 到 VIP 状态查询')
    } else {
      console.log('[payment-flow] 无 outTradeNo 或 queryPaymentOrder 不可用，fallback 到 VIP 状态查询')
    }

    // 第二优先级：VIP 状态兜底
    const userId = (typeof VIPSystem !== 'undefined' && VIPSystem.getUserId) ? VIPSystem.getUserId() : null
    if (!userId) {
      console.warn('[payment-flow] verify 失败：无 userId，启动轮询兜底')
      console.log('[payment-flow] restart payment polling, outTradeNo:', outTradeNo)
      startPaymentPolling(outTradeNo)
      return false
    }
    const vipResult = await VIPSystem.checkVipStatus(userId)
    console.log('[payment-flow] vip status fallback result:', vipResult)
    if (vipResult && vipResult.success && vipResult.data && vipResult.data.isVip) {
      console.log('[payment-flow] payment confirmed success (by vip status), outTradeNo:', outTradeNo)
      stopPaymentPolling()
      const waitingModal = document.getElementById('paymentWaitingModal')
      if (waitingModal) waitingModal.remove()
      clearPendingPayment()
      clearPaymentReturnResult()
      showPaymentResultModal({ success: true, outTradeNo: outTradeNo || '' })
      return true
    }
    console.log('[payment-flow] verify 暂未确认成功，启动轮询兜底')
    // 确保等待弹窗在显示，并启动轮询继续检测
    showPaymentWaitingModal(outTradeNo)
    console.log('[payment-flow] restart payment polling, outTradeNo:', outTradeNo)
    startPaymentPolling(outTradeNo)
    return false
  } catch (e) {
    console.error('[payment-flow] verify pending payment result 异常:', e)
    // 异常时也启动轮询兜底
    showPaymentWaitingModal(outTradeNo)
    console.log('[payment-flow] restart payment polling (after error), outTradeNo:', outTradeNo)
    startPaymentPolling(outTradeNo)
    return false
  }
}

// 首页恢复可见时统一恢复支付检测入口。
function resumePendingPaymentFlow() {
  const pending = getPendingPayment()
  console.log('[payment-flow] resume pending payment flow, pending:', pending)
  if (!pending) return

  // 过期的 pending 不再恢复，直接清理
  const now = Date.now()
  if (!pending.createdAt || now - pending.createdAt > PENDING_PAYMENT_MAX_AGE_MS) {
    console.warn('[payment-flow] pending payment 已过期，清理')
    clearPendingPayment()
    clearPaymentReturnResult()
    stopPaymentPolling()
    return
  }

  // 先尝试消费 payment-return 的成功结果
  const consumed = consumePaymentReturnResult()
  if (consumed) return

  // 还没确认成功：确保等待弹窗在显示，并重启轮询
  showPaymentWaitingModal(pending.outTradeNo)
  console.log('[payment-flow] restart payment polling, outTradeNo:', pending.outTradeNo)
  startPaymentPolling(pending.outTradeNo)
}

function openPaymentPage(payUrl, outTradeNo) {
  console.log('[payment-flow] openPaymentPage called, payUrl:', payUrl)
  console.log('[payment-flow] payUrl host:', (() => {
    try {
      const url = new URL(payUrl)
      return url.host
    } catch (e) {
      return 'parse failed'
    }
  })())

  if (postPaymentMessageToApp(payUrl, outTradeNo)) {
    return true
  }

  // 降级方案：非 App 环境仍然允许当前页面直接跳到支付页。
  try {
    window.location.assign(payUrl)
    console.log('[payment-flow] 已执行 location.assign')
  } catch (e) {
    console.error('[payment-flow] location.assign 失败:', e)
    // 兜底：直接赋值
    window.location.href = payUrl
    console.log('[payment-flow] 已执行 window.location.href 作为兜底')
  }
  return true
}

// 发起支付：打开支付页 + 等待弹窗 + 轮询
function initiatePayment(payUrl, outTradeNo) {
  console.log('[payment-flow] initiatePayment called')
  console.log('[payment-flow] payUrl:', payUrl)
  console.log('[payment-flow] outTradeNo:', outTradeNo)
  console.log('[payment-flow] current location:', window.location.href)

  if (isSamePaymentSession(payUrl, outTradeNo)) {
    console.warn('[payment-flow] 检测到重复支付会话，忽略再次发起')
    showPaymentWaitingModal(outTradeNo)
    startPaymentPolling(outTradeNo)
    return
  }

  setPaymentSession({
    payUrl,
    outTradeNo: outTradeNo || '',
    createdAt: Date.now(),
    status: 'pending'
  })

  // 同步写入 localStorage pending payment，供 App 关闭收银台后首页恢复可见时恢复检测
  setPendingPayment({
    payUrl,
    outTradeNo: outTradeNo || ''
  })

  openPaymentPage(payUrl, outTradeNo)

  // 延迟显示等待弹窗：给 APP 端时间拦截支付域名
  // 如果 APP 拦截成功，原页面保持不变，等待弹窗正常显示
  // 如果 APP 没有拦截，页面被支付页替换，等待弹窗不会显示（这没关系）
  setTimeout(() => {
    console.log('[payment-flow] 500ms 后准备显示等待弹窗')
    console.log('[payment-flow] 当前 location:', window.location.href)
    showPaymentWaitingModal(outTradeNo)
    startPaymentPolling(outTradeNo)
  }, 500)
}

// 支付轮询
let paymentPollingTimer = null
let paymentPollingCount = 0

function startPaymentPolling(outTradeNo) {
  stopPaymentPolling()
  paymentPollingCount = 0
  paymentPollingTimer = setInterval(async () => {
    paymentPollingCount++
    if (paymentPollingCount > 100) {
      stopPaymentPolling()
      const m = document.getElementById('paymentWaitingModal')
      if (m) {
        const s = m.querySelector('#pollingStatus')
        if (s) s.innerHTML = '<span style="color:#ff9800;">轮询超时，请点击下方按钮手动查询</span>'
      }
      return
    }
    try {
      const userId = VIPSystem.getUserId ? VIPSystem.getUserId() : null
      if (!userId) return

      // 第一优先级：按订单号查询支付状态
      if (outTradeNo && VIPSystem.queryPaymentOrder) {
        const orderResult = await VIPSystem.queryPaymentOrder(outTradeNo)
        if (orderResult && orderResult.success && orderResult.data && orderResult.data.paid) {
          console.log('[payment-flow] payment confirmed success (polling by order query), outTradeNo:', outTradeNo)
          stopPaymentPolling()
          const m = document.getElementById('paymentWaitingModal')
          if (m) m.remove()
          clearPendingPayment()
          clearPaymentReturnResult()
          // 刷新 VIP 状态
          try { await VIPSystem.checkVipStatus(userId) } catch (e) {}
          showPaymentResultModal({ success: true, outTradeNo: outTradeNo || '' })
          return
        }
      }

      // 第二优先级：VIP 状态兜底
      const result = await VIPSystem.checkVipStatus(userId)
      if (result.success && result.data && result.data.isVip) {
        console.log('[payment-flow] payment confirmed success (polling by vip status), outTradeNo:', outTradeNo)
        stopPaymentPolling()
        const m = document.getElementById('paymentWaitingModal')
        if (m) m.remove()
        clearPendingPayment()
        clearPaymentReturnResult()
        showPaymentResultModal({ success: true, outTradeNo: outTradeNo || '' })
      }
    } catch (e) {
      console.log('支付轮询异常:', e)
    }
  }, 3000)
}

function stopPaymentPolling() {
  if (paymentPollingTimer) {
    clearInterval(paymentPollingTimer)
    paymentPollingTimer = null
  }
  paymentPollingCount = 0
}

function finishPaymentSession(status) {
  const session = getPaymentSession()
  if (session) {
    session.status = status || 'finished'
    session.finishedAt = Date.now()
    setPaymentSession(session)
  }
  clearPaymentSession()
}

// 等待支付弹窗
function showPaymentWaitingModal(outTradeNo) {
  const existing = document.getElementById('paymentWaitingModal')
  if (existing) existing.remove()
  const modal = document.createElement('div')
  modal.id = 'paymentWaitingModal'
  modal.className = 'order-history-modal'
  modal.innerHTML = `
    <div class="order-history-content" style="max-width:380px;width:92%;margin-top:-60px;">
      <div class="order-history-header">
        <h3 style="color:#fff;font-size:17px;font-weight:600;">等待支付</h3>
        <button id="closeWaitingBtn" style="background:none;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;opacity:0.9;padding:0;font-family:sans-serif;">&times;</button>
      </div>
      <div style="padding:28px 20px;text-align:center;">
        <div style="width:56px;height:56px;margin:0 auto 16px;">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style="animation:spin 2s linear infinite;">
            <circle cx="28" cy="28" r="24" stroke="#e0e0e0" stroke-width="3" fill="none"/>
            <circle cx="28" cy="28" r="24" stroke="#d32f2f" stroke-width="3" fill="none" stroke-dasharray="150" stroke-dashoffset="40" stroke-linecap="round"/>
          </svg>
        </div>
        <h4 style="margin:0 0 8px;font-size:17px;color:#333;font-weight:600;">正在等待支付结果</h4>
        <p style="margin:0 0 6px;color:#888;font-size:13px;line-height:1.6;">请在微信中完成支付，系统将自动检测</p>
        <p id="pollingStatus" style="margin:0 0 20px;color:#bbb;font-size:12px;">正在检测支付状态...</p>
        ${outTradeNo ? `<p style="margin:0 0 20px;color:#ccc;font-size:11px;">订单号：${outTradeNo}</p>` : ''}
        <button id="checkPaymentBtn" style="width:100%;padding:12px;font-size:15px;border:none;border-radius:10px;cursor:pointer;background:linear-gradient(135deg,#d32f2f,#f44336);color:#fff;font-weight:600;margin-bottom:10px;">已完成支付，查询结果</button>
        <button id="cancelWaitingBtn" style="width:100%;padding:12px;font-size:15px;border:1px solid #ddd;border-radius:10px;cursor:pointer;background:#fff;color:#888;font-weight:500;">取消等待</button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
  modal.querySelector('#checkPaymentBtn').addEventListener('click', async () => {
    const btn = modal.querySelector('#checkPaymentBtn')
    btn.disabled = true
    btn.textContent = '正在查询...'
    try {
      const userId = VIPSystem.getUserId ? VIPSystem.getUserId() : null
      // 第一优先级：按订单号查询
      if (outTradeNo && VIPSystem.queryPaymentOrder) {
        const orderResult = await VIPSystem.queryPaymentOrder(outTradeNo)
        if (orderResult && orderResult.success && orderResult.data && orderResult.data.paid) {
          stopPaymentPolling()
          modal.remove()
          finishPaymentSession('success')
          clearPendingPayment()
          clearPaymentReturnResult()
          // 刷新 VIP 状态
          if (userId) { try { await VIPSystem.checkVipStatus(userId) } catch (e) {} }
          showPaymentResultModal({ success: true, outTradeNo: outTradeNo || '' })
          return
        }
      }
      // 第二优先级：VIP 状态兜底
      if (userId) {
        const result = await VIPSystem.checkVipStatus(userId)
        if (result.success && result.data && result.data.isVip) {
          stopPaymentPolling()
          modal.remove()
          finishPaymentSession('success')
          clearPendingPayment()
          clearPaymentReturnResult()
          showPaymentResultModal({ success: true, outTradeNo: outTradeNo || '' })
          return
        }
      }
    } catch (e) { console.error('查询失败:', e) }
    btn.disabled = false
    btn.textContent = '已完成支付，查询结果'
    const s = modal.querySelector('#pollingStatus')
    if (s) s.innerHTML = '<span style="color:#ff9800;">暂未检测到支付成功，请确认是否已完成支付</span>'
  })
  // 统一取消逻辑：停止轮询、关闭弹窗、清理 pending/return 状态
  const cancelPaymentWaiting = (reason) => {
    console.log('[payment-flow] 用户取消支付等待, outTradeNo:', outTradeNo, 'reason:', reason || 'user_cancel')
    stopPaymentPolling()
    modal.remove()
    finishPaymentSession('cancelled')
    // 用户主动取消等待：清理 pending payment 状态，避免恢复可见后又自动弹回等待
    clearPendingPayment()
    clearPaymentReturnResult()
    // 通知 App 关闭收银台（如有）
    try {
      if (window.uni && window.uni.postMessage) {
        window.uni.postMessage({ data: { action: 'cancelPayment', outTradeNo: outTradeNo || '' } })
      }
    } catch (e) { console.warn('[payment-flow] 通知 App 取消支付失败:', e) }
  }

  // 右上角关闭按钮：取消支付 + 取消订单
  const closeBtn = modal.querySelector('#closeWaitingBtn')
  if (closeBtn) closeBtn.addEventListener('click', () => cancelPaymentWaiting('close_btn'))
  // 底部取消等待按钮：同效
  const cancelBtn = modal.querySelector('#cancelWaitingBtn')
  if (cancelBtn) cancelBtn.addEventListener('click', () => cancelPaymentWaiting('cancel_btn'))
}

// 支付结果弹窗
// 彩纸迸发特效（红金尊贵配色）
function launchPaymentConfetti() {
  // 复用已存在的容器避免重复
  const existing = document.getElementById('paymentConfettiContainer')
  if (existing) existing.remove()
  const container = document.createElement('div')
  container.id = 'paymentConfettiContainer'
  container.className = 'confetti-container'
  document.body.appendChild(container)

  // 红金主色调，搭配少量彩色增加喜庆感
  const colors = ['#ffd700', '#ff4d4f', '#c41e3a', '#ff7a45', '#faad14', '#ffe58f', '#fff1b8', '#ffec3d']
  const shapes = ['square', 'circle', 'rectangle']

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div')
    piece.className = 'confetti-piece'
    const color = colors[Math.floor(Math.random() * colors.length)]
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const left = Math.random() * 100
    const delay = Math.random() * 1.2
    const duration = 2.2 + Math.random() * 2.5
    const size = 6 + Math.random() * 10

    piece.style.left = left + '%'
    piece.style.animationDelay = delay + 's'
    piece.style.animationDuration = duration + 's'
    piece.style.backgroundColor = color

    if (shape === 'circle') {
      piece.style.borderRadius = '50%'
      piece.style.width = size + 'px'
      piece.style.height = size + 'px'
    } else if (shape === 'rectangle') {
      piece.style.width = size * 0.4 + 'px'
      piece.style.height = size + 'px'
    } else {
      piece.style.width = size + 'px'
      piece.style.height = size + 'px'
    }
    container.appendChild(piece)
  }
  setTimeout(() => container.remove(), 5500)
}

// 格式化会员有效期展示
function formatVipExpiry(vipValidUntil) {
  if (!vipValidUntil) return ''
  try {
    const d = new Date(vipValidUntil)
    if (isNaN(d.getTime())) return ''
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  } catch (e) { return '' }
}

function showPaymentResultModal(options = {}) {
  const { success = true, outTradeNo = '', message = '' } = options
  const existing = document.getElementById('paymentResultModal')
  if (existing) existing.remove()
  const modal = document.createElement('div')
  modal.id = 'paymentResultModal'
  modal.className = 'order-history-modal'

  if (success) {
    // 成功：红金尊贵主题 + 彩纸特效
    launchPaymentConfetti()

    // 读取会员有效期
    let expiryText = ''
    try {
      if (typeof VIPSystem !== 'undefined' && VIPSystem.getVipExpireTime) {
        expiryText = formatVipExpiry(VIPSystem.getVipExpireTime())
      }
    } catch (e) { console.warn('读取 VIP 有效期失败:', e) }

    // 皇冠 SVG
    const crownSvg = `<svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <defs>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd700"/>
          <stop offset="100%" stop-color="#ffa940"/>
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="34" fill="#fff8e1" stroke="#ffd700" stroke-width="2"/>
      <path d="M20 44 L16 28 L26 36 L36 22 L46 36 L56 28 L52 44 Z" fill="url(#crownGrad)" stroke="#c41e3a" stroke-width="1.2" stroke-linejoin="round"/>
      <rect x="20" y="44" width="32" height="5" rx="2" fill="url(#crownGrad)" stroke="#c41e3a" stroke-width="1.2"/>
      <circle cx="36" cy="29" r="2.2" fill="#c41e3a"/>
      <circle cx="26" cy="34" r="1.8" fill="#c41e3a"/>
      <circle cx="46" cy="34" r="1.8" fill="#c41e3a"/>
    </svg>`

    modal.innerHTML = `
      <div class="order-history-content" style="max-width:420px;width:92%;margin-top:-50px;border:none;border-radius:18px;overflow:hidden;box-shadow:0 12px 48px rgba(196,30,58,0.35);">
        <div style="background:linear-gradient(135deg,#c41e3a 0%,#e84a5f 50%,#ff6b6b 100%);padding:28px 20px 22px;text-align:center;position:relative;">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#ffd700,#fff1b8,#ffd700);"></div>
          <div style="margin-bottom:10px;">${crownSvg}</div>
          <h3 style="margin:0;color:#fff;font-size:21px;font-weight:700;letter-spacing:1px;text-shadow:0 2px 8px rgba(0,0,0,0.2);">恭喜您成为闪喵VIP会员</h3>
          <p style="margin:10px 0 0;color:#fff5e6;font-size:13px;line-height:1.6;opacity:0.95;">感谢您的支持，您可以无限额度<br>制作下载朋友圈节日海报啦！</p>
        </div>
        <div style="background:linear-gradient(180deg,#fff8e1 0%,#ffffff 100%);padding:18px 22px 22px;">
          ${expiryText ? `<div style="text-align:center;margin-bottom:16px;">
            <span style="display:inline-block;padding:7px 18px;background:linear-gradient(135deg,#fff3cd,#ffe69c);border:1.5px solid #ffd700;border-radius:20px;color:#8a5a00;font-size:13px;font-weight:600;">
              <span style="color:#c41e3a;">会员有效期至</span> ${expiryText}
            </span>
          </div>` : ''}
          ${outTradeNo ? `<p style="margin:0 0 14px;text-align:center;color:#bbb;font-size:11px;">订单号：${outTradeNo}</p>` : ''}
          <button id="confirmPaymentResultBtn" style="width:100%;padding:14px;font-size:16px;border:none;border-radius:12px;cursor:pointer;background:linear-gradient(135deg,#c41e3a,#e84a5f);color:#fff;font-weight:600;letter-spacing:2px;box-shadow:0 4px 14px rgba(196,30,58,0.4);">开始体验</button>
        </div>
      </div>
    `
    document.body.appendChild(modal)

    const closeAll = () => {
      finishPaymentSession('success')
      modal.remove()
      // 关闭所有相关弹窗（VIP升级弹窗、等待弹窗等）
      const modalIds = ['vipUpgradeModal', 'paymentWaitingModal', 'paymentSuccessModal', 'vipLoginModal']
      modalIds.forEach(id => {
        const m = document.getElementById(id)
        if (m) m.remove()
      })
      // 关闭其他可能存在的弹窗
      document.querySelectorAll('.order-history-modal, .global-modal-overlay').forEach(el => {
        if (el.id !== 'paymentResultModal') el.remove()
      })
      if (typeof updateVipStatus === 'function') updateVipStatus()
      // 刷新下载次数显示（VIP用户会清理 downloadQuotaDisplay 元素）
      if (typeof loadDownloadQuota === 'function') {
        try { loadDownloadQuota() } catch (e) { console.warn('刷新下载次数显示失败:', e) }
      }
      // 主动从服务器拉取最新用户信息，确保 VIP 状态、有效期等实时同步
      const currentUserId = VIPSystem.getUserId ? VIPSystem.getUserId() : null
      if (currentUserId && VIPSystem.getUserInfoById) {
        VIPSystem.getUserInfoById(currentUserId).then(() => {
          console.log('[payment-flow] 已从服务器刷新用户信息')
          if (typeof updateVipStatus === 'function') updateVipStatus()
          if (typeof loadDownloadQuota === 'function') {
            try { loadDownloadQuota() } catch (e) {}
          }
        }).catch(e => console.warn('[payment-flow] 刷新用户信息失败:', e))
      }
    }
    modal.querySelector('#confirmPaymentResultBtn').addEventListener('click', closeAll)
    // 成功弹窗不允许点击遮罩关闭，必须点按钮
  } else {
    // 失败：保持原有简洁样式
    const iconSvg = `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="26" fill="#fbe9e7" stroke="#e53935" stroke-width="2.5"/><path d="M20 20l16 16M36 20l-16 16" stroke="#e53935" stroke-width="3.5" stroke-linecap="round"/></svg>`
    modal.innerHTML = `
      <div class="order-history-content" style="max-width:400px;width:92%;margin-top:-60px;">
        <div class="order-history-header" style="background:linear-gradient(135deg,#e53935,#ef5350);">
          <h3 style="color:#fff;font-size:17px;font-weight:600;">支付失败</h3>
          <button id="closePaymentResultBtn" style="background:none;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;opacity:0.9;padding:0;font-family:sans-serif;">&times;</button>
        </div>
        <div style="padding:24px 20px;">
          <div style="text-align:center;margin-bottom:12px;">${iconSvg}</div>
          <h4 style="margin:0 0 6px;text-align:center;font-size:19px;color:#c62828;font-weight:700;">支付未完成</h4>
          <p style="margin:0 0 4px;text-align:center;color:#888;font-size:14px;line-height:1.5;">${message || '支付未完成或已取消'}</p>
          ${outTradeNo ? `<p style="margin:8px 0 16px;text-align:center;color:#ccc;font-size:11px;">订单号：${outTradeNo}</p>` : '<div style="height:16px;"></div>'}
          <button id="confirmPaymentResultBtn" style="width:100%;padding:13px;font-size:16px;border:none;border-radius:10px;cursor:pointer;background:linear-gradient(135deg,#d32f2f,#f44336);color:#fff;font-weight:600;letter-spacing:1px;">重新下单</button>
        </div>
      </div>
    `
    document.body.appendChild(modal)
    const close = () => {
      finishPaymentSession('closed')
      modal.remove()
      if (typeof updateVipStatus === 'function') updateVipStatus()
    }
    modal.querySelector('#closePaymentResultBtn').addEventListener('click', close)
    modal.querySelector('#confirmPaymentResultBtn').addEventListener('click', close)
    modal.addEventListener('click', (e) => { if (e.target === modal) close() })
  }
}

// VIP 登录 UI 模块
const VipLoginUI = (function() {
  // DOM 元素缓存
  let elements = {}
  let eventsBound = false
  let switchEventsBound = false
  let smsSent = false
  
  // 检查支付成功状态
  function checkPaymentSuccess() {
    const urlParams = new URLSearchParams(window.location.search)
    const outTradeNo = urlParams.get('out_trade_no')
    const paySuccess = urlParams.get('pay_success')
    
    if (paySuccess === 'true' || outTradeNo) {
      showPaymentSuccessModal(outTradeNo)
      const newUrl = window.location.href.split('?')[0]
      window.history.replaceState({}, '', newUrl)
    }
  }
  
  // 显示支付成功弹窗（复用统一的 showPaymentResultModal，保持视觉一致）
  function showPaymentSuccessModal(outTradeNo) {
    showPaymentResultModal({ success: true, outTradeNo: outTradeNo || '' })
  }
  
  // 初始化 DOM 元素
  function initElements() {
    elements.vipLoginBtn = document.getElementById('vipLoginBtn')
    elements.vipLoggedInMenu = document.getElementById('vipLoggedInMenu')
    elements.vipMenuToggle = document.getElementById('vipMenuToggle')
    elements.vipDropdownMenu = document.getElementById('vipDropdownMenu')
    elements.vipMenuItems = document.querySelectorAll('.vip-menu-item')
    elements.vipLoginModal = document.getElementById('vipLoginModal')
    elements.closeVipLoginModalBtn = document.getElementById('closeVipLoginModalBtn')
    elements.vipPhoneInput = document.getElementById('vipPhoneInput')
    elements.vipCodeInput = document.getElementById('vipCodeInput')
    elements.sendVipCodeBtn = document.getElementById('sendVipCodeBtn')
    elements.vipLoginMessage = document.getElementById('vipLoginMessage')
    elements.vipLoginSubmitBtn = document.getElementById('vipLoginSubmitBtn')
    elements.vipLoginCancelBtn = document.getElementById('vipLoginCancelBtn')
    elements.vipPasswordInput = document.getElementById('vipPasswordInput')
    elements.vipConfirmPasswordInput = document.getElementById('vipConfirmPasswordInput')
    elements.togglePasswordBtn = document.getElementById('togglePasswordBtn')
    elements.toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPasswordBtn')
    elements.vipPasswordSubmitBtn = document.getElementById('vipPasswordSubmitBtn')
    elements.vipPasswordCancelBtn = document.getElementById('vipPasswordCancelBtn')
    elements.vipPasswordLoginSubmitBtn = document.getElementById('vipPasswordLoginSubmitBtn')
    elements.vipPasswordLoginCancelBtn = document.getElementById('vipPasswordLoginCancelBtn')
    elements.switchToCodeBtn = document.getElementById('switchToCodeBtn')
    elements.switchToPasswordBtn = document.getElementById('switchToPasswordBtn')
    elements.userInfoModal = document.getElementById('userInfoModal')
    elements.closeUserInfoModal = document.getElementById('closeUserInfoModal')
    elements.closeUserInfoBtn = document.getElementById('closeUserInfoBtn')
    elements.userInfoId = document.getElementById('userInfoId')
    elements.userInfoExpiry = document.getElementById('userInfoExpiry')
    elements.userInfoType = document.getElementById('userInfoType')
  }

  // 更新 VIP 登录状态 UI
  function updateVipStatus() {
    const loginBtn = document.getElementById('vipLoginBtn')
    const loggedInMenu = document.getElementById('vipLoggedInMenu')
    const dropdownMenu = document.getElementById('vipDropdownMenu')

    // 检测伪登录态：userId 存在但 userInfo 缺失，清理残留数据
    const userId = VIPSystem.getUserId ? VIPSystem.getUserId() : null
    const userInfo = VIPSystem.getUserInfo ? VIPSystem.getUserInfo() : null
    if (userId && !userInfo) {
      console.warn('[vip-status] 检测到伪登录态（userId 存在但 userInfo 缺失），清理残留数据')
      if (VIPSystem.logout) VIPSystem.logout()
    }

    if (VIPSystem.isLoggedIn()) {
      if (loginBtn) loginBtn.classList.add('hidden')
      if (loggedInMenu) loggedInMenu.classList.remove('hidden')
      if (dropdownMenu) dropdownMenu.style.display = 'none'
    } else {
      if (loginBtn) loginBtn.classList.remove('hidden')
      if (loggedInMenu) loggedInMenu.classList.add('hidden')
      if (dropdownMenu) dropdownMenu.style.display = 'none'
    }
  }

  // 显示登录弹窗
  function showLoginModal() {
    if (!elements.vipLoginModal) {
      console.error('VIP 登录弹窗元素不存在')
      return
    }
    renderLoginChoiceForm()
    elements.vipLoginModal.classList.remove('hidden')
  }

  // 渲染登录选择界面（第一步）
  function renderLoginChoiceForm() {
    if (!elements.vipLoginModal) return

    const formHTML = `
      <div class="vip-login-form login-choice-form">
        <div class="login-choice-section">
          <p class="login-choice-hint">还没账号 / 忘记密码</p>
          <button id="choiceRegisterBtn" class="action-btn primary login-choice-btn">注册账号 / 验证码登录</button>
        </div>
        <div class="login-choice-divider"></div>
        <div class="login-choice-section">
          <p class="login-choice-hint">已经有账号和密码</p>
          <button id="choicePasswordLoginBtn" class="action-btn secondary login-choice-btn">密码登录</button>
        </div>
      </div>
    `

    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      bindLoginChoiceEvents()
    }
  }

  // 绑定登录选择界面事件
  function bindLoginChoiceEvents() {
    const choiceRegisterBtn = document.getElementById('choiceRegisterBtn')
    const choicePasswordLoginBtn = document.getElementById('choicePasswordLoginBtn')

    if (choiceRegisterBtn) {
      choiceRegisterBtn.addEventListener('click', () => {
        transitionToForm('code')
      })
    }

    if (choicePasswordLoginBtn) {
      choicePasswordLoginBtn.addEventListener('click', () => {
        transitionToForm('password')
      })
    }
  }

  // 平滑过渡到指定表单
  function transitionToForm(formType) {
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (!formContainer) return

    formContainer.classList.remove('form-transition-in')
    formContainer.classList.add('form-transition-out')

    setTimeout(() => {
      if (formType === 'code') {
        renderLoginForm()
      } else if (formType === 'password') {
        renderPasswordLoginForm()
      } else if (formType === 'password-set') {
        renderPasswordForm()
      }
      const newFormContainer = elements.vipLoginModal.querySelector('.vip-login-form')
      if (newFormContainer) {
        newFormContainer.classList.remove('form-transition-out')
        void newFormContainer.offsetWidth
        newFormContainer.classList.add('form-transition-in')
      }
    }, 300)
  }

  // 平滑过渡到登录选择界面
  function transitionToChoiceForm() {
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (!formContainer) return

    formContainer.classList.remove('form-transition-in')
    formContainer.classList.add('form-transition-out')

    setTimeout(() => {
      renderLoginChoiceForm()
      const newFormContainer = elements.vipLoginModal.querySelector('.vip-login-form')
      if (newFormContainer) {
        newFormContainer.classList.remove('form-transition-out')
        void newFormContainer.offsetWidth
        newFormContainer.classList.add('form-transition-in')
      }
    }, 300)
  }

  // 显示密码设置弹窗
  function showPasswordModal() {
    if (!elements.vipLoginModal) {
      console.error('VIP 登录弹窗元素不存在')
      return
    }
    transitionToForm('password-set')
  }

  // 显示密码登录弹窗
  function showPasswordLoginModal() {
    if (!elements.vipLoginModal) {
      console.error('VIP 登录弹窗元素不存在')
      return
    }
    transitionToForm('password')
  }

  // 隐藏登录弹窗
  function hideLoginModal() {
    if (!elements.vipLoginModal) {
      return
    }
    elements.vipLoginModal.classList.add('hidden')
    clearMessage()
    clearInputs()
  }
  
  // 清除输入框
  function clearInputs() {
    if (elements.vipPhoneInput) elements.vipPhoneInput.value = ''
    if (elements.vipCodeInput) elements.vipCodeInput.value = ''
    if (elements.vipPasswordInput) elements.vipPasswordInput.value = ''
  }
  
  // 显示消息
  function showMessage(message, type = 'error') {
    if (!elements.vipLoginMessage) return
    elements.vipLoginMessage.textContent = message
    elements.vipLoginMessage.className = 'login-message ' + type
    
    // 2秒后自动消失
    setTimeout(function() {
      clearMessage()
    }, 2000)
  }
  
  // 清除消息
  function clearMessage() {
    if (!elements.vipLoginMessage) return
    elements.vipLoginMessage.textContent = ''
    elements.vipLoginMessage.className = 'login-message'
  }
  
  // 设置发送验证码按钮状态
  function setSendCodeBtnState(countdown = null) {
    if (!elements.sendVipCodeBtn) return
    
    if (countdown === null) {
      elements.sendVipCodeBtn.disabled = false
      elements.sendVipCodeBtn.textContent = '发送验证码'
      elements.sendVipCodeBtn.classList.remove('countdown')
      smsSent = false
    } else {
      elements.sendVipCodeBtn.disabled = true
      elements.sendVipCodeBtn.textContent = `发送中 (${countdown})`
      elements.sendVipCodeBtn.classList.add('countdown')
      smsSent = true
    }
  }
  
  // 切换密码显示/隐藏
  function togglePasswordVisibility() {
    if (elements.vipPasswordInput && elements.togglePasswordBtn) {
      if (elements.vipPasswordInput.type === 'password') {
        elements.vipPasswordInput.type = 'text'
        elements.togglePasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye-slash', 'svg-icon') : '<i class="fa fa-eye-slash"></i>'
      } else {
        elements.vipPasswordInput.type = 'password'
        elements.togglePasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye', 'svg-icon') : '<i class="fa fa-eye"></i>'
      }
    }
  }
  
  // 渲染VIP升级弹窗
  function renderVipUpgradeForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-upgrade-form">
        <!-- 标题 -->
        <h3 style="margin: 0 0 24px 0; color: #d32f2f; font-size: 24px; font-weight: bold; text-align: center;">
          <span style="display: block; margin-bottom: 8px;">🎉 0秒等待升级VIP品牌账号</span>
          <span style="font-size: 14px; font-weight: normal; color: #666;">尊享多项特权，提升品牌形象</span>
        </h3>
        
        <!-- 升级码输入区域 -->
        <div style="margin-bottom: 32px; display: flex; gap: 12px;">
          <input type="text" id="voucherCodeInput" placeholder="请输入升级码" style="flex: 1; padding: 14px 16px; border: 2px solid #ffcdd2; border-radius: 8px; font-size: 16px; box-sizing: border-box; transition: all 0.3s ease;">
          <button id="verifyVoucherBtn" style="padding: 0 24px; background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">验证</button>
        </div>
        
        <!-- 结果显示 -->
        <div id="voucherResult" style="margin-bottom: 24px; padding: 16px; border-radius: 8px; display: none; background: #fff3f3; border: 1px solid #ffcdd2;">
          <div id="voucherErrorMessage" style="margin-bottom: 12px; color: #d32f2f; font-size: 14px;"></div>
          <div id="voucherErrorLog" style="background: #2d3748; color: #e2e8f0; padding: 12px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 12px; max-height: 200px; overflow-y: auto; margin-bottom: 12px; display: none;"></div>
          <button id="copyErrorLogBtn" style="font-size: 12px; padding: 6px 12px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer; display: none;">复制错误日志</button>
        </div>
        
        <!-- VIP会员时长选择模块 -->
        <div style="margin-bottom: 24px;">
          <h4 style="margin: 0 0 16px 0; color: #d32f2f; font-size: 18px; font-weight: bold;">💎 VIP会员套餐</h4>
          <div id="vipPackageGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
            <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #999; font-size: 13px;">套餐加载中...</div>
          </div>
        </div>
        
        <!-- 特权说明 -->
        <div style="margin-bottom: 24px; padding: 16px; background: #fff3f3; border-radius: 8px;">
          <h5 style="margin: 0 0 12px 0; color: #d32f2f; font-size: 14px; font-weight: bold;">🎁 VIP特权</h5>
          <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #666;">
            <li style="margin-bottom: 4px;">✅ 无水印海报下载</li>
            <li style="margin-bottom: 4px;">✅ 自定义品牌Logo</li>
            <li style="margin-bottom: 4px;">✅ 优先体验新功能</li>
            <li style="margin-bottom: 4px;">✅ 专属客服支持</li>
          </ul>
        </div>
        
        <!-- 操作按钮 -->
        <div style="display: flex; gap: 12px;">
          <button id="closeVipUpgradeBtn" style="flex: 1; padding: 14px; background: #f5f5f5; color: #333; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s ease;">关闭</button>
          <button id="proceedToPaymentBtn" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s ease; display: none;">立即支付</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.voucherCodeInput = document.getElementById('voucherCodeInput')
      elements.verifyVoucherBtn = document.getElementById('verifyVoucherBtn')
      elements.voucherResult = document.getElementById('voucherResult')
      elements.voucherErrorMessage = document.getElementById('voucherErrorMessage')
      elements.voucherErrorLog = document.getElementById('voucherErrorLog')
      elements.copyErrorLogBtn = document.getElementById('copyErrorLogBtn')
      elements.closeVipUpgradeBtn = document.getElementById('closeVipUpgradeBtn')
      elements.proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn')
      
      // 绑定事件
      bindVipUpgradeEvents()
    }
  }
  
  // 绑定VIP升级事件
  function bindVipUpgradeEvents() {
    // 验证升级码
    if (elements.verifyVoucherBtn) {
      elements.verifyVoucherBtn.addEventListener('click', async function() {
        const code = elements.voucherCodeInput.value.trim()
        const userId = VIPSystem.getUserId()
        
        if (!code) {
          showVoucherResult('请输入升级码', 'error')
          return
        }
        
        if (!userId) {
          showVoucherResult('请先登录', 'error')
          return
        }
        
        this.disabled = true
        this.textContent = '验证中...'
        
        const result = await VIPSystem.verifyVoucher(code, userId)
        
        this.disabled = false
        this.textContent = '验证'
        
        if (result.success) {
          if (result.used) {
            showVoucherResult(`升级码已被使用，使用时间：${new Date(result.usedAt).toLocaleString()}`, 'error')
          } else {
            showVoucherResult('升级成功！正在为您准备会员权益...', 'success')
            // 关闭 VIP 登录弹窗，弹出统一的支付成功（升级成功）弹窗
            setTimeout(() => {
              if (typeof hideLoginModal === 'function') hideLoginModal()
              const voucherModal = document.getElementById('vipUpgradeModal') || document.getElementById('vipLoginModal')
              if (voucherModal) voucherModal.remove()
              if (typeof showPaymentResultModal === 'function') {
                showPaymentResultModal({ success: true, outTradeNo: '' })
              }
            }, 800)
          }
        } else {
          showVoucherResult(result.message || '验证失败，请稍后重试', 'error')
        }
      })
    }
    
    // 关闭按钮
    if (elements.closeVipUpgradeBtn) {
      elements.closeVipUpgradeBtn.addEventListener('click', hideLoginModal)
    }
    
    // 复制错误日志
    if (elements.copyErrorLogBtn) {
      elements.copyErrorLogBtn.addEventListener('click', function() {
        const errorLog = elements.voucherErrorLog.textContent
        navigator.clipboard.writeText(errorLog).then(() => {
          alert('错误日志已复制到剪贴板')
        })
      })
    }
    
    // VIP套餐选择（事件委托，兼容动态渲染的套餐）
    const vipPackageGrid = document.getElementById('vipPackageGrid')
    if (vipPackageGrid) {
      vipPackageGrid.addEventListener('click', function(e) {
        const pkg = e.target.closest('.vip-package')
        if (!pkg) return
        const allPackages = vipPackageGrid.querySelectorAll('.vip-package')
        allPackages.forEach(p => {
          p.style.borderColor = '#ffcdd2'
          p.style.transform = 'scale(1)'
          p.style.boxShadow = ''
          const btn = p.querySelector('.select-package-btn')
          if (btn) {
            btn.style.background = '#fff'
            btn.style.color = '#d32f2f'
            btn.textContent = '选择'
          }
        })
        pkg.style.borderColor = '#d32f2f'
        pkg.style.transform = 'scale(1.05)'
        pkg.style.boxShadow = '0 4px 12px rgba(211, 47, 47, 0.2)'
        const pkgBtn = pkg.querySelector('.select-package-btn')
        if (pkgBtn) {
          pkgBtn.style.background = '#d32f2f'
          pkgBtn.style.color = '#fff'
          pkgBtn.textContent = '✔ 已选择'
        }

        // 显示立即支付按钮并更新文案
        if (elements.proceedToPaymentBtn) {
          const price = pkg.dataset.price
          elements.proceedToPaymentBtn.textContent = `立即支付${price}元`
          elements.proceedToPaymentBtn.style.display = 'block'
        }
      })

      // 异步加载云端套餐并渲染到 grid
      renderVipPackagesToGrid(vipPackageGrid, { style: 'inline', autoSelectFirst: false })
    }

    // 立即支付按钮
    if (elements.proceedToPaymentBtn) {
      elements.proceedToPaymentBtn.addEventListener('click', async function() {
        const selectedPackage = vipPackageGrid ? vipPackageGrid.querySelector('.vip-package[style*="border-color: #d32f2f"]') : null
        if (!selectedPackage) {
          alert('请先选择一个套餐')
          return
        }

        if (!VIPSystem.isLoggedIn()) {
          alert('请先登录')
          return
        }

        const duration = parseInt(selectedPackage.dataset.duration)
        const price = selectedPackage.dataset.price
        const packageId = selectedPackage.dataset.packageId || ''

        showPaymentMethodModal(duration, price, packageId)
      })
    }
  }
  
  function showPaymentMethodModal(duration, price, packageId) {
    const existingModal = document.getElementById('paymentMethodModal')
    if (existingModal) {
      existingModal.remove()
    }
    
    const modalHTML = `
      <div id="paymentMethodModal" class="payment-method-modal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10000; display: flex; align-items: center; justify-content: center;">
        <div class="payment-method-content" style="background: #fff; border-radius: 16px; padding: 24px; width: 90%; max-width: 320px; text-align: center;">
          <h3 style="margin: 0 0 20px; font-size: 18px; color: #333;">选择支付方式</h3>
          <p style="margin: 0 0 20px; color: #666; font-size: 14px;">支付金额: <span style="color: #d32f2f; font-size: 20px; font-weight: bold;">¥${price}</span></p>
          <div class="payment-methods" style="display: flex; flex-direction: column; gap: 12px;">
            <button class="payment-method-btn alipay" data-type="alipay" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; background: #1677FF; color: #fff; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.422 15.358c-3.83-1.153-6.055-1.84-7.373-2.313.566-1.248.983-2.638 1.22-4.078h-3.698V7.3h4.538V6.08h-4.538V3.6h-2.04c-.258 0-.468.21-.468.468v2.012H4.44v1.22h4.623v1.667H5.278v1.22h7.59c-.2 1.09-.528 2.118-.96 3.054-1.85-.55-3.672-.938-5.468-.938-3.36 0-5.4 1.56-5.4 3.6 0 2.04 1.92 3.6 5.16 3.6 2.28 0 4.32-.84 5.88-2.28 2.4 1.08 5.64 2.4 9.6 3.72.36.12.72-.12.84-.48.12-.36-.12-.72-.48-.84l-.6-.18zm-14.88.24c-2.04 0-3.24-.84-3.24-1.92s1.08-1.92 3.12-1.92c1.44 0 3 .3 4.68.84-1.2 1.68-2.88 3-4.56 3z"/>
              </svg>
              支付宝支付
            </button>
            <button class="payment-method-btn wxpay" data-type="wxpay" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; background: #07C160; color: #fff; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              </svg>
              微信支付
            </button>
          </div>
          <button id="cancelPaymentMethodBtn" style="margin-top: 16px; padding: 10px 20px; background: #f5f5f5; color: #666; border: none; border-radius: 8px; font-size: 14px; cursor: pointer;">取消</button>
        </div>
      </div>
    `
    
    document.body.insertAdjacentHTML('beforeend', modalHTML)
    
    // 替换Font Awesome图标为SVG图标
    if (typeof replaceFAIcons === 'function') replaceFAIcons()
    
    const modal = document.getElementById('paymentMethodModal')
    const cancelBtn = document.getElementById('cancelPaymentMethodBtn')
    const paymentBtns = modal.querySelectorAll('.payment-method-btn')
    
    cancelBtn.addEventListener('click', function() {
      modal.remove()
    })
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove()
      }
    })
    
    paymentBtns.forEach(btn => {
      btn.addEventListener('click', async function() {
        const type = this.dataset.type
        modal.remove()

        await processPayment(duration, price, type, packageId)
      })

      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)'
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
      })

      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)'
        this.style.boxShadow = 'none'
      })
    })
  }

  async function processPayment(duration, price, type, packageId) {
    const loadingModal = document.createElement('div')
    loadingModal.id = 'paymentLoadingModal'
    loadingModal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10001; display: flex; align-items: center; justify-content: center;'
    loadingModal.innerHTML = `
      <div style="background: #fff; border-radius: 12px; padding: 24px; text-align: center;">
        <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #d32f2f; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
        <p style="margin: 0; color: #333;">正在创建订单...</p>
      </div>
    `
    document.body.appendChild(loadingModal)

    try {
      const returnUrl = buildPaymentReturnUrl()
      const result = await VIPSystem.createPaymentOrder(price, duration, type, returnUrl, packageId)
      
      loadingModal.remove()
      
      if (result.success && result.data && result.data.payUrl) {
        initiatePayment(result.data.payUrl, result.data.out_trade_no)
      } else {
        alert(result.message || '创建订单失败，请稍后重试')
      }
    } catch (error) {
      loadingModal.remove()
      console.error('支付失败:', error)
      alert('支付失败，请稍后重试')
    }
  }
  
  // 显示升级码验证结果
  function showVoucherResult(message, type = 'error') {
    if (!elements.voucherResult || !elements.voucherErrorMessage) return
    
    elements.voucherResult.style.display = 'block'
    elements.voucherErrorMessage.textContent = message
    
    if (type === 'success') {
      elements.voucherResult.style.background = '#e8f5e8'
      elements.voucherResult.style.borderColor = '#c8e6c9'
      elements.voucherErrorMessage.style.color = '#2e7d32'
    } else {
      elements.voucherResult.style.background = '#fff3f3'
      elements.voucherResult.style.borderColor = '#ffcdd2'
      elements.voucherErrorMessage.style.color = '#d32f2f'
    }
  }
  
  // 渲染登录表单（手机号+验证码）
  function renderLoginForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-login-form">
        <div class="form-group">
          <label for="vipPhoneInput" class="form-label">手机号</label>
          <input type="tel" id="vipPhoneInput" class="form-input" placeholder="请输入手机号">
        </div>
        <div class="form-group">
          <label for="vipCodeInput" class="form-label">验证码</label>
          <div class="code-input-wrapper">
            <input type="text" id="vipCodeInput" class="form-input code-input" placeholder="请输入4位验证码" maxlength="4">
            <button id="sendVipCodeBtn" class="send-code-btn">发送验证码</button>
          </div>
        </div>
        
        <div id="vipLoginMessage" class="login-message"></div>
        <div class="login-actions">
          <button id="vipLoginSubmitBtn" class="action-btn primary">登录/注册</button>
          <button id="vipLoginCancelBtn" class="action-btn secondary">返回</button>
        </div>
        <div class="login-method-switch">
          <span>没有收到验证码？</span>
          <button id="switchToPasswordBtn" class="switch-link">使用密码登录</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.vipPhoneInput = document.getElementById('vipPhoneInput')
      elements.vipCodeInput = document.getElementById('vipCodeInput')
      elements.sendVipCodeBtn = document.getElementById('sendVipCodeBtn')
      elements.switchToPasswordBtn = document.getElementById('switchToPasswordBtn')
      elements.vipLoginMessage = document.getElementById('vipLoginMessage')
      elements.vipLoginSubmitBtn = document.getElementById('vipLoginSubmitBtn')
      elements.vipLoginCancelBtn = document.getElementById('vipLoginCancelBtn')
      
      // 重新绑定切换按钮事件
      rebindSwitchEvents()
    }
  }
  
  // 渲染密码设置表单
  function renderPasswordForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-login-form">
        <div class="form-group">
          <label for="vipPasswordInput" class="form-label">设置密码</label>
          <div class="password-wrapper">
            <input type="text" id="vipPasswordInput" class="form-input" placeholder="请输入密码">
            <button type="button" id="togglePasswordBtn" class="toggle-password-btn">
              <i class="fa fa-eye"></i>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label for="vipConfirmPasswordInput" class="form-label">确认密码</label>
          <div class="password-wrapper">
            <input type="text" id="vipConfirmPasswordInput" class="form-input" placeholder="请再次输入密码">
            <button type="button" id="toggleConfirmPasswordBtn" class="toggle-password-btn">
              <i class="fa fa-eye"></i>
            </button>
          </div>
        </div>
        <div id="vipLoginMessage" class="login-message"></div>
        <div class="login-actions">
          <button id="vipPasswordSubmitBtn" class="action-btn primary">保存密码</button>
          <button id="vipPasswordCancelBtn" class="action-btn secondary">取消</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.vipPasswordInput = document.getElementById('vipPasswordInput')
      elements.vipConfirmPasswordInput = document.getElementById('vipConfirmPasswordInput')
      elements.togglePasswordBtn = document.getElementById('togglePasswordBtn')
      elements.toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPasswordBtn')
      elements.vipLoginMessage = document.getElementById('vipLoginMessage')
      elements.vipPasswordSubmitBtn = document.getElementById('vipPasswordSubmitBtn')
      elements.vipPasswordCancelBtn = document.getElementById('vipPasswordCancelBtn')
      
      // 重新绑定切换按钮事件
      rebindSwitchEvents()
    }
  }
  
  // 渲染密码登录表单
  function renderPasswordLoginForm() {
    if (!elements.vipLoginModal) return
    
    const formHTML = `
      <div class="vip-login-form">
        <div class="form-group">
          <label for="vipPhoneInput" class="form-label">手机号</label>
          <input type="tel" id="vipPhoneInput" class="form-input" placeholder="请输入手机号">
        </div>
        <div class="form-group">
          <label for="vipPasswordInput" class="form-label">密码</label>
          <div class="password-wrapper">
            <input type="password" id="vipPasswordInput" class="form-input" placeholder="请输入密码">
            <button type="button" id="togglePasswordBtn" class="toggle-password-btn">
              <i class="fa fa-eye"></i>
            </button>
          </div>
        </div>
        
        <div id="vipLoginMessage" class="login-message"></div>
        <div class="login-actions">
          <button id="vipPasswordLoginSubmitBtn" class="action-btn primary">登录</button>
          <button id="vipPasswordLoginCancelBtn" class="action-btn secondary">返回</button>
        </div>
        <div class="login-method-switch">
          <span>忘记密码？</span>
          <button id="switchToCodeBtn" class="switch-link">使用验证码登录</button>
        </div>
      </div>
    `
    
    const formContainer = elements.vipLoginModal.querySelector('.vip-login-form')
    if (formContainer) {
      formContainer.innerHTML = formHTML
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      // 重新缓存新生成的元素
      elements.vipPhoneInput = document.getElementById('vipPhoneInput')
      elements.vipPasswordInput = document.getElementById('vipPasswordInput')
      elements.togglePasswordBtn = document.getElementById('togglePasswordBtn')
      elements.switchToCodeBtn = document.getElementById('switchToCodeBtn')
      elements.vipLoginMessage = document.getElementById('vipLoginMessage')
      elements.vipPasswordLoginSubmitBtn = document.getElementById('vipPasswordLoginSubmitBtn')
      elements.vipPasswordLoginCancelBtn = document.getElementById('vipPasswordLoginCancelBtn')
      
      // 重新绑定切换按钮事件
      rebindSwitchEvents()
    }
  }
  
  // 绑定事件
  function bindEvents() {
    // 显示登录弹窗
    if (elements.vipLoginBtn) {
      elements.vipLoginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        showLoginModal()
      })
    }
    
    // 关闭弹窗按钮
    if (elements.closeVipLoginModalBtn) {
      elements.closeVipLoginModalBtn.addEventListener('click', hideLoginModal)
    }
    
    // 点击遮罩层关闭
    if (elements.vipLoginModal) {
      elements.vipLoginModal.addEventListener('click', (e) => {
        if (e.target === elements.vipLoginModal) {
          hideLoginModal()
        }
      })
    }
    
    // 取消按钮 - 返回选择界面
    if (elements.vipLoginCancelBtn) {
      elements.vipLoginCancelBtn.addEventListener('click', transitionToChoiceForm)
    }
    
    // 回车键提交
    if (elements.vipPhoneInput) {
      elements.vipPhoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipCodeInput.focus()
        }
      })
    }
    
    if (elements.vipCodeInput) {
      elements.vipCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipLoginSubmitBtn.click()
        }
      })
    }
    
    // VIP 菜单事件监听
    if (elements.vipMenuToggle) {
      elements.vipMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation()
        if (elements.vipDropdownMenu) {
          const isHidden = elements.vipDropdownMenu.style.display === 'none' || elements.vipDropdownMenu.style.display === ''
          elements.vipDropdownMenu.style.display = isHidden ? 'block' : 'none'
        }
      })
    }
    
    if (elements.vipDropdownMenu) {
      elements.vipDropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation()
      })
    }
    
    if (elements.vipMenuItems) {
      elements.vipMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault()
          const action = this.getAttribute('data-action')
          handleVipMenuItemClick(action)
        })
      })
    }
    
    // 点击页面其他地方关闭 VIP 下拉菜单
    document.addEventListener('click', function(e) {
      if (elements.vipDropdownMenu && elements.vipMenuToggle) {
        const isClickInsideMenu = elements.vipMenuToggle.parentElement.contains(e.target)
        const isVisible = elements.vipDropdownMenu.style.display === 'block'
        if (!isClickInsideMenu && isVisible) {
          elements.vipDropdownMenu.style.display = 'none'
        }
      }
    })
    
    // 用户信息弹窗事件监听
    if (elements.closeUserInfoModal) {
      elements.closeUserInfoModal.addEventListener('click', closeUserInfoModalFunc)
    }
    
    if (elements.closeUserInfoBtn) {
      elements.closeUserInfoBtn.addEventListener('click', closeUserInfoModalFunc)
    }
    
    // 刷新用户信息按钮
    const refreshUserInfoBtn = document.getElementById('refreshUserInfoBtn')
    if (refreshUserInfoBtn) {
      refreshUserInfoBtn.addEventListener('click', async function() {
        this.disabled = true
        this.textContent = '刷新中...'
        
        if (window.CloudSync) {
          // 强制刷新商家信息（跳过本地缓存）
          if (CloudSync.setForceRefreshBusinessInfo) {
            CloudSync.setForceRefreshBusinessInfo()
          }
          await CloudSync.syncAndFillBusinessInfo(true) // 强制刷新
          await loadUserInfoFromCloud()
        }
        
        if (window.forceRefreshImages) {
          await window.forceRefreshImages()
        }
        
        this.disabled = false
        this.textContent = '刷新云端数据'
      })
    }
    
    // 从云端加载用户信息到弹窗
    async function loadUserInfoFromCloud() {
      const userInfoBrandname = document.getElementById('userInfoBrandname')
      const userInfoLogoImg = document.getElementById('userInfoLogoImg')
      const userInfoLogoPlaceholder = document.getElementById('userInfoLogoPlaceholder')
      const userInfoQrcodeImg = document.getElementById('userInfoQrcodeImg')
      const userInfoQrcodePlaceholder = document.getElementById('userInfoQrcodePlaceholder')
      
      if (window.CloudSync) {
        const result = await CloudSync.loadBusinessInfoFromCloud()
        if (result.success && result.data) {
          // 商家名称
          if (userInfoBrandname) {
            userInfoBrandname.textContent = result.data.brandname || '-'
          }
          
          // Logo - 优先使用缓存，但需要检查URL是否变化或强制刷新
          if (result.data.logoUrl) {
            if (userInfoLogoImg) {
              // 获取当前存储的logo URL
              const storedLogoUrl = localStorage.getItem('businessLogo')
              const cachedLogo = localStorage.getItem('poster_logo_base64')
              
              // 检查是否需要强制刷新（设备变更、手动刷新等）
              const shouldForceRefresh = localStorage.getItem('image_cache_force_refresh') === 'true'
              
              // 如果URL变化了、缓存不存在、缓存格式错误、或者需要强制刷新，都需要重新加载
              if (storedLogoUrl !== result.data.logoUrl || !cachedLogo || !cachedLogo.startsWith('data:image') || shouldForceRefresh) {
                // 清除强制刷新标记
                if (shouldForceRefresh) {
                  localStorage.removeItem('image_cache_force_refresh')
                }
                
                // 尝试加载新的图片并缓存
                try {
                  const response = await fetch(result.data.logoUrl, { mode: 'cors', credentials: 'omit' })
                  const blob = await response.blob()
                  const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = () => reject(new Error('FileReader error'))
                    reader.readAsDataURL(blob)
                  })
                  localStorage.setItem('poster_logo_base64', base64)
                  localStorage.setItem('businessLogo', result.data.logoUrl)
                  userInfoLogoImg.src = base64
                  console.log('Logo缓存已更新（URL相同但内容可能已变化）')
                } catch (e) {
                  console.error('加载Logo失败:', e)
                  userInfoLogoImg.src = result.data.logoUrl
                }
              } else {
                // URL相同且不需要强制刷新，使用缓存
                userInfoLogoImg.src = cachedLogo
                console.log('使用缓存的Logo（URL未变化）')
              }
              userInfoLogoImg.style.display = 'block'
            }
            if (userInfoLogoPlaceholder) {
              userInfoLogoPlaceholder.style.display = 'none'
            }
          } else {
            if (userInfoLogoImg) {
              userInfoLogoImg.style.display = 'none'
            }
            if (userInfoLogoPlaceholder) {
              userInfoLogoPlaceholder.style.display = 'inline'
              userInfoLogoPlaceholder.textContent = '未设置'
            }
          }
          
          // 二维码 - 优先使用缓存，但需要检查URL是否变化或强制刷新
          if (result.data.qrcodeUrl) {
            if (userInfoQrcodeImg) {
              // 获取当前存储的二维码 URL
              const storedQrcodeUrl = localStorage.getItem('businessQrcode')
              const cachedQr = localStorage.getItem('poster_qrcode_base64')
              
              // 检查是否需要强制刷新（设备变更、手动刷新等）
              const shouldForceRefresh = localStorage.getItem('image_cache_force_refresh') === 'true'
              
              // 如果URL变化了、缓存不存在、缓存格式错误、或者需要强制刷新，都需要重新加载
              if (storedQrcodeUrl !== result.data.qrcodeUrl || !cachedQr || !cachedQr.startsWith('data:image') || shouldForceRefresh) {
                // 清除强制刷新标记
                if (shouldForceRefresh) {
                  localStorage.removeItem('image_cache_force_refresh')
                }
                
                // 尝试加载新的图片并缓存
                try {
                  const response = await fetch(result.data.qrcodeUrl, { mode: 'cors', credentials: 'omit' })
                  const blob = await response.blob()
                  const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = () => reject(new Error('FileReader error'))
                    reader.readAsDataURL(blob)
                  })
                  localStorage.setItem('poster_qrcode_base64', base64)
                  localStorage.setItem('businessQrcode', result.data.qrcodeUrl)
                  userInfoQrcodeImg.src = base64
                  console.log('二维码缓存已更新（URL相同但内容可能已变化）')
                } catch (e) {
                  console.error('加载二维码失败:', e)
                  userInfoQrcodeImg.src = result.data.qrcodeUrl
                }
              } else {
                // URL相同且不需要强制刷新，使用缓存
                userInfoQrcodeImg.src = cachedQr
                console.log('使用缓存的二维码（URL未变化）')
              }
              userInfoQrcodeImg.style.display = 'block'
            }
            if (userInfoQrcodePlaceholder) {
              userInfoQrcodePlaceholder.style.display = 'none'
            }
          } else {
            if (userInfoQrcodeImg) {
              userInfoQrcodeImg.style.display = 'none'
            }
            if (userInfoQrcodePlaceholder) {
              userInfoQrcodePlaceholder.style.display = 'inline'
              userInfoQrcodePlaceholder.textContent = '未设置'
            }
          }
        }
      }
    }
    
    // 显示用户信息弹窗
    async function openUserInfoModal() {
      if (elements.userInfoModal) {
        // 先从服务器获取最新的VIP状态
        const userInfo = VIPSystem.getUserInfo()
        const userId = VIPSystem.getUserId()
        const phone = userInfo ? userInfo.phone : null
        
        if (userId || phone) {
          try {
            console.log('从服务器获取最新VIP状态...');
            const result = await VIPSystem.checkVipStatus(userId, phone);
            console.log('服务器返回的VIP状态:', result);
          } catch (error) {
            console.error('获取VIP状态失败:', error);
          }
        }
        
        // 重新从本地存储获取更新后的用户信息
        const updatedUserInfo = VIPSystem.getUserInfo()
        
        if (elements.userInfoId) {
          elements.userInfoId.textContent = updatedUserInfo.phone || '未登录'
        }
        if (elements.userInfoExpiry) {
          elements.userInfoExpiry.textContent = updatedUserInfo.vipValidUntil ? new Date(updatedUserInfo.vipValidUntil).toLocaleDateString() : '普通用户'
        }
        if (elements.userInfoType) {
          elements.userInfoType.textContent = updatedUserInfo.isVip ? '闪喵VIP用户' : '普通用户'
        }
        
        // 显示下载次数
        const quotaInfoItem = document.getElementById('downloadQuotaInfoItem')
        const quotaSpan = document.getElementById('userInfoDownloadQuota')
        if (updatedUserInfo.isVip) {
          // VIP用户显示“无限”，不再隐藏该项
          if (quotaInfoItem) quotaInfoItem.style.display = ''
          if (quotaSpan) {
            quotaSpan.textContent = '无限'
            quotaSpan.style.color = '#c41e3a'
            quotaSpan.style.fontWeight = '600'
          }
        } else {
          if (quotaInfoItem) quotaInfoItem.style.display = ''
          if (quotaSpan) {
            quotaSpan.style.color = ''
            quotaSpan.style.fontWeight = ''
            // 先显示本地缓存的次数
            quotaSpan.textContent = updatedUserInfo.downloadQuota !== undefined ? `${updatedUserInfo.downloadQuota}次` : '加载中...'
          }
          // 异步从服务器获取最新次数
          try {
            const quotaResult = await VIPSystem.getDownloadQuota()
            if (quotaResult.success && quotaResult.data) {
              if (quotaSpan) {
                quotaSpan.textContent = `${quotaResult.data.downloadQuota}次`
              }
            }
          } catch (e) {
            console.warn('获取下载次数失败:', e)
          }
        }
        
        // 加载云端商家信息
        await loadUserInfoFromCloud()
        
        elements.userInfoModal.classList.remove('hidden')
      }
    }
    
    // 关闭用户信息弹窗
    function closeUserInfoModalFunc() {
      if (elements.userInfoModal) {
        elements.userInfoModal.classList.add('hidden')
      }
    }
    
    // 处理 VIP 菜单项点击
    async function handleVipMenuItemClick(action) {
      switch (action) {
        case 'userInfo':
          await openUserInfoModal()
          break
        case 'orderHistory':
          await showOrderHistoryModal()
          break
        case 'activateVoucher':
          if (window.showVipUpgradeModal) {
            window.showVipUpgradeModal()
          }
          break
        case 'downloadRecords':
          await showDownloadRecordsModal()
          break
        case 'visibilityManager':
          if (window.openVisibilityManager) {
            window.openVisibilityManager()
          }
          break
        case 'logout':
          handleVipLogout()
          break
      }

      const vipDropdownMenu = document.getElementById('vipDropdownMenu')
      if (vipDropdownMenu) {
        vipDropdownMenu.style.display = 'none'
      }
    }

    // 下载额度记录弹窗
    async function showDownloadRecordsModal() {
      const existingModal = document.getElementById('downloadRecordsModal')
      if (existingModal) {
        existingModal.remove()
      }

      const modalHTML = `
        <div id="downloadRecordsModal" class="order-history-modal">
          <div class="order-history-content">
            <div class="order-history-header">
              <h3>下载额度记录</h3>
              <button id="closeDownloadRecordsBtn">&times;</button>
            </div>
            <div id="downloadRecordsList" class="order-history-list">
              <div class="order-loading">
                <div class="order-loading-spinner"></div>
                <p>加载中...</p>
              </div>
            </div>
            <div id="downloadRecordsFooter" class="download-records-footer" style="display:none;">
              <button id="downloadRecordsLoadMore" class="continue-pay-btn" style="display:inline-block; width:auto; padding:6px 24px; font-size:13px;">加载更多</button>
            </div>
          </div>
        </div>
      `

      document.body.insertAdjacentHTML('beforeend', modalHTML)

      const modalEl = document.getElementById('downloadRecordsModal')
      const closeBtn = document.getElementById('closeDownloadRecordsBtn')
      const listEl = document.getElementById('downloadRecordsList')
      const footerEl = document.getElementById('downloadRecordsFooter')
      const loadMoreBtn = document.getElementById('downloadRecordsLoadMore')

      const closeModal = () => modalEl.remove()
      closeBtn.addEventListener('click', closeModal)
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) closeModal()
      })

      // 分页加载状态
      let currentPage = 1
      const pageSize = 20
      let isLoading = false
      let hasMore = true

      async function loadRecords(page) {
        if (isLoading || (!hasMore && page > 1)) return
        isLoading = true
        loadMoreBtn && (loadMoreBtn.textContent = '加载中...')
        loadMoreBtn && (loadMoreBtn.disabled = true)

        try {
          if (typeof VIPSystem === 'undefined' || !VIPSystem.getUserId()) {
            listEl.innerHTML = `
              <div class="order-empty">
                <p>请先登录</p>
              </div>
            `
            footerEl.style.display = 'none'
            return
          }

          const result = await VIPSystem.getDownloadQuotaLogs(page, pageSize)

          if (!result.success || !result.data) {
            listEl.innerHTML = `
              <div class="order-empty">
                <i class="fa fa-exclamation-circle"></i>
                <p>${escapeHtml(result.message || '加载失败')}</p>
              </div>
            `
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
            footerEl.style.display = 'none'
            return
          }

          const { logs, total } = result.data

          if (page === 1) {
            if (!logs || logs.length === 0) {
              listEl.innerHTML = `
                <div class="order-empty">
                  <i class="fa fa-inbox"></i>
                  <p>暂无下载额度记录</p>
                </div>
              `
              if (typeof replaceFAIcons === 'function') replaceFAIcons()
              footerEl.style.display = 'none'
              return
            }
            listEl.innerHTML = renderRecordsList(logs)
          } else {
            listEl.insertAdjacentHTML('beforeend', renderRecordsList(logs))
          }

          currentPage = page
          const loadedCount = page * pageSize
          hasMore = loadedCount < total

          if (hasMore) {
            footerEl.style.display = 'block'
            loadMoreBtn.textContent = '加载更多'
            loadMoreBtn.disabled = false
          } else {
            if (logs.length >= pageSize) {
              footerEl.style.display = 'block'
              loadMoreBtn.textContent = '已全部加载'
              loadMoreBtn.disabled = true
            } else {
              footerEl.style.display = 'none'
            }
          }
        } catch (e) {
          console.error('加载下载记录失败:', e)
          if (page === 1) {
            listEl.innerHTML = `
              <div class="order-empty">
                <i class="fa fa-exclamation-circle"></i>
                <p>加载失败，请稍后重试</p>
              </div>
            `
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
          } else {
            loadMoreBtn.textContent = '加载失败，点击重试'
            loadMoreBtn.disabled = false
          }
          footerEl.style.display = 'block'
        } finally {
          isLoading = false
        }
      }

      // 渲染记录列表
      function renderRecordsList(logs) {
        return logs.map(log => {
          const isAdd = log.changeAmount > 0
          const amountText = isAdd ? `+${log.changeAmount}` : `${log.changeAmount}`
          const statusClass = isAdd ? 'paid' : 'unpaid'
          const sourceMap = {
            'new_user': '新用户注册赠送',
            'brand_info_completed': '完善品牌信息奖励',
            'purchase': '购买额度',
            'gift': '活动赠送',
            'lottery': '抽奖奖励',
            'admin': '管理员赠送',
            'other': '其他',
            'download': '下载海报'
          }
          let sourceText = log.remark || sourceMap[log.source] || log.source || '额度变更'

          // 时间格式化
          let timeText = ''
          try {
            let date
            if (log.createTime) {
              if (log.createTime.$date) {
                date = new Date(log.createTime.$date)
              } else {
                date = new Date(log.createTime)
              }
            } else {
              date = new Date()
            }
            if (isNaN(date.getTime())) date = new Date()
            timeText = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`
          } catch (e) {
            timeText = ''
          }

          // 模板信息（仅下载海报时显示）
          let templateInfo = ''
          if (log.templateName && log.type === 'deduct') {
            templateInfo = `
              <div class="order-item-no" style="margin-top:4px;">
                📷 模板：${escapeHtml(log.templateName)}
                ${log.templateId ? `<span style="color:#bbb; margin-left:6px;">#${escapeHtml(String(log.templateId))}</span>` : ''}
              </div>
            `
          }

          return `
            <div class="order-item">
              <div class="order-item-header">
                <div>
                  <div class="order-item-name">${escapeHtml(sourceText)}</div>
                  ${templateInfo}
                </div>
                <span class="order-item-status ${statusClass}">${amountText}</span>
              </div>
              <div class="order-item-info">
                <span>余额 ${log.afterQuota !== undefined ? log.afterQuota : '-'}</span>
                <span>${timeText}</span>
              </div>
            </div>
          `
        }).join('')
      }

      // HTML 转义
      function escapeHtml(str) {
        if (str === null || str === undefined) return ''
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
      }

      loadMoreBtn.addEventListener('click', () => {
        loadRecords(currentPage + 1)
      })

      // 首次加载
      loadRecords(1)
    }
    
    async function showOrderHistoryModal() {
      const existingModal = document.getElementById('orderHistoryModal')
      if (existingModal) {
        existingModal.remove()
      }
      
      const modalHTML = `
        <div id="orderHistoryModal" class="order-history-modal">
          <div class="order-history-content">
            <div class="order-history-header">
              <h3>订单记录</h3>
              <button id="closeOrderHistoryBtn">&times;</button>
            </div>
            <div id="orderHistoryList" class="order-history-list">
              <div class="order-loading">
                <div class="order-loading-spinner"></div>
                <p>加载中...</p>
              </div>
            </div>
          </div>
        </div>
      `
      
      document.body.insertAdjacentHTML('beforeend', modalHTML)
      
      // 替换Font Awesome图标为SVG图标
      if (typeof replaceFAIcons === 'function') replaceFAIcons()
      
      const modal = document.getElementById('orderHistoryModal')
      const closeBtn = document.getElementById('closeOrderHistoryBtn')
      const listContainer = document.getElementById('orderHistoryList')
      
      closeBtn.addEventListener('click', () => modal.remove())
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove()
      })
      
      try {
        const result = await VIPSystem.getPaymentOrderList()
        
        if (result.success && result.data && result.data.orders) {
          if (result.data.orders.length === 0) {
            listContainer.innerHTML = `
              <div class="order-empty">
                <i class="fa fa-inbox"></i>
                <p>暂无订单记录</p>
              </div>
            `
            // 替换Font Awesome图标为SVG图标
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
          } else {
            const ordersHTML = result.data.orders.map(order => {
              const statusText = order.status === 1 ? '已支付' : '待支付'
              const statusClass = order.status === 1 ? 'paid' : 'unpaid'
              const typeText = order.type === 'alipay' ? '支付宝' : '微信'
              const payTime = order.payTime ? new Date(order.payTime).toLocaleString('zh-CN') : '-'
              const createTime = order.createTime ? new Date(order.createTime).toLocaleString('zh-CN') : '-'
              const isUnpaid = order.status !== 1
              
              return `
                <div class="order-item">
                  <div class="order-item-header">
                    <div>
                      <div class="order-item-name">${order.name}</div>
                      <div class="order-item-no">订单号: ${order.out_trade_no}</div>
                    </div>
                    <span class="order-item-status ${statusClass}">${statusText}</span>
                  </div>
                  <div class="order-item-info">
                    <span>${typeText}支付</span>
                    <span class="order-item-price">¥${order.money}</span>
                  </div>
                  <div class="order-item-time">${order.status === 1 ? '支付时间: ' + payTime : '创建时间: ' + createTime}</div>
                  ${isUnpaid ? `<button class="continue-pay-btn" data-order-no="${order.out_trade_no}" data-money="${order.money}" data-duration="${order.duration}" data-type="${order.type}">继续支付</button>` : ''}
                </div>
              `
            }).join('')
            
            listContainer.innerHTML = ordersHTML
            
            // 替换Font Awesome图标为SVG图标
            if (typeof replaceFAIcons === 'function') replaceFAIcons()
            
            listContainer.querySelectorAll('.continue-pay-btn').forEach(btn => {
              btn.addEventListener('click', async function() {
                const orderNo = this.dataset.orderNo
                const money = this.dataset.money
                const duration = this.dataset.duration
                const type = this.dataset.type
                
                this.disabled = true
                this.textContent = '处理中...'
                
                try {
                  const returnUrl = buildPaymentReturnUrl()
                  const result = await VIPSystem.createPaymentOrder(money, duration, type, returnUrl)
                  
                  if (result.success && result.data && result.data.payUrl) {
                    modal.remove()
                    initiatePayment(result.data.payUrl, result.data.out_trade_no)
                  } else {
                    this.disabled = false
                    this.textContent = '继续支付'
                    alert(result.message || '创建订单失败，请稍后重试')
                  }
                } catch (error) {
                  this.disabled = false
                  this.textContent = '继续支付'
                  alert('支付失败，请稍后重试')
                }
              })
            })
          }
        } else {
          listContainer.innerHTML = `
            <div class="order-error">
              <i class="fa fa-exclamation-circle"></i>
              <p>${result.message || '加载失败'}</p>
            </div>
          `
          // 替换Font Awesome图标为SVG图标
          if (typeof replaceFAIcons === 'function') replaceFAIcons()
        }
      } catch (error) {
        console.error('获取订单列表失败:', error)
        listContainer.innerHTML = `
          <div class="order-error">
            <i class="fa fa-exclamation-circle"></i>
            <p>加载失败，请稍后重试</p>
          </div>
        `
        // 替换Font Awesome图标为SVG图标
        if (typeof replaceFAIcons === 'function') replaceFAIcons()
      }
    }
    
    // VIP 退出功能
    function handleVipLogout() {
      showConfirmDialog('退出确认', '确定要退出登录吗？', () => {
        // 清除所有本地存储
        localStorage.clear()
        
        // 更新 UI
        updateVipStatus()
        
        showMessage('已退出登录', 'success')
        setTimeout(() => {
          location.reload()
        }, 1000)
      })
    }
    
    // 显示确认弹窗
    function showConfirmDialog(title, message, onConfirm) {
      const confirmModal = document.getElementById('confirmModal')
      const confirmTitle = document.getElementById('confirmModalTitle')
      const confirmMessage = document.getElementById('confirmModalMessage')
      const confirmBtn = document.getElementById('confirmModalConfirm')
      const cancelBtn = document.getElementById('confirmModalCancel')
      
      if (!confirmModal) return
      
      confirmTitle.textContent = title
      confirmMessage.textContent = message
      confirmModal.classList.remove('hidden')
      
      const closeDialog = () => {
        confirmModal.classList.add('hidden')
        confirmBtn.removeEventListener('click', handleConfirm)
        cancelBtn.removeEventListener('click', handleCancel)
      }
      
      const handleConfirm = () => {
        closeDialog()
        if (typeof onConfirm === 'function') {
          onConfirm()
        }
      }
      
      const handleCancel = () => {
        closeDialog()
      }
      
      confirmBtn.addEventListener('click', handleConfirm)
      cancelBtn.addEventListener('click', handleCancel)
    }


  }
  
  // 初始化 UI
  function init() {
    initElements()
    updateVipStatus()
    renderLoginChoiceForm()
    checkPaymentSuccess()
    if (!eventsBound) {
      bindEvents()
      eventsBound = true
    }
  }
  
  // 重新绑定切换按钮和发送验证码按钮事件
  function rebindSwitchEvents() {
    // 移除旧的事件监听器（通过克隆节点的方式）
    if (elements.switchToPasswordBtn) {
      const newSwitchToPasswordBtn = elements.switchToPasswordBtn.cloneNode(true)
      elements.switchToPasswordBtn.parentNode.replaceChild(newSwitchToPasswordBtn, elements.switchToPasswordBtn)
      elements.switchToPasswordBtn = newSwitchToPasswordBtn

      elements.switchToPasswordBtn.addEventListener('click', () => {
        transitionToForm('password')
      })
    }

    if (elements.switchToCodeBtn) {
      const newSwitchToCodeBtn = elements.switchToCodeBtn.cloneNode(true)
      elements.switchToCodeBtn.parentNode.replaceChild(newSwitchToCodeBtn, elements.switchToCodeBtn)
      elements.switchToCodeBtn = newSwitchToCodeBtn

      elements.switchToCodeBtn.addEventListener('click', () => {
        transitionToForm('code')
      })
    }

    // 重新绑定验证码登录表单的返回按钮
    if (elements.vipLoginCancelBtn) {
      const newVipLoginCancelBtn = elements.vipLoginCancelBtn.cloneNode(true)
      elements.vipLoginCancelBtn.parentNode.replaceChild(newVipLoginCancelBtn, elements.vipLoginCancelBtn)
      elements.vipLoginCancelBtn = newVipLoginCancelBtn

      elements.vipLoginCancelBtn.addEventListener('click', transitionToChoiceForm)
    }

    // 重新绑定密码登录表单的返回按钮
    if (elements.vipPasswordLoginCancelBtn) {
      const newVipPasswordLoginCancelBtn = elements.vipPasswordLoginCancelBtn.cloneNode(true)
      elements.vipPasswordLoginCancelBtn.parentNode.replaceChild(newVipPasswordLoginCancelBtn, elements.vipPasswordLoginCancelBtn)
      elements.vipPasswordLoginCancelBtn = newVipPasswordLoginCancelBtn

      elements.vipPasswordLoginCancelBtn.addEventListener('click', transitionToChoiceForm)
    }

    // 重新绑定发送验证码按钮事件
    if (elements.sendVipCodeBtn) {
      const newSendVipCodeBtn = elements.sendVipCodeBtn.cloneNode(true)
      elements.sendVipCodeBtn.parentNode.replaceChild(newSendVipCodeBtn, elements.sendVipCodeBtn)
      elements.sendVipCodeBtn = newSendVipCodeBtn
      
      elements.sendVipCodeBtn.addEventListener('click', async () => {
        // 如果已经发送过验证码，则不再发送
        if (smsSent) {
          showMessage('验证码已发送，请稍后再试')
          return
        }
        
        const phone = elements.vipPhoneInput.value.trim()
        
        if (!phone) {
          showMessage('手机号不能为空')
          return
        }
        
        if (!/^1[3-9]\d{9}$/.test(phone)) {
          showMessage('手机号格式不正确')
          return
        }
        
        setSendCodeBtnState(30)
        
        const result = await VIPSystem.sendSMS(phone)
        
        if (result.success) {
          smsSent = true
          showMessage('验证码已发送，请查收', 'success')
          
          // 开始倒计时
          let countdown = 30
          const timer = setInterval(() => {
            countdown--
            if (countdown > 0) {
              setSendCodeBtnState(countdown)
            } else {
              clearInterval(timer)
              setSendCodeBtnState()
            }
          }, 1000)
        } else {
          setSendCodeBtnState()
          showMessage(result.message || '发送失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定登录/注册按钮事件
    if (elements.vipLoginSubmitBtn) {
      const newVipLoginSubmitBtn = elements.vipLoginSubmitBtn.cloneNode(true)
      elements.vipLoginSubmitBtn.parentNode.replaceChild(newVipLoginSubmitBtn, elements.vipLoginSubmitBtn)
      elements.vipLoginSubmitBtn = newVipLoginSubmitBtn
      
      elements.vipLoginSubmitBtn.addEventListener('click', async () => {
        const phone = elements.vipPhoneInput.value.trim()
        const code = elements.vipCodeInput.value.trim()
        
        if (!phone || !code) {
          showMessage('手机号和验证码不能为空')
          return
        }
        
        if (!/^1[3-9]\d{9}$/.test(phone)) {
          showMessage('手机号格式不正确')
          return
        }
        
        if (code.length !== 4) {
          showMessage('验证码格式不正确')
          return
        }
        
        elements.vipLoginSubmitBtn.disabled = true
        elements.vipLoginSubmitBtn.textContent = '登录中...'
        
        const result = await VIPSystem.registerOrLogin(phone, code)
        
        elements.vipLoginSubmitBtn.disabled = false
        elements.vipLoginSubmitBtn.textContent = '登录/注册'
        
        if (result.success) {
          showMessage('登录成功', 'success')
          
          setTimeout(async () => {
            updateVipStatus()
            if (result.data.isNewUser || !result.data.hasPassword) {
              renderPasswordForm()
            } else {
              hideLoginModal()
              // 从云端加载商家信息并填充到画布
              if (typeof window.onVipLoginSuccess === 'function') {
                await window.onVipLoginSuccess(result.data)
              } else {
                location.reload()
              }
            }
          }, 1000)
        } else {
          showMessage(result.message || '登录失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定切换密码显示/隐藏按钮事件
    if (elements.togglePasswordBtn) {
      const newTogglePasswordBtn = elements.togglePasswordBtn.cloneNode(true)
      elements.togglePasswordBtn.parentNode.replaceChild(newTogglePasswordBtn, elements.togglePasswordBtn)
      elements.togglePasswordBtn = newTogglePasswordBtn
      
      elements.togglePasswordBtn.addEventListener('click', togglePasswordVisibility)
    }
    
    if (elements.toggleConfirmPasswordBtn) {
      const newToggleConfirmPasswordBtn = elements.toggleConfirmPasswordBtn.cloneNode(true)
      elements.toggleConfirmPasswordBtn.parentNode.replaceChild(newToggleConfirmPasswordBtn, elements.toggleConfirmPasswordBtn)
      elements.toggleConfirmPasswordBtn = newToggleConfirmPasswordBtn
      
      elements.toggleConfirmPasswordBtn.addEventListener('click', () => {
        if (elements.vipConfirmPasswordInput && elements.toggleConfirmPasswordBtn) {
          if (elements.vipConfirmPasswordInput.type === 'password') {
            elements.vipConfirmPasswordInput.type = 'text'
            elements.toggleConfirmPasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye-slash', 'svg-icon') : '<i class="fa fa-eye-slash"></i>'
          } else {
            elements.vipConfirmPasswordInput.type = 'password'
            elements.toggleConfirmPasswordBtn.innerHTML = window.getSVGIcon ? window.getSVGIcon('eye', 'svg-icon') : '<i class="fa fa-eye"></i>'
          }
        }
      })
    }
    
    // 重新绑定保存密码按钮事件
    if (elements.vipPasswordSubmitBtn) {
      const newVipPasswordSubmitBtn = elements.vipPasswordSubmitBtn.cloneNode(true)
      elements.vipPasswordSubmitBtn.parentNode.replaceChild(newVipPasswordSubmitBtn, elements.vipPasswordSubmitBtn)
      elements.vipPasswordSubmitBtn = newVipPasswordSubmitBtn
      
      elements.vipPasswordSubmitBtn.addEventListener('click', async () => {
        const password = elements.vipPasswordInput.value.trim()
        const confirmPassword = elements.vipConfirmPasswordInput.value.trim()
        
        if (!password || !confirmPassword) {
          showMessage('密码和确认密码不能为空')
          return
        }
        
        if (password !== confirmPassword) {
          showMessage('两次输入的密码不一致')
          return
        }
        
        if (password.length < 6) {
          showMessage('密码长度至少为6位')
          return
        }
        
        elements.vipPasswordSubmitBtn.disabled = true
        elements.vipPasswordSubmitBtn.textContent = '保存中...'
        
        const userId = VIPSystem.getUserId()
        const result = await VIPSystem.updatePassword(userId, password)
        
        elements.vipPasswordSubmitBtn.disabled = false
        elements.vipPasswordSubmitBtn.textContent = '保存密码'
        
        if (result.success) {
          showMessage('密码设置成功', 'success')
          
          setTimeout(() => {
            updateVipStatus()
            hideLoginModal()
            location.reload()
          }, 1000)
        } else {
          showMessage(result.message || '密码设置失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定密码登录按钮事件
    if (elements.vipPasswordLoginSubmitBtn) {
      const newVipPasswordLoginSubmitBtn = elements.vipPasswordLoginSubmitBtn.cloneNode(true)
      elements.vipPasswordLoginSubmitBtn.parentNode.replaceChild(newVipPasswordLoginSubmitBtn, elements.vipPasswordLoginSubmitBtn)
      elements.vipPasswordLoginSubmitBtn = newVipPasswordLoginSubmitBtn
      
      elements.vipPasswordLoginSubmitBtn.addEventListener('click', async () => {
        const phone = elements.vipPhoneInput.value.trim()
        const password = elements.vipPasswordInput.value.trim()
        
        if (!phone || !password) {
          showMessage('手机号和密码不能为空')
          return
        }
        
        if (!/^1[3-9]\d{9}$/.test(phone)) {
          showMessage('手机号格式不正确')
          return
        }
        
        elements.vipPasswordLoginSubmitBtn.disabled = true
        elements.vipPasswordLoginSubmitBtn.textContent = '登录中...'
        
        const result = await VIPSystem.loginWithPassword(phone, password)
        
        elements.vipPasswordLoginSubmitBtn.disabled = false
        elements.vipPasswordLoginSubmitBtn.textContent = '登录'
        
        if (result.success) {
          showMessage('登录成功', 'success')
          
          setTimeout(() => {
            updateVipStatus()
            hideLoginModal()
            location.reload()
          }, 1000)
        } else {
          showMessage(result.message || '登录失败，请稍后重试')
        }
      })
    }
    
    // 重新绑定取消按钮事件
    if (elements.vipPasswordCancelBtn) {
      const newVipPasswordCancelBtn = elements.vipPasswordCancelBtn.cloneNode(true)
      elements.vipPasswordCancelBtn.parentNode.replaceChild(newVipPasswordCancelBtn, elements.vipPasswordCancelBtn)
      elements.vipPasswordCancelBtn = newVipPasswordCancelBtn
      
      elements.vipPasswordCancelBtn.addEventListener('click', () => {
        transitionToChoiceForm()
      })
    }

    // 重新绑定回车键提交
    if (elements.vipPhoneInput) {
      const newVipPhoneInput = elements.vipPhoneInput.cloneNode(true)
      elements.vipPhoneInput.parentNode.replaceChild(newVipPhoneInput, elements.vipPhoneInput)
      elements.vipPhoneInput = newVipPhoneInput
      
      elements.vipPhoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (elements.vipCodeInput) {
            elements.vipCodeInput.focus()
          } else if (elements.vipPasswordInput) {
            elements.vipPasswordInput.focus()
          }
        }
      })
    }
    
    if (elements.vipCodeInput) {
      const newVipCodeInput = elements.vipCodeInput.cloneNode(true)
      elements.vipCodeInput.parentNode.replaceChild(newVipCodeInput, elements.vipCodeInput)
      elements.vipCodeInput = newVipCodeInput
      
      elements.vipCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipLoginSubmitBtn.click()
        }
      })
    }
    
    if (elements.vipPasswordInput) {
      const newVipPasswordInput = elements.vipPasswordInput.cloneNode(true)
      elements.vipPasswordInput.parentNode.replaceChild(newVipPasswordInput, elements.vipPasswordInput)
      elements.vipPasswordInput = newVipPasswordInput
      
      elements.vipPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (elements.vipPasswordSubmitBtn) {
            elements.vipPasswordSubmitBtn.click()
          } else if (elements.vipPasswordLoginSubmitBtn) {
            elements.vipPasswordLoginSubmitBtn.click()
          }
        }
      })
    }
    
    if (elements.vipConfirmPasswordInput) {
      const newVipConfirmPasswordInput = elements.vipConfirmPasswordInput.cloneNode(true)
      elements.vipConfirmPasswordInput.parentNode.replaceChild(newVipConfirmPasswordInput, elements.vipConfirmPasswordInput)
      elements.vipConfirmPasswordInput = newVipConfirmPasswordInput
      
      elements.vipConfirmPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.vipPasswordSubmitBtn.click()
        }
      })
    }
  }
  
  return {
    init,
    showLoginModal,
    showPasswordModal,
    showPasswordLoginModal,
    hideLoginModal,
    showMessage,
    clearMessage,
    rebindSwitchEvents,
    updateVipStatus,
    renderVipUpgradeForm
  }
})()

// 升级码激活/VIP升级弹窗（首页和编辑页共用）
window.showVipUpgradeModal = function() {
  let existingModal = document.getElementById('vipUpgradeModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'vipUpgradeModal';
  modal.className = 'modal-overlay';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; align-items: center; justify-content: center;';

  modal.innerHTML = `
    <div class="vip-upgrade-modal">
      <button id="closeVipUpgradeBtn" class="close-modal-btn">&times;</button>

      <h3 class="vip-upgrade-header">
        提速增效，上千节日海报模板随时可用
      </h3>

      <div class="voucher-input-container">
        <span class="upgrade-channel-label">升级通道一：</span>
        <div class="input-button-group">
          <div class="input-wrapper">
            <input type="text" id="voucherCodeInput" class="voucher-input" placeholder="请输入升级码">
            <button id="clearInputBtn" class="clear-input-btn" style="display: none;">X</button>
            <button id="pasteInputBtn" class="paste-input-btn">粘贴</button>
          </div>
          <button id="verifyVoucherBtn" class="verify-btn">验证</button>
        </div>
      </div>

      <div id="voucherResult" class="voucher-result">
        <div id="voucherErrorMessage" class="voucher-error-message"></div>
        <div id="voucherErrorLog" class="voucher-error-log"></div>
        <button id="copyErrorLogBtn" class="copy-error-log-btn">复制错误日志</button>
      </div>

      <div class="vip-packages-section">
        <div class="vip-packages-title">升级通道二：(周年感恩大送)</div>
        <div class="vip-packages-wrapper">
          <div class="vip-packages-container" id="vipUpgradePackageGrid">
            <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #999; font-size: 13px;">套餐加载中...</div>
          </div>
        </div>
      </div>

      <div class="vip-upgrade-actions">
        <button id="closeVipUpgradeBtn2" class="close-upgrade-btn">关闭</button>
        <div class="payment-btn-wrapper">
          <button id="proceedToPaymentBtn" class="proceed-to-payment-btn">立即支付</button>
          <div class="discount-badge payment-discount-badge">1折</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const voucherInput = document.getElementById('voucherCodeInput');
  const verifyBtn = document.getElementById('verifyVoucherBtn');
  const resultDiv = document.getElementById('voucherResult');
  const closeBtn = document.getElementById('closeVipUpgradeBtn');
  const closeBtn2 = document.getElementById('closeVipUpgradeBtn2');
  const proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn');
  const clearInputBtn = document.getElementById('clearInputBtn');
  const pasteInputBtn = document.getElementById('pasteInputBtn');

  function updateInputButtons() {
    if (voucherInput.value.length > 0) {
      clearInputBtn.style.display = 'flex';
      pasteInputBtn.style.display = 'none';
    } else {
      clearInputBtn.style.display = 'none';
      pasteInputBtn.style.display = 'flex';
    }
  }

  updateInputButtons();
  voucherInput.addEventListener('input', updateInputButtons);

  clearInputBtn.addEventListener('click', () => {
    voucherInput.value = '';
    updateInputButtons();
    voucherInput.focus();
  });

  pasteInputBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      voucherInput.value = text;
      updateInputButtons();
      voucherInput.focus();
    } catch (err) {
      console.error('粘贴失败:', err);
      alert('无法读取剪贴板内容，请手动输入');
    }
  });

  const closeModal = () => modal.remove();
  closeBtn.addEventListener('click', closeModal);
  closeBtn2.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  verifyBtn.addEventListener('click', async () => {
    const code = voucherInput.value.trim();
    if (!code) {
      showVoucherResult(resultDiv, 'error', '请输入升级码');
      return;
    }

    verifyBtn.classList.add('pulse-animation');
    verifyBtn.disabled = true;
    verifyBtn.textContent = '验证中...';

    try {
      let userId = typeof VIPSystem !== 'undefined' ? VIPSystem.getUserId() : null;

      if (!userId || typeof userId !== 'string' || userId.trim() === '' || userId.trim() === 'undefined') {
        showVoucherResult(resultDiv, 'error', '请先登录后再验证升级码');
        verifyBtn.disabled = false;
        verifyBtn.textContent = '验证';
        return;
      }

      const result = await VIPSystem.verifyVoucher(code, userId);

      if (result.success) {
        if (result.used) {
          const usedAt = new Date(result.usedAt);
          const phone = result.usedByPhone || '';
          const maskedPhone = phone ? phone.substring(0, 4) + '...' + phone.substring(phone.length - 4) : '';
          const dateStr = `${usedAt.getFullYear()}年${String(usedAt.getMonth() + 1).padStart(2, '0')}月${String(usedAt.getDate()).padStart(2, '0')}日`;

          showVoucherResult(resultDiv, 'info', `验证码：${code}已于${dateStr}，账号(${maskedPhone})激活使用，增加时长${result.duration}个月`);
        } else {
          const validUntil = new Date(result.validUntil);
          const dateStr = `${validUntil.getFullYear()}年${String(validUntil.getMonth() + 1).padStart(2, '0')}月${String(validUntil.getDate()).padStart(2, '0')}日`;

          showVoucherResult(resultDiv, 'success', `恭喜，升级成功，您的账号已经成功升级VIP账号，增时${result.duration}个月，有效时间至 ${dateStr} 24时0分0秒`);

          // 弹出统一的支付成功（升级成功）弹窗，与支付升级保持一致体验
          setTimeout(() => {
            modal.remove()
            if (typeof showPaymentResultModal === 'function') {
              showPaymentResultModal({ success: true, outTradeNo: '' })
            }
          }, 1200);
        }
      } else {
        showVoucherResult(resultDiv, 'error', '验证失败 请准确复制升级码，或联系客服解决', result);
      }
    } catch (error) {
      console.error('验证升级码失败:', error);
      showVoucherResult(resultDiv, 'error', '验证失败，请稍后重试', error);
    } finally {
      verifyBtn.disabled = false;
      verifyBtn.textContent = '验证';
      verifyBtn.classList.remove('pulse-animation');
    }
  });

  voucherInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyBtn.click();
  });

  voucherInput.focus();

  function updatePaymentDiscountBadge(selectedPackage) {
    if (!selectedPackage) return;

    const price = parseFloat(selectedPackage.dataset.price);
    const originalPrice = parseFloat(selectedPackage.dataset.originalPrice);

    if (price && originalPrice) {
      const discount = (price / originalPrice * 10).toFixed(1);

      let badge = document.querySelector('.payment-discount-badge');

      if (badge) {
        badge.textContent = `${discount}折`;
        badge.classList.remove('pulse-animation');
        setTimeout(() => badge.classList.add('pulse-animation'), 10);
      }
    }
  }

  // 异步加载云端套餐并渲染到升级弹窗（class 风格，对接 styles.css）
  const upgradeGrid = document.getElementById('vipUpgradePackageGrid')
  if (upgradeGrid) {
    // 套餐点击事件（事件委托）
    upgradeGrid.addEventListener('click', function(e) {
      const pkg = e.target.closest('.vip-package')
      if (!pkg) return
      const allPackages = upgradeGrid.querySelectorAll('.vip-package')
      allPackages.forEach(p => {
        p.classList.remove('selected')
        const selectBtn = p.querySelector('.select-package-btn')
        if (selectBtn) selectBtn.textContent = '选择'
      })
      pkg.classList.add('selected')
      pkg.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      const selectBtn = pkg.querySelector('.select-package-btn')
      if (selectBtn) selectBtn.textContent = '✔ 已选择'

      if (typeof updatePaymentDiscountBadge === 'function') updatePaymentDiscountBadge(pkg)

      const price = pkg.dataset.price
      if (proceedToPaymentBtn) {
        proceedToPaymentBtn.textContent = `立即支付${price}元`
        proceedToPaymentBtn.style.display = 'block'
      }
    })

    // 渲染套餐（renderVipPackagesToGrid 内部会自动选中 featured 套餐并同步支付按钮文案）
    renderVipPackagesToGrid(upgradeGrid, { style: 'class' }).then(() => {
      // 渲染完成后，若有 featured 套餐，滚动到它并更新折扣徽章
      const featured = upgradeGrid.querySelector('.vip-package.vip-package-featured') || upgradeGrid.querySelector('.vip-package.selected')
      if (featured) {
        setTimeout(() => featured.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 100)
        if (typeof updatePaymentDiscountBadge === 'function') updatePaymentDiscountBadge(featured)
      }
    })
  }

  if (proceedToPaymentBtn) {
    proceedToPaymentBtn.addEventListener('click', async function() {
      const selectedPackage = upgradeGrid ? upgradeGrid.querySelector('.vip-package.selected') : document.querySelector('.vip-package.selected')
      if (!selectedPackage) {
        alert('请先选择一个套餐')
        return
      }

      if (!VIPSystem.isLoggedIn()) {
        alert('请先登录')
        return
      }

      const duration = parseInt(selectedPackage.dataset.duration)
      const price = selectedPackage.dataset.price
      const packageId = selectedPackage.dataset.packageId || ''
      const type = 'wxpay'

      console.log('支付参数:', { duration, price, type, packageId, isLoggedIn: VIPSystem.isLoggedIn() })
      console.log('userId:', VIPSystem.getUserId())

      const loadingModal = document.createElement('div')
      loadingModal.id = 'paymentLoadingModal'
      loadingModal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10001; display: flex; align-items: center; justify-content: center;'
      loadingModal.innerHTML = `
        <div style="background: #fff; border-radius: 12px; padding: 24px; text-align: center;">
          <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #d32f2f; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
          <p style="margin: 0; color: #333;">正在创建订单...</p>
        </div>
      `
      document.body.appendChild(loadingModal)

      try {
        const returnUrl = buildPaymentReturnUrl()
        const result = await VIPSystem.createPaymentOrder(price, duration, type, returnUrl, packageId)

        loadingModal.remove()

        if (result.success && result.data && result.data.payUrl) {
          initiatePayment(result.data.payUrl, result.data.out_trade_no)
        } else {
          alert(result.message || '创建订单失败，请稍后重试')
        }
      } catch (error) {
        loadingModal.remove()
        console.error('支付失败:', error)
        alert('支付失败，请稍后重试')
      }
    })
  }
};

// 升级码验证结果弹窗
function showVoucherResult(element, type, message, errorDetails = null) {
  const modal = document.createElement('div');
  modal.className = 'voucher-result-modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'voucher-result-modal-content';

  if (type === 'success') {
    modalContent.classList.add('success');
  } else if (type === 'error') {
    modalContent.classList.add('error');
  } else if (type === 'info') {
    modalContent.classList.add('info');
  }

  const closeXBtn = document.createElement('button');
  closeXBtn.className = 'voucher-result-close-btn x-btn';
  closeXBtn.textContent = '×';
  closeXBtn.onclick = function() {
    document.body.removeChild(modal);
  };
  modalContent.appendChild(closeXBtn);

  const modalTitle = document.createElement('h3');
  modalTitle.className = 'voucher-result-modal-title';
  modalTitle.textContent = type === 'success' ? '验证成功' : type === 'info' ? '提示信息' : '验证失败';
  modalContent.appendChild(modalTitle);

  const messageDiv = document.createElement('div');
  messageDiv.className = 'voucher-result-message';
  messageDiv.textContent = message;
  modalContent.appendChild(messageDiv);

  if (type === 'error' && errorDetails) {
    const errorLogDiv = document.createElement('div');
    errorLogDiv.id = 'voucherErrorLog';
    errorLogDiv.className = 'voucher-error-log';
    const timestamp = new Date().toLocaleString('zh-CN');
    const logContent = `[${timestamp}] 错误信息：${JSON.stringify(errorDetails)}
[${timestamp}] 验证失败：${message}`;
    errorLogDiv.textContent = logContent;
    modalContent.appendChild(errorLogDiv);

    const copyLogBtn = document.createElement('button');
    copyLogBtn.id = 'copyErrorLogBtn';
    copyLogBtn.className = 'copy-log-btn';
    copyLogBtn.textContent = '复制错误日志';
    copyLogBtn.onclick = function() {
      const logContent = errorLogDiv.textContent;
      if (logContent) {
        navigator.clipboard.writeText(logContent).then(() => {
          alert('错误日志已复制到剪贴板');
        }).catch(err => {
          console.error('复制失败:', err);
          alert('复制失败，请手动复制');
        });
      }
    };
    modalContent.appendChild(copyLogBtn);
  }

  const closeBtn = document.createElement('button');
  closeBtn.className = 'voucher-result-close';
  closeBtn.textContent = '关闭';
  closeBtn.onclick = function() {
    document.body.removeChild(modal);
  };
  modalContent.appendChild(closeBtn);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// 监听首页恢复可见事件，统一恢复支付检测。
// 在 App 关闭收银台、首页 webview 重新变为可见时触发。
// 注意：不依赖旧的 setInterval 定时器，每次恢复可见都重新拉起检测。
function setupPaymentResumeListeners() {
  let resumeScheduled = false
  // 用微延迟防抖，避免 visibilitychange + focus 同时触发导致重复恢复
  const scheduleResume = (reason) => {
    if (resumeScheduled) return
    resumeScheduled = true
    console.log('[payment-flow] resume scheduled by:', reason)
    setTimeout(() => {
      resumeScheduled = false
      try {
        resumePendingPaymentFlow()
      } catch (e) {
        console.error('[payment-flow] resume pending payment flow 异常:', e)
      }
    }, 100)
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      scheduleResume('visibilitychange')
    }
  })

  window.addEventListener('focus', () => {
    scheduleResume('focus')
  })

  window.addEventListener('pageshow', (event) => {
    // event.persisted 为 true 表示从 bfcache 恢复
    scheduleResume(event.persisted ? 'pageshow(bfcache)' : 'pageshow')
  })
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  VipLoginUI.init()
  setupPaymentResumeListeners()
  // 首次加载也尝试恢复一次，兜底页面被刷新但 pending 仍在的情况
  try {
    resumePendingPaymentFlow()
  } catch (e) {
    console.error('[payment-flow] initial resume 异常:', e)
  }
})
