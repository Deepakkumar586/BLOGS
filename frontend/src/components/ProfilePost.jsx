import { motion } from "framer-motion"; // Import framer-motion for animation

const ProfilePost = ({ p }) => {
  const cloudinaryBaseUrl = "https://res.cloudinary.com/du5xg6cck/image/upload/blog_images/>";

  return (
    <motion.div
      className="w-full flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 shadow-lg hover:shadow-2xl rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left (Image) */}
      <motion.div
        className="w-full md:w-[35%] h-[200px] flex justify-center items-center overflow-hidden rounded-t-lg md:rounded-l-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={`${cloudinaryBaseUrl}${p.image}`} // Dynamically load image using Cloudinary
          alt={p.title || "Post Image"}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Right (Text) */}
      <motion.div
        className="flex flex-col w-full md:w-[65%] p-4 space-y-2 md:space-y-4 bg-white rounded-b-lg md:rounded-r-lg"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
        >
          {p.title}
        </motion.h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
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
          <span className="text-blue-500 cursor-pointer hover:underline">
            Read more
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePost;
