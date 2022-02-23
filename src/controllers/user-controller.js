const db = require('../database/models/');
const Users = db.Usuario;
const bcryptjs = require('bcryptjs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require("../models/User")
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

function apiCall(url, handler) {
    fetch(url)
        .then(response => response.json())
        .then(data => handler(data))
        .catch(e => console.log(e))
}

const userController = {

    signUp: (req, res) => {

        apiCall("https://restcountries.com/v2/all?fields=name,numericCode", data => res.render("signUp", { data: data }))

    },

    logIn: (req, res) => {
        res.render('signIn');
    },
    processRegister: async (req, res) => {

        console.log('Dejame registrar')
        const resultValidation = validationResult(req);


        if (resultValidation.errors.length > 0) {
            console.log('tenes algo mal, revisa')
            console.log(resultValidation.mapped())
            return res.render('signUp', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }


        let userInDbEmail = await Users.findOne({ where: { correo: req.body.email } }).catch((e) => {
            console.log("ERROR")
            console.log(e)
        })
        console.log(userInDbEmail)

        let userInDbUsuario = await Users.findOne({ where: { userName: req.body.usuario } }).catch((e) => {
            console.log("ERROR")
            console.log(e)
        })
        console.log(userInDbUsuario)

        //let userInDbEmail = User.findByField('email', req.body.email);//realizar la busqueda en sequelize
        //let userInDbUsuario = User.findByField('usuario', req.body.usuario);//realizar la busqueda sequelize

        if (userInDbEmail) {
            console.log('ya te registraste pelotudo')
            return apiCall("https://restcountries.com/v2/all?fields=name,numericCode", data => res.render("signUp", {
                data, errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            }))
        }
        else if (userInDbUsuario) {
            return apiCall("https://restcountries.com/v2/all?fields=name,numericCode", data => res.render("signUp", {
                data, errors: {
                    usuario: {
                        msg: 'Este usuario ya está registrado'
                    }
                },
                oldData: req.body
            }))
        } else {
            let userToCreate = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                avatar: {
                    ruta: '/' + (req.file ? req.file.filename : 0)
                },
                correo: req.body.email,
                userName: req.body.usuario,
                clave: bcryptjs.hashSync(req.body.clave, 5),
                idPais: req.body.pais,
                direccion: req.body.direccion,
                codigoPostal: req.body.cp,
                numeroDireccion: req.body.numero,
                tcno: req.body.tcno,
                tyno: req.body.tyno
            }
            console.log(req.file)

            await Users.create(userToCreate, {
                include: ["avatar"]
            }).catch((e) => {
                console.log("ERROR")
                console.log(e)
            });


            return res.redirect('/user/log-in');
        }
    },


    loginProcess: async (req, res) => {
        let userToLogin = await Users.findOne({ where: { correo: req.body.email }, include: ["avatar"] }).catch((e) => {
            console.log("ERROR")
            console.log(e)
        })


        if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.clave, userToLogin.clave);
            if (passwordOk) {
                delete userToLogin.clave;
                delete userToLogin.clave2;
                req.session.userLogged = userToLogin;

                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }

                return res.redirect('/user/profile');
            }
            return res.render('signIn', {
                errors: {
                    email: {
                        msg: '* Las credenciales son inválidas'
                    }
                }
            })
        }

        return res.render('signIn', {
            errors: {
                email: {
                    msg: '* Este email no se encuentra registrado'
                }
            }
        })
    },
    profile: (req, res) => {
        return res.render('userProfile', {
            user: req.session.userLogged
        });
    },

    logOut: (req, res) => {
        res.clearCookie('userIn');
        req.session.destroy();
        return res.redirect('/home');
    }
}


module.exports = userController;