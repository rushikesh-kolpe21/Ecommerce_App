import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

export const BestSellers = () => {
    const {products} = useContext(ShopContext);
    const [BestSellers, setBestSellers] = useState([]);
  return (
    <div>BestSellers</div>
  )
}
