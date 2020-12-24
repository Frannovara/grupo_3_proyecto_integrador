const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/:id', productController.productDetail)
router.get('/productoCart', productController.productCart)
router.get('/productEdit', productController.productEdit)
router.get('/productCreate', productController.productCreate)
router.post('/products/ProductDetail',)
router.put('/products/ProductDetail')

module.exports = router;