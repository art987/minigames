# 腾讯云部署完整指南

> 朋友圈海报制作中心 - VIP会员权益系统部署

---

## 📋 部署前准备（重要！）

### 1️⃣ 安全提醒 ⚠️

**立即更换腾讯云密钥！**
- 您之前分享的密钥可能已被泄露
- 立即在腾讯云控制台删除旧密钥
- 生成新的密钥对

**操作步骤**：
1. 登录 [腾讯云控制台](https://console.cloud.tencent.com)
2. 进入 "访问管理" → "用户" → 生成/删除API密钥
3. 复制新的 SecretId 和 SecretKey

### 2️⃣ 环境要求

- Node.js 18.15+ ✅
- npm 或 yarn ✅
- 腾讯云开发环境 ✅
- 腾讯云CLI工具 (可选)

### 3️⃣ 项目检查

```bash
# 进入项目目录
cd c:\Users\ThinkPad\Documents\GitHub\minigames\postdiy

# 检查环境ID
cat cloudbaserc.json

# 检查Node.js版本
node --version  # 应该是 v18 或更高
npm --version
```

---

## 🔧 部署步骤

### 第一步：配置环境变量

创建或编辑 `.env` 文件：

```bash
# .env 文件内容
SECRETID=your-new-secret-id
SECRETKEY=your-new-secret-key
ENV=postdiy-0g2mftaf6a0fc450
VUE_APP_API_BASE_URL=https://your-cloud-function-url
```

### 第二步：安装CLI工具

```bash
# 全局安装腾讯云CLI
npm install -g @cloudbase/cli

# 或者如果已安装，更新到最新版本
npm update -g @cloudbase/cli

# 验证安装
tcb --version
```

### 第三步：配置腾讯云凭证

```bash
# 使用新的密钥配置
tcb login --secret-id YOUR_SECRET_ID --secret-key YOUR_SECRET_KEY

# 或设置环境变量（推荐）
# Windows PowerShell:
$env:SECRETID = "your-secret-id"
$env:SECRETKEY = "your-secret-key"

# Windows CMD:
set SECRETID=your-secret-id
set SECRETKEY=your-secret-key

# Linux/Mac:
export SECRETID=your-secret-id
export SECRETKEY=your-secret-key
```

### 第四步：部署VIP系统云函数

```bash
# 确保在项目根目录

# 部署单个云函数
tcb functions:deploy admin-generate-vouchers -e postdiy-0g2mftaf6a0fc450

# 或部署所有VIP相关云函数
tcb functions:deploy admin-manage-vouchers -e postdiy-0g2mftaf6a0fc450
tcb functions:deploy check-vip-status -e postdiy-0g2mftaf6a0fc450

# 更新已有的激活码验证函数
tcb functions:deploy user-verify-voucher -e postdiy-0g2mftaf6a0fc450
```

### 第五步：验证部署

```bash
# 查看所有已部署的云函数
tcb functions:list -e postdiy-0g2mftaf6a0fc450

# 查看特定函数信息
tcb functions:info admin-generate-vouchers -e postdiy-0g2mftaf6a0fc450

# 查看函数日志
tcb functions:log admin-generate-vouchers -e postdiy-0g2mftaf6a0fc450 --limit 100
```

---

## 📊 部署检查清单

### 云函数部署验证

- [ ] admin-generate-vouchers 已部署
- [ ] admin-manage-vouchers 已部署
- [ ] user-verify-voucher 已更新
- [ ] check-vip-status 已部署
- [ ] 所有函数状态为"已部署"

### 数据库配置

- [ ] users 表已创建
- [ ] vip_vouchers 表已创建
- [ ] 所有索引已创建
- [ ] 初始数据已导入

运行初始化脚本：

```bash
# 部署并运行初始化函数
tcb functions:deploy init-database -e postdiy-0g2mftaf6a0fc450

# 在腾讯云控制台手动执行初始化SQL（如需要）
# 执行 database-schema.md 中的初始化脚本
```

### 环境变量配置

在腾讯云控制台配置每个云函数的环境变量：

**对于所有VIP相关云函数**：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| SECRETID | your-secret-id | 腾讯云密钥ID |
| SECRETKEY | your-secret-key | 腾讯云密钥 |
| ENV | postdiy-0g2mftaf6a0fc450 | 环境ID |

**操作步骤**：
1. 登录 [腾讯云控制台](https://console.cloud.tencent.com)
2. 进入云开发 → 云函数
3. 选择 admin-generate-vouchers
4. 点击"编辑" → 环境变量
5. 添加环境变量
6. 点击"保存"并重新部署

---

## 🚀 快速部署脚本

### Windows PowerShell 脚本

创建 `deploy.ps1`：

```powershell
# 设置环境变量
$env:SECRETID = "YOUR_SECRET_ID"
$env:SECRETKEY = "YOUR_SECRET_KEY"

Write-Host "开始部署VIP系统..." -ForegroundColor Green

# 检查CLI是否安装
if (!(Get-Command tcb -ErrorAction SilentlyContinue)) {
    Write-Host "安装腾讯云CLI..." -ForegroundColor Yellow
    npm install -g @cloudbase/cli
}

# 部署云函数
Write-Host "部署admin-generate-vouchers..." -ForegroundColor Yellow
tcb functions:deploy admin-generate-vouchers -e postdiy-0g2mftaf6a0fc450

Write-Host "部署admin-manage-vouchers..." -ForegroundColor Yellow
tcb functions:deploy admin-manage-vouchers -e postdiy-0g2mftaf6a0fc450

Write-Host "部署check-vip-status..." -ForegroundColor Yellow
tcb functions:deploy check-vip-status -e postdiy-0g2mftaf6a0fc450

Write-Host "更新user-verify-voucher..." -ForegroundColor Yellow
tcb functions:deploy user-verify-voucher -e postdiy-0g2mftaf6a0fc450

# 验证部署
Write-Host "验证部署..." -ForegroundColor Yellow
tcb functions:list -e postdiy-0g2mftaf6a0fc450

Write-Host "部署完成！" -ForegroundColor Green
```

**运行脚本**：
```powershell
# PowerShell中执行
.\deploy.ps1
```

### Linux/Mac Bash 脚本

创建 `deploy.sh`：

```bash
#!/bin/bash

# 设置环境变量
export SECRETID="YOUR_SECRET_ID"
export SECRETKEY="YOUR_SECRET_KEY"

echo "开始部署VIP系统..."

# 检查CLI是否安装
if ! command -v tcb &> /dev/null; then
    echo "安装腾讯云CLI..."
    npm install -g @cloudbase/cli
fi

# 部署云函数
echo "部署admin-generate-vouchers..."
tcb functions:deploy admin-generate-vouchers -e postdiy-0g2mftaf6a0fc450

echo "部署admin-manage-vouchers..."
tcb functions:deploy admin-manage-vouchers -e postdiy-0g2mftaf6a0fc450

echo "部署check-vip-status..."
tcb functions:deploy check-vip-status -e postdiy-0g2mftaf6a0fc450

echo "更新user-verify-voucher..."
tcb functions:deploy user-verify-voucher -e postdiy-0g2mftaf6a0fc450

# 验证部署
echo "验证部署..."
tcb functions:list -e postdiy-0g2mftaf6a0fc450

echo "部署完成！"
```

**运行脚本**：
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔍 故障排查

### 问题1: 云函数部署失败

**错误信息**: `Failed to deploy function`

**解决方案**:
```bash
# 1. 检查凭证
tcb login

# 2. 检查环境ID
tcb env:list

# 3. 检查cloud-functions目录中是否有package.json
ls cloudfunctions/admin-generate-vouchers/package.json

# 4. 重新安装依赖
cd cloudfunctions/admin-generate-vouchers
npm install
cd ../..

# 5. 再次尝试部署
tcb functions:deploy admin-generate-vouchers -e postdiy-0g2mftaf6a0fc450
```

### 问题2: 环境变量未生效

**错误信息**: `Cannot read property SECRETID of undefined`

**解决方案**:
```bash
# 1. 确保环境变量已设置
echo $SECRETID  # Linux/Mac
echo %SECRETID%  # Windows

# 2. 在云函数中检查
console.log(process.env.SECRETID)

# 3. 在腾讯云控制台手动添加环境变量
# Functions → 选择函数 → 编辑 → 环境变量 → 添加
```

### 问题3: 数据库查询超时

**错误信息**: `Database query timeout`

**解决方案**:
```bash
# 1. 检查数据库连接
# 2. 增加云函数超时时间
# 3. 优化查询语句
# 4. 检查数据库状态

# 通过腾讯云控制台:
# 云开发 → 云函数 → 选择函数 → 编辑 → 超时秒数 (改为 60或更高)
```

### 问题4: 激活码验证失败

**错误信息**: `Voucher verification failed`

**解决方案**:
```bash
# 1. 检查vip_vouchers表是否存在
tcb database:query vip_vouchers

# 2. 检查激活码数据
tcb database:query vip_vouchers --limit 5

# 3. 检查用户数据
tcb database:query users --limit 5

# 4. 查看函数日志
tcb functions:log user-verify-voucher -e postdiy-0g2mftaf6a0fc450 --limit 100
```

---

## 📈 性能优化

### 云函数优化

```javascript
// 使用连接池减少延迟
const db = cloud.database({
    env: process.env.ENV,
    connectionPool: true  // 启用连接池
});

// 使用索引加速查询
// 已在 database-schema.md 中定义
```

### 数据库优化

```bash
# 创建复合索引加快查询
tcb database:createIndex vip_vouchers --key "{ code: 1, used: 1 }"

# 创建TTL索引自动删除过期激活码
tcb database:createIndex vip_vouchers --key "{ validUntil: 1 }" --expireAfterSeconds 0
```

---

## ✅ 部署完成检查

### 功能验证

进行以下测试确保部署成功：

#### 1. 测试激活码生成

```bash
# 在腾讯云控制台调用云函数
# 函数名: admin-generate-vouchers
# 参数:
{
  "count": 5,
  "duration": 1,
  "validUntil": "2027-03-22"
}

# 预期响应:
{
  "code": 200,
  "message": "激活码生成成功",
  "data": {
    "count": 5,
    "insertedIds": [...]
  }
}
```

#### 2. 测试激活码验证

```bash
# 函数名: user-verify-voucher
# 参数:
{
  "code": "VIPxxxxxxxx",
  "userId": "user123"
}

# 预期响应:
{
  "code": 200,
  "message": "激活成功",
  "data": {
    "expireTime": "2027-03-22T...",
    "duration": 1,
    "durationName": "1个月"
  }
}
```

#### 3. 测试管理功能

```bash
# 函数名: admin-manage-vouchers
# 参数:
{
  "action": "list",
  "status": "unused",
  "page": 1,
  "pageSize": 20
}

# 预期响应: 激活码列表
```

---

## 🌐 配置API端点

### 更新前端API地址

编辑 `vip-system.js`：

```javascript
// 从这个:
const API_BASE_URL = 'https://api.peacelove.top';

// 改为你的腾讯云API地址:
const API_BASE_URL = 'https://postdiy-0g2mftaf6a0fc450.ap-shanghai.service.tcloudbase.com';

// 或者使用环境变量:
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'default-url';
```

### 获取正确的API地址

```bash
# 在腾讯云控制台查看
# 云开发 → 环境 → 设置 → HTTP API

# 或使用CLI查询
tcb env:list -e postdiy-0g2mftaf6a0fc450
```

---

## 📚 有用的腾讯云CLI命令

```bash
# 登录/登出
tcb login
tcb logout

# 环境管理
tcb env:list                          # 列出所有环境
tcb env:info -e ENV_ID               # 查看环境详情

# 云函数管理
tcb functions:list -e ENV_ID         # 列出所有函数
tcb functions:info FUNC_NAME -e ENV_ID        # 查看函数信息
tcb functions:deploy FUNC_NAME -e ENV_ID      # 部署函数
tcb functions:delete FUNC_NAME -e ENV_ID      # 删除函数
tcb functions:log FUNC_NAME -e ENV_ID --limit 100  # 查看日志

# 数据库管理
tcb database:list -e ENV_ID                   # 列出所有集合
tcb database:query COLLECTION -e ENV_ID --limit 10  # 查询数据

# 文件管理
tcb storage:upload LOCAL_PATH REMOTE_PATH -e ENV_ID
tcb storage:download REMOTE_PATH LOCAL_PATH -e ENV_ID
```

---

## 🎉 部署完成！

恭喜！如果以上步骤都成功完成，您的VIP会员权益系统已经部署到腾讯云了。

### 后续步骤

1. ✅ 通过会员中心页面测试
2. ✅ 生成测试激活码
3. ✅ 验证激活流程
4. ✅ 检查权限限制
5. ✅ 监控云函数日志
6. ✅ 准备上线

---

## 📞 常见问题

### Q: 部署需要多长时间？
A: 通常 2-5 分钟，取决于网络状态。

### Q: 如何回滚部署？
A: 使用 `tcb functions:delete` 删除函数，然后重新部署之前的版本。

### Q: 云函数有免费额度吗？
A: 有，但建议检查腾讯云官方定价。基本使用量通常在免费额度内。

### Q: 如何监控云函数性能？
A: 在腾讯云控制台查看云函数指标，或使用CLI获取日志。

---

**部署文档完成时间**: 2026年3月22日  
**文档版本**: 1.0  
**准备就绪**: ✅