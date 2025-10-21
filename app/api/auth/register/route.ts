import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  console.log('🔍 Registration API called')
  
  try {
    const { email, password, name } = await request.json()
    console.log('📝 Received data:', { email, name: name, passwordLength: password?.length })

    // Validate input
    if (!email || !password || !name) {
      console.log('❌ Validation failed: Missing fields')
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Test database connection
    console.log('🔗 Testing database connection...')
    try {
      await prisma.$connect()
      console.log('✅ Database connected successfully')
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 500 }
      )
    }

    // Check if user already exists
    console.log('👤 Checking if user exists...')
    let existingUser
    try {
      existingUser = await prisma.user.findUnique({
        where: { email }
      })
      console.log('📊 User check completed:', existingUser ? 'User exists' : 'User not found')
    } catch (findError) {
      console.error('❌ User lookup failed:', findError)
      return NextResponse.json(
        { error: 'Database error during user lookup' },
        { status: 500 }
      )
    }

    if (existingUser) {
      console.log('❌ User already exists:', email)
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    console.log('🔐 Hashing password...')
    let hashedPassword
    try {
      hashedPassword = await hashPassword(password)
      console.log('✅ Password hashed successfully')
    } catch (hashError) {
      console.error('❌ Password hashing failed:', hashError)
      return NextResponse.json(
        { error: 'Password processing failed' },
        { status: 500 }
      )
    }

    // Create user with ADMIN role
    console.log('👤 Creating user...')
    let user
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'ADMIN'
        }
      })
      console.log('✅ User created successfully:', { id: user.id, email: user.email })
    } catch (createError) {
      console.error('❌ User creation failed:', createError)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Generate token
    console.log('🎫 Generating token...')
    let token
    try {
      token = generateToken(user.id, user.email, user.role)
      console.log('✅ Token generated successfully')
    } catch (tokenError) {
      console.error('❌ Token generation failed:', tokenError)
      return NextResponse.json(
        { error: 'Authentication setup failed' },
        { status: 500 }
      )
    }

    // Set cookie
    console.log('🍪 Setting cookie...')
    try {
      const cookieStore = await cookies()
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      console.log('✅ Cookie set successfully')
    } catch (cookieError) {
      console.error('❌ Cookie setting failed:', cookieError)
      // Continue even if cookie fails - user can still log in manually
    }

    console.log('🎉 Registration completed successfully!')

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error: any) {
    console.error('💥 Registration API error:', error)
    console.error('Stack trace:', error?.stack)
    return NextResponse.json(
      { 
        error: 'Failed to register user',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  } finally {
    // Always disconnect to prevent connection leaks
    try {
      await prisma.$disconnect()
      console.log('🔌 Database disconnected')
    } catch (disconnectError) {
      console.error('⚠️ Database disconnect error:', disconnectError)
    }
  }
}