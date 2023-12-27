const express = require('express')
const router = express.Router();
const {updateUser,deleteUser,fetchUser} = require('../controller/User');


router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
router.get("/:id",fetchUser)


 
module.exports=router;