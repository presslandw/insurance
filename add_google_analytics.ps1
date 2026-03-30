$gaTag = @"
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DFMPTGY8XM"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-DFMPTGY8XM');
    </script>
"@

$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    if ($content -notmatch 'G-DFMPTGY8XM') {
        # Inject right after the opening <head> tag for best tracking performance
        $content = $content -replace '(?i)<head>', "<head>`r`n$gaTag"
        Set-Content -Path $f.FullName -Value $content -Encoding UTF8
        Write-Host "Injected Google Analytics into $($f.Name)"
    } else {
        Write-Host "Skipped $($f.Name), tag already exists"
    }
}
