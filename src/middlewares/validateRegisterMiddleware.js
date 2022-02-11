const {body} = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('*Este campo debe estar completo').bail()
                  .isLength({min: 2}).withMessage('*Este campo debe tener min 2 caracteres'),
    body('apellido').notEmpty().withMessage('*Este campo debe estar completo'),
    body('dni').notEmpty().withMessage('*Este campo debe estar completo').bail()
        .isNumeric().withMessage('*Este campo debe ser numérico'),
    body('usuario').notEmpty().withMessage('*Este campo debe estar completo'),
    body('email')
        .notEmpty().withMessage('*Este campo debe estar completo').bail()
        .isEmail().withMessage('*Este campo debe ser un correo electrónico'),

        // No funciona - revisar
    body('clave').notEmpty().withMessage('*Este campo debe estar completo').bail()
                  .isLength({min: 8}).withMessage('*Este campo debe contener min 8 caracteres'),
    // body('passwordConfirmation').notEmpty().withMessage('*Este campo debe estar completo').bail()
    //     .custom((value, {req}) => {
    //     if (value !== req.body.password) {
    //         throw new Error('*Password confirmation does not match password');
    //       }
    //       return true;}),
    
    body('pais').notEmpty().withMessage('*Este campo debe estar completo'),
    body('provincia').notEmpty().withMessage('*Este campo debe estar completo'),
    body('direccion').notEmpty().withMessage('*Este campo debe estar completo'),
    body('numero').notEmpty().withMessage('*Este campo debe ser un número'),
    body('cp').notEmpty().withMessage('*Este campo debe ser un número'),
    body('tcno').notEmpty().withMessage('*Debes aceptar los términos y condiciones'),
    body('avatar').custom((value, {req}) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

    if (!file){
        throw new Error ('*Tienes que subir una imagen');
    } else{
        let fileExtension = path.extname(file.originalname);
        if(acceptedExtensions.includes(fileExtension)){
            throw new Error ('*Las extensiones permitidas son .JPG, .JPEG, .PNG y .GIF');
        }
    }
    return true;
    })
];