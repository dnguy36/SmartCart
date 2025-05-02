import mongoose from 'mongoose';

interface ValidatorProps {
  path: string;
  value: any;
}

const pantryItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: mongoose.Schema.Types.Mixed, // Allow both numbers and strings
    required: true,
    validate: {
      validator: function(value: any) {
        // Allow either numbers or specific strings like "by weight"
        return typeof value === 'number' || 
               (typeof value === 'string' && ['by weight', 'weight', 'as needed'].includes(value));
      },
      message: function(this: any) {
        return `${this.value} is not a valid quantity. Must be a number or a valid quantity descriptor.`;
      }
    }
  },
  unit: {
    type: String,
    required: true,
    default: 'pcs'
  },
  location: {
    type: String,
    enum: ['pantry', 'refrigerator', 'freezer'],
    default: 'pantry'
  },
  category: {
    type: String,
    required: true,
    default: 'Other'
  },
  expiry: {
    type: Date,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better query performance
pantryItemSchema.index({ userId: 1 });
pantryItemSchema.index({ expiry: 1 });

// Pre-save middleware to handle quantity/unit formatting
pantryItemSchema.pre('save', function(next) {
  const item = this as any;
  
  // If quantity is a string like "by weight", set appropriate unit
  if (typeof item.quantity === 'string') {
    if (item.quantity === 'by weight') {
      item.unit = 'weight';
    }
  }
  
  next();
});

export const PantryItem = mongoose.model('PantryItem', pantryItemSchema); 