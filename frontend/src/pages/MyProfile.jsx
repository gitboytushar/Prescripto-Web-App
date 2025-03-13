import React, { useContext, useState } from 'react'
import { Check, ImageUp, SquarePen, X } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfleData } =
    useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const [image, setImage] = useState(false)

  const [originalData, setOriginalData] = useState(null)

  const handleEditClick = () => {
    setOriginalData({ ...userData })
    setIsEdit(true)
  }

  // handle cancel btn
  const handleCancel = () => {
    setUserData(originalData)
    setIsEdit(false)
    setImage(false)
  }

  const hasChanges = () => {
    if (image) return true

    return (
      originalData?.name !== userData.name ||
      originalData?.phone !== userData.phone ||
      originalData?.gender !== userData.gender ||
      originalData?.dob !== userData.dob ||
      originalData?.address?.line1 !== userData.address?.line1 ||
      originalData?.address?.line2 !== userData.address?.line2
    )
  }

  const [loading, setLoading] = useState(false)

  // update user profile data
  const updateUserProfileData = async () => {
    setLoading(true) // Start showing loading

    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfleData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false) // Stop showing loading
    }
  }

  return (
    userData && (
      <div className='flex flex-col items-end justify-center gap-3 min-h-[50vh] md:mt-12 w-full p-0 md:px-64 motion-translate-x-in-[0%] motion-translate-y-in-[-10%]'>
        {/* top section */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full py-5 md:py-6 md:px-5 bg-gray-100 rounded-md'>
          {/* user profile and name */}
          <div className='flex flex-col items-center justify-center gap-3 md:gap-6 md:h-[300px] w-2/3 md:w-1/3'>
            {isEdit ? (
              <label htmlFor='image'>
                <div className='flex items-center justify-center relative cursor-pointer active:scale-[95%] transition-all duration-150 ease-in'>
                  <img
                    className='w-3/4 md:w-2/3 rounded-xl object-contain bg-blend-overlay bg-black/30 brightness-75'
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=''
                  />
                  <ImageUp
                    strokeWidth={1.4}
                    size={40}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg ${
                      image ? 'text-transparent' : 'text-white'
                    }`}
                    style={{
                      transform: image
                        ? 'translate(-50%, -50%) scale(0.8)'
                        : 'translate(-50%, -50%)',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  />
                </div>

                <input
                  onChange={e => setImage(e.target.files[0])}
                  type='file'
                  id='image'
                  hidden
                />
              </label>
            ) : (
              <img
                className='w-3/4 md:w-2/3 rounded-xl border object-contain'
                src={userData.image}
                alt='user profile pic'
              />
            )}

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
              <p className='w-full text-center text-xl md:text-2xl font-medium text-gray-600 capitalize whitespace-nowrap overflow-x-scroll hide-the-scrollbar'>
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
                        <option value='Not Selected'>Select</option>
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
                  <p className='font-medium min-w-fit'>Date of Birth:</p>
                  <div className='w-full'>
                    {isEdit ? (
                      <input
                        className='px-1 py-0 w-full'
                        type='date'
                        onChange={e =>
                          setUserData(prev => ({
                            ...prev,
                            dob: e.target.value
                          }))
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
        <div className='w-full flex items-center justify-center sm:justify-end gap-3'>
          {isEdit ? (
            <>
              <button
                onClick={handleCancel}
                disabled={loading}
                className={`flex text-sm items-center font-medium min-w-fit gap-1.5 border border-gray-400 text-gray-500 hover:border-black bg-black/5 hover:text-black py-2.5 px-3 rounded transition-all duration-200 ease-linear ${
                  loading ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                Cancel
                <span>
                  <X size={18} />
                </span>
              </button>
              <button
                onClick={updateUserProfileData}
                disabled={!hasChanges() || loading}
                className={`flex text-sm items-center font-medium min-w-fit gap-2 bg-primary text-white py-2.5 px-4 rounded transition-all duration-200 ease-linear ${
                  !hasChanges() || loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
              >
                <span>{loading ? 'Updating...' : 'Save Changes'}</span>
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
              className='flex text-sm items-center font-medium min-w-fit gap-2 w-fit bg-primary text-white py-2.5 px-4 rounded hover:opacity-90 transition-all duration-200 ease-linear'
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
  )
}

export default MyProfile
