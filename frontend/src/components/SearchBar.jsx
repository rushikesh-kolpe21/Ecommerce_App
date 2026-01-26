import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false);
    const location = useLocation();

    // Clear search input when navigating to a different page
    useEffect(()=>{
        if(location.pathname.includes('collection') && showSearch){
           setVisible(true);
        }else{
           setVisible(false);
        
        }
    },[location, showSearch])
  return showSearch && visible ? (
    <div className="border-t border-b border-gray-600 bg-gray-50 py-4">
      <div className="flex items-center justify-center gap-3 px-4">

        {/* Search box */}
        <div className="flex items-center w-full sm:w-1/2 max-w-xl border border-gray-400 bg-white px-4 py-2 rounded-full shadow-sm">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
            type="text"
            placeholder="Search products..."
          />
          <img
            src={assets.search_icon}
            className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
            alt="search"
          />
        </div>

        {/* Close icon */}
        <img
          onClick={() => setShowSearch(false)}
          className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
          src={assets.cross_icon}
          alt="close"
        />
      </div>
    </div>
  ) : null
}
