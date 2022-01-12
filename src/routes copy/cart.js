const express = require ('express');
const router = express.Router();
const cartController = require ('../controllers/cart-controller.js')

router.get('/shopping-cart', cartController.shoppingCart);

module.exports = router;