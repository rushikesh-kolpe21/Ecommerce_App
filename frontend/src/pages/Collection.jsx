import React, {  useContext, useState,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { Title } from '../components/Title';
import { ProductItem } from '../components/ProductItem';

export const Collection = () => {

  const {products, search, showSearch, loading} = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const[sortOption, setSortOption] = useState('relevant');  


  // this code for only set category filter [men, women, kids]
  const handleCategoryFilter = (event) => {
    const value = event.target.value;
    // remove item if already present from here only [men, women, kids] not from item list
    if(categoryFilter.includes(value)){
      setCategoryFilter(categoryFilter.filter((item)=> item !== value));
  }
  else{
    // add all item
    setCategoryFilter(prev => [...prev, value])
  }
}

// this code for only set type filter [topwear, bottomwear, winterwear]
const handleTypeFilter=(event)=>{
  const value = event.target.value;
  if(typeFilter.includes(value)){
    // remove item if already present from here only [topwear, bottomwear, winterwear] not from item list
    setTypeFilter(typeFilter.filter((item)=> item !== value));
}else{
  // add all item
  setTypeFilter(prev => [...prev, value]);
}

}

// this code for applying all filters  take men or women form handleCategoryFilter and filter products                                          
const applyFilters = () => {
  let productsAfterCategoryFilter = products.slice();

  // search query filter
  if(showSearch && search){
    productsAfterCategoryFilter = productsAfterCategoryFilter.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()));
  }
  if(categoryFilter.length > 0){
    productsAfterCategoryFilter = productsAfterCategoryFilter.filter((item)=> 
      categoryFilter.includes(item.category)
    );
  }
  if(typeFilter.length > 0){
    productsAfterCategoryFilter = productsAfterCategoryFilter.filter((item)=> 
      typeFilter.includes(item.subCategory)  //  Type filter is applied
    );
  }
  setFilteredProducts(productsAfterCategoryFilter);
}

// sorting function
const sortProducts = ()=> {
  let filteredProductsCopy = filteredProducts.slice();
  // sorting logic here
  switch(sortOption){
    case 'price_low_high':
  setFilteredProducts(filteredProductsCopy.sort((a,b)=>(a.price - b.price)));
  break;
    case 'price_high_low':
  setFilteredProducts(filteredProductsCopy.sort((a,b)=>(b.price - a.price)));
  break;
  default:
    applyFilters();
  }
}

useEffect(()=>{
  sortProducts();
}, [sortOption]);


  useEffect(()=>{
    applyFilters();
  }, [categoryFilter, typeFilter,search, showSearch, products]);
  
  
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
          <select onChange={(event)=> setSortOption(event.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="price_low_high">Sort by: Low to High</option>
            <option value="price_high_low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products */}
       <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-y-6 gap-4'>
        {
          loading ? (
            <p className='text-center col-span-full'>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item, index)=> (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          ) : (
            <p className='text-center col-span-full'>No products found</p>
          )
        }
      </div>

      </div>
    </div>
  )
}

