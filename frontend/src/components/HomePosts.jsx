import { motion } from "framer-motion"; // Import framer-motion

function HomePosts({ post }) {
  return (
    <motion.div
      className="w-full flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4 hover:scale-105 transition-transform duration-300 ease-in-out bg-white shadow-md rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Right Part (Text) */}
      <div className="w-full p-6">
        {/* Post Title */}
        <motion.h1
          className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition duration-200 ease-in-out mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {post.title}
        </motion.h1>

        {/* Post Metadata (Author and Date) */}
        <div className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-4">
          <p className="text-indigo-600">@{post.username}</p>
          <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
        </div>

        {/* Post Description */}
        <motion.p
          className="text-lg text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {post.description.slice(0, 200)}...
          <span className="text-pink-600 hover:text-indigo-800 cursor-pointer ml-2">
            Read more
          </span>
        </motion.p>
      </div>
    </motion.div>
  );
}

export default HomePosts;
