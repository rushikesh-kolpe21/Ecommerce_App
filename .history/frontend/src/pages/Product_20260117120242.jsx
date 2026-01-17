import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export const Product = () => {

  const {productId} = useParams();
  const {product} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  
  const fetchProductData = async () => {
      product.map((item)=>{
        if(item._id === productId){
          setProductData(item);
          console.log(item)
        }
      })
  }
        
        

  useEffect(()=>{
    fetchProductData()
  },[product,productId])

  return (
    <div>Product</div>
  )
}
