"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    /*   firstName: {
    type: String,
    trim: true
  }, */
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User"
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    image: {
      type: String
    },
    passwordHash: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
