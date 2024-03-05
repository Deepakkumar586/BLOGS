const express = require("express");
const router = express.Router();
const { updateUser, deleteUser, fetchUser } = require("../controller/User");
const verifyToken = require("../verifyToken");

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", fetchUser);



router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });

module.exports = router;
