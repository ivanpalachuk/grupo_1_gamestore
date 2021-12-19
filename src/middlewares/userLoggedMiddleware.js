const User = require('../models/User');

function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;

    let userIn = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', userIn);

    if(userIn) {
        req.session.userLogged = userFromCookie;
    }

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }


    next();
}

module.exports = userLoggedMiddleware;