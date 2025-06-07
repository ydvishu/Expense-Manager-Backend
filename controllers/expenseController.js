import Expense from '../models/Expense.js'

// Create new expense
export const addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get expenses with filters
export const getExpenses = async (req, res) => {
  try {
    const { category, paymentMode, dateRange } = req.query;
    const query = {};

    if (category) query.category = { $in: category.split(',') };
    if (paymentMode) query.paymentMode = { $in: paymentMode.split(',') };

    // Date filter
    if (dateRange) {
      const now = new Date();
      const ranges = {
        'this_month': new Date(now.getFullYear(), now.getMonth(), 1),
        'last_30_days': new Date(now.setDate(now.getDate() - 30)),
        'last_90_days': new Date(now.setDate(now.getDate() - 60)),
      };

      if (dateRange in ranges) {
        query.date = { $gte: ranges[dateRange] };
      }
    }

    const expenses = await Expense.find(query);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get analytics (bar chart data)
export const getAnalytics = async (req, res) => {
  try {
    const data = await Expense.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
            category: '$category'
          },
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
