import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

export const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    console.log(products)
  return (
    <div>LatestCollection</div>
  )
}
