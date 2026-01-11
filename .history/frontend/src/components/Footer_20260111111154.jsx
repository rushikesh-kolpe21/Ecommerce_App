import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
  return (
   <div>
     <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32'  alt="logo" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam repellat nostrum nobis nemo,
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 '>COMPANY</p>
            <ul className='flex flex-col gap-1 ml-2 text-gray-500'>
                <li> Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-500'>
                <li>+91 9371891154</li>
                <li>kolperushikesh1121@gmail.com</li>
                <li>plaza, Mumbai, India</li>
            </ul>
        </div>

        
    </div>
    <div className=''>
            <hr />
            <p className='text-center text-sm py-5 text-gray-500'>&copy; 2024 Your Company. All rights reserved.</p>
        </div>

   </div>
    
  )
}