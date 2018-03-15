const express           = require('express');
const router            = express.Router();
const PostController    = require('../controllers/PostController');
const {sendUploadToGCS} = require('../middleware/uploadGCS') 

router.post('/upload', sendUploadToGCS ,function(req, res) {
  res.status(201).json({
    message : "upload success",
    data : req.file.cloudStoragePublicUrl
  })
});

module.exports = router;
