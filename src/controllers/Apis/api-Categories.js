const db = require('../../database/models');


const apiCategoryController = {
    list: (req, res) => {
        db.Categoria.findAll({ include: ['Productos'] }).then((categorias) => {
            console.log(categorias)
            categorias.map(c=>{
                c.dataValues.Productos = c.dataValues.Productos.length
            })
            return res.send(categorias);
        })
    }

};

module.exports = apiCategoryController;