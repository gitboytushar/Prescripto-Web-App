import { AdminContext } from '@/context/AdminContext'
import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { X } from 'lucide-react'

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext)
  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

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
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b uppercase font-medium bg-white sticky top-0'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments
          .slice(0)
          .reverse()
          .map((item, index) => (
            <div
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
              key={index}
            >
              {/* appointment index number */}
              <p className='max-sm:hidden'>{index + 1}</p>
              {/* patient's image and name */}
              <div className='flex items-center gap-2'>
                <img
                  className='size-8 aspect-square object-cover rounded-[5px] border cursor-pointer hover:opacity-80 select-none'
                  draggable='false'
                  src={item.userData.image}
                  alt='user image'
                  onClick={() => setSelectedImage(item.userData.image)}
                />
                <p>{item.userData.name}</p>
              </div>
              {/* patient's age or Not Available */}
              {!isNaN(Date.parse(item.userData.dob)) ? (
                <p className='max-sm:hidden'>
                  {calculateAge(item.userData.dob)}
                </p>
              ) : (
                <p className='max-sm:hidden'>NA</p>
              )}
              {/* appointement date & time */}
              <p>
                {slotDateFormat(item.slotDate)}, &nbsp; {item.slotTime}
              </p>
              {/* doctor data */}
              <div className='flex items-center gap-2'>
                <img
                  className='size-8 aspect-square object-cover rounded-[5px] border border-primary/20 bg-primary/10 cursor-pointer hover:opacity-80 select-none'
                  draggable='false'
                  src={item.docData.image}
                  alt='doctor image'
                  onClick={() => setSelectedImage(item.docData.image)}
                />
                <p>{item.docData.name}</p>
              </div>
              <p>
                {currencySymbol}
                {item.amount}
              </p>
              {/* check appointment status */}
              {item.cancelled ? (
                <p className='text-red-400 w-full py-1'>Cancelled</p>
              ) : (
                <div className='w-full'>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='p-1 rounded text-red-400 border border-red-400 hover:border-transparent hover:text-white hover:bg-red-400 hover:scale-105 hover:rotate-180 active:scale-50 transition-all duration-300 ease-in-out'
                  >
                    <span>
                      <X size={16} />
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllApointments
