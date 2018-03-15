const express = require('express');
const router  = express.Router();
const users   = require('./users');
const posts   = require('./posts');

router.get('/', function(req, res, next) {
  res.send('Api Work');
});

router.use('/api/users', users);
router.use('/api/posts', posts);

module.exports = router;