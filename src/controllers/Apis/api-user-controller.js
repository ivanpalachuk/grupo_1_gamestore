const db = require('../../database/models');
const Usuario = db.Usuario

const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
function apiCall(url, handler) {
    fetch(url)
        .then(response => response.json())
        .then(data => handler(data))
        .catch(e => console.log(e))
}

const apiProductController = {
    list: (req, res) => {
        Usuario.findAll({
            include: ["avatar"]
        }).then((usuarios) => {

            let usuariosFormated = usuarios.map((u) => {
                let usuario = {
                    "id": u.id,
                    "name": u.nombre + ' ' + u.apellido,
                    "email": u.correo,
                    "detail": "http://localhost:4022/api/user/" + u.id
                }
                return usuario

            })

            let response = {
                count: usuariosFormated.length,
                users: usuariosFormated
            }

            return res.send(response);
        })
    },
    detail: (req, res) => {
        let userId = req.params.id;

        Usuario.findByPk(userId, {
            include: ["avatar"]
        }).then((usuario) => {

            delete usuario.dataValues.clave
            delete usuario.dataValues.dni
            delete usuario.dataValues.direccion
            delete usuario.dataValues.numeroDireccion
            delete usuario.dataValues.codigoPostal

            usuario.dataValues.avatar = "http://localhost:4022/images/avatars" + usuario.dataValues.avatar.ruta

            apiCall("https://restcountries.com/v2/alpha/"+usuario.idPais+"?fields=name,alpha3Code", data => {
                usuario.dataValues.pais=data.name;
                res.send(usuario)
            })


        })
    }
};

module.exports = apiProductController;