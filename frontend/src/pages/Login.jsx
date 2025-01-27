import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async event => {
    event.preventDefault()
  }

  return (
    <div className='motion-preset-expand'>
      <form className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-6 m-auto items-start p-5 md:p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          {/* form title */}
          <div className='flex flex-col items-stretch gap-1 w-full text-center'>
            <p className='text-2xl font-semibold'>
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </p>
            <p className='text-zinc-500'>
              Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an
              appointment.
            </p>
          </div>

          {/* form input area */}
          <div className='flex flex-col gap-2.5 w-full items-stretch font-medium'>
            {/* show on create account */}
            {state === 'Sign Up' && (
              <div className='w-full'>
                <p>Full Name</p>
                <input
                  className='border border-zinc-300 rounded w-full p-2 mt-1'
                  type='text'
                  onChange={e => setName(e.target.name)}
                  value={name}
                  required
                />
              </div>
            )}
            <div className='w-full'>
              <p>Email</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='email'
                onChange={e => setName(e.target.name)}
                value={email}
                required
              />
            </div>
            <div className='w-full'>
              <p>{state === 'Sign Up' ? 'Create Password' : 'Password'}</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='password'
                onChange={e => setName(e.target.name)}
                value={password}
                required
              />
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full items-stretch text-center'>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>
            {/* button to switch between signup and login forms */}
            {state === 'Sign Up' ? (
              <p>
                Already have an Account? &nbsp;
                <span
                  onClick={() => setState('Login')}
                  className='text-primary underline cursor-pointer'
                >
                  Login Here
                </span>
              </p>
            ) : (
              <p>
                Don't have an Account? &nbsp;
                <span
                  onClick={() => setState('Sign Up')}
                  className='text-primary underline cursor-pointer'
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
