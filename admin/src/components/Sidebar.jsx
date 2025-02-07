import { assets } from '@/assets/assets'
import { AdminContext } from '@/context/AdminContext'
import { CheckCheck, LayoutDashboard, List, SquarePlus } from 'lucide-react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r hidden md:block'>
      {aToken && (
        <ul className='mt-2'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                isActive ? 'bg-primary text-white' : ''
              }`
            }
            to={'/admin-dashboard'}
          >
            <LayoutDashboard size={18} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                isActive ? 'bg-primary text-white' : ''
              }`
            }
            to={'/all-appointments'}
          >
            <CheckCheck size={18} />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                isActive ? 'bg-primary text-white' : ''
              }`
            }
            to={'/add-doctor'}
          >
            <SquarePlus size={18} />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center bg-gray-50 gap-3 py-3.5 px-3 md:px-6 m-2 rounded-[5px] md:min-w-64 cursor-pointer transition-all duration-200 ease-in-out ${
                isActive ? 'bg-primary text-white' : ''
              }`
            }
            to={'/doctor-list'}
          >
            <List size={18} />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
