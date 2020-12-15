const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');


router.get('/', mainController.home)
router.get('/contacto', mainController.contact)
router.get('/nosotros', mainController.nosotros)
router.get('/ayuda', mainController.help)
router.post( '/' , mainController.form)




module.exports = router