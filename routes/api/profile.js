const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const profileValidator = require("../../validator/profileValidator");
router.post(
  "/createUpdateProfile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      social,
    } = req.body;
    let skillsArray = skills.split(",");
    const profileFields = {
      company,
      website,
      location,
      status,
      skills: skillsArray,
      bio,
      githubusername,
      social,
    };
    const validationresponse = profileValidator({skills:profileFields.skills,location});
    if (validationresponse.isError) {
      return res.status(500).json(validationresponse);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //update the profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //creating the user profile
        new Profile(profileFields).save().then((profile) => {
          res.json(profile);
        });
      }
    });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    const { user } = req;
    Profile.findOne({ user: user.id })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ msg: "profile not created" });
        } else {
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
