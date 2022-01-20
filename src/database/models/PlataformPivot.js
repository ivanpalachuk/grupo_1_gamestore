module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "PlataformaPivot";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        idCategoria: { type: DataTypes.STRING(30) }

    };
    let config = {
            tableName: "PlataformaPivot",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const PlataformaPivot = sequelize.define(alias, cols, config)
        //Retorna la BD para que este disponible para consultas//
    return PlataformaPivot

}