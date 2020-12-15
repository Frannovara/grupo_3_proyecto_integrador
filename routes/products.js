const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/productDetail', productController.productDetail)
router.get('/productoCart', productController.productCart)
router.get('/productEdit', productController.productEdit)
router.get('/productCreate', productController.productCreate)

module.exports = router;