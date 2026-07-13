# 设置文件夹路径
$folderPath = "C:\Users\Administrator\Documents\GitHub\music\health\beauty"
# 设置新文件名列表文件路径
$namesFile = "C:\Users\Administrator\Documents\GitHub\music\health\new_names.txt"

# 读取新文件名
$newNames = Get-Content $namesFile

# 获取文件夹中的HTML文件
$htmlFiles = Get-ChildItem -Path $folderPath -Filter *.html

# 检查文件数量是否匹配
if ($htmlFiles.Count -ne $newNames.Count) {
    Write-Host "错误：文件数量与新文件名数量不匹配！"
} else {
    # 重命名文件
    for ($i = 0; $i -lt $htmlFiles.Count; $i++) {
        $oldName = $htmlFiles[$i].Name
        $newName = $newNames[$i] + ".html"
        Rename-Item -Path (Join-Path $folderPath $oldName) -NewName $newName
        Write-Host "已将 $oldName 重命名为 $newName"
    }
}