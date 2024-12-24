import { motion } from "framer-motion"; // Import framer-motion for animation

const ProfilePost = ({ p }) => {
  return (
    <motion.div
      className="w-full flex flex-col mt-8 space-y-4 bg-gradient-to-r from-blue-50 via-teal-50 to-green-50 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Right (Text) */}
      <motion.div
        className="w-full flex flex-col p-6 space-y-4 bg-white rounded-lg shadow-md"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
        >
          {p.title}
        </motion.h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between">
          <p>@{p.username}</p>
          <div className="flex gap-2 ml-6 space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>

        <motion.p
          className="text-sm md:text-lg text-gray-700"
          whileHover={{ scale: 1.02 }}
        >
          {p.description.slice(0, 200)}...{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
            Read more
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePost;
