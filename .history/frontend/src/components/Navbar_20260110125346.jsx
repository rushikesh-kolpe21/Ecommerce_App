import React from 'react'
import assets from '../assets/assets'

export const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <img src={assets.logo} alt="" />
    </div>
  )
}
