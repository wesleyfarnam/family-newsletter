# Super Admin Guide

## 🎯 Overview

The Super Admin dashboard gives you complete control over the entire Family Newsletter system. You can manage all users, newsletters, and system settings.

---

## 🚀 Getting Started

### Step 1: Create Your Super Admin Account

Run this command in the `family-newsletter` directory:

```bash
node make-super-admin.js your@email.com yourpassword "Your Name"
```

**Example:**
```bash
node make-super-admin.js admin@myfamilynewsletter.com SecurePass123 "Admin User"
```

### Step 2: Login

1. Go to: https://3000-5fe9281c-7168-4b16-93a8-22604ba6e930.proxy.daytona.works/login
2. Enter your super admin email and password
3. You'll be automatically redirected to `/super-admin`

---

## 📊 Dashboard Features

### Overview Tab

**System Statistics:**
- Total Users
- Total Newsletters
- Editions Sent
- Total Responses
- Recent User Growth
- Role Distribution Chart

### Users Tab

**User Management:**
- 👥 **View All Users** - Complete list with search
- 🔐 **Login as User** - Impersonate any user to see their view
- 🔑 **Reset Password** - Change any user's password
- 👤 **Change Role** - Update user roles (ADMIN, USER1, USER2)
- 🗑️ **Delete User** - Remove users from system
- 📊 **View Activity** - See responses and media uploads

**Search & Filter:**
- Search by email or name
- Real-time filtering

### Newsletters Tab

**Newsletter Management:**
- 📰 **View All Newsletters** - System-wide newsletter list
- ⏸️ **Pause/Activate** - Control newsletter status
- 📊 **View Stats** - Members, editions, questionnaires
- 👤 **See Admin** - View newsletter owner
- 🔍 **Search** - Find newsletters quickly

---

## 🔐 Super Admin Powers

### 1. User Impersonation

**What it does:** Login as any user to see exactly what they see

**How to use:**
1. Go to Users tab
2. Find the user
3. Click the 🔐 icon
4. Confirm the action
5. You're now logged in as that user!

**Use cases:**
- Troubleshoot user issues
- Test user experience
- Help users with problems
- Verify permissions

### 2. Password Reset

**What it does:** Change any user's password instantly

**How to use:**
1. Go to Users tab
2. Find the user
3. Click the 🔑 icon
4. Enter new password (min 6 characters)
5. Click "Reset Password"

**Use cases:**
- Help users who forgot password
- Security incidents
- Account recovery

### 3. Role Management

**What it does:** Change user roles on the fly

**How to use:**
1. Go to Users tab
2. Find the user
3. Use the role dropdown
4. Select new role
5. Confirm the change

**Roles:**
- **SUPER_ADMIN** - System-wide control (you!)
- **ADMIN** - Can create newsletters
- **USER1** - Contributors (can submit responses)
- **USER2** - Recipients (receive newsletters)

### 4. Newsletter Control

**What it does:** Pause or activate any newsletter

**How to use:**
1. Go to Newsletters tab
2. Find the newsletter
3. Click "Pause Newsletter" or "Activate Newsletter"

**Use cases:**
- Temporarily disable problematic newsletters
- Moderate content
- System maintenance

### 5. User Deletion

**What it does:** Permanently remove users

**How to use:**
1. Go to Users tab
2. Find the user
3. Click the 🗑️ icon
4. Confirm deletion

**⚠️ Warning:** This action cannot be undone!

---

## 📈 System Statistics

### Key Metrics

**User Growth:**
- Total users in system
- New users this month
- Role distribution

**Newsletter Activity:**
- Total newsletters
- Active vs paused
- Editions sent

**Engagement:**
- Total responses
- Media uploads
- Activity trends

---

## 🛡️ Security Features

### Protected Actions

1. **Super Admin Role** - Cannot be changed or deleted
2. **Impersonation Logging** - All impersonations are tracked
3. **Password Requirements** - Minimum 6 characters
4. **Confirmation Prompts** - Destructive actions require confirmation

### Best Practices

1. **Keep credentials secure** - Don't share super admin access
2. **Use impersonation wisely** - Only when necessary
3. **Document changes** - Keep track of role changes
4. **Regular audits** - Review user list periodically
5. **Backup data** - Regular database backups

---

## 🔧 Common Tasks

### Task 1: Help User Who Forgot Password

1. Go to Users tab
2. Search for user by email
3. Click 🔑 icon
4. Set temporary password
5. Tell user the new password
6. User can change it after login

### Task 2: Troubleshoot User Issue

1. Go to Users tab
2. Find the user
3. Click 🔐 to impersonate
4. Navigate as the user would
5. Identify the issue
6. Logout and fix the problem

### Task 3: Moderate Newsletter

1. Go to Newsletters tab
2. Find the newsletter
3. Review content and members
4. Pause if needed
5. Contact admin if issues found

### Task 4: Promote User to Admin

1. Go to Users tab
2. Find the user
3. Change role dropdown to "ADMIN"
4. Confirm the change
5. User now has admin privileges

### Task 5: Clean Up Inactive Users

1. Go to Users tab
2. Sort by activity
3. Identify inactive users
4. Delete if appropriate
5. Confirm each deletion

---

## 📱 Mobile Access

The Super Admin dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

---

## 🆘 Troubleshooting

### Can't Access Super Admin Dashboard

**Problem:** Redirected to login or see "Forbidden"

**Solution:**
1. Verify you're logged in
2. Check your role is SUPER_ADMIN
3. Run the make-super-admin script again
4. Clear browser cache and cookies

### Impersonation Not Working

**Problem:** Can't login as user

**Solution:**
1. Verify user exists
2. Check user has valid email
3. Try refreshing the page
4. Check browser console for errors

### Password Reset Fails

**Problem:** Can't reset user password

**Solution:**
1. Ensure password is at least 6 characters
2. Check user is not SUPER_ADMIN
3. Verify user exists
4. Try again with different password

---

## 🎓 Tips & Tricks

1. **Use Search** - Quickly find users and newsletters
2. **Check Activity** - Monitor user engagement
3. **Regular Reviews** - Weekly check of system stats
4. **Document Changes** - Keep notes on major changes
5. **Test Changes** - Use impersonation to verify changes

---

## 📞 Support

For technical issues or questions:
- Check application logs
- Review error messages
- Test in different browser
- Clear cache and cookies

---

## 🔄 Updates

This guide covers version 1.0 of the Super Admin dashboard.

**Recent Updates:**
- ✅ User impersonation
- ✅ Password reset
- ✅ Role management
- ✅ Newsletter control
- ✅ System statistics

---

**Last Updated:** 2025-10-21