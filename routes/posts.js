const express           = require('express');
const router            = express.Router();
const {uploadFile,readFile,findByIdUserPost,deletePost,findByCategories}     = require('../controllers/PostController');
const {sendUploadToGCS} = require('../middleware/uploadGCS') 
const multer = require('multer')

const upload = multer({
   storage  : multer.memoryStorage(),
   limits   : {
     fileSize: 10*1024*1024
  } 
 })

router.get('/',readFile)
router.get('/:user_id',findByIdUserPost)
router.get('/:categories',findByCategories)
router.post('/upload',upload.single('post'),sendUploadToGCS,uploadFile)
router.delete('/:user_id/:id',deletePost) 





module.exports = router;
