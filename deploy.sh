#!/bin/bash

# Family Newsletter Deployment Script
# This script helps you deploy to Vercel

echo "🚀 Family Newsletter Deployment Script"
echo "======================================"

# Check if GitHub repository exists
echo "📋 Step 1: GitHub Repository Setup"
echo "Please create a GitHub repository first:"
echo "1. Go to https://github.com/new"
echo "2. Create repository named 'family-newsletter'"
echo "3. Don't initialize with README"
echo "4. Copy the repository URL"
echo ""

read -p "Enter your GitHub repository URL: " REPO_URL

# Add remote and push
echo "📤 Pushing to GitHub..."
git remote add origin $REPO_URL 2>/dev/null || true
git branch -M main
git push -u origin main

echo "✅ Code pushed to GitHub!"

echo ""
echo "🚀 Step 2: Vercel Deployment"
echo "1. Go to https://vercel.com"
echo "2. Sign up with GitHub"
echo "3. Click 'New Project'"
echo "4. Import from GitHub"
echo "5. Select your 'family-newsletter' repository"
echo ""

echo "🔧 Step 3: Environment Variables"
echo "Add these to Vercel project settings:"
echo ""
echo "DATABASE_URL=file:./prod.db"
echo "JWT_SECRET=your-super-secure-jwt-secret-key-for-production-2025"
echo "NEXT_PUBLIC_APP_URL=https://myfamilynewsletter.com"
echo "SENDGRID_API_KEY=SG.your-production-sendgrid-api-key"
echo "SENDGRID_FROM_EMAIL=newsletter@myfamilynewsletter.com"
echo "SENDGRID_FROM_NAME=My Family Newsletter"
echo "CRON_API_KEY=your-secure-cron-api-key-2025"
echo ""

echo "🌐 Step 4: Domain Setup"
echo "1. In Vercel, go to Project Settings → Domains"
echo "2. Add domain: myfamilynewsletter.com"
echo "3. Update DNS at your domain registrar:"
echo "   - CNAME: @ → cname.vercel-dns.com"
echo "   - OR use A records provided by Vercel"
echo ""

echo "📧 Step 5: SendGrid Setup"
echo "1. Go to https://sendgrid.com"
echo "2. Create account/get API key"
echo "3. Verify sender email: newsletter@myfamilynewsletter.com"
echo "4. Add API key to Vercel environment variables"
echo ""

echo "🎯 Step 6: Post-Deployment"
echo "1. Create super admin at /super-admin"
echo "2. Set up cron job for notifications"
echo "3. Test all features"
echo ""

echo "🎉 Your Family Newsletter will be live at:"
echo "https://myfamilynewsletter.com"
echo ""
echo "For detailed instructions, see VERCEL_DEPLOYMENT.md"