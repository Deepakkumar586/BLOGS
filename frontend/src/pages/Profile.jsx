import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePost from "../components/ProfilePost";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { motion } from "framer-motion"; 

const Profile = () => {
  const { search } = useLocation();
  const param = useParams()._id;
  const { user, setUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [searchNoResult, setSearchNoresult] = useState(false);
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const [userblog, setUserblog] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchProfileUser = async () => {
    try {
      const res = await axios.get(
        "https://blogs-19nw.onrender.com/api/users/" + user?._id
      );
      setUsername(res.data.findUser.username);
      setEmail(res.data.findUser.email);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        "https://blogs-19nw.onrender.com/api/users/" + user?._id,
        { username, email },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      setUpdated(false);
      console.error(err);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(
        "https://blogs-19nw.onrender.com/api/users/" + user?._id,
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, [user?._id]);

  const fetchUserPosts = async () => {
    setLoader(true);
    try {
      if (!dataFetched) {
        const response = await axios.get(`https://blogs-19nw.onrender.com/api/blogs/user/${user?._id}`);
        const { success, findBlogUser } = response.data;

        if (success) {
          setUserblog(findBlogUser);
          setDataFetched(true);

          // Store the fetched data in localStorage
          localStorage.setItem(`userBlogs_${user?._id}`, JSON.stringify(findBlogUser));
        } else {
          console.error("Blog fetch failed:", response.data.message);
        }
      }
      setLoader(false);
    } catch (err) {
      console.error("Post Fetch Error", err);
      setLoader(false); // Set loader to false in case of an error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedBlogData = localStorage.getItem(`userBlogs_${user?._id}`);

        if (storedBlogData) {
          setUserblog(JSON.parse(storedBlogData));
        } else {
          await fetchUserPosts();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchUserPosts();
  }, [user?._id]);

  return (
    <div>
      <Navbar />
      <motion.div
        className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Part (User Blogs) */}
        <motion.div
          className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-black mb-4">Your Blogs</h1>
          <div className="min-h-[80vh]">
            {loader ? (
              <div className="h-[40vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : !searchNoResult ? (
              userblog.map((p) => (
                <ProfilePost key={p._id} p={p} />
              ))
            ) : (
              <h3 className="text-center font-semibold text-xl mt-16 text-gray-500">No posts available</h3>
            )}
          </div>
        </motion.div>

        {/* Right Part (Profile Details) */}
        <motion.div
          className="md:sticky  md:top-12 flex flex-col ml-8 justify-start md:justify-end items-start space-y-6 md:w-[30%] w-full md:items-end bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 rounded-lg p-6 shadow-xl"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold  text-black mb-4 hover:text-indigo-500">Profile</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full outline-none px-4 py-2 mb-4 rounded-md border-2 border-gray-300 text-gray-700"
            placeholder="Your username"
            value={username}
            type="text"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none px-4 py-2 mb-6 rounded-md border-2 border-gray-300 text-gray-700"
            placeholder="Your email"
            value={email}
            type="email"
          />
          <div className="flex items-center space-x-4 mt-8">
            <button
              onClick={handleUserUpdate}
              className="text-white font-semibold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-all"
            >
              Update
            </button>
            <button
              onClick={handleUserDelete}
              className="text-white font-semibold bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition-all"
            >
              Delete Account
            </button>
          </div>
          {updated && (
            <motion.h3
              className="text-green-500 text-center mt-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              User Updated Successfully
            </motion.h3>
          )}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Profile;
