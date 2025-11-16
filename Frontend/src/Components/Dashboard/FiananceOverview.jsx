import React from 'react'
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#16C47F", "#F93827", "#FF9D23"];

const FinanceOverview = (props) => {

  const BalanceData = [
    { name: "Total Balance", amount: props.totalBalance },
    { name: "Total Expense", amount: props.totalExpense },
    { name: "Total Income", amount: props.totalIncome }
  ]

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Fianance Overview</h5>
      </div>

      <CustomPieChart
        data={BalanceData}
        label="Total Balance"
        totalAmount={`$${props.totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />

    </div>
  )
}

export default FinanceOverview
