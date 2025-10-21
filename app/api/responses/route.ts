import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role === 'USER2') {
      return NextResponse.json(
        { error: 'Unauthorized - only contributors can submit responses' },
        { status: 403 }
      )
    }

    const { questionnaireId, editionId, answers, specialAnswer } = await request.json()

    // Validate input
    if (!questionnaireId || !answers) {
      return NextResponse.json(
        { error: 'Questionnaire ID and answers are required' },
        { status: 400 }
      )
    }

    // Check if response already exists
    const existingResponse = await prisma.response.findFirst({
      where: {
        userId: currentUser.userId,
        questionnaireId,
        editionId: editionId || null
      }
    })

    if (existingResponse) {
      // Update existing response
      const response = await prisma.response.update({
        where: { id: existingResponse.id },
        data: {
          answers,
          specialAnswer
        },
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
      })

      return NextResponse.json({ response })
    }

    // Create new response
    const response = await prisma.response.create({
      data: {
        userId: currentUser.userId,
        questionnaireId,
        editionId,
        answers,
        specialAnswer
      },
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
    })

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Create response error:', error)
    return NextResponse.json(
      { error: 'Failed to create response' },
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
    const editionId = searchParams.get('editionId')
    const questionnaireId = searchParams.get('questionnaireId')

    const where: any = {}

    if (editionId) {
      where.editionId = editionId
    }

    if (questionnaireId) {
      where.questionnaireId = questionnaireId
    }

    // If USER1, only show their responses
    if (currentUser.role === 'USER1') {
      where.userId = currentUser.userId
    }

    const responses = await prisma.response.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        media: true,
        questionnaire: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ responses })
  } catch (error) {
    console.error('Get responses error:', error)
    return NextResponse.json(
      { error: 'Failed to get responses' },
      { status: 500 }
    )
  }
}