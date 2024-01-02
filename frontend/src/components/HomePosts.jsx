import React from 'react'

function HomePosts({blog}) {
  return (
    <div className='w-full flex mt-8 space-x-2'>
        {/* Left Part */}
        <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src={blog.image} alt='' className='h-full w-full object-cover'/>
        
        </div>


        {/* Right Part */}
        <div className='flex flex-col w-[65%]'>
          <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>{blog.title}</h1>
          <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
            <p>@{blog.username}</p>
            <div className='flex space-x-2'>
              <p>23/12/23</p>
              <p>12:24</p>
            </div>

          </div>
          <p className='text-sm md:text-lg'>{blog.description}</p>
        </div>
     
    </div>
  )
}

export default HomePosts
