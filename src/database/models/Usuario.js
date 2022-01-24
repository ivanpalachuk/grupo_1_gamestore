module.exports = (sequelize, DataTypes) => {
    //Aca definimos el formato de la base de datos//
    let alias = "Usuario";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: { type: DataTypes.STRING(100) },
        apellido: { type: DataTypes.STRING(100) },
        dni: { type: DataTypes.INTEGER },
        idAvatar: { type: DataTypes.INTEGER },
        correo: {
            type: DataTypes.STRING,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            unique: true
        },
        clave1: { type: DataTypes.STRING },
        clave2: { type: DataTypes.STRING },
        idPais: { type: DataTypes.INTEGER },
        idProvincia: { type: DataTypes.INTEGER },
        direccion: { type: DataTypes.STRING },
        numeroDireccion: { type: DataTypes.INTEGER },
        codigoPostal: { type: DataTypes.INTEGER },
        tyno: { type: DataTypes.BOOLEAN },
        tcno: { type: DataTypes.BOOLEAN }

    };
    let config = {
            tableName: "Usuario",
            timestamps: false
        }
        //Esta constante mediante define de sequelize, arma la BD//
    const Usuario = sequelize.define(alias, cols, config)
        //Retorna la BD para que este disponible para consultas//
    return Usuario

}