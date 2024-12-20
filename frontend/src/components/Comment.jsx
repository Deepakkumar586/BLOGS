import React, { useContext } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import framer-motion

const Comment = ({ c }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      const res = await axios.delete("http://localhost:8000/api/comment/" + id, { withCredentials: true });
      window.location.reload(true);
    } catch (err) {
      console.log("Delete Comment Problem On UI", err);
    }
  };

  return (
    <motion.div
      className="px-4 py-4 bg-gray-200 rounded-lg my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <motion.h3
          className="font-bold text-gray-600"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          @{c.author}
        </motion.h3>

        {/* Dates and time */}
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>

          {/* Comment Edit and Delete */}
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <motion.p
                className="cursor-pointer text-red-500"
                onClick={() => deleteComment(c._id)}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TiDelete />
              </motion.p>
            </div>
          ) : ""}
        </div>
      </div>
      <motion.p
        className="px-4 mt-2 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {c.comment}
      </motion.p>
    </motion.div>
  );
};

export default Comment;
