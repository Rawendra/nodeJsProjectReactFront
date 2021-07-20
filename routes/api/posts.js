const express = require("express");
const { check, validationResult } = require("express-validator");
const validatePost = require("../../validator/validatePost");
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const { json } = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("posts");
});

router.post(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, text, avatar } = req.body;
    const { id } = req.user;
    console.log("logging from post.js");
    console.log(req.user);
    const post = new Post({ name, text, avatar, user: id });
    const validation = validatePost({ name, text, avatar });
    if (validation.status) {
      post.save().then((p) => {
        res.json({ data: p });
      });
      //res.status(200).json({ msg: "returning the test message" });
    } else {
      res
        .status(500)
        .json({ err: validation, msg: "validation failed", status: false });
    }
  }
);

//get all the posts
//its public route
router.get("/getall", (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then((posts) => {
      res.json({ data: posts });
    })
    .catch((err) => res.status(400).json({ err: err }));
});

router.get("/findById/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ err: err }));
});

router.delete(
  "/deleteById/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id).then((post) => {
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: "User is not authorized" });
        } //delete the post
        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch((err) => res.status(500).json({ err: err }));
      });
    });
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req.body)
    Profile.findOne({ user: req.user.id }).then((profile) => {
      console.log('request params',req.params)
      Post.findById(req.params.id)
        .then((post) => {
          if(post.likes.filter(like=>like.user.toString()===req.user.id).length){
            return json.status(400).json({err:'user already liked'})
          }
          //adding the user in likes array
          console.log(req.user)
          post.likes.unshift({user:req.user.id});;
          post.save().then(p=>res.json({data:p}));
        })
        .catch((err) =>
          res.status(400).json({ postnotfound: "No post found", err })
        );
    });
  }
);

router.post(
  "/undolike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req.body)
    console.log('inside the undolike')
    Profile.findOne({ user: req.user.id }).then((profile) => {
      console.log('request params',req.params)
      Post.findById(req.params.id)
        .then((post) => {
          if(post.likes.filter(like=>like.user.toString()===req.user.id).length){
            post.likes= post.likes.filter(like=>like.user.toString()===!req.user.id);
            post.save().then(p=>res.json({msg:'the post is successfully unliked by the user'}))
          }
          //adding the user in likes array
         else{ ///the post is not liked by the user
          //no changes to be done
          return json.status(200).then({msg:'the post is already not liked by the user'})
          
        }
        })
        .catch((err) =>
          res.status(400).json({ postnotfound: "No post found",err })
        );
    });
  }
);
module.exports = router;
