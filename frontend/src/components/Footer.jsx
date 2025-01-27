import React from 'react'
import { assets } from '../assets/assets'
import { Copyright } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ---------- left section --------- */}
        <div>
          <img
            className='mb-5 w-40 pointer-events-none'
            src={assets.logo}
            alt='app logo'
          />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Welcome to Prescripto, your trusted partner in healthcare. We are
            dedicated to providing you with the best online appointment
            scheduling experience. Our mission is to connect patients with top
            healthcare professionals seamlessly and efficiently.
          </p>
        </div>
        {/* ---------- center section --------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li
              onClick={() => {
                navigate('/')
                scrollTo(0, 0)
              }}
              className='cursor-pointer hover:text-primary hover:underline transition-all duration-200 ease-in'
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate('/about')
                scrollTo(0, 0)
              }}
              className='cursor-pointer hover:text-primary hover:underline transition-all duration-200 ease-in'
            >
              About Us
            </li>
            <li
              onClick={() => {
                navigate('/contact')
                scrollTo(0, 0)
              }}
              className='cursor-pointer hover:text-primary hover:underline transition-all duration-200 ease-in'
            >
              Contact Us
            </li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* ---------- right section --------- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-7890</li>
            <a
              href='mailto:tusharwork.001@gmail.com'
              className='cursor-pointer hover:text-primary hover:underline transition-all duration-200 ease-in'
            >
              tusharwork.001@gmail.com
            </a>
          </ul>
        </div>
      </div>

      {/* -------- copyright text -------- */}
      <div>
        <hr />
        <p className='flex items-center md:justify-center gap-1 py-5 text-sm text-center text-gray-500'>
          <Copyright size={14} className='-translate-y-[0.75px]' />
          <span>Prescripto 2025 - All Rights Reserved.</span>
        </p>
      </div>
    </div>
  )
}

export default Footer
