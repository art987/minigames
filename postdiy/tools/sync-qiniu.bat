@echo off
chcp 65001 >nul
title 七牛云图片同步

echo ========================================
echo   七牛云图片同步
echo ========================================
echo.
echo 本地目录: E:\postdiyback\posterbgback\images
echo 七牛 Bucket: posterbg
echo 七牛域名: 7ncdn.peacelove.top
echo.

cd /d "c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy"
node tools\sync.js --cloud=qiniu --verbose

echo.
echo ========================================
echo 同步完成，按任意键退出...
echo ========================================
pause >nul
