const express           = require('express');
const router            = express.Router();
const {uploadFile,readFile}     = require('../controllers/PostController');
const {sendUploadToGCS} = require('../middleware/uploadGCS') 
const multer = require('multer')

const upload = multer({
   storage  : multer.memoryStorage(),
   limits   : {
     fileSize: 10*1024*1024
  } 
 })

router.get('/')
router.post('/upload',upload.single('post'),sendUploadToGCS,uploadFile) 





module.exports = router;
