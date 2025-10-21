# 🚀 Quick Push Commands

## Copy and Paste These Commands

From your local terminal, run these commands exactly:

```bash
# Navigate to your project
cd family-newsletter

# Pull latest changes
git pull origin main

# Check status
git status

# Push latest changes
git push origin main

# Verify success
git log --oneline -1
```

## If You Get Authentication Errors

```bash
# Option A: Use GitHub CLI (if installed)
gh auth login
git push origin main

# Option B: Use Personal Access Token
git push https://YOUR_TOKEN@github.com/wesleyfarnam/family-newsletter.git main

# Option C: Configure credentials
git config credential.helper store
git push origin main
# Enter username: wesleyfarnam
# Enter password: YOUR_PERSONAL_ACCESS_TOKEN
```

## What to Expect

You should see output like:
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 500 bytes | 500.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0)
To github.com:wesleyfarnam/family-newsletter.git
   abc1234..def5678  main -> main
```

## Next Step

Once pushed, go to Vercel and deploy!