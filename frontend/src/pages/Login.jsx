import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import  {UserContext}  from '../context/UserContext'

const Login = () => {
   const [loginData,setLoginData] = useState({
    email:'',
    password:''
   })
   const [error,setError] = useState(false);
   const navigate = useNavigate()
   const {setUser} = useContext(UserContext)

  const handleLoginChange =(e)=>{
    const {name,value}=e.target;
    setLoginData((prevData)=>({
     ...prevData,
     [name]:value,
    }))
  } 



  const handleLoginSubmit= async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8000/api/auth/login',loginData)
      const {success,message} = res.data;
      console.log(res.data);
      if(success){
        setError(false)
        setUser(res.data)
        navigate('/')
        console.log("Login Successfully")
      }
      else{
        setError(true);
        console.log(message);
      }
    }
    catch(err){
      setError(true);
        console.log("Login Error",err);
    }
    setLoginData({
      email:'',
      password:''
    })
    
  }
  return (
    <>
     <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
    <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">Blogs</Link></h1>
    <h3><Link to="/register">Register</Link></h3>
    </div>
    
      <div className='w-full flex justify-center items-center h-[70vh]'>
    <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
        <h1 className='text-xl font-bold text-left'>Login Your Account</h1>
       <form className='flex flex-col space-y-4' onSubmit={handleLoginSubmit}>
       <input 
        type='text'
        name='email'
        value={loginData.email}
        onChange={handleLoginChange}
        required
        placeholder='Enter your Email'
        className='w-full px-4 py-2 border-black border-2 outline-0'
       />
       <input
        type='password'
        name='password'
        value={loginData.password}
        onChange={handleLoginChange}
        required
        placeholder='Enter your Password'
        className='w-full px-4 py-2 border-black border-2 outline-0'
       />
       <button type='submt' className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-white'>Login</button>
       {error && <h3 className="text-red-500 text-sm">Something Went Wrong</h3>}
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
