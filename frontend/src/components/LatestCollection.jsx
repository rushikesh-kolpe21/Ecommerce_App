import React, {  useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';
// 
export const LatestCollection = () => {

    const {products, loading} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    },[products]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus enim alias teme commodi quia odit! Obcaecati </p>
        </div>
        {/* rendering latest products */}
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 '>
            {loading ? (
                <p className='text-center col-span-full'>Loading products...</p>
            ) : latestProducts.length > 0 ? (
                latestProducts.map((item, index)=>(
                   <ProductItem  key={index} id={item._id} name={item.name} image={item.image} currency={item.currency} price={item.price} />
                ))
            ) : (
                <p className='text-center col-span-full'>No products available</p>
            )}
        </div>
    </div>
  )
}
