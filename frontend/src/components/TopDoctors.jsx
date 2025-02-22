import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  // useContext hook in react gets the value through props from the parent component
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='w-2/3 md:w-fit text-center text-sm md:text-base'>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-6 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300 ease-linear group'
            key={index}
          >
            <img
              className='bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200 ease-in'
              src={item.image}
              alt='doctor profile pic'
            />
            <div className='p-4 '>
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <p
                  className={`size-2 ${
                    item.available ? 'bg-green-500' : 'bg-red-500'
                  } rounded-full`}
                ></p>
                {item.available ? <p>Available</p> : <p>Not Available</p>}
              </div>
              <p className='text-gray-900 text-lg font-medium whitespace-nowrap overflow-x-scroll hide-the-scrollbar'>
                {item.name}
              </p>
              <p className='text-gray-600 text-sm whitespace-nowrap overflow-x-scroll hide-the-scrollbar'>
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/doctors')
          scrollTo(0, 0)
        }}
        className='bg-blue-50 text-gray-600 hover:text-black hover:tracking-widest transition-all duration-200 ease-linear px-12 py-3 rounded-lg mt-10'
      >
        <span>More</span>
      </button>
    </div>
  )
}

export default TopDoctors
