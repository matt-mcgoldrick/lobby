var mongoose = require("mongoose");

const streamerSchema = new mongoose.Schema({
    login: String,
    url: String, 
    isLive: String
});

module.exports = mongoose.model("Streamer", streamerSchema);

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