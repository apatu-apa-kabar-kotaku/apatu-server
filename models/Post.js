const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const postSchema = new Schema({

})

let Post         = mongoose.model('Post', postSchema)

module.exports   = Post;