import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)

  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // form submit handler
  const onSubmitHandler = async event => {
    event.preventDefault()

    // new user or sign in api call from frontend
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          console.log(data.message)
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          console.log(data.message)
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
      toast.success('Login Successful.')
    }
  }, [token])

  return (
    <div className='motion-preset-expand'>
      <form
        onSubmit={onSubmitHandler}
        className='min-h-[60vh] flex items-center'
      >
        <div className='flex flex-col gap-6 m-auto items-start p-5 md:p-8 w-[90vw] sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          {/* form title */}
          <div className='flex flex-col items-stretch gap-1 w-full text-center'>
            <p className='text-2xl font-semibold'>
              {state === 'Sign Up' ? 'New Registration' : 'User Login'}
            </p>
            <p className='text-zinc-500'>
              Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an
              appointment.
            </p>
          </div>

          {/* form input area */}
          <div className='flex flex-col gap-3.5 w-full items-stretch font-medium text-gray-500'>
            {/* show on create account */}
            {state === 'Sign Up' && (
              <div className='w-full'>
                <p>Full Name</p>
                <input
                  className='border border-zinc-300 rounded font-normal text-black tracking-wide w-full p-2 mt-0.5'
                  type='text'
                  onChange={e => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}
            <div className='w-full'>
              <p>Email</p>
              <input
                className='border border-zinc-300 rounded font-normal text-black tracking-wide w-full p-2 mt-0.5'
                type='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className='w-full'>
              <p>{state === 'Sign Up' ? 'Create Password' : 'Password'}</p>
              <input
                className='border border-zinc-300 rounded font-normal text-black tracking-wide w-full p-2 mt-0.5'
                type='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full items-stretch text-center'>
            <button
              type='submit'
              className='bg-primary text-white w-full py-2 rounded-md text-base hover:opacity-90 active:scale-[97%] transition-all duration-100 ease-in'
            >
              {state === 'Sign Up' ? 'Submit' : 'Proceed'}
            </button>
            {/* button to switch between signup and login forms */}
            {state === 'Sign Up' ? (
              <p>
                Already have an Account? &nbsp;
                <span
                  onClick={() => setState('Login')}
                  className='text-primary font-medium underline cursor-pointer'
                >
                  Login Here
                </span>
              </p>
            ) : (
              <p>
                Don't have an Account? &nbsp;
                <span
                  onClick={() => setState('Sign Up')}
                  className='text-primary font-medium underline cursor-pointer'
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
