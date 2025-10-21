import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { title, frequency, emailTemplate, colorScheme } = await request.json()

    // Validate input
    if (!title || !frequency) {
      return NextResponse.json(
        { error: 'Title and frequency are required' },
        { status: 400 }
      )
    }

    // Create newsletter
    const newsletter = await prisma.newsletter.create({
      data: {
        adminId: currentUser.userId,
        title,
        frequency,
        emailTemplate: emailTemplate || 'classic',
        colorScheme: colorScheme || 'ocean-blue',
        status: 'DRAFT'
      }
    })

    return NextResponse.json({ newsletter })
  } catch (error) {
    console.error('Create newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to create newsletter' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    let newsletters

    if (currentUser.role === 'ADMIN') {
      newsletters = await prisma.newsletter.findMany({
        where: { adminId: currentUser.userId },
        include: {
          questionnaires: true,
          editions: {
            orderBy: { editionNumber: 'desc' },
            take: 5
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } else {
      // For USER1 and USER2, get newsletters they're part of
      newsletters = await prisma.newsletter.findMany({
        include: {
          admin: {
            select: {
              name: true,
              email: true
            }
          },
          questionnaires: true,
          editions: {
            orderBy: { editionNumber: 'desc' },
            take: 5
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    }

    return NextResponse.json({ newsletters })
  } catch (error) {
    console.error('Get newsletters error:', error)
    return NextResponse.json(
      { error: 'Failed to get newsletters' },
      { status: 500 }
    )
  }
}