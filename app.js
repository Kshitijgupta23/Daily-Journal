const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Daily Journal is a place to write, read, and connect, It's easy and free to post your thinking on any topic and connect with millions of readers.";
const aboutContent = "Welcome to Daily Journal, your number one source for reading and writing awesome blogs. We're dedicated to giving you the very best place to read,write and connect with millions of people." +
                     "Founded in 2022 by Kshitij Gupta, Daily Journal is a wbesite which I created for practice in my inital days of learning Web Developement" +
                     "I hope you enjoy my website. If you have any questions or comments, please don't hesitate to contact me" +
                     "Sincerely," +
                     "Kshitij Gupta";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://KshitijGutpa23:@NewPassword1@cluster0.yqw6h.mongodb.net/blogDB?retryWrites=true&w=majority", {useNewUrlParser: true,useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
