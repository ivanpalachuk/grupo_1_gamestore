const { json } = require('express');
const path = require("path");
const fs = require('fs');
const { debug } = require('console');

//Nos traemos la sintaxis de movies.db//
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//Aca deberiamos literalmente llamar a la tabla//
const Product = db.Producto

const productController = {
    Lista: (req, res) => {
        products = OpenProducts();
        res.render('products', { products });
    },
    PaginaCrear: (req, res) => {
        res.render('new-game');
    },
    Detail: (req, res) => {

        let productId = req.params.id;
        Product.findByPk(productId).then((p) => {
            res.render('productDetail', { product: p })
        })

    },

    PaginaEdit: (req, res) => {


        let productId = req.params.id;
        productsJson = OpenProducts();
        let product = productsJson[productId]

        res.render('edit-game', { product });

    },
    Crear: (req, res) => {

        productsJson = OpenProducts();
        console.log(productsJson[productsJson.length - 1].id + 1)

        productoNuevo = {
            "id": productId = productsJson[productsJson.length - 1].id + 1,
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
            "image": (req.files['photoGameV'] ? req.files['photoGameV'][0].filename : 0),
            "image_Secundaria": (req.files['photoGame'] ? req.files['photoGame'][0].filename : 0),

        }

        productsJson.push(productoNuevo);

        let productsString = JSON.stringify(productsJson);

        fs.writeFileSync(dbProductos, productsString)

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