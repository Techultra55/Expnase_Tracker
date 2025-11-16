import React, { useState } from 'react'
import Input from "../Inputs/Input"
import EmojiPickerPopup from '../Layout/EmojiPickerPopup'
import { IconBase } from 'react-icons/lib';


const AddexpenseForm = (props) => {

  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(icon) => handleChange("icon", icon)}
      />

      <Input
        value={expense.category}
      onChange={(e) => handleChange("category", e.target.value)}
        label="Category"
        placeholder="Rent, Grocrery, etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder=" "
        type="number"
      />

      <Input
        value={expense.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Date"
        placeholder=" "
        type="date"
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={() => props.onAddExpense(expense)}
        > Add Expense</button>
      </div>
    </div>
  )
}

export default AddexpenseForm
