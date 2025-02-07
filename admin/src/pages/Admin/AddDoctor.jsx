import React from 'react'
import { UserRoundPlus } from 'lucide-react'
import { assets } from '@/assets/assets'

const AddDoctor = () => {
  return (
    <form className='m-2 w-full max-w-[800px] flex flex-col items-center sm:items-start justify-center gap-6 p-4 bg-gray-50 rounded'>
      <p className='text-2xl sm:text-3xl font-semibold tracking-wide text-primary'>
        Doctor Details
      </p>

      <div className='flex flex-col items-center sm:items-start justify-center gap-5 w-full'>
        <div>
          <label htmlFor='doc-img'>
            <div className='w-[80vw] sm:w-[162%] py-4 rounded border border-gray-300 bg-gray-100 text-gray-500 flex items-center justify-center gap-4 cursor-pointer my-3'>
              <UserRoundPlus size={26} />
              <p>Upload a Photograph</p>
            </div>
          </label>
          <input type='file' id='doc-img' hidden />
        </div>

        <div className='flex flex-col md:flex-row justify-start items-start gap-4 sm:gap-20 text-gray-600'>
          <div className='flex flex-col items-start justify-center gap-4'>
            <div className='flex flex-col items-stretch gap-1'>
              <p>Name</p>
              <input
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Fullname'
                required
              />
            </div>

            <div className='flex flex-col items-stretch gap-1'>
              <p>Email</p>
              <input
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='email'
                placeholder='Email Id'
                required
              />
            </div>

            <div className='flex flex-col items-stretch gap-1'>
              <p>Password</p>
              <input
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='password'
                placeholder='Password'
                required
              />
            </div>

            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Experience</p>
              <select
                name=''
                id=''
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100 appearance-none'
              >
                <option value='' disabled selected>
                  Select
                </option>
                <option value='1 Year'>1 Year</option>
                <option value='2 Year'>2 Year</option>
                <option value='3 Year'>3 Year</option>
                <option value='4 Year'>4 Year</option>
                <option value='5 Year'>5 Year</option>
                <option value='6 Year'>6 Year</option>
                <option value='7 Year'>7 Year</option>
                <option value='8 Year'>8 Year</option>
                <option value='9 Year'>9 Year</option>
                <option value='10 Year'>10 Year</option>
              </select>
            </div>

            <div className='flex flex-col items-stretch gap-1'>
              <p>Appointment Fees</p>
              <input
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='number'
                placeholder='₹₹'
                required
              />
            </div>
          </div>
          <div className='flex flex-col items-start justify-center gap-4'>
            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Speciality</p>
              <select
                name=''
                id=''
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100 appearance-none'
              >
                <option value='' disabled selected>
                  Select
                </option>
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Education</p>
              <input
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Degree'
                required
              />
            </div>

            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Address</p>
              <input
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Line 1'
                required
              />
              <input
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Line 2'
                required
              />
            </div>

            <div className='flex flex-col items-stretch gap-1 w-full'>
              <p>About</p>
              <textarea
                name=''
                id=''
                placeholder="Write a description to highlight the physician's approach"
                required
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100 h-28 sm:h-[82px] resize-none'
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center sm:justify-end w-[93.6%]'>
        <button className='bg-primary text-white py-3 px-5 rounded w-[80vw] sm:w-[20%] mt-8'>
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
