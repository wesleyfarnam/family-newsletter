import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { isSuperAdmin, deleteUser, updateUserRole, resetUserPassword } from '@/lib/super-admin';

// Update user role
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { params } = context;
    const user = await verifyAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isSuper = await isSuperAdmin(user.userId);
    if (!isSuper) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { role } = await request.json();

    if (!role || !['ADMIN', 'USER1', 'USER2'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    await updateUserRole(user.userId, (await params).id, role);

    return NextResponse.json({ message: 'User role updated successfully' });
  } catch (error: any) {
    console.error('Update user role error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update user role' },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { params } = context;
    const user = await verifyAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isSuper = await isSuperAdmin(user.userId);
    if (!isSuper) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await deleteUser(user.userId, (await params).id);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete user' },
      { status: 500 }
    );
  }
}