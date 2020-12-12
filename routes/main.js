const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const userController = require ('../controllers/userController');

router.get('/', mainController.home)
router.get('/contacto', mainController.contact)
router.get('/nosotros', mainController.nosotros)
router.get('/ayuda', mainController.help)





module.exports = router