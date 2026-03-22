// VIP菜单事件处理
document.addEventListener('DOMContentLoaded', () => {
    // 处理所有VIP菜单项点击事件
    const menuItems = document.querySelectorAll('[data-action="vipPrivileges"]');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 检查用户是否已登录
            const userId = localStorage.getItem('postdiy_user_id');
            if (!userId) {
                alert('请先登录');
                return;
            }
            
            // 显示会员权益
            if (typeof VIPSystem !== 'undefined' && VIPSystem.showPrivileges) {
                VIPSystem.showPrivileges();
            } else {
                console.error('VIPSystem.showPrivileges 不可用');
            }
        });
    });
    
    // 处理升级码管理按钮点击事件
    const voucherAdminBtn = document.querySelector('[data-action="voucherAdmin"]');
    if (voucherAdminBtn) {
        voucherAdminBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('voucher-admin.html', '_blank');
        });
    }
    
    // 处理VIP升级按钮点击事件
    const vipUpgradeBtn = document.querySelector('[data-action="vipUpgrade"]');
    if (vipUpgradeBtn) {
        vipUpgradeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('vip-center.html', '_blank');
        });
    }
});