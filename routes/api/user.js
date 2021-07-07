const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/default.json");
const passport = require("passport");
const validateRegisterInput = require("../../validator/register");

const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.length) {
      return res.status(400).json({ errors: errors });
    }
    res.send("u r in...");
  }
);

router.post("/login", (req, res) => {
  const { email, password, name } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    //check the password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        //assing web token
        const payload = { id: email, name };
        console.log("printing the secret key" + keys.secretKey);
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            return res.status(400).json({ msg: "error while authorizing" });
          }
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        return res.status(400).json({ password: "password is incorrect" });
      }
    });
  });
});

router.get("/", (req, res) => {
  console.log("user router is called");
  res.send("hello from user");
});

router.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput({name:name});
  if (!isValid) {
    return res.status(400).json({ errors, isValid });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    } else {
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      const newUser = new User({ name, email, password, avatar });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    const { name, email, avatar, date } = req.user;
    res.json({ msg: "success", name, email, avatar, date });
  }
);
module.exports = router;
