import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopFloatingButton from './components/ScrollToTopFloatingButton'
import { ToastContainer } from 'react-toastify'
import WelcomeLoader from './components/WelcomeLoader'

const App = () => {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false)
    }, 5000)
  }, [])

  return (
    <>
      {showLoader && (
        <div
          className='fixed inset-0 z-50 transition-opacity duration-500 ease-in-out pointer-events-none'
          style={{
            opacity: showLoader ? 1 : 0,
            backgroundColor: 'white'
          }}
        >
          <WelcomeLoader />
        </div>
      )}
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer
          theme='light'
          className='scale-95 mt-2 sm:scale-100 sm:mt-16'
        />
        <Navbar />
        <ScrollToTopFloatingButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
