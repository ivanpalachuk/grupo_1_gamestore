module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Pais";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: { type: DataTypes.STRING(30) },

    };
    let config = {
            tableName: "Pais",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Pais = sequelize.define(alias, cols, config)
  
        Pais.associate = function(models) {
        Pais.hasMany(models.Usuario, {
            as: "Usuario",
            foreignKey: "idPais"
        })
    }
    return Pais

}