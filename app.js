const seedDB = require("./seeds");
const passport = require("passport");

const express = require("express"),
      request = require("request"),
      methodOverride = require("method-override"),
      expressSanitizer = require("express-sanitizer"),
      bodyParser = require('body-parser'),
      mongoose = require("mongoose"),
      LocalStrategy = require("passport-local"),
      Streamer = require("./models/streamer"),
      Blog = require("./models/blog"),
      User = require("./models/user"),
      app = express();

mongoose.connect("mongodb://localhost:27017/lobby_io", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use('/public', express.static("public"));
app.use(methodOverride("_method"));
seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "Lobby",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.");
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

app.get("/", function(req, res){
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

app.get("/about", function(req, res) {
    res.render("about");
});

// ============
// BLOG ROUTES
// ============

// INDEX
app.get("/blog", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            console.log(blogs);
            res.render("blog", {blogs: blogs});
        }
    });
});

// NEW
app.get("/blog/new", function(req, res){
    res.render("blog/new");
});

// CREATE
app.post("/blog",function(req, res){
    Blog.create({
        title: req.body.title,
        body: req.body.body
    }, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            console.log(blogs);
            res.redirect('/blog');
        }
    })
});

// SHOW
app.get("/blog/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.render('blog/show', {blog: blog} );
        }
    });
});

// EDIT
app.get("/blog/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.render('blog/edit', {blog: blog});
        }
    });
});

// UPDATE
app.put("/blog/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    })
});

// DESTROY
app.delete("/blog/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blog")
        }
    });
});

// ============
// USER ROUTES
// ============
//user profile
app.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err) {
            console.log(err);
        } else {
            res.render("profile", {user: user});
        }
    });
});

// ================
// STREAMER ROUTES
// ================

app.put("/users/:id/streamers/:id", isLoggedIn, function(req, res){
    const options = { new: true};
    req.body.updatedStreamer = req.sanitize(req.body.updatedStreamer);
    Streamer.findByIdAndUpdate(req.params.id, { login: req.body.updatedStreamer, url: "https://www.twitch.tv/" + req.body.updatedStreamer }, options, function(err, doc){
        if(err){
            console.log(err);
        } else {
            console.log(doc);
            res.redirect("/");
        }
    });
});

// ============
// AUTH ROUTES
// ============

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
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

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}