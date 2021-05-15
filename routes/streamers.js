const express = require('express'),
      router = express.Router(),
      Streamer = require('../models/streamer'),
      middleware = require('../middleware'),
      request = require('request');

// ================
// STREAMER ROUTES
// ================

    
const options = {
    url: "",
    headers: {
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': 'Bearer ' + process.env.AUTHORIZATION
    }    
};

router.put("/:id", middleware.isLoggedIn, function(req, res){
    checkIfLive();

    function checkIfLive(){
        req.body.updatedStreamer = req.sanitize(req.body.updatedStreamer);
        options.url = 'https://api.twitch.tv/helix/streams?user_login=' + req.body.updatedStreamer;
        request(options, callback);
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            const optionsStr = { new: true};
            if (info.data.length !== 0) {
                //const query = {login: this.uri.query.substr(11)};
                Streamer.findByIdAndUpdate(req.params.id, { login: req.body.updatedStreamer, url: "https://www.twitch.tv/" + req.body.updatedStreamer, isLive: "color:red" }, optionsStr,function(err, str) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect("/");
                    }
                });
            }
            else {
                //const query = {login: this.uri.query.substr(11)};
                Streamer.findByIdAndUpdate(req.params.id, { login: req.body.updatedStreamer, url: "https://www.twitch.tv/" + req.body.updatedStreamer, isLive: "color:none" }, optionsStr, function(err, str) {
                    if (err) {
                        console.log(err);
                    } else { 
                        res.redirect("/");
                    }
                });
            }
        }
    }
});

module.exports = router;