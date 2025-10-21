import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { isSuperAdmin, impersonateUser } from '@/lib/super-admin';

export async function POST(
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

    const { token, user: targetUser } = await impersonateUser(user.userId, (await params).id);

    // Set the impersonation token as a cookie
    const response = NextResponse.json({
      message: 'Impersonation successful',
      user: targetUser,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error('Impersonate user error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to impersonate user' },
      { status: 500 }
    );
  }
}