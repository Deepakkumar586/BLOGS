import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion

const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-24 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-10 text-sm md:text-md py-8">
        {/* First Column */}
        <motion.div
          className="flex flex-col text-white space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Featured Blogs</p>
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Most viewed</p>
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Reader Choice</p>
        </motion.div>
        
        {/* Second Column */}
        <motion.div
          className="flex flex-col text-white space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Forum</p>
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Support</p>
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Recent Posts</p>
        </motion.div>

        {/* Third Column */}
        <motion.div
          className="flex flex-col text-white space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Privacy Policy</p>
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">About Us</p>
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Terms & Conditions</p>
          <p className="hover:text-yellow-300 transition duration-200 cursor-pointer">Terms of Service</p>
        </motion.div>
      </div>
      
      <motion.p
        className="py-2 text-center text-white bg-black text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        All rights reserved @Blog Marker 2023
      </motion.p>
    </>
  );
};

export default Footer;
