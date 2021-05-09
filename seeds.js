var   mongoose = require("mongoose"),
      Streamer = require("./models/streamer"),
      Blog     = require("./models/blog"),
      User     = require("./models/user");

var streamers = [
    {
        login: "siritron",
        url: "https://www.twitch.tv/siritron",
        isLive: "color:none"
    },
    {
        login: "xcaliz0rz",
        url: "https://www.twitch.tv/xcaliz0rz",
        isLive: "color:none"
    },
    {
        login: "gamesdonequick",
        url: "https://www.twitch.tv/gamesdonequick",
        isLive: "color:none"
    }
]

// var blogs = [
//     {
//         title: "First Blog Post",
//         body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         author: 
//     },
//     {
//         title: "Second Blog Post",
//         body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//     },
//     {
//         title: "Third Blog Post",
//         body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//     }
// ]

async function seedDB(){
    try {
        //await Blog.remove({});
        //console.log('Blogs removed from db');
        await User.remove({username: "Default"}); 
        console.log('Default users removed from db');

        let user = await User.create({
            username: "Default",
            streamerList: [],
            isAdmin: false
        });
        console.log("Default user created");
        for (const s of streamers) {
            let streamer = await Streamer.create(s);
            console.log("Streamer created");   
            user.streamerList.push(streamer);
            console.log("Streamer added to default user's streamer list");
        }   
        user.save();
        // for (const b of blogs ) {
        //     await Blog.create(b);
        //     console.log("Blog post created");
        // }


    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB;

