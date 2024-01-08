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

module.exports = router;
