const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");
const bcrypt = require('bcrypt');

// UPDATE USER
exports.updateUser = async(req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password,salt);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

        console.log("UPDATED USER",updateUser);

        res.status(200).json({
            success:true,
            updateUser,
            message:"User Updated Successfully"
        })

    }
    catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Update User Failure Please Try Again`,
		});
	}
}


// DELETE USER
exports.deleteUser = async(req,res)=>{
    try{
       const deleteUser = await User.findByIdAndDelete(req.params.id);
       console.log("USER DELETE",deleteUser)

       const deletePost = await Blog.deleteMany({userId:req.params.id});
       console.log("USER ALL POST DELETE",deletePost)

       const deleteComment = await Comment.deleteMany({userId:req.params.id});
       console.log("USER ALL COMMENT DELETE",deleteComment);

       res.status(200).json({
        success:true,
        message:"User has been DELETED WITH ALL POST AND ALL COMMENT"
       })


      

    }
    catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `User Deleet Failure Please Try Again`,
		});
	}
}


// GET USERS
exports.fetchUser = async(req,res)=>{
    try{
        const userfetchId = req.params.id;
        const findUser = await User.findById(userfetchId);

        if(!findUser){
            res.status(401).json({
                success:false,
                message:"This ID is not exist in DB"
            })
        }
        findUser.password = undefined;
        

        res.status(200).json({
            success:true,
            findUser,
            message:"User Fetch Successfully.."
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"User Fetch Problem ...."
        })
    }
}


