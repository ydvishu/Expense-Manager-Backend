import mongoose from 'mongoose'
const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['Rental', 'Groceries', 'Entertainment', 'Travel', 'Others'],
    required: true
  },
  notes: { type: String },
  date: { type: Date, required: true },
  paymentMode: { 
    type: String, 
    enum: ['UPI', 'Credit Card', 'Net Banking', 'Cash'],
    required: true
  },
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);
