const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/user-controller.js')
const multer = require('multer');
const path = require('path')
const validations = require('../middlewares/validateRegisterMiddleware');

//Middleware Multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        folder = path.join(__dirname, "../../public/images/avatars");
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
}
})

const uploadFile = multer ({ storage} );


router.get('/log-in', userController.logIn);
router.get('/sign-up', userController.signUp);
router.get('/profile/:userId', user.Controller.profile);

//Procesar registro
router.post('/sign-up', uploadFile.single('avatar'), validations , userController.processRegister);

//Procesar log in
router.post('/log-in', userController.loginProcess);

module.exports = router;