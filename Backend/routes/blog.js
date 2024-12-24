const express = require("express");
const router = express.Router();

const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getUserBlogs,
  getSingleBlog,
  searchBlogs,
} = require("../controller/Blog");
const verifyToken = require("../verifyToken");

router.post("/create", verifyToken, createBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.get("/user/:id", getUserBlogs);
// router.get("/search/:prompt", searchBlogs);

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

module.exports = router;
