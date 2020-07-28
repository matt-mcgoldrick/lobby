const Streamer = require('../models/streamer');

module.exports = {
    isLoggedIn:  function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }
}