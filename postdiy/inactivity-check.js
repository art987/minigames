/**
 * 页面不活动检测模块
 * 功能：
 * - 60分钟无操作：直接刷新页面
 */

(function() {
  // 配置参数
  const INACTIVITY_CONFIG = {
    // 60分钟刷新阈值（毫秒）
    refreshThreshold: 60 * 60 * 1000,
    // 本地存储键名
    lastActivityKey: 'postdiy_last_activity_time',
    // 检查间隔（毫秒）
    checkInterval: 30000
  };

  // 记录用户活动
  function recordActivity() {
    const now = Date.now();
    localStorage.setItem(INACTIVITY_CONFIG.lastActivityKey, now.toString());
  }

  // 获取上次活动时间
  function getLastActivityTime() {
    const stored = localStorage.getItem(INACTIVITY_CONFIG.lastActivityKey);
    if (stored) {
      return parseInt(stored, 10);
    }
    return Date.now();
  }

  // 检查不活动状态
  function checkInactivity() {
    const now = Date.now();
    const lastActivity = getLastActivityTime();
    const inactiveTime = now - lastActivity;

    // 超过60分钟：直接刷新页面
    if (inactiveTime >= INACTIVITY_CONFIG.refreshThreshold) {
      recordActivity();
      window.location.reload();
    }
  }

  // 页面可见性变化检测
  function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      checkInactivity();
    }
  }

  // 监听用户活动事件
  function setupActivityListeners() {
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
    const throttleTime = 60000;

    activityEvents.forEach(function(eventName) {
      document.addEventListener(eventName, function() {
        const now = Date.now();
        if (now - lastRecordTime >= throttleTime) {
          recordActivity();
          lastRecordTime = now;
        }
      }, { passive: true });
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (document.readyState === 'complete') {
      recordActivity();
    } else {
      window.addEventListener('load', recordActivity);
    }
  }

  // 初始化
  function init() {
    setupActivityListeners();
  }

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