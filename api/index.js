// api/index.js - Simple Express serverless function for Vercel
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000
  })
  .then(() => {
    console.log('✅ Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
} else {
  console.warn('MONGODB_URI not found in environment variables');
}

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Simple test route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API test successful!' });
});

// Export for Vercel
export default app; 