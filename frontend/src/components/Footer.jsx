import React from 'react'

const Footer = () => {
  return (
   <>
     <div className='mt-8 w-full bg-black px-8 md:px-[500px] flex md:flex-row flex-row items-starts space-x-10 md:justify-between  md:space-y-0 text-sm md:text-md py-8 '>
       {/* Inside Parent Div Have a 3 div  */}
       {/* first div */}
    <div className='flex flex-col text-white'>
    <p>Featured Blogs</p>
    <p>Most viewed</p>
    <p>Reader Choice</p>
    </div>
    {/* second div */}
    <div className='flex flex-col text-white'>
    <p>Forum</p>
    <p>Support</p>
    <p>Recent Posts</p>
    </div>

    {/* Third Div */}
    <div className='flex flex-col text-white'>
    <p>Privacy Policy</p>
    <p>About Us</p>
    <p>Terms & Conditions</p>
    <p>Terms of Service</p>
    </div>
    </div>
    <p className='py-2 pb-2 text-center text-white bg-black'>All rights reserved @Blog Marker 2023</p>
   </>
  )
}

export default Footer
