import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AiTwotoneEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { IF } from "../url";

const PostDetails = () => {
  const [comments, setComments] = useState([]);
  const [comment1, setComment1] = useState("");
  const [post, setPost] = useState({});
  const postIdURL = useParams();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Fetch the post based on ID
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        "https://blogs-4v8d.onrender.com/api/blogs/" + postIdURL.id
      );
      setPost(res.data.findSingleBlog);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.error("Id Fetch Error Blog", err);
    }
  };

  // Delete post handler
  const handleDeletePost = async () => {
    try {
      await axios.delete(
        "https://blogs-4v8d.onrender.com/api/blogs/" + postIdURL.id,
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error("UI DELETE PROBLEM", err);
    }
  };

  // Fetch all comments related to the post
  const fetchCommentPost = async () => {
    try {
      const res = await axios.get(
        "https://blogs-4v8d.onrender.com/api/comment/post/" + postIdURL.id
      );
      setComments(res.data.findBlogComment);
    } catch (err) {
      console.error("Comment Fetch Problem", err);
    }
  };

  // Post a comment
  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://blogs-4v8d.onrender.com/api/comment/create",
        {
          comment: comment1,
          author: user.username,
          postId: postIdURL?.id,
          userId: user?._id,
        },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.error("Add Comment Problem on Post", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchCommentPost();
  }, [postIdURL]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8 space-y-6 bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100">
          <motion.div
            className="flex justify-between items-center border-b-2 border-gray-300 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  onClick={() => navigate("/edit/" + postIdURL.id)}
                >
                  <AiTwotoneEdit />
                </p>
                <p
                  className="cursor-pointer text-red-600 hover:text-red-800"
                  onClick={handleDeletePost}
                >
                  <TiDelete />
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            className="flex items-center justify-between mt-2 md:mt-4 text-sm text-gray-500 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </motion.div>

          <motion.p
            className="mx-auto mt-8 text-lg text-gray-700 leading-relaxed border-t-2 border-gray-300 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {post.description}
          </motion.p>

          <motion.div
            className="flex items-center mt-8 space-x-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((cat, index) => (
                <div
                  key={index}
                  className="bg-gray-300 text-sm text-gray-800 rounded-lg px-3 py-1"
                >
                  {cat}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c, index) => (
              <Comment key={index} c={c} />
            ))}
          </motion.div>

          <motion.div
            className="w-full flex flex-col mt-4 md:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <input
              onChange={(e) => setComment1(e.target.value)}
              className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0 border-2 border-gray-300 rounded-md"
              type="text"
              placeholder="Write your own words"
            />
            <button
              onClick={postComment}
              className="bg-black text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0 ml-4 rounded-md hover:bg-gray-800"
            >
              Add Comment
            </button>
          </motion.div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
