import React, { useEffect, useState } from 'react'
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

const RecentIncomewithChart = (props) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = props.data?.map((e) => ({
            name: e?.source,
            amount: e?.amount,
        }));
        setChartData(dataArr);
    };

   useEffect(() => {
    prepareChartData();

    return () =>{};
    
   }, [props.data])





    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>
                    Last 60 Days Income
                </h5>
            </div>


            <CustomPieChart
                data={chartData}
                label="Total income"
                totalAmount={`$${props.totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomewithChart
