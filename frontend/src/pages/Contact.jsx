import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='md:my-16'>
      <div className='text-center text-2xl md:text-3xl pt-3 md:pt-0 my-4 text-gray-500'>
        <p>
          CONTACT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>

      <div className='mt-7 md:my-12 flex flex-col justify-center md:flex-row gap-7 md:gap-10 mb-28 text-sm md:text-lg'>
        <img
          className='w-full md:max-w-[370px] rounded'
          src={assets.contact_image}
          alt='image'
        />
        <div className='flex flex-col justify-center items-start gap-4 md:gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>
            50709 Wilims Station, <br />
            Suite 350, Washington, USA.
          </p>
          <p className='text-gray-500'>
            Tel: (415) 555-0132 <br />
            Email: tusharwork.001@gmail.com
          </p>
          <p className='font-semibold text-lg text-gray-600'>
            CAREERS AT PRESCRIPTO
          </p>
          <p className='text-gray-500'>
            Learn more about our team and Job openings.
          </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-200 ease-in-out rounded active:scale-95 cursor-not-allowed'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
