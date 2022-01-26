const { json } = require('express');
const path = require("path");
const fs = require('fs');
const { debug } = require('console');

//Nos traemos la sintaxis de Sequelize//
const db = require('../database/models');
//Aca deberiamos literalmente llamar a la tabla//
const Product = db.Producto

const productController = {
    Lista: (req, res) => {
        products = Product.findAll().then((p) => {
            res.render('products', { products: p });
        })
    },
    PaginaCrear: (req, res) => {
        res.render('new-game');
    },
    Detail: (req, res) => {

        let productId = req.params.id;

        console.log(req.params.id)

        Product.findByPk(productId, {
            include: ['Dificultad', 'Edad', 'ImagenPrincipal', 'ImagenSecundaria', 'Plataformas', 'Categorias']
        }).then((p) => {
            console.log("-----------------dataModeling----------------------")
            console.log(p)
            p.Plataformas = p.Plataformas.map((Plat) => {
                return Plat.nombre
            })
            p.Categorias = p.Categorias.map((Cat) => {
                return Cat.nombre
            })
            console.log("---------------------------------------")
            res.render('productDetail', {
                product: p
            })
        }).catch((e) => {
            console.log("ERROR")
            console.log(e)
            redirect("/")
        })

    },

    PaginaEdit: async (req, res) => {

        let productId = req.params.id;

        let Edades = await db.Edad.findAll()
        
        let Plataformas = await db.Plataforma.findAll()
        Plataformas = Plataformas.map((Plat) => {
            return Plat.nombre
        })
        let Dificultades = await db.Dificultad.findAll()
        let Categorias = await db.Categoria.findAll()
        Categorias = Categorias.map((Cat) => {
            return Cat.nombre
        })

        Product.findByPk(productId,
            {
                include: ['Dificultad', 'Edad', 'ImagenPrincipal', 'ImagenSecundaria', 'Plataformas', 'Categorias']
            }).then((p) => {
                console.log("-----------------dataModeling----------------------")
                p.Plataformas = p.Plataformas.map((Plat) => {
                    return Plat.nombre
                })
                p.Categorias = p.Categorias.map((Cat) => {
                    return Cat.nombre
                })
                console.log(p);
                console.log("---------------------------------------")
                res.render('edit-game', {
                    product: p,
                    Edades,
                    Plataformas,
                    Dificultades,
                    Categorias
                })
            }).catch((e) => {
                console.log("ERROR")
                console.log(e)
            })


    },
    Crear: (req, res) => {

        console.log(req.body.dificult)
        productoNuevo = {
            "titulo": req.body.titulo,
            "precio": req.body.price,
            "descuento": req.body.discount,
            "Dificultad": req.body.Dificultad,
            "Edad": req.body.Edad,
            "plataforma": req.body.plataforma,
            "developer": req.body.developer,

            "datosTecnicos": req.body.datos_Tecnicos,
            "requisitos": req.body.requisitos,

            "web": req.body.web,
            "category": req.body.categoryOption,
            "resumen": req.body.resumen,

            "legal": req.body.legal,
            //"idImagenPrincipal": (req.files['photoGameV'] ? req.files['photoGameV'][0].filename : 0),
            //"idImagenSecundaria": (req.files['photoGame'] ? req.files['photoGame'][0].filename : 0),

        }

        Product.create(productoNuevo)



        res.redirect('/products');
    },
    Editar: (req, res) => {


        let productId = req.params.id;

        productoEditado = {
            "titulo": req.body.titulo,
            "precio": req.body.price,
            "descuento": req.body.discount,
            "Dificultad": req.body.Dificultad,
            "Edad": req.body.age,
            "plataforma": req.body.plataforma,
            "developer": req.body.developer,

            "datosTecnicos": req.body.datos_Tecnicos,
            "requisitos": req.body.requisitos,

            "web": req.body.web,
            "category": req.body.categoryOption,
            "resumen": req.body.resumen,

            "legal": req.body.legal,
            //"image": (req.files['photoGameV'] ? req.files['photoGameV'][0].filename : (productsJson[productId].image ? productsJson[productId].image : 0)),
            //"image_Secundaria": (req.files['photoGame'] ? req.files['photoGame'][0].filename : (productsJson[productId].image_Secundaria ? productsJson[productId].image : 0)),

        }

        console.log(productoEditado);

        res.redirect('/products');
    },
    Delete: (req, res) => {
        Product.destroy({
            where: { id: req.params.id }
        })
        res.redirect('/products');
    },
    Prueba: (req, res) => {
        console.log(".")
        Product.findAll().then(producto => {
            res.send(producto)
        })

    }

};

module.exports = productController;