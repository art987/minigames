@echo off

:: 设置保存目录
set "SAVE_DIR=c:\Users\ThinkPad\Documents\GitHub\minigames\galley\cnpaintings"

:: 创建保存目录（如果不存在）
if not exist "%SAVE_DIR%" mkdir "%SAVE_DIR%"

:: 下载图片
set SUCCESS_COUNT=0
set FAIL_COUNT=0

:: 使用curl命令下载图片
echo 开始下载图片...

powershell -Command "&
    $urls = @(
        'http://image.thepaper.cn/www/image/22/42/819.jpg',
        'http://image.thepaper.cn/www/image/22/42/825.jpg',
        'http://image.thepaper.cn/www/image/22/42/832.jpg',
        'http://image.thepaper.cn/www/image/22/42/839.jpg',
        'http://image.thepaper.cn/www/image/22/42/847.jpg',
        'http://image.thepaper.cn/www/image/22/42/859.jpg',
        'http://image.thepaper.cn/www/image/22/42/865.jpg',
        'http://image.thepaper.cn/www/image/22/42/870.jpg',
        'http://image.thepaper.cn/www/image/22/42/877.jpg',
        'http://image.thepaper.cn/www/image/22/42/882.jpg',
        'http://image.thepaper.cn/www/image/22/42/886.jpg',
        'http://image.thepaper.cn/www/image/22/42/890.jpg',
        'http://image.thepaper.cn/www/image/22/42/892.jpg',
        'http://image.thepaper.cn/www/image/22/42/895.jpg',
        'http://image.thepaper.cn/www/image/22/42/899.jpg',
        'http://image.thepaper.cn/www/image/22/42/905.jpg',
        'http://image.thepaper.cn/www/image/22/42/910.jpg',
        'http://image.thepaper.cn/www/image/22/42/915.jpg',
        'http://image.thepaper.cn/www/image/22/42/920.jpg',
        'http://image.thepaper.cn/www/image/22/42/926.jpg',
        'http://image.thepaper.cn/www/image/22/42/930.jpg',
        'http://image.thepaper.cn/www/image/22/42/936.jpg',
        'http://image.thepaper.cn/www/image/22/42/940.jpg',
        'http://image.thepaper.cn/www/image/22/42/946.jpg',
        'http://image.thepaper.cn/www/image/22/42/951.jpg',
        'http://image.thepaper.cn/www/image/22/42/961.jpg',
        'http://image.thepaper.cn/www/image/22/42/969.jpg',
        'http://image.thepaper.cn/www/image/22/42/971.jpg',
        'http://image.thepaper.cn/www/image/22/43/24.jpg',
        'http://image.thepaper.cn/www/image/22/43/27.jpg',
        'http://image.thepaper.cn/www/image/22/43/33.jpg',
        'http://image.thepaper.cn/www/image/22/43/41.jpg',
        'http://image.thepaper.cn/www/image/22/43/47.jpg',
        'http://image.thepaper.cn/www/image/22/43/51.jpg',
        'http://image.thepaper.cn/www/image/22/43/72.jpg',
        'http://image.thepaper.cn/www/image/22/43/85.jpg',
        'http://image.thepaper.cn/www/image/22/43/96.jpg',
        'http://image.thepaper.cn/www/image/22/43/107.jpg',
        'http://image.thepaper.cn/www/image/22/43/118.jpg',
        'http://image.thepaper.cn/www/image/22/43/126.jpg',
        'http://image.thepaper.cn/www/image/22/43/134.jpg',
        'http://image.thepaper.cn/www/image/22/43/144.jpg',
        'http://image.thepaper.cn/www/image/22/43/150.jpg',
        'http://image.thepaper.cn/www/image/22/43/157.jpg',
        'http://image.thepaper.cn/www/image/22/43/167.jpg',
        'http://image.thepaper.cn/www/image/22/43/177.jpg',
        'http://image.thepaper.cn/www/image/22/43/184.jpg',
        'http://image.thepaper.cn/www/image/22/43/190.jpg',
        'http://image.thepaper.cn/www/image/22/43/228.jpg',
        'http://image.thepaper.cn/www/image/22/43/238.jpg',
        'http://image.thepaper.cn/www/image/22/43/246.jpg',
        'http://image.thepaper.cn/www/image/22/43/252.jpg',
        'http://image.thepaper.cn/www/image/22/43/260.jpg',
        'http://image.thepaper.cn/www/image/22/43/274.jpg',
        'http://image.thepaper.cn/www/image/22/43/284.jpg',
        'http://image.thepaper.cn/www/image/22/43/292.jpg',
        'http://image.thepaper.cn/www/image/22/43/294.jpg',
        'http://image.thepaper.cn/www/image/22/43/298.jpg',
        'http://image.thepaper.cn/www/image/22/43/303.jpg',
        'http://image.thepaper.cn/www/image/22/43/311.jpg',
        'http://image.thepaper.cn/www/image/22/43/327.jpg',
        'http://image.thepaper.cn/www/image/22/43/334.jpg',
        'http://image.thepaper.cn/www/image/22/43/346.jpg',
        'http://image.thepaper.cn/www/image/22/43/352.jpg',
        'http://image.thepaper.cn/www/image/22/43/358.jpg',
        'http://image.thepaper.cn/www/image/22/43/364.jpg',
        'http://image.thepaper.cn/www/image/22/43/370.jpg',
        'http://image.thepaper.cn/www/image/22/43/379.jpg',
        'http://image.thepaper.cn/www/image/22/43/389.jpg',
        'http://image.thepaper.cn/www/image/22/43/398.jpg',
        'http://image.thepaper.cn/www/image/22/43/405.jpg',
        'http://image.thepaper.cn/www/image/22/43/414.jpg',
        'http://image.thepaper.cn/www/image/22/43/423.jpg',
        'http://image.thepaper.cn/www/image/22/43/433.jpg',
        'http://image.thepaper.cn/www/image/22/43/441.jpg',
        'http://image.thepaper.cn/www/image/22/43/448.jpg',
        'http://image.thepaper.cn/www/image/22/43/454.jpg',
        'http://image.thepaper.cn/www/image/22/43/470.jpg',
        'http://image.thepaper.cn/www/image/22/43/479.jpg',
        'http://image.thepaper.cn/www/image/22/43/484.jpg',
        'http://image.thepaper.cn/www/image/22/43/491.jpg',
        'http://image.thepaper.cn/www/image/22/43/498.jpg',
        'http://image.thepaper.cn/www/image/22/43/504.jpg',
        'http://image.thepaper.cn/www/image/22/43/509.jpg',
        'http://image.thepaper.cn/www/image/22/43/528.jpg',
        'http://image.thepaper.cn/www/image/22/43/536.jpg',
        'http://image.thepaper.cn/www/image/22/43/544.jpg',
        'http://image.thepaper.cn/www/image/22/43/556.jpg',
        'http://image.thepaper.cn/www/image/22/43/585.jpg',
        'http://image.thepaper.cn/www/image/22/43/595.jpg',
        'http://image.thepaper.cn/www/image/22/43/602.jpg',
        'http://image.thepaper.cn/www/image/22/43/610.jpg',
        'http://image.thepaper.cn/www/image/22/43/613.jpg',
        'http://image.thepaper.cn/www/image/22/43/616.jpg',
        'http://image.thepaper.cn/www/image/22/43/621.jpg',
        'http://image.thepaper.cn/www/image/22/43/624.jpg',
        'http://image.thepaper.cn/www/image/22/43/627.jpg',
        'http://image.thepaper.cn/www/image/22/43/629.jpg',
        'http://image.thepaper.cn/www/image/22/43/632.jpg',
        'http://image.thepaper.cn/www/image/22/43/637.jpg'
    );
    
    $saveDir = 'c:\Users\ThinkPad\Documents\GitHub\minigames\galley\cnpaintings';
    $successCount = 0;
    $failCount = 0;
    
    foreach ($url in $urls) {
        $fileName = $url.Split('/')[-1];
        $savePath = Join-Path -Path $saveDir -ChildPath $fileName;
        
        try {
            Write-Host "正在下载: $fileName";
            Invoke-WebRequest -Uri $url -OutFile $savePath -UseBasicParsing -TimeoutSec 30;
            $successCount++;
        } catch {
            Write-Host "下载失败: $fileName - $($_.Exception.Message)";
            $failCount++;
        }
    }
    
    Write-Host "`n下载完成!";
    Write-Host "成功: $successCount 张图片";
    Write-Host "失败: $failCount 张图片";
)