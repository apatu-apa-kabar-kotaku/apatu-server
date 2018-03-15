const Post = require('../models/Post');


module.exports = {
    uploadFile:(req,res)=>{
        Post
        .create({
            title   : req.body.title,
            image   : req.file.cloudStoragePublicUrl,
            user_id : req.body.user_id,
            upvote  : req.body.userupvote_id,
            downvote: req.body.userdownvote_id
        },(err,newpost)=>{
            if(err){
                return res.status(400).json({
                    message : `create post erorr ${err}`,
                    data : {}
                })
            }else{
                res.status(200).json({
                    message : `post success`,
                    data : newpost 
                })
            }
        })
    },
    readFile:(req,res)=>{
        
    }
}
 


