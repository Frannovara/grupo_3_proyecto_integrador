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

router.get('/cart',userMiddleware.userToLogin ,productController.cart)

// Admin Routes
router.post('/',  userMiddleware.userAdmin, upload.any(),productController.createConfirm);
router.get('/edit/:id', userMiddleware.userAdmin, productController.edit)
router.put('/detail/:id',  userMiddleware.userAdmin,upload.any() , productController.update);
router.get('/create', userMiddleware.userAdmin, productController.create2)
router.delete('/delete/:id', userMiddleware.userAdmin, productController.delete2); 
router.post('/buyCart', userMiddleware.userToLogin, productController.buyCart)
router.get('/addToCart/:id', userMiddleware.userToLogin, productController.addToCart)
router.post('/addOne/:id', userMiddleware.userToLogin, productController.addOne)
router.post('/removeOne/:id', userMiddleware.userToLogin, productController.removeOne)
router.put('/addColor/:id', userMiddleware.userAdmin, upload.any(), productController.addColor)
router.get('/:id', productController.detail);

module.exports = router;