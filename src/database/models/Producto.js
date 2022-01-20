module.exports = (sequelize, dataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        titulo: { type: dataTypes.STRING(100) },
        precio: { type: dataTypes.INTEGER.UNSIGNED },
        descuento: { type: dataTypes.INTEGER.UNSIGNED },
        resumen: {
            type: dataTypes.TEXT
        },
        IdDificultad: { type: dataTypes.INTEGER.UNSIGNED },
        IdEdad: { type: dataTypes.INTEGER.UNSIGNED },
        datosTecnicos: { type: dataTypes.STRING },
        requisitos: { type: dataTypes.STRING },
        legal: { type: dataTypes.STRING },
        idImagenPrincipal: { type: dataTypes.INTEGER.UNSIGNED },
        idImagenSecundaria: { type: dataTypes.INTEGER.UNSIGNED },

    };
    let config = {
            tableName: "Producto",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = function(models) {
        Producto.belongsTo(models.Dificultad, {
            as: "Dificultad",
            foreignKey: "idDificultad"
        })
        Producto.belongsTo(models.Edad, {
            as: "Edad",
            foreignKey: "idEdad"
        })
        Producto.belongsTo(models.Imagen, {
            as: "ImagenPrincipal",
            foreignKey: "idImagenPrincipal"
        })
        Producto.belongsTo(models.Imagen, {
            as: "ImagenSecundaria",
            foreignKey: "idImagenSecundaria"
        })

        Producto.belongsToMany(models.Plataforma, { // models.Actor -> Actors es el valor de alias en actor.js
            as: "Plataforma",
            through: 'PlataformaPivot',
            foreignKey: 'idProducto',
            otherKey: 'idPlataforma',
            timestamps: false
        })
        Producto.belongsToMany(models.Plataforma, { // models.Actor -> Actors es el valor de alias en actor.js
            as: "Categoria",
            through: 'CategoriaPivot',
            foreignKey: 'idProducto',
            otherKey: 'idCategoria',
            timestamps: false
        })
        return Producto


    }
}