import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ChevronDown } from 'lucide-react'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
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
      <div className='flex flex-col sm:flex-row items-start gap-3 sm:gap-5 mt-5'>
        <button
          className={`py-2 px-3 flex items-center gap-1 border rounded-lg text-sm transition-all duration-300 ease-in-out sm:hidden ${
            showFilter ? '' : 'bg-primary text-white'
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filter by speciality
          <ChevronDown
            size={18}
            className={`transition-transform duration-500 ease-in-out ${
              showFilter ? 'rotate-0' : '-rotate-90'
            }`}
          />
        </button>
        <div
          className={`flex-col bg-gray-100 p-4 rounded-lg sm:bg-transparent sm:p-0 gap-2 text-sm text-gray-800 ${
            showFilter
              ? 'flex motion-translate-x-in-[0%] motion-translate-y-in-[-5%] motion-duration-[0.38s] motion-ease-spring-smooth'
              : 'hidden sm:flex'
          }`}
        >
          <p
            onClick={() =>
              speciality === 'General physician'
                ? navigate('/doctors')
                : navigate('/doctors/General physician')
            }
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 border border-gray-300 hover:border-primary rounded-md md:rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'General physician'
                ? 'bg-primary border-primary text-white'
                : 'bg-white'
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
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 border border-gray-300 hover:border-primary rounded-md md:rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Gynecologist'
                ? 'bg-primary border-primary text-white'
                : 'bg-white'
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
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 border border-gray-300 hover:border-primary rounded-md md:rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Dermatologist'
                ? 'bg-primary border-primary text-white'
                : 'bg-white'
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
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 border border-gray-300 hover:border-primary rounded-md md:rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Pediatricians'
                ? 'bg-primary border-primary text-white'
                : 'bg-white'
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
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 border border-gray-300 hover:border-primary rounded-md md:rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Neurologist'
                ? 'bg-primary border-primary text-white'
                : 'bg-white'
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
            className={`w-[230px] md:w-auto pl-3 py-2.5 pr-16 border border-gray-300 hover:border-primary rounded-md md:rounded-lg transition-all duration-100 ease-linear cursor-pointer select-none ${
              speciality === 'Gastroenterologist'
                ? 'bg-primary border-primary text-white'
                : 'bg-white'
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className='w-full grid grid-cols-auto lg:grid-cols-4 gap-4'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-md md:rounded-xl overflow-hidden cursor-pointer hover:scale-[102%] transition-all duration-200 ease-linear group'
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
