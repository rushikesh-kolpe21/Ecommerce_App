import React, { use } from 'react'

export const ProductItem = ({id, name, price, image}) => {

    const {currency} = use(ShopContext);
  return (
    <div>ProductItem</div>
  )
}
