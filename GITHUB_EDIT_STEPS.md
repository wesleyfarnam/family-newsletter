# 🚀 GitHub Web Edit - Step by Step

## Step 1: Edit Prisma Schema (2 minutes)

### 1.1 Open the File
Click this link: https://github.com/wesleyfarnam/family-newsletter/edit/main/prisma/schema.prisma

(If it asks you to sign in, sign in to GitHub first)

### 1.2 Select All & Replace
1. Press `Cmd + A` (select all text in the editor)
2. Press `Delete` (clear everything)
3. Copy ALL text from `COPY_PASTE_SCHEMA.txt` file
4. Paste into the GitHub editor
5. Scroll down and click green "Commit changes" button
6. In the popup, click "Commit changes" again

---

## Step 2: Edit Registration Route (2 minutes)

### 2.1 Open the File
Click this link: https://github.com/wesleyfarnam/family-newsletter/edit/main/app/api/auth/register/route.ts

### 2.2 Select All & Replace
1. Press `Cmd + A` (select all)
2. Press `Delete`
3. Copy ALL text from `COPY_PASTE_REGISTER.txt` file
4. Paste into the GitHub editor
5. Click green "Commit changes" button
6. Click "Commit changes" again in popup

---

## Step 3: Update Vercel Environment Variable (1 minute)

### 3.1 Open Vercel Settings
1. Go to: https://vercel.com/wesleyfarnam/family-newsletter/settings/environment-variables
2. Find the row with `DATABASE_URL`
3. Click the three dots (•••) on the right
4. Click "Edit"

### 3.2 Change the Value
1. Delete the current value (the long PostgreSQL URL)
2. Type exactly: `file:./prod.db`
3. Click "Save"

---

## Step 4: Redeploy (1 minute)

### 4.1 Trigger Deployment
1. Go to: https://vercel.com/wesleyfarnam/family-newsletter/deployments
2. Click "Redeploy" button on the latest deployment
3. Confirm by clicking "Redeploy" in the popup

### 4.2 Wait for Build
- Watch the deployment status
- Should take 2-3 minutes
- Wait for green checkmark ✅

---

## Step 5: Test Registration (1 minute)

### 5.1 Open Registration Page
Go to: https://myfamilynewsletter.com/register

### 5.2 Create Account
1. Enter your name
2. Enter your email
3. Enter a password (at least 6 characters)
4. Click "Create Account"

### 5.3 Success!
- You should be logged in automatically
- You'll see the dashboard
- **Registration works!** ✅

---

## 📋 Quick Checklist

- [ ] Step 1: Edit `prisma/schema.prisma` ✏️
- [ ] Step 2: Edit `app/api/auth/register/route.ts` ✏️
- [ ] Step 3: Update Vercel `DATABASE_URL` ⚙️
- [ ] Step 4: Redeploy in Vercel 🚀
- [ ] Step 5: Test registration 🧪

---

## 🆘 If You Get Stuck

**Can't find the files?**
- Make sure you're signed into GitHub
- The edit links should work directly

**Commit button is gray?**
- Make sure you pasted the new content
- The file should show changes

**Build fails in Vercel?**
- Check that you copied the ENTIRE content from both files
- Make sure no extra characters were added

**Registration still fails?**
- Check Vercel logs for errors
- Make sure `DATABASE_URL` is exactly `file:./prod.db`
- Try redeploying again

---

## ✅ What This Does

**Before**: PostgreSQL with UUID encoding errors ❌
**After**: SQLite with automatic IDs ✅

**Result**: Registration works exactly like your local version!

---

**Total time: ~7 minutes** ⏱️

Let me know when you complete each step!