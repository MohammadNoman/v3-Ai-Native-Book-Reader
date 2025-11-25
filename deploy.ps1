# Quick deployment script for AI Native Book Reader
# Run this to deploy optimizations and API fix to Vercel

Write-Host "🚀 Deploying optimizations and API fix to Vercel..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if .env.local exists and has the right variable
Write-Host "📝 Step 1: Checking .env.local configuration..." -ForegroundColor Yellow
if (Test-Path .env.local) {
    $content = Get-Content .env.local -Raw
    if ($content -match "VITE_GEMINI_API_KEY") {
        Write-Host "✅ .env.local already has VITE_GEMINI_API_KEY" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: .env.local exists but doesn't have VITE_GEMINI_API_KEY" -ForegroundColor Red
        Write-Host "   Please update it manually to use VITE_GEMINI_API_KEY instead of GEMINI_API_KEY" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  .env.local not found. Please create it with:" -ForegroundColor Red
    Write-Host "   VITE_GEMINI_API_KEY=your_api_key_here" -ForegroundColor Yellow
}
Write-Host ""

# Step 2: Stage changes
Write-Host "📦 Step 2: Staging changes..." -ForegroundColor Yellow
git add .
Write-Host "✅ Changes staged" -ForegroundColor Green
Write-Host ""

# Step 3: Commit
Write-Host "💾 Step 3: Creating commit..." -ForegroundColor Yellow
git commit -m "feat: Optimize bundle size and fix AI Chat for Vercel

- Implement React.lazy() for dynamic chapter imports
- Add code splitting with separate vendor chunks
- Reduce main bundle from 591KB to 502KB (15% improvement)
- Fix API key configuration to use VITE_GEMINI_API_KEY
- Add loading states for lazy-loaded chapters
- Create .env.example template"
Write-Host "✅ Commit created" -ForegroundColor Green
Write-Host ""

# Step 4: Push
Write-Host "🚀 Step 4: Pushing to GitHub..." -ForegroundColor Yellow
git push origin main
Write-Host "✅ Pushed to GitHub" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 Deployment initiated!" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: Don't forget to configure Vercel environment variable!" -ForegroundColor Red
Write-Host "   1. Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   2. Select your project" -ForegroundColor White
Write-Host "   3. Settings → Environment Variables" -ForegroundColor White
Write-Host "   4. Add: VITE_GEMINI_API_KEY = your_api_key_here" -ForegroundColor White
Write-Host "   5. Select all environments" -ForegroundColor White
Write-Host "   6. Wait for auto-deployment to complete" -ForegroundColor White
Write-Host ""
Write-Host "📖 See vercel-api-fix-guide.md for detailed instructions" -ForegroundColor Cyan
