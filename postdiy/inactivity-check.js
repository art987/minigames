/**
 * 页面不活动检测模块
 * 功能：
 * - 60分钟无操作：弹出提示弹窗，让用户选择是否刷新
 * - 3小时无操作：强制刷新页面
 */

(function() {
  // 配置参数
  const INACTIVITY_CONFIG = {
    // 60分钟提示阈值（毫秒）
    promptThreshold: 60 * 60 * 1000,
    // 3小时强制刷新阈值（毫秒）
    forceRefreshThreshold: 3 * 60 * 60 * 1000,
    // 本地存储键名
    lastActivityKey: 'postdiy_last_activity_time',
    // 检查间隔（毫秒）
    checkInterval: 30000
  };

  // 记录用户活动
  function recordActivity() {
    const now = Date.now();
    localStorage.setItem(INACTIVITY_CONFIG.lastActivityKey, now.toString());
    console.log('用户活动已记录:', new Date(now).toLocaleString());
  }

  // 获取上次活动时间
  function getLastActivityTime() {
    const stored = localStorage.getItem(INACTIVITY_CONFIG.lastActivityKey);
    if (stored) {
      return parseInt(stored, 10);
    }
    return Date.now(); // 如果没有记录，返回当前时间
  }

  // 显示刷新提示弹窗
  function showRefreshPromptModal() {
    // 移除可能已存在的弹窗
    const existingModal = document.getElementById('inactivityRefreshModal');
    if (existingModal) {
      existingModal.remove();
    }

    // 创建弹窗HTML
    const modalHTML = `
      <div id="inactivityRefreshModal" class="modal-overlay" style="display: flex; z-index: 99999;">
        <div class="modal inactivity-modal" style="max-width: 420px; width: 90%;">
          <div class="modal-header fixed-header">
            <h2 class="modal-title">
              
              温馨提示
            </h2>
          </div>
          <div class="modal-body" style="padding: 20px;">
            <div class="inactivity-message" style="text-align: center; margin-bottom: 20px;">
              <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
                您已经超过 <strong style="color: #f59e0b;">60分钟</strong> 没有任何操作
              </p>
              <p style="font-size: 14px; color: #666;">
                建议刷新页面，获取最新模板和数据更新
              </p>
            </div>
            <div class="inactivity-actions" style="display: flex; gap: 15px; justify-content: center;">
              <button id="refreshNowBtn" class="editor-button" style="background:linear-gradient(135deg, #d32f2f, #f44336); color: white; padding: 12px 10px; font-size: 16px; border-radius: 8px;">
                
                马上刷新
              </button>
              <button id="skipRefreshBtn" class="editor-button editor-button-secondary" style="padding: 12px 10px; font-size: 16px; border-radius: 8px;">
                创作中，暂不刷新
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // 插入弹窗
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 替换图标（如果replaceFAIcons函数存在）
    if (typeof replaceFAIcons === 'function') {
      replaceFAIcons();
    }

    // 绑定按钮事件
    const refreshNowBtn = document.getElementById('refreshNowBtn');
    const skipRefreshBtn = document.getElementById('skipRefreshBtn');

    if (refreshNowBtn) {
      refreshNowBtn.addEventListener('click', function() {
        // 记录当前活动时间后刷新
        recordActivity();
        window.location.reload();
      });
    }

    if (skipRefreshBtn) {
      skipRefreshBtn.addEventListener('click', function() {
        // 关闭弹窗，更新活动时间
        recordActivity();
        const modal = document.getElementById('inactivityRefreshModal');
        if (modal) {
          modal.remove();
        }
      });
    }

    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
    const modal = document.getElementById('inactivityRefreshModal');
    if (modal) {
      // 点击背景不关闭
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          // 不关闭，强制用户选择
        }
      });
    }
  }

  // 检查不活动状态
  function checkInactivity() {
    const now = Date.now();
    const lastActivity = getLastActivityTime();
    const inactiveTime = now - lastActivity;

    console.log('不活动检测:', {
      '上次活动': new Date(lastActivity).toLocaleString(),
      '当前时间': new Date(now).toLocaleString(),
      '不活动时长': Math.floor(inactiveTime / 60000) + '分钟'
    });

    // 超过3小时：强制刷新
    if (inactiveTime >= INACTIVITY_CONFIG.forceRefreshThreshold) {
      console.log('超过3小时无操作，强制刷新页面');
      recordActivity();
      window.location.reload();
      return;
    }

    // 超过60分钟：显示提示弹窗
    if (inactiveTime >= INACTIVITY_CONFIG.promptThreshold) {
      console.log('超过60分钟无操作，显示刷新提示');
      showRefreshPromptModal();
    }
  }

  // 页面可见性变化检测
  function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      // 页面重新可见时检查不活动状态
      console.log('页面重新可见，检查不活动状态...');
      checkInactivity();
    }
  }

  // 监听用户活动事件
  function setupActivityListeners() {
    // 监听的用户活动类型
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click',
      'focus'
    ];

    // 使用节流，避免过于频繁记录
    let lastRecordTime = 0;
    const throttleTime = 60000; // 1分钟内只记录一次

    activityEvents.forEach(function(eventName) {
      document.addEventListener(eventName, function() {
        const now = Date.now();
        if (now - lastRecordTime >= throttleTime) {
          recordActivity();
          lastRecordTime = now;
        }
      }, { passive: true });
    });

    // 页面可见性变化
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 页面加载完成时记录活动
    if (document.readyState === 'complete') {
      recordActivity();
    } else {
      window.addEventListener('load', recordActivity);
    }
  }

  // 初始化
  function init() {
    console.log('不活动检测模块已初始化');
    setupActivityListeners();

    // 页面首次打开时检查（如果是通过标签页切换回来）
    if (document.visibilityState === 'visible') {
      // 首次加载不检查，避免刚打开就弹窗
      // 只在页面重新可见时检查
    }
  }

  // DOM准备好后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露到全局，供调试使用
  window.inactivityChecker = {
    check: checkInactivity,
    recordActivity: recordActivity,
    getLastActivityTime: getLastActivityTime,
    config: INACTIVITY_CONFIG
  };
})();