@echo off

REM 启动Python HTTP服务器
start cmd /k "cd %~dp0 && python -m http.server 8001 && pause"

REM 等待服务器启动
timeout /t 2 >nul

REM 打开浏览器预览
start http://localhost:8001

REM 提示用户
cls
echo 贺卡DIY工具服务器已启动！
echo 请在浏览器中访问 http://localhost:8001

echo.
echo 按任意键关闭此窗口...
pause >nul