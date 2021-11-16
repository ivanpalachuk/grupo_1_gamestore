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

        res.render('edit-game', {product} ); //cambiar cuando este new edit


    },
    Crear: (req, res) => {

        productsJson = OpenProducts();
        console.log(productsJson[productsJson.length - 1].id + 1)

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
            "resumen": req.body.resumen,
            "plataforma": /*plataforma*/ "to implement",
            "legal": req.body.legal,
            "image": req.file.filename,
            "ratingIMG": "imagenrating_path"

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
            "resumen": req.body.resumen,
            "plataforma": /*plataforma*/ "to implement",
            "legal": req.body.legal,
            "image": "imagen_path",
            "ratingIMG": "imagenrating_path"

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