$port = 8080
$endpoint = New-Object System.Net.IPEndPoint ([System.Net.IPAddress]::Any, $port)
$listener = New-Object System.Net.Sockets.TcpListener $endpoint
$listener.Start()

$localIP = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi" -ErrorAction SilentlyContinue).IPAddress
if (-not $localIP) {
    $localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -ne "127.0.0.1" -and $_.IPAddress -notlike "169.254*" })[0].IPAddress
}

Write-Host "Mobile-accessible HTTP Server running on http://localhost:$port/ and http://${localIP}:$port/"

$root = "C:\Users\ASUS\.gemini\antigravity\scratch\gate-duty-app"

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader $stream

        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($requestLine)) {
            $client.Close()
            continue
        }

        $tokens = $requestLine.Split(' ')
        $rawUrl = if ($tokens.Length -gt 1) { $tokens[1] } else { "/" }
        
        $cleanPath = $rawUrl.Split('?')[0].TrimStart('/')
        if ([string]::IsNullOrEmpty($cleanPath)) {
            $cleanPath = "index.html"
        }

        $filePath = Join-Path $root $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            $contentType = "text/html; charset=utf-8"
            if ($filePath.EndsWith(".css")) { $contentType = "text/css; charset=utf-8" }
            elseif ($filePath.EndsWith(".js")) { $contentType = "text/javascript; charset=utf-8" }
            elseif ($filePath.EndsWith(".json")) { $contentType = "application/json; charset=utf-8" }
            elseif ($filePath.EndsWith(".png")) { $contentType = "image/png" }
            elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $contentType = "image/jpeg" }

            $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-cache, no-store, must-revalidate`r`nPragma: no-cache`r`nExpires: 0`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($bytes, 0, $bytes.Length)
            $stream.Flush()
        } else {
            $404 = "HTTP/1.1 404 Not Found`r`nContent-Length: 0`r`nConnection: close`r`n`r`n"
            $404Bytes = [System.Text.Encoding]::UTF8.GetBytes($404)
            $stream.Write($404Bytes, 0, $404Bytes.Length)
            $stream.Flush()
        }

        $client.Close()
    }
} finally {
    $listener.Stop()
}
