// Import necessary components and utilities from react-chartjs-2 library
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register all necessary chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomBarChart = (props) => {
  // Function to alternate colors for bars
  const getBarColor = (index) => {
    return index % 2 === 0 ? '#875cf5' : '#cfbefb';
  };

  // Get chart data from props or default to an empty array
  const chartData = props.data || [];

  // Define the chart data structure
  const data = {
    labels: chartData.map((e) => e.month || e.category), // Support for 'month' or 'category'
    datasets: [
      {
        label: 'Amount',
        data: chartData.map((e) => e.amount),
        backgroundColor: chartData.map((e, i) => getBarColor(i)),
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        barThickness: 100,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'white',
        titleColor: '#581c87', // purple-800
        bodyColor: '#4b5563', // gray-600
        borderColor: '#d1d5db', // gray-300
        borderWidth: 1,
        padding: 8,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Amount: $${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#555', font: { size: 12 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#555', font: { size: 12 } },
      },
    },
  };

  return (
    <div className='bg-white mt-6' style={{ height: '400px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default CustomBarChart;