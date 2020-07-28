const express = require('express'),
      router = express.Router(),
      Streamer = require('../models/streamer'),
      middleware = require('../middleware');

// ================
// STREAMER ROUTES
// ================

router.put("/:id", middleware.isLoggedIn, function(req, res){
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

module.exports = router;