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

/* SEARCHING */
router.get('/', productController.list)

/* PRODUCT CART */
router.get('/cart',userMiddleware.userToLogin ,productController.cart)

/* CREATING A PRODUCT */
router.post('/',  userMiddleware.userAdmin, upload.any(),productController.createConfirm);
router.get('/create', userMiddleware.userAdmin, productController.create)

/* EDITING A PRODUCT */
router.get('/edit/:id', userMiddleware.userAdmin, productController.edit)
router.put('/detail/:id',  userMiddleware.userAdmin,upload.any() , productController.update);

/* DELETE PRODUCT */
router.delete('/delete/:id', userMiddleware.userAdmin, productController.delete); 

/* BUY PRODUCT CART */
router.post('/buyCart', userMiddleware.userToLogin, productController.buyCart)

/* ADD PRODUCT TO CART */
router.get('/addToCart/:id', userMiddleware.userToLogin, productController.addToCart)

/* ADD ONE UNIT OF A PRODUCT IN CART */
router.post('/addOne/:id', userMiddleware.userToLogin, productController.addOne)

/* REMOVE ONE UNIT OF A PRODUCT IN CART */
router.post('/removeOne/:id', userMiddleware.userToLogin, productController.removeOne)

/* ADD A COLOR AND IMAGE TO A PRODUCT */
router.put('/addColor/:id', userMiddleware.userAdmin, upload.any(), productController.addColor)

/* Modify DB Form */
router.get('/databaseForm', userMiddleware.userAdmin, productController.databaseForm)
router.post('/newCategory',userMiddleware.userAdmin, productController.newCategory)
router.post('/newBrand',userMiddleware.userAdmin, productController.newBrand)
router.post('/newColor',userMiddleware.userAdmin, productController.newColor)
router.patch('/editCategory',userMiddleware.userAdmin, productController.editCategory)
router.patch('/editBrand',userMiddleware.userAdmin, productController.editBrand)
router.patch('/editColor',userMiddleware.userAdmin, productController.editColor)

/* PRODUCT DETAIL */
router.get('/:id', productController.detail);


module.exports = router;