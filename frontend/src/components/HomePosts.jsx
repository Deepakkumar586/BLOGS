import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import { IF } from '../url';

function HomePosts({ post }) {
  return (
    <motion.div
      className="w-full flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4 hover:scale-105 transition-transform duration-300 ease-in-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Part (Image) */}
      <motion.div
        className="w-full md:w-[35%] h-[200px] rounded-lg overflow-hidden shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={IF + post.image}
          alt=""
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Right Part (Text) */}
      <div className="w-full md:w-[65%] flex flex-col space-y-4 p-4 md:p-6">
        {/* Post Title */}
        <motion.h1
          className="text-xl font-semibold md:text-2xl text-gray-800 hover:text-indigo-600 transition duration-200 ease-in-out"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {post.title}
        </motion.h1>

        {/* Post Metadata (Author and Date) */}
        <div className="flex items-center justify-between text-sm font-semibold text-gray-500 md:text-base">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 30)}</p>
          </div>
        </div>

        {/* Post Description */}
        <motion.p
          className="text-sm md:text-lg text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {post.description.slice(0, 200)}...
          <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
            Read more
          </span>
        </motion.p>
      </div>
    </motion.div>
  );
}

export default HomePosts;
