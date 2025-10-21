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

    const { newsletterId, title, description, questions } = await request.json()

    // Validate input
    if (!newsletterId || !title || !questions) {
      return NextResponse.json(
        { error: 'Newsletter ID, title, and questions are required' },
        { status: 400 }
      )
    }

    // Verify newsletter belongs to admin
    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId }
    })

    if (!newsletter || newsletter.adminId !== currentUser.userId) {
      return NextResponse.json(
        { error: 'Newsletter not found or unauthorized' },
        { status: 404 }
      )
    }

    // Create questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        newsletterId,
        title,
        description,
        questions
      }
    })

    return NextResponse.json({ questionnaire })
  } catch (error) {
    console.error('Create questionnaire error:', error)
    return NextResponse.json(
      { error: 'Failed to create questionnaire' },
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

    const searchParams = request.nextUrl.searchParams
    const newsletterId = searchParams.get('newsletterId')

    if (!newsletterId) {
      return NextResponse.json(
        { error: 'Newsletter ID is required' },
        { status: 400 }
      )
    }

    const questionnaires = await prisma.questionnaire.findMany({
      where: { newsletterId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ questionnaires })
  } catch (error) {
    console.error('Get questionnaires error:', error)
    return NextResponse.json(
      { error: 'Failed to get questionnaires' },
      { status: 500 }
    )
  }
}