import express from 'express';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

// Protected route - only accessible with a valid token
router.get('/profile', authenticateUser, (req, res) => {
  res.json({
    success: true,
    message: 'You have access to this protected route',
    user: req.user
  });
});

export default router; 