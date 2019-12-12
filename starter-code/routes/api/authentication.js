"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../../models/user");
// const bcryptjs = require("bcryptjs");

const passport = require("passport");

//! SIGN IN
// Sign In Local

router.post(
  "/sign-in/",
  passport.authenticate("local-sign-in", {
    successRedirect: "/",
    failureRedirect: "/auth/sign-in"
  })
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
  passport.authenticate("local-sign-up", {
    successRedirect: "/auth/verify-email",
    failureRedirect: "/auth/sign-up"
  })
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

router.post("/sign-out", (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;

/* router.post("/sign-up", (req, res, next) => {
    const { username, email, password } = req.body;
    bcryptjs
      .hash(password, 10)
      .then(hash => {
        return User.create({
          username,
          email,
          passwordHash: hash
        });
      })
      .then(user => {
        req.session.user = user._id;
        res.json({ user });
      })
      .catch(error => {
        next(error);
      });
  });
  
  router.post("/sign-in", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) throw new Error("There's no user with that email.");
      const result = await bcryptjs.compare(password, user.passwordHash);
      if (!result) throw new Error("Wrong password.");
      req.session.user = user._id;
      res.json({ user });
    } catch (error) {
      next(error);
    }
  });
  
  router.post("/sign-out", (req, res, next) => {
    req.session.destroy();
    res.json({});
  });
  
  module.exports = router; */
