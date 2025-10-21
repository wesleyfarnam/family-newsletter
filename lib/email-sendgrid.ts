import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com';
const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Family Newsletter';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
  try {
    // Check if API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return false;
    }

    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent successfully to ${to}`);
    return true;
  } catch (error: any) {
    console.error('❌ SendGrid error:', error.response?.body || error.message);
    return false;
  }
}

// Send invitation email
export async function sendInvitationEmail(
  to: string,
  inviterName: string,
  newsletterName: string,
  inviteToken: string
): Promise<boolean> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const acceptUrl = `${appUrl}/accept-invite?token=${inviteToken}`;

  const subject = `You're invited to join ${newsletterName}!`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 You're Invited!</h1>
        </div>
        <div class="content">
          <p>Hi there!</p>
          <p><strong>${inviterName}</strong> has invited you to join <strong>${newsletterName}</strong>.</p>
          <p>Click the button below to accept the invitation and start contributing to the family newsletter:</p>
          <p style="text-align: center;">
            <a href="${acceptUrl}" class="button">Accept Invitation</a>
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            Or copy and paste this link into your browser:<br>
            <a href="${acceptUrl}">${acceptUrl}</a>
          </p>
        </div>
        <div class="footer">
          <p>This invitation was sent by ${newsletterName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

// Send newsletter edition
export async function sendNewsletterEdition(
  to: string,
  newsletterName: string,
  editionTitle: string,
  content: string
): Promise<boolean> {
  const subject = `${newsletterName} - ${editionTitle}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${newsletterName}</h1>
          <p style="margin: 0; opacity: 0.9;">${editionTitle}</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>You're receiving this because you're a member of ${newsletterName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

// Send reminder email to contributors
export async function sendContributorReminder(
  to: string,
  contributorName: string,
  newsletterName: string,
  questionnaireTitle: string,
  dueDate: string
): Promise<boolean> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const dashboardUrl = `${appUrl}/dashboard`;

  const subject = `Reminder: ${questionnaireTitle} - ${newsletterName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #F59E0B; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #F59E0B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .due-date { background: #FEF3C7; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏰ Friendly Reminder</h1>
        </div>
        <div class="content">
          <p>Hi ${contributorName}!</p>
          <p>This is a friendly reminder that your response to <strong>${questionnaireTitle}</strong> for <strong>${newsletterName}</strong> is due soon.</p>
          <div class="due-date">
            <strong>📅 Due Date:</strong> ${dueDate}
          </div>
          <p>Click the button below to submit your response:</p>
          <p style="text-align: center;">
            <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
          </p>
        </div>
        <div class="footer">
          <p>This reminder was sent by ${newsletterName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

// Send admin reminder email
export async function sendAdminReminder(
  to: string,
  adminName: string,
  newsletterName: string,
  daysSinceLastEdition: number
): Promise<boolean> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const dashboardUrl = `${appUrl}/admin/dashboard`;

  const subject = `Time to create a new edition - ${newsletterName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8B5CF6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .stats { background: #F3E8FF; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📰 Newsletter Reminder</h1>
        </div>
        <div class="content">
          <p>Hi ${adminName}!</p>
          <p>It's been <strong>${daysSinceLastEdition} days</strong> since the last edition of <strong>${newsletterName}</strong> was sent.</p>
          <div class="stats">
            <p style="margin: 0;"><strong>💡 Tip:</strong> Regular newsletters keep your family engaged and connected!</p>
          </div>
          <p>Ready to create a new edition?</p>
          <p style="text-align: center;">
            <a href="${dashboardUrl}" class="button">Go to Admin Dashboard</a>
          </p>
        </div>
        <div class="footer">
          <p>This reminder was sent by ${newsletterName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

// Send password reset email
export async function sendPasswordResetEmail(
  to: string,
  resetToken: string
): Promise<boolean> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

  const subject = 'Reset Your Password - My Family Newsletter';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #EF4444; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #EF4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .warning { background: #FEE2E2; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #EF4444; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset</h1>
        </div>
        <div class="content">
          <p>Hi there!</p>
          <p>We received a request to reset your password for My Family Newsletter.</p>
          <p>Click the button below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            Or copy and paste this link into your browser:<br>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <div class="warning">
            <p style="margin: 0;"><strong>⚠️ Security Notice:</strong></p>
            <p style="margin: 5px 0 0 0;">This link will expire in 1 hour. If you didn't request this reset, please ignore this email.</p>
          </div>
        </div>
        <div class="footer">
          <p>My Family Newsletter - Keeping families connected</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}