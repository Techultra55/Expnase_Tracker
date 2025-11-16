import React, { useState } from 'react'
import { IconBase } from 'react-icons/lib'
// import { data } from 'react-router-dom'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../Layout/EmojiPickerPopup'

const AddIncomeForm = (props) => {

  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: ''
  });

  const handleChange = (key, value) => setIncome({...income, [key]: value });

  return (
    <div>

    <EmojiPickerPopup 
      icon={income.icon}
      onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
    />


      <Input
        value={income.source}
        onChange={(e) => handleChange('source', e.target.value)}
        label="Income Source"
        placeholder="Freelanace, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        placeholder=" "
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        placeholder=" "
        type="date"
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn mt-6'
          onClick={() => props.onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm
