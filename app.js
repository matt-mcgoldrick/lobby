const result = require('dotenv').config();
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

// require routes
const blogRoutes = require("./routes/blog"),
      streamerRoutes = require("./routes/streamers"),
      indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost:27017/lobby_io", { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

app.use('/blog', blogRoutes);
app.use('/users/:id/streamers', streamerRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.");
});