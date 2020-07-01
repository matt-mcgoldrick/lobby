var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// SCHEMA SETUP
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
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

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)