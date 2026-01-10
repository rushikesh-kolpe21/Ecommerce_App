import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';

export const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    console.log(products)
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title/>
        </div>
    </div>
  )
}
