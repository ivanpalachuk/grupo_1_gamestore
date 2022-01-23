module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Edad";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(5)
        },
        idImagen: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
            tableName: "Edad",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Edad = sequelize.define(alias, cols, config)
    Edad.associate = function(models) {
        Edad.belongsTo(models.Producto, {
            as: "Edad",
            foreignKey: "idEdad"
        })
    }
    return Edad
}