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
        folder = path.join(__dirname, "../../public/images");
        callback(null,folder);
    },
    filename: (req,file,callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null,imageName);
    }
})
let fileUpload = multer({ storage});


/*------------------------Routes-------------------------------------- */
router.get('/', productController.Lista);
router.get('/create',productController.PaginaCrear);
router.get('/:id', productController.Detail);
router.get('/:id/edit', productController.PaginaEdit);


router.post('/create', fileUpload.single('photoGame'), productController.Crear);
router.put('/:id/edit', productController.Editar);
router.delete('/:id', productController.Delete);

module.exports = router;