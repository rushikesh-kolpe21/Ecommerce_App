import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

export const Product = () => {

  const {productId} = useParams();
  const {products} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(""); 
  
  const fetchProductData = async () => {
     
        products.map((item)=>{
          if(item._id === productId){
            setProductData(item);
            setImage(item.image[0]);
            console.log(item)
            return null;
          }
        })
    
  }
        
  useEffect(()=>{
    fetchProductData()
  },[products,productId])

  return productData  ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500  opacity-100'>
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*----------------------------- product image---------------------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
             {
              productData.image.map((item,index)=>{
                return(
                  <img onMouseEnter={()=>setImage(item)} src={item}  key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="Image Not Available" />
                )
              })
             }
          </div>
          <div className="w-full sm:w-[81.3%]">
            <img src={image} alt="" className='w-full h-auto object-cover' />
          </div>
        </div>
        {/* ---------------------------product info--------------------------------- */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} className="w-3 h-3" alt="" />
              <img src={assets.star_icon} className="w-3 h-3" alt="" />
            <img src={assets.star_icon} className="w-3 h-3" alt="" />
            <img src={assets.star_icon} className="w-3 h-3" alt="" />
            <img src={assets.star_dull_icon} className="w-3 h-3" alt="" />
            <p className='pl-2'>(122)</p>
          </div>
        </div>
      </div>
    </div>
  ) : <div className="opacity-0"></div>
}
