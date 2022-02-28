const { validationResult } = require('express-validator');
const db = require('../../database/models');
const Product = db.Producto


const apiProductController = {
    list: (req,res) => {
        Product.findAll({
            include: ['Dificultad', 'Edad', 'ImagenPrincipal', 'ImagenSecundaria', 'Plataformas', 'Categorias']
        }).then((products) => {
            products.forEach(p => {
                if (p.Plataformas) {
                    p.Plataformas = p.Plataformas.map((Plat) => {
                        return Plat.nombre
                    })
                }
                if (p.Categorias) {
                    p.Categorias = p.Categorias.map((Cat) => {
                        return Cat.nombre
                    })
                }
                if (p.ImagenPrincipal) {
                    p.ImagenPrincipal = p.ImagenPrincipal.ruta
                }
                if (p.ImagenSecundaria) {
                    p.ImagenSecundaria = p.ImagenSecundaria.ruta
                }

            });
            return res.send(products);
        })
    }
};

module.exports = apiProductController;