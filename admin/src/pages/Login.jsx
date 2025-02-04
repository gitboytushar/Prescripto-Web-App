import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAtoken, backendUrl } = useContext(AdminContext)

  const onSubmitHandler = async event => {
    event.preventDefault()

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
      }
    } catch (error) {
      console.error('Login failed', error)
      alert('Login failed. Please check your credentials and try again.')
    }
  }

  return (
    <div className='motion-preset-expand'>
      <form
        onSubmit={onSubmitHandler}
        className='min-h-[80vh] flex items-center'
      >
        <div className='flex flex-col gap-6 m-auto items-start p-5 md:p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg relative overflow-hidden bg-gray-800'>
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
            <button className='bg-primary text-white hover:opacity-90 transition-opacity duration-150 ease-linear w-full py-2 rounded-md text-base'>
              Login
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
