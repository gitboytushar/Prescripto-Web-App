import React, { useContext, useState } from 'react'
import { assets } from '@/assets/assets'
import { Check, SquareCheckBig } from 'lucide-react'
import { AdminContext } from '@/context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [loading, setLoading] = useState(false)

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async event => {
    event.preventDefault()
    setLoading(true)
    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      )

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })

      // send data to mongodb database
      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { aToken } }
      )

      // ack and clear the fields
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
        setExperience('')
        setSpeciality('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred'
      toast.error(errorMessage)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // make submit btn active when form is filled
  const isFormValid = () => {
    return (
      name &&
      email &&
      password &&
      experience &&
      fees &&
      about &&
      speciality &&
      degree &&
      address1 &&
      address2
    )
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='m-2 w-full max-w-[800px] flex flex-col items-center sm:items-start justify-center gap-4 p-4 bg-gray-50 rounded'
    >
      <p className='text-2xl sm:text-3xl font-semibold tracking-wide text-primary'>
        Doctor Details
      </p>

      <div className='flex flex-col items-center sm:items-start justify-center gap-4 w-full motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.38s] motion-ease-spring-bouncier'>
        <div>
          <label htmlFor='doc-img'>
            <div className='min-w-44 p-2.5 rounded border border-gray-300 bg-gray-100 text-gray-500 flex flex-col items-center justify-center gap-2 cursor-crosshair mt-1 sm:mt-0 mb-1 sm:mb-0 active:scale-[95%] transition-all duration-75 ease-in'>
              <img
                className='size-32 sm:size-24 rounded-full border border-gray-300 object-contain'
                // note: generate temporary path for uploaded img to show as the img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=''
              />
              <p className='flex items-center justify-center gap-2'>
                {docImg ? 'Uploaded' : 'Upload Photograph'}
                {docImg ? <Check size={18} className='text-primary' /> : ''}
              </p>
            </div>
          </label>
          <input
            onChange={e => setDocImg(e.target.files[0])}
            type='file'
            id='doc-img'
            hidden
          />
        </div>

        <div className='flex flex-col md:flex-row justify-start items-start gap-4 sm:gap-20 text-gray-600'>
          <div className='flex flex-col items-start justify-center gap-4'>
            <div className='flex flex-col items-stretch gap-1'>
              <p>Name</p>
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Fullname'
                required
              />
            </div>

            <div className='flex flex-col items-stretch gap-1'>
              <p>Email</p>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='email'
                placeholder='Email Id'
                required
              />
            </div>

            <div className='flex flex-col items-stretch gap-1'>
              <p>Password</p>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='password'
                placeholder='Password'
                required
              />
            </div>

            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Experience</p>
              <select
                onChange={e => setExperience(e.target.value)}
                value={experience}
                name=''
                id=''
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100 appearance-none'
              >
                <option value='' disabled selected>
                  Select
                </option>
                <option value='1 Year'>1 Year</option>
                <option value='2 Years'>2 Years</option>
                <option value='3 Years'>3 Years</option>
                <option value='4 Years'>4 Years</option>
                <option value='5 Years'>5 Years</option>
                <option value='6 Years'>6 Years</option>
                <option value='7 Years'>7 Years</option>
                <option value='8 Years'>8 Years</option>
                <option value='9 Years'>9 Years</option>
                <option value='10 Years'>10 Years</option>
              </select>
            </div>

            <div className='flex flex-col items-stretch gap-1'>
              <p>Appointment Fees</p>
              <input
                onChange={e => setFees(e.target.value)}
                value={fees}
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='number'
                placeholder='₹₹'
                required
              />
            </div>
          </div>
          <div className='flex flex-col items-start justify-center gap-4'>
            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Speciality</p>
              <select
                onChange={e => setSpeciality(e.target.value)}
                value={speciality}
                name=''
                id=''
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100 appearance-none'
              >
                <option value='' disabled selected>
                  Select
                </option>
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Education</p>
              <input
                onChange={e => setDegree(e.target.value)}
                value={degree}
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Degree'
                required
              />
            </div>

            <div className='flex flex-col w-full items-stretch gap-1'>
              <p>Address</p>
              <input
                onChange={e => setAddress1(e.target.value)}
                value={address1}
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Line 1'
                required
              />
              <input
                onChange={e => setAddress2(e.target.value)}
                value={address2}
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100'
                type='text'
                placeholder='Line 2'
                required
              />
            </div>

            <div className='flex flex-col items-stretch gap-1 w-full'>
              <p>About</p>
              <textarea
                onChange={e => setAbout(e.target.value)}
                value={about}
                name=''
                id=''
                placeholder="Write a description to highlight the physician's approach"
                required
                className='px-2.5 py-2 w-[80vw] sm:w-80 placeholder:text-gray-400 tracking-wide font-normal rounded border border-gray-300 bg-gray-100 h-28 sm:h-[82px] resize-none'
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center sm:justify-end w-[93.6%] mt-4'>
        <button
          type='submit'
          disabled={!isFormValid() || loading}
          className={`py-3 px-5 rounded w-[50vw] sm:w-fit flex items-center justify-center gap-2 transition-all duration-200 ease-in ${
            !isFormValid() || loading
              ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white border border-primary hover:opacity-90 active:scale-[97%]'
          }`}
        >
          <span>{loading ? 'Adding...' : 'Add Doctor'}</span>
          {loading ? (
            <div className='w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
          ) : (
            <SquareCheckBig size={18} />
          )}
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
