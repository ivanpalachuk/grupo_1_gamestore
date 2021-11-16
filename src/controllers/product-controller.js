const { json } = require('express');
const fs = require('fs');

let dbProductos = './data/products.json'
let rutaUsuarios = './data/users.json'

function OpenProducts() {

    let products = fs.readFileSync(dbProductos)
    let productsJson = JSON.parse(products)

    return productsJson;
}

const productController = {
    Lista: (req, res) => {
        res.render('products');
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
    Edit: (req, res) => {

        let productId = req.params.id;
        productsJson = OpenProducts();
        let product = productsJson[productId]

        res.render('new-game', { requiredProduct: product }); //cambiar cuando este new edit
    },
    Crear: (req, res) => {

        productsJson = OpenProducts();

        productoNuevo = {
            "id": productsJson[productsJson.length - 1].id + 1, //el id del ultimo producto + 1
            "titulo": req.body.titulo,
            "price": req.body.price,
            "discount": req.body.discount,
            "obj_carac": req.body.obj_carac,
            "dificult": req.body.dificult,
            "age": "C",
            "developer": req.body.developer,
            "esrb": req.body.esrb,
            "players": req.body.players,
            "release": req.body.release,
            "editor": req.body.editor,
            "categoryOption": req.body.categoryOption,
            "idioma": req.body.idioma,
            "so": req.body.so,
            "procesador": req.body.procesador,
            "ram": req.body.ram,
            "graphic": req.body.graphic,
            "directx": req.body.directx,
            "storage": req.body.storage,
            "web": req.body.web,
            "category": req.body.categoryOption,
            "plataforma": /*plataforma*/ "to implement",
            "legal": req.body.legal,
            "image": "imagen_path",
            "ratingIMG": "imagenrating_path"

        }

        productsJson.push(productoNuevo);

        let productsString = JSON.stringify(productsJson);

        fs.writeFileSync(dbProductos, productsString)

        res.redirect('/products');
    },

};

module.exports = productController;