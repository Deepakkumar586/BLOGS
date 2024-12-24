import { motion } from "framer-motion";

function HomePosts({ post }) {
  return (
    <motion.div
      className="w-full flex flex-col mt-8 space-y-4 bg-gradient-to-r from-indigo-50 via-purple-100 to-pink-50 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Right Part (Text) */}
      <div className="w-full flex flex-col space-y-4 p-6">
        <motion.h1
          className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-200 ease-in-out"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {post.title}
        </motion.h1>

        <div className="flex items-center justify-between text-sm font-semibold text-gray-500 md:text-base">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 30)}</p>
          </div>
        </div>

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
