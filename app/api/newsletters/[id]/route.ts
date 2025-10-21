import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    const { id } = await params

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const newsletter = await prisma.newsletter.findUnique({
      where: { id },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        questionnaires: {
          orderBy: { createdAt: 'desc' }
        },
        editions: {
          orderBy: { editionNumber: 'desc' },
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
    })

    if (!newsletter) {
      return NextResponse.json(
        { error: 'Newsletter not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ newsletter })
  } catch (error) {
    console.error('Get newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to get newsletter' },
      { status: 500 }
    )
  }
}

export async function PATCH(
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

    const data = await request.json()

    const newsletter = await prisma.newsletter.update({
      where: { id },
      data
    })

    return NextResponse.json({ newsletter })
  } catch (error) {
    console.error('Update newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to update newsletter' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    await prisma.newsletter.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to delete newsletter' },
      { status: 500 }
    )
  }
}