# Search Archive.org for specific Beethoven pieces
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$targetDir = "c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\mp3\beethoven"

# Remove bad/failed files
Get-ChildItem $targetDir -Filter "*.mp3" | Where-Object { $_.Length -lt 200KB } | ForEach-Object {
    Write-Host "Removing: $($_.Name)"
    Remove-Item $_.FullName -Force
}

function Try-DirectDownload {
    param(
        [string]$Id,
        [string]$FilePattern,
        [string]$Dest
    )
    
    try {
        $metaUrl = "https://archive.org/metadata/$Id/files"
        $meta = Invoke-WebRequest -Uri $metaUrl -UseBasicParsing -TimeoutSec 15
        $files = ($meta.Content | ConvertFrom-Json).result
        
        $mp3File = $null
        if ($FilePattern) {
            $mp3File = $files | Where-Object { $_.name -like $FilePattern -and $_.size -gt 500KB -and $_.size -lt 50MB } | Select-Object -First 1
        }
        if (-not $mp3File) {
            $mp3File = $files | Where-Object { $_.name -like "*.mp3" -and $_.size -gt 500KB -and $_.size -lt 50MB } | Select-Object -First 1
        }
        
        if ($mp3File) {
            $url = "https://archive.org/download/$Id/" + [uri]::EscapeDataString($mp3File.name)
            Write-Host "  Downloading: $Id / $($mp3File.name) ($([math]::Round($mp3File.size/1MB, 2)) MB)"
            Invoke-WebRequest -Uri $url -OutFile $Dest -UseBasicParsing -TimeoutSec 180
            $size = (Get-Item $Dest).Length
            if ($size -gt 200KB) {
                Write-Host "  OK: $([math]::Round($size/1MB, 2)) MB"
                return $true
            } else {
                Remove-Item $Dest -Force
            }
        }
    } catch { }
    return $false
}

# 已知 archive.org 上的贝多芬录音 identifiers
$directAttempts = @(
    # Pastoral Sonata - 田园奏鸣曲
    @{ id = "04-pastoral"; tryIds = @("lp_pastoral-sonata-sonata-no-15-d-major-op_arthur-rubinstein-ludwig-van-beethoven","beethoven-sonatas-rubinstein-vol3","beethoven-sonata-pastoral-schnabel") },
    # Bagatelles - 巴格泰莱
    @{ id = "06-bagatelles"; tryIds = @("beethoven-bagatelles-op-119","beethoven-bagatelles-piano-solo","beethoven-complete-bagatelles") },
    # Turkish March
    @{ id = "08-turkish-march"; tryIds = @("beethoven-ruins-athens-turkish-march","beethoven-ruins-of-athens") },
    # Eroica Variations
    @{ id = "12-eroica"; tryIds = @("beethoven-eroica-variations-piano","beethoven-15-variations-eroica","beethoven-eroica-var-op35") }
)

function Try-MultiSearch($track) {
    $dest = Join-Path $targetDir "$($track.id).mp3"
    Write-Host ""
    Write-Host "Processing: $($track.id)" -ForegroundColor Cyan
    
    foreach ($archiveId in $track.tryIds) {
        Write-Host "  Trying: $archiveId"
        if (Try-DirectDownload -Id $archiveId -Dest $dest) {
            return $true
        }
    }
    
    # 回退：搜索 + 严格过滤
    Write-Host "  Searching archive.org..."
    $queries = @(
        "$($track.id) beethoven",
        "beethoven $($track.id)"
    )
    
    foreach ($q in $queries) {
        try {
            $searchUrl = "https://archive.org/advancedsearch.php?q=$([uri]::EscapeDataString($q))&fl[]=identifier&fl[]=title&output=json&rows=20"
            $search = Invoke-WebRequest -Uri $searchUrl -UseBasicParsing -TimeoutSec 15
            $json = $search.Content | ConvertFrom-Json
            $candidates = $json.response.docs
            
            foreach ($doc in $candidates) {
                $id = $doc.identifier
                $title = $doc.title
                $skip = @("baby","einstein","lullaby","cartoon","suzuki","accordion","carroll","compilation","various","greatest","best of","treasures","introduction","music box","celtic")
                $shouldSkip = $false
                foreach ($s in $skip) { if ($title -like "*$s*") { $shouldSkip = $true; break } }
                if ($shouldSkip) { continue }
                
                if (Try-DirectDownload -Id $id -Dest $dest) {
                    return $true
                }
            }
        } catch { }
    }
    
    return $false
}

$success = 0
$failed = 0
foreach ($t in $directAttempts) {
    if (Try-MultiSearch $t) { $success++ } else { $failed++ }
    Start-Sleep -Milliseconds 800
}

Write-Host ""
Write-Host "============================================"
Write-Host "  Result: Success $success, Failed $failed"
Write-Host "============================================"
