module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Imagen";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        ruta: { type: DataTypes.STRING }

    };
    let config = {
            tableName: "Imagen",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Imagen = sequelize.define(alias, cols, config)
    Imagen.associate = function(models) {
        Imagen.hasMany(models.Producto, {
            as: "Productos",
            foreignKey: "idImagenPrincipal"
        }),
        Imagen.hasMany(models.Producto, {
            as: "Productos2",
            foreignKey: "idImagenSecundaria"
        })

        Imagen.hasMany(models.Edad, {
            as: "Edades",
            foreignKey: "idImagen"
        })

    }
    return Imagen

}