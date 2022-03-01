const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/Apis/api-product-controller')
const userController = require ('../controllers/Apis/api-user-controller')
const categoryController = require ('../controllers/Apis/api-Categories')

router.get('/product', productController.list);
router.get('/product/:id', productController.detail);


router.get('/user', userController.list);
router.get('/user/:id', userController.detail);

router.get('/category', categoryController.list);



module.exports = router;