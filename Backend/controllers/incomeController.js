const xlsx = require('xlsx')
const Income = require("../schemas/Income")

//add Income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;


    try {
        const { icon, source, amount, date } = req.body;

        //Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newIncome = new Income({ userId, icon, source, amount, date: new Date(date) });

        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }

}

//Get all income sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    }
    catch (error) {
        res.status(500).json({ message: "server error!" })
    }
}


exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "server error!" })
    }
}


exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ data: -1 });

        // Prepare data for excel
        const data = income.map((e) => ({
            Source: e.source,
            Amount: e.amount,
            Date: e.date
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write workbook to buffer
        xlsx.writeFile(wb, 'income.xlsx');

        res.download('income.xlsx');

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}