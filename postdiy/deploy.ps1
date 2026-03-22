# 腾讯云VIP系统部署脚本 - PowerShell版本
# 使用方法: 在PowerShell中运行此脚本

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  朋友圈海报制作中心 - VIP系统腾讯云部署" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# 获取用户输入
$SECRETID = Read-Host "请输入 SecretID"
$SECRETKEY = Read-Host "请输入 SecretKey"
$ENV = Read-Host "请输入环境ID (默认: postdiy-0g2mftaf6a0fc450)"

if ([string]::IsNullOrEmpty($ENV)) {
    $ENV = "postdiy-0g2mftaf6a0fc450"
}

# 设置环境变量
$env:SECRETID = $SECRETID
$env:SECRETKEY = $SECRETKEY

Write-Host ""
Write-Host "环境变量已设置" -ForegroundColor Green
Write-Host "环境ID: $ENV" -ForegroundColor Cyan
Write-Host ""

# 检查CLI是否安装
Write-Host "检查腾讯云CLI工具..." -ForegroundColor Yellow
$cliExists = Get-Command tcb -ErrorAction SilentlyContinue

if ($null -eq $cliExists) {
    Write-Host "CLI工具未安装，正在安装..." -ForegroundColor Yellow
    npm install -g @cloudbase/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "安装失败!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "CLI工具已准备好" -ForegroundColor Green
Write-Host ""

# 部署云函数
Write-Host "================================================" -ForegroundColor Green
Write-Host "开始部署云函数..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# 1. 部署激活码生成函数
Write-Host "[1/4] 部署 admin-generate-vouchers..." -ForegroundColor Yellow
Push-Location cloudfunctions/admin-generate-vouchers
npm install
Pop-Location
tcb functions:deploy admin-generate-vouchers -e $ENV

if ($LASTEXITCODE -ne 0) {
    Write-Host "部署失败!" -ForegroundColor Red
    exit 1
}

Write-Host "[√] admin-generate-vouchers 部署成功" -ForegroundColor Green
Write-Host ""

# 2. 部署激活码管理函数
Write-Host "[2/4] 部署 admin-manage-vouchers..." -ForegroundColor Yellow
Push-Location cloudfunctions/admin-manage-vouchers
npm install
Pop-Location
tcb functions:deploy admin-manage-vouchers -e $ENV

if ($LASTEXITCODE -ne 0) {
    Write-Host "部署失败!" -ForegroundColor Red
    exit 1
}

Write-Host "[√] admin-manage-vouchers 部署成功" -ForegroundColor Green
Write-Host ""

# 3. 部署VIP状态检查函数
Write-Host "[3/4] 部署 check-vip-status..." -ForegroundColor Yellow
Push-Location cloudfunctions/check-vip-status
npm install
Pop-Location
tcb functions:deploy check-vip-status -e $ENV

if ($LASTEXITCODE -ne 0) {
    Write-Host "部署失败!" -ForegroundColor Red
    exit 1
}

Write-Host "[√] check-vip-status 部署成功" -ForegroundColor Green
Write-Host ""

# 4. 更新激活码验证函数
Write-Host "[4/4] 更新 user-verify-voucher..." -ForegroundColor Yellow
Push-Location cloudfunctions/user-verify-voucher
npm install
Pop-Location
tcb functions:deploy user-verify-voucher -e $ENV

if ($LASTEXITCODE -ne 0) {
    Write-Host "部署失败!" -ForegroundColor Red
    exit 1
}

Write-Host "[√] user-verify-voucher 更新成功" -ForegroundColor Green
Write-Host ""

# 验证部署
Write-Host "================================================" -ForegroundColor Green
Write-Host "验证部署..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

tcb functions:list -e $ENV

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "✓ 所有云函数已成功部署!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

Write-Host "下一步操作:" -ForegroundColor Cyan
Write-Host "1. 在腾讯云控制台配置环境变量"
Write-Host "   (云函数 -> 选择函数 -> 编辑 -> 环境变量)"
Write-Host "   SECRETID: $SECRETID"
Write-Host "   SECRETKEY: $SECRETKEY"
Write-Host "   ENV: $ENV"
Write-Host ""
Write-Host "2. 测试激活码生成功能"
Write-Host "3. 查看部署日志: tcb functions:log admin-generate-vouchers -e $ENV"
Write-Host ""

Read-Host "按Enter键退出"
