const user = require("../controllers/user-controller");




function adminAuthMiddleware(req, res, next){
    
    
    if (req.session.userLogged){
    if (!req.session.userLogged.admin){
            return res.redirect('/user/profile');
    }
}
    next();
}

module.exports = adminAuthMiddleware;