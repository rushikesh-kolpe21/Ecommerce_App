import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import { List } from './pages/List'
import { Add } from './pages/Add'
import { Orders } from './pages/Orders'
import { Login } from './components/Login'
import { useState } from 'react'

 import { ToastContainer } from 'react-toastify';

 export const backendUrl = import.meta.env.VITE_BACKEND_URL;
 export const currency = '$';

export const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  // Update localStorage whenever token changes
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
{token === '' 
?<Login setToken={setToken}/>
: <>
  <Navbar setToken={setToken}/>
  <hr />
  <div className="flex w-full">
    <Sidebar/>
    <div className="w-[72%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
      <Routes>
        <Route path='/add' element={<Add token={token}/>}/>
        <Route path='/list' element={<List token={token}/>}/>
        <Route path='/order' element={<Orders token={token}/>}/>
      </Routes>   
    </div>
  </div>
</>
}
    </div>
  )
}
