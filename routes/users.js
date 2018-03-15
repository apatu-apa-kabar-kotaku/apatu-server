const express        = require('express');
const router         = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', function(req, res, next) {
  res.send('This is users resource');
});

module.exports = router;
