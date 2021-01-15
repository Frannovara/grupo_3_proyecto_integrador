const express = require ('express');
const router = express.Router();
const usersController = require ('../controllers/usersController');
const multer = require ('multer')
const path = require('path');
const {  validationResult , body } = require('express-validator');
const logInValidator = require('../middlewares/logInValidator');
const userMiddleware = require('../middlewares/userMiddleware')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })
  

router.get('/login', usersController.login)
router.post('/login',logInValidator,usersController.loginProcess)

router.post('/login/newPass', usersController.newPassword)
router.get('/register', usersController.register)
router.post('/register', usersController.saveUser)
router.get('/profile', userMiddleware, usersController.profile)
router.put('/profile/:id', usersController.editUser)
router.put('/profileimage/:id', upload.any(), usersController.profileImage)
router.delete('/delete/:id', usersController.deleteUser)
router.get('/logout', usersController.logout)

module.exports = router
