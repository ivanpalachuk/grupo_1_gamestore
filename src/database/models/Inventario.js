module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Inventario";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        idUsuario: { type: DataTypes.INTEGER },
        idProducto: { type: DataTypes.INTEGER }
    };
    let config = {
            tableName: "Inventario",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Inventario = sequelize.define(alias, cols, config)
        //Retorna la BD para que este disponible para consultas//
    return Inventario

}