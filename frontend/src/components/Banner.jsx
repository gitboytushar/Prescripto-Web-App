import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ArrowUpRight } from 'lucide-react'

const Banner = () => {
  const navigate = useNavigate()
  const { userData } = useContext(AppContext)

  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 my-28 md:mx-10'>
      {/* -------- left side ---------- */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
          <p>Book Appointment</p>
          <p className='mt-3'>With 100+ Trusted Doctors</p>
        </div>
        {!userData && (
          <button
            onClick={() => {
              navigate('/login')
              scrollTo(0, 0)
            }}
            className='bg-white text-sm sm:text-base font-medium text-gray-600 px-8 py-3 rounded-md mt-6 flex items-center gap-1.5 hover:scale-[101%] hover:drop-shadow-xl tracking-wide transition-all duration-200'
          >
            Create Account
            <span>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </button>
        )}
        {userData && (
          <button
            onClick={() => {
              navigate('/doctors')
              scrollTo(0, 0)
            }}
            className='bg-white text-sm sm:text-base font-medium text-gray-600 px-8 py-3 rounded-md mt-6 flex items-center gap-1.5 hover:scale-[101%] hover:drop-shadow-xl tracking-wide transition-all duration-200'
          >
            Book Appointment
            <span>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </button>
        )}
      </div>

      {/* -------- right side ---------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img
          className='w-full absolute bottom-0 right-0 max-w-md'
          src={assets.appointment_img}
          alt=''
        />
      </div>
    </div>
  )
}

export default Banner
