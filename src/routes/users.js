const express = require ('express');
const router = express.Router();
const usersController = require ('../controllers/usersController');
const multer = require ('multer')
const path = require('path');
const logInValidator = require('../middlewares/logInValidator');
const userMiddleware = require('../middlewares/userMiddleware');
const registerValidator = require('../middlewares/registerValidator');
var {check} = require ('express-validator')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })
  
router.get('/login', userMiddleware.userLogged, usersController.login)
router.post('/login', logInValidator , usersController.loginProcess)
router.post('/login/newPass', usersController.newPassword)

router.get('/register', userMiddleware.userLogged, usersController.register)
router.post('/register', registerValidator.register ,usersController.saveUser)

router.get('/profile', userMiddleware.userToLogin, usersController.profile)
router.put('/profile/:id',  registerValidator.edit , usersController.editUser)
router.put('/profileimage', upload.any(), usersController.profileImage)
router.put('/changepassword', registerValidator.changePassword , usersController.changePassword)

router.delete('/delete/:id', usersController.deleteUser)
router.get('/logout', usersController.logout)

module.exports = router