// menu-functions.js

// 全局函数定义
window.toggleMenu = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.getElementById('menu-icon');
    const menuText = document.getElementById('menu-text');
    
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    menuIcon.textContent = sidebar.classList.contains('open') ? '✖' : '☰';
    menuText.textContent = sidebar.classList.contains('open') ? '关闭' : '菜单';
};

window.toggleSubmenu = function(submenuId) {
    const submenu = document.getElementById(submenuId);
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
};

window.initMenu = function() {
    if (typeof menuData === 'undefined') {
        console.error('menuData is not defined');
        return;
    }
    
    // 设置 logo
    document.getElementById('menu-logo').textContent = menuData.logo;
    // 设置 slogon
    document.getElementById('slogon').textContent = menuData.slogon;
	
    // 构建菜单项
    const sidebar = document.getElementById('sidebar');
    menuData.menuItems.forEach((item, index) => {
        if (item.singleItem) {
            // ✅ 单个菜单项（添加 app-icon）
            const div = document.createElement('div');
            div.className = 'menu-item';
            
            // 创建 app-icon
            const appIcon = document.createElement('div');
            appIcon.className = 'app-icon';
            if (item.icon) {
                appIcon.classList.add(item.icon);
                appIcon.textContent = '';
            } else if (item.emoji) {
                appIcon.textContent = item.emoji;
            }
            
            // 创建链接
            const link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.text;
            
            // 组装
            div.appendChild(appIcon);
            div.appendChild(link);
            sidebar.appendChild(div);
        } else {
            // ✅ 带子菜单的项（主菜单 + 子菜单）
            const submenuId = `submenu${index + 1}`;
            
            // 主菜单项（⚠️ 不添加 app-icon）
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.setAttribute('onclick', `toggleSubmenu('${submenuId}')`);
            
            // ❌ 特别注意：这里不添加 app-icon
            const titleSpan = document.createElement('span');
            titleSpan.textContent = item.title;
            
            const expandIcon = document.createElement('span');
            expandIcon.className = 'expand-icon';
            expandIcon.textContent = '+';
            
            // 组装主菜单（只有标题和展开图标）
            menuItem.appendChild(titleSpan);
            menuItem.appendChild(expandIcon);
            sidebar.appendChild(menuItem);
            
            // 子菜单
            const submenu = document.createElement('div');
            submenu.className = 'submenu';
            submenu.id = submenuId;
            submenu.style.display = 'block'; // 默认隐藏
            
            item.items.forEach(subItem => {
                // ✅ 子菜单项（添加 app-icon）
                const subMenuItem = document.createElement('div');
                subMenuItem.className = 'menu-item';
                
                // 子菜单的 app-icon
                const subAppIcon = document.createElement('div');
                subAppIcon.className = 'app-icon';
                if (subItem.icon) {
                    subAppIcon.classList.add(subItem.icon);
                    subAppIcon.textContent = '';
                } else if (subItem.emoji) {
                    subAppIcon.textContent = subItem.emoji;
                }
                
                // 子菜单链接
                const subLink = document.createElement('a');
                subLink.href = subItem.href;
                subLink.textContent = subItem.text;
                
                // 组装子菜单
                subMenuItem.appendChild(subAppIcon);
                subMenuItem.appendChild(subLink);
                submenu.appendChild(subMenuItem);
            });
            
            sidebar.appendChild(submenu);
        }
    });
};

// 辅助函数：动态加载 JS
window.loadScript = function(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

window.setupNavbarScrollBehavior = function() {
    const navbar = document.getElementById('navbar-container');
    const navbarContent = navbar.querySelector('.navbar'); // 获取实际的导航栏内容
    let lastScrollTop = 0;
    const navbarHeight = navbarContent.offsetHeight;
    let isHidden = false;
    
    // 初始化样式
    navbarContent.style.position = 'fixed';
    navbarContent.style.top = '0';
    navbarContent.style.transition = 'top 0.3s ease-in-out';
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 在顶部时始终显示
        if (scrollTop <= 0) {
            navbarContent.style.position = 'fixed';
            navbarContent.style.top = '0';
            isHidden = false;
            return;
        }
        
        // 滚动方向判断
        if (scrollTop > lastScrollTop) {
            // 向下滚动 - 隐藏
            if (!isHidden && scrollTop > navbarHeight) {
                navbarContent.style.position = 'absolute'; // 改为absolute避免占用空间
                navbarContent.style.top = `-${navbarHeight}px`;
                isHidden = true;
            }
        } else {
            // 向上滚动 - 显示
            if (isHidden) {
                navbarContent.style.position = 'fixed';
                navbarContent.style.top = '0';
                isHidden = false;
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
};


// 动态加载菜单
window.loadNavbar = async function() {
    try {
        await loadScript('https://peacelove.top/menudata.js');
        const response = await fetch('https://peacelove.top/menu.html');
        const navbarHtml = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(navbarHtml, 'text/html');
        const scripts = doc.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        const navbarContainer = document.getElementById('navbar-container');
        navbarContainer.innerHTML = doc.body.innerHTML;

        // 确保DOM完全加载
        setTimeout(() => {
            if (typeof menuData !== 'undefined') {
                initMenu();
                setupNavbarScrollBehavior();
                
                // 添加一个resize监听器来处理可能的布局变化
                window.addEventListener('resize', setupNavbarScrollBehavior);
            }
        }, 100);
    } catch (error) {
        console.error('加载菜单时出错：', error);
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadNavbar);