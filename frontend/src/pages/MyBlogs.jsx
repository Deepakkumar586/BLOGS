import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import HomePosts from '../components/HomePosts';
import Loader from "../components/Loader";
import { motion } from 'framer-motion';

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [searchNoResult, setSearchNoResult] = useState(false);
  const [loader, setLoader] = useState(true);  // Set loader to true initially
  const { user } = useContext(UserContext);

  const fetchPost = async () => {
    try {
      const res = await axios.get("https://blogs-4v8d.onrender.com/api/blogs/user/" + user?._id);
      setPosts(res.data.findBlogUser);
      setSearchNoResult(res.data.findBlogUser.length === 0); // Check if no results
      setLoader(false);  // Set loader to false after data is fetched
    } catch (err) {
      console.error("Post Fetch Error", err);
      setLoader(false);  // Hide loader even on error
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPost();
    }
  }, [user?._id]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh] py-8 space-y-6">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : searchNoResult ? (
          <motion.h3 
            className="text-center text-black font-bold mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            No posts available
          </motion.h3>
        ) : (
          posts.map((post) => (
            <Link to={user ? `/posts/${post?._id}` : "/login"} key={post._id}>
              <motion.div
                className="transition-transform duration-300 ease-in-out hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HomePosts post={post} />
              </motion.div>
            </Link>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
