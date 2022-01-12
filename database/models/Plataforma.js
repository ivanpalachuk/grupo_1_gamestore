module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Plataforma";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: { type: DataTypes.STRING(30) }

    };
    let config = {
            tableName: "Plataforma",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Plataforma = sequelize.define(alias, cols, config)
        //Retorna la BD para que este disponible para consultas//
    return Plataforma

}