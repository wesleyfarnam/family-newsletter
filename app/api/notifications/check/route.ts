import { NextRequest, NextResponse } from 'next/server';
import { checkAdminReminders, checkContributorReminders, sendPendingNotifications } from '@/lib/notifications';

// This endpoint can be called by a cron job or manually
export async function POST(request: NextRequest) {
  try {
    // Check authorization (optional - add API key check here)
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.CRON_API_KEY || 'your-secret-cron-key';
    
    if (authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check for admin reminders
    const adminReminders = await checkAdminReminders();
    
    // Check for contributor reminders
    const contributorReminders = await checkContributorReminders();
    
    // Send all pending notifications
    const sentNotifications = await sendPendingNotifications();

    return NextResponse.json({
      message: 'Notifications checked and sent',
      adminReminders: adminReminders.length,
      contributorReminders: contributorReminders.length,
      sentNotifications: sentNotifications.length,
      results: sentNotifications,
    });
  } catch (error) {
    console.error('Check notifications error:', error);
    return NextResponse.json(
      { error: 'Failed to check notifications' },
      { status: 500 }
    );
  }
}

// Manual trigger (for testing)
export async function GET(request: NextRequest) {
  try {
    const adminReminders = await checkAdminReminders();
    const contributorReminders = await checkContributorReminders();
    const sentNotifications = await sendPendingNotifications();

    return NextResponse.json({
      message: 'Notifications checked and sent',
      adminReminders: adminReminders.length,
      contributorReminders: contributorReminders.length,
      sentNotifications: sentNotifications.length,
    });
  } catch (error) {
    console.error('Check notifications error:', error);
    return NextResponse.json(
      { error: 'Failed to check notifications' },
      { status: 500 }
    );
  }
}