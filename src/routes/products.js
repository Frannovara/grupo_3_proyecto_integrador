const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');
const multer = require ("multer");
const path = require ("path");
const userMiddleware = require('../middlewares/userMiddleware');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
let upload = multer({ storage: storage })

// Public Routes
router.get('/', productController.list)

router.get('/cart', productController.cart)

// Admin Routes
router.post('/products', upload.any(), userMiddleware.userAdmin, productController.createProduct);
router.get('/edit/:id', userMiddleware.userAdmin, productController.edit)
router.put('/detail/:id', upload.any() , userMiddleware.userAdmin, productController.confirm);
router.get('/create', userMiddleware.userAdmin, productController.create)
router.delete('/delete/:id', userMiddleware.userAdmin, productController.deleteConfirm); 

router.get('/:id', productController.detail);


module.exports = router;