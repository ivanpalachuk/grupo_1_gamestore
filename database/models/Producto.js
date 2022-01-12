module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Producto";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        titulo: { type: DataTypes.STRING(100) },
        precio: { type: DataTypes.INTEGER },
        descuento: { type: DataTypes.INTEGER },
        resumen: {
            type: DataTypes.TEXT
        },
        IdDificultad: { type: DataTypes.INTEGER },
        IdEdad: { type: DataTypes.INTEGER },
        datosTecnicos: { type: DataTypes.STRING },
        requisitos: { type: DataTypes.STRING },
        legal: { type: DataTypes.STRING },
        IdimagenPrincipal: { type: DataTypes.INTEGER },
        IdimagenSecundaria: { type: DataTypes.INTEGER },

    };
    let config = {
            tableName: "Producto",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Producto = sequelize.define(alias, cols, config)
        //Retorna la BD para que este disponible para consultas//
    return Producto

}