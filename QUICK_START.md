# Quick Start Guide - Family Newsletter

## 🚀 Get Started in 5 Minutes

### Access the Application
**Live URL**: https://3000-5fe9281c-7168-4b16-93a8-22604ba6e930.proxy.daytona.works

---

## 📝 Quick Demo (5 Steps)

### 1️⃣ Create Admin Account (30 seconds)
1. Click **"Get Started"** on the home page
2. Enter:
   - Name: `John Smith`
   - Email: `admin@example.com`
   - Password: `password123`
3. Click **"Create Account"**

### 2️⃣ Create Newsletter (30 seconds)
1. Click **"Create New Newsletter"**
2. Enter:
   - Title: `Smith Family Newsletter`
   - Frequency: `Weekly`
3. Click **"Create"**
4. Click on the newsletter to open it

### 3️⃣ Create Questionnaire (1 minute)
1. Click **"Create Questionnaire"**
2. Enter:
   - Title: `Monthly Update`
   - Add 2-3 questions
3. Click **"Create Questionnaire"**

### 4️⃣ Invite Contributor (1 minute)
1. Go back to dashboard
2. Click **"Invite Users"**
3. Enter email: `contributor@example.com`
4. Select: `Contributor`
5. **Check terminal logs** for invitation URL
6. Open URL in **incognito window**
7. Accept invitation with name and password

### 5️⃣ Submit Response & Send (2 minutes)
1. As contributor, click **"Submit Response"**
2. Answer the questions
3. Switch back to admin
4. Click **"Create New Edition"**
5. Click **"Send Now"**
6. **Check terminal logs** to see the newsletter email!

---

## 🎯 Key URLs

- **Home**: `/`
- **Register**: `/register`
- **Login**: `/login`
- **Admin Dashboard**: `/admin`
- **User Dashboard**: `/dashboard`

---

## 💡 Tips

- Use **incognito windows** for testing different user roles
- Check **terminal/console logs** for invitation URLs and emails
- All emails are logged to console (mock email service)
- Database resets with: `rm prisma/dev.db && npx prisma db push`

---

## 📧 Finding Invitation URLs

When you send an invitation, look for this in the terminal:
```
=== EMAIL SENT ===
To: contributor@example.com
Subject: You're invited to Family Newsletter!
Body: [HTML content with URL]
==================
```

Copy the URL from the email body and paste it in a new browser window.

---

## 🎉 That's It!

You now have a fully functional family newsletter system. Explore the features and customize it to your needs!

For detailed information, see:
- **README.md** - Complete documentation
- **DEMO_GUIDE.md** - Detailed walkthrough
- **PROJECT_SUMMARY.md** - Technical overview