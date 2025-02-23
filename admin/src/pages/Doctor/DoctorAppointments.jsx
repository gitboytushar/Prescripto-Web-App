import { AppContext } from '@/context/AppContext'
import { DoctorContext } from '@/context/DoctorContext'
import React, { useContext, useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import ProgressBar from '@/components/ProgressBar'
import { motion } from 'motion/react'

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment
  } = useContext(DoctorContext)

  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext)

  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // loader progress simulation
  const simulateProgress = () => {
    setLoadingProgress(0)
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 200)
    return interval
  }

  const fetchAppointments = async () => {
    try {
      setIsLoading(true)
      const progressInterval = simulateProgress()

      await getAppointments()

      setLoadingProgress(100)
      clearInterval(progressInterval)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
        setLoadingProgress(0)
      }, 500)
    }
  }

  useEffect(() => {
    if (dToken) {
      fetchAppointments()
    }
  }, [dToken])

  return (
    <div className='m-2 w-full sm:w-[80vw] flex flex-col items-center sm:items-start justify-center pb-2 gap-4 sm:p-4 bg-gray-50 rounded'>
      {/* Profile Image Popup view */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt='Enlarged view'
            draggable='false'
            className='size-[300px] sm:size-[450px] object-cover rounded-2xl border bg-primary select-none motion-preset-expand motion-duration-300'
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <h1 className='text-2xl mt-3 sm:mt-0 sm:text-3xl font-semibold px-1 tracking-wide text-primary select-none'>
        All Appointments
      </h1>

      <div className='bg-white w-full border rounded-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll doctorlist-scrollbar'>
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[200px] flex-col'>
            <ProgressBar progress={loadingProgress} />
          </div>
        ) : (
          <>
            <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_2.5fr_1fr_1.5fr] grid-flow-col py-3.5 px-6 border-b uppercase font-medium bg-white sticky top-0'>
              <p>#</p>
              <p>Patient</p>
              <p>Age</p>
              <p>Payment Mode</p>
              <p>Date & Time</p>
              <p>Fees</p>
              <p>Actions</p>
            </div>

            {appointments
              .slice(0)
              .reverse()
              .map((item, index) => (
                <motion.div
                  className='max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_2fr_2.5fr_1fr_1.5fr] items-center text-gray-600 sm:text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.05 }}
                >
                  <p className='max-sm:hidden'>{index + 1}</p>

                  <div className='flex items-center gap-2'>
                    <img
                      className='size-8 aspect-square object-cover rounded-[5px] border cursor-pointer hover:opacity-80 select-none'
                      draggable='false'
                      src={item.userData.image}
                      alt='user image'
                      onClick={() => setSelectedImage(item.userData.image)}
                    />
                    <p className='capitalize'>{item.userData.name}</p>
                  </div>

                  {!isNaN(Date.parse(item.userData.dob)) ? (
                    <p className='max-sm:hidden'>
                      {calculateAge(item.userData.dob)}
                    </p>
                  ) : (
                    <p className='max-sm:hidden text-rose-300'>NA</p>
                  )}

                  <div className='flex w-full justify-end sm:justify-start'>
                    <p
                      className={`text-xs min-w-14 text-center px-2 py-1 rounded-[5px] tracking-wider select-none text-black ${
                        item.payment ? 'bg-green-200' : 'bg-orange-200'
                      }`}
                    >
                      {item.payment ? 'Online' : 'Cash'}
                    </p>
                  </div>

                  <p>
                    {slotDateFormat(item.slotDate)}, &nbsp;{item.slotTime}
                  </p>

                  <p className='w-full flex justify-end sm:justify-start'>
                    {currencySymbol}
                    {item.amount}
                  </p>

                  <div>
                    {/* check appointment status */}
                    {item.cancelled ? (
                      <p className='text-red-400 w-full flex justify-center sm:justify-start py-1'>
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className='text-green-500 w-full flex justify-center sm:justify-start py-1'>
                        Completed
                      </p>
                    ) : (
                      <div className='w-full flex gap-2 justify-center sm:justify-start'>
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
                </motion.div>
              ))}
          </>
        )}
      </div>
    </div>
  )
}

export default DoctorAppointments
