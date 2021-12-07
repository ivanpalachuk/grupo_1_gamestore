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

function WriteProducts(products){
    let productsString = JSON.stringify(products);
    fs.writeFileSync(dbProductos, productsString)
}


const mainController = {
    home: (req,res) => {
        products = OpenProducts();
        res.render('home', {products});
    }
};

module.exports = mainController;