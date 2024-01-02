const express = require('express');
const router = express.Router();
const {userRegister,userLogin, userLogout,refreshWeb} = require("../controller/Auth");

// REGISTER
router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/logout",userLogout);


// Refresh user
router.get("/refresh",refreshWeb)



module.exports = router;