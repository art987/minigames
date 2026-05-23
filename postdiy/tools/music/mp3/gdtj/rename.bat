
setlocal enabledelayedexpansion

rem 获取当前目录路径
set "folderPath=%~dp0"

rem 创建一个 txt 文件来记录原始文件名与新文件名的对应关系
set "logFilePath=%folderPath%Rename_Log.txt"
echo. > "%logFilePath%"

rem 获取文件夹中的所有 MP3 文件
for %%F in ("%folderPath%\*.mp3") do (
    rem 生成有序数字文件名
    set /a "counter+=1"
    set "newFileName=!counter!.mp3"

    rem 记录原始文件名与新文件名的对应关系到 txt 文件
    echo. >> "%logFilePath%"
    echo 当前歌曲名称 !counter!   原歌曲名称: %%~nxF >> "%logFilePath%"
    rem 重命名文件
    ren "%%F" "!newFileName!"
    echo !newFileName! >> "%logFilePath%"
)

echo Done!
pause
