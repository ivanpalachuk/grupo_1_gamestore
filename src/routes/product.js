const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/product-controller.js')

router.get('/', productController.Lista);
router.get('/create', productController.PaginaCrear);
router.get('/:id', productController.Detail);
router.get('/:id/edit', productController.PaginaEdit);

router.post('/create', productController.Crear)

module.exports = router;