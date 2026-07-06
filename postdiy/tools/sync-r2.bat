@echo off
chcp 65001 >nul
title Cloudflare R2 图片同步

echo ========================================
echo   Cloudflare R2 图片同步
echo ========================================
echo.
echo 本地目录: E:\postdiyback\posterbgback\images
echo R2 Bucket: postdiy
echo.

cd /d "c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy"
node tools\sync.js --cloud=r2 --verbose

echo.
echo ========================================
echo 同步完成，按任意键退出...
echo ========================================
pause >nul
