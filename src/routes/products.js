const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/', productController.list)
router.get('/:id', productController.detail)
router.get('/cart', productController.cart)
router.get('/edit', productController.edit)
router.get('/create', productController.create)

module.exports = router;