const { validationResult } = require('express-validator');
const db = require('../../database/models');
const Product = db.Producto


const apiProductController = {
    list: (req, res) => {
        Product.findAll({
            include: ['Dificultad', 'Edad', 'ImagenPrincipal', 'ImagenSecundaria', 'Plataformas', 'Categorias']
        }).then((products) => {

            let productsList = products.map((p) => {
                let product = {
                    "id": p.id,
                    "name": p.titulo,
                    "description": p.resumen,
                    "categories": p.Categorias.map((Cat) => {
                        return Cat.nombre
                    }),
                    "detail": "http://localhost:4022/api/product/" + p.id
                }
                return product

            })

            db.Categoria.findAll({ include: ['Productos'] }).then((categorias) => {

                categorias = categorias.reduce((acc, curr) => (acc[curr.nombre] = curr.Productos.length, acc), {});
                //console.log(categorias)

                let response = {
                    count: productsList.length,
                    countByCategory: categorias,
                    products: productsList
                }

                return res.send(response);
            })



        })
    },
    detail: (req, res) => {
        let productId = req.params.id;

        Product.findByPk(productId, {
            include: ['Dificultad', 'Edad', 'ImagenPrincipal', 'ImagenSecundaria', 'Plataformas', 'Categorias']
        }).then((p) => {


            if (p.dataValues.ImagenPrincipal) {
                p.dataValues.ImagenPrincipal = "http://localhost:4022/images/productImages" + p.dataValues.ImagenPrincipal.ruta
            }
            if (p.dataValues.ImagenSecundaria) {
                p.dataValues.ImagenSecundaria = "http://localhost:4022/images/productImages" + p.dataValues.ImagenSecundaria.ruta
            }
            if (p.dataValues.Plataformas) {
                p.dataValues.Plataformas = p.dataValues.Plataformas.map((Plat) => {
                    return Plat.nombre
                })
            }
            if (p.dataValues.Categorias) {
                p.dataValues.Categorias = p.dataValues.Categorias.map((Cat) => {
                    return Cat.nombre
                })
            }
            if (p.dataValues.Edad) {
                p.dataValues.Edad = p.dataValues.Edad.nombre

            }
            if (p.dataValues.Dificultad) {
                p.dataValues.Dificultad = p.dataValues.Dificultad.nombre

            }

            p = p.dataValues

            console.log(p)

            res.send(p)


        })
    }
};

module.exports = apiProductController;