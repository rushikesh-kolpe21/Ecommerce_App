import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { currency } from '../App';

export const List = ({token}) => {

  const [list, setList] = useState([]) ;

  const featchProducts = async () =>{
    try {
      const response = await axios.get(backendUrl + '/api/products/list');
      // console.log(response.data);
       if(response.data.success){
        setList(response.data.productsList);
       } else{
        toast.error(response.data.message);
       }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const removeProduct = async (id) =>{
    try{
      const response = await axios.delete(backendUrl + '/api/products/' + id, {headers:{token}});
      console.log(response.data);
      if(response.data.success){
        toast.success(response.data.message);
        await featchProducts();
      } else{
        toast.error(response.data.message);
      }

    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    featchProducts();
  },[list])

  return (
   <>
   <p className='mb-2'>All Products List</p>
   <div className="flex flex-col gap-2">

    {/* --------------------List Table Title------------------ */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Bestseller</b>
        <b>Action</b>
      </div>
      {/* --------------------product List------------ */}
      {list.map((item, index) => (
        <div key={index} className=" grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py- 1 px-2 border text-sm bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out cursor-pointer md:grid">
          <img className="w-16 h-16 object-cover" src={item.image[0]} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <p>{item.bestseller ? "Yes" : "No"} </p>
          <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
        </div>
      ))}
   </div>
   </>
  )
}
