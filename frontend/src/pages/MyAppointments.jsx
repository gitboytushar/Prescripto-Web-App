import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const [animatedAppointments, setAnimatedAppointments] = useState(new Set())

  const navigate = useNavigate()

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

  const initPay = order => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async response => {
        console.log(response)
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verify-razorpay',
            response,
            { headers: { token } }
          )
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async appointmentId => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }
    getUserAppointments()
  }, [token])

  // ------- Paid Button Welcome Animation Playback Config ----------
  useEffect(() => {
    const savedAnimations = localStorage.getItem('animatedAppointments')
    if (savedAnimations) {
      setAnimatedAppointments(new Set(JSON.parse(savedAnimations)))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(
      'animatedAppointments',
      JSON.stringify([...animatedAppointments])
    )
  }, [animatedAppointments])

  // show all or less appointments
  const [showAll, setShowAll] = useState(false)
  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <p className='mb-2 md:mb-5 md:mt-8 text-xl md:text-3xl font-medium text-gray-500'>
        My Appointments
      </p>
      <div className='w-[90vw] md:w-full md:px-44'>
        {(showAll ? appointments : appointments.slice(0, 4)).map(
          (item, index) => (
            <div
              className='flex flex-col md:flex-row gap-2.5 items-center sm:items-end justify-between p-5 md:p-7 bg-gray-50 border border-gray-200 my-2 rounded-md mb-5'
              key={index}
            >
              {/* booking info */}
              <div className='w-full flex flex-col items-stretch md:flex-row gap-4'>
                {/* doctor profile */}
                <div className='flex justify-center'>
                  <img
                    className='w-56 sm:w-44 bg-indigo-100 rounded-md border border-primary/30'
                    draggable='false'
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
                {!item.cancelled && item.payment && (
                  <button
                    className={`text-sm tracking-wider min-w-48 px-2.5 py-2.5 md:px-4 md:py-3 border border-green-600 rounded cursor-not-allowed bg-green-50 text-green-600 ${
                      !animatedAppointments.has(item._id)
                        ? 'motion-preset-confetti motion-duration-1500'
                        : ''
                    }`}
                    onAnimationEnd={() => {
                      if (!animatedAppointments.has(item._id)) {
                        setAnimatedAppointments(
                          prev => new Set([...prev, item._id])
                        )
                      }
                    }}
                  >
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className='text-sm text-center min-w-48 px-2.5 py-2.5 md:px-4 md:py-3 border rounded bg-primary text-white hover:opacity-90 active:scale-[90%] transition-all duration-200 ease-in-out'
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='text-sm text-stone-600 text-center min-w-48 px-2.5 py-2.5 md:px-4 md:py-3 border border-stone-500 hover:border-transparent rounded hover:bg-red-600 hover:text-white active:scale-[90%] transition-all duration-200 ease-in-out'
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className='text-sm tracking-wider min-w-48 px-2.5 py-2.5 md:px-4 md:py-3 border border-red-300 rounded cursor-not-allowed bg-red-50 text-red-500 transition-all duration-200 ease-in-out'>
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          )
        )}
        {/* show all/less button */}
        {appointments.length > 4 && (
          <div className='w-full flex justify-center'>
            <button
              onClick={toggleShowAll}
              className='text-sm text-center min-w-32 px-2.5 py-2.5 md:px-4 md:py-3 border border-primary rounded-md bg-primary text-white hover:shadow-lg hover:opacity-95 active:scale-[90%] transition-all duration-150 ease-in'
            >
              {showAll ? 'Show Less' : 'Show All'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments
