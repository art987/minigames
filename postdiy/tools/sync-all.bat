@echo off
chcp 65001 >nul
title R2 图片同步 - 全量同步

echo ========================================
echo   R2 图片同步工具 - 全量同步
echo ========================================
echo.
echo 本地目录: E:\postdiyback\posterbgback\images
echo R2 Bucket: postdiy
echo.
echo 正在同步...
echo ========================================
echo.

cd /d "c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy"
node tools\r2-sync.js --verbose

echo.
echo ========================================
echo 同步完成，按任意键退出...
echo ========================================
pause >nul
