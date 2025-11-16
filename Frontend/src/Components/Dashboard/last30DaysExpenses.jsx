import React, { useEffect, useState } from 'react'
import CustomBarChart from '../charts/CustomBarChart';
import { prepareExpenseBarChartData } from '../../Utils/Helper';

const Last30DaysExpenses = (props) => {

    const [chartData, setChartData] = useState([]);

   


    useEffect(() => {
        const result = prepareExpenseBarChartData(props.data);
        
        setChartData(result);

        
        return () => {}
    }, [props.data]);


    return (
        <div className='card col-span-1'>
           <div className='flex items-center justify-between'>
               <h5 className='text-lg'>Last 30 Days Expenses</h5>
           </div>


           <CustomBarChart data={chartData} />
        </div>
    )
}

export default Last30DaysExpenses
