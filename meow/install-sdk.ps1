$env:JAVA_HOME="C:\Program Files\Java\jdk-21"
$yesContent = Get-Content "C:\Users\ThinkPad\Documents\GitHub\minigames\meow\yes.txt" -Raw
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "C:\Users\ThinkPad\AppData\Local\Android\Sdk\cmdline-tools\bin\sdkmanager.bat"
$psi.Arguments = "--sdk_root=`"C:\Users\ThinkPad\AppData\Local\Android\Sdk`" `"`"platforms;android-34`" `"`"build-tools;34.0.0`""
$psi.RedirectStandardInput = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.UseShellExecute = $false
$psi.CreateNoWindow = $true
$process = [System.Diagnostics.Process]::Start($psi)
$process.StandardInput.Write($yesContent)
$process.WaitForExit()