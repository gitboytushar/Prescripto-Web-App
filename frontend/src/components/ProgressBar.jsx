import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div className='w-[50vw] sm:w-[25vw] pt-[50%] sm:pt-[20%] min-h-[50vh] sm:min-h-[60vh]'>
      <div className='flex justify-between mb-1'>
        <span className='text-base font-medium text-primary'>Loading...</span>
        <span className='text-base font-medium text-primary'>{progress}%</span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-2.5'>
        <div
          className='bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
