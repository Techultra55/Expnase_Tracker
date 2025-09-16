import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../cards/transactionInfoCard'
import moment from 'moment';


const ExpenseTransactions = (props) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>
          Expense Transactions
        </h5>

        <button className='card-btn' onClick={props.onSeeMore}>
          See More <LuArrowRight className='text-base'/>
        </button>
      </div>

      <div className='mt-6'>
        {props.transactions.slice(0, 5)?.map((e) => (
          <TransactionInfoCard 
           key = {e._id}
           title = {e.title}
           icon = {e.icon}
           date = {moment(e.date).format(' Do MMM YYYY')}
           amount = {e.amount} 
           hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseTransactions
