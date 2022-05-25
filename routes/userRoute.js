const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/signup', userController.signUpPost);
router.delete('/delete', userController._delete);
router.get('', userController.get);
router.get('/verify', userController.verify)
router.post('/login', userController.login)
router.get('/logout', userController.logout)


module.exports = router;