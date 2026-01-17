import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

export const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 mx-3 rounded-full w-3/2 sm:w-1/2">
        <input value={search} onChange={(event)=>setSearch(event.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
        <img src={assets.search_icon} className=' w-4  cursor-pointer' alt="search" />
        </div>
        <div>
            <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
    </div>
  ) : null;
}
