import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AiTwotoneEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import {IF,URL} from "../url"
const PostDetails = () => {
  const {user} = useContext(UserContext);
  // console.log(user?._id);
  
  const [post,setPost] = useState({});
  const postId = useParams();
  console.log("URL POST ID",postId);

  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();

  // fetchPost Accrding to id
  const fetchPost = async()=>{
    setLoader(true);
    try{
      const res = await axios.get('http://localhost:8000/api/blogs/'+postId.id);
      console.log("Id According Data",res.data);
      setPost(res.data.findSingleBlog);
      setLoader(false);
    }
    catch(err){
      setLoader(true);
      console.log("Id Fetch Error Blog",err);
    }
  }


        // Delete Post
       const handleDeletePost = async()=>{
          try{
             const res =  await axios.delete("http://localhost:8000/api/blogs/"+postId.id,{withCredentials:true})
             console.log("DELETE POST",res.data)
              navigate("/")
          }
          catch(err){
            console.log("UI DELETE PROBLEM",err);
          }
        }



        
  useEffect(()=>{
    fetchPost();
  },[postId]);



  
  return (
    <div>
      <Navbar />
      {loader ? <div className="h-[80vh] flex justify-center items-center"><Loader/></div> : <div className="px-8 px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {post.title}
          </h1>
          
          {user?._id===post?.userId &&  <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId.id)}>
              <AiTwotoneEdit />
            </p>
            <p className="cursor-pointer" onClick={handleDeletePost}>
              <TiDelete />
            </p>
          </div> }
         
        </div>

        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
          </div>
        </div>

        <img
          src={IF+post.image}
          className="w-full mx-auto mt-8"
          alt=""
        />
        <p className="mx-auto mt-8 ">
          {post.description}
        </p>
        {/* for category  part start*/}
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>categories:</p>
          {/* actual category */}
          <div className="flex justify-center items-center space-x-2">
          {
            post.categories?.map((cat,index)=>(
              <div key={index} className="bg-gray-300 rounded-lg px-3 py-1">{cat}</div>
            ))
          }
           
           
          </div>
        </div>
        {/* for comment section */}
        <div className=" flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {/* actual comment */}
          <Comment/>
          <Comment/>

         
        </div>

        {/* Write a comment */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
            <input className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0" type="text" placeholder="Write a own words"/>
            <button className="bg-black text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
        </div>
      </div>}
      <Footer />
    </div>
  );
};

export default PostDetails;
