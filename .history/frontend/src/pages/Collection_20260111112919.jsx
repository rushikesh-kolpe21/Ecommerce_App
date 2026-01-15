import React, { use, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

export const Collection = () => {
  const {products} = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter Option */}
      <div>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
      </div>
    </div>
  )
}
