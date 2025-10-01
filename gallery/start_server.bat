@echo off
REM 启动本地 HTTP 服务器
python -m http.server 8000 --directory .

REM 如果 Python 不可用，尝试使用 Python3
if %errorlevel% neq 0 (
    python3 -m http.server 8000 --directory .
)

REM 如果还是失败，提示用户
if %errorlevel% neq 0 (
    echo 无法启动服务器，请确保 Python 已安装
    pause
)