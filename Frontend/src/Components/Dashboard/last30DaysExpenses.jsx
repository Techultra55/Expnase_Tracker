import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../Utils/Helper';
import CustomBarChart from '../charts/CustomBarChart';

const Last30DaysExpenses = (props) => {

    const [charData, setCharData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(props.data);
        setCharData(result);

        return () => { };
    }, [props.data])


    return (
        <div className='card col-span-1'>
           <div className='flex items-center justify-between'>
               <h5 className='text-lg'>Last 30 Days Expenses</h5>
           </div>


           <CustomBarChart data={charData} />
        </div>
    )
}

export default Last30DaysExpenses
