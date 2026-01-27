import React, {  useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Login = () => {

  const [currentState, setCurrentState] =useState('Login'); // login, signup, forgotpassword
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // handle login or signup logic here
    try {
      if(currentState === 'SignUp'){
         const response = await axios.post(backendUrl + '/api/user/register', {
          userName: name,
          email,
          password
        })
        // console.log(response.data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully!');
        } else {
          toast.error(response.data.message);
        }
      } else if(currentState === "Login"){
        const response = await axios.post(backendUrl + '/api/user/login',{
          email,
          password,
        })
        // console.log(response.data)
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(response.data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login/Signup error:', error);
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  })
  
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? "" :<input  className='w-full px-3 py-2 border border-gray-800 rounded'
      type="text"
      name='name'
      placeholder='Name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
       /> }
       

      <input  className='w-full px-3 py-2 border border-gray-800 rounded'
      type="email"
      name='email'
      placeholder='Email Address'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
       />
        <input  className='w-full px-3 py-2 border border-gray-800 rounded'
      type="password"
      name='password'
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
       />
       <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Forgot your Password?</p>
        {
          currentState === 'Login' 
          ? <p onClick={()=>setCurrentState('SignUp')} className='cursor-pointer'>Create an Account</p> 
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Back to Login</p>
        }
       </div>
       <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState ==='Login' ? 'Sign In': 'Sign Up'}</button>
    </form>
  )
}
