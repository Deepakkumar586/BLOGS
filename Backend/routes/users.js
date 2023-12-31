const express = require('express')
const router = express.Router();
const {updateUser,deleteUser,fetchUser} = require('../controller/User');
const verifyToken = require('../verifyToken');


router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyToken,deleteUser)
router.get("/:id",fetchUser)


 
module.exports=router;