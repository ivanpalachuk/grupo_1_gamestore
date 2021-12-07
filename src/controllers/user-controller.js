const User = require ('../models/User');
const {validationResult} = require ('express-validator');

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
    }
    
    //profile: (req,res) => {
    //     res.render('userProfile')
    // }
}


module.exports = userController;