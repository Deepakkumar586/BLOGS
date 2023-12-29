const express = require("express");
const router = express.Router();

const {createComment,updateComment,deleteComment,getBlogComment}=require('../controller/Comment')

router.post("/create", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/post/postId:", getBlogComment);

module.exports = router;
