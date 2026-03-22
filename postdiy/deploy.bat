@echo off
REM 腾讯云VIP系统部署脚本 - Windows版本
REM 使用方法: 在命令行中运行此脚本

echo.
echo ================================================
echo   朋友圈海报制作中心 - VIP系统腾讯云部署
echo ================================================
echo.

REM 获取用户输入
setlocal enabledelayedexpansion

echo 请输入您的腾讯云密钥信息:
echo.

set /p SECRETID="请输入 SecretID: "
set /p SECRETKEY="请输入 SecretKey: "
set /p ENV="请输入环境ID (默认: postdiy-0g2mftaf6a0fc450): "

if "!ENV!"=="" (
    set ENV=postdiy-0g2mftaf6a0fc450
)

REM 设置环境变量
set SECRETID=!SECRETID!
set SECRETKEY=!SECRETKEY!

echo.
echo 环境变量已设置
echo 环境ID: !ENV!
echo.

REM 检查CLI是否安装
echo 检查腾讯云CLI工具...
tcb --version >nul 2>&1
if errorlevel 1 (
    echo CLI工具未安装，正在安装...
    call npm install -g @cloudbase/cli
    if errorlevel 1 (
        echo 安装失败!
        pause
        exit /b 1
    )
)

echo CLI工具已准备好
echo.

REM 部署云函数
echo ================================================
echo 开始部署云函数...
echo ================================================
echo.

REM 1. 部署激活码生成函数
echo [1/4] 部署 admin-generate-vouchers...
cd cloudfunctions\admin-generate-vouchers
call npm install
cd ..\..\
call tcb functions:deploy admin-generate-vouchers -e !ENV!
if errorlevel 1 (
    echo 部署失败!
    pause
    exit /b 1
)
echo [√] admin-generate-vouchers 部署成功
echo.

REM 2. 部署激活码管理函数
echo [2/4] 部署 admin-manage-vouchers...
cd cloudfunctions\admin-manage-vouchers
call npm install
cd ..\..\
call tcb functions:deploy admin-manage-vouchers -e !ENV!
if errorlevel 1 (
    echo 部署失败!
    pause
    exit /b 1
)
echo [√] admin-manage-vouchers 部署成功
echo.

REM 3. 部署VIP状态检查函数
echo [3/4] 部署 check-vip-status...
cd cloudfunctions\check-vip-status
call npm install
cd ..\..\
call tcb functions:deploy check-vip-status -e !ENV!
if errorlevel 1 (
    echo 部署失败!
    pause
    exit /b 1
)
echo [√] check-vip-status 部署成功
echo.

REM 4. 更新激活码验证函数
echo [4/4] 更新 user-verify-voucher...
cd cloudfunctions\user-verify-voucher
call npm install
cd ..\..\
call tcb functions:deploy user-verify-voucher -e !ENV!
if errorlevel 1 (
    echo 部署失败!
    pause
    exit /b 1
)
echo [√] user-verify-voucher 更新成功
echo.

REM 验证部署
echo ================================================
echo 验证部署...
echo ================================================
echo.

call tcb functions:list -e !ENV!

echo.
echo ================================================
echo ✓ 所有云函数已成功部署!
echo ================================================
echo.
echo 下一步操作:
echo 1. 在腾讯云控制台配置环境变量
echo    (云函数 -> 选择函数 -> 编辑 -> 环境变量)
echo    SECRETID: !SECRETID!
echo    SECRETKEY: !SECRETKEY!
echo    ENV: !ENV!
echo.
echo 2. 测试激活码生成功能
echo 3. 查看部署日志: tcb functions:log admin-generate-vouchers -e !ENV!
echo.

pause
endlocal
