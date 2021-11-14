const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/product-controller.js')

router.get('/product-detail', productController.product);

module.exports = router;