var express = require("express");
var app = express();

app.use('/public', express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("homepage");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Enter through the lobby.")
})