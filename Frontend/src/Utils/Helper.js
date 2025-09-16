import moment from "moment";

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        if (words[i][0]) {
            initials += words[i][0];
        }
    }

    return initials.toUpperCase();
};


export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}


export const prepareExpenseBarChartData = (data = []) => {
    const charData = data.map((e)=>({
        category: e?.category,
        amount: e?.amount,
    }));

    return charData;
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((e) => ({
        month:moment(e?.date).format("Do MMM"),
        amount: e?.amount,
        source: e?.source,
    }));

    return chartData;
}