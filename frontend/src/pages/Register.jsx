import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios';
import { URL } from '../url';


const Register = () => {
  const [registerData,setRegisterData] = useState({
    username:'',
    email:'',
    password:''
  }) 
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const handleChangeRegisterData = (e)=>{
    const {name,value}=e.target;
     setRegisterData((prevData)=>({
      ...prevData,
      [name]:value,
     }))
  }
    // console.log(registerData.username);
    // console.log(registerData.useremail);
    // console.log(registerData.userpassword);

    const handleRegistrationSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:8000/api/auth/register', registerData);
        setError(false);
        navigate('/login');
        console.log(res);
      } catch (err) {
        setError(true);
        console.log("Form Submission failure", err);
      }
      setRegisterData({
        username:'',
        email:'',
        password:''
      })
    }

  return (
   <>
   
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
    <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">Blogs</Link></h1>
    <h3><Link to="/login">Login</Link></h3>
    </div>
     <div className='w-full flex justify-center items-center h-[80vh]'>
    <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
        <h1 className='text-xl font-bold text-left'>Register Here</h1>
       <form onSubmit={handleRegistrationSubmit} className='flex flex-col space-y-4 '>
       <input 
        type='text'
        name='username'
        placeholder='Enter your Name'
        value={registerData.username}
        onChange={handleChangeRegisterData}
        className='w-full px-4 py-2 border-black border-2 outline-0'
        required
       />
       <input 
        type='text'
        name='email'
        value={registerData.email}
        onChange={handleChangeRegisterData}
        placeholder='Enter your Email'
        className='w-full px-4 py-2 border-black border-2 outline-0'
        required
       />
       <input
        type='password'
        name='password'
        value={registerData.password}
        onChange={handleChangeRegisterData}
        placeholder='Enter your Password'
        className='w-full px-4 py-2 border-black border-2 outline-0'
        required
       />
       <button type='submit' className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-white'>Register</button>
       {error && <h3 className="text-red-500 text-sm">Something Went Wrong</h3>}
       <div className='flex justify-center items-center space-x-1'>
       <p>Already have an account?</p>
       <p className='text-gray-500 hover:text-black hover:font-semibold'><Link to="/login">Login</Link></p>

       </div>
       </form>
    </div>
      
    </div>
    <Footer/>
   </>
    
  )
}

export default Register
