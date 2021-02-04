const express = require ('express');
const router = express.Router();
const usersController = require ('../controllers/usersController');
const multer = require ('multer')
const path = require('path');
const logInValidator = require('../middlewares/logInValidator');
const userMiddleware = require('../middlewares/userMiddleware');
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
router.post('/register', [
  check('first_name').isLength({min:1}).withMessage('Este campo es obligatorio'),
  check('last_name').isLength({min:1}).withMessage('Este campo es obligatorio'),
  check('email').isLength({min:1}).withMessage('Este campo es obligatorio').isEmail().withMessage('No es un email válido'),
  check('password').isLength({min:1}).withMessage('Este campo es obligatorio').isLength( {
      min:8
  }).withMessage('La contraseña debe tener 8 caracteres como mínimo y al menos una minúscula, una mayúscula y un número')
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('La contraseña debe tener 8 caracteres como mínimo y al menos una minúscula, una mayúscula y un número'),
  check('re_password').isLength({min:1}).withMessage('Este campo es obligatorio')
  .custom((value,{req, loc, path}) => {
      if (value !== req.body.password) {
          // trow error if passwords do not match
          throw new Error("Las contraseñas deben coincidir");
      } else {
          return value;
      }
  })
] ,usersController.saveUser)

router.get('/profile', userMiddleware.userToLogin, usersController.profile)
router.put('/profile/:id', usersController.editUser)
router.put('/profileimage', upload.any(), usersController.profileImage)

router.delete('/delete/:id', usersController.deleteUser)
router.get('/logout', usersController.logout)

module.exports = router