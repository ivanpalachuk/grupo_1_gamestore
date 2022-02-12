const {body} = require('express-validator');
const path = require('path')

module.exports = [
    body('titulo').notEmpty().withMessage('*Este campo debe estar completo').bail()
                  .isLength({min: 5}).withMessage('*Este campo debe tener min 5 caracteres'),
    body('resumen').notEmpty().withMessage('*Este campo debe estar completo').bail()
                  .isLength({min: 20}).withMessage('*Este campo debe tener min 20 caracteres'),

    body('photoGame').custom((value, {req}) => {
    let file = req.files.photoGame[0];

    console.log(file)

    let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.PNG'];
    console.log("VOY A CHEQUEAR LA primera IMAGEN CHE")

    if (!file){
        throw new Error ('*Tienes que subir una imagen');
    } else{
        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error ('*Las extensiones permitidas son .JPG, .JPEG, .PNG y .GIF');
        }
    }
    return true;
}),
body('photoGameV').custom((value, {req}) => {
    let file = req.files.photoGameV[0];

    console.log(file)

    let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.PNG'];
    console.log("VOY A CHEQUEAR LA primera IMAGEN CHE")

    if (!file){
        throw new Error ('*Tienes que subir una imagen');
    } else{
        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error ('*Las extensiones permitidas son .JPG, .JPEG, .PNG y .GIF');
        }
    }
    return true;
})  
    

];