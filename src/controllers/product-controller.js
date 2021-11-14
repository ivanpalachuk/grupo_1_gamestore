const { json } = require('express');
const fs = require('fs');

let rutaProductos = './data/products.json'
let rutaUsuarios = './data/users.json'

const productController = {
    lista: (req,res) => {
        res.send('lista de productos');
    },
    crear: (req,res) => {
        res.render('new-game');
    },
    detail: (req,res) => {

        let productId= req.params.id;
        let products = fs.readFileSync(rutaProductos)
        let productsJson= JSON.parse(products)
        let product = productsJson[productId]

        res.render('productDetail', {product} );
    },
    edit: (req,res) => {

        let productId= req.params.id;
        let products = fs.readFileSync(rutaProductos)
        let productsJson= JSON.parse(products)
        let product = productsJson[productId]

        res.render('new-game', {requiredProduct:product} ); //cambiar cuando este new edit
    }
};

module.exports = productController;