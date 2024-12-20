import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBarsProgress } from "react-icons/fa6";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="sticky top-0 z-50 bg-blue-800 text-white shadow-md">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <h1 className="text-lg md:text-xl font-extrabold text-gray-100 transition-colors duration-300 hover:text-yellow-400">
          <Link to="/">Blogs</Link>
        </h1>

        {/* {path === "/" && (
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative flex items-center">
              <IoSearchCircleSharp className="cursor-pointer text-xl text-gray-100 transition-transform transform hover:scale-110" />
              <input
                className="outline-none px-4 py-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                placeholder="Search Blogs"
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <button
              onClick={() => navigate(prompt ? `?search=${prompt}` : "/")}
              className="md:hidden bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-400 transition duration-200"
            >
              Search
            </button>
          </div>
        )} */}

        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <h3 className="transition-all duration-300 hover:text-yellow-300">
              <Link to="/createBlog">Create Blog</Link>
            </h3>
          ) : (
            <h3 className="transition-all duration-300 hover:text-yellow-300">
              <Link to="/login">Login</Link>
            </h3>
          )}

          {user ? (
            <div onClick={showMenu} className="relative cursor-pointer">
              <FaBarsProgress className="text-2xl" />
              {menu && <Menu />}
            </div>
          ) : (
            <h3 className="transition-all duration-300 hover:text-yellow-300">
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>

        <div
          className="md:hidden text-xl cursor-pointer"
          onClick={showMenu}
        >
          <FaBarsProgress />
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
