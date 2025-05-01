import express from 'express';
import multer from 'multer';
import { textractService } from '../services/textract';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

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
    
    console.log('=== Textract Processing Results ===');
    console.log('Items found:', receiptData.items.length);
    console.log('Items:', JSON.stringify(receiptData.items, null, 2));
    console.log('Total:', receiptData.total);
    console.log('Date:', receiptData.date);
    console.log('Merchant:', receiptData.merchantName);
    console.log('=== End Receipt Processing ===');

    // Validate the response
    if (!receiptData) {
      console.log('Error: Invalid Textract response');
      return res.status(500).json({
        success: false,
        message: 'Failed to extract data from receipt'
      });
    }

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