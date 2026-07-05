/**
 * 统一后台管理导航栏模块
 * 自动注入导航栏到页面，支持移动端响应式
 * 集成统一登录验证，一次登录所有管理页面共享状态
 */
(function() {
  // 导航菜单配置
  // 注意：菜单项的 href 使用相对路径，因为在 sam/ 目录下运行。
  // 后台首页放在第一位，方便从任意子页面回到首页。
  const NAV_MENU = [
    {
      id: 'index',
      name: '后台首页',
      icon: 'home',
      href: 'index.html',
      description: '后台管理中心首页'
    },
    {
      id: 'member-admin',
      name: '会员管理',
      icon: 'users',
      href: 'member-admin.html',
      description: '查看和管理所有会员信息'
    },
    {
      id: 'voucher-admin',
      name: '激活码管理',
      icon: 'ticket',
      href: 'voucher-admin.html',
      description: '批量生成、筛选、导出激活码'
    },
    {
      id: 'vip-packages-admin',
      name: 'VIP套餐管理',
      icon: 'crown',
      href: 'vip-packages-admin.html',
      description: '配置 VIP 套餐价格、上下架'
    }
  ];

  // 获取当前页面标识
  function getCurrentPage() {
    const path = window.location.pathname;
    // 处理 sam/ 目录默认页（路径以 / 结尾或为空时，视为后台首页）
    if (path === '/' || path === '' || path.endsWith('/sam/') || path.endsWith('/sam')) {
      return 'index';
    }
    for (const item of NAV_MENU) {
      if (item.id === 'index') {
        // index.html 的情况单独处理，避免 'index' 误匹配其他 path
        if (path.endsWith('/index.html') || path.endsWith('/index')) {
          return 'index';
        }
        continue;
      }
      if (path.includes(item.id)) {
        return item.id;
      }
    }
    return '';
  }

  // 获取SVG图标
  function getIcon(name) {
    const icons = {
      'users': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
      'ticket': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"/></svg>',
      'home': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
      'search': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
      'crown': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 2H5v2h14v-2z"/></svg>',
      'bars': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
      'sign-out': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>',
      'shield': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>',
      'lock': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>'
    };
    return icons[name] || '';
  }

  // 注入导航栏
  function injectNavbar() {
    const currentPage = getCurrentPage();

    // 生成导航项HTML
    const navItems = NAV_MENU.map(function(item) {
      const isActive = item.id === currentPage;
      return '<a href="' + item.href + '" class="admin-nav-item' + (isActive ? ' active' : '') + '" title="' + item.description + '">'
        + '<span class="admin-nav-icon">' + getIcon(item.icon) + '</span>'
        + '<span class="admin-nav-label">' + item.name + '</span>'
        + '</a>';
    }).join('');

    const navbarHTML = '<div id="adminNavbar" class="admin-navbar">'
      + '<div class="admin-nav-header">'
        + '<div class="admin-nav-brand">'
          + '<span class="admin-nav-brand-icon">' + getIcon('shield') + '</span>'
          + '<span class="admin-nav-brand-text">后台管理</span>'
        + '</div>'
        + '<button class="admin-nav-toggle" id="adminNavToggle" title="展开/收起菜单">'
          + getIcon('bars')
        + '</button>'
      + '</div>'
      + '<nav class="admin-nav-menu" id="adminNavMenu">'
        + navItems
        + '<div class="admin-nav-divider"></div>'
        + '<button class="admin-nav-item admin-nav-logout" id="adminLogoutBtn" title="退出登录">'
          + '<span class="admin-nav-icon">' + getIcon('sign-out') + '</span>'
          + '<span class="admin-nav-label">退出登录</span>'
        + '</button>'
      + '</nav>'
    + '</div>';

    // 插入到 body 最前面
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 添加 body 标记类
    document.body.classList.add('has-admin-nav');

    // 绑定事件
    bindNavEvents();
  }

  // 注入登录遮罩
  function injectLoginOverlay() {
    var existingOverlay = document.getElementById('adminLoginOverlay');
    if (existingOverlay) return;

    var loginHTML = '<div id="adminLoginOverlay" class="admin-login-overlay">'
      + '<div class="admin-login-card">'
        + '<div class="login-logo">' + getIcon('shield') + '</div>'
        + '<h2>后台管理登录</h2>'
        + '<p class="login-subtitle">请输入管理员账号登录系统</p>'
        + '<div class="admin-login-error" id="adminLoginError"></div>'
        + '<div class="form-group">'
          + '<label for="adminLoginUserId">用户ID</label>'
          + '<input type="text" id="adminLoginUserId" placeholder="请输入用户ID" value="15160029349" autocomplete="username">'
        + '</div>'
        + '<div class="form-group">'
          + '<label for="adminLoginPassword">密码</label>'
          + '<input type="password" id="adminLoginPassword" placeholder="请输入密码" autocomplete="current-password">'
        + '</div>'
        + '<button class="login-btn" id="adminLoginBtn" onclick="window._adminDoLogin()">登 录</button>'
      + '</div>'
    + '</div>';

    document.body.insertAdjacentHTML('beforeend', loginHTML);

    // 绑定登录事件
    var loginBtn = document.getElementById('adminLoginBtn');
    var passwordInput = document.getElementById('adminLoginPassword');
    var userIdInput = document.getElementById('adminLoginUserId');

    if (passwordInput) {
      passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') window._adminDoLogin();
      });
    }
    if (userIdInput) {
      userIdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          if (passwordInput) passwordInput.focus();
        }
      });
    }
  }

  // 全局登录函数
  window._adminDoLogin = function() {
    var userIdEl = document.getElementById('adminLoginUserId');
    var passwordEl = document.getElementById('adminLoginPassword');
    var errorEl = document.getElementById('adminLoginError');
    var btnEl = document.getElementById('adminLoginBtn');

    var userId = userIdEl ? userIdEl.value.trim() : '';
    var password = passwordEl ? passwordEl.value.trim() : '';

    if (!userId || !password) {
      if (errorEl) {
        errorEl.textContent = '请输入用户ID和密码';
        errorEl.classList.add('show');
      }
      return;
    }

    if (btnEl) {
      btnEl.disabled = true;
      btnEl.textContent = '登录中...';
    }

    if (window.AdminAuth) {
      var result = window.AdminAuth.login(userId, password);
      if (result.success) {
        removeLoginOverlay();
        showManageContent();
        if (btnEl) {
          btnEl.disabled = false;
          btnEl.textContent = '登 录';
        }
      } else {
        if (errorEl) {
          errorEl.textContent = result.message || '登录失败';
          errorEl.classList.add('show');
        }
        if (btnEl) {
          btnEl.disabled = false;
          btnEl.textContent = '登 录';
        }
      }
    } else {
      if (errorEl) {
        errorEl.textContent = '认证模块加载失败';
        errorEl.classList.add('show');
      }
      if (btnEl) {
        btnEl.disabled = false;
        btnEl.textContent = '登 录';
      }
    }
  };

  // 移除登录遮罩
  function removeLoginOverlay() {
    var overlay = document.getElementById('adminLoginOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s';
      setTimeout(function() {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 300);
    }
  }

  // 显示管理内容
  function showManageContent() {
    // 显示 manage-content 区域
    var manageSections = document.querySelectorAll('.manage-content');
    for (var i = 0; i < manageSections.length; i++) {
      manageSections[i].classList.add('active');
    }
    // 显示登出按钮和日志按钮
    var logoutBtn = document.getElementById('logoutBtn');
    var logFloatBtn = document.getElementById('logFloatBtn');
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (logFloatBtn) logFloatBtn.style.display = 'flex';
  }

  // 绑定导航事件
  function bindNavEvents() {
    var navToggle = document.getElementById('adminNavToggle');
    var navMenu = document.getElementById('adminNavMenu');
    var logoutBtn = document.getElementById('adminLogoutBtn');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('open');
      });
    }

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(e) {
      if (navMenu && navMenu.classList.contains('open')) {
        if (!navMenu.contains(e.target) && e.target !== navToggle) {
          navMenu.classList.remove('open');
        }
      }
    });

    // 退出登录
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        if (window.AdminAuth) {
          window.AdminAuth.logout();
          window.location.reload();
        }
      });
    }
  }

  // 替换SVG图标（延迟执行确保DOM已渲染）
  function replaceIcons() {
    if (typeof replaceFAIcons === 'function') {
      setTimeout(replaceFAIcons, 150);
    }
  }

  // 初始化
  function init() {
    function doInit() {
      // 注入导航栏
      injectNavbar();

      // 检查登录状态
      if (window.AdminAuth && window.AdminAuth.isLoggedIn()) {
        // 已登录，显示管理内容
        showManageContent();
      } else {
        // 未登录，显示登录遮罩
        injectLoginOverlay();
      }

      // 替换图标
      replaceIcons();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doInit);
    } else {
      doInit();
    }
  }

  init();
})();