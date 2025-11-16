import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../Utils/Helper';
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = (props) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(props.transactions);
    setChartData(result);

    return () => { };
  }, [props.transactions]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>

        <div className=''>
          <h5 className='text-lg'>Expense Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>This is a brief overview of your expenses over time.</p>
        </div>

        <button className='add-btn' onClick={props.onExpenseIncome}>
          <LuPlus className='text-lg' />
          Add Expense
        </button>
      </div>

      <div className='mt-10'>
        <CustomLineChart data={chartData} />
      </div>


    </div>
  )
}

export default ExpenseOverview
