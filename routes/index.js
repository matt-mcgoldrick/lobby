const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      Streamer = require('../models/streamer'),
      middleware = require('../middleware'),
      passport = require("passport"),
      request = require('request');

const streamers = [
    {
        login: "siritron",
        url: "https://www.twitch.tv/siritron",
        isLive: "color:none"
    },
    {
        login: "xcaliz0rz",
        url: "https://www.twitch.tv/xcaliz0rz",
        isLive: "color:none"
    },
    {
        login: "gamesdonequick",
        url: "https://www.twitch.tv/gamesdonequick",
        isLive: "color:none"
    }
]

router.get("/", function(req, res){
    if(!req.user){
        console.log("made it to default user redirect");
        User.findOne({username: "Default"}).populate('streamerList').exec(function(err, defaultUser) {
            if(err){
                console.log(err);
            } else {
                checkIfLive();
                res.render("homepage", {defaultUser: defaultUser});
            }
        });
    } else {
        console.log("made it to specific user redirect");
        User.findOne({username: req.user.username}).populate('streamerList').exec(function(err, realUser) {
            if(err){
                console.log(err);
            } else {
                checkIfLive();
                res.render("homepage", {defaultUser: realUser});
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
router.get("/user/:id", function(req, res){
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

router.post("/register", async function(req, res){
    let newUser = new User({
        username: req.body.username,
        streamerList: []
    });
    for (const s of streamers){
        let streamer = await Streamer.create(s);
        newUser.streamerList.push(streamer);
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
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
        'Client-ID': '19nzat5u7oeowbd24ebj9wkj90fesq',
        'Authorization': 'Bearer ncfy7fgu8v3w5n58o2691lme1f7sl0'
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