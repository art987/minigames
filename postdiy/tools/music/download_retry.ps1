# Retry download
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$targetDir = "c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\music\mp3\beethoven"

# Remove placeholders
$placeholders = Get-ChildItem $targetDir -Filter "*.mp3" | Where-Object { $_.Length -lt 100KB }
foreach ($p in $placeholders) {
    Write-Host "Removing placeholder: $($p.Name)"
    Remove-Item $p.FullName -Force
}

$retryTracks = @(
    @{ id = "04-pastoral";       query = "beethoven piano sonata d major opus 28" },
    @{ id = "06-bagatelles";     query = "beethoven piano bagatelles op 119 mp3" },
    @{ id = "08-turkish-march";  query = "beethoven march turkish athens ruins piano" },
    @{ id = "09-f-minor";        query = "beethoven sonata no 1 f minor piano rubinstein" },
    @{ id = "12-eroica";         query = "beethoven 15 variations eroica piano solo" }
)

function Try-Download($track) {
    $dest = Join-Path $targetDir "$($track.id).mp3"
    Write-Host "Processing: $($track.id) - $($track.query)"
    
    try {
        $searchUrl = "https://archive.org/advancedsearch.php?q=$([uri]::EscapeDataString($track.query))&fl[]=identifier&fl[]=title&output=json&rows=10"
        $search = Invoke-WebRequest -Uri $searchUrl -UseBasicParsing -TimeoutSec 20
        $json = $search.Content | ConvertFrom-Json
        $candidates = $json.response.docs
        
        foreach ($doc in $candidates) {
            $id = $doc.identifier
            $title = $doc.title
            
            $skipWords = @("baby","einstein","lullaby","cartoon","suzuki","accordion","carroll","compilation","various","v.a.","greatest hits","best of","treasures","introduction")
            $shouldSkip = $false
            foreach ($s in $skipWords) {
                if ($title -like "*$s*") { $shouldSkip = $true; break }
            }
            if ($shouldSkip) { continue }
            
            try {
                $metaUrl = "https://archive.org/metadata/$id/files"
                $meta = Invoke-WebRequest -Uri $metaUrl -UseBasicParsing -TimeoutSec 15
                $files = ($meta.Content | ConvertFrom-Json).result
                $mp3File = $files | Where-Object { $_.name -like "*.mp3" -and $_.source -eq "original" -and $_.size -gt 500KB -and $_.size -lt 50MB } | Select-Object -First 1
                if (-not $mp3File) { $mp3File = $files | Where-Object { $_.name -like "*.mp3" -and $_.size -gt 500KB -and $_.size -lt 50MB } | Select-Object -First 1 }
                
                if ($mp3File) {
                    $url = "https://archive.org/download/$id/" + [uri]::EscapeDataString($mp3File.name)
                    Write-Host "  -> $id / $($mp3File.name) ($([math]::Round($mp3File.size/1MB, 2)) MB)"
                    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 180
                    $size = (Get-Item $dest).Length
                    if ($size -gt 100KB) {
                        Write-Host "  OK: $([math]::Round($size/1MB, 2)) MB"
                        return $true
                    } else {
                        Remove-Item $dest -Force
                    }
                }
            } catch { continue }
        }
    } catch { }
    
    Write-Host "  FAIL: no suitable recording"
    $bytes = [byte[]](0xFF,0xFB,0x90,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00)
    [System.IO.File]::WriteAllBytes($dest, $bytes)
    return $false
}

$success = 0
$failed = 0
foreach ($t in $retryTracks) {
    if (Try-Download $t) { $success++ } else { $failed++ }
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "============================================"
Write-Host "  Result: Success $success, Failed $failed"
Write-Host "============================================"
