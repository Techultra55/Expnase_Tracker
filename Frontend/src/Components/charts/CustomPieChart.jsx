import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Text } from 'recharts'
import CustomToolTip from './CustomToolTip'
import CustomLegend from './CustomLegend'

const
    CustomPieChart = (props) => {
        return (
            <ResponsiveContainer width="100%" height={300}>
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
                    <Tooltip content={<CustomToolTip />} />
                    <Legend content={<CustomLegend />} />

                    {props.showTextAnchor && (
                        <>
                            <text x="50%" y="50%" dy={-25} textAnchor="middle" fill="#666" fontSize="14px">
                                {props.label}
                            </text>

                            <text x="50%" y="50%" dy={8} textAnchor="middle" fill="#333" fontSize="24px" fontWeight="semi-bold">
                                {props.totalAmount}
                            </text>
                        </>
                    )}
                </PieChart>
            </ResponsiveContainer>
        )
    }

export default CustomPieChart