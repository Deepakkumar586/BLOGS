const express = require('express');
const router = express.Router();
const {userRegister,userLogin, userLogout,refreshWeb} = require("../controller/Auth");

// REGISTER
router.post("/register",userRegister);
router.post("/login",userLogin);
router.post("/logout",userLogout);


// Refresh user
router.get("/refetch",refreshWeb)


router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });



module.exports = router;