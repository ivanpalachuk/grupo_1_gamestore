/*------------------------------------------Utils-ini------------------------------------------*/
const { debug } = require("console");                                                               //esto que hace?? es pra hacer solo log() en vez de console.log() -fianriel
const { runMain } = require("module");                                                              //y eto?? - fianriel
const path = require("path");
/*------------------------------------------Utils-fin------------------------------------------*/

/*------------------------------------------Config-ini-----------------------------------------*/
const express = require("express");
const app = express();

app.set('view engine', 'ejs');

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath))

const port = process.env.PORT || 4022;
/*------------------------------------------Config-fin-----------------------------------------*/

/*------------------------------------------Routes-ini-----------------------------------------*/
const rutasMain = require ('../routes/main.js')
const rutasCart = require ('../routes/cart.js')
const rutasProducto = require ('../routes/product.js')
const rutasUser = require ('../routes/user.js')

app.use('/',rutasMain);
app.use('/',rutasCart);
app.use('/',rutasProducto);
app.use('/',rutasUser);
/*------------------------------------------Routes-fin-----------------------------------------*/


/*------------------------------------------Server-ini-----------------------------------------*/
app.listen(port, () => {
    console.log("Servidor prueba Gamestore corriendo en puerto 4022")
})
/*------------------------------------------Server-fin--------------------------------------*/