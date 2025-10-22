import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { generateUserId, generateMemberId } from '@/lib/id-generator'

export async function POST(request: NextRequest) {
  try {
    const { token, name, password } = await request.json()

    // Validate input
    if (!token || !name) {
      return NextResponse.json(
        { error: 'Token and name are required' },
        { status: 400 }
      )
    }

    // Find invitation
    const invitation = await prisma.invitation.findUnique({
      where: { token }
    })

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invalid invitation token' },
        { status: 400 }
      )
    }

    if (invitation.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Invitation already used' },
        { status: 400 }
      )
    }

    if (new Date() > invitation.expiresAt) {
      return NextResponse.json(
        { error: 'Invitation expired' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: invitation.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password if provided (USER1 needs password, USER2 might not)
    const hashedPassword = password ? await hashPassword(password) : null

    // Create user
    const user = await prisma.user.create({
      data: {
        id: generateUserId(),
        email: invitation.email,
        password: hashedPassword,
        name,
        role: invitation.role,
        invitedBy: invitation.invitedBy
      }
    })

    // Update invitation status
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date()
      }
    })

    // Generate token
    const authToken = generateToken(user.id, user.email, user.role)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Accept invitation error:', error)
    return NextResponse.json(
      { error: 'Failed to accept invitation' },
      { status: 500 }
    )
  }
}