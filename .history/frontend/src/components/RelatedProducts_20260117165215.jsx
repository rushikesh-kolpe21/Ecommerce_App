import React, { use, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

export const RelatedProducts = ({categoryFilter,typeFilter}) => {

    const {products} = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(()=>{
        if(products.length > 0){

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=>categoryFilter === item.category && typeFilter === item.subCategory);
            setRelatedProducts(productsCopy.slice(0,4)); // set only 4 related products

        }
    },[products]);

  return (
    <div>

    </div>
  )
}
