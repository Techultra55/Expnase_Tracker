import React from 'react'
import { LuTrendingUpDown } from 'react-icons/lu'
import PixelBlast from './pixelBlast'

const AuthLayout = (props) => {
  return (
    <div className='flex'>

      <div className='flex gap-1 w-screen h-screen md:w-[60rem] px-12 pt-8 pb-12'>

        <img
          src="../../../public/spendify.png"
          alt="logo"
          className='w-8 h-8'
        />

        <h2 className='text-lg font-medium text-black py-0.5'>SPENDIFY</h2>
        {props.children}
      </div>

      
      <div className='hidden md:block w-[40vw] h-screen bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>

         <div className='grid grid-cols-1 z-20'>
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your income and expanse"
            value="430,000"
            color="bg-blue-700"
          />
        </div>


              
        <div className='w-48 h-48 rounded-[40px] bg-purple-700 absolute -top-7 -left-5' />
       
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-700 absolute top-[70%] -right-10' />
        
        <div className='w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-7 -left-5' />
       
           <PixelBlast
          variant="squares"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={2}
          enableRipples
          rippleSpeed={1}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />

 

     

      </div>
    </div>
  )
}

export default AuthLayout


//Custom component card
const StatsInfoCard = (props) => {
  return (
    <div className='flex gap-6 bg-white p-4 rounded-xl shadow-nd shadow-purple-400/100 border border-gray-200/50 z-10'>

      <div className={`w-12 h-12 flex items-center justify-center text-[26xl] text-white ${props.color} rounded-full drop-shadow-xl`}>
        {props.icon}
      </div>

      <div>
        <h6 className='text-xs text-gray-500 mb-1'>{props.label}</h6>
        <span className='text-[20px]'>${props.value}</span>
      </div>

    </div>


  )
}
