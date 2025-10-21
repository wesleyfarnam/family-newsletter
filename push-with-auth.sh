#!/bin/bash

echo "🚀 Pushing Family Newsletter to GitHub"
echo "======================================"

# Check if we're on the right branch
echo "📍 Checking current branch..."
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Not on main branch. Switching to main..."
    git checkout main
fi

# Check if there are changes to commit
echo "📋 Checking for changes..."
git status

# Add any untracked files
echo "➕ Adding files..."
git add .

# Check if we need to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "📝 Committing changes..."
    git commit -m "Production deployment - hydration fixes and complete redesign"
fi

echo "🔐 Authentication Required:"
echo "=========================="
echo "When prompted for username, enter: wesleyfarnam"
echo "When prompted for password, use your Personal Access Token from GitHub"
echo "Not your GitHub password!"
echo ""

echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Push complete! Check Vercel for deployment."