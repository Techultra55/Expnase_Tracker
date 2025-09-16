import React, {useState} from 'react'
import { IconBase } from 'react-icons/lib'
import { data } from 'react-router-dom'

const AddIncomeForm = (props) => {

    const  [income, setIncome] = useState({
        title: '',
        amount: '',
        data: '',
        icon:''
    });

  const handleChange = (key,value) => setIncome({...income, [key]: value});

  return (
    <div>
      
    </div>
  )
}

export default AddIncomeForm
