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
        Product.findByPk(productId).then((p) => {
            res.render('productDetail', {
                product: p
                /*Edades: Edades(),
                Dificultades: Dificultad(),
                Plataformas: Plataforma(),
                Categorias: Categoria(),*/
            })
        })

    },

    PaginaEdit: async (req, res) => {

        let productId = req.params.id;

        let Edades = await db.Edad.findAll()
        let Plataformas = await db.Plataforma.findAll()
        let Dificultades = await db.Dificultad.findAll()
        let Categorias = await db.Categoria.findAll()

        Product.findByPk(productId,
            {
                include: ['Dificultad', 'Edad', 'ImagenPrincipal', 'ImagenSecundaria', 'Plataformas', 'Categorias']
            }).then((p) => {
                console.log("---------------------------------------")
                //console.log(p.Plataformas[0].nombre)
                console.log(Plataformas)
                console.log(p.Plataformas)
                Plataformas.forEach(d => {
                    console.log(d.nombre + ' '+ p.Plataformas.includes(d.nombre))
                    
                });
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
            "Dificultad": "1",
            "Edad": req.body.age,
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
        productsJson = OpenProducts();

        productoEditado = {
            "id": productId,
            "titulo": req.body.titulo,
            "price": req.body.price,
            "discount": req.body.discount,
            "dificult": req.body.dificult,
            "age": req.body.age,
            "plataforma": req.body.plataforma,
            "developer": req.body.developer,

            "datos_Tecnicos": req.body.datos_Tecnicos,
            "requisitos": req.body.requisitos,

            "web": req.body.web,
            "category": req.body.categoryOption,
            "resumen": req.body.resumen,

            "legal": req.body.legal,
            "image": (req.files['photoGameV'] ? req.files['photoGameV'][0].filename : (productsJson[productId].image ? productsJson[productId].image : 0)),
            "image_Secundaria": (req.files['photoGame'] ? req.files['photoGame'][0].filename : (productsJson[productId].image_Secundaria ? productsJson[productId].image : 0)),

        }

        productsJson[productId] = productoEditado;

        let productsString = JSON.stringify(productsJson);

        fs.writeFileSync(dbProductos, productsString)

        res.redirect('/products');
    },
    Delete: (req, res) => {
        let productId = req.params.id;
        productsJson = OpenProducts();

        productsJson = productsJson.filter((product) => product.id != productId)
        WriteProducts(productsJson)

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