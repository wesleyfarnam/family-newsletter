import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser, generateInvitationToken } from '@/lib/auth'
import { sendEmail, generateInvitationEmail } from '@/lib/email'
import { generateInvitationId } from '@/lib/id-generator'

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { email, role, newsletterId } = await request.json()

    // Validate input
    if (!email || !role || !newsletterId) {
      return NextResponse.json(
        { error: 'Email, role, and newsletter ID are required' },
        { status: 400 }
      )
    }

    // Validate role
    if (!['USER1', 'USER2'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Check if invitation already exists
    const existingInvitation = await prisma.invitation.findFirst({
      where: {
        email,
        acceptedAt: null
      }
    })

    if (existingInvitation) {
      return NextResponse.json(
        { error: 'Invitation already sent' },
        { status: 400 }
      )
    }

    // Generate invitation token
    const token = generateInvitationToken()

    // Create invitation
    const invitation = await prisma.invitation.create({
      data: {
        id: generateInvitationId(),
        email,
        newsletterId,
        role,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    })

    // Get inviter details
    const inviter = await prisma.user.findUnique({
      where: { id: currentUser.userId }
    })

    // Send invitation email
    const acceptUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/accept-invitation?token=${token}`
    const emailHtml = generateInvitationEmail(inviter?.name || inviter?.email || 'Someone', role, acceptUrl)
    
    await sendEmail(email, 'You\'re invited to Family Newsletter!', emailHtml)

    return NextResponse.json({
      invitation: {
        id: invitation.id,
        email: invitation.email,
        role: invitation.role,
        expiresAt: invitation.expiresAt
      }
    })
  } catch (error) {
    console.error('Send invitation error:', error)
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    )
  }
}