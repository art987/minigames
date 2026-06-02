# 贝多芬录音批量下载脚本
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$targetDir = "c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\mp3\beethoven"
if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir -Force | Out-Null }

# 已下载
$existing = Get-ChildItem $targetDir -Filter "*.mp3" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
Write-Host "已下载文件: $($existing -join ', ')" -ForegroundColor Cyan

# 12 首贝多芬曲目配置
$tracks = @(
    @{ id = "01-fuer-elise";          query = "beethoven fur elise" },
    @{ id = "02-moonlight";           query = "beethoven moonlight sonata piano" },
    @{ id = "03-pathetique";          query = "beethoven pathetique sonata" },
    @{ id = "04-pastoral";            query = "beethoven pastoral sonata piano" },
    @{ id = "05-appassionata";        query = "beethoven appassionata sonata" },
    @{ id = "06-bagatelles";          query = "beethoven bagatelles" },
    @{ id = "07-minuet";              query = "beethoven minuet g major piano" },
    @{ id = "08-turkish-march";       query = "beethoven turkish march" },
    @{ id = "09-f-minor";             query = "beethoven sonata op 2 no 1" },
    @{ id = "10-d-major";             query = "beethoven sonata op 10 no 3" },
    @{ id = "11-emperor";             query = "beethoven emperor concerto piano solo" },
    @{ id = "12-eroica";              query = "beethoven eroica variations" }
)

function Try-Download($track) {
    $dest = Join-Path $targetDir "$($track.id).mp3"
    if (Test-Path $dest) {
        $size = (Get-Item $dest).Length
        if ($size -gt 100KB) {
            Write-Host "  ✓ 已存在: $($track.id) ($([math]::Round($size/1MB, 2)) MB)" -ForegroundColor Green
            return $true
        }
    }
    
    Write-Host "`n▶ $($track.id) : $($track.query)" -ForegroundColor Cyan
    
    # 搜索 Internet Archive
    try {
        $searchUrl = "https://archive.org/advancedsearch.php?q=$([uri]::EscapeDataString($track.query))&fl[]=identifier&fl[]=title&output=json&rows=5"
        $search = Invoke-WebRequest -Uri $searchUrl -UseBasicParsing -TimeoutSec 20
        $json = $search.Content | ConvertFrom-Json
        $candidates = $json.response.docs
        
        foreach ($doc in $candidates) {
            $id = $doc.identifier
            Write-Host "  尝试: $id" -ForegroundColor DarkGray
            
            try {
                $metaUrl = "https://archive.org/metadata/$id/files"
                $meta = Invoke-WebRequest -Uri $metaUrl -UseBasicParsing -TimeoutSec 15
                $files = ($meta.Content | ConvertFrom-Json).result
                $mp3File = $files | Where-Object { $_.name -like "*.mp3" -and $_.source -eq "original" } | Select-Object -First 1
                if (-not $mp3File) { $mp3File = $files | Where-Object { $_.name -like "*.mp3" } | Select-Object -First 1 }
                
                if ($mp3File) {
                    $fileSize = $mp3File.size
                    if ($fileSize -gt 100KB -and $fileSize -lt 50MB) {
                        $url = "https://archive.org/download/$id/" + [uri]::EscapeDataString($mp3File.name)
                        Write-Host "  下载: $($mp3File.name) ($([math]::Round($fileSize/1MB, 2)) MB)" -ForegroundColor DarkGray
                        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 180
                        $size = (Get-Item $dest).Length
                        if ($size -gt 100KB) {
                            Write-Host "  ✓ 成功: $([math]::Round($size/1MB, 2)) MB" -ForegroundColor Green
                            return $true
                        }
                    }
                }
            } catch {
                continue
            }
        }
    } catch {
        Write-Host "  ✗ 搜索失败: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # 失败则生成静音占位
    Write-Host "  ⚠ 未找到合适公版录音,创建静音占位" -ForegroundColor Yellow
    $bytes = [byte[]](0xFF,0xFB,0x90,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00)
    [System.IO.File]::WriteAllBytes($dest, $bytes)
    return $false
}

# 批量下载
$success = 0; $failed = 0
foreach ($track in $tracks) {
    if (Try-Download $track) { $success++ } else { $failed++ }
    Start-Sleep -Milliseconds 500
}

Write-Host "`n============================================" -ForegroundColor Yellow
Write-Host "  下载完成统计" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Yellow
Write-Host "  成功: $success" -ForegroundColor Green
Write-Host "  失败/占位: $failed" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Yellow
