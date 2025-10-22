/**
 * Generate a unique text-based ID for database records
 * Format: prefix_timestamp_random
 * Example: user_1234567890_abc123xyz
 */
export function generateId(prefix: string = 'id'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `${prefix}_${timestamp}_${random}`
}

// Convenience functions for specific models
export const generateUserId = () => generateId('user')
export const generateNewsletterId = () => generateId('newsletter')
export const generateQuestionnaireId = () => generateId('questionnaire')
export const generateEditionId = () => generateId('edition')
export const generateResponseId = () => generateId('response')
export const generateMediaId = () => generateId('media')
export const generateInvitationId = () => generateId('invitation')
export const generateNotificationId = () => generateId('notification')
export const generateMemberId = () => generateId('member')