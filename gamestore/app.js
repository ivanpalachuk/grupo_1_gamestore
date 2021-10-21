const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath))
app.listen(4022, () => {
    console.log("Servidor prueba Gamestore corriendo en puerto 4022")
})
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"))
})
app.get("/shopping-cart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/shoppingcart.html"))
})
app.get("/product-detail", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))
})