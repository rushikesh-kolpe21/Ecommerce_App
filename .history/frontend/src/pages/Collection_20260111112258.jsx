import React, { use, useContext } from 'react'

export const Collection = () => {
  const {products} = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>Collection</div>
  )
}
