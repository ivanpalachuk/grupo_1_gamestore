const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const userController = {

    signUp: (req, res) => {
        return res.render('signUp')
    },

    logIn: (req, res) => {
        res.render('signIn');
    },
    processRegister: (req, res) => {

        console.log('DEjame registrar')
        const resultValidation = validationResult(req);


        if (resultValidation.errors.length > 0) {
            console.log('tenes algo mal, revisa')
            console.log(resultValidation.mapped())
            return res.render('signUp', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDbEmail = User.findByField('email', req.body.email);
        let userInDbUsuario = User.findByField('usuario', req.body.usuario);

        if (userInDbEmail) {
            console.log('ya te registraste pelotudo')
            return res.render('signUp', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        } else if (userInDbUsuario) {
            return res.render('signUp', {
                errors: {
                    usuario: {
                        msg: 'Este usuario ya está registrado' //Funciona si solo está duplicado el usuario
                    }
                },
                oldData: req.body
            });
        } else {
            let userToCreate = {
                ...req.body,
                clave: bcryptjs.hashSync(req.body.clave, 10),
                clave2: bcryptjs.hashSync(req.body.clave, 10),
                avatar: req.file.filename
            }
            User.create(userToCreate);
            return res.redirect('/user/log-in');
        }


    },
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

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