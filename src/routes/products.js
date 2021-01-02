const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');
const multer = require ("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
let upload = multer({ storage: storage })


router.get('/', productController.list)
router.get('/cart', productController.cart)
router.get('/edit/:id', productController.edit)
router.patch('/:id', upload.any() , productController.confirm);
router.get('/create', productController.create)
router.delete('/delete/:id', productController.delete)
router.get('/:id', productController.detail)


module.exports = router;