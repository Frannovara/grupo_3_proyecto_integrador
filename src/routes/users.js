const express = require ('express');
const router = express.Router();
const usersController = require ('../controllers/usersController');
const multer = require ('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

router.get('/login', usersController.login)
router.post('/login', usersController.newPassword)
router.get('/register', usersController.register)
router.post('/register', usersController.saveUser)
router.get('/profile/:id', usersController.profile)
router.put('/profile/:id', usersController.editUser)
router.post('/profileimage', upload.any(), usersController.profileImage)
router.delete('/delete', usersController.deleteUser)

module.exports = router
