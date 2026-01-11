import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

export const BestSellers = () => {
    const {products} = useContext(ShopContext);
    const [BestSellers, setBestSellers] = useState([]);

    useEffect(()=>{
        const BestProduct = products.filter((item)=>(item.bestseller));
        setBestSellers(BestProduct);
    },[])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'></div>
        

    </div>
  )
}
