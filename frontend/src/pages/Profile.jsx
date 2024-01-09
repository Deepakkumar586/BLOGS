import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePost from "../components/ProfilePost";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import PostDetails from './PostDetails'

const Profile = () => {
  const param = useParams()._id;
  const { user, setUser } = useContext(UserContext);
  // console.log("PROFILE ME USER ID",user?._id)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [password,setPassword] = useState("");

  const fetchProfileUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/users/" + user?._id
      );
      // console.log("PROFILE DATA USER FETCH",res.data);
      setUsername(res.data.findUser.username);
      setEmail(res.data.findUser.email);
      // setPassword("")
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        "http://localhost:8000/api/users/" + user?._id,
        { username, email },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      setUpdated(false);
      console.log(err);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/api/users/" + user?._id,
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      // const res = await axios.get("http://localhost:8000/api/blogs/user/"+user?._id)
      const res = await axios.get(
        "http://localhost:8000/api/blogs/user/" + user?._id
      );

      console.log("USER DATA COME IN PROFILE", res.data);
      setPosts(res.data.findBlogUser);
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, [param]);
  useEffect(() => {
    fetchUserPosts();
  }, [param]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        {/* Left Part */}
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your Blogs :</h1>
          {posts?.map((p) => {
            <div className="w-[35%] h-[200px] flex justify-center items-center">
              <img
                src={IF + p.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>;
            {
              /* right */
            }
            <div className="flex flex-col w-[65%]">
              <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                {p.title}
              </h1>
              <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
                <p>@{p.username}</p>
                <div className="flex space-x-2">
                  <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
                  <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
                </div>
              </div>
              <p className="text-sm md:text-lg">
                {p.description.slice(0, 200) + " ...Read more"}
              </p>
            </div>;
          })}
        </div>

        {/* Right part */}
        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start space-y-4 md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              value={username}
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              value={email}
              type="email"
            />
            {/* <input onChange={(e)=>setPassword(e.target.value)} className='outline-none px-4 py-2 text-gray-500' placeholder='Your password' value={password} type='password'/> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete Account
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-em text-center mt-4">
                User Updated Successfully
              </h3>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
