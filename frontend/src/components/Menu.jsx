import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Menu() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/login");
      setUser(null);
    } catch (err) {
      console.log("UI Design Logout Problem", err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 w-[151px] z-10 flex flex-col items-start absolute top-7 right-2 md:right-0 h-40 rounded-md p-6 space-y-4 shadow-lg transition-all duration-300 ease-in-out transform">
      {/* Login and Register Links */}
      {!user && (
        <>
          <h3 className="text-white text-sm hover:text-yellow-300 transition duration-200 cursor-pointer">
            <Link to="/login">Login</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-yellow-300 transition duration-200 cursor-pointer">
            <Link to="/register">Register</Link>
          </h3>
        </>
      )}

      {/* Authenticated User Links */}
      {user && (
        <>
          <h3 className="text-white text-sm hover:text-yellow-300 transition duration-200 cursor-pointer">
            <Link to={`/profile/${user?._id}`}>Profile</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-yellow-300 transition duration-200 cursor-pointer">
            <Link to="/createBlog">Create Blog</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-yellow-300 transition duration-200 cursor-pointer">
            <Link to={`/myblogs/${user._id}`}>My Blogs</Link>
          </h3>
          <h3
            onClick={handleLogout}
            className="text-white text-sm hover:text-yellow-300 transition duration-200 cursor-pointer"
          >
            Logout
          </h3>
        </>
      )}
    </div>
  );
}

export default Menu;
