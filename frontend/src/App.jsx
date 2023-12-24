import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'

const App = () => {
  return (
    <div>
      
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/post/post:id" element={<PostDetails/>}/>
          <Route exact path="/createBlog" element={<CreatePost/>}/>
      </Routes>
     
    </div>
  )
}

export default App
