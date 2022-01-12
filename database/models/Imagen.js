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
            tableName: "Imagenes",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Imagen = sequelize.define(alias, cols, config)
        //Retorna la BD para que este disponible para consultas//
    return Imagen

}