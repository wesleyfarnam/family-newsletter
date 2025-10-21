import { prisma } from './db/prisma';

// Add user to newsletter as member
export async function addNewsletterMember(
  newsletterId: string,
  userId: string,
  role: 'CONTRIBUTOR' | 'RECIPIENT'
) {
  // Check if already a member
  const existing = await prisma.newsletterMember.findUnique({
    where: {
      userId_newsletterId: {
        userId,
        newsletterId,
      },
    },
  });

  if (existing) {
    return existing;
  }

  return await prisma.newsletterMember.create({
    data: {
      userId,
      newsletterId,
      role,
    },
  });
}

// Remove user from newsletter
export async function removeNewsletterMember(newsletterId: string, userId: string) {
  return await prisma.newsletterMember.delete({
    where: {
      userId_newsletterId: {
        userId,
        newsletterId,
      },
    },
  });
}

// Get user's newsletters
export async function getUserNewsletters(userId: string) {
  const memberships = await prisma.newsletterMember.findMany({
    where: { userId },
    include: {
      newsletter: {
        include: {
          admin: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          _count: {
            select: {
              members: true,
              editions: true,
            },
          },
        },
      },
    },
  });

  return memberships.map(m => ({
    ...m.newsletter,
    memberRole: m.role,
    joinedAt: m.joinedAt,
  }));
}

// Get newsletter members
export async function getNewsletterMembers(newsletterId: string) {
  return await prisma.newsletterMember.findMany({
    where: { newsletterId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
    orderBy: {
      joinedAt: 'desc',
    },
  });
}

// Check if user is member of newsletter
export async function isNewsletterMember(newsletterId: string, userId: string) {
  const member = await prisma.newsletterMember.findUnique({
    where: {
      userId_newsletterId: {
        userId,
        newsletterId,
      },
    },
  });

  return !!member;
}

// Update member role
export async function updateMemberRole(
  newsletterId: string,
  userId: string,
  role: 'CONTRIBUTOR' | 'RECIPIENT'
) {
  return await prisma.newsletterMember.update({
    where: {
      userId_newsletterId: {
        userId,
        newsletterId,
      },
    },
    data: { role },
  });
}