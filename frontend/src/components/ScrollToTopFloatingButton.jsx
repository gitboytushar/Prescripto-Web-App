import React, { useEffect, useState } from 'react'
import { ChevronsUp } from 'lucide-react'

const ScrollToTopFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed z-30 bottom-5 right-5 bg-primary text-white p-2 md:p-3 rounded-full motion-preset-pop motion-duration-700 border border-white'
        >
          <ChevronsUp size={25} />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopFloatingButton
