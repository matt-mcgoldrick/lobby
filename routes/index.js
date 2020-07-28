const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      Streamer = require('../models/streamer'),
      middleware = require('../middleware'),
      passport = require("passport"),
      request = require('request');

router.get("/", function(req, res){
    if(!req.user){
        User.findOne({username: "Default"}).populate('streamerList').exec(function(err, defaultUser) {
            if(err){
                console.log(err);
            } else {
                checkIfLive();
                res.render("homepage", {defaultUser: defaultUser});
            }
        });
    } else {
        User.findOne({username: req.user.username}).populate('streamerList').exec(function(err, defaultUser) {
            if(err){
                console.log(err);
            } else {
                checkIfLive();
                res.render("homepage", {defaultUser: defaultUser});
            }
        })
    }
});

router.get("/about", function(req, res) {
    res.render("about");
});



// ============
// USER ROUTES
// ============
//user profile
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err) {
            console.log(err);
        } else {
            res.render("profile", {user: user});
        }
    });
});

// ============
// AUTH ROUTES
// ============

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.findOne({username: "Default"}, function(err, defaultUser){
        if(err){
            console.log(err);
        } else{
            let newUser = new User({username: req.body.username, streamerList: defaultUser.streamerList});
            User.register(newUser, req.body.password, function(err, user){
                if(err){
                    console.log(err);
                    return res.render("register");
                }
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/");
                })
            });
        }
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function checkIfLive(){
    Streamer.find({}, function(err, str) {
        if(err) {
            console.log(err);
        } else {
            str.forEach(function(streamer){
                options.url = 'https://api.twitch.tv/helix/streams?user_login=' + streamer.login;
                request(options, callback);
            });
        }
    });
}

const options = {
    url: "",
    headers: {
        'Client-ID': '3m4pic0r2zccra2670ph42oh7s4oej',
        'Authorization': 'Bearer yzrgoc64vaeodoluhuah3tdpw4c5pa'
    }    
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        if (info.data.length !== 0) {
            const query = {login: this.uri.query.substr(11)};
            Streamer.findOneAndUpdate(query, {isLive: "color:red" }, function(err, str) {
                if (err) {
                    console.log(err);
                } else {
                }
            });
        }
        else {
            const query = {login: this.uri.query.substr(11)};
            Streamer.findOneAndUpdate(query, {isLive: "color:none" }, function(err, str) {
                if (err) {
                    console.log(err);
                } else { 
                }
            });
        }
    }
}

module.exports = router;