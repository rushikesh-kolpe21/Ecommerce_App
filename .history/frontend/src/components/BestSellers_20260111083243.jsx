import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

export const BestSellers = () => {
    const {products} = useContext(ShopContext);
    const [BestSellers, setBestSellers] = useState([]);

    useEffect(()=>{
        const BestProduct = products.filter((item)=>(item.BestSellers));
        setBestSellers(BestProduct);
    },[])

  return (
    <div>

    </div>
  )
}
