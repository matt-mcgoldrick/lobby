var express = require("express");
var request = require("request");
var app = express();

app.use('/public', express.static("public"));
app.set("view engine", "ejs");

var streamerLogins = ["siritron", "xcaliz0rz", "pestily"];
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
    res.render("homepage", {liveState: liveStates}); //code that depends on liveStates
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
})