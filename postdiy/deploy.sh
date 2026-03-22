#!/bin/bash

# 腾讯云VIP系统部署脚本 - Linux/Mac版本
# 使用方法: bash deploy.sh

echo ""
echo "================================================"
echo "  朋友圈海报制作中心 - VIP系统腾讯云部署"
echo "================================================"
echo ""

# 获取用户输入
read -p "请输入 SecretID: " SECRETID
read -p "请输入 SecretKey: " SECRETKEY
read -p "请输入环境ID (默认: postdiy-0g2mftaf6a0fc450): " ENV

if [ -z "$ENV" ]; then
    ENV="postdiy-0g2mftaf6a0fc450"
fi

# 设置环境变量
export SECRETID=$SECRETID
export SECRETKEY=$SECRETKEY

echo ""
echo "环境变量已设置"
echo "环境ID: $ENV"
echo ""

# 检查CLI是否安装
echo "检查腾讯云CLI工具..."
if ! command -v tcb &> /dev/null; then
    echo "CLI工具未安装，正在安装..."
    npm install -g @cloudbase/cli
    if [ $? -ne 0 ]; then
        echo "安装失败!"
        exit 1
    fi
fi

echo "CLI工具已准备好"
echo ""

# 部署云函数
echo "================================================"
echo "开始部署云函数..."
echo "================================================"
echo ""

# 1. 部署激活码生成函数
echo "[1/4] 部署 admin-generate-vouchers..."
cd cloudfunctions/admin-generate-vouchers
npm install
cd ../../
tcb functions:deploy admin-generate-vouchers -e $ENV

if [ $? -ne 0 ]; then
    echo "部署失败!"
    exit 1
fi

echo "[√] admin-generate-vouchers 部署成功"
echo ""

# 2. 部署激活码管理函数
echo "[2/4] 部署 admin-manage-vouchers..."
cd cloudfunctions/admin-manage-vouchers
npm install
cd ../../
tcb functions:deploy admin-manage-vouchers -e $ENV

if [ $? -ne 0 ]; then
    echo "部署失败!"
    exit 1
fi

echo "[√] admin-manage-vouchers 部署成功"
echo ""

# 3. 部署VIP状态检查函数
echo "[3/4] 部署 check-vip-status..."
cd cloudfunctions/check-vip-status
npm install
cd ../../
tcb functions:deploy check-vip-status -e $ENV

if [ $? -ne 0 ]; then
    echo "部署失败!"
    exit 1
fi

echo "[√] check-vip-status 部署成功"
echo ""

# 4. 更新激活码验证函数
echo "[4/4] 更新 user-verify-voucher..."
cd cloudfunctions/user-verify-voucher
npm install
cd ../../
tcb functions:deploy user-verify-voucher -e $ENV

if [ $? -ne 0 ]; then
    echo "部署失败!"
    exit 1
fi

echo "[√] user-verify-voucher 更新成功"
echo ""

# 验证部署
echo "================================================"
echo "验证部署..."
echo "================================================"
echo ""

tcb functions:list -e $ENV

echo ""
echo "================================================"
echo "✓ 所有云函数已成功部署!"
echo "================================================"
echo ""

echo "下一步操作:"
echo "1. 在腾讯云控制台配置环境变量"
echo "   (云函数 -> 选择函数 -> 编辑 -> 环境变量)"
echo "   SECRETID: $SECRETID"
echo "   SECRETKEY: $SECRETKEY"
echo "   ENV: $ENV"
echo ""
echo "2. 测试激活码生成功能"
echo "3. 查看部署日志: tcb functions:log admin-generate-vouchers -e $ENV"
echo ""
