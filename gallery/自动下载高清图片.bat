@echo off
chcp 65001 >nul

:: 检查Python是否已安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
echo 错误：未找到Python。请先安装Python 3并确保已添加到系统PATH。
pause
exit /b 1
)

:: 安装必要的Python库
echo 正在检查并安装必要的Python库...
pip install requests beautifulsoup4 pillow matplotlib >nul 2>&1
if %errorlevel% neq 0 (
echo 安装库时出错，尝试使用管理员权限运行此脚本。
pause
exit /b 1
)

:: 运行下载脚本
echo 开始自动下载高清图片...
python auto_download_highres.py

:: 下载完成
echo.
echo 下载过程已完成！
echo 请查看下载的图片质量，并将其复制到cnpaintings文件夹中替换原图片。
pause