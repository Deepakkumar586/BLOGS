const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

exports.createBlog = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    // console.log("Request User ID:", req.userId); // From verifyToken middleware
    // console.log("Request Username:", req.username); // From verifyToken middleware

    // Extract userId and username from the request
    const userId = req.userId;
    const username = req.username;

    const { title, description, categories } = req.body;

    // Validation
    if (!username || !userId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Username, UserId, Title, and Description are required.",
      });
    }

    // If categories is passed as an array, no need to parse it
    // If categories is not an array, default to an empty array
    const parsedCategories = Array.isArray(categories) ? categories : [];

    // Create the new blog
    const newBlog = new Blog({
      username,
      userId,
      title,
      description,
      categories: parsedCategories,
    });

    // Save the blog to the database
    const savedBlog = await newBlog.save();
    res.status(200).json({
      success: true,
      savedBlog,
      message: "New Blog Saved in DB",
    });
  } catch (err) {
    console.error("Blog Creation Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Blog Creation Problem",
    });
  }
};


// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, categories } = req.body;

    // Check if the required fields are provided
    if (!title || !description || !categories) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: title, description, and categories.",
      });
    }

    // Attempt to find and update the blog post by its ID
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } // Ensures that the updated blog is returned and runs validation checks
    );

    // Check if the blog post exists
    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Send success response with the updated blog data
    res.status(200).json({
      success: true,
      updatedBlog,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating blog:", error);

    // Return 500 Internal Server Error status code with a more descriptive error message
    return res.status(500).json({
      success: false,
      message: `Failed to update the blog. Please try again later.`,
      error: error.message, // Optionally include error message for debugging purposes
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    // Find and delete the blog by its ID
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    // Check if the blog exists before trying to delete comments
    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Delete all comments related to the deleted blog post
    const deletedComments = await Comment.deleteMany({ postId: req.params.id });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Blog and associated comments have been deleted.",
      deletedBlog,
      deletedCommentsCount: deletedComments.deletedCount, // Optional: Include how many comments were deleted
    });
  } catch (err) {
    // Log the error for debugging
    console.error("Error deleting blog:", err);

    // Return 500 Internal Server Error status code with a more descriptive message
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the blog. Please try again.",
      error: err.message, // Optionally include error message for debugging purposes
    });
  }
};

// GET All BLOG
exports.getAllBlogs = async (req, res) => {
  try {
    const query = req.query;

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
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Blog Fetch Problem ....",
    });
  }
};
