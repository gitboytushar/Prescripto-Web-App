import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()

  const { token, setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false) // For mobile menu
  const [showProfileMenu, setShowProfileMenu] = useState(false) // For profile dropdown

  // logout function to clear token from local storage and context
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    toast.info('User Logged Out')
  }

  // Handle click outside for profile menu
  React.useEffect(() => {
    const handleProfileClickOutside = event => {
      if (event.target.closest('.profile-menu-container') === null) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleProfileClickOutside)
    } else {
      document.removeEventListener('mousedown', handleProfileClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleProfileClickOutside)
    }
  }, [showProfileMenu])

  // handle click outside the page-nav menu
  const handleClickOutside = event => {
    if (event.target.closest('.menu-container') === null) {
      setShowMenu(false)
    }
  }

  React.useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>
      <img
        onClick={() => navigate('/')}
        className='w-36 md:w-44 cursor-pointer'
        draggable='false'
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

      <div className='flex items-center'>
        {/* ------- profile menu --------- */}
        <div className='flex items-center gap-2'>
          {token && userData ? (
            <div
              className='flex items-center gap-2 cursor-pointer relative lg:mx-12 p-1.5 select-none profile-menu-container'
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className='flex items-center gap-1'>
                <img
                  className='w-8 rounded-md border'
                  src={userData.image}
                  alt='profile pic'
                />
                <ChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform duration-300 ease-in-out ${
                    showProfileMenu ? '-rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
              <div
                className={`absolute top-0 right-0 pt-12 text-base font-medium text-black z-20 ${
                  showProfileMenu ? 'block' : 'hidden'
                } motion-translate-x-in-[0%] motion-translate-y-in-[-5%] motion-duration-[0.3s] motion-ease-linear`}
              >
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
                    onClick={logout}
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
              className='bg-primary text-white px-5 py-2.5 rounded-md font-normal tracking-wide hidden md:block hover:opacity-90 transition-all duration-200 ease-in'
            >
              Create Account
            </button>
          )}
        </div>

        {/* --------- mobile menu -------- */}
        <div>
          {/* bar icon */}
          <Menu
            onClick={() => setShowMenu(true)}
            size={25}
            className='md:hidden text-primary'
          />
          {/* menu */}
          <div
            className={`menu-container ${
              showMenu
                ? 'fixed w-fit h-fit pb-4 pl-12 pr-4 rounded-bl-md flex motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.53s] motion-ease-spring-snappy'
                : 'h-0 w-0 hidden'
            } right-0 top-0 z-20 overflow-hidden bg-white/60 backdrop-blur-xl flex-col items-end justify-start pt-5 px-2 shadow-md`}
          >
            {/* close icon */}
            <X
              size={25}
              onClick={() => setShowMenu(false)}
              className='mt-1.5 text-primary'
            />
            <ul className='mt-12 uppercase flex flex-col items-end gap-5 text-base font-medium min-w-fit select-none'>
              <NavLink onClick={() => setShowMenu(false)} to={'/'}>
                <p>Home</p>
                <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden' />
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to={'/doctors'}>
                <p>All Doctors</p>
                <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden' />
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to={'/about'}>
                <p>About</p>
                <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden' />
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to={'/contact'}>
                <p>Contact</p>
                <hr className='border-none outline-none h-0.5 bg-primary w-full rounded-full m-auto hidden' />
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
