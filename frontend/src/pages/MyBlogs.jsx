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
      const res = await axios.get("http://localhost:8000/api/blogs/user/" + user?._id);
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
      <div className="px-8 md:px-[200px] min-h-[80vh] py-8 space-y-6 bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : searchNoResult ? (
          <motion.h3 
            className="text-center text-black font-bold mt-16 text-xl"
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
                className="transition-transform duration-300 ease-in-out hover:scale-105 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl">
                  <motion.h2
                    className="text-2xl font-semibold text-gray-800 hover:text-indigo-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    {post.title}
                  </motion.h2>

                  <div className="flex justify-between text-sm font-semibold text-gray-500">
                    <p>@{post.username}</p>
                    <p>{new Date(post.updatedAt).toLocaleString()}</p>
                  </div>

                  <motion.p
                    className="text-lg text-gray-700 leading-relaxed"
                    whileHover={{ scale: 1.02 }}
                  >
                    {post.description.slice(0, 150)}...
                    <span className="text-indigo-600 cursor-pointer hover:underline"> Read more</span>
                  </motion.p>
                </div>
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
