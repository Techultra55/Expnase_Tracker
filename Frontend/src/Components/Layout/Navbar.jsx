import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className='flex gap-1 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-5 px-7 sticky top-0 z-30'>
            <button
                className='block text-black lg:hidden'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}
            >
                {openSideMenu ? (<HiOutlineX className='text-2xl' />) : (<HiOutlineMenu className='text-2xl' />)}
            </button>

            <img
                src="/spendify.png"
                alt="logo"
                className='w-8 h-8'
            />

            <h2 className='text-lg font-medium text-black py-0.5 '>SPENDIFY</h2>
            {openSideMenu &&
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            }
        </div>
    )
}

export default Navbar