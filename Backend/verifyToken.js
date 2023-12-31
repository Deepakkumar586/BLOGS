const jwt = require('jsonwebtoken');
require("dotenv").config();


// FOR LOGIN LOGOUT VERIFY TOKEN MIDDLEWARE
const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        res.status(401).json({
            success:false,
            message:"Sorry,You Are not Authenticated.."
        })
    }

    // IF TOKEN IS EXIST THEN VERIFY
    jwt.verify(token,process.env.SECRET,async(err,data)=>{
        if(err){
            return res.status(401).json({
                success:false,
                message:"Token Is Not Valid."
            })
        }
        req.userId=data.id
        // console.log("Passed");
        next();
    })
}
module.exports=verifyToken