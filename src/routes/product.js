const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/product-controller.js')

router.get('/', productController.lista);
router.get('/create', productController.crear);
router.get('/:id', productController.detail);
router.get('/:id/edit', productController.edit);

module.exports = router;