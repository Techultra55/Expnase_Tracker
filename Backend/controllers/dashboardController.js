const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { isValidObjectId, Types } = require('mongoose');

//Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income and expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        // Get income transactions for the last 60 days
        const last60daysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total income in the last 60 days
        const incomeLast60days = last60daysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get total expense for the last 30 days
        const last30daysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total expense in the last 30 days
        const expenseLast30days = last30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (income + expense)
        const lastIncomeTxns = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const lastExpenseTxns = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        const lastTransactions = [
            ...lastIncomeTxns.map(
                (txn) => ({
                    ...txn.toObject(),
                    Type: "income",
                })
            ),
            ...lastExpenseTxns.map(
                (txn) => ({
                    ...txn.toObject(),
                    Type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date); // sort latest first

        // Final response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30daysExpenses: {
                total: expenseLast30days,
                transactions: last30daysExpenseTransactions,
            },
            last60daysIncome: {
                total: incomeLast60days,
                transactions: last60daysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });

        }
    
    }
