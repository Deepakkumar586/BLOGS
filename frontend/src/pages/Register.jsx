import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import { URL } from '../url';
import { motion } from 'framer-motion'; // Import framer-motion

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChangeRegisterData = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', registerData);
      setError(false);
      navigate('/login');
      console.log(res);
    } catch (err) {
      setError(true);
      console.log('Form Submission failure', err);
    }
    setRegisterData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blogs</Link>
        </h1>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </div>
      
      <motion.div
        className="w-full flex justify-center items-center h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <motion.h1
            className="text-xl font-bold text-left"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Register Here
          </motion.h1>
          
          <motion.form
            onSubmit={handleRegistrationSubmit}
            className="flex flex-col space-y-4"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.input
              type="text"
              name="username"
              placeholder="Enter your Name"
              value={registerData.username}
              onChange={handleChangeRegisterData}
              className="w-full px-4 py-2 border-black border-2 outline-0"
              required
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.input
              type="text"
              name="email"
              value={registerData.email}
              onChange={handleChangeRegisterData}
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border-black border-2 outline-0"
              required
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChangeRegisterData}
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border-black border-2 outline-0"
              required
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.button
              type="submit"
              className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Register
            </motion.button>

            {error && (
              <motion.h3
                className="text-red-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Something Went Wrong
              </motion.h3>
            )}
            
            <div className="flex justify-center items-center space-x-1">
              <p>Already have an account?</p>
              <p className="text-gray-500 hover:text-black hover:font-semibold">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default Register;
