# VIP会员权益系统 - 快速开始指南

## 📋 目录结构

```
postdiy/
├── vip-privileges.js           # 核心权益管理模块
├── vip-privileges-config.js    # 权益配置
├── script-vip.js               # 功能限制检查
├── vip-statistics.js           # 数据统计
├── vip-center.html             # 会员中心页面
├── voucher-admin.html          # 管理后台
│
├── cloudfunctions/
│   ├── admin-generate-vouchers/    # 生成激活码
│   ├── admin-manage-vouchers/      # 管理激活码
│   ├── user-verify-voucher/        # 验证激活码
│   └── check-vip-status/           # 检查VIP状态
│
└── VIP_PRIVILEGES_GUIDE.md     # 详细文档
```

## 🚀 快速集成步骤

### 第一步：在主页面添加脚本

在 `index.html` 的 `<head>` 中添加：

```html
<!-- VIP权益系统 -->
<script src="vip-privileges.js"></script>
<script src="script-vip.js"></script>
<script src="vip-statistics.js"></script>
```

### 第二步：添加会员中心菜单

在用户菜单中添加会员权益入口：

```html
<button type="button" class="vip-menu-item" data-action="vipPrivileges">
    <i class="fa fa-crown"></i>
    <span>会员权益</span>
</button>
```

### 第三步：在业务代码中检查权限

```javascript
// 用户创建海报时检查权限
async function createPoster() {
    const canCreate = await VIPFeatureManager.checkFeatureAvailability('createPost');
    if (!canCreate) {
        console.log('创建海报权限受限');
        return;
    }
    
    // 执行创建逻辑
    // ...
    
    // 记录使用
    VIPFeatureManager.recordFeatureUsage('createPost');
}

// 检查特定功能权限
if (VIPFeatureManager.checkFeaturePermission('aiGeneration')) {
    // 显示AI功能
}
```

## 💡 常见使用场景

### 场景1：限制免费用户的创建次数

```javascript
// 在创建海报前检查
if (!VIPPrivileges.checkDailyLimit()) {
    // 显示升级提示
    VIPFeatureManager.showVIPUpgradePrompt('createPost');
    return;
}

// 允许创建
createNewPoster();

// 创建完成后记录使用次数
VIPPrivileges.recordUsage();
```

### 场景2：隐藏高级功能（仅VIP可用）

```javascript
// 在渲染模板时检查权限
if (VIPPrivileges.checkFeaturePermission('customElements')) {
    // 显示自定义元素按钮
    showCustomElementsButton();
} else {
    // 显示"升级体验高级功能"提示
    showUpgradePrompt('customElements');
}
```

### 场景3：限制文件上传大小

```javascript
// 在上传前检查
const maxSize = VIPPrivileges.getFeatureLimit('maxImageSize') * 1024 * 1024; // 转为字节

if (file.size > maxSize) {
    showMessage(`文件过大，最大支持${maxSize / 1024 / 1024}MB`);
    return;
}

// 允许上传
uploadFile(file);
```

### 场景4：显示会员权益

```javascript
// 创建权益展示UI
const ui = VIPPrivileges.createPrivilegesUI();
document.getElementById('privilegesContainer').appendChild(ui);

// 或显示完整会员中心
window.location.href = 'vip-center.html';
```

## 🔑 API速查表

### VIPPrivileges 模块

```javascript
// 获取VIP状态
const status = VIPPrivileges.getVIPStatus();
// 返回: { isVip, expireTime, level }

// 检查功能权限
const hasPermission = VIPPrivileges.checkFeaturePermission('aiGeneration');

// 获取功能限制值
const limit = VIPPrivileges.getFeatureLimit('maxImageSize');

// 检查每日使用限制
const canUse = VIPPrivileges.checkDailyLimit();

// 记录使用次数
VIPPrivileges.recordUsage();

// 清理过期使用记录
VIPPrivileges.cleanupUsageRecords();

// 创建权益UI
const ui = VIPPrivileges.createPrivilegesUI();
```

### VIPFeatureManager 模块

```javascript
// 检查功能可用性（包括权限和使用限制）
await VIPFeatureManager.checkFeatureAvailability('createPost');

// 记录功能使用
VIPFeatureManager.recordFeatureUsage('createPost');

// 显示升级提示
VIPFeatureManager.showVIPUpgradePrompt('aiGeneration');

// 显示激活码输入界面
VIPFeatureManager.showVoucherInput();
```

### VIPStatistics 模块

```javascript
// 获取用户统计
const stats = await VIPStatistics.getUserStats();

// 获取全局统计（仅管理员）
const globalStats = await VIPStatistics.getGlobalStats();

// 记录用户操作
await VIPStatistics.logUserAction('create_poster', { templateId: 123 });

// 创建统计仪表板
const dashboard = VIPStatistics.createStatsDashboard();
```

## 🎯 权益配置说明

### 免费用户权益
- ✅ 每日3次创建海报
- ✅ 30%的模板可用
- ✅ 最大2MB图片上传
- ❌ 导出有水印
- ❌ 不支持自定义元素
- ❌ 无AI功能

### VIP会员权益
- ✅ 无限次创建海报
- ✅ 100%模板可用
- ✅ 最大10MB图片上传
- ✅ 无水印导出
- ✅ 支持自定义元素
- ✅ AI智能生成功能
- ✅ 批量导出
- ✅ 高清导出

## 📊 管理后台使用

### 激活码生成

1. 访问 `voucher-admin.html`
2. 点击"批量生成激活码"按钮
3. 输入：
   - 生成数量（1-100）
   - 会员时长（1个月/3个月/12个月）
   - 有效期
4. 点击"确认生成"

### 激活码查看与管理

1. 在表格中查看所有激活码
2. 使用筛选器：
   - 状态筛选：未使用/已使用/已过期
   - 时长筛选：1月/3月/12月
   - 搜索：输入激活码进行搜索
3. 操作：
   - 复制激活码到剪贴板
   - 删除未使用的激活码
3. 导出所有数据

## 🔐 安全提示

1. **不要在前端暴露密钥**
   - 云函数API调用应该通过后端代理

2. **验证激活码时使用事务**
   - 确保激活码和用户状态一致性

3. **定期备份激活码数据**
   - 防止数据丢失

4. **监控异常激活行为**
   - 记录所有激活操作
   - 设置告警规则

## 🐛 常见问题

### Q1: 如何重置用户的每日限制？
```javascript
// 手动清理使用记录
VIPPrivileges.cleanupUsageRecords();
```

### Q2: 如何给用户延长会员期限？
```javascript
// 在云函数中更新用户信息
db.collection('users').doc(userId).update({
    vipExpireTime: newExpireTime,
    updatedAt: new Date()
});
```

### Q3: 如何禁用某个功能的权限检查？
```javascript
// 暂时允许免费用户使用
// 修改 vip-privileges.js 中的权益配置
// 设置 free.features.aiGeneration = true
```

### Q4: 激活码过期后还能使用吗？
```javascript
// 不能。云函数会检查有效期
// 过期的激活码无法使用
```

### Q5: 一个激活码可以多个用户使用吗？
```javascript
// 不能。激活码使用后会被标记为 used
// 同时记录使用者ID
```

## 📞 支持

如有问题或建议，请查看 [VIP_PRIVILEGES_GUIDE.md](./VIP_PRIVILEGES_GUIDE.md) 获取详细信息。