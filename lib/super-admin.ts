import { prisma } from './db/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Check if user is super admin
export async function isSuperAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === 'SUPER_ADMIN';
}

// Get all users with their stats
export async function getAllUsers() {
  const users = await prisma.user.findMany({
    include: {
      adminNewsletters: {
        select: {
          id: true,
          title: true,
          status: true,
        },
      },
      memberNewsletters: {
        include: {
          newsletter: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      responses: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          responses: true,
          uploadedMedia: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
}

// Get system statistics
export async function getSystemStats() {
  const [
    totalUsers,
    totalNewsletters,
    totalEditions,
    totalResponses,
    activeNewsletters,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.newsletter.count(),
    prisma.newsletterEdition.count(),
    prisma.response.count(),
    prisma.newsletter.count({
      where: { status: 'ACTIVE' },
    }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    }),
  ]);

  // Get role distribution
  const roleDistribution = await prisma.user.groupBy({
    by: ['role'],
    _count: true,
  });

  return {
    totalUsers,
    totalNewsletters,
    totalEditions,
    totalResponses,
    activeNewsletters,
    recentUsers,
    roleDistribution,
  };
}

// Impersonate user (login as user)
export async function impersonateUser(superAdminId: string, targetUserId: string) {
  // Verify super admin
  const isSuperAdm = await isSuperAdmin(superAdminId);
  if (!isSuperAdm) {
    throw new Error('Unauthorized');
  }

  // Get target user
  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate token for target user
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token, user };
}

// Reset user password (super admin)
export async function resetUserPassword(
  superAdminId: string,
  targetUserId: string,
  newPassword: string
) {
  // Verify super admin
  const isSuperAdm = await isSuperAdmin(superAdminId);
  if (!isSuperAdm) {
    throw new Error('Unauthorized');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password
  await prisma.user.update({
    where: { id: targetUserId },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return true;
}

// Update user role
export async function updateUserRole(
  superAdminId: string,
  targetUserId: string,
  newRole: 'ADMIN' | 'USER1' | 'USER2'
) {
  // Verify super admin
  const isSuperAdm = await isSuperAdmin(superAdminId);
  if (!isSuperAdm) {
    throw new Error('Unauthorized');
  }

  // Don't allow changing super admin role
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { role: true },
  });

  if (targetUser?.role === 'SUPER_ADMIN') {
    throw new Error('Cannot change super admin role');
  }

  // Update role
  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: newRole },
  });

  return true;
}

// Delete user
export async function deleteUser(superAdminId: string, targetUserId: string) {
  // Verify super admin
  const isSuperAdm = await isSuperAdmin(superAdminId);
  if (!isSuperAdm) {
    throw new Error('Unauthorized');
  }

  // Don't allow deleting super admin
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { role: true },
  });

  if (targetUser?.role === 'SUPER_ADMIN') {
    throw new Error('Cannot delete super admin');
  }

  // Delete user (cascade will handle related records)
  await prisma.user.delete({
    where: { id: targetUserId },
  });

  return true;
}

// Get all newsletters with details
export async function getAllNewsletters() {
  const newsletters = await prisma.newsletter.findMany({
    include: {
      admin: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          editions: true,
          questionnaires: true,
          members: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return newsletters;
}

// Toggle newsletter status
export async function toggleNewsletterStatus(
  superAdminId: string,
  newsletterId: string
) {
  // Verify super admin
  const isSuperAdm = await isSuperAdmin(superAdminId);
  if (!isSuperAdm) {
    throw new Error('Unauthorized');
  }

  const newsletter = await prisma.newsletter.findUnique({
    where: { id: newsletterId },
    select: { status: true },
  });

  if (!newsletter) {
    throw new Error('Newsletter not found');
  }

  const newStatus = newsletter.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';

  await prisma.newsletter.update({
    where: { id: newsletterId },
    data: { status: newStatus },
  });

  return newStatus;
}