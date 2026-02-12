const Income = require('../schemas/Income');
const Expense = require('../schemas/Expense');
const { isValidObjectId, Types } = require('mongoose');

//Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income and expenses
        // This aggregation pipeline calculates the sum of all income amounts for the specified user.

        /*$match: This stage filters the documents to only include those belonging to the current user.
        $group: This stage groups the matched documents and calculates a sum of the amount field for all of them. */

        // It first matches documents by `userId` and then groups them to calculate the total sum.

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        // This aggregation pipeline calculates the sum of all expense amounts for the specified user.
        // It works similarly to the total income aggregation.
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
        const lastIncomeTxns = (await Income.find({ userId }).sort({ date: -1 }).limit(5));
        const lastExpenseTxns = (await Expense.find({ userId }).sort({ date: -1 }).limit(5));

        // Combine the last 5 income and expense transactions into a single array.
        // The .map() function is used to iterate over each transaction array.
        // For each transaction, it's converted to a plain object using .toObject()
        // and a 'type' property ('income' or 'expense') is added.
        // The spread syntax (...) is used to merge the two mapped arrays.
        // Finally, the combined array is sorted by date in descending order to show the most recent transactions first.
        const lastTransactions = [
            ...lastIncomeTxns.map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...lastExpenseTxns.map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date);

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
