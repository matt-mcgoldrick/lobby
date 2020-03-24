var express = require("express");
var request = require("request");
var app = express();

app.use('/public', express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    var liveState = [{ liveStatus :"color:red"}];
    res.render("homepage", {liveState: liveState});
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

class streamerIcon {
    constructor(iconElement, isLive) {
        this.iconElement = iconElement;
        this.isLive = isLive;
    }
}

const options = {
    url: 'https://api.twitch.tv/helix/streams?user_login=siritron',
    headers: {
        'Client-ID': '3m4pic0r2zccra2670ph42oh7s4oej'
    }    
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            console.log(info.data.type);
            return info.data.type;
        }
}

function checkIfLive() {
    var isLive = false;
    if (request(options, callback) == "live")
    {
        isLive = true;
    }
    return isLive;
}

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.")
})