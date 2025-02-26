import { assets } from '@/assets/assets'
import { AppContext } from '@/context/AppContext'
import { DoctorContext } from '@/context/DoctorContext'
import { CalendarDays, Check, Loader2, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment
  } = useContext(DoctorContext)

  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { slotDateFormat, currencySymbol } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 100))
      const dataFetch = getDashData()

      Promise.all([minLoadingTime, dataFetch]).then(() => setIsLoading(false))
    }
  }, [dToken])

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
        {/* Dynamic Title - Greet Doctor based on dayTime */}
        <h1 className='text-2xl mt-3 sm:mt-0 sm:text-3xl font-semibold px-1 tracking-wide text-primary select-none text-center sm:text-start motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.38s] motion-ease-spring-bouncier'>
          {(() => {
            const hours = new Date().getHours()
            let greeting
            if (hours < 12) greeting = 'Good morning'
            else if (hours < 18) greeting = 'Good afternoon'
            else greeting = 'Good evening'
            return (
              <div>
                {greeting}, <br className='block sm:hidden' />
                <span className='text-gray-500'>{dashData.docName.name}</span>
              </div>
            )
          })()}
        </h1>
        <div className='flex flex-col items-stretch gap-5 motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.38s] motion-ease-spring-bouncier'>
          {/* ----------- glimpse ------------ */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            {/* doctors */}
            <div className='bg-white border p-3.5 sm:pl-4 sm:pr-12 sm:py-4 min-w-52 rounded-xl flex items-center gap-4 group hover:bg-primary hover:shadow-xl hover:border-transparent hover:cursor-none transition-all duration-300 ease-in-out'>
              <img
                className='size-12 sm:size-16 rounded-full select-none'
                draggable='false'
                src={assets.earning_icon}
                alt='doctor icon'
              />
              <div className='sm:h-16 flex flex-col items-start flex-1 select-none'>
                <p className='w-full font-bold text-gray-700 text-2xl sm:text-3xl group-hover:text-white transition-all duration-300 ease-in-out'>
                  {currencySymbol}&nbsp;
                  {dashData.earnings > 1000
                    ? (dashData.earnings / 1000).toFixed(1) + 'K'
                    : dashData.earnings}
                </p>
                <p className='text-base sm:text-xl w-full text-gray-500 group-hover:text-white/85 transition-all duration-300 ease-in-out'>
                  Earnings
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
                Latest Bookings
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
                    src={item.userData.image}
                    alt='doc img'
                    onClick={() => setSelectedImage(item.userData.image)}
                  />
                  {/* info */}
                  <div className='flex-1'>
                    <p className='text-sm sm:text-lg font-medium capitalize'>
                      {item.userData.name}
                    </p>
                    <p className='text-gray-600 text-xs sm:text-base'>
                      {slotDateFormat(item.slotDate)},&nbsp;{item.slotTime}
                    </p>
                  </div>
                  {/* appointment status */}
                  <div className='min-w-24'>
                    {item.cancelled ? (
                      <p className='text-red-400 text-xs sm:text-base w-full flex justify-center py-1'>
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className='text-green-500 text-xs sm:text-base w-full flex justify-center py-1'>
                        Completed
                      </p>
                    ) : (
                      <div className='w-full flex gap-2 justify-center'>
                        {/* ------- cancel btn ------ */}
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => cancelAppointment(item._id)}
                                className='p-1 rounded text-red-400 border border-red-400 hover:border-transparent hover:text-white hover:bg-red-400 hover:scale-105 active:scale-50 transition-all duration-300 ease-in-out'
                              >
                                <span>
                                  <X size={18} />
                                </span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side='left'
                              align='center'
                              className='px-3 py-2 mr-1 text-center rounded-[6px] text-xs tracking-widest border-none bg-primary text-white'
                            >
                              Cancel <br /> Appointment
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {/* ----- complete btn --------- */}
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => completeAppointment(item._id)}
                                className='p-1 rounded text-green-500 border border-green-500 hover:border-transparent hover:text-white hover:bg-green-500 hover:scale-105 active:scale-50 transition-all duration-300 ease-in-out'
                              >
                                <span>
                                  <Check size={18} />
                                </span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side='right'
                              align='center'
                              className='px-3 py-2 ml-1 text-center rounded-[6px] text-xs tracking-widest border-none bg-primary text-white'
                            >
                              Mark as <br /> Completed
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorDashboard
