@echo off
chcp 65001 >nul
title R2 图片同步工具

echo ========================================
echo   R2 图片同步工具
echo ========================================
echo.
echo 正在启动同步服务...
echo.

cd /d "%~dp0.."

start "" "http://localhost:3456/r2-sync-ui.html"

node tools\r2-sync-server.js

pause
