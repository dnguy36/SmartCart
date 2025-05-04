import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = express.Router();

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';

// Log warning if using fallback in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('WARNING: JWT_SECRET not set in production environment. Using fallback secret.');
}

// Creates an endpoint to check auth status
router.get('/status', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        isAuthenticated: false
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return res.json({
        success: true,
        message: 'Authenticated',
        isAuthenticated: true
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        isAuthenticated: false
      });
    }
  } catch (error) {
    console.error('Auth status check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      isAuthenticated: false
    });
  }
});

// Debug route
router.get('/debug', (req, res) => {
  res.json({
    message: 'Auth routes are working',
    routes: [
      { method: 'POST', path: '/api/auth/register' },
      { method: 'POST', path: '/api/auth/login' },
      { method: 'GET', path: '/api/auth/me' },
      { method: 'GET', path: '/api/auth/users-exist' },
      { method: 'GET', path: '/api/auth/status' }
    ]
  });
});

// Check if any users exist
router.get('/users-exist', async (req, res) => {
  try {
    const count = await User.countDocuments({});
    console.log(`MongoDB user count: ${count}`);
    res.json({
      success: true,
      exists: count > 0
    });
  } catch (error: any) {
    console.error('Error checking users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email and password'
      });
    }
    
    console.log('Registration attempt:', { username, email });

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this email or username' 
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();
    console.log('User created successfully:', user._id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('💡 LOGIN ROUTE ACCESSED');
  console.log('Request body:', req.body);
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    console.log('👤 Login attempt with email:', email);

    // Find user by email
    const user = await User.findOne({ email });
    console.log('Found user in MongoDB:', user ? 'Yes' : 'No');
    
    // If no user found or password doesn't match, return error
    if (!user) {
      console.log('❌ User not found in database');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    console.log('🔐 Checking password...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch ? 'Yes ✅' : 'No ❌');
    
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    console.log('✅ Authentication successful, generating token');
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error: any) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error: any) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    const { username, email } = req.body;
    
    // Find and update user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

export default router; 