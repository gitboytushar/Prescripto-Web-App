import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* --------- left side --------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl w-full text-center md:text-start text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className='flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light md:font-normal'>
          <img className='w-28' src={assets.group_profiles} alt='' />
          <p className='text-center md:text-start w-full'>
            Simply browse through our extensive list of trusted doctors,
            <br className='hidden sm:block' /> schedule your appointment
            hassle-free.
          </p>
        </div>

        <a
          href='#speciality'
          className='flex items-center justify-center gap-2 bg-white px-8 py-3 rounded-md text-gray-600 font-medium text-sm m-auto md:m-0 hover:scale-[102%] transition-all duration-200'
        >
          Book Appointment
          <img className='w-3' src={assets.arrow_icon} alt='arrow right icon' />
        </a>
      </div>

      {/* --------- right side --------- */}
      <div className='md:w-1/2 relative'>
        <img
          className='w-full md:absolute bottom-0 rounded-lg h-auto'
          src={assets.header_img}
          alt=''
        />
      </div>
    </div>
  )
}

export default Header
