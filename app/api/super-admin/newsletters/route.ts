import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getAllNewsletters, isSuperAdmin } from '@/lib/super-admin';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isSuper = await isSuperAdmin(user.userId);
    if (!isSuper) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const newsletters = await getAllNewsletters();

    return NextResponse.json(newsletters);
  } catch (error) {
    console.error('Get newsletters error:', error);
    return NextResponse.json(
      { error: 'Failed to get newsletters' },
      { status: 500 }
    );
  }
}