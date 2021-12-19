const User = require ('../models/User');
const {validationResult} = require ('express-validator');
const bcryptjs = require('bcryptjs');

const userController = {

    logIn: (req,res) => {
        res.render('signIn');
    },        
    signUp: (req,res) => {
        res.render('signUp')
    },
    processRegister: (req,res) =>{
      const resultValidation = validationResult(req);
      
         
      if (resultValidation.errors.length > 0){
          return res.render('signUp', {
              errors: resultValidation.mapped(),
              oldData: req.body
          });
      }

    let userInDbEmail = User.findByField('email', req.body.email);
    let userInDbUsuario = User.findByField('usuario', req.body.usuario);

    if (userInDbEmail){
         return res.render ('signUp', {
             errors:{
                email: {
                     msg: 'Este email ya está registrado'
                 }
             },
             oldData: req.body
         });
       } else if (userInDbUsuario){
         return res.render ('signUp', {
           errors: {
               usuario: {
                   msg: 'Este usuario ya está registrado' //Funciona si solo está duplicado el usuario
               }
          },
           oldData: req.body
        });
       }else{
          let userToCreate = {
         ...req.body,
         clave: bcryptjs.hashSync(req.body.clave, 10),
         clave2: bcryptjs.hashSync(req.body.clave, 10),
         avatar: req.file.filename
        }
        User.create(userToCreate);
        return res.redirect('/log-in');
        }


     },
     loginProcess: (req,res) =>{
         let userToLogin = User.findByField('email', req.body.email);

         if(userToLogin){
             let passwordOk = bcryptjs.compareSync(req.body.clave, userToLogin.clave);
            if(passwordOk){
                return res.rendirect('/profile/:id');
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
        profile: (req,res) => {
            res.render('userProfile')
        }
    }


module.exports = userController;