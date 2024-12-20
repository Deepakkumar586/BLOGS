import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext'
import { motion } from 'framer-motion'

const Login = () => {
   const [loginData, setLoginData] = useState({
      email: '',
      password: ''
   })
   const [error, setError] = useState(false);
   const navigate = useNavigate()
   const { setUser } = useContext(UserContext)

   const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLoginData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const handleLoginSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post('http://localhost:8000/api/auth/login', loginData, { withCredentials: true });
         const { success, message } = res.data;
        
         if (success) {
            setError(false)
            setUser(res.data)
            navigate('/')
            
         } else {
            setError(true);
            // console.error(message);
         }
      }
      catch (err) {
         setError(true);
         console.error("Login Error", err);
      }
      setLoginData({
         email: '',
         password: ''
      })
   }

   return (
      <>
         <motion.div
            className='flex items-center justify-between px-6 md:px-[200px] py-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
         >
            <h1 className='text-lg md:text-xl font-extrabold'>
               <Link to="/">Blogs</Link>
            </h1>
            <h3>
               <Link to="/register">Register</Link>
            </h3>
         </motion.div>

         <motion.div
            className='w-full flex justify-center items-center h-[70vh]'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
         >
            <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[30%]'>
               <motion.h1
                  className='text-xl font-bold text-left'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
               >
                  Login Your Account
               </motion.h1>

               <form className='flex flex-col space-y-4' onSubmit={handleLoginSubmit}>
                  <motion.input
                     type='text'
                     name='email'
                     value={loginData.email}
                     onChange={handleLoginChange}
                     required
                     placeholder='Enter your Email'
                     className='w-full px-4 py-2 border-black border-2 outline-0'
                     initial={{ x: -50, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.3, duration: 0.5 }}
                  />

                  <motion.input
                     type='password'
                     name='password'
                     value={loginData.password}
                     onChange={handleLoginChange}
                     required
                     placeholder='Enter your Password'
                     className='w-full px-4 py-2 border-black border-2 outline-0'
                     initial={{ x: -50, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.4, duration: 0.5 }}
                  />

                  <motion.button
                     type='submit'
                     className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-white'
                     initial={{ scale: 0.9 }}
                     animate={{ scale: 1 }}
                     transition={{ duration: 0.3 }}
                  >
                     Login
                  </motion.button>

                  {error && (
                     <motion.h3
                        className="text-red-500 text-sm"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                     >
                        Something Went Wrong
                     </motion.h3>
                  )}

                  <div className='flex justify-center items-center space-x-1'>
                     <p>New Here?</p>
                     <p className='text-gray-500 hover:text-black hover:font-semibold'>
                        <Link to="/register">Register</Link>
                     </p>
                  </div>
               </form>
            </div>
         </motion.div>
         <Footer />
      </>
   )
}

export default Login
