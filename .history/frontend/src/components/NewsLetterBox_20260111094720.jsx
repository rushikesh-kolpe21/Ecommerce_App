import React from 'react'

export const NewsLetterBox = () => {
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off </p>
        <p className='text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum provident, impedit </p>

        <form>
            <input className='w-full sm:flex-1 outline-none'
            type="email"
            name='email'
            
            placeholder='Enter you email' />
        </form>
    </div>
  )
}
