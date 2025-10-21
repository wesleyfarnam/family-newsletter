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

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: {
        newsletter: {
          select: {
            id: true,
            title: true,
            adminId: true
          }
        }
      }
    })

    if (!questionnaire) {
      return NextResponse.json(
        { error: 'Questionnaire not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ questionnaire })
  } catch (error) {
    console.error('Get questionnaire error:', error)
    return NextResponse.json(
      { error: 'Failed to get questionnaire' },
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

    const questionnaire = await prisma.questionnaire.update({
      where: { id },
      data
    })

    return NextResponse.json({ questionnaire })
  } catch (error) {
    console.error('Update questionnaire error:', error)
    return NextResponse.json(
      { error: 'Failed to update questionnaire' },
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

    await prisma.questionnaire.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete questionnaire error:', error)
    return NextResponse.json(
      { error: 'Failed to delete questionnaire' },
      { status: 500 }
    )
  }
}