#!/bin/bash
# Quick deployment script for AI Native Book Reader

echo "🚀 Deploying optimizations and API fix to Vercel..."
echo ""

# Step 1: Check if .env.local exists and has the right variable
echo "📝 Step 1: Checking .env.local configuration..."
if [ -f .env.local ]; then
    if grep -q "VITE_GEMINI_API_KEY" .env.local; then
        echo "✅ .env.local already has VITE_GEMINI_API_KEY"
    else
        echo "⚠️  WARNING: .env.local exists but doesn't have VITE_GEMINI_API_KEY"
        echo "   Please update it manually to use VITE_GEMINI_API_KEY instead of GEMINI_API_KEY"
    fi
else
    echo "⚠️  .env.local not found. Please create it with:"
    echo "   VITE_GEMINI_API_KEY=your_api_key_here"
fi
echo ""

# Step 2: Stage changes
echo "📦 Step 2: Staging changes..."
git add .
echo "✅ Changes staged"
echo ""

# Step 3: Commit
echo "💾 Step 3: Creating commit..."
git commit -m "feat: Optimize bundle size and fix AI Chat for Vercel

- Implement React.lazy() for dynamic chapter imports
- Add code splitting with separate vendor chunks
- Reduce main bundle from 591KB to 502KB (15% improvement)
- Fix API key configuration to use VITE_GEMINI_API_KEY
- Add loading states for lazy-loaded chapters
- Create .env.example template"
echo "✅ Commit created"
echo ""

# Step 4: Push
echo "🚀 Step 4: Pushing to GitHub..."
git push origin main
echo "✅ Pushed to GitHub"
echo ""

echo "🎉 Deployment initiated!"
echo ""
echo "⚠️  IMPORTANT: Don't forget to configure Vercel environment variable!"
echo "   1. Go to: https://vercel.com/dashboard"
echo "   2. Select your project"
echo "   3. Settings → Environment Variables"
echo "   4. Add: VITE_GEMINI_API_KEY = your_api_key_here"
echo "   5. Select all environments"
echo "   6. Wait for auto-deployment to complete"
echo ""
echo "📖 See vercel-api-fix-guide.md for detailed instructions"
