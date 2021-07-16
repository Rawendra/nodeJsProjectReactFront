const express = require("express");
const { check, validationResult } = require("express-validator");
const validatePost = require("../../validator/validatePost");
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("posts");
});

router.post(
  "/test",
  passport.authenticate("jwt", { session: false }), (req, res) => {
    const { name, text, avatar } = req.body;
    const { id } = req.user;
    const post = new Post({ name, text, avatar });
    const validation = validatePost({ name, text, avatar });
    if (validation.status) {
      res.status(200).json({ msg: "returning the test message" });
    } else {
      res
        .status(500)
        .json({ err: validation, msg: "validation failed", status: false });
    }
  }
);

module.exports = router;
