// Debug script to test registration components step by step
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function testRegistration() {
  console.log('🔍 Testing Registration Components...\n');
  
  // Test 1: Password hashing
  try {
    console.log('1. Testing password hashing...');
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashing successful');
    console.log(`   Original: ${password}`);
    console.log(`   Hashed: ${hashedPassword.substring(0, 20)}...`);
    
    // Test 2: Password verification
    console.log('\n2. Testing password verification...');
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log(`✅ Password verification: ${isValid}`);
    
    // Test 3: JWT token generation
    console.log('\n3. Testing JWT token generation...');
    const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
    const token = jwt.sign(
      { userId: 'test-id', email: 'test@example.com', role: 'ADMIN' }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );
    console.log('✅ JWT token generation successful');
    console.log(`   Token: ${token.substring(0, 50)}...`);
    
    // Test 4: JWT token verification
    console.log('\n4. Testing JWT token verification...');
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ JWT token verification successful');
    console.log(`   Decoded: ${JSON.stringify(decoded)}`);
    
    // Test 5: Database connection (if Prisma is available)
    console.log('\n5. Testing database components...');
    try {
      const { prisma } = require('./lib/db/prisma.js');
      console.log('✅ Prisma client imported successfully');
      
      // Test database connection
      await prisma.$connect();
      console.log('✅ Database connection successful');
      
      // Test user query
      const userCount = await prisma.user.count();
      console.log(`✅ Database query successful - ${userCount} users found`);
      
      await prisma.$disconnect();
    } catch (dbError) {
      console.log('❌ Database error:', dbError.message);
    }
    
  } catch (error) {
    console.error('❌ Registration test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testRegistration();