$env:JAVA_HOME="C:\Program Files\Java\jdk-21"
$manager = "C:\Users\ThinkPad\AppData\Local\Android\Sdk\cmdline-tools\bin\sdkmanager.bat"
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $manager
$psi.Arguments = "--sdk_root=`"C:\Users\ThinkPad\AppData\Local\Android\Sdk`" --licenses"
$psi.RedirectStandardInput = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.UseShellExecute = $false
$psi.CreateNoWindow = $true
$process = [System.Diagnostics.Process]::Start($psi)
Start-Sleep -Milliseconds 500
$process.StandardInput.WriteLine("y")
Start-Sleep -Milliseconds 500
$process.StandardInput.WriteLine("y")
Start-Sleep -Milliseconds 500
$process.StandardInput.WriteLine("y")
Start-Sleep -Milliseconds 500
$process.StandardInput.WriteLine("y")
Start-Sleep -Milliseconds 500
$process.StandardInput.WriteLine("y")
Start-Sleep -Milliseconds 500
$process.StandardInput.WriteLine("y")
Start-Sleep -Milliseconds 500
$process.StandardInput.WriteLine("y")
$process.WaitForExit()
$process.StandardOutput.ReadToEnd()
$process.StandardError.ReadToEnd()