module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Categoria";
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
            tableName: "Categoria",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Categoria = sequelize.define(alias, cols, config)
    Categoria.associate = function(models) {

        Categoria.belongsToMany(models.Producto, {
            as: "Productos",
            through: 'CategoriaPivot',
            foreignKey: 'idCategoria',
            otherKey: 'idProducto',
            timestamps: false

        })
    }
    return Categoria
}