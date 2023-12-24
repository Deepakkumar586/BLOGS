import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AiTwotoneEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const PostDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            10 Uses of Artificial Intelligence in Day to Day Life
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p>
              <AiTwotoneEdit />
            </p>
            <p>
              <TiDelete />
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@DeepakDev</p>
          <div className="flex space-x-2">
            <p>23/12/23</p>
            <p>12:24</p>
          </div>
        </div>

        <img
          src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          className="w-full mx-auto mt-8"
          alt=""
        />
        <p className="mx-auto mt-8 ">
          Try the AI text generator, a tool for content creation. It leverages a
          transformer-based Large Language Model (LLM) to produce text that
          follows the users instructions. As an AI generator, it offers a range
          of functions, from text generation, to completing sentences, and
          predicting contextually relevant content. It can serve as a sentence
          generator, word generator, and message generator, transforming input
          into coherent text.
        </p>
        {/* for category  part start*/}
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>categories:</p>
          {/* actual category */}
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">Ai</div>
          </div>
        </div>
        {/* for comment section */}
        <div className=" flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {/* actual comment */}
          <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@deep</h3>
              {/* dates and time */}
              <div className="flex justify-center items-center space-x-4">
                <p className="text-gray-500 text-sm">12/3/2022</p>
                <p className="text-gray-500 text-sm">12:24</p>

                {/* for comment Edit and Delete */}
                <div className="flex items-center justify-center space-x-2">
                  <p>
                    <AiTwotoneEdit />
                  </p>
                  <p>
                    <TiDelete />
                  </p>
                </div>
              </div>
            </div>
            <p className="px-4 mt-2 ">Nice Information</p>
          </div>

          <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@deep</h3>
              {/* dates and time */}
              <div className="flex justify-center items-center space-x-4">
                <p className="text-gray-500 text-sm">12/3/2022</p>
                <p className="text-gray-500 text-sm">12:24</p>

                {/* for comment Edit and Delete */}
                <div className="flex items-center justify-center space-x-2">
                  <p>
                    <AiTwotoneEdit />
                  </p>
                  <p>
                    <TiDelete />
                  </p>
                </div>
              </div>
            </div>
            <p className="px-4 mt-2 ">Nice Information</p>
          </div>
        </div>

        {/* Write a comment */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
            <input className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0" type="text" placeholder="Write a own words"/>
            <button className="bg-black text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
