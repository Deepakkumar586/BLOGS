import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  
  const [posts, setPosts] = useState([]);
  const [searchNoResult, setSearchNoResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);


  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get("https://blogs-19nw.onrender.com/api/blogs/" + search);
     
      setPosts(res.data.findBlog);
      if (res.data.findBlog.length === 0) {
        setSearchNoResult(true);
      } else {
        setSearchNoResult(false);
      }
      setLoader(false);
    } catch (err) {
      console.error("Post Fetch Error", err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);

  return (
    <>
      <Navbar />
      <motion.div
        className="px-4 md:px-16 min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !searchNoResult ? (
          posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <Link to={user ? `/posts/${post._id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.h3
            className="text-center font-bold mt-16 text-xl md:text-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No Posts Available
          </motion.h3>
        )}
      </motion.div>
      <Footer />
    </>
  );
};

export default Home;
