import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>
      <img
        onClick={() => navigate('/')}
        className='w-36 md:w-44 cursor-pointer'
        src={assets.logo}
        alt=''
      />

      <ul className='hidden md:flex items-center gap-5 font-medium'>
        <NavLink to={'/'}>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden motion-preset-pop motion-duration-500' />
        </NavLink>
        <NavLink to={'/doctors'}>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden motion-preset-pop motion-duration-500' />
        </NavLink>
        <NavLink to={'/about'}>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden motion-preset-pop motion-duration-500' />
        </NavLink>
        <NavLink to={'/contact'}>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden motion-preset-pop motion-duration-500' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-2'>
        {token ? (
          <div
            className='flex items-center gap-2 cursor-pointer group relative lg:mx-12 p-1.5'
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              className='w-8 rounded-full'
              src={assets.profile_pic}
              alt='profile pic'
            />
            <img
              className='w-2.5'
              src={assets.dropdown_icon}
              alt='caret down icon'
            />
            <div className='absolute top-0 right-0 pt-12 text-base font-medium text-black z-20 hidden group-hover:block motion-translate-x-in-[0%] motion-translate-y-in-[-5%] motion-duration-[0.3s] motion-ease-linear'>
              <div className='min-w-48 bg-gray-100 rounded text-[15px] font-normal flex flex-col gap-1 p-2'>
                <p
                  onClick={() => navigate('my-profile')}
                  className='px-2 py-1 rounded hover:bg-black/5 transition-colors duration-200 ease-in cursor-pointer'
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('my-appointments')}
                  className='px-2 py-1 rounded hover:bg-black/5 transition-colors duration-200 ease-in cursor-pointer'
                >
                  My Appointments
                </p>
                <hr className='my-[1px] mx-2 rounded-full' />
                <p
                  onClick={() => setToken(false)}
                  className='px-2 py-1 rounded hover:text-red-500 hover:bg-black/5 transition-colors duration-100 ease-in cursor-pointer w-full flex items-center justify-start gap-1'
                >
                  <span>Logout</span>
                  <ArrowRight size={15} />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-8 py-3 rounded-md font-normal hidden md:block'
          >
            Create Account
          </button>
        )}
        <Menu
          onClick={() => setShowMenu(true)}
          size={25}
          className='md:hidden text-primary'
        />
        {/* mobile menu */}
        <div
          className={`${
            showMenu
              ? 'fixed w-fit h-fit pb-4 pl-12 pr-4 rounded-bl-md flex motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.45s] motion-ease-spring-bouncy'
              : 'h-0 w-0 hidden'
          } right-0 top-0 z-20 overflow-hidden bg-white/60 backdrop-blur-xl flex-col items-end justify-start pt-5 px-2 shadow-2xl`}
        >
          <X
            size={25}
            onClick={() => setShowMenu(false)}
            className='mt-1.5 text-primary'
          />
          <ul className='uppercase flex flex-col items-end gap-4 mt-5 text-base font-medium min-w-fit'>
            <NavLink className='min-w-fit'>Home</NavLink>
            <NavLink className='min-w-fit'>All Doctors</NavLink>
            <NavLink className='min-w-fit'>About</NavLink>
            <NavLink className='min-w-fit'>Contact</NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
