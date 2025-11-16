import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/transactionInfoCard'
import moment from 'moment'

const ExpenseList = (props) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between '>
                <h5 className='text-lg'>All Expenses</h5>

                <button className='card-btn' onClick={props.onDownload}>
                    <LuDownload className='text-base' /> Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {props.transactions.map((e) => (
                    <TransactionInfoCard
                        key={e._id}
                        title={e.category}
                        icon={e.icon}
                        date={moment(e.date).format("Do MMM YYYY")}
                        amount={e.amount}
                        type="Expense"
                        onDelete={() => props.onDelete(e._id)}

                    />))}
            </div>
        </div>
    )
}

export default ExpenseList
