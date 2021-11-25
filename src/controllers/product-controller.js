const { json } = require('express');
const path = require("path");
const fs = require('fs');
const { debug } = require('console');

let dbProductos = path.resolve(__dirname, "../data/products.json")
let rutaUsuarios = './data/users.json'

function OpenProducts(){
    let products = fs.readFileSync(dbProductos)
    let productsJson= JSON.parse(products)
    return productsJson;
}

const productController = {
    Lista: (req,res) => {
        res.render('products'); //mandar lista de productos
    },
    PaginaCrear: (req, res) => {
        res.render('new-game');
    },
    Detail: (req, res) => {

        let productId = req.params.id;

        productsJson = OpenProducts();

        let product = productsJson[productId]

        res.render('productDetail', { product });
    },

    PaginaEdit: (req,res) => {


        let productId = req.params.id;
        productsJson = OpenProducts();
        let product = productsJson[productId]

        res.render('edit-game', {product} );

    },
    Crear: (req, res) => {

        productsJson = OpenProducts();
        console.log(productsJson[productsJson.length - 1].id + 1)

        productoNuevo = {
            "id": productId, 
            "titulo": req.body.titulo,
            "price": req.body.price,
            "discount": req.body.discount,
            "dificult": req.body.dificult,
            "age": req.body.age,

            "developer": req.body.developer,

            "datos_Tecnicos": req.body.datos_Tecnicos,
            "requisitos": req.body.requisitos,

            "web": req.body.web,
            "category": req.body.categoryOption,
            "resumen": req.body.resumen,
            
            "legal": req.body.legal,
            "image": req.file.filename,

        }

        productsJson.push(productoNuevo);

        let productsString = JSON.stringify(productsJson);

        fs.writeFileSync(dbProductos, productsString)

        res.redirect('/products');
    },
    Editar: (req,res) => {

        let productId= req.params.id;
        productsJson=OpenProducts();

        productoNuevo = {
            "id": productId, 
            "titulo": req.body.titulo,
            "price": req.body.price,
            "discount": req.body.discount,
            "dificult": req.body.dificult,
            "age": req.body.age,

            "developer": req.body.developer,

            "datos_Tecnicos": req.body.datos_Tecnicos,
            "requisitos": req.body.requisitos,

            "web": req.body.web,
            "category": req.body.categoryOption,
            "resumen": req.body.resumen,
            
            "legal": req.body.legal,
            "image": req.file.filename,

        }

        productsJson[productId]= productoEditado;

        let productsString = JSON.stringify(productsJson);

        fs.writeFileSync(dbProductos, productsString)

        res.redirect('/products');
    },
    Delete:(req,res) =>{
        let productId= req.params.id;
        productsJson=OpenProducts();

        productsJson.Delete(productId);

        let productsString = JSON.stringify(productsJson);

        fs.writeFileSync(dbProductos, productsString)

        res.redirect('/products');
    }

};

module.exports = productController;