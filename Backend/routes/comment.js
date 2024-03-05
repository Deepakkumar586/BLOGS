const express = require("express");
const router = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
  getBlogComment,
} = require("../controller/Comment");
const verifyToken = require("../verifyToken");

router.post("/create", verifyToken, createComment);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/post/:postId", getBlogComment);


router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   });

module.exports = router;
