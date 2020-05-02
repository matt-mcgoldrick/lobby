const express = require("express"),
      request = require("request"),
      bodyParser = require('body-parser'),
      mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/lobby_io", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static("public"));
app.set("view engine", "ejs");

const streamerSchema = new mongoose.Schema({
    login: String,
    url: String, 
    isLive: Boolean
});

const Streamer = mongoose.model("Streamer", streamerSchema);

/* Streamer.create({
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

Streamer.create({
    login: "xcaliz0rz",
    url: "https://www.twitch.tv/siritron",
    isLive: "true"
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
});

Streamer.create({
    login: "cirno_tv",
    url: "https://www.twitch.tv/siritron",
    isLive: "true"
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
});  */

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
        'Client-ID': '3m4pic0r2zccra2670ph42oh7s4oej'
    }    
};

checkIfLive();

app.get("/", function(req, res) {
    Streamer.find({}, function(err, str) {
        if(err) {
            console.log(err);
        } else {
            let isLive1 = '';
            let isLive2 = '';
            let isLive3 = '';
            if(str[0].isLive == true){
                isLive1 = { liveStatus :"color:red" }
            } else {
                isLive1 = { liveStatus :"color:none" }
            }
            if(str[1].isLive == true){
                isLive2 = { liveStatus :"color:red" }
            } else {
                isLive2 = { liveStatus :"color:none" }
            }
            if(str[2].isLive == true){
                isLive3 = { liveStatus :"color:red" }
            } else {
                isLive3 = { liveStatus :"color:none" }
            }
            res.render("homepage", {streamer1: str[0].login, streamer2: str[1].login, streamer3: str[2].login, 
                isLive1: isLive1, isLive2: isLive2, isLive3: isLive3});
        }
    });
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
    const str1 = req.body.newstreamer1;
    // Update streamer 1 in the db
    const query = { num: 1 };
    const options = { new: false};
    Streamer.findOneAndUpdate(query, { login: str1, url: "https://www.twitch.tv/" + str1 }, options, function(err, doc){
        if(err){
            console.log(err);
        } else {
            console.log(doc);
            res.redirect("/");
        }
    });
});

app.post("/editstreamer2", function(req, res){
    const str2 = req.body.streamer2;
    // Update streamer 2 in the db, redirect to / if the update succeeds 
    const query = { num: '2' };
    Streamer.findOneAndUpdate(query, { login: str2, url: "https://www.twitch.tv/" + str2 }, function(err, res){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.post("/editstreamer3", function(req, res){
    const str3 = req.body.streamer3;
    // Update streamer 3 in the db
    const query = { num: '3' };
    Streamer.findOneAndUpdate(query, { login: str3, url: "https://www.twitch.tv/" + str3 }, function(err, res){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

class streamerIcon {
    constructor(iconElement, isLive) {
        this.iconElement = iconElement;
        this.isLive = isLive;
    }
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        if (info.data.length !== 0) {
            const query = {login: this.uri.query.substr(11)};
            Streamer.findOneAndUpdate(query, {isLive: true}, function(err, str) {
                if (err) {
                    console.log(err);
                } else {
                }
            });
        }
        else {
            const query = {login: this.uri.query.substr(11)};
            Streamer.findOneAndUpdate(query, {isLive: false}, function(err, str) {
                if (err) {
                    console.log(err);
                } else { 
                }
            });
        }
    }
}

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.");
});