import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser } from '@/lib/auth'
import { generateEditionId } from '@/lib/id-generator'

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { newsletterId, specialQuestion } = await request.json()

    // Validate input
    if (!newsletterId) {
      return NextResponse.json(
        { error: 'Newsletter ID is required' },
        { status: 400 }
      )
    }

    // Get the latest edition number
    const latestEdition = await prisma.newsletterEdition.findFirst({
      where: { newsletterId },
      orderBy: { editionNumber: 'desc' }
    })

    const editionNumber = latestEdition ? latestEdition.editionNumber + 1 : 1

    // Create edition
    const edition = await prisma.newsletterEdition.create({
      data: {
        id: generateEditionId(),
        newsletterId,
        editionNumber,
        specialQuestion,
        status: 'COLLECTING'
      },
      include: {
        newsletter: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return NextResponse.json({ edition })
  } catch (error) {
    console.error('Create edition error:', error)
    return NextResponse.json(
      { error: 'Failed to create edition' },
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

    const editions = await prisma.newsletterEdition.findMany({
      where: { newsletterId },
      include: {
        newsletter: {
          select: {
            id: true,
            title: true
          }
        },
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
      },
      orderBy: { editionNumber: 'desc' }
    })

    return NextResponse.json({ editions })
  } catch (error) {
    console.error('Get editions error:', error)
    return NextResponse.json(
      { error: 'Failed to get editions' },
      { status: 500 }
    )
  }
}