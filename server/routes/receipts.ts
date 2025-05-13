
import express from 'express';
import multer from 'multer';
import { textractService } from '../services/textract';
import { authenticateUser } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Receipt schema
const receiptSchema = new mongoose.Schema({
  userId: String,
  data: Object,
  image: String,
  timestamp: { type: Date, default: Date.now }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

// Route to get receipt history
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const receipts = await Receipt.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json({ success: true, receipts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to scan receipt
router.post('/scan', authenticateUser, upload.single('receipt'), async (req, res) => {
  try {
    console.log('=== Starting Receipt Processing ===');
    console.log('Receipt scan request received');
    
    if (!req.file) {
      console.log('Error: No file uploaded');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    console.log('Processing receipt:', {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // Process the receipt using Textract
    console.log('Calling Textract service...');
    const receiptData = await textractService.analyzeReceipt(req.file.buffer);
    
    // Save receipt to database
    const receipt = new Receipt({
      userId: req.user.id,
      data: receiptData,
      image: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
    });
    await receipt.save();

    res.json({
      success: true,
      message: 'Receipt processed successfully',
      data: receiptData
    });
  } catch (error: any) {
    console.error('Error processing receipt:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error processing receipt'
    });
  }
});

export default router;
