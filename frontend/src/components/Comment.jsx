import React, { useContext } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const Comment = ({c}) => {
  const {user} = useContext(UserContext);
 
  const deleteComment = async(id)=>{
    try{
      const res = await  axios.delete("http://localhost:8000/api/comment/"+id,{withCredentials:true})
    }
    catch(err){
      console.log("Delete Comment Problem On UI",err);
    }
  }
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-gray-600">@{c.author}</h3>
      {/* dates and time */}
      <div className="flex justify-center items-center space-x-4">
      <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>

        {/* for comment Edit and Delete */}
        {user?._id===c?.userId ?
              <div className="flex items-center justify-center space-x-2">
                    <p className="cursor-pointer" onClick={()=>deleteComment(c._id)}><TiDelete/></p>
                </div>:""}
      </div>
    </div>
    <p className="px-4 mt-2 ">{c.comment}</p>
  </div>
  )
}

export default Comment
