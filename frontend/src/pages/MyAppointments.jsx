import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const slotDateFormat = slotDate => {
    const dateArray = slotDate.split('/')
    return (
      dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
    )
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token }
      })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const cancelAppointment = async appointmentId => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <p className='mb-2 md:mb-5 md:mt-8 text-xl md:text-3xl font-medium text-neutral-400'>
        My Appointments
      </p>
      <div className='w-[80vw] md:w-full md:px-44'>
        {appointments.map((item, index) => (
          <div
            className='flex flex-col md:flex-row gap-2.5 items-center justify-between p-4 md:p-7 bg-gray-50 my-2 rounded-md'
            key={index}
          >
            {/* booking info */}
            <div className='w-full flex flex-col items-stretch md:flex-row gap-4'>
              {/* doctor profile */}
              <div className='flex justify-center'>
                <img
                  className='w-44 bg-indigo-100 rounded-full md:rounded-md'
                  src={item.docData.image}
                  alt='doctor photo'
                />
              </div>

              {/* appointment info */}
              <div className='text-base text-zinc-600 text-center md:text-start'>
                <p className='text-neutral-800 font-semibold'>
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-2'>Address:</p>
                <p className='text-sm'>{item.docData.address.line1}</p>
                <p className='text-sm'>{item.docData.address.line2}</p>
                <p className='mt-2'>
                  <span className='text-sm text-neutral-700 font-medium'>
                    Date & Time: &nbsp;
                  </span>
                  <br />
                  {slotDateFormat(item.slotDate)} - {item.slotTime}
                </p>
              </div>
            </div>

            {/* for making the design dynamic */}
            <div></div>

            {/* cta buttons */}
            <div className='flex flex-col gap-2 items-center justify-center'>
              {!item.cancelled && (
                <button className='text-sm text-center min-w-48 px-2.5 py-2 md:px-4 md:py-3 border rounded bg-primary text-white hover:opacity-90 active:scale-[90%] transition-all duration-200 ease-in'>
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-sm text-black text-center min-w-48 px-2.5 py-2 md:px-4 md:py-3 border border-stone-500 hover:border-transparent rounded hover:bg-red-600 hover:text-white active:scale-[90%] transition-all duration-200 ease-in'
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className='text-sm tracking-wider min-w-48 px-2.5 py-2 md:px-4 md:py-3 border border-red-300 rounded cursor-not-allowed bg-zinc-100 text-red-500'>
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
