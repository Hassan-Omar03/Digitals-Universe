$f = 'd:\digitals\Digitals-Universe\components\HomeClient.tsx'
$raw = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

$s = $raw.IndexOf('function StaticBackground')
$e = $raw.IndexOf('const stats =')

$result = $raw.Substring(0, $s) + $raw.Substring($e)
[System.IO.File]::WriteAllText($f, $result, [System.Text.Encoding]::UTF8)
Write-Output "OK"
