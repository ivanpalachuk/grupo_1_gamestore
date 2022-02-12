/*------------------------Utils----------------------*/
const path = require("path");
/*------------------------Express---------------*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller.js')


/*------------------------Multer------------------------*/
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        folder = path.join(__dirname, "../../public/images/productImages");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
let fileUpload = multer({ storage });

/*------------------------Midlewares----------------------------------*/
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const validateProductMiddleware = require("../middlewares/validateProductMiddleware");


/*------------------------Routes-------------------------------------- */
router.get("/testDB", productController.Prueba);
router.get('/', productController.Lista);
router.get('/create', adminAuthMiddleware, productController.PaginaCrear);
router.get('/:id', productController.Detail);
router.get('/:id/edit', adminAuthMiddleware, productController.PaginaEdit);
router.post('/create', fileUpload.fields([{ name: 'photoGame' }, { name: 'photoGameV' }]), validateProductMiddleware, productController.Crear);
router.put('/:id/edit', fileUpload.fields([{ name: 'photoGame' }, { name: 'photoGameV' }]), productController.Editar);
router.delete('/:id', productController.Delete);

module.exports = router;