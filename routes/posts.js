const express        = require('express');
const router         = express.Router();
const PostController = require('../controllers/PostController');

router.get('/', function(req, res, next) {
  res.send('This is post resource');
});

module.exports = router;
