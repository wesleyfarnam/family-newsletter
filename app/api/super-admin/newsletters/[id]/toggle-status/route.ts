import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { isSuperAdmin, toggleNewsletterStatus } from '@/lib/super-admin';

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

    const newStatus = await toggleNewsletterStatus(user.userId, (await params).id);

    return NextResponse.json({
      message: 'Newsletter status updated',
      status: newStatus,
    });
  } catch (error: any) {
    console.error('Toggle newsletter status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to toggle newsletter status' },
      { status: 500 }
    );
  }
}