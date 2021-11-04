const { debug } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 4022;

let home = "./views/home.html"
let shopcart = "./views/shoppingcart.html"
let productDetail = "./views/productDetail.html"
let signUp = "./views/signUp.html"
let signIn = "./views/signIn.html"

app.set('view engine', 'ejs');
app.use(express.static(publicPath))

app.listen(port, () => {
    console.log("Servidor prueba Gamestore corriendo en puerto 4022")
})
app.get("/", (req, res) => {
    res.render('home')
})
app.get("/home", (req, res) => {
    res.render('home')
})
app.get("/shopping-cart", (req, res) => {
    res.render('shopcart')
})
app.get("/product-detail", (req, res) => {
    res.render('productDetail')
})
app.get("/sign-up", (req, res) => {
    res.render('signUp')
})
app.get("/sign-in", (req, res) => {
    res.render('signIn')
})