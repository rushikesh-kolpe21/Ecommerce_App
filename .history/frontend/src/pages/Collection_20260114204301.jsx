import React, {  useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { Title } from '../components/Title';
import { ProductItem } from '../components/ProductItem';

export const Collection = () => {
  const {products} = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);

  const handleCategoryFilter = (event) => {
    const value = event.target.value;
    if(categoryFilter.includes(value)){
      setCategoryFilter(categoryFilter.filter((item)=> item !== value))
  }
  else{
    setCategoryFilter(prev => [...prev, value])
  }
}

const handleTypeFilter = (event) => {
  const value = event.target.value;
  if(typeFilter.includes(value)){
    setTypeFilter(typeFilter.filter((item)=> item !== value))
}
else{
  setTypeFilter(prev => [...prev, value])
}
}

  useEffect(()=>{ 
    setFilteredProducts(products);
  },[products])

  useEffect(()=>{
    console.log(categoryFilter)
  },[categoryFilter])

 
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter Option */}
      <div className=' min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter) } className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS <img src={assets.dropdown_icon} 
        className={`h-3  sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" /></p>
        {/* category */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={handleCategoryFilter}/>Men
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={handleCategoryFilter}/>Women
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={handleCategoryFilter}/>Kids
            </p>
          </div>
        </div>
        {/* subcategory filter */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block   ${showFilter ? 'block' : 'hidden'} `}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={handleTypeFilter}/>Topwear
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={handleTypeFilter}/>Bottomwear
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={handleTypeFilter}/>Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={"COLLECTIONS"}/>
          {/* product sort */}
          <select className='border border-gray-300 text-sm px-2'>
            <option value="newest">Sort by: Relavent</option>
            <option value="price_low_high">Sort by: Low to High</option>
            <option value="price_high_low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products */}
       <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-y-6 gap-4'>
        {
         
          filteredProducts.map((item, index)=> (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))
        }
      </div>

      </div>
    </div>
  )
}
