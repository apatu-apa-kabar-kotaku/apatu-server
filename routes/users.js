const express        = require('express');
const router         = express.Router();
const UserController = require('../controllers/UserController');
const auth           = require('../middleware/auth')

router.get('/', (req,res) => {
  res.send('users served')
})

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/signinfb', UserController.signInFb)
router.get('/testjwt', auth.check, UserController.testJwt)

module.exports = router;