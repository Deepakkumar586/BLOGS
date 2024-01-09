const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const saveBlog = await newBlog.save();
    console.log("NEW BLOG CREATED", saveBlog);
    res.status(200).json({
      success: true,
      saveBlog,
      message: "New Blog Save in DB",
    });
  } catch (err) {
    console.log("Blog Creation Find Error", err);
    res.status(500).json({
      success: false,
      message: "Blog Creation Problem",
    });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    console.log("UPDATED Blog", updatedBlog);

    res.status(200).json({
      success: true,
      updatedBlog,
      message: "Blog Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Update Blog Failure Please Try Again`,
    });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    console.log("BLOG DELETE", deleteBlog);

    const commentDelete = await Comment.deleteMany({ postId: req.params.id });
    console.log("DELETE THE ALL COMMENT OF THIS ID", commentDelete);

    res.status(200).json({
      success: true,
      message: "Blog has been DELETED",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Delete Blog Problemm",
    });
  }
};
// GET All BLOG
exports.getAllBlogs = async (req, res) => {
  try {
    const query = req.query;
    console.log("SEARCH QUERY...", query);

    const searchBlogs = { title: { $regex: query.search, $options: "i" } };
    const findBlog = await Blog.find(query.search ? searchBlogs : null);

    if (!findBlog) {
      res.status(401).json({
        success: false,
        message: "This  Blog is not exist in DB and user",
      });
    }
    res.status(200).json({
      success: true,
      findBlog,
      message: "Blog Fetch Successfully..",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Blog Fetch Problem ....",
    });
  }
};
// GET Single BLOG
exports.getSingleBlog = async (req, res) => {
  try {
    const findSingleBlog = await Blog.findById(req.params.id);

    if (!findSingleBlog) {
      res.status(401).json({
        success: false,
        message: "This  ID of Blog is not exist in DB and user",
      });
    }
    res.status(200).json({
      success: true,
      findSingleBlog,
      message: "Single id Blog  Fetch Successfully..",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: " Single Blog  Fetch Problem ....",
    });
  }
};

// GET PARTICULAR USER BLOG
exports.getUserBlogs = async (req, res) => {
  try {
    const findBlogUser = await Blog.find({ userId: req.params.id });
    console.log(req.params.id);
    console.log(findBlogUser[0]?.title);

    if (!findBlogUser) {
      res.status(401).json({
        success: false,
        message: "This  User Id  is not exist in DB",
      });
    }
    res.status(200).json({
      success: true,
      findBlogUser,
      message: "Blog Fetch Successfully..",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Blog Fetch Problem ....",
    });
  }
};

// // SEARCH BLOGS
// exports.searchBlogs = async(req,res)=>{
//     try{

//     }
//     catch(err){
//         console.log("SEARCH BLOG FAILURE",err);
//         res.status(500).json({
//             success:false,
//             messgae:"SEARCH BLOG ISSUE...."
//         })
//     }
// }
