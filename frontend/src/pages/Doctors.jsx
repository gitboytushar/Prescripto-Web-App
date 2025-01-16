import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter(doc => doc.speciality === speciality)
      setFilterDoc(filtered)
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='min-h-screen'>
      <p className='text-gray-500'>
        Find and book appointments with doctors based on their specialities.
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-2 text-sm text-gray-800'>
          <p
            onClick={() =>
              speciality === 'General physician'
                ? navigate('/doctors')
                : navigate('/doctors/General physician')
            }
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 md:border border-gray-300 hover:border-primary rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'General physician'
                ? 'bg-primary border-primary text-white'
                : ''
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === 'Gynecologist'
                ? navigate('/doctors')
                : navigate('/doctors/Gynecologist')
            }
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 md:border border-gray-300 hover:border-primary rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Gynecologist'
                ? 'bg-primary border-primary text-white'
                : ''
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === 'Dermatologist'
                ? navigate('/doctors')
                : navigate('/doctors/Dermatologist')
            }
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 md:border border-gray-300 hover:border-primary rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Dermatologist'
                ? 'bg-primary border-primary text-white'
                : ''
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === 'Pediatricians'
                ? navigate('/doctors')
                : navigate('/doctors/Pediatricians')
            }
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 md:border border-gray-300 hover:border-primary rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Pediatricians'
                ? 'bg-primary border-primary text-white'
                : ''
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === 'Neurologist'
                ? navigate('/doctors')
                : navigate('/doctors/Neurologist')
            }
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 md:border border-gray-300 hover:border-primary rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Neurologist'
                ? 'bg-primary border-primary text-white'
                : ''
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === 'Gastroenterologist'
                ? navigate('/doctors')
                : navigate('/doctors/Gastroenterologist')
            }
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 md:border border-gray-300 hover:border-primary rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Gastroenterologist'
                ? 'bg-primary border-primary text-white'
                : ''
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className='w-full grid grid-cols-auto lg:grid-cols-4 gap-4'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:scale-[102%] transition-all duration-200 ease-linear group'
              key={index}
            >
              <img
                className='bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200 ease-in'
                src={item.image}
                alt='doctor profile pic'
              />
              <div className='p-4 '>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='size-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
