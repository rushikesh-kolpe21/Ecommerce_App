import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext)

  return showSearch ? (
    <div className="border-t border-b border-red-600 bg-gray-50 py-4">
      <div className="flex items-center justify-center gap-3 px-4">

        {/* Search box */}
        <div className="flex items-center w-full sm:w-1/2 max-w-xl border border-gray-300 bg-white px-4 py-2 rounded-full shadow-sm">
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
