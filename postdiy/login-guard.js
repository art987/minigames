/**
 * 登录守护脚本 - 在页面加载最早期执行，避免浪费流量
 * 此脚本必须同步加载（不使用 defer/async），放在 head 最靠前位置
 */

(function() {
  // 配置（与 config_data.js 保持同步）
  const LOGIN_CONFIG = {
    enabled: true,    // 是否开启强制登录
    loginPage: 'login.html',  // 登录页面路径
    pages: ['index.html', 'editor.html']  // 需要强制登录的页面
  };

  // 获取当前页面名称
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // 如果是登录页面本身，不执行检测
  if (currentPage === 'login.html') {
    return;
  }
  
  // 如果当前页面不在需要强制登录的列表中，跳过检测
  if (!LOGIN_CONFIG.pages.includes(currentPage)) {
    console.log('[LoginGuard] 当前页面不需要强制登录:', currentPage);
    return;
  }
  
  // 检查是否开启强制登录
  if (!LOGIN_CONFIG.enabled) {
    console.log('[LoginGuard] 强制登录已关闭');
    return;
  }
  
  // 检查用户是否已登录（直接读取 localStorage）
  const userId = localStorage.getItem('postdiy_user_id');
  
  if (userId) {
    console.log('[LoginGuard] 用户已登录:', userId);
    return;
  }
  
  // 用户未登录，立即跳转到登录页面
  console.log('[LoginGuard] 用户未登录，立即跳转到登录页面');
  
  const currentUrl = window.location.href;
  const loginUrl = LOGIN_CONFIG.loginPage + '?redirect=' + encodeURIComponent(currentUrl);
  
  // 立即跳转，阻止后续资源加载
  window.location.href = loginUrl;
  
  // 抛出错误阻止后续脚本执行（可选的额外保护）
  throw new Error('[LoginGuard] 用户未登录，页面加载已终止');
})();