import React, { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

export const Login = ({ setToken }) => {
  const[formData, setFormData] = useState({
        email: '',
        password: ''
      });
      // input change handler
      const handleOnChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }

      // form submit handler
  const onSubmitHandler = async (event) => {
   try {
     event.preventDefault();
    // sending formData to backend api
  const response = await axios.post(backendUrl + '/api/user/admin', formData);
    console.log('Login successful:', response.data);
  //  set token in app.jsx 
    if(response.data.token){
      setToken(response.data.token);
      toast.success('Login successful');
    }else{
      toast.error(response.data.message || 'Login failed');
      return;
    }
    setFormData({
      email: '',
      password: ''
    }); 
  } catch (error) {
    console.error('Login failed:', error);
    toast.error(response.data.message || 'Login failed');
  }    
   }
   
  return (
    <div className='min-h-screen flex items-center justify-center w-full '>
      <div className="bg-white shadow-md rounded-md p-6 w-[400px] mx-auto mt-20">
        <h1 className='text-2xl font-bold mb-4'>Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className={'text-sm font-medium text-gray-700 mb-2'}>Email Address</p>
            <input className={'rounded-md w-full px-3 py-2 border border-gray-300 outline-none'}
             type="email"
             name='email'
             value={formData.email}
             onChange={handleOnChange} 
             placeholder='your@gmail.com'
             required />
          </div>
          
           <div className="mb-3 min-w-72">
            <p className={'text-sm font-medium text-gray-700 mb-2'}>Password</p>
            <input className={'rounded-md w-full px-3 py-2 border border-gray-300 outline-none'}
             type="password"
             name='password'
             value={formData.password}
            onChange={handleOnChange} 
             placeholder='your password'
             required />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='Submit'>Login</button>
        </form>
      </div>
    </div>
  )
}
