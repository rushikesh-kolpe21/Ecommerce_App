import React from 'react'

export const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off </p>
        <p className='text-gray-400 mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum provident, impedit </p>

        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center my-2 gap-3 mx-auto border'>
            <input className='w-full px-2 sm:flex-1 outline-none'
            type="email"
            name='email'
            placeholder='Enter you email' />

            <button className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}
