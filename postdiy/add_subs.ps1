$file = 'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\business\js\biz-data.js'
$lines = [System.IO.File]::ReadAllLines($file)

# Define sub assignments for sol_026 to sol_100
$subs = @{
  'sol_026' = 403; 'sol_027' = 402; 'sol_028' = 205; 'sol_029' = 405; 'sol_030' = 702
  'sol_031' = 404; 'sol_032' = 404; 'sol_033' = 103; 'sol_034' = 401; 'sol_035' = 405
  'sol_036' = 404; 'sol_037' = 405; 'sol_038' = 403; 'sol_039' = 405; 'sol_040' = 404
  'sol_041' = 603; 'sol_042' = 603; 'sol_043' = 304; 'sol_044' = 402; 'sol_045' = 304
  'sol_046' = 403; 'sol_047' = 403; 'sol_048' = 603; 'sol_049' = 305; 'sol_050' = 603
  'sol_051' = 602; 'sol_052' = 602; 'sol_053' = 601; 'sol_054' = 602; 'sol_055' = 601
  'sol_056' = 603; 'sol_057' = 601; 'sol_058' = 601; 'sol_059' = 201; 'sol_060' = 204
  'sol_061' = 205; 'sol_062' = 202; 'sol_063' = 203; 'sol_064' = 203; 'sol_065' = 201
  'sol_066' = 204; 'sol_067' = 203; 'sol_068' = 303; 'sol_069' = 301; 'sol_070' = 305
  'sol_071' = 302; 'sol_072' = 304; 'sol_073' = 302; 'sol_074' = 305; 'sol_075' = 302
  'sol_076' = 304; 'sol_077' = 503; 'sol_078' = 501; 'sol_079' = 505; 'sol_080' = 801
  'sol_081' = 502; 'sol_082' = 502; 'sol_083' = 504; 'sol_084' = 802; 'sol_085' = 401
  'sol_086' = 403; 'sol_087' = 403; 'sol_088' = 405; 'sol_089' = 401; 'sol_090' = 401
  'sol_091' = 402; 'sol_092' = 403; 'sol_093' = 702; 'sol_094' = 702; 'sol_095' = 803
  'sol_096' = 701; 'sol_097' = 701; 'sol_098' = 805; 'sol_099' = 702; 'sol_100' = 805
}

# Track which sol we're currently in
$currentSol = $null
$newLines = [System.Collections.ArrayList]::new()
$inserted = @{}

for ($i = 0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  
  # Detect which sol we're in
  if ($line -match '_id: "sol_(\d+)"') {
    $currentSol = "sol_$($Matches[1])"
  }
  
  # Check if this line has "chapter: N," and the next line doesn't already have "sub:"
  if ($currentSol -and $subs.ContainsKey($currentSol) -and $line -match '^\s*chapter:\s*\d+,?\s*$' -and -not $inserted[$currentSol]) {
    # Get the indentation from the chapter line
    if ($line -match '^(\s*)chapter:') {
      $indent = $Matches[1]
    } else {
      $indent = '    '
    }
    
    # Check if the next line already has sub:
    $nextLine = if ($i + 1 -lt $lines.Count) { $lines[$i + 1] } else { '' }
    if ($nextLine -match '^\s*sub:') {
      # Already has sub, skip
      [void]$newLines.Add($line)
      continue
    }
    
    # Add chapter line, then sub line
    [void]$newLines.Add($line)
    [void]$newLines.Add("${indent}sub: $($subs[$currentSol]),")
    $inserted[$currentSol] = $true
    continue
  }
  
  [void]$newLines.Add($line)
}

[System.IO.File]::WriteAllLines($file, $newLines.ToArray())
Write-Host "Done. Inserted sub for $($inserted.Count) solutions."
