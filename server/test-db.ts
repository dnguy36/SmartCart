import { connectDB } from './db/mongodb';
import { User } from './models/User';
import bcrypt from 'bcryptjs';

async function testMongoDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('MongoDB connection successful!');
    
    // Check for existing users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database:`, users.map(u => ({ id: u._id, email: u.email })));
    
    // Create a test user
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    // Check if test user exists
    let testUser = await User.findOne({ email: testEmail });
    
    if (testUser) {
      console.log('Test user exists:', testUser);
      
      // Test password comparison
      const isMatch = await testUser.comparePassword(testPassword);
      console.log('Password match result:', isMatch);
      
      // Test direct bcrypt comparison
      const directMatch = await bcrypt.compare(testPassword, testUser.password);
      console.log('Direct bcrypt comparison result:', directMatch);
    } else {
      // Create test user
      testUser = new User({
        username: 'testuser',
        email: testEmail,
        password: testPassword
      });
      
      await testUser.save();
      console.log('Created test user:', testUser);
    }
    
    // Test authentication route logic
    console.log('\nTesting auth route logic...');
    
    // Simulate login with correct credentials
    const correctUser = await User.findOne({ email: testEmail });
    if (correctUser) {
      const correctMatch = await correctUser.comparePassword(testPassword);
      console.log('Login with correct credentials:', correctMatch ? 'SUCCESS' : 'FAILED');
    }
    
    // Simulate login with incorrect password
    if (correctUser) {
      const incorrectMatch = await correctUser.comparePassword('wrongpassword');
      console.log('Login with incorrect password:', incorrectMatch ? 'FAILED - Should not match' : 'SUCCESS - Correctly rejected');
    }
    
    // Simulate login with non-existent user
    const nonExistentUser = await User.findOne({ email: 'nonexistent@example.com' });
    console.log('Non-existent user query result:', nonExistentUser ? 'FAILED - Should not find user' : 'SUCCESS - Correctly not found');
    
    console.log('Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testMongoDB(); 