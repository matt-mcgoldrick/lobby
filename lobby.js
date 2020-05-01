var express = require("express");
var request = require("request");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/lobby_io", { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static("public"));
app.set("view engine", "ejs");

var streamerSchema = new mongoose.Schema({
    login: String,
    url: String, 
    isLive: Boolean
});

var Streamer = mongoose.model("Streamer", streamerSchema);

Streamer.create({
    login: "siritron",
    url: "https://www.twitch.tv/siritron",
    isLive: "true"
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
});

var streamerLogins = ["siritron", "xcaliz0rz", "cirno_tv"];
var liveStates = [];

function checkIfLive(){
    streamerLogins.forEach(function(strLogin){
        options.url = 'https://api.twitch.tv/helix/streams?user_login=' + strLogin;
        request(options, callback);
    });
}

const options = {
    url: "",
    headers: {
        'Client-ID': '3m4pic0r2zccra2670ph42oh7s4oej'
    }    
};

checkIfLive();

app.get("/", function(req, res) {
    console.log(liveStates);
    console.log(streamerLogins);
    res.render("homepage", {liveState: liveStates, streamerLogins: streamerLogins}); //code that depends on liveStates
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

app.get("/blog/:postNumber", function(req, res) {
    res.send("Post " + req.params.postNumber);
});

app.post("/editstreamer1", function(req, res){
    var newStreamer = req.body.newstreamer1;
    streamerLogins[0] = newStreamer;
    res.redirect("/");
});

app.post("/editstreamer2", function(req, res){
    var newStreamer = req.body.newstreamer2;
    streamerLogins[1] = newStreamer;
    res.redirect("/");
});

app.post("/editstreamer3", function(req, res){
    console.log(req.body);
    var newStreamer = req.body.newstreamer3;
    streamerLogins[2] = newStreamer;
    res.redirect("/");
});


class streamerIcon {
    constructor(iconElement, isLive) {
        this.iconElement = iconElement;
        this.isLive = isLive;
    }
}

function callback(error, response, body) {
    var liveState = {};
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        if (info.data.length !== 0) {
            liveState = { liveStatus :"color:red" };
        }
        else {
            liveState = { liveStatus :"color:none" };
        }
        liveStates.push(liveState);
    }
}

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.")
});