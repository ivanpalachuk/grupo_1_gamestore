const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/user-controller.js')
const multer = require('multer');
const path = require('path')
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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


router.get('/log-in', guestMiddleware, userController.logIn);
router.get('/sign-up', guestMiddleware, userController.signUp);
router.get('/profile', authMiddleware, userController.profile);
//Log Out

router.get('/log-out', userController.logOut);

//Procesar registro
router.post('/sign-up', uploadFile.single('avatar'), validations , userController.processRegister);

//Procesar log in
router.post('/log-in', userController.loginProcess);

module.exports = router;