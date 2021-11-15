const productController = {
    product: (req,res) => {
        res.render('productDetail');
    },

    list: (req,res) => {
        res.render('products');
    }
};

module.exports = productController;