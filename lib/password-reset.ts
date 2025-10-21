import crypto from 'crypto';
import { prisma } from './db/prisma';

// Generate a secure random token
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Create password reset token for user
export async function createPasswordResetToken(email: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const resetToken = generateResetToken();
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  return resetToken;
}

// Verify reset token and return user
export async function verifyResetToken(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(), // Token hasn't expired
      },
    },
  });

  return user;
}

// Reset password using token
export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const user = await verifyResetToken(token);

  if (!user) {
    return false;
  }

  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return true;
}

// Clear reset token (e.g., after successful reset or on user request)
export async function clearResetToken(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
}