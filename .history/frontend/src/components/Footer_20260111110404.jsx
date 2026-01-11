import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
  return (
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
                <li> Delivery</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-500'>
                <li>+91 12345 67890</li>
                <li>email@example.com</li>
                <li>123 Street, City, Country</li>
            </ul>
        </div>

        
    </div>
  )
}
