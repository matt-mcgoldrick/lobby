var mongoose = require("mongoose");

// SCHEMA SETUP
const userSchema = new mongoose.Schema({
    username: String,
    streamerList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Streamer"
        }
    ]
});

/* User.create({
    username: "Matt",
    streamerList :
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
}); */

module.exports = mongoose.model("User", userSchema)