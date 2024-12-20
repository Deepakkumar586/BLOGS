import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { RxCross2 } from "react-icons/rx";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  }

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      file,
      username: user.username,
      userId: user._id,
      categories: cats
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.image = filename;

      try {
        await axios.post("https://blogs-4v8d.onrender.com/api/upload", data);
      } catch (err) {
        console.error("UI Image Upload Problem", err);
      }
    }

    try {
      const res = await axios.post("https://blogs-4v8d.onrender.com/api/blogs/create", post, { withCredentials: true });
      navigate("/posts/" + res.data.saveBlog._id);
      
    } catch (err) {
      console.error("Blog Creation Problem", err);
    }
  }

  return (
    <div>
      <Navbar />

      <motion.div
        className='px-6 md:px-[200px] mt-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className='font-bold md:text-2xl text-xl'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Create a Post
        </motion.h1>

        <motion.form
          className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          onSubmit={handleCreate}
        >
          <motion.input
            onChange={(e) => setTitle(e.target.value)}
            className='px-4 py-2 outline-none'
            type='text'
            name='title'
            placeholder='Enter post title'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />

          <motion.input
            onChange={(e) => setFile(e.target.files[0])}
            className='px-4'
            type='file'
            name='file'
            placeholder='Choose a file'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
              <motion.input
                className='px-4 py-2 outline-none'
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type='text'
                placeholder='Enter Post Category'
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
              <div
                onClick={addCategory}
                className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'
              >
                Add
              </div>
            </div>

            <motion.div
              className='flex mx-4 mt-3'
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {cats?.map((c, i) => (
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'>
                    <RxCross2 />
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className='px-4 py-2 outline-none'
            placeholder='Write post Description....'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          <motion.button
            type='submit'
            className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Create Blog
          </motion.button>
        </motion.form>
      </motion.div>

      <Footer />
    </div>
  );
}

export default CreatePost;
