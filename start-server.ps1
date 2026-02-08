Write-Host "🚀 Starting AUR Blockchain Explorer..." -ForegroundColor Green
Write-Host ""

Write-Host "📦 Clearing cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "✅ Cache cleared" -ForegroundColor Green
} else {
    Write-Host "✅ No cache to clear" -ForegroundColor Green
}
Write-Host ""

Write-Host "🌐 Starting development server..." -ForegroundColor Cyan
Write-Host "🔗 Server will be available at: http://localhost:3000" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host ""
Write-Host "⚡ Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the development server
npm run dev


