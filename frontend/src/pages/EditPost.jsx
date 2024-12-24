import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { motion } from 'framer-motion';

const EditPost = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const postId = useParams().id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);

    // Fetch the existing post to edit
    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/blogs/${postId}`);
            setTitle(res.data.findSingleBlog.title);
            setDescription(res.data.findSingleBlog.description);
            setCats(res.data.findSingleBlog.categories);
        } catch (err) {
            console.error("Update Error", err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    // Add category
    const addCategory = () => {
        if (cat) {
            setCats([...cats, cat]);
            setCat("");
        }
    };

    // Delete category
    const deleteCategory = (i) => {
        setCats(cats.filter((_, index) => index !== i));
    };

    // Handle post update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            description,
            username: user.username,
            userId: user._id,
            categories: cats,
        };

        try {
            const res = await axios.put(`http://localhost:8000/api/blogs/${postId}`, post, { withCredentials: true });
            navigate(`/posts/${res.data.updatedBlog._id}`);
        } catch (err) {
            console.error("Blogs Update Problem", err);
        }
    };

    return (
        <div className="bg-gradient-to-r from-teal-500 to-indigo-600 min-h-screen text-black">
            <Navbar />
            <motion.div
                className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-xl mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="font-bold text-3xl text-center mb-6 text-gray-800"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Update Your Blog Post
                </motion.h1>

                <motion.form
                    className="w-full flex flex-col space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    onSubmit={handleUpdate}
                >
                    <motion.input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="px-4 py-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        type="text"
                        placeholder="Enter post title"
                        required
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    />

                    <motion.textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        className="px-4 py-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Write your post description here..."
                        required
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    />

                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4">
                            <motion.input
                                className="px-4 py-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                                type="text"
                                placeholder="Add Post Category"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            />
                            <div
                                onClick={addCategory}
                                className="bg-teal-500 text-white px-4 py-3 rounded-md cursor-pointer"
                            >
                                Add
                            </div>
                        </div>

                        <motion.div
                            className="flex flex-wrap gap-2 mt-4"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            {cats?.map((category, index) => (
                                <div
                                    key={index}
                                    className="bg-teal-200 text-teal-800 px-4 py-2 rounded-full flex items-center space-x-2"
                                >
                                    <span>{category}</span>
                                    <RxCross2
                                        onClick={() => deleteCategory(index)}
                                        className="cursor-pointer text-teal-600"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.button
                        type="submit"
                        className="bg-teal-600 w-full md:w-[30%] mx-auto text-white font-semibold px-4 py-3 text-lg rounded-md transition-all hover:bg-teal-700"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        Update Blog
                    </motion.button>
                </motion.form>
            </motion.div>
            <Footer />
        </div>
    );
};

export default EditPost;
