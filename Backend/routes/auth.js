const express = require('express');
const router = express.Router();
const {userRegister,userLogin, userLogout} = require("../controller/Auth");

// REGISTER
router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/logout",userLogout);



module.exports = router;