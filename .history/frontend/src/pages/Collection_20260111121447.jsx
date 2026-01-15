import React, { use, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

export const Collection = () => {
  const {products} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter Option */}
      <div className='border min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        {/* category */}
        <div className={`border border-red-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block `}></div>
      </div>
    </div>
  )
}
