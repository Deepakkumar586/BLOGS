import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/userContext";

const Home = () => {
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
      const res = await axios.get("http://localhost:8000/api/blogs/"+search);
      console.log(res.data.findBlog);
      setPosts(res.data.findBlog);
      if(res.data.findBlog.length==0){
        setSearchNoresult(true);
      }
      else{
        setSearchNoresult(false);
      }
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
    <>
      <Navbar />

      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {
         loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!searchNoResult ?posts.map((post,i)=>{
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
      <Footer />
    </>
  );
};

export default Home;
