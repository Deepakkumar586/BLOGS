import React from 'react'
import {Link} from 'react-router-dom'
import { IoSearchCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const user=true;
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
    <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">Blogs</Link></h1>
    <div className='flex justify-center items-center space-x-0'>
      <p><IoSearchCircleSharp /></p>
      <input className='outline-none px-3' placeholder='Seach Blogs' type='text'/>
    </div>

    <div className='flex items-center justify-center space-x-2 md:space-x-4'>
    {user ? <h3><Link to='/createBlog'>Create Blog</Link> </h3> : <h3><Link to="/login"></Link>Login</h3>}
    {user ?<h3>Profile</h3> :  <h3><Link to="/register"></Link>Register</h3>}

    </div>
    </div>
  )
}

export default Navbar
