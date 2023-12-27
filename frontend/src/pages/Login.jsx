import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Login = () => {
  return (
    <>
     <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
    <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">Blogs</Link></h1>
    <h3><Link to="/register">Register</Link></h3>
    </div>
    
      <div className='w-full flex justify-center items-center h-[70vh]'>
    <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
        <h1 className='text-xl font-bold text-left'>Login Your Account</h1>
       <form className='flex flex-col space-y-4 '>
       <input 
        type='text'
        name='useremail'
        placeholder='Enter your Email'
        className='w-full px-4 py-2 border-black border-2 outline-0'
       />
       <input
        type='password'
        name='userpassword'
        placeholder='Enter your Password'
        className='w-full px-4 py-2 border-black border-2 outline-0'
       />
       <button className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-white'>Login</button>
       <div className='flex justify-center items-center space-x-1'>
       <p>New Here?</p>
       <p className='text-gray-500 hover:text-black hover:font-semibold'><Link to="/register">Register</Link></p>

       </div>
       </form>
    </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default Login
