import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser } from '@/lib/auth'
import { sendEmail, generateNewsletterEmail } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    const { id } = await params

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get edition with all responses
        const edition = await prisma.newsletterEdition.findUnique({
      where: { id: editionId },
      include: {
        newsletter: {
          include: {
            members: {
              include: {
                user: true
              }
            },
            questionnaires: {
              include: {
                responses: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        email: true
                      }
                    },
                    media: true
                  }
                }
              }
            }
          }
        }
      }
    })


    if (!edition) {
      return NextResponse.json(
        { error: 'Edition not found' },
        { status: 404 }
      )
    }

    if (edition.newsletter.adminId !== currentUser.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get all USER2 (recipients)
    const recipients = await prisma.user.findMany({
      where: { role: 'USER2' }
    })

    // Generate newsletter HTML
    const newsletterHtml = generateNewsletterEmail(edition, edition.responses, edition.newsletter)

    // Send emails to all recipients
    for (const recipient of recipients) {
      await sendEmail(
        recipient.email,
        `${edition.newsletter.title} - Edition #${edition.editionNumber}`,
        newsletterHtml
      )
    }

    // Update edition status
    await prisma.newsletterEdition.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      recipientCount: recipients.length
    })
  } catch (error) {
    console.error('Send edition error:', error)
    return NextResponse.json(
      { error: 'Failed to send edition' },
      { status: 500 }
    )
  }
}
