# Cache-buster: stamps all HTML files with current datetime as the CSS version.
# Run this any time you make a CSS/JS change you need users to see immediately.
# Usage:          .\bump_version.ps1
# Usage (dry run): .\bump_version.ps1 -DryRun

param([switch]$DryRun)

$version = Get-Date -Format "yyyyMMddHHmm"
$files = Get-ChildItem -Path "." -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $updated = $content -replace 'style\.css\?v=\d+', "style.css?v=$version"
    if ($content -ne $updated) {
        if (-not $DryRun) {
            Set-Content -Path $file.FullName -Value $updated -NoNewline
        }
        Write-Host ("$(if ($DryRun) {'[DRY RUN] Would update'} else {'Updated'}): " + $file.Name)
    } else {
        Write-Host ("Skipped (no version string found): " + $file.Name)
    }
}

Write-Host ""
if ($DryRun) {
    Write-Host "Dry run complete. Run without -DryRun to apply changes."
} else {
    Write-Host "All files stamped with v=$version. Remember to git commit, push, then purge Cloudflare cache."
}
