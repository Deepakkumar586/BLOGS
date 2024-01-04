import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaBarsProgress, FaSketch } from "react-icons/fa6";
import Menu from "./Menu";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const [prompt,setPrompt] = useState("")
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  // console.log("Navbar",prompt)
  const path = useLocation().pathname;
  const showMenu = () => {
    setMenu(!menu);
  };

  const {user} = useContext(UserContext)

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Blogs</Link>
      </h1>
     {
      path==="/" &&  <div className="flex justify-center items-center space-x-0">
        <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer">
          <IoSearchCircleSharp />
        </p>
        <input
          className="outline-none px-3"
          placeholder="Seach Blogs"
          type="text"
          onChange={(e)=>setPrompt(e.target.value)}
        />
      </div>
     }

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/createBlog">Create Blog</Link>{" "}
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}

        {user ? (
          <div onClick={showMenu}>
            {" "}
            {menu && <Menu />}{" "}
            <p className="cursor-pointer relative">
              <FaBarsProgress />
            </p>{" "}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBarsProgress />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
