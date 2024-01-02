import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import axios from 'axios';

function Menu() {
    const {user} = useContext(UserContext);
    const {setUser} = useContext(UserContext)
    
    const handleLogout = async()=>{
      try{
        const res = await axios.get('http://localhost:8000/api/auth/logout',{withCredentials:true})
        console.log(res);
        setUser(null);
        console.log("Successfully User Logout")

      }
      catch(err){
        console.log("UI Design Logout Problem",err);
      }
    }
  return (
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 right-5 md:right-32 rounded-md p-4 space-y-4'>
   {!user &&  <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Login</h3>}

    {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Register</h3>}
    {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Profile</h3>}
    {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Create</h3>}
    {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>MyBlogs</h3>}
    {user && <h3 onClick={handleLogout} className='text-white text-sm hover:text-gray-500 cursor-pointer'>Logout</h3>}
      
    </div>
  )
}

export default Menu
