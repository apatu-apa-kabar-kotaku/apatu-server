const Post = require('../models/Post');


module.exports = {
    uploadFile: (req, res) => {
        Post
            .create({
                title: req.body.title,
                image: req.file.cloudStoragePublicUrl,
                user_id: req.body.user_id,
                upvote: req.body.userupvote_id,
                downvote: req.body.userdownvote_id,
                category: req.body.category
            }, (err, newpost) => {
                if (err) {
                    return res.status(400).json({
                        message: `create post erorr ${err}`,
                        data: {}
                    })
                } else {
                    res.status(200).json({
                        message: `post success`,
                        data: newpost
                    })
                }
            })
    },

    readFile: (req, res) => {
        Post
            .find()
            .populate('user_id')
            .populate('upvote')
            .populate('downvote')
            .exec()
            .then(allpost => {
                returnData = []
                for (let i = 0; i < allpost.length; i++) {
                    returnData.push({
                        _id: allpost[i].id,
                        user_id: allpost[i].user_id,
                        image: allpost[i].image,
                        title: allpost[i].title,
                        totalUpvote: allpost[i].upvote.length,
                        totalDownvote: allpost[i].downvote.length,
                        upvote: allpost[i].upvote,
                        downvote: allpost[i].downvote
                    })
                }
                res.status(200).json({
                    message: `success show allpost`,
                    data: returnData,
                })
            }).catch(err => {
                res.status(400).json({
                    message: `cannot find post ${err}`
                })
            })
    },

    findByIdUserPost: (req, res) => {
        let userid = req.params.user_id
        Post
            .find({ user_id: userid })
            .then(post => {
                res.status(200).json({
                    message: `success show post`,
                    data: post
                })
            }).catch(err => {
                res.status(400).json({
                    message: `error find post`
                })
            })
    },

    deletePost: (req, res) => {
        let post = req.params.id_post
        Post
        .findByIdAndRemove(post, (err, post) => {
            if (err) {
                res.status(400).json({
                    message: `cant find post`
                })
            }else{
                res.status(200).json({
                    message : `delete post success`,
                    data : post
                })
            }
        })
    },

    findByCategories: (req, res) => {
        let cari = req.params.category
        Post
            .find({ category: { $regex: `.*${cari}.*`, $options: `i` } })
            .then(post => {
                res.status(200).json({
                    message: ` success find categories`,
                    data: post
                })
            }).catch(err => {
                res.status(400).json({
                    message: `error find post categories`
                })
            })
    },

    upvote: (req, res) => {
        let userId = req.body.userId
        let postId = req.body.postId

        Post.findById(postId, function (err, post) {
            if (err) {
                res.status(400).json({
                    status: `failed ${err}`
                });
            } else {
                let check = true;

                post.upvote.forEach((postUpvote, index) => {
                    if (postUpvote == userId) {
                        console.log(`Samaa ! di index ${index}, ${userId} , ${postUpvote}`)
                        check = false
                        var indexId = index
                        post.upvote.splice(indexId, 1)
                        post.save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    status: 'failed'
                                });
                            } else {
                                res.status(200).json({
                                    message: 'You cancel Upvoting this post !',
                                    status: 0
                                });
                            }
                        });
                    }
                })

                if (check) {
                    post.downvote.forEach((postDownvote, index) => {
                        if (postDownvote == userId) {
                            console.log(`Samaa ! di index ${index}, ${userId} , ${postDownvote}`)
                            var indexId = index
                            post.downvote.splice(indexId, 1)
                        }
                    })

                    post.upvote.push(userId)
                    post.save(function (err) {
                        if (err) {
                            res.status(400).json({
                                status: 'failed'
                            });
                        } else {
                            res.status(200).json({
                                message: 'You Upvote this post !',
                                status: 1
                            });
                        }
                    });
                }
            }
        })
    },

    downvote: (req, res) => {
        let userId = req.body.userId
        let postId = req.body.postId

        Post.findById(postId, function (err, post) {
            if (err) {
                res.status(400).json({
                    status: `failed ${err}`
                });
            } else {
                let check = true;

                post.downvote.forEach((postDownvote, index) => {
                    if (postDownvote == userId) {
                        console.log(`Samaa ! di index ${index}, ${userId} , ${postDownvote}`)
                        check = false
                        var indexId = index
                        post.downvote.splice(indexId, 1)
                        post.save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    status: 'failed'
                                });
                            } else {
                                res.status(200).json({
                                    message: 'You cancel Downvoting this post !',
                                    status: 0
                                });
                            }
                        });
                    }
                })

                if (check) {
                    post.upvote.forEach((postUpvote, index) => {
                        if (postUpvote == userId) {
                            console.log(`Samaa ! di index ${index}, ${userId} , ${postUpvote}`)
                            var indexId = index
                            post.upvote.splice(indexId, 1)
                        }
                    })
                    post.downvote.push(userId)
                    post.save(function (err) {
                        if (err) {
                            res.status(400).json({
                                status: 'failed'
                            });
                        } else {
                            res.status(200).json({
                                message: 'You Downvote this post !',
                                status: 1
                            });
                        }
                    });
                }
            }
        })
    },
    searchTitle: (req, res) => {
        let search = req.body.keyword
        Post
            .find({ title: { $regex: `.*${search}.*`, $options: `i` } })
            .then(post => {
                res.status(200).json({
                    message: `success search post with title ${search}`,
                    data: post
                })
            }).catch(err => {
                message: `error search post `
            })
    }
}