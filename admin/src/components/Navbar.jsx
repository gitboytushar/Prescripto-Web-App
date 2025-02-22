import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { DoctorContext } from '@/context/DoctorContext'

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAtoken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }

  return (
    <div className='flex justify-between items-end sm:items-center px-4 sm:px-10 py-3 border-b bg-gray-50 select-none'>
      <img
        className='w-36 sm:w-40 cursor-pointer'
        src={assets.admin_logo}
        alt='logo'
        draggable='false'
      />
      <div className='flex items-center gap-2 sm:text-base text-xs px-2'>
        <div className='py-1.5 px-2 sm:px-3 rounded-[5px]'>
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
        <InteractiveHoverButton
          onClick={logout}
          className='py-1.5 px-2.5 sm:px-4 rounded-[5px]'
        >
          Logout
        </InteractiveHoverButton>
      </div>
    </div>
  )
}

export default Navbar
