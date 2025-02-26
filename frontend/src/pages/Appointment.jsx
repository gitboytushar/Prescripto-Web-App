import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { CalendarArrowDown, Check } from 'lucide-react'
import RelatedDoctor from '../components/RelatedDoctor'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams() // docId from the URL
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext)

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    if (!docInfo) return

    let today = new Date()
    let updatedSlots = [] // Store all slots in an array

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        let day = currentDate.getDate().toString().padStart(2, '0')
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        let year = currentDate.getFullYear()

        const slotDate = day + '/' + month + '/' + year
        const slotTime = formattedTime

        // Ensure docInfo.slots_booked exists and filter correctly
        const isSlotBooked =
          docInfo?.slots_booked?.[slotDate]?.includes(slotTime) ?? false

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: slotTime
          })
        }

        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      updatedSlots.push(timeSlots)
    }

    setDocSlots(updatedSlots) // Set all slots at once after processing
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book an appointment.')
      window.scrollTo(0, 0)
      return navigate('/login')
    }

    setLoading(true)

    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate().toString().padStart(2, '0')
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let year = date.getFullYear()

      const slotDate = day + '/' + month + '/' + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
        window.scrollTo(0, 0)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return (
    docInfo && (
      <div className='min-h-screen'>
        {/* ----------- Doctor details ---------- */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img
              className='bg-primary w-full sm:max-w-72 rounded-lg'
              src={docInfo.image}
              alt='doctor profile photo'
            />
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-4 md:p-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* ------ Doc info: name, degree, experience */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name}
              <img
                className='w-5'
                src={assets.verified_icon}
                alt='verified icon'
              />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 '>
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className='py-0.5 px-2.5 border text-xs rounded-md cursor-default'>
                {docInfo.experience}
              </button>
            </div>

            {/* Doctor About */}
            <div>
              <p className='flex items-center gap-1.5 text-sm sm:text-base font-medium text-gray-900 mt-3 '>
                About
                <img className='w-3' src={assets.info_icon} alt='' />
              </p>
              <p className='text-sm sm:text-base text-gray-500 max-w-[750px] mt-1'>
                {docInfo.about}
              </p>
            </div>
            <p className='text-gray-800 font-medium mt-7 sm:mt-14 sm:translate-y-2'>
              Appointment Fees: &nbsp;
              <span>
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* --------- Booking Slots ----------- */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-800'>
          <p className='mt-8 flex items-center justify-center md:justify-start gap-2 py-1'>
            <span>Book from available slots</span>
            <CalendarArrowDown size={20} className='-translate-y-[1.2px]' />
          </p>
          <hr className='mt-2' />
          {/* days and data */}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-start gap-2 md:gap-4 mt-4'>
            <p className='text-sm text-gray-500 font-normal md:pr-4'>
              Select Date
            </p>
            <div className='flex flex-1 gap-3 items-center w-full overflow-x-scroll'>
              {docSlots.length &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`flex items-center flex-shrink-0 gap-2 text-center py-2.5 px-5 min-w-16 rounded-md cursor-pointer transition-all duration-150 ease-in ${
                      slotIndex === index
                        ? 'border border-primary bg-primary text-white'
                        : 'border border-gray-200'
                    } hover:border-primary`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>
          </div>
          <hr className='mt-4' />
          {/* timings */}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-start gap-2 md:gap-4 mt-4'>
            <p className='text-sm text-gray-500 font-normal md:pr-4'>
              Select Timing
            </p>
            <div className='flex flex-1 items-center gap-3 w-full overflow-x-scroll'>
              {docSlots.length &&
                docSlots[slotIndex].map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm tracking-wide font-normal text-gray-700 flex-shrink-0 px-4 py-2.5 rounded-md cursor-pointer transition-all duration-150 ease-in ${
                      item.time === slotTime
                        ? 'border border-primary bg-primary text-white'
                        : 'border border-gray-200'
                    } hover:border-primary`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>
          </div>
          <hr className='mt-4' />
          {/* confirm booking button */}
          <button
            onClick={bookAppointment}
            className={`flex items-center justify-center gap-2 mt-5 rounded-lg px-5 py-3.5 text-[14px] font-normal tracking-wide ${
              slotTime
                ? 'bg-primary text-white cursor-pointer active:scale-[96%] transition-all duration-100 ease-in'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!slotTime || loading}
          >
            <span className='select-none'>
              {loading ? 'In Process...' : 'Confirm Booking'}
            </span>
            {loading ? (
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            ) : (
              <Check size={18} />
            )}
          </button>
        </div>

        <hr className='mt-10 md:ml-10 select-none' />

        {/* Listing related doctors */}
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  )
}

export default Appointment
