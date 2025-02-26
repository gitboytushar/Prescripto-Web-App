import { assets } from '@/assets/assets'
import { AdminContext } from '@/context/AdminContext'
import { AppContext } from '@/context/AppContext'
import { CalendarDays, Loader2, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext)

  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 100))
      const dataFetch = getDashData()

      Promise.all([minLoadingTime, dataFetch]).then(() => setIsLoading(false))
    }
  }, [aToken])

  if (isLoading) {
    return (
      <div className='w-full sm:w-1/2 h-[calc(100vh-80px)] flex items-center justify-center'>
        <Loader2 className='size-14 animate-spin text-primary' />
      </div>
    )
  }

  return (
    dashData && (
      <div className='m-2 w-full sm:w-[80vw] flex flex-col items-center sm:items-start justify-center pb-2 gap-4 sm:p-4 bg-gray-50 rounded'>
        {/* Profile Image Popup view */}
        {selectedImage && (
          <div
            className='fixed inset-0 bg-black/60 w-screen flex items-center justify-center z-50'
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt='Enlarged view'
              draggable='false'
              className='size-[300px] sm:size-[470px] object-cover rounded-full border bg-gray-700 select-none motion-preset-expand motion-duration-300'
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}

        <h1 className='text-2xl mt-3 sm:mt-0 sm:text-3xl font-semibold px-1 tracking-wide text-primary select-none motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.38s] motion-ease-spring-bouncier'>
          Overview
        </h1>

        <div className='flex flex-col items-stretch gap-5 motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.38s] motion-ease-spring-bouncier'>
          {/* ----------- glimpse ------------ */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            {/* doctors */}
            <div className='bg-white border p-3.5 sm:pl-4 sm:pr-12 sm:py-4 min-w-52 rounded-xl flex items-center gap-4 group hover:bg-primary hover:shadow-xl hover:border-transparent hover:cursor-none transition-all duration-300 ease-in-out'>
              <img
                className='size-12 sm:size-16 rounded-full select-none'
                draggable='false'
                src={assets.doctor_icon}
                alt='doctor icon'
              />
              <div className='sm:h-16 flex flex-col items-start flex-1 select-none'>
                <p className='w-full font-bold text-gray-700 text-2xl sm:text-3xl group-hover:text-white transition-all duration-300 ease-in-out'>
                  {dashData.doctors}
                </p>
                <p className='text-base sm:text-xl w-full text-gray-500 group-hover:text-white/85 transition-all duration-300 ease-in-out'>
                  Doctors
                </p>
              </div>
            </div>
            {/* patients */}
            <div className='bg-white border p-3.5 sm:pl-4 sm:pr-12 sm:py-4 min-w-52 rounded-xl flex items-center gap-4 group hover:bg-primary hover:shadow-xl hover:border-transparent hover:cursor-none transition-all duration-300 ease-in-out'>
              <img
                className='size-12 sm:size-16 rounded-full select-none'
                draggable='false'
                src={assets.patients_icon}
                alt='doctor icon'
              />
              <div className='sm:h-16 flex flex-col items-start flex-1 select-none'>
                <p className='w-full font-bold text-gray-700 text-2xl sm:text-3xl group-hover:text-white transition-all duration-300 ease-in-out'>
                  {dashData.patients}
                </p>
                <p className='text-base sm:text-xl w-full text-gray-500 group-hover:text-white/85 transition-all duration-300 ease-in-out'>
                  Patients
                </p>
              </div>
            </div>
            {/* appointments */}
            <div className='bg-white border p-3.5 sm:pl-4 sm:pr-12 sm:py-4 min-w-52 rounded-xl flex items-center gap-4 group hover:bg-primary hover:shadow-xl hover:border-transparent hover:cursor-none transition-all duration-300 ease-in-out'>
              <img
                className='size-12 sm:size-16 rounded-full select-none'
                draggable='false'
                src={assets.appointments_icon}
                alt='doctor icon'
              />
              <div className='sm:h-16 flex flex-col items-start flex-1 select-none'>
                <p className='w-full font-bold text-gray-700 text-2xl sm:text-3xl group-hover:text-white transition-all duration-300 ease-in-out'>
                  {dashData.appointments}
                </p>
                <p className='text-base sm:text-xl w-full text-gray-500 group-hover:text-white/85 transition-all duration-300 ease-in-out'>
                  Appointments
                </p>
              </div>
            </div>
          </div>

          {/* ------------ 5 most recent appointments ------------ */}
          <div className='bg-gray-100 w-[90vw] sm:w-auto border px-4 pt-5 pb-2.5 rounded-xl'>
            <div className='flex items-center gap-3 pb-3.5 uppercase text-gray-700 border-b'>
              <CalendarDays size={24} strokeWidth={2} />
              <p className='text-base sm:text-lg font-semibold tracking-wide'>
                Recently Booked Doctors
              </p>
            </div>

            {/* bookings info */}
            <div className='mt-5'>
              {dashData.latestAppointments.map((item, index) => (
                <div
                  className='flex items-center gap-2 sm:gap-4 px-3 py-3 sm:px-6 sm:py-4 bg-white rounded-lg mb-1.5'
                  key={index}
                >
                  <img
                    className='size-9 sm:size-12 aspect-square object-cover rounded-full bg-gray-700 cursor-pointer hover:opacity-80 select-none'
                    draggable='false'
                    src={item.docData.image}
                    alt='doc img'
                    onClick={() => setSelectedImage(item.docData.image)}
                  />
                  {/* info */}
                  <div className='flex-1'>
                    <p className='text-sm sm:text-lg font-medium'>
                      {item.docData.name}
                    </p>
                    <p className='text-gray-600 text-sm sm:text-base'>
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                  {/* cta and appointment status */}
                  {item.cancelled ? (
                    <p className='text-red-400 text-center text-xs sm:text-base min-w-20 sm:min-w-28 py-1'>
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className='text-green-500 text-center text-xs sm:text-base min-w-20 sm:min-w-28 py-1'>
                      Completed
                    </p>
                  ) : (
                    <div className='min-w-16 sm:min-w-28 flex justify-center'>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger>
                            <button
                              onClick={() => cancelAppointment(item._id)}
                              className='p-1 rounded text-red-400 border border-red-400 hover:border-transparent hover:text-white hover:bg-red-400 hover:scale-105 hover:rotate-180 active:scale-50 transition-all duration-300 ease-in-out'
                            >
                              <span>
                                <X size={16} />
                              </span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side='top'
                            align='center'
                            className='px-2.5 py-2 mb-1 rounded-[6px] border-none bg-primary text-white text-xs tracking-wide'
                          >
                            Cancel Appointment
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboard
