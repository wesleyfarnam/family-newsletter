import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getAllUsers, isSuperAdmin } from '@/lib/super-admin';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is super admin
    const isSuper = await isSuperAdmin(user.userId);
    if (!isSuper) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const users = await getAllUsers();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to get users' },
      { status: 500 }
    );
  }
}