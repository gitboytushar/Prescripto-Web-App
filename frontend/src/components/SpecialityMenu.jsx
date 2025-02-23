import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div
      className='flex flex-col items-center gap-4 py-16 text-gray-800'
      id='speciality'
    >
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm md:text-base'>
        Scroll through our list of trusted doctors and schedule your required
        appointment quickly.
      </p>
      <div className='flex sm:justify-center gap-4 lg:gap-10 pt-5 w-full overflow-y-hidden overflow-x-scroll'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className='flex flex-col items-center text-xs md:text-sm cursor-pointer flex-shrink-0 hover:scale-105 hover:text-primary transition-all duration-200 ease-in'
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img
              className='w-16 sm:w-24 mb-2 pointer-events-none'
              src={item.image}
              alt={`I am doctor with ${item.speciality} as my speciality`}
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
