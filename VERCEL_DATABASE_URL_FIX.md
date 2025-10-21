# Fix DATABASE_URL in Vercel

## Problem
Build fails because DATABASE_URL is still set to SQLite: `file:./prod.db`

## Solution

### Step 1: Get Postgres Connection String
1. Vercel Dashboard → Storage tab
2. Click your Postgres database
3. Copy the "Prisma URL" or "Connection String"
   - Format: `postgresql://default:xxx@ep-xxx.us-east-2.aws.neon.tech:5432/verceldb`

### Step 2: Update Environment Variable
1. Project Settings → Environment Variables
2. Edit `DATABASE_URL`
3. Replace `file:./prod.db` with your Postgres URL
4. Save

### Step 3: Redeploy
1. Deployments tab
2. Redeploy latest deployment
3. Build will succeed

## After Fix
- Build completes successfully
- Run init-postgres.sql on database
- Registration works