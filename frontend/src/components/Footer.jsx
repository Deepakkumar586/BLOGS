import React from 'react'

const Footer = () => {
  return (
    <div className='mt-8 w-full bg-black px-8 md:px-[500px] flex justify-between text-sm md:text-md py-8 '>
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
    <p>Recent Post s</p>
    </div>
     
    </div>
  )
}

export default Footer
