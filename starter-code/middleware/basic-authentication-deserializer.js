"use strict";

const User = require("../models/User");

module.exports = (req, res, next) => {
  const userId = req.session.user;
  if (userId) {
    User.findById(userId)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        next(error);
      });
  } else {
    next();
  }
};
