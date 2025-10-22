\import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser } from '@/lib/auth'
import { sendEmail } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: editionId } = await params

    // Get edition with all related data
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
      return NextResponse.json({ error: 'Edition not found' }, { status: 404 })
    }

    // Check if user is admin
    if (edition.newsletter.adminId !== currentUser.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get all recipients (members + admin)
    const recipients = edition.newsletter.members
      .map(member => member.user.email)
      .filter(email => email)

    // Send emails to all recipients
    const emailPromises = recipients.map(email =>
      sendEmail(
        email,
        `${edition.newsletter.name}: ${edition.title}`,
        edition.content
      )
    )

    await Promise.all(emailPromises)

    // Update edition as published
    await prisma.newsletterEdition.update({
      where: { id: editionId },
      data: {
        publishedAt: new Date()
      }
    })

    // Update newsletter last sent date
    await prisma.newsletter.update({
      where: { id: edition.newsletter.id },
      data: {
        lastEditionSentAt: new Date()
      }
    })

    return NextResponse.json({
      message: 'Newsletter sent successfully',
      recipientCount: recipients.length
    })
  } catch (error) {
    console.error('Send newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    )
  }
}
