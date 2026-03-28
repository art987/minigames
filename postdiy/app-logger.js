const AppLogger = (function() {
  let logs = []
  let maxLogs = 500
  let logModal = null
  let floatBtn = null

  function init() {
    if (floatBtn) return
    
    floatBtn = document.createElement('div')
    floatBtn.id = 'appLogFloatBtn'
    floatBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z"/>
      </svg>
    `
    floatBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      z-index: 9999;
      transition: all 0.3s ease;
    `
    
    floatBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)'
    })
    floatBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)'
    })
    floatBtn.addEventListener('click', showLogModal)
    
    document.body.appendChild(floatBtn)
    
    overrideConsole()
    
    log('INFO', '日志系统已启动')
  }

  function log(level, message, data = null) {
    const timestamp = new Date().toLocaleString('zh-CN', { 
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    
    const logEntry = {
      timestamp,
      level,
      message,
      data: data ? JSON.stringify(data, null, 2) : null
    }
    
    logs.unshift(logEntry)
    
    if (logs.length > maxLogs) {
      logs.pop()
    }
    
    updateLogModal()
  }

  function overrideConsole() {
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn
    
    function safeStringify(obj) {
      try {
        return JSON.stringify(obj)
      } catch (e) {
        if (e.message.includes('circular')) {
          return '[Object with circular reference]'
        }
        return '[Object]'
      }
    }
    
    console.log = function(...args) {
      originalLog.apply(console, args)
      log('LOG', args.map(a => typeof a === 'object' ? safeStringify(a) : a).join(' '))
    }
    
    console.error = function(...args) {
      originalError.apply(console, args)
      log('ERROR', args.map(a => typeof a === 'object' ? safeStringify(a) : a).join(' '))
    }
    
    console.warn = function(...args) {
      originalWarn.apply(console, args)
      log('WARN', args.map(a => typeof a === 'object' ? safeStringify(a) : a).join(' '))
    }
  }

  function showLogModal() {
    if (logModal) {
      logModal.style.display = 'flex'
      return
    }
    
    logModal = document.createElement('div')
    logModal.id = 'appLogModal'
    logModal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
    `
    
    logModal.innerHTML = `
      <div style="background: #1e1e1e; border-radius: 12px; width: 90%; max-width: 700px; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column;">
        <div style="padding: 16px 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; background: #252526;">
          <h3 style="margin: 0; font-size: 16px; color: #fff; display: flex; align-items: center; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#4ec9b0">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z"/>
            </svg>
            运行日志 <span id="logCount" style="font-size: 12px; color: #888;">(0条)</span>
          </h3>
          <div style="display: flex; gap: 8px;">
            <button id="copyAllLogsBtn" style="padding: 8px 16px; background: #0e639c; color: #fff; border: none; border-radius: 6px; font-size: 13px; cursor: pointer;">复制全部</button>
            <button id="clearLogsBtn" style="padding: 8px 16px; background: #5a5a5a; color: #fff; border: none; border-radius: 6px; font-size: 13px; cursor: pointer;">清空</button>
            <button id="closeLogModalBtn" style="padding: 8px 12px; background: transparent; color: #888; border: none; font-size: 20px; cursor: pointer;">&times;</button>
          </div>
        </div>
        <div id="logContent" style="flex: 1; overflow-y: auto; padding: 12px; font-family: 'Consolas', 'Monaco', monospace; font-size: 12px; line-height: 1.6;">
        </div>
      </div>
    `
    
    document.body.appendChild(logModal)
    
    document.getElementById('closeLogModalBtn').addEventListener('click', () => {
      logModal.style.display = 'none'
    })
    
    document.getElementById('copyAllLogsBtn').addEventListener('click', copyAllLogs)
    
    document.getElementById('clearLogsBtn').addEventListener('click', () => {
      logs = []
      updateLogModal()
    })
    
    logModal.addEventListener('click', (e) => {
      if (e.target === logModal) {
        logModal.style.display = 'none'
      }
    })
    
    updateLogModal()
  }

  function updateLogModal() {
    const content = document.getElementById('logContent')
    const countEl = document.getElementById('logCount')
    
    if (!content) return
    
    if (countEl) {
      countEl.textContent = `(${logs.length}条)`
    }
    
    if (logs.length === 0) {
      content.innerHTML = '<div style="color: #666; text-align: center; padding: 40px;">暂无日志</div>'
      return
    }
    
    content.innerHTML = logs.map((log, index) => {
      const levelColor = {
        'INFO': '#4ec9b0',
        'LOG': '#9cdcfe',
        'WARN': '#dcdcaa',
        'ERROR': '#f14c4c'
      }[log.level] || '#9cdcfe'
      
      const bg = index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.03)'
      
      return `
        <div class="log-entry" style="padding: 8px 12px; border-radius: 4px; margin-bottom: 4px; background: ${bg}; cursor: pointer;" onclick="AppLogger.copyLog(${index})">
          <div style="display: flex; gap: 12px;">
            <span style="color: #6a9955; flex-shrink: 0;">${log.timestamp}</span>
            <span style="color: ${levelColor}; flex-shrink: 0; width: 50px;">[${log.level}]</span>
            <span style="color: #d4d4d4; word-break: break-all;">${escapeHtml(log.message)}</span>
          </div>
          ${log.data ? `<pre style="margin: 8px 0 0 74px; color: #ce9178; white-space: pre-wrap; word-break: break-all;">${escapeHtml(log.data)}</pre>` : ''}
        </div>
      `
    }).join('')
  }

  function escapeHtml(str) {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  }

  function copyLog(index) {
    const log = logs[index]
    if (!log) return
    
    const text = `[${log.timestamp}] [${log.level}] ${log.message}${log.data ? '\n' + log.data : ''}`
    copyToClipboard(text)
    showToast('已复制该条日志')
  }

  function copyAllLogs() {
    const text = logs.map(log => 
      `[${log.timestamp}] [${log.level}] ${log.message}${log.data ? '\n' + log.data : ''}`
    ).join('\n\n')
    
    copyToClipboard(text)
    showToast('已复制全部日志')
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }

  function showToast(message) {
    const toast = document.createElement('div')
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: rgba(0,0,0,0.8);
      color: #fff;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      z-index: 100001;
      animation: fadeInOut 2s ease forwards;
    `
    
    document.body.appendChild(toast)
    
    setTimeout(() => toast.remove(), 2000)
  }

  return {
    init,
    log,
    copyLog,
    showLogModal
  }
})()

document.addEventListener('DOMContentLoaded', () => {
  AppLogger.init()
})

const style = document.createElement('style')
style.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(10px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }
`
document.head.appendChild(style)
