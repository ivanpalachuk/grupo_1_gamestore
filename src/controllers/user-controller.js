const db = require('../database/models/');
const User = db.Usuario;
const bcryptjs = require('bcryptjs');
const path = require('path');
const { validationResult } = require('express-validator');


const userController = {

    signUp: (req, res) => {
        return res.render('signUp')
    },

    logIn: (req, res) => {
        res.render('signIn');
    },
    processRegister: (req, res) => {

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

        let userInDbEmail = User.findByField('email', req.body.email);//realizar la busqueda en sequelize
        let userInDbUsuario = User.findByField('usuario', req.body.usuario);//realizar la busqueda sequelize

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

        /*create: (req, res) => {
      //En esta variable guardo lo enviado desde la ruta, con respecto a los errores encontrados en la carga de los datos por parte del usuario
      let errors = validationResult(req);
      //return res.send(errors);
      //Aquí determino si hay ó no errores encontrados
      if(!errors.isEmpty()) {
        return res.render(path.resolve(__dirname, '../views/usuarios/registro'), {
          errors: errors.errors,  old: req.body
        });
      } 
      //Si todo marcha sobre ruedas, entonces 
      // Generamos el usuario a partir de los datos del request
      // - Ignoramos repassword, ya que no nos interesa guardarla
      // - Hasheamos la contraseña

      let user = {
        firstName:req.body.first_name,
        lastName: req.body.last_name,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        provincia: Number(req.body.provincia),
        avatar: req.file ? req.file.filename : '',
        role: 1
      };

      User
      .create(user)
      .then((storedUser) => {
          return  res.redirect('/login');
      })
      .catch(error => console.log(error));
    },*/

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