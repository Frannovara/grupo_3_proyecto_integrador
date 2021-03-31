const express = require ('express');
const router = express.Router();
const productController = require ('../../controllers/api/productsController');

router.get('/list/:page?', productController.products)
router.get('/image/:id/:color', productController.image)
router.get('/categories', productController.categories)
router.get('/colors', productController.colors)
router.get('/brands', productController.brands)
router.get('/:id', productController.productDetail)

module.exports = router