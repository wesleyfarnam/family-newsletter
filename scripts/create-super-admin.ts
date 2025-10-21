import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createSuperAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Super Admin';

  if (!email || !password) {
    console.error('Usage: npm run create-super-admin <email> <password> [name]');
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Update existing user to super admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: 'SUPER_ADMIN',
          name,
        },
      });

      console.log('✅ User updated to Super Admin:');
      console.log('Email:', updatedUser.email);
      console.log('Name:', updatedUser.name);
      console.log('Role:', updatedUser.role);
    } else {
      // Create new super admin user
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'SUPER_ADMIN',
        },
      });

      console.log('✅ Super Admin created successfully:');
      console.log('Email:', user.email);
      console.log('Name:', user.name);
      console.log('Role:', user.role);
    }

    console.log('\n🔐 You can now login at: /login');
    console.log('📊 Access Super Admin Dashboard at: /super-admin');
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();