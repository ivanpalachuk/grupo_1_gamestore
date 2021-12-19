function authMiddleware(req, res, next){
    if (!req.session.userLogged){
        return res.redirect('/log-in');
    }
    next();
}

module.exports = authMiddleware;