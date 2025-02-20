import { AdminContext } from '@/context/AdminContext'
import { DoctorContext } from '@/context/DoctorContext'
import {
  CheckCheck,
  LayoutDashboard,
  List,
  Menu,
  SquarePlus,
  X
} from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sidebarRef = useRef(null)

  // Handle clicks outside sidebar
  useEffect(() => {
    const handleClickOutside = event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (window.innerWidth < 768) {
          setIsMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* mobile menu toggle button */}
      <button
        onClick={toggleMenu}
        className='pl-1 pr-1.5 py-1 rounded-r bg-primary text-white sm:hidden fixed z-50 mt-4'
      >
        {!isMenuOpen ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* overlay on mobile */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 sm:hidden z-30'
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* main side bar */}
      <div
        ref={sidebarRef}
        className={`min-h-fit sm:min-h-screen bg-white rounded-r-md sm:rounded-none sm:border-r md:block fixed md:static min-w-64 z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        {/* admin panel sidebar */}
        {aToken && (
          <ul className='mt-16 sm:mt-2'>
            <NavLink
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center select-none bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`
              }
              to={'/admin-dashboard'}
            >
              <LayoutDashboard size={18} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center select-none bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`
              }
              to={'/all-appointments'}
            >
              <CheckCheck size={18} />
              <p>Appointments</p>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center select-none bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`
              }
              to={'/doctor-list'}
            >
              <List size={18} />
              <p>Doctors List</p>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center select-none bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`
              }
              to={'/add-doctor'}
            >
              <SquarePlus size={18} />
              <p>Add Doctor</p>
            </NavLink>
          </ul>
        )}
        {/* doctor panel sidebar */}
        {dToken && (
          <ul className='mt-16 sm:mt-2'>
            <NavLink
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center select-none bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`
              }
              to={'/doctor-dashboard'}
            >
              <LayoutDashboard size={18} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center select-none bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`
              }
              to={'/doctor-appointments'}
            >
              <CheckCheck size={18} />
              <p>Appointments</p>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center select-none bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`
              }
              to={'/doctor-profile'}
            >
              <List size={18} />
              <p>Profile</p>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  )
}

export default Sidebar
