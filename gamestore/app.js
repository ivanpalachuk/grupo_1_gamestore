const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.resolve(__dirname, "./public");

let home = "./views/home.html"
let shopcart = "./views/shoppingcart.html"
let productDetail = "./views/productDetail.html"
let signUp = "./views/signUp.html"


app.use(express.static(publicPath))
app.listen(4022, () => {
    console.log("Servidor prueba Gamestore corriendo en puerto 4022")
})
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, home))
})
app.get("/home", (req, res) => {
    res.sendFile(path.resolve(__dirname, home))
})
app.get("/shopping-cart", (req, res) => {
    res.sendFile(path.resolve(__dirname, shopcart))
})
app.get("/product-detail", (req, res) => {
    res.sendFile(path.resolve(__dirname, productDetail))
})
app.get("/sign-up", (req, res) => {
    res.sendFile(path.resolve(__dirname, signUp))
})