import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title } from './Title';
import { ProductItem } from './ProductItem';

export const BestSellers = () => {
    const {products, loading} = useContext(ShopContext);
    
    const [BestSellers, setBestSellers] = useState([]);

    useEffect(()=>{
        if (products && products.length > 0) {
            const BestProduct = products.filter((item)=> {
                return item.bestseller === true || item.bestseller === 'true';
            });
            console.log('Filtering products for bestsellers:', {
                totalProducts: products.length,
                bestSellersFound: BestProduct.length,
                products: products.slice(0, 2),
                BestProduct: BestProduct
            });
            setBestSellers(BestProduct);
        } else {
            console.log('No products available yet:', {products, loading});
        }
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sequi deserunt dolor. </p>
        </div>
    
    {/* product show */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 '>
            {loading ? (
                <p className='text-center col-span-full'>Loading products...</p>
            ) : BestSellers.length > 0 ? (
                BestSellers.map((item, index)=>{
                    return(
                        <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                    )
                })
            ) : (
                <p className='text-center col-span-full'>No best sellers available</p>
            )}
    </div>

    </div>
  )
}
