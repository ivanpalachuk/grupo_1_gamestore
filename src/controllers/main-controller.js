const { json } = require('express');
const path = require("path");
const fs = require('fs');
const { debug } = require('console');
//Nos traemos la sintaxis de Sequelize//
const db = require('../database/models');
//Aca deberiamos literalmente llamar a la tabla//
const Product = db.Producto

let dbProductos = path.resolve(__dirname, "../data/products.json")
let rutaUsuarios = './data/users.json'

function OpenProducts(){
    let products = fs.readFileSync(dbProductos)
    let productsJson= JSON.parse(products)
    return productsJson;
}

function WriteProducts(products){
    let productsString = JSON.stringify(products);
    fs.writeFileSync(dbProductos, productsString)
}


const mainController = {
    home: (req,res) => {
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
                
            })
            return res.render('home', {products});
       
    })}
};

module.exports = mainController;