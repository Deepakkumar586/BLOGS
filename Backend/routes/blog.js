const express = require("express");
const router = express.Router();

const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getUserBlogs,
  getSingleBlog,
} = require("../controller/Blog");

router.post("/create", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.get("/user/:userid", getUserBlogs);

module.exports = router;
