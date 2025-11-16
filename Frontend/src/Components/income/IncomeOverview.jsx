import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../Utils/Helper'

const IncomeOverview = (props) => {

  console.log(props);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(props.transactions);
    setChartData(result);

    return () => { }

  }, [props.transactions])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>Track your earnings and analyze your income transactions</p>
        </div>


        <button className='add-btn' onClick={props.onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>

      </div>

      <div className='mt-10'>
        <CustomBarChart data={chartData} />
      </div>
    </div>

  )
}

export default IncomeOverview
