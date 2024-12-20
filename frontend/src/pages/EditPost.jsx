import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from 'react-router-dom';
import axios  from 'axios';
import { UserContext } from '../context/UserContext';
import { motion } from 'framer-motion';

const EditPost = () => {
    const { user } = useContext(UserContext)
    const navigate  =  useNavigate(); 
    const postId = useParams().id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);

    // Fetch the existing post to edit
    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/blogs/${postId}`);
            setTitle(res.data.findSingleBlog.title);
            setDescription(res.data.findSingleBlog.description);
            setFile(res.data.findSingleBlog.image);
            setCats(res.data.findSingleBlog.categories);
        } catch (err) {
            console.log("Update Error", err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    // Add category
    const addCategory = () => {
        let updatedCats = [...cats];
        updatedCats.push(cat);
        setCat("");
        setCats(updatedCats);
    };

    // Delete category
    const deleteCategory = (i) => {
        let updatedCats = [...cats];
        updatedCats.splice(i, 1);
        setCats(updatedCats);
    };

    // Handle post update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            description,
            file,
            username: user.username,
            userId: user._id,
            categories: cats,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.image = filename;

            try {
                await axios.post("http://localhost:8000/api/upload", data);
            } catch (err) {
                console.log("UI Image Upload Problem", err);
            }
        }

        try {
            const res = await axios.put(`http://localhost:8000/api/blogs/${postId}`, post, { withCredentials: true });
            navigate(`/posts/${res.data.updatedBlog._id}`);
        } catch (err) {
            console.log("Blogs Update Problem", err);
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
                    Update a Post
                </motion.h1>

                <motion.form
                    className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    onSubmit={handleUpdate}
                >
                    <motion.input
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-4 py-2 outline-none"
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    />

                    <motion.input
                        onChange={(e) => setFile(e.target.files[0])}
                        className="px-4"
                        type="file"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    />

                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <motion.input
                                className="px-4 py-2 outline-none"
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                                type="text"
                                placeholder="Enter Post Category"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            />
                            <div
                                onClick={addCategory}
                                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                            >
                                Add
                            </div>
                        </div>

                        <motion.div
                            className="flex mx-4 mt-3"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            {cats?.map((c, i) => (
                                <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                                    <p>{c}</p>
                                    <p
                                        onClick={() => deleteCategory(i)}
                                        className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                                    >
                                        <RxCross2 />
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={15}
                        cols={30}
                        className="px-4 py-2 outline-none"
                        placeholder="Write post Description...."
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    />

                    <motion.button
                        type="submit"
                        className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
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
}

export default EditPost;
