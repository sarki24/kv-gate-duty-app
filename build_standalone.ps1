$root = "C:\Users\ASUS\.gemini\antigravity\scratch\gate-duty-app"
$htmlPath = Join-Path $root "index.html"
$cssPath = Join-Path $root "style.css"
$jsPath = Join-Path $root "app.js"
$outputPath = Join-Path $root "gate-duty-app-standalone.html"

$html = [System.IO.File]::ReadAllText($htmlPath)
$css = [System.IO.File]::ReadAllText($cssPath)
$js = [System.IO.File]::ReadAllText($jsPath)

$cssTag = "<style>`n" + $css + "`n</style>"
$jsTag = "<script>`n" + $js + "`n</script>"

$standalone = $html.Replace('<link rel="stylesheet" href="style.css">', $cssTag)
$standalone = $standalone.Replace('<script src="app.js"></script>', $jsTag)

[System.IO.File]::WriteAllText($outputPath, $standalone)
Write-Host "Standalone HTML generated successfully! Length: "$standalone.Length
