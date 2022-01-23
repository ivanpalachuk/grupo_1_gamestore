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

    Plataforma.associate = function(models) {
        Plataforma.belongsToMany(models.Producto, {
            as: "Producto",
            through: 'PlataformaPivot',
            foreignKey: 'idPlataforma',
            otherKey: 'idProducto',
            timestamps: false
        })
    }
    return Plataforma
}