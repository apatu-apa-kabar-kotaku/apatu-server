const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const userSchema = new Schema({

})

let User         = mongoose.model('User', UserSchema)

module.exports   = User;