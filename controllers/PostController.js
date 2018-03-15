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
        Post
        .find()
        // .populate('user_id')
        .exec()
        .then(allpost=>{
            res.status(200).json({
                message : `success show allpost`,
                data : allpost
            })
        }).catch(err=>{
            res.status(400).json({
                message : `cannot find post ${err}`
            })
        })
    },
    findByIdUserPost:(req,res)=>{
        let userid = req.params.user_id
        Post
        .findById({user_id:userid})
        .then(post=>{
            res.status(200).json({
                message : `success show post`,
                data:post
            })
        }).catch(err=>{
            res.status(400).json({
                message : `error find post`
            })
        })
    },
    deletePost:(req,res)=>{
        let userid = req.params.user_id
        Post
        .findById({user_id:userid})
        .then(postUser=>{
            let id = req.params.id
            postUser
            .deleteOne({_id:id})
            .then(postdelete=>{
                res.status(200).json({
                    message : `delete post success`
                })
            }).catch(err=>{
                message : `failed delete post `
            })
        }).catch(err=>{
            res.status(400).json({
                message : `cant find post`
            })
        })
    },
    findByCategories:(req,res)=>{
        let categories = req.query.caption
        Post
        .find({
                caption:categories
            })
        .then(post=>{
            res.status(200).json({
                message: ` success find categories`,
                data:post
            })
        }).catch(err=>{
            res.status(400).json({
                message : `error find post categories`
            })
        })
    }
}
 


