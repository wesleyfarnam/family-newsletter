import { prisma } from './db/prisma';
import { sendAdminReminder, sendContributorReminder } from './email';

// Create a notification
export async function createNotification(data: {
  type: 'ADMIN_REMINDER' | 'CONTRIBUTOR_REMINDER' | 'EDITION_READY' | 'INVITATION' | 'PASSWORD_RESET' | 'SYSTEM';
  senderId?: string;
  receiverId: string;
  newsletterId?: string;
  subject: string;
  message: string;
  scheduledFor?: Date;
}) {
  return await prisma.notification.create({
    data: {
      type: data.type,
      senderId: data.senderId,
      receiverId: data.receiverId,
      newsletterId: data.newsletterId,
      subject: data.subject,
      message: data.message,
      scheduledFor: data.scheduledFor,
      status: 'PENDING',
    },
  });
}

// Send pending notifications
export async function sendPendingNotifications() {
  const now = new Date();
  
  const pendingNotifications = await prisma.notification.findMany({
    where: {
      status: 'PENDING',
      OR: [
        { scheduledFor: null },
        { scheduledFor: { lte: now } },
      ],
    },
    include: {
      receiver: true,
      newsletter: true,
    },
  });

  const results = [];

  for (const notification of pendingNotifications) {
    try {
      let success = false;

      switch (notification.type) {
        case 'ADMIN_REMINDER':
          if (notification.newsletter) {
            const daysSince = notification.newsletter.lastEditionSentAt
              ? Math.floor((now.getTime() - notification.newsletter.lastEditionSentAt.getTime()) / (1000 * 60 * 60 * 24))
              : 14;
            
            success = await sendAdminReminder(
              notification.receiver.email,
              notification.receiver.name || 'Admin',
              notification.newsletter.title,
              daysSince
            );
          }
          break;

        case 'CONTRIBUTOR_REMINDER':
          // Will be implemented with questionnaire due dates
          success = true;
          break;

        default:
          success = true;
      }

      if (success) {
        await prisma.notification.update({
          where: { id: notification.id },
          data: {
            status: 'SENT',
            sentAt: now,
          },
        });
        results.push({ id: notification.id, status: 'sent' });
      } else {
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: 'FAILED' },
        });
        results.push({ id: notification.id, status: 'failed' });
      }
    } catch (error) {
      console.error(`Failed to send notification ${notification.id}:`, error);
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'FAILED' },
      });
      results.push({ id: notification.id, status: 'failed', error });
    }
  }

  return results;
}

// Check and create admin reminders for newsletters
export async function checkAdminReminders() {
  const now = new Date();
  
  // Get all active newsletters
  const newsletters = await prisma.newsletter.findMany({
    where: {
      status: 'ACTIVE',
      reminderEnabled: true,
    },
    include: {
      admin: true,
    },
  });

  const reminders = [];

  for (const newsletter of newsletters) {
    // Check if reminder is needed
    const daysSinceLastEdition = newsletter.lastEditionSentAt
      ? Math.floor((now.getTime() - newsletter.lastEditionSentAt.getTime()) / (1000 * 60 * 60 * 24))
      : newsletter.reminderDays;

    if (daysSinceLastEdition >= newsletter.reminderDays) {
      // Check if reminder already sent recently (within last 7 days)
      const recentReminder = await prisma.notification.findFirst({
        where: {
          type: 'ADMIN_REMINDER',
          receiverId: newsletter.adminId,
          newsletterId: newsletter.id,
          createdAt: {
            gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      });

      if (!recentReminder) {
        // Create reminder notification
        const notification = await createNotification({
          type: 'ADMIN_REMINDER',
          receiverId: newsletter.adminId,
          newsletterId: newsletter.id,
          subject: `Time to create a new edition - ${newsletter.title}`,
          message: `It's been ${daysSinceLastEdition} days since the last edition of ${newsletter.title} was sent.`,
        });

        reminders.push(notification);
      }
    }
  }

  return reminders;
}

// Check and create contributor reminders
export async function checkContributorReminders() {
  const now = new Date();
  
  // Get all active questionnaires with due dates
  const questionnaires = await prisma.questionnaire.findMany({
    where: {
      isActive: true,
      dueDate: {
        gte: now,
        lte: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Due within 3 days
      },
    },
    include: {
      newsletter: {
        include: {
          members: {
            where: {
              role: 'CONTRIBUTOR',
            },
            include: {
              user: true,
            },
          },
        },
      },
      responses: true,
    },
  });

  const reminders = [];

  for (const questionnaire of questionnaires) {
    // Get contributors who haven't responded
    const respondedUserIds = questionnaire.responses.map(r => r.userId);
    const pendingContributors = questionnaire.newsletter.members.filter(
      m => !respondedUserIds.includes(m.userId) && m.user.emailNotifications
    );

    for (const member of pendingContributors) {
      // Check if reminder already sent recently
      const recentReminder = await prisma.notification.findFirst({
        where: {
          type: 'CONTRIBUTOR_REMINDER',
          receiverId: member.userId,
          newsletterId: questionnaire.newsletterId,
          createdAt: {
            gte: new Date(now.getTime() - member.user.reminderFrequency * 24 * 60 * 60 * 1000),
          },
        },
      });

      if (!recentReminder && questionnaire.dueDate) {
        const daysUntilDue = Math.ceil((questionnaire.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDue <= member.user.reminderFrequency) {
          // Create reminder notification
          const notification = await createNotification({
            type: 'CONTRIBUTOR_REMINDER',
            receiverId: member.userId,
            newsletterId: questionnaire.newsletterId,
            subject: `Reminder: ${questionnaire.title} - ${questionnaire.newsletter.title}`,
            message: `Your response to "${questionnaire.title}" is due in ${daysUntilDue} day(s).`,
          });

          reminders.push(notification);
        }
      }
    }
  }

  return reminders;
}

// Get user notifications
export async function getUserNotifications(userId: string, limit = 50) {
  return await prisma.notification.findMany({
    where: { receiverId: userId },
    include: {
      sender: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      newsletter: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

// Mark notification as read
export async function markNotificationRead(notificationId: string) {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { readAt: new Date() },
  });
}

// Delete notification
export async function deleteNotification(notificationId: string) {
  return await prisma.notification.delete({
    where: { id: notificationId },
  });
}