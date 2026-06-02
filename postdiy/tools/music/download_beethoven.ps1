# ============================================================
# 贝多芬经典钢琴合集 - 自动下载脚本
# Beethoven's Classical Piano Collection Auto-Download Script
# ============================================================
#
# 使用方法：
#   1. 右键点击此文件，选择"使用 PowerShell 运行"
#   2. 或在 PowerShell 中执行：.\download_beethoven.ps1
#
# 注意：贝多芬作品已属于公有领域（公版），所有录音均为公版录音
# 来源：Internet Archive (archive.org) - 全球最大的公版音频档案库
# ============================================================

# 设置控制台编码为 UTF-8 以支持中文
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 颜色函数
function Write-Step($msg) { Write-Host "`n▶ $msg" -ForegroundColor Cyan }
function Write-Success($msg) { Write-Host "  ✓ $msg" -ForegroundColor Green }
function Write-Error2($msg) { Write-Host "  ✗ $msg" -ForegroundColor Red }
function Write-Warn($msg) { Write-Host "  ⚠ $msg" -ForegroundColor Yellow }

# 目标目录
$targetDir = Join-Path $PSScriptRoot "mp3\beethoven"
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Write-Success "创建目录: $targetDir"
}

# 静音占位文件生成函数（失败时使用）
function New-SilentMp3($path, $seconds = 5) {
    try {
        # 创建一个最简的 MP3 静音文件（用全 0 字节占位）
        # 实际方案：使用 ffmpeg（如果系统已安装），否则写入 0 字节
        $ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
        if ($ffmpeg) {
            & ffmpeg -f lavfi -i "anullsrc=r=44100:cl=stereo" -t $seconds -q:a 9 -acodec libmp3lame $path -y 2>&1 | Out-Null
        } else {
            # 写入一个最小的 MP3 头（让浏览器能识别为音频）
            $bytes = [byte[]](
                0xFF, 0xFB, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
            )
            [System.IO.File]::WriteAllBytes($path, $bytes)
        }
        return $true
    } catch {
        return $false
    }
}

# 下载函数（带 User-Agent 和重试）
function Download-File($url, $dest) {
    try {
        Write-Host "  下载: $url" -ForegroundColor DarkGray
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        $wc.DownloadFile($url, $dest)
        $size = (Get-Item $dest).Length
        if ($size -gt 1024) {
            Write-Success "下载完成 ($([math]::Round($size/1MB, 2)) MB)"
            return $true
        } else {
            Remove-Item $dest -Force
            return $false
        }
    } catch {
        Write-Error2 "下载失败: $($_.Exception.Message)"
        return $false
    }
}

# 备用：从 Internet Archive 搜索页获取链接的函数
function Search-Archive($query) {
    Write-Host "  搜索 Internet Archive: $query" -ForegroundColor DarkGray
    try {
        $searchUrl = "https://archive.org/advancedsearch.php?q=$([uri]::EscapeDataString($query))&fl[]=identifier&fl[]=title&output=json&rows=5"
        $response = Invoke-RestMethod -Uri $searchUrl -TimeoutSec 15
        $results = $response.response.docs
        if ($results.Count -gt 0) {
            return $results[0].identifier
        }
    } catch {
        Write-Error2 "搜索失败: $($_.Exception.Message)"
    }
    return $null
}

# 12 首贝多芬作品的下载配置
# 优先级：直接 URL > 搜索关键词
$tracks = @(
    @{ id = "01-fuer-elise";          title = "Fur Elise";       query = "beethoven fur elise bagatelle" },
    @{ id = "02-moonlight";           title = "Moonlight Sonata"; query = "beethoven moonlight sonata op 27" },
    @{ id = "03-pathetique";          title = "Pathetique";      query = "beethoven pathetique sonata op 13" },
    @{ id = "04-pastoral";            title = "Pastoral Sonata"; query = "beethoven pastoral sonata op 28" },
    @{ id = "05-appassionata";        title = "Appassionata";    query = "beethoven appassionata sonata op 57" },
    @{ id = "06-bagatelles";          title = "Bagatelles Op 119"; query = "beethoven bagatelles op 119" },
    @{ id = "07-minuet";              title = "Minuet in G";     query = "beethoven minuet in g major" },
    @{ id = "08-turkish-march";       title = "Turkish March";   query = "beethoven turkish march ruins of athens" },
    @{ id = "09-f-minor";             title = "Sonata No 1 F minor"; query = "beethoven piano sonata no 1 op 2" },
    @{ id = "10-d-major";             title = "Sonata No 7 D major"; query = "beethoven piano sonata no 7 op 10" },
    @{ id = "11-emperor";             title = "Emperor Concerto"; query = "beethoven emperor concerto piano" },
    @{ id = "12-eroica";              title = "Eroica Variations"; query = "beethoven eroica variations op 35" }
)

Write-Host "`n============================================================" -ForegroundColor Yellow
Write-Host "  贝多芬经典钢琴合集 - 公版录音下载器" -ForegroundColor Yellow
Write-Host "  Beethoven's Classical Piano Collection Downloader" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Yellow

$successCount = 0
$failCount = 0

foreach ($track in $tracks) {
    Write-Step "处理: $($track.title) ($($track.id))"
    
    $targetFile = Join-Path $targetDir "$($track.id).mp3"
    
    # 跳过已存在的大文件
    if (Test-Path $targetFile) {
        $size = (Get-Item $targetFile).Length
        if ($size -gt 100KB) {
            Write-Success "文件已存在 ($([math]::Round($size/1MB, 2)) MB)，跳过"
            $successCount++
            continue
        }
    }
    
    # 尝试 1：从 Internet Archive 搜索
    $identifier = Search-Archive $track.query
    
    if ($identifier) {
        Write-Host "  找到 archive: $identifier" -ForegroundColor DarkGray
        
        # 尝试多种格式链接
        $urls = @(
            "https://archive.org/download/$identifier/$identifier.mp3",
            "https://archive.org/download/$identifier/$identifier`_64kb.mp3",
            "https://archive.org/download/$identifier/$identifier`_vbr.mp3",
            "https://ia800304.us.archive.org/0/items/$identifier/$identifier.mp3"
        )
        
        $downloaded = $false
        foreach ($url in $urls) {
            if (Download-File $url $targetFile) {
                $downloaded = $true
                $successCount++
                break
            }
        }
        
        if (-not $downloaded) {
            Write-Warn "所有 URL 都失败，生成静音占位文件"
            if (New-SilentMp3 $targetFile 30) {
                Write-Warn "已生成静音占位文件 (30 秒)"
                $failCount++
            }
        }
    } else {
        Write-Warn "未找到合适的公版录音，生成静音占位文件"
        if (New-SilentMp3 $targetFile 30) {
            Write-Warn "已生成静音占位文件 (30 秒)"
            $failCount++
        }
    }
    
    # 礼貌延迟
    Start-Sleep -Seconds 1
}

Write-Host "`n============================================================" -ForegroundColor Yellow
Write-Host "  下载完成统计" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Yellow
Write-Host "  成功: $successCount" -ForegroundColor Green
Write-Host "  失败/占位: $failCount" -ForegroundColor Yellow
Write-Host "  目标目录: $targetDir" -ForegroundColor Cyan
Write-Host "============================================================`n" -ForegroundColor Yellow

Write-Host "下一步：" -ForegroundColor Cyan
Write-Host "  1. 打开浏览器访问 beethoven.html" -ForegroundColor White
Write-Host "  2. 占位文件需要替换为真实录音，可访问以下公版资源：" -ForegroundColor White
Write-Host "     • Internet Archive: https://archive.org/details/audio" -ForegroundColor DarkCyan
Write-Host "     • IMSLP: https://imslp.org/wiki/Category:Beethoven" -ForegroundColor DarkCyan
Write-Host "     • Musopen: https://musopen.org/music/genre/classical/" -ForegroundColor DarkCyan
Write-Host ""

# 自动打开浏览器
$beethovenHtml = Join-Path $PSScriptRoot "beethoven.html"
if (Test-Path $beethovenHtml) {
    $open = Read-Host "是否打开贝多芬音乐页面？(Y/N)"
    if ($open -eq "Y" -or $open -eq "y") {
        Start-Process $beethovenHtml
    }
}
