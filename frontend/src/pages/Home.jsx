import React, { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Home = () => {
  const [posts,setPosts] = useState([]);
  const fetchPost = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/blogs/");
      console.log(res.data.findBlog);
      setPosts(res.data.findBlog);
    } catch (err) {
      console.log("Post Fetch Error", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <Navbar />

      <div className="px-8 md:px-[200px]">
        {
          posts.map((post)=>{
            return (
              <HomePosts key={post._id} post={post}/>
            )
          })
        }
      </div>
      <Footer />
    </>
  );
};

export default Home;
