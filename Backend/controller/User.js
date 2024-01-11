const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    console.log("UPDATED USER", updateUser);

    res.status(200).json({
      success: true,
      updateUser,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Update User Failure Please Try Again`,
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    console.log("USER DELETE", deleteUser);

    const deletePost = await Blog.deleteMany({ userId: req.params.id });
    console.log("USER ALL POST DELETE", deletePost);

    const deleteComment = await Comment.deleteMany({ userId: req.params.id });
    console.log("USER ALL COMMENT DELETE", deleteComment);

    res.status(200).json({
      success: true,
      message: "User has been DELETED WITH ALL POST AND ALL COMMENT",
    });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `User Deleet Failure Please Try Again`,
    });
  }
};

// GET USERS
// Example of a function that might cause the error
exports.fetchUser = async (req,res) => {
  // Check if userId is defined before querying the database

  try {
    const userId = req.params.id
    // Use Mongoose to query the database
    const findUser = await User.findById(userId);
    res.status(200).json({
      success:true,
      findUser,
      message:"Get Successfully User"
    })
  } 
  catch (error) {
    // Handle any other errors that might occur during the query
    return { error: "Error fetching user" };
  }
};

// Example of calling the function with an undefined userId
// const result = fetchUser(undefined);
// console.log(result); // { error: 'User ID is undefined' }
