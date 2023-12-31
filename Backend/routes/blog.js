const express = require("express");
const router = express.Router();

const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getUserBlogs,
  getSingleBlog,
  searchBlogs
} = require("../controller/Blog");
const verifyToken = require("../verifyToken");

router.post("/create", verifyToken,createBlog);
router.put("/:id",verifyToken, updateBlog);
router.delete("/:id",verifyToken, deleteBlog);
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.get("/user/:userid", getUserBlogs);
// router.get("/search/:prompt", searchBlogs);

module.exports = router;
