import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Text } from 'recharts'
import CustomToolTip from './CustomToolTip'
import CustomLegend from './CustomLegend'

const 
CustomPieChart = (props) => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={props.data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {props.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={CustomToolTip} />
                <Legend content={CustomLegend} />

                {props.showTextAnchor && (
                    <>
                        <Text x="50%" y={100} dy={-25} textAnchor="middle" fill="#666" fontSize={14}>
                            {props.label}
                        </Text>

                        <Text x="50%" y={100} dy={8} textAnchor="middle" fill="#333" fontSize={24} fontWeight="bold">
                            {props.totalAmount}
                        </Text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart