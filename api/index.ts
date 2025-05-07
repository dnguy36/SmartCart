import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "../server/routes/auth";
import protectedRoutes from "../server/routes/protected";
import receiptRoutes from "../server/routes/receipts";
import pantryRoutes from "../server/routes/pantry";
import recipeRoutes from "../server/routes/recipes";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
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

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Debugging route
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Export for Vercel
export default app; 