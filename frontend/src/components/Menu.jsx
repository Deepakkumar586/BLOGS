import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Menu() {
  const { user } = useContext(UserContext);

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/auth/logout', { withCredentials: true })


      navigate('/login')
      setUser(null);



    }
    catch (err) {
      console.log("UI Design Logout Problem", err);
    }
  }
  return (
    <div className='bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-5 md:right-32 rounded-md p-4 space-y-4'>
      {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/login">Login</Link></h3>}

      {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/register">Register</Link></h3>}
      {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to={"/profile/" + user?._id}>Profile</Link></h3>}
      {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/createBlog">Create</Link></h3>}
      {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to={"/myblogs/" + user._id}>My Blogs</Link></h3>}
      {user && <h3 onClick={handleLogout} className='text-white text-sm hover:text-gray-500 cursor-pointer'>Logout</h3>}

    </div>
  )
}

export default Menu
