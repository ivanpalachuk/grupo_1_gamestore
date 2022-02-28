module.exports = (sequelize, dataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "PlataformaPivot";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        idPlataforma: { type: dataTypes.INTEGER.UNSIGNED },
        idProducto: { type: dataTypes.INTEGER.UNSIGNED },

    };
    let config = {
            tableName: "PlataformaPivot",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const PlataformaPivot = sequelize.define(alias, cols, config)

    PlataformaPivot.associate = function(models) {
        PlataformaPivot.belongsTo(models.Producto, {
            as: "Producto",
            foreignKey: 'idProducto',
        })
        PlataformaPivot.belongsTo(models.Plataforma, {
            as: "Plataforma",
            foreignKey: 'idPlataforma',
        })
    }
    return PlataformaPivot
}