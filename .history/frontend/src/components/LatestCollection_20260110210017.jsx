import React, { useContext } from 'react'

export const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    console.log(products)
  return (
    <div>LatestCollection</div>
  )
}
