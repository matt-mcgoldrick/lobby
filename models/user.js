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

module.exports = mongoose.model("User", userSchema)