module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Provincia";
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
            tableName: "Provincia",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Provincia = sequelize.define(alias, cols, config)
      
    Provincia.associate = function(models) {
        Provincia.hasMany(models.Usuario, {
            as: "Usuario",
            foreignKey: "idProvincia"
        })
    }
    return Provincia

}