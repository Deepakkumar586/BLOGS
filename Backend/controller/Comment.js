const Blog = require('../models/Blog');
const Comment = require('../models/Comment');




// CREATE COMMENT
exports.createComment= async(req,res)=>{
        try{
            const newComment = new Comment(req.body);
            const saveComment  = await newComment.save();

            console.log("NEW COMMENT CREATED",saveComment);

            res.status(200).json({
                success:true,
                saveComment,
                message:"New Comment Save in "
            })

        }
        catch(err){
            console.log("COMMENT Creation Find Error",err);
            res.status(500).json({
                success:false,
                message:"Comment Creation Problem"
            })
        }
}

// UPDATE COMMENT
exports.updateComment= async(req,res)=>{
    try{
       
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

        console.log("UPDATED Blog",updatedComment);

        res.status(200).json({
            success:true,
            updatedComment,
            message:"Comment Updated Successfully"
        })

    }
    catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Update Comment Failure Please Try Again`,
		});
	}
}


// DELETE COMMENT
exports.deleteComment= async(req,res)=>{
    try{
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
       console.log("BLOG DELETE",deletedComment);

       res.status(200).json({
        success:true,
        message:"Comment has been DELETED"
       })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Delete Comment Problemm"
        })
    }
}

// GET PARTICULAR  BLOG COMMENT
exports.getBlogComment= async(req,res)=>{
    try{
        
        const findBlogComment = await Comment.find({postId:req.params.postId});

        if(!findBlogComment){
            res.status(401).json({
                success:false,
                message:"This  PostId  is not exist in DB"
            })
        }
            res.status(200).json({
            success:true,
            findBlogComment,
            message:"All Comment Fetch  this Blog Successfully.."
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"All Comment This Post Fetch Problem ...."
        })
    }
}