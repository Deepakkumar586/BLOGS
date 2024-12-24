import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const addCategory = () => {
    if (cat) {
      setCats([...cats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("username", user.username);
    formData.append("userId", user.id);
    formData.append("categories", JSON.stringify(cats));

    try {
      const response = await axios.post("/api/blogs", formData);
      console.log(response.data);
      navigate("/blogs"); // Redirect after blog creation
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white">
      <Navbar />
      <motion.div
        className="max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="font-bold text-3xl text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Create a New Blog Post
        </motion.h1>

        <motion.form
          className="w-full flex flex-col space-y-6 mt-8 bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          onSubmit={handleCreate}
        >
          <motion.input
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 w-full outline-none rounded-md border border-gray-300 focus:border-blue-500"
            type="text"
            name="title"
            placeholder="Enter post title"
            required
          />

          <motion.textarea
            onChange={(e) => setDesc(e.target.value)}
            className="px-4 py-2 w-full outline-none rounded-md border border-gray-300 focus:border-blue-500"
            rows="5"
            name="description"
            placeholder="Enter description"
            required
          />

          <div className="flex flex-col">
            <div className="flex items-center space-x-4">
              <motion.input
                className="px-4 py-2 w-full outline-none rounded-md border border-gray-300 focus:border-blue-500"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                placeholder="Enter Post Category"
              />
              <div
                onClick={addCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Add
              </div>
            </div>

            <div className="flex flex-wrap space-x-2 mt-4">
              {cats.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-black px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <span>{category}</span>
                  <RxCross2
                    onClick={() => deleteCategory(index)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md mt-6 transition-colors hover:bg-blue-600"
          >
            Create Post
          </motion.button>
        </motion.form>
      </motion.div>
      <Footer />
    </div>
  );
};

export default CreateBlog;
