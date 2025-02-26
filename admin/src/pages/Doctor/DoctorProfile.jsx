import { AppContext } from '@/context/AppContext'
import { DoctorContext } from '@/context/DoctorContext'
import { Check, ChevronDown, SquarePen, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext)

  const { currencySymbol } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const [originalData, setOriginalData] = useState(null)

  const handleEditClick = () => {
    setOriginalData({ ...profileData })
    setIsEdit(true)
  }

  const handleCancel = () => {
    setProfileData(originalData)
    setIsEdit(false)
  }

  const hasChanges = () => {
    return (
      originalData?.fees !== profileData.fees ||
      originalData?.experience !== profileData.experience ||
      originalData?.available !== profileData.available ||
      originalData?.address?.line1 !== profileData.address?.line1 ||
      originalData?.address?.line2 !== profileData.address?.line2
    )
  }

  const [loading, setLoading] = useState(false)

  // api to update doctor profile data in db
  const updateProfile = async () => {
    setLoading(true)
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        experience: profileData.experience,
        available: profileData.available
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        await getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return (
    profileData && (
      <div className='m-2 w-full sm:w-[80vw] sm:min-h-[90vh] flex flex-col items-center sm:items-start justify-center sm:justify-start pb-6 gap-4 sm:p-4 bg-gray-50 sm:bg-transparent rounded'>
        <h1 className='text-2xl mt-3 sm:mt-0 sm:text-3xl font-semibold px-1 tracking-wide text-primary select-none'>
          Profile Details
        </h1>

        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full motion-translate-x-in-[0%] motion-translate-y-in-[-10%] motion-duration-[0.38s] motion-ease-spring-bouncier'>
          <div className='bg-gray-100 min-w-[65vw] flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 p-6 sm:p-5 border rounded text-sm sm:text-xl'>
            {/* dp */}
            <div className='w-[80vw] sm:w-2/5'>
              <img
                className='bg-primary rounded w-full'
                src={profileData.image}
                alt='doctor image'
              />
            </div>
            {/* info */}
            <div className='w-[80vw] sm:flex-1 space-y-3 sm:space-y-4'>
              {/* doc info: name, degree, experience */}
              <p className='text-xl sm:text-2xl font-medium'>
                {profileData.name}
              </p>
              <div className='flex items-center gap-3'>
                <p className='tracking-wide'>
                  {profileData.degree} - {profileData.speciality}
                </p>
                {isEdit ? (
                  <div className='relative'>
                    <select
                      value={profileData.experience}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          experience: e.target.value
                        }))
                      }
                      className='w-full pl-2.5 pr-5 py-1 rounded-[5px] border placeholder:text-gray-400 tracking-wide appearance-none'
                    >
                      <option value='' disabled>
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
                      <option value='11 Years'>11 Years</option>
                      <option value='12 Years'>12 Years</option>
                      <option value='13 Years'>13 Years</option>
                      <option value='14 Years'>14 Years</option>
                      <option value='15 Years'>15 Years</option>
                      <option value='16 Years'>16 Years</option>
                      <option value='17 Years'>17 Years</option>
                      <option value='18 Years'>18 Years</option>
                      <option value='19 Years'>19 Years</option>
                      <option value='20 Years'>20 Years</option>
                    </select>
                    <div className='absolute inset-y-0 right-1.5 flex items-center pointer-events-none text-zinc-500'>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                ) : (
                  <p className='w-fit px-2 py-0.5 rounded-[5px] border font-medium tracking-wider bg-gray-200'>
                    {profileData.experience}
                  </p>
                )}
              </div>
              {/* doc about */}
              <div>
                <p>About:</p>
                <p className='w-full'>{profileData.about}</p>
              </div>
              <p>
                Appointment Fees: &nbsp;
                {isEdit ? (
                  <div className='inline-block'>
                    <span className='text-zinc-500'>{currencySymbol}</span>
                    <input
                      type='number'
                      min='0' // user cannot enter negative value for fees
                      placeholder={`${currencySymbol}75`}
                      value={profileData.fees}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          fees: Math.max(0, Number(e.target.value))
                        }))
                      }
                      className='sm:px-1 sm:py-px'
                    />
                  </div>
                ) : (
                  <span className='font-semibold tracking-wide'>
                    {currencySymbol}
                    {profileData.fees}
                  </span>
                )}
              </p>
              <div>
                <p>Address:</p>
                {isEdit ? (
                  <div className='flex flex-col gap-1'>
                    <input
                      type='text'
                      placeholder='Line 1'
                      value={profileData.address.line1}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value }
                        }))
                      }
                      className='sm:px-1 sm:py-px'
                    />
                    <input
                      type='text'
                      placeholder='Line 2'
                      value={profileData.address.line2}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value }
                        }))
                      }
                      className='sm:px-1 sm:py-px'
                    />
                  </div>
                ) : (
                  <p className='font-medium'>
                    {profileData.address.line1} <br />
                    {profileData.address.line2}
                  </p>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  onChange={() =>
                    isEdit &&
                    setProfileData(prev => ({
                      ...prev,
                      available: !prev.available
                    }))
                  }
                  checked={profileData.available}
                  id=''
                  className={`${
                    isEdit
                      ? 'cursor-pointer hover:scale-[110%] transition-transform duration-150 ease-in-out'
                      : 'cursor-not-allowed pointer-events-none'
                  } size-4 sm:size-5`}
                />
                <label htmlFor='' className='cursor-pointer'>
                  Available
                </label>
              </div>
            </div>
          </div>

          {/* action button */}
          <div className='w-full flex sm:flex-col items-center sm:items-start justify-center gap-3 tracking-wide'>
            {isEdit ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className={`flex text-sm items-center justify-between font-medium min-w-32 border border-gray-400 text-gray-500 hover:border-black bg-black/5 hover:text-black py-4 px-5 rounded transition-all duration-200 ease-linear ${
                    loading ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  Cancel
                  <span>
                    <X size={18} />
                  </span>
                </button>
                <button
                  onClick={updateProfile}
                  disabled={!hasChanges() || loading}
                  className={`flex text-sm items-center justify-between font-medium min-w-32 bg-primary text-white py-4 px-5 rounded transition-all duration-200 ease-linear ${
                    !hasChanges() || loading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90'
                  }`}
                >
                  <span>{loading ? 'Updating...' : 'Update'}</span>
                  {loading ? (
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  ) : (
                    <span>
                      <Check size={18} />
                    </span>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className='flex text-sm items-center justify-between font-medium min-w-24 sm:min-w-32 w-fit bg-primary text-white py-4 px-5 rounded hover:opacity-90 transition-all duration-200 ease-linear'
              >
                Edit
                <span>
                  <SquarePen size={17} className='-translate-y-[.6px]' />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorProfile
