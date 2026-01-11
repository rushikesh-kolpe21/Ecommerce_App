import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title } from './Title';

export const BestSellers = () => {
    const {products} = useContext(ShopContext);
    const [BestSellers, setBestSellers] = useState([]);

    useEffect(()=>{
        const BestProduct = products.filter((item)=>(item.bestseller));
        setBestSellers(BestProduct);
    },[])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={SELLERS}/>
            <P className='w3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sequi deserunt dolor. </P>
        </div>
        

    </div>
  )
}
