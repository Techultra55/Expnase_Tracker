import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../Utils/Helper'

import AuthLayout from '../../Components/Layout/AuthLayout'
import Input from '../../Components/Inputs/Input'
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector'
import axiosInastance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import { UserContext } from '../../Context/userContext'
import uploadImage from '../../Utils/uploadImage'

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle sign up from submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a valid Password");
      return;
    }


    setError("");

    //Sign up API call
    try {
      if(profilePic)
      {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || " ";
      }

      const response = await axiosInastance.post(API_PATHS.AUTH.REGISTER, { fullName, email, password, profileImageUrl });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
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

  const handleEmail = (value) => {
    setEmail(value)
  }

  const handlePassword = (value) => {
    setPassword(value)
  }

  const handleFullName = (value) => {
    setFullName(value)

  }

  return (
    <AuthLayout>
      <div className='flex flex-col justify-center mt-10 h-auto lg:w-[100%] md:h-full md:mt-0'>

        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Input
              value={fullName}
              onChange={handleFullName}
              label="Full Name"
              placeholder="John Francis Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={handleEmail}
              label="Email Address"
              placeholder="johnDoe@example.com"
              type="email"
            />

            <div className='col-span-2'>
              <Input
                value={password}
                onChange={handlePassword}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>

          </div>


          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>


          <p className='text=[13px] text-slate-800 mt-3'>
            Already have an account? {''}
            <Link className='font-medium text-primary underline' to="/login">Login</Link>
          </p>
        </form>


      </div>
    </AuthLayout>
  )
}

export default SignUp
