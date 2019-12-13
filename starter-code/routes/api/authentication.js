"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../../models/user");
// const bcryptjs = require("bcryptjs");

const passport = require("passport");

//! SIGN IN
// Sign In Local

router.post(
  "/sign-in",
  passport.authenticate("local-sign-in"),
  (req, res, next) => {
    const user = req.user;
    res.json({ user });
  }
);

// Sign in with Google
/* router.get('/sign-in/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/sign-in/google/redirect', passport.authenticate('google', { failureRedirect: '/sign-in' }), (req, res, next) => {
  res.redirect("/");
}); */

//! SIGN UP
// Sign up Local

router.post(
  "/sign-up/",
  passport.authenticate("local-sign-up"),
  (req, res, next) => {
    const user = req.user;
    res.json({ user });
  }
);

// Verify Email

router.get("/confirm/:token", (req, res, next) => {
  User.findOneAndUpdate(
    { "auth.verificationToken": req.params.token },
    { "auth.verified": true }
  )
    .then(user => {
      res.redirect(`/user/${user._id}/complete-profile`);
    })
    .catch(err => console.log(err));
});

router.get("/user-information", async (req, res, next) => {
  const userId = await req.user;
  if (!userId) {
    //console.log(req.session.passport.user);
    res.json({});
  } else {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("Signed in user not found");
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
});

router.post("/sign-out", (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
//work!
