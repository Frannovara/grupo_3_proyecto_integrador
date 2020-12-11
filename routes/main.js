const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController')

router.get('/', mainController.home)
router.get('/productDetail', mainController.productDetail)
router.get('/login', mainController.login)
router.get('/productoCart', mainController.productCart)
router.get('/ayuda', mainController.help)
router.get('/register', mainController.register)
router.get('/contacto', mainController.contact)
router.get('/nosotros', mainController.nosotros)



module.exports = router