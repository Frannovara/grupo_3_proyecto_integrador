const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/:id', productController.productDetail)
router.get('/cart', productController.productCart)
router.get('/edit', productController.productEdit)
router.get('/create', productController.productCreate)

module.exports = router;