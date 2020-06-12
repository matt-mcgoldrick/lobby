const express = require("express"),
      request = require("request"),
      methodOverride = require("method-override"),
      expressSanitizer = require("express-sanitizer"),
      bodyParser = require('body-parser'),
      mongoose = require("mongoose"),
      app = express();

mongoose.connect("mongodb://localhost:27017/lobby_io", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use('/public', express.static("public"));
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
const streamerSchema = new mongoose.Schema({
    login: String,
    url: String, 
    isLive: String
});
const Streamer = mongoose.model("Streamer", streamerSchema);

const blogSchema = new mongoose.Schema({
    title: String,
    body: String
});
const Blog = mongoose.model("Blog", blogSchema);

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.");
});

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

/*
Blog.create({
    title: "First blog post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}, function(err, str){
    if(err){
        console.log(err);
    } else {
        console.log(str);
    }
});
*/

class streamerIcon {
    constructor(iconElement, isLive) {
        this.iconElement = iconElement;
        this.isLive = isLive;
    }
}

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
        'Client-ID': '3m4pic0r2zccra2670ph42oh7s4oej',
        'Authorization': 'Bearer yzrgoc64vaeodoluhuah3tdpw4c5pa'
    }    
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        if (info.data.length !== 0) {
            const query = {login: this.uri.query.substr(11)};
            Streamer.findOneAndUpdate(query, {isLive: "color:red" }, function(err, str) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(str);
                }
            });
        }
        else {
            const query = {login: this.uri.query.substr(11)};
            Streamer.findOneAndUpdate(query, {isLive: "color:none" }, function(err, str) {
                if (err) {
                    console.log(err);
                } else { 
                    console.log(str);
                }
            });
        }
    }
}

app.get("/", function(req, res){
    res.redirect("/streamers");
})

// INDEX
app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/blog", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            console.log(blogs);
            res.render("blog", {blogs: blogs});
        }
    });
});

app.get("/streamers", function(req, res) {
    Streamer.find({}, function(err, streamers) {
        if(err) {
            console.log(err);
        } else {
            checkIfLive();   
            res.render("homepage", {streamers: streamers});
        }
    });
});

// NEW
app.get("/blog/new", function(req, res){
    res.render("newBlog");
});

app.get("/streamers/new", function(req, res){
    res.render("new");
});

// CREATE
app.post("/blog", function(req, res){
    Blog.create({
        title: req.body.title,
        body: req.body.body
    }, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            console.log(blogs);
            res.redirect('/blog');
        }
    })
});

app.post("/streamers", function(req, res) {

});

// SHOW
app.get("/blog/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.render('singleBlog', {blog: blog} );
        }
    });
});

app.get("/streamers/:id", function(req, res){
    Streamer.findById(req.params.id, function(err, str){
        if(err) {
            console.log(err);
        } else {
            console.log(str);
        }
    });
});

// EDIT
app.get("/blog/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.render('editBlog', {blog: blog});
        }
    });
});

app.get("/streamers/:id/edit", function(req, res) {
    Streamers.findById(req.params.id, function(err, str){
        if(err) {
            console.log(err);
        } else {
            console.log(str);
        }
    });
});

// UPDATE
app.put("/blog/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    })
});

app.put("/streamers/:id",  function(req, res){
    const options = { new: true};
    req.body.updatedStreamer = req.sanitize(req.body.updatedStreamer);
    Streamer.findByIdAndUpdate(req.params.id, { login: req.body.updatedStreamer, url: "https://www.twitch.tv/" + req.body.updatedStreamer }, options, function(err, doc){
        if(err){
            console.log(err);
        } else {
            console.log(doc);
            res.redirect("/streamers");
        }
    });
});

// DESTROY
app.delete("/blog/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blog")
        }
    });
});

app.delete("/streamers/:id", function(req, res){
    Streamer.findByIdAndRemove(req.params.id, function(err, str){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/streamers");
        }
    });
});