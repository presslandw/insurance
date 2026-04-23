$files = Get-ChildItem -Path "." -Filter "*.html"
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $updated = $content -replace 'style\.css\?v=\d+', 'style.css?v=98'
    Set-Content -Path $file.FullName -Value $updated -NoNewline
    Write-Host ("Updated: " + $file.Name)
}
Write-Host "All files updated to v98."
