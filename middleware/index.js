const Streamer = require('../models/streamer');
const blog = require('../models/blog');

module.exports = {
    isLoggedIn:  function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    },
    checkUserAuthBlog: function checkUserAuthBlog(req, res, next){
        if(req.isAuthenticated()){
            blog.findById(req.params.id, function(err, blog){
                if(blog.author.id.equals(req.user._id)){
                    next();
                } else {
                    console.log("User not authorized");
                    res.redirect('/blog');
                }
            });
        } else {
            res.redirect("/login");
        }
    }
}