import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RxCross2 } from "react-icons/rx";

const EditPost = () => {
     // single category
     const [cat,setCat] = useState("");
     // array category
     const [cats,setCats] = useState([]);
 
 
     const addCategory = ()=>{
         let updatedCats=[...cats]
         updatedCats.push(cat);
         setCat("")
         setCats(updatedCats)
     }
 
     const deleteCategory =(i)=>{
         let updatedCats=[...cats];
         updatedCats.splice(i);
         setCats(updatedCats);
     }
  return (
    <div>
      <Navbar/>

        <div className='px-6 md:px-[200px] mt-8'>
            <h1 className='font-bold md:text-2xl text-xl '>Update a Post</h1>
            <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input
                className='px-4 py-2 outline-none'
                type='text'
                name='posttitle'
                placeholder='Enter post title'
            />
            <input
                className='px-4'
                type='file'
                name='posttitle'
                placeholder='Enter post title'
            />
            <div className='flex flex-col'>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <input 
                        className='px-4 py-2 outline-none'
                        value={cat}
                        onChange={(e)=>setCat(e.target.value)}
                        type='text'
                        placeholder='Enter Post Category'
                    />
                    <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>
                            Add
                    </div>
                </div>
                    {/* Categories */}
              <div className='flex mx-4 mt-3'>
              {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                    <p>{c}</p>
                    <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><RxCross2 /></p>
                </div>
              ))}
              
              </div>
            </div>
            <textarea rows={15} cols={30} className='px-4 py-2 outline-none ' placeholder='Write post Description....'/>
            <button className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg '>Update Blog</button>
            

            </form>
        </div>

      <Footer/>
    </div>
  )
}

export default EditPost
