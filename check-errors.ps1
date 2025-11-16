# check-errors.ps1
Write-Host "🔍 Running Complete Error Check...`n" -ForegroundColor Cyan

Write-Host "1️⃣ TypeScript Type Check..." -ForegroundColor Yellow
npx tsc --noEmit --pretty 2>&1 | Tee-Object -FilePath "error-report-typescript.txt"

Write-Host "`n2️⃣ ESLint Check..." -ForegroundColor Yellow  
npx next lint 2>&1 | Tee-Object -FilePath "error-report-eslint.txt"

Write-Host "`n3️⃣ Build Check..." -ForegroundColor Yellow
npm run build 2>&1 | Tee-Object -FilePath "error-report-build.txt"

Write-Host "`n✅ Error reports saved to:" -ForegroundColor Green
Write-Host "   - error-report-typescript.txt"
Write-Host "   - error-report-eslint.txt"  
Write-Host "   - error-report-build.txt"