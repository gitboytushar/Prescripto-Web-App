import { AdminContext } from '@/context/AdminContext'
import React, { useContext, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (aToken) {
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 100))
      const dataFetch = getAllDoctors()

      Promise.all([minLoadingTime, dataFetch]).then(() => setIsLoading(false))
    }
  }, [aToken])

  if (isLoading) {
    return (
      <div className='w-full h-[calc(100vh-80px)] flex items-center justify-center'>
        <Loader2 className='size-14 animate-spin text-primary' />
      </div>
    )
  }

  return (
    <div className='m-2 w-full sm:w-[80vw] flex flex-col items-center sm:items-start justify-center pb-2 gap-4 sm:p-4 bg-gray-50 rounded'>
      <h1 className='text-2xl mt-3 sm:mt-0 sm:text-3xl font-semibold px-1 tracking-wide text-primary'>
        All Doctors
      </h1>

      <div className='w-full flex flex-row items-center justify-center sm:justify-start flex-wrap gap-2 p-1 sm:gap-5 sm:max-h-[81.5vh] sm:overflow-y-scroll doctorlist-scrollbar'>
        {doctors.map((item, index) => (
          <motion.div
            className='border border-primary/50 rounded-md w-[45vw] sm:w-56 overflow-hidden group hover:scale-[101%] transition-all duration-200 ease-in bg-primary/10'
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0.05 }}
          >
            <img
              className='bg-primary/10 group-hover:bg-primary/50 transition-all duration-200 ease-in'
              src={item.image}
              alt='doctor image'
            />
            <div className='px-4 py-3 flex flex-col items-stretch justify-center'>
              <p className='text-neutral-800 text-base whitespace-nowrap overflow-x-scroll sm:text-lg font-medium hide-the-scrollbar'>
                {item.name}
              </p>
              <p className='text-zinc-600 text-sm whitespace-nowrap overflow-x-scroll hide-the-scrollbar'>
                {item.speciality}
              </p>
              <div className='flex items-center justify-start mt-2.5 gap-1.5'>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <input
                        onChange={() => changeAvailability(item._id)}
                        className='size-3.5 -translate-y-[0.5px] cursor-pointer hover:scale-[115%] active:scale-[90%] transition-all duration-200 ease-in-out'
                        type='checkbox'
                        checked={item.available}
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      side='top'
                      align='center'
                      className='px-3 py-2.5 mb-1 shadow-xl shadow-black/20 bg-primary text-white border-none rounded-[6px] text-sm text-center capitalize'
                    >
                      Click to change <br /> Doctor's availability
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className='text-sm font-medium tracking-wide'>Available</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
