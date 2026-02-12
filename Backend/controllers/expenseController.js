const xlsx = require('xlsx')
const Expense = require("../schemas/Expense")

//add expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;


    try {
        const { icon, category, amount, date } = req.body;

        //Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newExpense = new Expense({ userId, icon, category, amount, date: new Date(date) });

        await newExpense.save();
        res.status(200).json(newExpense);

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }

}

//Get all expense sources
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    }
    catch (err) {
        res.status(500).json({ message: "server error!" })
    }
}


exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted sucessfully" });
    }
    catch (err) {
        res.status(500).json({ message: "server error!" })
    }
}


exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for excel
        const data = expense.map((e) => ({
            Category: e.category,
            Amount: e.amount,
            Date: e.date
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data, { header: ["Category", "Amount", "Date"] });
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Write workbook to buffer
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Disposition', 'attachment; filename="expense.xlsx"');
        res.send(buffer);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}