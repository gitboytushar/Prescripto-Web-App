import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '@/context/DoctorContext'
import { Loader } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { setAtoken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', {
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAtoken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', {
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          console.log(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error('Login failed', error)
      alert('Login failed. Please check your credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-gray-900 h-screen overflow-hidden'>
      <form
        onSubmit={onSubmitHandler}
        className='min-h-[80vh] flex items-center motion-preset-pop motion-duration-300'
      >
        <div className='flex flex-col gap-6 m-auto items-start p-5 md:p-8 min-w-[340px] sm:min-w-96 rounded-xl border border-gray-700 text-zinc-600 text-sm shadow-lg relative overflow-hidden bg-gray-800'>
          {/* lottie loop animation graphic at top */}
          <DotLottieReact
            className='absolute -top-6 scale-110 left-0 w-full -z-1 pointer-events-none'
            src='https://lottie.host/7d2ab86a-2cad-4c61-86c3-c492665171ad/nk1Wcvt05h.lottie'
            loop
            autoplay
          />

          {/* form title */}
          <div className='w-full text-center text-neutral-300 select-none mt-10'>
            <p className='text-2xl font-semibold'>
              <span>{state}</span>&nbsp;Panel
            </p>
          </div>

          {/* form input area */}
          <div className='flex flex-col gap-3 w-full items-stretch font-medium'>
            <div className='w-full text-neutral-400 font-normal'>
              <p>Email</p>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                className='rounded-md w-full p-2 mt-2 text-base text-black font-normal'
                type='email'
                required
              />
            </div>
            <div className='w-full text-neutral-400 font-normal'>
              <p>Password</p>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                className='rounded-md w-full p-2 mt-2 text-base text-black font-normal'
                type='password'
                required
              />
            </div>
          </div>

          <div className='flex flex-col gap-4 mt-1 w-full items-stretch text-center text-neutral-200'>
            <button
              className={`bg-primary text-white w-full h-12 rounded-md text-base ${
                loading
                  ? 'cursor-not-allowed'
                  : 'hover:opacity-90 transition-opacity duration-150 ease-linear'
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <Loader size={25} className='animate-spin' />
                </div>
              ) : (
                'Login'
              )}
            </button>
            {/* button to switch between signup and login forms */}
            {state === 'Admin' ? (
              <p className='select-none'>
                Doctor Login? &nbsp;
                <span
                  onClick={() => setState('Doctor')}
                  className='text-indigo-300 hover:underline cursor-pointer'
                >
                  Click Here
                </span>
              </p>
            ) : (
              <p className='select-none'>
                Admin Login? &nbsp;
                <span
                  onClick={() => setState('Admin')}
                  className='text-indigo-300 hover:underline cursor-pointer'
                >
                  Click Here
                </span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
