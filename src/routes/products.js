const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/', productController.list)
router.get('/cart', productController.cart)
router.get('/edit', productController.edit)
router.get('/create', productController.create)
router.delete("/delete/:id" , productController.deleted)
router.get('/:id', productController.detail)


module.exports = router;