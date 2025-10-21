// Email service with SendGrid integration
// Falls back to mock service if SendGrid is not configured

// Import SendGrid service
import * as sendgridService from './email-sendgrid';

// Check if SendGrid is configured
const useSendGrid = !!process.env.SENDGRID_API_KEY;

// Mock email function for development
async function mockSendEmail(to: string, subject: string, html: string) {
  console.log('📧 [MOCK] Email would be sent:');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Body length:', html.length, 'characters');
  return { success: true };
}

// Main email sending function
export async function sendEmail(to: string, subject: string, html: string) {
  if (useSendGrid) {
    const success = await sendgridService.sendEmail({ to, subject, html });
    return { success };
  } else {
    return mockSendEmail(to, subject, html);
  }
}

// Export SendGrid functions with fallback
export const sendInvitationEmail = useSendGrid 
  ? sendgridService.sendInvitationEmail 
  : async (to: string, inviterName: string, newsletterName: string, inviteToken: string) => {
      console.log('📧 [MOCK] Invitation email:', { to, inviterName, newsletterName, inviteToken });
      return true;
    };

export const sendNewsletterEdition = useSendGrid
  ? sendgridService.sendNewsletterEdition
  : async (to: string, newsletterName: string, editionTitle: string, content: string) => {
      console.log('📧 [MOCK] Newsletter edition:', { to, newsletterName, editionTitle });
      return true;
    };

export const sendContributorReminder = useSendGrid
  ? sendgridService.sendContributorReminder
  : async (to: string, contributorName: string, newsletterName: string, questionnaireTitle: string, dueDate: string) => {
      console.log('📧 [MOCK] Contributor reminder:', { to, contributorName, newsletterName, questionnaireTitle, dueDate });
      return true;
    };

export const sendAdminReminder = useSendGrid
  ? sendgridService.sendAdminReminder
  : async (to: string, adminName: string, newsletterName: string, daysSinceLastEdition: number) => {
      console.log('📧 [MOCK] Admin reminder:', { to, adminName, newsletterName, daysSinceLastEdition });
      return true;
    };

export const sendPasswordResetEmail = useSendGrid
  ? sendgridService.sendPasswordResetEmail
  : async (to: string, resetToken: string) => {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;
      console.log('📧 [MOCK] Password reset email:');
      console.log('To:', to);
      console.log('Reset URL:', resetUrl);
      return true;
    };

export function generateInvitationEmail(inviterName: string, role: string, acceptUrl: string): string {
  const roleText = role === 'USER1' ? 'contributor' : 'recipient'
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 30px; }
        .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
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
          <p>${inviterName} has invited you to join their Family Newsletter as a ${roleText}.</p>
          ${role === 'USER1' ? 
            '<p>As a contributor, you\'ll be able to share updates, answer questions, and upload photos/videos for the family newsletter.</p>' :
            '<p>As a recipient, you\'ll receive the family newsletter with updates from all contributors.</p>'
          }
          <p>Click the button below to accept the invitation:</p>
          <a href="${acceptUrl}" class="button">Accept Invitation</a>
          <p>Or copy this link: ${acceptUrl}</p>
        </div>
        <div class="footer">
          <p>This invitation will expire in 7 days.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateNewsletterEmail(edition: any, responses: any[], newsletter?: any): string {
  // Get color scheme from newsletter or use default
  const colorScheme = newsletter?.colorScheme || 'ocean-blue'
  
  // Color scheme mappings
  const colorSchemes: Record<string, any> = {
    'ocean-blue': { primary: '#0ea5e9', secondary: '#0284c7', bg: '#f0f9ff', text: '#0c4a6e' },
    'forest-green': { primary: '#10b981', secondary: '#059669', bg: '#f0fdf4', text: '#064e3b' },
    'sunset-orange': { primary: '#f97316', secondary: '#ea580c', bg: '#fff7ed', text: '#7c2d12' },
    'royal-purple': { primary: '#a855f7', secondary: '#9333ea', bg: '#faf5ff', text: '#581c87' },
    'cherry-red': { primary: '#ef4444', secondary: '#dc2626', bg: '#fef2f2', text: '#7f1d1d' },
    'slate-gray': { primary: '#64748b', secondary: '#475569', bg: '#f8fafc', text: '#1e293b' },
    'golden-yellow': { primary: '#eab308', secondary: '#ca8a04', bg: '#fefce8', text: '#713f12' },
    'rose-pink': { primary: '#ec4899', secondary: '#db2777', bg: '#fdf2f8', text: '#831843' },
    'teal-aqua': { primary: '#14b8a6', secondary: '#0d9488', bg: '#f0fdfa', text: '#134e4a' },
    'classic-black': { primary: '#1f2937', secondary: '#111827', bg: '#ffffff', text: '#000000' }
  }
  
  const colors = colorSchemes[colorScheme] || colorSchemes['ocean-blue']
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: ${colors.bg}; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%); 
          color: white; 
          padding: 40px; 
          text-align: center; 
          border-radius: 8px 8px 0 0;
        }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .response { 
          border-left: 4px solid ${colors.primary}; 
          padding-left: 20px; 
          margin: 30px 0; 
          background: ${colors.bg};
          padding: 20px;
          border-radius: 4px;
        }
        .response-header { 
          font-weight: bold; 
          color: ${colors.primary}; 
          margin-bottom: 10px; 
          font-size: 18px;
        }
        .question { 
          font-weight: bold; 
          margin-top: 15px; 
          color: ${colors.text};
        }
        .answer { 
          margin-left: 20px; 
          color: #555; 
          margin-top: 5px;
        }
        .media { margin: 20px 0; }
        .media img { max-width: 100%; height: auto; border-radius: 8px; }
        .footer { 
          text-align: center; 
          padding: 20px; 
          color: #666; 
          font-size: 12px; 
        }
        .special-question {
          background: ${colors.bg};
          padding: 20px;
          border-radius: 8px;
          border: 2px solid ${colors.primary};
          margin-bottom: 30px;
        }
        .special-question h2 {
          color: ${colors.primary};
          margin: 0 0 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📰 ${newsletter?.title || 'Family Newsletter'}</h1>
          <p>Edition #${edition.editionNumber}</p>
        </div>
        <div class="content">
          ${edition.specialQuestion ? `
            <div class="special-question">
              <h2>✨ Special Question</h2>
              <p>${edition.specialQuestion}</p>
            </div>
          ` : ''}
          
          ${responses.map(response => `
            <div class="response">
              <div class="response-header">${response.user.name || response.user.email}</div>
              ${Object.entries(response.answers as any).map(([question, answer]) => `
                <div class="question">Q: ${question}</div>
                <div class="answer">A: ${answer}</div>
              `).join('')}
              
              ${response.specialAnswer ? `
                <div class="question">Special Question:</div>
                <div class="answer">${response.specialAnswer}</div>
              ` : ''}
              
              ${response.media && response.media.length > 0 ? `
                <div class="media">
                  <p><strong>Shared Media:</strong></p>
                  ${response.media.map((m: any) => 
                    m.mimetype.startsWith('image/') ? 
                      `<img src="${m.filepath}" alt="${m.filename}" />` :
                      `<p>📹 Video: ${m.filename}</p>`
                  ).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        <div class="footer">
          <p>Sent with ❤️ from ${newsletter?.title || 'Family Newsletter'}</p>
        </div>
      </div>
    </body>
    </html>
  `
}