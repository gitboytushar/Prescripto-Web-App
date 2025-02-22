import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctor = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDocs, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        doc => doc.speciality === speciality && doc._id !== docId
      )
      setRelDocs(doctorData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className='flex flex-col items-center md:items-start gap-3 text-gray-900 mt-8 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='w-2/3 md:w-fit text-center text-sm md:text-base'>
        Select another doctor from the same speciality.
      </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-6 sm:px-0'>
        {relDocs.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:scale-[102%] transition-all duration-200 ease-linear group'
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
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctor
