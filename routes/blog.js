const express = require('express'),
      router = express.Router(),
      Blog = require('../models/blog'),
      middleware = require('../middleware');

// ============
// BLOG ROUTES
// ============

// INDEX
router.get("/", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            console.log(blogs);
            res.render("blog", {blogs: blogs});
        }
    });
});

// NEW
router.get("/new", function(req, res){
    res.render("blog/new");
});

// CREATE
router.post("/",function(req, res){
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

// SHOW
router.get("/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.render('blog/show', {blog: blog} );
        }
    });
});

// EDIT
router.get("/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.render('blog/edit', {blog: blog});
        }
    });
});

// UPDATE
router.put("/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    })
});

// DESTROY
router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blog")
        }
    });
});

module.exports = router;