import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { RxCross2 } from "react-icons/rx";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const CreatePost = () => {

  const [title,setTitle] = useState("");
  const [description,setDesc] = useState("");
  const [file,setFile] = useState(null);
  const {user} = useContext(UserContext);
    // single category
    const [cat,setCat] = useState("");
    // array category
    const [cats,setCats] = useState([]);

    const navigate = useNavigate();
    console.log("file here",file)


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



    const handleCreate = async(e)=>{
      e.preventDefault();
      const post = {
        title,
        description,
        file,
        username:user.username,
        userId:user._id,
        categories:cats
      }
      if(file){
        const data = new FormData();
        const filename = Date.now()+file.name
        data.append("img",filename);
        data.append("file",file);
        post.image=filename

        // img upload
        try{
          const imgUpload = await axios.post("http://localhost:8000/api/upload",data);
          console.log(imgUpload.data)
        }
        catch(err){
          console.log("UI Image Upload  Problem",err);
        }
      }

      // Blog Create
      try{
        const res = await axios.post("http://localhost:8000/api/blogs/create",post,{withCredentials:true})
        navigate("/posts/"+res.data.saveBlog._id
        )
        console.log("Create Data",res.data);



      }
      catch(err){
        console.log("Blog Creation Problem",err);
      }
      
    }
  return (
    <div>
      <Navbar/>

        <div className='px-6 md:px-[200px] mt-8'>
            <h1 className='font-bold md:text-2xl text-xl '>Create a Post</h1>
            <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input
              onChange={(e)=>setTitle(e.target.value)}
                className='px-4 py-2 outline-none'
                type='text'
                name='title'
                placeholder='Enter post title'
            />
            <input
                onChange={(e)=>setFile(e.target.files[0])}
                className='px-4'
                type='file'
                name='file'
                placeholder='Enter post file'
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
                <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><RxCross2/></p>
            </div>
            ))}
              
              </div>
            </div>
            <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className='px-4 py-2 outline-none ' placeholder='Write post Description....'/>
            <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg '>Create Blog</button>
            

            </form>
        </div>

      <Footer/>
    </div>
  )
}

export default CreatePost
