import React, { use } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export const ProductItem = ({id, name, price, image}) => {

    const {currency} = use(ShopContext);
  return (
    <Link to={`/product/${id}`} className='text-gray-600 cursor-pointer'>
        <div className='overflow-hidden '>
            <img className='hover:scale-110 transition ease-in-out' src={image && image[0] ? image[0] : ''} alt={name} />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency} {price}</p>
    </Link>
  )
}
