import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { WordRotate } from './WordRotateComp'

const Navbar = () => {
  const navigate = useNavigate()

  const { token, setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false) // For mobile menu
  const [showProfileMenu, setShowProfileMenu] = useState(false) // For profile dropdown

  // logout function to clear token from local storage and context
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    toast.success('Logout Successful 🎉')
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

  // handle user login btn - all clicks
  const handleAuthNavigation = type => {
    const currentPath = window.location.pathname

    if (currentPath === '/login') {
      navigate(`/login?type=${type}`, { replace: true })
      window.location.reload()
    } else {
      navigate(`/login?type=${type}`)
    }
  }

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
        {/* go to admin-doctor panel */}
        <NavLink
          to={'https://prescripto-admin-ka03.onrender.com'}
          target='_blank'
        >
          <button className='px-3 py-2 w-fit border border-gray-200 bg-gray-100 text-black rounded flex items-center gap-1'>
            <WordRotate words={['Admin', 'Doctor']} /> Login
          </button>
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
              <div className='flex items-center gap-px sm:gap-1'>
                <img
                  className='size-8 sm:size-9 aspect-square object-cover rounded-[5px] border'
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
                } motion-translate-x-in-[0%] motion-translate-y-in-[-5%] motion-duration-[0.26s] motion-ease-linear`}
              >
                <div className='min-w-48 bg-gray-100 border border-gray-200 rounded-[7px] text-[15px] font-normal flex flex-col gap-1 p-2'>
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
                    className='px-2 py-1 rounded hover:text-red-500 hover:bg-black/5 transition-all duration-100 ease-in cursor-pointer w-full flex items-center justify-start gap-1 group'
                  >
                    <span>Logout</span>
                    <ArrowRight
                      size={15}
                      className='group-hover:translate-x-1 transition-transform duration-200 ease-linear'
                    />
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center gap-1.5'>
              <button
                onClick={() => handleAuthNavigation('login')}
                className='border border-gray-200 bg-gray-100 text-black px-4 py-2 rounded font-normal tracking-wide hidden sm:block active:scale-75 transition-all duration-200 ease-in-out'
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthNavigation('signup')}
                className='bg-primary border border-primary text-white px-4 py-2 rounded font-normal tracking-wide hidden sm:block active:scale-75 transition-all duration-200 ease-in-out'
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
        {/* ------------ sign up btn on mobile ------------ */}
        {!token && (
          <>
            <button
              onClick={() => handleAuthNavigation('signup')}
              className='bg-primary border border-primary text-white px-2.5 py-1.5 mr-3 rounded-[3px] font-normal text-xs block sm:hidden active:scale-[96%] transition-transform duration-100 ease-in'
            >
              Sign Up
            </button>
          </>
        )}
        {/* --------------------------------- mobile menu ---------------------------- */}
        <div>
          {/* bar icon */}
          <Menu
            onClick={() => setShowMenu(true)}
            size={25}
            className='md:hidden text-primary'
          />
          {/* overlay */}
          {showMenu && (
            <div
              className='fixed inset-0 bg-black/20 z-10'
              onClick={() => setShowMenu(false)}
            />
          )}
          {/* menu */}
          <div
            className={`menu-container ${
              showMenu
                ? 'fixed w-full h-fit py-10 px-4 rounded-b-2xl flex motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.53s] motion-ease-spring-snappy'
                : 'hidden'
            } inset-0 top-0 z-20 overflow-hidden bg-white/90 backdrop-blur-xl flex-col items-center justify-center pt-5 px-2 shadow-xl`}
          >
            {/* close icon */}
            <div className='flex w-full items-center justify-end'>
              <X
                size={30}
                onClick={() => setShowMenu(false)}
                className='mr-2 text-primary'
              />
            </div>
            {/* navigation links */}
            <ul className='mt-10 uppercase flex flex-col-reverse items-center gap-7 text-base font-medium min-w-full select-none'>
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

              {/* go to Admin/doctor panel login */}
              <NavLink
                to={'https://prescripto-admin-ka03.onrender.com'}
                target='_blank'
              >
                <button className='mb-6 min-w-[124px] h-10 bg-primary text-white font-normal rounded relative'>
                  <span className='absolute top-1/2 -translate-y-1/2 left-3'>
                    <WordRotate words={['Admin', 'Doctor']} />
                  </span>
                  <span className='absolute top-1/2 -translate-y-1/2 right-3'>
                    Login
                  </span>
                </button>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
