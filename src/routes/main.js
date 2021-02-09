const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');


router.get('/', mainController.home)
router.get('/contact', mainController.contact)
router.get('/nosotros', mainController.nosotros)
router.get('/ayuda', mainController.help)
router.post( '/' , mainController.form)
router.post('/contact/send', mainController.contactSend)




module.exports = router