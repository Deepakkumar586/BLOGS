import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePost from "../components/ProfilePost";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Profile = () => {
  const { search } = useLocation();
  const param = useParams()._id;
  const { user, setUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [searchNoResult, setSearchNoresult] = useState(false);
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const [userblog, setUserblog] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchProfileUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/users/" + user?._id
      );
      console.log("PROFILE DATA USER FETCH", res.data);
      console.log("hii")
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

  useEffect(() => {
    fetchProfileUser();
  }, [user?._id]);

  const fetchUserPosts = async () => {
    setLoader(true);
    try {
      if (!dataFetched) {
        const response = await axios.get(`http://localhost:8000/api/blogs/user/${user?._id}`);
        const { success, findBlogUser } = response.data;

        if (success) {
          setUserblog(findBlogUser);
          setDataFetched(true);

          // Store the fetched data in localStorage
          localStorage.setItem(`userBlogs_${user?._id}`, JSON.stringify(findBlogUser));
        } else {
          console.log("Blog fetch failed:", response.data.message);
        }
      }
      setLoader(false);
    } catch (err) {
      console.log("Post Fetch Error", err);
      setLoader(false); // Set loader to false in case of an error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is available in localStorage
        const storedBlogData = localStorage.getItem(`userBlogs_${user?._id}`);

        if (storedBlogData) {
          setUserblog(JSON.parse(storedBlogData));
        } else {
          // Fetch data from the backend if not found in localStorage
          await fetchUserPosts();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    fetchUserPosts();

  }, [user?._id]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        {/* Left Part */}
        <div className="flex flex-col  md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your Blogs :</h1>
          <div className="px-8 md:px-[200px] min-h-[80vh]">
            {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !searchNoResult ?
              userblog.map((p) => (
                <>

                  <ProfilePost key={p._id} p={p} />

                </>

              )) : <h3 className="text-center font-bold mt-16">No posts available</h3>}
          </div>


        </div>

        {/* Right part */}
        <div className="md:sticky  md:top-12 flex justify-start md:justify-end items-start space-y-4 md:w-[30%] w-full md:items-end">
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
