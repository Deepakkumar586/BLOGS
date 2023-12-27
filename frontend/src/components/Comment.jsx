import React from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

const Comment = () => {
  return (
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
            <AiTwotoneEdit/>
          </p>
          <p>
            <TiDelete/>
          </p>
        </div>
      </div>
    </div>
    <p className="px-4 mt-2 ">Nice Information</p>
  </div>
  )
}

export default Comment
