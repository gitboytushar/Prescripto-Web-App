import React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const InteractiveHoverButton = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative w-auto cursor-pointer overflow-hidden hover:border-rose-600 bg-rose-600 text-white sm:text-black sm:bg-gray-200 text-center font-semibold',
          className
        )}
        {...props}
      >
        <div className='flex items-center gap-2'>
          <div className='size-2 hidden sm:inline-block rounded-[2px] bg-rose-600 transition-all duration-300 group-hover:scale-[100.8]'></div>
          <span className='inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0'>
            {children}
          </span>
        </div>
        <div className='absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 text-neutral-50 opacity-0 transition-all duration-300 group-hover:-translate-x-2.5 sm:group-hover:-translate-x-3.5 group-hover:opacity-100'>
          <span>{children}</span>
          <ArrowRight className='w-3.5 h-3.5 sm:w-5 sm:h-5 translate-y-[0.5px] hidden sm:flex' />
        </div>
      </button>
    )
  }
)

InteractiveHoverButton.displayName = 'InteractiveHoverButton'
