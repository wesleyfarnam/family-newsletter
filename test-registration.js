// Test script to verify registration API works

async function testRegistration() {
  const testData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123'
  };

  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response:', result);
    
    if (response.ok) {
      console.log('✅ Registration API is working correctly');
    } else {
      console.log('❌ Registration failed:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testRegistration();