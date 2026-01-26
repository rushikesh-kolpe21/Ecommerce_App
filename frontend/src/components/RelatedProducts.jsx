import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { ProductItem } from './ProductItem';
import { Title } from './Title';

export const RelatedProducts = ({categoryFilter,typeFilter}) => {

    const {products} = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(()=>{
        if(products.length > 0){

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=>categoryFilter === item.category && typeFilter === item.subCategory);
            setRelatedProducts(productsCopy.slice(0,5)); // set only 5 related products
            // console.log(productsCopy.slice(0,5));

        }
    },[products]);

  return (
    <div className='my-11'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'RELATED '} text2={'PRODUCTS'} />
        </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {relatedProducts.map((item, index)=>(
                <ProductItem 
                    key={index}
                    id={item._id} 
                    name={item.name} 
                    price={item.price} 
                    image={item.image}
                />
            ))}
        </div>
    </div>
  )
}
