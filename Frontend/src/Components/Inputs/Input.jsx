import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = (props) => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword) 
  }

  return (
    <div>
      <label className='text-[13px] text-slate-800'>{props.label}</label>

      <div className='input-box'>

        <input
          className='w-full bg-transparent outline-none'
          type={props.type === 'password' ? showPassword ? 'text' : 'password' : props.type} 
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)} 
        />

        {props.type === "password" && ( 
          <>
            {showPassword ?
              (
                <FaRegEye
                  size={22}
                  className='text-primary cursor-pointer'
                  onClick={() => toggleShowPassword()}
                />
              ) :
              (
                <FaRegEyeSlash
                  size={22}
                  className='text-slate-400 cursor-pointer'
                  onClick={() => toggleShowPassword()}
                />

              )}
          </>

        )}
      </div>
    </div>
  )
}

export default Input
