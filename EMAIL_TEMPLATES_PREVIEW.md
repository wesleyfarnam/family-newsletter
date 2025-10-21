# Email Templates - Complete Preview

## 📧 Current Email System Status

**⚠️ IMPORTANT**: All emails are currently **MOCK** (logged to console only)

To see emails during development:
1. Check the terminal where `npm run dev` is running
2. Look for `=== EMAIL SENT ===` messages
3. Copy invitation URLs from the email content

---

## ✅ Implemented Email Templates

### 1. Invitation Email

**Trigger**: When admin or contributor invites a new user  
**Recipients**: New users (Contributors or Recipients)  
**File**: `lib/email.ts` - `generateInvitationEmail()`

#### Preview:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
    .content { background: #f9fafb; padding: 30px; }
    .button { 
      display: inline-block; 
      background: #0ea5e9; 
      color: white; 
      padding: 12px 30px; 
      text-decoration: none; 
      border-radius: 5px; 
      margin: 20px 0; 
    }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📰 Family Newsletter Invitation</h1>
    </div>
    <div class="content">
      <h2>You've been invited!</h2>
      <p>John Smith has invited you to join their Family Newsletter as a contributor.</p>
      <p>As a contributor, you'll be able to share updates, answer questions, and upload photos/videos for the family newsletter.</p>
      <p>Click the button below to accept the invitation:</p>
      <a href="[INVITATION_URL]" class="button">Accept Invitation</a>
      <p>Or copy this link: [INVITATION_URL]</p>
    </div>
    <div class="footer">
      <p>This invitation will expire in 7 days.</p>
    </div>
  </div>
</body>
</html>
```

**Variables**:
- `{inviterName}` - Person who sent invitation
- `{role}` - USER1 (contributor) or USER2 (recipient)
- `{acceptUrl}` - Unique invitation acceptance URL

---

### 2. Newsletter Edition Email

**Trigger**: When admin sends a newsletter edition  
**Recipients**: All recipients (USER2)  
**File**: `lib/email.ts` - `generateNewsletterEmail()`

#### Preview:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      background-color: #f0f9ff; 
    }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { 
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); 
      color: white; 
      padding: 40px; 
      text-align: center; 
      border-radius: 8px 8px 0 0;
    }
    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
    .response { 
      border-left: 4px solid #0ea5e9; 
      padding-left: 20px; 
      margin: 30px 0; 
      background: #f0f9ff;
      padding: 20px;
      border-radius: 4px;
    }
    .response-header { 
      font-weight: bold; 
      color: #0ea5e9; 
      margin-bottom: 10px; 
      font-size: 18px;
    }
    .question { font-weight: bold; margin-top: 15px; color: #0c4a6e; }
    .answer { margin-left: 20px; color: #555; margin-top: 5px; }
    .special-question {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 8px;
      border: 2px solid #0ea5e9;
      margin-bottom: 30px;
    }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📰 Smith Family Newsletter</h1>
      <p>Monthly Edition #12 • December 2024</p>
    </div>
    <div class="content">
      <div class="special-question">
        <h2>✨ Special Question</h2>
        <p>What are you most grateful for this year?</p>
      </div>
      
      <!-- Response 1 -->
      <div class="response">
        <div class="response-header">John Smith</div>
        <div class="question">Q: Family Trips & Adventures</div>
        <div class="answer">A: We took an amazing road trip to Yellowstone...</div>
        
        <div class="question">Q: Job & Career Updates</div>
        <div class="answer">A: Got promoted to Senior Director!</div>
        
        <div class="question">Special Question:</div>
        <div class="answer">I'm grateful for my family's health and happiness.</div>
      </div>
      
      <!-- Response 2 -->
      <div class="response">
        <div class="response-header">Sarah Johnson</div>
        <div class="question">Q: Family Trips & Adventures</div>
        <div class="answer">A: Beach vacation in North Carolina...</div>
      </div>
      
      <!-- More responses... -->
    </div>
    <div class="footer">
      <p>Sent with ❤️ from Smith Family Newsletter</p>
    </div>
  </div>
</body>
</html>
```

**Variables**:
- `{newsletterTitle}` - Newsletter name
- `{editionNumber}` - Edition number
- `{specialQuestion}` - Optional special question
- `{responses}` - Array of contributor responses
- `{colorScheme}` - Selected color scheme

---

## ❌ Email Templates NOT Implemented

### 3. Registration Confirmation Email

**Trigger**: After user completes registration  
**Recipients**: New admin users  
**Status**: ❌ Not implemented

#### Proposed Template:

```html
Subject: Welcome to Family Newsletter!

Body:
- Welcome message
- Account confirmation
- Quick start guide
- Login link
- Support information
```

**Would need**:
```typescript
export function generateWelcomeEmail(userName: string, loginUrl: string): string {
  return `
    <h1>Welcome to Family Newsletter, ${userName}!</h1>
    <p>Your account has been created successfully.</p>
    <p>Get started by creating your first newsletter...</p>
    <a href="${loginUrl}">Login to Dashboard</a>
  `
}
```

---

### 4. Password Reset Email

**Trigger**: User requests password reset  
**Recipients**: User who requested reset  
**Status**: ❌ Not implemented

#### Proposed Template:

```html
Subject: Reset Your Password - Family Newsletter

Body:
- Password reset request confirmation
- Reset link (expires in 1 hour)
- Security notice
- Ignore if not requested
```

**Would need**:
```typescript
export function generatePasswordResetEmail(resetToken: string): string {
  const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}`
  return `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link expires in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `
}
```

---

### 5. Questionnaire Reminder Email

**Trigger**: X days before edition deadline  
**Recipients**: Contributors who haven't responded  
**Status**: ❌ Not implemented

#### Proposed Template:

```html
Subject: Reminder: Submit Your Newsletter Response

Body:
- Friendly reminder
- Deadline date
- Quick preview of questions
- Submit button
- Opt-out link
```

**Would need**:
```typescript
export function generateReminderEmail(
  contributorName: string,
  newsletterTitle: string,
  deadline: Date,
  questionnaireUrl: string
): string {
  return `
    <h1>Hi ${contributorName}!</h1>
    <p>Just a friendly reminder to submit your response for ${newsletterTitle}.</p>
    <p><strong>Deadline:</strong> ${deadline.toLocaleDateString()}</p>
    <a href="${questionnaireUrl}">Submit Your Response</a>
  `
}
```

---

### 6. Admin Notification Email

**Trigger**: 2 weeks before scheduled send  
**Recipients**: Newsletter admin  
**Status**: ❌ Not implemented

#### Proposed Template:

```html
Subject: Time to Prepare Edition #X - Smith Family Newsletter

Body:
- Edition reminder
- Current response count
- Select special question
- Review responses link
- Schedule confirmation
```

**Would need**:
```typescript
export function generateAdminNotificationEmail(
  newsletterTitle: string,
  editionNumber: number,
  responseCount: number,
  totalContributors: number,
  reviewUrl: string
): string {
  return `
    <h1>Edition #${editionNumber} Reminder</h1>
    <p>Your ${newsletterTitle} is scheduled to send in 2 weeks.</p>
    <p><strong>Responses:</strong> ${responseCount} of ${totalContributors}</p>
    <a href="${reviewUrl}">Review & Select Special Question</a>
  `
}
```

---

### 7. Response Confirmation Email

**Trigger**: After contributor submits response  
**Recipients**: Contributor who submitted  
**Status**: ❌ Not implemented

#### Proposed Template:

```html
Subject: Response Received - Thank You!

Body:
- Thank you message
- Confirmation of submission
- Edit link (if allowed)
- Next edition date
```

---

## 🔧 How to Enable Real Email Sending

### Step 1: Choose Email Service

**Recommended: SendGrid** (Free tier: 100 emails/day)

```bash
npm install @sendgrid/mail
```

### Step 2: Update `lib/email.ts`

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendEmail(to: string, subject: string, html: string) {
  // Remove console.log mock
  // Add real sending:
  
  const msg = {
    to,
    from: process.env.EMAIL_FROM || 'noreply@familynewsletter.com',
    subject,
    html,
  }
  
  try {
    await sgMail.send(msg)
    console.log(`✅ Email sent to ${to}`)
    return { success: true }
  } catch (error) {
    console.error('❌ Email send failed:', error)
    return { success: false, error }
  }
}
```

### Step 3: Add Environment Variables

Create `.env.local`:
```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
EMAIL_FROM=noreply@yourfamilynewsletter.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Step 4: Verify Domain (Production)

For production, verify your sending domain with SendGrid to avoid spam filters.

---

## 📊 Email Sending Summary

| Email Type | Status | Trigger | Recipients | Priority |
|------------|--------|---------|------------|----------|
| Invitation | ✅ Implemented | User invited | New users | High |
| Newsletter | ✅ Implemented | Edition sent | Recipients | High |
| Welcome | ❌ Not implemented | Registration | New admins | Medium |
| Password Reset | ❌ Not implemented | Reset request | User | High |
| Reminder | ❌ Not implemented | Before deadline | Contributors | Medium |
| Admin Notification | ❌ Not implemented | 2 weeks before | Admin | Medium |
| Response Confirmation | ❌ Not implemented | Response submitted | Contributor | Low |

---

## 🎯 Testing Emails

### Current (Mock) System
1. Run `npm run dev`
2. Trigger email action (invite user, send newsletter)
3. Check terminal for `=== EMAIL SENT ===`
4. Copy URLs from console output

### With Real Email Service
1. Set up SendGrid account
2. Add API key to `.env.local`
3. Test with your own email first
4. Check spam folder initially
5. Verify domain for production

---

## 💡 Best Practices

### Email Design
- ✅ Mobile responsive
- ✅ Plain text fallback
- ✅ Clear call-to-action buttons
- ✅ Unsubscribe link (for newsletters)
- ✅ Sender verification

### Email Delivery
- Use verified sending domain
- Include plain text version
- Avoid spam trigger words
- Test across email clients
- Monitor bounce rates

### Email Content
- Personalize with user name
- Keep subject lines under 50 characters
- Use clear, actionable language
- Include preview text
- Test on mobile devices

---

## 🚀 Quick Implementation Guide

### To Add Real Email Sending (30 minutes)

1. **Sign up for SendGrid** (free tier)
2. **Get API key** from SendGrid dashboard
3. **Install package**: `npm install @sendgrid/mail`
4. **Update `lib/email.ts`** with code above
5. **Add `.env.local`** with API key
6. **Test** by inviting a user to your own email

### To Add New Email Template (15 minutes)

1. **Create function** in `lib/email.ts`
2. **Design HTML** template
3. **Add trigger** in appropriate API route
4. **Test** with mock first
5. **Deploy** with real service

---

## 📧 Sample Email Logs (Current System)

When you run the app, you'll see:

```
=== EMAIL SENT ===
To: contributor@example.com
Subject: You're invited to Family Newsletter!
Body: [Full HTML content here]
==================

=== EMAIL SENT ===
To: recipient@example.com
Subject: Smith Family Newsletter - Edition #1
Body: [Full HTML content here]
==================
```

---

## ✅ Conclusion

**Currently Working**:
- ✅ 2 email templates (Invitation, Newsletter)
- ✅ Mock email service (console logging)
- ✅ HTML email generation
- ✅ Color scheme integration

**Ready to Add**:
- 🔧 Real email service (30 min setup)
- 🔧 Additional templates (15 min each)
- 🔧 Scheduled notifications (requires cron)

**Recommendation**: Start with SendGrid integration to enable real email sending, then add additional templates as needed.