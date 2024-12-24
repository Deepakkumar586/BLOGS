import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("file", file);

      try {
        const uploadResponse = await axios.post("https://blogs-4v8d.onrender.com/api/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Get the Cloudinary URL and add it to the post object
        post.image = uploadResponse.data.url; // Save the full Cloudinary URL
      } catch (err) {
        console.error("Image Upload Error", err);
      }
    }

    try {
      const res = await axios.post(
        "https://blogs-4v8d.onrender.com/api/blogs/create",
        post,
        { withCredentials: true }
      );
      navigate("/posts/" + res.data.saveBlog._id);
    } catch (err) {
      console.error("Blog Creation Error", err);
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="px-6 md:px-[200px] mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="font-bold md:text-2xl text-xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Create a Post
        </motion.h1>

        <motion.form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          onSubmit={handleCreate}
        >
          <motion.input
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 outline-none"
            type="text"
            name="title"
            placeholder="Enter post title"
          />

          <motion.input
            onChange={(e) => setFile(e.target.files[0])}
            className="px-4"
            type="file"
            name="file"
            placeholder="Choose a file"
          />

          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <motion.input
                className="px-4 py-2 outline-none"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                placeholder="Enter Post Category"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-2 py-1 cursor-pointer"
              >
                Add
              </div>
            </div>

            <div className="flex flex-wrap space-x-2 mt-2">
              {cats.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-300 text-black px-2 py-1 rounded-full flex items-center space-x-1"
                >
                  <span>{category}</span>
                  <RxCross2
                    onClick={() => deleteCategory(index)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.textarea
            onChange={(e) => setDesc(e.target.value)}
            className="px-4 py-2 outline-none"
            rows="5"
            name="description"
            placeholder="Enter description"
          />

          <motion.button
            type="submit"
            className="px-6 py-2 bg-black text-white font-bold mt-4 rounded"
          >
            Create Post
          </motion.button>
        </motion.form>
      </motion.div>
      <Footer />
    </div>
  );
};

export default CreatePost;
