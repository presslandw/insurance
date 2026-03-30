$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    
    # Extract Title
    $title = ""
    if ($content -match '(?is)<title>(.*?)</title>') { $title = $matches[1].Trim() }
    
    # Extract Description
    $desc = ""
    if ($content -match '(?is)<meta[^>]*name=["'']description["''][^>]*content=["'']([^"'']*)["'']') { 
        $desc = $matches[1].Trim() -replace '[\r\n]+', ' ' -replace '\s+', ' ' 
    }
    
    # Filename for URL
    $filename = $f.Name
    $url = "https://www.chriswalkerinsurance.ca/$filename"
    if ($filename -eq "index.html") { $url = "https://www.chriswalkerinsurance.ca/" }
    
    if ($content -notmatch 'property="og:title"') {
        $ogTags = "`r`n    <!-- Open Graph / Social Media Meta Tags -->`r`n"
        $ogTags += "    <meta property=`"og:type`" content=`"website`">`r`n"
        $ogTags += "    <meta property=`"og:url`" content=`"$url`">`r`n"
        if ($title) { $ogTags += "    <meta property=`"og:title`" content=`"$title`">`r`n" }
        if ($desc) { $ogTags += "    <meta property=`"og:description`" content=`"$desc`">`r`n" }
        $ogTags += "    <meta property=`"og:image`" content=`"https://www.chriswalkerinsurance.ca/images/social-share.jpg`">`r`n"
        
        $content = $content -replace '(?i)</head>', "$ogTags</head>"
        Set-Content -Path $f.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($f.Name)"
    } else {
        Write-Host "Skipped $($f.Name), already has OG tags"
    }
}
