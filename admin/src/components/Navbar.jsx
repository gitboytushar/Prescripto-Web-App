import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { ShineBorder } from '@/components/ui/shine-border'

const Navbar = () => {
  const { aToken } = useContext(AdminContext)
  return (
    <div className='flex justify-between items-end sm:items-center px-4 sm:px-10 py-3 border-b bg-gray-50 select-none'>
      <img
        className='w-36 sm:w-40 cursor-pointer'
        src={assets.admin_logo}
        alt='logo'
        draggable='false'
      />
      <div className='flex items-center gap-2 sm:text-base text-xs px-2'>
        <ShineBorder
          color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
          borderWidth={1.5}
          borderRadius={5}
        >
          <div className='py-1.5 px-2 sm:px-3 rounded-[5px] bg-gray-200 text-gray-600'>
            {aToken ? (
              <p>
                <b>Admin</b> <span className='hidden sm:inline'>Account</span>
              </p>
            ) : (
              <p>
                <b>Doctor</b> <span className='hidden sm:inline'>Account</span>
              </p>
            )}
          </div>
        </ShineBorder>
        <button className='px-3 py-1.5 rounded-[5px] bg-primary text-white shadow-md hover:scale-[103%] transition-all duration-100 ease-in'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
