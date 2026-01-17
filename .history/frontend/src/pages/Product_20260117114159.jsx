import React from 'react'
import { useParams } from 'react-router-dom';

export const Product = () => {

  const {productId} = useParams();
  console.log(productId)

  return (
    <div>Product</div>
  )
}
