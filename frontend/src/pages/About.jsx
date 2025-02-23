import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='mx-0 md:mx-10'>
      {/* section 1 */}
      <div className='text-center text-2xl pt-5 md:pt-10 text-gray-500'>
        <p>
          ABOUT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>

      <div className='my-7 md:my-10 flex flex-col items-center lg:flex-row gap-7 md:gap-12'>
        <img
          className='w-full md:max-w-[370px] rounded-lg'
          src={assets.about_image}
          alt='doctors image'
        />
        <div className='flex flex-col justify-center md:text-justify gap-4 md:gap-6 text-sm md:text-base text-gray-600'>
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className='text-gray-800 text-base md:text-xl md:mt-8'>
            Our Vision
          </b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      {/* seperator */}
      <hr className='my-10 md:my-16' />

      {/* section 2 */}
      <div className='text-xl md:text-2xl my-10 md:my-2 text-gray-600 uppercase text-center'>
        <p>
          Why <span className='text-gray-700 font-semibold'>Choose Us</span>
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-4 md:gap-2 p-0 md:p-10'>
        <div className='flex flex-col gap-3 md:gap-4 px-7 py-8 md:p-12 bg-gray-100 rounded hover:bg-primary hover:text-white md:hover:scale-[103%] transition-all duration-150 ease-in'>
          <b className='tracking-wide'>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className='flex flex-col gap-3 md:gap-4 px-7 py-8 md:p-12 bg-gray-100 rounded hover:bg-primary hover:text-white md:hover:scale-[103%] transition-all duration-150 ease-in'>
          <b className='tracking-wide'>Convenience:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className='flex flex-col gap-3 md:gap-4 px-7 py-8 md:p-12 bg-gray-100 rounded hover:bg-primary hover:text-white md:hover:scale-[103%] transition-all duration-150 ease-in'>
          <b className='tracking-wide'>Personalization:</b>
          <p>
            Tailored recommendations and reminders, To help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
