import React from 'react'

const ProfilePost = () => {
  return (
    <div className='w-full flex mt-8 space-x-2'>
    {/* Left Part */}
    <div className='w-[35%] h-[200px] flex justify-center items-center'>
    <img src='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' className='h-full w-full object-cover'/>
    
    </div>


    {/* Right Part */}
    <div className='flex flex-col w-[65%]'>
      <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>10 Uses of Artificial Intelligence in Day to Day Life</h1>
      <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
        <p>@DeepakDev</p>
        <div className='flex space-x-2'>
          <p>23/12/23</p>
          <p>12:24</p>
        </div>

      </div>
      <p className='text-sm md:text-lg'>artificial intelligence (AI), the ability of a digital computer or computer-controlled robot to perform tasks commonly associated with intelligent beings.</p>
    </div>
 
</div>
  )
}

export default ProfilePost
