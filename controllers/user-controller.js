const userController = {
    logIn: (req,res) => {
        res.render('signIn');
    },        
    signUp: (req,res) => {
        res.render('signUp')
    }
};

module.exports = userController;