// Email service with SendGrid integration
// Falls back to mock service if SendGrid is not configured

// Import SendGrid service
import * as sendgridService from './email-sendgrid';

// Check if SendGrid is configured
const useSendGrid = !!process.env.SENDGRID_API_KEY;

// Mock email functions for development
async function mockSendInvitationEmail(
  to: string,
  inviterName: string,
  newsletterName: string,
  inviteToken: string
): Promise<boolean> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const acceptUrl = `${appUrl}/accept-invite?token=${inviteToken}`;
  
  console.log('📧 [MOCK] Invitation email would be sent:');
  console.log('To:', to);
  console.log('From:', inviterName);
  console.log('Newsletter:', newsletterName);
  console.log('Accept URL:', acceptUrl);
  return true;
}

async function mockSendNewsletterEdition(
  to: string,
  newsletterName: string,
  editionTitle: string,
  content: string
): Promise<boolean> {
  console.log('📧 [MOCK] Newsletter edition would be sent:');
  console.log('To:', to);
  console.log('Newsletter:', newsletterName);
  console.log('Edition:', editionTitle);
  console.log('Content length:', content.length, 'characters');
  return true;
}

async function mockSendContributorReminder(
  to: string,
  contributorName: string,
  newsletterName: string,
  questionnaireTitle: string,
  dueDate: string
): Promise<boolean> {
  console.log('📧 [MOCK] Contributor reminder would be sent:');
  console.log('To:', to);
  console.log('Contributor:', contributorName);
  console.log('Newsletter:', newsletterName);
  console.log('Questionnaire:', questionnaireTitle);
  console.log('Due Date:', dueDate);
  return true;
}

async function mockSendAdminReminder(
  to: string,
  adminName: string,
  newsletterName: string,
  daysSinceLastEdition: number
): Promise<boolean> {
  console.log('📧 [MOCK] Admin reminder would be sent:');
  console.log('To:', to);
  console.log('Admin:', adminName);
  console.log('Newsletter:', newsletterName);
  console.log('Days since last edition:', daysSinceLastEdition);
  return true;
}

// Export the appropriate functions based on configuration
export const sendInvitationEmail = useSendGrid 
  ? sendgridService.sendInvitationEmail 
  : mockSendInvitationEmail;

export const sendNewsletterEdition = useSendGrid
  ? sendgridService.sendNewsletterEdition
  : mockSendNewsletterEdition;

export const sendContributorReminder = useSendGrid
  ? sendgridService.sendContributorReminder
  : mockSendContributorReminder;

export const sendAdminReminder = useSendGrid
  ? sendgridService.sendAdminReminder
  : mockSendAdminReminder;