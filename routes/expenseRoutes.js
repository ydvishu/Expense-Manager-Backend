import express from 'express'
const router = express.Router();
import { addExpense, getExpenses, getAnalytics } from '../controllers/expenseController.js';


router.post('/add', addExpense);
router.get('/', getExpenses);
router.get('/analytics', getAnalytics);

export default router;
