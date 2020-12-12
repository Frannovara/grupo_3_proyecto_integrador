const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/productDetail', productController.productDetail)
router.get('/productoCart', productController.productCart)

module.exports = router;