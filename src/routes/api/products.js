const express = require ('express');
const router = express.Router();
const productController = require ('../../controllers/api/productsController');

router.get('/categories', productController.categories)
router.get('/colors', productController.colors)
router.get('/brands', productController.brands)

module.exports = router