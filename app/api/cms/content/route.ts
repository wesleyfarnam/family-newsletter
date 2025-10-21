import { NextRequest, NextResponse } from 'next/server';
import { getAllContent, getContentByType, createContent } from '@/lib/cms';
import { verifyAuth } from '@/lib/auth';
import { isSuperAdmin } from '@/lib/super-admin';

// Get content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type) {
      const content = await getContentByType(type as any);
      return NextResponse.json(content);
    }

    const content = await getAllContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Get content error:', error);
    return NextResponse.json(
      { error: 'Failed to get content' },
      { status: 500 }
    );
  }
}

// Create content (super admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isSuper = await isSuperAdmin(user.userId);
    if (!isSuper) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const content = await createContent(data);

    return NextResponse.json(content);
  } catch (error) {
    console.error('Create content error:', error);
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}