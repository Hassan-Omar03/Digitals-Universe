$f = 'd:\digitals\Digitals-Universe\app\globals.css'
$raw = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
$raw = $raw.Replace('  min-height: 4.25rem;' + "`r`n" + '  border: 0 !important;', '  min-height: unset;' + "`r`n" + '  border: 0 !important;')
$raw = $raw.Replace('  min-height: 4.25rem;' + "`n" + '  border: 0 !important;', '  min-height: unset;' + "`n" + '  border: 0 !important;')
[System.IO.File]::WriteAllText($f, $raw, [System.Text.Encoding]::UTF8)
Write-Output "Done"
