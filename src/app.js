/*------------------------------------------Utils-ini------------------------------------------*/
const path = require("path");
/*------------------------------------------Utils-fin------------------------------------------*/

/*------------------------------------------Config-ini-----------------------------------------*/
const express = require("express");
const app = express();

const publicPath = path.resolve(__dirname, "../public");
const viewsPath = path.resolve(__dirname, "./views")

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 4022;
/*------------------------------------------Config-fin-----------------------------------------*/


/*------------------------------------------Routes-ini-----------------------------------------*/
const rutasMain = require('./routes/main.js')
const rutasCart = require('./routes/cart.js')
const rutasProducto = require('./routes/product.js')
const rutasUser = require('./routes/user.js')
const rutasAdmin = require('./routes/admin.js')

app.use('/', rutasMain);
app.use('/', rutasCart);
app.use('/products', rutasProducto);
app.use('/', rutasUser);
app.use('/', rutasAdmin);
/*------------------------------------------Routes-fin-----------------------------------------*/


/*------------------------------------------Server-ini-----------------------------------------*/
app.listen(port, () => {
        console.log("Servidor prueba Gamestore corriendo en puerto 4022")
    })
    /*------------------------------------------Server-fin--------------------------------------*/