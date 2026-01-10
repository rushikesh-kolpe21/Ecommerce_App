import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';

export const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    console.log(products)
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus enim alias teme commodi quia odit! Obcaecati </p>
        </div>
    </div>
  )
}
