import { AnimatePresence, delay, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function WordRotate ({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.15, ease: 'easeOut' }
  },
  className
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className='overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.h1 key={words[index]} className={className} {...motionProps}>
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}
