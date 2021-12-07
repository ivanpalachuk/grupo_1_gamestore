const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/user-controller.js')
const multer = require('multer');
const path = require('path')
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
}
})

const uploadFile = multer ({ storage} );

const validations = [
    body('nombre').notEmpty().withMessage('Este campo debe estar completo'),
    body('apellido').notEmpty().withMessage('Este campo debe estar completo'),
    body('dni').notEmpty().isNumeric().withMessage('Este campo debe estar completo'),
    body('usuario').notEmpty().withMessage('Este campo debe estar completo'),
    body('email')
        .notEmpty().withMessage('Este campo debe estar completo').bail()
        .isEmail().withMessage('Este campo debe ser un correo electrónico'),
    body('password').notEmpty().withMessage('Este campo debe estar completo').bail()
        .isLength({min: 8}).withMessage('Este campo debe contener min 8 caracteres').bail()
        .isAlphanumeric().withMessage('Este campo debe ser alfanumérico'),
    body('passwordConfirmation').notEmpty().withMessage('Este campo debe estar completo').bail()
        .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
          }
          return true;}),
    body('pais').notEmpty().withMessage('Este campo debe estar completo'),
    body('provincia').notEmpty().withMessage('Este campo debe estar completo'),
    body('direccion').notEmpty().withMessage('Este campo debe estar completo'),
    body('numero').notEmpty().withMessage('Este campo debe ser un número'),
    body('cp').notEmpty().withMessage('Este campo debe ser un número'),
    body('tcno').notEmpty().withMessage('Debes aceptar los términos y condiciones'),
    body('avatar').custom((value, {req}) => {
    let file = req.file;
    if (!file){
        throw new Error ('Tienes que subir una imagen');
    }
    return true;
    })
];

router.get('/log-in', userController.logIn);
router.get('/sign-up', userController.signUp);
//router.get('/profile/:userId', user.Controller.profile);

//Procesar registro
router.post('/sign-up', uploadFile.single('avatar'), validations ,userController.processRegister);

module.exports = router;