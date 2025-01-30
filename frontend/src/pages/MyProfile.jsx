import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Check, SquarePen } from 'lucide-react'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'edward vincent',
    image: assets.profile_pic,
    email: 'edwardvincent007@gmail.com',
    phone: '9872310461',
    address: {
      line1: '57th cross, Richmond ',
      line2: 'Circle, Church Road, London'
    },
    gender: 'Male',
    dob: '2000-01-20'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='flex flex-col items-end justify-center gap-3 min-h-[50vh] md:mt-12 w-full p-0 md:px-64'>
      {/* top section */}
      <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full py-5 md:py-6 md:px-5 bg-gray-100 rounded-md'>
        {/* user profile and name */}
        <div className='flex flex-col items-center justify-center gap-3 md:gap-6 md:h-[300px] w-2/3 md:w-1/3'>
          <img
            className='w-3/4 md:w-2/3 rounded-full'
            src={userData.image}
            alt='user profile pic'
          />
          {isEdit ? (
            <input
              className='w-full text-center text-xl md:text-2xl font-medium text-gray-600'
              type='text'
              value={userData.name}
              onChange={e =>
                setUserData(prev => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className='w-full text-center text-xl md:text-2xl font-medium text-gray-600 capitalize'>
              {userData.name}
            </p>
          )}
        </div>

        {/* user data */}
        <div className='flex-1 flex flex-col gap-2 md:gap-4 items-stretch w-full px-5 md:px-0'>
          {/* contact info */}
          <div className='flex flex-col items-stretch gap-2'>
            <p className='p-1 font-medium min-w-fit text-zinc-400'>
              CONTACT INFO
            </p>
            <div className='flex flex-col items-stretch gap-1 text-sm md:text-base'>
              <div className='flex items-center gap-2 p-1'>
                <p className='font-medium min-w-fit'>Email Id:</p>
                <p className='px-1 py-0 w-full overflow-x-scroll'>
                  {userData.email}
                </p>
              </div>

              <div className='flex items-center gap-2 p-1 text-sm md:text-base'>
                <p className='font-medium min-w-fit'>Phone:</p>
                {isEdit ? (
                  <input
                    className='px-1 py-0 w-full'
                    type='text'
                    value={userData.phone}
                    onChange={e => {
                      const value = e.target.value
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setUserData(prev => ({ ...prev, phone: value }))
                      }
                    }}
                    maxLength='10'
                  />
                ) : (
                  <p className='px-1 py-0 w-full'>{`+91 ${userData.phone}`}</p>
                )}
              </div>

              <div className='flex items-baseline gap-2 p-1 text-sm md:text-base'>
                <p className='font-medium min-w-fit'>Address:</p>
                {isEdit ? (
                  <p className='w-full'>
                    <input
                      className='px-1 py-0 w-full'
                      placeholder='house no, street'
                      onChange={e =>
                        setUserData(prev => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value }
                        }))
                      }
                      value={userData.address.line1}
                      type='text'
                    />
                    <br />
                    <hr />
                    <input
                      className='px-1 py-0 w-full'
                      placeholder='area, city, state, pincode'
                      onChange={e =>
                        setUserData(prev => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value }
                        }))
                      }
                      value={userData.address.line2}
                      type='text'
                    />
                  </p>
                ) : (
                  <p className='px-1 py-0 w-full overflow-x-scroll'>
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className='w-full' />

          {/* basic info */}
          <div className='flex flex-col items-stretch gap-2'>
            <p className='p-1 font-medium min-w-fit text-zinc-400'>
              PERSONAL DETAILS
            </p>
            <div className='flex flex-col items-stretch gap-1 text-[16px] md:text-base'>
              <div className='flex items-center gap-2 p-1 text-sm md:text-base'>
                <p className='font-medium min-w-fit'>Gender:</p>
                <div className='w-full'>
                  {isEdit ? (
                    <select
                      className='px-1 py-0 w-full'
                      onChange={e =>
                        setUserData(prev => ({
                          ...prev,
                          gender: e.target.value
                        }))
                      }
                      value={userData.gender}
                    >
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Other'>Other</option>
                    </select>
                  ) : (
                    <p className='px-1'>{userData.gender}</p>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-2 p-1 text-sm md:text-base'>
                <p className='font-medium min-w-fit'>Birthday:</p>
                <div className='w-full'>
                  {isEdit ? (
                    <input
                      className='px-1 py-0 w-full'
                      type='date'
                      onChange={e =>
                        setUserData(prev => ({ ...prev, dob: e.target.value }))
                      }
                      value={userData.dob}
                    />
                  ) : (
                    <p className='px-1 py-0 w-full'>{userData.dob}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* action button */}
      <div>
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className='flex text-sm items-center font-medium min-w-fit gap-2 w-fit bg-primary text-white py-2.5 px-4 rounded hover:scale-[97%] transition-all duration-200 ease-linear'
          >
            Save Changes
            <span>
              <Check size={18} />
            </span>
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className='flex text-sm items-center font-medium min-w-fit gap-2 w-fit bg-primary text-white py-2.5 px-4 rounded hover:scale-[97%] transition-all duration-200 ease-linear'
          >
            Edit
            <span>
              <SquarePen size={17} className='-translate-y-[.6px]' />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
