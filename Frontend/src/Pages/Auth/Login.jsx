import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../Utils/Helper'

import AuthLayout from '../../Components/Layout/AuthLayout'
import Input from '../../Components/Inputs/Input'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import { UserContext } from '../../Context/userContext';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [err, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle Login from submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError("");

    //Login APi
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });

      const {token, user} = response.data;

      if(token)
      {
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    } 
    catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
      else {
        setError("Something went wrong. Please try again")
      }
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  return (
    <AuthLayout>
      <div className='flex flex-col justify-center lg:w-[70%] h-3/4 md:h-full' >
        <h3 className='text-xl font-semibold text-black'>Welcome back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details 
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={handleEmail}
            label="Email Address"
            placeholder="johnDoe@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={handlePassword}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {err && <p className='text-red-500 text-xs pb-2.5'>{err}</p>}

          <button type='submit' className='btn-primary'>
            Login
          </button>


          <p className='text=[13px] text-slate-800 mt-3'>
            Don't Have an account? {''}
            <Link className='font-medium text-primary underline' to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
