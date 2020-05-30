const express = require("express"),
      request = require("request"),
      methodOverride = require("method-override"),
      expressSanitizer = require("express-sanitizer"),
      bodyParser = require('body-parser'),
      mongoose = require("mongoose"),
      app = express();

mongoose.connect("mongodb://localhost:27017/lobby_io", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use('/public', express.static("public"));
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
const streamerSchema = new mongoose.Schema({
    login: String,
    url: String, 
    isLive: String
});
const Streamer = mongoose.model("Streamer", streamerSchema);

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.");
});

/*
Streamer.create({
    login: "siritron",
    url: "https://www.twitch.tv/siritron",
    isLive: "color:none"
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
});

Streamer.create({
    login: "xcaliz0rz",
    url: "https://www.twitch.tv/xcaliz0rz",
    isLive: "color:none"
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
});

Streamer.create({
    login: "cirno_tv",
    url: "https://www.twitch.tv/cirno_tv",
    isLive: "color:none"
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
});
*/


class streamerIcon {
    constructor(iconElement, isLive) {
        this.iconElement = iconElement;
        this.isLive = isLive;
    }
}

function checkIfLive(){
    Streamer.find({}, function(err, str) {
        console.log("did we make it to this last part?");
        if(err) {
            console.log(err);
        } else {
            console.log("made it to else of checkiflive");
            str.forEach(function(streamer){
                console.log("made it in the forloop for " + streamer.login)
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
                    console.log(str);
                }
            });
        }
        else {
            const query = {login: this.uri.query.substr(11)};
            Streamer.findOneAndUpdate(query, {isLive: "color:none" }, function(err, str) {
                if (err) {
                    console.log(err);
                } else { 
                    console.log(str);
                }
            });
        }
    }
    console.log("...hello?");
}

app.get("/", function(req, res){
    res.redirect("/streamers");
})

// INDEX
app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

app.get("/streamers", function(req, res) {
    Streamer.find({}, function(err, streamers) {
        if(err) {
            console.log(err);
        } else {
            checkIfLive();   
            res.render("homepage", {streamers: streamers});
        }
    });
});

// NEW
app.get("/blog/new", function(req, res){
    res.render("newBlog");
});

app.get("/streamers/new", function(req, res){
    res.render("new");
});

// CREATE
app.post("/blog", function(req, res){

});

app.post("/streamers", function(req, res) {

});

// SHOW
app.get("/blog/:id", function(req, res) {
    res.send("Blog post " + req.params.id);
});

app.get("/streamers/:id", function(req, res){
    res.send("Streamer #" + req.params.id);
});

// EDIT
app.get("/blog/:id/edit", function(req, res) {

});

app.get("/streamers/:id/edit", function(req, res) {

});

// UPDATE
app.put("/blog/:id", function(req, res) {

});

app.put("/streamers/:id",  function(req, res){
    const options = { new: true};
    req.body.updatedStreamer = req.sanitize(req.body.updatedStreamer);
    Streamer.findByIdAndUpdate(req.params.id, { login: req.body.updatedStreamer, url: "https://www.twitch.tv/" + req.body.updatedStreamer }, options, function(err, doc){
        if(err){
            console.log(err);
        } else {
            console.log(doc);
            console.log("req body1: " + req.body.updatedStreamer);
            res.redirect("/streamers");
        }
    });
});

// DESTROY
app.delete("/blog/:id", function(req, res){
    
});

app.delete("/streamers/:id", function(req, res){

});