import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import HomePosts from '../components/HomePosts';
import Loader from "../components/Loader";

const MyBlogs = () => {
  const {search}= useLocation();
  console.log(search);
  const [posts,setPosts] = useState([]);
  const [searchNoResult,setSearchNoresult] = useState(false);
  const [loader,setLoader] = useState(false);
  const {user} = useContext(UserContext);
  console.log(user);

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get("http://localhost:8000/api/blogs/user/"+user?._id);
      console.log("My BLOGS",res.data.findBlogUser);
      setPosts(res.data.findBlogUser);
      // if(res.data.findBlog.length==0){
      //   setSearchNoresult(true);
      // }
      // else{
      //   setSearchNoresult(false);
      // }
      setLoader(false);
    } catch (err) {
      console.log("Post Fetch Error", err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);
  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] min-h-[80vh]">
        {
         loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:searchNoResult ? posts.map((post,i)=>{
            return (
              <>
                <Link to={user?`/posts/${post._id}`:"/login"}>
                <HomePosts key={i} post={post}/>
                </Link>
              </>
            )
          }):<h3 className="text-center font-bold mt-16">No Posts Available  </h3>
        }
        </div>
        <Footer/>
    </div>
  )
}

export default MyBlogs
